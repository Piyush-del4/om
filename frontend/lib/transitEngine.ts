// Planetary Transits (Gochar) & Sade Sati Status Engine

export interface TransitPlanet {
  planet: string;
  currentSign: string;
  currentSignNum: number;
  houseFromMoon: number;
  houseFromLagna: number;
  isBeneficTransit: boolean;
  effectSummary: string;
}

export interface TransitOverview {
  currentTransits: TransitPlanet[];
  saturnSadeSati: {
    status: string;
    phase: string;
    description: string;
    remedy: string;
  };
  jupiterTransit: {
    currentSign: string;
    houseFromMoon: number;
    description: string;
  };
  rahuKetuTransit: {
    rahuSign: string;
    ketuSign: string;
    axisFromMoon: string;
    description: string;
  };
}

export function calculateTransits(data: any): TransitOverview {
  const ZODIAC_NAMES = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const moonSignNum = data?.output?.[1]?.['Moon']?.current_sign || 1;
  const lagnaSignNum = data?.output?.[1]?.['Ascendant']?.current_sign || 1;

  // Approximate current 2026 transits for demonstration
  const CURRENT_TRANSITS_2026: Record<string, number> = {
    Sun: 4,      // Cancer
    Moon: 7,     // Libra
    Mars: 3,     // Gemini
    Mercury: 4,  // Cancer
    Jupiter: 4,  // Cancer (Exalted)
    Venus: 5,    // Leo
    Saturn: 12,  // Pisces
    Rahu: 11,    // Aquarius
    Ketu: 5      // Leo
  };

  const transitList: TransitPlanet[] = Object.entries(CURRENT_TRANSITS_2026).map(([planet, tSignNum]) => {
    const houseFromMoon = ((tSignNum - moonSignNum + 12) % 12) + 1;
    const houseFromLagna = ((tSignNum - lagnaSignNum + 12) % 12) + 1;

    // Standard favorable Gochar houses from Moon:
    // Sun (3,6,10,11), Moon (1,3,6,7,10,11), Mars (3,6,11), Merc (2,4,6,8,10,11), Jup (2,5,7,9,11), Ven (1,2,3,4,5,8,9,11,12), Sat (3,6,11)
    const favorableMap: Record<string, number[]> = {
      Sun: [3, 6, 10, 11],
      Moon: [1, 3, 6, 7, 10, 11],
      Mars: [3, 6, 11],
      Mercury: [2, 4, 6, 8, 10, 11],
      Jupiter: [2, 5, 7, 9, 11],
      Venus: [1, 2, 3, 4, 5, 8, 9, 11, 12],
      Saturn: [3, 6, 11],
      Rahu: [3, 6, 11],
      Ketu: [3, 6, 11]
    };

    const isBeneficTransit = (favorableMap[planet] || [3, 6, 11]).includes(houseFromMoon);

    return {
      planet,
      currentSign: ZODIAC_NAMES[tSignNum - 1],
      currentSignNum: tSignNum,
      houseFromMoon,
      houseFromLagna,
      isBeneficTransit,
      effectSummary: `${planet} transiting House ${houseFromMoon} from Moon (${ZODIAC_NAMES[tSignNum - 1]}) brings ${isBeneficTransit ? 'favorable alignment and positive outcomes' : 'a period of learning and discipline'}.`
    };
  });

  const saturnHouseFromMoon = ((12 - moonSignNum + 12) % 12) + 1;
  let sadeSatiStatus = 'No Active Sade Sati';
  let sadeSatiPhase = 'None';

  if (saturnHouseFromMoon === 12) {
    sadeSatiStatus = 'Active Sade Sati';
    sadeSatiPhase = '1st Phase (Rising - 12th House)';
  } else if (saturnHouseFromMoon === 1) {
    sadeSatiStatus = 'Active Sade Sati';
    sadeSatiPhase = '2nd Phase (Peak - 1st House)';
  } else if (saturnHouseFromMoon === 2) {
    sadeSatiStatus = 'Active Sade Sati';
    sadeSatiPhase = '3rd Phase (Setting - 2nd House)';
  }

  const jupHouseFromMoon = ((4 - moonSignNum + 12) % 12) + 1;

  return {
    currentTransits: transitList,
    saturnSadeSati: {
      status: sadeSatiStatus,
      phase: sadeSatiPhase,
      description: sadeSatiStatus.includes('Active')
        ? `Saturn is currently in ${sadeSatiPhase}. Focus on patience, hard work, and spiritual discipline.`
        : 'Saturn transit is currently outside the Sade Sati 12-1-2 house orb from your Moon Sign.',
      remedy: 'Light mustard oil lamp at Peepal tree on Saturdays; chant Hanuman Chalisa.'
    },
    jupiterTransit: {
      currentSign: 'Cancer (Exalted)',
      houseFromMoon: jupHouseFromMoon,
      description: `Jupiter in Cancer transits House ${jupHouseFromMoon} from your Moon sign, bringing divine wisdom and growth.`
    },
    rahuKetuTransit: {
      rahuSign: 'Aquarius',
      ketuSign: 'Leo',
      axisFromMoon: `${((11 - moonSignNum + 12) % 12) + 1} / ${((5 - moonSignNum + 12) % 12) + 1} Axis`,
      description: 'Rahu in Aquarius and Ketu in Leo stimulate innovation, financial aspirations, and spiritual detachment.'
    }
  };
}
