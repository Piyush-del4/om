import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from './user.model';
import { Session } from '../auth/session.model';
import mongoose from 'mongoose';
import { env } from '../../config/env';

// Note: These models will be implemented in subsequent steps.
// We import them here so the GDPR export logic works seamlessly when they are defined.
import { Appointment } from '../appointments/appointment.model';
import { Cart } from '../shop/cart.model';
import { Order } from '../shop/order.model';
import { Enrolment } from '../batches/enrolment.model';

export async function getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId).select('-passwordHash');

    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'User not found',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { name, phone, defaultAddress, dateOfBirth, birthTime, birthPlace, gender, zodiacSign } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'User not found',
        },
      });
      return;
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (defaultAddress !== undefined) user.defaultAddress = defaultAddress;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (birthTime !== undefined) user.birthTime = birthTime;
    if (birthPlace !== undefined) user.birthPlace = birthPlace;
    if (gender !== undefined) user.gender = gender;
    if (zodiacSign !== undefined) user.zodiacSign = zodiacSign;

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        defaultAddress: user.defaultAddress,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'User not found',
        },
      });
      return;
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Incorrect current password',
        },
      });
      return;
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    // Revoke all sessions for this user to force re-auth
    await Session.deleteMany({ userId: user._id });

    res.status(200).json({
      success: true,
      data: {
        message: 'Password changed successfully. Please log in again.',
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GDPR Data Portability Export
 * Gathers all records linked to this user's account and returns them in a structured JSON format.
 */
export async function exportUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Fetch user details excluding credentials
    const profile = await User.findById(userId).select('-passwordHash');

    if (!profile) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'User not found',
        },
      });
      return;
    }

    // Fetch associated resources (use mongoose query safely)
    const appointments = await Appointment.find({ userId: userObjectId });
    const cart = await Cart.findOne({ userId: userObjectId });
    const orders = await Order.find({ userId: userObjectId });
    const enrollments = await Enrolment.find({ userId: userObjectId }).populate('batchId', 'title code description');

    // Compile into export package
    const exportPackage = {
      exportedAt: new Date().toISOString(),
      userProfile: {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        role: profile.role,
        createdAt: profile.createdAt,
      },
      appointments: appointments.map(app => ({
        id: app._id,
        typeName: app.typeName,
        scheduledAt: app.scheduledAt,
        status: app.status,
        calendarEventId: app.googleCalendarEventId ? 'Sync Active' : 'None',
        createdAt: app.createdAt,
      })),
      cart: cart ? {
        items: cart.items.map(item => ({
          itemId: item.itemId,
          quantity: item.quantity,
        })),
        updatedAt: cart.updatedAt,
      } : null,
      orders: orders.map(ord => ({
        id: ord._id,
        items: ord.items,
        totalAmount: ord.totalAmount,
        status: ord.status,
        address: ord.address,
        paymentId: ord.razorpayPaymentId ? 'Paid' : 'Pending',
        createdAt: ord.createdAt,
      })),
      enrollments: enrollments.map(enr => ({
        id: enr._id,
        batch: enr.batchId,
        enrolledAt: enr.createdAt,
      })),
    };

    res.status(200).json({
      success: true,
      data: exportPackage,
    });
  } catch (error) {
    next(error);
  }
}
export async function saveOnboarding(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { dateOfBirth, birthTime, birthPlace, gender, zodiacSign, interests } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });
      return;
    }

    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (birthTime !== undefined) user.birthTime = birthTime;
    if (birthPlace !== undefined) user.birthPlace = birthPlace;
    if (gender !== undefined) user.gender = gender;
    if (zodiacSign !== undefined) user.zodiacSign = zodiacSign;
    if (interests !== undefined) user.interests = interests;
    user.onboardingCompleted = true;

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        onboardingCompleted: user.onboardingCompleted,
        zodiacSign: user.zodiacSign,
        interests: user.interests,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found' },
      });
      return;
    }

    // Hard-delete user and sessions
    await User.findByIdAndDelete(userId);
    await Session.deleteMany({ userId });

    // Clear auth cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      success: true,
      data: { message: 'Profile deleted successfully' },
    });
  } catch (error) {
    next(error);
  }
}
