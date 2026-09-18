'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/AuthProvider';
import { client } from '../lib/api/client';
import { env } from '../lib/env';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Compass,
  Hash,
  Layers,
  PenTool,
  Calendar,
  Star,
  HelpCircle,
  Briefcase,
  PhoneCall,
  Building2,
  Heart,
  ArrowRight,
  BookOpen,
  Download,
  Moon,
  Lock,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Clock,
  AlertCircle
} from 'lucide-react';
import { GoldButton } from '../components/ui/GoldButton';
import { EditorialCard } from '../components/ui/EditorialCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { BatchCardSkeleton, ShopItemSkeleton } from '../components/ui/Skeleton';
import { FormattedText } from '../components/ui/FormattedText';
import { FAQSection } from '../components/ui/FAQSection';
import { DailyPanchangMuhuratWidget } from '../components/ui/astrology/DailyPanchangMuhuratWidget';

const testimonials = [
  {
    name: "Rohan Deshmukh",
    initials: "RD",
    role: "SaaS Founder, Mumbai",
    quote: "I was uncertain about a name spelling modification. After our Numerology session and launching on the suggested auspicious date, our momentum completely shifted."
  },
  {
    name: "Ananya Mehta",
    initials: "AM",
    role: "Creative Director, Delhi",
    quote: "The handwriting analysis identified subtle stress triggers I was unaware of. The daily writing exercises provided noticeable calm and focus."
  },
  {
    name: "Sarah Jenkins",
    initials: "SJ",
    role: "Analyst, London",
    quote: "My Tarot session bypassed generic answers and got straight to the core of my career transition. I gained clear confidence for my next steps."
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    role: "Product Lead, Bengaluru",
    quote: "The Transit analysis accurately outlined the timing for my career change. The guidance was grounded, practical, and highly reassuring."
  }
];

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = 'OM Astrology AMC — Personal Guidance & Occult Consultations';
  }, []);

  // Booking states
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');

  // Queries
  const { data: batches, isLoading: isLoadingBatches } = useQuery({
    queryKey: ['public-batches'],
    queryFn: async () => {
      const res = await client.get('/batches');
      return res.data?.data || [];
    },
  });

  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const res = await client.get('/team');
      return res.data?.data || [];
    },
  });

  const { data: shopItems, isLoading: isLoadingShopItems } = useQuery({
    queryKey: ['public-shop-items'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
  });

  const { data: dynamicReviews = [] } = useQuery({
    queryKey: ['success-stories'],
    queryFn: async () => {
      const res = await client.get('/reviews/success-stories');
      return res.data?.data || [];
    },
  });

  const { data: appointmentTypes } = useQuery({
    queryKey: ['appointmentTypes'],
    queryFn: async () => {
      const res = await client.get('/appointments/types');
      return res.data?.data || [];
    },
  });

  const selectedType = appointmentTypes?.find((t: any) => t._id === selectedTypeId);

  const { data: availableSlots, isFetching: isFetchingSlots } = useQuery({
    queryKey: ['slots', selectedDate, selectedType?.duration],
    queryFn: async () => {
      if (!selectedDate || !selectedType) return [];
      const res = await client.get('/appointments/slots', {
        params: {
          date: selectedDate,
          duration: selectedType.duration,
        },
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

  const bookingMutation = useMutation({
    mutationFn: async () => {
      if (!selectedTypeId || !selectedTimeSlot) {
        throw new Error('Please select type and time slot');
      }
      const res = await client.post('/appointments', {
        appointmentTypeId: selectedTypeId,
        scheduledAt: selectedTimeSlot,
      });
      return res.data?.data;
    },
    onSuccess: async (data: any) => {
      if (!data.paymentRequired) {
        alert('🎉 Consultation booked successfully! Confirmation email and calendar invite sent.');
        setSelectedTypeId('');
        setSelectedDate('');
        setSelectedTimeSlot('');
        return;
      }
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert('Failed to load payment gateway. Please check connection.');
        return;
      }
      const options = {
        key: data.key || env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'OM Astrology AMC',
        description: `Consultation: ${selectedType?.name || 'Appointment'}`,
        order_id: data.razorpayOrderId,
        handler: async (response: any) => {
          try {
            await client.post('/appointments/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            setSelectedTypeId('');
            setSelectedDate('');
            setSelectedTimeSlot('');
            alert('🎉 Payment confirmed! Your consultation has been booked.');
          } catch (err: any) {
            alert('Payment verification failed.');
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
      alert(`❌ Error: ${err.response?.data?.error?.message || err.message}`);
    },
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to book a consultation.');
      router.push('/login');
      return;
    }
    bookingMutation.mutate();
  };

  const questionCategories = [
    {
      num: '01',
      title: 'Career & Business Direction',
      desc: 'Uncertainty about timing, job transitions, business launch dates, or corporate name alignment.',
      link: '/profession-career'
    },
    {
      num: '02',
      title: 'Relationship & Marriage Harmony',
      desc: 'Guna Milan compatibility, Ashtakoot analysis, 7th house alignments, and partner timing.',
      link: '/marriage-matching'
    },
    {
      num: '03',
      title: 'Name & Signature Vibration',
      desc: 'Chaldean numerology name correction, lucky mobile selection, and graphology stroke tuning.',
      link: '/name-correction'
    },
    {
      num: '04',
      title: 'Auspicious Timing & Transits',
      desc: 'Saturn, Jupiter & Rahu-Ketu transits, Sade Sati timing, and Panchang Muhurat selection.',
      link: '/horoscope'
    }
  ];

  const coreDisciplines = [
    {
      title: 'Vedic Astrology',
      desc: 'Birth chart (Janam Kundli) analysis, planetary transits, Mahadasha timing, and customized Vedic remedies.',
      icon: <Compass className="w-6 h-6 text-[#6F2935]" />,
      link: '/astrology'
    },
    {
      title: 'Numerology',
      desc: 'Life Path math, driver/conductor numbers, name spelling correction, and mobile number resonance.',
      icon: <Hash className="w-6 h-6 text-[#6F2935]" />,
      link: '/numerology'
    },
    {
      title: 'Tarot Guidance',
      desc: 'Archetypal card spreads providing immediate clarity on present situations and imminent decision points.',
      icon: <Layers className="w-6 h-6 text-[#6F2935]" />,
      link: '/tarot-card'
    },
    {
      title: 'Graphology',
      desc: 'Neuromotor handwriting analysis & signature correction to re-align subconscious habits.',
      icon: <PenTool className="w-6 h-6 text-[#6F2935]" />,
      link: '/graphology'
    },
    {
      title: 'Occult Synthesis',
      desc: 'Cross-discipline methodology synthesizing planetary transits, numbers, tarot spreads, and graphology.',
      icon: <Sparkles className="w-6 h-6 text-[#6F2935]" />,
      link: '/occult-synthesis'
    }
  ];

  const lifeSolutions = [
    { title: 'Love & Marriage Harmony', desc: 'Detailed Ashtakoot 36-Guna matching, 7th house planetary alignment, and relationship remedies.', link: '/marriage-matching', icon: <Heart className="w-5 h-5 text-[#6F2935]" /> },
    { title: 'Career & Business Blueprint', desc: '10th house & Amatyakaraka analysis to identify your optimal profession and venture timings.', link: '/profession-career', icon: <Briefcase className="w-5 h-5 text-[#6F2935]" /> },
    { title: 'Name Correction Numerology', desc: 'Align your name letter vibrations with your driver/conductor numbers for obstacle removal.', link: '/name-correction', icon: <PenTool className="w-5 h-5 text-[#6F2935]" /> },
    { title: 'Lucky Mobile Selection', desc: 'Choose digital phone number vibrations that harmonize with your birth blueprint.', link: '/lucky-mobile', icon: <PhoneCall className="w-5 h-5 text-[#6F2935]" /> },
    { title: 'Corporate & Brand Numerology', desc: 'Business title spelling, logo color resonance, and auspicious incorporation dates.', link: '/corporate-numerology', icon: <Building2 className="w-5 h-5 text-[#6F2935]" /> }
  ];

  const journeySteps = [
    { num: '01', title: 'Tell us what you are navigating', desc: 'Share your questions, birth details, or current decision points in confidence.' },
    { num: '02', title: 'We identify the right consultation', desc: 'Our team maps your situation to the appropriate discipline or cross-discipline synthesis.' },
    { num: '03', title: 'Meet your consultant', desc: 'Private 1-on-1 video or in-person session with senior astrologers & numerologists.' },
    { num: '04', title: 'Leave with greater clarity', desc: 'Receive structured guidance, recorded findings, and practical lifestyle remedies.' }
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#1D1C1A] flex flex-col font-sans">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-12 pb-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4] overflow-hidden">
        <div className="max-w-[1280px] mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#6F2935] bg-[#6F2935]/10 px-3.5 py-1.5 rounded-full">
              Personal Guidance Practice
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-[#1D1C1A]">
              Personal guidance rooted in traditional Indian occult practice, presented with modern clarity.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#77736D] max-w-2xl mx-auto leading-relaxed pt-2 font-normal">
              A quiet, thoughtful consultation practice blending Vedic Astrology, Chaldean Numerology, Tarot, and Graphology — directed by master consultants.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link href="/appointments">
              <GoldButton variant="filled" className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold">
                Book a Consultation &rarr;
              </GoldButton>
            </Link>
            <Link href="/free-tools">
              <GoldButton variant="outlined" className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold">
                Explore Free Tools
              </GoldButton>
            </Link>
          </motion.div>

          {/* Trust statistics banner */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center border-t border-[#E7E0D4]">
            <div className="space-y-1">
              <p className="font-serif text-2xl font-bold text-[#1D1C1A]">9+ Years</p>
              <p className="text-xs text-[#77736D] uppercase tracking-wider">Active Practice</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-2xl font-bold text-[#1D1C1A]">10,000+</p>
              <p className="text-xs text-[#77736D] uppercase tracking-wider">Consultations Delivered</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-2xl font-bold text-[#6F2935]">100%</p>
              <p className="text-xs text-[#77736D] uppercase tracking-wider">Confidential &amp; Private</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. "WHAT BRINGS YOU HERE?" SECTION ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4] bg-[#FAF7F2]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <SectionHeading
            kicker="Situation Entry Points"
            title="What brings you here today?"
            subtitle="Explore guidance tailored to the exact question or situation you are navigating."
            showOrbitLine
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {questionCategories.map((item) => (
              <Link href={item.link} key={item.num} className="block group">
                <EditorialCard className="h-full flex flex-col justify-between space-y-4 hover:border-[#6F2935]/40 transition-colors">
                  <div className="space-y-3">
                    <span className="font-mono text-xs font-bold text-[#A78652] block">
                      {item.num}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#1D1C1A] group-hover:text-[#6F2935] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#6F2935] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Guidance &rarr;
                  </span>
                </EditorialCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CORE DISCIPLINES SECTION ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <SectionHeading
            kicker="Our Core Disciplines"
            title="Ancient occult sciences applied with systematic rigor."
            subtitle="We utilize four traditional Indian occult disciplines, individually or synthesized, to provide complete perspective."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreDisciplines.map((disc) => (
              <Link href={disc.link} key={disc.title} className="block group">
                <EditorialCard className="h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E7E0D4] flex items-center justify-center">
                      {disc.icon}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1D1C1A] group-hover:text-[#6F2935] transition-colors">
                      {disc.title}
                    </h3>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      {disc.desc}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#1D1C1A] group-hover:text-[#6F2935] inline-flex items-center gap-1">
                    Learn Discipline &rarr;
                  </span>
                </EditorialCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PERSONALIZED LIFE GUIDANCE SECTION ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4] bg-[#FAF7F2]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <SectionHeading
            kicker="Tailored Solutions"
            title="Personalized Life Guidance"
            subtitle="Structured consultation offerings addressing specific personal, financial, and relational alignment needs."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifeSolutions.map((sol) => (
              <Link href={sol.link} key={sol.title} className="block group">
                <EditorialCard className="h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-white border border-[#E7E0D4] flex items-center justify-center">
                      {sol.icon}
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1D1C1A] group-hover:text-[#6F2935] transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#6F2935] inline-flex items-center gap-1">
                    View Solution Details &rarr;
                  </span>
                </EditorialCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. THE CONSULTATION JOURNEY ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <SectionHeading
            kicker="The Process"
            title="What happens during a consultation?"
            subtitle="Transparent, respectful 4-step consultation workflow ensuring absolute privacy and actionable recommendations."
            showOrbitLine
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeySteps.map((step) => (
              <EditorialCard key={step.num} hoverable={false} className="space-y-3 relative">
                <span className="font-mono text-sm font-bold text-[#6F2935] bg-[#6F2935]/10 px-2.5 py-1 rounded inline-block">
                  Step {step.num}
                </span>
                <h4 className="font-serif text-base font-bold text-[#1D1C1A]">
                  {step.title}
                </h4>
                <p className="text-xs text-[#77736D] leading-relaxed">
                  {step.desc}
                </p>
              </EditorialCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. MEET MASTER CONSULTANT ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4] bg-[#FAF7F2]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-[#E7E0D4] aspect-[4/5] bg-white">
              <img
                src="/images/team_raajesh.png"
                alt="Rajessh Paanday - Master Consultant"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              kicker="Expert Practice Ethos"
              title="Guided by 9+ years of research and personal practice."
              subtitle="At OM Astrology AMC, we believe occult sciences are thoughtful tools for self-discovery and conscious decision-making — not superstitious shortcuts."
              centered={false}
            />
            <div className="space-y-4 text-xs sm:text-sm text-[#77736D] leading-relaxed">
              <p>
                Our consultations are conducted by Rajessh Paanday and senior practice specialists. Each session is approached with deep respect for your individual journey, offering non-judgmental dialogue and realistic, practical remedies.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-[#1D1C1A]">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#6F2935]" />
                  <span>Senior Master Consultants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#6F2935]" />
                  <span>Strict Data Ethics &amp; Confidentiality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6F2935]" />
                  <span>No Blind Superstitions</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#6F2935]" />
                  <span>Practical Lifestyle Remedies</span>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <Link href="/about-us">
                <GoldButton variant="outlined" className="px-6 py-2.5 text-xs font-semibold">
                  Read Practice Ethos &rarr;
                </GoldButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FREE INTERACTIVE OCCULT TOOLS SHOWCASE ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <SectionHeading
            kicker="Free Tools &amp; Calculators"
            title="Explore free interactive occult modules."
            subtitle="Generate birth details, Chaldean numerology charts, Panchang timings, and relationship compatibility instantly."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Zodiac Sign Finder', desc: 'Identify Sun & Moon signs from your birth details.', link: '/free-tools/zodiac-sign-finder' },
              { title: 'Moon Sign Calculator', desc: 'Calculate your natal Moon sign (Rashi) and emotional core.', link: '/free-tools/moon-sign-calculator' },
              { title: 'Ascendant (Lagna) Finder', desc: 'Determine your rising sign and 1st house blueprint.', link: '/free-tools/ascendant-calculator' },
              { title: 'Chaldean Numerology', desc: 'Compute Life Path numbers and name vibration counts.', link: '/free-tools/numerology-calculator' },
              { title: 'Ashtakoot Guna Matcher', desc: 'Check 36-Guna compatibility for marriage alignment.', link: '/free-tools/marriage-compatibility-checker' },
              { title: 'Daily Panchang &amp; Tithi', desc: 'View traditional Hindu calendar timings and Muhurats.', link: '/free-tools/panchang' }
            ].map((tool) => (
              <Link href={tool.link} key={tool.title} className="block group">
                <EditorialCard className="h-full flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-serif text-base font-bold text-[#1D1C1A] group-hover:text-[#6F2935] transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#6F2935] inline-flex items-center gap-1">
                    Calculate Now &rarr;
                  </span>
                </EditorialCard>
              </Link>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link href="/free-tools">
              <GoldButton variant="outlined" className="px-8 py-3 text-xs font-semibold">
                View All Free Tools &rarr;
              </GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. TRUST & CONFIDENTIALITY ASSURANCE ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4] bg-[#FAF7F2]">
        <div className="max-w-[1280px] mx-auto text-center space-y-8">
          <SectionHeading
            kicker="Client Protection"
            title="Your privacy and peace of mind are guaranteed."
            subtitle="We maintain absolute confidentiality. Your birth details, personal history, and consultation recordings are never shared."
            showOrbitLine
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4 text-left">
            <EditorialCard hoverable={false} className="space-y-2">
              <Lock className="w-6 h-6 text-[#6F2935]" />
              <h4 className="font-serif text-base font-bold text-[#1D1C1A]">Confidentiality First</h4>
              <p className="text-xs text-[#77736D] leading-relaxed">
                All records, audio files, and birth charts remain strictly confidential between you and your consultant.
              </p>
            </EditorialCard>

            <EditorialCard hoverable={false} className="space-y-2">
              <Clock className="w-6 h-6 text-[#6F2935]" />
              <h4 className="font-serif text-base font-bold text-[#1D1C1A]">Post-Session Support</h4>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Receive clear written summaries and post-consultation clarification windows for any follow-up questions.
              </p>
            </EditorialCard>

            <EditorialCard hoverable={false} className="space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#6F2935]" />
              <h4 className="font-serif text-base font-bold text-[#1D1C1A]">Grounded Guidance</h4>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Clear, actionable guidance free from fear-inducing predictions or costly mandatory ritual demands.
              </p>
            </EditorialCard>
          </div>
        </div>
      </section>

      {/* ── 9. CLIENT EXPERIENCES ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <SectionHeading
            kicker="Client Feedback"
            title="Experiences from seekers who found clarity."
            subtitle="Reflections from individuals, business founders, and families who consulted with our practice."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, idx) => (
              <EditorialCard key={idx} hoverable={false} className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex text-[#A78652] gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#A78652]" stroke="none" />
                    ))}
                  </div>
                  <p className="text-xs text-[#77736D] italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E7E0D4] flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#6F2935]/10 flex items-center justify-center font-bold text-[10px] text-[#6F2935]">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1D1C1A]">{t.name}</p>
                    <p className="text-[10px] text-[#77736D]">{t.role}</p>
                  </div>
                </div>
              </EditorialCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. JOURNAL & INSIGHTS PREVIEW ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4] bg-[#FAF7F2]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <SectionHeading
            kicker="Editorial Journal"
            title="Insights &amp; Articles"
            subtitle="In-depth writings on planetary transits, Chaldean mathematics, graphology strokes, and Vedic remedies."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Chaldean vs Pythagorean Numerology — Which System Is More Accurate?",
                desc: "Compare the ancient Babylonian sound-vibration method with the Greek alphabetical system.",
                category: "Numerology",
                link: "/blog/chaldean-vs-pythagorean-numerology-accuracy"
              },
              {
                title: "Saturn Transit 2026 Effects on All 12 Zodiac Signs",
                desc: "Understand how the movement of Saturn into Pisces will alter your career and health in 2026.",
                category: "Astrology",
                link: "/blog/saturn-transit-2026-effects-on-all-12-zodiac-signs"
              },
              {
                title: "What Is FEAN Method Astrology? — Complete Explanation",
                desc: "Discover how we blend Five Elements, Astrology, and Numerology to create your lifetime blueprint.",
                category: "FEAN Method",
                link: "/blog/what-is-fean-method-astrology-complete-explanation"
              }
            ].map((art) => (
              <Link href={art.link} key={art.title} className="block group">
                <EditorialCard className="h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#6F2935] bg-[#6F2935]/10 px-2.5 py-0.5 rounded">
                      {art.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#1D1C1A] group-hover:text-[#6F2935] transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      {art.desc}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#6F2935] inline-flex items-center gap-1">
                    Read Article &rarr;
                  </span>
                </EditorialCard>
              </Link>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link href="/blog">
              <GoldButton variant="outlined" className="px-8 py-3 text-xs font-semibold">
                Explore Journal Archive &rarr;
              </GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. FINAL BOOKING CTA SECTION ── */}
      <section id="book" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-white rounded-2xl border border-[#E7E0D4] p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto space-y-8">
            <SectionHeading
              kicker="Take the Next Step"
              title="Schedule your 1-on-1 Consultation"
              subtitle="Select your preferred discipline, pick a date, and reserve your private session."
              showOrbitLine
            />

            <form onSubmit={handleBookSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1D1C1A]">
                  1. Select Consultation Type *
                </label>
                <select
                  value={selectedTypeId}
                  onChange={(e) => {
                    setSelectedTypeId(e.target.value);
                    setSelectedDate('');
                    setSelectedTimeSlot('');
                  }}
                  required
                  className="w-full bg-[#FAF7F2] border border-[#E7E0D4] rounded-lg py-3 px-4 text-[#1D1C1A] text-xs focus:outline-none focus:ring-2 focus:ring-[#A78652]"
                >
                  <option value="">-- Select a consultation offering --</option>
                  {appointmentTypes?.map((type: any) => {
                    const now = new Date();
                    const hasActiveOffer = type.offerPrice !== undefined && type.offerPrice !== null &&
                      (!type.offerExpiresAt || now < new Date(type.offerExpiresAt));
                    const priceText = hasActiveOffer
                      ? `₹${(type.offerPrice / 100).toLocaleString()} (Offer!)`
                      : `₹${(type.price / 100).toLocaleString()}`;
                    return (
                      <option key={type._id} value={type._id}>
                        {type.name} — {type.duration} Mins ({priceText})
                      </option>
                    );
                  })}
                </select>
              </div>

              {selectedTypeId && (
                <>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1D1C1A]">
                      2. Select Date *
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
                      className="w-full bg-[#FAF7F2] border border-[#E7E0D4] rounded-lg py-3 px-4 text-[#1D1C1A] text-xs focus:outline-none focus:ring-2 focus:ring-[#A78652]"
                    />
                  </div>

                  {selectedDate && (
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#1D1C1A]">
                        3. Available IST Time Slots
                      </label>

                      {isFetchingSlots ? (
                        <p className="text-xs text-[#77736D] animate-pulse">Checking calendar availability...</p>
                      ) : availableSlots && availableSlots.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {availableSlots.map((slot: string) => {
                            const dateObj = new Date(slot);
                            const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const isSelected = selectedTimeSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`py-2 px-3 text-xs rounded-lg border font-medium transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#1D1C1A] text-white border-transparent'
                                    : 'bg-[#FAF7F2] text-[#1D1C1A] border-[#E7E0D4] hover:bg-white hover:border-[#A78652]'
                                }`}
                              >
                                {timeStr} IST
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
                          <span>No slots available for this date. Please choose another date.</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1D1C1A]">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={bookingMessage}
                  onChange={(e) => setBookingMessage(e.target.value)}
                  placeholder="Mention your birth details or specific situation..."
                  rows={3}
                  className="w-full bg-[#FAF7F2] border border-[#E7E0D4] rounded-lg py-3 px-4 text-[#1D1C1A] text-xs focus:outline-none focus:ring-2 focus:ring-[#A78652]"
                />
              </div>

              <GoldButton
                type="submit"
                variant="burgundy"
                fullWidth
                disabled={!selectedTimeSlot || bookingMutation.isPending}
                isLoading={bookingMutation.isPending}
                className="py-3.5 text-sm font-semibold"
              >
                Confirm Consultation Booking
              </GoldButton>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
