'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { calculatePanchang } from '@/lib/astrologyEngine';

interface Props {
 data: any;
}

export function BirthPanchangCard({ data }: Props) {
 /* Collapsible State (Preserved in comments for future activation):
 const [isOpen, setIsOpen] = useState(false);
 */

 if (!data || !data.output || !data.output[1]) return null;

 const panchang = calculatePanchang(data);

 const items = [
 { title: 'Tithi (Lunar Day)', val: panchang.tithi, desc: 'Lunar phase governing emotional energy.', icon: '🌖' },
 { title: 'Vara (Weekday)', val: panchang.vara, desc: 'Solar day strength and vital energy.', icon: '📅' },
 { title: 'Nakshatra (Birth Star)', val: panchang.nakshatra, desc: 'Core mind vibration and destiny.', icon: '⭐' },
 { title: 'Yoga (Solar-Lunar Angular)', val: panchang.yoga, desc: 'Overall fortune and subtle harmony.', icon: '☸️' },
 { title: 'Karana (Half Tithi)', val: panchang.karana, desc: 'Action orientation and enterprise.', icon: '⏳' }
 ];

 return (
 <div className="bg-amber-50/60 border-2 border-amber-200 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
 {/* Title Header */}
 <div 
 /* onClick={() => setIsOpen(!isOpen)} */
 className="bg-amber-700 text-gray-900 p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
 >
 <span className="text-xl">🪔</span>
 <h3 className="font-serif font-bold text-lg md:text-2xl">
 Birth Panchang (5 Elements of Time)
 </h3>
 {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
 </div>

 {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'}`}> */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
 {items.map((item) => (
 <div key={item.title} className="p-4 bg-white border border-amber-300 rounded-xl space-y-2 flex flex-col justify-between shadow-sm">
 <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
 <span className="text-2xl">{item.icon}</span>
 <span className="font-bold text-amber-950 text-xs">{item.title}</span>
 </div>

 <div>
 <span className="font-bold text-amber-900 text-base block">{item.val}</span>
 <p className="text-[11px] text-gray-500 mt-1">{item.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}
