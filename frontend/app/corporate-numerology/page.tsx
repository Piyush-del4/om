'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Star, HelpCircle, ShieldCheck, Landmark, Info } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { AstrologyHeroBackground } from '../../components/ui/AstrologyHeroBackground';

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

  const FAQs = [
    { q: 'Can corporate numerology help a struggling business?', a: 'Yes. By introducing minor changes to the brand spelling (adding or removing a letter) or shifting the bank account to a lucky numerological total, we can improve business traction and customer relationships.' },
    { q: 'Which alphabetic system do you use for brand names?', a: 'We primarily use the Chaldean Numerology system, which is highly accurate for calculating sound and letter vibrations, along with Pythagorean comparisons to ensure consistency.' },
    { q: 'How does corporate numerology prevent partnership disputes?', a: 'We analyze the core birth charts and numerological compatibility of both partners. If there is a driver/conductor conflict, we suggest remedies or name spelling changes to align their goals.' },
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
            <Building2 className="w-3.5 h-3.5 text-[var(--gold)] animate-pulse" /> Business Alchemy
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Corporate & Brand <span className="gold-gradient-text">Numerology</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Build a brand that vibrates on the frequency of success. Align your company name, logo colors, and incorporation dates with numerological codes to command authority and smooth gains.
          </p>
        </motion.div>

        {/* Section: Concept of Business Numerology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex">
            <GoldCard theme="dark" className="border border-[var(--gold-200)] p-8 space-y-4 flex flex-col justify-center h-full w-full">
              <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
                <Info className="w-5 h-5" /> The Alchemical Code of Brands
              </h3>
              <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-light">
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
            <GoldCard flush theme="dark" className="border border-[var(--gold-200)] flex-1 overflow-hidden min-h-[240px]">
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
            <p className="text-gray-400 text-xs">
              Every corporation must align these four numerological inputs to build a long-term empire.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {corporatePillars.map((pillar) => (
              <GoldCard key={pillar.num} className="border border-neutral-800/60 p-4 space-y-2">
                <span className="text-[var(--gold)] font-mono font-bold text-xs">{pillar.num}</span>
                <h4 className="text-white text-sm font-bold font-serif">{pillar.name}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-light">{pillar.desc}</p>
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
            <p className="text-gray-400 text-xs">
              Different single-digit totals are suited for different business sectors.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandNumbers.map((num) => (
              <GoldCard key={num.num} className="border border-neutral-800/60 p-5 space-y-2">
                <h4 className="text-[var(--gold)] font-serif font-bold text-sm">{num.num}</h4>
                <span className="text-[10px] bg-[var(--gold-10)] text-[var(--gold)] px-2 py-0.5 rounded border border-[var(--gold-200)] font-mono uppercase inline-block">{num.role}</span>
                <p className="text-xs text-gray-400 leading-relaxed font-light pt-1">{num.desc}</p>
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
          <CategoryBookingWidget category="Numerology" serviceName="Corporate Numerology Consultation" />
        </div>
      </div>
    </div>
  );
}
