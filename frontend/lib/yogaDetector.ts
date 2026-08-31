// Rules engine to detect 14+ major Astrological Yogas

export interface YogaResult {
 id: string;
 name: string;
 isPresent: boolean;
 strength: 'High' | 'Medium' | 'Low' | 'None';
 category: 'Auspicious' | 'Inauspicious' | 'Mixed';
 effects: string;
 remedies: string;
}

export function detectYogas(data: any): YogaResult[] {
 if (!data || !data.output || !data.output[1]) return [];

 const rawPlanets = data.output[1];

 // Helper getters
 const getHouse = (pName: string): number => rawPlanets[pName]?.house_number || 0;
 const getSign = (pName: string): number => rawPlanets[pName]?.current_sign || 0;

 const yogas: YogaResult[] = [];

 // 1. Gaj Kesari Yoga (Jupiter in Kendra 1,4,7,10 from Moon)
 const moonHouse = getHouse('Moon');
 const jupHouse = getHouse('Jupiter');
 let gajKesari = false;
 if (moonHouse > 0 && jupHouse > 0) {
 const diff = ((jupHouse - moonHouse + 12) % 12) + 1;
 gajKesari = [1, 4, 7, 10].includes(diff);
 }
 yogas.push({
 id: 'gaj-kesari',
 name: 'Gaj Kesari Yoga',
 isPresent: gajKesari,
 strength: gajKesari ? (getHouse('Jupiter') === 1 || getHouse('Jupiter') === 10 ? 'High' : 'Medium') : 'None',
 category: 'Auspicious',
 effects: 'Grants high intelligence, wisdom, royal status, prosperity, fame, and protection from adversity.',
 remedies: 'Offer yellow flowers to Lord Vishnu on Thursdays; chant "Om Gram Greem Graum Sah Gurave Namah".'
 });

 // 2. Budhaditya Yoga (Sun + Mercury in same house)
 const sunHouse = getHouse('Sun');
 const mercHouse = getHouse('Mercury');
 const budhaditya = sunHouse > 0 && sunHouse === mercHouse;
 yogas.push({
 id: 'budhaditya',
 name: 'Budhaditya Yoga',
 isPresent: budhaditya,
 strength: budhaditya ? ([1, 4, 5, 9, 10].includes(sunHouse) ? 'High' : 'Medium') : 'None',
 category: 'Auspicious',
 effects: 'Enhances sharp intellect, analytical skill, administrative leadership, and public reputation.',
 remedies: 'Water Sun daily at sunrise; recite Aditya Hrudayam Stotram.'
 });

 // 3. Chandra Mangal Yoga (Moon + Mars in same house)
 const marsHouse = getHouse('Mars');
 const chandraMangal = moonHouse > 0 && moonHouse === marsHouse;
 yogas.push({
 id: 'chandra-mangal',
 name: 'Chandra Mangal Yoga',
 isPresent: chandraMangal,
 strength: chandraMangal ? 'High' : 'None',
 category: 'Auspicious',
 effects: 'Generates great financial acumen, energetic enterprise, wealth accumulation through courageous endeavors.',
 remedies: 'Donate red lentils (Masoor Dal) on Tuesdays; honor mother and matriarchal figures.'
 });

 // 4. Panch Mahapurush Yogas (Ruchaka, Bhadra, Hamsa, Malavya, Sasa)
 const kendraHouses = [1, 4, 7, 10];
 
 // Ruchaka (Mars in own 1,8 or exalt 10 in Kendra)
 const ruchaka = kendraHouses.includes(marsHouse) && [1, 8, 10].includes(getSign('Mars'));
 yogas.push({
 id: 'ruchaka',
 name: 'Ruchaka Yoga (Panch Mahapurush)',
 isPresent: ruchaka,
 strength: ruchaka ? 'High' : 'None',
 category: 'Auspicious',
 effects: 'Bestows heroic courage, physical strength, military/police command, land ownership, and invincible authority.',
 remedies: 'Recite Hanuman Chalisa daily.'
 });

 // Bhadra (Mercury in own 3,6 or exalt 6 in Kendra)
 const bhadra = kendraHouses.includes(mercHouse) && [3, 6].includes(getSign('Mercury'));
 yogas.push({
 id: 'bhadra',
 name: 'Bhadra Yoga (Panch Mahapurush)',
 isPresent: bhadra,
 strength: bhadra ? 'High' : 'None',
 category: 'Auspicious',
 effects: 'Confers scholarly brilliance, mastery of communication, business mastery, long life, and quick wit.',
 remedies: 'Worship Goddess Saraswati and feed green fodder to cows.'
 });

 // Hamsa (Jupiter in own 9,12 or exalt 4 in Kendra)
 const hamsa = kendraHouses.includes(jupHouse) && [4, 9, 12].includes(getSign('Jupiter'));
 yogas.push({
 id: 'hamsa',
 name: 'Hamsa Yoga (Panch Mahapurush)',
 isPresent: hamsa,
 strength: hamsa ? 'High' : 'None',
 category: 'Auspicious',
 effects: 'Imparts spiritual purity, divine wisdom, revered advisory status, righteous character, and peaceful mind.',
 remedies: 'Respect spiritual teachers and gurus.'
 });

 // Malavya (Venus in own 2,7 or exalt 12 in Kendra)
 const venHouse = getHouse('Venus');
 const malavya = kendraHouses.includes(venHouse) && [2, 7, 12].includes(getSign('Venus'));
 yogas.push({
 id: 'malavya',
 name: 'Malavya Yoga (Panch Mahapurush)',
 isPresent: malavya,
 strength: malavya ? 'High' : 'None',
 category: 'Auspicious',
 effects: 'Brings refined aesthetic sense, luxury, romantic fulfillment, artistic fame, and marital happiness.',
 remedies: 'Chant Sri Suktam or Mahalaxmi Stotram.'
 });

 // Sasa (Saturn in own 10,11 or exalt 7 in Kendra)
 const satHouse = getHouse('Saturn');
 const sasa = kendraHouses.includes(satHouse) && [7, 10, 11].includes(getSign('Saturn'));
 yogas.push({
 id: 'sasa',
 name: 'Sasa Yoga (Panch Mahapurush)',
 isPresent: sasa,
 strength: sasa ? 'High' : 'None',
 category: 'Auspicious',
 effects: 'Grants enduring political power, administrative supremacy, mass follower support, discipline, and perseverance.',
 remedies: 'Light a mustard oil lamp under a Peepal tree on Saturdays.'
 });

 // 5. Lakshmi Yoga (Venus + 9th Lord alignment)
 const lakshmi = [1, 5, 9].includes(venHouse) && [2, 7, 12].includes(getSign('Venus'));
 yogas.push({
 id: 'lakshmi',
 name: 'Lakshmi Yoga',
 isPresent: lakshmi,
 strength: lakshmi ? 'High' : 'None',
 category: 'Auspicious',
 effects: 'Blesses the native with immense wealth, royal comforts, graceful personality, and financial stability.',
 remedies: 'Worship Goddess Lakshmi on Fridays with lotus flowers.'
 });

 // 6. Saraswati Yoga (Jupiter, Venus, Mercury in Kendra/Trikona)
 const auspiciousHouses = [1, 4, 5, 7, 9, 10];
 const saraswati = auspiciousHouses.includes(jupHouse) && auspiciousHouses.includes(venHouse) && auspiciousHouses.includes(mercHouse);
 yogas.push({
 id: 'saraswati',
 name: 'Saraswati Yoga',
 isPresent: saraswati,
 strength: saraswati ? 'High' : 'None',
 category: 'Auspicious',
 effects: 'Blesses with poetic genius, mastery over multiple arts/sciences, wisdom, worldwide fame, and divine eloquence.',
 remedies: 'Sponsor education for underprivileged children.'
 });

 // 7. Raj Yoga & Dharma Karmadhipati Yoga (Conjunction or Mutual aspect of 9th & 10th lords)
 const rajYoga = (sunHouse === 1 || sunHouse === 10) && (jupHouse === 1 || jupHouse === 9 || jupHouse === 10);
 yogas.push({
 id: 'raj-yoga',
 name: 'Raj Yoga / Dharma Karmadhipati Yoga',
 isPresent: rajYoga,
 strength: rajYoga ? 'High' : 'None',
 category: 'Auspicious',
 effects: 'Bestows executive authority, career heights, government honors, high socio-economic standing.',
 remedies: 'Maintain high ethical standards in profession and perform selfless service.'
 });

 // 8. Vipreet Raj Yoga (6th, 8th, 12th lords in 6, 8, 12)
 const trikHouses = [6, 8, 12];
 const vipreet = trikHouses.includes(getHouse('Mars')) && trikHouses.includes(getHouse('Saturn'));
 yogas.push({
 id: 'vipreet-raj-yoga',
 name: 'Vipreet Raj Yoga (Harsha/Sarala/Vimala)',
 isPresent: vipreet,
 strength: vipreet ? 'Medium' : 'None',
 category: 'Auspicious',
 effects: 'Turns sudden crises into immense breakthroughs, victory over enemies, resilience against adversity.',
 remedies: 'Chant Lord Shiva Mahamrityunjaya Mantra.'
 });

 // 9. Neecha Bhanga Raj Yoga (Cancellation of planetary debilitation)
 const debilPlanets = Object.entries(rawPlanets).filter(([p, d]: any) => {
 return (p === 'Sun' && d.current_sign === 7) ||
 (p === 'Moon' && d.current_sign === 8) ||
 (p === 'Mars' && d.current_sign === 4) ||
 (p === 'Mercury' && d.current_sign === 12) ||
 (p === 'Jupiter' && d.current_sign === 10) ||
 (p === 'Venus' && d.current_sign === 6) ||
 (p === 'Saturn' && d.current_sign === 1);
 });
 const neechaBhanga = debilPlanets.length > 0;
 yogas.push({
 id: 'neecha-bhanga',
 name: 'Neecha Bhanga Raj Yoga',
 isPresent: neechaBhanga,
 strength: neechaBhanga ? 'High' : 'None',
 category: 'Auspicious',
 effects: 'Overcomes initial humiliation or weakness to reach supreme heights of success and public acclaim.',
 remedies: 'Perform remedies for the debilitated planet to unlock its hidden strength.'
 });

 // 10. Kemadruma Yoga (No planets in 2nd & 12th from Moon)
 let kemadruma = false;
 if (moonHouse > 0) {
 const h2 = ((moonHouse) % 12) + 1;
 const h12 = ((moonHouse - 2 + 12) % 12) + 1;
 const planetsInH2H12 = Object.values(rawPlanets).filter((d: any) => {
 return (d.house_number === h2 || d.house_number === h12) && d.name !== 'Rahu' && d.name !== 'Ketu';
 });
 if (planetsInH2H12.length === 0) kemadruma = true;
 }
 yogas.push({
 id: 'kemadruma',
 name: 'Kemadruma Yoga',
 isPresent: kemadruma,
 strength: kemadruma ? 'Medium' : 'None',
 category: 'Inauspicious',
 effects: 'Can cause periodic feelings of isolation, financial instability, or mental anxiety.',
 remedies: 'Worship Lord Shiva and Goddess Parvati; fast on Mondays or Purnima days.'
 });

 // 11. Kala Sarpa Yoga (All planets hemmed between Rahu and Ketu)
 const rahuH = getHouse('Rahu');
 const ketuH = getHouse('Ketu');
 const kalaSarpa = rahuH > 0 && ketuH > 0;
 yogas.push({
 id: 'kala-sarpa',
 name: 'Kala Sarpa Yoga',
 isPresent: kalaSarpa,
 strength: kalaSarpa ? 'Medium' : 'None',
 category: 'Mixed',
 effects: 'Creates dramatic life swings, early struggles followed by intense spiritual evolution and late success.',
 remedies: 'Chant "Om Namah Shivaya" and offer milk to Shiva Lingam.'
 });

 // 12. Daridra Yoga (Lords of 11th in 6th, 8th, or 12th house)
 const daridra = trikHouses.includes(getHouse('Jupiter')) && trikHouses.includes(getHouse('Venus'));
 yogas.push({
 id: 'daridra',
 name: 'Daridra Yoga',
 isPresent: daridra,
 strength: daridra ? 'Low' : 'None',
 category: 'Inauspicious',
 effects: 'Indicates unexpected expenditures or financial leakages if financial discipline is ignored.',
 remedies: 'Donate food to poor people on Saturdays and practice structured financial budgeting.'
 });

 return yogas;
}
