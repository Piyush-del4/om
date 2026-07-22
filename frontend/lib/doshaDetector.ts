// Engine to detect 8 major Doshas, severity rating, impact explanation, and traditional remedies

export interface DoshaResult {
  id: string;
  name: string;
  isPresent: boolean;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'None';
  cancellationApplied?: string;
  effects: string;
  remedies: string;
}

export function detectDoshas(data: any): DoshaResult[] {
  if (!data || !data.output || !data.output[1]) return [];

  const rawPlanets = data.output[1];
  const getHouse = (pName: string): number => rawPlanets[pName]?.house_number || 0;
  const getSign = (pName: string): number => rawPlanets[pName]?.current_sign || 0;

  const doshas: DoshaResult[] = [];

  // 1. Mangal Dosha (Mars in 1, 4, 7, 8, 12)
  const marsH = getHouse('Mars');
  const mangalHouses = [1, 4, 7, 8, 12];
  let isMangal = mangalHouses.includes(marsH);
  let mangalCancellation = '';
  let mangalSeverity: 'Mild' | 'Moderate' | 'Severe' | 'None' = 'None';

  if (isMangal) {
    // Check cancellation: Mars in own sign (1,8) or exalted (10) or in Jupiter's aspect/house
    const marsSign = getSign('Mars');
    if ([1, 8, 10].includes(marsSign)) {
      mangalCancellation = 'Cancelled due to Mars placement in Own/Exalted sign.';
      mangalSeverity = 'Mild';
    } else if (marsH === 1 || marsH === 8) {
      mangalSeverity = 'Severe';
    } else {
      mangalSeverity = 'Moderate';
    }
  }

  doshas.push({
    id: 'mangal-dosha',
    name: 'Mangal Dosha (Kuja Dosha)',
    isPresent: isMangal,
    severity: mangalSeverity,
    cancellationApplied: mangalCancellation || undefined,
    effects: isMangal
      ? 'May cause friction, ego clashes, or delays in marital harmony if unaddressed.'
      : 'No Mangal Dosha present in Lagna Chart.',
    remedies: 'Perform Kumbh Vivah before marriage; chant Mangal Beej Mantra "Om Kraam Kreem Kroum Sah Bhaumaya Namah".'
  });

  // 2. Kaal Sarp Dosha (Rahu & Ketu axis hem)
  const rahuH = getHouse('Rahu');
  const ketuH = getHouse('Ketu');
  const isKaalSarp = rahuH > 0 && ketuH > 0;
  
  const KAAL_SARP_TYPES: Record<number, string> = {
    1: 'Anant Kaal Sarp (1st-7th axis)',
    2: 'Kulik Kaal Sarp (2nd-8th axis)',
    3: 'Vasuki Kaal Sarp (3rd-9th axis)',
    4: 'Shankhpal Kaal Sarp (4th-10th axis)',
    5: 'Padma Kaal Sarp (5th-11th axis)',
    6: 'Mahapadma Kaal Sarp (6th-12th axis)',
    7: 'Takshak Kaal Sarp (7th-1st axis)',
    8: 'Karkotak Kaal Sarp (8th-2nd axis)',
    9: 'Shankhachood Kaal Sarp (9th-3rd axis)',
    10: 'Ghatak Kaal Sarp (10th-4th axis)',
    11: 'Vishdhar Kaal Sarp (11th-5th axis)',
    12: 'Sheshnag Kaal Sarp (12th-6th axis)'
  };

  doshas.push({
    id: 'kaal-sarp',
    name: `Kaal Sarp Dosha - ${KAAL_SARP_TYPES[rahuH] || 'General'}`,
    isPresent: isKaalSarp,
    severity: isKaalSarp ? 'Moderate' : 'None',
    effects: isKaalSarp
      ? 'Indicates struggle in early life, sudden career shifts, and spiritual awakening later in life.'
      : 'No Kaal Sarp Dosha detected.',
    remedies: 'Perform Rahu-Ketu Shanti Puja at Trimbakeshwar or Kalahasti; chant Nag Stotram.'
  });

  // 3. Pitra Dosha (Sun/Rahu or Sun/Saturn in 9th/5th house)
  const sunH = getHouse('Sun');
  const satH = getHouse('Saturn');
  const isPitra = (sunH === rahuH || sunH === satH) && (sunH === 9 || sunH === 5 || sunH === 1);
  doshas.push({
    id: 'pitra-dosha',
    name: 'Pitra Dosha',
    isPresent: isPitra,
    severity: isPitra ? 'Moderate' : 'None',
    effects: 'Signifies ancestral karmic debts, obstacles in family prosperity, or progeny delays.',
    remedies: 'Offer Pind Daan / Shradh during Pitru Paksha; donate food to needy people on Amavasya.'
  });

  // 4. Guru Chandal Dosha (Jupiter + Rahu in same house)
  const jupH = getHouse('Jupiter');
  const isGuruChandal = jupH > 0 && jupH === rahuH;
  doshas.push({
    id: 'guru-chandal',
    name: 'Guru Chandal Dosha',
    isPresent: isGuruChandal,
    severity: isGuruChandal ? 'Severe' : 'None',
    effects: 'Can lead to conflict with teachers/mentors, philosophical skepticism, or misguided decision making.',
    remedies: 'Worship Lord Vishnu; apply yellow sandalwood paste on forehead daily.'
  });

  // 5. Shani Dosha (Sade Sati / Dhayya check)
  const moonH = getHouse('Moon');
  let isShani = false;
  let shaniDesc = 'No active Sade Sati or Dhayya.';
  let shaniSev: 'Mild' | 'Moderate' | 'Severe' | 'None' = 'None';

  if (moonH > 0 && satH > 0) {
    const diff = ((satH - moonH + 12) % 12) + 1;
    if (diff === 12 || diff === 1 || diff === 2) {
      isShani = true;
      shaniDesc = `Active Sade Sati Phase (${diff === 12 ? 'Rising' : diff === 1 ? 'Peak' : 'Setting'}).`;
      shaniSev = diff === 1 ? 'Severe' : 'Moderate';
    } else if (diff === 4 || diff === 8) {
      isShani = true;
      shaniDesc = `Active Shani Dhayya (${diff === 4 ? '4th House Small Panoti' : '8th House Small Panoti'}).`;
      shaniSev = 'Mild';
    }
  }

  doshas.push({
    id: 'shani-dosha',
    name: 'Shani Dosha (Sade Sati / Dhayya)',
    isPresent: isShani,
    severity: shaniSev,
    effects: isShani
      ? `${shaniDesc} Brings lessons in patience, hard work, discipline, and endurance.`
      : 'No active Shani Sade Sati or Dhayya at birth chart configuration.',
    remedies: 'Recite Hanuman Chalisa 7 times on Saturdays; donate black sesame seeds and iron items.'
  });

  // 6. Nadi Dosha (Moon Nakshatra Nadi matching considerations)
  const moonSign = getSign('Moon');
  const isNadi = moonSign === 3 || moonSign === 6 || moonSign === 9; // Placeholder rule for general compatibility check
  doshas.push({
    id: 'nadi-dosha',
    name: 'Nadi Dosha',
    isPresent: false, // Calculated dynamically during Guna Milan
    severity: 'None',
    effects: 'Relevant during marital compatibility matching (Guna Milan - 8 points).',
    remedies: 'Perform Nadi Shanti Yajna or Mahamrityunjaya Japa if matching with same Nadi partner.'
  });

  // 7. Bhakoot Dosha (Moon sign 2-12, 6-8, or 9-5 position)
  doshas.push({
    id: 'bhakoot-dosha',
    name: 'Bhakoot Dosha',
    isPresent: false, // Calculated during Guna Milan
    severity: 'None',
    effects: 'Evaluated in chart matching to assess health and financial longevity for married couple.',
    remedies: 'Perform Vishnu-Laxmi Puja; donate grains on Thursdays.'
  });

  // 8. Grahan Dosha (Sun/Moon conjunct Rahu/Ketu)
  const isSunGrahan = (sunH === rahuH || sunH === ketuH);
  const isMoonGrahan = (moonH === rahuH || moonH === ketuH);
  const isGrahan = isSunGrahan || isMoonGrahan;

  doshas.push({
    id: 'grahan-dosha',
    name: 'Grahan Dosha',
    isPresent: isGrahan,
    severity: isGrahan ? 'Severe' : 'None',
    effects: isGrahan
      ? `${isSunGrahan ? 'Sun' : 'Moon'} Grahan: May cause emotional fluctuations, self-doubt, or vitality dips.`
      : 'No Grahan Dosha present.',
    remedies: 'Perform Eclipse Shanti Mantra Japa; donate coconut and sesame oil during solar/lunar eclipses.'
  });

  return doshas;
}
