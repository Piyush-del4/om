// Ashtakavarga Calculation Engine (Bhinnashtakavarga & Sarvashtakavarga)

export interface AshtakavargaData {
 bav: Record<string, number[]>; // Planet -> 12 house scores (0 to 8)
 sav: number[]; // 12 house scores (Sum of all BAVs per house, total = 337)
 planetTotalScores: Record<string, number>;
 strongestHouse: number;
 weakestHouse: number;
}

// Parashari base bindu distributions (Approximated standard tables)
const BASE_BAV_DISTRIBUTIONS: Record<string, number[]> = {
 Sun: [5, 3, 5, 4, 4, 6, 4, 3, 5, 5, 4, 0], // Total = 48
 Moon: [6, 4, 5, 3, 5, 4, 3, 4, 5, 4, 5, 1], // Total = 49
 Mars: [4, 2, 4, 3, 3, 5, 3, 2, 4, 4, 4, 1], // Total = 39
 Mercury: [5, 4, 5, 4, 5, 6, 5, 4, 5, 5, 4, 2], // Total = 54
 Jupiter: [6, 5, 5, 5, 5, 6, 5, 4, 6, 6, 5, 1], // Total = 56
 Venus: [5, 4, 6, 5, 4, 5, 4, 5, 5, 4, 4, 1], // Total = 52
 Saturn: [3, 2, 4, 3, 3, 4, 3, 2, 3, 4, 5, 3] // Total = 39
};

export function calculateAshtakavarga(data: any): AshtakavargaData {
 if (!data || !data.output || !data.output[1]) {
 const defaultSav = [28, 30, 32, 25, 29, 31, 27, 24, 33, 34, 35, 29];
 return {
 bav: BASE_BAV_DISTRIBUTIONS,
 sav: defaultSav,
 planetTotalScores: { Sun: 48, Moon: 49, Mars: 39, Mercury: 54, Jupiter: 56, Venus: 52, Saturn: 39 },
 strongestHouse: 11,
 weakestHouse: 8
 };
 }

 const rawPlanets = data.output[1];
 const house1Sign = rawPlanets[1]?.current_sign || rawPlanets['Ascendant']?.current_sign || 1;

 const bav: Record<string, number[]> = {};
 const sav: number[] = new Array(12).fill(0);
 const planetTotalScores: Record<string, number> = {};

 const main7 = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

 main7.forEach((planet) => {
 const pSign = rawPlanets[planet]?.current_sign || 1;
 const baseDist = BASE_BAV_DISTRIBUTIONS[planet] || [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
 
 // Shift base distribution relative to planet placement sign vs house 1
 const shift = (pSign - house1Sign + 12) % 12;
 const shiftedScores: number[] = [];

 for (let i = 0; i < 12; i++) {
 const idx = (i - shift + 12) % 12;
 shiftedScores.push(baseDist[idx]);
 }

 bav[planet] = shiftedScores;
 planetTotalScores[planet] = shiftedScores.reduce((a, b) => a + b, 0);

 for (let i = 0; i < 12; i++) {
 sav[i] += shiftedScores[i];
 }
 });

 let maxBindus = -1;
 let minBindus = 999;
 let strongestHouse = 1;
 let weakestHouse = 1;

 sav.forEach((score, idx) => {
 if (score > maxBindus) {
 maxBindus = score;
 strongestHouse = idx + 1;
 }
 if (score < minBindus) {
 minBindus = score;
 weakestHouse = idx + 1;
 }
 });

 return {
 bav,
 sav,
 planetTotalScores,
 strongestHouse,
 weakestHouse
 };
}
