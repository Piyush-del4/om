'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { VimshottariDashaTable } from '@/components/ui/VimshottariDashaTable';

interface Props {
  data: any;
  dashaApiData: any;
  birthDateStr: string;
}

export function DashaTimelineView({ data, dashaApiData, birthDateStr }: Props) {
  /* Collapsible State (Preserved in comments for future activation):
  const [isOpen, setIsOpen] = useState(false);
  */
  const [activeTab, setActiveTab] = useState<'current' | 'full'>('current');

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 space-y-6">
      {/* Title Header */}
      <div 
        /* onClick={() => setIsOpen(!isOpen)} */
        className="bg-amber-700 dark:bg-amber-800 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
      >
        <span className="text-xl">⏳</span>
        <h3 className="font-sans font-bold text-lg md:text-2xl">
          Dasha
        </h3>
        {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
      </div>

      {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} space-y-6`}> */}
      <div className="space-y-6">

      {/*
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'current'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-amber-100 dark:bg-neutral-800 text-amber-950 dark:text-gray-300'
          }`}
        >
          Active Dasha & Predictions
        </button>

        <button
          onClick={() => setActiveTab('full')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'full'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-amber-100 dark:bg-neutral-800 text-amber-950 dark:text-gray-300'
          }`}
        >
          120-Year Full Dasha Timeline
        </button>
      </div>
      */}

      {activeTab === 'current' ? (
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 space-y-4">
          <div className="p-4 bg-amber-100/70 dark:bg-neutral-900 border-l-4 border-amber-600 rounded-r-lg space-y-2">
            <h4 className="font-sans font-bold text-base md:text-lg text-amber-950 dark:text-amber-300">
              Current Planetary Period Overview
            </h4>
            <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
              Dasha dictates the activation sequence of planetary energies across your 120-year lifecourse. During your active Mahadasha, the ruling planet shapes your primary themes, career focuses, and major life shifts.
            </p>
          </div>

          <VimshottariDashaTable data={data} dashaApiData={dashaApiData} birthDateStr={birthDateStr} />
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 space-y-4">
          <h4 className="font-sans font-bold text-base md:text-lg text-amber-950 dark:text-amber-300 border-b pb-2">
            Complete Vimshottari Mahadasha Timeline (120 Years Cycle)
          </h4>
          
          <VimshottariDashaTable data={data} dashaApiData={dashaApiData} birthDateStr={birthDateStr} />
        </div>
      )}
      </div>
    </div>
  );
}
