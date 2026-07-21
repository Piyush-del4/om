// Force reload 2
import React from 'react';
import Link from 'next/link';
import numerologyData from '../../../data/numerology-2026.json';
import { GoldCard } from '../../../components/ui/GoldCard';
import { FormattedText } from '../../../components/ui/FormattedText';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

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
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-[var(--gold)] mb-4">Prediction Not Found</h1>
          <Link href="/free-tools/numerology-calculator" className="text-gray-400 hover:text-white underline">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 radial-mesh-bg sacred-geometry-bg">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <Link href="/free-tools/numerology-calculator" className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-200)] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Numerology Calculator
        </Link>
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            <span className="gold-gradient-text">{data.title}</span>
          </h1>
        </div>

        <GoldCard theme="dark" className="p-8 md:p-12 border border-[var(--gold)]/30">
          <div className="mb-8 rounded-2xl overflow-hidden border border-[var(--gold)]/20 shadow-[0_0_30px_rgba(204,143,51,0.15)] flex justify-center bg-black/50 p-10">
            {/* The AI image will be rendered here */}
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
      </div>
    </div>
  );
}
