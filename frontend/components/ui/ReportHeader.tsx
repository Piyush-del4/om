import React from 'react';
import { Phone } from 'lucide-react';

interface ReportHeaderProps {
  className?: string;
  isBig?: boolean;
}

export function ReportHeader({ className = '', isBig = false }: ReportHeaderProps) {
  if (isBig) {
    return (
      <div className={`w-full max-w-4xl mx-auto mt-0 mb-4 px-4 py-3 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/15 border-2 border-amber-500/50 rounded-2xl grid grid-cols-12 items-center shadow-md ${className}`}>
        
        {/* Left: Logo (2 cols) */}
        <div className="col-span-2 flex items-center justify-start">
          <img 
            src="/images/logo.png" 
            alt="OM Astrology AMC Logo" 
            className="w-12 h-12 md:w-14 md:h-14 object-contain border-2 border-amber-400 rounded-full bg-black/80 shadow-md p-1"
          />
        </div>

        {/* Middle: Company Name & FEAN THEORY AMB (7 cols - No Overlap) */}
        <div className="col-span-8 sm:col-span-7 flex flex-col items-center justify-center text-center space-y-0.5 px-1">
          <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-black text-amber-950 dark:text-amber-200 tracking-wider uppercase leading-tight whitespace-nowrap">
            OM ASTROLOGY AMC
          </h2>
          <p className="text-[10px] sm:text-xs font-bold text-amber-800 dark:text-amber-400 tracking-[0.25em] uppercase font-mono whitespace-nowrap">
            FEAN THEORY AMB
          </p>
        </div>

        {/* Right: Phone Number (3 cols - Decreased Font Size) */}
        <div className="col-span-2 sm:col-span-3 flex items-center justify-end">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-amber-950 dark:text-amber-200 bg-white/80 dark:bg-neutral-800/90 px-2.5 py-1 rounded-full border border-amber-500/40 shadow-xs whitespace-nowrap">
            <Phone className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
            <a href="tel:+919922352666" className="hover:underline tracking-wider font-mono">
              +91 9922352666
            </a>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto mt-0 mb-2 px-3 py-1.5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/40 rounded-xl grid grid-cols-12 items-center shadow-xs ${className}`}>
      
      {/* Left: Logo (2 cols) */}
      <div className="col-span-2 flex items-center justify-start">
        <img 
          src="/images/logo.png" 
          alt="OM Astrology AMC Logo" 
          className="w-8 h-8 md:w-9 md:h-9 object-contain border border-amber-400 rounded-full bg-black/80 shadow-xs p-0.5"
        />
      </div>

      {/* Middle: Company Name & FEAN THEORY AMB (7 cols) */}
      <div className="col-span-8 sm:col-span-7 flex flex-col items-center justify-center text-center space-y-0 px-1">
        <h2 className="font-serif text-xs sm:text-sm md:text-base font-extrabold text-amber-950 dark:text-amber-200 tracking-wide uppercase leading-tight whitespace-nowrap">
          OM ASTROLOGY AMC
        </h2>
        <p className="text-[8px] md:text-[9px] font-bold text-amber-800 dark:text-amber-400 tracking-[0.2em] uppercase font-mono whitespace-nowrap">
          FEAN THEORY AMB
        </p>
      </div>

      {/* Right: Phone Number (3 cols) */}
      <div className="col-span-2 sm:col-span-3 flex items-center justify-end">
        <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-semibold text-amber-950 dark:text-amber-200 bg-white/70 dark:bg-neutral-800/80 px-2 py-0.5 rounded-full border border-amber-500/30 shadow-xs whitespace-nowrap">
          <Phone className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400 shrink-0" />
          <a href="tel:+919922352666" className="hover:underline tracking-wider font-mono">
            +91 9922352666
          </a>
        </div>
      </div>

    </div>
  );
}
