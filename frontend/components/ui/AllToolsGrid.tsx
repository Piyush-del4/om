import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Compass, 
  Grid, 
  Calendar, 
  Heart, 
  Moon, 
  Sun, 
  Star, 
  Hash, 
  Palette, 
  Clock, 
  FileText,
  Layers,
  ArrowRight
} from 'lucide-react';

const ALL_TOOLS = [
  {
    name: 'Kundli Generator',
    description: 'Generate your free North Indian Janam Kundli chart with planetary degrees.',
    href: '/free-tools/kundli-generator',
    icon: Compass,
    badge: 'Popular'
  },
  {
    name: 'Lo Shu & Numerology',
    description: 'Calculate your Mulank, Bhagyank, Namank & 3x3 Lo Shu Grid.',
    href: '/free-tools/numerology-calculator',
    icon: Grid,
    badge: 'Trending'
  },
  {
    name: 'Vimshottari Dasha',
    description: 'Interactive 3-level Mahadasha, Antardasha & Pratyantardasha timeline.',
    href: '/free-tools/dasha-calculator',
    icon: Clock,
    badge: 'Detailed'
  },
  {
    name: 'Marriage Compatibility',
    description: 'Check 36 Gun Milan & Kundli Matching for relationship harmony.',
    href: '/free-tools/marriage-compatibility-checker',
    icon: Heart,
    badge: 'Love'
  },
  {
    name: 'Lagna / Ascendant Finder',
    description: 'Calculate your exact Ascendant (Lagna) sign & 1st house lord.',
    href: '/free-tools/ascendant-calculator',
    icon: Sun,
    badge: 'Astrology'
  },
  {
    name: 'Rashi / Moon Sign Finder',
    description: 'Discover your authentic Vedic Moon Sign (Chandra Rashi).',
    href: '/free-tools/moon-sign-calculator',
    icon: Moon,
    badge: 'Vedic'
  },
  {
    name: 'Nakshatra Finder',
    description: 'Find your birth Star (Janma Nakshatra) & Pada position.',
    href: '/free-tools/nakshatra-finder',
    icon: Star,
    badge: 'Cosmic'
  },
  {
    name: 'Daily Panchang',
    description: 'Live Tithi, Nakshatra, Yoga, Karana & Rahu Kaal timings.',
    href: '/free-tools/panchang',
    icon: Calendar,
    badge: 'Daily'
  },
  {
    name: 'Shubh Muhurat',
    description: 'Find auspicious timings for marriage, business & housewarming.',
    href: '/free-tools/muhurat-calculator',
    icon: Sparkles,
    badge: 'Auspicious'
  },
  {
    name: 'Name Numerology (Namank)',
    description: 'Decode your Chaldean Name Expression & Destiny number.',
    href: '/free-tools/name-numerology-calculator',
    icon: FileText,
    badge: 'Numerology'
  },
  {
    name: 'Lucky Number Calculator',
    description: 'Find your personal lucky numbers for prosperity & success.',
    href: '/free-tools/lucky-number-calculator',
    icon: Hash,
    badge: 'Luck'
  },
  {
    name: 'Lucky Color Calculator',
    description: 'Discover harmonious colors tuned to your planetary ruler.',
    href: '/free-tools/lucky-color-calculator',
    icon: Palette,
    badge: 'Vibe'
  },
  {
    name: 'Daily Horoscope',
    description: 'Read accurate daily predictions for all 12 Zodiac signs.',
    href: '/free-tools/daily-horoscope',
    icon: Sun,
    badge: 'Daily'
  },
  {
    name: 'Zodiac Sign Finder',
    description: 'Determine your western Sun Sign & element traits.',
    href: '/free-tools/zodiac-sign-finder',
    icon: Sparkles,
    badge: 'Zodiac'
  }
];

export function AllToolsGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto my-16 space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" /> Comprehensive Suite
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
          Explore All Free <span className="gold-gradient-text">Astrology & Numerology</span> Tools
        </h2>
        <p className="text-sm text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto">
          Access our full suite of free Vedic calculation tools to decode your Kundli, Dasha timelines, Lo Shu Grid, Nakshatras, and relationship compatibility.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ALL_TOOLS.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <Link key={idx} href={tool.href}>
              <div className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-[var(--gold)]/60 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full hover:-translate-y-1">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-white group-hover:text-[var(--gold)] transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-gray-400 leading-relaxed font-light">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center text-xs font-semibold text-[var(--gold)] gap-1 group-hover:translate-x-1 transition-transform">
                  Access Tool <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
