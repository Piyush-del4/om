import React from 'react';

interface NumerologyDetailsProps {
  dateOfBirthStr?: string; // YYYY-MM-DD
  mulank?: number;
  bhagyank?: number;
  namayank?: number;
}

const FRIENDLY_MAP: Record<number, number[]> = {
  1: [1, 2, 3, 5, 9],
  2: [1, 2, 3, 5],
  3: [1, 2, 3, 5, 7, 9],
  4: [1, 5, 6, 7],
  5: [1, 2, 3, 5, 6],
  6: [5, 6, 8],
  7: [1, 3, 5, 6],
  8: [5, 6, 7],
  9: [1, 2, 3, 5]
};

const NEUTRAL_MAP: Record<number, string> = {
  1: '4, 7, 8',
  2: '4, 7, 8, 9',
  3: '4, 8',
  4: '3, 8',
  5: '4, 7, 8, 9',
  6: '3, 4, 7, 9',
  7: '2, 4, 7, 8, 9',
  8: '3, 4',
  9: '4, 6, 7, 9'
};

const ENEMY_MAP: Record<number, string> = {
  1: '6',
  2: '6',
  3: '6',
  4: '2, 4, 9',
  5: 'None',
  6: '1, 2',
  7: 'None',
  8: '1, 2, 8, 9',
  9: '8'
};

export function NumerologyAstroDetails({
  dateOfBirthStr = '1981-10-03',
  mulank: passedMulank,
  bhagyank: passedBhagyank,
  namayank: passedNamayank
}: NumerologyDetailsProps) {
  // Extract digits present in birth date
  const cleanDigits = (dateOfBirthStr || '').replace(/\D/g, '').split('').map(Number).filter(n => n >= 1 && n <= 9);
  const presentSet = new Set(cleanDigits);

  // Calculate Mulank & Bhagyank if not passed
  let calculatedMulank = 3;
  let calculatedBhagyank = 5;

  if (dateOfBirthStr) {
    const parts = dateOfBirthStr.split('-');
    const dayStr = parts[2] || '1';
    let dSum = dayStr.split('').reduce((a, b) => a + parseInt(b || '0'), 0);
    while (dSum > 9) {
      dSum = dSum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    calculatedMulank = dSum >= 1 && dSum <= 9 ? dSum : 3;

    const fullStr = (parts[0] || '1990') + (parts[1] || '01') + (parts[2] || '01');
    let bSum = fullStr.split('').reduce((a, b) => a + parseInt(b || '0'), 0);
    while (bSum > 9) {
      bSum = bSum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    calculatedBhagyank = bSum >= 1 && bSum <= 9 ? bSum : 5;
  }

  const m = passedMulank || calculatedMulank;
  const b = passedBhagyank || calculatedBhagyank;
  const n = passedNamayank || b;

  const friendlyList = FRIENDLY_MAP[m] || [1, 2, 3, 5];
  const enemyText = ENEMY_MAP[m] || '6';
  const neutralText = NEUTRAL_MAP[m] || '4, 7, 8';

  // Rule: Lucky numbers = Friendly numbers which are NOT present in birth Lo Shu Grid, and can NEVER be 4, 7, or 8
  const luckyNumbersList = friendlyList.filter(num => !presentSet.has(num) && num !== 4 && num !== 7 && num !== 8);

  // Fallback if all friendly numbers exist in grid
  const finalLuckyText = luckyNumbersList.length > 0 
    ? luckyNumbersList.join(', ') 
    : friendlyList.filter(n => n !== 4 && n !== 7 && n !== 8).slice(0, 3).join(', ');

  return (
    <div className="w-full max-w-full mx-auto my-8 space-y-3">
      {/* Container Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
        
        {/* Left Card: Mulank, Bhagyank, Namayank Pills */}
        <div className="md:col-span-2 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 dark:from-neutral-900 dark:to-neutral-800 border-2 border-amber-800/30 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between bg-amber-200/60 dark:bg-neutral-800/80 px-4 py-2.5 rounded-xl border border-amber-800/20">
            <span className="font-sans font-bold text-amber-950 dark:text-amber-100 text-sm md:text-base">Mulank</span>
            <div className="w-8 h-8 rounded-full border border-amber-900 flex items-center justify-center font-bold text-amber-950 dark:text-amber-100 text-sm bg-amber-50 dark:bg-neutral-900">
              {m}
            </div>
          </div>

          <div className="flex items-center justify-between bg-orange-200/60 dark:bg-neutral-800/80 px-4 py-2.5 rounded-xl border border-amber-800/20">
            <span className="font-sans font-bold text-amber-950 dark:text-amber-100 text-sm md:text-base">Bhagyank</span>
            <div className="w-8 h-8 rounded-full border border-amber-900 flex items-center justify-center font-bold text-amber-950 dark:text-amber-100 text-sm bg-amber-50 dark:bg-neutral-900">
              {b}
            </div>
          </div>

          <div className="flex items-center justify-between bg-amber-200/60 dark:bg-neutral-800/80 px-4 py-2.5 rounded-xl border border-amber-800/20">
            <span className="font-sans font-bold text-amber-950 dark:text-amber-100 text-sm md:text-base">Namayank</span>
            <div className="w-8 h-8 rounded-full border border-amber-900 flex items-center justify-center font-bold text-amber-950 dark:text-amber-100 text-sm bg-amber-50 dark:bg-neutral-900">
              {n}*
            </div>
          </div>
        </div>

        {/* Right Table: Enemy, Neutral, Friendly, Lucky Numbers */}
        <div className="md:col-span-3 border-2 border-amber-800/30 rounded-2xl overflow-hidden shadow-md bg-white dark:bg-neutral-900">
          <div className="divide-y divide-amber-800/20 dark:divide-neutral-800">
            
            {/* Enemy Numbers */}
            <div className="grid grid-cols-5 text-sm bg-red-100/70 dark:bg-red-950/40">
              <div className="col-span-2 p-3 font-bold text-red-900 dark:text-red-300 border-r border-amber-800/20 dark:border-neutral-800 flex items-center">
                Enemy Numbers
              </div>
              <div className="col-span-3 p-3 font-bold text-neutral-900 dark:text-gray-100 flex items-center">
                {enemyText}
              </div>
            </div>

            {/* Neutral Numbers */}
            <div className="grid grid-cols-5 text-sm bg-neutral-200/60 dark:bg-neutral-800/60">
              <div className="col-span-2 p-3 font-bold text-neutral-900 dark:text-gray-300 border-r border-amber-800/20 dark:border-neutral-800 flex items-center">
                Neutral Numbers
              </div>
              <div className="col-span-3 p-3 font-bold text-neutral-900 dark:text-gray-100 flex items-center">
                {neutralText}
              </div>
            </div>

            {/* Friendly Numbers */}
            <div className="grid grid-cols-5 text-sm bg-emerald-100/70 dark:bg-emerald-950/40">
              <div className="col-span-2 p-3 font-bold text-emerald-900 dark:text-emerald-300 border-r border-amber-800/20 dark:border-neutral-800 flex items-center">
                Friendly Numbers
              </div>
              <div className="col-span-3 p-3 font-bold text-neutral-900 dark:text-gray-100 flex items-center">
                {friendlyList.join(', ')}
              </div>
            </div>

            {/* Lucky Numbers (Friendly numbers NOT in Lo Shu Grid) */}
            <div className="grid grid-cols-5 text-sm bg-lime-200/80 dark:bg-lime-950/60">
              <div className="col-span-2 p-3 font-bold text-emerald-950 dark:text-lime-300 border-r border-amber-800/20 dark:border-neutral-800 flex items-center gap-1">
                ★ Lucky Numbers
              </div>
              <div className="col-span-3 p-3 font-bold text-neutral-900 dark:text-gray-100 flex items-center">
                {finalLuckyText}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Subtitle Warning */}
      <p className="text-center text-xs italic text-red-600 dark:text-red-400 font-medium">
        *It is advised to use Lucky Numbers only!
      </p>
    </div>
  );
}
