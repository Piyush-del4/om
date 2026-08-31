import { Request, Response } from 'express';
import { Notification } from './notification.model';
import { PushSubscription } from './pushSubscription.model';
import { User } from '../users/user.model';

export const getMyNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(30);

    const unreadCount = await Notification.countDocuments({ userId, isRead: false });

    res.status(200).json({
      success: true,
      data: {
        notifications,
        unreadCount,
      },
    });
  } catch (error: any) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications.' });
  }
};

export const markAllAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;

    await Notification.updateMany({ userId, isRead: false }, { isRead: true });

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read.',
    });
  } catch (error: any) {
    console.error('Error marking notifications read:', error);
    res.status(500).json({ success: false, message: 'Failed to update notifications.' });
  }
};

export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      res.status(404).json({ success: false, message: 'Notification not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error: any) {
    console.error('Error marking notification read:', error);
    res.status(500).json({ success: false, message: 'Failed to update notification.' });
  }
};

export const broadcastNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, message, link, type = 'offer' } = req.body;

    if (!title || !message) {
      res.status(400).json({ success: false, message: 'Title and message are required.' });
      return;
    }

    const allUsers = await User.find({}, '_id');
    const docs = allUsers.map((u) => ({
      userId: u._id,
      type,
      title,
      message,
      link,
      isRead: false,
    }));

    await Notification.insertMany(docs);

    res.status(201).json({
      success: true,
      message: `Broadcast sent to ${allUsers.length} users.`,
    });
  } catch (error: any) {
    console.error('Error broadcasting notification:', error);
    res.status(500).json({ success: false, message: 'Failed to broadcast notification.' });
  }
};

// Helper utility to create a system notification for a specific user
export const createUserNotification = async (
  userId: string,
  type: 'appointment' | 'order' | 'batch' | 'horoscope' | 'offer',
  title: string,
  message: string,
  link?: string
) => {
  try {
    await Notification.create({
      userId,
      type,
      title,
      message,
      link,
      isRead: false,
    });
  } catch (err) {
    console.error('Failed to create user notification:', err);
  }
};

export const subscribePush = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;
    const { endpoint, keys } = req.body;

    if (!endpoint || !keys) {
      res.status(400).json({ success: false, message: 'Invalid push subscription payload.' });
      return;
    }

    await PushSubscription.findOneAndUpdate(
      { endpoint },
      { userId, endpoint, keys },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Web push subscription registered successfully.',
    });
  } catch (error: any) {
    console.error('Error subscribing push:', error);
    res.status(500).json({ success: false, message: 'Failed to subscribe to web push.' });
  }
};
