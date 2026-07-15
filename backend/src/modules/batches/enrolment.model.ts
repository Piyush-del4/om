import { Schema, model, Document, Types } from 'mongoose';

export interface IEnrolment extends Document {
  userId: Types.ObjectId;
  batchId: Types.ObjectId;
  method: 'payment' | 'code' | 'join';
  razorpayPaymentId?: string;
  watchedLectures: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const EnrolmentSchema = new Schema<IEnrolment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    batchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
    method: { type: String, enum: ['payment', 'code', 'join'], required: true },
    razorpayPaymentId: { type: String },
    watchedLectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
  },
  { timestamps: true }
);

// Prevent duplicate enrolments
EnrolmentSchema.index({ userId: 1, batchId: 1 }, { unique: true });

export const Enrolment = model<IEnrolment>('Enrolment', EnrolmentSchema);
export default Enrolment;
