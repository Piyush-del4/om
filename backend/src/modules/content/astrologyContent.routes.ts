import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { requireAdmin } from '../../middleware/requireAdmin';
import * as contentController from './astrologyContent.controller';

export const astrologyContentRouter = Router();

// Public
astrologyContentRouter.get('/houses', contentController.listHouses);
astrologyContentRouter.get('/grahas', contentController.listGrahas);
astrologyContentRouter.get('/faqs', contentController.listFAQs);

// Admin — one-time seed
astrologyContentRouter.post('/seed', requireAuth, requireAdmin, contentController.seedAstrologyContent);

// Admin — FAQ management
astrologyContentRouter.post('/faqs', requireAuth, requireAdmin, contentController.createFAQ);
astrologyContentRouter.patch('/faqs/:id', requireAuth, requireAdmin, contentController.updateFAQ);
astrologyContentRouter.delete('/faqs/:id', requireAuth, requireAdmin, contentController.deleteFAQ);

export default astrologyContentRouter;
