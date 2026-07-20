import { Schema, model, Document } from 'mongoose';

export interface IAppointmentType extends Document {
  name: string;
  price: number; // in paise
  duration: number; // in minutes
  description?: string;
  imageUrl?: string;
  category: 'Astrology' | 'Numerology' | 'Tarot Card' | 'Graphology';
  specialOfferTitle?: string;
  offerPrice?: number;
  offerExpiresAt?: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentTypeSchema = new Schema<IAppointmentType>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true, min: 5 },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    category: {
      type: String,
      required: true,
      enum: ['Astrology', 'Numerology', 'Tarot Card', 'Graphology'],
      default: 'Astrology',
    },
    specialOfferTitle: { type: String, default: '' },
    offerPrice: { type: Number, min: 0 },
    offerExpiresAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Soft delete query helpers
AppointmentTypeSchema.pre(/^find/, function (this: any, next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

export const AppointmentType = model<IAppointmentType>('AppointmentType', AppointmentTypeSchema);
export default AppointmentType;
