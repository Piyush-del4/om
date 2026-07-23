import React from 'react';

const PLANETARY_ASPECTS = [
  { name: 'Surya', aspects: '7' },
  { name: 'Chandra', aspects: '7' },
  { name: 'Guru', aspects: '5,7,9' },
  { name: 'Mangal', aspects: '4,7,8' },
  { name: 'Budh', aspects: '7' },
  { name: 'Shukra', aspects: '7' },
  { name: 'Shani', aspects: '3,7,10' },
  { name: 'Rahu', aspects: '5,7,9' },
  { name: 'Ketu', aspects: '5,7,9' },
];

export function PlanetaryAspects() {
  return (
    <div className="w-full max-w-full mx-auto my-6 bg-amber-50/60 dark:bg-neutral-900/60 border border-amber-800/20 rounded-2xl p-4 sm:p-6 shadow-md">
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-center text-amber-950 dark:text-amber-200 mb-5 flex items-center justify-center gap-2">
        ✦ Aspects(Drishti) of Planets✦
      </h3>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {PLANETARY_ASPECTS.map((item) => (
          <div
            key={item.name}
            className="bg-[#92400e] text-white font-medium rounded-xl py-3 px-2 text-center text-sm sm:text-base md:text-lg shadow-sm tracking-wide flex items-center justify-center transition-transform hover:scale-[1.02]"
          >
            <span>
              {item.name}: <strong className="font-bold">{item.aspects}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
