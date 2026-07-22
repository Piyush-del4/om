'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { calculateTransits, TransitOverview } from '@/lib/transitEngine';

interface Props {
  data: any;
}

export function TransitGocharWidget({ data }: Props) {
  /* Collapsible State (Preserved in comments for future activation):
  const [isOpen, setIsOpen] = useState(false);
  */

  if (!data || !data.output || !data.output[1]) return null;

  const transitInfo: TransitOverview = calculateTransits(data);

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
      {/* Title Header */}
      <div 
        /* onClick={() => setIsOpen(!isOpen)} */
        className="bg-amber-700 dark:bg-amber-800 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
      >
        <span className="text-xl">🌌</span>
        <h3 className="font-serif font-bold text-lg md:text-2xl">
          Planetary Transit (Gochar) & Sade Sati Analysis
        </h3>
        {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
      </div>

      {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} space-y-6`}> */}
      <div className="space-y-6">

      {/* Saturn Sade Sati Indicator */}
      <div className="p-5 bg-white dark:bg-neutral-800 border border-amber-300 dark:border-neutral-700 rounded-xl space-y-3 shadow-sm">
        <div className="flex justify-between items-center border-b pb-2 border-gray-200 dark:border-neutral-700">
          <h4 className="font-serif font-bold text-lg text-amber-950 dark:text-amber-300">
            Saturn Sade Sati & Dhayya Status
          </h4>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              transitInfo.saturnSadeSati.status.includes('Active')
                ? 'bg-rose-500 text-white'
                : 'bg-emerald-200 text-emerald-950 dark:bg-emerald-900 dark:text-emerald-200'
            }`}
          >
            {transitInfo.saturnSadeSati.status}
          </span>
        </div>

        <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
          {transitInfo.saturnSadeSati.description}
        </p>

        <div className="p-3 bg-amber-100/70 dark:bg-neutral-900 border border-amber-300 dark:border-neutral-700 rounded-lg text-xs">
          <strong className="text-amber-950 dark:text-amber-300">Sade Sati Remedy: </strong>
          {transitInfo.saturnSadeSati.remedy}
        </div>
      </div>

      {/* Transits Table */}
      <div className="bg-white dark:bg-neutral-800 border border-amber-300 dark:border-neutral-700 rounded-xl p-5 space-y-3 shadow-sm overflow-x-auto">
        <h4 className="font-serif font-bold text-base text-amber-950 dark:text-amber-300 border-b pb-2">
          Current Planetary Transits Relative to Birth Moon Sign
        </h4>

        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-amber-100 dark:bg-neutral-900 text-amber-950 dark:text-amber-300 font-bold border-b border-amber-300">
              <th className="p-3">Planet</th>
              <th className="p-3">Transit Sign</th>
              <th className="p-3">House from Moon</th>
              <th className="p-3">Gochar Alignment</th>
              <th className="p-3">Impact Summary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 font-medium">
            {transitInfo.currentTransits.map((t) => (
              <tr key={t.planet} className="hover:bg-amber-50 dark:hover:bg-neutral-700/40">
                <td className="p-3 font-bold text-amber-950 dark:text-white">{t.planet}</td>
                <td className="p-3 font-semibold">{t.currentSign}</td>
                <td className="p-3 font-bold">House {t.houseFromMoon}</td>
                <td className="p-3">
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs ${
                      t.isBeneficTransit
                        ? 'bg-emerald-200 text-emerald-950 font-bold'
                        : 'bg-amber-200 text-amber-950'
                    }`}
                  >
                    {t.isBeneficTransit ? 'Benefic' : 'Neutral/Learning'}
                  </span>
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300 text-xs">{t.effectSummary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
