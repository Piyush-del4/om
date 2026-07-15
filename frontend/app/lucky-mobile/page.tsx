'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Star, HelpCircle, ShieldCheck, Hash, Info } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { AstrologyHeroBackground } from '../../components/ui/AstrologyHeroBackground';

export default function LuckyMobilePage() {
  const numberVibrations = [
    { num: 'Total 1', name: 'Leadership & Success', desc: 'Ideal for business owners, executives, entrepreneurs, and people seeking high authority and public influence.' },
    { num: 'Total 5', name: 'Trade & Communication', desc: 'Excellent for sales, marketing, merchants, media professionals, and anyone in public relations.' },
    { num: 'Total 6', name: 'Luxury & Creativity', desc: 'Perfect for artists, designers, luxury product merchants, hotel owners, and relationship coaches.' },
    { num: 'Total 9', name: 'Charity & Courage', desc: 'Best suited for defense officers, healers, NGOs, spiritual gurus, and medical practitioners.' },
  ];

  const combinationWarnings = [
    { combination: 'Combinations of 8 & 4', title: 'Struggle & Sudden Hurdles', desc: 'Having frequent 8-4 or 4-8 sequences in your mobile number can attract sudden financial blocks, legal problems, or structural delays.' },
    { combination: 'Repeated 2s & 7s', title: 'Emotional & Health Issues', desc: 'Too many 2s and 7s can make the user highly emotional, causing relationship anxieties or chronic stress.' },
    { combination: 'Aggressive 9s', title: 'Anger & Frictional Communication', desc: 'Repeated 9s (like 999) can increase short-temperedness, arguments, and accident risks.' },
  ];

  const FAQs = [
    { q: 'Why is a mobile number important in numerology?', a: 'Your mobile number is the most frequently vibrating digital identifier in your life today. It is constantly receiving electromagnetic sound waves and vibrations, which directly influence your thought patterns, customer calls, and financial flows.' },
    { q: 'How do you calculate the mobile number total?', a: 'You sum all 10 digits of your phone number. For example, if your number is 9876543210, the sum is 45. Add 4 + 5 to get a single digit of 9. We check both this total and the internal doublets (combinations).' },
    { q: 'Should my mobile total match my birth date?', a: 'Yes. The total and internal combinations must be compatible with your Driver Number (Mulank - day of birth) and Conductor Number (Bhagyank - total birth date sum) to avoid blocks.' },
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
            <PhoneCall className="w-3.5 h-3.5 text-[var(--gold)] animate-pulse" /> Digital Vibrations
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Lucky Mobile <span className="gold-gradient-text">Number Selection</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Your mobile number represents your personal frequency in the digital world. Choose a number that resonates with your birth date to attract business leads, health, harmony, and prosperity.
          </p>
        </motion.div>

        {/* Section: Science of Mobile Numerology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex">
            <GoldCard theme="dark" className="border border-[var(--gold-200)] p-8 space-y-4 flex flex-col justify-center h-full w-full">
              <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
                <Info className="w-5 h-5" /> The Power of Mobile Frequencies
              </h3>
              <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-light">
                <p>
                  Most people select mobile numbers based on simple repeating digits (e.g. 9999) thinking they are lucky. However, in mobile numerology, vanity numbers can sometimes bring massive challenges if the vibration conflicts with your birth chart.
                </p>
                <p>
                  We examine the starting combinations, ending digits, and the single-digit total of your 10-digit mobile number. We help you choose a number that acts as a digital magnet for opportunities rather than a source of continuous obstacles.
                </p>
              </div>
            </GoldCard>
          </div>
          <div className="lg:col-span-5 flex relative group">
            <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
            <GoldCard flush theme="dark" className="border border-[var(--gold-200)] flex-1 overflow-hidden min-h-[240px]">
              <img src="/images/mobile_numerology_realistic.png" alt="Mobile Numerology Frequency" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </GoldCard>
          </div>
        </div>

        {/* Section: Lucky Mobile Totals */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
              Power Totals & Their Meanings
            </h2>
            <p className="text-gray-400 text-xs">
              The overall sum of your mobile digits determines the primary energy frequency of your phone calls.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {numberVibrations.map((v) => (
              <GoldCard key={v.num} className="border border-neutral-800/60 p-4 space-y-2">
                <span className="text-[var(--gold)] font-mono font-bold text-xs">{v.num}</span>
                <h4 className="text-white text-sm font-bold font-serif">{v.name}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-light">{v.desc}</p>
              </GoldCard>
            ))}
          </div>
        </div>

        {/* Section: Combination Warnings */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
              Frictional Combinations to Avoid
            </h2>
            <p className="text-gray-400 text-xs">
              Certain doublets or sequences inside the number can cause negative mental blocks or career stagnation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {combinationWarnings.map((warning) => (
              <GoldCard key={warning.combination} className="border border-neutral-800/60 p-5 space-y-2">
                <h4 className="text-red-400 font-serif font-bold text-sm">{warning.combination}</h4>
                <span className="text-[10px] bg-red-950/40 text-red-300 px-2 py-0.5 rounded border border-red-900/30 font-mono uppercase inline-block">{warning.title}</span>
                <p className="text-xs text-gray-400 leading-relaxed font-light pt-1">{warning.desc}</p>
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
          <CategoryBookingWidget category="Numerology" serviceName="Lucky Mobile Number Consultation" />
        </div>
      </div>
    </div>
  );
}
