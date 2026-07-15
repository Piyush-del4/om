import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { Batch } from './batch.model';
import { Enrolment } from './enrolment.model';
import { PdfNote } from './pdfNote.model';
import { Lecture } from '../lectures/lecture.model';
import { User } from '../users/user.model';
import { env } from '../../config/env';
import { sendEnrollmentEmail, sendBatchEnrollmentAdminNotification } from '../../services/email.service';
import { deleteFromCloudinary } from '../../services/cloudinary.service';
import { logger } from '../../utils/logger';
import * as razorpayService from '../../services/razorpay.service';

// ── Batch Public / Admin APIs ──────────────────────────────────────────────

export async function listBatches(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Exclude batch enrollment codes from storefront public listings
    const { category } = req.query;
    const filter: any = {};
    if (category) {
      filter.category = category;
    }
    const batches = await Batch.find(filter).select('-code').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: batches,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    const batch = await Batch.findById(id).select('-code');
    if (!batch) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    let isEnrolled = false;
    
    // Check if client is authenticated and enrolled
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as any;
        if (payload && payload.sub) {
          const enrolment = await Enrolment.findOne({
            userId: new mongoose.Types.ObjectId(payload.sub),
            batchId: batch._id,
          });
          if (enrolment) {
            isEnrolled = true;
          }
        }
      } catch (err) {
        // Silent catch: token invalid/expired, default isEnrolled to false
      }
    }

    res.status(200).json({
      success: true,
      data: {
        ...batch.toJSON(),
        isEnrolled,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function createBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title, description, price, coverImage, category, batchCode, specialOfferTitle, offerPrice, offerExpiresAt } = req.body;

    // Use provided batchCode (mapping to code in model) or generate a random uppercase UUID
    const finalCode = (batchCode || crypto.randomUUID().split('-')[0]).toUpperCase().trim();

    // Check if code is already used
    const existingCode = await Batch.findOne({ code: finalCode });
    if (existingCode) {
      res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'A batch with this code already exists. Please provide a unique code.',
        },
      });
      return;
    }

    const newBatch = await Batch.create({
      title,
      description: description || '',
      price,
      coverImage,
      category,
      code: finalCode,
      specialOfferTitle: specialOfferTitle || '',
      offerPrice: offerPrice !== undefined ? offerPrice : undefined,
      offerExpiresAt: offerExpiresAt ? new Date(offerExpiresAt) : undefined,
    });

    res.status(201).json({
      success: true,
      data: newBatch,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { title, description, price, coverImage, category, batchCode, specialOfferTitle, offerPrice, offerExpiresAt } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    const batch = await Batch.findById(id);
    if (!batch) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    if (title !== undefined) batch.title = title;
    if (description !== undefined) batch.description = description;
    if (price !== undefined) batch.price = price;
    if (coverImage !== undefined) batch.coverImage = coverImage;
    if (category !== undefined) batch.category = category;
    if (specialOfferTitle !== undefined) batch.specialOfferTitle = specialOfferTitle;
    if (offerPrice !== undefined) batch.offerPrice = offerPrice;
    if (offerExpiresAt !== undefined) batch.offerExpiresAt = offerExpiresAt ? new Date(offerExpiresAt) : undefined;
    if (batchCode !== undefined) {
      const normalizedCode = batchCode.toUpperCase().trim();
      const duplicateCode = await Batch.findOne({ code: normalizedCode, _id: { $ne: batch._id } });
      if (duplicateCode) {
        res.status(409).json({
          success: false,
          error: { code: 'CONFLICT', message: 'Batch code already in use by another batch' },
        });
        return;
      }
      batch.code = normalizedCode;
    }

    await batch.save();

    res.status(200).json({
      success: true,
      data: batch,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    const batch = await Batch.findById(id);
    if (!batch) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    batch.isDeleted = true;
    await batch.save();

    res.status(200).json({
      success: true,
      data: { message: 'Batch soft deleted successfully' },
    });
  } catch (error) {
    next(error);
  }
}

export async function enrolByCode(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { batchId, batchCode } = req.body;

    const normalizedCode = batchCode.toUpperCase().trim();

    const batch = await Batch.findById(batchId);
    if (!batch || batch.code !== normalizedCode) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_CODE',
          message: 'The batch code provided is invalid or does not match this batch',
        },
      });
      return;
    }

    // Check duplicate enrolment
    const existingEnrolment = await Enrolment.findOne({ userId, batchId });
    if (existingEnrolment) {
      res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'You are already enrolled in this batch',
        },
      });
      return;
    }

    const enrolment = await Enrolment.create({
      userId,
      batchId,
      method: 'code',
      watchedLectures: [],
    });

    // Send confirmation email
    const user = await User.findById(userId);
    if (user) {
      await sendEnrollmentEmail(user.email, {
        name: user.name,
        batchTitle: batch.title,
        method: 'code',
      });
      await sendBatchEnrollmentAdminNotification({
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        batchTitle: batch.title,
        method: 'code',
      });
    }

    res.status(201).json({
      success: true,
      data: enrolment,
    });
  } catch (error) {
    next(error);
  }
}

export async function joinBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { id: batchId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(batchId)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    const batch = await Batch.findById(batchId);
    if (!batch) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    // Check duplicate enrolment
    const existingEnrolment = await Enrolment.findOne({ userId, batchId });
    if (existingEnrolment) {
      res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'You are already enrolled in this batch',
        },
      });
      return;
    }

    // Resolve active price (offer price if active, otherwise normal price)
    let activePrice = batch.price;
    if (batch.offerPrice !== undefined && batch.offerPrice !== null) {
      const now = new Date();
      if (!batch.offerExpiresAt || now < new Date(batch.offerExpiresAt)) {
        activePrice = batch.offerPrice;
      }
    }

    if (activePrice === 0) {
      // Free batch enrollment
      const enrolment = await Enrolment.create({
        userId,
        batchId,
        method: 'join',
        watchedLectures: [],
      });

      const user = await User.findById(userId);
      if (user) {
        await sendEnrollmentEmail(user.email, {
          name: user.name,
          batchTitle: batch.title,
          method: 'join',
        });
        await sendBatchEnrollmentAdminNotification({
          userName: user.name,
          userEmail: user.email,
          userPhone: user.phone,
          batchTitle: batch.title,
          method: 'join',
        });
      }

      res.status(201).json({
        success: true,
        data: {
          enrolment,
          paymentRequired: false,
        },
      });
      return;
    }

    // Generate Razorpay Order for Batch Purchase
    const razorpayOrder = await razorpayService.createRazorpayOrder(activePrice, batchId);

    res.status(200).json({
      success: true,
      data: {
        paymentRequired: true,
        batchId,
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

export async function verifyBatchPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { batchId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!mongoose.Types.ObjectId.isValid(batchId)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    const batch = await Batch.findById(batchId);
    if (!batch) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    // Verify payment signature
    const isValid = razorpayService.verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      res.status(400).json({
        success: false,
        error: {
          code: 'PAYMENT_VERIFICATION_FAILED',
          message: 'Payment signature verification failed',
        },
      });
      return;
    }

    // Check duplicate enrolment
    let enrolment = await Enrolment.findOne({ userId, batchId });
    if (!enrolment) {
      enrolment = await Enrolment.create({
        userId,
        batchId,
        method: 'payment',
        razorpayPaymentId,
        watchedLectures: [],
      });

      // Send confirmation emails
      const user = await User.findById(userId);
      if (user) {
        await sendEnrollmentEmail(user.email, {
          name: user.name,
          batchTitle: batch.title,
          method: 'payment',
        });
        await sendBatchEnrollmentAdminNotification({
          userName: user.name,
          userEmail: user.email,
          userPhone: user.phone,
          batchTitle: batch.title,
          method: 'payment',
        });
      }
    }

    res.status(200).json({
      success: true,
      data: enrolment,
    });
  } catch (error) {
    next(error);
  }
}


export async function getBatchEnrolments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    const enrolments = await Enrolment.find({ batchId: id }).populate('userId', 'name email phone');
    const totalLectures = await Lecture.countDocuments({ batchId: id, isDeleted: { $ne: true } });

    const data = enrolments.map((enr) => {
      const user = enr.userId as any;
      const watchedCount = enr.watchedLectures.length;
      const percent = totalLectures > 0 ? Math.round((watchedCount / totalLectures) * 100) : 0;
      return {
        userId: user?._id,
        userName: user?.name || 'Unknown User',
        email: user?.email || '',
        phone: user?.phone || '',
        watchedCount,
        totalLectures,
        percent,
        method: enr.method,
        createdAt: enr.createdAt,
      };
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

// ── PDF Notes APIs ──────────────────────────────────────────────────────────

export async function listBatchPdfs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { batchId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(batchId)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    const pdfs = await PdfNote.find({ batchId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: pdfs,
    });
  } catch (error) {
    next(error);
  }
}

export async function createPdfNote(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { batchId } = req.params;
    const { title, url, publicId, lectureId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(batchId)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    // Verify batch exists
    const batch = await Batch.findById(batchId);
    if (!batch) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    if (lectureId) {
      const lecture = await Lecture.findById(lectureId);
      if (!lecture) {
        res.status(400).json({
          success: false,
          error: { code: 'INVALID_REQUEST', message: 'Associated lecture not found' },
        });
        return;
      }
    }

    const newPdf = await PdfNote.create({
      batchId,
      lectureId: lectureId || null,
      title,
      url,
      publicId,
    });

    res.status(201).json({
      success: true,
      data: newPdf,
    });
  } catch (error) {
    next(error);
  }
}

export async function deletePdfNote(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'PDF Note not found' },
      });
      return;
    }

    const pdf = await PdfNote.findById(id);
    if (!pdf) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'PDF Note not found' },
      });
      return;
    }

    pdf.isDeleted = true;
    await pdf.save();

    // Call Cloudinary destroy API to delete resource from cloud
    try {
      await deleteFromCloudinary(pdf.publicId);
      logger.info(`☁️ Cloudinary file deleted: ${pdf.publicId}`);
    } catch (cloudinaryError) {
      logger.error(`❌ Failed to delete file ${pdf.publicId} from Cloudinary:`, cloudinaryError);
    }

    res.status(200).json({
      success: true,
      data: { message: 'PDF Note soft deleted and removed from storage' },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyEnrolments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const enrolments = await Enrolment.find({ userId }).populate('batchId');
    res.status(200).json({
      success: true,
      data: enrolments,
    });
  } catch (error) {
    next(error);
  }
}

export async function createAnnouncement(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const batch = await Batch.findById(id);
    if (!batch) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    if (!batch.announcements) {
      batch.announcements = [];
    }

    batch.announcements.unshift({ message, createdAt: new Date() } as any);
    await batch.save();

    res.status(201).json({
      success: true,
      data: {
        message: 'Notification sent successfully',
        announcement: batch.announcements[0],
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function listAnnouncements(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { batchId } = req.params;

    const batch = await Batch.findById(batchId).select('announcements title');
    if (!batch) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: batch.announcements || [],
    });
  } catch (error) {
    next(error);
  }
}
