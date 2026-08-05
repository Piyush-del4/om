'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { calculateAshtakavarga, AshtakavargaData } from '@/lib/ashtakavargaCalculator';

interface Props {
 data: any;
}

export function AshtakavargaTable({ data }: Props) {
 /* Collapsible State (Preserved in comments for future activation):
 const [isOpen, setIsOpen] = useState(false);
 */

 if (!data || !data.output || !data.output[1]) return null;

 const av: AshtakavargaData = calculateAshtakavarga(data);
 const main7 = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

 return (
 <div className="bg-amber-50/60 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
 {/* Title Header */}
 <div 
 /* onClick={() => setIsOpen(!isOpen)} */
 className="bg-amber-700 text-gray-900 p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
 >
 <span className="text-xl">📊</span>
 <h3 className="font-serif font-bold text-lg md:text-2xl">
 Ashtakavarga Analysis (Bhinnashtakavarga & Sarvashtakavarga)
 </h3>
 {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
 </div>

 {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} space-y-6`}> */}
 <div className="space-y-6">

 {/* Sarvashtakavarga (SAV) Summary Cards */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
 <div className="p-3 bg-white border border-amber-300 rounded-xl text-center">
 <span className="text-gray-500 block text-xs">Total SAV Points</span>
 <span className="font-bold text-xl text-amber-950 ">337 Bindus</span>
 </div>

 <div className="p-3 bg-white border border-amber-300 rounded-xl text-center">
 <span className="text-gray-500 block text-xs">Average Per House</span>
 <span className="font-bold text-xl text-amber-950 ">28.0 Bindus</span>
 </div>

 <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center">
 <span className="text-emerald-800 block text-xs font-semibold">Strongest House</span>
 <span className="font-bold text-xl text-emerald-900 ">
 House {av.strongestHouse} ({av.sav[av.strongestHouse - 1]} Bindus)
 </span>
 </div>

 <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-center">
 <span className="text-rose-800 block text-xs font-semibold">Weakest House</span>
 <span className="font-bold text-xl text-rose-900 ">
 House {av.weakestHouse} ({av.sav[av.weakestHouse - 1]} Bindus)
 </span>
 </div>
 </div>

 {/* SAV House Score Graph */}
 <div className="bg-white border border-amber-300 rounded-xl p-5 space-y-3 shadow-sm">
 <h4 className="font-serif font-bold text-base text-amber-950 border-b pb-2">
 Sarvashtakavarga (SAV) House Scores Distribution
 </h4>

 <div className="grid grid-cols-12 gap-1.5 pt-2 items-end h-40">
 {av.sav.map((score, idx) => {
 const hNum = idx + 1;
 const heightPct = Math.min(100, Math.max(15, (score / 45) * 100));
 const isStrong = score >= 28;

 return (
 <div key={hNum} className="flex flex-col items-center gap-1 h-full justify-end">
 <span className="text-[10px] font-mono font-bold text-amber-900 ">
 {score}
 </span>

 <div
 style={{ height: `${heightPct}%` }}
 className={`w-full rounded-t-md transition-all ${
 isStrong
 ? 'bg-emerald-500 hover:bg-emerald-400'
 : 'bg-rose-400 hover:bg-rose-300'
 }`}
 title={`House ${hNum}: ${score} Bindus (${isStrong ? 'Strong' : 'Needs Strength'})`}
 />

 <span className="text-[10px] font-bold text-gray-600 ">
 H{hNum}
 </span>
 </div>
 );
 })}
 </div>
 <p className="text-[11px] text-gray-500 text-center pt-2">
 ★ Benchmark: ≥ 28 Bindus = Strong House | &lt; 25 Bindus = Requires Remedies
 </p>
 </div>

 {/* Bhinnashtakavarga (BAV) 7 x 12 Matrix */}
 <div className="bg-white border border-amber-300 rounded-xl p-5 space-y-3 shadow-sm overflow-x-auto">
 <h4 className="font-serif font-bold text-base text-amber-950 border-b pb-2">
 Bhinnashtakavarga (BAV) Matrix (Points Per Planet Per House)
 </h4>

 <table className="w-full text-center border-collapse text-[10px] sm:text-xs md:text-sm">
 <thead>
 <tr className="bg-amber-100 text-amber-950 font-bold border-b border-amber-300">
 <th className="px-1.5 py-1.5 sm:p-2 text-left">Planet</th>
 {Array.from({ length: 12 }, (_, i) => (
 <th key={i} className="px-1 py-1.5 sm:p-2">H{i + 1}</th>
 ))}
 <th className="px-1 py-1.5 sm:p-2 bg-amber-200 text-amber-950 ">Total</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 font-medium">
 {main7.map((planet) => {
 const scores = av.bav[planet] || new Array(12).fill(4);
 const total = av.planetTotalScores[planet] || 48;

 return (
 <tr key={planet} className="hover:bg-amber-50 :bg-neutral-700/40">
 <td className="px-1.5 py-1.5 sm:p-2 font-bold text-left text-amber-950 ">{planet}</td>
 {scores.map((score, hIdx) => (
 <td
 key={hIdx}
 className={`px-1 py-1.5 sm:p-2 font-mono ${
 score >= 5 ? 'font-bold text-emerald-700 ' : 'text-gray-700 '
 }`}
 >
 {score}
 </td>
 ))}
 <td className="px-1 py-1.5 sm:p-2 font-bold bg-amber-100/60 text-amber-950 ">
 {total}
 </td>
 </tr>
 );
 })}
 <tr className="bg-amber-200/60 font-extrabold text-amber-950 border-t-2 border-amber-400">
 <td className="px-1.5 py-1.5 sm:p-2 text-left">SAV Total</td>
 {av.sav.map((total, idx) => (
 <td key={idx} className="px-1 py-1.5 sm:p-2 font-mono">{total}</td>
 ))}
 <td className="px-1 py-1.5 sm:p-2 font-bold bg-amber-300 text-black ">337</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
