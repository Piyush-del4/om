import Razorpay from 'razorpay';
import crypto from 'crypto';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { safeCompare } from '../utils/tokenCompare';

let razorpay: any = null;
const isMockEnvironment = !!(
  env.RAZORPAY_KEY_ID?.startsWith('rzp_test_placeholder') ||
  env.RAZORPAY_KEY_ID?.startsWith('rzp_test_dev') ||
  env.RAZORPAY_KEY_SECRET?.startsWith('placeholder')
);

const isConfigured = !!(
  env.RAZORPAY_KEY_ID &&
  env.RAZORPAY_KEY_SECRET &&
  !isMockEnvironment
);

if (isConfigured) {
  try {
    razorpay = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });
    logger.info('💳 Razorpay service configured successfully.');
  } catch (error) {
    logger.error('❌ Failed to initialize Razorpay client:', error);
  }
} else {
  logger.warn('💳 Razorpay keys missing or using development placeholders. Using MOCK payments service.');
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

/**
 * Creates a Razorpay order.
 * @param amountInPaise Amount to charge in lowest currency unit (e.g. paisa for INR)
 * @param receiptId Unique identifier for this order transaction receipt
 */
export async function createRazorpayOrder(amountInPaise: number, receiptId: string): Promise<RazorpayOrderResponse> {
  if (!isConfigured || !razorpay) {
    const mockOrderId = `order_mock_${crypto.randomBytes(8).toString('hex')}`;
    logger.debug(`[MOCK PAYMENTS] Creating order for ₹${(amountInPaise / 100).toFixed(2)} | Receipt: ${receiptId} | Mock ID: ${mockOrderId}`);
    return {
      id: mockOrderId,
      amount: amountInPaise,
      currency: 'INR',
      receipt: receiptId,
      status: 'created',
    };
  }

  try {
    const response = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: receiptId,
    });

    return {
      id: response.id,
      amount: response.amount,
      currency: response.currency,
      receipt: response.receipt,
      status: response.status,
    };
  } catch (error) {
    logger.error('❌ Failed to create order in Razorpay:', error);
    throw new Error('Razorpay order creation failed');
  }
}

/**
 * Verifies standard client payment signature.
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  clientSignature: string
): boolean {
  if (!isConfigured) {
    logger.debug(`[MOCK PAYMENTS] Verifying signature for mock order ${orderId}`);
    return orderId.startsWith('order_mock_');
  }

  try {
    const payload = `${orderId}|${paymentId}`;
    const generatedSignature = crypto
      .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
      .update(payload)
      .digest('hex');

    return safeCompare(generatedSignature, clientSignature);
  } catch (error) {
    logger.error('❌ Razorpay payment signature verification error:', error);
    return false;
  }
}

/**
 * Verifies webhook event payload signature using timing safe comparison.
 */
export function verifyWebhookSignature(payloadBody: string, requestSignature: string): boolean {
  if (!isConfigured || !env.RAZORPAY_WEBHOOK_SECRET) {
    logger.debug('[MOCK PAYMENTS] Verifying mock webhook signature');
    return true;
  }

  try {
    const generatedSignature = crypto
      .createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET)
      .update(payloadBody)
      .digest('hex');

    return safeCompare(generatedSignature, requestSignature);
  } catch (error) {
    logger.error('❌ Razorpay webhook signature verification error:', error);
    return false;
  }
}
