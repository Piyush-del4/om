import React from 'react';

interface PlanetData {
  name: string;
  current_sign: number;
  house_number?: number;
  isRetro?: string;
}

interface NorthIndianChartProps {
  data: any;
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
}

const RASHI_NAMES: Record<number, string> = {
  1: 'Mesh',
  2: 'Vrishabha',
  3: 'Mithun',
  4: 'Kark',
  5: 'Simha',
  6: 'Kanya',
  7: 'Tula',
  8: 'Vrischika',
  9: 'Dhanu',
  10: 'Makar',
  11: 'Kumbha',
  12: 'Meena'
};

const EXALTED_SIGNS: Record<string, number | number[]> = {
  Sun: 1,       // Aries
  Moon: 2,      // Taurus
  Mars: 10,     // Capricorn
  Mercury: 6,   // Virgo
  Jupiter: 4,   // Cancer
  Venus: 12,    // Pisces
  Saturn: 7,    // Libra
  Rahu: [2, 3], // Taurus / Gemini
  Ketu: [8, 9]  // Scorpio / Sagittarius
};

const DEBILITATED_SIGNS: Record<string, number | number[]> = {
  Sun: 7,       // Libra
  Moon: 8,      // Scorpio
  Mars: 4,      // Cancer
  Mercury: 12,  // Pisces
  Jupiter: 10,  // Capricorn
  Venus: 6,     // Virgo
  Saturn: 1,    // Aries
  Rahu: [8, 9], // Scorpio / Sagittarius
  Ketu: [2, 3]  // Taurus / Gemini
};

export function NorthIndianChart({ data, title, subtitle, showLegend = true }: NorthIndianChartProps) {
  if (!data || !data.output) return null;

  const planetsObj = data.output[1] || {};
  
  // Try to get Ascendant sign from planetsObj first, then fallback to output[0]["0"], then default to 1 (Aries)
  const ascendantSign = planetsObj["Ascendant"]?.current_sign 
    || (data.output[0] && data.output[0]["0"]?.current_sign) 
    || 1;

  // Map houses 1-12 to their corresponding signs and planets
  const houses = Array.from({ length: 12 }).map((_, i) => {
    const houseNumber = i + 1;
    let signNumber = ascendantSign + i;
    if (signNumber > 12) signNumber -= 12;

    const allowedPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
    const sunDeg = planetsObj["Sun"]?.fullDegree;

    const occupants = Object.entries(planetsObj)
      .filter(([name, planetData]: [string, any]) => 
        allowedPlanets.includes(name) && planetData.house_number === houseNumber
      )
      .map(([name, planetData]: [string, any]) => {
        const deg = Math.floor(planetData.normDegree ?? planetData.fullDegree ?? 0);
        const degStr = deg < 10 ? `0${deg}` : `${deg}`;
        
        // 1. Retrograde (*)
        let symbols = '';
        if (planetData.isRetro === 'true') {
          symbols += '*';
        }

        // 2. Combust (^)
        let isComb = planetData.isCombust === 'true' || planetData.is_combust === 'true';
        if (!isComb && sunDeg !== undefined && name !== 'Sun' && planetData.fullDegree !== undefined) {
          let dist = Math.abs(planetData.fullDegree - sunDeg) % 360;
          if (dist > 180) dist = 360 - dist;
          const isRetro = planetData.isRetro === 'true';
          const limits: Record<string, number> = {
            Moon: 12, Mars: 17, Mercury: isRetro ? 12 : 14,
            Jupiter: 11, Venus: isRetro ? 8 : 10, Saturn: 15
          };
          if (limits[name] && dist <= limits[name]) isComb = true;
        }
        if (isComb) symbols += '^';

        const sign = planetData.current_sign;

        // 3. Exalted (↑)
        const ex = EXALTED_SIGNS[name];
        if (ex && (Array.isArray(ex) ? ex.includes(sign) : ex === sign)) {
          symbols += '↑';
        }

        // 4. Debilitated (↓)
        const deb = DEBILITATED_SIGNS[name];
        if (deb && (Array.isArray(deb) ? deb.includes(sign) : deb === sign)) {
          symbols += '↓';
        }

        // 5. Vargottama (☐)
        const normDeg = planetData.normDegree ?? 0;
        const navIndex = Math.floor(normDeg / 3.3333333333333335);
        const element = (sign - 1) % 4;
        const startSign = element === 0 ? 1 : element === 1 ? 10 : element === 2 ? 7 : 4;
        const d9Sign = ((startSign - 1 + navIndex) % 12) + 1;
        if (d9Sign === sign) {
          symbols += '☐';
        }

        return {
          name,
          degree: degStr,
          symbols
        };
      });

    return { houseNumber, signNumber, occupants };
  });

  // Enlarge SVG canvas to 600x600 to fit full planet and rashi names cleanly
  const size = 600;
  const center = size / 2;

  // Standard Vedic Positions for 600x600 canvas
  // Geometrically calculated centroids so sign and planets stay perfectly inside house boundaries
  const housePositions = [
    // 1 (Top Center Diamond) - sign lower body, planets upper body
    { sign: [300, 245], planets: [300, 110] },
    // 2 (Top Left Triangle) - sign near bottom point, planets upper wide area
    { sign: [150, 110], planets: [150, 48] },
    // 3 (Upper Left Corner Triangle) - sign right inner area, planets left wide area
    { sign: [110, 150], planets: [52, 150] },
    // 4 (Left Center Diamond) - sign right inner area, planets center body
    { sign: [245, 300], planets: [125, 300] },
    // 5 (Lower Left Corner Triangle) - sign right inner area, planets left wide area
    { sign: [110, 450], planets: [52, 450] },
    // 6 (Bottom Left Triangle) - sign upper point, planets lower wide area
    { sign: [150, 490], planets: [150, 545] },
    // 7 (Bottom Center Diamond) - sign upper body, planets lower body
    { sign: [300, 355], planets: [300, 485] },
    // 8 (Bottom Right Triangle) - sign upper point, planets lower wide area
    { sign: [450, 490], planets: [450, 545] },
    // 9 (Lower Right Corner Triangle) - sign left inner area, planets right wide area
    { sign: [490, 450], planets: [548, 450] },
    // 10 (Right Center Diamond) - sign left inner area, planets center body
    { sign: [355, 300], planets: [475, 300] },
    // 11 (Upper Right Corner Triangle) - sign left inner area, planets right wide area
    { sign: [490, 150], planets: [548, 150] },
    // 12 (Top Right Triangle) - sign near bottom point, planets upper wide area
    { sign: [450, 110], planets: [450, 48] },
  ];

  const getVedicName = (name: string) => {
    const mapping: Record<string, string> = {
      Sun: 'Sur',
      Moon: 'Cha',
      Mars: 'Man',
      Mercury: 'Bud',
      Jupiter: 'Gur',
      Venus: 'Shu',
      Saturn: 'Sha',
      Rahu: 'Rah',
      Ketu: 'Ket'
    };
    return mapping[name] || name;
  };

  const getColor = (name: string) => {
    const mapping: Record<string, string> = {
      Sun: '#d97706', // Orange
      Moon: '#2563eb', // Blue
      Mars: '#dc2626', // Red
      Mercury: '#16a34a', // Green
      Jupiter: '#c53030', // Crimson/Purple
      Venus: '#059669', // Emerald
      Saturn: '#475569', // Slate
      Rahu: '#000000', // Black
      Ketu: '#000000', // Black
    };
    return mapping[name] || '#1a202c';
  };

  return (
    <div className="w-full max-w-full mx-auto bg-transparent relative p-0">
      {(title || subtitle) && (
        <div className="text-center pb-2 mb-2 border-b border-[var(--gold-200)] space-y-0.5">
          {subtitle && (
            <p className="text-[11px] md:text-xs font-semibold text-amber-800 italic">
              {subtitle}
            </p>
          )}
          {title && (
            <h4 className="font-sans font-bold text-base md:text-lg text-amber-950">
              ✦ {title} ✦
            </h4>
          )}
        </div>
      )}
      <div className="w-full relative aspect-square flex items-center justify-center p-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto aspect-square drop-shadow-sm">
        {/* Outer Box */}
        <rect x="0" y="0" width={size} height={size} fill="transparent" stroke="#cc8f33" strokeWidth="2.5" />
        
        {/* Diagonals */}
        <line x1="0" y1="0" x2={size} y2={size} stroke="#cc8f33" strokeWidth="2" />
        <line x1={size} y1="0" x2="0" y2={size} stroke="#cc8f33" strokeWidth="2" />
        
        {/* Inner Diamond */}
        <polygon points={`${center},0 0,${center} ${center},${size} ${size},${center}`} fill="none" stroke="#cc8f33" strokeWidth="2" />

        {/* Content for each house */}
        {houses.map((house, idx) => {
          const pos = housePositions[idx];
          const rashiName = RASHI_NAMES[house.signNumber];

          // Vertically center stacked planets around pos.planets[1]
          const totalOccupants = house.occupants.length;
          const startY = totalOccupants > 1 
            ? pos.planets[1] - ((totalOccupants - 1) * 25) / 2 
            : pos.planets[1];

          return (
            <g key={house.houseNumber}>
              {/* Stacked Rashi Number + Rashi Name to prevent line overflow */}
              <text 
                x={pos.sign[0]} 
                y={pos.sign[1]} 
                textAnchor="middle" 
                alignmentBaseline="middle"
                className="fill-amber-900 font-bold font-sans"
              >
                <tspan x={pos.sign[0]} dy="-7" fontSize="16" fontWeight="bold">
                  {house.signNumber}
                </tspan>
                <tspan x={pos.sign[0]} dy="16" fill="#92400e" fontWeight="bold" fontSize="11">
                  {rashiName}
                </tspan>
              </text>
              
              {/* Ascendant Marker in House 1 */}
              {house.houseNumber === 1 && (
                <text 
                  x="300" 
                  y="180" 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  className="fill-sky-600 font-bold text-base font-sans"
                >
                  <tspan fontSize="11" className="fill-sky-600 font-semibold font-sans">
                    {Math.floor(planetsObj["Ascendant"]?.normDegree ?? 0)}°{" "}
                  </tspan>
                  Asc (Lagna)
                </text>
              )}

              {/* Planets centered in the open space of the house */}
              <text 
                x={pos.planets[0]} 
                y={startY} 
                textAnchor="middle" 
                alignmentBaseline="middle"
                className="font-bold tracking-wide font-sans"
              >
                {house.occupants.map((p, i) => (
                  <tspan 
                    key={p.name} 
                    x={pos.planets[0]} 
                    dy={i === 0 ? 0 : 25}
                    fill={getColor(p.name)}
                  >
                    <tspan fontSize="16" fontWeight="semibold" opacity="0.9">
                      {p.degree}°{" "}
                    </tspan>
                    <tspan fontSize="18" fontWeight="bold">
                      {getVedicName(p.name)}
                    </tspan>
                    <tspan fill="#d97706" fontWeight="extrabold" fontSize="17">
                      {p.symbols}
                    </tspan>
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
      </div>

      {/* Symbol Legend */}
      {showLegend && (
        <div className="mt-3 pt-3 border-t border-[var(--gold-200)] flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-neutral-600 font-medium">
          <span><strong className="text-amber-700">*</strong> Retrograde</span>
          <span><strong className="text-amber-700">^</strong> Combust</span>
          <span><strong className="text-amber-700">↑</strong> Exalted</span>
          <span><strong className="text-amber-700">↓</strong> Debilitated</span>
          <span><strong className="text-amber-700">☐</strong> Vargottama</span>
        </div>
      )}
    </div>
  );
}
