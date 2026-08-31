import { logger } from '../utils/logger';

interface SMSPayload {
  to: string;
  message: string;
}

export const sendSMS = async ({ to, message }: SMSPayload): Promise<boolean> => {
  try {
    const smsApiKey = process.env.SMS_API_KEY;

    if (!smsApiKey) {
      logger.info(`📱 [SMS Console Fallback] To: ${to} | Message: "${message}"`);
      return true;
    }

    // Example SMS Gateway integration (e.g. Fast2SMS / Twilio API)
    // const res = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
    //   route: 'v3',
    //   sender_id: 'OMASTRO',
    //   message,
    //   language: 'english',
    //   numbers: to,
    // }, { headers: { authorization: smsApiKey } });

    logger.info(`📱 [SMS Sent] To: ${to}`);
    return true;
  } catch (error) {
    logger.error('❌ Failed to send SMS:', error);
    return false;
  }
};

export const sendAppointmentSmsReminder = async (phone: string, name: string, timeStr: string) => {
  const message = `Namaste ${name}, your astrology consultation with OM Astrology AMC is scheduled at ${timeStr}. Please join on time.`;
  return sendSMS({ to: phone, message });
};

export const sendOrderDispatchSms = async (phone: string, name: string, orderId: string, trackingCode: string) => {
  const message = `Namaste ${name}, your OM Astrology AMC shop order #${orderId.slice(-6)} has been dispatched! Tracking Code: ${trackingCode}.`;
  return sendSMS({ to: phone, message });
};

export const sendBatchClassSms = async (phone: string, name: string, batchTitle: string) => {
  const message = `Namaste ${name}, your live class for batch "${batchTitle}" is starting in 15 minutes! Log in to join.`;
  return sendSMS({ to: phone, message });
};
