'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Star, HelpCircle, ShieldCheck, ChevronRight, Info } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { AstrologyHeroBackground } from '../../components/ui/AstrologyHeroBackground';
import { FAQSection } from '../../components/ui/FAQSection';

export default function ProfessionCareerPage() {
 const careerHouses = [
 { num: '10th', name: 'Karma Bhava (Main Career House)', desc: 'Governs your primary profession, status, public reputation, authority, and professional achievements.' },
 { num: '1st', name: 'Lagna Bhava (Self & Inclinations)', desc: 'Determines your core personality, health, natural skills, and overall direction of your life.' },
 { num: '2nd', name: 'Dhana Bhava (Source of Wealth)', desc: 'Governs accumulated wealth, speech, family assets, and how you earn money.' },
 { num: '6th', name: 'Ari Bhava (Service & Routine)', desc: 'Represents daily work life, service, challenges, competitors, and job environment.' },
 ];

 const careerPlanets = [
 { name: 'Surya (Sun)', role: 'Authority & Power', desc: 'Determines government jobs, executive management roles, administration, leadership capabilities, and status.' },
 { name: 'Guru (Jupiter)', role: 'Wisdom & Finance', desc: 'Rules teaching, advisory roles, banking, finance, consulting, judiciary, and spiritual counseling.' },
 { name: 'Shani (Saturn)', role: 'Labour & Perseverance', desc: 'Controls service, manufacturing, mining, engineering, blue-collar jobs, and long-term grit.' },
 { name: 'Budha (Mercury)', role: 'Business & Analytics', desc: 'Governs trade, commerce, software programming, communication, writing, accounting, and media.' },
 ];

 const CAREER_FAQS = [
 { q: 'How does astrology help with career decisions?', a: 'Astrology maps your natural strengths and weaknesses by analyzing the planetary positions at your birth. It reveals whether you are better suited for independent business, corporate leadership, creative fields, or stable service roles, preventing years of trial and error.' },
 { q: 'What is the 10th House in a birth chart?', a: 'The 10th House (Karma Bhava) is the primary house of profession, status, and public reputation. The planets placed here and the ruler of this house largely dictate the flavor of your career and your relationship with authority.' },
 { q: 'Can astrology tell me if I will be successful in business?', a: 'Yes. We analyze the 7th house (partnerships/trade), the 11th house (gains/profits), and the condition of Mercury (the planet of commerce). A strong combination here indicates high success in entrepreneurship.' },
 { q: 'How do you predict job changes and promotions?', a: 'By tracking the current planetary periods (Vimshottari Dasha) and the transits of slow-moving planets like Saturn and Jupiter over your career houses, we can accurately pinpoint timelines for promotions, job switches, or career breaks.' },
 { q: 'Can numerology help me choose the right profession?', a: 'Yes. Your Life Path and Destiny numbers reveal your core numerical frequency. Matching your career path to these numbers ensures a smoother journey with fewer obstacles and faster recognition.' },
 { q: 'What if my career is currently blocked or struggling?', a: 'Career blocks usually occur during difficult planetary transits (like Sade Sati or Ashtam Shani) or unfavorable Dashas. We provide specific remedies, behavioral adjustments, and timeline expectations to help you navigate the block.' },
 { q: 'Is it better to pursue a creative field or a technical field?', a: 'If planets like Venus (creativity/arts) and Moon (imagination) dominate your chart, a creative field is best. If Mars (engineering/logic) and Saturn (structure) are dominant, technical or analytical fields will bring more success.' },
 { q: 'What is Amatyakaraka and why is it important for career?', a: 'In Jaimini Astrology, the Amatyakaraka is the planet with the second-highest degree. It represents the "Minister" of your chart—the skills, tools, and professional inclinations you must use to achieve your soul\'s purpose in this life.' },
 { q: 'Can astrology determine the timing of my success?', a: 'Yes. Every birth chart has "activation periods" based on planetary cycles. Some charts promise early success in their 20s, while others have "late-bloomer" yogas that activate after age 36.' },
 { q: 'Should I change my career path if my chart shows difficulties?', a: 'Not necessarily. Difficulties often indicate lessons you need to learn. However, if your current path completely contradicts your chart\'s strong planets, pivoting to a more aligned field is highly recommended.' }
 ];

 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
 <AstrologyHeroBackground />

 <div className="max-w-6xl mx-auto space-y-16 relative z-10">
 {/* Header Hero Section */}
 <motion.div
 initial={{ opacity: 0, y: 25 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="text-center space-y-4 max-w-3xl mx-auto pt-8"
 >
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
 <Briefcase className="w-3.5 h-3.5 text-[var(--gold)] animate-pulse" /> Career Astrology
 </span>
 <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight">
 Happy Profession & <span className="gold-gradient-text">Career Guidance</span>
 </h1>
 <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
 Discover the astrological blueprints of your professional path. Align your career choices with the planetary energies in your 10th house (Karma Bhava) and Amatyakaraka to achieve happiness and abundance.
 </p>
 </motion.div>

 {/* Section: Astrological Career Blueprint */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
 <div className="lg:col-span-7 flex">
 <GoldCard className="border border-[var(--gold-200)] p-8 space-y-4 flex flex-col justify-center h-full w-full">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
 <Info className="w-5 h-5" /> Decoding Your Professional Path
 </h3>
 <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
 <p>
 Every individual has a unique combination of planets affecting their work-life indicators. Attempting a career that runs contrary to your strong planets often creates constant hurdles, low pay, or lack of fulfillment.
 </p>
 <p>
 Through Vedic Career Astrology, we analyze your D1 (Birth Chart) and D9 (Navamsha Chart) to determine whether you will thrive in an independent business, corporate service, or freelancing. We study the current Dasha cycle to identify periods of growth and when to avoid risky career switches.
 </p>
 </div>
 </GoldCard>
 </div>
 <div className="lg:col-span-5 flex relative group">
 <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
 <GoldCard flush className="border border-[var(--gold-200)] flex-1 overflow-hidden min-h-[240px]">
 <img src="/images/career_guidance.png" alt="Career Astrology Blueprint" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 </GoldCard>
 </div>
 </div>

 {/* Section: Career Houses */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Key Astrological Houses for Career
 </h2>
 <p className="text-gray-600 text-xs">
 Vedic Career Analysis focuses primarily on these four houses to map your work life.
 </p>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {careerHouses.map((house) => (
 <GoldCard key={house.num} className="border border-gray-200/60 p-4 space-y-2">
 <span className="text-[var(--gold)] font-mono font-bold text-xs">{house.num} House</span>
 <h4 className="text-gray-900 text-sm font-bold font-serif">{house.name}</h4>
 <p className="text-[11px] text-gray-600 leading-relaxed font-light">{house.desc}</p>
 </GoldCard>
 ))}
 </div>
 </div>

 {/* Section: Career Planet Roles */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Planetary Rulers of Professions
 </h2>
 <p className="text-gray-600 text-xs">
 The planet influencing your 10th house dictates the natural environment and flavor of your professional duties.
 </p>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {careerPlanets.map((planet) => (
 <GoldCard key={planet.name} className="border border-gray-200/60 p-5 space-y-2">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm">{planet.name}</h4>
 <span className="text-[10px] bg-[var(--gold-10)] text-[var(--gold)] px-2 py-0.5 rounded border border-[var(--gold-200)] font-mono uppercase inline-block">{planet.role}</span>
 <p className="text-xs text-gray-600 leading-relaxed font-light pt-1">{planet.desc}</p>
 </GoldCard>
 ))}
 </div>
 </div>

 {/* FAQ Section */}
 <div className="pt-12">
 <FAQSection faqs={CAREER_FAQS} />
 </div>

 {/* Category Booking Widget */}
 <div className="border-t border-gray-200/60 pt-16 pb-8">
 <CategoryBookingWidget category="Astrology" serviceName="Happy Profession & Career Guidance" />
 </div>
 </div>
 </div>
 );
}
