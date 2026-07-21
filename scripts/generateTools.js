const fs = require('fs');
const path = require('path');

const tools = [
  { slug: 'birth-chart-generator', title: 'Free Birth Chart Generator', keyword: 'Birth Chart', icon: 'Sparkles', desc: 'Generate your free Vedic Birth Chart (Kundli) instantly.' },
  { slug: 'kundli-generator', title: 'Free Kundli Generator', keyword: 'Kundli', icon: 'Layers', desc: 'Create your detailed online Janam Kundli in seconds.' },
  { slug: 'numerology-calculator', title: 'Numerology Calculator', keyword: 'Numerology', icon: 'Hash', desc: 'Calculate your Life Path and Destiny numbers accurately.' },
  { slug: 'lucky-number-calculator', title: 'Lucky Number Calculator', keyword: 'Lucky Number', icon: 'Star', desc: 'Find your daily and lifetime lucky numbers for success.' },
  { slug: 'name-numerology-calculator', title: 'Name Numerology Calculator', keyword: 'Name Numerology', icon: 'PenTool', desc: 'Check the numerical vibration of your name spelling.' },
  { slug: 'marriage-compatibility-checker', title: 'Marriage Compatibility Checker', keyword: 'Marriage Match', icon: 'Heart', desc: 'Check Ashtakoot Guna Milan and marriage compatibility.' },
  { slug: 'zodiac-sign-finder', title: 'Zodiac Sign Finder', keyword: 'Zodiac Sign', icon: 'Compass', desc: 'Find your true Sun and Moon signs based on birth details.' },
  { slug: 'moon-sign-calculator', title: 'Moon Sign Calculator', keyword: 'Moon Sign', icon: 'Moon', desc: 'Calculate your Vedic Moon Sign (Rashi) instantly.' },
  { slug: 'ascendant-calculator', title: 'Ascendant Calculator', keyword: 'Ascendant (Lagna)', icon: 'Sun', desc: 'Find your Ascendant or Rising sign for accurate predictions.' },
  { slug: 'nakshatra-finder', title: 'Nakshatra Finder', keyword: 'Nakshatra', icon: 'Eye', desc: 'Discover your birth star (Nakshatra) and its meaning.' },
  { slug: 'panchang', title: 'Today\'s Panchang', keyword: 'Panchang', icon: 'Calendar', desc: 'Check today\'s daily Panchang and auspicious timings.' },
  { slug: 'daily-horoscope', title: 'Daily Horoscope', keyword: 'Horoscope', icon: 'BookOpen', desc: 'Read your free daily horoscope based on your zodiac sign.' },
  { slug: 'muhurat-calculator', title: 'Muhurat Calculator', keyword: 'Muhurat', icon: 'CheckCircle2', desc: 'Find the most auspicious time (Muhurat) for your activities.' },
  { slug: 'dasha-calculator', title: 'Dasha Calculator', keyword: 'Vimshottari Dasha', icon: 'Activity', desc: 'Track your current planetary periods and major life cycles.' },
  { slug: 'lucky-color-calculator', title: 'Lucky Color Calculator', keyword: 'Lucky Color', icon: 'Palette', desc: 'Find your most auspicious colors for daily wear.' },
];

const basePath = path.join(__dirname, 'frontend/app/free-tools');
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
}

tools.forEach(tool => {
  const dirPath = path.join(basePath, tool.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const componentName = tool.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Page';
  
  const content = `'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ${tool.icon}, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { FAQSection } from '@/components/ui/FAQSection';

const FAQS = [
  { q: 'What is a ${tool.keyword}?', a: 'A ${tool.keyword} is an essential tool in astrology to map your cosmic energies and decode your potential.' },
  { q: 'How accurate is this ${tool.title}?', a: 'Our calculator uses precise astronomical ephemeris data to generate highly accurate results.' },
  { q: 'Is this service completely free?', a: 'Yes, this tool is 100% free to use for unlimited calculations.' },
  { q: 'Do I need my exact birth time?', a: 'For the most accurate results, your exact time of birth is highly recommended.' },
  { q: 'Can I consult an astrologer after generating my report?', a: 'Absolutely! We offer premium 1-on-1 consultations to help you decode the deeper meanings of your results.' }
];

export default function ${componentName}() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setResult(true);
    }, 1500);
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
            <${tool.icon} className="w-4 h-4" /> Free Utility
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            ${tool.title.replace(tool.keyword, '')} <span className="gold-gradient-text">${tool.keyword}</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto">
            ${tool.desc} Enter your details below to calculate your personalized report instantly.
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
                <${tool.icon} className="w-8 h-8 text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Report Generated!</h3>
                <p className="text-gray-400 text-sm">
                  The API is ready to be connected here to display the detailed ${tool.keyword} for {formData.name}.
                </p>
              </div>
              <GoldButton onClick={() => setResult(false)} variant="outlined">
                Calculate Again
              </GoldButton>
            </motion.div>
          )}
        </GoldCard>

        {/* SEO Content Section */}
        <div className="space-y-6 pt-12 border-t border-neutral-800/60">
          <h2 className="font-serif text-3xl font-bold">Why use our <span className="text-[var(--gold)]">${tool.title}</span>?</h2>
          <div className="prose prose-invert max-w-none text-gray-300 font-light text-sm leading-relaxed space-y-4">
            <p>
              In Vedic Astrology and numerology, precision is everything. Our free online ${tool.keyword} provides you with highly accurate insights based on ancient mathematical algorithms combined with modern astronomical data.
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
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
});

console.log('15 Free Tools landing pages successfully generated!');
