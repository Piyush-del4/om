'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, HelpCircle, ShieldCheck, HeartHandshake, Info } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { AstrologyHeroBackground } from '../../components/ui/AstrologyHeroBackground';
import { FAQSection } from '../../components/ui/FAQSection';

export default function MarriageMatchingPage() {
 const matchingKootas = [
 { num: 'Nadi (8 Points)', name: 'Health & Progeny compatibility', desc: 'The most important koota. Measures the biological and genetic compatibility to ensure healthy children and long-term physical health.' },
 { num: 'Bhakoot (7 Points)', name: 'Direct emotional bond', desc: 'Measures the relative planetary positions of the couple\'s Moon signs. Governs emotional compatibility and family wealth.' },
 { num: 'Gana (6 Points)', name: 'Temperament compatibility', desc: 'Classifies charts into Deva (Divine), Manushya (Human), or Rakshasa (Demon) temperaments to check behavior compatibility.' },
 { num: 'Maitri (5 Points)', name: 'Friendship & Planetary affinity', desc: 'Checks friendship levels between the Moon sign rulers of both charts. Governs daily conversations and mutual liking.' },
 ];

 const matchingFactors = [
 { title: 'Manglik Dosha Matching', importance: 'High Priority', desc: 'Aligning Mars positions in both charts is essential. A Manglik partner is matched with another Manglik to balance out emotional intensity and passion.' },
 { title: '7th House Strength', importance: 'Core Foundation', desc: 'We inspect the planetary placement, aspects, and lord of the 7th house (house of marriage) in both charts to check for stability.' },
 { title: 'D9 Navamsha Chart', importance: 'True Marriage Potential', desc: 'While D1 represents public life, the D9 Navamsha chart shows the true, internal compatibility and relationship outcome after marriage.' },
 ];

 const MARRIAGE_FAQS = [
 { q: 'What is Kundali matching (Ashtakoot Guna Milan)?', a: 'Kundali matching is a Vedic astrological method of analyzing the compatibility between a prospective bride and groom. It checks 8 different parameters (Kootas) to evaluate emotional, physical, and psychological harmony.' },
 { q: 'How many points (Gunas) are required for a successful marriage?', a: 'Out of 36 possible points (Gunas), a minimum of 18 is considered acceptable. However, a high score does not guarantee success if individual charts have major afflictions, which is why a manual chart analysis is critical.' },
 { q: 'What is Manglik Dosha in marriage matching?', a: 'Manglik Dosha occurs when Mars is placed in specific houses (1st, 2nd, 4th, 7th, 8th, or 12th) in a birth chart. It signifies high passion and potential aggression. It is usually balanced by marrying another Manglik or performing remedies.' },
 { q: 'Can two Mangliks marry each other?', a: 'Yes. In fact, it is highly recommended. When two Mangliks marry, their martial energies cancel each other out, leading to a highly energetic and balanced partnership.' },
 { q: 'What happens if our Kundalis do not match?', a: 'If the Guna score is too low or severe Doshas exist, an expert astrologer will check for "cancellations" (Parihara). If the block is permanent, we provide honest advice and potential remedies, but we do not recommend forcing a highly incompatible match.' },
 { q: 'Does Nadi Dosha cause problems in childbirth?', a: 'Traditionally, Nadi Dosha indicates a mismatch in the couple\'s genetic/biological energies, which can cause health issues or childbirth complications. However, there are many astrological exceptions that cancel this Dosha.' },
 { q: 'Is Kundali matching only for arranged marriages?', a: 'No. Many couples in love marriages consult astrologers before tying the knot to understand potential future challenges and learn remedies for their specific relationship dynamics.' },
 { q: 'What is Bhakoot Dosha?', a: 'Bhakoot Dosha relates to the compatibility of the Moon signs. It can cause financial difficulties, emotional detachment, or family disputes if not cancelled out by other friendly planetary alignments.' },
 { q: 'Does love marriage require Kundali matching?', a: 'While you may already know you are in love, Kundali matching helps prepare for long-term practical compatibility, health phases, and financial cycles that you will face together in the future.' },
 { q: 'Are there remedies for a low Kundali matching score?', a: 'Yes. Depending on which Kootas are lacking, specific remedies like Navagraha Shanti poojas, wearing specific gemstones, or lifestyle adjustments can act as shock absorbers for the relationship.' }
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
 <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> Sacred Union
 </span>
 <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight">
 Marriage <span className="gold-gradient-text">Matching (Melapak)</span>
 </h1>
 <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
 Build a foundation of lifelong harmony. We analyze the 36 Gunas, Manglik Dosha, 7th house stability, and D9 charts of both partners to ensure mutual love, prosperity, and family happiness.
 </p>
 </motion.div>

 {/* Section: Concept of Kundali Matching */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
 <div className="lg:col-span-7 flex">
 <GoldCard className="border border-[var(--gold-200)] p-8 space-y-4 flex flex-col justify-center h-full w-full">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
 <Info className="w-5 h-5" /> The Sacred Geometry of Compatibility
 </h3>
 <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
 <p>
 In traditional systems, marriage is not just a social contract, but an alignment of two karmic currents. If the subconscious wavelengths of two people conflict, the relationship is prone to emotional distance, communication gaps, or health blocks.
 </p>
 <p>
 We look beyond the basic computer-generated Guna charts. We analyze individual longevity, family adjustment indicators, and current planetary transit cycles to ensure both partners are entering a supportive phase of life together.
 </p>
 </div>
 </GoldCard>
 </div>
 <div className="lg:col-span-5 flex relative group">
 <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
 <GoldCard flush className="border border-[var(--gold-200)] flex-1 overflow-hidden min-h-[240px]">
 <img src="/images/marriage_matching_realistic.png" alt="Kundali Matching" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 </GoldCard>
 </div>
 </div>

 {/* Section: The Ashta Kootas */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Key Ashta Koota Parameters
 </h2>
 <p className="text-gray-600 text-xs">
 Traditional compatibility analysis evaluates 8 different aspects (Kootas) to rate total compatibility out of 36 points (Gunas).
 </p>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {matchingKootas.map((koota) => (
 <GoldCard key={koota.num} className="border border-gray-200/60 p-4 space-y-2">
 <span className="text-[var(--gold)] font-mono font-bold text-xs">{koota.num}</span>
 <h4 className="text-gray-900 text-sm font-bold font-serif">{koota.name}</h4>
 <p className="text-[11px] text-gray-600 leading-relaxed font-light">{koota.desc}</p>
 </GoldCard>
 ))}
 </div>
 </div>

 {/* Section: Important Compatibility Factors */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Key Astrological Match Indicators
 </h2>
 <p className="text-gray-600 text-xs">
 Guna matching alone is incomplete; we also perform a deep-dive evaluation of these key areas.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {matchingFactors.map((factor) => (
 <GoldCard key={factor.title} className="border border-gray-200/60 p-5 space-y-2">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm">{factor.title}</h4>
 <span className="text-[10px] bg-[var(--gold-10)] text-[var(--gold)] px-2 py-0.5 rounded border border-[var(--gold-200)] font-mono uppercase inline-block">{factor.importance}</span>
 <p className="text-xs text-gray-600 leading-relaxed font-light pt-1">{factor.desc}</p>
 </GoldCard>
 ))}
 </div>
 </div>

 {/* FAQ Section */}
 <div className="pt-12">
 <FAQSection faqs={MARRIAGE_FAQS} />
 </div>

 {/* Category Booking Widget */}
 <div className="border-t border-gray-200/60 pt-16 pb-8">
 <CategoryBookingWidget category="Astrology" serviceName="Marriage Matching Consultation" />
 </div>
 </div>
 </div>
 );
}
