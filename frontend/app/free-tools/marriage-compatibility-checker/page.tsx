'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { FAQSection } from '@/components/ui/FAQSection';
import { DailyPanchangMuhuratWidget } from '@/components/ui/astrology/DailyPanchangMuhuratWidget';
import { env } from '@/lib/env';

const FAQS = [
 { q: 'What is a Marriage Match?', a: 'A Marriage Match is an essential tool in astrology to map your cosmic energies and decode your potential.' },
 { q: 'How accurate is this Marriage Compatibility Checker?', a: 'Our calculator uses precise astronomical ephemeris data to generate highly accurate results.' },
 { q: 'Is this service completely free?', a: 'Yes, this tool is 100% free to use for unlimited calculations.' },
 { q: 'Do I need my exact birth time?', a: 'For the most accurate results, your exact time of birth is highly recommended.' },
 { q: 'Can I consult an astrologer after generating my report?', a: 'Absolutely! We offer premium 1-on-1 consultations to help you decode the deeper meanings of your results.' }
];

export default function MarriageCompatibilityCheckerPage() {
 const [formData, setFormData] = useState({
 m_name: '', m_date: '', m_time: '', m_location: '',
 f_name: '', f_date: '', f_time: '', f_location: ''
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
 endpoint: 'match-making/ashtakoot-score',
 data: {
 male: {
 year: parseInt(formData.m_date.split('-')[0]),
 month: parseInt(formData.m_date.split('-')[1]),
 date: parseInt(formData.m_date.split('-')[2]),
 hours: parseInt(formData.m_time.split(':')[0] || '0'),
 minutes: parseInt(formData.m_time.split(':')[1] || '0'),
 seconds: 0,
 latitude: 28.6139,
 longitude: 77.2090,
 timezone: 5.5
 },
 female: {
 year: parseInt(formData.f_date.split('-')[0]),
 month: parseInt(formData.f_date.split('-')[1]),
 date: parseInt(formData.f_date.split('-')[2]),
 hours: parseInt(formData.f_time.split(':')[0] || '0'),
 minutes: parseInt(formData.f_time.split(':')[1] || '0'),
 seconds: 0,
 latitude: 28.6139,
 longitude: 77.2090,
 timezone: 5.5
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
 <Heart className="w-4 h-4" /> Free Utility
 </span>
 <h1 className="font-serif text-4xl md:text-5xl font-bold">
 Marriage Compatibility Checker <span className="gold-gradient-text">Marriage Match</span>
 </h1>
 </motion.div>

 {/* Main Form Section */}
 <GoldCard className="border border-[var(--gold-200)] p-6 md:p-8">
 {!result ? (
 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
 {/* Male Details */}
 <div className="space-y-6 pt-6 md:pt-0">
 <h3 className="text-xl font-serif text-[var(--gold)]">Male Details</h3>
 <div className="space-y-2">
 <label className="text-sm text-gray-600 font-medium">Full Name</label>
 <input 
 type="text" required
 className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)]"
 placeholder="Male's Name"
 value={formData.m_name} onChange={(e) => setFormData({...formData, m_name: e.target.value})}
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm text-gray-600 font-medium">Date of Birth</label>
 <input 
 type="date" required
 className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)]"
 value={formData.m_date} onChange={(e) => setFormData({...formData, m_date: e.target.value})}
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm text-gray-600 font-medium">Time of Birth</label>
 <input 
 type="time" required
 className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)]"
 value={formData.m_time} onChange={(e) => setFormData({...formData, m_time: e.target.value})}
 />
 </div>
 </div>

 {/* Female Details */}
 <div className="space-y-6 pt-6 md:pt-0 md:pl-8">
 <h3 className="text-xl font-serif text-[var(--gold)]">Female Details</h3>
 <div className="space-y-2">
 <label className="text-sm text-gray-600 font-medium">Full Name</label>
 <input 
 type="text" required
 className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)]"
 placeholder="Female's Name"
 value={formData.f_name} onChange={(e) => setFormData({...formData, f_name: e.target.value})}
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm text-gray-600 font-medium">Date of Birth</label>
 <input 
 type="date" required
 className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)]"
 value={formData.f_date} onChange={(e) => setFormData({...formData, f_date: e.target.value})}
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm text-gray-600 font-medium">Time of Birth</label>
 <input 
 type="time" required
 className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--gold)]"
 value={formData.f_time} onChange={(e) => setFormData({...formData, f_time: e.target.value})}
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
 <Heart className="w-8 h-8 text-[var(--gold)]" />
 </div>
 <div>
 <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Match Report Generated!</h3>
 <p className="text-gray-600 text-sm mb-6">
 Here is the detailed Ashtakoot compatibility score for <span className="capitalize text-[var(--gold)]">{formData.m_name}</span> & <span className="capitalize text-[var(--gold)]">{formData.f_name}</span>.
 </p>
 {(() => {
 const out = resultData?.output;
 if (!out) return null;
 
 const score = out.total_score || 0;
 const total = out.out_of || 36;
 const percentage = Math.round((score / total) * 100);
 
 // Score interpretation
 let interpretation = 'Excellent Match';
 let colorClass = 'text-green-600';
 if (score < 18) {
 interpretation = 'Not Recommended';
 colorClass = 'text-red-600';
 } else if (score < 25) {
 interpretation = 'Average Match';
 colorClass = 'text-yellow-600';
 }

 const kootas = [
 { name: 'Varna', key: 'varna_kootam' },
 { name: 'Vasya', key: 'vasya_kootam' },
 { name: 'Tara', key: 'tara_kootam' },
 { name: 'Yoni', key: 'yoni_kootam' },
 { name: 'Graha Maitri', key: 'graha_maitri_kootam' },
 { name: 'Gana', key: 'gana_kootam' },
 { name: 'Rasi', key: 'rasi_kootam' },
 { name: 'Nadi', key: 'nadi_kootam' }
 ];

 return (
 <div className="max-w-4xl mx-auto space-y-8">
 {/* Big Score Card */}
 <div className="bg-gray-100 border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold)]/5 to-transparent pointer-events-none" />
 <div className="text-gray-600 font-medium tracking-widest uppercase text-sm mb-4">Total Guna Milan Score</div>
 <div className="flex items-baseline gap-2 mb-2">
 <span className="text-7xl font-serif text-gray-900">{score}</span>
 <span className="text-2xl text-gray-500 font-light">/ {total}</span>
 </div>
 <div className={`text-xl font-semibold tracking-wide ${colorClass}`}>
 {interpretation} ({percentage}%)
 </div>
 </div>

 {/* 8 Kootas Grid */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {kootas.map((koota) => {
 const kData = out[koota.key];
 if (!kData) return null;
 return (
 <div key={koota.name} className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center">
 <div className="text-gray-600 text-xs uppercase tracking-wider mb-2 text-center">{koota.name}</div>
 <div className="text-2xl font-serif text-gray-900">
 <span className={kData.score === kData.out_of ? 'text-[var(--gold)]' : (kData.score === 0 ? 'text-red-600' : 'text-gray-900')}>
 {kData.score}
 </span>
 <span className="text-gray-600 text-lg"> / {kData.out_of}</span>
 </div>
 </div>
 );
 })}
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
 <h2 className="font-serif text-3xl font-bold">Why use our <span className="text-[var(--gold)]">Marriage Compatibility Checker</span>?</h2>
 <div className="prose prose-invert max-w-none text-gray-600 font-light text-sm leading-relaxed space-y-4">
 <p>
 In Vedic Astrology and numerology, precision is everything. Our free online Marriage Match provides you with highly accurate insights based on ancient mathematical algorithms combined with modern astronomical data.
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
