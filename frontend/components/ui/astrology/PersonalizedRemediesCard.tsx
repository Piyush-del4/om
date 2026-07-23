'use client';

import React from 'react';
import { Shield, Sparkles, Heart, Activity } from 'lucide-react';

interface Props {
  data: any;
  birthDateStr?: string; // YYYY-MM-DD passed from form state
}

export function PersonalizedRemediesCard({ data, birthDateStr }: Props) {
  // If date of birth is not present, return null
  if (!birthDateStr) return null;

  // Calculate Lo Shu Grid digits (exactly matching LoShuGrid calculation logic)
  const cleanDigits = birthDateStr.replace(/[^1-9]/g, '').split('');
  const parts = birthDateStr.split('-');
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
  
  // Set of numbers present in the Lo Shu Grid
  const presentNumbers = new Set(allDigits.map(d => parseInt(d)).filter(n => n >= 1 && n <= 9));

  // Determine missing numbers (1 to 9)
  const missingNumbers: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (!presentNumbers.has(i)) {
      missingNumbers.push(i);
    }
  }

  // All potential remedies mapped to missing numbers
  const allRemediesMap: Record<number, {
    mukhi: string;
    element: string;
    effect: string;
    image: string;
    color: string;
  }> = {
    1: {
      mukhi: "1 Mukhi",
      element: "Creates Fire Element (Missing Number 1)",
      effect: "Balances the effects of Surya (Sun)",
      image: "/images/rudraksha_1mukhi.png",
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-400/40"
    },
    2: {
      mukhi: "2 Mukhi",
      element: "Creates Earth Element (Missing Number 2)",
      effect: "Balances the effects of Chandra (Moon)",
      image: "/images/rudraksha_2mukhi.png",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/40"
    },
    3: {
      mukhi: "5 Mukhi",
      element: "Creates Akash (Ether) Element (Missing Number 3)",
      effect: "Balances the effects of Guru (Jupiter)",
      image: "/images/rudraksha_5mukhi.png",
      color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-400/40"
    },
    4: {
      mukhi: "8 Mukhi",
      element: "Creates Wood Element (Missing Number 4)",
      effect: "Balances the effects of Rahu",
      image: "/images/rudraksha_8mukhi.png",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-400/40"
    },
    5: {
      mukhi: "4 Mukhi",
      element: "Creates Air Element (Missing Number 5)",
      effect: "Balances the effects of Budh (Mercury)",
      image: "/images/rudraksha_4mukhi.png",
      color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-400/40"
    },
    6: {
      mukhi: "6 Mukhi",
      element: "Creates Metal Element (Missing Number 6)",
      effect: "Balances the effects of Shukra (Venus)",
      image: "/images/rudraksha_6mukhi.png",
      color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-400/40"
    },
    7: {
      mukhi: "9 Mukhi",
      element: "Creates Metal Element (Missing Number 7)",
      effect: "Balances the effects of Ketu",
      image: "/images/rudraksha_9mukhi.png",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-400/40"
    },
    8: {
      mukhi: "7 Mukhi",
      element: "Creates Water Element (Missing Number 8)",
      effect: "Balances the effects of Shani (Saturn)",
      image: "/images/rudraksha_7mukhi.png",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-400/40"
    },
    9: {
      mukhi: "3 Mukhi",
      element: "Creates Fire Element (Missing Number 9)",
      effect: "Balances the effects of Mangal (Mars)",
      image: "/images/rudraksha_3mukhi.png",
      color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-400/40"
    }
  };

  // Filter list of remedies to only those missing
  const activeRemedies = missingNumbers.map(num => allRemediesMap[num]).filter(Boolean);

  return (
    <div className="bg-white dark:bg-neutral-900 border-2 border-amber-800/30 rounded-3xl p-6 md:p-8 w-full max-w-full mx-auto my-6 shadow-xl space-y-8 text-black dark:text-white">
      
      {/* Premium Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white rounded-2xl p-6 md:p-8 shadow-md">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
            <polygon points="50,10 90,50 50,90 10,50" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <h3 className="font-sans font-bold text-2xl md:text-3xl text-[var(--gold)]">
            Why Rudraksha is Mandatory?
          </h3>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm font-medium text-amber-50">
            <li className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-amber-300 flex-shrink-0" />
              <span>Naturally Creates Elements within the Body</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-amber-300 flex-shrink-0" />
              <span>Protects the Aura from Negative Planetary Effects</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-amber-300 flex-shrink-0" />
              <span>Attracts Positive Energy & Improves Mental Health</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0" />
              <span>Anyone can wear without Restrictions</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-sans font-bold text-lg md:text-xl text-amber-900 dark:text-[var(--gold)]">
          Recommended Rudraksha Remedies for Missing Numbers
        </h4>
        <p className="text-xs md:text-sm text-neutral-600 dark:text-gray-400">
          Based on your birth date, we identified the missing numbers in your Birth Lo Shu Grid and recommended the corresponding Rudraksha bead remedies to balance your cosmic vibrations.
        </p>
      </div>

      {/* Side-by-Side Rudrakshas Grid (Filtered Dynamically) */}
      {activeRemedies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {activeRemedies.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-5 p-4 md:p-5 bg-white dark:bg-neutral-800 border-2 border-amber-200/80 dark:border-neutral-700/60 rounded-2xl hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md group animate-fadeIn"
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
                <h4 className="font-sans font-bold text-neutral-900 dark:text-amber-200 text-sm sm:text-base leading-tight">
                  {item.element}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-gray-300 font-medium">
                  {item.effect}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-amber-50 dark:bg-neutral-800 border border-amber-300 dark:border-neutral-750 p-6 rounded-2xl text-center space-y-2">
          <Sparkles className="w-8 h-8 text-[var(--gold)] mx-auto animate-pulse" />
          <h5 className="font-sans font-bold text-base text-amber-950 dark:text-amber-300">
            Perfect Lo Shu Grid!
          </h5>
          <p className="text-xs sm:text-sm text-neutral-650 dark:text-gray-300 max-w-lg mx-auto">
            Your birth date contains all numbers (1-9) in the Lo Shu Grid. No missing element Rudraksha remedies are required. For general aura protection and wellness, we recommend wearing a standard <strong>5 Mukhi Rudraksha</strong>.
          </p>
        </div>
      )}

      {/* Planetary Mantra Remedies Section */}
      <div className="pt-8 border-t border-amber-200/50 dark:border-neutral-800 space-y-6">
        <div className="space-y-2">
          <h4 className="font-sans font-bold text-lg md:text-xl text-amber-900 dark:text-[var(--gold)]">
            ✦ वैदिक ग्रह मंत्र (Planetary Mantra Remedies) ✦
          </h4>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-gray-400">
            वैदिक ज्योतिष में ग्रहों की अनुकूलता और उनके शुभ प्रभाव प्राप्त करने के लिए नियमित रूप से ग्रह मंत्रों का जाप करना सर्वश्रेष्ठ माना जाता है। (In Vedic astrology, chanting planet mantras regularly is considered the best way to harmonize planetary energies and receive positive outcomes.)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { planet: 'सूर्य (रविवार)', sanskrit: 'ॐ घृणिः सूर्याय नमः', english: 'Om Ghrini Suryaya Namah', color: 'border-orange-500/20 bg-orange-50/30 text-orange-950 dark:text-orange-300' },
            { planet: 'चन्द्र (सोमवार)', sanskrit: 'ॐ सो सोमाय नमः', english: 'Om Som Somaya Namah', color: 'border-blue-400/20 bg-blue-50/30 text-blue-950 dark:text-blue-300' },
            { planet: 'मंगल (मंगलवार)', sanskrit: 'ॐ अंग अंगारकाय नमः', english: 'Om Ang Angarkaya Namah', color: 'border-red-500/20 bg-red-50/30 text-red-950 dark:text-red-300' },
            { planet: 'बुध (बुधवार)', sanskrit: 'ॐ बुं बुधाय नमः', english: 'Om Bum Budhaya Namah', color: 'border-emerald-500/20 bg-emerald-50/30 text-emerald-950 dark:text-emerald-300' },
            { planet: 'गुरु/बृहस्पति (गुरुवार)', sanskrit: 'ॐ ब्रहम् वृहस्पतेय नमः', english: 'Om Braham Brihaspataye Namah', color: 'border-yellow-500/20 bg-yellow-50/30 text-yellow-950 dark:text-yellow-300' },
            { planet: 'शुक्र (शुक्रवार)', sanskrit: 'ॐ गुं शुक्राय नमः', english: 'Om Shum Shukraya Namah', color: 'border-teal-500/20 bg-teal-50/30 text-teal-950 dark:text-teal-300' },
            { planet: 'शनि (शनिवार)', sanskrit: 'ॐ शं शनैश्चराय नमः', english: 'Om Shan Shanaishcharaya Namah', color: 'border-slate-500/20 bg-slate-50/30 text-slate-950 dark:text-slate-300' },
            { planet: 'राहु', sanskrit: 'ॐ रां राहवे नमः', english: 'Om Ram Rahave Namah', color: 'border-purple-500/20 bg-purple-50/30 text-purple-950 dark:text-purple-300' },
            { planet: 'केतु', sanskrit: 'ॐ के केतवे नमः', english: 'Om Kem Ketave Namah', color: 'border-pink-500/20 bg-pink-50/30 text-pink-950 dark:text-pink-300' }
          ].map((m, idx) => (
            <div key={idx} className={`p-4 border rounded-2xl flex flex-col justify-between space-y-2 shadow-xs transition-transform hover:scale-[1.02] duration-300 bg-white dark:bg-neutral-800 ${m.color}`}>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wide opacity-80">{m.planet}</span>
                <p className="text-base font-bold font-sans mt-1.5 leading-snug">{m.sanskrit}</p>
              </div>
              <p className="text-xs font-semibold italic opacity-85 font-sans leading-tight pt-1 border-t border-black/5 dark:border-white/5">{m.english}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
