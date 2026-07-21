import React, { useState } from 'react';
import { Sparkles, Clock, Calendar } from 'lucide-react';

interface VimshottariDashaProps {
  data: any;
  birthDateStr: string; // YYYY-MM-DD
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

export function VimshottariDashaTable({ data, birthDateStr }: VimshottariDashaProps) {
  const [activeTab, setActiveTab] = useState<'mahadasha' | 'antardasha' | 'pratyantardasha'>('mahadasha');

  if (!data || !data.output) return null;

  const planetsObj = data.output[1] || {};
  const moonObj = planetsObj["Moon"] || {};
  const moonFullDegree = moonObj.fullDegree ?? 0;

  // Nakshatra & Starting Lord Calculation
  const nakshatraIndex = Math.floor(moonFullDegree / 13.333333333333334);
  const lordIndex = nakshatraIndex % 9;
  
  const degInNak = moonFullDegree % 13.333333333333334;
  const elapsedFraction = degInNak / 13.333333333333334;

  const firstDashaTotalYears = DASHA_LORDS[lordIndex].years;
  const passedYearsAtBirth = elapsedFraction * firstDashaTotalYears;

  // Parse birth date
  const birthDateParts = birthDateStr ? birthDateStr.split('-') : ['1990', '01', '01'];
  const birthYear = parseInt(birthDateParts[0]) || 1990;
  const birthMonth = (parseInt(birthDateParts[1]) || 1) - 1;
  const birthDay = parseInt(birthDateParts[2]) || 1;

  const birthDateObj = new Date(birthYear, birthMonth, birthDay);
  const now = new Date();

  // Helper to add exact calendar time
  const addCalendarTime = (baseDate: Date, totalYears: number) => {
    const fullYears = Math.floor(totalYears);
    const floatMonths = (totalYears - fullYears) * 12;
    const fullMonths = Math.floor(floatMonths);
    const floatDays = Math.round((floatMonths - fullMonths) * 30.4375);

    const result = new Date(baseDate);
    result.setFullYear(result.getFullYear() + fullYears);
    result.setMonth(result.getMonth() + fullMonths);
    result.setDate(result.getDate() + floatDays);
    return result;
  };

  const formatDate = (d: Date) => {
    const day = d.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const firstMahaStartDate = addCalendarTime(birthDateObj, -passedYearsAtBirth);
  let currentMahaDate = new Date(firstMahaStartDate);

  // Build full 3-level timeline
  const mahaTimeline = Array.from({ length: 9 }).map((_, mIdx) => {
    const mahaLordIdx = (lordIndex + mIdx) % 9;
    const mahaLord = DASHA_LORDS[mahaLordIdx];
    const mahaDurationYears = mahaLord.years;

    const mahaStartDate = new Date(currentMahaDate);
    const mahaEndDate = addCalendarTime(mahaStartDate, mahaDurationYears);
    currentMahaDate = new Date(mahaEndDate);

    const isMahaActive = now >= mahaStartDate && now <= mahaEndDate;

    // Antardashas
    let currentAntarDate = new Date(mahaStartDate);
    const antardashas = Array.from({ length: 9 }).map((_, aIdx) => {
      const antarLordIdx = (mahaLordIdx + aIdx) % 9;
      const antarLord = DASHA_LORDS[antarLordIdx];
      const antarDurationYears = (mahaDurationYears * antarLord.years) / 120;

      const antarStartDate = new Date(currentAntarDate);
      const antarEndDate = addCalendarTime(antarStartDate, antarDurationYears);
      currentAntarDate = new Date(antarEndDate);

      const isAntarActive = now >= antarStartDate && now <= antarEndDate;

      // Pratyantardashas
      let currentPratDate = new Date(antarStartDate);
      const pratyantardashas = Array.from({ length: 9 }).map((_, pIdx) => {
        const pratLordIdx = (antarLordIdx + pIdx) % 9;
        const pratLord = DASHA_LORDS[pratLordIdx];
        const pratDurationYears = (antarDurationYears * pratLord.years) / 120;

        const pratStartDate = new Date(currentPratDate);
        const pratEndDate = addCalendarTime(pratStartDate, pratDurationYears);
        currentPratDate = new Date(pratEndDate);

        const isPratActive = now >= pratStartDate && now <= pratEndDate;

        return {
          lord: pratLord,
          startDate: pratStartDate,
          endDate: pratEndDate,
          isActive: isPratActive
        };
      });

      return {
        lord: antarLord,
        startDate: antarStartDate,
        endDate: antarEndDate,
        isActive: isAntarActive,
        pratyantardashas
      };
    });

    return {
      lord: mahaLord,
      startDate: mahaStartDate,
      endDate: mahaEndDate,
      isActive: isMahaActive,
      antardashas
    };
  });

  const activeMaha = mahaTimeline.find(m => m.isActive) || mahaTimeline[0];
  const activeAntar = activeMaha.antardashas.find(a => a.isActive) || activeMaha.antardashas[0];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 space-y-4">
      {/* Title Header */}
      <div className="text-center space-y-1">
        <h4 className="text-xl md:text-2xl font-serif font-bold text-amber-950 dark:text-amber-200 flex items-center justify-center gap-2">
          ✦ Vimshottari Dasha Timeline ✦
        </h4>
        {activeMaha && activeAntar && (
          <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
            Active Period: <strong>{activeMaha.lord.vedic} &gt; {activeAntar.lord.vedic}</strong> (until {formatDate(activeAntar.endDate)})
          </p>
        )}
      </div>

      {/* Tab Selectors */}
      <div className="flex justify-center gap-2 print:hidden">
        <button
          onClick={() => setActiveTab('mahadasha')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'mahadasha'
              ? 'bg-[var(--gold)] text-black shadow-md'
              : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
          }`}
        >
          Mahadasha
        </button>
        <button
          onClick={() => setActiveTab('antardasha')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'antardasha'
              ? 'bg-[var(--gold)] text-black shadow-md'
              : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
          }`}
        >
          Antardasha ({activeMaha.lord.vedic})
        </button>
        <button
          onClick={() => setActiveTab('pratyantardasha')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'pratyantardasha'
              ? 'bg-[var(--gold)] text-black shadow-md'
              : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
          }`}
        >
          Pratyantardasha ({activeMaha.lord.vedic} &gt; {activeAntar.lord.vedic})
        </button>
      </div>

      {/* Mahadasha Table (Exact Image Match) */}
      {(activeTab === 'mahadasha' || true) && (
        <div className={`border-2 border-amber-600 rounded-xl overflow-hidden shadow-lg bg-[#fef3c7] dark:bg-neutral-900 ${activeTab !== 'mahadasha' ? 'hidden print:block mb-6' : ''}`}>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#f59e0b] text-amber-950 font-bold text-sm md:text-base border-b-2 border-amber-600">
                <th className="p-3 border-r border-amber-600 font-serif">Mahadasha</th>
                <th className="p-3 border-r border-amber-600 font-serif">Start</th>
                <th className="p-3 font-serif">End</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-600/40 text-sm md:text-base font-semibold text-neutral-900 dark:text-amber-100">
              {mahaTimeline.map((maha, idx) => (
                <tr key={idx} className={`${maha.isActive ? 'bg-amber-300/80 font-bold text-amber-950' : 'hover:bg-amber-200/50'}`}>
                  <td className="p-2.5 border-r border-amber-600/40 font-serif">
                    {maha.lord.vedic} {maha.isActive && <span className="text-[10px] bg-amber-900 text-white px-1.5 py-0.5 rounded ml-1 font-sans">Active</span>}
                  </td>
                  <td className="p-2.5 border-r border-amber-600/40 font-mono">{formatDate(maha.startDate)}</td>
                  <td className="p-2.5 font-mono">{formatDate(maha.endDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Antardasha Table */}
      {(activeTab === 'antardasha' || true) && (
        <div className={`border-2 border-amber-600 rounded-xl overflow-hidden shadow-lg bg-[#fef3c7] dark:bg-neutral-900 ${activeTab !== 'antardasha' ? 'hidden print:block mb-6' : ''}`}>
          <div className="bg-amber-700 text-white p-2 text-center text-xs font-bold uppercase tracking-wider">
            Antardasha under {activeMaha.lord.vedic} Mahadasha
          </div>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#f59e0b] text-amber-950 font-bold text-sm md:text-base border-b-2 border-amber-600">
                <th className="p-3 border-r border-amber-600 font-serif">Antardasha</th>
                <th className="p-3 border-r border-amber-600 font-serif">Start</th>
                <th className="p-3 font-serif">End</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-600/40 text-sm md:text-base font-semibold text-neutral-900 dark:text-amber-100">
              {activeMaha.antardashas.map((antar, idx) => (
                <tr key={idx} className={`${antar.isActive ? 'bg-amber-300/80 font-bold text-amber-950' : 'hover:bg-amber-200/50'}`}>
                  <td className="p-2.5 border-r border-amber-600/40 font-serif">
                    {activeMaha.lord.vedic} &gt; {antar.lord.vedic}
                  </td>
                  <td className="p-2.5 border-r border-amber-600/40 font-mono">{formatDate(antar.startDate)}</td>
                  <td className="p-2.5 font-mono">{formatDate(antar.endDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pratyantardasha Table */}
      {(activeTab === 'pratyantardasha' || true) && (
        <div className={`border-2 border-amber-600 rounded-xl overflow-hidden shadow-lg bg-[#fef3c7] dark:bg-neutral-900 ${activeTab !== 'pratyantardasha' ? 'hidden print:block' : ''}`}>
          <div className="bg-amber-700 text-white p-2 text-center text-xs font-bold uppercase tracking-wider">
            Pratyantardasha under {activeMaha.lord.vedic} &gt; {activeAntar.lord.vedic}
          </div>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#f59e0b] text-amber-950 font-bold text-sm md:text-base border-b-2 border-amber-600">
                <th className="p-3 border-r border-amber-600 font-serif">Pratyantardasha</th>
                <th className="p-3 border-r border-amber-600 font-serif">Start</th>
                <th className="p-3 font-serif">End</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-600/40 text-sm md:text-base font-semibold text-neutral-900 dark:text-amber-100">
              {activeAntar.pratyantardashas.map((prat, idx) => (
                <tr key={idx} className={`${prat.isActive ? 'bg-amber-300/80 font-bold text-amber-950' : 'hover:bg-amber-200/50'}`}>
                  <td className="p-2.5 border-r border-amber-600/40 font-serif">
                    {activeMaha.lord.vedic} &gt; {activeAntar.lord.vedic} &gt; {prat.lord.vedic}
                  </td>
                  <td className="p-2.5 border-r border-amber-600/40 font-mono">{formatDate(prat.startDate)}</td>
                  <td className="p-2.5 font-mono">{formatDate(prat.endDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
