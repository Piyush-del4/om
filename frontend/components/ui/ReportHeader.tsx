import React from 'react';

interface ReportHeaderProps {
  className?: string;
  isBig?: boolean;
}

export function ReportHeader({ className = '' }: ReportHeaderProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto my-4 p-4 rounded-[20px] border-2 border-amber-400 bg-[#FEF9F3] dark:bg-neutral-900 shadow-md grid grid-cols-1 sm:grid-cols-3 items-center gap-4 ${className}`}>
      {/* Left: Logo */}
      <div className="flex justify-center sm:justify-start">
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-amber-500 bg-neutral-950 flex items-center justify-center p-0.5 overflow-hidden shadow-md">
          <img 
            src="/images/logo.png" 
            alt="Om Astrology AMC Logo" 
            className="w-full h-full object-contain rounded-full"
            onError={(e) => {
              e.currentTarget.src = "/favicon.ico";
            }}
          />
        </div>
      </div>

      {/* Center: Title & Subtitle */}
      <div className="text-center py-2 sm:py-0">
        <h1 className="font-sans text-2xl md:text-3.5xl font-bold text-amber-950 dark:text-amber-100 tracking-wider">
          OM ASTROLOGY AMC
        </h1>
        <p className="text-[10px] md:text-xs font-semibold text-amber-800 dark:text-amber-300 tracking-[0.4em] uppercase mt-1.5 pl-[0.4em]">
          FEAN THEORY AMB
        </p>
      </div>

      {/* Right: Contact */}
      <div className="flex justify-center sm:justify-end">
        <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full px-5 py-2.5 shadow-sm">
          <span className="text-amber-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.108-7.108c-.115-.44.05-1.09.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </span>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wide">+91 9922352666</span>
        </div>
      </div>
    </div>
  );
}
