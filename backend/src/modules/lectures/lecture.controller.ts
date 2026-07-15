import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Lecture } from './lecture.model';
import { Enrolment } from '../batches/enrolment.model';
import { Batch } from '../batches/batch.model';
import { User } from '../users/user.model';

function extractYoutubeVideoId(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  
  if (match && match[2].length === 11) {
    return match[2];
  }
  
  const shortsRegExp = /\/shorts\/([a-zA-Z0-9_-]{11})/;
  const shortsMatch = trimmed.match(shortsRegExp);
  if (shortsMatch) {
    return shortsMatch[1];
  }

  return trimmed;
}

// ── Lecture User / Admin APIs ──────────────────────────────────────────────

export async function listLectures(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { batchId } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(batchId)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    const lectures = await Lecture.find({ batchId }).sort({ order: 1, createdAt: 1 });

    // Find enrolment to identify watched lectures
    const enrolment = await Enrolment.findOne({ userId, batchId });
    const watchedSet = new Set(
      enrolment?.watchedLectures?.map((id) => id.toString()) || []
    );

    const lecturesWithWatched = lectures.map((lecture) => {
      const isWatched = watchedSet.has(lecture._id.toString());
      return {
        _id: lecture._id,
        batchId: lecture.batchId,
        title: lecture.title,
        youtubeVideoId: lecture.youtubeVideoId,
        order: lecture.order,
        isWatched,
        createdAt: lecture.createdAt,
        updatedAt: lecture.updatedAt,
      };
    });

    res.status(200).json({
      success: true,
      data: lecturesWithWatched,
    });
  } catch (error) {
    next(error);
  }
}

export async function createLecture(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { batchId } = req.params;
    const { title, youtubeVideoId, order } = req.body;

    if (!mongoose.Types.ObjectId.isValid(batchId)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    // Verify batch exists
    const batch = await Batch.findById(batchId);
    if (!batch) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Batch not found' },
      });
      return;
    }

    const cleanVideoId = extractYoutubeVideoId(youtubeVideoId);
    const newLecture = await Lecture.create({
      batchId,
      title,
      youtubeVideoId: cleanVideoId,
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      data: newLecture,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateLecture(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { title, youtubeVideoId, order } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Lecture not found' },
      });
      return;
    }

    const lecture = await Lecture.findById(id);
    if (!lecture) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Lecture not found' },
      });
      return;
    }

    if (title !== undefined) lecture.title = title;
    if (youtubeVideoId !== undefined) {
      lecture.youtubeVideoId = extractYoutubeVideoId(youtubeVideoId);
    }
    if (order !== undefined) lecture.order = order;

    await lecture.save();

    res.status(200).json({
      success: true,
      data: lecture,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteLecture(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Lecture not found' },
      });
      return;
    }

    const lecture = await Lecture.findById(id);
    if (!lecture) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Lecture not found' },
      });
      return;
    }

    lecture.isDeleted = true;
    await lecture.save();

    res.status(200).json({
      success: true,
      data: { message: 'Lecture soft deleted successfully' },
    });
  } catch (error) {
    next(error);
  }
}

export async function getLecture(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Lecture not found' },
      });
      return;
    }

    const lecture = await Lecture.findById(id);
    if (!lecture) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Lecture not found' },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        _id: lecture._id,
        batchId: lecture.batchId,
        title: lecture.title,
        youtubeVideoId: lecture.youtubeVideoId,
      },
    });
  } catch (error) {
    next(error);
  }
}



export async function watchLecture(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Lecture not found' },
      });
      return;
    }

    const lecture = await Lecture.findById(id);
    if (!lecture) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Lecture not found' },
      });
      return;
    }

    const batchId = lecture.batchId;

    // Add lectureId to watchedLectures uniquely in database
    await Enrolment.updateOne(
      { userId, batchId },
      { $addToSet: { watchedLectures: lecture._id } }
    );

    // Retrieve enrollment watch progress stats
    const enrolment = await Enrolment.findOne({ userId, batchId });
    const watchedCount = enrolment?.watchedLectures?.length || 0;
    const totalLectures = await Lecture.countDocuments({ batchId, isDeleted: { $ne: true } });

    res.status(200).json({
      success: true,
      data: {
        watchedCount,
        totalLectures,
      },
    });
  } catch (error) {
    next(error);
  }
}
