// Life Predictions Synthesis Engine (17 Core Categories)

export interface LifePredictionCategory {
 title: string;
 key: string;
 iconName: string;
 summary: string;
 keyInsights: string[];
 favorablePeriods: string;
 guidance: string;
}

export function generateLifePredictions(data: any): LifePredictionCategory[] {
 if (!data || !data.output || !data.output[1]) return [];

 const rawPlanets = data.output[1];
 const house1Sign = rawPlanets[1]?.current_sign || rawPlanets['Ascendant']?.current_sign || 1;
 const moonSign = rawPlanets['Moon']?.current_sign || 1;

 const ZODIAC_NAMES = [
 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
 ];

 const ascSignName = ZODIAC_NAMES[house1Sign - 1] || 'Aries';
 const rashiSignName = ZODIAC_NAMES[moonSign - 1] || 'Aries';

 return [
 {
 title: 'Personality & Temperament',
 key: 'personality',
 iconName: 'User',
 summary: `With ${ascSignName} Ascendant and ${rashiSignName} Moon sign, you possess a distinctive blend of dynamic vitality and intuitive depth.`,
 keyInsights: [
 'Naturally courageous with a strong sense of personal identity.',
 'High mental agility paired with emotional sensitivity.',
 'Values self-reliance, authenticity, and honorable conduct.'
 ],
 favorablePeriods: 'Sun and Jupiter Dasha periods bring peak vitality and self-expression.',
 guidance: 'Channel your natural enthusiasm into disciplined routines to maximize long-term accomplishments.'
 },
 {
 title: 'Career & AMCition',
 key: 'career',
 iconName: 'Briefcase',
 summary: 'Your 10th house alignment indicates strong leadership potential, strategic foresight, and organizational influence.',
 keyInsights: [
 'Thrives in roles involving executive decision-making or specialized expertise.',
 'Natural inclination toward administrative excellence and public recognition.',
 'Consistent work ethic leads to steady career ascendance after age 28.'
 ],
 favorablePeriods: 'Saturn and Mercury periods bring major professional advancements.',
 guidance: 'Focus on building long-term institutional authority rather than seeking short-term rewards.'
 },
 {
 title: 'Education & Knowledge',
 key: 'education',
 iconName: 'GraduationCap',
 summary: 'Strong 5th and 4th house indicators highlight high analytical intelligence and lifelong pursuit of learning.',
 keyInsights: [
 'Aptitude for analytical sciences, finance, governance, or sacred knowledge.',
 'Retains complex information easily and excels in competitive examinations.',
 'Possesses natural research ability and problem-solving skills.'
 ],
 favorablePeriods: 'Jupiter and Mercury sub-periods bring academic honors.',
 guidance: 'Cultivate deep specialization alongside broad interdisciplinary knowledge.'
 },
 {
 title: 'Marriage & Partnership',
 key: 'marriage',
 iconName: 'Heart',
 summary: '7th house dynamics suggest a supportive, dignified life partner who shares your core values and life vision.',
 keyInsights: [
 'Marriage brings emotional stability and social elevation.',
 'Partner is likely dutiful, intelligent, and highly respected.',
 'Open communication is the key to resolving minor planetary transits.'
 ],
 favorablePeriods: 'Venus and Jupiter transits over 7th house usher in marital blessings.',
 guidance: 'Practice active listening and celebrate shared accomplishments together.'
 },
 {
 title: 'Love & Romance',
 key: 'love',
 iconName: 'Sparkles',
 summary: '5th house energy endows you with a romantic, idealist heart seeking soul connection.',
 keyInsights: [
 'Values intellectual and emotional alignment over superficial charm.',
 'Expresses affection through acts of protection, loyalty, and thoughtfulness.',
 'Deep devotion once commitment is established.'
 ],
 favorablePeriods: 'Venus and Moon periods spark romantic joy.',
 guidance: 'Allow relationships to mature naturally without imposing premature expectations.'
 },
 {
 title: 'Family & Heritage',
 key: 'family',
 iconName: 'Home',
 summary: '2nd and 4th house alignments emphasize deep rootedness in family traditions and ancestral blessings.',
 keyInsights: [
 'Acts as a stabilizing pillar and caretaker for family members.',
 'Honors parental wisdom and maintains harmonious family bond.',
 'Brings warmth and spiritual serenity to the home environment.'
 ],
 favorablePeriods: 'Moon and Sun dashas foster domestic harmony.',
 guidance: 'Create a tranquil home sanctuary dedicated to peace and family reflection.'
 },
 {
 title: 'Finance & Wealth Accumulation',
 key: 'finance',
 iconName: 'Coins',
 summary: '11th and 2nd house planetary configurations support steady wealth creation and asset growth.',
 keyInsights: [
 'Ability to generate multiple income streams through prudent investments.',
 'Prudence in financial management prevents unnecessary losses.',
 'Long-term compounded investments yield maximum financial freedom.'
 ],
 favorablePeriods: 'Jupiter and Venus periods favor major financial gains.',
 guidance: 'Diversify assets into real estate, gold, and low-risk growth instruments.'
 },
 {
 title: 'Health & Vitality',
 key: 'health',
 iconName: 'Activity',
 summary: '6th and 1st house analysis indicates robust immune potential with a need for balanced lifestyle discipline.',
 keyInsights: [
 'Strong recuperative powers and overall physical stamina.',
 'Sensitivity to digestive balance and stress-induced tension.',
 'Regular physical exercise and organic diet keep vitality at peak.'
 ],
 favorablePeriods: 'Sun and Mars sub-periods enhance physical vigor.',
 guidance: 'Incorporate daily Pranayama, yoga, and adequate hydration into your routine.'
 },
 {
 title: 'Children & Progeny',
 key: 'children',
 iconName: 'Baby',
 summary: '5th house indicators foretell joyful, intelligent progeny who bring honor to the family line.',
 keyInsights: [
 'Children will excel in academic, creative, or administrative pursuits.',
 'Deep emotional bond and mutual respect with children.',
 'Progeny serves as a source of immense pride and comfort.'
 ],
 favorablePeriods: 'Jupiter transits over 5th house bring progeny blessings.',
 guidance: 'Encourage independent creative thinking while instilling traditional moral values.'
 },
 {
 title: 'Spirituality & Higher Wisdom',
 key: 'spirituality',
 iconName: 'Compass',
 summary: '9th and 12th house placements foster a reflective mind drawn toward Vedic philosophy and self-realization.',
 keyInsights: [
 'Natural inclination toward meditation, mantra chanting, and sacred texts.',
 'Seeks authentic spiritual truth beyond dogma.',
 'Experiences intuitive dreams and subtle synchronicities.'
 ],
 favorablePeriods: 'Ketu and Jupiter dashas trigger profound spiritual epiphanies.',
 guidance: 'Dedicating 20 minutes daily to silent meditation will double your mental clarity.'
 },
 {
 title: 'Foreign Travel & Global Exposure',
 key: 'foreign-travel',
 iconName: 'Globe',
 summary: '12th, 9th, and 7th house influences indicate opportunities for long-distance travel and global cross-cultural ventures.',
 keyInsights: [
 'Prospects for international education, work assignments, or spiritual pilgrimages.',
 'Adapts smoothly to foreign cultures and global environments.',
 'Foreign connections contribute significantly to financial prosperity.'
 ],
 favorablePeriods: 'Rahu and Moon transits activate travel yogas.',
 guidance: 'Embrace global networking and international skill enhancement.'
 },
 {
 title: 'Property & Real Estate',
 key: 'property',
 iconName: 'Building',
 summary: '4th house strength points to land ownership, residential comforts, and vehicle acquisition.',
 keyInsights: [
 'Accumulation of landed property and comfortable real estate assets.',
 'Auspicious placements for building or purchasing ancestral homes.',
 'Enjoys aesthetic home decor and peaceful living spaces.'
 ],
 favorablePeriods: 'Mars and Venus periods favor property purchases.',
 guidance: 'Ensure thorough legal verification before executing real estate transactions.'
 },
 {
 title: 'Business & Entrepreneurship',
 key: 'business',
 iconName: 'TrendingUp',
 summary: '7th and 10th house trade indicators reveal strong commercial instinct and business negotiation skills.',
 keyInsights: [
 'Capacity to identify market niches and build scalable ventures.',
 'Builds trustworthy commercial partnerships.',
 'Resilient execution during market fluctuations.'
 ],
 favorablePeriods: 'Mercury and Sun sub-periods favor enterprise launches.',
 guidance: 'Maintain transparent contracts and delegate operational tasks to trusted partners.'
 },
 {
 title: 'Profession & Industry Standing',
 key: 'profession',
 iconName: 'Award',
 summary: 'Overall chart authority establishes high peer respect and industry credibility.',
 keyInsights: [
 'Recognized for integrity, domain expertise, and high output quality.',
 'Sought after for expert advice and strategic guidance.',
 'Leaves a lasting positive legacy in your professional field.'
 ],
 favorablePeriods: 'Sun and Saturn transits enhance professional status.',
 guidance: 'Consistently mentor younger professionals to expand your industry influence.'
 },
 {
 title: 'Success & Achievements',
 key: 'success',
 iconName: 'CheckCircle',
 summary: '11th house fulfillment of desires ensures that steady effort yields grand accomplishments.',
 keyInsights: [
 'Goals are realized through persistent, methodical execution.',
 'Receives timely support from mentors, elders, and influential patrons.',
 'Turns setbacks into stepping stones for major victories.'
 ],
 favorablePeriods: 'Jupiter and 11th lord dashas unlock key milestones.',
 guidance: 'Set AMCitious 5-year goals and celebrate incremental victories along the way.'
 },
 {
 title: 'Obstacles & Overcoming Challenges',
 key: 'obstacles',
 iconName: 'ShieldAlert',
 summary: '6th house Shatru/Roga analysis shows strong capacity to overcome opposition and legal disputes.',
 keyInsights: [
 'Inbuilt resilience to outlast competitive pressures.',
 'Tactful diplomacy resolves conflicts without unnecessary escalation.',
 'Challenging phases act as catalysts for personal empowerment.'
 ],
 favorablePeriods: 'Mars and Rahu periods grant victory over opposition.',
 guidance: 'Maintain calm composure during conflicts and rely on legal and ethical remedies.'
 },
 {
 title: 'Life Purpose & Soul Calling (Dharma)',
 key: 'life-purpose',
 iconName: 'Target',
 summary: 'Atmakaraka alignment points to a high life calling centered on service, truth, and uplifting society.',
 keyInsights: [
 'Driven by an inner desire to leave the world better than you found it.',
 'Finds deepest joy in synthesizing practical success with spiritual ethics.',
 'Destined to inspire and guide others through personal example.'
 ],
 favorablePeriods: 'Sun and 9th house lord periods illuminate your dharma.',
 guidance: 'Align your daily career goals with your higher moral and spiritual principles.'
 }
 ];
}
