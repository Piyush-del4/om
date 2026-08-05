'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { FAQSection } from '@/components/ui/FAQSection';
import { env } from '@/lib/env';

const FAQS = [
 { q: 'What is a Nakshatra?', a: 'A Nakshatra is a lunar mansion in Hindu astrology. There are 27 Nakshatras, each measuring 13°20\'.' },
 { q: 'How accurate is this Nakshatra Finder?', a: 'Our calculator uses precise astronomical ephemeris data to generate highly accurate results.' },
 { q: 'Is this service completely free?', a: 'Yes, this tool is 100% free to use for unlimited calculations.' },
 { q: 'Do I need my exact birth time?', a: 'For the most accurate results, your exact time of birth is highly recommended as the Moon moves relatively quickly.' },
 { q: 'Can I consult an astrologer after generating my report?', a: 'Absolutely! We offer premium 1-on-1 consultations to help you decode the deeper meanings of your results.' }
];

const NAKSHATRAS = [
 { name: 'Ashwini', lord: 'Ketu', symbol: 'Horse\'s head' },
 { name: 'Bharani', lord: 'Venus', symbol: 'Yoni' },
 { name: 'Krittika', lord: 'Sun', symbol: 'Razor/Axe' },
 { name: 'Rohini', lord: 'Moon', symbol: 'Chariot' },
 { name: 'Mrigashira', lord: 'Mars', symbol: 'Deer\'s head' },
 { name: 'Ardra', lord: 'Rahu', symbol: 'Teardrop' },
 { name: 'Punarvasu', lord: 'Jupiter', symbol: 'Quiver of arrows' },
 { name: 'Pushya', lord: 'Saturn', symbol: 'Cow\'s udder' },
 { name: 'Ashlesha', lord: 'Mercury', symbol: 'Coiled serpent' },
 { name: 'Magha', lord: 'Ketu', symbol: 'Royal throne' },
 { name: 'Purva Phalguni', lord: 'Venus', symbol: 'Front legs of bed' },
 { name: 'Uttara Phalguni', lord: 'Sun', symbol: 'Back legs of bed' },
 { name: 'Hasta', lord: 'Moon', symbol: 'Hand/Fist' },
 { name: 'Chitra', lord: 'Mars', symbol: 'Pearl/Gem' },
 { name: 'Swati', lord: 'Rahu', symbol: 'Shoot of plant' },
 { name: 'Vishakha', lord: 'Jupiter', symbol: 'Triumphal arch' },
 { name: 'Anuradha', lord: 'Saturn', symbol: 'Lotus flower' },
 { name: 'Jyeshtha', lord: 'Mercury', symbol: 'Earring/Umbrella' },
 { name: 'Mula', lord: 'Ketu', symbol: 'Tied bunch of roots' },
 { name: 'Purva Ashadha', lord: 'Venus', symbol: 'Elephant tusk' },
 { name: 'Uttara Ashadha', lord: 'Sun', symbol: 'Elephant tusk' },
 { name: 'Shravana', lord: 'Moon', symbol: 'Ear' },
 { name: 'Dhanishta', lord: 'Mars', symbol: 'Drum' },
 { name: 'Shatabhisha', lord: 'Rahu', symbol: 'Empty circle' },
 { name: 'Purva Bhadrapada', lord: 'Jupiter', symbol: 'Swords/Two front legs of funeral cot' },
 { name: 'Uttara Bhadrapada', lord: 'Saturn', symbol: 'Twins/Back legs of funeral cot' },
 { name: 'Revati', lord: 'Mercury', symbol: 'Fish' }
];

export default function NakshatraFinderPage() {
 const [formData, setFormData] = useState({
 name: '',
 date: '',
 time: '',
 location: ''
 });
 
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [result, setResult] = useState(false);

 const [resultData, setResultData] = useState<any>(null);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);
 
 try {
 const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/astrology/proxy`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify({
 endpoint: 'planets',
 data: {
 year: parseInt(formData.date.split('-')[0]),
 month: parseInt(formData.date.split('-')[1]),
 date: parseInt(formData.date.split('-')[2]),
 hours: parseInt(formData.time.split(':')[0] || '0'),
 minutes: parseInt(formData.time.split(':')[1] || '0'),
 seconds: 0,
 latitude: 28.6139,
 longitude: 77.2090,
 timezone: 5.5,
 config: {
 observation_point: 'topocentric',
 ayanamsha: 'lahiri'
 }
 }
 }),
 });

 const data = await response.json();
 if (data.success) {
 setResultData(data.data);
 setResult(true);
 } else {
 alert('Failed to calculate: ' + (data.message || 'Unknown error'));
 }
 } catch (err) {
 console.error(err);
 alert('Network error while connecting to the astrology API.');
 } finally {
 setIsSubmitting(false);
 }
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
 <Eye className="w-4 h-4" /> Free Utility
 </span>
 <h1 className="font-serif text-4xl md:text-5xl font-bold">
 Finder <span className="gold-gradient-text">Nakshatra</span>
 </h1>
 <p className="text-gray-600 text-sm md:text-base font-light max-w-2xl mx-auto">
 Discover your birth star (Nakshatra) and its meaning. Enter your details below to calculate your personalized report instantly.
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

 <div className="space-y-2">
 <label className="text-sm text-gray-600 font-medium">Time of Birth</label>
 <input 
 type="time" 
 required
 className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)] transition-colors"
 value={formData.time}
 onChange={(e) => setFormData({...formData, time: e.target.value})}
 />
 </div>

 <div className="space-y-2">
 <label className="text-sm text-gray-600 font-medium">Place of Birth</label>
 <div className="relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
 <input 
 type="text" 
 required
 className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)] transition-colors"
 placeholder="City, Country"
 value={formData.location}
 onChange={(e) => setFormData({...formData, location: e.target.value})}
 />
 </div>
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
 <Eye className="w-8 h-8 text-[var(--gold)]" />
 </div>
 <div>
 <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Report Generated!</h3>
 <p className="text-gray-600 text-sm mb-6">
 Here are the precise lunar calculations for <span className="capitalize text-[var(--gold)]">{formData.name}</span>.
 </p>
 {(() => {
 const moonDegree = resultData?.output?.[1]?.Moon?.fullDegree;
 if (moonDegree === undefined) return null;
 const nakshatraIndex = Math.floor(moonDegree / (360 / 27));
 const nakshatra = NAKSHATRAS[nakshatraIndex];
 
 return (
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
 <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 relative overflow-hidden group hover:border-[var(--gold)] transition-colors">
 <div className="text-[var(--gold)] text-xs uppercase tracking-wider mb-2 font-semibold">Your Nakshatra</div>
 <div className="text-3xl font-serif text-gray-900">{nakshatra?.name}</div>
 </div>
 
 <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 relative overflow-hidden group hover:border-[var(--gold)] transition-colors">
 <div className="text-[var(--gold)] text-xs uppercase tracking-wider mb-2 font-semibold">Ruling Planet (Lord)</div>
 <div className="text-3xl font-serif text-gray-900">{nakshatra?.lord}</div>
 </div>
 
 <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 relative overflow-hidden group hover:border-[var(--gold)] transition-colors">
 <div className="text-[var(--gold)] text-xs uppercase tracking-wider mb-2 font-semibold">Symbol</div>
 <div className="text-2xl font-serif text-gray-900 mt-1">{nakshatra?.symbol}</div>
 </div>
 </div>
 );
 })()}
 </div>
 <GoldButton onClick={() => { setResult(false); setResultData(null); }} variant="outlined" className="mt-8">
 Calculate Again
 </GoldButton>
 </motion.div>
 )}
 </GoldCard>

 {/* SEO Content Section */}
 <div className="space-y-6 pt-12 border-t border-gray-200/60">
 <h2 className="font-serif text-3xl font-bold">Why use our <span className="text-[var(--gold)]">Nakshatra Finder</span>?</h2>
 <div className="prose prose-invert max-w-none text-gray-600 font-light text-sm leading-relaxed space-y-4">
 <p>
 In Vedic Astrology and numerology, precision is everything. Our free online Nakshatra provides you with highly accurate insights based on ancient mathematical algorithms combined with modern astronomical data.
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
