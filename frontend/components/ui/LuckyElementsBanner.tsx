import React from 'react';
import { Sparkles, Hash, Palette, Calendar, Gem } from 'lucide-react';

interface LuckyElementsProps {
 dateOfBirthStr?: string; // YYYY-MM-DD
}

const FRIENDLY_MAP: Record<number, number[]> = {
 1: [1, 2, 3, 5, 6, 9],
 2: [1, 2, 3, 5],
 3: [1, 2, 3, 5],
 4: [1, 5, 7, 6],
 5: [1, 2, 3, 5, 6],
 6: [1, 4, 5, 6, 7],
 7: [1, 3, 5, 4, 6],
 8: [5, 3, 6, 7],
 9: [1, 3, 5]
};

const LUCKY_DATA: Record<number, { colors: string[]; days: string; gem: string; bgColors: string[] }> = {
 1: { colors: ['Red', 'Golden Yellow', 'Orange'], days: 'Sunday, Tuesday', gem: 'Ruby (Manik)', bgColors: ['#dc2626', '#f59e0b', '#ea580c'] },
 2: { colors: ['White', 'Cream', 'Silver', 'Light Green'], days: 'Monday, Thursday', gem: 'Pearl (Moti)', bgColors: ['#ffffff', '#fef3c7', '#94a3b8', '#4ade80'] },
 3: { colors: ['Yellow', 'Light Pink', 'Purple'], days: 'Thursday, Tuesday', gem: 'Yellow Sapphire (Pukhraj)', bgColors: ['#eab308', '#f472b6', '#a855f7'] },
 4: { colors: ['Metallic Blue', 'Grey', 'Khaki'], days: 'Saturday, Sunday', gem: 'Hessonite (Gomed)', bgColors: ['#2563eb', '#64748b', '#a16207'] },
 5: { colors: ['Green', 'Turquoise', 'Light Brown'], days: 'Wednesday, Friday', gem: 'Emerald (Panna)', bgColors: ['#10b981', '#06b6d4', '#78350f'] },
 6: { colors: ['White', 'Light Blue', 'Silver'], days: 'Friday, Wednesday', gem: 'Diamond / Opal', bgColors: ['#ffffff', '#38bdf8', '#94a3b8'] },
 7: { colors: ['Light Yellow', 'White', 'Light Green'], days: 'Thursday, Monday', gem: "Cat's Eye (Lehsuniya)", bgColors: ['#fde047', '#ffffff', '#4ade80'] },
 8: { colors: ['Dark Blue', 'Black', 'Dark Brown'], days: 'Saturday, Friday', gem: 'Blue Sapphire (Neelam)', bgColors: ['#1e3a8a', '#000000', '#451a03'] },
 9: { colors: ['Red', 'Maroon', 'Rose'], days: 'Tuesday, Sunday', gem: 'Red Coral (Moonga)', bgColors: ['#dc2626', '#881337', '#f43f5e'] }
};

export function LuckyElementsBanner({ dateOfBirthStr }: LuckyElementsProps) {
 // Extract digits present in birth date
 const cleanDigits = (dateOfBirthStr || '').replace(/\D/g, '').split('').map(Number).filter(n => n >= 1 && n <= 9);
 const presentSet = new Set(cleanDigits);

 // Calculate Mulank
 let mulank = 3;
 if (dateOfBirthStr) {
 const dayStr = dateOfBirthStr.split('-')[2] || '1';
 let sum = dayStr.split('').reduce((a, b) => a + parseInt(b || '0'), 0);
 while (sum > 9) {
 sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
 }
 mulank = sum >= 1 && sum <= 9 ? sum : 3;
 }

 const friendlyList = FRIENDLY_MAP[mulank] || [1, 2, 3, 5];
 const luckyNumbersList = friendlyList.filter(num => !presentSet.has(num) && num !== 4 && num !== 7 && num !== 8);
 const finalLuckyNumbersText = luckyNumbersList.length > 0 
 ? luckyNumbersList.join(', ') 
 : friendlyList.filter(n => n !== 4 && n !== 7 && n !== 8).slice(0, 3).join(', ');

 const rawLucky = LUCKY_DATA[mulank] || LUCKY_DATA[3];
 
 const colorsToExclude = new Set([
 'Metallic Blue', 'Grey', 'Khaki',
 'Light Yellow', 'White', 'Light Green',
 'Dark Blue', 'Black', 'Dark Brown'
 ]);
 const hexToExclude = new Set([
 '#2563eb', '#64748b', '#a16207',
 '#fde047', '#ffffff', '#4ade80',
 '#1e3a8a', '#000000', '#451a03'
 ]);

 const filteredColors: string[] = [];
 const filteredBgColors: string[] = [];

 rawLucky.colors.forEach((c, idx) => {
 const bg = rawLucky.bgColors[idx];
 if (!colorsToExclude.has(c) && !hexToExclude.has(bg)) {
 filteredColors.push(c);
 filteredBgColors.push(bg);
 }
 });

 if (filteredColors.length === 0) {
 filteredColors.push('Red');
 filteredBgColors.push('#dc2626');
 }

 const lucky = {
 ...rawLucky,
 colors: filteredColors,
 bgColors: filteredBgColors
 };

 return (
 <div className="w-full max-w-4xl mx-auto my-10 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border-2 border-[var(--gold)]/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
 {/* Header */}
 <div className="text-center space-y-1">
 <span className="text-[var(--gold)] text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5">
 <Sparkles className="w-4 h-4" /> Personal Auspicious Elements
 </span>
 <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 ">
 Your Auspicious <span className="gold-gradient-text">Lucky Colors & Lucky Numbers</span>
 </h3>
 </div>

 {/* Grid of 3 Lucky Attributes: Numbers, Colors, Auspicious Days */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 
 {/* 1. Lucky Numbers */}
 <div className="bg-white border border-amber-300 rounded-xl p-5 text-center space-y-2 shadow-sm">
 <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-[var(--gold)]">
 <Hash className="w-5 h-5" />
 </div>
 <span className="text-xs uppercase font-bold text-neutral-500 block tracking-wider">
 Lucky Numbers
 </span>
 <div className="text-2xl font-serif font-black text-amber-950 ">
 {finalLuckyNumbersText}
 </div>
 </div>

 {/* 2. Lucky Colors */}
 <div className="bg-white border border-amber-300 rounded-xl p-5 text-center space-y-2 shadow-sm">
 <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-[var(--gold)]">
 <Palette className="w-5 h-5" />
 </div>
 <span className="text-xs uppercase font-bold text-neutral-500 block tracking-wider">
 Lucky Colors
 </span>
 <div className="flex items-center justify-center gap-1.5 pt-1">
 {lucky.colors.map((c, i) => (
 <span 
 key={i} 
 title={c}
 className="w-5 h-5 rounded-full border border-black/20 shadow-sm transition-transform hover:scale-125"
 style={{ backgroundColor: lucky.bgColors[i] || '#eab308' }}
 />
 ))}
 </div>
 <p className="text-xs font-semibold text-neutral-800 ">
 {lucky.colors.join(', ')}
 </p>
 </div>

 {/* 3. Lucky Days */}
 <div className="bg-white border border-amber-300 rounded-xl p-5 text-center space-y-2 shadow-sm">
 <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-[var(--gold)]">
 <Calendar className="w-5 h-5" />
 </div>
 <span className="text-xs uppercase font-bold text-neutral-500 block tracking-wider">
 Auspicious Days
 </span>
 <div className="text-base font-serif font-bold text-neutral-900 pt-1">
 {lucky.days}
 </div>
 </div>

 </div>
 </div>
 );
}
