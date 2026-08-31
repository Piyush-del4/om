import mongoose, { Schema, Document } from 'mongoose';

export interface IHoroscope extends Document {
  date: string;
  data: Record<string, any>;
  createdAt: Date;
}

const HoroscopeSchema: Schema = new Schema({
  date: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' }
});

export default mongoose.models.Horoscope || mongoose.model<IHoroscope>('Horoscope', HoroscopeSchema);
