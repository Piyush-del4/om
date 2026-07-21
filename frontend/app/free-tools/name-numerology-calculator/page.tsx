'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { FAQSection } from '@/components/ui/FAQSection';

const FAQS = [
  { q: 'What is Name Numerology?', a: 'Your name carries a unique vibrational frequency. Name numerology decodes this frequency to reveal your Destiny or Expression number.' },
  { q: 'How accurate is this Name Numerology Calculator?', a: 'Our calculator uses the ancient Chaldean system to map the letters of your name to their exact numerical vibrations.' },
  { q: 'Is this service completely free?', a: 'Yes, this tool is 100% free to use for unlimited calculations.' },
  { q: 'Do I need my exact birth time?', a: 'No, for name numerology we only analyze the letters in your full name.' },
  { q: 'Can I consult an astrologer after generating my report?', a: 'Absolutely! We offer premium 1-on-1 consultations to help you decode the deeper meanings of your results.' }
];

const chaldeanMap: Record<string, number> = {
  'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
  'B': 2, 'K': 2, 'R': 2,
  'C': 3, 'G': 3, 'L': 3, 'S': 3,
  'D': 4, 'M': 4, 'T': 4,
  'E': 5, 'H': 5, 'N': 5, 'X': 5,
  'U': 6, 'V': 6, 'W': 6,
  'O': 7, 'Z': 7,
  'F': 8, 'P': 8
};

const getSingleDigit = (num: number): number => {
  if (num === 11 || num === 22 || num === 33) return num;
  let sum = num;
  while (sum > 9) {
    sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return sum;
};

const calculateNameNumerology = (name: string) => {
  const upperName = name.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;
  for (const char of upperName) {
    sum += chaldeanMap[char] || 0;
  }
  return getSingleDigit(sum);
};

export default function NameNumerologyCalculatorPage() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(false);

  const [resultData, setResultData] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const destNum = calculateNameNumerology(formData.name);
      setResultData(destNum);
      setIsSubmitting(false);
      setResult(true);
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background styling */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--gold)]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 pt-8"
        >
          <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
            <PenTool className="w-4 h-4" /> Free Utility
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
             Calculator <span className="gold-gradient-text">Name Numerology</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto">
            Check the numerical vibration of your name spelling. Enter your details below to calculate your personalized report instantly.
          </p>
        </motion.div>

        {/* Main Form Section */}
        <GoldCard theme="dark" className="border border-[var(--gold-200)] p-6 md:p-8">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <GoldButton 
                  type="submit" 
                  variant="filled" 
                  className="w-full md:w-auto min-w-[200px] flex justify-center py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Calculating...' : 'Generate Report'}
                </GoldButton>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8"
            >
              <div className="w-16 h-16 bg-[var(--gold-50)] rounded-full flex items-center justify-center mx-auto border border-[var(--gold-200)]">
                <PenTool className="w-8 h-8 text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Report Generated!</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Here is the Chaldean Name Numerology value for <span className="capitalize text-[var(--gold)]">{formData.name}</span>.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center max-w-sm mx-auto">
                  <div className="text-[var(--gold)] font-serif text-6xl font-bold mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    {resultData}
                  </div>
                  <div className="text-sm text-gray-300 font-light">
                    This is your Destiny (Expression) Number. It reveals your life's purpose, natural talents, and the goals you are meant to achieve.
                  </div>
                </div>
              </div>
              <GoldButton onClick={() => setResult(false)} variant="outlined" className="mt-8">
                Calculate Again
              </GoldButton>
            </motion.div>
          )}
        </GoldCard>

        {/* SEO Content Section */}
        <div className="space-y-6 pt-12 border-t border-neutral-800/60">
          <h2 className="font-serif text-3xl font-bold">Why use our <span className="text-[var(--gold)]">Name Numerology Calculator</span>?</h2>
          <div className="prose prose-invert max-w-none text-gray-300 font-light text-sm leading-relaxed space-y-4">
            <p>
              In Vedic Astrology and numerology, precision is everything. Our free online Name Numerology provides you with highly accurate insights based on ancient mathematical algorithms combined with modern astronomical data.
            </p>
            <p>
              Understanding your core planetary alignments allows you to make informed decisions about your career, relationships, health, and wealth. While this automated tool gives you an excellent starting point, nothing replaces the deep synthesis provided by a master astrologer.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="pt-8">
          <FAQSection faqs={FAQS} />
        </div>

      </div>
    </div>
  );
}
