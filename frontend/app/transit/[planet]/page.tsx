// Force reload
import React from 'react';
import Link from 'next/link';
import transitsData from '../../../data/transits.json';
import { GoldCard } from '../../../components/ui/GoldCard';
import { FormattedText } from '../../../components/ui/FormattedText';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const PLANETS = [
  { id: 'sun', name: 'Sun' },
  { id: 'moon', name: 'Moon' },
  { id: 'mars', name: 'Mars' },
  { id: 'mercury', name: 'Mercury' },
  { id: 'jupiter', name: 'Jupiter' },
  { id: 'venus', name: 'Venus' },
  { id: 'saturn', name: 'Saturn' },
  { id: 'rahu', name: 'Rahu' },
  { id: 'ketu', name: 'Ketu' },
];

export async function generateStaticParams() {
  return Object.keys(transitsData).map((planet) => ({
    planet: planet.toLowerCase(),
  }));
}

export default async function TransitPredictionPage({ params }: { params: Promise<{ planet: string }> }) {
  const resolvedParams = await params;
  const planet = resolvedParams.planet.toLowerCase();
  const data = (transitsData as any)[planet];

  if (!data) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-[var(--gold)] mb-4">Transit Not Found</h1>
          <Link href="/astrology" className="text-gray-600 hover:text-gray-900 underline">
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
          <Link href="/astrology" className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-200)] transition-colors text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to Astrology
          </Link>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-bold">
            2026 Planetary Transits
          </span>
        </div>

        {/* Planet Navigation Selector Bar (Icons + Direct Links) */}
        <div className="bg-gradient-to-r from-amber-900/90 via-amber-950 to-amber-900/90 p-6 rounded-2xl border-2 border-amber-500/40 shadow-xl space-y-4">
          <h3 className="text-center font-serif text-amber-200 text-sm md:text-base font-bold tracking-wider uppercase">
            Select Planet to View 2026 Transit Prediction
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {PLANETS.map((p) => {
              const isActive = p.id === planet;
              return (
                <Link
                  key={p.id}
                  href={`/transit/${p.id}`}
                  className="group flex flex-col items-center gap-1.5 transition-all duration-300"
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center p-1 transition-all duration-300 ${
                    isActive 
                      ? 'bg-amber-100 ring-4 ring-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-110' 
                      : 'bg-black/40 border border-amber-500/30 group-hover:border-amber-400 group-hover:scale-105 group-hover:bg-amber-950/60'
                  }`}>
                    <img
                      src={`/images/planets/${p.id}.png?v=5`}
                      alt={`${p.name} transit`}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <span className={`text-xs font-bold transition-colors ${
                    isActive ? 'text-amber-300 underline underline-offset-4' : 'text-amber-100/80 group-hover:text-amber-200'
                  }`}>
                    {p.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* Main Transit Title */}
        <div className="text-center space-y-4 pt-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            <span className="gold-gradient-text">{data.title}</span>
          </h1>
        </div>

        {/* Transit Content Card */}
        <GoldCard className="p-8 md:p-12 border border-[var(--gold)]/30">
          <div className="mb-8 rounded-2xl overflow-hidden border border-[var(--gold)]/20 shadow-[0_0_30px_rgba(204,143,51,0.15)] flex justify-center bg-white/50 p-10">
            <img 
              src={`/images/planets/${planet}.png?v=5`} 
              alt={`${planet} Planet`}
              className="w-[200px] h-[200px] object-contain hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(204,143,51,0.5)]"
            />
          </div>
          <FormattedText text={data.content} />
        </GoldCard>

        {/* Bottom Planet Selector Bar */}
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-md space-y-4 text-center">
          <h4 className="font-serif font-bold text-gray-900 text-base">Explore Other 2026 Planetary Transits</h4>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {PLANETS.map((p) => {
              const isActive = p.id === planet;
              return (
                <Link
                  key={`bottom-${p.id}`}
                  href={`/transit/${p.id}`}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isActive
                      ? 'bg-amber-500 text-black border-amber-600 shadow-md font-extrabold'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-amber-50 hover:border-amber-300'
                  }`}
                >
                  <img src={`/images/planets/${p.id}.png?v=5`} alt={p.name} className="w-5 h-5 object-contain" />
                  {p.name} Transit
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
