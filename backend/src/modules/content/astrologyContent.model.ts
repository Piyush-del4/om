import { Schema, model, Document } from 'mongoose';

// ── House ────────────────────────────────────────────────────────────────────

export interface IHouse extends Document {
  num: string;    // e.g. "1st"
  name: string;   // e.g. "Lagna (Self)"
  desc: string;
  order: number;
}

const HouseSchema = new Schema<IHouse>(
  {
    num: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const House = model<IHouse>('House', HouseSchema);

// ── Graha (Planet) ───────────────────────────────────────────────────────────

export interface IGraha extends Document {
  name: string;   // e.g. "Surya (Sun)"
  sign: string;   // e.g. "Soul & Authority"
  desc: string;
  order: number;
}

const GrahaSchema = new Schema<IGraha>(
  {
    name: { type: String, required: true },
    sign: { type: String, required: true },
    desc: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Graha = model<IGraha>('Graha', GrahaSchema);

// ── FAQ ──────────────────────────────────────────────────────────────────────

export interface IFAQ extends Document {
  category: string; // e.g. "Astrology", "Numerology"
  q: string;
  a: string;
  order: number;
}

const FAQSchema = new Schema<IFAQ>(
  {
    category: { type: String, required: true, index: true },
    q: { type: String, required: true },
    a: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const FAQ = model<IFAQ>('FAQ', FAQSchema);
