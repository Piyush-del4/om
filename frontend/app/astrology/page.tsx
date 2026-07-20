'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, HelpCircle, Info, Loader2 } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '../../components/ui/CategoryBatchesList';
import { AstrologyHeroBackground } from '../../components/ui/AstrologyHeroBackground';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';

interface House { _id: string; num: string; name: string; desc: string; }
interface Graha { _id: string; name: string; sign: string; desc: string; }
interface FAQ { _id: string; q: string; a: string; }

export default function AstrologyPage() {
  const { data: houses = [], isLoading: loadingHouses } = useQuery<House[]>({
    queryKey: ['astrology-houses'],
    queryFn: async () => (await client.get('/content/astrology/houses')).data?.data ?? [],
    staleTime: 1000 * 60 * 30,
  });

  const { data: grahas = [], isLoading: loadingGrahas } = useQuery<Graha[]>({
    queryKey: ['astrology-grahas'],
    queryFn: async () => (await client.get('/content/astrology/grahas')).data?.data ?? [],
    staleTime: 1000 * 60 * 30,
  });

  const { data: FAQs = [], isLoading: loadingFAQs } = useQuery<FAQ[]>({
    queryKey: ['astrology-faqs'],
    queryFn: async () => (await client.get('/content/astrology/faqs?category=Astrology')).data?.data ?? [],
    staleTime: 1000 * 60 * 30,
  });

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-black overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-white">
      {/* Astrological Meridian Star Background */}
      <AstrologyHeroBackground />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto pt-8"
        >
          <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-[var(--gold)] animate-pulse" /> Vedanga Astrology Consultation
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Map Your Destiny With the <span className="gold-gradient-text">Stars</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Vedic Astrology (Jyotish) is an ancient Indian science. By studying where the planets were when you were born, we can understand your life path, personality, strengths, and the best timing for important decisions.
          </p>
        </motion.div>

        {/* Section: The Science of Vedic Astrology */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex">
            <GoldCard theme="dark" className="border border-[var(--gold-200)] p-8 space-y-4 flex flex-col justify-center h-full w-full">
              <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
                <Info className="w-5 h-5" /> The Sidereal vs. Tropical Zodiac
              </h3>
              <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
                <p>
                Western Astrology uses the Tropical zodiac (based on seasons), while Vedic Astrology uses the Sidereal zodiac (based on actual star positions in the sky). This is why your Vedic zodiac sign may be different from your Western sun sign. Vedic astrology is much more accurate for predicting life events and timings.
              </p>
              <p>
                We use this sidereal system along with the Vimshottari Dasha (planetary period cycle) to give you very precise timelines for when important changes will happen in your career, relationships, and health.
              </p>
              </div>
            </GoldCard>
          </div>
          <div className="lg:col-span-5 flex relative group">
            <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
            <GoldCard flush theme="dark" className="border border-[var(--gold-200)] flex-1 overflow-hidden min-h-[240px]">
              <img src="/images/astrology_zodiac_realistic.png" alt="Vedic Zodiac" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </GoldCard>
          </div>
        </motion.div>



        {/* Section: The 12 Houses of Destiny */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
              The 12 Houses (Bhavas) of Your Chart
            </h2>
            <p className="text-gray-400 text-xs">
              Every birth chart is divided into 12 segments representing different aspects of your life journey.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loadingHouses ? (
              <div className="col-span-4 flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-[var(--gold)]" /></div>
            ) : houses.map((house) => (
              <GoldCard key={house._id ?? house.num} className="border border-neutral-800/60 p-4">
                <span className="text-[var(--gold)] font-mono font-bold text-xs">{house.num} House</span>
                <h4 className="text-white text-xs font-bold font-serif mt-1">{house.name}</h4>
                <p className="text-[10px] text-gray-400 leading-normal mt-1">{house.desc}</p>
              </GoldCard>
            ))}
          </div>
        </motion.div>

        {/* Section: The Nakshatras & Vimshottari Dasha */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <GoldCard theme="dark" className="border border-[var(--gold-100)] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[var(--gold)]">The 27 Nakshatras (Lunar Mansions)</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                While Sun signs split the zodiac into 12 parts, Moon Nakshatras divide the sky into 27 equal divisions. Representing the lunar pathway, Nakshatras reveal your mind's true architecture, subconscious drives, and karmic behaviors.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2 bg-black/40 border border-neutral-800 rounded">
                  <span className="text-[10px] text-[var(--gold)] block font-mono">Ashwini (Ketu)</span>
                  <p className="text-[9px] text-gray-400">Initiative, healing speed, energetic pioneer.</p>
                </div>
                <div className="p-2 bg-black/40 border border-neutral-800 rounded">
                  <span className="text-[10px] text-[var(--gold)] block font-mono">Rohini (Moon)</span>
                  <p className="text-[9px] text-gray-400">Creativity, beauty, growth, magnetism.</p>
                </div>
                <div className="p-2 bg-black/40 border border-neutral-800 rounded">
                  <span className="text-[10px] text-[var(--gold)] block font-mono">Magha (Ketu)</span>
                  <p className="text-[9px] text-gray-400">Ancestral power, leadership, duty.</p>
                </div>
                <div className="p-2 bg-black/40 border border-neutral-800 rounded">
                  <span className="text-[10px] text-[var(--gold)] block font-mono">Revati (Mercury)</span>
                  <p className="text-[9px] text-gray-400">Empathy, travel, spiritual completion.</p>
                </div>
              </div>
            </div>
          </GoldCard>

          <GoldCard theme="dark" className="border border-[var(--gold-100)] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[var(--gold)]">The Vimshottari Dasha System</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Vedic Astrology's crown jewel is the 120-year planetary cycle calendar. Calculated from your birth Moon nakshatra degree, it specifies when each planet will rule your life timeline (Mahadasha and Antardasha).
              </p>
              <div className="space-y-2 text-[11px] text-gray-400 pt-1">
                <p><strong>• Ketu Dasha (7 Years):</strong> Spiritual detachment and inner searching.</p>
                <p><strong>• Shukra Dasha (20 Years):</strong> Focus on relationships, arts, luxury, comfort.</p>
                <p><strong>• Surya Dasha (6 Years):</strong> Career leadership, fame, self-realization.</p>
                <p><strong>• Chandra Dasha (10 Years):</strong> Emotional fluctuations, domestic cycles, memory.</p>
              </div>
            </div>
          </GoldCard>
        </div>

        {/* Section: Planetary Roles */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
              The Planetary Forces (Grahas)
            </h2>
            <p className="text-gray-400 text-xs">
              Planets act as energetic forces that activate different fields of experience based on their placements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loadingGrahas ? (
              <div className="col-span-3 flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-[var(--gold)]" /></div>
            ) : grahas.map((g) => (
              <GoldCard key={g._id ?? g.name} className="border border-neutral-800/60 p-5">
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[var(--gold)] font-serif font-bold text-sm">{g.name}</h4>
                  <span className="text-[9px] bg-[var(--gold-50)] text-gray-350 px-2 py-0.5 rounded border border-[var(--gold-200)] whitespace-nowrap">{g.sign}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mt-2">{g.desc}</p>
              </GoldCard>
            ))}
          </div>
        </div>

        {/* Section: Yogas & Doshas */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
              Vedic Yogas (Fortunes) & Doshas (Afflictions)
            </h2>
            <p className="text-gray-400 text-xs">
              Planetary alignments create mathematical Yogas (fortunes) and Doshas (frictional blocks) in your birth chart.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GoldCard className="border border-neutral-800/60 p-6">
              <h4 className="text-[var(--gold)] font-serif font-bold text-base mb-4">Key Auspicious Yogas</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-white text-xs font-bold font-mono">Raj Yoga (King's Alignment)</span>
                  <p className="text-[11px] text-gray-405">Formed by conjuncts/aspects between house rulers of quadrants (Kendra) and trines (Trikona). Grants status, leadership, and public influence.</p>
                </div>
                <div>
                  <span className="text-white text-xs font-bold font-mono">Gajakesari Yoga (Elephant-Lion Force)</span>
                  <p className="text-[11px] text-gray-455">Jupiter placed in Kendra (1st, 4th, 7th, 10th house) from Moon. Grants wisdom, long-lasting reputation, wealth, and spiritual growth.</p>
                </div>
                <div>
                  <span className="text-white text-xs font-bold font-mono">Dhana Yoga (Wealth Magnet)</span>
                  <p className="text-[11px] text-gray-455">Connections between wealth houses (2nd and 11th) and trines. Indicates financial abundance, smooth business cash flows, and resource gain.</p>
                </div>
              </div>
            </GoldCard>

            <GoldCard className="border border-neutral-800/60 p-6">
              <h4 className="text-[var(--gold)] font-serif font-bold text-base mb-4">Key Frictional Doshas</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-white text-xs font-bold font-mono">Manglik Dosha (Mars Affliction)</span>
                  <p className="text-[11px] text-gray-405">Mars placed in 1st, 2nd, 4th, 7th, 8th, or 12th house. Indicates marital delays, emotional friction, and intense relationship arguments if unaligned.</p>
                </div>
                <div>
                  <span className="text-white text-xs font-bold font-mono">Shani Sade Sati (Saturn's 7.5 Year Transit)</span>
                  <p className="text-[11px] text-gray-405">Saturn transiting 12th, 1st, and 2nd houses from natal Moon. A major period of discipline, delays, financial restructuring, and karmic learning.</p>
                </div>
                <div>
                  <span className="text-white text-xs font-bold font-mono">Kaal Sarp Dosha (Karmic Axis Lock)</span>
                  <p className="text-[11px] text-gray-405">All planets hemmed between Rahu (North Node) and Ketu (South Node). Indicates sudden highs and lows, intense life struggles, but massive potential achievements.</p>
                </div>
              </div>
            </GoldCard>
          </div>
        </div>

        {/* Section: Practical Vedic Remedies */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
              Practical Vedic Remedies (Upayas)
            </h2>
            <p className="text-gray-400 text-xs">
              Remedies do not change your fate, but they act as shock absorbers to balance planetary electromagnetic imbalances.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <GoldCard className="border border-neutral-800/60 p-4">
              <h4 className="text-[var(--gold)] font-serif font-bold text-sm">Mantras & Sound</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed mt-2">
                Repeating specific Sanskrit phoneme frequencies matches the vibrational wavelength of afflicted planets, calming the mental chatter and retraining endocrine responses.
              </p>
            </GoldCard>
            <GoldCard className="border border-neutral-800/60 p-4">
              <h4 className="text-[var(--gold)] font-serif font-bold text-sm">Gemstones</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed mt-2">
                Natural untreated gems act as prisms. Worn against the skin, they filter natural light frequencies, feeding specific trace minerals and light waves back into the human aura.
              </p>
            </GoldCard>
            <GoldCard className="border border-neutral-800/60 p-4">
              <h4 className="text-[var(--gold)] font-serif font-bold text-sm">Seva (Charity)</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed mt-2">
                Saturn blocks are cleared by helping elderly and underprivileged people. Cleaning surroundings or donating grains acts directly to reduce natal karmic debt (Rina).
              </p>
            </GoldCard>
            <GoldCard className="border border-neutral-800/60 p-4">
              <h4 className="text-[var(--gold)] font-serif font-bold text-sm">Fasting & Lifestyle</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed mt-2">
                Fasting on specific days of planetary lords (e.g. Saturday for Saturn, Tuesday for Mars) cleanses digestive toxins and builds discipline, neutralizing impulsive habits.
              </p>
            </GoldCard>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[var(--gold)]" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {loadingFAQs ? (
              <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-[var(--gold)]" /></div>
            ) : FAQs.map((faq) => (
              <div key={faq._id} className="border-l-2 border-[var(--gold)] pl-4 py-2 space-y-1">
                <h4 className="text-white text-base font-bold">{faq.q}</h4>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Batches Showcase */}
        <div className="border-t border-neutral-800/60 pt-16">
          <CategoryBatchesList category="Astrology" />
        </div>

        {/* Booking Consultation Widget */}
        <div className="border-t border-neutral-800/60 pt-16 pb-8">
          <CategoryBookingWidget category="Astrology" />
        </div>
      </div>
    </div>
  );
}
