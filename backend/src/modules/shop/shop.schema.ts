import { z } from 'zod';

export const createShopItemSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(100)
    .trim(),
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, { message: 'Price cannot be negative' }), // in paise
  description: z
    .string()
    .optional()
    .default(''),
  imageUrl: z
    .string()
    .url({ message: 'Must be a valid URL format' })
    .optional()
    .or(z.literal('')), // Allows empty string or valid URL
  images: z
    .array(z.string().url({ message: 'Each image must be a valid URL' }))
    .optional()
    .default([]),
  specialOfferTitle: z.string().optional(),
  offerPrice: z.number().min(0).optional().nullable(),
  offerExpiresAt: z.string().optional().nullable(),
  inStock: z.boolean().optional().default(true),
  stockCount: z.number().int().min(0).optional().nullable(),
});

export const updateShopItemSchema = createShopItemSchema.partial();

export const directCheckoutSchema = z.object({
  itemId: z
    .string({ required_error: 'Item ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid MongoDB ObjectId format' }),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .int()
    .min(1, { message: 'Quantity must be at least 1' }),
  address: z
    .string({ required_error: 'Delivery address is required' })
    .min(5, { message: 'Address must be at least 5 characters' })
    .trim(),
  saveAsDefaultAddress: z.boolean().optional(),
});

export const addToCartSchema = z.object({
  itemId: z
    .string({ required_error: 'Item ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid MongoDB ObjectId format' }),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .int()
    .min(1, { message: 'Quantity must be at least 1' }),
});

export const checkoutSchema = z.object({
  address: z
    .string({ required_error: 'Delivery address is required' })
    .min(5, { message: 'Address must be at least 5 characters' })
    .trim(),
});

export const verifyPaymentSchema = z.object({
  razorpayOrderId: z.string({ required_error: 'Razorpay Order ID is required' }),
  razorpayPaymentId: z.string({ required_error: 'Razorpay Payment ID is required' }),
  razorpaySignature: z.string({ required_error: 'Razorpay Signature is required' }),
});
