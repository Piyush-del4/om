'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { FAQSection } from '@/components/ui/FAQSection';

const FAQS = [
 { q: 'What is a Lucky Color?', a: 'Your lucky color resonates with your numerical birth vibration, attracting positive energy when worn or used.' },
 { q: 'How accurate is this Lucky Color Calculator?', a: 'Our calculator uses the ancient numerology system to map your life path to its corresponding color frequency.' },
 { q: 'Is this service completely free?', a: 'Yes, this tool is 100% free to use for unlimited calculations.' },
 { q: 'Do I need my exact birth time?', a: 'No, only your exact date of birth is required.' },
 { q: 'Can I consult an astrologer after generating my report?', a: 'Absolutely! We offer premium 1-on-1 consultations to help you decode the deeper meanings of your results.' }
];

const colorMap: Record<number, { name: string, colors: { name: string, hex: string }[], desc: string }> = {
 1: { name: 'Red, Golden Yellow, Orange', colors: [{ name: 'Red', hex: '#dc2626' }, { name: 'Golden Yellow', hex: '#f59e0b' }, { name: 'Orange', hex: '#ea580c' }], desc: 'Number 1 (Born on 1st, 10th, 19th, 28th) radiates leadership and vitality. Red, Golden Yellow, and Orange boost your confidence and charisma.' },
 2: { name: 'White, Cream, Silver, Light Green', colors: [{ name: 'White', hex: '#ffffff' }, { name: 'Cream', hex: '#fef3c7' }, { name: 'Silver', hex: '#94a3b8' }, { name: 'Light Green', hex: '#4ade80' }], desc: 'Number 2 (Born on 2nd, 11th, 20th, 29th) embodies harmony and intuition. White, Cream, Silver, and Light Green nurture peace and emotional clarity.' },
 3: { name: 'Yellow, Light Pink, Purple', colors: [{ name: 'Yellow', hex: '#eab308' }, { name: 'Light Pink', hex: '#f472b6' }, { name: 'Purple', hex: '#a855f7' }], desc: 'Number 3 (Born on 3rd, 12th, 21st, 30th) thrives on wisdom and expression. Yellow, Light Pink, and Purple unlock joy and creative inspiration.' },
 4: { name: 'Metallic Blue, Grey, Khaki', colors: [{ name: 'Metallic Blue', hex: '#2563eb' }, { name: 'Grey', hex: '#64748b' }, { name: 'Khaki', hex: '#a16207' }], desc: 'Number 4 (Born on 4th, 13th, 22nd, 31st) symbolizes structure and resilience. Metallic Blue, Grey, and Khaki anchor focus and stability.' },
 5: { name: 'Green, Turquoise, Light Brown', colors: [{ name: 'Green', hex: '#10b981' }, { name: 'Turquoise', hex: '#06b6d4' }, { name: 'Light Brown', hex: '#78350f' }], desc: 'Number 5 (Born on 5th, 14th, 23rd) loves adventure and swift communication. Green, Turquoise, and Light Brown attract growth and luck.' },
 6: { name: 'White, Light Blue, Silver', colors: [{ name: 'White', hex: '#ffffff' }, { name: 'Light Blue', hex: '#38bdf8' }, { name: 'Silver', hex: '#94a3b8' }], desc: 'Number 6 (Born on 6th, 15th, 24th) is governed by luxury and affection. White, Light Blue, and Silver invite luxury, art, and romance.' },
 7: { name: 'Light Yellow, White, Light Green', colors: [{ name: 'Light Yellow', hex: '#fde047' }, { name: 'White', hex: '#ffffff' }, { name: 'Light Green', hex: '#4ade80' }], desc: 'Number 7 (Born on 7th, 16th, 25th) connects deeply with spiritual research. Light Yellow, White, and Light Green elevate focus and wisdom.' },
 8: { name: 'Dark Blue, Black, Dark Brown', colors: [{ name: 'Dark Blue', hex: '#1e3a8a' }, { name: 'Black', hex: '#000000' }, { name: 'Dark Brown', hex: '#451a03' }], desc: 'Number 8 (Born on 8th, 17th, 26th) represents discipline and authority. Dark Blue, Black, and Dark Brown command respect and prosperity.' },
 9: { name: 'Red, Maroon, Rose', colors: [{ name: 'Red', hex: '#dc2626' }, { name: 'Maroon', hex: '#881337' }, { name: 'Rose', hex: '#f43f5e' }], desc: 'Number 9 (Born on 9th, 18th, 27th) carries courage and passion. Red, Maroon, and Rose ignite courage and victory.' },
};

const getSingleDigit = (num: number): number => {
 let sum = num;
 while (sum > 9) {
 sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
 }
 return sum;
};

const calculateLuckyColor = (date: string) => {
 const dateDigits = date.replace(/[^0-9]/g, '');
 let lifePathSum = 0;
 for (const char of dateDigits) {
 lifePathSum += parseInt(char);
 }
 return colorMap[getSingleDigit(lifePathSum)] || colorMap[1];
};

export default function LuckyColorCalculatorPage() {
 const [formData, setFormData] = useState({
 name: '',
 date: '',
 time: '',
 location: ''
 });
 
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [result, setResult] = useState(false);

 const [resultData, setResultData] = useState<any>(null);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);
 
 setTimeout(() => {
 const color = calculateLuckyColor(formData.date);
 setResultData(color);
 setIsSubmitting(false);
 setResult(true);
 }, 800);
 };

 return (
 <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
 {/* Background styling */}
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--gold)]/20 blur-[120px] rounded-full pointer-events-none" />

 <div className="max-w-4xl mx-auto space-y-16 relative z-10">
 
 {/* Hero */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center space-y-4 pt-8"
 >
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
 <Palette className="w-4 h-4" /> Free Utility
 </span>
 <h1 className="font-serif text-4xl md:text-5xl font-bold">
 Calculator <span className="gold-gradient-text">Lucky Color</span>
 </h1>
 <p className="text-gray-600 text-sm md:text-base font-light max-w-2xl mx-auto">
 Find your most auspicious colors for daily wear. Enter your details below to calculate your personalized report instantly.
 </p>
 </motion.div>

 {/* Main Form Section */}
 <GoldCard className="border border-[var(--gold-200)] p-6 md:p-8">
 {!result ? (
 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-sm text-gray-600 font-medium">Full Name</label>
 <input 
 type="text" 
 required
 className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)] transition-colors"
 placeholder="Enter your name"
 value={formData.name}
 onChange={(e) => setFormData({...formData, name: e.target.value})}
 />
 </div>
 
 <div className="space-y-2">
 <label className="text-sm text-gray-600 font-medium">Date of Birth</label>
 <input 
 type="date" 
 required
 className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)] transition-colors"
 value={formData.date}
 onChange={(e) => setFormData({...formData, date: e.target.value})}
 />
 </div>
 </div>

 <div className="pt-4 flex justify-center">
 <GoldButton 
 type="submit" 
 variant="filled" 
 className="w-full md:w-auto min-w-[200px] flex justify-center py-3"
 disabled={isSubmitting}
 >
 {isSubmitting ? 'Calculating...' : 'Generate Report'}
 </GoldButton>
 </div>
 </form>
 ) : (
 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="text-center space-y-6 py-8"
 >
 <div className="w-16 h-16 bg-[var(--gold-50)] rounded-full flex items-center justify-center mx-auto border border-[var(--gold-200)]">
 <Palette className="w-8 h-8 text-[var(--gold)]" />
 </div>
 <div>
 <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Report Generated!</h3>
 <p className="text-gray-600 text-sm mb-6">
 Here is the most auspicious color for <span className="capitalize text-[var(--gold)]">{formData.name}</span> based on your birth frequency.
 </p>
 <div className="bg-gray-100 border border-gray-200 rounded-xl p-8 text-center max-w-md mx-auto space-y-4">
 <div className="flex items-center justify-center gap-3 py-2">
 {resultData?.colors?.map((c: any, i: number) => (
 <div key={i} className="flex flex-col items-center gap-1.5">
 <div 
 className="w-16 h-16 rounded-full border-2 border-amber-400 shadow-md transition-transform hover:scale-110"
 style={{ backgroundColor: c.hex }}
 />
 <span className="text-xs font-semibold text-gray-700">{c.name}</span>
 </div>
 ))}
 </div>
 <div className="text-[var(--gold)] font-serif text-2xl font-bold">
 {resultData?.name}
 </div>
 <div className="text-sm text-gray-600 font-light leading-relaxed">
 {resultData?.desc}
 </div>
 </div>
 </div>
 <GoldButton onClick={() => setResult(false)} variant="outlined" className="mt-8">
 Calculate Again
 </GoldButton>
 </motion.div>
 )}
 </GoldCard>

 {/* SEO Content Section */}
 <div className="space-y-6 pt-12 border-t border-gray-200/60">
 <h2 className="font-serif text-3xl font-bold">Why use our <span className="text-[var(--gold)]">Lucky Color Calculator</span>?</h2>
 <div className="prose prose-invert max-w-none text-gray-600 font-light text-sm leading-relaxed space-y-4">
 <p>
 In Vedic Astrology and numerology, precision is everything. Our free online Lucky Color provides you with highly accurate insights based on ancient mathematical algorithms combined with modern astronomical data.
 </p>
 <p>
 Understanding your core planetary alignments allows you to make informed decisions about your career, relationships, health, and wealth. While this automated tool gives you an excellent starting point, nothing replaces the deep synthesis provided by a master astrologer.
 </p>
 </div>
 </div>

 {/* FAQs */}
 <div className="pt-8">
 <FAQSection faqs={FAQS} />
 </div>

 </div>
 </div>
 );
}
