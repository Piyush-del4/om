import { Schema, model, Document } from 'mongoose';

export interface IAnnouncement {
  message: string;
  createdAt: Date;
}

export interface IBatch extends Document {
  title: string;
  description?: string;
  code: string; // unique enrollment access code
  price: number; // in paise
  coverImage?: {
    url: string;
    publicId: string;
  };
  category: 'Astrology' | 'Numerology' | 'Tarot Card' | 'Graphology';
  specialOfferTitle?: string;
  offerPrice?: number;
  offerExpiresAt?: Date;
  isDeleted: boolean;
  announcements?: IAnnouncement[];
  createdAt: Date;
  updatedAt: Date;
}

const BatchSchema = new Schema<IBatch>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    coverImage: {
      url: { type: String, required: true },
      publicId: { type: String, required: true }
    },
    category: {
      type: String,
      enum: ['Astrology', 'Numerology', 'Tarot Card', 'Graphology'],
      default: 'Astrology',
      required: true
    },
    specialOfferTitle: { type: String, default: '' },
    offerPrice: { type: Number, min: 0 },
    offerExpiresAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    announcements: [
      {
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ],
  },
  { timestamps: true }
);

// Soft delete query helpers
BatchSchema.pre(/^find/, function (this: any, next) {
  // @ts-ignore: Mongoose Query type mismatch fix
  this.where({ isDeleted: { $ne: true } });
  next();
});

export const Batch = model<IBatch>('Batch', BatchSchema);
export default Batch;
