'use client';

import React, { useState } from 'react';
import { ZODIAC_SIGNS, ZODIAC_LORDS } from '@/lib/astrologyEngine';

interface Props {
 data: any;
}

const HOUSE_TITLES: Record<number, { title: string; signification: string }> = {
 1: { title: '1st House (Tanu Bhava)', signification: 'Self, Personality, Health, Physical Appearance, Longevity' },
 2: { title: '2nd House (Dhana Bhava)', signification: 'Wealth, Family, Speech, Assets, Food & Intake' },
 3: { title: '3rd House (Sahaja Bhava)', signification: 'Siblings, Courage, Communication, Short Travel, Skills' },
 4: { title: '4th House (Sukha Bhava)', signification: 'Mother, Home, Vehicles, Property, Peace of Mind' },
 5: { title: '5th House (Putra Bhava)', signification: 'Children, Intelligence, Creativity, Past Karma, Education' },
 6: { title: '6th House (Shatru Bhava)', signification: 'Health, Obstacles, Enemies, Debt, Service, Competition' },
 7: { title: '7th House (Yuvati Bhava)', signification: 'Spouse, Marriage, Business Partnerships, Public Image' },
 8: { title: '8th House (Randhra Bhava)', signification: 'Longevity, Transformation, Occult, Research, Unexpected Wealth' },
 9: { title: '9th House (Dharma Bhava)', signification: 'Fortune, Guru, Father, Higher Learning, Religion, Pilgrimages' },
 10: { title: '10th House (Karma Bhava)', signification: 'Career, Profession, Fame, Authority, Status, Public Life' },
 11: { title: '11th House (Labha Bhava)', signification: 'Gains, Income, Elder Siblings, Aspirations, Social Network' },
 12: { title: '12th House (Vyaya Bhava)', signification: 'Expenditure, Foreign Lands, Moksha, Spirituality, Isolation' }
};

export function HousesAnalysisGrid({ data }: Props) {
 const [selectedHouse, setSelectedHouse] = useState<number | 'all'>('all');

 if (!data || !data.output || !data.output[1]) return null;

 const rawPlanets = data.output[1];
 const house1Sign = rawPlanets[1]?.current_sign || rawPlanets['Ascendant']?.current_sign || 1;

 /* Collapsible State (Preserved in comments for future activation):
 const [isOpen, setIsOpen] = useState(false);
 */

 // Group planets by house
 const houseOccupants: Record<number, string[]> = {};
 for (let i = 1; i <= 12; i++) houseOccupants[i] = [];

 Object.entries(rawPlanets).forEach(([pName, pData]: any) => {
 if (pName !== 'ayanamsa' && pName !== 'debug' && pData.house_number) {
 houseOccupants[pData.house_number].push(pName);
 }
 });

 const getHouseInfo = (hNum: number) => {
 const signNum = ((house1Sign - 1 + (hNum - 1)) % 12) + 1;
 const signName = ZODIAC_SIGNS[signNum - 1];
 const lord = ZODIAC_LORDS[signNum];
 const occupants = houseOccupants[hNum] || [];

 const meta = HOUSE_TITLES[hNum];

 return {
 hNum,
 signNum,
 signName,
 lord,
 occupants,
 title: meta.title,
 signification: meta.signification,
 strength: occupants.length > 0 ? (occupants.includes('Jupiter') || occupants.includes('Venus') ? 'Strong' : 'Active') : 'Neutral',
 interpretation: `House ${hNum} is ruled by ${lord} (${signName}). ${occupants.length > 0 ? `Occupied by ${occupants.join(', ')}.` : 'Currently un-occupied.'}`,
 positiveEffects: `Enhances natural significations of ${meta.signification.toLowerCase()}.`,
 challenges: occupants.includes('Saturn') || occupants.includes('Rahu') ? 'Requires patience and disciplined effort during planetary transits.' : 'Favorable overall alignment.',
 remedies: `Honor ${lord} by chanting its mantra and maintaining positive alignment for House ${hNum}.`
 };
 };

 return (
 <div className="bg-amber-50/60 border-2 border-amber-200 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
 {/* Title Header */}
 <div 
 /* onClick={() => setIsOpen(!isOpen)} */
 className="bg-amber-700 text-gray-900 p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
 >
 <span className="text-xl">🏠</span>
 <h3 className="font-serif font-bold text-lg md:text-2xl">
 Comprehensive 12 Houses Analysis
 </h3>
 {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
 </div>

 {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} space-y-6`}> */}
 <div className="space-y-6">

 {/* House Selector Tabs */}
 <div className="flex flex-wrap justify-center gap-2 print:hidden">
 {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => {
 const occ = houseOccupants[h] || [];
 const isSelected = selectedHouse === h;
 return (
 <button
 key={h}
 onClick={() => setSelectedHouse(h)}
 className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-all flex flex-col items-center min-w-[60px] cursor-pointer ${
 isSelected
 ? 'bg-amber-600 text-gray-900 shadow-md scale-105'
 : 'bg-amber-100 text-amber-950 hover:bg-amber-200'
 }`}
 >
 <span>House {h}</span>
 <span className="text-[10px] font-normal opacity-80">
 {occ.length > 0 ? `(${occ.length} Plan)` : 'Empty'}
 </span>
 </button>
 );
 })}

 {/* All 12 Houses Button */}
 <button
 onClick={() => setSelectedHouse('all')}
 className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all flex flex-col items-center justify-center min-w-[80px] cursor-pointer ${
 selectedHouse === 'all'
 ? 'bg-amber-700 text-gray-900 shadow-md scale-105'
 : 'bg-amber-200 text-amber-950 hover:bg-amber-300'
 }`}
 >
 <span>✨ All Houses</span>
 <span className="text-[10px] font-normal opacity-80">(Full Report)</span>
 </button>
 </div>

 {/* Interactive Web Screen View (Shows selected house or all if 'all' is clicked) */}
 <div className="space-y-6 print:hidden pdf-hide-in-export">
 {selectedHouse === 'all' ? (
 Array.from({ length: 12 }, (_, i) => i + 1).map((hNum) => (
 <SingleHouseCard key={hNum} info={getHouseInfo(hNum)} />
 ))
 ) : (
 <SingleHouseCard info={getHouseInfo(selectedHouse as number)} />
 )}
 </div>

 {/* Complete All 12 Houses Output (ALWAYS Rendered for PDF Export & Print) */}
 <div className="hidden print:block pdf-show-in-export space-y-6">
 {Array.from({ length: 12 }, (_, i) => i + 1).map((hNum) => (
 <SingleHouseCard key={hNum} info={getHouseInfo(hNum)} />
 ))}
 </div>
 </div>
 </div>
 );
}

function SingleHouseCard({ info }: { info: any }) {
 return (
 <div className="pdf-page-break-avoid bg-white border border-amber-300 rounded-xl p-5 space-y-4 shadow-sm">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-3 gap-2">
 <div>
 <h4 className="font-serif font-bold text-xl text-amber-950 ">
 {info.title}
 </h4>
 <p className="text-xs text-gray-500 font-medium">
 Significations: {info.signification}
 </p>
 </div>
 <span className="px-3 py-1 bg-amber-200 text-amber-950 rounded-full text-xs font-bold">
 Status: {info.strength}
 </span>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-sm">
 <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 ">
 <span className="text-gray-500 block text-xs">Zodiac Sign</span>
 <span className="font-bold text-amber-950 text-base">{info.signName} (Sign #{info.signNum})</span>
 </div>

 <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 ">
 <span className="text-gray-500 block text-xs">House Lord</span>
 <span className="font-bold text-amber-950 text-base">{info.lord}</span>
 </div>

 <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 ">
 <span className="text-gray-500 block text-xs">Occupying Planets</span>
 <span className="font-bold text-amber-950 text-base">
 {info.occupants.length > 0 ? info.occupants.join(', ') : 'None'}
 </span>
 </div>
 </div>

 <div className="space-y-3 text-xs md:text-sm pt-2">
 <div>
 <h5 className="font-bold text-amber-900 ">Interpretation</h5>
 <p className="text-gray-700 mt-1">{info.interpretation}</p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
 <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
 <h6 className="font-bold text-emerald-900 ">Positive Effects</h6>
 <p className="text-emerald-950 text-xs mt-1">{info.positiveEffects}</p>
 </div>

 <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
 <h6 className="font-bold text-rose-900 ">Challenges</h6>
 <p className="text-rose-950 text-xs mt-1">{info.challenges}</p>
 </div>
 </div>

 <div className="p-3 bg-amber-100/70 border border-amber-300 rounded-lg">
 <h6 className="font-bold text-amber-950 ">Traditional Remedies</h6>
 <p className="text-amber-900 text-xs mt-1">{info.remedies}</p>
 </div>
 </div>
 </div>
 );
}
