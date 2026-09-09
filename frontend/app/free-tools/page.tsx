'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Hash, Star, Heart, Compass, Moon, Sun, Eye, Calendar, 
  BookOpen, CheckCircle2, Activity, Palette, Sparkles, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';

const tools = [
  { name: 'Numerology Calculator', description: 'Calculate your Mulank, Bhagyank, and Namank numbers.', href: '/free-tools/numerology-calculator', icon: Hash, category: 'Numerology' },
  { name: 'Kundli Generator', description: 'Generate complete Vedic birth chart with planetary positions.', href: '/free-tools/kundli-generator', icon: Sparkles, category: 'Astrology' },
  { name: 'Marriage Compatibility', description: 'Check 36 Guna Ashtakoot matching & Manglik compatibility.', href: '/free-tools/marriage-compatibility-checker', icon: Heart, category: 'Matchmaking' },
  { name: 'Daily Panchang', description: 'Tithi, Nakshatra, Yoga, Karana, and auspicious Rahu Kaal timings.', href: '/free-tools/panchang', icon: Calendar, category: 'Astrology' },
  { name: 'Name Numerology', description: 'Analyze name spelling vibrations with Chaldean system.', href: '/free-tools/name-numerology-calculator', icon: Hash, category: 'Numerology' },
  { name: 'Lucky Number Calculator', description: 'Find your personal lucky numbers for success and finances.', href: '/free-tools/lucky-number-calculator', icon: Star, category: 'Numerology' },
  { name: 'Ascendant Calculator', description: 'Find your Lagna (Rising Sign) and physical traits.', href: '/free-tools/ascendant-calculator', icon: Sun, category: 'Astrology' },
  { name: 'Moon Sign Calculator', description: 'Discover your Rashi and inner emotional core.', href: '/free-tools/moon-sign-calculator', icon: Moon, category: 'Astrology' },
  { name: 'Nakshatra Finder', description: 'Identify your birth star and ruling planetary deity.', href: '/free-tools/nakshatra-finder', icon: Eye, category: 'Astrology' },
  { name: 'Dasha Calculator', description: 'Track your Vimshottari Mahadasha and Antardasha periods.', href: '/free-tools/dasha-calculator', icon: Activity, category: 'Astrology' },
  { name: 'Muhurat Calculator', description: 'Find auspicious dates and time windows for events.', href: '/free-tools/muhurat-calculator', icon: CheckCircle2, category: 'Astrology' },
  { name: 'Lucky Color Finder', description: 'Choose colors aligned with your birth number and planets.', href: '/free-tools/lucky-color-calculator', icon: Palette, category: 'Numerology' },
  { name: 'Zodiac Sign Finder', description: 'Determine Sun Sign, element, and dominant personality.', href: '/free-tools/zodiac-sign-finder', icon: Compass, category: 'Astrology' },
  { name: 'Birth Chart Generator', description: 'Instant natal chart graph with planetary house divisions.', href: '/free-tools/birth-chart-generator', icon: BookOpen, category: 'Astrology' },
  { name: 'Daily Horoscope', description: 'Read daily predictions for all 12 zodiac signs.', href: '/free-tools/daily-horoscope', icon: Sun, category: 'Horoscope' },
];

export default function FreeToolsHubPage() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[var(--gold)]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 max-w-3xl mx-auto pt-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--gold-50)] text-[var(--gold-dark)] border border-[var(--gold-200)]">
            <Sparkles className="w-3.5 h-3.5" /> 100% Free Astrology Utilities
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight">
            Free <span className="gold-gradient-text">Astrology & Numerology</span> Calculators
          </h1>
          <p className="text-gray-600 text-base font-light leading-relaxed">
            Generate precise Kundlis, calculate life path numbers, evaluate marriage compatibility, and track planetary dashas using authentic Vedic and Chaldean formulas.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
              >
                <Link href={tool.href} className="group block h-full">
                  <GoldCard className="h-full border border-[var(--gold-200)] p-6 hover:border-[var(--gold)] transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-1 shadow-sm hover:shadow-md">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--gold-50)] text-[var(--gold-dark)] flex items-center justify-center border border-[var(--gold-200)] group-hover:bg-[var(--gold)] group-hover:text-black transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--gold-dark)] bg-[var(--gold-50)] px-2 py-0.5 rounded border border-[var(--gold-200)]">
                          {tool.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-[var(--gold-dark)] transition-colors flex items-center gap-2">
                        {tool.name}
                      </h3>
                      <p className="mt-2 text-xs text-gray-600 leading-relaxed font-light">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[var(--gold-dark)]">
                      <span>Calculate Free</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GoldCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* E-E-A-T & Trust Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--gold-50)] to-amber-50 border border-[var(--gold-200)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--gold-dark)] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[var(--gold-dark)]" /> Verified Vedic Calculations
            </span>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Need Personal Guidance Beyond Automated Reports?
            </h2>
            <p className="text-xs text-gray-600 max-w-xl font-light">
              Connect with Rajessh Paanday (9+ years experience) or Kusum Panday (7+ years experience) for an in-depth 1-on-1 video consultation.
            </p>
          </div>
          <Link href="/appointments">
            <GoldButton variant="filled" className="px-6 py-3 text-sm font-bold whitespace-nowrap">
              Book Expert Session
            </GoldButton>
          </Link>
        </div>

      </div>
    </div>
  );
}
