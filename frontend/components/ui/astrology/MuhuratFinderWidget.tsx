'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getMuhuratRecommendations, MuhuratCategory } from '@/lib/muhuratEngine';

export function MuhuratFinderWidget() {
  /* Collapsible State (Preserved in comments for future activation):
  const [isOpen, setIsOpen] = useState(false);
  */
  const categories: MuhuratCategory[] = getMuhuratRecommendations();
  const [selectedKey, setSelectedKey] = useState<string>('all');

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
      {/* Title Header */}
      <div 
        /* onClick={() => setIsOpen(!isOpen)} */
        className="bg-amber-700 dark:bg-amber-800 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
      >
        <span className="text-xl">🛕</span>
        <h3 className="font-serif font-bold text-lg md:text-2xl">
          Auspicious Muhurat Finder & Event Guidance
        </h3>
        {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
      </div>

      {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} space-y-6`}> */}
      <div className="space-y-6">

      <div className="flex flex-wrap gap-2 justify-center print:hidden">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedKey(cat.key)}
            className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${
              selectedKey === cat.key
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-100 dark:bg-neutral-800 text-amber-950 dark:text-gray-300 hover:bg-amber-200'
            }`}
          >
            {cat.event}
          </button>
        ))}

        {/* All 6 Muhurats Button */}
        <button
          onClick={() => setSelectedKey('all')}
          className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${
            selectedKey === 'all'
              ? 'bg-amber-700 text-white shadow-md scale-105'
              : 'bg-amber-200 dark:bg-amber-900/50 text-amber-950 dark:text-amber-300 hover:bg-amber-300'
          }`}
        >
          ✨ All 6 Muhurats
        </button>
      </div>

      {/* Interactive Web Screen View */}
      <div className="space-y-6 print:hidden pdf-hide-in-export">
        {selectedKey === 'all' ? (
          categories.map((cat) => (
            <MuhuratCard key={cat.key} cat={cat} />
          ))
        ) : (
          (() => {
            const active = categories.find((c) => c.key === selectedKey) || categories[0];
            return active ? <MuhuratCard cat={active} /> : null;
          })()
        )}
      </div>

      {/* Complete All 6 Muhurats Output (ALWAYS Rendered for PDF Export & Print) */}
      <div className="hidden print:block pdf-show-in-export space-y-6">
        {categories.map((cat) => (
          <MuhuratCard key={cat.key} cat={cat} />
        ))}
      </div>
      </div>
    </div>
  );
}

function MuhuratCard({ cat }: { cat: MuhuratCategory }) {
  return (
    <div className="pdf-page-break-avoid bg-white dark:bg-neutral-800 border border-amber-300 dark:border-neutral-700 rounded-xl p-5 space-y-4 shadow-sm">
      <div className="border-b border-gray-200 dark:border-neutral-700 pb-3">
        <h4 className="font-serif font-bold text-xl text-amber-950 dark:text-amber-300">
          Auspicious Muhurat Guidelines: {cat.event}
        </h4>
        <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mt-1">
          {cat.generalRecommendation}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl space-y-2">
          <h5 className="font-bold text-emerald-900 dark:text-emerald-300">Auspicious Tithis</h5>
          <div className="flex flex-wrap gap-1">
            {cat.auspiciousTithis.map((t) => (
              <span key={t} className="px-2 py-0.5 bg-emerald-200 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-200 rounded text-xs font-bold">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800 rounded-xl space-y-2">
          <h5 className="font-bold text-blue-900 dark:text-blue-300">Auspicious Nakshatras</h5>
          <div className="flex flex-wrap gap-1">
            {cat.auspiciousNakshatras.map((n) => (
              <span key={n} className="px-2 py-0.5 bg-blue-200 dark:bg-blue-900 text-blue-950 dark:text-blue-200 rounded text-xs font-bold">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800 rounded-xl text-xs space-y-1">
        <h5 className="font-bold text-rose-900 dark:text-rose-300">Timings to Avoid</h5>
        <p className="text-rose-950 dark:text-rose-200">{cat.avoidTimings}</p>
      </div>
    </div>
  );
}
