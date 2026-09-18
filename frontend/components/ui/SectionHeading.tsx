import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  showOrbitLine?: boolean;
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  centered = true,
  showOrbitLine = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`space-y-3 ${centered ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'} ${className}`}>
      {kicker && (
        <span className="inline-block text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#6F2935] bg-[#6F2935]/10 px-3 py-1 rounded-full">
          {kicker}
        </span>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1D1C1A] tracking-tight leading-tight">
        {title}
      </h2>
      {showOrbitLine && (
        <div className={`flex items-center gap-2 pt-1 ${centered ? 'justify-center' : ''}`}>
          <span className="h-[1px] w-12 bg-[#DED2BE]" />
          <span className="w-1.5 h-1.5 rounded-full border border-[#A78652] bg-white" />
          <span className="h-[1px] w-12 bg-[#DED2BE]" />
        </div>
      )}
      {subtitle && (
        <p className="text-xs sm:text-sm text-[#77736D] leading-relaxed pt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
