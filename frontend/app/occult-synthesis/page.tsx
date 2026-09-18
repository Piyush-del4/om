import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Sparkles, ArrowRight, BookOpen, Layers, PenTool, Hash, Heart, Shield, Star, Compass } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { SEOInternalMesh } from '../../components/seo/SEOInternalMesh';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';

export const metadata: Metadata = {
  title: 'Occult Synthesis Guides — Astrology, Numerology, Graphology & Tarot Intersections',
  description: 'Explore deep cross-domain guides integrating Vedic Astrology, Chaldean Numerology, Graphology Signature Science, and Tarot Cards for 360-degree spiritual clarity.',
};

const SYNTHESIS_CARDS = [
  {
    slug: 'astrology-numerology-compatibility',
    title: 'Astrology & Numerology Marriage Compatibility',
    category: 'Astrology + Numerology',
    desc: 'Combining Kundli Ashtakoot Guna Milan with Life Path Number Harmonization for lasting marital peace.',
    icon: Heart,
    color: 'from-amber-500/20 to-rose-500/10'
  },
  {
    slug: 'signature-science-and-astrology-remedies',
    title: 'Graphology & Astrology Signature Remedies',
    desc: 'Using Signature Slants & Strokes to activate 10th House Career Planets and build financial authority.',
    icon: PenTool,
    color: 'from-blue-500/20 to-indigo-500/10'
  },
  {
    slug: 'tarot-and-zodiac-astrology-cards',
    title: 'Tarot Arcana & Zodiac Signs Alignment',
    desc: 'Matching the 22 Major Arcana cards with the 12 Zodiac signs and classical ruling planets.',
    icon: Layers,
    color: 'from-purple-500/20 to-pink-500/10'
  },
  {
    slug: 'name-numerology-and-signature-correction',
    title: 'Name Numerology & Signature Correction Synergy',
    desc: 'Aligning Chaldean Name Math totals with subconscious handwriting strokes for maximum success.',
    icon: Hash,
    color: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    slug: 'planetary-elements-and-handwriting-pressure',
    title: 'FEAN 5-Element Concentration in Handwriting',
    desc: 'Measuring Water, Fire, Soft Wood, Metal, and Earth in handwriting pressure & Lo Shu Grid birth charts.',
    icon: Sparkles,
    color: 'from-yellow-500/20 to-amber-500/10'
  },
  {
    slug: 'tarot-and-life-path-numerology',
    title: 'Tarot Cards & Life Path Numerology Matrix',
    desc: 'Connecting Life Path numbers 1 through 33 to their corresponding soul Tarot Major Arcana cards.',
    icon: Compass,
    color: 'from-sky-500/20 to-cyan-500/10'
  },
  {
    slug: 'kundli-doshas-and-tarot-remedies',
    title: 'Vedic Kundli Doshas & Tarot Self-Reflection',
    desc: 'Overcoming Manglik Dosha, Rahu-Ketu Kaal Sarp, and Sade Sati with combined Vedic & Tarot guidance.',
    icon: Shield,
    color: 'from-orange-500/20 to-amber-500/10'
  },
  {
    slug: 'corporate-numerology-and-brand-graphology',
    title: 'Corporate Brand Numerology & Logo Graphotherapy',
    desc: 'Designing high-vibration business titles, launch dates, and executive signatures for enterprise growth.',
    icon: Star,
    color: 'from-violet-500/20 to-purple-500/10'
  }
];

export default function OccultSynthesisHubPage() {
  return (
    <div className="relative min-h-screen bg-[#F7F3EA] overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-[#1D1C1A]">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#A78652] bg-[#FAF7F2] px-4 py-1.5 rounded-full border border-[#E7E0D4]">
            Cross-Domain Occult Mastery
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1D1C1A] leading-tight">
            Intersecting Guides: Astrology, Numerology, Graphology & Tarot
          </h1>
          <p className="text-sm sm:text-base text-[#77736D] font-light leading-relaxed">
            True occult wisdom is never isolated. Explore our synthesis guides combining Vedic Kundli, Chaldean Numerology, Graphology Signature Science, and Tarot Cards to unlock complete life guidance.
          </p>
        </div>

        {/* 8 Synthesis Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {SYNTHESIS_CARDS.map((card) => {
            const IconComp = card.icon;
            return (
              <Link key={card.slug} href={`/occult-synthesis/${card.slug}`}>
                <GoldCard className="h-full bg-white border border-[#E7E0D4] hover:border-[#A78652] transition-all duration-300 group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D4] text-[#6F2935] group-hover:scale-105 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A78652] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E7E0D4]">
                        {card.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#1D1C1A] group-hover:text-[#6F2935] transition-colors flex items-center justify-between">
                        <span>{card.title}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#6F2935]" />
                      </h3>
                      <p className="text-xs text-[#77736D] font-light leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </GoldCard>
              </Link>
            );
          })}
        </div>

        {/* Consultation CTA Widget */}
        <div className="pt-8">
          <CategoryBookingWidget category="Astrology" />
        </div>

        {/* SEO Internal Mesh */}
        <SEOInternalMesh currentCategory="astrology" />

      </div>
    </div>
  );
}
