import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import * as paymentController from './payment.controller';

export const paymentRouter = Router();

paymentRouter.post('/kundli-order', requireAuth, paymentController.createKundliOrder);
paymentRouter.post('/kundli-verify', requireAuth, paymentController.verifyKundliPayment);

export default paymentRouter;
