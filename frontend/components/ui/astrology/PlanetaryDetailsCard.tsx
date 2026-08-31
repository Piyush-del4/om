'use client';

import React from 'react';
import { getDetailedPlanets, PlanetaryDetails, NAKSHATRA_LORDS } from '@/lib/astrologyEngine';

interface Props {
 data: any;
}

export function PlanetaryDetailsCard({ data }: Props) {
 /* Collapsible State (Preserved in comments for future activation):
 const [isOpen, setIsOpen] = useState(false);
 */

 if (!data || !data.output || !data.output[1]) return null;

 const planets: PlanetaryDetails[] = getDetailedPlanets(data.output[1]);

 return (
 <div className="bg-amber-50/60 border-2 border-amber-200 rounded-2xl overflow-hidden w-full max-w-5xl mx-auto my-6 shadow-lg">
 <div 
 /* onClick={() => setIsOpen(!isOpen)} */
 className="bg-amber-700 text-gray-900 p-4 text-center flex items-center justify-center gap-2 select-none"
 >
 <div className="flex items-center gap-2 mx-auto">
 <span className="text-xl">🪐</span>
 <h3 className="font-sans font-bold text-lg md:text-2xl">
 Detailed Planetary Positions & Dignities
 </h3>
 </div>
 {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
 </div>

 {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} p-2 sm:p-4 overflow-x-auto`}> */}
 <div className="p-2 sm:p-4 overflow-x-auto">
 <table className="w-full text-left border-collapse text-[11px] sm:text-xs md:text-sm">
 <thead>
 <tr className="bg-amber-200/80 text-amber-950 font-bold border-b border-amber-200">
 <th className="px-2 py-2 sm:p-2.5">Planet</th>
 <th className="px-2 py-2 sm:p-2.5">Zodiac Sign</th>
 <th className="px-2 py-2 sm:p-2.5 text-center">House</th>
 <th className="px-2 py-2 sm:p-2.5">Nakshatra</th>
 <th className="px-2 py-2 sm:p-2.5">Sign Relation</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-amber-800/20 font-medium text-neutral-900 ">
 {planets.map((p) => {
 let badgeColor = 'bg-gray-200 text-gray-800 ';
 if (p.relationSign === 'Exalted') badgeColor = 'bg-amber-400 text-amber-950 font-bold';
 else if (p.relationSign === 'Debilitated') badgeColor = 'bg-rose-300 text-rose-950 font-bold';
 else if (p.relationSign === 'Own') badgeColor = 'bg-emerald-300 text-emerald-950 font-bold';
 else if (p.relationSign === 'Friend') badgeColor = 'bg-blue-200 text-blue-900 font-bold';
 else if (p.relationSign === 'Enemy') badgeColor = 'bg-orange-200 text-orange-950';

 return (
 <tr key={p.name} className="hover:bg-amber-100/50 :bg-gray-200/50 transition-colors">
 <td className="px-2 py-2 sm:p-2.5 font-bold text-amber-950 ">
 <div className="flex items-center gap-1">
 <span>{p.name}</span>
 {p.isRetro && (
 <span className="px-1 py-0.2 rounded text-[9px] bg-rose-500 text-gray-900 font-extrabold" title="Retrograde">
 (R)
 </span>
 )}
 </div>
 <div className="text-[10px] sm:text-xs font-mono font-normal text-amber-800 ">
 ({p.degree})
 </div>
 </td>
 <td className="px-2 py-2 sm:p-2.5 font-semibold">{p.zodiacSign}</td>
 <td className="px-2 py-2 sm:p-2.5 font-bold text-center">{p.house}</td>
 <td className="px-2 py-2 sm:p-2.5">
 <span className="font-medium text-amber-900 ">{p.nakshatra}</span>
 <span className="text-black text-xs sm:text-sm block sm:inline"> ({NAKSHATRA_LORDS[p.nakshatraNumber - 1] || 'Ketu'})</span>
 </td>
 <td className="px-2 py-2 sm:p-2.5">
 <span className={`px-1.5 py-0.5 rounded text-[10px] sm:text-xs ${badgeColor}`}>
 {p.relationSign}
 </span>
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
