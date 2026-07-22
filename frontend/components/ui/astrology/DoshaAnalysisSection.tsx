'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { detectDoshas, DoshaResult } from '@/lib/doshaDetector';

interface Props {
  data: any;
}

export function DoshaAnalysisSection({ data }: Props) {
  /* Collapsible State (Preserved in comments for future activation):
  const [isOpen, setIsOpen] = useState(false);
  */

  if (!data || !data.output || !data.output[1]) return null;

  const doshas: DoshaResult[] = detectDoshas(data);
  const activeDoshas = doshas.filter((d) => d.isPresent);

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
      {/* Title Header */}
      <div 
        /* onClick={() => setIsOpen(!isOpen)} */
        className="bg-rose-800 dark:bg-rose-900 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
      >
        <span className="text-xl">🛡️</span>
        <h3 className="font-serif font-bold text-lg md:text-2xl">
          Automatic Dosha Detection & Remedies ({activeDoshas.length} Active Doshas)
        </h3>
        {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
      </div>

      {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'}`}> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doshas.map((dosha) => {
          let sevColor = 'bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-gray-300';
          if (dosha.severity === 'Severe') sevColor = 'bg-rose-500 text-white font-extrabold';
          if (dosha.severity === 'Moderate') sevColor = 'bg-orange-400 text-black font-bold';
          if (dosha.severity === 'Mild') sevColor = 'bg-amber-300 text-amber-950 font-bold';

          return (
            <div
              key={dosha.name}
              className={`p-5 rounded-xl border space-y-3 shadow-sm ${
                dosha.isPresent
                  ? 'bg-white dark:bg-neutral-800 border-rose-300 dark:border-rose-900'
                  : 'bg-white/60 dark:bg-neutral-800/50 border-gray-200 dark:border-neutral-700 opacity-80'
              }`}
            >
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-neutral-700 pb-2">
                <h4 className="font-serif font-bold text-base md:text-lg text-amber-950 dark:text-amber-300">
                  {dosha.name}
                </h4>
                <span className={`px-2.5 py-0.5 rounded-full text-xs ${sevColor}`}>
                  {dosha.isPresent ? `${dosha.severity} Active` : 'Absent (Safe)'}
                </span>
              </div>

              <div className="space-y-2 text-xs md:text-sm">
                <div>
                  <strong className="text-amber-900 dark:text-amber-400">Rule Analysis: </strong>
                  <span className="text-gray-700 dark:text-gray-300">{dosha.cancellationApplied || 'Standard Planetary Placement'}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs">
                  {dosha.effects}
                </p>

                {dosha.isPresent && (
                  <div className="p-2.5 bg-rose-50 dark:bg-neutral-900 rounded-lg border border-rose-200 dark:border-neutral-700">
                    <strong className="text-rose-900 dark:text-rose-300 block text-xs font-bold">
                      Traditional Remedy:
                    </strong>
                    <p className="text-rose-950 dark:text-gray-300 text-xs mt-0.5">
                      {dosha.remedies}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* </div> */}
    </div>
  );
}
