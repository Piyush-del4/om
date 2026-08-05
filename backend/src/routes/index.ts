import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { userRouter } from '../modules/users/user.routes';
import { appointmentRouter } from '../modules/appointments/appointment.routes';
import { shopRouter } from '../modules/shop/shop.routes';
import { batchRouter } from '../modules/batches/batch.routes';
import { lectureRouter } from '../modules/lectures/lecture.routes';
import { pdfRouter } from '../modules/batches/pdfNote.routes';
import { uploadRouter } from '../modules/uploads/upload.routes';
import { teamRouter } from '../modules/team/team.routes';
import { astrologyContentRouter } from '../modules/content/astrologyContent.routes';
import { reviewRouter } from '../modules/reviews/review.routes';
import { paymentRouter } from '../modules/payments/payment.routes';
import astrologyRoutes from './astrologyRoutes';

export const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/appointments', appointmentRouter);
router.use('/shop', shopRouter);
router.use('/batches', batchRouter);
router.use('/lectures', lectureRouter);
router.use('/pdfs', pdfRouter);
router.use('/uploads', uploadRouter);
router.use('/team', teamRouter);
router.use('/content/astrology', astrologyContentRouter);
router.use('/reviews', reviewRouter);
router.use('/payments', paymentRouter);
router.use('/astrology', astrologyRoutes);

// Base router welcome message
router.get('/', (_, res) => {
  res.json({
    success: true,
    message: 'Welcome to OM Astrology AMC API v1',
  });
});

