import React from 'react';

export function ReportSectionFooter() {
  return (
    <div className="w-full text-center text-[14px] md:text-base font-bold text-blue-950 dark:text-blue-400 mt-4 pt-2 border-t border-blue-950/10 flex flex-wrap items-center justify-center gap-1.5 md:gap-2 select-none print:flex">
      <span>Om Astrology AMC</span>
      <span>|</span>
      <a href="https://www.omastrologyamc.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
        omastrologyamc.com
      </a>
      <span>|</span>
      <span>FEAN THEORY AMB</span>
      <span>|</span>
      <span>+91 9922352666</span>
    </div>
  );
}
