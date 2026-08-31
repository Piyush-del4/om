import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Load env variables during development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}

const envSchema = z.object({
  NODE_ENV:                           z.enum(['development', 'production', 'test']),
  PORT:                               z.string().transform(Number).default('5000'),
  MONGODB_URI:                        z.string().min(1),
  JWT_ACCESS_SECRET:                  z.string().min(32),
  JWT_REFRESH_SECRET:                 z.string().min(32),
  JWT_ACCESS_EXPIRES_IN:              z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN:             z.string().default('7d'),
  CLIENT_URL:                         z.string().url(),
  CORS_ORIGINS:                       z.string(),
  ENCRYPTION_KEY:                     z.string().length(64),
  SMTP_HOST:                          z.string().optional().default(''),
  SMTP_PORT:                          z.string().optional().transform(val => val ? Number(val) : 587),
  SMTP_USER:                          z.string().optional().default(''),
  SMTP_PASS:                          z.string().optional().default(''),
  EMAIL_FROM:                         z.string().optional().default('noreply@omastrologyamc.com'),
  RAZORPAY_KEY_ID:                    z.string().min(1),
  RAZORPAY_KEY_SECRET:                z.string().min(1),
  RAZORPAY_WEBHOOK_SECRET:            z.string().min(1),
  GOOGLE_SERVICE_ACCOUNT_EMAIL:       z.string().optional().default(''),
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string().optional().default(''),
  GOOGLE_CALENDAR_ID:                 z.string().optional().default(''),
  CLOUDINARY_CLOUD_NAME:              z.string().min(1),
  CLOUDINARY_API_KEY:                 z.string().min(1),
  CLOUDINARY_API_SECRET:              z.string().min(1),
  SENTRY_DSN:                         z.string().optional().default(''),
  FREE_ASTROLOGY_API_KEY:             z.string().optional().default(''),
  FREE_ASTRO_DASHA_API_KEY:         z.string().optional().default(''),
  GEMINI_API_KEY:                     z.string().optional().default(''),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables configuration:');
  console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
  process.exit(1); // Crash immediately on startup if configuration is wrong
}

export const env = parsed.data;
