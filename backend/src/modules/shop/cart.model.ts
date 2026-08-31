import { Schema, model, Document, Types } from 'mongoose';

export interface ICartItem {
  itemId: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];
  abandonedEmailSent?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  itemId: { type: Schema.Types.ObjectId, ref: 'ShopItem', required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
});

const CartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    items: [CartItemSchema],
    abandonedEmailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Cart = model<ICart>('Cart', CartSchema);
export default Cart;
