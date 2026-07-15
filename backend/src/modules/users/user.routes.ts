import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { validate } from '../../middleware/validate';
import * as userController from './user.controller';
import { changePasswordSchema } from '../auth/auth.schema';

export const userRouter = Router();

userRouter.get('/me', requireAuth, userController.getProfile);
userRouter.patch('/me', requireAuth, userController.updateProfile);
userRouter.post('/me/change-password', requireAuth, validate({ body: changePasswordSchema }), userController.changePassword);
userRouter.get('/me/export', requireAuth, userController.exportUserData);

export default userRouter;
