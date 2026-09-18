'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { 
  Calendar, Clock, Plus, Compass, Star, ChevronRight, Phone, 
  MessageSquare, AlertCircle, CheckCircle2, Award, User, 
  Filter, ArrowRight, ShieldCheck, Check, Sparkles, BookOpen
} from 'lucide-react';
import { env } from '@/lib/env';
import { FormattedText } from '@/components/ui/FormattedText';
import { SEOInternalMesh } from '@/components/seo/SEOInternalMesh';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export default function AppointmentsPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const router = useRouter();
  const bookingRef = useRef<HTMLDivElement>(null);
  const myApptsRef = useRef<HTMLDivElement>(null);

  // Booking states
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Appointment filter tab
  const [apptFilterTab, setApptFilterTab] = useState<'upcoming' | 'completed' | 'cancelled' | 'all'>('upcoming');

  // Attendee details (Intake form for Kundli)
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

  // Fetch booked user appointments
  const { data: appointments = [], isLoading: loadingAppts, refetch: refetchAppts } = useQuery({
    queryKey: ['my-appointments'],
    queryFn: async () => {
      const res = await client.get('/appointments/me');
      return res.data?.data || [];
    },
    enabled: isAuthenticated,
  });

  // Fetch all database appointment types
  const { data: appointmentTypes = [], isLoading: loadingTypes } = useQuery({
    queryKey: ['appointmentTypes'],
    queryFn: async () => {
      const res = await client.get('/appointments/types');
      return res.data?.data || [];
    },
  });

  // Fetch team members for founder consultant profiles
  const { data: teamMembers = [], isLoading: loadingTeam } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const res = await client.get('/team');
      return res.data?.data || [];
    },
  });

  // Dynamically extract distinct categories from appointment types
  const categories = useMemo(() => {
    const set = new Set<string>();
    appointmentTypes.forEach((t: any) => {
      if (t.category) set.add(t.category);
    });
    return ['All', ...Array.from(set)];
  }, [appointmentTypes]);

  // Filtered appointment types based on category selection
  const filteredTypes = useMemo(() => {
    if (selectedCategory === 'All') return appointmentTypes;
    return appointmentTypes.filter((t: any) => t.category === selectedCategory);
  }, [appointmentTypes, selectedCategory]);

  const selectedType = appointmentTypes?.find((t: any) => t._id === selectedTypeId);

  // Fetch available slots when date & package are selected
  const { data: availableSlots = [], isFetching: isFetchingSlots } = useQuery({
    queryKey: ['slots', selectedDate, selectedType?.duration],
    queryFn: async () => {
      if (!selectedDate || !selectedType) return [];
      const res = await client.get('/appointments/slots', {
        params: { date: selectedDate, duration: selectedType.duration },
      });
      return res.data?.data || [];
    },
    enabled: !!selectedDate && !!selectedType,
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

  // Booking mutation
  const bookingMutation = useMutation({
    mutationFn: async () => {
      if (!selectedTypeId || !selectedTimeSlot) throw new Error('Please select a package, date and time slot');
      const res = await client.post('/appointments', {
        appointmentTypeId: selectedTypeId,
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
        setSelectedTypeId('');
        refetchAppts();
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
        description: `Consultation Slot: ${selectedType?.name || 'Appointment'}`,
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
            setSelectedTypeId('');
            refetchAppts();
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

  const scrollToBooking = (typeId?: string) => {
    if (typeId) {
      setSelectedTypeId(typeId);
    }
    bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToMyAppts = () => {
    myApptsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Filter user appointments by status tab
  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];
    const now = new Date();
    return appointments.filter((app: any) => {
      const dateObj = new Date(app.scheduledAt);
      if (apptFilterTab === 'upcoming') {
        return app.status === 'confirmed' && dateObj >= now;
      }
      if (apptFilterTab === 'completed') {
        return app.status === 'confirmed' && dateObj < now;
      }
      if (apptFilterTab === 'cancelled') {
        return app.status === 'cancelled';
      }
      return true;
    });
  }, [appointments, apptFilterTab]);

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-[#FAF8F5] overflow-x-hidden text-gray-900 pb-20">
      
      {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#F3EEE6] via-[#FAF8F5] to-[#FAF8F5] pt-12 pb-10 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4]">
        <div className="max-w-6xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#6F2935]/10 border border-[#6F2935]/20 text-[#6F2935] text-xs font-mono font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#A78652]" /> Trusted Vedic Guidance & Consultation
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D1C1A] max-w-4xl mx-auto leading-tight">
            Personalized <span className="gold-gradient-text">Astrology & Numerology</span> Consultations
          </h1>

          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Gain profound clarity on career, relationships, health, and personal growth with master consultants. Select a service below to reserve your 1-on-1 private slot.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <GoldButton 
              variant="burgundy" 
              onClick={() => scrollToBooking()}
              className="py-3 px-7 text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4" /> Book a Consultation
            </GoldButton>

            {isAuthenticated && (
              <GoldButton 
                variant="outlined" 
                onClick={scrollToMyAppts}
                className="py-3 px-6 text-sm font-semibold flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-[#A78652]" /> View My Appointments
              </GoldButton>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-10 relative z-10">

        {/* ── 2. QUICK SERVICE DISCOVERY (Category Bar) ──────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#6F2935] font-serif font-bold text-lg">
              <Filter className="w-5 h-5 text-[#A78652]" />
              <span>Explore Categories</span>
            </div>
            <span className="text-xs text-gray-500 font-mono">
              {filteredTypes.length} {filteredTypes.length === 1 ? 'service' : 'services'} available
            </span>
          </div>

          {/* Horizontally scrollable category pills on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium font-sans transition-all duration-300 transform hover:-translate-y-0.5 ${
                    isActive
                      ? 'bg-[#6F2935] text-white shadow-md font-bold'
                      : 'bg-white text-gray-700 border border-[#E7E0D4] hover:bg-[#F7F3EA] hover:border-[#A78652]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 3. DIRECT CONSULTATIONS WITH FOUNDERS ───────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Direct Consultations
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1D1C1A]">
              Meet Your Master Consultants
            </h2>
            <div className="h-0.5 w-16 bg-[#A78652]" />
            <p className="text-gray-600 text-xs sm:text-sm font-light pt-1">
              Book high-impact personal guidance sessions directly with our Master Consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ── CONSULTANT 1: RAAJESH S PANDAY ────────────────────────────── */}
            <div className="bg-white border border-[#E7E0D4] hover:border-[#A78652] rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group">
              <div className="space-y-4">
                
                {/* Header Tag & Link */}
                <div className="flex items-center justify-between gap-2 border-b border-[#FAF7F2] pb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6F2935] bg-[#6F2935]/10 px-3 py-1 rounded-full">
                    Founder & Master Consultant
                  </span>
                  <Link
                    href="/appointments/team-raajesh"
                    className="text-[#A78652] hover:text-[#6F2935] text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    View Bio <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Portrait Image & Credentials Badge */}
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden border border-[#E7E0D4] bg-[#F7F3EA] aspect-[4/3] shadow-xs group-hover:scale-[1.01] transition-transform duration-500">
                    <img
                      src="/images/rajessh_paanday.jpg"
                      alt="Rajessh Paanday — Founder & Chief Consultant"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-serif text-xl font-bold">Rajessh Paanday</h3>
                      <p className="text-[11px] font-mono text-amber-200 uppercase tracking-widest">Founder & Chief Consultant</p>
                    </div>
                  </div>

                  <div className="bg-[#FAF7F2] border border-[#E7E0D4] rounded-xl p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#1D1C1A]">
                      <Award className="w-4 h-4 text-[#A78652]" />
                      <span>9+ Years Experience</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#6F2935] bg-[#6F2935]/10 px-2 py-0.5 rounded">Verified</span>
                  </div>
                </div>

                {/* Concise Bio */}
                <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                  Dedicated Life Consultant combining Vedic Astrology, Numerology, Graphology, and 5-Elements balance to guide clients toward clarity, confidence, and natural cosmic timing.
                </p>

                {/* Specializations Pills */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 block">Core Expertise</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Vedic Astrology', 'Kundali Analysis', 'Numerology', 'Graphology', 'Career Guidance'].map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium bg-[#FAF7F2] text-[#1D1C1A] border border-[#E7E0D4] px-2.5 py-1 rounded-full"
                      >
                        ✦ {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="pt-4 border-t border-[#E7E0D4] flex flex-wrap items-center gap-2">
                <button
                  onClick={() => scrollToBooking()}
                  className="flex-1 py-2.5 px-3 text-xs font-bold bg-[#6F2935] hover:bg-[#8A3443] text-white rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Session
                </button>
                <a href="tel:+919922352666">
                  <GoldButton variant="outlined" className="py-2.5 px-3 text-xs font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#A78652]" /> Call
                  </GoldButton>
                </a>
                <a href="https://wa.me/919922352666" target="_blank" rel="noopener noreferrer">
                  <button className="py-2.5 px-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </button>
                </a>
              </div>
            </div>

            {/* ── CONSULTANT 2: KUSUM PANDAY ────────────────────────────────── */}
            <div className="bg-white border border-[#E7E0D4] hover:border-[#A78652] rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group">
              <div className="space-y-4">
                
                {/* Header Tag & Link */}
                <div className="flex items-center justify-between gap-2 border-b border-[#FAF7F2] pb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6F2935] bg-[#6F2935]/10 px-3 py-1 rounded-full">
                    Tarot & Wellness Specialist
                  </span>
                  <Link
                    href="/appointments/team-kusum"
                    className="text-[#A78652] hover:text-[#6F2935] text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    View Bio <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Portrait Image & Credentials Badge */}
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden border border-[#E7E0D4] bg-[#F7F3EA] aspect-[4/3] shadow-xs group-hover:scale-[1.01] transition-transform duration-500">
                    <img
                      src="/images/team_kusum.png"
                      alt="Kusum Panday — Tarot Card Reader & Wellness Coach"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-serif text-xl font-bold">Kusum Panday</h3>
                      <p className="text-[11px] font-mono text-amber-200 uppercase tracking-widest">Tarot Reader & Wellness Coach</p>
                    </div>
                  </div>

                  <div className="bg-[#FAF7F2] border border-[#E7E0D4] rounded-xl p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#1D1C1A]">
                      <Award className="w-4 h-4 text-[#A78652]" />
                      <span>7+ Years Experience</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#6F2935] bg-[#6F2935]/10 px-2 py-0.5 rounded">Verified</span>
                  </div>
                </div>

                {/* Concise Bio */}
                <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                  Intuitive Tarot Card Reader, Relationship Coach, and Yoga practitioner creating a nurturing space to heal emotional patterns, regain confidence, and achieve personal clarity.
                </p>

                {/* Specializations Pills */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 block">Core Expertise</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Tarot Reader', 'Relationship Coach', 'Yoga Teacher', 'Emotional Healing', 'Wellness'].map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium bg-[#FAF7F2] text-[#1D1C1A] border border-[#E7E0D4] px-2.5 py-1 rounded-full"
                      >
                        ✦ {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="pt-4 border-t border-[#E7E0D4] flex flex-wrap items-center gap-2">
                <button
                  onClick={() => scrollToBooking()}
                  className="flex-1 py-2.5 px-3 text-xs font-bold bg-[#6F2935] hover:bg-[#8A3443] text-white rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Session
                </button>
                <a href="tel:+919922352666">
                  <GoldButton variant="outlined" className="py-2.5 px-3 text-xs font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#A78652]" /> Call
                  </GoldButton>
                </a>
                <a href="https://wa.me/919922352666" target="_blank" rel="noopener noreferrer">
                  <button className="py-2.5 px-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. SPECIALIZED CONSULTATION PACKAGES ─────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Consultation Catalog
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D1C1A]">
              Specialized Consultation Packages
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm font-light">
              Choose your reading based on duration, guidance scope, and specific life domain.
            </p>
          </div>

          {loadingTypes ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm animate-pulse font-mono">Loading consultation packages...</p>
            </div>
          ) : filteredTypes && filteredTypes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTypes.map((type: any) => {
                const now = new Date();
                const hasActiveOffer = type.offerPrice !== undefined && type.offerPrice !== null &&
                  (!type.offerExpiresAt || now < new Date(type.offerExpiresAt));
                const priceVal = hasActiveOffer ? type.offerPrice : type.price;
                const originalPriceVal = type.price;

                return (
                  <div key={type._id} className="group flex flex-col">
                    <GoldCard flush className="border border-[#E7E0D4] hover:border-[#A78652] transition-all duration-300 h-full flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl rounded-2xl bg-white">
                      
                      <div>
                        {/* Service Image */}
                        {type.imageUrl ? (
                          <div className="w-full h-48 bg-[#F7F3EA] border-b border-[#E7E0D4] relative overflow-hidden flex items-center justify-center p-3">
                            <img 
                              src={type.imageUrl} 
                              alt={type.name} 
                              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                            />
                            {hasActiveOffer && (
                              <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                                Special Offer
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-36 bg-gradient-to-br from-[#F3EEE6] to-[#FAF8F5] border-b border-[#E7E0D4] flex items-center justify-center">
                            <Compass className="w-12 h-12 text-[#A78652]/40" />
                          </div>
                        )}

                        <div className="p-5 space-y-3">
                          {/* Badges */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F2935] bg-[#6F2935]/10 px-2.5 py-0.5 rounded-full font-mono">
                              {type.category || 'General'}
                            </span>
                            <span className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                              <Clock className="w-3 h-3 text-[#A78652]" /> {type.duration} mins
                            </span>
                          </div>

                          {/* Title & Description */}
                          <h3 className="font-sans text-lg font-bold text-[#1D1C1A] group-hover:text-[#6F2935] transition-colors line-clamp-2 leading-snug">
                            {type.name}
                          </h3>

                          <FormattedText 
                            text={type.description || 'Comprehensive 1-on-1 private consultation session.'} 
                            className="text-gray-600 text-xs line-clamp-3 leading-relaxed font-light" 
                          />
                        </div>
                      </div>

                      {/* Footer Price & CTA */}
                      <div className="p-5 pt-0 mt-2 border-t border-[#FAF7F2] space-y-3">
                        <div className="flex items-baseline justify-between pt-3">
                          <div>
                            <span className="text-gray-400 text-[10px] uppercase font-mono block">Fee</span>
                            <div className="flex items-baseline gap-2 font-sans">
                              <span className="text-[#1D1C1A] font-black text-3xl">
                                ₹{(priceVal / 100).toLocaleString()}
                              </span>
                              {hasActiveOffer && (
                                <span className="text-gray-400 line-through text-xs font-normal">
                                  ₹{(originalPriceVal / 100).toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          <Link 
                            href={`/appointments/${type._id}`}
                            className="text-[#A78652] hover:text-[#6F2935] font-semibold text-xs flex items-center gap-0.5 hover:underline"
                          >
                            Details <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        <button
                          onClick={() => scrollToBooking(type._id)}
                          className="w-full py-2.5 text-xs font-bold bg-[#6F2935] hover:bg-[#8A3443] text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <Calendar className="w-4 h-4" /> Book Now
                        </button>
                      </div>

                    </GoldCard>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-[#E7E0D4] p-6">
              <p className="text-gray-500 text-sm">No services found in category "{selectedCategory}".</p>
              <button 
                onClick={() => setSelectedCategory('All')} 
                className="mt-3 text-xs font-bold text-[#6F2935] hover:underline"
              >
                Show All Services
              </button>
            </div>
          )}
        </section>

        {/* ── 5. RESERVE A CONSULTATION SLOT (Interactive Booking Flow) ───── */}
        <section ref={bookingRef} id="book-slot" className="scroll-mt-24 pt-4">
          <div className="bg-white border border-[#A78652]/30 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
            
            <div className="max-w-2xl space-y-2">
              <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
                Instant Online Booking
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1D1C1A]">
                Reserve Your <span className="gold-gradient-text">Consultation Slot</span>
              </h2>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Select your package, date, and preferred time slot. You will receive an instant calendar invite upon booking.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 bg-green-50/60 rounded-2xl border border-green-200">
                <CheckCircle2 className="w-16 h-16 text-green-600 animate-bounce" />
                <h3 className="font-serif text-2xl font-bold text-gray-900">Slot Confirmed!</h3>
                <p className="text-gray-600 text-sm max-w-md font-light">
                  Your consultation has been successfully reserved. A confirmation email and Google Meeting details have been sent to your inbox.
                </p>
                {isAuthenticated && (
                  <GoldButton variant="outlined" onClick={scrollToMyAppts} className="mt-2 py-2.5 px-6 text-xs font-bold">
                    View My Appointments
                  </GoldButton>
                )}
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-8">
                
                {/* Step 1: Package Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#6F2935] text-white text-xs font-bold flex items-center justify-center">1</span>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-800">
                      Select Consultation Package
                    </label>
                  </div>

                  {loadingTypes ? (
                    <p className="text-gray-500 text-xs animate-pulse font-mono">Loading options...</p>
                  ) : (
                    <select
                      value={selectedTypeId}
                      onChange={(e) => {
                        setSelectedTypeId(e.target.value);
                        setSelectedDate('');
                        setSelectedTimeSlot('');
                      }}
                      required
                      className="w-full bg-[#FAF8F5] border border-[#E7E0D4] rounded-xl py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A78652] text-sm"
                    >
                      <option value="">— Choose a package —</option>
                      {appointmentTypes?.map((type: any) => (
                        <option key={type._id} value={type._id}>
                          {type.name} ({type.duration} mins) — ₹{((type.offerPrice ?? type.price) / 100).toLocaleString()}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* Selected Package Visual Card Summary */}
                  {selectedType && (
                    <div className="bg-[#FAF7F2] border border-[#A78652]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F2935] font-mono">Selected Package</span>
                        <h4 className="font-serif font-bold text-base text-[#1D1C1A]">{selectedType.name}</h4>
                        <p className="text-xs text-gray-500 flex items-center gap-2">
                          <span>⏱ {selectedType.duration} mins</span>
                          <span>•</span>
                          <span>Category: {selectedType.category || 'Vedic'}</span>
                        </p>
                      </div>
                      <div className="text-right sm:text-right w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E7E0D4]">
                        <span className="text-xs text-gray-500 font-mono">Total Fee</span>
                        <span className="text-2xl font-black text-[#1D1C1A] font-sans">
                          ₹{((selectedType.offerPrice ?? selectedType.price) / 100).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 2: Select Date */}
                {selectedTypeId && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#6F2935] text-white text-xs font-bold flex items-center justify-center">2</span>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-800">
                        Select Date
                      </label>
                    </div>

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
                )}

                {/* Step 3: Select Time Slot */}
                {selectedDate && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#6F2935] text-white text-xs font-bold flex items-center justify-center">3</span>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-800">
                        Available Time Slots (IST)
                      </label>
                    </div>

                    {isFetchingSlots ? (
                      <div className="p-4 bg-[#FAF7F2] rounded-xl text-center">
                        <p className="text-gray-500 text-xs font-mono animate-pulse">Checking calendar availability...</p>
                      </div>
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
                              className={`py-2.5 px-3 rounded-xl text-xs font-bold font-sans transition-all duration-300 transform hover:-translate-y-0.5 border ${
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
                        <span>No available slots on this date. Please select another date above.</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Attendee Details Intake Form */}
                {selectedTimeSlot && isAuthenticated && (
                  <div className="space-y-4 pt-4 border-t border-[#E7E0D4]">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#6F2935] text-white text-xs font-bold flex items-center justify-center">4</span>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-800">
                        Attendee Kundli Information (Optional)
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7E0D4]">
                      <div className="space-y-1">
                        <label className="block text-[10px] text-gray-600 uppercase font-mono">Full Name</label>
                        <input
                          type="text"
                          value={attendeeName}
                          onChange={(e) => setAttendeeName(e.target.value)}
                          className="w-full bg-white border border-[#E7E0D4] rounded-lg py-2 px-3 text-xs text-gray-900 focus:ring-1 focus:ring-[#A78652]"
                          placeholder="e.g. Rahul Sharma"
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

                {/* Step 5: Confirmation CTA or Guest Login Prompt */}
                {selectedTimeSlot && (
                  <div className="pt-4 border-t border-[#E7E0D4] space-y-4">
                    {!isAuthenticated ? (
                      <div className="bg-[#FAF7F2] border border-[#A78652]/40 rounded-2xl p-6 space-y-3">
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="w-6 h-6 text-[#6F2935] flex-shrink-0" />
                          <div>
                            <h4 className="font-serif font-bold text-base text-[#1D1C1A]">Sign in to Confirm Slot</h4>
                            <p className="text-gray-600 text-xs font-light mt-0.5">
                              Your selected slot is held. Please log in or create a free account to finalize your booking.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Link href="/login?redirect=/appointments" className="flex-1">
                            <button className="w-full py-2.5 text-xs font-bold bg-[#6F2935] hover:bg-[#8A3443] text-white rounded-xl shadow-md transition-all">
                              Log In to Book
                            </button>
                          </Link>
                          <Link href="/register?redirect=/appointments" className="flex-1">
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

        {/* ── 6. MY BOOKED CONSULTATIONS (User Appointments) ─────────────── */}
        {isAuthenticated && (
          <section ref={myApptsRef} id="my-appointments" className="scroll-mt-24 space-y-6 pt-6 border-t border-[#E7E0D4]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
                  Your Account
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#1D1C1A] flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#6F2935]" /> My Booked Consultations
                </h2>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-white border border-[#E7E0D4] p-1 rounded-xl shadow-sm">
                {(['upcoming', 'completed', 'cancelled', 'all'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setApptFilterTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      apptFilterTab === tab
                        ? 'bg-[#6F2935] text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {loadingAppts ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-xs font-mono animate-pulse">Fetching your appointments...</p>
              </div>
            ) : filteredAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAppointments.map((app: any) => {
                  const dateObj = new Date(app.scheduledAt);
                  const isPast = dateObj < new Date();

                  return (
                    <GoldCard key={app._id} className="p-5 border border-[#E7E0D4] hover:border-[#A78652] transition-all bg-white rounded-2xl space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-mono text-[#A78652] uppercase tracking-wider block">
                            {app.duration ? `${app.duration} Mins Session` : 'Consultation'}
                          </span>
                          <h3 className="font-serif text-lg font-bold text-[#1D1C1A]">{app.typeName}</h3>
                        </div>

                        <span className={`text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full border ${
                          app.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                          app.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-600 font-mono bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E7E0D4]">
                        <Clock className="w-4 h-4 text-[#A78652] shrink-0" />
                        <div>
                          <p className="font-bold text-gray-800">
                            {dateObj.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST
                          </p>
                        </div>
                      </div>

                      {app.attendeeName && (
                        <p className="text-[11px] text-gray-500">
                          Attendee: <span className="font-medium text-gray-800">{app.attendeeName}</span>
                        </p>
                      )}
                    </GoldCard>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#E7E0D4] p-6 space-y-3">
                <Compass className="w-10 h-10 text-[#A78652] mx-auto opacity-50" />
                <h4 className="font-serif font-bold text-base text-gray-800">No {apptFilterTab} consultations found</h4>
                <p className="text-xs text-gray-500 font-light max-w-sm mx-auto">
                  You do not have any appointments under this category yet.
                </p>
                <button 
                  onClick={() => scrollToBooking()}
                  className="mt-2 text-xs font-bold text-[#6F2935] hover:underline inline-flex items-center gap-1"
                >
                  Explore & Book Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </section>
        )}

        {/* ── 7. EXPLORE DEEPER INSIGHTS (Resources Grid) ──────────────────── */}
        <section className="space-y-4 pt-4 border-t border-[#E7E0D4]">
          <div className="space-y-1">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Free Cosmic Tools
            </span>
            <h3 className="font-serif text-xl font-bold text-[#1D1C1A]">Explore Deeper Insights</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link href="/free-tools" className="group">
              <div className="bg-white border border-[#E7E0D4] hover:border-[#A78652] p-4 rounded-2xl transition-all shadow-sm hover:shadow-md text-center space-y-2">
                <Sparkles className="w-6 h-6 text-[#A78652] mx-auto group-hover:scale-110 transition-transform" />
                <h4 className="font-serif font-bold text-xs text-[#1D1C1A] group-hover:text-[#6F2935]">Free Calculators</h4>
              </div>
            </Link>

            <Link href="/horoscope" className="group">
              <div className="bg-white border border-[#E7E0D4] hover:border-[#A78652] p-4 rounded-2xl transition-all shadow-sm hover:shadow-md text-center space-y-2">
                <Compass className="w-6 h-6 text-[#A78652] mx-auto group-hover:scale-110 transition-transform" />
                <h4 className="font-serif font-bold text-xs text-[#1D1C1A] group-hover:text-[#6F2935]">Daily Horoscope</h4>
              </div>
            </Link>

            <Link href="/numerology" className="group">
              <div className="bg-white border border-[#E7E0D4] hover:border-[#A78652] p-4 rounded-2xl transition-all shadow-sm hover:shadow-md text-center space-y-2">
                <Award className="w-6 h-6 text-[#A78652] mx-auto group-hover:scale-110 transition-transform" />
                <h4 className="font-serif font-bold text-xs text-[#1D1C1A] group-hover:text-[#6F2935]">Numerology</h4>
              </div>
            </Link>

            <Link href="/blog" className="group">
              <div className="bg-white border border-[#E7E0D4] hover:border-[#A78652] p-4 rounded-2xl transition-all shadow-sm hover:shadow-md text-center space-y-2">
                <BookOpen className="w-6 h-6 text-[#A78652] mx-auto group-hover:scale-110 transition-transform" />
                <h4 className="font-serif font-bold text-xs text-[#1D1C1A] group-hover:text-[#6F2935]">Vedic Blog</h4>
              </div>
            </Link>
          </div>
        </section>

        {/* ── 8. SEO SCHEMAS & INTERNAL MESH ──────────────────────────────── */}
        <BreadcrumbSchema items={[
          { name: 'Home', url: '/' },
          { name: 'Appointments & Consultations', url: '/appointments' }
        ]} />

        <FAQSchema faqs={[
          { question: 'How do online video consultations work with Rajessh Paanday and Kusum Panday?', answer: 'Once you book a slot, you receive an automated confirmation with a Google Meet / Video call link. Sessions are 1-on-1 and confidential.' },
          { question: 'What details are required before my consultation?', answer: 'Your full name, exact date of birth, time of birth, and birth city. If you do not know your birth time, birth time rectification or numerology/handwriting analysis will be used.' },
          { question: 'Can I record or take notes during my astrology consultation?', answer: 'Yes! You are encouraged to take notes. A detailed Janam Kundli or summary blueprint is also provided after your session.' },
          { question: 'What is the refund policy for consultation bookings?', answer: 'Rescheduling is free up to 24 hours prior to your slot. Unused bookings can be rescheduled for any available date within 90 days.' }
        ]} />

        <SEOInternalMesh currentCategory="appointments" />

      </div>
    </div>
  );
}
