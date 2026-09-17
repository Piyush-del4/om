'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { UserPanelShell } from '@/components/user/UserPanelShell';
import { GraduationCap, ArrowRight, BookOpen, PlusCircle, PlayCircle } from 'lucide-react';
import { FormattedText } from '@/components/ui/FormattedText';

export default function MyBatchesPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Fetch enrolled batches
  const { data: enrolments, isLoading: loadingEnrolled } = useQuery({
    queryKey: ['my-enrolments'],
    queryFn: async () => {
      const res = await client.get('/batches/me/enrolments');
      return res.data?.data || [];
    },
    enabled: isAuthenticated,
  });

  return (
    <UserPanelShell
      activeTab="my-batches"
      title="Enrolled Courses & Batches"
      subtitle="Access your academy study batches, video lectures, pdf notes, and classroom materials."
    >
      <div className="space-y-6 max-w-5xl">
        {/* Header Action Row */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <h3 className="font-serif font-bold text-base text-gray-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-rose-600" />
              <span>Academy Enrolments</span>
            </h3>
            <p className="text-gray-500 text-xs">
              {enrolments?.length || 0} active study batch{enrolments?.length === 1 ? '' : 'es'}
            </p>
          </div>

          <Link
            href="/my-batches/join"
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Join New Batch</span>
          </Link>
        </div>

        {/* Batches Grid */}
        {loadingEnrolled ? (
          <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center">
            <BookOpen className="w-8 h-8 text-rose-500 mx-auto animate-bounce mb-3" />
            <p className="text-gray-500 text-xs animate-pulse font-mono">Loading enrolled courses...</p>
          </div>
        ) : enrolments && enrolments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolments.map((enr: any) => {
              const batch = enr.batchId;
              if (!batch || !batch._id) return null;

              const watchedCount = enr.watchedLectures?.length || 0;
              const totalCount = batch.totalLectures || 1;
              const pct = Math.min(100, Math.round((watchedCount / totalCount) * 100));

              return (
                <div
                  key={enr._id || batch._id}
                  onClick={() => router.push(`/my-batches/${batch._id}`)}
                  className="bg-white rounded-3xl border border-gray-200 hover:border-rose-400/80 transition-all duration-200 shadow-sm overflow-hidden flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="w-full h-40 bg-slate-900 relative overflow-hidden">
                      <img
                        src={batch.coverImage?.url || '/images/logo.png'}
                        alt={batch.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e: any) => {
                          e.target.src = '/images/logo.png';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-rose-300 text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full font-bold">
                        {batch.category || 'Academy'}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h4 className="font-serif font-bold text-base text-gray-900 group-hover:text-rose-600 transition-colors">
                        {batch.title}
                      </h4>
                      <FormattedText
                        text={batch.description || ''}
                        className="text-gray-500 text-xs line-clamp-2 font-light leading-relaxed"
                      />

                      {/* Watch Progress Slider */}
                      <div className="space-y-1 pt-2">
                        <div className="flex justify-between text-[11px] font-mono text-gray-500">
                          <span>Progress</span>
                          <span className="font-bold text-rose-600">{pct}% watched</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-gray-100 mt-2">
                    <div className="pt-3 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-gray-400">
                        {watchedCount} / {totalCount} lectures
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
                        <span>Enter Portal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-4">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-gray-800">Not Enrolled in Any Batches</h3>
              <p className="text-gray-500 text-xs max-w-xs mx-auto">
                Explore our upcoming astrology and occult science academy courses to enroll.
              </p>
            </div>
            <Link
              href="/my-batches/join"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              <span>Explore Batches</span>
            </Link>
          </div>
        )}
      </div>
    </UserPanelShell>
  );
}
