import React from 'react';

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

export function VimshottariDashaTable({ data, dashaApiData, birthDateStr }: VimshottariDashaProps) {
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

          const antardashas = antarEntries.map(([antarName, timeObj]: [string, any]) => ({
            lord: { name: antarName, vedic: VEDIC_MAP[antarName] || antarName },
            startDateStr: formatApiDate(timeObj.start_time),
            endDateStr: formatApiDate(timeObj.end_time)
          }));

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

        return {
          lord: antarLord,
          startDateStr: formatDate(antarStartDate),
          endDateStr: formatDate(antarEndDate)
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
    <div className="w-full max-w-4xl mx-auto my-8 space-y-6">
      {/* Title Header */}
      <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-950 dark:text-amber-200 text-center flex items-center justify-center gap-2">
        ✦ Vimshottari Mahadasha & Antardasha ✦
      </h3>

      {/* Main Mahadasha Table */}
      <div className="pdf-page-break-avoid border-2 border-amber-600 rounded-xl overflow-hidden shadow-md bg-[#fef9c3] dark:bg-neutral-900 max-w-xl mx-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-[#f59e0b] text-black font-bold text-sm md:text-base border-b-2 border-amber-600">
              <th className="p-2.5 border-r border-amber-600 font-serif">Mahadasha</th>
              <th className="p-2.5 border-r border-amber-600 font-serif">Start</th>
              <th className="p-2.5 font-serif">End</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-600/40 text-xs md:text-sm font-semibold text-neutral-900 dark:text-amber-100">
            {displayTimeline.map((maha, idx) => (
              <tr key={idx} className="hover:bg-amber-200/50">
                <td className="p-2 border-r border-amber-600/40 font-serif font-bold">{maha.lord.vedic}</td>
                <td className="p-2 border-r border-amber-600/40 font-mono">{maha.startDateStr}</td>
                <td className="p-2 font-mono">{maha.endDateStr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grid of 9 Antardasha Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {displayTimeline.map((maha, mIdx) => (
          <div key={mIdx} className="pdf-page-break-avoid border-2 border-amber-600 rounded-xl overflow-hidden shadow-md bg-[#fef9c3] dark:bg-neutral-900">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-[#f59e0b] text-black font-bold text-xs md:text-sm border-b border-amber-600">
                  <th className="p-2 border-r border-amber-600 font-serif w-1/3">Antardasha</th>
                  <th className="p-2 border-r border-amber-600 font-serif w-1/3">Start</th>
                  <th className="p-2 font-serif w-1/3">End</th>
                </tr>
                <tr className="bg-[#fef08a] dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 font-bold text-xs border-b border-amber-600">
                  <td colSpan={3} className="py-1.5 font-serif font-extrabold text-center tracking-wide">
                    Mahadasha: {maha.lord.vedic}
                  </td>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-600/30 text-xs font-medium text-neutral-900 dark:text-amber-100">
                {maha.antardashas.map((antar: any, aIdx: number) => (
                  <tr key={aIdx} className="hover:bg-amber-200/40">
                    <td className="p-1.5 border-r border-amber-600/30 font-serif font-bold">{antar.lord.vedic}</td>
                    <td className="p-1.5 border-r border-amber-600/30 font-mono text-[11px] sm:text-xs">{antar.startDateStr}</td>
                    <td className="p-1.5 font-mono text-[11px] sm:text-xs">{antar.endDateStr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
