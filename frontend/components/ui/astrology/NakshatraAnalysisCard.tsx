'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getNakshatraAndPada } from '@/lib/astrologyEngine';
import { getNakshatraDetail } from '@/lib/nakshatraData';

interface Props {
  data: any;
}

export function NakshatraAnalysisCard({ data }: Props) {
  /* Collapsible State (Preserved in comments for future activation):
  const [isOpen, setIsOpen] = useState(false);
  */

  if (!data || !data.output || !data.output[1]) return null;

  const moonData = data.output[1]['Moon'] || { current_sign: 1, normDegree: 0 };
  const moonSignNum = moonData.current_sign || 1;
  const moonFullDeg = (moonSignNum - 1) * 30 + (moonData.normDegree || 0);

  const nakInfo = getNakshatraAndPada(moonFullDeg);
  const detail = getNakshatraDetail(nakInfo.name);

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
      {/* Title Header */}
      <div 
        /* onClick={() => setIsOpen(!isOpen)} */
        className="bg-amber-700 dark:bg-amber-800 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
      >
        <span className="text-xl">✨</span>
        <h3 className="font-serif font-bold text-lg md:text-2xl">
          Deep Birth Nakshatra Analysis ({nakInfo.name} - Pada {nakInfo.pada})
        </h3>
        {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
      </div>

      {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} space-y-6`}> */}
      <div className="space-y-6">

      <div className="bg-white dark:bg-neutral-800 border border-amber-300 dark:border-neutral-700 rounded-xl p-5 space-y-5 shadow-sm">
        
        {/* Header summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 dark:border-neutral-700 pb-4 gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Birth Star
            </span>
            <h4 className="font-serif font-bold text-2xl text-amber-950 dark:text-amber-300">
              {detail.name} Nakshatra (Pada {nakInfo.pada})
            </h4>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 bg-amber-200 dark:bg-amber-900/60 text-amber-950 dark:text-amber-300 font-bold rounded-full">
              Ruler: {detail.ruler}
            </span>
            <span className="px-3 py-1 bg-purple-200 dark:bg-purple-900/60 text-purple-950 dark:text-purple-300 font-bold rounded-full">
              Gana: {detail.gana}
            </span>
            <span className="px-3 py-1 bg-blue-200 dark:bg-blue-900/60 text-blue-950 dark:text-blue-300 font-bold rounded-full">
              Nadi: {detail.nadi}
            </span>
          </div>
        </div>

        {/* 10 Attributes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
          <div className="p-2.5 bg-amber-50 dark:bg-neutral-900 rounded-lg border border-amber-200 dark:border-neutral-700">
            <span className="text-gray-500 block">Deity</span>
            <span className="font-bold text-amber-950 dark:text-gray-200 text-xs">{detail.deity}</span>
          </div>

          <div className="p-2.5 bg-amber-50 dark:bg-neutral-900 rounded-lg border border-amber-200 dark:border-neutral-700">
            <span className="text-gray-500 block">Symbol</span>
            <span className="font-bold text-amber-950 dark:text-gray-200 text-xs">{detail.symbol}</span>
          </div>

          <div className="p-2.5 bg-amber-50 dark:bg-neutral-900 rounded-lg border border-amber-200 dark:border-neutral-700">
            <span className="text-gray-500 block">Yoni (Animal)</span>
            <span className="font-bold text-amber-950 dark:text-gray-200 text-xs">{detail.yoni} ({detail.animal})</span>
          </div>

          <div className="p-2.5 bg-amber-50 dark:bg-neutral-900 rounded-lg border border-amber-200 dark:border-neutral-700">
            <span className="text-gray-500 block">Gana</span>
            <span className="font-bold text-amber-950 dark:text-gray-200 text-xs">{detail.gana} Gana</span>
          </div>

          <div className="p-2.5 bg-amber-50 dark:bg-neutral-900 rounded-lg border border-amber-200 dark:border-neutral-700">
            <span className="text-gray-500 block">Nadi</span>
            <span className="font-bold text-amber-950 dark:text-gray-200 text-xs">{detail.nadi} Nadi</span>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-4 text-xs md:text-sm pt-2">
          <div className="p-3 bg-amber-100/50 dark:bg-neutral-900 rounded-lg">
            <h5 className="font-bold text-amber-950 dark:text-amber-300">Core Characteristics</h5>
            <p className="text-gray-700 dark:text-gray-300 mt-1">{detail.characteristics}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h5 className="font-bold text-blue-900 dark:text-blue-300">Career & Vocation</h5>
              <p className="text-blue-950 dark:text-blue-200 text-xs mt-1">{detail.career}</p>
            </div>

            <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg">
              <h5 className="font-bold text-rose-900 dark:text-rose-300">Marriage & Domestic Life</h5>
              <p className="text-rose-950 dark:text-rose-200 text-xs mt-1">{detail.marriage}</p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <h5 className="font-bold text-emerald-900 dark:text-emerald-300">Compatible Birth Stars</h5>
            <div className="flex flex-wrap gap-2 mt-2">
              {detail.compatibility.map((star) => (
                <span key={star} className="px-2.5 py-1 bg-emerald-200 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-200 rounded text-xs font-bold">
                  {star}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
