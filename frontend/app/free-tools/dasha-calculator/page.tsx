'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { FAQSection } from '@/components/ui/FAQSection';
import { VimshottariDashaTable } from '@/components/ui/VimshottariDashaTable';
import { CitySearchInput } from '@/components/ui/CitySearchInput';
import { TimePicker12Hour } from '@/components/ui/TimePicker12Hour';
import { BookAppointmentCTA } from '@/components/ui/BookAppointmentCTA';
import { env } from '@/lib/env';

const FAQS = [
 { q: 'What is a Vimshottari Dasha?', a: 'A Vimshottari Dasha is an essential tool in astrology to map your cosmic energies and decode your potential.' },
 { q: 'How accurate is this Dasha Calculator?', a: 'Our calculator uses precise astronomical ephemeris data to generate highly accurate results.' },
 { q: 'Is this service completely free?', a: 'Yes, this tool is 100% free to use for unlimited calculations.' },
 { q: 'Do I need my exact birth time?', a: 'For the most accurate results, your exact time of birth is highly recommended.' },
 { q: 'Can I consult an astrologer after generating my report?', a: 'Absolutely! We offer premium 1-on-1 consultations to help you decode the deeper meanings of your results.' }
];

export default function DashaCalculatorPage() {
 const [formData, setFormData] = useState({
 name: '',
 date: '',
 time: '',
 location: '',
 lat: 28.6139,
 lng: 77.2090,
 timezone: 5.5
 });
 
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [result, setResult] = useState(false);

 const [resultData, setResultData] = useState<any>(null);
 const [dashaApiData, setDashaApiData] = useState<any>(null);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);
 
 try {
 const payloadData = {
 year: parseInt(formData.date.split('-')[0]),
 month: parseInt(formData.date.split('-')[1]),
 date: parseInt(formData.date.split('-')[2]),
 hours: parseInt(formData.time.split(':')[0] || '0'),
 minutes: parseInt(formData.time.split(':')[1] || '0'),
 seconds: 0,
 latitude: formData.lat || 28.6139,
 longitude: formData.lng || 77.2090,
 timezone: formData.timezone || 5.5,
 config: {
 observation_point: 'topocentric',
 ayanamsha: 'lahiri'
 }
 };

 const [planetsRes, dashaRes] = await Promise.all([
 fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/astrology/proxy`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ endpoint: 'planets', data: payloadData }),
 }),
 fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/astrology/proxy`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ endpoint: 'vimsottari/maha-dasas-and-antar-dasas', data: payloadData }),
 }).catch(err => {
 console.error('Dasha API error:', err);
 return null;
 })
 ]);

 const planetsJson = await planetsRes.json();
 const dashaJson = dashaRes ? await dashaRes.json() : null;

 if (planetsJson.success) {
 setResultData(planetsJson.data);
 if (dashaJson && dashaJson.success) {
 setDashaApiData(dashaJson.data);
 }
 setResult(true);
 } else {
 alert('Failed to calculate: ' + (planetsJson.message || 'Unknown error'));
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
 {!result && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center space-y-4 pt-8"
 >
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
 <Activity className="w-4 h-4" /> Free Utility
 </span>
 <h1 className="font-serif text-4xl md:text-5xl font-bold">
 Dasha Calculator <span className="gold-gradient-text">Vimshottari Dasha</span>
 </h1>
 <p className="text-gray-600 text-sm md:text-base font-light max-w-2xl mx-auto">
 Track your major planetary periods and sub-periods. Enter your details below to calculate your personalized report instantly.
 </p>
 </motion.div>
 )}

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
 <label className="text-sm text-gray-600 font-medium">Place of Birth</label>
 <CitySearchInput 
 value={formData.location}
 onChange={(city, lat, lng, tz) => {
 setFormData(prev => ({
 ...prev,
 location: city,
 lat: lat ?? prev.lat,
 lng: lng ?? prev.lng,
 timezone: tz ?? prev.timezone
 }));
 }}
 />
 </div>

 <div className="space-y-2">
 <label className="text-sm text-gray-600 font-medium">Time of Birth</label>
 <TimePicker12Hour 
 value={formData.time || '12:00'}
 onChange={(time24) => setFormData(prev => ({ ...prev, time: time24 }))}
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
 <div className="text-center py-2 space-y-6">
 <div className="bg-white text-black p-6 rounded-2xl text-left shadow-lg">
 <VimshottariDashaTable data={resultData} dashaApiData={dashaApiData} birthDateStr={formData.date} />
 <div className="mt-8">
 <BookAppointmentCTA />
 </div>
 </div>

 <GoldButton onClick={() => { setResult(false); setResultData(null); setDashaApiData(null); }} variant="outlined" className="mt-4">
 Calculate Again
 </GoldButton>
 </div>
 )}
 </GoldCard>

 {/* SEO Content Section */}
 <div className="space-y-6 pt-12 border-t border-gray-200/60">
 <h2 className="font-serif text-3xl font-bold">Why use our <span className="text-[var(--gold)]">Dasha Calculator</span>?</h2>
 <div className="prose prose-invert max-w-none text-gray-600 font-light text-sm leading-relaxed space-y-4">
 <p>
 In Vedic Astrology, planetary cycles called Dashas dictate major life stages. Our free Vimshottari Dasha calculator generates exact Mahadasha and Antardasha dates using high-precision Swiss Ephemeris data.
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
