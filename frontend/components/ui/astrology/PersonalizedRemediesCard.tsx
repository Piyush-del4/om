'use client';

import React from 'react';
import { Shield, Sparkles, Heart, Activity } from 'lucide-react';

interface Props {
  data: any;
}

export function PersonalizedRemediesCard({ data }: Props) {
  const rudrakshas = [
    {
      mukhi: "1 Mukhi",
      element: "Creates Fire Element",
      effect: "Balances the effects of Surya (Sun)",
      image: "/images/rudraksha_1mukhi.png",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/40"
    },
    {
      mukhi: "2 Mukhi",
      element: "Creates Earth Element",
      effect: "Balances the effects of Chandra (Moon)",
      image: "/images/rudraksha_2mukhi.png",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/40"
    },
    {
      mukhi: "3 Mukhi",
      element: "Creates Fire Element",
      effect: "Balances the effects of Mangal (Mars)",
      image: "/images/rudraksha_3mukhi.png",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/40"
    },
    {
      mukhi: "4 Mukhi",
      element: "Creates Air Element",
      effect: "Balances the effects of Budh (Mercury)",
      image: "/images/rudraksha_4mukhi.png",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/40"
    },
    {
      mukhi: "5 Mukhi",
      element: "Creates Akash Element",
      effect: "Balances the effects of Guru (Jupiter)",
      image: "/images/rudraksha_5mukhi.png",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/40"
    },
    {
      mukhi: "6 Mukhi",
      element: "Creates Metal Element",
      effect: "Balances the effects of Shukra (Venus)",
      image: "/images/rudraksha_6mukhi.png",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/40"
    },
    {
      mukhi: "7 Mukhi",
      element: "Creates Water Element",
      effect: "Balances the effects of Shani (Saturn)",
      image: "/images/rudraksha_7mukhi.png",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/40"
    },
    {
      mukhi: "8 Mukhi",
      element: "Creates Wood Element",
      effect: "Balances the effects of Rahu",
      image: "/images/rudraksha_8mukhi.png",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/40"
    },
    {
      mukhi: "9 Mukhi",
      element: "Creates Metal Element",
      effect: "Balances the effects of Ketu",
      image: "/images/rudraksha_9mukhi.png",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/40"
    }
  ];

  return (
    <div className="bg-[#fffdf2] dark:bg-neutral-900 border-2 border-amber-800/30 rounded-3xl p-6 md:p-8 w-full max-w-5xl mx-auto my-6 shadow-xl space-y-8 text-black dark:text-white">
      
      {/* Premium Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white rounded-2xl p-6 md:p-8 shadow-md">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
            <polygon points="50,10 90,50 50,90 10,50" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-[var(--gold)]">
            Why Rudraksha is Mandatory?
          </h3>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm font-medium">
            <li className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
              <span>Naturally Creates Elements within the Body</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
              <span>Protects the Aura from Negative Planetary Effects</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
              <span>Attracts Positive Energy & Improves Mental Health</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
              <span>Anyone can wear without Restrictions</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Side-by-Side Rudrakshas Grid (2 per row with circular gold ring icon on left side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {rudrakshas.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-5 p-4 md:p-5 bg-white dark:bg-neutral-800 border-2 border-amber-200/80 dark:border-neutral-700/60 rounded-2xl hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            {/* Rudraksha Circle Image Container with Gold Halo Ring */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-amber-300 dark:border-amber-500/80 p-1 bg-gradient-to-tr from-amber-200 via-amber-100 to-amber-50 dark:from-amber-950 dark:via-neutral-800 dark:to-neutral-900 shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img 
                src={item.image} 
                alt={item.mukhi} 
                className="w-full h-full object-contain rounded-full" 
              />
            </div>

            {/* Info Box Details on Right Side */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${item.color}`}>
                  {item.mukhi}
                </span>
              </div>
              <h4 className="font-serif font-bold text-neutral-900 dark:text-amber-200 text-sm sm:text-base leading-tight">
                {item.element}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-gray-300 font-medium">
                {item.effect}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
