import { z } from 'zod';

export const createBatchSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(100)
    .trim(),
  description: z.string().optional().default(''),
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, { message: 'Price cannot be negative' }), // in paise
  coverImage: z.object({
    url: z.string().url({ message: 'Cover image URL must be a valid URL' }),
    publicId: z.string({ required_error: 'Cover image public ID is required' }),
  }),
  category: z.enum(['Astrology', 'Numerology', 'Tarot Card', 'Graphology'], {
    required_error: 'Category is required',
  }),
  batchCode: z.string().optional(),
  specialOfferTitle: z.string().optional(),
  offerPrice: z.number().min(0).optional().nullable(),
  offerExpiresAt: z.string().optional().nullable(),
});

export const updateBatchSchema = z.object({
  title: z.string().min(2).max(100).trim().optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  coverImage: z
    .object({
      url: z.string().url(),
      publicId: z.string(),
    })
    .optional(),
  category: z.enum(['Astrology', 'Numerology', 'Tarot Card', 'Graphology']).optional(),
  batchCode: z.string().optional(),
  specialOfferTitle: z.string().optional(),
  offerPrice: z.number().min(0).optional().nullable(),
  offerExpiresAt: z.string().optional().nullable(),
});

export const enrolByCodeSchema = z.object({
  batchId: z
    .string({ required_error: 'Batch ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid MongoDB ObjectId format' }),
  batchCode: z
    .string({ required_error: 'Batch code is required' })
    .min(1, { message: 'Batch code cannot be empty' })
    .trim(),
});

export const createPdfNoteSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, { message: 'Title cannot be empty' })
    .trim(),
  url: z.string({ required_error: 'PDF URL is required' }).url({ message: 'Must be a valid URL' }),
  publicId: z.string({ required_error: 'Cloudinary public ID is required' }),
  lectureId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid MongoDB ObjectId format' })
    .optional()
    .nullable(),
});

export const createAnnouncementSchema = z.object({
  message: z
    .string({ required_error: 'Notification message is required' })
    .min(1, { message: 'Notification message cannot be empty' })
    .trim(),
});
