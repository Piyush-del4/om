'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Layers, Search, ArrowRight, HelpCircle, Sparkles, Lock, Star, ShieldCheck, Sun, Moon } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { FAQSection } from '@/components/ui/FAQSection';
import { useAuth } from '@/auth/AuthProvider';
import { client } from '@/lib/api/client';
import toast from 'react-hot-toast';
import { NorthIndianChart } from '@/components/ui/NorthIndianChart';
import { VimshottariDashaTable } from '@/components/ui/VimshottariDashaTable';
import { LoShuGrid } from '@/components/ui/LoShuGrid';
import { BookAppointmentCTA } from '@/components/ui/BookAppointmentCTA';
import { CitySearchInput } from '@/components/ui/CitySearchInput';
import { BirthDetailsTable } from '@/components/ui/BirthDetailsTable';
import { TimePicker12Hour } from '@/components/ui/TimePicker12Hour';
import { AllToolsGrid } from '@/components/ui/AllToolsGrid';
import { BasicAstroDetails } from '@/components/ui/BasicAstroDetails';
import { LuckyElementsBanner } from '@/components/ui/LuckyElementsBanner';
import { NumerologyAstroDetails } from '@/components/ui/NumerologyAstroDetails';
import { AdvancedAuditsBanner } from '@/components/ui/AdvancedAuditsBanner';
import { DownloadPDFButton } from '@/components/ui/DownloadPDFButton';
import { ReportHeader } from '@/components/ui/ReportHeader';
import { ReportSectionFooter } from '@/components/ui/ReportSectionFooter';
import { ReportThankYouCard } from '@/components/ui/ReportThankYouCard';
import { PlanetsPositionTable } from '@/components/ui/PlanetsPositionTable';
import { PlanetaryAspects } from '@/components/ui/PlanetaryAspects';
import { DivisionalChartsSection } from '@/components/ui/DivisionalChartsSection';
import { calculateVargaChart } from '@/lib/vargaCalculator';
import { env } from '@/lib/env';

// Import New Kundli Report Sections (Sections 3 to 24)
import { LagnaRashiCards } from '@/components/ui/astrology/LagnaRashiCards';
import { PlanetaryDetailsCard } from '@/components/ui/astrology/PlanetaryDetailsCard';
import { KpAstrologySystemCard } from '@/components/ui/astrology/KpAstrologySystemCard';
import { HousesAnalysisGrid } from '@/components/ui/astrology/HousesAnalysisGrid';
import { LagnaMoonSunDetails } from '@/components/ui/astrology/LagnaMoonSunDetails';
import { NakshatraAnalysisCard } from '@/components/ui/astrology/NakshatraAnalysisCard';
import { YogaAnalysisSection } from '@/components/ui/astrology/YogaAnalysisSection';
import { DoshaAnalysisSection } from '@/components/ui/astrology/DoshaAnalysisSection';
import { DashaTimelineView } from '@/components/ui/astrology/DashaTimelineView';
import { AshtakavargaTable } from '@/components/ui/astrology/AshtakavargaTable';
import { ShadbalaBreakdownChart } from '@/components/ui/astrology/ShadbalaBreakdownChart';
import { AspectsAndConjunctionsCard } from '@/components/ui/astrology/AspectsAndConjunctionsCard';
import { BirthPanchangCard } from '@/components/ui/astrology/BirthPanchangCard';
import { LifePredictionsTabs } from '@/components/ui/astrology/LifePredictionsTabs';
import { PersonalizedRemediesCard } from '@/components/ui/astrology/PersonalizedRemediesCard';
import { KundliMatchingWidget } from '@/components/ui/astrology/KundliMatchingWidget';
import { MuhuratFinderWidget } from '@/components/ui/astrology/MuhuratFinderWidget';
import { TransitGocharWidget } from '@/components/ui/astrology/TransitGocharWidget';
import { InteractiveChartViewer } from '@/components/ui/astrology/InteractiveChartViewer';

const FAQS = [
 { q: 'What is a Kundli?', a: 'A Kundli is an essential tool in astrology to map your cosmic energies and decode your potential.' },
 { q: 'How accurate is this Premium Kundli Generator?', a: 'Our calculator uses precise astronomical ephemeris data to generate highly accurate results.' },
 { q: 'Why does it cost ₹50?', a: 'This is a premium personalized report with 20+ detailed sections including Dasha, Remedies, Yogas, and more.' },
 { q: 'Do I need my exact birth time?', a: 'For the most accurate results, your exact time of birth is highly recommended.' },
 { q: 'Can I consult an astrologer after generating my report?', a: 'Absolutely! We offer premium 1-on-1 consultations to help you decode the deeper meanings of your results.' }
];

declare global {
 interface Window {
 Razorpay: any;
 }
}

function PremiumPaywall({
  onPaymentSuccess,
}: {
  onPaymentSuccess: () => void;
}) {
 const { user } = useAuth();
 const router = useRouter();
 const [isProcessing, setIsProcessing] = useState(false);

 const handlePayment = async () => {
 if (!user) { router.push('/login?redirect=/premium-personalized-kundli'); return; }
 setIsProcessing(true);
 try {
 // Load Razorpay script if not already loaded
 if (!window.Razorpay) {
 await new Promise<void>((resolve, reject) => {
 const script = document.createElement('script');
 script.src = 'https://checkout.razorpay.com/v1/checkout.js';
 script.async = true;
 script.onload = () => resolve();
 script.onerror = () => reject(new Error('Failed to load Razorpay script'));
 document.body.appendChild(script);
 });
 }

 // Create Razorpay order via backend
 const orderRes = await client.post('/payments/kundli-order', { amount: 5000 }); // 5000 paise = ₹50
 const order = orderRes.data?.data;

 // Detect mock/development order
 const orderId = order?.razorpayOrderId || order?.orderId || order?.id;
 if (orderId && typeof orderId === 'string' && orderId.startsWith('order_mock_')) {
 toast.success('Development payment mock enabled. Your premium Kundli access is unlocked.');
 setIsProcessing(false);
 onPaymentSuccess();
 return;
 }

 const razorpayKey = order?.key || env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
 if (!razorpayKey || razorpayKey.startsWith('rzp_test_placeholder')) {
 toast.success('Development payment mock enabled. Your premium Kundli access is unlocked.');
 setIsProcessing(false);
 onPaymentSuccess();
 return;
 }

 const options = {
 key: razorpayKey,
 amount: order?.amount || 5000,
 currency: 'INR',
 name: 'OM Astrology AMC',
 description: 'Premium Personalized Kundli Report',
 order_id: orderId,
 handler: async (response: any) => {
 try {
 // Verify payment using camelCase keys matching backend expectations
 await client.post('/payments/kundli-verify', {
 razorpayOrderId: response.razorpay_order_id,
 razorpayPaymentId: response.razorpay_payment_id,
 razorpaySignature: response.razorpay_signature,
 });
 toast.success('Payment successful! Generating your Kundli...');
 onPaymentSuccess();
 } catch (verifyError) {
 const vErr = verifyError as any;
 console.error('Payment verification error:', vErr);
 toast.error('Payment verification failed. Please contact support.');
 setIsProcessing(false);
 }
 },
 prefill: {
 name: user.name || '',
 email: user.email || '',
 },
 theme: { color: '#b8860b' },
 modal: { ondismiss: () => setIsProcessing(false) },
 };

 const rzp = new window.Razorpay(options);
 rzp.open();
 } catch (error) {
 const err = error as any;
 const errMsg = err?.response?.data?.error?.message || err?.message || 'Could not initiate payment. Please try again.';
 toast.error(errMsg);
 setIsProcessing(false);
 }
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50/80 flex items-center justify-center px-4 py-24">
 <div className="max-w-lg w-full space-y-8 text-center">
 {/* Book Cover Image */}
 <motion.div
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.4, ease: 'easeOut' }}
 className="relative mx-auto w-56 h-72 flex items-center justify-center"
 >
 <Image
 src="/images/premium-kundli-book.jpg"
 alt="Premium Personalized Kundli"
 fill
 priority
 quality={100}
 sizes="(max-width: 640px) 100vw, 224px"
 className="object-contain"
 />
 </motion.div>

 {/* Title */}
 <div className="space-y-3">
 <span className="text-[var(--gold-dark)] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2">
 <Star className="w-4 h-4" /> Premium Service
 </span>
 <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
 Premium Personalized
 <span className="gold-gradient-text block">Kundli Report</span>
 </h1>
 <p className="text-neutral-600 text-sm max-w-md mx-auto leading-relaxed">
 Get a 20+ section fully detailed Janam Kundli with charts, Dasha, Yogas, and Remedies — all personalized to your exact birth details.
 </p>
 </div>

 {/* Feanures */}
 <div className="grid grid-cols-2 gap-3 text-left">
 {[
 '✦ Lagna & Chalit Charts',
 '✦ Vimshottari Dasha',
 '✦ Vedic Remedies',
 '✦ Numerology Report',
 '✦ Yoga & Dosha Analysis',
 ].map((f, i) => (
 <div key={i} className="flex items-center gap-2 text-xs text-amber-900/80 bg-amber-100/80 border border-amber-300/50 rounded-xl px-3 py-2">
 {f}
 </div>
 ))}
 </div>

 {/* Price & CTA */}
 <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 space-y-4 shadow-lg shadow-amber-100/60 ">
 <div className="flex items-center justify-center gap-3">
 <span className="text-gray-600 line-through text-lg">₹1000</span>
 <span className="text-4xl font-sans font-bold text-[var(--gold-dark)] ">₹50</span>
 </div>


 <button
 onClick={handlePayment}
 disabled={isProcessing}
 className="w-full py-4 px-6 bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)] text-black font-bold text-lg rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-amber-300/40"
 >
 {isProcessing ? (
 <><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></span> Processing...</>
 ) : (
 <><Lock className="w-5 h-5" /> Generate Kundli</>
 )}
 </button>

 </div>

 <p className="text-xs text-gray-600 ">
 Don&apos;t have an account?{' '}
 <Link href="/register" className="text-[var(--gold-dark)] hover:underline">Create free account</Link>
 {' '}to purchase
 </p>
 </div>
 </div>
 );
}

export default function PremiumKundliGeneratorPage() {
 const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
 const router = useRouter();
 const searchParams = useSearchParams();
 const savedId = searchParams.get('id');
  const [hasPaid, setHasPaid] = useState(false);

  const [formData, setFormData] = useState({
  name: '',
  date: '',
  time: '',
  location: '',
  country: 'India',
  lat: 28.6139,
  lng: 77.2090,
  timezone: 5.5
  });

  useEffect(() => {
    if (user && !savedId) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        date: prev.date || user.dateOfBirth || '',
        time: prev.time || user.birthTime || '',
        location: prev.location || user.birthPlace || '',
      }));
    }
  }, [user, savedId]);

 const [isSubmitting, setIsSubmitting] = useState(false);
 const [result, setResult] = useState(false);

 const [resultData, setResultData] = useState<any>(null);
 const [dashaApiData, setDashaApiData] = useState<any>(null);

 
 // Auth guard removed - allow unauthenticated users to see paywall

 // Load saved Kundli if id parameter is provided
 useEffect(() => {
 if (!savedId || !isAuthenticated) return;

 const loadSavedKundli = async () => {
 setIsSubmitting(true);
 try {
 const res = await client.get(`/astrology/submissions/${savedId}`);
 const savedData = res.data?.data;
 if (savedData) {
 setFormData({
 name: savedData.name,
 date: savedData.date,
 time: savedData.time,
 location: savedData.location,
 country: savedData.country || 'India',
 lat: savedData.latitude,
 lng: savedData.longitude,
 timezone: savedData.timezone,
 });
 
 setHasPaid(true);

 const payloadData = {
 year: parseInt(savedData.date.split('-')[0]),
 month: parseInt(savedData.date.split('-')[1]),
 date: parseInt(savedData.date.split('-')[2]),
 hours: parseInt(savedData.time.split(':')[0] || '0'),
 minutes: parseInt(savedData.time.split(':')[1] || '0'),
 seconds: 0,
 latitude: savedData.latitude,
 longitude: savedData.longitude,
 timezone: savedData.timezone,
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
 toast.error('Failed to load saved Kundli: ' + (planetsJson.message || 'Unknown error'));
 }
 }
 } catch (err) {
 console.error('Error loading saved Kundli:', err);
 toast.error('Error loading saved Kundli details.');
 } finally {
 setIsSubmitting(false);
 }
 };

 loadSavedKundli();
 }, [savedId, isAuthenticated]);

 // Show loading while auth resolves
 if (isLoading) {
 return (
 <div className="min-h-screen bg-white flex items-center justify-center">
 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--gold)]"></div>
 </div>
 );
 }

 // Show paywall for non-admin users who haven't paid (including unauthenticated users)
 if (!isAdmin && !hasPaid) {
 return <PremiumPaywall onPaymentSuccess={() => setHasPaid(true)} />;
 }

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

 // Save submission to database for saved list
 try {
 await client.post('/astrology/submissions', {
 name: formData.name,
 date: formData.date,
 time: formData.time,
 location: formData.location,
 country: formData.country,
 latitude: formData.lat || 28.6139,
 longitude: formData.lng || 77.2090,
 timezone: formData.timezone || 5.5,
 });
 } catch (saveErr) {
 console.error('Failed to save Kundli submission:', saveErr);
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
 <div className="relative min-h-screen bg-white text-black overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--gold)]/20 blur-[120px] rounded-full pointer-events-none" />

 <div className="max-w-5xl mx-auto space-y-12 relative z-10">

 {/* Hero Header */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center space-y-4 pt-8"
 >
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
 <Star className="w-4 h-4" /> Premium Service
 </span>
 <h1 className="font-sans text-4xl md:text-5xl font-bold">
 Premium Personalized <span className="gold-gradient-text">Kundli Report</span>
 </h1>
 <p className="text-neutral-600 text-sm md:text-base font-light max-w-2xl mx-auto">
 Generate your 24-section comprehensive Vedic Janam Kundli report instantly with planetary details, yogas, doshas, divisional charts, Ashtakavarga, Shadbala, transits, and remedies.
 </p>
 </motion.div>

 {/* Main Form Section */}
 <GoldCard  className="border border-[var(--gold-200)] p-6 md:p-8">
 {!result ? (
 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-sm text-neutral-700 font-medium">Full Name</label>
 <input
 type="text"
 required
 className="w-full bg-white border border-amber-300 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:border-[var(--gold)] transition-colors"
 placeholder="Enter your name"
 value={formData.name}
 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 />
 </div>

 <div className="space-y-2">
 <label className="text-sm text-neutral-700 font-medium">Date of Birth</label>
 <input
 type="date"
 required
 className="w-full bg-white border border-amber-300 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:border-[var(--gold)] transition-colors [color-scheme:light]"
 value={formData.date}
 onChange={(e) => setFormData({ ...formData, date: e.target.value })}
 />
 </div>

 <div className="space-y-2">
 <label className="text-sm text-neutral-700 font-medium">Place of Birth</label>
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
 <label className="text-sm text-neutral-700 font-medium">Time of Birth</label>
 <TimePicker12Hour
 value={formData.time || '12:00'}
 onChange={(time24) => setFormData(prev => ({ ...prev, time: time24 }))}
 />
 </div>

 <div className="space-y-2">
 <label className="text-sm text-neutral-700 font-medium">Country of Birth</label>
 <input
 type="text"
 required
 className="w-full bg-white border border-amber-300 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:border-[var(--gold)] transition-colors"
 placeholder="e.g. India, USA, UK"
 value={formData.country}
 onChange={(e) => setFormData({ ...formData, country: e.target.value })}
 />
 </div>
 </div>

 <div className="pt-4 flex justify-center">
 <GoldButton
 type="submit"
 variant="filled"
 className="w-full md:w-auto min-w-[240px] px-8 py-3.5 flex justify-center text-base font-bold"
 disabled={isSubmitting}
 >
 {isSubmitting ? 'Calculating 24 Kundli Sections...' : '✦ Get PREMIUM PERSONALIZED KUNDLI ✦'}
 </GoldButton>
 </div>
 </form>
 ) : (
 <div className="text-center py-2 space-y-6">
 {/* Report Output Section */}
 <div id="report-pdf-content" className="pt-0 px-2 pb-2 sm:px-4 sm:pb-4 rounded-2xl bg-white text-neutral-900 border border-amber-300/60 shadow-[0_0_0_1px_rgba(0,0,0,0.03)] text-left space-y-8">

 <ReportHeader />

 {/* 1. Name Info */}
 <div id="sec-basic" className="pdf-page-break-avoid w-full">
 <BirthDetailsTable
 name={formData.name}
 date={formData.date}
 time={formData.time}
 location={formData.location}
 lat={formData.lat}
 lng={formData.lng}
 timezone={formData.timezone}
 />
 <ReportSectionFooter />
 </div>

 {/* 2. Astro Info */}
 <div className="pdf-page-break-avoid w-full space-y-4">
 <BasicAstroDetails data={resultData} />
 <LagnaRashiCards data={resultData} />
 <ReportSectionFooter />
 </div>

 {/* 3. Lo Shu Grid */}
 <div className="pdf-page-break-avoid w-full">
 <div className="bg-white rounded-2xl p-6 w-full max-w-[1060px] mx-auto my-6 space-y-6">
 <div className="bg-amber-700 text-gray-900 py-2 px-6 rounded-lg text-center font-bold text-sm md:text-base max-w-xs mx-auto">
 Lo Shu Grid Analysis
 </div>
 <div className="bg-white rounded-xl p-4 md:p-6 w-full max-w-full mx-auto">
 <LoShuGrid dateOfBirthStr={formData.date} />
 </div>
 <div className="w-full">
 <NumerologyAstroDetails dateOfBirthStr={formData.date} />
 </div>
 </div>
 <ReportSectionFooter />
 </div>

 {/* 4. Astro Charts */}
 <div className="pdf-page-break-avoid w-full">
 <div className="bg-white rounded-2xl px-[5px] py-6 w-full max-w-full mx-auto my-6 space-y-6">
 <div className="bg-amber-700 text-gray-900 p-4 rounded-xl text-center">
 <h3 className="font-sans font-bold text-lg md:text-2xl">Astro Charts</h3>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] w-full">
 <div className="bg-white rounded-xl p-0 space-y-2 flex flex-col items-center justify-center w-full h-full">
 <h4 className="font-sans font-bold text-xs md:text-sm text-amber-950 text-center">
 ✦ Lagna Chart ✦
 </h4>
 <div className="w-full flex-1 flex items-center justify-center">
 <NorthIndianChart data={resultData} showLegend={false} />
 </div>
 </div>

 <div className="bg-white rounded-xl p-0 space-y-2 flex flex-col items-center justify-center w-full h-full">
 <h4 className="font-sans font-bold text-xs md:text-sm text-amber-950 text-center">
 ✦ Chalit Chart ✦
 </h4>
 <div className="w-full flex-1 flex items-center justify-center">
 {(() => {
 const chalitData = calculateVargaChart(resultData, 'chalit');
 return <NorthIndianChart data={chalitData} showLegend={false} />;
 })()}
 </div>
 </div>
 </div>
 </div>
 <ReportSectionFooter />
 </div>

 {/* 4. Planetary Detail */}
 <div id="sec-planets" className="pdf-page-break-avoid w-full space-y-4">
 <PlanetaryDetailsCard data={resultData} />
 <ReportSectionFooter />
 </div>

 {/* 4.5 Auspicious Lucky Elements */}
 <div className="pdf-page-break-avoid w-full">
 <LuckyElementsBanner dateOfBirthStr={formData.date} />
 <ReportSectionFooter />
 </div>

 {/* 5. Rudraksha & Traditional Remedies */}
 <div id="sec-remedies" className="pdf-page-break-avoid w-full">
 <PersonalizedRemediesCard data={resultData} birthDateStr={formData.date} />
 <ReportSectionFooter />
 </div>

 {/* 6. Dashas */}
 <div id="sec-dasha" className="pdf-page-break-avoid w-full">
 <DashaTimelineView data={resultData} dashaApiData={dashaApiData} birthDateStr={formData.date} />
 <ReportSectionFooter />
 </div>

 {/* 7. Our Services (Appointments) */}
 <div className="pdf-page-break-avoid w-full">
 <div className="bg-[#fffef7] border-2 border-amber-300 rounded-3xl p-6 md:p-8 space-y-6 shadow-md text-black ">
 <div className="text-center space-y-2">
 <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto text-amber-800 ">
 <Sparkles className="w-6 h-6" />
 </div>
 <h3 className="text-2xl md:text-3xl font-sans font-bold text-amber-950 ">
 Our Premium Occult Consultations
 </h3>
 <p className="text-xs md:text-sm text-neutral-650 max-w-xl mx-auto">
 Speak directly with certified Vedic Astrologers, master Numerologists, and professional Tarot Readers to decode your planetary remedies and future timeline.
 </p>
 </div>

 {/* Services Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {[
 { name: "Tarot Reading", duration: "30 mins", price: 99 },
 { name: "Mobile Number Numerology Analysis", duration: "30 mins", price: 500 },
 { name: "Kundali Reading", duration: "30 mins", price: 1100 },
 { name: "Personal Tarot Reading", duration: "30 mins", price: 1100 },
 { name: "Numerology Analysis", duration: "30 mins", price: 2000 },
 { name: "Signature Analysis", duration: "30 mins", price: 2100 },
 { name: "Name Correction Consultation", duration: "30 mins", price: 2000 },
 { name: "नाम करण", duration: "30 mins", price: 3200 },
 { name: "Career Guidance Consultation", duration: "30 mins", price: 5000 },
 { name: "Marriage Matching (Kundali Matching)", duration: "30 mins", price: 5100 },
 { name: "Complete Life Analysis", duration: "60 mins", price: 11000 },
 { name: "Corporate Numerology Consultation", duration: "30 mins", price: 25000 }
 ].map((service, index) => (
 <div
 key={index}
 className="bg-white border border-amber-200 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-400 :border-amber-500 transition-all duration-300 shadow-xs hover:shadow-sm"
 >
 <div className="space-y-1">
 <h4 className="font-bold text-neutral-800 text-sm md:text-base leading-snug">
 {service.name}
 </h4>
 <span className="inline-block text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
 🕒 {service.duration}
 </span>
 </div>

 <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
 <span className="font-sans font-bold text-xl md:text-2xl text-amber-800 ">
 ₹{service.price.toLocaleString()}
 </span>
 <Link
 href="/appointments"
 className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold rounded-lg text-xs transition shadow-xs flex items-center gap-1 border border-amber-400/40"
 >
 Book Now
 </Link>
 </div>
 </div>
 ))}
 </div>
 </div>
 <ReportSectionFooter />
 </div>

 {/* 8. Thank You */}
 <div className="pdf-page-break-avoid w-full">
 <ReportThankYouCard />
 </div>

 </div>

 {/* Action Buttons: Download PDF & Calculate Again */}
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 print:hidden">
 <DownloadPDFButton fullName={formData.name} reportType="kundli" />
 <GoldButton onClick={() => { setResult(false); setResultData(null); }} variant="outlined">
 Calculate New Kundli
 </GoldButton>
 </div>
 </div>
 )}
 </GoldCard>

 {/* SEO Content Section */}
 <div className="space-y-6 pt-12 border-t border-gray-200/60 print:hidden">
 <h2 className="font-sans text-3xl font-bold">Why use our <span className="text-[var(--gold)]">Comprehensive Free Kundli Generator</span>?</h2>
 <div className="prose prose-invert max-w-none text-gray-600 font-light text-sm leading-relaxed space-y-4">
 <p>
 In Vedic Astrology and numerology, precision is everything. Our free online Kundli provides you with highly accurate insights based on ancient Parashari mathematical algorithms combined with modern astronomical ephemeris data.
 </p>
 <p>
 Decode all 24 vital aspects of your birth chart including 15 divisional charts (D2 to D60), 14+ planetary yogas, 8 dosha audits, Ashtakavarga, Shadbala 6-fold strength, Vimshottari dasha timeline, and personalized traditional remedies.
 </p>
 </div>
 </div>

 {/* All Free Tools Section */}
 <div className="print:hidden">
 <AllToolsGrid />
 </div>

 {/* FAQs */}
 <div className="pt-8 print:hidden">
 <FAQSection faqs={FAQS} />
 </div>

 </div>
 </div>
 );
}
