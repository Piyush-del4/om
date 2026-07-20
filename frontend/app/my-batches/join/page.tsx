'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { GraduationCap, Search, ArrowLeft, CheckCircle, Compass } from 'lucide-react';
import { BatchCardSkeleton } from '@/components/ui/Skeleton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CountdownTimer } from '@/components/shop/CountdownTimer';
import { FormattedText } from '@/components/ui/FormattedText';

export default function JoinBatchPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/login');
  }, [isAuthenticated, isLoading, router]);

  // Fetch user's current enrolments
  const { data: enrolments, isLoading: loadingEnrolled } = useQuery({
    queryKey: ['my-enrolments'],
    queryFn: async () => {
      const res = await client.get('/batches/me/enrolments');
      return res.data?.data || [];
    },
    enabled: isAuthenticated,
  });

  // Fetch all available batches (recent first, sorted by backend)
  const { data: allBatches, isLoading: loadingAll } = useQuery({
    queryKey: ['all-batches'],
    queryFn: async () => {
      const res = await client.get('/batches');
      return res.data?.data || [];
    },
  });

  const joinMutation = useMutation({
    mutationFn: async (batchId: string) => {
      return client.post(`/batches/${batchId}/join`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-enrolments'] });
      alert('🎉 Successfully enrolled in batch!');
      router.push('/my-batches');
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Failed to join batch');
    },
  });

  const isEnrolled = (batchId: string) => {
    return enrolments?.some((e: any) => (e.batchId?._id || e.batchId) === batchId);
  };

  // Filter batches based on search query
  const filteredBatches = allBatches?.filter((b: any) =>
    !b.isDeleted &&
    (b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     b.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     b.category?.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-gray-400">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
          Opening Batches...
        </p>
      </div>
    );
  }

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-black overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Navigation & Header */}
        <div className="border-b border-[var(--gold-200)] pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <Link 
              href="/my-batches" 
              className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-[var(--gold)] transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Portal
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <Compass className="w-8 h-8 text-[var(--gold)] animate-spin-slow" /> Explore & <span className="gold-gradient-text">Join Batches</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search batches by name or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-[var(--gold)] text-white text-xs py-2.5 pl-10 pr-4 rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-[var(--gold)] placeholder-gray-500"
            />
          </div>
        </div>

        {/* Batches Grid */}
        {loadingAll || (loadingEnrolled && !enrolments) ? (
          <div className="py-8">
            <BatchCardSkeleton count={3} />
          </div>
        ) : filteredBatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBatches.map((batch: any) => {
              const enrolled = isEnrolled(batch._id);
              const now = new Date();
              const hasActiveOffer = batch.offerPrice !== undefined && batch.offerPrice !== null &&
                (!batch.offerExpiresAt || now < new Date(batch.offerExpiresAt));

              return (
                <GoldCard 
                  key={batch._id} 
                  theme="dark" 
                  flush 
                  className="transition-spring group flex flex-col justify-between h-full border border-neutral-900 hover:border-[var(--gold-200)]"
                >
                  <Link href={`/batches/${batch._id}`} className="block flex-grow cursor-pointer">
                    {batch.coverImage?.url && (
                      <div className="w-full h-44 bg-neutral-900 overflow-hidden relative">
                        <img 
                          src={batch.coverImage.url} 
                          alt={batch.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                        {hasActiveOffer && batch.offerExpiresAt && (
                          <div className="absolute top-3 right-3 z-10">
                            <CountdownTimer expiresAt={batch.offerExpiresAt} />
                          </div>
                        )}
                        {hasActiveOffer && batch.specialOfferTitle && (
                          <div className="absolute top-3 left-3 bg-red-600 text-white font-mono text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md border border-red-500/40 shadow-[0_0_12px_rgba(220,38,38,0.45)]">
                            {batch.specialOfferTitle}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-[var(--gold-50)] border border-[var(--gold-200)] text-[var(--gold)] text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full">
                          {batch.category}
                        </span>
                        <div className="flex flex-col items-end">
                          {hasActiveOffer ? (
                            <div className="flex items-baseline gap-1.5 font-sans">
                              <span className="text-[var(--gold)] font-bold text-[24px]">
                                  ₹{(batch.offerPrice / 100).toLocaleString()}
                              </span>
                              <span className="text-neutral-500 line-through text-[20px]">
                                ₹{(batch.price / 100).toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[var(--gold)] font-bold text-[24px] font-sans">
                              ₹{(batch.price / 100).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-sans text-[28px] font-bold text-white transition-colors group-hover:text-[var(--gold)] line-clamp-1">
                        {batch.title}
                      </h3>
                      
                      <FormattedText text={batch.description} className="text-gray-400 text-xs leading-relaxed font-light line-clamp-3" />
                    </div>
                  </Link>

                  <div className="p-6 pt-4 border-t border-neutral-800/60 flex items-center">
                    {enrolled ? (
                      <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex items-center justify-center gap-1.5 text-green-400 text-xs bg-green-950/20 border border-green-900/30 p-2 rounded-lg font-semibold">
                          <CheckCircle className="w-4 h-4" />
                          <span>Enrolled & Active</span>
                        </div>
                        <GoldButton
                          variant="filled"
                          fullWidth
                          className="py-1.5 text-[11px]"
                          onClick={() => router.push(`/my-batches/${batch._id}`)}
                        >
                          Go to Portal
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
        ) : (
          <div className="text-center py-24 bg-neutral-950/10 border border-dashed border-neutral-800 rounded-2xl">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-600 animate-bounce" />
            <p className="text-gray-400 text-sm font-light">No study batches match your query.</p>
          </div>
        )}

      </div>
    </div>
  );
}
