'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { generateRemedies, REMEDY_DISCLAIMER, RemedyCategory } from '@/lib/remediesEngine';

interface Props {
  data: any;
}

export function PersonalizedRemediesCard({ data }: Props) {
  /* Collapsible State (Preserved in comments for future activation):
  const [isOpen, setIsOpen] = useState(false);
  */

  if (!data || !data.output || !data.output[1]) return null;

  const remedies: RemedyCategory[] = generateRemedies(data);

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
      {/* Title Header */}
      <div 
        /* onClick={() => setIsOpen(!isOpen)} */
        className="bg-amber-700 dark:bg-amber-800 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
      >
        <span className="text-xl">🕉️</span>
        <h3 className="font-serif font-bold text-lg md:text-2xl">
          Personalized Traditional Remedies
        </h3>
        {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
      </div>

      {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} space-y-6`}> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Traditional Belief Notice */}
      <div className="p-3 bg-amber-100/80 dark:bg-neutral-800 border-l-4 border-amber-600 rounded-r-lg text-xs text-amber-950 dark:text-amber-300">
        <strong className="block font-bold">Important Notice:</strong>
        {REMEDY_DISCLAIMER}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {remedies.map((remedy, idx) => (
          <div key={idx} className="p-4 bg-white dark:bg-neutral-800 border border-amber-300 dark:border-neutral-700 rounded-xl space-y-2 shadow-sm">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-neutral-700 pb-2">
              <h4 className="font-bold text-amber-950 dark:text-amber-300 text-sm">
                {remedy.title}
              </h4>
              <span className="px-2.5 py-0.5 bg-amber-200 dark:bg-amber-900/60 text-amber-950 dark:text-amber-300 text-xs font-bold rounded-full">
                {remedy.type}
              </span>
            </div>

            <p className="text-xs text-gray-800 dark:text-gray-200 font-semibold">{remedy.recommendation}</p>

            <div className="text-[11px] text-gray-600 dark:text-gray-400 space-y-1 pt-1">
              <div><strong>Procedure: </strong>{remedy.procedure}</div>
              <div className="text-amber-800 dark:text-amber-400 font-medium"><strong>Significance: </strong>{remedy.significance}</div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
