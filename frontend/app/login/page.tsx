'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/auth/AuthProvider';
import { GoldButton } from '@/components/ui/GoldButton';
import { GoldCard } from '@/components/ui/GoldCard';
import { Lock, Mail, AlertCircle, Eye, EyeOff, User, Phone } from 'lucide-react';
import { client } from '@/lib/api/client';

// Form Validation Schemas
const loginSchema = z.object({
 email: z.string().min(1, 'Email is required').email('Invalid email address'),
 password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z
 .object({
 name: z.string().min(2, 'Name must be at least 2 characters').max(80),
 email: z.string().min(1, 'Email is required').email('Invalid email address'),
 phone: z
 .string()
 .min(10, 'Phone number must be at least 10 digits')
 .max(15, 'Phone number cannot exceed 15 digits')
 .regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number format (should be 10 digits starting with 6-9)'),
 password: z
 .string()
 .min(8, 'Password must be at least 8 characters')
 .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
 .regex(/[0-9]/, 'Password must contain at least one number'),
 confirmPassword: z.string().min(1, 'Confirm password is required'),
 })
 .refine((data) => data.password === data.confirmPassword, {
 message: 'Passwords must match',
 path: ['confirmPassword'],
 });

type LoginFields = z.infer<typeof loginSchema>;
type RegisterFields = z.infer<typeof registerSchema>;

// Sub-component: LoginForm
interface LoginFormProps {
 onSuccess: () => void;
 onSwitchToRegister: () => void;
}

function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
 const { login } = useAuth();
 const router = useRouter();
 const [errorMsg, setErrorMsg] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [showPassword, setShowPassword] = useState(false);

 const {
 register,
 handleSubmit,
 formState: { errors },
 } = useForm<LoginFields>({
 resolver: zodResolver(loginSchema),
 });

 const onSubmit = async (data: LoginFields) => {
 setErrorMsg('');
 setIsSubmitting(true);
 try {
 const res = await login(data.email, data.password);
 if (res?.user?.role === 'admin') {
 router.push('/admin/dashboard');
 } else {
 router.push('/dashboard');
 }
 onSuccess();
 } catch (err: any) {
 const msg = err.response?.data?.error?.message || 'Invalid email or password';
 setErrorMsg(msg);
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <div className="space-y-6 animate-fade-in">
 <div className="text-center space-y-2">
 <h1 className="font-serif text-3xl font-bold tracking-wide text-gray-900">
 Welcome <span className="gold-gradient-text">Back</span>
 </h1>
 <p className="text-xs text-gray-600 font-light max-w-xs mx-auto">
 Login with your credentials to access appointments, shop, and batches.
 </p>
 </div>

 {errorMsg && (
 <div className="flex items-center gap-2 text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-lg text-xs font-light">
 <AlertCircle className="w-4 h-4 flex-shrink-0" />
 <span>{errorMsg}</span>
 </div>
 )}

 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
 {/* Email */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Email Address
 </label>
 <div className="relative">
 <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600">
 <Mail className="w-4 h-4" />
 </span>
 <input
 type="email"
 required
 placeholder="you@example.com"
 {...register('email')}
 className="w-full input-underline text-gray-900 text-sm py-2.5 auth-input placeholder-neutral-700"
 />
 </div>
 {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
 </div>

 {/* Password */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Password
 </label>
 <div className="relative">
 <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600">
 <Lock className="w-4 h-4" />
 </span>
 <input
 type={showPassword ? 'text' : 'password'}
 required
 placeholder="••••••••"
 {...register('password')}
 className="w-full input-underline text-gray-900 text-sm py-2.5 auth-input auth-input-right placeholder-neutral-700"
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600 hover:text-[var(--gold)] focus:outline-none"
 >
 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
 </button>
 </div>
 {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
 <div className="flex justify-end pt-1">
 <Link href="/forgot-password" className="text-xs text-[var(--gold)] hover:text-[var(--gold-light)] font-semibold transition-colors">
 Forgot password?
 </Link>
 </div>
 </div>

 <div className="pt-2">
 <GoldButton type="submit" variant="filled" fullWidth isLoading={isSubmitting} className="py-2.5">
 Log In
 </GoldButton>
 </div>
 </form>

 <div className="text-center text-xs text-gray-600 pt-2">
 <p className="font-light">
 Don't have an account?{' '}
 <button type="button" onClick={onSwitchToRegister} className="text-[var(--gold)] hover:underline font-semibold cursor-pointer">
 Create an account
 </button>
 </p>
 </div>
 </div>
 );
}

// Sub-component: RegisterForm
interface RegisterFormProps {
 onSuccess: () => void;
 onSwitchToLogin: () => void;
}

function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
 const { register: authRegister } = useAuth();
 const router = useRouter();
 const [errorMsg, setErrorMsg] = useState('');
 const [infoMsg, setInfoMsg] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [otpSent, setOtpSent] = useState(false);
 const [otpCode, setOtpCode] = useState('');

 const {
 register,
 handleSubmit,
 watch,
 formState: { errors },
 } = useForm<RegisterFields>({
 resolver: zodResolver(registerSchema),
 });

 const onSubmit = async (data: RegisterFields) => {
 setErrorMsg('');
 setInfoMsg('');
 setIsSubmitting(true);
 try {
 const res = await client.post('/auth/register/send-otp', {
 name: data.name,
 email: data.email,
 password: data.password,
 phone: data.phone,
 });
 if (res.data?.success) {
 setOtpSent(true);
 setInfoMsg('A verification OTP has been sent to your email address.');
 }
 } catch (err: any) {
 const msg = err.response?.data?.error?.message || 'Registration failed. Try again.';
 setErrorMsg(msg);
 } finally {
 setIsSubmitting(false);
 }
 };

 const handleVerifyRegister = async () => {
 if (!otpCode || otpCode.length !== 6) {
 setErrorMsg('Please enter a valid 6-digit OTP code');
 return;
 }
 setErrorMsg('');
 setInfoMsg('');
 setIsSubmitting(true);
 const data = watch();
 try {
 await authRegister(data.name, data.email, data.password, data.phone, otpCode);
 router.push('/dashboard');
 onSuccess();
 } catch (err: any) {
 const msg = err.response?.data?.error?.message || 'Registration failed. Please check your OTP code.';
 setErrorMsg(msg);
 } finally {
 setIsSubmitting(false);
 }
 };

 const handleResendOtp = async () => {
 setErrorMsg('');
 setInfoMsg('');
 setIsSubmitting(true);
 const data = watch();
 try {
 const res = await client.post('/auth/register/send-otp', {
 name: data.name,
 email: data.email,
 password: data.password,
 phone: data.phone,
 });
 if (res.data?.success) {
 setInfoMsg('A new verification OTP has been sent to your email.');
 }
 } catch (err: any) {
 const msg = err.response?.data?.error?.message || 'Failed to resend OTP.';
 setErrorMsg(msg);
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <div className="space-y-6 animate-fade-in">
 <div className="text-center space-y-2">
 <h1 className="font-serif text-3xl font-bold tracking-wide text-gray-900">
 Create <span className="gold-gradient-text">Account</span>
 </h1>
 <p className="text-xs text-gray-600 font-light max-w-xs mx-auto">
 Join us to book consults, track items, and access paid video batches.
 </p>
 </div>

 {errorMsg && (
 <div className="flex items-center gap-2 text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-lg text-xs font-light">
 <AlertCircle className="w-4 h-4 flex-shrink-0" />
 <span>{errorMsg}</span>
 </div>
 )}

 {infoMsg && (
 <div className="flex items-center gap-2 text-green-400 bg-green-950/20 border border-green-900/30 p-3 rounded-lg text-xs font-light">
 <AlertCircle className="w-4 h-4 flex-shrink-0 text-green-400" />
 <span>{infoMsg}</span>
 </div>
 )}

 {!otpSent ? (
 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
 {/* Full Name */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Full Name
 </label>
 <div className="relative">
 <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600">
 <User className="w-4 h-4" />
 </span>
 <input
 type="text"
 required
 placeholder="John Doe"
 {...register('name')}
 className="w-full input-underline text-gray-900 text-sm py-2 auth-input placeholder-neutral-700"
 />
 </div>
 {errors.name && <p className="text-red-400 text-xs mt-0.5">{errors.name.message}</p>}
 </div>

 {/* Email */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Email Address
 </label>
 <div className="relative">
 <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600">
 <Mail className="w-4 h-4" />
 </span>
 <input
 type="email"
 required
 placeholder="john@example.com"
 {...register('email')}
 className="w-full input-underline text-gray-900 text-sm py-2 auth-input placeholder-neutral-700"
 />
 </div>
 {errors.email && <p className="text-red-400 text-xs mt-0.5">{errors.email.message}</p>}
 </div>

 {/* Phone */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Phone Number *
 </label>
 <div className="relative">
 <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600">
 <Phone className="w-4 h-4" />
 </span>
 <input
 type="tel"
 required
 placeholder="e.g. 9876543210"
 {...register('phone')}
 className="w-full input-underline text-gray-900 text-sm py-2 auth-input placeholder-neutral-700"
 />
 </div>
 {errors.phone && <p className="text-red-400 text-xs mt-0.5">{errors.phone.message}</p>}
 </div>

 {/* Password */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Password
 </label>
 <div className="relative">
 <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600">
 <Lock className="w-4 h-4" />
 </span>
 <input
 type={showPassword ? 'text' : 'password'}
 required
 placeholder="Min 8 chars, 1 upper, 1 number"
 {...register('password')}
 className="w-full input-underline text-gray-900 text-sm py-2 auth-input auth-input-right placeholder-neutral-700"
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600 hover:text-[var(--gold)] focus:outline-none"
 >
 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
 </button>
 </div>
 {errors.password && <p className="text-red-400 text-xs mt-0.5">{errors.password.message}</p>}
 </div>

 {/* Confirm Password */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Confirm Password
 </label>
 <div className="relative">
 <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600">
 <Lock className="w-4 h-4" />
 </span>
 <input
 type={showConfirmPassword ? 'text' : 'password'}
 required
 placeholder="Confirm password"
 {...register('confirmPassword')}
 className="w-full input-underline text-gray-900 text-sm py-2 auth-input auth-input-right placeholder-neutral-700"
 />
 <button
 type="button"
 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
 className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600 hover:text-[var(--gold)] focus:outline-none"
 >
 {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
 </button>
 </div>
 {errors.confirmPassword && <p className="text-red-400 text-xs mt-0.5">{errors.confirmPassword.message}</p>}
 </div>

 <div className="pt-4">
 <GoldButton type="submit" variant="filled" fullWidth isLoading={isSubmitting} className="py-2.5">
 Register Account
 </GoldButton>
 </div>
 </form>
 ) : (
 <div className="space-y-6 animate-fade-in">
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">
 Verification Code (OTP)
 </label>
 <div className="relative">
 <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-600">
 <Lock className="w-4 h-4" />
 </span>
 <input
 type="text"
 required
 maxLength={6}
 placeholder=""
 value={otpCode}
 onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
 className="w-full input-underline text-gray-900 text-sm py-2.5 auth-input placeholder-neutral-700 tracking-[0.5em] font-mono text-center"
 />
 </div>
 <p className="text-[10px] text-gray-500 font-light mt-1">Please enter the 6-digit code sent to your email.</p>
 </div>

 <div className="pt-4 flex flex-col gap-3">
 <GoldButton
 type="button"
 variant="filled"
 fullWidth
 isLoading={isSubmitting}
 onClick={handleVerifyRegister}
 className="py-2.5"
 >
 Verify & Create Account
 </GoldButton>
 
 <button
 type="button"
 onClick={handleResendOtp}
 disabled={isSubmitting}
 className="text-xs text-gray-600 hover:text-[var(--gold)] transition-colors mt-2"
 >
 Didn't receive code? Resend OTP
 </button>
 
 <button
 type="button"
 onClick={() => {
 setOtpSent(false);
 setErrorMsg('');
 setInfoMsg('');
 setOtpCode('');
 }}
 className="text-xs text-gray-500 hover:text-gray-900 transition-colors mt-1"
 >
 Go Back to Registration Form
 </button>
 </div>
 </div>
 )}

 <div className="text-center text-xs text-gray-600 pt-2">
 <p className="font-light">
 Already have an account?{' '}
 <button type="button" onClick={onSwitchToLogin} className="text-[var(--gold)] hover:underline font-semibold cursor-pointer">
 Log in
 </button>
 </p>
 </div>
 </div>
 );
}

// Unified AuthPortal Component
export function AuthPortal({ defaultMode = 'login' }: { defaultMode?: 'login' | 'register' }) {
 const router = useRouter();
 const pathname = usePathname();
 const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

 // Sync mode with pathname changes (e.g. if back/forward button is pressed)
 useEffect(() => {
 if (pathname === '/register') {
 setMode('register');
 } else if (pathname === '/login') {
 setMode('login');
 }
 }, [pathname]);

 const handleModeChange = (newMode: 'login' | 'register') => {
 setMode(newMode);
 router.replace(newMode === 'login' ? '/login' : '/register');
 };

 const quotes = {
 login: {
 title: 'Realign with the Stars',
 desc: 'Step back into your spiritual alignment. View your celestial calendar, connect with guides, and continue your path of spiritual and self discovery.',
 },
 register: {
 title: 'Begin Your Spiritual Journey',
 desc: 'Chart your unique astrological map. Create an account to access premium consultation sessions, expert Numerology courses, Tarot readings, and live batches.',
 },
 };

 return (
 <div className="min-h-screen bg-white text-gray-900 flex flex-col md:flex-row overflow-hidden relative">
 {/* Dynamic Keyframe Styles */}
 <style dangerouslySetInnerHTML={{ __html: `
 @keyframes spin-slow {
 from { transform: rotate(0deg); }
 to { transform: rotate(360deg); }
 }
 @keyframes spin-reverse-slow {
 from { transform: rotate(360deg); }
 to { transform: rotate(0deg); }
 }
 @keyframes float {
 0%, 100% { transform: translateY(0px) rotate(0deg); }
 50% { transform: translateY(-12px) rotate(1.5deg); }
 }
 @keyframes pulse-glow {
 0%, 100% { opacity: 0.45; box-shadow: 0 0 20px rgba(204, 143, 51, 0.2); }
 50% { opacity: 0.85; box-shadow: 0 0 40px rgba(204, 143, 51, 0.45); }
 }
 @keyframes fade-in {
 from { opacity: 0; transform: translateY(8px); }
 to { opacity: 1; transform: translateY(0); }
 }
 .animate-spin-slow {
 animation: spin-slow 100s linear infinite;
 }
 .animate-spin-reverse-slow {
 animation: spin-reverse-slow 130s linear infinite;
 }
 .animate-float {
 animation: float 7s ease-in-out infinite;
 }
 .animate-pulse-glow {
 animation: pulse-glow 5s ease-in-out infinite;
 }
 .animate-fade-in {
 animation: fade-in 0.4s ease-out forwards;
 }
 .auth-input {
 padding-left: 2.75rem !important;
 }
 .auth-input-right {
 padding-right: 2.75rem !important;
 }
 `}} />

 {/* LEFT PANEL: Constellation and Astro Graphics (Desktop only) */}
 <div className="hidden md:flex md:w-1/2 bg-white border-r border-[var(--gold-200)]/15 relative flex-col items-center justify-center p-12 overflow-hidden select-none">
 {/* Sacred Geometry background grid */}
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,143,51,0.04),transparent_65%)] pointer-events-none" />
 <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(204,143,51,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(204,143,51,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

 {/* Constellations Animation Group */}
 <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center animate-float">
 {/* Outer Zodiac Ring */}
 <svg className="absolute w-full h-full animate-spin-slow text-[var(--gold)]/25" viewBox="0 0 100 100" fill="none">
 <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 4" />
 <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.75" />
 <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 5" />
 
 {/* Hour ticks representing zodiac houses */}
 {[...Array(12)].map((_, i) => {
 const angle = (i * 30 * Math.PI) / 180;
 const x1 = 50 + 41 * Math.cos(angle);
 const y1 = 50 + 41 * Math.sin(angle);
 const x2 = 50 + 45 * Math.cos(angle);
 const y2 = 50 + 45 * Math.sin(angle);
 return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.5" />;
 })}
 </svg>

 {/* Inner Mystical Geometrical Ring */}
 <svg className="absolute w-[82%] h-[82%] animate-spin-reverse-slow text-[var(--gold)]/15" viewBox="0 0 100 100" fill="none">
 <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.25" />
 <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 2" />
 {/* Astrological double triangle/hexagon connection lines */}
 <path d="M50 15 L80 67 L20 67 Z M50 85 L20 33 L80 33 Z" stroke="currentColor" strokeWidth="0.35" />
 </svg>

 {/* Center Sun/Moon Astrolabe Shield */}
 <div className="absolute w-24 h-24 rounded-full bg-white/75 border border-[var(--gold-200)]/40 flex items-center justify-center animate-pulse-glow z-10">
 <svg className="w-12 h-12 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
 <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.08" />
 <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
 <path d="M12 7.5a4.5 4.5 0 0 1 4.5 4.5c0 .77-.19 1.5-.53 2.14A5 5 0 1 0 9.86 16.5c.64-.34 1.37-.5 2.14-.5z" fill="currentColor" />
 </svg>
 </div>
 </div>

 {/* Dynamic Descriptive Text */}
 <div className="text-center max-w-sm mt-10 space-y-3 relative h-28 flex flex-col justify-start">
 <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-wide text-gray-900 transition-opacity duration-300">
 {mode === 'login' ? quotes.login.title : quotes.register.title}
 </h2>
 <p className="text-gray-600 text-xs font-light leading-relaxed px-4 transition-opacity duration-300">
 {mode === 'login' ? quotes.login.desc : quotes.register.desc}
 </p>
 </div>
 </div>

 {/* RIGHT PANEL: Auth Card & Forms */}
 <div className="w-full md:w-1/2 min-h-screen radial-mesh-bg flex flex-col justify-center items-center py-16 px-4 sm:px-12 relative overflow-y-auto">
 <div className="absolute w-80 h-80 rounded-full bg-[var(--gold-50)] blur-3xl pointer-events-none opacity-20 top-1/4 left-1/4"></div>
 <div className="absolute w-80 h-80 rounded-full bg-[var(--gold-100)]/5 blur-3xl pointer-events-none opacity-15 bottom-1/4 right-1/4"></div>

 {/* Floating home page link */}
 <div className="absolute top-6 right-6 z-20">
 <Link href="/" className="text-xs text-gray-600 hover:text-[var(--gold)] font-mono transition-colors">
 ← Back to Home
 </Link>
 </div>

 {/* Premium Auth Portal Card */}
 <GoldCard className="w-full max-w-md relative z-10 transition-all duration-300">
 {/* Custom Tab Switcher */}
 <div className="flex border border-[var(--gold-200)]/30 p-1 rounded-full bg-gray-50/60 max-w-[280px] mx-auto mb-8">
 <button
 type="button"
 onClick={() => handleModeChange('login')}
 className={`flex-1 py-1.5 px-4 rounded-full text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
 mode === 'login'
 ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-black shadow-md font-bold'
 : 'text-gray-600 hover:text-gray-900'
 }`}
 >
 Sign In
 </button>
 <button
 type="button"
 onClick={() => handleModeChange('register')}
 className={`flex-1 py-1.5 px-4 rounded-full text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
 mode === 'register'
 ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-black shadow-md font-bold'
 : 'text-gray-600 hover:text-gray-900'
 }`}
 >
 Register
 </button>
 </div>

 {/* Conditional Forms Render */}
 {mode === 'login' ? (
 <LoginForm
 onSuccess={() => {}}
 onSwitchToRegister={() => handleModeChange('register')}
 />
 ) : (
 <RegisterForm
 onSuccess={() => {}}
 onSwitchToLogin={() => handleModeChange('login')}
 />
 )}
 </GoldCard>
 </div>
 </div>
 );
}

export default function LoginPage() {
 return <AuthPortal defaultMode="login" />;
}
