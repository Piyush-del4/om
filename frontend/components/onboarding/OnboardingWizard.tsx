'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { client } from '@/lib/api/client';
import {
  X, Star, MapPin, Clock, Calendar, Sparkles, ChevronRight, ChevronLeft, Check
} from 'lucide-react';
import { TimePicker12Hour } from '@/components/ui/TimePicker12Hour';

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', dates: 'Mar 21 – Apr 19' },
  { name: 'Taurus', symbol: '♉', dates: 'Apr 20 – May 20' },
  { name: 'Gemini', symbol: '♊', dates: 'May 21 – Jun 20' },
  { name: 'Cancer', symbol: '♋', dates: 'Jun 21 – Jul 22' },
  { name: 'Leo', symbol: '♌', dates: 'Jul 23 – Aug 22' },
  { name: 'Virgo', symbol: '♍', dates: 'Aug 23 – Sep 22' },
  { name: 'Libra', symbol: '♎', dates: 'Sep 23 – Oct 22' },
  { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 – Nov 21' },
  { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 – Dec 21' },
  { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 – Jan 19' },
  { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 – Feb 18' },
  { name: 'Pisces', symbol: '♓', dates: 'Feb 19 – Mar 20' },
];

const INTEREST_OPTIONS = [
  { id: 'natal-chart', label: 'Natal Chart Reading', icon: '🌟' },
  { id: 'numerology', label: 'Numerology', icon: '🔢' },
  { id: 'tarot', label: 'Tarot Readings', icon: '🃏' },
  { id: 'transit', label: 'Planetary Transits', icon: '🪐' },
  { id: 'compatibility', label: 'Compatibility / Synastry', icon: '❤️' },
  { id: 'vastu', label: 'Vastu Shastra', icon: '🏠' },
  { id: 'career', label: 'Career & Finance', icon: '💼' },
  { id: 'health', label: 'Health & Wellness', icon: '🌿' },
  { id: 'remedies', label: 'Astrological Remedies', icon: '🪬' },
  { id: 'meditation', label: 'Meditation & Spirituality', icon: '🧘' },
];

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male', icon: '♂' },
  { value: 'female', label: 'Female', icon: '♀' },
  { value: 'prefer-not', label: 'Prefer not to say', icon: '·' },
];

interface OnboardingWizardProps {
  userName: string;
  onComplete: () => void;
  onSkip: () => void;
}

export default function OnboardingWizard({ userName, onComplete, onSkip }: OnboardingWizardProps) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [gender, setGender] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  // Autocomplete state
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&featuretype=city`);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Error fetching locations:', err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBirthPlace(val);
    setShowSuggestions(true);
    
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 400);
  };

  const totalSteps = 4;

  const toggleInterest = (id: string) => {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError('');
    try {
      await client.patch('/users/me/onboarding', {
        dateOfBirth,
        birthTime,
        birthPlace,
        gender,
        zodiacSign,
        interests,
      });
      onComplete();
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Something went wrong. Please try again.');
      setSaving(false);
    }
  };

  const steps = [
    {
      title: 'Welcome aboard!',
      subtitle: `Let's personalise your experience, ${userName.split(' ')[0]}`,
      icon: <Sparkles className="w-8 h-8 text-[#e77600]" />,
    },
    {
      title: 'Your Birth Details',
      subtitle: 'Accurate birth data unlocks deeper astrological insights',
      icon: <Calendar className="w-8 h-8 text-[#e77600]" />,
    },
    {
      title: 'Your Zodiac Sign',
      subtitle: 'Select your sun sign or let us calculate it from your date of birth',
      icon: <Star className="w-8 h-8 text-[#e77600]" />,
    },
    {
      title: 'Your Interests',
      subtitle: 'What areas of astrology fascinate you most?',
      icon: <Sparkles className="w-8 h-8 text-[#e77600]" />,
    },
  ];

  const canProceed = () => {
    if (step === 1) return dateOfBirth.trim().length > 0;
    if (step === 2) return zodiacSign.trim().length > 0;
    if (step === 3) return interests.length > 0;
    return true;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wizard-in {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes step-slide {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .wizard-card { animation: wizard-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .step-content { animation: step-slide 0.3s ease-out forwards; }
        .interest-chip:hover { transform: translateY(-2px); }
        .zodiac-card:hover { transform: translateY(-2px) scale(1.04); }
      `}} />

      <div className="wizard-card w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-8 pt-8 pb-6 border-b border-amber-100">
          {/* Background decorative */}
          <div className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <circle cx="80" cy="20" r="60" stroke="#e77600" strokeWidth="0.5" strokeDasharray="3 4" />
              <circle cx="80" cy="20" r="45" stroke="#e77600" strokeWidth="0.3" />
            </svg>
          </div>

          <button
            onClick={onSkip}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 hover:bg-white border border-amber-100 text-gray-400 hover:text-gray-700 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#e77600] to-amber-400 flex items-center justify-center shadow-lg shadow-orange-200">
              {steps[step].icon}
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-gray-900">{steps[step].title}</h2>
              <p className="text-xs text-gray-500 font-light mt-0.5">{steps[step].subtitle}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  i <= step ? 'bg-gradient-to-r from-[#e77600] to-amber-400' : 'bg-amber-100'
                }`}
              />
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 font-mono">Step {step + 1} of {totalSteps}</p>
        </div>

        {/* Body */}
        <div className="px-8 py-6 max-h-[60vh] overflow-y-auto">

          {/* Step 0 — Welcome */}
          {step === 0 && (
            <div className="step-content space-y-5">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
                <p className="text-sm text-gray-700 font-light leading-relaxed">
                  🌟 Welcome to <span className="font-semibold text-[#e77600]">OM Astrology AMC</span>!
                </p>
                <p className="text-sm text-gray-600 font-light leading-relaxed mt-2">
                  Take 60 seconds to personalise your journey. We'll use your birth details and interests to show you the most relevant readings, content, and appointments.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '🔮', label: 'Tailored Readings' },
                  { icon: '🪐', label: 'Custom Transits' },
                  { icon: '📅', label: 'Smart Picks' },
                ].map(item => (
                  <div key={item.label} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-center">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 — Birth Details */}
          {step === 1 && (
            <div className="step-content space-y-5">
              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#e77600]">
                  Date of Birth <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-200 bg-amber-50/40 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#e77600]/30 focus:border-[#e77600] transition-all"
                  />
                </div>
              </div>

              {/* Birth Time */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#e77600]">
                  Birth Time <span className="text-gray-400 normal-case font-light">(optional — for accurate ascendant)</span>
                </label>
                <TimePicker12Hour
                  value={birthTime}
                  onChange={setBirthTime}
                />
              </div>

              {/* Birth Place */}
              <div className="space-y-1.5" ref={wrapperRef}>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#e77600]">
                  Birth Place <span className="text-gray-400 normal-case font-light">(optional)</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                  <input
                    type="text"
                    value={birthPlace}
                    onChange={handleLocationChange}
                    onFocus={() => { if (birthPlace.length >= 3) setShowSuggestions(true); }}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-200 bg-amber-50/40 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#e77600]/30 focus:border-[#e77600] transition-all placeholder:text-gray-400"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg className="animate-spin w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    </div>
                  )}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-amber-100 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setBirthPlace(s.display_name);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-amber-50/50 border-b border-amber-50 last:border-0 transition-colors"
                        >
                          {s.display_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#e77600]">
                  Gender <span className="text-gray-400 normal-case font-light">(optional)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GENDER_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setGender(g => g === opt.value ? '' : opt.value)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        gender === opt.value
                          ? 'border-[#e77600] bg-orange-50 text-[#e77600] shadow-sm shadow-orange-100'
                          : 'border-amber-100 bg-amber-50/30 text-gray-600 hover:border-amber-300'
                      }`}
                    >
                      <span className="text-base">{opt.icon}</span>
                      <span className="text-xs">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Zodiac Sign */}
          {step === 2 && (
            <div className="step-content">
              <div className="grid grid-cols-3 gap-2">
                {ZODIAC_SIGNS.map(sign => (
                  <button
                    key={sign.name}
                    type="button"
                    onClick={() => setZodiacSign(sign.name)}
                    className={`zodiac-card flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                      zodiacSign === sign.name
                        ? 'border-[#e77600] bg-gradient-to-br from-orange-50 to-amber-50 shadow-md shadow-orange-100'
                        : 'border-amber-100 bg-amber-50/30 hover:border-amber-300'
                    }`}
                  >
                    <span className={`text-2xl ${zodiacSign === sign.name ? 'filter drop-shadow-sm' : 'opacity-80'}`}>
                      {sign.symbol}
                    </span>
                    <span className={`text-[11px] font-semibold ${zodiacSign === sign.name ? 'text-[#e77600]' : 'text-gray-700'}`}>
                      {sign.name}
                    </span>
                    <span className="text-[9px] text-gray-400 leading-tight">{sign.dates}</span>
                    {zodiacSign === sign.name && (
                      <div className="w-3 h-3 rounded-full bg-[#e77600] flex items-center justify-center mt-0.5">
                        <Check className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 — Interests */}
          {step === 3 && (
            <div className="step-content space-y-3">
              <p className="text-xs text-gray-500 font-light">Select all that apply (at least one)</p>
              <div className="grid grid-cols-2 gap-2">
                {INTEREST_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleInterest(opt.id)}
                    className={`interest-chip flex items-center gap-2 px-3 py-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      interests.includes(opt.id)
                        ? 'border-[#e77600] bg-gradient-to-br from-orange-50 to-amber-50 shadow-sm shadow-orange-100'
                        : 'border-amber-100 bg-amber-50/30 hover:border-amber-300'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{opt.icon}</span>
                    <span className={`text-xs font-medium leading-tight ${interests.includes(opt.id) ? 'text-[#e77600]' : 'text-gray-700'}`}>
                      {opt.label}
                    </span>
                    {interests.includes(opt.id) && (
                      <div className="ml-auto w-4 h-4 rounded-full bg-[#e77600] flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {error && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-amber-100 bg-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors ml-2"
            >
              Skip for now
            </button>
          </div>

          {step < totalSteps - 1 ? (
            <button
              type="button"
              disabled={!canProceed()}
              onClick={() => setStep(s => s + 1)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                canProceed()
                  ? 'bg-gradient-to-r from-[#e77600] to-amber-500 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-200 hover:scale-[1.02]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={!canProceed() || saving}
              onClick={handleSubmit}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                canProceed() && !saving
                  ? 'bg-gradient-to-r from-[#e77600] to-amber-500 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-200 hover:scale-[1.02]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {saving ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" /> Complete Setup
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
