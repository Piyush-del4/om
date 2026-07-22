import React from 'react';
import { Grid, Sparkles } from 'lucide-react';

interface LoShuGridProps {
  dateOfBirthStr: string; // YYYY-MM-DD
}

const STANDARD_GRID = [
  [
    { num: 4, element: 'Wood', bgClass: 'bg-[#9a3412] text-amber-50 border-[#7c2d12]' },
    { num: 9, element: 'Fire', bgClass: 'bg-red-500 text-white border-red-600' },
    { num: 2, element: 'Earth', bgClass: 'bg-emerald-700 text-white border-emerald-800' }
  ],
  [
    { num: 3, element: 'Wood', bgClass: 'bg-[#fef3c7] text-[#78350f] border-[#fde68a]' },
    { num: 5, element: 'Earth', bgClass: 'bg-emerald-700 text-white border-emerald-800' },
    { num: 7, element: 'White Metal', bgClass: 'bg-white text-neutral-900 border-neutral-300' }
  ],
  [
    { num: 8, element: 'Earth', bgClass: 'bg-emerald-700 text-white border-emerald-800' },
    { num: 1, element: 'Water', bgClass: 'bg-[#1e3a8a] text-white border-[#172554]' },
    { num: 6, element: 'Gold Metal', bgClass: 'bg-amber-300 text-amber-950 border-amber-500' }
  ]
];

const GRID_NUM_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6]
];

export function LoShuGrid({ dateOfBirthStr }: LoShuGridProps) {
  if (!dateOfBirthStr) return null;

  const cleanDigits = dateOfBirthStr.replace(/[^1-9]/g, '').split('');

  const parts = dateOfBirthStr.split('-');
  const dayStr = parts[2] || '1';
  let driverSum = dayStr.split('').reduce((acc, curr) => acc + parseInt(curr || '0'), 0);
  while (driverSum > 9) {
    driverSum = driverSum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }

  let conductorSum = cleanDigits.reduce((acc, curr) => acc + parseInt(curr), 0);
  while (conductorSum > 9) {
    conductorSum = conductorSum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }

  const allDigits = [...cleanDigits, driverSum.toString(), conductorSum.toString()];

  const counts: Record<number, number> = {};
  for (const d of allDigits) {
    const n = parseInt(d);
    if (n >= 1 && n <= 9) {
      counts[n] = (counts[n] || 0) + 1;
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-6 space-y-4">
      
      {/* Section Header */}
      <div className="text-center space-y-1">
        <h3 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2">
          <Grid className="w-6 h-6 text-[var(--gold)]" /> Lo Shu Grid Analysis
        </h3>
        <p className="text-sm text-neutral-600 dark:text-gray-400 max-w-xl mx-auto">
          Compare the <strong>Standard Lo Shu Grid</strong> with your personalized <strong>Birth Lo Shu Grid</strong>.
        </p>
      </div>

      {/* Grid Container Side-by-Side */}
      <div className="grid grid-cols-2 gap-6 items-center max-w-2xl mx-auto">
        
        {/* 1. Standard Lo Shu Grid */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm text-center space-y-3">
          <h4 className="font-bold text-base text-neutral-800 dark:text-neutral-200">
            Standard LoShu Grid
          </h4>

          <div className="grid grid-cols-3 gap-0 w-full max-w-[280px] h-[220px] md:h-[240px] mx-auto border-2 border-amber-900/40 overflow-hidden rounded-lg">
            {STANDARD_GRID.map((row, rIdx) => (
              row.map((cell, cIdx) => (
                <div 
                  key={`${rIdx}-${cIdx}`}
                  className={`border border-amber-900/30 flex flex-col items-center justify-center p-2 ${cell.bgClass}`}
                >
                  <span className="text-lg md:text-xl font-black">{cell.num}</span>
                  <span className="text-xs font-semibold opacity-85">({cell.element})</span>
                </div>
              ))
            ))}
          </div>
        </div>

        {/* 2. Birth Lo Shu Grid (Personalized) */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm text-center space-y-3">
          <h4 className="font-bold text-base text-amber-800 dark:text-[var(--gold)] flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[var(--gold)]" /> Birth LoShu Grid
          </h4>

          <div className="grid grid-cols-3 gap-0 w-full max-w-[280px] h-[220px] md:h-[240px] mx-auto border-2 border-amber-900/40 overflow-hidden rounded-lg">
            {GRID_NUM_LAYOUT.map((row, rIdx) => (
              row.map((num, cIdx) => {
                const count = counts[num] || 0;
                const cellText = count > 0 ? num.toString().repeat(count) : '';
                const hasValue = count > 0;

                return (
                  <div 
                    key={`birth-${rIdx}-${cIdx}`}
                    className={`border border-amber-900/30 flex items-center justify-center p-2 font-black text-lg md:text-xl transition-all ${
                      hasValue 
                        ? 'bg-amber-200 text-amber-950' 
                        : 'bg-white dark:bg-neutral-900 text-transparent'
                    }`}
                  >
                    {hasValue ? cellText : '-'}
                  </div>
                );
              })
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
