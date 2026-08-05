'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/auth/AuthProvider';
import { client } from '@/lib/api/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GraduationCap, Lock, Key, Check } from 'lucide-react';
import { GoldButton } from './GoldButton';
import { GoldCard } from './GoldCard';
import { BatchCardSkeleton } from './Skeleton';
import { FormattedText } from './FormattedText';

interface CategoryBatchesListProps {
 category: 'Astrology' | 'Numerology' | 'Tarot Card' | 'Graphology';
}

export function CategoryBatchesList({ category }: CategoryBatchesListProps) {
 const router = useRouter();
 const { isAuthenticated } = useAuth();
 const queryClient = useQueryClient();

 // Fetch batches in this category
 const { data: batches, isLoading: isLoadingBatches } = useQuery({
 queryKey: ['category-batches', category],
 queryFn: async () => {
 const res = await client.get('/batches', {
 params: { category },
 });
 return res.data?.data || [];
 },
 });

 // Fetch user's enrolments if logged in
 const { data: enrolments } = useQuery({
 queryKey: ['user-enrolments'],
 queryFn: async () => {
 const res = await client.get('/batches/me/enrolments');
 return res.data?.data || [];
 },
 enabled: isAuthenticated,
 });

 const enrolledBatchIds = new Set(
 enrolments?.map((enr: any) => enr.batchId?._id || enr.batchId) || []
 );

 const activeBatches = batches?.filter((b: any) => !b.isDeleted) || [];

 if (isLoadingBatches) {
 return (
 <div className="w-full max-w-5xl mx-auto py-8">
 <div className="text-center space-y-1 mb-8">
 <div className="w-48 h-5 bg-gray-100/60 rounded animate-shimmer mx-auto mb-2" />
 <div className="w-64 h-3 bg-gray-100/60 rounded animate-shimmer mx-auto" />
 </div>
 <BatchCardSkeleton count={2} />
 </div>
 );
 }

 if (activeBatches.length === 0) {
 return (
 <div className="text-center py-10 border border-dashed border-gray-200 rounded-2xl text-gray-500 text-xs">
 <GraduationCap className="w-8 h-8 mx-auto mb-2 opacity-30" />
 <p>No study batches available under {category} currently.</p>
 </div>
 );
 }

 return (
 <div className="space-y-6 max-w-5xl mx-auto w-full">
 <div className="text-center space-y-1 mb-8">
 <h4 className="font-serif text-lg font-bold text-[var(--gold)]">Active {category} Batches</h4>
 <p className="text-gray-600 text-xs">Explore batches and register to unlock Lectures and Notes.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
 {activeBatches.map((batch: any) => {
 const isEnrolled = enrolledBatchIds.has(batch._id);
 return (
 <GoldCard key={batch._id} className="border border-[var(--gold-100)] flex flex-col justify-between overflow-hidden p-6">
 <Link href={`/batches/${batch._id}`} className="block flex-grow cursor-pointer">
 {batch.coverImage?.url && (
 <div className="w-full h-44 bg-gray-100 overflow-hidden rounded-t-xl -mt-6 -mx-6 mb-4" style={{ width: 'calc(100% + 3rem)' }}>
 <img src={batch.coverImage.url} alt={batch.title} className="w-full h-full object-cover animate-fade-in" />
 </div>
 )}
 <div className="space-y-2">
 <h5 className="font-sans text-[26px] font-bold text-gray-900 transition-colors hover:text-[var(--gold)]">{batch.title}</h5>
 <FormattedText text={batch.description} className="text-gray-600 text-xs leading-relaxed line-clamp-3 font-light" />
 </div>
 </Link>

 <div className="mt-6 pt-4 border-t border-gray-200 space-y-4 font-sans">
 <div className="flex justify-between items-center text-xs">
 <span className="text-gray-500">Course Value:</span>
 <span className="text-[var(--gold)] font-bold text-[26px]">₹{(batch.price / 100).toLocaleString()}</span>
 </div>

 {isEnrolled ? (
 <div className="space-y-2">
 <div className="flex items-center gap-1.5 text-green-400 text-xs bg-green-950/20 border border-green-900/30 p-2 rounded-lg justify-center font-semibold">
 <Check className="w-4 h-4" />
 <span>Unlocked & Enrolled</span>
 </div>
 <GoldButton
 variant="filled"
 fullWidth
 className="py-2 text-xs font-semibold"
 onClick={() => router.push(`/my-batches/${batch._id}`)}
 >
 Go to Study Portal
 </GoldButton>
 </div>
 ) : (
 <GoldButton
 variant="filled"
 fullWidth
 className="py-2 text-xs font-semibold"
 onClick={() => router.push(`/batches/${batch._id}`)}
 >
 View Details
 </GoldButton>
 )}
 </div>
 </GoldCard>
 );
 })}
 </div>
 </div>
 );
}
