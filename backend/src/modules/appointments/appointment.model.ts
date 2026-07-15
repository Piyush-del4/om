import { Schema, model, Document, Types } from 'mongoose';

export interface IAppointment extends Document {
  userId: Types.ObjectId;
  appointmentTypeId: Types.ObjectId;
  typeName: string; // cached name
  pricePaid: number; // in paise
  duration: number; // in minutes
  scheduledAt: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  googleCalendarEventId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    appointmentTypeId: { type: Schema.Types.ObjectId, ref: 'AppointmentType', required: true },
    typeName: { type: String, required: true },
    pricePaid: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true, min: 5 },
    scheduledAt: { type: Date, required: true, index: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    googleCalendarEventId: { type: String },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Soft delete query helpers
AppointmentSchema.pre(/^find/, function (this: any, next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

export const Appointment = model<IAppointment>('Appointment', AppointmentSchema);
export default Appointment;
