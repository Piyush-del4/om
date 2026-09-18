'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { 
  GraduationCap, Search, ArrowLeft, CheckCircle2, Compass, 
  Sparkles, BookOpen, Clock, Calendar, Check, X, ShieldAlert, Video, Award 
} from 'lucide-react';
import { BatchCardSkeleton } from '@/components/ui/Skeleton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CountdownTimer } from '@/components/shop/CountdownTimer';
import { FormattedText } from '@/components/ui/FormattedText';
import { BatchCoverVisual } from '@/components/batches/BatchCoverVisual';
import toast from 'react-hot-toast';

export default function JoinBatchPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/login?redirect=/my-batches/join');
  }, [isAuthenticated, isLoading, router]);

  // Fetch user enrolments
  const { data: enrolments, isLoading: loadingEnrolled } = useQuery({
    queryKey: ['my-enrolments'],
    queryFn: async () => {
      const res = await client.get('/batches/me/enrolments');
      return res.data?.data || [];
    },
    enabled: isAuthenticated,
  });

  // Fetch all available batches
  const { data: allBatches, isLoading: loadingAll } = useQuery({
    queryKey: ['all-batches'],
    queryFn: async () => {
      const res = await client.get('/batches');
      return res.data?.data || [];
    },
  });

  const enrolledBatchIds = useMemo(() => {
    return new Set(
      (enrolments || []).map((e: any) => (e.batchId?._id || e.batchId?.id || e.batchId)?.toString())
    );
  }, [enrolments]);

  const isEnrolled = (batchId: string) => enrolledBatchIds.has(batchId?.toString());

  // Filter batches based on search query & selected category
  const filteredBatches = useMemo(() => {
    if (!allBatches) return [];
    return allBatches.filter((b: any) => {
      if (b.isDeleted) return false;

      const enrolled = isEnrolled(b._id);
      if (showEnrolledOnly && !enrolled) return false;

      const matchCategory = 
        selectedCategory === 'all' ||
        b.category?.toLowerCase().replace(/\s+/g, '') === selectedCategory.toLowerCase().replace(/\s+/g, '');

      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        b.title?.toLowerCase().includes(query) ||
        b.description?.toLowerCase().includes(query) ||
        b.category?.toLowerCase().includes(query);

      return matchCategory && matchSearch;
    });
  }, [allBatches, selectedCategory, showEnrolledOnly, searchQuery, enrolledBatchIds]);

  const categories = [
    { id: 'all', label: 'All Batches' },
    { id: 'tarotcard', label: 'Tarot' },
    { id: 'numerology', label: 'Numerology' },
    { id: 'astrology', label: 'Astrology' },
    { id: 'graphology', label: 'Graphology' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-gray-600">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
          Opening Academy Cohorts...
        </p>
      </div>
    );
  }

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-[#FAF8F5] text-gray-900 pb-20">
      
      {/* ── BREADCRUMB & TOP NAV ───────────────────────────────────────── */}
      <div className="border-b border-[#E7E0D4] bg-[#F3EEE6]/60 backdrop-blur-sm py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-700 hover:text-[#6F2935] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#A78652]" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <Link 
              href="/my-batches"
              className="text-[11px] font-mono text-[#6F2935] hover:underline uppercase tracking-widest font-bold"
            >
              My Enrolled Courses ({enrolments?.length || 0})
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">

        {/* ── HERO DISCOVERY HEADER & TOOLBAR ────────────────────────────── */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E7E0D4] pb-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#A78652] uppercase tracking-widest font-bold bg-white border border-[#E7E0D4] px-3 py-1 rounded-full inline-block">
                OM Astrology AMC Academy
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1C1A] flex items-center gap-3">
                <GraduationCap className="w-9 h-9 text-[#6F2935]" /> Explore Study Batches & Cohorts
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm font-light max-w-2xl">
                Join live interactive training cohorts, master occult science fundamentals, download syllabus PDF notes, and access classroom lecture archives.
              </p>
            </div>

            {/* Integrated Search Bar */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A78652]" />
              <input
                type="text"
                placeholder="Search batches by name or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E7E0D4] focus:border-[#A78652] text-gray-900 text-xs py-2.5 pl-10 pr-8 rounded-xl transition-all focus:outline-none focus:ring-1 focus:ring-[#A78652]/30 placeholder-gray-400 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills & Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E7E0D4] shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-xs font-mono px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#6F2935] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-gray-700 border border-[#E7E0D4] hover:border-[#A78652] hover:text-[#6F2935]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Filter by Enrolled Only Toggle */}
            <button
              onClick={() => setShowEnrolledOnly(!showEnrolledOnly)}
              className={`text-xs font-mono px-3 py-1.5 rounded-xl font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                showEnrolledOnly
                  ? 'bg-green-50 border-green-300 text-green-800'
                  : 'bg-white border-[#E7E0D4] text-gray-600 hover:border-[#A78652]'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${showEnrolledOnly ? 'text-green-600' : 'text-gray-400'}`} />
              <span>Enrolled Only</span>
            </button>
          </div>
        </div>

        {/* ── BATCHES CONTENT SECTION ───────────────────────────────────── */}
        {loadingAll || (loadingEnrolled && !enrolments) ? (
          <div className="py-8">
            <BatchCardSkeleton count={3} />
          </div>
        ) : filteredBatches.length === 1 ? (
          
          /* ── 1. SINGLE BATCH FEATURED HERO LAYOUT (ELIMINATES BLANK WHITESPACE) ── */
          (() => {
            const batch = filteredBatches[0];
            const enrolled = isEnrolled(batch._id);
            const now = new Date();
            const hasActiveOffer = 
              batch.offerPrice !== undefined && 
              batch.offerPrice !== null &&
              (!batch.offerExpiresAt || now < new Date(batch.offerExpiresAt));

            const batchPrice = (batch.price || 0) / 100;
            const offerPrice = hasActiveOffer ? (batch.offerPrice || 0) / 100 : batchPrice;
            const isFree = batchPrice === 0 && !hasActiveOffer;

            return (
              <div className="bg-white border border-[#A78652]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
                
                {/* Featured Badge Header */}
                <div className="flex items-center justify-between border-b border-[#E7E0D4] pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#A78652]" />
                    <span className="font-serif text-lg font-bold text-[#1D1C1A]">
                      Featured Academy Cohort
                    </span>
                  </div>

                  {enrolled ? (
                    <span className="text-xs font-mono font-bold bg-green-100 text-green-800 border border-green-300 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Enrolled & Active
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold bg-[#6F2935]/10 text-[#6F2935] border border-[#6F2935]/20 px-3 py-1 rounded-full">
                      Enrollment Open
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Column: Visual Banner (Col Span 5) */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <BatchCoverVisual 
                      coverImage={batch.coverImage} 
                      title={batch.title} 
                      category={batch.category}
                      aspectRatio="hero"
                      className="rounded-2xl shadow-md border border-[#E7E0D4]"
                    />

                    {/* Quick Offer Timer */}
                    {hasActiveOffer && batch.offerExpiresAt && (
                      <div className="mt-4 bg-[#FAF8F5] p-3 rounded-2xl border border-[#E7E0D4] flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-[#6F2935] font-bold">Limited Offer:</span>
                        <CountdownTimer expiresAt={batch.offerExpiresAt} />
                      </div>
                    )}
                  </div>

                  {/* Right Column: Detailed Info & Enrollment Block (Col Span 7) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#6F2935] bg-[#6F2935]/10 px-2.5 py-0.5 rounded-full font-bold">
                          {batch.category || 'Academy Cohort'}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">• Structured Live Class</span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D1C1A] leading-snug">
                        {batch.title}
                      </h2>

                      <FormattedText 
                        text={batch.description} 
                        className="text-gray-600 text-sm leading-relaxed font-light line-clamp-4" 
                      />

                      {/* Cohort Highlights Grid */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E7E0D4] flex items-center gap-3">
                          <Video className="w-5 h-5 text-[#A78652] shrink-0" />
                          <div>
                            <p className="text-[11px] font-bold text-gray-900">Live Lectures</p>
                            <p className="text-[10px] text-gray-500">Interactive Q&A</p>
                          </div>
                        </div>

                        <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E7E0D4] flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-[#A78652] shrink-0" />
                          <div>
                            <p className="text-[11px] font-bold text-gray-900">PDF Study Notes</p>
                            <p className="text-[10px] text-gray-500">Downloadable Reference</p>
                          </div>
                        </div>

                        <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E7E0D4] flex items-center gap-3">
                          <Compass className="w-5 h-5 text-[#A78652] shrink-0" />
                          <div>
                            <p className="text-[11px] font-bold text-gray-900">Practical Spreads</p>
                            <p className="text-[10px] text-gray-500">Real Case Studies</p>
                          </div>
                        </div>

                        <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E7E0D4] flex items-center gap-3">
                          <Award className="w-5 h-5 text-[#A78652] shrink-0" />
                          <div>
                            <p className="text-[11px] font-bold text-gray-900">Certification</p>
                            <p className="text-[10px] text-gray-500">Academy Completion</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action CTA Block */}
                    <div className="pt-4 border-t border-[#FAF7F2] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      
                      {/* Price Display */}
                      <div>
                        {enrolled ? (
                          <div className="space-y-0.5">
                            <span className="text-xs font-mono text-gray-400 block uppercase">Enrolled Status</span>
                            <span className="text-lg font-bold text-green-700 font-sans flex items-center gap-1.5">
                              <CheckCircle2 className="w-5 h-5 text-green-600" /> Active Student
                            </span>
                          </div>
                        ) : hasActiveOffer ? (
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono text-red-600 uppercase font-bold block">
                              {batch.specialOfferTitle || 'Special Offer'}
                            </span>
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-black text-[#1D1C1A] font-sans">
                                ₹{offerPrice.toLocaleString()}
                              </span>
                              <span className="text-gray-400 line-through text-base font-sans">
                                ₹{batchPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ) : isFree ? (
                          <div className="space-y-0.5">
                            <span className="text-xs font-mono text-gray-400 block uppercase">Course Fee</span>
                            <span className="text-2xl font-extrabold text-green-700 font-sans">Free Access</span>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="text-xs font-mono text-gray-400 block uppercase">Course Fee</span>
                            <span className="text-4xl font-black text-[#1D1C1A] font-sans">
                              ₹{batchPrice.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action CTA Buttons */}
                      <div className="flex items-center gap-3">
                        <Link href={`/batches/${batch._id}`} className="flex-1 sm:flex-initial">
                          <GoldButton variant="outlined" className="w-full py-3 px-6 text-xs font-bold">
                            View Syllabus
                          </GoldButton>
                        </Link>

                        {enrolled ? (
                          <Link href={`/my-batches/${batch._id}`} className="flex-1 sm:flex-initial">
                            <GoldButton variant="burgundy" className="w-full py-3 px-6 text-xs font-bold shadow-md">
                              Go to Student Portal →
                            </GoldButton>
                          </Link>
                        ) : (
                          <Link href={`/batches/${batch._id}`} className="flex-1 sm:flex-initial">
                            <GoldButton variant="burgundy" className="w-full py-3 px-8 text-xs font-bold shadow-md">
                              {isFree ? 'Enroll Free →' : 'Enroll Now →'}
                            </GoldButton>
                          </Link>
                        )}
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            );
          })()
        
        ) : filteredBatches.length > 1 ? (

          /* ── 2. MULTI-BATCH RESPONSIVE GRID ────────────────────────────── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredBatches.map((batch: any) => {
              const enrolled = isEnrolled(batch._id);
              const now = new Date();
              const hasActiveOffer = 
                batch.offerPrice !== undefined && 
                batch.offerPrice !== null &&
                (!batch.offerExpiresAt || now < new Date(batch.offerExpiresAt));

              const batchPrice = (batch.price || 0) / 100;
              const offerPrice = hasActiveOffer ? (batch.offerPrice || 0) / 100 : batchPrice;
              const isFree = batchPrice === 0 && !hasActiveOffer;

              return (
                <div 
                  key={batch._id} 
                  className="bg-white border border-[#E7E0D4] hover:border-[#A78652] rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-lg group"
                >
                  <div>
                    {/* Visual Banner */}
                    <div className="relative">
                      <BatchCoverVisual 
                        coverImage={batch.coverImage} 
                        title={batch.title} 
                        category={batch.category}
                        aspectRatio="standard"
                      />
                      
                      {enrolled && (
                        <div className="absolute top-3 right-3 bg-green-600 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 z-20">
                          <CheckCircle2 className="w-3 h-3" /> Enrolled
                        </div>
                      )}
                    </div>

                    {/* Body Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#6F2935] bg-[#6F2935]/10 px-2.5 py-0.5 rounded-full uppercase font-bold">
                          {batch.category || 'Academy'}
                        </span>

                        {/* Price */}
                        {!enrolled && (
                          <div className="text-right">
                            {hasActiveOffer ? (
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-black text-xl text-[#1D1C1A] font-sans">
                                  ₹{offerPrice.toLocaleString()}
                                </span>
                                <span className="text-gray-400 line-through text-xs font-sans">
                                  ₹{batchPrice.toLocaleString()}
                                </span>
                              </div>
                            ) : isFree ? (
                              <span className="font-bold text-xs text-green-700 font-mono">FREE</span>
                            ) : (
                              <span className="font-black text-xl text-[#1D1C1A] font-sans">
                                ₹{batchPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <Link href={`/batches/${batch._id}`}>
                        <h3 className="font-serif text-lg font-bold text-[#1D1C1A] group-hover:text-[#6F2935] transition-colors line-clamp-1">
                          {batch.title}
                        </h3>
                      </Link>

                      <FormattedText 
                        text={batch.description} 
                        className="text-gray-600 text-xs leading-relaxed font-light line-clamp-3" 
                      />
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 pt-0 border-t border-[#FAF7F2] mt-4">
                    <div className="pt-3">
                      {enrolled ? (
                        <Link href={`/my-batches/${batch._id}`}>
                          <GoldButton variant="burgundy" className="w-full py-2.5 text-xs font-bold">
                            Go to Student Portal →
                          </GoldButton>
                        </Link>
                      ) : (
                        <Link href={`/batches/${batch._id}`}>
                          <GoldButton variant="outlined" className="w-full py-2.5 text-xs font-bold">
                            View Batch Details
                          </GoldButton>
                        </Link>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        ) : (

          /* ── 3. EMPTY SEARCH / FILTER STATE ────────────────────────────── */
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E7E0D4] p-8 space-y-4 max-w-xl mx-auto shadow-xs">
            <GraduationCap className="w-16 h-16 text-[#A78652] mx-auto opacity-40 animate-bounce" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-2xl text-[#1D1C1A]">No Batches Match Your Query</h3>
              <p className="text-gray-500 text-xs sm:text-sm font-light">
                Try searching with another keyword or reset the category filters.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setShowEnrolledOnly(false);
                }}
                className="py-2.5 px-6 bg-[#6F2935] text-white rounded-xl text-xs font-bold hover:bg-[#8A3443] transition-colors cursor-pointer"
              >
                Clear Filters & View All
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
