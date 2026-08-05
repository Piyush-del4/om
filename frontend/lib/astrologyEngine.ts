// Astrological Engine for Planetary Details, Lagna, Moon, Sun, Panchang, and Dignities

export interface PlanetPosition {
 name: string;
 current_sign: number; // 1 to 12
 normDegree: number; // 0° to 29.99°
 fullDegree?: number; // 0° to 359.99°
 house_number: number; // 1 to 12
 isRetro?: boolean | string;
 speed?: number;
}

export interface PlanetaryDetails {
 name: string;
 zodiacSign: string;
 signNumber: number;
 house: number;
 degree: string;
 normDegree: number;
 nakshatra: string;
 nakshatraNumber: number;
 pada: number;
 isMoolTrikona: boolean;
 isOwnSign: boolean;
 isExalted: boolean;
 isDebilitated: boolean;
 relationSign: 'Own' | 'Friend' | 'Enemy' | 'Neutral' | 'Exalted' | 'Debilitated';
 isCombust: boolean;
 isRetro: boolean;
 isVargottama: boolean;
 jaiminiKaraka?: string;
}

export const ZODIAC_SIGNS = [
 'Aries', 'Taurus', 'Gemini', 'Cancer', 
 'Leo', 'Virgo', 'Libra', 'Scorpio', 
 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const ZODIAC_LORDS: Record<number, string> = {
 1: 'Mars',
 2: 'Venus',
 3: 'Mercury',
 4: 'Moon',
 5: 'Sun',
 6: 'Mercury',
 7: 'Venus',
 8: 'Mars',
 9: 'Jupiter',
 10: 'Saturn',
 11: 'Saturn',
 12: 'Jupiter'
};

export const NAKSHATRA_NAMES = [
 'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshta',
 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const NAKSHATRA_LORDS = [
 'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu',
 'Jupiter', 'Saturn', 'Mercury', 'Ketu', 'Venus', 'Sun',
 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
 'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu',
 'Jupiter', 'Saturn', 'Mercury'
];

// Planet friendship table (Natural Relationships)
export const PLANET_FRIENDS: Record<string, { friends: string[]; enemies: string[]; neutrals: string[] }> = {
 Sun: { friends: ['Moon', 'Mars', 'Jupiter'], enemies: ['Venus', 'Saturn', 'Rahu', 'Ketu'], neutrals: ['Mercury'] },
 Moon: { friends: ['Sun', 'Mercury'], enemies: ['Rahu', 'Ketu'], neutrals: ['Mars', 'Jupiter', 'Venus', 'Saturn'] },
 Mars: { friends: ['Sun', 'Moon', 'Jupiter'], enemies: ['Mercury', 'Rahu', 'Ketu'], neutrals: ['Venus', 'Saturn'] },
 Mercury: { friends: ['Sun', 'Venus'], enemies: ['Moon'], neutrals: ['Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'] },
 Jupiter: { friends: ['Sun', 'Moon', 'Mars'], enemies: ['Mercury', 'Venus'], neutrals: ['Saturn', 'Rahu', 'Ketu'] },
 Venus: { friends: ['Mercury', 'Saturn', 'Rahu', 'Ketu'], enemies: ['Sun', 'Moon'], neutrals: ['Mars', 'Jupiter'] },
 Saturn: { friends: ['Mercury', 'Venus', 'Rahu', 'Ketu'], enemies: ['Sun', 'Moon', 'Mars'], neutrals: ['Jupiter'] },
 Rahu: { friends: ['Venus', 'Saturn', 'Mercury'], enemies: ['Sun', 'Moon', 'Mars'], neutrals: ['Jupiter'] },
 Ketu: { friends: ['Mars', 'Venus', 'Saturn'], enemies: ['Sun', 'Moon'], neutrals: ['Mercury', 'Jupiter'] }
};

// Exaltation & Debilitation Signs
export const EXALTATION_MAP: Record<string, { exaltSign: number; debilSign: number; exaltDeg: number }> = {
 Sun: { exaltSign: 1, debilSign: 7, exaltDeg: 10 },
 Moon: { exaltSign: 2, debilSign: 8, exaltDeg: 3 },
 Mars: { exaltSign: 10, debilSign: 4, exaltDeg: 28 },
 Mercury: { exaltSign: 6, debilSign: 12, exaltDeg: 15 },
 Jupiter: { exaltSign: 4, debilSign: 10, exaltDeg: 5 },
 Venus: { exaltSign: 12, debilSign: 6, exaltDeg: 27 },
 Saturn: { exaltSign: 7, debilSign: 1, exaltDeg: 20 },
 Rahu: { exaltSign: 2, debilSign: 8, exaltDeg: 15 }, // Taurus exalt, Scorpio debil
 Ketu: { exaltSign: 8, debilSign: 2, exaltDeg: 15 } // Scorpio exalt, Taurus debil
};

// Mooltrikona Ranges: { sign: number, startDeg: number, endDeg: number }
export const MOOLTRIKONA_MAP: Record<string, { sign: number; startDeg: number; endDeg: number }> = {
 Sun: { sign: 5, startDeg: 0, endDeg: 20 },
 Moon: { sign: 2, startDeg: 3, endDeg: 30 },
 Mars: { sign: 1, startDeg: 0, endDeg: 12 },
 Mercury: { sign: 6, startDeg: 15, endDeg: 20 },
 Jupiter: { sign: 9, startDeg: 0, endDeg: 10 },
 Venus: { sign: 7, startDeg: 0, endDeg: 15 },
 Saturn: { sign: 11, startDeg: 0, endDeg: 20 }
};

// Combustion limit degrees relative to Sun
export const COMBUSTION_ORB: Record<string, number> = {
 Moon: 12,
 Mars: 17,
 Mercury: 14,
 Jupiter: 11,
 Venus: 10,
 Saturn: 15
};

/**
 * Calculate Nakshatra (1-27) and Pada (1-4) from full degree (0-360)
 */
export function getNakshatraAndPada(fullDegree: number): { name: string; number: number; pada: number; lord: string } {
 const normalized = (fullDegree % 360 + 360) % 360;
 const nakshatraArc = 360 / 27; // 13.3333°
 const nakIndex = Math.floor(normalized / nakshatraArc);
 const nakDegree = normalized % nakshatraArc;
 const padaArc = nakshatraArc / 4; // 3.3333°
 const pada = Math.floor(nakDegree / padaArc) + 1;

 return {
 name: NAKSHATRA_NAMES[nakIndex] || 'Ashwini',
 number: nakIndex + 1,
 pada,
 lord: NAKSHATRA_LORDS[nakIndex] || 'Ketu'
 };
}

/**
 * D-9 Navamsha Sign Calculator
 */
export function getNavamshaSign(sign: number, normDegree: number): number {
 const navIdx = Math.floor((normDegree % 30) / 3.3333333333333335);
 const elem = (sign - 1) % 4;
 const startSign = elem === 0 ? 1 : elem === 1 ? 10 : elem === 2 ? 7 : 4;
 return ((startSign - 1 + navIdx) % 12) + 1;
}

/**
 * Process Raw Planet Data into complete Planetary Details
 */
export function getDetailedPlanets(rawPlanets: Record<string, any>): PlanetaryDetails[] {
 const planetList = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
 const sunData = rawPlanets['Sun'];
 const sunFullDeg = sunData ? (sunData.current_sign - 1) * 30 + (sunData.normDegree || 0) : 0;

 // Jaimini 7 Charakaraka calculation for classical 7 planets
 const classical7 = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
 const KARAKA_CODES = [
 'AK (Atmakaraka)',
 'AmK (Amatyakaraka)',
 'BK (Bhratrukaraka)',
 'MK (Matrukaraka)',
 'PK (Putrakaraka)',
 'GK (Gnatikaraka)',
 'DK (Darakaraka)'
 ];

 const sorted7 = [...classical7].map(name => {
 const pData = rawPlanets[name] || { normDegree: 0 };
 return { name, normDegree: pData.normDegree ?? 0 };
 }).sort((a, b) => b.normDegree - a.normDegree);

 const jaiminiMap: Record<string, string> = {};
 sorted7.forEach((item, index) => {
 jaiminiMap[item.name] = KARAKA_CODES[index] || '-';
 });

 return planetList.map((pName) => {
 const pData = rawPlanets[pName] || { current_sign: 1, normDegree: 0, house_number: 1 };
 const sign = pData.current_sign || 1;
 const normDeg = pData.normDegree ?? 0;
 const fullDeg = pData.fullDegree ?? ((sign - 1) * 30 + normDeg);
 const house = pData.house_number || 1;

 // Nakshatra & Pada
 const nakInfo = getNakshatraAndPada(fullDeg);

 // Navamsha & Vargottama
 const navSign = getNavamshaSign(sign, normDeg);
 const isVargottama = navSign === sign;

 // Sign Lord & Friendship
 const signLord = ZODIAC_LORDS[sign] || 'Mars';
 const isOwnSign = signLord === pName;
 
 const exaltInfo = EXALTATION_MAP[pName];
 const isExalted = exaltInfo ? exaltInfo.exaltSign === sign : false;
 const isDebilitated = exaltInfo ? exaltInfo.debilSign === sign : false;

 const moolInfo = MOOLTRIKONA_MAP[pName];
 const isMoolTrikona = moolInfo ? (moolInfo.sign === sign && normDeg >= moolInfo.startDeg && normDeg <= moolInfo.endDeg) : false;

 let relationSign: 'Own' | 'Friend' | 'Enemy' | 'Neutral' | 'Exalted' | 'Debilitated' = 'Neutral';
 if (isExalted) relationSign = 'Exalted';
 else if (isDebilitated) relationSign = 'Debilitated';
 else if (isOwnSign) relationSign = 'Own';
 else {
 const pFriends = PLANET_FRIENDS[pName];
 if (pFriends) {
 if (pFriends.friends.includes(signLord)) relationSign = 'Friend';
 else if (pFriends.enemies.includes(signLord)) relationSign = 'Enemy';
 else relationSign = 'Neutral';
 }
 }

 // Combustion check
 let isCombust = false;
 if (pName !== 'Sun' && pName !== 'Rahu' && pName !== 'Ketu') {
 const orb = COMBUSTION_ORB[pName] || 12;
 let diff = Math.abs(fullDeg - sunFullDeg);
 if (diff > 180) diff = 360 - diff;
 if (diff <= orb) isCombust = true;
 }

 const isRetro = pData.isRetro === 'true' || pData.isRetro === true;

 return {
 name: pName,
 zodiacSign: ZODIAC_SIGNS[sign - 1],
 signNumber: sign,
 house,
 degree: `${Math.floor(normDeg)}° ${Math.floor((normDeg % 1) * 60)}'`,
 normDegree: normDeg,
 nakshatra: nakInfo.name,
 nakshatraNumber: nakInfo.number,
 pada: nakInfo.pada,
 isMoolTrikona,
 isOwnSign,
 isExalted,
 isDebilitated,
 relationSign,
 isCombust,
 isRetro,
 isVargottama,
 jaiminiKaraka: jaiminiMap[pName]
 };
 });
}

/**
 * Calculate Birth Panchang details
 */
export function calculatePanchang(data: any): { tithi: string; vara: string; nakshatra: string; yoga: string; karana: string } {
 if (!data || !data.output || !data.output[1]) {
 return { tithi: 'Shukla Pratipada', vara: 'Sunday', nakshatra: 'Ashwini', yoga: 'Vishkumbha', karana: 'Bava' };
 }

 const rawPlanets = data.output[1];
 const sun = rawPlanets['Sun'] || { current_sign: 1, normDegree: 0 };
 const moon = rawPlanets['Moon'] || { current_sign: 1, normDegree: 0 };

 const sunFullDeg = (sun.current_sign - 1) * 30 + (sun.normDegree || 0);
 const moonFullDeg = (moon.current_sign - 1) * 30 + (moon.normDegree || 0);

 // Tithi: (Moon - Sun) / 12
 let tithiDiff = moonFullDeg - sunFullDeg;
 if (tithiDiff < 0) tithiDiff += 360;
 const tithiIndex = Math.floor(tithiDiff / 12); // 0 to 29
 const isShukla = tithiIndex < 15;
 const tithiNum = (tithiIndex % 15) + 1;

 const TITHI_NAMES = [
 'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
 ];

 const tithiStr = `${isShukla ? 'Shukla' : 'Krishna'} ${TITHI_NAMES[tithiNum - 1] || 'Pratipada'}`;

 // Nakshatra of Moon
 const nakInfo = getNakshatraAndPada(moonFullDeg);

 // Yoga: (Sun + Moon) / 13.3333°
 const YOGA_NAMES = [
 'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda',
 'Sukarma', 'Dhriti', 'Shool', 'Gand', 'Vriddhi', 'Dhruva',
 'Vyaghat', 'Harshan', 'Vajra', 'Siddhi', 'Vyatipat', 'Variyan',
 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla',
 'Brahma', 'Indra', 'Vaidhriti'
 ];
 const yogaIndex = Math.floor(((sunFullDeg + moonFullDeg) % 360) / (360 / 27));
 const yogaStr = YOGA_NAMES[yogaIndex] || 'Vishkumbha';

 // Karana: Tithi / 2 (half of tithi arc = 6°)
 const KARANA_NAMES = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Garaja', 'Vanija', 'Vishti (Bhadra)'];
 const karanaIndex = Math.floor(tithiDiff / 6) % 7;
 const karanaStr = KARANA_NAMES[karanaIndex] || 'Bava';

 // Vara (Weekday based on Sun sign or index if available)
 const VARA_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const varaStr = VARA_NAMES[0];

 return {
 tithi: tithiStr,
 vara: varaStr,
 nakshatra: nakInfo.name,
 yoga: yogaStr,
 karana: karanaStr
 };
}
