import mongoose, { Schema, Document } from 'mongoose';

export interface IKundliSubmission extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  date: string;
  time: string;
  location: string;
  country?: string;
  latitude: number;
  longitude: number;
  timezone: number;
  createdAt: Date;
}

const KundliSubmissionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, default: 'India' },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timezone: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.KundliSubmission || mongoose.model<IKundliSubmission>('KundliSubmission', KundliSubmissionSchema);
