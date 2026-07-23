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

// SVG Icon mappings for all 12 zodiac signs
const ZODIAC_SVGS: Record<number, React.ReactNode> = {
  1: ( // Aries (Ram)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <path d="M50,40 C50,25 35,15 25,25 C15,35 25,50 35,50 M50,40 C50,25 65,15 75,25 C85,35 75,50 65,50" />
      <line x1="50" y1="40" x2="50" y2="85" />
      <circle cx="50" cy="85" r="3" className="fill-amber-600 dark:fill-amber-400" />
    </svg>
  ),
  2: ( // Taurus (Bull)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <circle cx="50" cy="60" r="20" />
      <path d="M20,25 C30,45 40,40 50,40 C60,40 70,45 80,25" />
    </svg>
  ),
  3: ( // Gemini (Twins)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <path d="M30,20 C40,25 60,25 70,20 M30,80 C40,75 60,75 70,80 M40,23 L40,77 M60,23 L60,77" />
    </svg>
  ),
  4: ( // Cancer (Crab)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <circle cx="40" cy="40" r="12" />
      <circle cx="60" cy="60" r="12" />
      <path d="M40,28 C20,28 20,52 40,52 M60,48 C80,48 80,72 60,72" />
    </svg>
  ),
  5: ( // Leo (Lion)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <circle cx="35" cy="40" r="10" />
      <path d="M35,30 C50,15 70,25 65,45 C60,65 80,65 80,80" />
    </svg>
  ),
  6: ( // Virgo (Virgin)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <path d="M30,25 C30,10 42,15 42,40 C42,15 54,15 54,40 C54,15 66,15 66,45 C66,65 55,80 50,80 M62,40 C75,40 80,60 70,75" />
    </svg>
  ),
  7: ( // Libra (Scales)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <path d="M20,70 L80,70 M20,50 L35,50 C40,40 60,40 65,50 L80,50" />
    </svg>
  ),
  8: ( // Scorpio (Scorpion)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <path d="M30,25 C30,10 42,15 42,40 C42,15 54,15 54,40 C54,15 66,15 66,45 L66,65 C66,75 75,70 80,60 M75,55 L80,60 L75,65" />
    </svg>
  ),
  9: ( // Sagittarius (Archer)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <line x1="25" y1="75" x2="75" y2="25" />
      <path d="M60,25 L75,25 L75,40 M45,45 L55,55" />
    </svg>
  ),
  10: ( // Capricorn (Goat)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <path d="M25,25 L35,45 C45,65 55,45 60,35 C65,25 75,25 75,45 C75,65 55,80 40,70" />
    </svg>
  ),
  11: ( // Aquarius (Water Bearer)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <path d="M20,35 L35,20 L50,35 L65,20 L80,35 M20,65 L35,50 L50,65 L65,50 L80,65" />
    </svg>
  ),
  12: ( // Pisces (Fish)
    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-amber-600 dark:stroke-amber-400 fill-none" strokeWidth="2.5">
      <path d="M25,20 C45,30 45,70 25,80 M75,20 C55,30 55,70 75,80 M20,50 L80,50" />
    </svg>
  )
};

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
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-100 to-amber-50 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center shadow-inner border border-amber-200 dark:border-neutral-800 p-2">
          {ZODIAC_SVGS[house1SignNum]}
        </div>
        <h4 className="font-serif font-black text-xl md:text-2xl text-amber-950 dark:text-amber-300">
          {lagnaName} Lagna
        </h4>
      </div>

      {/* 2. Rashi Card */}
      <div className="bg-amber-50/50 dark:bg-neutral-900 border-2 border-amber-300/60 dark:border-neutral-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-md space-y-4 hover:border-amber-400 dark:hover:border-neutral-700 transition-all duration-300">
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-100 to-amber-50 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center shadow-inner border border-amber-200 dark:border-neutral-800 p-2">
          {ZODIAC_SVGS[moonSignNum]}
        </div>
        <h4 className="font-serif font-black text-xl md:text-2xl text-amber-950 dark:text-amber-300">
          {rashiName} Rashi
        </h4>
      </div>
    </div>
  );
}
