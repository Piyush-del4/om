import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { requireAdmin } from '../../middleware/requireAdmin';
import { deletePdfNote } from './batch.controller';

export const pdfRouter = Router();

pdfRouter.delete('/:id', requireAuth, requireAdmin, deletePdfNote);

export default pdfRouter;
