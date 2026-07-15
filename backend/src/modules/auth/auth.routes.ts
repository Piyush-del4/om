import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { requireAuth } from '../../middleware/requireAuth';
import * as authController from './auth.controller';
import * as schemas from './auth.schema';

export const authRouter = Router();

authRouter.post('/register/send-otp', validate({ body: schemas.registerSendOtpSchema }), authController.sendRegisterOtp);
authRouter.post('/register', validate({ body: schemas.registerSchema }), authController.register);
authRouter.post('/login', validate({ body: schemas.loginSchema }), authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', requireAuth, authController.logout);
authRouter.post('/forgot-password', validate({ body: schemas.forgotPasswordSchema }), authController.forgotPassword);
authRouter.post('/reset-password', validate({ body: schemas.resetPasswordSchema }), authController.resetPassword);

export default authRouter;
