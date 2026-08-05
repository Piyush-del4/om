export type VargaType = 
 | 'lagna' 
 | 'chandra' 
 | 'hora' 
 | 'drekkana' 
 | 'chaturthamsha' 
 | 'saptamsa' 
 | 'navamsa' 
 | 'dasamsa' 
 | 'dwadasamsa' 
 | 'shodashamsa' 
 | 'vimshamsha' 
 | 'chaturvimshamsha' 
 | 'saptavimshamsha' 
 | 'trimshamsha' 
 | 'khavedamsha' 
 | 'akshavedamsha' 
 | 'shastiamsa' 
 | 'chalit';

export interface VargaChartData {
 chartTitle: string;
 vargaType: VargaType;
 output: any[];
}

export const VARGA_TITLE_MAP: Record<VargaType, string> = {
 lagna: 'D-1 Lagna Chart',
 chandra: 'Chandra Kundali (Moon Chart)',
 hora: 'D-2 Hora (Wealth)',
 drekkana: 'D-3 Drekkana (Siblings & Courage)',
 chaturthamsha: 'D-4 Chaturthamsha (Property & Fortune)',
 saptamsa: 'D-7 Saptamsha (Children & Progeny)',
 navamsa: 'D-9 Navamsa (Spouse & Destiny)',
 dasamsa: 'D-10 Dashamsa (Career & Profession)',
 dwadasamsa: 'D-12 Dwadashamsa (Parents & Lineage)',
 shodashamsa: 'D-16 Shodashamsa (Vehicles & Pleasures)',
 vimshamsha: 'D-20 Vimshamsha (Spiritual Progress)',
 chaturvimshamsha: 'D-24 Chaturvimshamsha (Education & Learning)',
 saptavimshamsha: 'D-27 Saptavimshamsha (Strengths & Weaknesses)',
 trimshamsha: 'D-30 Trimshamsha (Misfortunes & Evils)',
 khavedamsha: 'D-40 Khavedamsha (Auspicious Effects)',
 akshavedamsha: 'D-45 Akshavedamsha (General Well-being)',
 shastiamsa: 'D-60 Shastiamsa (Past Life Karma)',
 chalit: 'Bhava Chalit Chart'
};

/**
 * Calculates Divisional Chart (Varga) planetary positions and house assignments
 * for all 15 Parashari Vargas + Chandra + Bhava Chalit.
 */
export function calculateVargaChart(data: any, vargaType: VargaType): VargaChartData {
 if (!data || !data.output || !data.output[1]) {
 return { chartTitle: getVargaTitle(vargaType), vargaType, output: [{}, {}] };
 }

 if (vargaType === 'lagna') {
 return { chartTitle: 'Lagna Chart (D-1)', vargaType, output: data.output };
 }

 const rawPlanets = data.output[1];
 const ascendantObj = rawPlanets["Ascendant"] || (data.output[0] && data.output[0]["0"]) || { current_sign: 1, normDegree: 0 };
 const ascSign = ascendantObj.current_sign || 1;
 const ascNormDeg = ascendantObj.normDegree ?? 0;

 const transformedPlanets: Record<string, any> = {};

 const computeDivisionSign = (sign: number, deg: number, vType: VargaType): number => {
 const norm = (deg % 30 + 30) % 30;

 switch (vType) {
 case 'hora': { // D-2 (15° divisions)
 const isOdd = sign % 2 !== 0;
 const firstHalf = norm < 15;
 if (isOdd) return firstHalf ? 5 : 4; // Sun (Leo=5) or Moon (Cancer=4)
 return firstHalf ? 4 : 5;
 }
 case 'drekkana': { // D-3 (10° divisions)
 const part = Math.floor(norm / 10);
 return ((sign - 1 + part * 4) % 12) + 1;
 }
 case 'chaturthamsha': { // D-4 (7.5° divisions)
 const part = Math.floor(norm / 7.5);
 return ((sign - 1 + part * 3) % 12) + 1;
 }
 case 'saptamsa': { // D-7 (4.2857° divisions)
 const part = Math.floor(norm / (30 / 7));
 const isOdd = sign % 2 !== 0;
 const startSign = isOdd ? sign : ((sign + 6 - 1) % 12) + 1;
 return ((startSign - 1 + part) % 12) + 1;
 }
 case 'navamsa': { // D-9 (3.3333° divisions)
 const part = Math.floor(norm / (30 / 9));
 const elem = (sign - 1) % 4;
 const startSign = elem === 0 ? 1 : elem === 1 ? 10 : elem === 2 ? 7 : 4;
 return ((startSign - 1 + part) % 12) + 1;
 }
 case 'dasamsa': { // D-10 (3.0° divisions)
 const part = Math.floor(norm / 3.0);
 const isOdd = sign % 2 !== 0;
 const startSign = isOdd ? sign : ((sign + 8 - 1) % 12) + 1;
 return ((startSign - 1 + part) % 12) + 1;
 }
 case 'dwadasamsa': { // D-12 (2.5° divisions)
 const part = Math.floor(norm / 2.5);
 return ((sign - 1 + part) % 12) + 1;
 }
 case 'shodashamsa': { // D-16 (1.875° divisions)
 const part = Math.floor(norm / 1.875);
 const elem = (sign - 1) % 4;
 const startSign = elem === 0 ? 1 : elem === 1 ? 5 : elem === 2 ? 9 : 1;
 return ((startSign - 1 + part) % 12) + 1;
 }
 case 'vimshamsha': { // D-20 (1.5° divisions)
 const part = Math.floor(norm / 1.5);
 const elem = (sign - 1) % 4;
 const startSign = elem === 0 ? 1 : elem === 1 ? 9 : elem === 2 ? 5 : 1;
 return ((startSign - 1 + part) % 12) + 1;
 }
 case 'chaturvimshamsha': { // D-24 (1.25° divisions)
 const part = Math.floor(norm / 1.25);
 const isOdd = sign % 2 !== 0;
 const startSign = isOdd ? 5 : 4; // Leo or Cancer
 return ((startSign - 1 + part) % 12) + 1;
 }
 case 'saptavimshamsha': { // D-27 (1.1111° divisions)
 const part = Math.floor(norm / (30 / 27));
 const elem = (sign - 1) % 4;
 const startSign = elem === 0 ? 1 : elem === 1 ? 4 : elem === 2 ? 7 : 10;
 return ((startSign - 1 + part) % 12) + 1;
 }
 case 'trimshamsha': { // D-30 (Odd: 5,5,8,5,7°; Even: 5,7,8,5,5°)
 const isOdd = sign % 2 !== 0;
 if (isOdd) {
 if (norm < 5) return 1; // Mars (Aries)
 if (norm < 10) return 11; // Saturn (Aquarius)
 if (norm < 18) return 9; // Jupiter (Sagittarius)
 if (norm < 23) return 3; // Mercury (Gemini)
 return 7; // Venus (Libra)
 } else {
 if (norm < 5) return 2; // Venus (Taurus)
 if (norm < 12) return 6; // Mercury (Virgo)
 if (norm < 20) return 12; // Jupiter (Pisces)
 if (norm < 25) return 10; // Saturn (Capricorn)
 return 8; // Mars (Scorpio)
 }
 }
 case 'khavedamsha': { // D-40 (0.75° divisions)
 const part = Math.floor(norm / 0.75);
 const isOdd = sign % 2 !== 0;
 const startSign = isOdd ? 1 : 7;
 return ((startSign - 1 + part) % 12) + 1;
 }
 case 'akshavedamsha': { // D-45 (0.6666° divisions)
 const part = Math.floor(norm / (30 / 45));
 const elem = (sign - 1) % 4;
 const startSign = elem === 0 ? 1 : elem === 1 ? 5 : elem === 2 ? 9 : 1;
 return ((startSign - 1 + part) % 12) + 1;
 }
 case 'shastiamsa': { // D-60 (0.5° divisions)
 const part = Math.floor(norm / 0.5);
 return ((sign - 1 + part) % 12) + 1;
 }
 default:
 return sign;
 }
 };

 if (vargaType === 'chandra') {
 const moonObj = rawPlanets["Moon"] || { current_sign: 1 };
 const moonSign = moonObj.current_sign || 1;

 Object.entries(rawPlanets).forEach(([pName, pData]: [string, any]) => {
 if (pName === 'ayanamsa' || pName === 'debug') return;
 const pSign = pData.current_sign || 1;
 const houseNum = ((pSign - moonSign + 12) % 12) + 1;
 transformedPlanets[pName] = { ...pData, house_number: houseNum };
 });

 transformedPlanets["Ascendant"] = { ...ascendantObj, current_sign: moonSign, house_number: 1 };

 return {
 chartTitle: VARGA_TITLE_MAP.chandra,
 vargaType,
 output: [data.output[0] || {}, transformedPlanets]
 };
 }

 if (vargaType === 'chalit') {
 const ascFullDeg = (ascSign - 1) * 30 + ascNormDeg;

 Object.entries(rawPlanets).forEach(([pName, pData]: [string, any]) => {
 if (pName === 'ayanamsa' || pName === 'debug') return;
 const pSign = pData.current_sign || 1;
 const pDeg = pData.normDegree ?? 0;
 const pFullDeg = (pSign - 1) * 30 + pDeg;

 let diff = pFullDeg - ascFullDeg;
 if (diff < 0) diff += 360;

 const shifted = (diff + 15) % 360;
 const houseNum = Math.floor(shifted / 30) + 1;
 const chalitSign = ((ascSign - 1 + (houseNum - 1)) % 12) + 1;

 transformedPlanets[pName] = {
 ...pData,
 current_sign: chalitSign,
 house_number: houseNum
 };
 });

 transformedPlanets["Ascendant"] = { ...ascendantObj, current_sign: ascSign, house_number: 1 };

 return {
 chartTitle: VARGA_TITLE_MAP.chalit,
 vargaType,
 output: [data.output[0] || {}, transformedPlanets]
 };
 }

 // Calculate divisional lagna sign
 const vargaLagnaSign = computeDivisionSign(ascSign, ascNormDeg, vargaType);

 Object.entries(rawPlanets).forEach(([pName, pData]: [string, any]) => {
 if (pName === 'ayanamsa' || pName === 'debug') return;
 const pSign = pData.current_sign || 1;
 const pDeg = pData.normDegree ?? 0;
 const vSign = computeDivisionSign(pSign, pDeg, vargaType);
 const houseNum = ((vSign - vargaLagnaSign + 12) % 12) + 1;

 transformedPlanets[pName] = {
 ...pData,
 current_sign: vSign,
 house_number: houseNum
 };
 });

 transformedPlanets["Ascendant"] = {
 ...ascendantObj,
 current_sign: vargaLagnaSign,
 house_number: 1
 };

 return {
 chartTitle: VARGA_TITLE_MAP[vargaType] || 'Varga Chart',
 vargaType,
 output: [data.output[0] || {}, transformedPlanets]
 };
}

export function getVargaTitle(vargaType: VargaType): string {
 return VARGA_TITLE_MAP[vargaType] || 'Astrological Chart';
}
