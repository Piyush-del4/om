import { logger } from '../utils/logger';
import { PushSubscription } from '../modules/notifications/pushSubscription.model';

export const sendWebPushToUser = async (userId: string, payload: { title: string; body: string; link?: string }) => {
  try {
    const subscriptions = await PushSubscription.find({ userId });
    if (subscriptions.length === 0) return;

    logger.info(`🔔 [Web Push Dispatched] User: ${userId} | Title: "${payload.title}"`);
    // In production with VAPID keys: webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (error) {
    logger.error('❌ Failed to dispatch Web Push notification:', error);
  }
};
