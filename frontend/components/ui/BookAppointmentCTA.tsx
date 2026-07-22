import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { GoldButton } from './GoldButton';

interface BookAppointmentCTAProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function BookAppointmentCTA({
  title = "Book Your Complete Personal Life Reading",
  subtitle = "Speak directly with certified Vedic Astrologers & Master Numerologists to decode your planetary remedies and future timeline.",
  className = ""
}: BookAppointmentCTAProps) {
  return (
    <div className={`bg-[#fffef7] dark:bg-neutral-900 border-2 border-amber-300 dark:border-amber-600/50 rounded-3xl p-6 md:p-8 text-center space-y-3 shadow-md ${className}`}>
      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-600/40 flex items-center justify-center mx-auto text-amber-800 dark:text-amber-300">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="max-w-xl mx-auto space-y-2">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-950 dark:text-amber-200">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-neutral-700 dark:text-gray-300 font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <Link 
          href="/appointments"
          className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-full text-xs md:text-sm shadow-md transition-all transform hover:scale-105 flex items-center gap-2 border border-amber-400"
        >
          <Calendar className="w-4 h-4" /> Book 1-on-1 Appointment →
        </Link>
      </div>
    </div>
  );
}
