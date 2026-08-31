'use client';

import React from 'react';
import { Users } from 'lucide-react';

interface PlanetRelation {
  id: number;
  planetHindi: string;
  planetEnglish: string;
  symbol: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  relationsHindi: string;
}

const PLANET_RELATIONS: PlanetRelation[] = [
  {
    id: 10,
    planetHindi: 'सूर्य देव',
    planetEnglish: 'Surya (Sun)',
    symbol: '☀️',
    icon: '/images/planets/sun.png?v=5',
    colorClass: 'text-amber-700',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-300',
    relationsHindi: 'पिता, दादा, ताऊ, पिता तुल्य व्यक्ति आदि ।',
  },
  {
    id: 11,
    planetHindi: 'चंद्र देव',
    planetEnglish: 'Chandra (Moon)',
    symbol: '🌙',
    icon: '/images/planets/moon.png?v=5',
    colorClass: 'text-sky-800',
    bgClass: 'bg-sky-50',
    borderClass: 'border-sky-200',
    relationsHindi: 'माता, चाची, ताई या घर की बड़ी उम्र की महिलाएं, माता तुल्य स्त्रियाँ आदि ।',
  },
  {
    id: 12,
    planetHindi: 'मंगल देव',
    planetEnglish: 'Mangal (Mars)',
    symbol: '🔴',
    icon: '/images/planets/mars.png?v=5',
    colorClass: 'text-red-700',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
    relationsHindi: 'छोटा भाई, छोटा भाई तुल्य व्यक्ति, मित्रों के छोटे भाई आदि ।',
  },
  {
    id: 13,
    planetHindi: 'बुध देव',
    planetEnglish: 'Budh (Mercury)',
    symbol: '🟢',
    icon: '/images/planets/mercury.png?v=5',
    colorClass: 'text-emerald-800',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    relationsHindi: 'कंजक देवी (छोटी उम्र की कन्यायें), छोटी बहनें, मौसी, मामी, बुआ, घर की बेटियां, बहनें, अड़ोस-पड़ोस की स्त्रियाँ, बहन तथा बेटी तुल्य महिलाएं आदि ।',
  },
  {
    id: 14,
    planetHindi: 'बृहस्पति देव',
    planetEnglish: 'Brihaspati / Guru (Jupiter)',
    symbol: '🟡',
    icon: '/images/planets/jupiter.png?v=5',
    colorClass: 'text-amber-900',
    bgClass: 'bg-amber-100/60',
    borderClass: 'border-amber-400',
    relationsHindi: 'गुरु, अध्यापक, धार्मिक प्रवचनकर्ता, शिक्षा देने वाले व्यक्ति, बड़ा भाई, पुत्र, पति, मित्रों के बड़े भाई, शिक्षित बुजुर्ग आदि ।',
  },
  {
    id: 15,
    planetHindi: 'शुक्र देव',
    planetEnglish: 'Shukra (Venus)',
    symbol: '✨',
    icon: '/images/planets/venus.png?v=5',
    colorClass: 'text-rose-700',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-200',
    relationsHindi: 'प्रेमी-प्रेमिका का सम्बन्ध, पति-पत्नी का रिश्ता, कलाकार आदि ।',
  },
  {
    id: 16,
    planetHindi: 'शनि देव',
    planetEnglish: 'Shani (Saturn)',
    symbol: '🪐',
    icon: '/images/planets/saturn.png?v=5',
    colorClass: 'text-indigo-900',
    bgClass: 'bg-indigo-50',
    borderClass: 'border-indigo-200',
    relationsHindi: 'कामवाली, झाड़ूवाली, कचरेवाली, भिखारी, नौकरीपेशा आदि ।',
  },
  {
    id: 17,
    planetHindi: 'राहु देव',
    planetEnglish: 'Rahu (North Node)',
    symbol: '🌌',
    icon: '/images/planets/rahu.png?v=5',
    colorClass: 'text-purple-900',
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-200',
    relationsHindi: 'अपंग व्यक्ति, कोढ़ी, वृद्ध भिखारी, अस्वस्थ व्यक्ति, शराबी, जुआरी, किसी भी प्रकार का नशा करने वाला आदि ।',
  },
  {
    id: 18,
    planetHindi: 'केतु देव',
    planetEnglish: 'Ketu (South Node)',
    symbol: '☄️',
    icon: '/images/planets/ketu.png?v=5',
    colorClass: 'text-orange-900',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    relationsHindi: 'नानका परिवार, समाज का त्याग कर चुके साधु-संत, घर का पालतू कुत्ता आदि ।',
  },
];

export function PlanetaryRelationshipsCard() {
  return (
    <div className="pdf-page-break-avoid bg-white rounded-2xl p-4 sm:p-6 w-full max-w-4xl mx-auto my-8 border border-amber-300 shadow-md space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white p-4 rounded-xl text-center shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Users className="w-5 h-5 text-amber-200" />
          <h3 className="font-sans font-bold text-lg md:text-2xl text-white">
            ग्रहों से सम्बद्धित रिश्तों का विश्लेषण
          </h3>
        </div>
        <p className="text-amber-100 text-xs md:text-sm font-medium">
          (Analysis of Relationships Associated with Planets / Grahas)
        </p>
      </div>

      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed text-center max-w-3xl mx-auto px-2">
        वैदिक ज्योतिष में प्रत्येक ग्रह जीवन के विशिष्ट रिश्तों, व्यक्तियों और सामाजिक संबंधों का प्रतिनिधित्व करता है। 
        दशा काल के दौरान संबंधित ग्रह से जुड़े रिश्तों का ध्यान रखना तथा उनका आदर करना ग्रह शांति व शुभ फल हेतु आवश्यक माना जाता है।
      </p>

      {/* Styled Table Format for Clean PDF and Web Viewing */}
      <div className="overflow-hidden rounded-xl border border-amber-200 shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-amber-600 text-white font-bold text-xs sm:text-sm">
              <th className="p-3 border-b border-amber-500 w-48 sm:w-56">ग्रह (Planet)</th>
              <th className="p-3 border-b border-amber-500">सम्बद्धित रिश्ते व व्यक्ति (Associated Relationships & Persons)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100 text-xs sm:text-sm">
            {PLANET_RELATIONS.map((item) => (
              <tr key={item.id} className="hover:bg-amber-50/60 transition-colors bg-white">
                <td className="p-3 align-top">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg">{item.symbol}</span>
                    <div>
                      <div className={`font-bold ${item.colorClass} text-xs sm:text-sm leading-snug`}>
                        {item.planetHindi}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        {item.planetEnglish}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3 font-medium text-neutral-900 leading-relaxed align-top">
                  {item.relationsHindi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
