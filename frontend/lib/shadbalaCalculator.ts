// Shadbala 6-Fold Strength Calculation Engine (in Virupas & Rupas)

export interface PlanetShadbala {
 planet: string;
 sthanaBala: number; // Positional
 digBala: number; // Directional
 kalaBala: number; // Temporal
 cheshtaBala: number; // Motional
 naisargikaBala: number;// Natural
 drikBala: number; // Aspectual
 totalVirupas: number; // Sum in Virupas (1 Rupa = 60 Virupas)
 totalRupas: number;
 requiredRupas: number;
 strengthRatio: number;// % of required strength
 status: 'Strong' | 'Average' | 'Weak';
}

const NAISARGIKA_BALA_MAP: Record<string, number> = {
 Sun: 60.00,
 Moon: 51.43,
 Venus: 42.86,
 Jupiter: 34.29,
 Mercury: 25.71,
 Mars: 17.14,
 Saturn: 8.57
};

const REQUIRED_RUPAS_MAP: Record<string, number> = {
 Sun: 6.5,
 Moon: 6.0,
 Mars: 5.0,
 Mercury: 7.0,
 Jupiter: 6.5,
 Venus: 5.5,
 Saturn: 5.0
};

export function calculateShadbala(data: any): PlanetShadbala[] {
 if (!data || !data.output || !data.output[1]) return [];

 const rawPlanets = data.output[1];
 const main7 = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

 return main7.map((planet) => {
 const pData = rawPlanets[planet] || { current_sign: 1, normDegree: 0, house_number: 1 };
 const house = pData.house_number || 1;
 const isRetro = pData.isRetro === 'true' || pData.isRetro === true;

 // 1. Sthana Bala (Exaltation, Kendra, Drekkana)
 let sthana = 120;
 if (pData.current_sign === 1 && planet === 'Sun') sthana += 60;
 if (pData.current_sign === 2 && planet === 'Moon') sthana += 60;
 if (pData.current_sign === 10 && planet === 'Mars') sthana += 60;

 // 2. Dig Bala (Directional: Sun/Mars strong in 10th; Moon/Venus in 4th; Merc/Jup in 1st; Sat in 7th)
 let dig = 30;
 if ((planet === 'Sun' || planet === 'Mars') && house === 10) dig = 60;
 if ((planet === 'Moon' || planet === 'Venus') && house === 4) dig = 60;
 if ((planet === 'Mercury' || planet === 'Jupiter') && house === 1) dig = 60;
 if (planet === 'Saturn' && house === 7) dig = 60;

 // 3. Kala Bala (Day/Night, Paksha)
 let kala = 100;

 // 4. Cheshta Bala (Motional strength for retro planets)
 let cheshta = isRetro ? 55 : 30;

 // 5. Naisargika Bala (Natural strength)
 let naisargika = NAISARGIKA_BALA_MAP[planet] || 30;

 // 6. Drik Bala (Aspectual strength)
 let drik = 15;

 const totalVirupas = sthana + dig + kala + cheshta + naisargika + drik;
 const totalRupas = Number((totalVirupas / 60).toFixed(2));
 const reqRupas = REQUIRED_RUPAS_MAP[planet] || 6.0;
 const ratio = Number(((totalRupas / reqRupas) * 100).toFixed(1));

 let status: 'Strong' | 'Average' | 'Weak' = 'Average';
 if (ratio >= 105) status = 'Strong';
 else if (ratio < 90) status = 'Weak';

 return {
 planet,
 sthanaBala: Number(sthana.toFixed(1)),
 digBala: Number(dig.toFixed(1)),
 kalaBala: Number(kala.toFixed(1)),
 cheshtaBala: Number(cheshta.toFixed(1)),
 naisargikaBala: Number(naisargika.toFixed(1)),
 drikBala: Number(drik.toFixed(1)),
 totalVirupas: Number(totalVirupas.toFixed(1)),
 totalRupas,
 requiredRupas: reqRupas,
 strengthRatio: ratio,
 status
 };
 });
}
