import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { requireAdmin } from '../../middleware/requireAdmin';
import { requireEnrolment } from '../../middleware/requireEnrolment';
import { validate } from '../../middleware/validate';
import * as batchController from './batch.controller';
import * as schemas from './batch.schema';
import * as lectureController from '../lectures/lecture.controller';
import { createLectureSchema } from '../lectures/lecture.schema';

export const batchRouter = Router();

// Public storefront routes
batchRouter.get('/', batchController.listBatches);
batchRouter.get('/me/enrolments', requireAuth, batchController.getMyEnrolments);
batchRouter.get('/:id', batchController.getBatch);

// User enrollment by access code
batchRouter.post(
  '/enrol-by-code',
  requireAuth,
  validate({ body: schemas.enrolByCodeSchema }),
  batchController.enrolByCode
);

// User enrollment payment verification
batchRouter.post(
  '/verify',
  requireAuth,
  batchController.verifyBatchPayment
);

// User direct enrollment
batchRouter.post(
  '/:id/join',
  requireAuth,
  batchController.joinBatch
);


// User PDF notes (requires enrolment verification)
batchRouter.get(
  '/:batchId/pdfs',
  requireAuth,
  requireEnrolment,
  batchController.listBatchPdfs
);

// User Lectures (requires enrolment verification)
batchRouter.get(
  '/:batchId/lectures',
  requireAuth,
  requireEnrolment,
  lectureController.listLectures
);

// Admin controls
batchRouter.post(
  '/',
  requireAuth,
  requireAdmin,
  validate({ body: schemas.createBatchSchema }),
  batchController.createBatch
);

batchRouter.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  validate({ body: schemas.updateBatchSchema }),
  batchController.updateBatch
);

batchRouter.delete('/:id', requireAuth, requireAdmin, batchController.deleteBatch);

batchRouter.get('/:id/enrolments', requireAuth, requireAdmin, batchController.getBatchEnrolments);

batchRouter.post(
  '/:batchId/pdfs',
  requireAuth,
  requireAdmin,
  validate({ body: schemas.createPdfNoteSchema }),
  batchController.createPdfNote
);

batchRouter.post(
  '/:batchId/lectures',
  requireAuth,
  requireAdmin,
  validate({ body: createLectureSchema }),
  lectureController.createLecture
);

batchRouter.post(
  '/:id/announcements',
  requireAuth,
  requireAdmin,
  validate({ body: schemas.createAnnouncementSchema }),
  batchController.createAnnouncement
);

batchRouter.get(
  '/:batchId/announcements',
  requireAuth,
  requireEnrolment,
  batchController.listAnnouncements
);

export default batchRouter;
