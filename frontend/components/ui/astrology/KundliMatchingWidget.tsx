'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { calculateGunaMilan, CompatibilityResult } from '@/lib/gunaMilanEngine';

interface Props {
  data?: any;
}

export function KundliMatchingWidget({ data }: Props) {
  /* Collapsible State (Preserved in comments for future activation):
  const [isOpen, setIsOpen] = useState(false);
  */
  const result: CompatibilityResult = calculateGunaMilan();

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
      {/* Title Header */}
      <div 
        /* onClick={() => setIsOpen(!isOpen)} */
        className="bg-amber-700 dark:bg-amber-800 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
      >
        <span className="text-xl">💞</span>
        <h3 className="font-serif font-bold text-lg md:text-2xl">
          Kundli Matching & Guna Milan (36-Point Compatibility)
        </h3>
        {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
      </div>

      {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} space-y-6`}> */}
      <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-white dark:bg-neutral-800 border border-amber-300 rounded-xl">
          <span className="text-xs text-gray-500 block">Total Guna Score</span>
          <span className="font-bold text-3xl text-amber-950 dark:text-amber-300">
            {result.totalGunas} / {result.maxGunas}
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            ({result.percentage}% Match)
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-800 border border-amber-300 rounded-xl">
          <span className="text-xs text-gray-500 block">Overall Recommendation</span>
          <span className="font-bold text-lg text-emerald-800 dark:text-emerald-300 block mt-1">
            {result.recommendation}
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-800 border border-amber-300 rounded-xl">
          <span className="text-xs text-gray-500 block">Manglik Compatibility</span>
          <span className="font-bold text-sm text-amber-950 dark:text-amber-300 block mt-1">
            {result.manglikStatus}
          </span>
        </div>
      </div>

      {/* 8 Kootas Breakdown Table */}
      <div className="bg-white dark:bg-neutral-800 border border-amber-300 dark:border-neutral-700 rounded-xl p-5 space-y-3 shadow-sm overflow-x-auto">
        <h4 className="font-serif font-bold text-base text-amber-950 dark:text-amber-300 border-b pb-2">
          Ashta Koota Compatibility Breakdown
        </h4>

        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-amber-100 dark:bg-neutral-900 text-amber-950 dark:text-amber-300 font-bold border-b border-amber-300">
              <th className="p-2.5">Koota Factor</th>
              <th className="p-2.5">Max Points</th>
              <th className="p-2.5">Obtained</th>
              <th className="p-2.5">Significance</th>
              <th className="p-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 font-medium">
            {result.kootas.map((koota) => (
              <tr key={koota.name} className="hover:bg-amber-50 dark:hover:bg-neutral-700/40">
                <td className="p-2.5 font-bold text-amber-950 dark:text-white">{koota.name}</td>
                <td className="p-2.5 font-mono">{koota.maxPoints}</td>
                <td className="p-2.5 font-bold text-amber-900 dark:text-amber-300">{koota.obtainedPoints}</td>
                <td className="p-2.5 text-gray-700 dark:text-gray-300 text-xs">{koota.description}</td>
                <td className="p-2.5">
                  <span className="px-2 py-0.5 bg-emerald-200 text-emerald-950 rounded text-xs font-bold">
                    {koota.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
