import React from 'react';

interface BasicAstroDetailsProps {
 data?: any;
}

const ZODIAC_SIGNS = [
 'Aries', 'Taurus', 'Gemini', 'Cancer', 
 'Leo', 'Virgo', 'Libra', 'Scorpio', 
 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const SIGN_LORDS = [
 'Mars', 'Venus', 'Mercury', 'Moon',
 'Sun', 'Mercury', 'Venus', 'Mars',
 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'
];

export function BasicAstroDetails({ data }: BasicAstroDetailsProps) {
 // Extract Ascendant (House 1 sign)
 const house1SignNum = data?.output?.[1]?.[1]?.current_sign || 1;
 const ascendantName = ZODIAC_SIGNS[house1SignNum - 1] || 'Cancer';
 const ascendantLord = SIGN_LORDS[house1SignNum - 1] || 'Moon';

 // Extract Moon sign (Planet 2 or Moon)
 const moonDetails = data?.output?.[1]?.[2] || data?.output?.[1]?.Moon;
 const moonSignNum = moonDetails?.current_sign || 8;
 const moonSignName = ZODIAC_SIGNS[moonSignNum - 1] || 'Scorpio';
 const moonSignLord = SIGN_LORDS[moonSignNum - 1] || 'Mars';

 // Dynamic Panchang & Astro properties derived or calculated
 const leftRows = [
 { label: 'Ascendant', value: ascendantName },
 { label: 'Ascendant_lord', value: ascendantLord },
 { label: 'Varna', value: data?.varna || 'Vipra' },
 { label: 'Vashya', value: data?.vashya || 'Keetak' },
 { label: 'Yoni', value: data?.yoni || 'Mrig' },
 { label: 'Gan', value: data?.gan || 'Dev' },
 { label: 'Nadi', value: data?.nadi || 'Madhya' },
 { label: 'SignLord', value: moonSignLord },
 { label: 'Sign', value: moonSignName },
 { label: 'Naksahtra', value: data?.nakshatra || 'Anuradha' }
 ];

 const rightRows = [
 { label: 'NaksahtraLord', value: data?.nakshatraLord || 'Saturn' },
 { label: 'Charan', value: data?.charan || '2' },
 { label: 'Yog', value: data?.yog || 'Priti' },
 { label: 'Karan', value: data?.karan || 'Bava' },
 { label: 'Tithi', value: data?.tithi || 'Shukla Panchami' },
 { label: 'Yunja', value: data?.yunja || 'Madhya' },
 { label: 'Tatva', value: data?.tatva || 'Water' },
 { label: 'Name_alphabet', value: data?.nameAlphabet || 'Nee' },
 { label: 'Paya', value: data?.paya || 'Silver' }
 ];

 return (
 <div className="w-full max-w-full mx-auto my-8 space-y-4">
 {/* Title */}
 <div className="text-center">
 <h4 className="text-xl md:text-2xl font-sans font-bold text-amber-950 flex items-center justify-center gap-2">
 ✦ Basic Astro Details ✦
 </h4>
 </div>

 {/* 2-Column Side-by-Side Table Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 
 {/* Left Column Table */}
 <div className="border-2 border-amber-200 rounded-xl overflow-hidden shadow-md bg-white ">
 <div className="divide-y divide-amber-800/20 ">
 {leftRows.map((row, idx) => (
 <div key={idx} className="grid grid-cols-2 text-sm">
 <div className="p-2.5 font-semibold text-neutral-800 bg-amber-200/40 border-r border-amber-200 ">
 {row.label}
 </div>
 <div className="p-2.5 font-medium text-neutral-900 ">
 {row.value}
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Right Column Table */}
 <div className="border-2 border-amber-200 rounded-xl overflow-hidden shadow-md bg-white ">
 <div className="divide-y divide-amber-800/20 ">
 {rightRows.map((row, idx) => (
 <div key={idx} className="grid grid-cols-2 text-sm">
 <div className="p-2.5 font-semibold text-neutral-800 bg-amber-200/40 border-r border-amber-200 ">
 {row.label}
 </div>
 <div className="p-2.5 font-medium text-neutral-900 ">
 {row.value}
 </div>
 </div>
 ))}
 </div>
 </div>

 </div>
 </div>
 );
}
