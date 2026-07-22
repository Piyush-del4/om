'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { calculateShadbala, PlanetShadbala } from '@/lib/shadbalaCalculator';

interface Props {
  data: any;
}

export function ShadbalaBreakdownChart({ data }: Props) {
  /* Collapsible State (Preserved in comments for future activation):
  const [isOpen, setIsOpen] = useState(false);
  */

  if (!data || !data.output || !data.output[1]) return null;

  const shadbalaList: PlanetShadbala[] = calculateShadbala(data);

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
      {/* Title Header */}
      <div 
        /* onClick={() => setIsOpen(!isOpen)} */
        className="bg-amber-700 dark:bg-amber-800 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
      >
        <span className="text-xl">⚡</span>
        <h3 className="font-serif font-bold text-lg md:text-2xl">
          Shadbala Breakdown (6-Fold Planetary Strength)
        </h3>
        {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
      </div>

      {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'}`}> */}
      <div className="bg-white dark:bg-neutral-800 border border-amber-300 dark:border-neutral-700 rounded-xl p-5 space-y-4 shadow-sm overflow-x-auto">
        <h4 className="font-serif font-bold text-base text-amber-950 dark:text-amber-300 border-b pb-2">
          Total Shadbala & Strength Ratios (in Rupas & Virupas)
        </h4>

        <table className="w-full text-left border-collapse text-[10px] sm:text-xs md:text-sm">
          <thead>
            <tr className="bg-amber-200/80 dark:bg-neutral-900 text-amber-950 dark:text-amber-300 font-bold border-b border-amber-300">
              <th className="px-1.5 py-2 sm:p-2.5">Planet</th>
              <th className="px-1.5 py-2 sm:p-2.5">Sthana</th>
              <th className="px-1.5 py-2 sm:p-2.5">Dig</th>
              <th className="px-1.5 py-2 sm:p-2.5">Kala</th>
              <th className="px-1.5 py-2 sm:p-2.5">Cheshta</th>
              <th className="px-1.5 py-2 sm:p-2.5">Naisargika</th>
              <th className="px-1.5 py-2 sm:p-2.5">Drik</th>
              <th className="px-1.5 py-2 sm:p-2.5">Total (Rupas)</th>
              <th className="px-1.5 py-2 sm:p-2.5">Required</th>
              <th className="px-1.5 py-2 sm:p-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 font-medium">
            {shadbalaList.map((p) => {
              let statusBadge = 'bg-emerald-200 text-emerald-950 font-bold';
              if (p.status === 'Average') statusBadge = 'bg-amber-200 text-amber-950';
              if (p.status === 'Weak') statusBadge = 'bg-rose-200 text-rose-950 font-bold';

              return (
                <tr key={p.planet} className="hover:bg-amber-50 dark:hover:bg-neutral-700/40">
                  <td className="px-1.5 py-2 sm:p-2.5 font-bold text-amber-950 dark:text-white">{p.planet}</td>
                  <td className="px-1.5 py-2 sm:p-2.5 font-mono">{p.sthanaBala}</td>
                  <td className="px-1.5 py-2 sm:p-2.5 font-mono">{p.digBala}</td>
                  <td className="px-1.5 py-2 sm:p-2.5 font-mono">{p.kalaBala}</td>
                  <td className="px-1.5 py-2 sm:p-2.5 font-mono">{p.cheshtaBala}</td>
                  <td className="px-1.5 py-2 sm:p-2.5 font-mono">{p.naisargikaBala}</td>
                  <td className="px-1.5 py-2 sm:p-2.5 font-mono">{p.drikBala}</td>
                  <td className="px-1.5 py-2 sm:p-2.5 font-bold text-amber-900 dark:text-amber-300 text-xs sm:text-sm">{p.totalRupas}</td>
                  <td className="px-1.5 py-2 sm:p-2.5 font-mono text-gray-500">{p.requiredRupas}</td>
                  <td className="px-1.5 py-2 sm:p-2.5">
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs whitespace-nowrap ${statusBadge}`}>
                      {p.status} ({p.strengthRatio}%)
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
