'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PenTool, Info, Brain, Activity, Target } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '../../components/ui/CategoryBatchesList';
import { SignatureAnalyzerWidget } from '../../components/ui/SignatureAnalyzerWidget';
import { FAQSection } from '../../components/ui/FAQSection';
import { DailyPanchangMuhuratWidget } from '../../components/ui/astrology/DailyPanchangMuhuratWidget';

const GRAPHOLOGY_FAQS = [
 { q: 'What is graphology?', a: 'Graphology is the scientific analysis of handwriting to determine psychological patterns, emotional state, and personality traits. Your brain writes, not your hand, making handwriting a form of "brainwriting."' },
 { q: 'How does handwriting analysis work?', a: 'A graphologist analyzes elements like slant, size, baseline, pressure, margins, and the specific shapes of letters (like "t" and "y"). Each element corresponds to a specific neurological habit and personality trait.' },
 { q: 'Can graphology predict the future?', a: 'No, graphology cannot predict the future. It provides a deep psychological profile of who you are right now, highlighting your strengths, weaknesses, fears, and relationship patterns.' },
 { q: 'What can graphology tell me about my personality?', a: 'It reveals over 100 traits including your level of self-esteem, how you process information, your emotional responsiveness, your drive to achieve, and how you handle stress or relationships.' },
 { q: 'Is graphology scientific?', a: 'Graphology is an empirical science. It relies on the consistency of neurological muscle movements that reflect brain patterns. It is widely used in Europe for recruitment and clinical psychology.' },
 { q: 'What is Graphotherapy?', a: 'Graphotherapy is the science of changing your personality by consciously altering specific strokes in your handwriting. By practicing new strokes for 21 days, you form new neural pathways in your brain.' },
 { q: 'What do you need for a graphology consultation?', a: 'We require a one-page sample of your handwriting on an unruled, blank sheet of paper, written with a ballpoint pen. It must be written naturally and signed at the bottom.' },
 { q: 'Can graphology detect lies?', a: 'Graphology cannot tell if a specific statement is a lie, but it can identify if a person has deceptive tendencies, is highly secretive, or rationalizes their actions.' },
 { q: 'Can it help with career choices?', a: 'Yes. By analyzing your drive, focus, and social adaptability, we can determine if you are better suited for analytical work, sales, leadership, or creative professions.' },
 { q: 'Is signature analysis different from handwriting analysis?', a: 'Yes. Your handwriting reveals your true inner self, while your signature reveals your public persona (how you want the world to see you). Discrepancies between the two are very revealing.' }
];

export default function GraphologyPage() {

 const strokeIndicators = [
 { name: 'Handwriting Slant', type: 'Emotional Response', desc: 'Slanting right means you are emotionally expressive and social. Writing straight up means you are calm and logical. Slanting left means you tend to keep feelings to yourself.' },
 { name: 'Writing Pressure', type: 'Energy & Memory', desc: 'Writing with heavy pressure shows strong energy and good memory. Light pressure shows sensitivity and flexibility. How hard you press reveals your inner vitality.' },
 { name: 'Three Writing Zones', type: 'Focus Area', desc: 'The top part of letters shows thinking and ideas. The middle part shows daily life and social habits. The bottom part shows physical and material concerns.' },
 { name: 'Letter Spacing', type: 'Social Distance', desc: 'Wide spacing between letters shows generosity and open-mindedness. Close spacing shows caution and preference for a small trusted circle.' },
 ];

 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
 <div className="max-w-6xl mx-auto space-y-16 relative z-10">
 {/* Header Hero Section (Horizontal Layout) */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
 {/* Left Column: Text description */}
 <motion.div
 initial={{ opacity: 0, x: -35 }}
 animate={{ opacity: 1, x: 0 }}
 className="lg:col-span-6 space-y-4 text-left"
 >
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 justify-start">
 <PenTool className="w-3.5 h-3.5" /> Graphology & Signature Science
 </span>
 <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight leading-tight">
 Reveal Your Personality Through <span className="gold-gradient-text">Handwriting</span>
 </h1>
 <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed max-w-lg">
 Your handwriting shows what is happening inside your mind. The way you write — your letter shapes, slant, and pressure — reflects your personality, habits, and emotions. By changing how you write (Graphotherapy), you can actually improve your mindset and behavior.
 </p>
 </motion.div>

 {/* Right Column: Signature Analyzer Pad */}
 <motion.div
 initial={{ opacity: 0, x: 35 }}
 animate={{ opacity: 1, x: 0 }}
 className="lg:col-span-6 w-full"
 >
 <SignatureAnalyzerWidget />
 </motion.div>
 </div>

 {/* Section: Brain Writing */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
 <div className="lg:col-span-5 flex relative group">
 <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
 <GoldCard flush className="w-full min-h-[240px] flex-grow transition-spring">
 <div className="relative w-full h-full overflow-hidden">
 <img src="/images/step_analyze_realistic.png" alt="Graphology Analysis" className="w-full h-full object-cover group-hover:scale-105 transition-spring duration-700" />
 </div>
 </GoldCard>
 </div>
 <div className="lg:col-span-7 flex">
 <GoldCard className="transition-spring w-full">
 <div className="space-y-4 flex flex-col justify-center h-full">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
 <Info className="w-5 h-5 animate-pulse text-[var(--gold)]" /> Brain-Writing: The Science
 </h3>
 <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
 <p>
 When you write, your brain sends signals to your hand muscles. Every stroke, space, curve, and angle you make is not just habit — it reflects your thoughts, emotions, and personality at that moment.
 </p>
 <p>
 When you practice correcting specific strokes — like how you cross your 't's, dot your 'i's, or write your signature — those corrections send new signals back to your brain and slowly change your habits and thinking patterns over 21 days. This is called Graphotherapy.
 </p>
 </div>
 </div>
 </GoldCard>
 </div>
 </div>


  {/* Section: Handwriting Stroke Indicators */}
  <div className="space-y-6 p-6 bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl border border-amber-600 shadow-md">
    <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-amber-600 pb-3 text-white">
      Handwriting Stroke Indicators
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {strokeIndicators.map((s) => (
        <div key={s.name} className="bg-white/10 rounded-xl border border-white/10 p-4 hover:border-amber-400 hover:bg-white/15 hover:shadow-md transition-all group hover:scale-[1.02] duration-300">
          <div className="space-y-2">
            <h4 className="text-amber-300 font-serif font-bold text-sm">{s.name}</h4>
            <span className="text-[9px] text-amber-200 uppercase tracking-widest block font-mono">{s.type}</span>
            <p className="text-xs text-amber-100/70 leading-relaxed font-light">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

 {/* Section: Micro-Analysis of Letter Formations */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 Micro-Analysis of Letter Formations
 </h2>
 <p className="text-gray-600 text-xs font-light">
 Specific letters in your writing reveal your habits, confidence level, and how you think.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GoldCard className="transition-spring">
 <div className="space-y-4">
 <h4 className="text-[var(--gold)] font-serif font-bold text-base border-b border-gray-200/60 pb-2">Intellect & Willpower Indicators ('t' and 'i')</h4>
 <div className="space-y-3 text-xs text-gray-600 font-light leading-relaxed">
 <p>
 <strong>• Letter 't' Crossbar Height:</strong> A crossbar placed high on the stem indicates high goals and strong AMCition. A low crossbar indicates lower self-esteem or fear of failure.
 </p>
 <p>
 <strong>• Letter 't' Crossbar Weight/Length:</strong> A long, firm crossbar represents lasting willpower and determination. A weak, thin bar indicates poor follow-through or physical fatigue.
 </p>
 <p>
 <strong>• Letter 'i' Dot Placement:</strong> Dot placed close to stem indicates excellent memory and attention to detail. Dot placed high above stem represents imagination and idealism. Circles instead of dots suggest creative individualism, while dashes indicate impatience.
 </p>
 </div>
 </div>
 </GoldCard>

 <GoldCard className="transition-spring">
 <div className="space-y-4">
 <h4 className="text-[var(--gold)] font-serif font-bold text-base border-b border-gray-200/60 pb-2">Emotional & Material Loops ('g', 'y', 'o')</h4>
 <div className="space-y-3 text-xs text-gray-600 font-light leading-relaxed">
 <p>
 <strong>• Lower Loops ('g' and 'y') Size:</strong> Large, full loops represent a strong physical drive, interest in material security, and relationship warmth. Narrow or straight vertical lines indicate emotional detachment or reservation.
 </p>
 <p>
 <strong>• Lower Loops Closure:</strong> A loop that closes fully and returns to the baseline represents relationship trust. Loops that stay open indicate a tendency to leave emotional business unfinished.
 </p>
 <p>
 <strong>• Inner Loops in Vowels ('o' and 'a'):</strong> Small loops on the inside of these characters suggest keeping secrets or withholding thoughts. Clean, loop-free circles suggest straightforward, direct communication.
 </p>
 </div>
 </div>
 </GoldCard>
 </div>
 </div>

 {/* Section: Signature Analysis Guide */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
 <GoldCard className="transition-spring">
 <div className="space-y-4">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)]">Signature Analysis Guide</h3>
 <p className="text-xs text-gray-600 leading-relaxed font-light">
 Your signature is your public persona—how you present yourself to society. Contrasting the signature against normal writing slants reveals discrepancies between public projections and private realities.
 </p>
 <div className="space-y-2 text-[11px] text-gray-600 font-light leading-relaxed">
 <p><strong>• Bottom Underline:</strong> Indicates self-reliance, leadership, and emotional stability.</p>
 <p><strong>• Strike-Through Signature:</strong> Crossing out one's own name indicates self-criticism or subconscious self-sabotaging habits.</p>
 <p><strong>• Sizing Ratio:</strong> A signature significantly larger than the text indicates a desire for social recognition. A smaller signature indicates privacy and humility.</p>
 </div>
 </div>
 </GoldCard>

 <GoldCard className="transition-spring">
 <div className="space-y-4">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)]">Margins & Spacing Psychology</h3>
 <p className="text-xs text-gray-600 leading-relaxed font-light">
 How you use space on a page represents how you handle space in your life, reflecting social comfort and boundaries.
 </p>
 <div className="space-y-2 text-[11px] text-gray-600 font-light leading-relaxed">
 <p><strong>• Left Margin (Past & Family):</strong> A wide left margin indicates a desire to move forward and leave the past. A narrow left margin suggests attachment to roots and domestic habits.</p>
 <p><strong>• Right Margin (Future & Society):</strong> Wide right margin reveals a fear of the unknown or reservation in social groups. Narrow right margin indicates enthusiasm to explore future opportunities.</p>
 <p><strong>• Word Spacing:</strong> Large spaces represent a need for personal freedom and boundaries. Tight spaces indicate a preference for close contact and constant activity.</p>
 </div>
 </div>
 </GoldCard>
 </div>

 {/* How it works */}
 <div className="space-y-6">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 How Graphotherapy Works
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
 <GoldCard className="transition-spring">
 <div className="space-y-3">
 <span className="inline-block p-3 rounded-full bg-[var(--gold-50)] text-[var(--gold)] font-bold text-lg border border-[var(--gold-200)] w-12 h-12 flex items-center justify-center mx-auto">1</span>
 <h3 className="font-bold text-gray-900 text-base font-serif">Write & Submit</h3>
 <p className="text-gray-600 text-xs leading-relaxed font-light">Write a standard 1-page unruled letter, sign it, and submit a photo during your scheduled consultation.</p>
 </div>
 </GoldCard>
 <GoldCard className="transition-spring">
 <div className="space-y-3">
 <span className="inline-block p-3 rounded-full bg-[var(--gold-50)] text-[var(--gold)] font-bold text-lg border border-[var(--gold-200)] w-12 h-12 flex items-center justify-center mx-auto">2</span>
 <h3 className="font-bold text-gray-900 text-base font-serif">Microscope Analysis</h3>
 <p className="text-gray-600 text-xs leading-relaxed font-light">We analyze slant, margins, pressure, connections, spacing, and starting/ending stroke characteristics.</p>
 </div>
 </GoldCard>
 <GoldCard className="transition-spring">
 <div className="space-y-3">
 <span className="inline-block p-3 rounded-full bg-[var(--gold-50)] text-[var(--gold)] font-bold text-lg border border-[var(--gold-200)] w-12 h-12 flex items-center justify-center mx-auto">3</span>
 <h3 className="font-bold text-gray-900 text-base font-serif">Stroke Training</h3>
 <p className="text-gray-600 text-xs leading-relaxed font-light">Receive custom stroke exercises (Graphotherapy) to write daily for 21 days to retrain your habit patterns.</p>
 </div>
 </GoldCard>
 </div>
 </div>

 {/* Section: 21-Day Graphotherapy Protocol */}
 <div className="space-y-6">
 <div className="space-y-2">
 <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
 The 21-Day Graphotherapy Protocol
 </h2>
 <p className="text-gray-600 text-xs font-light">
 Follow these structured steps to reprogram subconscious cognitive habit loops through somatic writing.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
 <GoldCard className="transition-spring">
 <div className="space-y-2">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm">Days 1 - 5: Isolation</h4>
 <p className="text-[10px] text-gray-600 leading-relaxed font-light">
 Practice the isolated strokes recommended by your graphologist (e.g. loops in 'g', high crosses in 't') for 10 minutes on a blank sheet. Focus entirely on the physical movement.
 </p>
 </div>
 </GoldCard>
 <GoldCard className="transition-spring">
 <div className="space-y-2">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm">Days 6 - 12: Integration</h4>
 <p className="text-[10px] text-gray-600 leading-relaxed font-light">
 Begin writing full paragraphs, consciously integrating the adjusted letters into standard words. Writing speed will slow down as your motor cortex forms new paths.
 </p>
 </div>
 </GoldCard>
 <GoldCard className="transition-spring">
 <div className="space-y-2">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm">Days 13 - 18: Flow State</h4>
 <p className="text-[10px] text-gray-600 leading-relaxed font-light">
 Write freely without looking at the pen. Speed up your penmanship. The brain starts running the new neural pathway automatically without requiring active conscious control.
 </p>
 </div>
 </GoldCard>
 <GoldCard className="transition-spring">
 <div className="space-y-2">
 <h4 className="text-[var(--gold)] font-serif font-bold text-sm">Days 19 - 21: Consolidation</h4>
 <p className="text-[10px] text-gray-600 leading-relaxed font-light">
 Test your signature slant under speed or distraction. The new strokes consolidate into long-term muscle memory, completing the cognitive habit reprogram loop.
 </p>
 </div>
 </GoldCard>
 </div>
 </div>

 {/* FAQ Section */}
 <div className="pt-12">
 <FAQSection faqs={GRAPHOLOGY_FAQS} />
 </div>

 {/* Active Batches Showcase */}
 <div className="border-t border-gray-200/60 pt-16">
 <CategoryBatchesList category="Graphology" />
 </div>

 {/* Booking Consultation Widget */}
 <div className="border-t border-gray-200/60 pt-16 pb-8">
 <CategoryBookingWidget category="Graphology" />
 </div>
 </div>
 </div>
 );
}
