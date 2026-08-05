'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { client } from '../../lib/api/client';
import { GoldButton } from '../../components/ui/GoldButton';
import { GoldCard } from '../../components/ui/GoldCard';
import { Mail, Lock, Key, AlertCircle, CheckCircle } from 'lucide-react';

const forgotPasswordSchema = z.object({
 email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

const resetPasswordSchema = z.object({
 otp: z.string().min(6, 'OTP must be exactly 6 digits').max(6, 'OTP must be exactly 6 digits'),
 newPassword: z.string().min(8, 'Password must be at least 8 characters long').regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter').regex(/[0-9]/, 'Password must contain at least 1 number'),
 confirmNewPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
 message: 'Passwords must match',
 path: ['confirmNewPassword'],
});

type ForgotFields = z.infer<typeof forgotPasswordSchema>;
type ResetFields = z.infer<typeof resetPasswordSchema>;

export default function ForgotPasswordPage() {
 const router = useRouter();
 const [step, setStep] = useState<1 | 2>(1);
 const [email, setEmail] = useState('');
 const [errorMsg, setErrorMsg] = useState('');
 const [successMsg, setSuccessMsg] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);

 // Form 1: Request OTP
 const forgotForm = useForm<ForgotFields>({
 resolver: zodResolver(forgotPasswordSchema),
 });

 // Form 2: Reset Password
 const resetForm = useForm<ResetFields>({
 resolver: zodResolver(resetPasswordSchema),
 });

 const handleRequestOtp = async (data: ForgotFields) => {
 setErrorMsg('');
 setSuccessMsg('');
 setIsSubmitting(true);
 try {
 const res = await client.post('/auth/forgot-password', { email: data.email });
 if (res.data?.success) {
 setEmail(data.email);
 setSuccessMsg(res.data.data?.message || 'If an account exists, an OTP has been sent.');
 setStep(2);
 }
 } catch (err: any) {
 setErrorMsg(err.response?.data?.error?.message || 'Failed to request reset OTP. Please try again.');
 } finally {
 setIsSubmitting(false);
 }
 };

 const handleResetPassword = async (data: ResetFields) => {
 setErrorMsg('');
 setSuccessMsg('');
 setIsSubmitting(true);
 try {
 const res = await client.post('/auth/reset-password', {
 email,
 otp: data.otp,
 newPassword: data.newPassword,
 });
 if (res.data?.success) {
 setSuccessMsg('Password reset successful! Redirecting to login...');
 setTimeout(() => {
 router.push('/login');
 }, 2000);
 }
 } catch (err: any) {
 setErrorMsg(err.response?.data?.error?.message || 'Failed to reset password. Please verify the OTP.');
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-white text-gray-900 relative">
 <div className="absolute w-72 h-72 rounded-full bg-[var(--gold-50)] blur-3xl pointer-events-none opacity-40"></div>

 <GoldCard className="w-full max-w-md border border-[var(--gold-200)] relative z-10 p-8 space-y-6">
 <div className="text-center space-y-2">
 <h1 className="font-serif text-3xl font-bold tracking-wide text-gray-900">Reset Password</h1>
 <p className="text-xs text-gray-600">
 {step === 1 
 ? 'Enter your registered email address to receive a 6-digit recovery OTP.'
 : `Enter the 6-digit code sent to ${email} along with your new password.`
 }
 </p>
 </div>

 {errorMsg && (
 <div className="flex items-center gap-2 text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-lg text-xs">
 <AlertCircle className="w-4 h-4 flex-shrink-0" />
 <span>{errorMsg}</span>
 </div>
 )}

 {successMsg && (
 <div className="flex items-center gap-2 text-green-400 bg-green-950/20 border border-green-900/30 p-3 rounded-lg text-xs">
 <CheckCircle className="w-4 h-4 flex-shrink-0" />
 <span>{successMsg}</span>
 </div>
 )}

 {step === 1 ? (
 /* Step 1: Request OTP Form */
 <form onSubmit={forgotForm.handleSubmit(handleRequestOtp)} className="space-y-4">
 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Email Address</label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
 <Mail className="w-4 h-4" />
 </span>
 <input
 type="email"
 required
 placeholder="you@example.com"
 {...forgotForm.register('email')}
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-transparent text-sm placeholder-gray-600"
 />
 </div>
 {forgotForm.formState.errors.email && (
 <p className="text-red-400 text-xs">{forgotForm.formState.errors.email.message}</p>
 )}
 </div>

 <GoldButton type="submit" variant="filled" fullWidth isLoading={isSubmitting} className="py-2.5">
 Send Recovery Code
 </GoldButton>
 </form>
 ) : (
 /* Step 2: Reset Password Form */
 <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4" autoComplete="off">
 {/* Dummy fields to trap browser autofill */}
 <input type="text" name="email" autoComplete="username" style={{ display: 'none' }} readOnly />
 <input type="password" name="password" autoComplete="new-password" style={{ display: 'none' }} readOnly />

 {/* OTP Code */}
 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">6-Digit OTP Code</label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
 <Key className="w-4 h-4" />
 </span>
 <input
 type="text"
 required
 placeholder="e.g. 123456"
 maxLength={6}
 autoComplete="one-time-code"
 {...resetForm.register('otp')}
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-transparent text-sm placeholder-gray-600 font-mono tracking-widest text-center"
 />
 </div>
 {resetForm.formState.errors.otp && (
 <p className="text-red-400 text-xs">{resetForm.formState.errors.otp.message}</p>
 )}
 </div>

 {/* New Password */}
 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">New Password</label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
 <Lock className="w-4 h-4" />
 </span>
 <input
 type="password"
 required
 placeholder="Min 8 chars, 1 upper, 1 number"
 autoComplete="new-password"
 {...resetForm.register('newPassword')}
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-transparent text-sm placeholder-gray-600"
 />
 </div>
 {resetForm.formState.errors.newPassword && (
 <p className="text-red-400 text-xs">{resetForm.formState.errors.newPassword.message}</p>
 )}
 </div>

 {/* Confirm New Password */}
 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Confirm Password</label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
 <Lock className="w-4 h-4" />
 </span>
 <input
 type="password"
 required
 placeholder="Confirm new password"
 autoComplete="new-password"
 {...resetForm.register('confirmNewPassword')}
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-transparent text-sm placeholder-gray-600"
 />
 </div>
 {resetForm.formState.errors.confirmNewPassword && (
 <p className="text-red-400 text-xs">{resetForm.formState.errors.confirmNewPassword.message}</p>
 )}
 </div>

 <GoldButton type="submit" variant="filled" fullWidth isLoading={isSubmitting} className="py-2.5">
 Reset Password
 </GoldButton>
 </form>
 )}

 <div className="text-center text-xs text-gray-600 pt-2 border-t border-neutral-900">
 <Link href="/login" className="text-[var(--gold)] hover:underline font-semibold">
 Back to Log In
 </Link>
 </div>
 </GoldCard>
 </div>
 );
}
