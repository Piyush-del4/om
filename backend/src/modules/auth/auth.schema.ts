import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

const passwordValidation = z
  .string({ required_error: 'Password is required' })
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(passwordRegex, { message: 'Password must contain at least 1 uppercase letter and 1 number' });

export const registerSendOtpSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(80, { message: 'Name cannot exceed 80 characters' })
    .trim(),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address format' })
    .toLowerCase()
    .trim(),
  password: passwordValidation,
  phone: z
    .string({ required_error: 'Phone number is required' })
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number cannot exceed 15 digits' })
    .refine(
      (val) => /^[6-9]\d{9}$/.test(val),
      { message: 'Invalid Indian mobile number format' }
    ),
});

export const registerSchema = registerSendOtpSchema.extend({
  otp: z
    .string({ required_error: 'OTP is required' })
    .min(6, { message: 'OTP must be 6 digits' })
    .max(6, { message: 'OTP must be 6 digits' }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address format' })
    .toLowerCase()
    .trim(),
  password: z.string({ required_error: 'Password is required' }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address format' })
    .toLowerCase()
    .trim(),
});

export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address format' })
    .toLowerCase()
    .trim(),
  otp: z
    .string({ required_error: 'OTP is required' })
    .min(6, { message: 'OTP must be 6 digits' })
    .max(6, { message: 'OTP must be 6 digits' }),
  newPassword: passwordValidation,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string({ required_error: 'Current password is required' }),
  newPassword: passwordValidation,
});
