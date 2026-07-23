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
      color: "border-orange-500/30 text-orange-500 bg-orange-500/10"
    },
    {
      mukhi: "2 Mukhi",
      element: "Creates Earth Element",
      effect: "Balances the effects of Chandra (Moon)",
      image: "/images/rudraksha_2mukhi.png",
      color: "border-amber-500/30 text-amber-500 bg-amber-500/10"
    },
    {
      mukhi: "3 Mukhi",
      element: "Creates Fire Element",
      effect: "Balances the effects of Mangal (Mars)",
      image: "/images/rudraksha_3mukhi.png",
      color: "border-red-500/30 text-red-500 bg-red-500/10"
    },
    {
      mukhi: "4 Mukhi",
      element: "Creates Air Element",
      effect: "Balances the effects of Budh (Mercury)",
      image: "/images/rudraksha_4mukhi.png",
      color: "border-green-500/30 text-green-500 bg-green-500/10"
    },
    {
      mukhi: "5 Mukhi",
      element: "Creates Akash (Ether) Element",
      effect: "Balances the effects of Guru (Jupiter)",
      image: "/images/rudraksha_5mukhi.png",
      color: "border-yellow-500/30 text-yellow-500 bg-yellow-500/10"
    },
    {
      mukhi: "6 Mukhi",
      element: "Creates Metal Element",
      effect: "Balances the effects of Shukra (Venus)",
      image: "/images/rudraksha_6mukhi.png",
      color: "border-pink-500/30 text-pink-500 bg-pink-500/10"
    },
    {
      mukhi: "7 Mukhi",
      element: "Creates Water Element",
      effect: "Balances the effects of Shani (Saturn)",
      image: "/images/rudraksha_7mukhi.png",
      color: "border-blue-500/30 text-blue-500 bg-blue-500/10"
    },
    {
      mukhi: "8 Mukhi",
      element: "Creates Wood Element",
      effect: "Balances the effects of Rahu",
      image: "/images/rudraksha_8mukhi.png",
      color: "border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
    },
    {
      mukhi: "9 Mukhi",
      element: "Creates Metal Element",
      effect: "Balances the effects of Ketu",
      image: "/images/rudraksha_9mukhi.png",
      color: "border-purple-500/30 text-purple-500 bg-purple-500/10"
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

      {/* Rudrakshas Grid Layout (1 Mukhi to 9 Mukhi) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
        {rudrakshas.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 border-2 border-amber-100 dark:border-neutral-700/50 rounded-2xl hover:border-amber-300 dark:hover:border-amber-600/50 transition-all duration-300 shadow-sm group"
          >
            {/* Rudraksha Seed Circle Image Container */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-tr from-amber-100 to-amber-50 dark:from-neutral-700 dark:to-neutral-900 flex-shrink-0 border-2 border-amber-300/40 p-1 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-inner">
              <img 
                src={item.image} 
                alt={item.mukhi} 
                className="w-full h-full object-contain rounded-full" 
              />
            </div>

            {/* Info details */}
            <div className="space-y-1 flex-1 min-w-0">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${item.color}`}>
                {item.mukhi}
              </span>
              <h4 className="font-bold text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm truncate">
                {item.element}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-gray-400 font-medium leading-tight">
                {item.effect}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
