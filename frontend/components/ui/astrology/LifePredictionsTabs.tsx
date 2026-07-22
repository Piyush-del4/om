'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { generateLifePredictions, LifePredictionCategory } from '@/lib/predictionsEngine';

interface Props {
  data: any;
}

export function LifePredictionsTabs({ data }: Props) {
  /* Collapsible State (Preserved in comments for future activation):
  const [isOpen, setIsOpen] = useState(false);
  */

  if (!data || !data.output || !data.output[1]) return null;

  const categories: LifePredictionCategory[] = generateLifePredictions(data);
  const [selectedKey, setSelectedKey] = useState<string>('all');

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
      {/* Title Header */}
      <div 
        /* onClick={() => setIsOpen(!isOpen)} */
        className="bg-amber-700 dark:bg-amber-800 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
      >
        <span className="text-xl">📜</span>
        <h3 className="font-serif font-bold text-lg md:text-2xl">
          Comprehensive Life Predictions (17 Categories)
        </h3>
        {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
      </div>

      {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} space-y-6`}> */}
      <div className="space-y-6">

      {/* Category selector grid */}
      <div className="flex flex-wrap gap-2 justify-center print:hidden">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedKey(cat.key)}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedKey === cat.key
                ? 'bg-amber-600 text-white shadow-md scale-105'
                : 'bg-amber-100 dark:bg-neutral-800 text-amber-950 dark:text-gray-300 hover:bg-amber-200'
            }`}
          >
            {cat.title}
          </button>
        ))}

        {/* All 17 Predictions Button */}
        <button
          onClick={() => setSelectedKey('all')}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            selectedKey === 'all'
              ? 'bg-amber-700 text-white shadow-md scale-105'
              : 'bg-amber-200 dark:bg-amber-900/50 text-amber-950 dark:text-amber-300 hover:bg-amber-300'
          }`}
        >
          ✨ All 17 Predictions
        </button>
      </div>

      {/* Interactive Web Screen View */}
      <div className="space-y-6 print:hidden pdf-hide-in-export">
        {selectedKey === 'all' ? (
          categories.map((cat) => (
            <PredictionCard key={cat.key} cat={cat} />
          ))
        ) : (
          (() => {
            const active = categories.find((c) => c.key === selectedKey) || categories[0];
            return active ? <PredictionCard cat={active} /> : null;
          })()
        )}
      </div>

      {/* Complete All 17 Categories (ALWAYS Rendered for PDF Export & Print) */}
      <div className="hidden print:block pdf-show-in-export space-y-6">
        {categories.map((cat) => (
          <PredictionCard key={cat.key} cat={cat} />
        ))}
      </div>
      </div>
    </div>
  );
}

function PredictionCard({ cat }: { cat: LifePredictionCategory }) {
  return (
    <div className="pdf-page-break-avoid bg-white dark:bg-neutral-800 border border-amber-300 dark:border-neutral-700 rounded-xl p-5 space-y-4 shadow-sm">
      <div className="border-b border-gray-200 dark:border-neutral-700 pb-3">
        <h4 className="font-serif font-bold text-xl text-amber-950 dark:text-amber-300">
          {cat.title}
        </h4>
        <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mt-1 font-light">
          {cat.summary}
        </p>
      </div>

      <div className="space-y-2">
        <h5 className="font-bold text-amber-900 dark:text-amber-400 text-xs sm:text-sm">Key Astrological Insights</h5>
        <ul className="space-y-1.5 text-xs md:text-sm text-gray-700 dark:text-gray-300">
          {cat.keyInsights.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">✦</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="p-3 bg-amber-50 dark:bg-neutral-900 border border-amber-200 dark:border-neutral-700 rounded-lg">
          <span className="font-bold text-amber-900 dark:text-amber-300 text-xs block">Favorable Periods & Dashas</span>
          <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{cat.favorablePeriods}</p>
        </div>

        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-xs block">Astrological Guidance</span>
          <p className="text-xs text-emerald-950 dark:text-emerald-200 mt-1">{cat.guidance}</p>
        </div>
      </div>
    </div>
  );
}
