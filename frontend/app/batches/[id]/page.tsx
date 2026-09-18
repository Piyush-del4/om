'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { 
  ArrowLeft, GraduationCap, Compass, Sparkles, CheckCircle2, 
  ShieldCheck, Award, Video, BookOpen, HelpCircle, ChevronDown, 
  FileText, Check, Lock, Clock, Layers, Hash, PenTool, Share2
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CountdownTimer } from '@/components/shop/CountdownTimer';
import { env } from '@/lib/env';
import { FormattedText } from '@/components/ui/FormattedText';
import { BatchCoverVisual } from '@/components/batches/BatchCoverVisual';

export default function PublicBatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
        alert('Failed to load Razorpay SDK. Please check your internet connection.');
        return;
      }

      const options = {
        key: data.key || env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'OM Astrology AMC',
        description: `Join Batch: ${batch?.title || 'Academy Batch'}`,
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
            alert('🎉 Payment verified! You are now enrolled in the batch.');
            router.push(`/my-batches/${id}`);
          } catch (err: any) {
            alert('Payment verification failed. Please contact support with your transaction details.');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || '',
        },
        theme: { color: '#6F2935' },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Failed to process enrollment');
    },
  });

  if (batchLoading || authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-gray-600">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
          Loading Academy Course Details...
        </p>
      </div>
    );
  }

  if (error || !batch) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-gray-900 px-4 text-center">
        <GraduationCap className="w-16 h-16 text-[#A78652] mb-4 opacity-40 animate-bounce" />
        <h2 className="font-serif text-3xl font-bold text-[#1D1C1A] mb-2">Batch Not Found</h2>
        <p className="text-sm max-w-md font-light mb-6 text-gray-500">
          The requested study course does not exist or may have completed enrollment.
        </p>
        <Link href="/my-batches/join">
          <GoldButton variant="burgundy" className="py-3 px-8 text-xs font-bold shadow-md">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Batches
          </GoldButton>
        </Link>
      </div>
    );
  }

  const isEnrolled = batch.isEnrolled;
  const now = new Date();
  const hasActiveOffer = 
    batch.offerPrice !== undefined && 
    batch.offerPrice !== null &&
    (!batch.offerExpiresAt || now < new Date(batch.offerExpiresAt));

  const batchPrice = (batch.price || 0) / 100;
  const offerPrice = hasActiveOffer ? (batch.offerPrice || 0) / 100 : batchPrice;
  const isFree = batchPrice === 0 && !hasActiveOffer;

  // Learning outcomes
  const learningOutcomes = [
    { title: 'Core Principles & Symbology', desc: 'Master fundamental archetypes, elemental dignities, and sacred correspondences.' },
    { title: 'Arcana & Card Synthesis', desc: 'Understand major and minor arcana interactions for accurate reading breakdowns.' },
    { title: 'Custom Spread Formations', desc: 'Learn 3-card, 7-card, and advanced Celtic Cross spread layouts for deep clarity.' },
    { title: 'Intuitive Reading Practice', desc: 'Develop confidence in synthesizing planetary transits and card symbolism.' },
    { title: 'Client Consultation Ethics', desc: 'Framing constructive questions, managing client readings, and ethical boundaries.' },
    { title: 'Practical Case Studies', desc: 'Real-world reading analysis across love, career, finances, and personal growth.' },
  ];

  // Modules accordion data
  const modules = [
    {
      title: 'Module 1: Foundations & Sacred Symbology',
      lessons: [
        'Introduction to course structure & foundational history',
        'Understanding primary symbols, elements, and planetary alignments',
        'Cleansing, tuning, and preparing your sacred space',
      ],
    },
    {
      title: 'Module 2: Deep Arcana & Pattern Synthesis',
      lessons: [
        'Major Arcana journey: The 22 steps of spiritual transformation',
        'Minor Arcana suites: Cups, Pentacles, Swords, and Wands in detail',
        'Synthesizing dignity combinations and reversed interpretations',
      ],
    },
    {
      title: 'Module 3: Advanced Spreads & Professional Practice',
      lessons: [
        'Mastering multi-card spread formations and time-frame reads',
        'Professional ethics, client communication, and question framing',
        'Live case studies and guided practical reading sessions',
      ],
    },
  ];

  // FAQs
  const faqs = [
    {
      q: 'How are the live classes conducted?',
      a: 'Classes are conducted online via live video lectures with interactive Q&A sessions. Video archives and downloadable study PDF notes are updated in your student portal after every lecture.',
    },
    {
      q: 'Do I need any prior experience to enroll?',
      a: 'No prior background is required! This course begins with foundational concepts and guides you step-by-step to advanced reading techniques.',
    },
    {
      q: 'Will I receive study notes and materials?',
      a: 'Yes! All enrolled students receive access to downloadable PDF reference sheets, slide decks, and cheat sheets within their student portal.',
    },
    {
      q: 'Is a certificate provided upon completion?',
      a: 'Yes, an official OM Astrology AMC Academy Certificate of Completion is awarded to students after completing course lectures.',
    },
  ];

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-[#FAF8F5] text-gray-900 pb-20">
      
      {/* ── BREADCRUMB NAVIGATION BAR ───────────────────────────────────── */}
      <div className="border-b border-[#E7E0D4] bg-[#F3EEE6]/60 backdrop-blur-sm py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            href="/my-batches/join" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-700 hover:text-[#6F2935] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#A78652]" />
            Back to Batches
          </Link>

          <span className="text-[11px] font-mono text-[#A78652] uppercase tracking-widest font-semibold bg-white border border-[#E7E0D4] px-3 py-1 rounded-full">
            Academy Course Portal
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-8">
        
        {/* ── MAIN 2-COLUMN LAYOUT: CONTENT LEFT, STICKY ENROLLMENT SIDEBAR RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ── LEFT COLUMN: MAIN COURSE DETAILS & SYLLABUS (7 Cols) ─────── */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. Hero Visual Banner */}
            <div className="space-y-4">
              <BatchCoverVisual 
                coverImage={batch.coverImage} 
                title={batch.title} 
                category={batch.category}
                aspectRatio="hero"
                className="rounded-3xl shadow-lg border border-[#E7E0D4]"
              />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#6F2935] bg-[#6F2935]/10 px-3 py-1 rounded-full uppercase font-bold">
                    {batch.category || 'Academy'} Cohort
                  </span>
                  <span className="text-xs text-gray-500 font-mono">• Interactive Online Academy</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1C1A] leading-tight">
                  {batch.title}
                </h1>
              </div>
            </div>

            {/* 2. Course Overview & Description */}
            <div className="space-y-3 bg-white p-6 rounded-3xl border border-[#E7E0D4] shadow-xs">
              <h3 className="font-serif text-xl font-bold text-[#1D1C1A] flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#A78652]" /> Course Overview
              </h3>
              <div className="text-gray-700 text-sm leading-relaxed font-light">
                {batch.description ? (
                  <FormattedText text={batch.description} />
                ) : (
                  <p>Comprehensive occult science training cohort combining traditional wisdom with practical interpretation techniques.</p>
                )}
              </div>
            </div>

            {/* 3. What You'll Learn Grid */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#1D1C1A] flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#A78652]" /> What You'll Learn
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningOutcomes.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-[#E7E0D4] space-y-1.5 shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#6F2935]/10 flex items-center justify-center text-[#6F2935] shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#1D1C1A]">{item.title}</h4>
                    </div>
                    <p className="text-xs text-gray-500 font-light leading-relaxed pl-8">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Interactive Curriculum Syllabus Modules Accordion */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E7E0D4] pb-3">
                <h3 className="font-serif text-2xl font-bold text-[#1D1C1A] flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-[#A78652]" /> Curriculum Syllabus Modules
                </h3>
                <span className="text-xs font-mono text-[#A78652] font-semibold">3 Modules</span>
              </div>

              <div className="space-y-3">
                {modules.map((mod, idx) => {
                  const isOpen = openModuleIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white border border-[#E7E0D4] rounded-2xl overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between bg-[#FAF8F5] hover:bg-[#F3EEE6] transition-colors cursor-pointer"
                      >
                        <span className="font-serif font-bold text-base text-[#1D1C1A] flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#6F2935]" /> {mod.title}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-4 border-t border-[#E7E0D4] space-y-2 bg-white">
                          {mod.lessons.map((les, lIdx) => (
                            <div key={lIdx} className="flex items-start gap-2.5 text-xs text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#A78652] mt-1.5 shrink-0" />
                              <span>{les}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Key Academy Features Cards */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#1D1C1A] flex items-center gap-2">
                <Award className="w-6 h-6 text-[#A78652]" /> Included Academy Benefits
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#E7E0D4] flex items-start gap-3 shadow-xs">
                  <Video className="w-6 h-6 text-[#6F2935] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#1D1C1A]">Live & Recorded Lectures</h4>
                    <p className="text-xs text-gray-500 font-light mt-0.5">Interactive live video sessions with archived recordings for review.</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E7E0D4] flex items-start gap-3 shadow-xs">
                  <BookOpen className="w-6 h-6 text-[#6F2935] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#1D1C1A]">PDF Reference Notes</h4>
                    <p className="text-xs text-gray-500 font-light mt-0.5">Downloadable reference sheets, slides, and cheat sheets.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. FAQ Accordion */}
            <div className="space-y-4 pt-4 border-t border-[#E7E0D4]">
              <h3 className="font-serif text-2xl font-bold text-[#1D1C1A] flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-[#A78652]" /> Frequently Asked Questions
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="bg-white border border-[#E7E0D4] rounded-2xl overflow-hidden shadow-xs">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-[#1D1C1A] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-gray-600 font-light leading-relaxed border-t border-[#FAF7F2] pt-2">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: STICKY ENROLLMENT & PURCHASE SIDEBAR (5 Cols) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6">
            <div className="bg-white border border-[#A78652]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              
              <div className="border-b border-[#E7E0D4] pb-4 space-y-1">
                <span className="text-[10px] font-mono text-[#A78652] uppercase tracking-widest font-bold block">
                  Course Enrollment
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1D1C1A]">
                  {batch.title}
                </h3>
              </div>

              {/* Offer Timer if active */}
              {hasActiveOffer && batch.offerExpiresAt && (
                <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E7E0D4] space-y-1">
                  <span className="text-[11px] font-mono text-[#6F2935] font-bold block">Special Offer Ending Soon:</span>
                  <CountdownTimer expiresAt={batch.offerExpiresAt} />
                </div>
              )}

              {/* Price Display */}
              <div className="space-y-1">
                {isEnrolled ? (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-2xl space-y-1">
                    <span className="text-xs font-mono text-green-800 font-bold block">Enrollment Status</span>
                    <span className="text-base font-bold text-green-700 font-sans flex items-center gap-1.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600" /> You are Enrolled & Active!
                    </span>
                  </div>
                ) : hasActiveOffer ? (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-gray-400 block uppercase">Course Tuition Fee</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-extrabold text-[#6F2935] font-sans">
                        ₹{offerPrice.toLocaleString()}
                      </span>
                      <span className="text-gray-400 line-through text-lg font-sans">
                        ₹{batchPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ) : isFree ? (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-gray-400 block uppercase">Course Tuition Fee</span>
                    <span className="text-3xl font-extrabold text-green-700 font-sans">FREE ACCESS</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-gray-400 block uppercase">Course Tuition Fee</span>
                    <span className="text-4xl font-extrabold text-[#1D1C1A] font-sans">
                      ₹{batchPrice.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {isEnrolled ? (
                  <Link href={`/my-batches/${id}`} className="block">
                    <GoldButton variant="burgundy" className="w-full py-4 text-sm font-bold shadow-lg">
                      Go to Student Portal →
                    </GoldButton>
                  </Link>
                ) : isAuthenticated ? (
                  <GoldButton
                    variant="burgundy"
                    className="w-full py-4 text-sm font-bold shadow-lg"
                    onClick={() => joinMutation.mutate()}
                    isLoading={joinMutation.isPending}
                  >
                    {isFree ? 'Enroll Free Now →' : 'Confirm & Pay Tuition →'}
                  </GoldButton>
                ) : (
                  <div className="space-y-2">
                    <Link href={`/login?redirect=/batches/${id}`} className="block">
                      <GoldButton variant="burgundy" className="w-full py-3.5 text-xs font-bold shadow-md">
                        Log In to Enroll
                      </GoldButton>
                    </Link>
                    <Link href={`/register?redirect=/batches/${id}`} className="block">
                      <GoldButton variant="outlined" className="w-full py-3 text-xs font-bold">
                        Create Account to Enroll
                      </GoldButton>
                    </Link>
                  </div>
                )}
              </div>

              {/* Trust Points List */}
              <div className="pt-4 border-t border-[#FAF7F2] space-y-2.5 text-xs text-gray-600 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#A78652]" />
                  <span>Verified OM Astrology AMC Academy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#A78652]" />
                  <span>Live Classes + Lecture Video Archives</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#A78652]" />
                  <span>Official Academy Certificate of Completion</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
