import { Schema, model, Document, Types } from 'mongoose';

export interface IWishlist extends Document {
  userId: Types.ObjectId;
  shopItemId: Types.ObjectId;
  baselinePrice: number;
  createdAt: Date;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    shopItemId: { type: Schema.Types.ObjectId, ref: 'ShopItem', required: true },
    baselinePrice: { type: Number, required: true },
  },
  { timestamps: true }
);

// Ensure unique (userId, shopItemId)
WishlistSchema.index({ userId: 1, shopItemId: 1 }, { unique: true });

export const Wishlist = model<IWishlist>('Wishlist', WishlistSchema);
export default Wishlist;
