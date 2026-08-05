'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldButton } from '@/components/ui/GoldButton';
import { GraduationCap } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function MyBatchesPage() {
 const { isAuthenticated, isLoading } = useAuth();
 const router = useRouter();

 useEffect(() => {
 if (!isLoading && !isAuthenticated) router.push('/login');
 }, [isAuthenticated, isLoading, router]);

 // Fetch enrolled batches
 const { data: enrolments, isLoading: loadingEnrolled } = useQuery({
 queryKey: ['my-enrolments'],
 queryFn: async () => {
 const res = await client.get('/batches/me/enrolments');
 return res.data?.data || [];
 },
 enabled: isAuthenticated,
 });

 // Automatically redirect once loaded if user has batches
 useEffect(() => {
 if (enrolments && enrolments.length > 0) {
 const firstBatch = enrolments.find((e: any) => e.batchId)?.batchId?._id || enrolments[0].batchId?._id || enrolments[0].batchId;
 if (firstBatch) {
 router.replace(`/my-batches/${firstBatch}`);
 }
 }
 }, [enrolments, router]);

 if (isLoading || loadingEnrolled || (enrolments && enrolments.length > 0)) {
 return (
 <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-600">
 <LoadingSpinner size="lg" />
 <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
 Loading Academy Session...
 </p>
 </div>
 );
 }

 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900 flex items-center justify-center">
 <div className="max-w-md mx-auto py-16 text-center relative z-10">
 <div className="double-bezel-outer p-1 bg-gray-50/20 max-w-sm mx-auto">
 <div className="double-bezel-inner py-12 px-6 flex flex-col items-center">
 <GraduationCap className="w-16 h-16 text-[var(--gold)] mb-4 animate-bounce" />
 <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Welcome to the Academy</h3>
 <p className="text-gray-600 text-xs font-light leading-relaxed max-w-xs mb-8">
 You are not enrolled in any academy study batches yet. Explore our open batches to start learning.
 </p>
 <GoldButton
 variant="filled"
 className="py-2.5 px-6 text-xs font-semibold"
 onClick={() => router.push('/my-batches/join')}
 >
 Join Batch
 </GoldButton>
 </div>
 </div>
 </div>
 </div>
 );
}
