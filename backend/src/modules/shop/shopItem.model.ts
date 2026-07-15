import { Schema, model, Document } from 'mongoose';

export interface IShopItem extends Document {
  title: string;
  price: number; // in paise
  description?: string;
  imageUrl?: string;
  images?: string[];
  specialOfferTitle?: string;
  offerPrice?: number;
  offerExpiresAt?: Date;
  isDeleted: boolean;
  inStock: boolean;
  stockCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ShopItemSchema = new Schema<IShopItem>(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    images: { type: [String], default: [] },
    specialOfferTitle: { type: String, default: '' },
    offerPrice: { type: Number, min: 0 },
    offerExpiresAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, min: 0 },
  },
  { timestamps: true }
);

// Soft delete query helpers
ShopItemSchema.pre(/^find/, function (this: any, next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

export const ShopItem = model<IShopItem>('ShopItem', ShopItemSchema);
export default ShopItem;
