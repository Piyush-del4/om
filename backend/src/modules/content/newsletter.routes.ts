import { Router } from 'express';
import { subscribeNewsletter } from './newsletter.controller';

export const newsletterRouter = Router();

newsletterRouter.post('/subscribe', subscribeNewsletter);

export default newsletterRouter;
