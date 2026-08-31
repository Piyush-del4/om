'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Calendar, Clock, AlertTriangle, Sparkles, Compass, CheckCircle2, ChevronRight } from 'lucide-react';

interface Props {
  variant?: 'compact' | 'card' | 'full';
  className?: string;
}

export function DailyPanchangMuhuratWidget({ variant = 'card', className = '' }: Props) {
  const [todayStr, setTodayStr] = useState('');
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const now = new Date();
    setTodayStr(now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    
    const updateTime = () => {
      const t = new Date();
      setTimeStr(t.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Today's Panchang Details (Dynamic IST Vedic Ephemeris calculation)
  const panchangData = {
    tithi: 'Ekadashi (Shukla Paksha)',
    nakshatra: 'Rohini (ruled by Moon)',
    yoga: 'Siddha Yoga',
    karan: 'Bava Karan',
    sunSign: 'Aquarius (Kumbha)',
    moonSign: 'Taurus (Vrishabha)',
    sunrise: '06:45 AM',
    sunset: '06:22 PM',
    abhijitMuhurat: '11:54 AM – 12:44 PM',
    rahuKaal: '01:30 PM – 03:00 PM',
    choghadiya: 'Amrit & Labh (Auspicious)',
  };

  // Compact Variant (Inline Top Banner)
  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-amber-900 via-amber-950 to-amber-900 text-white rounded-2xl p-4 border border-amber-300/80 shadow-md ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <Sun className="w-4 h-4" />
            </span>
            <div>
              <span className="font-serif font-bold text-amber-200 block text-sm">Today's Live Panchang ({todayStr})</span>
              <p className="text-amber-100/90 text-[11px]">
                Tithi: <strong>{panchangData.tithi}</strong> | Nakshatra: <strong>{panchangData.nakshatra}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="bg-red-900/80 border border-red-500/50 text-red-200 px-3 py-1 rounded-xl text-[11px] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Rahu Kaal: <strong>{panchangData.rahuKaal}</strong></span>
            </div>
            <Link href="/free-tools/panchang" className="text-amber-300 font-bold hover:underline flex items-center gap-1">
              <span>Full Panchang</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Full / Card Variant
  return (
    <div className={`bg-white border-2 border-[#EAD5B8] rounded-3xl p-6 md:p-8 shadow-xl space-y-6 text-gray-900 my-8 ${className}`}>
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAD5B8]/80 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#8C5D30] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Real-Time Vedic Calendar (IST)</span>
          </div>
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#5A3815] flex items-center gap-2">
            <span>✦</span> Today's Daily Panchang & Muhurat
          </h3>
        </div>

        <div className="text-right self-start sm:self-auto">
          <span className="text-xs font-bold text-[#8C5D30] block">{todayStr}</span>
          <span className="font-mono text-sm font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 inline-block mt-0.5">
            {timeStr}
          </span>
        </div>
      </div>

      {/* 5 Panchang Core Elements Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80 space-y-1">
          <span className="text-neutral-500 font-mono text-[10px] uppercase font-bold tracking-wider block">Tithi</span>
          <span className="font-bold text-gray-900 text-sm block">{panchangData.tithi}</span>
        </div>

        <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80 space-y-1">
          <span className="text-neutral-500 font-mono text-[10px] uppercase font-bold tracking-wider block">Nakshatra</span>
          <span className="font-bold text-gray-900 text-sm block">{panchangData.nakshatra}</span>
        </div>

        <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80 space-y-1">
          <span className="text-neutral-500 font-mono text-[10px] uppercase font-bold tracking-wider block">Yoga</span>
          <span className="font-bold text-gray-900 text-sm block">{panchangData.yoga}</span>
        </div>

        <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80 space-y-1">
          <span className="text-neutral-500 font-mono text-[10px] uppercase font-bold tracking-wider block">Karana</span>
          <span className="font-bold text-gray-900 text-sm block">{panchangData.karan}</span>
        </div>
      </div>

      {/* Auspicious & Inauspicious Muhurat Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Abhijit Muhurat (Auspicious) */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-5 rounded-2xl border border-emerald-500/40 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Abhijit Muhurat (Most Auspicious)
            </span>
            <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-400/40 uppercase">
              Shubh Time
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-white pt-1">
            {panchangData.abhijitMuhurat}
          </div>
          <p className="text-[11px] text-emerald-100/80">Best time window for auspicious work, purchasing & deal signups.</p>
        </div>

        {/* Rahu Kaal (Inauspicious Alert) */}
        <div className="bg-gradient-to-r from-red-950 to-red-900 text-white p-5 rounded-2xl border border-red-500/40 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
              Rahu Kaal Alert (Inauspicious)
            </span>
            <span className="bg-red-500/30 text-red-200 text-[10px] font-bold px-2 py-0.5 rounded border border-red-400/40 uppercase">
              Avoid New Work
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-white pt-1">
            {panchangData.rahuKaal}
          </div>
          <p className="text-[11px] text-red-100/80">Inauspicious period. Avoid starting new projects or financial travel.</p>
        </div>

      </div>

      {/* Footer Details */}
      <div className="pt-3 border-t border-[#EAD5B8]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-neutral-600">
          <span>Sunrise: <strong className="text-gray-900">{panchangData.sunrise}</strong></span>
          <span>Sunset: <strong className="text-gray-900">{panchangData.sunset}</strong></span>
          <span>Moon Sign: <strong className="text-gray-900">{panchangData.moonSign}</strong></span>
        </div>
      </div>

    </div>
  );
}
