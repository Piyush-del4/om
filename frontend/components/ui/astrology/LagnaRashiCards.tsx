'use client';

import React from 'react';

interface Props {
  data: any;
}

const ZODIAC_HINDI_NAMES = [
  'Mesh', 'Vrishabha', 'Mithun', 'Kark', 
  'Simha', 'Kanya', 'Tula', 'Vrischika', 
  'Dhanu', 'Makar', 'Kumbha', 'Meena'
];

export function LagnaRashiCards({ data }: Props) {
  if (!data || !data.output || !data.output[1]) return null;

  // Extract Ascendant (House 1 sign)
  const house1SignNum = data.output[1][1]?.current_sign || 1;
  const lagnaName = ZODIAC_HINDI_NAMES[house1SignNum - 1] || 'Mesh';

  // Extract Moon sign (Chandra Rashi)
  const moonDetails = data.output[1][2] || data.output[1].Moon;
  const moonSignNum = moonDetails?.current_sign || 1;
  const rashiName = ZODIAC_HINDI_NAMES[moonSignNum - 1] || 'Mesh';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto my-6 px-4">
      {/* 1. Lagna Card */}
      <div className="bg-amber-50/50 dark:bg-neutral-900 border-2 border-amber-300/60 dark:border-neutral-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-md space-y-4 hover:border-amber-400 dark:hover:border-neutral-700 transition-all duration-300">
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-100 to-amber-50 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center shadow-inner border border-amber-200 dark:border-neutral-800 p-2 overflow-hidden">
          <img 
            src={`/images/zodiac_${house1SignNum}.png`} 
            alt={`${lagnaName} Lagna`} 
            className="w-full h-full object-contain"
          />
        </div>
        <h4 className="font-serif font-black text-xl md:text-2xl text-amber-950 dark:text-amber-300">
          {lagnaName} Lagna
        </h4>
      </div>

      {/* 2. Rashi Card */}
      <div className="bg-amber-50/50 dark:bg-neutral-900 border-2 border-amber-300/60 dark:border-neutral-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-md space-y-4 hover:border-amber-400 dark:hover:border-neutral-700 transition-all duration-300">
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-100 to-amber-50 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center shadow-inner border border-amber-200 dark:border-neutral-800 p-2 overflow-hidden">
          <img 
            src={`/images/zodiac_${moonSignNum}.png`} 
            alt={`${rashiName} Rashi`} 
            className="w-full h-full object-contain"
          />
        </div>
        <h4 className="font-serif font-black text-xl md:text-2xl text-amber-950 dark:text-amber-300">
          {rashiName} Rashi
        </h4>
      </div>
    </div>
  );
}
