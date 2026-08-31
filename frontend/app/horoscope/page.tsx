import React from 'react';
import Link from 'next/link';
import { HoroscopeDatabaseLinks } from '@/components/ui/astrology/HoroscopeDatabaseLinks';
import { DailyPanchangMuhuratWidget } from '@/components/ui/astrology/DailyPanchangMuhuratWidget';

export const metadata = {
  title: 'All Zodiac Horoscopes - Daily, Weekly, Monthly, Yearly',
  description: 'Select your zodiac sign to read your detailed daily, weekly, monthly, and yearly horoscopes.',
};

const rashiInfo = [
  {
    name: 'Aries',
    desc: 'The ruling planet of Aries is Mars. People of this zodiac sign are born leaders. They are not afraid of taking risks. Their fiery and dynamic nature makes them larger than life. Driven with AMCition, they work hard to make their life beautiful.',
  },
  {
    name: 'Taurus',
    desc: 'Calm, practical and reliable, Taurians are ruled by the planet Venus. They have a natural affinity towards beauty. Whatever they touch, they make it more attractive. They like stability and comfort, and their love for luxury can\'t be put into words.',
  },
  {
    name: 'Gemini',
    desc: 'Talkative, versatile, and intellectual, Gemini are masters of communication. Ruled by Mercury, they are expressive, vocal, and great at calculations. Quick-witted and social, Gemini loves to collaborate while maintaining their individuality.',
  },
  {
    name: 'Cancer',
    desc: 'Ruled by the Moon, they are the most sensitive sign of all. Very creative and soft-hearted, they get hurt easily. They are deeply connected with their families and possess strong nurturing instincts. Traditional, emotional and intuitive will be the three words that describe them the best.',
  },
  {
    name: 'Leo',
    desc: 'Like the Lion, the king of the jungle, Leos are confident, charismatic, and AMCitious. Ruled by the Sun, they can\'t be scared or intimidated. Leadership comes naturally to them and when it comes to making hard decisions, they take it without worrying about the outcome.',
  },
  {
    name: 'Virgo',
    desc: 'Meticulous, practical, and analytical, the Virgo people are ruled by Mercury. They possess keen attention to detail, organizational skills, and a strong sense of duty. Seeking perfection always, they are great problem solvers.',
  },
  {
    name: 'Libra',
    desc: 'The sign Libra itself corresponds to diplomacy. They balance everything handed over to them. Striking a perfect balance between things is a skill nobody can possess better than Librans. Venus is the planet behind Libra which makes them natural peacemakers, seeking harmony and beauty. They are least likely to pass an unfair judgement.',
  },
  {
    name: 'Scorpio',
    desc: 'The words that correspond best with Scorpio are passion, intensity and determination. Nothing can stop a determined Scorpio from achieving the goal they have set their eyes on. They are known for their resilience, loyalty, and ability to embrace change.',
  },
  {
    name: 'Sagittarius',
    desc: 'Ruled by Jupiter, Sagittarians are the travelers of the zodiac. Their curious and energetic nature drives them to wander and seek the meaning of life. Optimistic and enthusiastic, they are always looking for the next big adventure.',
  },
  {
    name: 'Capricorn',
    desc: 'Discipline and responsibility define Capricorns. Ruled by Saturn, they are the masters of self-control and have the ability to lead the way, make solid and realistic plans, and manage many people who work for them at any time.',
  },
  {
    name: 'Aquarius',
    desc: 'Innovative, progressive, and shamelessly revolutionary, Aquarians are ruled by Uranus. They are deep thinkers and highly intellectual people who love helping others. They are able to see without prejudice, on both sides, which makes them people who can easily solve problems.',
  },
  {
    name: 'Pisces',
    desc: 'Pisces are very friendly, so they often find themselves in a company of very different people. Ruled by Neptune, they are selfless, they are always willing to help others, without hoping to get anything back. They are deeply intuitive and artistic.',
  }
];

export default function HoroscopeIndexPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] font-sans pb-24">
      {/* Page Header */}
      <div className="bg-[#B37B47] text-white py-12 md:py-16 mb-12">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">All Zodiac Horoscopes</h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto">
            Select your Zodiac sign below to read your detailed predictions for today, this week, this month, and the entire year of 2026.
          </p>
        </div>
      </div>

      {/* Rashi List Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-16">
        {rashiInfo.map((rashi) => (
          <div key={rashi.name} className="space-y-4 p-6 bg-white/70 rounded-xl border border-[#EAD5B8]/60 shadow-xs">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5A3815]">
              {rashi.name} Today Horoscope
            </h2>
            <p className="text-[#5A3815]/80 text-base leading-relaxed max-w-5xl">
              {rashi.desc}
            </p>
            
            {/* Buttons row */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href={`/horoscope/daily/${rashi.name.toLowerCase()}`}
                className="bg-gradient-to-b from-[#FCAF3E] to-[#F5900F] text-black text-[13px] font-bold px-6 py-2 rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:brightness-105 transition-all border border-[#E38100]"
              >
                {rashi.name} Daily Horoscope
              </Link>
              <Link 
                href={`/horoscope/weekly/${rashi.name.toLowerCase()}`}
                className="bg-gradient-to-b from-[#FCAF3E] to-[#F5900F] text-black text-[13px] font-bold px-6 py-2 rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:brightness-105 transition-all border border-[#E38100]"
              >
                {rashi.name} Weekly Horoscope
              </Link>
              <Link 
                href={`/horoscope/monthly/${rashi.name.toLowerCase()}`}
                className="bg-gradient-to-b from-[#FCAF3E] to-[#F5900F] text-black text-[13px] font-bold px-6 py-2 rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:brightness-105 transition-all border border-[#E38100]"
              >
                {rashi.name} Monthly Horoscope 2026
              </Link>
              <Link 
                href={`/horoscope/yearly/${rashi.name.toLowerCase()}`}
                className="bg-gradient-to-b from-[#FCAF3E] to-[#F5900F] text-black text-[13px] font-bold px-6 py-2 rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:brightness-105 transition-all border border-[#E38100]"
              >
                {rashi.name} Yearly Horoscope 2026
              </Link>
            </div>

            {/* Database Links for each Rashi */}
            <HoroscopeDatabaseLinks rashiName={rashi.name} variant="pills" />
          </div>
        ))}

        {/* Today's Daily Panchang & Muhurat Widget */}
        <DailyPanchangMuhuratWidget variant="card" />

        {/* Global Database Services Footer */}
        <HoroscopeDatabaseLinks variant="full" />
      </div>
    </div>
  );
}
