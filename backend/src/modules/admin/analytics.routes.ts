import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { requireAdmin } from '../../middleware/requireAdmin';
import * as analyticsController from './analytics.controller';

export const analyticsRouter = Router();

analyticsRouter.get('/revenue', requireAuth, requireAdmin, analyticsController.getRevenueAnalytics);
analyticsRouter.get('/export-csv', requireAuth, requireAdmin, analyticsController.exportAccountingCSV);

export default analyticsRouter;
