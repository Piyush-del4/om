import { Schema, model, Document } from 'mongoose';

export interface IBlockedSlot extends Document {
  startDate: string;    // YYYY-MM-DD (IST) — first day of the block
  endDate:   string;    // YYYY-MM-DD (IST) — last day of the block (inclusive)
  startTime: Date;      // UTC ISO — exact start datetime
  endTime:   Date;      // UTC ISO — exact end datetime
  label:     string;    // Admin note e.g. "Lunch", "Holiday"
  createdAt: Date;
  updatedAt: Date;
}

const BlockedSlotSchema = new Schema<IBlockedSlot>(
  {
    startDate: { type: String, required: true, index: true },
    endDate:   { type: String, required: true, index: true },
    startTime: { type: Date, required: true },
    endTime:   { type: Date, required: true },
    label:     { type: String, default: 'Blocked' },
  },
  { timestamps: true }
);

export const BlockedSlot = model<IBlockedSlot>('BlockedSlot', BlockedSlotSchema);
export default BlockedSlot;
