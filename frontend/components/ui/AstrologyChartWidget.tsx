'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Orbit, Search } from 'lucide-react';
import { GoldCard } from './GoldCard';

// Bhavas / 12 Houses Database
const HOUSES_DB = [
  { num: '1st', name: 'Lagna (Self)', desc: 'Physical appearance, health, constitution, personality traits, and overall life direction.' },
  { num: '2nd', name: 'Dhana (Wealth)', desc: 'Financial assets, family lineage, speech patterns, food habits, and early childhood.' },
  { num: '3rd', name: 'Sahaja (Courage)', desc: 'Siblings, short-distance travels, communication skills, physical willpower, and hobbies.' },
  { num: '4th', name: 'Bandhu (Happiness)', desc: 'Mother, home environment, properties, vehicles, and internal peace of mind.' },
  { num: '5th', name: 'Putra (Intellect)', desc: 'Children, educational intelligence, romance, creative expressions, and past-life merits (Purvapunya).' },
  { num: '6th', name: 'Ari (Obstacles)', desc: 'Health issues, debts, enemies, litigation, daily routine service, and work obstacles.' },
  { num: '7th', name: 'Yuvati (Partnership)', desc: 'Marriage, business partnerships, public relations, contracts, and foreign dealings.' },
  { num: '8th', name: 'Randhra (Longevity)', desc: 'Unearned wealth, transformation, research, occult sciences, inheritance, and longevity.' },
  { num: '9th', name: 'Dharma (Luck)', desc: 'Higher learning, spiritual teachers (Gurus), father, fortune, travel, and religious inclination.' },
  { num: '10th', name: 'Karma (Career)', desc: 'Profession, status, public authority, career accomplishments, and societal roles.' },
  { num: '11th', name: 'Labha (Gains)', desc: 'Financial profits, gains, network circles, elder siblings, and fulfillment of desires.' },
  { num: '12th', name: 'Vyaya (Losses)', desc: 'Subconscious mind, spiritual liberation (Moksha), losses, foreign settlement, and dreams.' }
];

// Vedic Grahas (9 Planets & Dashas)
const GRAHAS_DB = [
  { name: 'Surya (Sun)', sign: 'Soul & Status', dasha: '6 Years', desc: 'Dad, government status, career prestige, vitality, confidence, and ego. Exalted in Aries.' },
  { name: 'Chandra (Moon)', sign: 'Mind & Memory', dasha: '10 Years', desc: 'Mother, emotional well-being, mental peace, memory, and domestic comfort. Exalted in Taurus.' },
  { name: 'Mangal (Mars)', sign: 'Energy & Valor', dasha: '7 Years', desc: 'Courage, technical fields, action, younger siblings, property, and anger. Exalted in Capricorn.' },
  { name: 'Budha (Mercury)', sign: 'Logic & Commerce', dasha: '17 Years', desc: 'Logic, speech, writing, commerce, business intelligence, and education. Exalted in Virgo.' },
  { name: 'Guru (Jupiter)', sign: 'Wisdom & Wealth', dasha: '16 Years', desc: 'Husband (for women), kids, higher education, wealth, dharma, and spiritual path. Exalted in Cancer.' },
  { name: 'Shukra (Venus)', sign: 'Love & Comfort', dasha: '20 Years', desc: 'Wife (for men), vehicle acquisition, arts, luxury, relationship harmony, and fertility. Exalted in Pisces.' },
  { name: 'Shani (Saturn)', sign: 'Karma & Justice', dasha: '19 Years', desc: 'Lifespan, delay, hard work, lessons, structure, public service, and justice. Exalted in Libra.' },
  { name: 'Rahu (North Node)', sign: 'Desire & Future', dasha: '18 Years', desc: 'Foreign realms, technological obsession, worldly cravings, and sudden breakthroughs.' },
  { name: 'Ketu (South Node)', sign: 'Moksha & Past', dasha: '7 Years', desc: 'Spirituality, liberation, deep research, detachment, and past-life talents.' }
];

// Sidereal Nakshatras Database
const NAKSHATRAS_DB = [
  { name: 'Ashwini', ruler: 'Ketu', degrees: '0°00\' - 13°20\' Aries', sign: 'Aries' },
  { name: 'Bharani', ruler: 'Venus', degrees: '13°20\' - 26°40\' Aries', sign: 'Aries' },
  { name: 'Krittika', ruler: 'Sun', degrees: '26°40\' Aries - 10°00\' Taurus', sign: 'Aries/Taurus' },
  { name: 'Rohini', ruler: 'Moon', degrees: '10°00\' - 23°20\' Taurus', sign: 'Taurus' },
  { name: 'Mrigashira', ruler: 'Mars', degrees: '23°20\' Taurus - 6°40\' Gemini', sign: 'Taurus/Gemini' },
  { name: 'Ardra', ruler: 'Rahu', degrees: '6°40\' - 20°00\' Gemini', sign: 'Gemini' }
];

export function AstrologyChartWidget() {
  const [tab, setTab] = useState<'natal' | 'nakshatra' | 'grahas'>('natal');
  const [hoveredHouse, setHoveredHouse] = useState<number | null>(null);
  const [hoveredGraha, setHoveredGraha] = useState<number | null>(null);

  // Canvas refs for the interactive sky map
  const skyCanvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  // 1. Draw and handle Nakshatra Sky Map interactive canvas
  useEffect(() => {
    if (tab !== 'nakshatra') return;

    const canvas = skyCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const width = canvas.width = canvas.parentElement?.clientWidth || 320;
    const height = canvas.height = 300;

    // Faint stars
    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.4 + 0.1
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
      const starRGB = isDark ? '255, 255, 255' : '15, 23, 42';
      const goldRGB = isDark ? '204, 143, 51' : '160, 110, 34';

      // 1. Draw stars
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starRGB}, ${s.opacity})`;
        ctx.fill();
      });

      // 2. Draw Magnifier Lens at cursor
      if (mousePos.x !== -9999) {
        const lensRadius = 60;

        // Faint ring indicating the scanning field
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, lensRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${goldRGB}, 0.25)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw crosshair center point
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${goldRGB})`;
        ctx.fill();

        // Connect nearby stars inside the magnifier lens to form constellations
        ctx.strokeStyle = `rgba(${goldRGB}, 0.55)`;
        ctx.lineWidth = 0.8;
        
        const innerStars = stars.filter((s) => Math.hypot(s.x - mousePos.x, s.y - mousePos.y) < lensRadius);
        for (let i = 0; i < innerStars.length; i++) {
          for (let j = i + 1; j < innerStars.length; j++) {
            ctx.beginPath();
            ctx.moveTo(innerStars[i].x, innerStars[i].y);
            ctx.lineTo(innerStars[j].x, innerStars[j].y);
            ctx.stroke();
          }
        }

        // Draw floating coordinate data in a small tag below the lens
        const idx = Math.floor((mousePos.x / width) * NAKSHATRAS_DB.length);
        const activeNakshatra = NAKSHATRAS_DB[Math.min(idx, NAKSHATRAS_DB.length - 1)];

        if (activeNakshatra) {
          ctx.font = 'italic tracking-wide 9px Georgia, serif';
          ctx.fillStyle = `rgb(${goldRGB})`;
          ctx.textAlign = 'center';
          ctx.fillText(`${activeNakshatra.name} Naks. (${activeNakshatra.degrees})`, mousePos.x, mousePos.y + lensRadius + 15);
        }
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [tab, mousePos]);

  // Handle circular Natal Chart hover detection
  const handleNatalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    // Calculate angle in degrees (0 to 360)
    let angle = Math.atan2(relativeY - centerY, relativeX - centerX) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    // 12 houses = 30 degrees each
    const houseIndex = Math.floor(angle / 30);
    // Align index correctly (Vedic 1st house is top-center or left, let's offset it)
    const alignedIndex = (houseIndex + 9) % 12; // offset by 270 degrees
    setHoveredHouse(alignedIndex);
  };

  const handleNatalMouseLeave = () => {
    setHoveredHouse(null);
  };

  return (
    <div className="w-full space-y-6 relative z-20">
      <GoldCard theme="dark" className="border border-[var(--gold-300)] p-6 flex flex-col space-y-4 shadow-[0_4px_30px_rgba(204,143,51,0.06)] relative min-h-[460px]">
        {/* Header Console tabs */}
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
          <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-bold flex items-center gap-1.5 animate-pulse">
            <Compass className="w-3.5 h-3.5" /> Interactive Jyotish Engine
          </span>

          <div className="flex gap-1.5">
            {[
              { id: 'natal', label: 'Chart Wheel', icon: <Compass className="w-3 h-3" /> },
              { id: 'nakshatra', label: 'Nakshatras', icon: <Search className="w-3 h-3" /> },
              { id: 'grahas', label: 'Grahas Orbit', icon: <Orbit className="w-3 h-3" /> }
            ].map((t) => {
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as any)}
                  className={`px-3 py-1 rounded-lg text-[10px] uppercase font-semibold tracking-wider flex items-center gap-1 border transition-all duration-300 ${
                    isActive
                      ? 'bg-[var(--gold)] text-black border-transparent shadow-[0_0_8px_rgba(204,143,51,0.3)]'
                      : 'border-neutral-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {t.icon} {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Console Workspace Screens */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[260px]">
          <AnimatePresence mode="wait">
            {tab === 'natal' && (
              <motion.div
                key="natal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center space-y-4"
              >
                {/* 12 House Natal Wheel SVG */}
                <div
                  onMouseMove={handleNatalMouseMove}
                  onMouseLeave={handleNatalMouseLeave}
                  className="w-48 h-48 rounded-full border border-[var(--gold-200)] relative flex items-center justify-center cursor-pointer shadow-inner shadow-[var(--gold-50)]"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Concentric rings */}
                    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(204, 143, 51, 0.2)" strokeWidth="0.8" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(204, 143, 51, 0.15)" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="6" fill="none" stroke="rgba(204, 143, 51, 0.4)" strokeWidth="0.8" />

                    {/* 12 radial slices representing Bhavas */}
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const angle = idx * 30; // 30 deg each
                      const radStart = (angle * Math.PI) / 180;
                      const radEnd = ((angle + 30) * Math.PI) / 180;
                      const x1 = 50 + Math.cos(radStart) * 48;
                      const y1 = 50 + Math.sin(radStart) * 48;
                      const isHovered = hoveredHouse === idx;

                      return (
                        <g key={idx}>
                          <line x1="50" y1="50" x2={x1} y2={y1} stroke="rgba(204, 143, 51, 0.25)" strokeWidth="0.5" />
                          {/* Segment highlight shape on hover */}
                          {isHovered && (
                            <path
                              d={`M 50 50 L ${x1} ${y1} A 48 48 0 0 1 ${
                                50 + Math.cos(radEnd) * 48
                              } ${50 + Math.sin(radEnd) * 48} Z`}
                              fill="rgba(204, 143, 51, 0.15)"
                              stroke="rgba(204, 143, 51, 0.6)"
                              strokeWidth="0.8"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                  {/* Faint center crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-[8px] text-[var(--gold)] font-bold">
                    KUNDLI
                  </div>
                </div>

                <div className="text-center max-w-sm space-y-1">
                  {hoveredHouse !== null ? (
                    <>
                      <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wide">
                        {HOUSES_DB[hoveredHouse].num} House - {HOUSES_DB[hoveredHouse].name}
                      </h4>
                      <p className="text-[10px] text-gray-400 leading-normal font-light">
                        {HOUSES_DB[hoveredHouse].desc}
                      </p>
                    </>
                  ) : (
                    <p className="text-[10px] text-gray-500 italic font-light pt-2">
                      Hover over segments of the chart wheel to explore the 12 Houses of Destiny.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {tab === 'nakshatra' && (
              <motion.div
                key="nakshatra"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex flex-col items-center space-y-3"
              >
                {/* Sky map interactive canvas container */}
                <div
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }}
                  onMouseLeave={() => setMousePos({ x: -9999, y: -9999 })}
                  className="relative w-full h-[230px] bg-neutral-950/70 border border-neutral-850 rounded-2xl overflow-hidden cursor-crosshair"
                >
                  <canvas ref={skyCanvasRef} className="absolute inset-0 w-full h-full" />
                  {mousePos.x === -9999 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center text-gray-500 text-[10px] font-light space-y-1">
                      <Search className="w-5 h-5 text-neutral-800 animate-pulse" />
                      <p>Move mouse cursor across the night sky canvas to scan and discover sidereal Nakshatra templates.</p>
                    </div>
                  )}
                </div>
                <p className="text-[9px] text-gray-500 italic leading-none">
                  Vedic Sidereal chart maps positions relative to constellation degrees.
                </p>
              </motion.div>
            )}

            {tab === 'grahas' && (
              <motion.div
                key="grahas"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center space-y-4 w-full"
              >
                {/* 9 Graha Orbit Map */}
                <div className="w-48 h-48 rounded-full border border-neutral-900 relative flex items-center justify-center shadow-inner">
                  {/* Central Sun */}
                  <div className="w-4.5 h-4.5 rounded-full bg-[var(--gold)] shadow-[0_0_10px_#cc8f33] flex items-center justify-center text-[7px] text-black font-extrabold select-none z-30">
                    ☉
                  </div>

                  {/* Planet Orbits */}
                  {GRAHAS_DB.map((g, idx) => {
                    const radius = 22 + idx * 7.8; // orbit radius
                    const isHovered = hoveredGraha === idx;

                    return (
                      <div
                        key={g.name}
                        onMouseEnter={() => setHoveredGraha(idx)}
                        onMouseLeave={() => setHoveredGraha(null)}
                        className={`absolute rounded-full border border-dashed transition-all duration-300 z-10 ${
                          isHovered
                            ? 'border-[var(--gold-200)] shadow-[0_0_8px_rgba(204,143,51,0.2)] bg-white/5'
                            : 'border-neutral-900/50 hover:border-neutral-800'
                        }`}
                        style={{
                          width: radius * 2,
                          height: radius * 2,
                        }}
                      >
                        {/* Orbiting Planet Dot */}
                        <div
                          className={`w-2.5 h-2.5 rounded-full absolute top-1/2 left-0 -mt-1.25 -ml-1.25 flex items-center justify-center text-[6px] text-black font-bold z-20 ${
                            isHovered ? 'bg-white shadow-[0_0_8px_#fff]' : 'bg-[var(--gold)]'
                          }`}
                          style={{
                            transformOrigin: `${radius}px center`,
                            animation: `spin-slow ${10 + idx * 4}s linear infinite`,
                          }}
                        >
                          {g.name[0]}
                        </div>

                        {/* Energy beam linking planet to sun on hover */}
                        {isHovered && (
                          <div
                            className="absolute bg-gradient-to-r from-[var(--gold)] to-transparent h-px origin-left top-1/2 left-0 z-0 opacity-40"
                            style={{
                              width: radius,
                              transform: 'rotate(180deg)' // line pointing to center
                            }}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="text-center max-w-sm space-y-1">
                  {hoveredGraha !== null ? (
                    <>
                      <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wide flex justify-center items-center gap-1.5">
                        {GRAHAS_DB[hoveredGraha].name} · <span className="text-[var(--gold)] font-sans text-xs">{GRAHAS_DB[hoveredGraha].sign}</span>
                      </h4>
                      <p className="text-[9px] text-gray-400 leading-normal font-light">
                        {GRAHAS_DB[hoveredGraha].desc} <strong className="text-[var(--gold)]">(Dasha: {GRAHAS_DB[hoveredGraha].dasha})</strong>
                      </p>
                    </>
                  ) : (
                    <p className="text-[10px] text-gray-500 italic font-light pt-2">
                      Hover over concentric planet orbits to reveal Grahas, meanings, and Dasha period cycles.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GoldCard>
    </div>
  );
}
