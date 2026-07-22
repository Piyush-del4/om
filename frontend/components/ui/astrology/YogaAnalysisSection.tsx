'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { detectYogas, YogaResult } from '@/lib/yogaDetector';

interface Props {
  data: any;
}

export function YogaAnalysisSection({ data }: Props) {
  /* Collapsible State (Preserved in comments for future activation):
  const [isOpen, setIsOpen] = useState(false);
  */

  if (!data || !data.output || !data.output[1]) return null;

  const yogas: YogaResult[] = detectYogas(data);
  const presentYogas = yogas.filter((y) => y.isPresent);

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
      {/* Title Header */}
      <div 
        /* onClick={() => setIsOpen(!isOpen)} */
        className="bg-amber-700 dark:bg-amber-800 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
      >
        <span className="text-xl">🔮</span>
        <h3 className="font-serif font-bold text-lg md:text-2xl">
          Major Planetary Yogas Analysis ({presentYogas.length} Active Yogas)
        </h3>
        {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
      </div>

      {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'}`}> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="space-y-4">
        {yogas.map((yoga) => {
          let categoryBadge = 'bg-emerald-200 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-300';
          if (yoga.category === 'Inauspicious') categoryBadge = 'bg-rose-200 text-rose-950 dark:bg-rose-950 dark:text-rose-300';
          if (yoga.category === 'Mixed') categoryBadge = 'bg-amber-200 text-amber-950 dark:bg-amber-950 dark:text-amber-300';

          return (
            <div
              key={yoga.id}
              className={`p-4 rounded-xl border transition-all ${
                yoga.isPresent
                  ? 'bg-white dark:bg-neutral-800 border-amber-300 dark:border-amber-700/60 shadow-sm'
                  : 'bg-gray-100/50 dark:bg-neutral-900/50 border-gray-200 dark:border-neutral-800 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 dark:border-neutral-700/50 pb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${yoga.isPresent ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                  <h4 className="font-serif font-bold text-base md:text-lg text-amber-950 dark:text-amber-300">
                    {yoga.name}
                  </h4>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold ${categoryBadge}`}>
                    {yoga.category}
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-full font-extrabold ${
                      yoga.isPresent
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-700 dark:bg-neutral-700 dark:text-gray-300'
                    }`}
                  >
                    {yoga.isPresent ? `Present (${yoga.strength} Strength)` : 'Not Present'}
                  </span>
                </div>
              </div>

              <div className="pt-3 space-y-2 text-xs md:text-sm">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  <strong className="text-amber-900 dark:text-amber-400">Effects: </strong>
                  {yoga.effects}
                </p>

                {yoga.isPresent && (
                  <p className="text-amber-800 dark:text-amber-300 text-xs bg-amber-50 dark:bg-neutral-900 p-2.5 rounded-lg border border-amber-200 dark:border-neutral-700">
                    <strong>Recommended Practice: </strong> {yoga.remedies}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
