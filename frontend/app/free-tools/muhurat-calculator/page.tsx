'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { FAQSection } from '@/components/ui/FAQSection';
import { env } from '@/lib/env';

const FAQS = [
  { q: 'What is a Muhurat?', a: 'A Muhurat is an essential tool in astrology to map your cosmic energies and decode your potential.' },
  { q: 'How accurate is this Muhurat Calculator?', a: 'Our calculator uses precise astronomical ephemeris data to generate highly accurate results.' },
  { q: 'Is this service completely free?', a: 'Yes, this tool is 100% free to use for unlimited calculations.' },
  { q: 'Do I need my exact birth time?', a: 'For the most accurate results, your exact time of birth is highly recommended.' },
  { q: 'Can I consult an astrologer after generating my report?', a: 'Absolutely! We offer premium 1-on-1 consultations to help you decode the deeper meanings of your results.' }
];

export default function MuhuratCalculatorPage() {
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
      if (data.success) {
        setResultData(data.data);
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
            <CheckCircle2 className="w-4 h-4" /> Free Utility
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
             Calculator <span className="gold-gradient-text">Muhurat</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto">
            Find the most auspicious time (Muhurat) for your activities. Enter your details below to calculate your personalized report instantly.
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
                <CheckCircle2 className="w-8 h-8 text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Report Generated!</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Here are the Muhurat planetary alignments for <span className="capitalize text-[var(--gold)]">{formData.name}</span>.
                </p>
                {(() => {
                  const jupiter = resultData?.output?.[1]?.Jupiter;
                  const venus = resultData?.output?.[1]?.Venus;
                  const moon = resultData?.output?.[1]?.Moon;
                  
                  if (!jupiter || !venus || !moon) return null;

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden group hover:border-[var(--gold)] transition-colors">
                        <div className="text-[var(--gold)] text-xs uppercase tracking-wider mb-2 font-semibold flex items-center justify-between">
                          <span>Jupiter (Guru)</span>
                          <span className="text-gray-500">Wisdom</span>
                        </div>
                        <div className="text-3xl font-serif text-white mb-2">{jupiter.fullDegree ? jupiter.fullDegree.toFixed(2) : '-'}°</div>
                        <div className="text-gray-400 text-sm">House: <span className="text-white">{jupiter.house_number || '-'}</span></div>
                        <div className="text-gray-400 text-sm mt-1">Retrograde: <span className="text-white">{jupiter.isRetro === 'true' ? 'Yes' : 'No'}</span></div>
                      </div>

                      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden group hover:border-[var(--gold)] transition-colors">
                        <div className="text-[var(--gold)] text-xs uppercase tracking-wider mb-2 font-semibold flex items-center justify-between">
                          <span>Venus (Shukra)</span>
                          <span className="text-gray-500">Harmony</span>
                        </div>
                        <div className="text-3xl font-serif text-white mb-2">{venus.fullDegree ? venus.fullDegree.toFixed(2) : '-'}°</div>
                        <div className="text-gray-400 text-sm">House: <span className="text-white">{venus.house_number || '-'}</span></div>
                        <div className="text-gray-400 text-sm mt-1">Retrograde: <span className="text-white">{venus.isRetro === 'true' ? 'Yes' : 'No'}</span></div>
                      </div>

                      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden group hover:border-[var(--gold)] transition-colors">
                        <div className="text-[var(--gold)] text-xs uppercase tracking-wider mb-2 font-semibold flex items-center justify-between">
                          <span>Moon (Chandra)</span>
                          <span className="text-gray-500">Emotion</span>
                        </div>
                        <div className="text-3xl font-serif text-white mb-2">{moon.fullDegree ? moon.fullDegree.toFixed(2) : '-'}°</div>
                        <div className="text-gray-400 text-sm">House: <span className="text-white">{moon.house_number || '-'}</span></div>
                        <div className="text-gray-400 text-sm mt-1">Retrograde: <span className="text-white">{moon.isRetro === 'true' ? 'Yes' : 'No'}</span></div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <GoldButton onClick={() => { setResult(false); setResultData(null); }} variant="outlined" className="mt-8">
                Calculate Again
              </GoldButton>
            </motion.div>
          )}
        </GoldCard>

        {/* SEO Content Section */}
        <div className="space-y-6 pt-12 border-t border-neutral-800/60">
          <h2 className="font-serif text-3xl font-bold">Why use our <span className="text-[var(--gold)]">Muhurat Calculator</span>?</h2>
          <div className="prose prose-invert max-w-none text-gray-300 font-light text-sm leading-relaxed space-y-4">
            <p>
              In Vedic Astrology and numerology, precision is everything. Our free online Muhurat provides you with highly accurate insights based on ancient mathematical algorithms combined with modern astronomical data.
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
