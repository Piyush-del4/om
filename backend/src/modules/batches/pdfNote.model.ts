import { Schema, model, Document, Types } from 'mongoose';

export interface IPdfNote extends Document {
  batchId: Types.ObjectId;
  lectureId?: Types.ObjectId;
  title: string;
  url: string;
  publicId: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PdfNoteSchema = new Schema<IPdfNote>(
  {
    batchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true, index: true },
    lectureId: { type: Schema.Types.ObjectId, ref: 'Lecture', default: null },
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Soft delete query helper
PdfNoteSchema.pre(/^find/, function (this: any, next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

export const PdfNote = model<IPdfNote>('PdfNote', PdfNoteSchema);
export default PdfNote;
