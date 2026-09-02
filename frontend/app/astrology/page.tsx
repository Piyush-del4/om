'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, HelpCircle, Info, Loader2, BookOpen, Download } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '../../components/ui/CategoryBatchesList';
import { AstrologyHeroBackground } from '../../components/ui/AstrologyHeroBackground';
import { client } from '@/lib/api/client';
import { FAQSection } from '../../components/ui/FAQSection';
import { DailyPanchangMuhuratWidget } from '../../components/ui/astrology/DailyPanchangMuhuratWidget';

const ASTROLOGY_HOUSES = [
 { _id: '1', num: '1st', name: 'Lagna (Self)', desc: 'Physical appearance, health, personality, and life path.' },
 { _id: '2', num: '2nd', name: 'Dhana (Wealth)', desc: 'Finances, family background, speech, and early childhood.' },
 { _id: '3', num: '3rd', name: 'Sahaja (Courage)', desc: 'Siblings, communication, short journeys, and willpower.' },
 { _id: '4', num: '4th', name: 'Bandhu (Happiness)', desc: 'Mother, home, properties, vehicles, and peace of mind.' },
 { _id: '5', num: '5th', name: 'Putra (Intellect)', desc: 'Children, education, romance, creativity, and past karma.' },
 { _id: '6', num: '6th', name: 'Ari (Obstacles)', desc: 'Health, enemies, daily routines, service, and debts.' },
 { _id: '7', num: '7th', name: 'Yuvati (Partnership)', desc: 'Marriage, business partners, public life, and legal contracts.' },
 { _id: '8', num: '8th', name: 'Randhra (Longevity)', desc: 'Unearned wealth, transformation, research, and occult sciences.' },
 { _id: '9', num: '9th', name: 'Dharma (Luck)', desc: 'Spirituality, higher education, father, fortune, and travel.' },
 { _id: '10', num: '10th', name: 'Karma (Career)', desc: 'Profession, public status, authority, and accomplishments.' },
 { _id: '11', num: '11th', name: 'Labha (Gains)', desc: 'Income, elder siblings, social circle, and fulfilled desires.' },
 { _id: '12', num: '12th', name: 'Vyaya (Losses)', desc: 'Subconscious, spirituality, isolation, foreign travels, and sleep.' },
];

const ASTROLOGY_GRAHAS = [
 { _id: '1', name: 'Surya (Sun)', sign: 'Soul & Authority', desc: 'Represents father, government relations, career status, vitality, and inner confidence.' },
 { _id: '2', name: 'Chandra (Moon)', sign: 'Mind & Emotion', desc: 'Governs mother, emotional health, peace of mind, intuition, and memory capacity.' },
 { _id: '3', name: 'Mangal (Mars)', sign: 'Energy & Drive', desc: 'Rules courage, physical strength, real estate, anger management, and action.' },
 { _id: '4', name: 'Budha (Mercury)', sign: 'Intellect & Speech', desc: 'Controls logic, analytical abilities, business acumen, communication, and education.' },
 { _id: '5', name: 'Guru (Jupiter)', sign: 'Wisdom & Expansion', desc: 'Governs luck, children, higher learning, wealth, and spirituality.' },
 { _id: '6', name: 'Shukra (Venus)', sign: 'Love & Luxury', desc: 'Represents spouse, vehicle purchase, arts, comfort, relationships, and refinement.' },
 { _id: '7', name: 'Shani (Saturn)', sign: 'Karma & Discipline', desc: 'Rules structure, lifespan, delay, hard work, lessons, public service, and justice.' },
 { _id: '8', name: 'Rahu (North Node)', sign: 'Obsession & Future', desc: 'Represents technology, foreign cultures, desires, illusions, and sudden progress.' },
 { _id: '9', name: 'Ketu (South Node)', sign: 'Detachment & Past', desc: 'Represents spirituality, liberation (Moksha), deep research, isolation, and past life skills.' },
];

const ASTROLOGY_FAQS = [
 { _id: '1', q: 'What is Vedic Astrology and how is it different from Western Astrology?', a: 'Vedic Astrology (Jyotish) uses the Sidereal zodiac based on actual star positions, while Western Astrology uses the Tropical zodiac based on seasons. Vedic Astrology is more accurate for predicting life events and timing using the Vimshottari Dasha system.' },
 { _id: '2', q: 'What information do I need for a birth chart reading?', a: 'You need your exact date of birth, time of birth, and place of birth. The more accurate the birth time, the more precise the reading will be.' },
 { _id: '3', q: 'Can astrology predict the future exactly?', a: 'Astrology shows the energetic roadmap of your life based on your karma. While it predicts major life trends, timelines (dashas), and possibilities, your free will and actions shape the final outcome.' },
 { _id: '4', q: 'How can astrology help with career decisions?', a: 'By analyzing the 10th house (career), Amatyakaraka (career significator), and planetary dashas, we can identify the best career paths, timing for job changes, and periods favorable for business growth.' },
 { _id: '5', q: 'What are planetary remedies in Vedic Astrology?', a: 'Vedic remedies include mantras, gemstones, charity (seva), and lifestyle adjustments that help balance planetary influences in your birth chart. They act as shock absorbers to neutralize difficult planetary periods.' },
 { _id: '6', q: 'What is a Kundli (Birth Chart)?', a: 'A Kundli is an astrological map of the sky at the exact moment and location of your birth. It contains 12 houses and 9 planets, serving as a blueprint of your personality, past karma, and future potential.' },
 { _id: '7', q: 'What is Shani Sade Sati and should I fear it?', a: 'Sade Sati is a 7.5-year period when Saturn transits over your natal Moon. While it brings challenges and hard work, it is not inherently bad. It is a period of karmic cleansing, discipline, and maturity that often sets the foundation for future success.' },
 { _id: '8', q: 'What is Manglik Dosha and how does it affect marriage?', a: 'Manglik Dosha occurs when Mars is placed in specific houses (1st, 2nd, 4th, 7th, 8th, or 12th) in your chart. It indicates high energy and potential friction in marriage. It is managed by matching charts with another Manglik or performing specific remedies.' },
 { _id: '9', q: 'How long does an astrology consultation session last?', a: 'Sessions typically range from 30 to 60 minutes depending on the consultation package chosen. You can book a session online and join via video call from anywhere.' },
 { _id: '10', q: 'Are online astrology consultations as accurate as in-person?', a: 'Yes. Astrological calculations are based on mathematics and planetary geometry. The physical location of the reading does not impact its accuracy at all.' },
];

export default function AstrologyPage() {

 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
 {/* Astrological Meridian Star Background */}
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
 <Star className="w-3.5 h-3.5 fill-[var(--gold)] animate-pulse" /> Vedanga Astrology Consultation
 </span>
 <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight">
 Map Your Destiny With the <span className="gold-gradient-text">Stars</span>
 </h1>
 <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
 Vedic Astrology (Jyotish) is an ancient Indian science. By studying where the planets were when you were born, we can understand your life path, personality, strengths, and the best timing for important decisions.
 </p>
  </motion.div>

  {/* === HOROSCOPE CTA SECTION === */}
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 'some' }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className="relative z-10 w-full bg-[#B37B47] text-white rounded-2xl py-12 px-4 md:px-12 overflow-hidden shadow-sm"
  >
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
      <div className="space-y-4 text-center md:text-left flex-1">
        <h2 className="font-serif text-3xl md:text-4xl font-extrabold leading-tight">
          Read Your Daily Horoscope
        </h2>
        <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-lg">
          Check accurate daily, weekly, monthly, and yearly predictions tailored for all 12 Rashis based on precise Vedic planetary transits.
        </p>
      </div>
      <div className="flex-shrink-0">
        <Link href="/horoscope/daily/aries">
          <button className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-white text-[#B37B47] font-bold text-base rounded-xl hover:bg-amber-50 transition-all duration-200 shadow-lg">
            <Star className="w-5 h-5 fill-[#B37B47]" />
            Check My Zodiac
          </button>
        </Link>
      </div>
    </div>
  </motion.section>

  {/* === FEAN EBOOK SECTION === */}
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 'some' }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className="relative z-10 w-full bg-gradient-to-br from-white via-amber-50/30 to-white border border-[var(--gold-200)] rounded-2xl py-12 px-4 md:px-12 overflow-hidden shadow-sm"
  >
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 md:pl-16">
      {/* Left — Content */}
      <div className="space-y-6 text-center md:text-left order-2 md:order-1 pl-0 md:pl-12">
        <div className="space-y-1">
          <span className="text-[var(--gold-dark)] text-xs uppercase tracking-widest font-bold flex items-center gap-2 justify-center md:justify-start">
            <span>✦</span> Essential Knowledge
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">
            FEAN METHOD
            <span className="gold-gradient-text block">ASTROLOGY EBOOK</span>
          </h2>
        </div>
        <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
          Discover the foundational principles of our patented FEAN Method Astrology AMB™. This comprehensive digital guide walks you through numbers, grids, remedies, and the exact science we use to set your life on the right path.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-4">
          <Link href="/fean-ebook">
            <button className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)] text-black font-bold text-base rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg shadow-amber-300/40 w-full sm:w-auto">
              <BookOpen className="w-5 h-5" />
              Read Ebook
            </button>
          </Link>
          <a href="/FEAN Method Astrology Ebook.pdf" download="FEAN_Method_Astrology_Ebook.pdf">
            <button className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-white border-2 border-[var(--gold)] text-[var(--gold-dark)] font-bold text-base rounded-xl hover:bg-amber-50 transition-all duration-200 shadow-sm w-full sm:w-auto">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </a>
        </div>
      </div>
      
      {/* Right — Book Image */}
      <div className="flex justify-center md:justify-center order-1 md:order-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-64 h-80 flex items-center justify-center hover:scale-105 transition-transform duration-500"
        >
          <img
            src="/Fean-ebook-cover.png"
            alt="FEAN Method Astrology Ebook"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </div>
  </motion.section>

 {/* Section: The Science of Vedic Astrology */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 'some' }}
 transition={{ duration: 0.6, ease: 'easeOut' }}
 className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
 <div className="lg:col-span-7 flex">
 <GoldCard className="border border-[var(--gold-200)] p-8 space-y-4 flex flex-col justify-center h-full w-full">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
 <Info className="w-5 h-5" /> The Sidereal vs. Tropical Zodiac
 </h3>
 <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
 <p>
 Western Astrology uses the Tropical zodiac (based on seasons), while Vedic Astrology uses the Sidereal zodiac (based on actual star positions in the sky). This is why your Vedic zodiac sign may be different from your Western sun sign. Vedic astrology is much more accurate for predicting life events and timings.
 </p>
 <p>
 We use this sidereal system along with the Vimshottari Dasha (planetary period cycle) to give you very precise timelines for when important changes will happen in your career, relationships, and health.
 </p>
 </div>
 </GoldCard>
 </div>
 <div className="lg:col-span-5 flex relative group">
 <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
 <GoldCard flush className="border border-[var(--gold-200)] flex-1 overflow-hidden min-h-[240px]">
 <img src="/images/astrology_zodiac_realistic.png" alt="Vedic Zodiac" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 </GoldCard>
 </div>
 </motion.div>



 {/* Section: The 12 Houses of Destiny */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 'some' }}
 transition={{ duration: 0.6, ease: 'easeOut' }}
 className="space-y-6 p-6 bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl border border-amber-600 shadow-md">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-amber-600 pb-3 text-white">
 The 12 Houses (Bhavas) of Your Chart
 </h2>
 <p className="text-amber-100/80 text-xs">
 Every birth chart is divided into 12 segments representing different aspects of your life journey.
 </p>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {ASTROLOGY_HOUSES.map((house) => (
 <div key={house._id} className="bg-white/10 rounded-xl border border-white/10 p-4 hover:border-amber-400 hover:bg-white/15 hover:shadow-md transition-all group hover:scale-[1.02] duration-300">
 <span className="text-amber-300 font-mono font-bold text-xs">{house.num} House</span>
 <h4 className="text-white text-xs font-bold font-serif mt-1">{house.name}</h4>
 <p className="text-[10px] text-amber-100/70 leading-normal mt-1">{house.desc}</p>
 </div>
 ))}
 </div>
 </motion.div>

 {/* Section: The Nakshatras & Vimshottari Dasha */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
 <GoldCard className="border border-[var(--gold-100)] p-6 space-y-4 flex flex-col justify-between">
 <div className="space-y-3">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)]">The 27 Nakshatras (Lunar Mansions)</h3>
 <p className="text-xs text-gray-600 leading-relaxed">
 While Sun signs split the zodiac into 12 parts, Moon Nakshatras divide the sky into 27 equal divisions. Representing the lunar pathway, Nakshatras reveal your mind's true architecture, subconscious drives, and karmic behaviors.
 </p>
 <div className="grid grid-cols-2 gap-2 pt-2">
 <div className="p-2 bg-white/40 border border-gray-200 rounded">
 <span className="text-[10px] text-[var(--gold)] block font-mono">Ashwini (Ketu)</span>
 <p className="text-[9px] text-gray-600">Initiative, healing speed, energetic pioneer.</p>
 </div>
 <div className="p-2 bg-white/40 border border-gray-200 rounded">
 <span className="text-[10px] text-[var(--gold)] block font-mono">Rohini (Moon)</span>
 <p className="text-[9px] text-gray-600">Creativity, beauty, growth, magnetism.</p>
 </div>
 <div className="p-2 bg-white/40 border border-gray-200 rounded">
 <span className="text-[10px] text-[var(--gold)] block font-mono">Magha (Ketu)</span>
 <p className="text-[9px] text-gray-600">Ancestral power, leadership, duty.</p>
 </div>
 <div className="p-2 bg-white/40 border border-gray-200 rounded">
 <span className="text-[10px] text-[var(--gold)] block font-mono">Revati (Mercury)</span>
 <p className="text-[9px] text-gray-600">Empathy, travel, spiritual completion.</p>
 </div>
 </div>
 </div>
 </GoldCard>

 <GoldCard className="border border-[var(--gold-100)] p-6 space-y-4 flex flex-col justify-between">
 <div className="space-y-3">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)]">The Vimshottari Dasha System</h3>
 <p className="text-xs text-gray-600 leading-relaxed">
 Vedic Astrology's crown jewel is the 120-year planetary cycle calendar. Calculated from your birth Moon nakshatra degree, it specifies when each planet will rule your life timeline (Mahadasha and Antardasha).
 </p>
 <div className="space-y-2 text-[11px] text-gray-600 pt-1">
 <p><strong>• Ketu Dasha (7 Years):</strong> Spiritual detachment and inner searching.</p>
 <p><strong>• Shukra Dasha (20 Years):</strong> Focus on relationships, arts, luxury, comfort.</p>
 <p><strong>• Surya Dasha (6 Years):</strong> Career leadership, fame, self-realization.</p>
 <p><strong>• Chandra Dasha (10 Years):</strong> Emotional fluctuations, domestic cycles, memory.</p>
 </div>
 </div>
 </GoldCard>
 </div>

 {/* Section: Planetary Roles */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 The Planetary Forces (Grahas)
 </h2>
 <p className="text-gray-600 text-xs">
 Planets act as energetic forces that activate different fields of experience based on their placements.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {ASTROLOGY_GRAHAS.map((g) => (
 <GoldCard key={g._id} className="border border-gray-200/60 p-5 hover:border-[var(--gold)] transition-colors duration-300">
 <div className="flex justify-between items-center w-full">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm">{g.name}</h4>
 <span className="text-[9px] bg-[var(--gold-50)] text-gray-350 px-2 py-0.5 rounded border border-[var(--gold-200)] whitespace-nowrap">{g.sign}</span>
 </div>
 <p className="text-xs text-gray-600 leading-relaxed mt-2">{g.desc}</p>
 </GoldCard>
 ))}
 </div>
 </div>

 {/* Section: Yogas & Doshas */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Vedic Yogas (Fortunes) & Doshas (Afflictions)
 </h2>
 <p className="text-gray-600 text-xs">
 Planetary alignments create mathematical Yogas (fortunes) and Doshas (frictional blocks) in your birth chart.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GoldCard className="border border-gray-200/60 p-6">
 <h4 className="text-[var(--gold)] font-serif font-bold text-base mb-4">Key Auspicious Yogas</h4>
 <div className="space-y-3">
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Raj Yoga (King's Alignment)</span>
 <p className="text-[11px] text-gray-405">Formed by conjuncts/aspects between house rulers of quadrants (Kendra) and trines (Trikona). Grants status, leadership, and public influence.</p>
 </div>
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Gajakesari Yoga (Elephant-Lion Force)</span>
 <p className="text-[11px] text-gray-455">Jupiter placed in Kendra (1st, 4th, 7th, 10th house) from Moon. Grants wisdom, long-lasting reputation, wealth, and spiritual growth.</p>
 </div>
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Dhana Yoga (Wealth Magnet)</span>
 <p className="text-[11px] text-gray-455">Connections between wealth houses (2nd and 11th) and trines. Indicates financial abundance, smooth business cash flows, and resource gain.</p>
 </div>
 </div>
 </GoldCard>

 <GoldCard className="border border-gray-200/60 p-6">
 <h4 className="text-[var(--gold)] font-serif font-bold text-base mb-4">Key Frictional Doshas</h4>
 <div className="space-y-3">
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Manglik Dosha (Mars Affliction)</span>
 <p className="text-[11px] text-gray-405">Mars placed in 1st, 2nd, 4th, 7th, 8th, or 12th house. Indicates marital delays, emotional friction, and intense relationship arguments if unaligned.</p>
 </div>
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Shani Sade Sati (Saturn's 7.5 Year Transit)</span>
 <p className="text-[11px] text-gray-405">Saturn transiting 12th, 1st, and 2nd houses from natal Moon. A major period of discipline, delays, financial restructuring, and karmic learning.</p>
 </div>
 <div>
 <span className="text-gray-900 text-xs font-bold font-mono">Kaal Sarp Dosha (Karmic Axis Lock)</span>
 <p className="text-[11px] text-gray-405">All planets hemmed between Rahu (North Node) and Ketu (South Node). Indicates sudden highs and lows, intense life struggles, but massive potential achievements.</p>
 </div>
 </div>
 </GoldCard>
 </div>
 </div>

 {/* Section: Practical Vedic Remedies */}
 <div className="space-y-6 p-6 bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl border border-amber-600 shadow-md">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-amber-600 pb-3 text-white">
 Practical Vedic Remedies (Upayas)
 </h2>
 <p className="text-amber-100/80 text-xs">
 Remedies do not change your fate, but they act as shock absorbers to balance planetary electromagnetic imbalances.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
 <div className="bg-white/10 rounded-xl border border-white/10 p-4 hover:border-amber-400 hover:bg-white/15 hover:shadow-md transition-all group hover:scale-[1.02] duration-300">
 <h4 className="text-amber-300 font-serif font-bold text-sm">Mantras & Sound</h4>
 <p className="text-[10px] text-amber-100/70 leading-relaxed mt-2">
 Repeating specific Sanskrit phoneme frequencies matches the vibrational wavelength of afflicted planets, calming the mental chatter and retraining endocrine responses.
 </p>
 </div>
 <div className="bg-white/10 rounded-xl border border-white/10 p-4 hover:border-amber-400 hover:bg-white/15 hover:shadow-md transition-all group hover:scale-[1.02] duration-300">
 <h4 className="text-amber-300 font-serif font-bold text-sm">Gemstones</h4>
 <p className="text-[10px] text-amber-100/70 leading-relaxed mt-2">
 Natural untreated gems act as prisms. Worn against the skin, they filter natural light frequencies, feeding specific trace minerals and light waves back into the human aura.
 </p>
 </div>
 <div className="bg-white/10 rounded-xl border border-white/10 p-4 hover:border-amber-400 hover:bg-white/15 hover:shadow-md transition-all group hover:scale-[1.02] duration-300">
 <h4 className="text-amber-300 font-serif font-bold text-sm">Seva (Charity)</h4>
 <p className="text-[10px] text-amber-100/70 leading-relaxed mt-2">
 Saturn blocks are cleared by helping elderly and underprivileged people. Cleaning surroundings or donating grains acts directly to reduce natal karmic debt (Rina).
 </p>
 </div>
 <div className="bg-white/10 rounded-xl border border-white/10 p-4 hover:border-amber-400 hover:bg-white/15 hover:shadow-md transition-all group hover:scale-[1.02] duration-300">
 <h4 className="text-amber-300 font-serif font-bold text-sm">Fasting & Lifestyle</h4>
 <p className="text-[10px] text-amber-100/70 leading-relaxed mt-2">
 Fasting on specific days of planetary lords (e.g. Saturday for Saturn, Tuesday for Mars) cleanses digestive toxins and builds discipline, neutralizing impulsive habits.
 </p>
 </div>
 </div>
 </div>

 {/* FAQ Accordion Section */}
 <FAQSection faqs={ASTROLOGY_FAQS} />

 {/* 2026 Planetary Transits */}
 <div className="pt-12 border-t border-gray-200/60 mt-12">
 <div className="text-center mb-8">
 <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">2026 Planetary Transits</h2>
 <p className="text-gray-600 text-sm">Discover how the movement of planets in 2026 will impact your life.</p>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center">
 {['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'].map((planet) => (
 <Link key={planet} href={`/transit/${planet}`}>
 <div className="bg-white border border-[var(--gold)]/20 hover:border-[var(--gold)] rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(204,143,51,0.2)] shadow-sm">
 <div className="w-16 h-16 rounded-full flex items-center justify-center">
 <img src={`/images/planets/${planet}.png?v=5`} alt={`${planet} planet`} className="w-full h-full object-cover rounded-full" />
 </div>
 <span className="text-sm font-medium text-gray-900 text-center capitalize">{planet} Transit</span>
 </div>
 </Link>
 ))}
 </div>
 </div>

 {/* Active Batches Showcase */}
 <div className="border-t border-gray-200/60 pt-16 mt-8">
 <CategoryBatchesList category="Astrology" />
 </div>

 {/* Booking Consultation Widget */}
 <div className="border-t border-gray-200/60 pt-16 pb-8">
 <CategoryBookingWidget category="Astrology" />
 </div>
 </div>
 </div>
 );
}
