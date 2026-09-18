'use client';

import React, { use, useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { 
  ArrowLeft, Clock, Compass, Phone, MessageSquare, AlertCircle, CheckCircle2,
  Calendar, CheckSquare, Star, Award, ShieldCheck, Check, Sparkles, 
  ChevronDown, ChevronRight, User, HelpCircle, Lock, BookOpen, Share2 
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { env } from '@/lib/env';
import { FormattedText } from '@/components/ui/FormattedText';
import { SEOInternalMesh } from '@/components/seo/SEOInternalMesh';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export default function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const router = useRouter();
  const bookingCardRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = () => {
    bookingCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Booking states
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Attendee intake details
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeDateOfBirth, setAttendeeDateOfBirth] = useState('');
  const [attendeeTimeOfBirth, setAttendeeTimeOfBirth] = useState('');

  useEffect(() => {
    if (user) {
      setAttendeeName(user.name || '');
      setAttendeeDateOfBirth(user.dateOfBirth || '');
      setAttendeeTimeOfBirth(user.birthTime || '');
    }
  }, [user]);

  // Fetch all consultation types to find matching ID & related services
  const { data: appointmentTypes = [], isLoading: typesLoading } = useQuery({
    queryKey: ['appointmentTypes'],
    queryFn: async () => {
      const res = await client.get('/appointments/types');
      return res.data?.data || [];
    },
  });

  const appType = useMemo(() => {
    return appointmentTypes?.find((t: any) => t._id === id);
  }, [appointmentTypes, id]);

  // Related consultation types (excluding current service)
  const relatedTypes = useMemo(() => {
    if (!appointmentTypes) return [];
    return appointmentTypes.filter((t: any) => t._id !== id).slice(0, 3);
  }, [appointmentTypes, id]);

  // Fetch available time slots when date is selected
  const { data: availableSlots = [], isFetching: isFetchingSlots } = useQuery({
    queryKey: ['slots', selectedDate, appType?.duration],
    queryFn: async () => {
      if (!selectedDate || !appType) return [];
      const res = await client.get('/appointments/slots', {
        params: {
          date: selectedDate,
          duration: appType.duration,
        },
      });
      return res.data?.data || [];
    },
    enabled: !!selectedDate && !!appType,
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

  // Booking mutation with Razorpay verification
  const bookingMutation = useMutation({
    mutationFn: async () => {
      if (!id || !selectedTimeSlot) {
        throw new Error('Please select a date and time slot');
      }
      const res = await client.post('/appointments', {
        appointmentTypeId: id,
        scheduledAt: selectedTimeSlot,
        attendeeName,
        attendeeDateOfBirth,
        attendeeBirthTime: attendeeTimeOfBirth
      });
      return res.data?.data;
    },
    onSuccess: async (data: any) => {
      if (!data.paymentRequired) {
        setBookingSuccess(true);
        setSelectedDate('');
        setSelectedTimeSlot('');
        setTimeout(() => setBookingSuccess(false), 7000);
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
        description: `Consultation: ${appType?.name || 'Appointment'}`,
        order_id: data.razorpayOrderId,
        handler: async (response: any) => {
          try {
            await client.post('/appointments/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            
            setBookingSuccess(true);
            setSelectedDate('');
            setSelectedTimeSlot('');
            setTimeout(() => setBookingSuccess(false), 7000);
          } catch (err: any) {
            alert('Payment verification failed. Please contact support.');
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
      const msg = err.response?.data?.error?.message || err.message || 'Booking failed';
      alert(`❌ Error: ${msg}`);
    },
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingMutation.mutate();
  };

  if (typesLoading || authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-gray-600">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
          Loading Consultation Details...
        </p>
      </div>
    );
  }

  if (!appType) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-gray-600 px-4 text-center">
        <Compass className="w-16 h-16 text-[#A78652] mb-4 animate-bounce opacity-50" />
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Consultation Not Found</h2>
        <p className="text-sm max-w-md font-light mb-6 text-gray-500">
          The requested service does not exist or may have been updated.
        </p>
        <Link href="/appointments">
          <GoldButton variant="outlined" className="py-2.5 px-6 text-xs">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Services
          </GoldButton>
        </Link>
      </div>
    );
  }

  const now = new Date();
  const hasActiveOffer = appType.offerPrice !== undefined && appType.offerPrice !== null &&
    (!appType.offerExpiresAt || now < new Date(appType.offerExpiresAt));
  const priceVal = hasActiveOffer ? appType.offerPrice : appType.price;
  const originalPriceVal = appType.price;
  const savingsVal = hasActiveOffer ? originalPriceVal - priceVal : 0;

  // Dynamic FAQs based on category
  const faqs = [
    {
      q: `How does the 1-on-1 ${appType.name} consultation take place?`,
      a: `Your session will take place online via a private Google Meet video link. Upon reserving a slot, you will instantly receive calendar details and video link instructions.`
    },
    {
      q: `What information is required before the reading?`,
      a: `We require your Full Name, Date of Birth, and exact Time of Birth (if known). If you do not have your exact birth time, numerological and graphology alignment tools will be utilized.`
    },
    {
      q: `Can I ask specific personal questions during the ${appType.duration}-minute session?`,
      a: `Yes! You are encouraged to bring your key questions regarding career, relationships, business decisions, or personal remedies. The consultant will dedicate ample time to address your core concerns.`
    },
    {
      q: `What if I need to reschedule my consultation?`,
      a: `You can reschedule your slot free of charge up to 24 hours prior to the session time via your account dashboard or by contacting support.`
    }
  ];

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-[#FAF8F5] text-gray-900 pb-20">
      
      {/* ── 1. BREADCRUMB NAVIGATION ──────────────────────────────────────── */}
      <div className="border-b border-[#E7E0D4] bg-[#F3EEE6]/60 backdrop-blur-sm sticky top-0 z-30 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            href="/appointments" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-700 hover:text-[#6F2935] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#A78652]" />
            Back to Consultation Services
          </Link>

          <span className="hidden sm:inline-block text-[11px] font-mono text-[#A78652] uppercase tracking-widest font-semibold bg-white border border-[#E7E0D4] px-3 py-1 rounded-full">
            {appType.category || 'Vedic'} Consultation
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-8">

        {/* ── 2. SERVICE HERO — TWO-COLUMN PRODUCT LAYOUT ──────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Service Image & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative bg-white border border-[#E7E0D4] rounded-3xl overflow-hidden shadow-md group">
              {appType.imageUrl ? (
                <div className="w-full aspect-[4/3] bg-[#F7F3EA] relative overflow-hidden flex items-center justify-center p-4">
                  <img 
                    src={appType.imageUrl} 
                    alt={appType.name} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  {hasActiveOffer && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Special Offer
                    </span>
                  )}
                </div>
              ) : (
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#F3EEE6] to-[#FAF8F5] flex items-center justify-center">
                  <Compass className="w-20 h-20 text-[#A78652]/30" />
                </div>
              )}
            </div>

            {/* Service Highlight Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-[#E7E0D4] shadow-sm text-center">
              <div className="space-y-1">
                <Clock className="w-5 h-5 text-[#A78652] mx-auto" />
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Duration</span>
                <span className="text-xs font-bold text-gray-900 font-sans">{appType.duration} mins</span>
              </div>
              <div className="space-y-1 border-l border-[#E7E0D4]">
                <Compass className="w-5 h-5 text-[#A78652] mx-auto" />
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Format</span>
                <span className="text-xs font-bold text-gray-900 font-sans">1-on-1 Online</span>
              </div>
              <div className="space-y-1 border-l border-[#E7E0D4]">
                <ShieldCheck className="w-5 h-5 text-[#A78652] mx-auto" />
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Privacy</span>
                <span className="text-xs font-bold text-gray-900 font-sans">100% Private</span>
              </div>
              <div className="space-y-1 border-l border-[#E7E0D4]">
                <Award className="w-5 h-5 text-[#A78652] mx-auto" />
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Expertise</span>
                <span className="text-xs font-bold text-gray-900 font-sans">Master Advisor</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY PURCHASE & BOOKING SIDEBAR */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="bg-white border border-[#A78652]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              
              <div className="space-y-3 border-b border-[#E7E0D4] pb-5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F2935] bg-[#6F2935]/10 px-3 py-1 rounded-full font-mono">
                    {appType.category || 'Vedic'}
                  </span>
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#A78652]" /> {appType.duration} Minutes
                  </span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D1C1A] leading-tight">
                  {appType.name}
                </h1>

                <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                  Focused personalized consultation session designed to give you clarity on career, relationships, and decision timing.
                </p>
              </div>

              {/* Price & Discount Display */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7E0D4] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Consultation Exchange</span>
                
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-2 font-sans">
                    <span className="text-4xl sm:text-5xl font-black text-[#1D1C1A]">
                      ₹{(priceVal / 100).toLocaleString()}
                    </span>
                    {hasActiveOffer && (
                      <span className="text-gray-400 line-through text-base font-normal">
                        ₹{(originalPriceVal / 100).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {hasActiveOffer && savingsVal > 0 && (
                    <span className="bg-green-100 text-green-800 text-[11px] font-bold px-2.5 py-1 rounded-md border border-green-200">
                      Save ₹{(savingsVal / 100).toLocaleString()}
                    </span>
                  )}
                </div>

                {appType.specialOfferTitle && (
                  <p className="text-[11px] text-red-600 font-bold uppercase font-mono tracking-wider pt-1">
                    🔥 {appType.specialOfferTitle}
                  </p>
                )}

                <p className="text-[10px] text-gray-500 font-light pt-0.5">
                  Inclusive of all taxes & video call setup
                </p>
              </div>

              {/* Primary Booking CTA */}
              <button
                onClick={scrollToBooking}
                className="w-full py-4 text-sm font-bold bg-[#6F2935] hover:bg-[#8A3443] text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" /> Book Consultation Slot
              </button>

              {/* Secondary Contact Actions */}
              <div className="space-y-2 pt-2 border-t border-[#E7E0D4]">
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest text-center">Have pre-booking questions?</p>
                <div className="grid grid-cols-2 gap-2">
                  <a href="tel:+919922352666" className="w-full">
                    <button className="w-full py-2.5 text-xs font-bold border border-blue-600 text-blue-700 hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> Call Advisor
                    </button>
                  </a>
                  <a href="https://wa.me/919922352666" target="_blank" rel="noopener noreferrer" className="w-full">
                    <button className="w-full py-2.5 text-xs font-bold border border-[#25d366] text-[#1da851] hover:bg-green-50 rounded-xl transition-all flex items-center justify-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                    </button>
                  </a>
                </div>
              </div>

              {/* Trust Badge Bar */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-mono pt-1">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#A78652]" /> Razorpay Secured</span>
                <span>•</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-600" /> Instant Confirmation</span>
              </div>

            </div>
          </div>

        </section>

        {/* ── 3. KEY BENEFITS & DELIVERABLES ──────────────────────────────── */}
        <section className="space-y-6 pt-6 border-t border-[#E7E0D4]">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Why Choose This Consultation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D1C1A]">
              Key Session Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E7E0D4] p-5 rounded-2xl space-y-2 text-center shadow-sm">
              <div className="w-10 h-10 bg-[#6F2935]/10 text-[#6F2935] rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 text-[#A78652]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1D1C1A]">Deep Clarity</h3>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Clear insights on core life questions without vague generalities.
              </p>
            </div>

            <div className="bg-white border border-[#E7E0D4] p-5 rounded-2xl space-y-2 text-center shadow-sm">
              <div className="w-10 h-10 bg-[#6F2935]/10 text-[#6F2935] rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5 text-[#A78652]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1D1C1A]">Timing & Phases</h3>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Understand favorable planetary windows for major decisions.
              </p>
            </div>

            <div className="bg-white border border-[#E7E0D4] p-5 rounded-2xl space-y-2 text-center shadow-sm">
              <div className="w-10 h-10 bg-[#6F2935]/10 text-[#6F2935] rounded-full flex items-center justify-center mx-auto">
                <User className="w-5 h-5 text-[#A78652]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1D1C1A]">1-on-1 Guidance</h3>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Direct private conversation tailored strictly to your details.
              </p>
            </div>

            <div className="bg-white border border-[#E7E0D4] p-5 rounded-2xl space-y-2 text-center shadow-sm">
              <div className="w-10 h-10 bg-[#6F2935]/10 text-[#6F2935] rounded-full flex items-center justify-center mx-auto">
                <Award className="w-5 h-5 text-[#A78652]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1D1C1A]">Practical Remedies</h3>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Actionable steps, alchemical alignment, and simple remedies.
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. WHAT YOU'LL RECEIVE & WHO THIS IS FOR ────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* What You'll Receive */}
          <div className="bg-white border border-[#E7E0D4] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#1D1C1A] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#6F2935]" /> What You Will Receive
            </h3>
            
            <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-light">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>Private {appType.duration}-minute 1-on-1 video session with a senior consultant.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>Dedicated Q&A addressing your top questions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>Analysis of your birth chart, numerological vibrational patterns, or cards.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>Personalized guidance and practical remedies.</span>
              </li>
            </ul>
          </div>

          {/* Who This Is For */}
          <div className="bg-white border border-[#E7E0D4] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#1D1C1A] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#6F2935]" /> Who This Consultation Is For
            </h3>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-[#FAF7F2] border border-[#E7E0D4] p-3 rounded-xl text-center">
                <span className="text-xs font-bold text-gray-900 block">Career & Business</span>
                <span className="text-[10px] text-gray-500 font-light">Job shifts & growth</span>
              </div>
              <div className="bg-[#FAF7F2] border border-[#E7E0D4] p-3 rounded-xl text-center">
                <span className="text-xs font-bold text-gray-900 block">Love & Marriage</span>
                <span className="text-[10px] text-gray-500 font-light">Compatibility & timing</span>
              </div>
              <div className="bg-[#FAF7F2] border border-[#E7E0D4] p-3 rounded-xl text-center">
                <span className="text-xs font-bold text-gray-900 block">Life Decisions</span>
                <span className="text-[10px] text-gray-500 font-light">Navigating choices</span>
              </div>
              <div className="bg-[#FAF7F2] border border-[#E7E0D4] p-3 rounded-xl text-center">
                <span className="text-xs font-bold text-gray-900 block">Personal Growth</span>
                <span className="text-[10px] text-gray-500 font-light">Inner clarity & peace</span>
              </div>
            </div>
          </div>

        </section>

        {/* ── 5. HOW IT WORKS (4-Step Process Guide) ──────────────────────── */}
        <section className="space-y-6 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Simple 4-Step Process
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D1C1A]">
              How Your Booking Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E7E0D4] p-5 rounded-2xl space-y-2 relative">
              <span className="text-xs font-mono font-bold text-[#6F2935] bg-[#6F2935]/10 px-2.5 py-0.5 rounded-full">01</span>
              <h4 className="font-serif font-bold text-base text-gray-900">Select Date & Slot</h4>
              <p className="text-gray-600 text-xs font-light">Pick a convenient date and time slot from the live availability grid below.</p>
            </div>

            <div className="bg-white border border-[#E7E0D4] p-5 rounded-2xl space-y-2 relative">
              <span className="text-xs font-mono font-bold text-[#6F2935] bg-[#6F2935]/10 px-2.5 py-0.5 rounded-full">02</span>
              <h4 className="font-serif font-bold text-base text-gray-900">Provide Details</h4>
              <p className="text-gray-600 text-xs font-light">Enter your attendee name, date of birth, and time of birth for accurate analysis.</p>
            </div>

            <div className="bg-white border border-[#E7E0D4] p-5 rounded-2xl space-y-2 relative">
              <span className="text-xs font-mono font-bold text-[#6F2935] bg-[#6F2935]/10 px-2.5 py-0.5 rounded-full">03</span>
              <h4 className="font-serif font-bold text-base text-gray-900">Secure Checkout</h4>
              <p className="text-gray-600 text-xs font-light">Complete booking through Razorpay's 100% encrypted payment system.</p>
            </div>

            <div className="bg-white border border-[#E7E0D4] p-5 rounded-2xl space-y-2 relative">
              <span className="text-xs font-mono font-bold text-[#6F2935] bg-[#6F2935]/10 px-2.5 py-0.5 rounded-full">04</span>
              <h4 className="font-serif font-bold text-base text-gray-900">Attend Consultation</h4>
              <p className="text-gray-600 text-xs font-light">Join the video call via the instant Google Meet calendar invite sent to your email.</p>
            </div>
          </div>
        </section>

        {/* ── 6. INTERACTIVE SLOT SELECTOR & BOOKING MODULE ────────────────── */}
        <section ref={bookingCardRef} id="book-form" className="scroll-mt-24">
          <div className="bg-white border border-[#A78652]/40 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
            
            <div className="max-w-2xl space-y-2">
              <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
                Reserve Your Time Slot
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1D1C1A]">
                Book Your <span className="gold-gradient-text">{appType.name}</span>
              </h2>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Select your preferred date and time below to confirm your private 1-on-1 session.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 bg-green-50/60 rounded-2xl border border-green-200">
                <CheckCircle2 className="w-16 h-16 text-green-600 animate-bounce" />
                <h3 className="font-serif text-2xl font-bold text-gray-900">Slot Reserved Successfully!</h3>
                <p className="text-gray-600 text-sm max-w-md font-light">
                  Your consultation has been confirmed. A Google Meet link and calendar invitation have been dispatched to your email.
                </p>
                <Link href="/appointments">
                  <GoldButton variant="burgundy" className="mt-2 py-2.5 px-6 text-xs font-bold">
                    View All My Appointments
                  </GoldButton>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-6">
                
                {/* 1. Date Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
                    1. Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTimeSlot('');
                    }}
                    required
                    className="w-full sm:max-w-md bg-[#FAF8F5] border border-[#E7E0D4] rounded-xl py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A78652] text-sm"
                  />
                </div>

                {/* 2. Available IST Time Slots */}
                {selectedDate && (
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
                      2. Available Time Slots (IST)
                    </label>

                    {isFetchingSlots ? (
                      <p className="text-gray-500 text-xs font-mono animate-pulse">Checking calendar availability...</p>
                    ) : availableSlots && availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                        {availableSlots.map((slot: string) => {
                          const dateObj = new Date(slot);
                          const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2.5 px-3 rounded-xl text-xs font-bold font-sans transition-all duration-300 border ${
                                isSelected
                                  ? 'bg-[#6F2935] text-white border-[#6F2935] shadow-md scale-[1.02]'
                                  : 'bg-white text-gray-800 border-[#E7E0D4] hover:bg-[#F7F3EA] hover:border-[#A78652]'
                              }`}
                            >
                              {timeStr}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-amber-900 bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-600" />
                        <span>No slots available for this date. Please pick another date above.</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Attendee Kundli Intake Form */}
                {selectedTimeSlot && isAuthenticated && (
                  <div className="space-y-4 pt-4 border-t border-[#E7E0D4]">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
                      3. Attendee Kundli Details (For Precise Analysis)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7E0D4]">
                      <div className="space-y-1">
                        <label className="block text-[10px] text-gray-600 uppercase font-mono">Full Name</label>
                        <input
                          type="text"
                          value={attendeeName}
                          onChange={(e) => setAttendeeName(e.target.value)}
                          className="w-full bg-white border border-[#E7E0D4] rounded-lg py-2 px-3 text-xs text-gray-900 focus:ring-1 focus:ring-[#A78652]"
                          placeholder="e.g. Priyanshu Sharma"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] text-gray-600 uppercase font-mono">Date of Birth</label>
                        <input
                          type="date"
                          value={attendeeDateOfBirth}
                          onChange={(e) => setAttendeeDateOfBirth(e.target.value)}
                          className="w-full bg-white border border-[#E7E0D4] rounded-lg py-2 px-3 text-xs text-gray-900 focus:ring-1 focus:ring-[#A78652]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] text-gray-600 uppercase font-mono">Time of Birth</label>
                        <input
                          type="time"
                          value={attendeeTimeOfBirth}
                          onChange={(e) => setAttendeeTimeOfBirth(e.target.value)}
                          className="w-full bg-white border border-[#E7E0D4] rounded-lg py-2 px-3 text-xs text-gray-900 focus:ring-1 focus:ring-[#A78652]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Checkout Submit / Guest Login Prompt */}
                {selectedTimeSlot && (
                  <div className="pt-4 border-t border-[#E7E0D4]">
                    {!isAuthenticated ? (
                      <div className="bg-[#FAF7F2] border border-[#A78652]/40 rounded-2xl p-6 space-y-3">
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="w-6 h-6 text-[#6F2935] flex-shrink-0" />
                          <div>
                            <h4 className="font-serif font-bold text-base text-[#1D1C1A]">Sign in to Complete Booking</h4>
                            <p className="text-gray-600 text-xs font-light mt-0.5">
                              Log in or create a free account to secure your selected slot.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Link href={`/login?redirect=/appointments/${id}`} className="flex-1">
                            <button className="w-full py-2.5 text-xs font-bold bg-[#6F2935] hover:bg-[#8A3443] text-white rounded-xl shadow-md transition-all">
                              Log In & Confirm
                            </button>
                          </Link>
                          <Link href={`/register?redirect=/appointments/${id}`} className="flex-1">
                            <button className="w-full py-2.5 text-xs font-bold border border-[#6F2935] text-[#6F2935] hover:bg-[#6F2935]/10 rounded-xl transition-all">
                              Sign Up Free
                            </button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        disabled={bookingMutation.isPending}
                        className="w-full py-4 text-sm font-bold bg-[#6F2935] hover:bg-[#8A3443] disabled:opacity-50 text-white rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                      >
                        <Calendar className="w-5 h-5" />
                        {bookingMutation.isPending ? 'Confirming Slot...' : 'Confirm & Secure Slot'}
                      </button>
                    )}
                  </div>
                )}

              </form>
            )}

          </div>
        </section>

        {/* ── 7. DETAILED DESCRIPTION (CONTROLLED READING WIDTH ~700px) ───── */}
        <section className="space-y-6 pt-6 border-t border-[#E7E0D4]">
          <div className="max-w-3xl mx-auto space-y-6">
            
            <div className="space-y-1">
              <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
                Detailed Information
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D1C1A]">
                About This Consultation
              </h2>
            </div>

            <div className="text-gray-700 text-sm leading-relaxed font-light space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E0D4] shadow-sm">
              {appType.description ? (
                <FormattedText text={appType.description} className="prose prose-stone max-w-none text-gray-700 text-sm leading-relaxed" />
              ) : (
                <p>
                  Experience deep clarity and direction tailored directly to your astrological and vibrational profile. This private 1-on-1 session is crafted to provide clear answers regarding career transitions, relationships, and major personal milestones.
                </p>
              )}
            </div>

          </div>
        </section>

        {/* ── 8. FREQUENTLY ASKED QUESTIONS (FAQ Accordion) ──────────────── */}
        <section className="space-y-6 pt-6 border-t border-[#E7E0D4]">
          <div className="max-w-3xl mx-auto space-y-6">
            
            <div className="text-center space-y-1">
              <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
                Got Questions?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D1C1A]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="bg-white border border-[#E7E0D4] rounded-2xl overflow-hidden shadow-sm transition-all">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#1D1C1A] hover:text-[#6F2935] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#A78652] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 font-light leading-relaxed border-t border-[#FAF7F2]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── 9. FINAL CONVERSION BANNER ─────────────────────────────────── */}
        <section className="bg-gradient-to-r from-[#6F2935] to-[#8A3443] rounded-3xl p-8 sm:p-12 text-center text-white space-y-4 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-[#DED2BE] text-xs font-mono uppercase tracking-widest block">Ready to Begin?</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">Reserve Your Private Session Today</h2>
            <p className="text-white/80 text-xs sm:text-sm font-light">
              Gain actionable guidance and cosmic clarity tailored to your exact birth details.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToBooking}
                className="py-3.5 px-8 text-xs sm:text-sm font-bold bg-[#A78652] hover:bg-[#C4A56E] text-white rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Book Now — Select Your Slot
              </button>
            </div>
          </div>
        </section>

        {/* ── 10. RELATED CONSULTATIONS GRID ────────────────────────────── */}
        {relatedTypes.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-[#E7E0D4]">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#1D1C1A]">You May Also Explore</h3>
              <Link href="/appointments" className="text-xs font-bold text-[#6F2935] hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedTypes.map((rel: any) => {
                const price = (rel.offerPrice ?? rel.price) / 100;
                return (
                  <Link key={rel._id} href={`/appointments/${rel._id}`} className="group">
                    <GoldCard flush className="border border-[#E7E0D4] hover:border-[#A78652] transition-all bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md h-full flex flex-col justify-between">
                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-mono text-[#A78652] uppercase block">{rel.category || 'Vedic'}</span>
                        <h4 className="font-serif font-bold text-sm text-[#1D1C1A] group-hover:text-[#6F2935] line-clamp-1">{rel.name}</h4>
                        <p className="text-xs text-gray-500 font-light line-clamp-2">{rel.description}</p>
                      </div>
                      <div className="p-4 pt-0 border-t border-[#FAF7F2] flex items-center justify-between">
                        <span className="text-lg font-extrabold text-[#1D1C1A]">₹{price.toLocaleString()}</span>
                        <span className="text-xs text-[#A78652] font-semibold flex items-center gap-0.5 group-hover:underline">
                          View <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </GoldCard>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* SEO Schemas */}
        <BreadcrumbSchema items={[
          { name: 'Home', url: '/' },
          { name: 'Appointments', url: '/appointments' },
          { name: appType.name, url: `/appointments/${appType._id}` }
        ]} />

        <SEOInternalMesh currentCategory="appointments" />

      </div>
    </div>
  );
}
