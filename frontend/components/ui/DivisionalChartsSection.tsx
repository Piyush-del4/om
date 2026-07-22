'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NorthIndianChart } from './NorthIndianChart';
import { calculateVargaChart, VargaType, VARGA_TITLE_MAP } from '@/lib/vargaCalculator';

interface DivisionalChartsProps {
  data: any;
}

const VARGA_ITEMS: { key: VargaType; title: string; subtitle: string }[] = [
  { key: 'chandra', title: 'Chandra Kundali', subtitle: 'Moon Chart (Mind & Emotions)' },
  { key: 'navamsa', title: 'Navamsa (D-9)', subtitle: 'Spouse, Destiny & Inner Strength' },
  { key: 'chalit', title: 'Chalit Chart', subtitle: 'Actual Planetary House Positions' },
  /* Preserved Other Vargas (Commented for future activation):
  { key: 'hora', title: 'Hora (D-2)', subtitle: 'Wealth & Financial Prosperity' },
  { key: 'drekkana', title: 'Drekkana (D-3)', subtitle: 'Siblings, Courage & Endeavors' },
  { key: 'chaturthamsha', title: 'Chaturthamsha (D-4)', subtitle: 'Property, Residence & Fortune' },
  { key: 'saptamsa', title: 'Saptamsa (D-7)', subtitle: 'Children, Progeny & Grandchildren' },
  { key: 'dasamsa', title: 'Dashamsa (D-10)', subtitle: 'Career, Profession & Achievements' },
  { key: 'dwadasamsa', title: 'Dwadashamsa (D-12)', subtitle: 'Parents, Lineage & Ancestry' },
  { key: 'shodashamsa', title: 'Shodashamsa (D-16)', subtitle: 'Vehicles, Comforts & Pleasures' },
  { key: 'vimshamsha', title: 'Vimshamsha (D-20)', subtitle: 'Spiritual Progress & Meditation' },
  { key: 'chaturvimshamsha', title: 'Chaturvimshamsha (D-24)', subtitle: 'Higher Education & Learning' },
  { key: 'saptavimshamsha', title: 'Saptavimshamsha (D-27)', subtitle: 'Physical Strength & Vitality' },
  { key: 'trimshamsha', title: 'Trimshamsha (D-30)', subtitle: 'Misfortunes, Evils & Karmic Audits' },
  { key: 'khavedamsha', title: 'Khavedamsha (D-40)', subtitle: 'Auspicious & Inauspicious Effects' },
  { key: 'akshavedamsha', title: 'Akshavedamsha (D-45)', subtitle: 'General Well-being & All Matters' },
  { key: 'shastiamsa', title: 'Shastiamsa (D-60)', subtitle: 'Past Life Karma & Root Destiny' },
  */
];

export function DivisionalChartsSection({ data }: DivisionalChartsProps) {
  if (!data || !data.output) return null;

  // Pre-calculate all varga charts
  const vargaCharts = VARGA_ITEMS.map((item) => ({
    ...item,
    chartData: calculateVargaChart(data, item.key)
  }));

  return (
    <div className="bg-amber-50/60 dark:bg-neutral-900 border-2 border-amber-800/30 rounded-2xl p-6 w-full max-w-5xl mx-auto my-6 shadow-lg space-y-6">
      {/* Title Header */}
      <div 
        /* onClick={() => setIsOpen(!isOpen)} */
        className="bg-amber-700 dark:bg-amber-800 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2 select-none"
      >
        <span className="text-xl">☸️</span>
        <h3 className="font-serif font-bold text-lg md:text-2xl">
          Key Divisional Charts (Chandra Kundali, Navamsa D-9 & Chalit Chart)
        </h3>
        {/* <ChevronDown className={`w-6 h-6 transition-transform duration-300 print:hidden ${isOpen ? 'rotate-180' : ''}`} /> */}
      </div>

      {/* <div className={`collapsible-content ${isOpen ? 'block' : 'hidden'} space-y-6`}> */}
      <div className="space-y-8 pt-2">
        {vargaCharts.map((item) => (
          <div key={item.key} className="pdf-page-break-avoid w-full max-w-5xl mx-auto">
            <NorthIndianChart 
              title={item.chartData.chartTitle} 
              subtitle={item.subtitle}
              data={item.chartData} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
