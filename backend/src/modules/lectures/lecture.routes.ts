import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { requireAdmin } from '../../middleware/requireAdmin';
import { requireEnrolment } from '../../middleware/requireEnrolment';
import { validate } from '../../middleware/validate';
import * as lectureController from './lecture.controller';
import * as schemas from './lecture.schema';

export const lectureRouter = Router();

// Enrolled student routes
lectureRouter.get(
  '/:id',
  requireAuth,
  requireEnrolment,
  lectureController.getLecture
);



lectureRouter.patch(
  '/:id/watched',
  requireAuth,
  requireEnrolment,
  lectureController.watchLecture
);

// Admin controls
lectureRouter.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  validate({ body: schemas.updateLectureSchema }),
  lectureController.updateLecture
);

lectureRouter.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  lectureController.deleteLecture
);

export default lectureRouter;
