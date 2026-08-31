'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hash, Calendar, Layers, ShieldCheck, Sparkles, HelpCircle, Star, Info, Binary, Check } from 'lucide-react';
import { GoldButton } from '../../components/ui/GoldButton';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '../../components/ui/CategoryBatchesList';
import { NumerologyHeroBackground } from '../../components/ui/NumerologyHeroBackground';
import { FAQSection } from '../../components/ui/FAQSection';
import { DailyPanchangMuhuratWidget } from '../../components/ui/astrology/DailyPanchangMuhuratWidget';

const NUMEROLOGY_FAQS = [
 { q: 'What exactly is a numerology reading?', a: 'A numerology reading is a personalized analysis that uses your birth date and full birth name to calculate core numbers (such as your Life Path and Soul Urge). It acts as a framework to help you understand your natural talents, motivations, and current life cycles.' },
 { q: 'How does numerology work?', a: 'It operates on the principle that every number from 1 to 9 (and Master Numbers 11, 22, 33) carries a distinct energy. By converting letters and dates into these values, we create a blueprint of your character and path.' },
 { q: 'What is a "Master Number"?', a: 'Numbers 11, 22, and 33 are considered Master Numbers. Unlike other double-digit numbers, they are not reduced to a single digit because they hold a higher, more intense frequency and spiritual significance.' },
 { q: 'What can I learn about myself from a reading?', a: 'A reading can reveal your core life themes, hidden strengths, challenges, and relationship dynamics. It helps identify where you naturally thrive in your career and personal life.' },
 { q: 'How should I prepare for a reading?', a: 'To get the most out of a session, have your exact date of birth and full name as it appears on your birth certificate ready. Enter the session with an open mind and specific questions.' },
 { q: 'Is numerology scientific?', a: 'Numerology is an ancient occult science based on mathematical patterns. While highly accurate for personal guidance and identifying energetic cycles, it is not an exact science in the modern academic sense.' },
 { q: 'Can numerology predict the future?', a: 'Rather than predicting fixed events, numerology identifies cycles, trends, and the energy surrounding specific time periods. It serves as a guide to help you make informed decisions.' },
 { q: 'Does having the same birth date mean the same destiny?', a: 'No. While individuals born on the same date share certain core numbers (like the Life Path), their full names and karmic backgrounds create a unique, individualized chart.' },
 { q: 'Which numerology system is better: Chaldean or Pythagorean?', a: 'Both are highly effective but serve different purposes. Pythagorean is deeply psychological and character-based, while Chaldean is older and focuses heavily on the mystical vibrations of names and events. We often use Chaldean for precise name corrections.' },
 { q: 'Can changing my name spelling change my life?', a: 'Yes. Name correction alters the frequency of your Expression number. Aligning your name vibration with your birth date removes blockages and attracts better opportunities.' }
];

export default function NumerologyPage() {
 const [calcSystem, setCalcSystem] = useState<'pythagorean' | 'chaldean'>('pythagorean');
 const [calcInput, setCalcInput] = useState('');
 const [showMappingRef, setShowMappingRef] = useState(false);

 const pythagoreanMap: Record<string, number> = {
 a: 1, j: 1, s: 1,
 b: 2, k: 2, t: 2,
 c: 3, l: 3, u: 3,
 d: 4, m: 4, v: 4,
 e: 5, n: 5, w: 5,
 f: 6, o: 6, x: 6,
 g: 7, p: 7, y: 7,
 h: 8, q: 8, z: 8,
 i: 9, r: 9
 };

 const chaldeanMap: Record<string, number> = {
 a: 1, i: 1, j: 1, q: 1, y: 1,
 b: 2, k: 2, r: 2,
 c: 3, g: 3, l: 3, s: 3,
 d: 4, m: 4, t: 4,
 e: 5, h: 5, n: 5, x: 5,
 u: 6, v: 6, w: 6,
 o: 7, z: 7,
 f: 8, p: 8
 };


 const numberMeanings = [
 { num: '1', title: 'The Leader', vibration: 'Independence, originality, drive, self-reliance, and initiative.' },
 { num: '2', title: 'The Peacemaker', vibration: 'Harmony, cooperation, sensitivity, partnership, and diplomacy.' },
 { num: '3', title: 'The Creative', vibration: 'Self-expression, joy, communication, enthusiasm, and imagination.' },
 { num: '4', title: 'The Builder', vibration: 'Structure, discipline, practicality, stability, and conscientiousness.' },
 { num: '5', title: 'The Adventurer', vibration: 'Change, freedom, adaptability, curiosity, and resourcefulness.' },
 { num: '6', title: 'The Nurturer', vibration: 'Responsibility, harmony, empathy, home, service, and balance.' },
 { num: '7', title: 'The Seeker', vibration: 'Analysis, intuition, spirituality, wisdom, and inner discovery.' },
 { num: '8', title: 'The Executive', vibration: 'Material success, authority, power, career manifestation, and balance.' },
 { num: '9', title: 'The Humanitarian', vibration: 'Compassion, completion, generosity, spiritual awareness, and service.' },
 ];

 const profiles = [
 { name: 'Life Path Number', desc: 'Calculated from your date of birth. This number tells you what kind of life journey you are here to experience.' },
 { name: 'Destiny / Expression Number', desc: 'Calculated from your full birth name. Shows your natural abilities and what you are meant to achieve in life.' },
 { name: 'Soul Urge / Heart Desire', desc: 'Calculated from the vowels in your name. Reveals your deepest wishes and what truly makes you happy.' },
 { name: 'Personality Number', desc: 'Calculated from the consonants in your name. Shows how other people see you and what first impression you give.' },
 ];

 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900 number-grid-bg">
 {/* Pythagorean Number Matrix Background Animation */}
 <NumerologyHeroBackground />

 <div className="max-w-6xl mx-auto space-y-16 relative z-10">
 {/* Header Hero */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center space-y-4"
 >
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
 <Sparkles className="w-3.5 h-3.5" /> Pythagorean & Chaldean Systems
 </span>
 <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
 Understand What Your <span className="gold-gradient-text">Numbers</span> Say About You
 </h1>
 <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
 Every number in your birth date and name carries a special meaning. Learn how your numbers can guide you to better decisions in life, career, and relationships.
 </p>
 </motion.div>

 {/* Section: Pythagorean vs Chaldean */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
 <div className="lg:col-span-4 flex relative group">
 <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
 <GoldCard flush className="border border-[var(--gold-200)] flex-1 overflow-hidden min-h-[220px]">
 <img src="/images/numerology_vibration_realistic.png" alt="Numerology Vibrations" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 </GoldCard>
 </div>
 <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
 <GoldCard className="border border-[var(--gold-200)] p-6 space-y-3 flex flex-col justify-center">
 <h3 className="font-serif text-lg font-bold text-[var(--gold)]">The Pythagorean System</h3>
 <p className="text-xs text-gray-600 leading-relaxed">
 Created by the Greek mathematician Pythagoras, this is the most popular method used in India and worldwide. Each letter of the English alphabet gets a number from 1 to 9 (A=1, B=2 ... and so on). This helps calculate your name number.
 </p>
 </GoldCard>
 <GoldCard className="border border-[var(--gold-200)] p-6 space-y-3 flex flex-col justify-center">
 <h3 className="font-serif text-lg font-bold text-[var(--gold)]">The Chaldean System</h3>
 <p className="text-xs text-gray-600 leading-relaxed">
 This is an ancient system from Babylon (Iraq). It gives numbers to letters based on their sound, not just alphabetical order. The number 9 is treated as sacred and is not assigned to any letter directly. It is known for being very accurate for name readings.
 </p>
 </GoldCard>
 </div>
 </div>

 {/* Section: Interactive Numerology Calculator */}
 <div className="space-y-6">
 <div className="space-y-2 text-center max-w-2xl mx-auto">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Interactive Numerology Calculator
 </h2>
 <p className="text-gray-600 text-xs">
 Type your name or phone number below to calculate your core numerical frequencies instantly.
 </p>
 </div>

 {/* System Selection pill switcher */}
 <div className="flex justify-center border border-[var(--gold-200)]/30 p-1 rounded-full bg-gray-50/60 max-w-[280px] mx-auto mt-4">
 <button
 type="button"
 onClick={() => setCalcSystem('pythagorean')}
 className={`flex-1 py-1.5 px-4 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
 calcSystem === 'pythagorean'
 ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-black shadow-md'
 : 'text-gray-600 hover:text-gray-900'
 }`}
 >
 Pythagorean
 </button>
 <button
 type="button"
 onClick={() => setCalcSystem('chaldean')}
 className={`flex-1 py-1.5 px-4 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
 calcSystem === 'chaldean'
 ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-black shadow-md'
 : 'text-gray-600 hover:text-gray-900'
 }`}
 >
 Chaldean
 </button>
 </div>

 {/* Calculator Input */}
 <div className="relative max-w-md mx-auto pt-2">
 <input
 type="text"
 placeholder="Type your name or phone number..."
 value={calcInput}
 onChange={(e) => setCalcInput(e.target.value)}
 className="w-full bg-white/50 border border-[var(--gold-200)]/30 rounded-xl py-3 px-4 text-gray-900 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-transparent text-sm text-center shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
 />
 </div>

 {/* Live Calculations */}
 {calcInput.replace(/[^a-zA-Z0-9]/g, '').length > 0 && (() => {
 const cleanedChars = calcInput.replace(/[^a-zA-Z0-9]/g, '').split('');
 const charBreakdowns = cleanedChars.map((char) => {
 let val = 0;
 const isDigit = /^[0-9]$/.test(char);
 if (isDigit) {
 val = parseInt(char);
 } else {
 const lower = char.toLowerCase();
 val = calcSystem === 'pythagorean' ? pythagoreanMap[lower] || 0 : chaldeanMap[lower] || 0;
 }
 return { char, value: val };
 });

 const compoundSum = charBreakdowns.reduce((sum, item) => sum + item.value, 0);

 const reduceToSingle = (num: number) => {
 if (num <= 9) return num;
 if (calcSystem === 'pythagorean' && (num === 11 || num === 22 || num === 33)) {
 return num;
 }
 let current = num;
 while (current > 9) {
 current = current.toString().split('').map(Number).reduce((a, b) => a + b, 0);
 if (calcSystem === 'pythagorean' && (current === 11 || current === 22 || current === 33)) {
 break;
 }
 }
 return current;
 };

 const destinyNumber = reduceToSingle(compoundSum);
 const reducedSingleDigit = destinyNumber > 9 ? destinyNumber.toString().split('').map(Number).reduce((a, b) => a + b, 0) : destinyNumber;
 const vibrationMeaning = numberMeanings.find((m) => m.num === reducedSingleDigit.toString());

 return (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="max-w-xl mx-auto space-y-5 bg-gray-50/45 p-6 rounded-2xl border border-neutral-900/80 backdrop-blur-md"
 >


 {/* Calculation Summary Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-neutral-900/10 ">
 <div className="p-3 bg-white border border-gray-200 rounded-xl flex flex-col justify-between shadow-sm">
 <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block">Compound Sum</span>
 <div className="flex items-baseline gap-2 mt-1">
 <span className="text-2xl font-bold font-mono text-black ">{compoundSum}</span>
 <span className="text-[9px] text-gray-600 font-mono truncate max-w-[140px]">
 ({charBreakdowns.map(item => item.value).join('+')})
 </span>
 </div>
 </div>

 <div className="p-3 bg-white border border-gray-200 rounded-xl flex flex-col justify-between shadow-sm">
 <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block">Core Value / Destiny</span>
 <div className="flex items-center gap-2 mt-1">
 <span className="text-2xl font-bold font-mono text-[var(--gold)]">{destinyNumber}</span>
 {calcSystem === 'pythagorean' && (destinyNumber === 11 || destinyNumber === 22 || destinyNumber === 33) && (
 <span className="text-[8px] bg-[var(--gold-50)] text-[var(--gold)] border border-[var(--gold-100)] rounded-full px-1.5 py-0.5 uppercase tracking-widest font-mono font-bold">
 Master
 </span>
 )}
 </div>
 </div>
 </div>

 {/* Vibration Meaning */}
 {vibrationMeaning && (
 <div className="p-4 bg-[var(--gold-50)]/5 border border-[var(--gold-200)]/15 rounded-xl space-y-1">
 <span className="text-[9px] text-[var(--gold)] font-mono uppercase tracking-wider block">
 Vibration Meaning: Number {reducedSingleDigit}
 </span>
 <h4 className="text-gray-900 text-xs font-serif font-bold">{vibrationMeaning.title}</h4>
 <p className="text-[10px] text-gray-600 leading-normal">{vibrationMeaning.vibration}</p>
 </div>
 )}
 </motion.div>
 );
 })()}


 </div>


 {/* Section: The Four Core Numbers */}
 <div className="space-y-6">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Your Core Numerology Profile
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
 {profiles.map((p) => (
 <GoldCard key={p.name} className="border border-gray-200/60 p-5 flex flex-col justify-between">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm mb-2">{p.name}</h4>
 <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
 </GoldCard>
 ))}
 </div>
 </div>

 {/* Section: The 9-Year Epicycle */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 The 9-Year Epicycle (Life Phases)
 </h2>
 </div>
 <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
 <GoldCard className="border border-gray-200/60 p-3 text-center flex flex-col justify-between">
 <span className="text-base font-bold text-[var(--gold)]">Year 1</span>
 <span className="text-[9px] text-gray-900 font-serif block my-1">Seed/Start</span>
 <p className="text-[8px] text-gray-450 leading-tight">Planting goals, initiation, fresh beginnings.</p>
 </GoldCard>
 <GoldCard className="border border-gray-200/60 p-3 text-center flex flex-col justify-between">
 <span className="text-base font-bold text-[var(--gold)]">Year 2</span>
 <span className="text-[9px] text-gray-900 font-serif block my-1">Patience</span>
 <p className="text-[8px] text-gray-455 leading-tight">Cooperation, waiting, small adjustments.</p>
 </GoldCard>
 <GoldCard className="border border-gray-200/60 p-3 text-center flex flex-col justify-between">
 <span className="text-base font-bold text-[var(--gold)]">Year 3</span>
 <span className="text-[9px] text-gray-900 font-serif block my-1">Express</span>
 <p className="text-[8px] text-gray-455 leading-tight">Social growth, writing, creative release.</p>
 </GoldCard>
 <GoldCard className="border border-gray-200/60 p-3 text-center flex flex-col justify-between">
 <span className="text-base font-bold text-[var(--gold)]">Year 4</span>
 <span className="text-[9px] text-gray-900 font-serif block my-1">Work/Root</span>
 <p className="text-[8px] text-gray-455 leading-tight">Discipline, building security, health details.</p>
 </GoldCard>
 <GoldCard className="border border-gray-200/60 p-3 text-center flex flex-col justify-between">
 <span className="text-base font-bold text-[var(--gold)]">Year 5</span>
 <span className="text-[9px] text-gray-900 font-serif block my-1">Change</span>
 <p className="text-[8px] text-gray-455 leading-tight">Travel, pivots, sudden freedom, expansion.</p>
 </GoldCard>
 <GoldCard className="border border-gray-200/60 p-3 text-center flex flex-col justify-between">
 <span className="text-base font-bold text-[var(--gold)]">Year 6</span>
 <span className="text-[9px] text-gray-900 font-serif block my-1">Service</span>
 <p className="text-[8px] text-gray-455 leading-tight">Family duties, marriage, restoring harmony.</p>
 </GoldCard>
 <GoldCard className="border border-gray-200/60 p-3 text-center flex flex-col justify-between">
 <span className="text-base font-bold text-[var(--gold)]">Year 7</span>
 <span className="text-[9px] text-gray-900 font-serif block my-1">Reflect</span>
 <p className="text-[8px] text-gray-455 leading-tight">Solitude, study, spiritual research, detox.</p>
 </GoldCard>
 <GoldCard className="border border-gray-200/60 p-3 text-center flex flex-col justify-between">
 <span className="text-base font-bold text-[var(--gold)]">Year 8</span>
 <span className="text-[9px] text-gray-900 font-serif block my-1">Harvest</span>
 <p className="text-[8px] text-gray-455 leading-tight">Material rewards, business power, scale.</p>
 </GoldCard>
 <GoldCard className="border border-gray-200/60 p-3 text-center flex flex-col justify-between">
 <span className="text-base font-bold text-[var(--gold)]">Year 9</span>
 <span className="text-[9px] text-gray-900 font-serif block my-1">Release</span>
 <p className="text-[8px] text-gray-455 leading-tight">Clear debts, ending old ties, preparation.</p>
 </GoldCard>
 </div>
 </div>

 {/* Section: 1-9 Digits Vibration */}
 <div className="space-y-6 p-6 bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl border border-amber-600 shadow-md">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-amber-600 pb-3 text-white">
 The Vibration of Single Digits (1-9)
 </h2>
 <p className="text-amber-100/80 text-xs">
 Each number has a unique meaning. Find what your number says about your personality and behaviour.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {numberMeanings.map((n) => (
 <div key={n.num} className="bg-white/10 rounded-xl border border-white/10 p-5 flex flex-row gap-4 items-start hover:border-amber-400 hover:bg-white/15 hover:shadow-md transition-all group hover:scale-[1.02] duration-300">
 <span className="text-3xl font-bold font-serif text-amber-300 opacity-90">{n.num}</span>
 <div className="space-y-1">
 <h4 className="text-white text-xs font-bold font-serif">{n.title}</h4>
 <p className="text-[10px] text-amber-100/70 leading-normal">{n.vibration}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Section: Master & Compound Numbers */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
 <GoldCard className="border border-gray-200/60 p-6 space-y-4">
 <h3 className="font-serif text-lg font-bold text-[var(--gold)] flex items-center gap-2">
 <Sparkles className="w-5 h-5 text-[var(--gold)]" /> Master Numbers (11, 22, 33)
 </h3>
 <div className="space-y-3">
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Master Number 11 (The Visionary)</span>
 <p className="text-[11px] text-gray-600">Very strong intuition and creative thinking. These people have a special ability to inspire others and come up with new ideas. They are meant to be a light for those around them.</p>
 </div>
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Master Number 22 (The Master Builder)</span>
 <p className="text-[11px] text-gray-600">Combines vision with hard work. People with 22 can turn big dreams into real successful projects — like building large businesses, organisations, or helping many people at once.</p>
 </div>
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Master Number 33 (The Master Teacher)</span>
 <p className="text-[11px] text-gray-600">The most powerful teaching number. People with 33 have a heart for helping others. They are naturally caring and wise, and often become great guides, teachers, or healers.</p>
 </div>
 </div>
 </GoldCard>

 <GoldCard className="border border-gray-200/60 p-6 space-y-4">
 <h3 className="font-serif text-lg font-bold text-[var(--gold)] flex items-center gap-2">
 <ShieldCheck className="w-5 h-5 text-[var(--gold)]" /> Chaldean Compound Numbers
 </h3>
 <div className="space-y-3">
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Compound 10 (Wheel of Fortune)</span>
 <p className="text-[11px] text-gray-600">A very lucky number. Plans made under this energy usually succeed. Brings respect, recognition, and positive outcomes to those who work honestly.</p>
 </div>
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Compound 19 (Prince of Heaven)</span>
 <p className="text-[11px] text-gray-600">Connected to the Sun (Surya). Brings career success, victory over problems, good health, and public respect. One of the strongest success numbers.</p>
 </div>
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Compound 28 (The Trust Trust)</span>
 <p className="text-[11px] text-gray-600">A strong number with a warning. People with 28 can manage large resources and money, but they need to be careful with partners and should always maintain honesty.</p>
 </div>
 </div>
 </GoldCard>
 </div>

 {/* Section: Compatibility Grid */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Numerological Relationship Compatibility
 </h2>
 <p className="text-gray-600 text-xs">
 Your life path number affects your relationships. Find out which numbers are good for you.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <GoldCard className="border border-gray-200/60 p-5">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm mb-2">Friendly Vibrations</h4>
 <p className="text-[11px] text-gray-600 leading-relaxed">
 Some numbers match very well with each other. For example, 1 and 9, or 2 and 7, get along naturally. Their relationship feels easy and supportive from the beginning.
 </p>
 </GoldCard>
 <GoldCard className="border border-gray-200/60 p-5">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm mb-2">Neutral Vibrations</h4>
 <p className="text-[11px] text-gray-600 leading-relaxed">
 Some numbers are not enemies but they need common goals to work well together. For example, 5 loves change but 4 prefers stability. They can coexist peacefully.
 </p>
 </GoldCard>
 <GoldCard className="border border-gray-200/60 p-5">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm mb-2">Challenging Vibrations</h4>
 <p className="text-[11px] text-gray-600 leading-relaxed">
 Some numbers have opposite personalities (e.g. 1 wants to lead and 2 always compromises). This combination can cause arguments but if handled well, both grow a lot.
 </p>
 </GoldCard>
 </div>
 </div>

 {/* Informational Card */}
 <GoldCard className="border border-[var(--gold-200)] max-w-3xl mx-auto p-8 text-center space-y-4">
 <h3 className="font-serif text-xl font-bold">Why Check Your Numbers?</h3>
 <p className="text-gray-600 text-sm leading-relaxed">
 Numbers are part of our daily life. When your name number matches your birth number, things naturally go well for you. A simple name correction can remove blockages and bring more luck, success, and peace.
 </p>
 </GoldCard>

 {/* FAQ Section */}
 <div className="pt-12">
 <FAQSection faqs={NUMEROLOGY_FAQS} />
 </div>

 {/* Numerology 2026 Predictions */}
 <div className="pt-12 border-t border-gray-200/60 mt-12">
 <div className="text-center mb-8">
 <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">Numerology 2026 Predictions</h2>
 <p className="text-gray-600 text-sm">Discover what 2026 holds for your root number.</p>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
 {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
 <Link key={num} href={`/numerology-2026/${num}`}>
 <div className="bg-white border border-gray-100 hover:border-[var(--gold)]/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(204,143,51,0.15)] shadow-sm">
 <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-[#1a1c29] to-[#0a0a0f] border-2 border-[#D4AF37]/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] overflow-hidden relative group-hover:border-[#D4AF37]/60 transition-colors">
 {/* Inner glowing effect simulating the fire */}
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,165,32,0.25)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(218,165,32,0.4)_0%,transparent_70%)] transition-all duration-500"></div>
 {/* The golden number */}
 <span className="relative z-10 text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C3] via-[#FFD700] to-[#D4AF37] drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]">
 {num}
 </span>
 </div>
 <span className="text-[15px] font-semibold text-gray-800 text-center">Number {num}</span>
 </div>
 </Link>
 ))}
 </div>
 </div>

 {/* Active Batches Showcase */}
 <div className="border-t border-gray-200/60 pt-16">
 <CategoryBatchesList category="Numerology" />
 </div>

 {/* Booking Consultation Widget */}
 <div className="border-t border-gray-200/60 pt-16 pb-8">
 <CategoryBookingWidget category="Numerology" />
 </div>
 </div>
 </div>
 );
}
