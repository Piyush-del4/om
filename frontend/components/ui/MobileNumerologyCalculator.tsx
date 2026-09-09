'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Sparkles, AlertTriangle, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { GoldCard } from './GoldCard';
import { GoldButton } from './GoldButton';
import Link from 'next/link';

export function MobileNumerologyCalculator() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const cleaned = mobileNumber.replace(/[^0-9]/g, '');

  const calculateNumber = () => {
    if (cleaned.length !== 10) return null;

    const digits = cleaned.split('').map(Number);
    const sum = digits.reduce((acc, curr) => acc + curr, 0);

    let singleDigit = sum;
    while (singleDigit > 9) {
      singleDigit = singleDigit.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }

    // Check for negative pair combinations
    const stringNum = cleaned;
    const warnings: string[] = [];
    if (stringNum.includes('48') || stringNum.includes('84')) {
      warnings.push('Contains 4-8 or 8-4 sequence (indicates sudden hurdles or delays).');
    }
    if (stringNum.includes('27') || stringNum.includes('72')) {
      warnings.push('Contains 2-7 or 7-2 sequence (emotional sensitivity & overthinking).');
    }
    if (stringNum.includes('999')) {
      warnings.push('Contains 999 sequence (excessive aggression or impulsive friction).');
    }
    if (singleDigit === 4 || singleDigit === 8) {
      warnings.push(`Total reduces to ${singleDigit} (associated with hard struggle or unexpected changes).`);
    }

    const meanings: Record<number, { title: string; desc: string; bestFor: string }> = {
      1: { title: 'Total 1 — The Leader & Monopoly', desc: 'Commands respect, authority, and public recognition.', bestFor: 'Founders, CEOs, Politicians, Business Owners' },
      2: { title: 'Total 2 — The Emotional Diplomat', desc: 'Encourages sensitivity, creative ideas, and collaboration.', bestFor: 'Counselors, Artists, HR Professionals' },
      3: { title: 'Total 3 — The Knowledge & Advisor', desc: 'Promotes teaching, wisdom, enthusiasm, and public speaking.', bestFor: 'Teachers, Consultants, Lawyers, Authors' },
      4: { title: 'Total 4 — The Practical Strategist', desc: 'Brings sudden changes and continuous work demand.', bestFor: 'Requires precise birth chart matching' },
      5: { title: 'Total 5 — The Fast Commercial Magnet', desc: 'Accelerates business deals, communication, and expansion.', bestFor: 'Sales, E-commerce, Media, Traders' },
      6: { title: 'Total 6 — Luxury & Harmony', desc: 'Attracts luxury, comfort, artistic success, and goodwill.', bestFor: 'Hospitality, Fashion, Designers, Celebrities' },
      7: { title: 'Total 7 — The Intuitive Researcher', desc: 'Deepens analytical focus, spirituality, and research.', bestFor: 'Data Scientists, Researchers, Mystics' },
      8: { title: 'Total 8 — The Executive Hard Worker', desc: 'Brings heavy responsibilities, patience, and karmic tests.', bestFor: 'Requires expert consultation before adoption' },
      9: { title: 'Total 9 — The Courageous Pioneer', desc: 'Generates high energy, courage, and protective drive.', bestFor: 'Defense, Real Estate, Surgeons, Sports' },
    };

    return {
      cleaned,
      digits,
      compoundSum: sum,
      singleDigit,
      warnings,
      meaning: meanings[singleDigit],
    };
  };

  const result = analyzed ? calculateNumber() : null;

  return (
    <GoldCard className="p-6 md:p-8 border border-[var(--gold-200)] shadow-xl relative overflow-hidden">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--gold-50)] text-[var(--gold-dark)] border border-[var(--gold-200)]">
            <Phone className="w-3.5 h-3.5" /> Instant Free Mobile Calculator
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-gray-900">
            Check Your Mobile Number Vibration
          </h3>
          <p className="text-xs text-gray-600 font-light max-w-xl mx-auto">
            Type your 10-digit mobile number to calculate its compound sum, single-digit frequency, and potential anti-pair warnings instantly.
          </p>
        </div>

        {/* Form Input */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (cleaned.length === 10) setAnalyzed(true);
          }}
          className="max-w-md mx-auto space-y-4"
        >
          <div className="relative">
            <input 
              type="tel"
              maxLength={10}
              placeholder="Enter 10-digit Mobile Number (e.g. 9876543210)"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                setAnalyzed(false);
              }}
              className="w-full bg-gray-50 border border-[var(--gold-200)] rounded-xl py-3.5 px-4 text-center text-lg font-bold text-gray-900 font-mono focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] shadow-inner"
            />
          </div>

          <GoldButton 
            type="submit" 
            variant="filled" 
            className="w-full py-3 text-sm font-bold flex items-center justify-center gap-2"
            disabled={cleaned.length !== 10}
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Analyze Mobile Vibration</span>
          </GoldButton>
        </form>

        {/* Results */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 to-white border border-[var(--gold-200)] space-y-6"
          >
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block">Compound Sum</span>
                <span className="text-2xl font-bold font-serif text-gray-900">{result.compoundSum}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block">Single Digit Total</span>
                <span className="text-2xl font-bold font-serif text-[var(--gold-dark)]">{result.singleDigit}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm col-span-2 sm:col-span-1">
                <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block">Vibration Status</span>
                <span className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded inline-block mt-1 ${
                  result.warnings.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {result.warnings.length > 0 ? 'Friction Detected' : 'Harmonious Total'}
                </span>
              </div>
            </div>

            {/* Meaning Card */}
            {result.meaning && (
              <div className="space-y-2 p-4 bg-white rounded-xl border border-[var(--gold-100)] shadow-sm">
                <h4 className="font-serif font-bold text-base text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--gold-dark)]" />
                  {result.meaning.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-light">{result.meaning.desc}</p>
                <div className="pt-1">
                  <span className="text-[10px] uppercase font-bold text-[var(--gold-dark)] bg-[var(--gold-50)] px-2.5 py-1 rounded border border-[var(--gold-200)]">
                    Best Suits: {result.meaning.bestFor}
                  </span>
                </div>
              </div>
            )}

            {/* Warnings Section */}
            {result.warnings.length > 0 && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" /> Negative Sequences Identified
                </h4>
                <ul className="space-y-1 text-xs text-rose-700 font-light">
                  {result.warnings.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="font-bold">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Banner */}
            <div className="pt-2 text-center space-y-3 border-t border-[var(--gold-100)]">
              <p className="text-xs text-gray-700">
                <strong>Want to align your mobile number with your exact birth chart (Driver & Conductor)?</strong>
              </p>
              <Link href="/appointments" className="inline-block">
                <GoldButton variant="outlined" className="px-6 py-2.5 text-xs font-bold flex items-center gap-2 mx-auto">
                  <Shield className="w-4 h-4 text-[var(--gold-dark)]" />
                  <span>Book Personal Mobile Selection Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </GoldButton>
              </Link>
            </div>

          </motion.div>
        )}

      </div>
    </GoldCard>
  );
}
