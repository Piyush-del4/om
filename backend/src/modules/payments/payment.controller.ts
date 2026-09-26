import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { env } from '../../config/env';
import { logger } from '../../utils/logger';
import * as razorpayService from '../../services/razorpay.service';

export async function createKundliOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { amount } = req.body as { amount: number };

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      });
      return;
    }

    // Enforce server-side pricing to prevent client-side parameter tampering
    // Standard Kundli Premium price is fixed at ₹50 (5000 paise) or looked up via tier
    const KUNDLI_PREMIUM_PRICE_PAISE = 5000;
    const amountInPaise = KUNDLI_PREMIUM_PRICE_PAISE;

    // Truncate userId to last 12 chars to avoid leaking full MongoDB IDs
    const userIdStr = userId.toString();
    const truncatedUserId = userIdStr.length > 12 ? userIdStr.slice(-12) : userIdStr;
    const receiptId = `kundli_${truncatedUserId}_${Date.now()}`;
    try {
      const razorpayOrder = await razorpayService.createRazorpayOrder(amountInPaise, receiptId);
      res.status(200).json({
        success: true,
        data: {
          orderId: razorpayOrder.id,
          razorpayOrderId: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          key: env.RAZORPAY_KEY_ID,
        },
      });
    } catch (orderError) {
      // Fallback to mock order ONLY in development mode (e.g., when live keys are missing/invalid locally)
      if (env.NODE_ENV === 'development') {
        logger.warn('⚠️ Razorpay order creation failed, falling back to mock order in development mode:', orderError);
        const mockOrderId = `order_mock_${crypto.randomBytes(8).toString('hex')}`;
        res.status(200).json({
          success: true,
          data: {
            orderId: mockOrderId,
            razorpayOrderId: mockOrderId,
            amount: amountInPaise,
            currency: 'INR',
            key: env.RAZORPAY_KEY_ID,
          },
        });
      } else {
        logger.error('❌ Razorpay order creation failed in production:', orderError);
        throw orderError;
      }
    }
  } catch (error) {
    next(error);
  }
}

export async function verifyKundliPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body as {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    };

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      });
      return;
    }

    // Input validation: ensure all required fields are non-empty
    if (!razorpayOrderId || typeof razorpayOrderId !== 'string' || razorpayOrderId.trim() === '') {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ORDER_ID',
          message: 'razorpayOrderId is required and must be a non-empty string',
        },
      });
      return;
    }
    if (!razorpayPaymentId || typeof razorpayPaymentId !== 'string' || razorpayPaymentId.trim() === '') {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_PAYMENT_ID',
          message: 'razorpayPaymentId is required and must be a non-empty string',
        },
      });
      return;
    }
    if (!razorpaySignature || typeof razorpaySignature !== 'string' || razorpaySignature.trim() === '') {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_SIGNATURE',
          message: 'razorpaySignature is required and must be a non-empty string',
        },
      });
      return;
    }

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

    res.status(200).json({
      success: true,
      data: {
        verified: true,
        message: 'Premium kundli payment verified successfully',
      },
    });
  } catch (error) {
    next(error);
  }
}
