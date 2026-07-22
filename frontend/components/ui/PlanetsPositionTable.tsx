import React from 'react';

interface PlanetsTableProps {
  data: any;
}

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 
  'Leo', 'Virgo', 'Libra', 'Scorpio', 
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const YOGAKARAKA_MAP: Record<number, string[]> = {
  1: ['Sun', 'Mars'],
  2: ['Saturn'],
  3: ['Venus'],
  4: ['Mars'],
  5: ['Mars'],
  6: ['Venus'],
  7: ['Saturn'],
  8: ['Sun', 'Jupiter'],
  9: ['Sun'],
  10: ['Venus'],
  11: ['Venus'],
  12: ['Mars', 'Moon']
};

const MARAKA_MAP: Record<number, string[]> = {
  1: ['Venus'],
  2: ['Mars', 'Mercury'],
  3: ['Moon', 'Jupiter'],
  4: ['Saturn', 'Sun'],
  5: ['Saturn', 'Mercury'],
  6: ['Venus', 'Jupiter'],
  7: ['Mars'],
  8: ['Venus', 'Jupiter'],
  9: ['Saturn', 'Mercury'],
  10: ['Moon', 'Saturn'],
  11: ['Jupiter', 'Sun'],
  12: ['Mars', 'Mercury']
};

export function PlanetsPositionTable({ data }: PlanetsTableProps) {
  if (!data || !data.output || !data.output[1]) return null;

  const rawPlanets = data.output[1];
  const house1SignNum = rawPlanets[1]?.current_sign || 1;
  const yogakarakaPlanets = YOGAKARAKA_MAP[house1SignNum] || ['Saturn'];
  const marakaPlanets = MARAKA_MAP[house1SignNum] || [];

  // Filter 7 main planets for Atmakaraka (highest degree)
  const main7 = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  let maxDeg = -1;
  let atmakarakaName = 'Sun';

  Object.entries(rawPlanets).forEach(([pName, details]: any) => {
    if (main7.includes(pName)) {
      const deg = details?.normDegree ? details.normDegree % 30 : 0;
      if (deg > maxDeg) {
        maxDeg = deg;
        atmakarakaName = pName;
      }
    }
  });

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 border-2 border-amber-800/30 rounded-2xl overflow-hidden w-full max-w-4xl mx-auto my-6 shadow-md">
      <div className="bg-amber-600 dark:bg-amber-700 text-white p-3 text-center">
        <h4 className="font-serif font-bold text-base md:text-xl">
          ✦ Planetary Positions, Yogakaraka & Atmakaraka (AK) ✦
        </h4>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-amber-200/80 dark:bg-neutral-800 text-amber-950 dark:text-amber-300 font-bold border-b border-amber-800/30">
              <th className="p-3">Planet</th>
              <th className="p-3">Sign</th>
              <th className="p-3">House</th>
              <th className="p-3">Special Karakas</th>
              <th className="p-3">Relation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-800/20 dark:divide-neutral-800 font-medium text-neutral-900 dark:text-gray-200">
            {Object.entries(rawPlanets)
              .filter(([key]) => key !== 'ayanamsa' && key !== 'debug')
              .map(([planet, details]: any) => {
                const isYogakaraka = yogakarakaPlanets.includes(planet);
                const isAtmakaraka = planet === atmakarakaName;
                const isMaraka = marakaPlanets.includes(planet);
                const isRetro = details.isRetro === 'true';

                // Relationship: Friend, Enemy, or Sam (Neutral)
                let relation = 'Sam (Neutral)';
                if (isYogakaraka) relation = 'Mitra (Friend)';
                else if (isRetro) relation = 'Sam (Neutral)';

                return (
                  <tr key={planet} className="hover:bg-amber-200/30 dark:hover:bg-neutral-800/40 transition-colors">
                    <td className="p-3 font-bold text-amber-950 dark:text-white">
                      <div className="flex items-center gap-1.5">
                        {planet}
                        {isAtmakaraka && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-500 text-black">AK</span>
                        )}
                      </div>
                      <div className="text-xs sm:text-[13px] font-mono font-bold text-amber-900/90 dark:text-amber-300 mt-0.5">
                        {details.normDegree ? `(${details.normDegree.toFixed(2)}°)` : '-'}
                      </div>
                    </td>
                    <td className="p-3">{ZODIAC_SIGNS[details.current_sign - 1] || '-'}</td>
                    <td className="p-3 font-bold">{details.house_number || '-'}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1 items-center">
                        {isYogakaraka && (
                          <span className="px-2 py-0.5 bg-amber-300 text-amber-950 font-bold rounded-md text-xs shadow-xs">
                            Yogakaraka
                          </span>
                        )}
                        {isAtmakaraka && (
                          <span className="px-2 py-0.5 bg-orange-300 text-orange-950 font-bold rounded-md text-xs shadow-xs">
                            Atmakaraka (AK)
                          </span>
                        )}
                        {isMaraka && (
                          <span className="px-2 py-0.5 bg-rose-300 text-rose-950 font-bold rounded-md text-xs shadow-xs">
                            Marak
                          </span>
                        )}
                        {!isYogakaraka && !isAtmakaraka && !isMaraka && (
                          <span className="text-gray-400 font-normal">-</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 font-bold text-amber-900 dark:text-amber-300">
                      {relation}
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
