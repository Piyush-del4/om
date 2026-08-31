'use client';

import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface Props {
  data: any;
}

// KP Lord sequence order (Vimshottari order)
const KP_LORDS = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
const KP_DASHA_YEARS = [7, 20, 6, 10, 7, 18, 16, 19, 17]; // Total 120 years

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
  'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshta',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

const SIGN_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const SIGN_LORDS = [
  'Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury',
  'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'
];

// Helper to calculate Nakshatra, Star Lord, Sub Lord from full absolute degree (0 - 360)
function calculateKpDetails(deg: number) {
  const normalizedDeg = ((deg % 360) + 360) % 360;
  
  // Sign details
  const signIndex = Math.floor(normalizedDeg / 30);
  const signName = SIGN_NAMES[signIndex];
  const signLord = SIGN_LORDS[signIndex];
  const degInSign = normalizedDeg % 30;

  // Nakshatra details (Each Nakshatra = 13°20' = 13.333333°)
  const nakshatraIndex = Math.floor(normalizedDeg / (40 / 3));
  const nakshatraName = NAKSHATRAS[nakshatraIndex % 27];
  
  // Star Lord (Ruling planet of Nakshatra)
  const starLordIndex = nakshatraIndex % 9;
  const starLord = KP_LORDS[starLordIndex];

  // Degree within Nakshatra (0 to 13.333333°)
  const degInNakshatra = normalizedDeg - (nakshatraIndex * (40 / 3));
  const fractionInNakshatra = degInNakshatra / (40 / 3);

  // Sub Lord calculation
  // The Sub Lord division within a nakshatra starts from the Nakshatra Star Lord
  let currentAccumulatedFraction = 0;
  let subLord = starLord;
  let subSubLord = starLord;

  for (let i = 0; i < 9; i++) {
    const lordIdx = (starLordIndex + i) % 9;
    const lordYears = KP_DASHA_YEARS[lordIdx];
    const lordFraction = lordYears / 120;
    
    if (fractionInNakshatra >= currentAccumulatedFraction && fractionInNakshatra < currentAccumulatedFraction + lordFraction) {
      subLord = KP_LORDS[lordIdx];

      // Sub-sub lord inside sub lord
      const subFraction = (fractionInNakshatra - currentAccumulatedFraction) / lordFraction;
      let currentSubSubAccum = 0;
      for (let j = 0; j < 9; j++) {
        const ssLordIdx = (lordIdx + j) % 9;
        const ssYears = KP_DASHA_YEARS[ssLordIdx];
        const ssFraction = ssYears / 120;
        if (subFraction >= currentSubSubAccum && subFraction < currentSubSubAccum + ssFraction) {
          subSubLord = KP_LORDS[ssLordIdx];
          break;
        }
        currentSubSubAccum += ssFraction;
      }
      break;
    }
    currentAccumulatedFraction += lordFraction;
  }

  const degFloor = Math.floor(degInSign);
  const minFloor = Math.floor((degInSign - degFloor) * 60);

  return {
    signName,
    signLord,
    formattedDeg: `${degFloor}° ${minFloor.toString().padStart(2, '0')}'`,
    nakshatraName,
    starLord,
    subLord,
    subSubLord
  };
}

export function KpAstrologySystemCard({ data }: Props) {
  if (!data) return null;

  // Extract planet positions from API data output
  const rawPlanets = data.output?.[1] || data.output || {};
  const planetList = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

  const kpPlanets = planetList.map((pName) => {
    const pData = rawPlanets[pName] || {};
    const fullDeg = pData.fullDegree ?? (pData.current_sign ? (pData.current_sign - 1) * 30 + (pData.normDegree || 15) : 0);
    const kp = calculateKpDetails(fullDeg);
    const houseNum = pData.house_number || 1;

    return {
      name: pName,
      fullDeg,
      houseNum,
      ...kp
    };
  });

  // Key Significators Summary (KP House Groupings)
  const careerSignificators = kpPlanets.filter(p => [10, 2, 6, 11].includes(p.houseNum)).map(p => p.name).join(', ') || 'Sun, Jupiter';
  const marriageSignificators = kpPlanets.filter(p => [7, 2, 11].includes(p.houseNum)).map(p => p.name).join(', ') || 'Venus, Jupiter';
  const wealthSignificators = kpPlanets.filter(p => [2, 11, 5, 9].includes(p.houseNum)).map(p => p.name).join(', ') || 'Jupiter, Mercury';

  return (
    <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 md:p-8 w-full max-w-full mx-auto my-6 shadow-xl space-y-8 text-black">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 text-white rounded-2xl p-6 md:p-8 shadow-md">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Krishnamurti Paddhati System</span>
          </div>
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-[var(--gold)]">
            KP Astrology System Analysis
          </h3>
          <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed max-w-3xl">
            KP Astrology (Krishnamurti Paddhati) offers pinpoint accuracy by focusing on <strong>Star Lords (Nakshatra Lords)</strong> and <strong>Sub Lords</strong>. While sign lords indicate probability, the <strong>Sub Lord</strong> decides the actual event outcome.
          </p>
        </div>
      </div>

      {/* KP Planetary Details Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <h4 className="font-sans font-bold text-lg md:text-xl text-amber-950 flex items-center gap-2">
            <span>✦</span> KP Planetary Star & Sub-Lord Table
          </h4>
          <span className="text-xs text-amber-900 font-mono bg-amber-100 px-3 py-1 rounded-full font-semibold">
            9 Planets + Sub Lords
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-amber-200 shadow-xs">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-amber-100/80 text-amber-950 font-bold uppercase text-[11px] tracking-wider border-b border-amber-300">
              <tr>
                <th className="py-3 px-4">Planet</th>
                <th className="py-3 px-4">Sign</th>
                <th className="py-3 px-4">Degree</th>
                <th className="py-3 px-4">Sign Lord</th>
                <th className="py-3 px-4">Star (Nakshatra) Lord</th>
                <th className="py-3 px-4 bg-amber-200/70 text-amber-950">Sub Lord (Event Determinant)</th>
                <th className="py-3 px-4">Sub-Sub Lord</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 bg-white">
              {kpPlanets.map((p, idx) => (
                <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-neutral-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    {p.name}
                  </td>
                  <td className="py-3 px-4 text-neutral-700">{p.signName}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-amber-900">{p.formattedDeg}</td>
                  <td className="py-3 px-4 text-neutral-700">{p.signLord}</td>
                  <td className="py-3 px-4 text-neutral-800 font-medium">{p.starLord}</td>
                  <td className="py-3 px-4 font-bold text-amber-950 bg-amber-100/50 border-x border-amber-200">
                    <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 text-xs shadow-xs">
                      {p.subLord}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-600">{p.subSubLord}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>



      {/* KP Key Life Event Significators Summary */}
      <div className="bg-gradient-to-r from-amber-100/70 via-amber-50 to-amber-100/70 border-2 border-amber-300 rounded-2xl p-5 md:p-6 space-y-4 shadow-xs">
        <h4 className="font-sans font-bold text-base md:text-lg text-amber-950 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-700" />
          KP Key Life Significators Summary
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
          <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-1">
            <span className="font-bold text-amber-900 block uppercase text-[11px] tracking-wider">💼 Career & Profession (Houses 2, 6, 10, 11)</span>
            <p className="text-neutral-800 font-medium leading-relaxed">{careerSignificators}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-1">
            <span className="font-bold text-amber-900 block uppercase text-[11px] tracking-wider">💍 Marriage & Relationship (Houses 2, 7, 11)</span>
            <p className="text-neutral-800 font-medium leading-relaxed">{marriageSignificators}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-1">
            <span className="font-bold text-amber-900 block uppercase text-[11px] tracking-wider">💰 Wealth & Prosperity (Houses 2, 5, 9, 11)</span>
            <p className="text-neutral-800 font-medium leading-relaxed">{wealthSignificators}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
