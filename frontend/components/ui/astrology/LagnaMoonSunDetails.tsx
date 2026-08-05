'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ZODIAC_SIGNS, ZODIAC_LORDS, getNakshatraAndPada } from '@/lib/astrologyEngine';

interface Props {
 data: any;
}

export function LagnaMoonSunDetails({ data }: Props) {
 /* Collapsible State (Preserved in comments for future activation):
 const [isOpen, setIsOpen] = useState(false);
 */

 if (!data || !data.output || !data.output[1]) return null;

 const rawPlanets = data.output[1];

 // 1. Ascendant / Lagna
 const ascData = rawPlanets['Ascendant'] || (data.output[0] && data.output[0]['0']) || { current_sign: 1, normDegree: 0 };
 const ascSignNum = ascData.current_sign || 1;
 const ascSignName = ZODIAC_SIGNS[ascSignNum - 1];
 const ascLord = ZODIAC_LORDS[ascSignNum];
 const ascDeg = ascData.normDegree ? `${Math.floor(ascData.normDegree)}° ${Math.floor((ascData.normDegree % 1) * 60)}'` : '0°';

 // 2. Moon
 const moonData = rawPlanets['Moon'] || { current_sign: 1, normDegree: 0 };
 const moonSignNum = moonData.current_sign || 1;
 const moonSignName = ZODIAC_SIGNS[moonSignNum - 1];
 const moonFullDeg = (moonSignNum - 1) * 30 + (moonData.normDegree || 0);
 const moonNak = getNakshatraAndPada(moonFullDeg);

 // 3. Sun
 const sunData = rawPlanets['Sun'] || { current_sign: 1, normDegree: 0 };
 const sunSignNum = sunData.current_sign || 1;
 const sunSignName = ZODIAC_SIGNS[sunSignNum - 1];

 return (
 <div className="w-full max-w-5xl mx-auto my-6 space-y-6">
 {/* Title Header */}
 <div 
 /* onClick={() => setIsOpen(!isOpen)} */
 className="bg-amber-700 text-gray-900 p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
 >
 <span className="text-xl">☀️</span>
 <h3 className="font-serif font-bold text-lg md:text-2xl">
 Lagna, Moon Sign & Sun Sign Analysis
 </h3>
 {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
 </div>

 {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'}`}> */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 
 {/* 🌅 Section 5: Lagna Details */}
 <div className="bg-amber-50/70 border-2 border-amber-800/30 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-4">
 <div className="border-b border-amber-800/20 pb-3 flex items-center gap-2">
 <span className="text-2xl">🌅</span>
 <div>
 <h4 className="font-serif font-bold text-amber-950 text-lg">
 Lagna (Ascendant)
 </h4>
 <p className="text-xs text-gray-500">Core Persona & Vitality</p>
 </div>
 </div>

 <div className="space-y-3 text-xs md:text-sm">
 <div className="flex justify-between items-center bg-white p-2.5 rounded-lg">
 <span className="text-gray-500">Ascendant Sign:</span>
 <span className="font-bold text-amber-950 ">{ascSignName}</span>
 </div>

 <div className="flex justify-between items-center bg-white p-2.5 rounded-lg">
 <span className="text-gray-500">Ascendant Degree:</span>
 <span className="font-mono font-bold">{ascDeg}</span>
 </div>

 <div className="flex justify-between items-center bg-white p-2.5 rounded-lg">
 <span className="text-gray-500">Lagna Lord:</span>
 <span className="font-bold text-amber-900 ">{ascLord}</span>
 </div>

 <div className="p-3 bg-amber-100/60 rounded-lg space-y-1">
 <span className="font-bold text-amber-950 block">Personality Analysis</span>
 <p className="text-gray-700 text-xs">
 As a {ascSignName} Ascendant, you approach life with determination, high ethical standards, and natural self-confidence.
 </p>
 </div>
 </div>
 </div>

 {/* 🌙 Section 6: Moon Details */}
 <div className="bg-blue-50/70 border-2 border-blue-800/30 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-4">
 <div className="border-b border-blue-800/20 pb-3 flex items-center gap-2">
 <span className="text-2xl">🌙</span>
 <div>
 <h4 className="font-serif font-bold text-blue-950 text-lg">
 Moon Details
 </h4>
 <p className="text-xs text-gray-500">Mind, Emotions & Intuition</p>
 </div>
 </div>

 <div className="space-y-3 text-xs md:text-sm">
 <div className="flex justify-between items-center bg-white p-2.5 rounded-lg">
 <span className="text-gray-500">Moon Sign (Rashi):</span>
 <span className="font-bold text-blue-950 ">{moonSignName}</span>
 </div>

 <div className="flex justify-between items-center bg-white p-2.5 rounded-lg">
 <span className="text-gray-500">Birth Nakshatra:</span>
 <span className="font-bold">{moonNak.name} (Pada {moonNak.pada})</span>
 </div>

 <div className="flex justify-between items-center bg-white p-2.5 rounded-lg">
 <span className="text-gray-500">Nakshatra Lord:</span>
 <span className="font-bold text-blue-900 ">{moonNak.lord}</span>
 </div>

 <div className="p-3 bg-blue-100/60 rounded-lg space-y-1">
 <span className="font-bold text-blue-950 block">Emotional Traits</span>
 <p className="text-gray-700 text-xs">
 Deeply imaginative and perceptive with strong motherly empathy and intuitive foresight.
 </p>
 </div>
 </div>
 </div>

 {/* ☀️ Section 7: Sun Details */}
 <div className="bg-orange-50/70 border-2 border-orange-800/30 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-4">
 <div className="border-b border-orange-800/20 pb-3 flex items-center gap-2">
 <span className="text-2xl">☀️</span>
 <div>
 <h4 className="font-serif font-bold text-orange-950 text-lg">
 Sun Details
 </h4>
 <p className="text-xs text-gray-500">Soul, Ego & Leadership</p>
 </div>
 </div>

 <div className="space-y-3 text-xs md:text-sm">
 <div className="flex justify-between items-center bg-white p-2.5 rounded-lg">
 <span className="text-gray-500">Sun Sign:</span>
 <span className="font-bold text-orange-950 ">{sunSignName}</span>
 </div>

 <div className="flex justify-between items-center bg-white p-2.5 rounded-lg">
 <span className="text-gray-500">Solar Strength:</span>
 <span className="font-bold text-emerald-700 ">Strong (Royal)</span>
 </div>

 <div className="flex justify-between items-center bg-white p-2.5 rounded-lg">
 <span className="text-gray-500">Career Indicator:</span>
 <span className="font-bold text-orange-900 ">Executive / Authority</span>
 </div>

 <div className="p-3 bg-orange-100/60 rounded-lg space-y-1">
 <span className="font-bold text-orange-950 block">Ego & Leadership</span>
 <p className="text-gray-700 text-xs">
 Natural authoritative presence; excels when taking ownership of key projects and mentoring others.
 </p>
 </div>
 </div>
 </div>

 </div>
 </div>
 );
}
