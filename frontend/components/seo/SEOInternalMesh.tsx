'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, Hash, Layers, PenTool, Calendar, ShieldCheck, 
  ArrowRight, Compass, Heart, Sun, Activity, BookOpen, Star 
} from 'lucide-react';

interface SEOInternalMeshProps {
  currentCategory?: 'astrology' | 'numerology' | 'tarot' | 'graphology' | 'tools' | 'appointments' | 'horoscope';
}

export function SEOInternalMesh({ currentCategory = 'astrology' }: SEOInternalMeshProps) {
  const freeTools = [
    { name: 'Kundli Generator', href: '/free-tools/kundli-generator' },
    { name: 'Numerology Calculator', href: '/free-tools/numerology-calculator' },
    { name: 'Marriage Match', href: '/free-tools/marriage-compatibility-checker' },
    { name: 'Daily Panchang', href: '/free-tools/panchang' },
    { name: 'Ascendant Finder', href: '/free-tools/ascendant-calculator' },
    { name: 'Vimshottari Dasha', href: '/free-tools/dasha-calculator' },
    { name: 'Name Numerology', href: '/free-tools/name-numerology-calculator' },
    { name: 'Lucky Number', href: '/free-tools/lucky-number-calculator' },
  ];

  const mainServices = [
    { name: 'Vedic Astrology', href: '/appointments', icon: Sparkles },
    { name: 'Numerology Guidance', href: '/appointments', icon: Hash },
    { name: 'Tarot Card Spreads', href: '/appointments', icon: Layers },
    { name: 'Graphology & Handwriting', href: '/appointments', icon: PenTool },
    { name: 'Name Correction', href: '/appointments', icon: Hash },
    { name: 'Marriage Matching', href: '/appointments', icon: Heart },
    { name: 'Career Counseling', href: '/appointments', icon: Compass },
    { name: 'Corporate Numerology', href: '/appointments', icon: Star },
  ];

  const transits = [
    { name: 'Jupiter Transit 2026', href: '/transit/jupiter' },
    { name: 'Saturn Transit 2026', href: '/transit/saturn' },
    { name: 'Rahu Transit 2026', href: '/transit/rahu' },
    { name: 'Sun Transit 2026', href: '/transit/sun' },
    { name: 'Mars Transit 2026', href: '/transit/mars' },
    { name: 'Venus Transit 2026', href: '/transit/venus' },
  ];

  const lifePaths = [
    { name: 'Life Path 1', href: '/numerology/life-path/1' },
    { name: 'Life Path 3', href: '/numerology/life-path/3' },
    { name: 'Life Path 5', href: '/numerology/life-path/5' },
    { name: 'Life Path 7', href: '/numerology/life-path/7' },
    { name: 'Life Path 11 (Master)', href: '/numerology/life-path/11' },
    { name: 'Life Path 22 (Master)', href: '/numerology/life-path/22' },
  ];

  const astrologyHouses = [
    { name: '1st House (Lagna)', href: '/astrology/houses/1' },
    { name: '7th House (Marriage)', href: '/astrology/houses/7' },
    { name: '10th House (Career)', href: '/astrology/houses/10' },
    { name: 'Manglik Dosha Guide', href: '/astrology/doshas/manglik-dosha' },
    { name: 'Sade Sati Guide', href: '/astrology/doshas/sade-sati' },
    { name: 'Occult Synthesis Hub', href: '/occult-synthesis' },
  ];

  return (
    <div className="my-16 p-8 rounded-3xl bg-white border border-[var(--gold-200)] shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-50)] rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-dark)] bg-[var(--gold-50)] px-3 py-1 rounded-full border border-[var(--gold-200)]">
          Explore Interconnected Guides & Calculators
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
          Discover Deeper Insights Across Occult Sciences
        </h2>
        <p className="text-xs text-gray-600 mt-2 font-light">
          Combine Astrology, Numerology, Graphology, and Tarot for a 360-degree understanding of your life path.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Category 1: Free Calculators */}
        <div>
          <h3 className="font-serif text-base font-bold text-gray-900 border-b border-[var(--gold-200)] pb-2 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[var(--gold-dark)]" /> Free Calculators
          </h3>
          <ul className="space-y-2 text-xs">
            {freeTools.map((tool) => (
              <li key={tool.name}>
                <Link 
                  href={tool.href}
                  className="text-gray-600 hover:text-[var(--gold-dark)] hover:font-medium transition-colors flex items-center justify-between group"
                >
                  <span>{tool.name}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[var(--gold-dark)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Category 2: Specialized Services */}
        <div>
          <h3 className="font-serif text-base font-bold text-gray-900 border-b border-[var(--gold-200)] pb-2 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--gold-dark)]" /> Consultations
          </h3>
          <ul className="space-y-2 text-xs">
            {mainServices.map((service) => (
              <li key={service.name}>
                <Link 
                  href={service.href}
                  className="text-gray-600 hover:text-[var(--gold-dark)] hover:font-medium transition-colors flex items-center justify-between group"
                >
                  <span>{service.name}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[var(--gold-dark)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Category 3: 2026 Planetary Transits */}
        <div>
          <h3 className="font-serif text-base font-bold text-gray-900 border-b border-[var(--gold-200)] pb-2 mb-4 flex items-center gap-2">
            <Sun className="w-4 h-4 text-[var(--gold-dark)]" /> 2026 Transits
          </h3>
          <ul className="space-y-2 text-xs">
            {transits.map((transit) => (
              <li key={transit.name}>
                <Link 
                  href={transit.href}
                  className="text-gray-600 hover:text-[var(--gold-dark)] hover:font-medium transition-colors flex items-center justify-between group"
                >
                  <span>{transit.name}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[var(--gold-dark)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Category 4: Astrology Houses & Doshas */}
        <div>
          <h3 className="font-serif text-base font-bold text-gray-900 border-b border-[var(--gold-200)] pb-2 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[var(--gold-dark)]" /> Astrology & Numerology
          </h3>
          <ul className="space-y-2 text-xs">
            {astrologyHouses.concat(lifePaths.slice(0, 2)).map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className="text-gray-600 hover:text-[var(--gold-dark)] hover:font-medium transition-colors flex items-center justify-between group"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[var(--gold-dark)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Book Consultation Banner */}
      <div className="mt-8 pt-6 border-t border-[var(--gold-100)] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--gold-50)]/50 p-4 rounded-2xl">
        <div className="flex items-center gap-3 text-xs text-gray-700">
          <ShieldCheck className="w-5 h-5 text-[var(--gold-dark)] flex-shrink-0" />
          <span><strong>Experiencing life challenges?</strong> Book a personal video consultation with our senior consultants.</span>
        </div>
        <Link 
          href="/appointments"
          className="px-4 py-2 bg-[var(--gold-dark)] text-white text-xs font-bold rounded-xl hover:bg-black transition-colors whitespace-nowrap shadow-sm"
        >
          Book 1-on-1 Session
        </Link>
      </div>
    </div>
  );
}
