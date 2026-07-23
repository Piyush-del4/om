'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, Search, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { FAQSection } from '@/components/ui/FAQSection';
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
  { q: 'How accurate is this Free Kundli Generator?', a: 'Our calculator uses precise astronomical ephemeris data to generate highly accurate results.' },
  { q: 'Is this service completely free?', a: 'Yes, this tool is 100% free to use for unlimited calculations.' },
  { q: 'Do I need my exact birth time?', a: 'For the most accurate results, your exact time of birth is highly recommended.' },
  { q: 'Can I consult an astrologer after generating my report?', a: 'Absolutely! We offer premium 1-on-1 consultations to help you decode the deeper meanings of your results.' }
];

export default function KundliGeneratorPage() {
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background styling */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--gold)]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">

        {/* Hero Header */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 pt-8"
          >
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
              <Layers className="w-4 h-4" /> Free Vedic Utility
            </span>
            <h1 className="font-sans text-4xl md:text-5xl font-bold">
              Free Generator <span className="gold-gradient-text">Janam Kundli</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto">
              Generate your 24-section comprehensive Vedic Janam Kundli report instantly with planetary details, yogas, doshas, divisional charts, Ashtakavarga, Shadbala, transits, and remedies.
            </p>
          </motion.div>
        )}

        {/* Main Form Section */}
        <GoldCard theme="dark" className="border border-[var(--gold-200)] p-6 md:p-8">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Date of Birth</label>
                  <input
                    type="date"
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors [color-scheme:dark]"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Place of Birth</label>
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
                  <label className="text-sm text-gray-300 font-medium">Time of Birth</label>
                  <TimePicker12Hour
                    value={formData.time || '12:00'}
                    onChange={(time24) => setFormData(prev => ({ ...prev, time: time24 }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Country of Birth</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
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
                  {isSubmitting ? 'Calculating 24 Kundli Sections...' : 'Generate Full Janam Kundli Report'}
                </GoldButton>
              </div>
            </form>
          ) : (
            <div className="text-center py-2 space-y-6">

              {/* Sticky Navigation Index Bar */}
              {/* <div className="sticky top-4 z-40 bg-neutral-950/90 backdrop-blur-md border border-[var(--gold)]/40 p-2.5 rounded-xl shadow-xl overflow-x-auto print:hidden">
                <div className="flex items-center gap-2 min-w-max text-xs font-bold">
                  <button onClick={() => scrollToSection('sec-basic')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Basic & Panchang</button>
                  <button onClick={() => scrollToSection('sec-planets')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Planets Details</button>
                  <button onClick={() => scrollToSection('sec-houses')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Houses Analysis</button>
                  <button onClick={() => scrollToSection('sec-lagnamoonsun')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Lagna, Moon, Sun</button>
                  <button onClick={() => scrollToSection('sec-nakshatra')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Nakshatra</button>
                  <button onClick={() => scrollToSection('sec-yogas')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Yogas</button>
                  <button onClick={() => scrollToSection('sec-doshas')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Doshas</button>
                  <button onClick={() => scrollToSection('sec-vargas')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Vargas D1-D60</button>
                  <button onClick={() => scrollToSection('sec-ashtakavarga')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Ashtakavarga</button>
                  <button onClick={() => scrollToSection('sec-shadbala')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Shadbala</button>
                  <button onClick={() => scrollToSection('sec-aspects')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Aspects & Conjunctions</button>
                  <button onClick={() => scrollToSection('sec-predictions')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Predictions</button>
                  <button onClick={() => scrollToSection('sec-remedies')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Remedies</button>
                  <button onClick={() => scrollToSection('sec-matching')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Matching</button>
                  <button onClick={() => scrollToSection('sec-muhurat')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Muhurat</button>
                  <button onClick={() => scrollToSection('sec-transits')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Transits</button>
                  <button onClick={() => scrollToSection('sec-interactive')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Interactive Chart</button>
                  <button onClick={() => scrollToSection('sec-dasha')} className="px-3 py-1.5 bg-neutral-800 hover:bg-[var(--gold)] hover:text-black rounded-lg transition">Vimshottari Dasha</button>
                </div>
              </div> */}

              {/* 📖 Complete 24-Section Kundli Report Output */}
              <div id="report-pdf-content" className="pt-0 px-2 pb-2 sm:px-4 sm:pb-4 rounded-2xl bg-white text-black text-left space-y-8">

                <ReportHeader />

                {/* 1. Name Info (Personal Details) */}
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

                {/* 3. Lo Shu Grid Analysis (Standard grid, Birth grid, and Numerology details) */}
                <div className="pdf-page-break-avoid w-full">
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 w-full max-w-[1060px] mx-auto my-6 space-y-6">
                    <div className="bg-amber-700 dark:bg-amber-800 text-white py-2 px-6 rounded-lg text-center font-bold text-sm md:text-base max-w-xs mx-auto">
                      Lo Shu Grid Analysis
                    </div>

                    <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 md:p-6 w-full max-w-full mx-auto">
                      <LoShuGrid dateOfBirthStr={formData.date} />
                    </div>

                    <div className="w-full">
                      <NumerologyAstroDetails dateOfBirthStr={formData.date} />
                    </div>
                  </div>
                  <ReportSectionFooter />
                </div>

                {/* 4. Astro Charts (✦ Lagna Chart ✦ and ✦ Chalit Chart ✦ side-by-side) */}
                <div className="pdf-page-break-avoid w-full">
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl px-[5px] py-6 w-full max-w-full mx-auto my-6 space-y-6">
                    <div className="bg-amber-700 dark:bg-amber-800 text-white p-4 rounded-xl text-center">
                      <h3 className="font-sans font-bold text-lg md:text-2xl">
                        Astro Charts
                      </h3>
                    </div>

                    {/* Charts Grid 50-50 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] w-full">
                      {/* Lagna Chart */}
                      <div className="bg-white dark:bg-neutral-800 rounded-xl p-0 space-y-2 flex flex-col items-center justify-center w-full h-full">
                        <h4 className="font-sans font-bold text-xs md:text-sm text-amber-950 dark:text-amber-300 text-center">
                          ✦ Lagna Chart ✦
                        </h4>
                        <div className="w-full flex-1 flex items-center justify-center">
                          <NorthIndianChart data={resultData} showLegend={false} />
                        </div>
                      </div>

                      {/* Chalit Chart */}
                      <div className="bg-white dark:bg-neutral-800 rounded-xl p-0 space-y-2 flex flex-col items-center justify-center w-full h-full">
                        <h4 className="font-sans font-bold text-xs md:text-sm text-amber-950 dark:text-amber-300 text-center">
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
                  <div className="bg-[#fffef7] dark:bg-neutral-900 border-2 border-amber-300 dark:border-amber-600/50 rounded-3xl p-6 md:p-8 space-y-6 shadow-md text-black dark:text-white">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-600/40 flex items-center justify-center mx-auto text-amber-800 dark:text-amber-300">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-sans font-bold text-amber-950 dark:text-amber-200">
                        Our Premium Occult Consultations
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-650 dark:text-gray-400 max-w-xl mx-auto">
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
                          className="bg-white dark:bg-neutral-800 border border-amber-200 dark:border-neutral-700/60 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300 shadow-xs hover:shadow-sm"
                        >
                          <div className="space-y-1">
                            <h4 className="font-bold text-neutral-800 dark:text-neutral-100 text-sm md:text-base leading-snug">
                              {service.name}
                            </h4>
                            <span className="inline-block text-[11px] font-medium text-neutral-500 dark:text-gray-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded">
                              🕒 {service.duration}
                            </span>
                          </div>

                          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-700/50 flex items-center justify-between">
                            <span className="font-sans font-bold text-xl md:text-2xl text-amber-800 dark:text-amber-400">
                              ₹{service.price.toLocaleString()}
                            </span>
                            <Link
                              href="/appointments"
                              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg text-xs transition shadow-xs flex items-center gap-1 border border-amber-400/40"
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
        <div className="space-y-6 pt-12 border-t border-neutral-800/60 print:hidden">
          <h2 className="font-sans text-3xl font-bold">Why use our <span className="text-[var(--gold)]">Comprehensive Free Kundli Generator</span>?</h2>
          <div className="prose prose-invert max-w-none text-gray-300 font-light text-sm leading-relaxed space-y-4">
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
