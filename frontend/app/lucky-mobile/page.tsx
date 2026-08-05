'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Star, HelpCircle, ShieldCheck, Hash, Info } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { AstrologyHeroBackground } from '../../components/ui/AstrologyHeroBackground';
import { FAQSection } from '../../components/ui/FAQSection';

export default function LuckyMobilePage() {
 const numberVibrations = [
 { num: 'Total 1', name: 'Leadership & Success', desc: 'Ideal for business owners, executives, entrepreneurs, and people seeking high authority and public influence.' },
 { num: 'Total 5', name: 'Trade & Communication', desc: 'Excellent for sales, marketing, merchants, media professionals, and anyone in public relations.' },
 { num: 'Total 6', name: 'Luxury & Creativity', desc: 'Perfect for artists, designers, luxury product merchants, hotel owners, and relationship coaches.' },
 { num: 'Total 9', name: 'Charity & Courage', desc: 'Best suited for defense officers, healers, NGOs, spiritual gurus, and medical practitioners.' },
 ];

 const combinationWarnings = [
 { combination: 'Combinations of 8 & 4', title: 'Struggle & Sudden Hurdles', desc: 'Having frequent 8-4 or 4-8 sequences in your mobile number can attract sudden financial blocks, legal problems, or structural delays.' },
 { combination: 'Repeated 2s & 7s', title: 'Emotional & Health Issues', desc: 'Too many 2s and 7s can make the user highly emotional, causing relationship anxieties or chronic stress.' },
 { combination: 'Aggressive 9s', title: 'Anger & Frictional Communication', desc: 'Repeated 9s (like 999) can increase short-temperedness, arguments, and accident risks.' },
 ];

 const MOBILE_FAQS = [
 { q: 'Why does my mobile number matter in numerology?', a: 'Your mobile number is your primary digital identity. It constantly emits an electromagnetic frequency every time you make or receive a call. This frequency interacts with your aura, attracting either positive opportunities or persistent obstacles.' },
 { q: 'What makes a mobile number "lucky" or "unlucky"?', a: 'A number is lucky if its total sum and internal digit combinations harmonize with your birth date (Driver and Conductor numbers). It is unlucky if it forms hostile combinations that block your specific life path.' },
 { q: 'How do you calculate the numerological value of a mobile number?', a: 'Add all 10 digits together until you get a single digit (e.g., a total of 45 becomes 4+5 = 9). We also analyze pairs (e.g., 84, 27) which act as micro-vibrations.' },
 { q: 'What if I cannot change my current mobile number?', a: 'If your number is strictly tied to banking or old clients, you can keep it for incoming calls but use a new lucky number for outgoing calls and new business. However, replacing it entirely is highly recommended.' },
 { q: 'Does a lucky mobile number guarantee success?', a: 'It guarantees that the "frictional resistance" in your communication and network will be removed. It acts as an accelerator, but you must still put in the required effort and hard work.' },
 { q: 'Are some numbers universally bad, like 4 or 8?', a: 'In mobile numerology, totals of 4 and 8 are generally avoided because they bring delays, struggles, and sudden losses. However, there are very rare exceptions depending on a person’s exact birth chart.' },
 { q: 'Should I match my mobile number to my Life Path or Destiny number?', a: 'Yes. The single-digit total of your mobile number should ideally be a friendly number to both your Driver (birth day) and Conductor (total birth date sum) numbers.' },
 { q: 'Does the country code (+91, +1) count in the calculation?', a: 'No. The country code represents the geographic location and applies to millions of people. Only your unique 10-digit mobile number is used for personal calculation.' },
 { q: 'Is it better to have repeating digits like 999 or 777?', a: 'Not necessarily. While vanity numbers look good, repeating the same number amplifies its extreme qualities. For example, too many 9s can cause anger issues, and too many 2s can cause emotional instability.' },
 { q: 'How quickly will I see changes after switching to a lucky number?', a: 'Most people start noticing a shift in the quality of calls, better networking opportunities, and reduced daily friction within 40 to 90 days of actively using the new number.' }
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
 <PhoneCall className="w-3.5 h-3.5 text-[var(--gold)] animate-pulse" /> Digital Vibrations
 </span>
 <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight">
 Lucky Mobile <span className="gold-gradient-text">Number Selection</span>
 </h1>
 <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
 Your mobile number represents your personal frequency in the digital world. Choose a number that resonates with your birth date to attract business leads, health, harmony, and prosperity.
 </p>
 </motion.div>

 {/* Section: Science of Mobile Numerology */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
 <div className="lg:col-span-7 flex">
 <GoldCard className="border border-[var(--gold-200)] p-8 space-y-4 flex flex-col justify-center h-full w-full">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
 <Info className="w-5 h-5" /> The Power of Mobile Frequencies
 </h3>
 <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
 <p>
 Most people select mobile numbers based on simple repeating digits (e.g. 9999) thinking they are lucky. However, in mobile numerology, vanity numbers can sometimes bring massive challenges if the vibration conflicts with your birth chart.
 </p>
 <p>
 We examine the starting combinations, ending digits, and the single-digit total of your 10-digit mobile number. We help you choose a number that acts as a digital magnet for opportunities rather than a source of continuous obstacles.
 </p>
 </div>
 </GoldCard>
 </div>
 <div className="lg:col-span-5 flex relative group">
 <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
 <GoldCard flush className="border border-[var(--gold-200)] flex-1 overflow-hidden min-h-[240px]">
 <img src="/images/mobile_numerology_realistic.png" alt="Mobile Numerology Frequency" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 </GoldCard>
 </div>
 </div>

 {/* Section: Lucky Mobile Totals */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Power Totals & Their Meanings
 </h2>
 <p className="text-gray-600 text-xs">
 The overall sum of your mobile digits determines the primary energy frequency of your phone calls.
 </p>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {numberVibrations.map((v) => (
 <GoldCard key={v.num} className="border border-gray-200/60 p-4 space-y-2">
 <span className="text-[var(--gold)] font-mono font-bold text-xs">{v.num}</span>
 <h4 className="text-gray-900 text-sm font-bold font-serif">{v.name}</h4>
 <p className="text-[11px] text-gray-600 leading-relaxed font-light">{v.desc}</p>
 </GoldCard>
 ))}
 </div>
 </div>

 {/* Section: Combination Warnings */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Frictional Combinations to Avoid
 </h2>
 <p className="text-gray-600 text-xs">
 Certain doublets or sequences inside the number can cause negative mental blocks or career stagnation.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {combinationWarnings.map((warning) => (
 <GoldCard key={warning.combination} className="border border-gray-200/60 p-5 space-y-2">
 <h4 className="text-red-400 font-serif font-bold text-sm">{warning.combination}</h4>
 <span className="text-[10px] bg-red-950/40 text-red-300 px-2 py-0.5 rounded border border-red-900/30 font-mono uppercase inline-block">{warning.title}</span>
 <p className="text-xs text-gray-600 leading-relaxed font-light pt-1">{warning.desc}</p>
 </GoldCard>
 ))}
 </div>
 </div>

 {/* FAQ Section */}
 <div className="pt-12">
 <FAQSection faqs={MOBILE_FAQS} />
 </div>

 {/* Category Booking Widget */}
 <div className="border-t border-gray-200/60 pt-16 pb-8">
 <CategoryBookingWidget category="Numerology" serviceName="Lucky Mobile Number Consultation" />
 </div>
 </div>
 </div>
 );
}
