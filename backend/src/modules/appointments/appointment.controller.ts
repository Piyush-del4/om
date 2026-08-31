import { Request, Response, NextFunction } from 'express';
import { Appointment } from './appointment.model';
import { AppointmentType } from './appointmentType.model';
import { BlockedSlot } from './blockedSlot.model';
import { User } from '../users/user.model';
import * as googleCal from '../../services/googleCalendar.service';
import { sendAppointmentEmail, sendAppointmentStatusEmail, sendAppointmentAdminNotification } from '../../services/email.service';
import { sendAppointmentSmsReminder } from '../../services/sms.service';
import * as razorpayService from '../../services/razorpay.service';
import { env } from '../../config/env';

// Define business hours in IST (10 AM to 6 PM)
const BUSINESS_START_HOUR = 10;
const BUSINESS_END_HOUR = 18;

/**
 * Helper to generate candidate slots for a date in IST and check overlaps.
 */
function getSlotsForDay(dateStr: string, durationMin: number): { start: Date; end: Date }[] {
  const slots: { start: Date; end: Date }[] = [];
  
  // Parse YYYY-MM-DD
  const [year, month, day] = dateStr.split('-').map(Number);
  
  // Generate candidate starts at 30-min intervals between 10:00 and (18:00 - duration)
  const current = new Date(Date.UTC(year, month - 1, day, 4, 30, 0)); // 10:00 IST is 04:30 UTC
  const endLimit = new Date(Date.UTC(year, month - 1, day, 12, 30, 0)); // 18:00 IST is 12:30 UTC

  while (current.getTime() + durationMin * 60000 <= endLimit.getTime()) {
    const slotStart = new Date(current);
    const slotEnd = new Date(current.getTime() + durationMin * 60000);
    
    slots.push({ start: slotStart, end: slotEnd });
    current.setMinutes(current.getMinutes() + 30); // Increment by 30 mins
  }

  return slots;
}

export async function getAvailableSlots(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { date, duration } = req.query as any;
    const durationMin = Number(duration);

    // 1. Get candidate slots
    const candidates = getSlotsForDay(date, durationMin);

    // 2. Fetch busy slots from Google Calendar
    const [year, month, day] = date.split('-').map(Number);
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 4, 30, 0)); // 10 AM IST
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 12, 30, 0)); // 6 PM IST

    const calBusySlots = await googleCal.listBusySlots(startOfDay, endOfDay);

    // 3. Fetch manually blocked slots from DB that overlap this day's window
    const dbBlocks = await BlockedSlot.find({
      startTime: { $lt: endOfDay },
      endTime:   { $gt: startOfDay },
    });
    const dbBusySlots = dbBlocks.map((b) => ({
      start: new Date(b.startTime),
      end: new Date(b.endTime),
    }));

    // 4. Merge both busy-slot sources
    const allBusySlots = [...calBusySlots, ...dbBusySlots];

    // 5. Filter candidates
    const now = new Date();
    const availableSlots = candidates.filter((slot) => {
      if (slot.start <= now) return false;
      const hasOverlap = allBusySlots.some((busy) => {
        return slot.start < busy.end && busy.start < slot.end;
      });
      return !hasOverlap;
    });

    res.status(200).json({
      success: true,
      data: availableSlots.map(slot => slot.start.toISOString()),
    });
  } catch (error) {
    next(error);
  }
}

export async function createAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { appointmentTypeId, scheduledAt, attendeeName, attendeeDateOfBirth, attendeeBirthTime } = req.body;

    // Fetch appointment type
    const appType = await AppointmentType.findById(appointmentTypeId);
    if (!appType) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Appointment type not found',
        },
      });
      return;
    }

    const scheduledDate = new Date(scheduledAt);

    // Validate the time is within business hours (10 AM to 6 PM IST)
    // 10:00 IST = 4:30 UTC, 18:00 IST = 12:30 UTC
    const utcHours = scheduledDate.getUTCHours();
    const utcMins = scheduledDate.getUTCMinutes();
    const timeInMins = utcHours * 60 + utcMins;
    
    const startLimit = 4 * 60 + 30; // 04:30
    const endLimit = 12 * 60 + 30; // 12:30

    if (timeInMins < startLimit || timeInMins + appType.duration > endLimit) {
      res.status(400).json({
        success: false,
        error: {
          code: 'OUT_OF_BUSINESS_HOURS',
          message: 'Requested slot is outside business hours (10:00 AM - 06:00 PM IST)',
        },
      });
      return;
    }

    // Verify slots double-booking against google calendar
    const slotEnd = new Date(scheduledDate.getTime() + appType.duration * 60000);
    const busySlots = await googleCal.listBusySlots(scheduledDate, slotEnd);
    const hasOverlap = busySlots.some(busy => scheduledDate < busy.end && busy.start < slotEnd);

    if (hasOverlap) {
      res.status(409).json({
        success: false,
        error: {
          code: 'SLOT_NOT_AVAILABLE',
          message: 'The requested time slot is already booked',
        },
      });
      return;
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'User profile not found',
        },
      });
      return;
    }

    // Resolve active price (offer price if active, otherwise normal price)
    let activePrice = appType.price;
    if (appType.offerPrice !== undefined && appType.offerPrice !== null) {
      const now = new Date();
      if (!appType.offerExpiresAt || now < new Date(appType.offerExpiresAt)) {
        activePrice = appType.offerPrice;
      }
    }

    if (activePrice === 0) {
      // Sync to Google Calendar (Free booking)
      const googleCalendarEventId = await googleCal.createCalendarEvent(user.email, {
        typeName: appType.name,
        scheduledAt: scheduledDate,
        duration: appType.duration,
        userName: user.name,
        userPhone: user.phone,
        attendeeName,
        attendeeDateOfBirth,
        attendeeBirthTime,
      });

      const appointment = await Appointment.create({
        userId,
        appointmentTypeId,
        typeName: appType.name,
        pricePaid: 0,
        duration: appType.duration,
        scheduledAt: scheduledDate,
        status: 'confirmed',
        googleCalendarEventId,
        attendeeName,
        attendeeDateOfBirth,
        attendeeBirthTime,
      });

      await sendAppointmentEmail(user.email, {
        name: user.name,
        typeName: appType.name,
        scheduledAt: scheduledDate,
      });

      await sendAppointmentAdminNotification({
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        typeName: appType.name,
        scheduledAt: scheduledDate,
      });

      res.status(201).json({
        success: true,
        data: {
          appointment,
          paymentRequired: false,
        },
      });
      return;
    }

    // Save pending appointment in DB
    const appointment = await Appointment.create({
      userId,
      appointmentTypeId,
      typeName: appType.name,
      pricePaid: activePrice,
      duration: appType.duration,
      scheduledAt: scheduledDate,
      status: 'pending',
      attendeeName,
      attendeeDateOfBirth,
      attendeeBirthTime,
    });

    const razorpayOrder = await razorpayService.createRazorpayOrder(activePrice, appointment._id.toString());
    appointment.razorpayOrderId = razorpayOrder.id;
    await appointment.save();

    res.status(201).json({
      success: true,
      data: {
        appointment,
        paymentRequired: true,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyAppointments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const appointments = await Appointment.find({ userId }).sort({ scheduledAt: 1 });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllAppointments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const appointments = await Appointment.find({})
      .populate('userId', 'name email phone')
      .sort({ scheduledAt: -1 });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAppointmentStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Appointment not found',
        },
      });
      return;
    }

    const oldStatus = appointment.status;
    appointment.status = status;
    await appointment.save();

    // If cancelled, remove from Google Calendar
    if (status === 'cancelled' && oldStatus !== 'cancelled' && appointment.googleCalendarEventId) {
      await googleCal.deleteCalendarEvent(appointment.googleCalendarEventId);
    }

    // Get user details for notification
    const user = await User.findById(appointment.userId);
    if (user) {
      await sendAppointmentStatusEmail(user.email, {
        name: user.name,
        typeName: appointment.typeName,
        scheduledAt: appointment.scheduledAt,
        status,
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
}

// ── Consultation Types Admin Settings ──────────────────────────────────────

export async function listAppointmentTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category } = req.query;
    const filter: any = {};
    if (category) {
      filter.category = category;
    }
    const types = await AppointmentType.find(filter).sort({ price: 1 });
    res.status(200).json({
      success: true,
      data: types,
    });
  } catch (error) {
    next(error);
  }
}

export async function createAppointmentType(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, price, duration, description, imageUrl, category, specialOfferTitle, offerPrice, offerExpiresAt } = req.body;

    const newType = await AppointmentType.create({
      name,
      price,
      duration,
      description: description || '',
      imageUrl: imageUrl || '',
      category,
      specialOfferTitle: specialOfferTitle || '',
      offerPrice: offerPrice !== undefined ? offerPrice : undefined,
      offerExpiresAt: offerExpiresAt ? new Date(offerExpiresAt) : undefined,
    });

    res.status(201).json({
      success: true,
      data: newType,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAppointmentType(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const appType = await AppointmentType.findById(id);

    if (!appType) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Appointment type not found',
        },
      });
      return;
    }

    // Soft delete
    appType.isDeleted = true;
    await appType.save();

    res.status(200).json({
      success: true,
      data: {
        message: 'Appointment type deleted successfully',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAppointmentType(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { name, price, duration, description, imageUrl, category, specialOfferTitle, offerPrice, offerExpiresAt } = req.body;

    const appType = await AppointmentType.findById(id);
    if (!appType) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Appointment type not found',
        },
      });
      return;
    }

    if (name !== undefined) appType.name = name;
    if (price !== undefined) appType.price = price;
    if (duration !== undefined) appType.duration = duration;
    if (description !== undefined) appType.description = description;
    if (imageUrl !== undefined) appType.imageUrl = imageUrl;
    if (category !== undefined) appType.category = category;
    if (specialOfferTitle !== undefined) appType.specialOfferTitle = specialOfferTitle;
    if (offerPrice !== undefined) appType.offerPrice = offerPrice === null ? undefined : offerPrice;
    if (offerExpiresAt !== undefined) appType.offerExpiresAt = offerExpiresAt === null ? undefined : new Date(offerExpiresAt);

    await appType.save();

    res.status(200).json({
      success: true,
      data: appType,
    });
  } catch (error) {
    next(error);
  }
}

// ── Blocked Slots Admin Management ─────────────────────────────────────────

/**
 * GET /appointments/blocked-slots
 * Returns all future blocked slots (admin and public need this).
 */
export async function listBlockedSlots(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const now = new Date();
    const blocks = await BlockedSlot.find({ endTime: { $gte: now } }).sort({ startTime: 1 });
    res.status(200).json({ success: true, data: blocks });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /appointments/blocked-slots  (admin only)
 * Body: { date, startTime, endTime, label? }
 */
export async function createBlockedSlot(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { startDate, endDate, startTime, endTime, label } = req.body;

    const start = new Date(startTime);
    const end   = new Date(endTime);

    if (end <= start) {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_RANGE', message: 'endTime must be after startTime' },
      });
      return;
    }

    const block = await BlockedSlot.create({
      startDate,
      endDate,
      startTime: start,
      endTime:   end,
      label:     label || 'Blocked',
    });

    res.status(201).json({ success: true, data: block });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /appointments/blocked-slots/:id  (admin only)
 */
export async function deleteBlockedSlot(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const block = await BlockedSlot.findByIdAndDelete(id);

    if (!block) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Blocked slot not found' },
      });
      return;
    }

    res.status(200).json({ success: true, data: { message: 'Blocked slot removed successfully' } });
  } catch (error) {
    next(error);
  }
}

export async function verifyAppointmentPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const appointment = await Appointment.findOne({ razorpayOrderId, userId });
    if (!appointment) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Appointment not found',
        },
      });
      return;
    }

    // Verify signature
    const isValid = razorpayService.verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      appointment.status = 'cancelled';
      await appointment.save();

      res.status(400).json({
        success: false,
        error: {
          code: 'PAYMENT_VERIFICATION_FAILED',
          message: 'Payment signature verification failed',
        },
      });
      return;
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'User profile not found',
        },
      });
      return;
    }

    // Sync to Google Calendar now that payment is confirmed
    const googleCalendarEventId = await googleCal.createCalendarEvent(user.email, {
      typeName: appointment.typeName,
      scheduledAt: appointment.scheduledAt,
      duration: appointment.duration,
      userName: user.name,
      userPhone: user.phone,
    });

    // Update appointment status to confirmed
    appointment.status = 'confirmed';
    appointment.googleCalendarEventId = googleCalendarEventId;
    appointment.razorpayPaymentId = razorpayPaymentId;
    appointment.razorpaySignature = razorpaySignature;
    await appointment.save();

    // Send confirmation emails
    await sendAppointmentEmail(user.email, {
      name: user.name,
      typeName: appointment.typeName,
      scheduledAt: appointment.scheduledAt,
    });

    await sendAppointmentAdminNotification({
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      typeName: appointment.typeName,
      scheduledAt: appointment.scheduledAt,
    });

    if (user.phone) {
      await sendAppointmentSmsReminder(user.phone, user.name, new Date(appointment.scheduledAt).toLocaleString());
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
}
