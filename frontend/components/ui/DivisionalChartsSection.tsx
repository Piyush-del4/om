import React, { useState } from 'react';
import { NorthIndianChart } from './NorthIndianChart';
import { calculateVargaChart, VargaType } from '@/lib/vargaCalculator';

interface DivisionalChartsProps {
  data: any;
}

const VARGA_ITEMS: { key: VargaType; title: string; subtitle: string }[] = [
  { key: 'chandra', title: 'Chandra Kundali', subtitle: 'Moon Chart (Mind & Emotions)' },
  { key: 'navamsa', title: 'Navamsa (D-9)', subtitle: 'Spouse, Destiny & Inner Strength' },
  { key: 'hora', title: 'Hora (D-2)', subtitle: 'Wealth & Prosperity' },
  { key: 'chalit', title: 'Chalit Chart', subtitle: 'Actual Planetary House Positions' },
  { key: 'dasamsa', title: 'Dasamsa (D-10)', subtitle: 'Career, Profession & Achievements' },
  { key: 'saptamsa', title: 'Saptamsa (D-7)', subtitle: 'Children & Progeny' },
  { key: 'dwadasamsa', title: 'Dwadasamsa (D-12)', subtitle: 'Parents & Lineage' },
];

export function DivisionalChartsSection({ data }: DivisionalChartsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'tabs'>('grid');
  const [activeTab, setActiveTab] = useState<VargaType>('chandra');

  if (!data || !data.output) return null;

  // Pre-calculate all varga charts
  const vargaCharts = VARGA_ITEMS.map((item) => ({
    ...item,
    chartData: calculateVargaChart(data, item.key)
  }));

  const activeChart = vargaCharts.find(v => v.key === activeTab) || vargaCharts[0];

  return (
    <div className="w-full max-w-4xl mx-auto my-6 space-y-6">
      {/* Title Header */}
      <div className="text-center space-y-1">
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-amber-950 dark:text-amber-200">
          ✦ Divisional Charts (Vargas) ✦
        </h3>
        <p className="text-xs md:text-sm text-neutral-600 dark:text-gray-400 font-light">
          Deep Vedic astrological divisional breakdown for precise life analysis
        </p>
      </div>

      {/* Screen View Mode Switcher (Grid vs Tabs) */}
      <div className="flex justify-center items-center gap-3 print:hidden">
        <button
          onClick={() => setViewMode('grid')}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
            viewMode === 'grid'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-amber-100/70 dark:bg-neutral-800 text-amber-950 dark:text-amber-200'
          }`}
        >
          All Charts (Grid View)
        </button>
        <button
          onClick={() => setViewMode('tabs')}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
            viewMode === 'tabs'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-amber-100/70 dark:bg-neutral-800 text-amber-950 dark:text-amber-200'
          }`}
        >
          Single Chart View
        </button>
      </div>

      {/* Interactive Tabs (Only when Single Chart View is selected) */}
      {viewMode === 'tabs' && (
        <div className="flex flex-wrap justify-center gap-2 print:hidden">
          {VARGA_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === item.key
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-amber-100 dark:bg-neutral-800 text-neutral-800 dark:text-gray-300'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}

      {/* Single Chart View Display */}
      {viewMode === 'tabs' && (
        <div className="print:hidden flex flex-col items-center space-y-3">
          <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 italic">
            {activeChart.subtitle}
          </p>
          <div className="w-full max-w-2xl">
            <NorthIndianChart title={activeChart.chartData.chartTitle} data={activeChart.chartData} />
          </div>
        </div>
      )}

      {/* Grid Display (Always visible in Grid mode and for PDF downloads) */}
      <div className={`${viewMode === 'tabs' ? 'hidden print:block' : 'block'} space-y-6 pt-2`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {vargaCharts.map((item) => (
            <div key={item.key} className="pdf-page-break-avoid space-y-1">
              <p className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 text-center italic">
                {item.subtitle}
              </p>
              <NorthIndianChart title={item.chartData.chartTitle} data={item.chartData} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
