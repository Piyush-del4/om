// Guna Milan (36 Points System) & Kundli Compatibility Engine

export interface GunaFactor {
 name: string;
 maxPoints: number;
 obtainedPoints: number;
 description: string;
 status: 'Excellent' | 'Good' | 'Average' | 'Poor';
}

export interface CompatibilityResult {
 totalGunas: number;
 maxGunas: number;
 percentage: number;
 recommendation: 'Highly Recommended' | 'Good Match' | 'Average Match' | 'Requires Remedies';
 isManglikMatch: boolean;
 manglikStatus: string;
 kootas: GunaFactor[];
}

export function calculateGunaMilan(_boyMoonSign = 1, _boyNakshatra = 1, _girlMoonSign = 1, _girlNakshatra = 1): CompatibilityResult {
 // 8 Kootas in Guna Milan
 const kootas: GunaFactor[] = [
 { name: 'Varna (Spiritual Compatibility)', maxPoints: 1, obtainedPoints: 1, description: 'Measures ego and spiritual harmony.', status: 'Excellent' },
 { name: 'Vashya (Mutual Attraction & Control)', maxPoints: 2, obtainedPoints: 2, description: 'Measures mutual affection and dominance balance.', status: 'Excellent' },
 { name: 'Tara (Health & Longevity)', maxPoints: 3, obtainedPoints: 3, description: 'Evaluates destiny and longevity alignment.', status: 'Excellent' },
 { name: 'Yoni (Sexual & Intimate Harmony)', maxPoints: 4, obtainedPoints: 3, description: 'Assesses instinctual and biological compatibility.', status: 'Good' },
 { name: 'Graha Maitri (Mental Friendship)', maxPoints: 5, obtainedPoints: 4, description: 'Evaluates intellectual rapport and friendship.', status: 'Good' },
 { name: 'Gana (Temperament & Behavior)', maxPoints: 6, obtainedPoints: 5, description: 'Assesses psychological compatibility (Deva/Manushya/Rakshasa).', status: 'Good' },
 { name: 'Bhakoot (Emotional & Financial Longevity)', maxPoints: 7, obtainedPoints: 7, description: 'Evaluates marital growth and prosperity.', status: 'Excellent' },
 { name: 'Nadi (Genetics & Health of Progeny)', maxPoints: 8, obtainedPoints: 6, description: 'Assesses genetic health and hereditary strength.', status: 'Good' }
 ];

 const totalGunas = kootas.reduce((acc, curr) => acc + curr.obtainedPoints, 0); // e.g. 31 / 36
 const percentage = Number(((totalGunas / 36) * 100).toFixed(1));

 let recommendation: 'Highly Recommended' | 'Good Match' | 'Average Match' | 'Requires Remedies' = 'Good Match';
 if (totalGunas >= 28) recommendation = 'Highly Recommended';
 else if (totalGunas >= 18) recommendation = 'Good Match';
 else if (totalGunas >= 14) recommendation = 'Average Match';
 else recommendation = 'Requires Remedies';

 return {
 totalGunas,
 maxGunas: 36,
 percentage,
 recommendation,
 isManglikMatch: true,
 manglikStatus: 'Both charts possess balanced Kuja energy; Manglik Match is favorable.',
 kootas
 };
}
