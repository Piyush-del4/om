import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default('http://localhost:5001/api/v1'),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().min(1).default('rzp_test_placeholder'),
});

const clientEnv = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
};

const parsed = envSchema.safeParse(clientEnv);

if (!parsed.success) {
  console.error('❌ Invalid Frontend env:', parsed.error.flatten().fieldErrors);
  // Don't throw during SSR to prevent build failures, fallback to defaults
}

export const env = parsed.success ? parsed.data : {
  NEXT_PUBLIC_API_BASE_URL: 'http://localhost:5001/api/v1',
  NEXT_PUBLIC_RAZORPAY_KEY_ID: 'rzp_test_placeholder',
};
