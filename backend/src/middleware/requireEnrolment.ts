import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Enrolment } from '../modules/batches/enrolment.model';
import { Lecture } from '../modules/lectures/lecture.model';
import { PdfNote } from '../modules/batches/pdfNote.model';

export async function requireEnrolment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?._id;
    const role = req.user?.role;

    // Admin bypasses enrollment check
    if (role === 'admin') {
      return next();
    }

    if (!userId) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      });
      return;
    }

    let batchIdStr = req.params.batchId;

    // If batchId is not directly in route, check lectureId, noteId or standard id (depending on context)
    if (!batchIdStr) {
      const lectureId = req.params.lectureId || req.params.id;
      if (lectureId && mongoose.Types.ObjectId.isValid(lectureId)) {
        // Check if it's a lecture
        const lecture = await Lecture.findById(lectureId).select('batchId');
        if (lecture) {
          batchIdStr = lecture.batchId.toString();
        } else {
          // Check if it's a pdf note
          const pdfNote = await PdfNote.findById(lectureId).select('batchId');
          if (pdfNote) {
            batchIdStr = pdfNote.batchId.toString();
          }
        }
      }
    }

    if (!batchIdStr || !mongoose.Types.ObjectId.isValid(batchIdStr)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Resource or associated batch not found' },
      });
      return;
    }

    const enrolment = await Enrolment.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      batchId: new mongoose.Types.ObjectId(batchIdStr),
    });

    if (!enrolment) {
      res.status(403).json({
        success: false,
        error: { code: 'NOT_ENROLLED', message: 'Purchase this batch to access lectures' },
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
}
export default requireEnrolment;
