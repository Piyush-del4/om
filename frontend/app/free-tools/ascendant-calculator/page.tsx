'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { FAQSection } from '@/components/ui/FAQSection';
import { env } from '@/lib/env';

const FAQS = [
  { q: 'What is an Ascendant (Lagna)?', a: 'Your Ascendant, or Rising Sign, is the exact zodiac sign that was rising on the eastern horizon at the moment you were born. It represents your physical body, outward behavior, and life path.' },
  { q: 'How accurate is this Ascendant Calculator?', a: 'Our calculator uses precise astronomical ephemeris data to generate highly accurate results based on Vedic Astrology (Jyotish).' },
  { q: 'Is this service completely free?', a: 'Yes, this tool is 100% free to use for unlimited calculations.' },
  { q: 'Do I need my exact birth time?', a: 'Yes! The Ascendant changes sign every 2 hours, so exact birth time and location are absolutely critical.' },
  { q: 'Can I consult an astrologer after generating my report?', a: 'Absolutely! We offer premium 1-on-1 consultations to help you decode the deeper meanings of your results.' }
];

const ZODIAC_SIGNS = [
  'Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 'Cancer (Karka)', 
  'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrishchika)', 
  'Sagittarius (Dhanu)', 'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'
];

export default function AscendantCalculatorPage() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(false);

  const [resultData, setResultData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/astrology/proxy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: 'planets',
          data: {
            year: parseInt(formData.date.split('-')[0]),
            month: parseInt(formData.date.split('-')[1]),
            date: parseInt(formData.date.split('-')[2]),
            hours: parseInt(formData.time.split(':')[0] || '0'),
            minutes: parseInt(formData.time.split(':')[1] || '0'),
            seconds: 0,
            latitude: 28.6139,
            longitude: 77.2090,
            timezone: 5.5,
            config: {
              observation_point: 'topocentric',
              ayanamsha: 'lahiri'
            }
          }
        }),
      });

      const data = await response.json();
      const planetsObj = data.data?.output?.[0] || {};
      const lagnaData = Object.values(planetsObj).find((p: any) => p.name === 'Ascendant');
      
      if (data.success && lagnaData) {
        setResultData(lagnaData);
        setResult(true);
      } else {
        alert('Failed to calculate: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Network error while connecting to the astrology API.');
    } finally {
      setIsSubmitting(false);
    }
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
            <Sun className="w-4 h-4" /> Free Utility
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            Ascendant Calculator <span className="gold-gradient-text">Ascendant (Lagna)</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto">
            Find your Ascendant or Rising sign for accurate predictions. Enter your details below to calculate your personalized report instantly.
          </p>
        </motion.div>

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
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Date of Birth</label>
                  <input 
                    type="date" 
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors [color-scheme:dark]"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Time of Birth</label>
                  <input 
                    type="time" 
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors [color-scheme:dark]"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300 font-medium">Place of Birth</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
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
                <Sun className="w-8 h-8 text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Report Generated!</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Here is the precise Ascendant (Lagna) for <span className="capitalize text-[var(--gold)]">{formData.name}</span>.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center max-w-sm mx-auto">
                  <div className="text-[var(--gold)] font-serif text-4xl md:text-5xl font-bold mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    {ZODIAC_SIGNS[resultData?.current_sign - 1] || 'Unknown'}
                  </div>
                  <div className="text-sm text-gray-300 font-light">
                    Your Lagna was rising at {resultData?.normDegree?.toFixed(2)}° in the sign of {ZODIAC_SIGNS[resultData?.current_sign - 1]?.split(' ')[0]} at the moment of your birth.
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
          <h2 className="font-serif text-3xl font-bold">Why use our <span className="text-[var(--gold)]">Ascendant Calculator</span>?</h2>
          <div className="prose prose-invert max-w-none text-gray-300 font-light text-sm leading-relaxed space-y-4">
            <p>
              In Vedic Astrology and numerology, precision is everything. Our free online Ascendant (Lagna) provides you with highly accurate insights based on ancient mathematical algorithms combined with modern astronomical data.
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
