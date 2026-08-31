import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

# Part 1: Add Benefit #5 to the 12 Mukhi Rudraksha
# Find the end of Benefit #4
benefit_4 = '<li>Known to help with ailments related to the heart, bones, and eyes (organs governed by Sun).</li>\n            </ul>\n          </div>'
benefit_5_jsx = """
          <div>
            <h6 className="font-bold text-sm text-red-600 flex items-center gap-2"><span className="text-lg">🚫</span> 5. Removes Fear, Self-Doubt & Low Self-Esteem</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Fills the wearer with inner strength, determination, and purpose.</li>
              <li>Removes the fear of rejection, criticism, or failure.</li>
            </ul>
          </div>"""

# Insert Benefit #5 after Benefit #4
idx_4 = text.find(benefit_4)
if idx_4 != -1:
    insertion_point = idx_4 + len(benefit_4)
    text = text[:insertion_point] + benefit_5_jsx + text[insertion_point:]

# Part 2: Append Pages 47 and 48
pages_jsx = """
      {/* --- PAGE 47: 13 Mukhi Rudraksha --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-4 text-pink-800 text-center mt-4">13 Mukhi Rudraksha – The Bead of Attraction, Success & Charm</h4>
        <div className="bg-pink-50 p-4 border-l-4 border-pink-500 mb-6">
          <p className="mb-1 text-sm"><strong>Ruling Deity:</strong> Kamadeva (God of Love & Desire)</p>
          <p className="mb-1 text-sm"><strong>Secondary Deity:</strong> Lord Indra (King of Gods)</p>
          <p className="mb-1 text-sm"><strong>Ruling Planet:</strong> Venus (Shukra)</p>
          <p className="text-sm"><strong>Elemental Influence (FEAT Theory ABC):</strong> Increases Sky/Yellow Metal element (Number 6), associated with luxury, attraction, relationships, and charm.</p>
        </div>

        <h5 className="font-bold mb-4 text-green-700 flex items-center gap-2"><span className="text-xl">✔</span> Key Benefits & Best Results of 13 Mukhi Rudraksha:</h5>
        <div className="space-y-4">
          <div>
            <h6 className="font-bold text-sm text-pink-700 flex items-center gap-2"><span className="text-lg">💖</span> 1. Enhances Physical Charm & Attractiveness</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Boosts natural magnetism and makes the wearer more appealing and desirable.</li>
              <li>Increases attraction power, both in professional and personal life.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-rose-700 flex items-center gap-2"><span className="text-lg">🌟</span> 2. Improves Relationships & Romantic Life</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Strengthens emotional bonds and intimacy in relationships.</li>
              <li>Useful for resolving relationship conflicts or misunderstandings.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-yellow-700 flex items-center gap-2"><span className="text-lg">💼</span> 3. Brings Success in Business & Career</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Excellent for professionals in marketing, fashion, films, glamour, media, or luxury industries.</li>
              <li>Helps in closing deals, winning people's trust, and standing out in competitive environments.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-indigo-700 flex items-center gap-2"><span className="text-lg">🧘</span> 4. Supports Kundalini Awakening & Spiritual Energy Flow</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Enhances the flow of energy in the sacral and heart chakras.</li>
              <li>Helpful in tantra and spiritual sadhanas where energy balance is crucial.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-yellow-600 flex items-center gap-2"><span className="text-lg">💰</span> 5. Attracts Wealth, Luxury & Prosperity</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Invokes the blessings of Indra, who rules over wealth and comforts.</li>
              <li>Helps the wearer enjoy material and spiritual success simultaneously.</li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 48: 13 Mukhi Who Should Wear & 14 Mukhi Intro --- */}
      <EbookHeaderFooter>
        <h5 className="font-bold mb-4 text-blue-800 flex items-center gap-2 mt-4"><span className="text-xl">🕵️</span> Who Should Wear 13 Mukhi Rudraksha?</h5>
        <ul className="list-disc pl-10 text-sm space-y-1 mb-8">
          <li>People in glamour, media, fashion, cosmetics, modeling, acting, or entertainment.</li>
          <li>Business owners and sales professionals who rely on charm and persuasion.</li>
          <li>Those with relationship troubles or weak Venus in their Kundli (especially in 6th, 8th, or 12th house).</li>
        </ul>

        <h4 className="text-lg font-bold mb-4 text-indigo-800 text-center border-t-2 border-gray-300 pt-8">14 Mukhi Rudraksha – The Divine Gem of Intuition, Willpower & Protection</h4>
        <div className="bg-indigo-50 p-4 border-l-4 border-indigo-500 mb-6">
          <p className="mb-1 text-sm"><strong>Ruling Deity:</strong> Lord Hanuman & Lord Shiva (as Mahadev Rudra)</p>
          <p className="text-sm"><strong>Ruling Planet:</strong> Saturn (Shani) and also associated with Mars (Mangal)</p>
        </div>

        <h5 className="font-bold mb-4 text-green-700 flex items-center gap-2"><span className="text-xl">✔</span> Top Benefits & Best Results of 14 Mukhi Rudraksha:</h5>
        <div className="space-y-4">
          <div>
            <h6 className="font-bold text-sm text-purple-700 flex items-center gap-2"><span className="text-lg">👁️</span> 1. Enhances Intuition and Third Eye Activation</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Sharpens sixth sense and inner guidance.</li>
              <li>Helps make the right decisions, especially in tough or confusing situations.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-blue-700 flex items-center gap-2"><span className="text-lg">🧗</span> 2. Provides Strong Willpower and Stability</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Gives mental firmness, clarity, and focused direction in life.</li>
              <li>Helps overcome distractions, laziness, and fears.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-gray-800 flex items-center gap-2"><span className="text-lg">⚖️</span> 3. Removes the Malefic Effects of Saturn (Shani)</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Offers protection during Sade Sati, Dhaiya, or Shani Dosh.</li>
              <li>Reduces delays, obstacles, karmic struggles, and fear of unknown losses.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-orange-700 flex items-center gap-2"><span className="text-lg">💪</span> 4. Provides Hanuman-Like Courage and Strength</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Boosts self-confidence, physical energy, and resistance to negativity.</li>
              <li>Helps fight internal and external enemies with clarity and fearlessness.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-indigo-900 flex items-center gap-2"><span className="text-lg">🧿</span> 5. Protection from Accidents and Evil Energies</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Acts like a spiritual shield; keeps the person safe during travel, critical decisions, or dangerous environments.</li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>
"""

parts = text.rsplit('</div>', 1)
if len(parts) == 2:
    new_text = parts[0] + pages_jsx + '\n    </div>' + parts[1]
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_text)
    print("Appended Pages 47-48 successfully!")
else:
    print("Failed to append, could not find closing div.")
