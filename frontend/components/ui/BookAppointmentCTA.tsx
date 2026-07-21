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
    <div className={`bg-gradient-to-r from-amber-50 via-white to-amber-50 dark:from-amber-950/40 dark:via-neutral-900 dark:to-amber-950/40 border border-amber-300 dark:border-[var(--gold)]/30 rounded-2xl p-6 md:p-8 text-center space-y-4 shadow-xl ${className}`}>
      <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center mx-auto text-amber-800 dark:text-[var(--gold)]">
        <Sparkles className="w-6 h-6" />
      </div>

      <div className="max-w-xl mx-auto space-y-2">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-neutral-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-neutral-700 dark:text-gray-300 font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <Link href="/appointments">
          <GoldButton variant="filled" className="px-8 py-3 flex items-center gap-2 text-base shadow-lg hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" /> Book 1-on-1 Appointment <ArrowRight className="w-4 h-4 ml-1" />
          </GoldButton>
        </Link>
      </div>
    </div>
  );
}
