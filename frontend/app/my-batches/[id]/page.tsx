'use client';

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { BookOpen, Play, FileText, GraduationCap, ChevronDown, PlusCircle, ArrowLeft, Bell } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { FormattedText } from '@/components/ui/FormattedText';

export default function BatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
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

  // Fetch lectures of this batch
  const { data: lectures, isLoading: loadingLectures } = useQuery({
    queryKey: ['batch-lectures', id],
    queryFn: async () => {
      const res = await client.get(`/batches/${id}/lectures`);
      return res.data?.data || [];
    },
    enabled: isAuthenticated && !!id,
  });

  // Fetch PDFs of this batch
  const { data: pdfs, isLoading: loadingPdfs } = useQuery({
    queryKey: ['batch-pdfs', id],
    queryFn: async () => {
      const res = await client.get(`/batches/${id}/pdfs`);
      return res.data?.data || [];
    },
    enabled: isAuthenticated && !!id,
  });

  // Fetch announcements of this batch
  const { data: announcements, isLoading: loadingAnnouncements } = useQuery({
    queryKey: ['batch-announcements', id],
    queryFn: async () => {
      const res = await client.get(`/batches/${id}/announcements`);
      return res.data?.data || [];
    },
    enabled: isAuthenticated && !!id,
  });

  const selectedEnrolment = enrolments?.find(
    (e: any) => (e.batchId?._id || e.batchId) === id
  );
  const selectedBatch = selectedEnrolment?.batchId;

  if (isLoading || (loadingEnrolled && !enrolments)) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-gray-400">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
          Loading Academy Session...
        </p>
      </div>
    );
  }

  // If user is logged in, enrolments are loaded, but they are not enrolled in this batch
  if (enrolments && !selectedEnrolment) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-gray-400 px-4 text-center">
        <GraduationCap className="w-16 h-16 text-neutral-800 mb-4 animate-bounce" />
        <h2 className="font-serif text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-sm max-w-md font-light mb-6 text-gray-500">
          You are not enrolled in this batch. Please join this batch or check your subscription.
        </p>
        <div className="flex gap-4">
          <GoldButton variant="outlined" className="py-2.5 px-6 text-xs" onClick={() => router.push('/my-batches')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> My Portal
          </GoldButton>
          <GoldButton variant="filled" className="py-2.5 px-6 text-xs" onClick={() => router.push('/my-batches/join')}>
            Join Batches
          </GoldButton>
        </div>
      </div>
    );
  }

  const hasMultipleBatches = enrolments && enrolments.length > 1;

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-black overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Header Block */}
        <div className="border-b border-[var(--gold-200)] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold font-mono block mb-1">
              Sadhana Educational Portal
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-[var(--gold)] animate-pulse" /> Academy Portal
              </h1>
              
              {/* Batch Selector Dropdown (visible if user has multiple batches) */}
              {hasMultipleBatches && (
                <div className="relative inline-block text-left ml-0 sm:ml-2">
                  <div className="relative">
                    <select
                      value={id || ''}
                      onChange={(e) => router.push(`/my-batches/${e.target.value}`)}
                      className="appearance-none bg-neutral-900 border border-[var(--gold-200)] text-white text-xs font-mono py-1.5 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--gold)] cursor-pointer hover:border-[var(--gold)] transition-colors"
                    >
                      {enrolments.map((enr: any) => {
                        const b = enr.batchId;
                        if (!b) return null;
                        return (
                          <option key={b._id} value={b._id}>
                            {b.title}
                          </option>
                        );
                      })}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--gold)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA: Join Batch on top right */}
          <div className="flex items-center gap-3">
            <GoldButton
              variant="filled"
              className="py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
              onClick={() => router.push('/my-batches/join')}
            >
              <PlusCircle className="w-4 h-4 text-black" />
              <span>Join Batch</span>
            </GoldButton>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-10">
          {selectedBatch ? (
            <div className="space-y-8">
              
              {/* Batch Overview Banner */}
              <div className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <GraduationCap className="w-40 h-40 text-white" />
                </div>
                <div className="max-w-3xl space-y-2 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="bg-[var(--gold-100)] border border-[var(--gold-200)] text-[var(--gold)] text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full">
                      {selectedBatch.category || 'Academy'} Batch
                    </span>
                  </div>
                  <h2 className="font-sans text-[34px] sm:text-[40px] font-bold text-white">{selectedBatch.title}</h2>
                  <FormattedText text={selectedBatch.description} className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed" />
                </div>
              </div>

              {/* Batch Announcements/Notifications */}
              {announcements && announcements.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[var(--gold)] flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[var(--gold)] animate-bounce" /> Announcements from Admin
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {announcements.map((ann: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 relative overflow-hidden flex gap-4 items-start"
                      >
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 mt-0.5">
                          <Bell className="w-4 h-4" />
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                            <span className="font-bold text-amber-500 uppercase tracking-widest text-[9px]">Broadcasted Notice</span>
                            <span>{new Date(ann.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-gray-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-light">
                            {ann.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lectures List */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[var(--gold)] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[var(--gold)]" /> Lectures
                </h3>
                {loadingLectures ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <GoldCard key={i} theme="dark" className="transition-spring">
                        <div className="space-y-4 flex flex-col justify-between h-40">
                          <div className="space-y-2">
                            <Skeleton className="w-3/4 h-4" />
                            <Skeleton className="w-full h-3" />
                            <Skeleton className="w-5/6 h-3" />
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-neutral-800/60">
                            <Skeleton className="w-1/3 h-3" />
                            <Skeleton className="w-20 h-7 rounded-full" />
                          </div>
                        </div>
                      </GoldCard>
                    ))}
                  </div>
                ) : lectures && lectures.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lectures.map((lec: any) => (
                      <GoldCard key={lec._id} theme="dark" className="transition-spring hover:border-[var(--gold)]">
                        <div className="space-y-4 flex flex-col justify-between h-full min-h-[140px]">
                          <div>
                            <h4 className="font-sans text-base font-bold text-white line-clamp-1">{lec.title}</h4>
                            <FormattedText text={lec.description} className="text-gray-400 text-[11px] mt-2 line-clamp-2 font-light leading-relaxed" />
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-neutral-800/60">
                            <span className="text-[10px] text-gray-500 font-mono">Duration: {lec.duration || 'N/A'} mins</span>
                            <button
                              onClick={() => router.push(`/lecture/${lec._id}`)}
                              className="bg-[var(--gold)] text-black text-xs font-bold py-1.5 px-3.5 rounded-full hover:bg-[var(--gold-light)] flex items-center gap-1 transition-spring hover:scale-105 cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-black" /> Watch
                            </button>
                          </div>
                        </div>
                      </GoldCard>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-xs py-4 font-light bg-neutral-950/20 border border-neutral-900 rounded-xl px-4 text-center">
                    No lectures published in this batch yet.
                  </p>
                )}
              </div>

              {/* PDF Materials List */}
              <div className="space-y-4 pt-4">
                <h3 className="font-serif text-lg font-bold text-[var(--gold)] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[var(--gold)]" /> Notes & Materials
                </h3>
                {loadingPdfs ? (
                  <div className="space-y-2.5">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                        <div className="flex items-center gap-2 flex-grow">
                          <Skeleton className="w-4 h-4 rounded animate-shimmer" />
                          <Skeleton className="w-1/2 h-3" />
                        </div>
                        <Skeleton className="w-24 h-4" />
                      </div>
                    ))}
                  </div>
                ) : pdfs && pdfs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pdfs.map((pdf: any) => (
                      <div key={pdf._id} className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60 text-xs transition-spring hover:border-[var(--gold-200)]">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-950/20 border border-red-900/30 rounded-lg text-red-400">
                            <FileText className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-white text-sm line-clamp-1">{pdf.title}</span>
                        </div>
                        <a
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--gold)] hover:text-[var(--gold-light)] text-[10px] font-mono font-semibold uppercase tracking-wider transition-colors ml-4 flex-shrink-0"
                        >
                          Download PDF
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-xs py-4 font-light bg-neutral-950/20 border border-neutral-900 rounded-xl px-4 text-center">
                    No notes or materials available for this batch yet.
                  </p>
                )}
              </div>

            </div>
          ) : (
            <div className="min-h-[300px] rounded-2xl border border-dashed border-neutral-800 flex flex-col items-center justify-center text-center text-gray-500 p-8">
              <LoadingSpinner size="md" />
              <p className="text-xs mt-2">Loading batch content...</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
