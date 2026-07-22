'use client';

import React, { useState } from 'react';

interface VimshottariDashaProps {
  data?: any;
  dashaApiData?: any;
  birthDateStr?: string; // YYYY-MM-DD
}

const DASHA_LORDS = [
  { name: 'Ketu', vedic: 'Ketu', years: 7 },
  { name: 'Venus', vedic: 'Shukra', years: 20 },
  { name: 'Sun', vedic: 'Surya', years: 6 },
  { name: 'Moon', vedic: 'Chandra', years: 10 },
  { name: 'Mars', vedic: 'Mangal', years: 7 },
  { name: 'Rahu', vedic: 'Rahu', years: 18 },
  { name: 'Jupiter', vedic: 'Guru', years: 16 },
  { name: 'Saturn', vedic: 'Shani', years: 19 },
  { name: 'Mercury', vedic: 'Budh', years: 17 }
];

const VEDIC_MAP: Record<string, string> = {
  Sun: 'Surya',
  Moon: 'Chandra',
  Mars: 'Mangal',
  Mercury: 'Budh',
  Jupiter: 'Guru',
  Venus: 'Shukra',
  Saturn: 'Shani',
  Rahu: 'Rahu',
  Ketu: 'Ketu'
};

const parseDateStr = (dateStr: string): Date => {
  if (!dateStr) return new Date();
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const d = parseInt(parts[0]) || 1;
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const mIdx = months.indexOf(parts[1]);
      const y = parseInt(parts[2]) || 2024;
      return new Date(y, mIdx >= 0 ? mIdx : 0, d);
    }
  }
  return new Date(dateStr);
};

const formatDateHelper = (d: Date) => {
  const day = d.getDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const getLordIndex = (name: string): number => {
  const normalized = name.trim().toLowerCase();
  const idx = DASHA_LORDS.findIndex(
    l => l.name.toLowerCase() === normalized || l.vedic.toLowerCase() === normalized
  );
  return idx >= 0 ? idx : 0;
};

const calculatePratyantars = (
  antarLordName: string,
  antarStartStr: string,
  antarEndStr: string
) => {
  const antarLordIdx = getLordIndex(antarLordName);
  const startDate = parseDateStr(antarStartStr);
  const endDate = parseDateStr(antarEndStr);
  const totalMs = endDate.getTime() - startDate.getTime();

  let currentStart = new Date(startDate);

  return Array.from({ length: 9 }).map((_, pIdx) => {
    const pLordIdx = (antarLordIdx + pIdx) % 9;
    const pLord = DASHA_LORDS[pLordIdx];

    let pEndDate: Date;
    if (pIdx === 8) {
      pEndDate = new Date(endDate);
    } else {
      const pMs = (totalMs * pLord.years) / 120;
      pEndDate = new Date(currentStart.getTime() + Math.round(pMs));
    }

    const pStartDate = new Date(currentStart);
    currentStart = new Date(pEndDate);

    return {
      lord: pLord,
      startDateStr: formatDateHelper(pStartDate),
      endDateStr: formatDateHelper(pEndDate)
    };
  });
};

export function VimshottariDashaTable({ data, dashaApiData, birthDateStr }: VimshottariDashaProps) {
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});
  const [expandAll, setExpandAll] = useState<boolean>(false);

  const togglePratyantar = (key: string) => {
    setExpandedKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatApiDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const parts = dateStr.split(' ')[0].split('-');
    if (parts.length < 3) return dateStr;
    const y = parts[0];
    const mIdx = (parseInt(parts[1]) || 1) - 1;
    const d = (parts[2] || '01').padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[mIdx] || 'Jan';
    return `${d}/${month}/${y}`;
  };

  let displayTimeline: any[] = [];

  // 1. Primary: Parse official Swiss Ephemeris Dasha API Data
  if (dashaApiData) {
    try {
      let rawObj = dashaApiData;
      if (rawObj.data) rawObj = rawObj.data;
      if (rawObj.output) rawObj = rawObj.output;
      if (typeof rawObj === 'string') {
        rawObj = JSON.parse(rawObj);
      }

      if (rawObj && typeof rawObj === 'object') {
        displayTimeline = Object.entries(rawObj).map(([mahaName, antarsObj]: [string, any]) => {
          const antarEntries = Object.entries(antarsObj || {});
          const firstAntar: any = antarEntries[0]?.[1] || {};
          const lastAntar: any = antarEntries[antarEntries.length - 1]?.[1] || {};

          const antardashas = antarEntries.map(([antarName, timeObj]: [string, any]) => {
            const startStr = formatApiDate(timeObj.start_time);
            const endStr = formatApiDate(timeObj.end_time);
            const pratyantardashas = calculatePratyantars(antarName, startStr, endStr);

            return {
              lord: { name: antarName, vedic: VEDIC_MAP[antarName] || antarName },
              startDateStr: startStr,
              endDateStr: endStr,
              pratyantardashas
            };
          });

          return {
            lord: { name: mahaName, vedic: VEDIC_MAP[mahaName] || mahaName },
            startDateStr: formatApiDate(firstAntar.start_time),
            endDateStr: formatApiDate(lastAntar.end_time),
            antardashas
          };
        });
      }
    } catch (err) {
      console.error('Failed to parse API dasha response:', err);
    }
  }

  // 2. Fallback: Calculation starting on Birth Date
  if (displayTimeline.length === 0 && data && data.output) {
    const planetsObj = data.output[1] || {};
    const moonObj = planetsObj["Moon"] || {};
    const moonFullDegree = moonObj.fullDegree ?? 0;

    const nakshatraIndex = Math.floor(moonFullDegree / 13.333333333333334);
    const lordIndex = nakshatraIndex % 9;

    const birthDateParts = birthDateStr ? birthDateStr.split('-') : ['1990', '01', '01'];
    const birthYear = parseInt(birthDateParts[0]) || 1990;
    const birthMonth = (parseInt(birthDateParts[1]) || 1) - 1;
    const birthDay = parseInt(birthDateParts[2]) || 1;

    const birthDateObj = new Date(birthYear, birthMonth, birthDay);

    const addYearsExact = (baseDate: Date, years: number) => {
      const res = new Date(baseDate);
      res.setFullYear(res.getFullYear() + years);
      return res;
    };

    const formatDate = (d: Date) => {
      const day = d.getDate().toString().padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    let currentMahaStart = new Date(birthDateObj);

    displayTimeline = Array.from({ length: 9 }).map((_, mIdx) => {
      const mahaLordIdx = (lordIndex + mIdx) % 9;
      const mahaLord = DASHA_LORDS[mahaLordIdx];
      const mahaYears = mahaLord.years;

      const mahaStartDate = new Date(currentMahaStart);
      const mahaEndDate = addYearsExact(mahaStartDate, mahaYears);
      currentMahaStart = new Date(mahaEndDate);

      let currentAntarStart = new Date(mahaStartDate);
      let accumAntarYears = 0;

      const antardashas = Array.from({ length: 9 }).map((_, aIdx) => {
        const antarLordIdx = (mahaLordIdx + aIdx) % 9;
        const antarLord = DASHA_LORDS[antarLordIdx];
        accumAntarYears += antarLord.years;

        let antarEndDate: Date;
        if (aIdx === 8) {
          antarEndDate = new Date(mahaEndDate);
        } else {
          const totalDays = (mahaYears * accumAntarYears * 365.2425) / 120;
          antarEndDate = new Date(mahaStartDate.getTime() + Math.round(totalDays) * 86400000);
        }

        const antarStartDate = new Date(currentAntarStart);
        currentAntarStart = new Date(antarEndDate);

        const startStr = formatDate(antarStartDate);
        const endStr = formatDate(antarEndDate);
        const pratyantardashas = calculatePratyantars(antarLord.name, startStr, endStr);

        return {
          lord: antarLord,
          startDateStr: startStr,
          endDateStr: endStr,
          pratyantardashas
        };
      });

      return {
        lord: mahaLord,
        startDateStr: formatDate(mahaStartDate),
        endDateStr: formatDate(mahaEndDate),
        antardashas
      };
    });
  }

  if (displayTimeline.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto my-6 space-y-6">
      {/* Title Header */}
      <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-950 dark:text-amber-200 text-center flex items-center justify-center gap-2">
        ✦ Mahadasha, Antardasha & Pratyantar Dasha ✦
      </h3>

      {/* 1. Mahadasha Table */}
      <div className="pdf-page-break-avoid border-2 border-amber-600 rounded-xl overflow-hidden shadow-md bg-[#fef9c3] dark:bg-neutral-900 mb-8">
        <h4 className="bg-[#f59e0b] text-black font-bold text-center py-2 text-sm md:text-base border-b border-amber-600 font-serif">
          Mahadasha (Major Period)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-[#fef08a] dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 font-bold text-xs border-b border-amber-600">
                <th className="p-2 border-r border-amber-600 font-serif w-1/3">Mahadasha</th>
                <th className="p-2 border-r border-amber-600 font-serif w-1/3">Start Date</th>
                <th className="p-2 font-serif w-1/3">End Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-600/30 text-xs font-medium text-neutral-900 dark:text-amber-100">
              {displayTimeline.map((maha, mIdx) => (
                <tr key={mIdx} className="hover:bg-amber-200/40 transition-colors bg-amber-50/50 dark:bg-neutral-800/50">
                  <td className="p-2 border-r border-amber-600/30 font-serif font-bold text-amber-950 dark:text-amber-200">
                    {maha.lord.vedic}
                  </td>
                  <td className="p-2 border-r border-amber-600/30 font-mono text-[11px] sm:text-xs">
                    {maha.startDateStr}
                  </td>
                  <td className="p-2 font-mono text-[11px] sm:text-xs">
                    {maha.endDateStr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Antardasha Tables */}
      <div className="space-y-6 mb-8">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-950 dark:text-amber-200 text-center flex items-center justify-center gap-2">
          ✦ Antardasha (Sub Period) ✦
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayTimeline.map((maha, mIdx) => (
            <div key={`antar-${mIdx}`} className="pdf-page-break-avoid border-2 border-amber-600 rounded-xl overflow-hidden shadow-md bg-[#fef9c3] dark:bg-neutral-900">
              <h4 className="bg-[#f59e0b] text-black font-bold text-center py-2 text-sm md:text-base border-b border-amber-600 font-serif">
                Mahadasha: {maha.lord.vedic}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse min-w-[300px]">
                <thead>
                  <tr className="bg-[#fef08a] dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 font-bold text-xs border-b border-amber-600">
                    <th className="p-2 border-r border-amber-600 font-serif w-1/3">Antardasha</th>
                    <th className="p-2 border-r border-amber-600 font-serif w-1/3">Start Date</th>
                    <th className="p-2 font-serif w-1/3">End Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-600/30 text-xs font-medium text-neutral-900 dark:text-amber-100">
                  {maha.antardashas.map((antar: any, aIdx: number) => (
                    <tr key={`${maha.lord.vedic}-${aIdx}`} className="hover:bg-amber-200/40 transition-colors bg-amber-50/50 dark:bg-neutral-800/50">
                      <td className="p-2 border-r border-amber-600/30 font-serif font-bold text-amber-800 dark:text-amber-300">
                        {antar.lord.vedic}
                      </td>
                      <td className="p-2 border-r border-amber-600/30 font-mono text-[11px] sm:text-xs">
                        {antar.startDateStr}
                      </td>
                      <td className="p-2 font-mono text-[11px] sm:text-xs">
                        {antar.endDateStr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* 3. Pratyantar Dasha Tables */}
      <div className="space-y-6">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-950 dark:text-amber-200 text-center flex items-center justify-center gap-2">
          ✦ Pratyantar Dasha (Sub-Sub Period) ✦
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayTimeline.map((maha) => 
            maha.antardashas.map((antar: any, aIdx: number) => (
              <div key={`prat-${maha.lord.vedic}-${aIdx}`} className="pdf-page-break-avoid border-2 border-amber-600 rounded-xl overflow-hidden shadow-md bg-[#fef9c3] dark:bg-neutral-900">
                <h4 className="bg-[#f59e0b] text-black font-bold text-center py-2 text-sm md:text-base border-b border-amber-600 font-serif">
                  Mahadasha: {maha.lord.vedic} ➔ Antardasha: {antar.lord.vedic}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse min-w-[300px]">
                  <thead>
                    <tr className="bg-[#fef08a] dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 font-bold text-xs border-b border-amber-600">
                      <th className="p-2 border-r border-amber-600 font-serif w-1/3">Pratyantar</th>
                      <th className="p-2 border-r border-amber-600 font-serif w-1/3">Start Date</th>
                      <th className="p-2 font-serif w-1/3">End Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-600/30 text-xs font-medium text-neutral-900 dark:text-amber-100">
                    {antar.pratyantardashas?.map((prat: any, pIdx: number) => (
                      <tr key={`${maha.lord.vedic}-${antar.lord.vedic}-${pIdx}`} className="hover:bg-amber-200/40 transition-colors bg-amber-50/50 dark:bg-neutral-800/50">
                        <td className="p-1.5 border-r border-amber-600/30 font-serif font-bold text-amber-700 dark:text-amber-400">
                          {prat.lord.vedic}
                        </td>
                        <td className="p-1.5 border-r border-amber-600/30 font-mono text-[11px] sm:text-xs">
                          {prat.startDateStr}
                        </td>
                        <td className="p-1.5 font-mono text-[11px] sm:text-xs">
                          {prat.endDateStr}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
        </div>
      </div>
    </div>
  );
}
