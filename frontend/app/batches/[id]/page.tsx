'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { ArrowLeft, GraduationCap, Compass, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CountdownTimer } from '@/components/shop/CountdownTimer';
import { env } from '@/lib/env';
import { FormattedText } from '@/components/ui/FormattedText';

export default function PublicBatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
 const resolvedParams = use(params);
 const { id } = resolvedParams;
 const { isAuthenticated, isLoading: authLoading, user } = useAuth();
 const router = useRouter();
 const queryClient = useQueryClient();

 const { data: batch, isLoading: batchLoading, error } = useQuery({
 queryKey: ['public-batch', id],
 queryFn: async () => {
 const res = await client.get(`/batches/${id}`);
 return res.data?.data;
 },
 });

 const loadRazorpayScript = (): Promise<boolean> => {
 return new Promise((resolve) => {
 if ((window as any).Razorpay) { resolve(true); return; }
 const script = document.createElement('script');
 script.src = 'https://checkout.razorpay.com/v1/checkout.js';
 script.onload = () => resolve(true);
 script.onerror = () => resolve(false);
 document.body.appendChild(script);
 });
 };

 const joinMutation = useMutation({
 mutationFn: async () => {
 const res = await client.post(`/batches/${id}/join`);
 return res.data?.data;
 },
 onSuccess: async (data: any) => {
 if (!data.paymentRequired) {
 queryClient.invalidateQueries({ queryKey: ['my-enrolments'] });
 alert('🎉 Successfully enrolled in batch!');
 router.push(`/my-batches/${id}`);
 return;
 }

 const loaded = await loadRazorpayScript();
 if (!loaded) {
 alert('Failed to load Razorpay SDK. Please check your connection.');
 return;
 }

 const options = {
 key: data.key || env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
 amount: data.amount,
 currency: data.currency || 'INR',
 name: 'OM Astrology AMC',
 description: `Join Batch: ${batch?.title || 'Batch'}`,
 order_id: data.razorpayOrderId,
 handler: async (response: any) => {
 try {
 await client.post('/batches/verify', {
 batchId: id,
 razorpayOrderId: response.razorpay_order_id,
 razorpayPaymentId: response.razorpay_payment_id,
 razorpaySignature: response.razorpay_signature,
 });
 
 queryClient.invalidateQueries({ queryKey: ['my-enrolments'] });
 alert('🎉 Payment successful! You are now enrolled in the batch.');
 router.push(`/my-batches/${id}`);
 } catch (err: any) {
 alert('Payment verification failed. Please contact support.');
 }
 },
 prefill: {
 name: user?.name || '',
 email: user?.email || '',
 contact: user?.phone || '',
 },
 theme: { color: '#cc8f33' },
 };

 const rzp = new (window as any).Razorpay(options);
 rzp.open();
 },
 onError: (err: any) => {
 alert(err.response?.data?.error?.message || 'Failed to enroll');
 },
 });

 if (batchLoading || authLoading) {
 return (
 <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-600">
 <LoadingSpinner size="lg" />
 <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
 Aligning Celestial Details...
 </p>
 </div>
 );
 }

 if (error || !batch) {
 return (
 <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-600 px-4 text-center">
 <GraduationCap className="w-16 h-16 text-neutral-800 mb-4 animate-bounce" />
 <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Batch Not Found</h2>
 <p className="text-sm max-w-md font-light mb-6 text-gray-500">The study batch you are looking for does not exist or may have been completed.</p>
 <Link href="/my-batches/join">
 <GoldButton variant="outlined" className="py-2.5 px-6 text-xs">
 <ArrowLeft className="w-4 h-4 mr-2" /> Back to Batches
 </GoldButton>
 </Link>
 </div>
 );
 }

 const isEnrolled = batch.isEnrolled;

 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
 <div className="max-w-5xl mx-auto space-y-8 relative z-10">
 
 {/* Navigation / Back Button */}
 <div className="flex justify-between items-center pb-4 border-b border-[var(--gold-200)]">
 <Link href="/my-batches/join" className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-600 hover:text-[var(--gold)] transition-colors">
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
 Back to Batches
 </Link>
 <span className="text-[var(--gold)] text-xs font-mono uppercase tracking-widest font-semibold">
 Occult Study Course
 </span>
 </div>

 {/* Batch Info Layout */}
 <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
 
 {/* Cover Image Section */}
 <div className="md:col-span-5 space-y-4">
 <GoldCard flush className="overflow-hidden bg-gray-50/40 border border-[var(--gold-200)] relative">
 <div className="w-full h-64 md:h-80 bg-gray-100 flex items-center justify-center overflow-hidden">
 {batch.coverImage?.url ? (
 <img 
 src={batch.coverImage.url} 
 alt={batch.title} 
 className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
 />
 ) : (
 <GraduationCap className="w-24 h-24 text-neutral-800 animate-pulse" />
 )}
 </div>
 </GoldCard>
 </div>
 {/* Text and Actions Section */}
 <div className="md:col-span-7 space-y-6">
 <div className="space-y-2">
 <h1 className="font-sans text-[40px] sm:text-[46px] font-bold tracking-tight text-gray-900 leading-tight">
 {batch.title}
 </h1>
 <div className="flex items-center gap-2 pt-1">
 <span className="bg-[var(--gold-100)] border border-[var(--gold-200)] text-[var(--gold)] text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full">
 {batch.category} Batch
 </span>
 <span className="text-gray-500 text-xs font-mono">• Enrollments Open</span>
 </div>
 </div>

 {/* Price & Join Block */}
 <div className="p-6 rounded-2xl bg-gray-100/30 border border-gray-200/60 space-y-4">
 {(() => {
 const now = new Date();
 const hasActiveOffer = batch.offerPrice !== undefined && batch.offerPrice !== null &&
 (!batch.offerExpiresAt || now < new Date(batch.offerExpiresAt));

 return (
 <>
 {hasActiveOffer && batch.offerExpiresAt && (
 <div className="mb-2">
 <CountdownTimer expiresAt={batch.offerExpiresAt} />
 </div>
 )}
 <div className="flex items-baseline gap-3 flex-wrap">
 {hasActiveOffer ? (
 <>
 <span className="text-[40px] sm:text-[46px] font-bold font-sans text-[var(--gold)]">
 ₹{(batch.offerPrice / 100).toLocaleString()}
 </span>
 <span className="text-neutral-500 line-through text-[28px] font-sans">
 ₹{(batch.price / 100).toLocaleString()}
 </span>
 {batch.specialOfferTitle && (
 <span className="bg-red-600/90 text-gray-900 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-red-500/30">
 {batch.specialOfferTitle}
 </span>
 )}
 </>
 ) : (
 <span className="text-[40px] sm:text-[46px] font-bold font-sans text-[var(--gold)]">
 ₹{(batch.price / 100).toLocaleString()}
 </span>
 )}
 <span className="text-gray-500 text-xs">INR value</span>
 </div>
 </>
 );
 })()}
 
 <div className="pt-2">
 {isEnrolled ? (
 <div className="space-y-3">
 <div className="flex items-center gap-2 text-green-600 text-xs bg-green-50 border border-green-200 p-3 rounded-lg justify-center font-semibold">
 <CheckCircle2 className="w-4.5 h-4.5" />
 <span>You are already enrolled in this batch!</span>
 </div>
 <GoldButton
 variant="filled"
 fullWidth
 className="py-3 text-sm font-semibold"
 onClick={() => router.push(`/my-batches/${id}`)}
 >
 Go to Student Portal
 </GoldButton>
 </div>
 ) : isAuthenticated ? (
 <GoldButton
 variant="filled"
 fullWidth
 className="py-3 text-sm font-semibold"
 onClick={() => joinMutation.mutate()}
 isLoading={joinMutation.isPending}
 >
 Confirm & Join Batch
 </GoldButton>
 ) : (
 <div className="grid grid-cols-2 gap-4">
 <GoldButton
 variant="ghost"
 fullWidth
 className="py-3 text-xs"
 onClick={() => router.push('/login')}
 >
 Login to Enroll
 </GoldButton>
 <GoldButton
 variant="outlined"
 fullWidth
 className="py-3 text-xs"
 onClick={() => router.push('/register')}
 >
 Register to Enroll
 </GoldButton>
 </div>
 )}
 </div>
 </div>

 {/* Description */}
 <div className="space-y-3 pt-2">
 <h3 className="font-serif text-lg font-bold text-[var(--gold)] flex items-center gap-2">
 <Compass className="w-4 h-4 text-[var(--gold)]" /> Course Syllabus & Details
 </h3>
 <div className="text-gray-600 text-sm leading-relaxed font-light">
 {batch.description ? (
 <FormattedText text={batch.description} />
 ) : (
 <p>No description or syllabus details provided for this study course.</p>
 )}
 </div>
 </div>

 {/* Highlights */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
 <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/20 border border-neutral-900">
 <Sparkles className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
 <div>
 <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-mono">Lectures & Live sessions</h4>
 <p className="text-[11px] text-gray-500 font-light mt-0.5 leading-normal">Access interactive recorded video lectures anytime.</p>
 </div>
 </div>
 <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/20 border border-neutral-900">
 <CheckCircle2 className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
 <div>
 <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-mono">Study Notes</h4>
 <p className="text-[11px] text-gray-500 font-light mt-0.5 leading-normal">Download alchemical references, slides, and cheat sheets.</p>
 </div>
 </div>
 </div>

 </div>

 </div>

 </div>
 </div>
 );
}
