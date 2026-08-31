'use client';

import React, { useState } from 'react';
import { analyzeAspectsAndConjunctions } from '@/lib/aspectsAndConjunctions';

interface Props {
 data: any;
}

export function AspectsAndConjunctionsCard({ data }: Props) {
 const [filter, setFilter] = useState<'all' | 'aspects' | 'conjunctions'>('all');

 /* Collapsible State (Preserved in comments for future activation):
 const [isOpen, setIsOpen] = useState(false);
 */

 if (!data || !data.output || !data.output[1]) return null;

 const { aspects, conjunctions } = analyzeAspectsAndConjunctions(data);

 return (
 <div className="bg-amber-50/60 border-2 border-amber-200 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
 {/* Title Header */}
 <div 
 /* onClick={() => setIsOpen(!isOpen)} */
 className="bg-amber-700 text-gray-900 p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
 >
 <span className="text-xl">👁️</span>
 <h3 className="font-serif font-bold text-lg md:text-2xl">
 Planetary Aspects & Conjunction Analysis
 </h3>
 {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
 </div>

 {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} space-y-6`}> */}
 <div className="space-y-6">

 <div className="flex justify-center gap-3">
 <button
 onClick={() => setFilter('all')}
 className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
 filter === 'all' ? 'bg-amber-600 text-gray-900 shadow' : 'bg-amber-100 text-amber-950 '
 }`}
 >
 All Alignments
 </button>

 <button
 onClick={() => setFilter('aspects')}
 className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
 filter === 'aspects' ? 'bg-amber-600 text-gray-900 shadow' : 'bg-amber-100 text-amber-950 '
 }`}
 >
 Aspects ({aspects.length})
 </button>

 <button
 onClick={() => setFilter('conjunctions')}
 className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
 filter === 'conjunctions' ? 'bg-amber-600 text-gray-900 shadow' : 'bg-amber-100 text-amber-950 '
 }`}
 >
 Conjunctions ({conjunctions.length})
 </button>
 </div>

 {/* Conjunctions Section */}
 {(filter === 'all' || filter === 'conjunctions') && (
 <div className="bg-white border border-amber-300 rounded-xl p-5 space-y-4 shadow-sm">
 <h4 className="font-serif font-bold text-base md:text-lg text-amber-950 border-b pb-2">
 Planetary Conjunctions (Planets in Same House)
 </h4>

 {conjunctions.length === 0 ? (
 <p className="text-gray-500 text-xs">No multi-planet conjunctions detected in single houses.</p>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {conjunctions.map((conj, idx) => (
 <div key={idx} className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
 <div className="flex justify-between items-center border-b pb-2 border-amber-200 ">
 <span className="font-bold text-amber-950 text-sm">
 {conj.planets.join(' + ')}
 </span>
 <span className="px-2 py-0.5 bg-amber-200 text-amber-950 rounded text-xs font-bold">
 House {conj.houseNumber} ({conj.zodiacSign})
 </span>
 </div>

 <p className="text-xs text-gray-700 ">{conj.effects}</p>

 <div className="text-[11px] space-y-1 pt-1">
 <div className="text-emerald-800 font-semibold">
 ✓ Positive: {conj.positivePoints.join(' ')}
 </div>
 <div className="text-rose-800 font-semibold">
 ⚠ Caution: {conj.negativePoints.join(' ')}
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 )}

 {/* Aspects Section */}
 {(filter === 'all' || filter === 'aspects') && (
 <div className="bg-white border border-amber-300 rounded-xl p-5 space-y-4 shadow-sm overflow-x-auto">
 <h4 className="font-serif font-bold text-base md:text-lg text-amber-950 border-b pb-2">
 Planetary Aspects (Drishti Matrix)
 </h4>

 <table className="w-full text-left border-collapse text-[11px] sm:text-xs md:text-sm">
 <thead>
 <tr className="bg-amber-100 text-amber-950 font-bold border-b border-amber-300">
 <th className="px-2 py-2 sm:p-2.5">Aspecting Planet</th>
 <th className="px-2 py-2 sm:p-2.5">Target House / Planets</th>
 <th className="px-2 py-2 sm:p-2.5">Aspect Type</th>
 <th className="px-2 py-2 sm:p-2.5">Nature</th>
 <th className="px-2 py-2 sm:p-2.5">Description</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 font-medium">
 {aspects.slice(0, 15).map((asp, idx) => (
 <tr key={idx} className="hover:bg-amber-50 :bg-neutral-700/40">
 <td className="px-2 py-2 sm:p-2.5 font-bold text-amber-950 ">{asp.aspectingPlanet}</td>
 <td className="px-2 py-2 sm:p-2.5 font-semibold">{asp.targetPlanetOrHouse}</td>
 <td className="px-2 py-2 sm:p-2.5 font-mono text-[11px] sm:text-xs">{asp.aspectType}</td>
 <td className="px-2 py-2 sm:p-2.5">
 <span className={`px-1.5 py-0.5 rounded text-[10px] sm:text-xs ${
 asp.nature === 'Benefic' ? 'bg-emerald-200 text-emerald-950 font-bold' : 'bg-rose-200 text-rose-950 font-bold'
 }`}>
 {asp.nature}
 </span>
 </td>
 <td className="px-2 py-2 sm:p-2.5 text-gray-700 text-[11px] sm:text-xs">{asp.description}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </div>
 </div>
 );
}
