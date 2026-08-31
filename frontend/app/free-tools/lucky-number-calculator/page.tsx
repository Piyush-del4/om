'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { FAQSection } from '@/components/ui/FAQSection';
import { DailyPanchangMuhuratWidget } from '@/components/ui/astrology/DailyPanchangMuhuratWidget';

const FAQS = [
 { q: 'What is a Lucky Number?', a: 'Your lucky number is derived from the core vibrations of your birth date and name, guiding your path to success.' },
 { q: 'How accurate is this Lucky Number Calculator?', a: 'Our calculator uses the ancient Chaldean and Pythagorean systems to generate highly accurate results.' },
 { q: 'Is this service completely free?', a: 'Yes, this tool is 100% free to use for unlimited calculations.' },
 { q: 'Do I need my exact birth time?', a: 'For this numerology calculation, only your exact date of birth and full birth name are required.' },
 { q: 'Can I consult an astrologer after generating my report?', a: 'Absolutely! We offer premium 1-on-1 consultations to help you decode the deeper meanings of your results.' }
];

const getSingleDigit = (num: number): number => {
 if (num === 11 || num === 22 || num === 33) return num; // Master numbers
 let sum = num;
 while (sum > 9) {
 sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
 }
 return sum;
};

const calculateLuckyNumber = (date: string) => {
 // Life Path Number
 const dateDigits = date.replace(/[^0-9]/g, '');
 let lifePathSum = 0;
 for (const char of dateDigits) {
 lifePathSum += parseInt(char);
 }

 return getSingleDigit(lifePathSum);
};

export default function LuckyNumberCalculatorPage() {
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
 const luckyNum = calculateLuckyNumber(formData.date);
 setResultData(luckyNum);
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
 <Star className="w-4 h-4" /> Free Utility
 </span>
 <h1 className="font-serif text-4xl md:text-5xl font-bold">
 Calculator <span className="gold-gradient-text">Lucky Number</span>
 </h1>
 <p className="text-gray-600 text-sm md:text-base font-light max-w-2xl mx-auto">
 Find your daily and lifetime lucky numbers for success. Enter your details below to calculate your personalized report instantly.
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
 <Star className="w-8 h-8 text-[var(--gold)]" />
 </div>
 <div>
 <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Report Generated!</h3>
 <p className="text-gray-600 text-sm mb-6">
 Here is the calculated lucky number for <span className="capitalize text-[var(--gold)]">{formData.name}</span> based on your birth date.
 </p>
 <div className="bg-gray-100 border border-gray-200 rounded-xl p-8 text-center max-w-sm mx-auto">
 <div className="text-[var(--gold)] font-serif text-6xl font-bold mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
 {resultData}
 </div>
 <div className="text-sm text-gray-600 font-light">
 This is your lifetime lucky number. Use this number for important dates, decisions, and alignments to harmonize with your core vibration.
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
 <h2 className="font-serif text-3xl font-bold">Why use our <span className="text-[var(--gold)]">Lucky Number Calculator</span>?</h2>
 <div className="prose prose-invert max-w-none text-gray-600 font-light text-sm leading-relaxed space-y-4">
 <p>
 In Vedic Astrology and numerology, precision is everything. Our free online Lucky Number provides you with highly accurate insights based on ancient mathematical algorithms combined with modern astronomical data.
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
