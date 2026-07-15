import { Schema, model, Document } from 'mongoose';

export interface IDefaultAddress {
  country: string;
  fullName: string;
  phone: string;
  flatHouse: string;
  areaStreet: string;
  landmark: string;
  pincode: string;
  townCity: string;
  state: string;
  deliveryInstructions?: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  phone?: string;
  failedLoginAttempts: number;
  lockUntil?: Date;
  defaultAddress?: IDefaultAddress;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    phone: { type: String, default: '' },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    defaultAddress: {
      country: { type: String, default: 'India' },
      fullName: { type: String, default: '' },
      phone: { type: String, default: '' },
      flatHouse: { type: String, default: '' },
      areaStreet: { type: String, default: '' },
      landmark: { type: String, default: '' },
      pincode: { type: String, default: '' },
      townCity: { type: String, default: '' },
      state: { type: String, default: '' },
      deliveryInstructions: { type: String, default: '' }
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Soft delete query helpers
UserSchema.pre(/^find/, function (this: any, next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

export const User = model<IUser>('User', UserSchema);
export default User;
