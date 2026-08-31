// Personalized Traditional Remedies Engine with Traditional Belief Disclaimer

export interface RemedyCategory {
 type: 'Mantra' | 'Rudraksha' | 'Charity' | 'Fasting' | 'Color' | 'Yantra' | 'Donation' | 'Temple Visit';
 title: string;
 recommendation: string;
 procedure: string;
 significance: string;
}

export const REMEDY_DISCLAIMER = 
 "Remedies presented here are rooted in Vedic traditional beliefs and spiritual heritage. They are intended for positive spiritual practice and personal reflection, rather than deterministic guarantees or medical advice.";

export function generateRemedies(data: any): RemedyCategory[] {
 if (!data || !data.output || !data.output[1]) return [];

 return [
 {
 type: 'Mantra',
 title: 'Gayatri Mantra & Mahamrityunjaya Stotra',
 recommendation: 'Recite "Om Bhur Bhuvah Swaha..." 108 times at sunrise.',
 procedure: 'Sit facing East in a quiet setting. Light a ghee lamp before starting.',
 significance: 'Traditional belief holds that Gayatri Mantra clarifies intellect and wards off mental stress.'
 },
 {
 type: 'Rudraksha',
 title: '5-Mukhi or 6-Mukhi Rudraksha',
 recommendation: 'Wear authentic 5-Mukhi Rudraksha energized in Panchamrit on Monday morning.',
 procedure: 'Cleanse with Ganga water/milk and chant "Om Hreem Namah" before wearing.',
 significance: 'Believed in sacred lore to harmonize planetary vibrations and promote mental tranquility.'
 },
 {
 type: 'Charity',
 title: 'Annadaanam & Feeding Animals',
 recommendation: 'Offer green fodder to cows on Wednesdays and feed stray dogs/birds on Saturdays.',
 procedure: 'Perform charity with humility without expecting personal return.',
 significance: 'Tradition emphasizes that selfless sharing alleviates karmic obstacles and attracts peace.'
 },
 {
 type: 'Fasting',
 title: 'Monday / Thursday Fasting',
 recommendation: 'Observe light fasting or consume fruits/milk on Mondays or Thursdays.',
 procedure: 'Maintain pure thoughts and break fast after evening prayer at sunset.',
 significance: 'Fasting is traditionally practiced for bodily purification and mental discipline.'
 },
 {
 type: 'Color',
 title: 'Auspicious Color Harmony',
 recommendation: 'Favor Yellow, Cream, Royal Blue, and White attire for important events.',
 procedure: 'Incorporate these colors in your daily wardrobe or home decor.',
 significance: 'Colors are thought in chromotherapy traditions to harmonize subtle auric energies.'
 },
 {
 type: 'Yantra',
 title: 'Sri Yantra / Navgrah Yantra',
 recommendation: 'Place a copper Sri Yantra in your home altar facing East.',
 procedure: 'Offer fresh flowers and light incense daily.',
 significance: 'Geometric Yantras are revered in Vedic tradition as conduits for positive spatial energy.'
 },
 {
 type: 'Donation',
 title: 'Seva & Educational Support',
 recommendation: 'Donate books, stationery, or food to underprivileged children on auspicious days.',
 procedure: 'Contribute directly to reputed charities or local schools.',
 significance: 'Educational charity (Vidya Dan) is celebrated in scriptures as supreme auspicious karma.'
 },
 {
 type: 'Temple Visit',
 title: 'Shiva & Lord Ganesha Temple Visits',
 recommendation: 'Visit a local Shiva or Ganesha temple on Mondays/Tuesdays.',
 procedure: 'Offer water (Abhishekam) or flowers with quiet devotion.',
 significance: 'Temple visits provide a serene environment for introspection, peace, and spiritual grounding.'
 }
 ];
}
