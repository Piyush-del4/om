'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldButton } from '@/components/ui/GoldButton';
import { GoldCard } from '@/components/ui/GoldCard';
import { GraduationCap, ArrowRight, BookOpen, PlusCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { FormattedText } from '@/components/ui/FormattedText';

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

  // If user has exactly 1 enrolled batch, auto-redirect directly to that batch
  useEffect(() => {
    if (enrolments && enrolments.length === 1) {
      const firstBatch = enrolments[0]?.batchId?._id || enrolments[0]?.batchId;
      if (firstBatch && typeof firstBatch === 'string') {
        router.replace(`/my-batches/${firstBatch}`);
      }
    }
  }, [enrolments, router]);

  if (isLoading || loadingEnrolled) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-600">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
          Loading Enrolled Batches...
        </p>
      </div>
    );
  }

  // If user has 0 enrolled batches
  if (!enrolments || enrolments.length === 0) {
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

  // If user has multiple enrolled batches, display all enrolled batches with photo & title
  return (
    <div className="radial-mesh-bg min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="border-b border-[var(--gold-200)] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-[var(--gold)]" /> My Enrolled Batches
            </h1>
            <p className="text-gray-600 text-xs mt-1 font-light">
              Select a batch below to access its lectures, video materials, and notes.
            </p>
          </div>
          <GoldButton
            variant="filled"
            className="py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
            onClick={() => router.push('/my-batches/join')}
          >
            <PlusCircle className="w-4 h-4 text-black" />
            <span>Join New Batch</span>
          </GoldButton>
        </div>

        {/* Enrolled Batches Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolments.map((enr: any) => {
            const batch = enr.batchId;
            if (!batch || !batch._id) return null;

            return (
              <GoldCard
                key={enr._id || batch._id}
                flush
                className="transition-spring group flex flex-col justify-between h-full border border-gray-200 hover:border-[var(--gold)] cursor-pointer"
                onClick={() => router.push(`/my-batches/${batch._id}`)}
              >
                <div className="block flex-grow">
                  {/* Batch Photo / Cover Image */}
                  <div className="w-full h-48 bg-gray-100 overflow-hidden relative">
                    <img
                      src={batch.coverImage?.url || '/images/logo.png'}
                      alt={batch.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e: any) => {
                        e.target.src = '/images/logo.png';
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-[var(--gold-200)] text-[var(--gold)] text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-full font-bold">
                      {batch.category || 'Academy'}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-sans text-xl font-bold text-gray-900 group-hover:text-[var(--gold)] transition-colors">
                      {batch.title}
                    </h3>
                    <FormattedText
                      text={batch.description}
                      className="text-gray-600 text-xs leading-relaxed line-clamp-3 font-light"
                    />
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                    <span className="text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
                      Active Access
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/my-batches/${batch._id}`);
                      }}
                      className="bg-[var(--gold)] text-black text-xs font-bold py-2 px-4 rounded-full hover:bg-[var(--gold-light)] flex items-center gap-1.5 transition-all group-hover:scale-105 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Study Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </GoldCard>
            );
          })}
        </div>

      </div>
    </div>
  );
}
