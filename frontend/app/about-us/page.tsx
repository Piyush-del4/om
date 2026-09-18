'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Compass, Hash, Layers, PenTool, Shield, Users, Clock,
  Star, Award, Sparkles, Calendar, MessageSquare, ChevronRight,
  Briefcase, Heart, CheckCircle2, Phone, HelpCircle, ArrowRight,
  ShieldCheck, Lock, Check, Zap, Globe
} from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { FormattedText } from '@/components/ui/FormattedText';
import { FAQSection } from '@/components/ui/FAQSection';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  imageFit: 'cover' | 'contain';
  initials: string;
  specializations: { icon: string; label: string }[];
  description: string;
  accent: string;
  borderColor: string;
  experienceYears?: number;
}

const FAQS = [
  {
    q: 'What is OM Astrology AMC?',
    a: 'OM Astrology AMC is a premium occult consultation platform that synthesizes traditional Vedic Astrology, Numerology, Tarot, and Graphology to provide personalized 1-on-1 life guidance.'
  },
  {
    q: 'How do online consultations work?',
    a: 'All sessions are conducted privately via 1-on-1 video or voice calls. Once you reserve your preferred slot, you will receive an instant email and calendar invitation with your secure meeting link.'
  },
  {
    q: 'What information should I prepare before my session?',
    a: 'For astrology and Kundli readings, your exact date of birth, time of birth, and birth location are required. For numerology and graphology, your full legal name and handwriting/signature samples are analyzed.'
  },
  {
    q: 'How does the multi-science consultation approach benefit me?',
    a: 'Rather than relying on a single discipline, combining astrology (planetary timelines), numerology (name vibrations), and graphology (subconscious traits) gives a comprehensive 360° view of your life path.'
  },
  {
    q: 'Is my personal and consultation data kept private?',
    a: 'Yes, absolutely. We maintain strict professional confidentiality. All birth details, personal questions, and session discussions are kept strictly private and never shared.'
  },
];

const WHAT_WE_DO = [
  {
    icon: <Compass className="w-6 h-6 text-[#A78652]" />,
    title: 'Vedic Astrology & Kundali',
    desc: 'Deep 24-section analysis of planetary transits, Lagna, Dasha timelines, Yogas, and personalized Vedic remedies.'
  },
  {
    icon: <Hash className="w-6 h-6 text-[#A78652]" />,
    title: 'Numerology & Name Correction',
    desc: 'Aligning your birth date vibrations with driver, conductor, and name frequencies to clear life blockages.'
  },
  {
    icon: <Layers className="w-6 h-6 text-[#A78652]" />,
    title: 'Tarot Card Consultations',
    desc: 'Intuitive card spreads offering clear perspective on relationships, immediate choices, and personal timing.'
  },
  {
    icon: <PenTool className="w-6 h-6 text-[#A78652]" />,
    title: 'Graphology & Signature Science',
    desc: 'Analyzing handwriting slants, pressure, and signature strokes to unlock subconscious strengths and habits.'
  },
  {
    icon: <Briefcase className="w-6 h-6 text-[#A78652]" />,
    title: 'Career & Business Blueprint',
    desc: 'Identifying optimal career paths, 10th house alignments, and brand name vibrations for financial success.'
  },
  {
    icon: <Heart className="w-6 h-6 text-[#A78652]" />,
    title: 'Marriage & Relationship Compatibility',
    desc: '36 Guna matching, Manglik analysis, and 7th house synastry for long-term relational harmony.'
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#A78652]" />,
    title: 'Rudraksha & Gemstone Guidance',
    desc: 'Authentic 1-to-14 Mukhi Rudraksha and Vedic gemstone recommendations matched to your birth chart.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#A78652]" />,
    title: '5 Elements & Dosha Audits',
    desc: 'Evaluating Manglik, Kaal Sarp, and Sade Sati doshas with traditional remedial mantras and rituals.'
  },
];

const APPROACH_STEPS = [
  {
    number: '01',
    title: 'Understand',
    desc: 'We listen carefully to your life questions, background, and specific areas where you seek direction.'
  },
  {
    number: '02',
    title: 'Analyse',
    desc: 'Precise planetary calculations, numerology grids, and graphological patterns are constructed from your data.'
  },
  {
    number: '03',
    title: 'Interpret',
    desc: 'Complex cosmic indicators are translated into plain, actionable insights without jargon or fear.'
  },
  {
    number: '04',
    title: 'Guide',
    desc: 'You receive structured guidance, practical timing recommendations, and traditional remedies.'
  },
];

const PHILOSOPHY_PILLARS = [
  {
    icon: <Users className="w-5 h-5 text-[#A78652]" />,
    title: 'PERSONALIZED',
    desc: 'Every session is uniquely crafted around your specific birth coordinates, name, and current life context.'
  },
  {
    icon: <Lock className="w-5 h-5 text-[#A78652]" />,
    title: 'CONFIDENTIAL',
    desc: 'Your personal information, birth details, and session discussions are held with absolute privacy and respect.'
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-[#A78652]" />,
    title: 'CLEAR & TRANSPARENT',
    desc: 'Insights are explained in straightforward, empowering language rather than mystical obscurity.'
  },
  {
    icon: <Zap className="w-5 h-5 text-[#A78652]" />,
    title: 'PRACTICAL & ACTIONABLE',
    desc: 'Consultations focus on practical reflection and real-life choices that empower your personal growth.'
  },
];

const WHY_CHOOSE_US = [
  'Multidisciplinary synthesis combining Astrology, Numerology, Tarot, and Graphology.',
  'Direct 1-on-1 private video consultations with experienced Master Consultants.',
  'Data-backed calculations using exact astronomical ephemeris and Vedic principles.',
  'No fear-mongering or superstitious claims — purely supportive and structured advice.',
  'Authentic, traditional remedies including Rudraksha and personalized mantras.',
  'Global online availability 7 days a week with convenient calendar scheduling.'
];

export default function AboutUsPage() {
  const founderRef = useRef<HTMLDivElement>(null);

  const { data: teamData } = useQuery<TeamMember[]>({
    queryKey: ['team-members'],
    queryFn: async () => {
      const res = await client.get('/team');
      return res.data?.data || [];
    },
    staleTime: 1000 * 60 * 10,
  });

  const team = teamData ?? [];
  const founderMember = team.find(m => m.name.toLowerCase().includes('rajessh') || m.name.toLowerCase().includes('rajesh'));

  const scrollToFounder = () => {
    founderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-gray-900 overflow-x-hidden font-sans pb-16">
      
      {/* ── 1. BRAND HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#F3EEE6] via-[#FAF8F5] to-[#FAF8F5] pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E0D4]">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#6F2935]/10 border border-[#6F2935]/20 text-[#6F2935] text-xs font-mono font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A78652]" /> About OM Astrology AMC
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D1C1A] leading-tight max-w-4xl mx-auto"
          >
            Understanding Life Through <br className="hidden sm:inline" />
            <span className="gold-gradient-text">Ancient Wisdom & Modern Guidance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed"
          >
            OM Astrology AMC brings together traditional Vedic astrology, numerology, graphology, and personalized consultation to help individuals gain clarity, alignment, and confidence across every sphere of life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link href="/appointments">
              <GoldButton variant="burgundy" className="py-3 px-7 text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                <Calendar className="w-4 h-4" /> Explore Consultations
              </GoldButton>
            </Link>
            <GoldButton 
              variant="outlined" 
              onClick={scrollToFounder}
              className="py-3 px-6 text-sm font-semibold flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-[#A78652]" /> Meet Our Founder
            </GoldButton>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pt-16">

        {/* ── 2. BRAND STORY & PHILOSOPHY ────────────────────────────────────── */}
        <section className="bg-white border border-[#E7E0D4] rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Our Story & Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1D1C1A] leading-snug">
              Bridging Sacred Indian Occult Science with Practical Life Direction
            </h2>
            <div className="h-0.5 w-16 bg-[#A78652]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 text-sm sm:text-base font-light leading-relaxed">
            <div className="space-y-4">
              <p>
                OM Astrology AMC was founded with a singular purpose: to transform how individuals experience occult consultations. In a field often clouded by generic predictions and fatalistic warnings, we stand for structured, respectful, and empowering guidance.
              </p>
              <p>
                We believe that planetary patterns, name frequencies, and subconscious handwriting slants are not deterministic cages — they are blueprints. When properly decoded, they reveal innate talents, timing windows, and areas requiring mindful reflection.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                By integrating four foundational disciplines — <strong className="font-semibold text-gray-900">Vedic Astrology, Numerology, Tarot, and Graphology</strong> — our consultants provide a 360-degree synthesis that no single science can achieve on its own.
              </p>
              <p>
                Whether navigating career transitions, personal relationship dynamics, or business decisions, our sessions are designed to deliver actionable clarity in a completely private and supportive environment.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. WHAT WE DO (Services Grid) ─────────────────────────────────── */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Areas of Expertise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1C1A]">
              What We Do
            </h2>
            <div className="h-0.5 w-16 bg-[#A78652] mx-auto" />
            <p className="text-gray-600 text-xs sm:text-sm font-light max-w-xl mx-auto pt-1">
              Comprehensive consultation disciplines tailored to your specific life questions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_WE_DO.map((item, idx) => (
              <GoldCard 
                key={idx} 
                className="bg-white border border-[#E7E0D4] p-6 space-y-3 h-full hover:border-[#A78652] transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E7E0D4] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-serif text-base font-bold text-[#1D1C1A] group-hover:text-[#6F2935] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed font-light">
                  {item.desc}
                </p>
              </GoldCard>
            ))}
          </div>
        </section>

        {/* ── 4. FOUNDER PROFILE SECTION ───────────────────────────────────── */}
        <section ref={founderRef} id="founder" className="scroll-mt-24 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Leadership & Guidance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1C1A]">
              Meet Our Founder & Chief Consultant
            </h2>
            <div className="h-0.5 w-16 bg-[#A78652] mx-auto" />
          </div>

          <div className="bg-white border border-[#E7E0D4] rounded-3xl p-6 sm:p-10 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Portrait */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-[#E7E0D4] bg-[#F7F3EA] aspect-[4/5] shadow-sm">
                  <img
                    src={founderMember?.image || '/images/rajessh_paanday.jpg'}
                    alt="Rajessh Paanday — Founder & Chief Consultant"
                    className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-2xl font-bold">Rajessh Paanday</h3>
                    <p className="text-xs font-mono text-amber-200 uppercase tracking-widest">Founder & Chief Consultant</p>
                  </div>
                </div>

                {/* Quick Credentials Badge */}
                <div className="bg-[#FAF7F2] border border-[#E7E0D4] rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1D1C1A]">
                    <Award className="w-5 h-5 text-[#A78652]" />
                    <span>9+ Years of Professional Experience</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#6F2935] bg-[#6F2935]/10 px-2 py-0.5 rounded">Verified</span>
                </div>
              </div>

              {/* Right Column: Biography & Specializations */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6F2935] bg-[#6F2935]/10 px-3 py-1 rounded-full">
                    Founder & Master Consultant
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1C1A]">
                    Rajessh Paanday
                  </h2>
                </div>

                <div className="text-gray-600 text-sm sm:text-base font-light leading-relaxed space-y-4">
                  <p>
                    Rajessh Paanday is a professional Life Consultant dedicated to helping individuals transform life struggles into meaningful clarity and personal fulfillment. With over 9 years of dedicated practice across Vedic disciplines, he has guided clients from diverse backgrounds toward greater purpose and self-understanding.
                  </p>
                  <p>
                    His consultation methodology combines multiple specialized fields: Vedic Astrology, Numerology, Five Elements Analysis, Signature Science, Graphology, and Career Coaching. By analyzing Date of Birth frequencies alongside handwriting and signature structures, he identifies hidden talents and life blockages — often without requiring an in-person meeting.
                  </p>
                  <p>
                    Rajessh’s mission is to empower clients to make informed life choices, align with suitable career trajectories, and navigate complex timing windows with confidence and peace of mind.
                  </p>
                </div>

                {/* Specializations Grid */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                    Specializations & Areas of Practice
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Vedic Astrologer', 'Kundali Analysis', 'Numerology Expert',
                      '5 Element Analysis', 'Rudraksha Therapy', 'Signature Science',
                      'Graphologist', 'Career Guidance Coach'
                    ].map((spec, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-[#FAF7F2] text-[#1D1C1A] border border-[#E7E0D4] px-3.5 py-1.5 rounded-full font-sans shadow-2xs"
                      >
                        ✦ {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-4 border-t border-[#E7E0D4] flex flex-wrap items-center gap-3">
                  <Link href="/appointments">
                    <GoldButton variant="burgundy" className="py-2.5 px-5 text-xs font-bold flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Book Session with Rajessh
                    </GoldButton>
                  </Link>
                  <a href="tel:+919922352666">
                    <GoldButton variant="outlined" className="py-2.5 px-4 text-xs font-bold flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#A78652]" /> Call (+91 9922352666)
                    </GoldButton>
                  </a>
                  <a href="https://wa.me/919922352666" target="_blank" rel="noopener noreferrer">
                    <button className="py-2.5 px-4 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer">
                      <MessageSquare className="w-4 h-4" /> WhatsApp
                    </button>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ── 5. OUR CONSULTATION APPROACH ─────────────────────────────────── */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Structured Methodology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1C1A]">
              Our Consultation Approach
            </h2>
            <div className="h-0.5 w-16 bg-[#A78652] mx-auto" />
            <p className="text-gray-600 text-xs sm:text-sm font-light max-w-xl mx-auto pt-1">
              How we ensure every private session provides meaningful clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPROACH_STEPS.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-[#E7E0D4] rounded-2xl p-6 space-y-3 relative hover:border-[#A78652] transition-all duration-300 shadow-xs"
              >
                <span className="text-3xl font-black font-mono text-[#A78652]/40 block">
                  {step.number}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1D1C1A]">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. CONSULTATION PHILOSOPHY & VALUES ───────────────────────────── */}
        <section className="bg-[#FAF7F2] border border-[#E7E0D4] rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1D1C1A]">
              Our Consultation Philosophy
            </h2>
            <div className="h-0.5 w-16 bg-[#A78652] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHILOSOPHY_PILLARS.map((pillar, idx) => (
              <div key={idx} className="bg-white border border-[#E7E0D4] rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E7E0D4] flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D1C1A]">
                  {pillar.title}
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. WHY CHOOSE OM ASTROLOGY AMC ────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#E7E0D4] rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Trust & Quality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1C1A] leading-tight">
              Why People Choose OM Astrology AMC
            </h2>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              We stand apart through our commitment to genuine research, authentic traditional calculation, and respectful client guidance.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_CHOOSE_US.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-[#FAF8F5] border border-[#E7E0D4] p-4 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-gray-800 font-medium leading-relaxed">
                  {reason}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 8. COMPACT FAQ SECTION ───────────────────────────────────────── */}
        <section className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1D1C1A]">
              Frequently Asked Questions
            </h2>
            <div className="h-0.5 w-16 bg-[#A78652] mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto">
            <FAQSection faqs={FAQS} />
          </div>
        </section>

        {/* ── 9. FINAL CTA BANNER ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#1D1C1A] via-[#2A2723] to-[#1D1C1A] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#A78652]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-[#A78652] text-xs font-mono font-semibold uppercase tracking-widest block">
              Begin Your Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Ready to Explore Your Consultation?
            </h2>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              Reserve a private 1-on-1 session with our Master Consultants and gain practical clarity on your life path today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/appointments">
                <GoldButton variant="burgundy" className="py-3 px-8 text-sm font-bold flex items-center gap-2 shadow-lg">
                  <Calendar className="w-4 h-4" /> Book an Appointment
                </GoldButton>
              </Link>
              <Link href="/astrology">
                <button className="py-3 px-6 text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl transition-all flex items-center gap-2 cursor-pointer">
                  <Compass className="w-4 h-4 text-[#A78652]" /> Explore Services
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
