import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { requireAdmin } from '../../middleware/requireAdmin';
import * as notificationController from './notification.controller';

export const notificationRouter = Router();

// User notification routes
notificationRouter.get('/me', requireAuth, notificationController.getMyNotifications);
notificationRouter.patch('/read-all', requireAuth, notificationController.markAllAsRead);
notificationRouter.patch('/:id/read', requireAuth, notificationController.markAsRead);
notificationRouter.post('/push-subscribe', requireAuth, notificationController.subscribePush);

// Admin broadcast endpoint
notificationRouter.post('/broadcast', requireAuth, requireAdmin, notificationController.broadcastNotification);

export default notificationRouter;
