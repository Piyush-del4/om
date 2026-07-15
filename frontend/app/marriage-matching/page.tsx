'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, HelpCircle, ShieldCheck, HeartHandshake, Info } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { AstrologyHeroBackground } from '../../components/ui/AstrologyHeroBackground';

export default function MarriageMatchingPage() {
  const matchingKootas = [
    { num: 'Nadi (8 Points)', name: 'Health & Progeny compatibility', desc: 'The most important koota. Measures the biological and genetic compatibility to ensure healthy children and long-term physical health.' },
    { num: 'Bhakoot (7 Points)', name: 'Direct emotional bond', desc: 'Measures the relative planetary positions of the couple\'s Moon signs. Governs emotional compatibility and family wealth.' },
    { num: 'Gana (6 Points)', name: 'Temperament compatibility', desc: 'Classifies charts into Deva (Divine), Manushya (Human), or Rakshasa (Demon) temperaments to check behavior compatibility.' },
    { num: 'Maitri (5 Points)', name: 'Friendship & Planetary affinity', desc: 'Checks friendship levels between the Moon sign rulers of both charts. Governs daily conversations and mutual liking.' },
  ];

  const matchingFactors = [
    { title: 'Manglik Dosha Matching', importance: 'High Priority', desc: 'Aligning Mars positions in both charts is essential. A Manglik partner is matched with another Manglik to balance out emotional intensity and passion.' },
    { title: '7th House Strength', importance: 'Core Foundation', desc: 'We inspect the planetary placement, aspects, and lord of the 7th house (house of marriage) in both charts to check for stability.' },
    { title: 'D9 Navamsha Chart', importance: 'True Marriage Potential', desc: 'While D1 represents public life, the D9 Navamsha chart shows the true, internal compatibility and relationship outcome after marriage.' },
  ];

  const FAQs = [
    { q: 'Is 36 Guna matching enough for a happy marriage?', a: 'No. Guna matching is only about 10-15% of the story. A high guna score (like 30/36) can still lead to struggles if either partner has individual relationship afflictions (such as a highly afflicted 7th house lord, or bad planetary periods).' },
    { q: 'What is a good Guna compatibility score?', a: 'A score of 18 or above (out of 36) is considered acceptable for matchmaking, provided there are no major afflictions like Nadi Dosha or Bhakoot Dosha present.' },
    { q: 'What if we have Nadi Dosha in our compatibility?', a: 'Nadi Dosha can be canceled or mitigated by various factors (such as having the same Moon sign but different nakshatras, or ruling planet friendships). We analyze these cancellations during our sessions.' },
  ];

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-black overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-white">
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
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> Sacred Union
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Marriage <span className="gold-gradient-text">Matching (Melapak)</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Build a foundation of lifelong harmony. We analyze the 36 Gunas, Manglik Dosha, 7th house stability, and D9 charts of both partners to ensure mutual love, prosperity, and family happiness.
          </p>
        </motion.div>

        {/* Section: Concept of Kundali Matching */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex">
            <GoldCard theme="dark" className="border border-[var(--gold-200)] p-8 space-y-4 flex flex-col justify-center h-full w-full">
              <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
                <Info className="w-5 h-5" /> The Sacred Geometry of Compatibility
              </h3>
              <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-light">
                <p>
                  In traditional systems, marriage is not just a social contract, but an alignment of two karmic currents. If the subconscious wavelengths of two people conflict, the relationship is prone to emotional distance, communication gaps, or health blocks.
                </p>
                <p>
                  We look beyond the basic computer-generated Guna charts. We analyze individual longevity, family adjustment indicators, and current planetary transit cycles to ensure both partners are entering a supportive phase of life together.
                </p>
              </div>
            </GoldCard>
          </div>
          <div className="lg:col-span-5 flex relative group">
            <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
            <GoldCard flush theme="dark" className="border border-[var(--gold-200)] flex-1 overflow-hidden min-h-[240px]">
              <img src="/images/marriage_matching_realistic.png" alt="Kundali Matching" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </GoldCard>
          </div>
        </div>

        {/* Section: The Ashta Kootas */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
              Key Ashta Koota Parameters
            </h2>
            <p className="text-gray-400 text-xs">
              Traditional compatibility analysis evaluates 8 different aspects (Kootas) to rate total compatibility out of 36 points (Gunas).
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {matchingKootas.map((koota) => (
              <GoldCard key={koota.num} className="border border-neutral-800/60 p-4 space-y-2">
                <span className="text-[var(--gold)] font-mono font-bold text-xs">{koota.num}</span>
                <h4 className="text-white text-sm font-bold font-serif">{koota.name}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-light">{koota.desc}</p>
              </GoldCard>
            ))}
          </div>
        </div>

        {/* Section: Important Compatibility Factors */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
              Key Astrological Match Indicators
            </h2>
            <p className="text-gray-400 text-xs">
              Guna matching alone is incomplete; we also perform a deep-dive evaluation of these key areas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchingFactors.map((factor) => (
              <GoldCard key={factor.title} className="border border-neutral-800/60 p-5 space-y-2">
                <h4 className="text-[var(--gold)] font-serif font-bold text-sm">{factor.title}</h4>
                <span className="text-[10px] bg-[var(--gold-10)] text-[var(--gold)] px-2 py-0.5 rounded border border-[var(--gold-200)] font-mono uppercase inline-block">{factor.importance}</span>
                <p className="text-xs text-gray-400 leading-relaxed font-light pt-1">{factor.desc}</p>
              </GoldCard>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[var(--gold)]" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQs.map((faq, idx) => (
              <div key={idx} className="border-l-2 border-[var(--gold)] pl-4 py-2 space-y-1">
                <h4 className="text-white text-base font-bold">{faq.q}</h4>
                <p className="text-gray-400 text-sm font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Booking Widget */}
        <div className="border-t border-neutral-800/60 pt-16 pb-8">
          <CategoryBookingWidget category="Astrology" serviceName="Marriage Matching Consultation" />
        </div>
      </div>
    </div>
  );
}
