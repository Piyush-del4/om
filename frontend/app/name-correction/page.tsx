'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, CheckCircle2, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { CategoryBookingWidget } from '@/components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '@/components/ui/CategoryBatchesList';

export default function NameCorrectionPage() {
  const steps = [
    {
      title: 'Analyze Core Numbers',
      desc: 'We calculate your Driver (Birth Date) and Conductor (Full Date of Birth) numbers, mapping them against your current name vibration.'
    },
    {
      title: 'Identify Harmony Gaps',
      desc: 'We pinpoint clashes between planetary rulers of your birth date and your name spelling, which cause delays and friction.'
    },
    {
      title: 'Vibrational Correction',
      desc: 'By adding, removing, or swapping letters, we realign the compound name number to a highly auspicious, harmonious frequency.'
    },
    {
      title: 'Somatic Implementation',
      desc: 'You practice writing the corrected name spelling regularly to sink the new vibration into your subconscious memory.'
    }
  ];

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-black overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Header Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-4 text-left"
          >
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 justify-start">
              <PenTool className="w-3.5 h-3.5" /> Numerology Name Correction
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Naam Sahi Toh <span className="gold-gradient-text">Kam Sahi</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-lg">
              Your name spelling carries a distinct sound vibration and mathematical frequency. When this frequency matches your birth chart, your path opens up with ease, recognition, and prosperity. If there is a clash, even your hardest efforts can result in delays, struggles, and missed opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
            <GoldCard flush theme="dark" className="border border-[var(--gold-200)] overflow-hidden">
              <div className="w-full h-64 md:h-72 bg-neutral-900 overflow-hidden relative">
                <img 
                  src="/images/step_realign_realistic.png" 
                  alt="Name Correction Alignment" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </GoldCard>
          </motion.div>
        </div>

        {/* Section: The Science of Sound & Numbers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex">
            <GoldCard theme="dark" className="w-full">
              <div className="space-y-4 flex flex-col justify-center h-full">
                <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--gold)] animate-pulse" /> The Resonance of Letters
                </h3>
                <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-light">
                  <p>
                    Every letter from A to Z possesses a specific numeric value based on Chaldean numerological principles. The sum total of these letters forms your <strong>Expression Number</strong> or <strong>Name Number</strong>.
                  </p>
                  <p>
                    A name spelling correction does not require changing your legal documents unless you wish to. Simply practicing the writing of the corrected spelling and adopting it in your digital profiles, signatures, and daily habits is enough to shift your subconscious energy patterns and manifest positive luck in career, business, relationships, and health.
                  </p>
                </div>
              </div>
            </GoldCard>
          </div>
          <div className="lg:col-span-5 flex">
            <GoldCard theme="dark" className="w-full p-6 space-y-4">
              <h4 className="font-serif text-lg font-bold text-white">Signs You Need a Name Spelling Check</h4>
              <ul className="space-y-3 text-xs text-gray-400 font-light">
                <li className="flex gap-2 items-start">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Unexplainable delays in business growth or promotion despite hard work.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Frequent misunderstandings in professional or personal relationships.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Feeling that your efforts are never fully recognized or rewarded.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Consistent obstacles popping up at the very last moment of deal closure.</span>
                </li>
              </ul>
            </GoldCard>
          </div>
        </div>

        {/* Section: The Process */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3 text-left">
            Our Alignment Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <GoldCard key={idx} className="transition-spring">
                <div className="space-y-3">
                  <span className="inline-block p-2 rounded-full bg-[var(--gold-50)] text-[var(--gold)] font-bold text-sm border border-[var(--gold-200)] w-8 h-8 flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-white">{step.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{step.desc}</p>
                </div>
              </GoldCard>
            ))}
          </div>
        </div>

        {/* Batches & Booking Section */}
        <div className="border-t border-neutral-800/60 pt-16">
          <CategoryBatchesList category="Numerology" />
        </div>

        <div className="border-t border-neutral-800/60 pt-16 pb-8">
          <CategoryBookingWidget category="Numerology" />
        </div>

      </div>
    </div>
  );
}
