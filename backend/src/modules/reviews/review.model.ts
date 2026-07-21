import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
  name: string;
  rating: number; // 1 to 5
  comment: string;
  isApproved: boolean; // For future moderation if needed
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: true }, // Auto-approve for now, can be changed later
  },
  { timestamps: true }
);

export const Review = model<IReview>('Review', ReviewSchema);
export default Review;
