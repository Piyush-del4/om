'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowLeft, Star, Phone, Award, Calendar, Sparkles, Loader2 } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { FormattedText } from '@/components/ui/FormattedText';

export default function RaajeshProfilePage() {
  const { data: team = [], isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const res = await client.get('/team');
      return res.data?.data || [];
    }
  });

  const member = team.find((m: any) => m.name.toLowerCase().includes('raajesh') || m.name.toLowerCase().includes('rajessh'));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#A78652]" />
      </div>
    );
  }

  const specializations = [
    'Vedic Astrologer', 'Kundali Analysis', 'Numerology Expert',
    '5 Element Analysis', 'Rudraksha Therapy', 'Signature Science',
    'Graphologist', 'Career Guidance Coach'
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-gray-900 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation */}
        <Link 
          href="/appointments" 
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#6F2935] hover:text-[#A78652] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Consultations
        </Link>

        {/* 2-Column Luxury Profile Card */}
        <div className="bg-white border border-[#E7E0D4] rounded-3xl p-6 sm:p-10 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Portrait */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#E7E0D4] bg-[#F7F3EA] aspect-[4/5] shadow-sm">
                <img
                  src={member?.image || '/images/team_raajesh.png'}
                  alt="Rajessh Paanday — Founder & Chief Consultant"
                  className="w-full h-full object-cover object-top"
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
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1C1A]">
                  Rajessh Paanday
                </h1>
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
                  {specializations.map((spec, i) => (
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
                <Link href="/appointments#book-slot">
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

      </div>
    </div>
  );
}

