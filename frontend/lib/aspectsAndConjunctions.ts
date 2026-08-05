// Planetary Aspects & Conjunctions Analysis Engine

export interface AspectDetail {
 aspectingPlanet: string;
 targetPlanetOrHouse: string;
 targetHouseNumber: number;
 aspectType: 'Full (7th)' | 'Special (Mars 4th/8th)' | 'Special (Jupiter 5th/9th)' | 'Special (Saturn 3rd/10th)' | 'Partial';
 nature: 'Benefic' | 'Malefic' | 'Neutral';
 description: string;
}

export interface ConjunctionDetail {
 houseNumber: number;
 zodiacSign: string;
 planets: string[];
 orbDegrees: number;
 nature: 'Benefic' | 'Malefic' | 'Mixed';
 effects: string;
 positivePoints: string[];
 negativePoints: string[];
}

export function analyzeAspectsAndConjunctions(data: any): { aspects: AspectDetail[]; conjunctions: ConjunctionDetail[] } {
 if (!data || !data.output || !data.output[1]) return { aspects: [], conjunctions: [] };

 const rawPlanets = data.output[1];
 const main9 = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
 
 const houseMap: Record<number, string[]> = {};
 for (let i = 1; i <= 12; i++) houseMap[i] = [];

 const planetHouse: Record<string, number> = {};
 const planetSign: Record<string, string> = {};
 const planetDeg: Record<string, number> = {};

 const ZODIAC_NAMES = [
 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
 ];

 main9.forEach((p) => {
 const pData = rawPlanets[p];
 if (pData) {
 const h = pData.house_number || 1;
 const s = pData.current_sign || 1;
 const deg = pData.normDegree || 0;
 houseMap[h].push(p);
 planetHouse[p] = h;
 planetSign[p] = ZODIAC_NAMES[s - 1] || 'Aries';
 planetDeg[p] = deg;
 }
 });

 // 1. Calculate Aspects
 const aspects: AspectDetail[] = [];
 const BENEFIC_PLANETS = ['Jupiter', 'Venus', 'Moon', 'Mercury'];

 main9.forEach((p) => {
 const srcH = planetHouse[p];
 if (!srcH) return;

 const isBenefic = BENEFIC_PLANETS.includes(p);
 const nature = isBenefic ? 'Benefic' : (p === 'Mercury' ? 'Neutral' : 'Malefic');

 // Standard 7th aspect for all planets
 const target7 = ((srcH + 6 - 1) % 12) + 1;
 const planetsIn7 = houseMap[target7] || [];
 aspects.push({
 aspectingPlanet: p,
 targetPlanetOrHouse: planetsIn7.length > 0 ? planetsIn7.join(', ') : `House ${target7}`,
 targetHouseNumber: target7,
 aspectType: 'Full (7th)',
 nature,
 description: `${p} casts full 7th aspect on House ${target7}${planetsIn7.length > 0 ? ` influencing ${planetsIn7.join(', ')}` : ''}.`
 });

 // Special aspects
 if (p === 'Mars') {
 [4, 8].forEach((offset) => {
 const target = ((srcH + offset - 1) % 12) + 1;
 const occupied = houseMap[target] || [];
 aspects.push({
 aspectingPlanet: 'Mars',
 targetPlanetOrHouse: occupied.length > 0 ? occupied.join(', ') : `House ${target}`,
 targetHouseNumber: target,
 aspectType: 'Special (Mars 4th/8th)',
 nature: 'Malefic',
 description: `Mars casts special ${offset}th aspect on House ${target}, driving energetic focus and potential friction.`
 });
 });
 }

 if (p === 'Jupiter') {
 [5, 9].forEach((offset) => {
 const target = ((srcH + offset - 1) % 12) + 1;
 const occupied = houseMap[target] || [];
 aspects.push({
 aspectingPlanet: 'Jupiter',
 targetPlanetOrHouse: occupied.length > 0 ? occupied.join(', ') : `House ${target}`,
 targetHouseNumber: target,
 aspectType: 'Special (Jupiter 5th/9th)',
 nature: 'Benefic',
 description: `Jupiter casts divine ${offset}th aspect on House ${target}, bestowing expansion, wisdom, and protection.`
 });
 });
 }

 if (p === 'Saturn') {
 [3, 10].forEach((offset) => {
 const target = ((srcH + offset - 1) % 12) + 1;
 const occupied = houseMap[target] || [];
 aspects.push({
 aspectingPlanet: 'Saturn',
 targetPlanetOrHouse: occupied.length > 0 ? occupied.join(', ') : `House ${target}`,
 targetHouseNumber: target,
 aspectType: 'Special (Saturn 3rd/10th)',
 nature: 'Malefic',
 description: `Saturn casts disciplined ${offset}th aspect on House ${target}, teaching patience and duty.`
 });
 });
 }
 });

 // 2. Calculate Conjunctions
 const conjunctions: ConjunctionDetail[] = [];

 Object.entries(houseMap).forEach(([hStr, planets]) => {
 const h = parseInt(hStr);
 if (planets.length >= 2) {
 const signName = planetSign[planets[0]] || 'Aries';
 let minDeg = 360, maxDeg = -360;
 planets.forEach((p) => {
 const deg = planetDeg[p] || 0;
 if (deg < minDeg) minDeg = deg;
 if (deg > maxDeg) maxDeg = deg;
 });
 const orb = Number((maxDeg - minDeg).toFixed(2));

 const hasMalefic = planets.some((p) => !BENEFIC_PLANETS.includes(p));
 const hasBenefic = planets.some((p) => BENEFIC_PLANETS.includes(p));

 let nature: 'Benefic' | 'Malefic' | 'Mixed' = 'Mixed';
 if (!hasMalefic) nature = 'Benefic';
 if (!hasBenefic) nature = 'Malefic';

 conjunctions.push({
 houseNumber: h,
 zodiacSign: signName,
 planets,
 orbDegrees: orb,
 nature,
 effects: `Conjunction of ${planets.join(' + ')} in House ${h} (${signName}) with an orb of ${orb}°.`,
 positivePoints: [
 'Enhances focused energy combination in specific life area.',
 'Creates unique synthesis of planetary archetypes.'
 ],
 negativePoints: [
 orb < 5 ? 'Close orb conjunction creates intense planetary war (Graha Yuddha).' : 'Requires balancing contrasting planetary drives.'
 ]
 });
 }
 });

 return { aspects, conjunctions };
}
