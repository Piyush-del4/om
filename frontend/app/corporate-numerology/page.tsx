'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Star, HelpCircle, ShieldCheck, Landmark, Info } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { AstrologyHeroBackground } from '../../components/ui/AstrologyHeroBackground';
import { FAQSection } from '../../components/ui/FAQSection';

export default function CorporateNumerologyPage() {
 const corporatePillars = [
 { num: 'Pillar 1', name: 'Brand Name Spelling', desc: 'Ensures the alphabetic spelling total of your business name vibrates on a lucky number like 1, 5, or 6 to generate trust and brand awareness.' },
 { num: 'Pillar 2', name: 'Incorporation Date', desc: 'Selecting the astrologically aligned day and time to register your legal entity, ensuring smooth government dealings and financial safety.' },
 { num: 'Pillar 3', name: 'Founder Compatibility', desc: 'Evaluating the numerological compatibility between directors, partners, and founders to prevent legal disputes and partnership exits.' },
 { num: 'Pillar 4', name: 'Office Address & Logo', desc: 'Aligning office block numbers, website domain names, and brand logo colors/shapes with the company\'s ruling number.' },
 ];

 const brandNumbers = [
 { num: 'Number 1 (Sun)', role: 'Monopoly & Prestige', desc: 'Ideal for premium brands, luxury goods, market leaders, government contractors, and pioneers.' },
 { num: 'Number 5 (Mercury)', role: 'Rapid Expansion & Commerce', desc: 'Excellent for tech startups, e-commerce, retail chains, trading businesses, logistics, and communications.' },
 { num: 'Number 6 (Venus)', role: 'Hospitality & Luxury', desc: 'Perfect for cosmetic lines, high fashion, jewelry, hospitality, restaurant chains, and entertainment industries.' },
 { num: 'Number 9 (Mars)', role: 'Defense & Real Estate', desc: 'Best suited for construction, real estate developers, pharmaceutical companies, security services, and metal manufacturers.' },
 ];

 const CORPORATE_FAQS = [
 { q: 'What is corporate numerology?', a: 'Corporate numerology is the application of numerological principles to business. It aligns your brand name, launch dates, and office numbers with favorable vibrations to attract success, wealth, and smooth operations.' },
 { q: 'How does the name of my business affect its success?', a: 'Every letter emits a frequency. If the total numeric value of your brand name conflicts with your industry (e.g., a luxury brand adding up to an austere number like 7), it can cause friction, low sales, and client dissatisfaction.' },
 { q: 'What is the process of choosing a lucky business name?', a: 'We calculate the life path and destiny numbers of the founders, identify the numerological code of the specific industry, and then construct a brand name spelling that harmonizes both.' },
 { q: 'Do I need to legally change my business name?', a: 'Not necessarily. You can keep your legal registered entity name as is, but change your public-facing "Doing Business As" (DBA) brand name, logo spelling, and website domain to the lucky spelling.' },
 { q: 'How can numerology help with branding and logos?', a: 'Beyond spelling, specific numbers correspond to shapes and colors (e.g., Number 1 corresponds to Sun, gold/red, and circles). Aligning your logo design with your brand number amplifies its magnetic draw.' },
 { q: 'Can numerology help me choose the right business partners?', a: 'Yes. Partnership conflicts are the #1 reason startups fail. We check the core numbers of all founders to ensure their drives and decision-making styles are complementary rather than destructive.' },
 { q: 'How does a lucky launch date impact my business?', a: 'The day you register the business or launch a product becomes its "Birth Date." Launching on a day that is numerologically friendly to your brand ensures longevity and strong market reception.' },
 { q: 'What if my current business name has a negative vibration?', a: 'We perform a "Name Correction." This usually involves subtly adding or removing a letter (e.g., changing an "i" to an "ee") so the pronunciation remains the same but the numerical value shifts to a lucky total.' },
 { q: 'Does the registered address or office number matter?', a: 'Yes. Office numbers carry energy. If your office total is a 4 or 8, you may face constant sudden delays or heavy struggles. We provide simple remedies to correct bad office numbers without moving.' },
 { q: 'How long does it take to see results after a name correction?', a: 'While energetic shifts happen immediately, tangible business results usually begin manifesting within 30 to 90 days as you update your branding, website, and marketing materials with the new spelling.' }
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
 <Building2 className="w-3.5 h-3.5 text-[var(--gold)] animate-pulse" /> Business Alchemy
 </span>
 <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight">
 Corporate & Brand <span className="gold-gradient-text">Numerology</span>
 </h1>
 <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
 Build a brand that vibrates on the frequency of success. Align your company name, logo colors, and incorporation dates with numerological codes to command authority and smooth gains.
 </p>
 </motion.div>

 {/* Section: Concept of Business Numerology */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
 <div className="lg:col-span-7 flex">
 <GoldCard className="border border-[var(--gold-200)] p-8 space-y-4 flex flex-col justify-center h-full w-full">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
 <Info className="w-5 h-5" /> The Alchemical Code of Brands
 </h3>
 <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
 <p>
 A brand name is not just a marketing tag—it is a vibrational identity. When a brand's name spelling vibrates on a number that conflicts with its sector or the founder's charts, the business often struggles with constant losses, employee turnover, or legal disputes.
 </p>
 <p>
 Vedic and Chaldean Corporate Numerology balances these digital inputs. We modify brand names with minor adjustments (like changing a vowel) to ensure the final name total is a wealth magnet.
 </p>
 </div>
 </GoldCard>
 </div>
 <div className="lg:col-span-5 flex relative group">
 <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
 <GoldCard flush className="border border-[var(--gold-200)] flex-1 overflow-hidden min-h-[240px]">
 <img src="/images/corporate_numerology_realistic.png" alt="Corporate Numerology Chart" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 </GoldCard>
 </div>
 </div>

 {/* Section: The Four Pillars */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 The Four Pillars of Business Numerology
 </h2>
 <p className="text-gray-600 text-xs">
 Every corporation must align these four numerological inputs to build a long-term empire.
 </p>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {corporatePillars.map((pillar) => (
 <GoldCard key={pillar.num} className="border border-gray-200/60 p-4 space-y-2">
 <span className="text-[var(--gold)] font-mono font-bold text-xs">{pillar.num}</span>
 <h4 className="text-gray-900 text-sm font-bold font-serif">{pillar.name}</h4>
 <p className="text-[11px] text-gray-600 leading-relaxed font-light">{pillar.desc}</p>
 </GoldCard>
 ))}
 </div>
 </div>

 {/* Section: Brand Numbers */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Industry Matching Numbers
 </h2>
 <p className="text-gray-600 text-xs">
 Different single-digit totals are suited for different business sectors.
 </p>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {brandNumbers.map((num) => (
 <GoldCard key={num.num} className="border border-gray-200/60 p-5 space-y-2">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm">{num.num}</h4>
 <span className="text-[10px] bg-[var(--gold-10)] text-[var(--gold)] px-2 py-0.5 rounded border border-[var(--gold-200)] font-mono uppercase inline-block">{num.role}</span>
 <p className="text-xs text-gray-600 leading-relaxed font-light pt-1">{num.desc}</p>
 </GoldCard>
 ))}
 </div>
 </div>

 {/* FAQ Section */}
 <div className="pt-12">
 <FAQSection faqs={CORPORATE_FAQS} />
 </div>

 {/* Category Booking Widget */}
 <div className="border-t border-gray-200/60 pt-16 pb-8">
 <CategoryBookingWidget category="Numerology" serviceName="Corporate Numerology Consultation" />
 </div>
 </div>
 </div>
 );
}
