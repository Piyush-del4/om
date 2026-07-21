const fs = require('fs');
const path = require('path');

const numerologyData = {};
for (let i = 1; i <= 9; i++) {
  numerologyData[i.toString()] = {
    title: `Numerology Number ${i}: 2026 Yearly Predictions & Insights`,
    content: `
## What to Expect in 2026 for Numerology Number ${i}

Welcome to your detailed 2026 numerology forecast! If your Root Number is ${i}, the universal vibrations of 2026 hold special significance for your personal and professional journey. The year 2026 adds up to the number 1 (2+0+2+6=10, 1+0=1), a number symbolizing fresh starts, leadership, and independence. Depending on your root number, this energy will interact with your life path in unique and powerful ways.

### Career & Financial Growth in 2026
In 2026, Number ${i} individuals can expect a transformative period in their careers. The universal '1' energy encourages taking bold steps. Whether you are aiming for a promotion, planning to start a new business venture, or looking to scale your current operations, the cosmic climate supports taking calculated risks. Financially, it is a year to establish new income streams. However, avoid impulsive investments—methodical planning will yield the highest returns.

### Love, Relationships & Marriage
When it comes to matters of the heart, the overarching theme of 2026 for Number ${i} is clarity and evolution. If you are single, this is an excellent year to attract a partner who aligns with your long-term goals. For those in committed relationships or marriage, 2026 demands open communication. The '1' energy can sometimes bring ego clashes, so maintaining empathy and active listening will be crucial for marital harmony. 

### Health & Wellness
Your vitality in 2026 heavily depends on how you manage stress. As a Number ${i}, you naturally push yourself to achieve your goals, but the energetic shifts this year require dedicated downtime. Incorporate mindfulness, meditation, and a structured physical routine into your daily life. Pay special attention to your diet and ensure you are getting adequate rest to maintain your robust energy levels.

### Challenges & Remedies
**Challenges:**
- Overambition leading to burnout.
- Potential misunderstandings with close family members due to a lack of time.
- Ego battles in the workplace.

**Remedies:**
- Practice daily grounding exercises.
- Wear colors that balance your ruling planet's energy.
- Dedicate specific, uninterrupted time to your loved ones every week.

### Final Word
2026 is a monumental year for setting the foundation of your next 9-year cycle. By embracing leadership while remaining humble, Number ${i} natives can harness the universe's powerful energetic support to manifest their deepest desires.
    `.trim()
  };
}

fs.writeFileSync(
  path.join(__dirname, 'frontend/data/numerology-2026.json'),
  JSON.stringify(numerologyData, null, 2)
);

const planets = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"];
const planetData = {};

planets.forEach((planet) => {
  const planetName = planet.charAt(0).toUpperCase() + planet.slice(1);
  planetData[planet] = {
    title: `${planetName} Transit 2026: Impacts, Predictions & Remedies`,
    content: `
## Understanding the ${planetName} Transit

In Vedic Astrology, the transit of ${planetName} across the zodiac signs creates massive shifts in our cosmic environment. As ${planetName} moves, its energetic rays interact with our natal charts, triggering events, emotions, and life changes. Understanding this transit is crucial for navigating the year ahead with wisdom and preparedness.

### Impact on Career and Wealth
When ${planetName} transits through key houses in your horoscope, it directly influences your professional trajectory. A favorable transit can bring sudden promotions, business expansions, and unexpected financial gains. Conversely, a challenging transit asks for patience, consolidation of assets, and avoiding risky speculative investments. 

### Impact on Relationships and Family
The movement of ${planetName} deeply affects our interpersonal dynamics. During its positive phases, you will experience harmony, deepening bonds, and joyous family events. If the transit aligns challenging aspects, it may stir up old unresolved conflicts, requiring you to practice extreme patience and diplomatic communication to preserve your relationships.

### Health and Well-being
Cosmic transits are intrinsically linked to our physical and mental health. The ${planetName} transit governs specific body parts and bodily systems according to Vedic scriptures. To mitigate any adverse effects, it is highly recommended to follow a disciplined lifestyle, consume a balanced diet aligned with Ayurvedic principles, and maintain regular spiritual practices.

### Key Remedies
To harmonize the energies of the ${planetName} transit:
- **Mantras:** Chant the specific Vedic or Tantric mantra for ${planetName} daily during sunrise or sunset.
- **Charity:** Donate specific items related to ${planetName} on its ruling day of the week.
- **Gemstones & Yantras:** Consult with an expert astrologer before wearing any gemstone, or keep a consecrated ${planetName} Yantra in your prayer room.

### Conclusion
Astrological transits are not meant to induce fear, but to prepare us. By aligning your actions with the cosmic rhythm of ${planetName}, you can transform potential challenges into profound spiritual and material growth.
    `.trim()
  };
});

fs.writeFileSync(
  path.join(__dirname, 'frontend/data/transits.json'),
  JSON.stringify(planetData, null, 2)
);

console.log('Successfully generated JSON data for Numerology and Transits.');
