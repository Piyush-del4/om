import { Schema, model, Document, Types } from 'mongoose';

export interface IOrderItem {
  itemId: Types.ObjectId;
  title: string;
  quantity: number;
  price: number; // Price in paise at checkout
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number; // in paise
  status: 'pending' | 'paid' | 'failed' | 'shipped' | 'delivered';
  address: string;
  isDirectCheckout?: boolean;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  itemId: { type: Schema.Types.ObjectId, ref: 'ShopItem', required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'shipped', 'delivered'], default: 'pending', index: true },
    address: { type: String, required: true },
    isDirectCheckout: { type: Boolean, default: false },
    razorpayOrderId: { type: String, unique: true, sparse: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', OrderSchema);
export default Order;
