'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Star, HelpCircle, ShieldCheck, ChevronRight, Info } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { AstrologyHeroBackground } from '../../components/ui/AstrologyHeroBackground';

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

  const FAQs = [
    { q: 'Can astrology predict when I will get a new job?', a: 'Yes. By analyzing your current Vimshottari Mahadasha/Antardasha and the transits of Saturn and Jupiter over your 10th house, we can accurately predict periods of career changes, promotions, or job offers.' },
    { q: 'How does astrology identify if I should do Business or Job?', a: 'We analyze the strength of the 7th house (business & partnerships) vs the 6th house (service & job) along with the influence of Mercury (trade) and Saturn (service).' },
    { q: 'What is Amatyakaraka (AmK) and how does it affect my career?', a: 'In Jaimini astrology, the planet with the second-highest degree in your chart is the Amatyakaraka. It signifies your professional inclination, career path, and the tools you use to achieve success.' },
  ];

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-black overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-white">
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
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Discover the astrological blueprints of your professional path. Align your career choices with the planetary energies in your 10th house (Karma Bhava) and Amatyakaraka to achieve happiness and abundance.
          </p>
        </motion.div>

        {/* Section: Astrological Career Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex">
            <GoldCard theme="dark" className="border border-[var(--gold-200)] p-8 space-y-4 flex flex-col justify-center h-full w-full">
              <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
                <Info className="w-5 h-5" /> Decoding Your Professional Path
              </h3>
              <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-light">
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
            <GoldCard flush theme="dark" className="border border-[var(--gold-200)] flex-1 overflow-hidden min-h-[240px]">
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
            <p className="text-gray-400 text-xs">
              Vedic Career Analysis focuses primarily on these four houses to map your work life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {careerHouses.map((house) => (
              <GoldCard key={house.num} className="border border-neutral-800/60 p-4 space-y-2">
                <span className="text-[var(--gold)] font-mono font-bold text-xs">{house.num} House</span>
                <h4 className="text-white text-sm font-bold font-serif">{house.name}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-light">{house.desc}</p>
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
            <p className="text-gray-400 text-xs">
              The planet influencing your 10th house dictates the natural environment and flavor of your professional duties.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerPlanets.map((planet) => (
              <GoldCard key={planet.name} className="border border-neutral-800/60 p-5 space-y-2">
                <h4 className="text-[var(--gold)] font-serif font-bold text-sm">{planet.name}</h4>
                <span className="text-[10px] bg-[var(--gold-10)] text-[var(--gold)] px-2 py-0.5 rounded border border-[var(--gold-200)] font-mono uppercase inline-block">{planet.role}</span>
                <p className="text-xs text-gray-400 leading-relaxed font-light pt-1">{planet.desc}</p>
              </GoldCard>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[var(--gold)]" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQs.map((faq, idx) => (
              <div key={idx} className="border-l-2 border-[var(--gold)] pl-4 py-2 space-y-1">
                <h4 className="text-white text-base font-bold">{faq.q}</h4>
                <p className="text-gray-400 text-sm font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Booking Widget */}
        <div className="border-t border-neutral-800/60 pt-16 pb-8">
          <CategoryBookingWidget category="Astrology" serviceName="Happy Profession & Career Guidance" />
        </div>
      </div>
    </div>
  );
}
