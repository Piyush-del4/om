// Force reload 2
import React from 'react';
import Link from 'next/link';
import numerologyData from '../../../data/numerology-2026.json';
import { GoldCard } from '../../../components/ui/GoldCard';
import { FormattedText } from '../../../components/ui/FormattedText';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export async function generateStaticParams() {
  return Object.keys(numerologyData).map((number) => ({
    number: number,
  }));
}

export default async function NumerologyPredictionPage({ params }: { params: Promise<{ number: string }> }) {
  const resolvedParams = await params;
  const number = resolvedParams.number;
  const data = (numerologyData as any)[number];

  if (!data) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-[var(--gold)] mb-4">Prediction Not Found</h1>
          <Link href="/free-tools/numerology-calculator" className="text-gray-600 hover:text-gray-900 underline">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 py-24 px-4 radial-mesh-bg sacred-geometry-bg">
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex justify-between items-center pb-2">
          <Link href="/free-tools/numerology-calculator" className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-200)] transition-colors text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to Numerology Calculator
          </Link>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-bold">
            Numerology 2026 Predictions
          </span>
        </div>

        {/* Numerology Number Selector Bar (Top) */}
        <div className="bg-gradient-to-r from-amber-900/90 via-amber-950 to-amber-900/90 p-6 rounded-2xl border-2 border-amber-500/40 shadow-xl space-y-4">
          <h3 className="text-center font-serif text-amber-200 text-sm md:text-base font-bold tracking-wider uppercase">
            Select Root Number (1-9) to View 2026 Prediction
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {NUMBERS.map((num) => {
              const isActive = num.toString() === number;
              return (
                <Link
                  key={num}
                  href={`/numerology-2026/${num}`}
                  className="group flex flex-col items-center gap-1.5 transition-all duration-300"
                >
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-[#1a1c29] to-[#0a0a0f] border-2 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] overflow-hidden relative transition-all duration-300 ${
                    isActive
                      ? 'border-amber-400 ring-4 ring-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-110'
                      : 'border-[#D4AF37]/40 group-hover:border-[#D4AF37] group-hover:scale-105'
                  }`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,165,32,0.3)_0%,transparent_70%)]"></div>
                    <span className="relative z-10 text-xl md:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C3] via-[#FFD700] to-[#D4AF37] drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">
                      {num}
                    </span>
                  </div>
                  <span className={`text-xs font-bold transition-colors ${
                    isActive ? 'text-amber-300 underline underline-offset-4' : 'text-amber-100/80 group-hover:text-amber-200'
                  }`}>
                    Number {num}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Prediction Title */}
        <div className="text-center space-y-4 pt-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            <span className="gold-gradient-text">{data.title}</span>
          </h1>
        </div>

        {/* Main Content Card */}
        <GoldCard className="p-8 md:p-12 border border-[var(--gold)]/30">
          <div className="mb-8 rounded-2xl overflow-hidden border border-[var(--gold)]/20 shadow-[0_0_30px_rgba(204,143,51,0.15)] flex justify-center bg-white/50 p-10">
            <Image 
              src={`/images/numerology/number-${number}.png`} 
              alt={`Numerology Number ${number}`}
              width={200}
              height={200}
              className="object-contain hover:scale-110 transition-transform duration-500"
            />
          </div>
          <FormattedText text={data.content} />
        </GoldCard>

        {/* Bottom Number Selector Bar */}
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-md space-y-4 text-center">
          <h4 className="font-serif font-bold text-gray-900 text-base">Explore Other Numerology 2026 Root Numbers</h4>
          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
            {NUMBERS.map((num) => {
              const isActive = num.toString() === number;
              return (
                <Link
                  key={`bottom-${num}`}
                  href={`/numerology-2026/${num}`}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isActive
                      ? 'bg-amber-500 text-black border-amber-600 shadow-md font-extrabold'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-amber-50 hover:border-amber-300'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-black text-amber-300 font-bold flex items-center justify-center text-[11px]">
                    {num}
                  </span>
                  Number {num}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
