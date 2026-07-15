import { Schema, model, Document, Types } from 'mongoose';

export interface ILecture extends Document {
  batchId: Types.ObjectId;
  title: string;
  youtubeVideoId: string;
  order: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LectureSchema = new Schema<ILecture>(
  {
    batchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true, index: true },
    title: { type: String, required: true, trim: true },
    youtubeVideoId: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Soft delete query helper
LectureSchema.pre(/^find/, function (this: any, next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

export const Lecture = model<ILecture>('Lecture', LectureSchema);
export default Lecture;
