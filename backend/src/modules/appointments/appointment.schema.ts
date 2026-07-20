import { z } from 'zod';

export const createAppointmentTypeSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100)
    .trim(),
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, { message: 'Price cannot be negative' }), // in paise
  duration: z
    .number({ required_error: 'Duration is required' })
    .min(5, { message: 'Duration must be at least 5 minutes' }), // in minutes
  description: z
    .string()
    .optional()
    .default(''),
  imageUrl: z
    .string()
    .optional()
    .default(''),
  category: z.enum(['Astrology', 'Numerology', 'Tarot Card', 'Graphology'], {
    required_error: 'Category is required',
  }),
  specialOfferTitle: z.string().optional(),
  offerPrice: z.number().min(0).optional().nullable(),
  offerExpiresAt: z.string().optional().nullable(),
});

export const updateAppointmentTypeSchema = createAppointmentTypeSchema.partial();

export const createAppointmentSchema = z.object({
  appointmentTypeId: z
    .string({ required_error: 'Appointment type ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid MongoDB ObjectId format' }),
  scheduledAt: z
    .string({ required_error: 'Scheduled date and time is required' })
    .datetime({ message: 'Must be a valid ISO 8601 datetime string' })
    .refine((val) => new Date(val) > new Date(), { message: 'Appointment date must be in the future' }),
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be pending, confirmed, or cancelled',
  }),
});

export const getSlotsSchema = z.object({
  date: z
    .string({ required_error: 'Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' })
    .refine(
      (val) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(val) >= today;
      },
      { message: 'Date must be today or in the future' }
    ),
  duration: z
    .string({ required_error: 'Duration is required' })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 5, { message: 'Duration must be a number >= 5' }),
});

export const createBlockedSlotSchema = z.object({
  startDate: z
    .string({ required_error: 'Start date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'startDate must be YYYY-MM-DD' }),
  endDate: z
    .string({ required_error: 'End date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'endDate must be YYYY-MM-DD' }),
  startTime: z
    .string({ required_error: 'Start time is required' })
    .datetime({ message: 'startTime must be a valid ISO 8601 datetime' }),
  endTime: z
    .string({ required_error: 'End time is required' })
    .datetime({ message: 'endTime must be a valid ISO 8601 datetime' }),
  label: z.string().max(80).optional(),
}).refine((data) => data.endDate >= data.startDate, {
  message: 'End date must be on or after start date',
  path: ['endDate'],
});
