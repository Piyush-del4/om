import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

pages_jsx = """
      {/* --- PAGE 42: Example Grids (Ratan Tata, Elon Musk, Ashneer Grover) --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-6 font-serif text-center print:text-base">Example Grids in FEAT Theory ABC</h4>
        
        <div className="space-y-8 mt-4">
          
          {/* Example 1: Ratan Tata */}
          <div>
            <h5 className="font-bold mb-4 text-blue-800">2. Ratan Tata Sir - 28/12/1937 (Moolank -1, Bhagyank -6)</h5>
            <div className="flex justify-center">
              <table className="border-collapse border-2 border-black w-3/4 max-w-sm text-center bg-white shadow-lg">
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50"></td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">9</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">22</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">3</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50"></td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">7</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">8</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold text-red-600 bg-red-50 border-4 border-red-500 rounded-full inline-block mt-2 px-2">111</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Example 2: Elon Musk */}
          <div>
            <h5 className="font-bold mb-4 text-blue-800">3. Elon Musk - 28/06/1971 (Moolank -1, Bhagyank -7)</h5>
            <div className="flex justify-center">
              <table className="border-collapse border-2 border-black w-3/4 max-w-sm text-center bg-white shadow-lg">
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50"></td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">9</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">2</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold"></td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50"></td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold text-orange-600">77</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">8</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold text-red-600 bg-red-50 border-4 border-red-500 rounded-full inline-block mt-2 px-2">111</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Example 3: Ashneer Grover */}
          <div>
            <h5 className="font-bold mb-4 text-blue-800">4. Ashneer Grover - 14/06/1982 (Moolank - 5, Bhagyank - 4)</h5>
            <div className="flex justify-center">
              <table className="border-collapse border-2 border-black w-3/4 max-w-sm text-center bg-white shadow-lg">
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50 text-orange-600 border-4 border-green-500 rounded-full inline-block mt-2 px-2">44</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">9</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">2</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold"></td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">5</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold"></td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">8</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">11</td>
                    <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 43: Rudraksha Guide Introduction --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-6 font-serif text-center print:text-base text-amber-700">FEAT Theory ABC Guide: How to Find Suitable Rudraksha & Its Benefits</h4>
        
        <p className="mb-4 text-justify">
          In FEAT Theory ABC, Rudraksha plays a vital role in balancing elemental concentrations within the body. Since each number in the Lo Shu Grid represents a specific element, selecting the right Rudraksha helps regulate these elements, restoring balance and preventing imbalances that cause mental, physical, and financial struggles.
        </p>

        <h5 className="font-bold mb-2 text-blue-800">Choose the Right Rudraksha Based on Missing or Excessive Elements</h5>
        <ul className="list-disc pl-10 space-y-2 mb-6 print:pl-6 text-sm">
          <li><strong>If an element is missing</strong> → Wear the corresponding Rudraksha to enhance that element.</li>
          <li><strong>If an element is excessive</strong> → Use <strong>donation remedies</strong> (instead of Rudraksha) to reduce its effect.</li>
        </ul>

        <h5 className="font-bold mb-2 text-blue-800">When to Wear Rudraksha in FEAT Theory ABC?</h5>
        <ul className="list-disc pl-10 space-y-2 mb-6 print:pl-6 text-sm">
          <li><span className="text-green-600">✔</span> If a number is missing in the Lo Shu Grid → Rudraksha is <strong>mandatory</strong> to restore balance.</li>
          <li><span className="text-red-600">✔</span> If a number is excessive → <strong>Do not</strong> wear Rudraksha; instead, use <strong>donation remedies</strong> or <strong>mantra chanting</strong> to reduce excess energy.</li>
        </ul>

        <h5 className="font-bold mb-2 text-blue-800">Additional Benefits of Wearing Rudraksha According to FEAT Theory ABC</h5>
        <ul className="list-none pl-4 space-y-3 mb-6 print:pl-2 text-sm">
          <li className="flex items-start gap-2"><span className="text-amber-500 mt-1">✔</span> <strong>Balances Elemental Energy:</strong> Rudraksha aligns your body's elemental energy with the universe.</li>
          <li className="flex items-start gap-2"><span className="text-amber-500 mt-1">✔</span> <strong>Enhances Mental & Physical Well-being:</strong> Removes mental stress, increases focus, and improves health.</li>
          <li className="flex items-start gap-2"><span className="text-amber-500 mt-1">✔</span> <strong>Strengthens Planetary Influences:</strong> Connects with planetary vibrations for astrological benefits.</li>
          <li className="flex items-start gap-2"><span className="text-amber-500 mt-1">✔</span> <strong>Boosts Spiritual Growth & Protection:</strong> Shields against negative energies and obstacles in life.</li>
        </ul>

        <div className="bg-amber-50 p-4 border-l-4 border-amber-500 mt-4">
          <h6 className="font-bold flex items-center gap-2 mb-2 text-amber-900"><span className="text-xl">🚀</span> Final Advice: Unlock Success with the Right Rudraksha!</h6>
          <ul className="list-none space-y-1 text-sm text-amber-900">
            <li>✔ Analyze your Lo Shu Grid and identify missing/elements.</li>
            <li>✔ Select the correct Rudraksha based on your elemental imbalance.</li>
            <li>✔ Follow donation remedies if an element is excessive (instead of wearing Rudraksha).</li>
            <li>✔ With the right Rudraksha, balance your life, finances, health, and relationships!</li>
          </ul>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 44: Missing Numbers Table & 10 Mukhi Intro --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base bg-amber-100 py-2">Missing Numbers in Loshu Grid</h4>
        
        <div className="flex justify-center mb-8">
          <table className="border-collapse border-2 border-black w-full text-sm max-w-lg shadow-md">
            <thead>
              <tr className="bg-amber-100">
                <th className="border-2 border-black p-2 text-left">Missing Numbers in Loshu Grid</th>
                <th className="border-2 border-black p-2 text-left">Suitable Rudraksha</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border-2 border-black p-2 font-bold">1</td><td className="border-2 border-black p-2">1 Mukhi Rudraksha</td></tr>
              <tr className="bg-gray-50"><td className="border-2 border-black p-2 font-bold">2</td><td className="border-2 border-black p-2">2 Mukhi Rudraksha</td></tr>
              <tr><td className="border-2 border-black p-2 font-bold">3</td><td className="border-2 border-black p-2">5 Mukhi Rudraksha</td></tr>
              <tr className="bg-gray-50"><td className="border-2 border-black p-2 font-bold">4</td><td className="border-2 border-black p-2">8 Mukhi Rudraksha</td></tr>
              <tr><td className="border-2 border-black p-2 font-bold">5</td><td className="border-2 border-black p-2">4 Mukhi Rudraksha</td></tr>
              <tr className="bg-gray-50"><td className="border-2 border-black p-2 font-bold">6</td><td className="border-2 border-black p-2">9 Mukhi Rudraksha</td></tr>
              <tr><td className="border-2 border-black p-2 font-bold">7</td><td className="border-2 border-black p-2">7 Mukhi Rudraksha</td></tr>
              <tr className="bg-gray-50"><td className="border-2 border-black p-2 font-bold">8</td><td className="border-2 border-black p-2">6 Mukhi Rudraksha</td></tr>
              <tr><td className="border-2 border-black p-2 font-bold">9</td><td className="border-2 border-black p-2">3 Mukhi Rudraksha</td></tr>
            </tbody>
          </table>
        </div>

        <h4 className="text-lg font-bold mb-4 text-blue-800 text-center">10 Mukhi Rudraksha – Symbol of Protection & Power</h4>
        <div className="bg-blue-50 p-4 border-l-4 border-blue-500 mb-6">
          <p className="mb-1 text-sm"><strong>Ruling Deity:</strong> Lord Vishnu</p>
          <p className="mb-1 text-sm"><strong>Planetary Association:</strong> No specific planet <em>(Neutralizes all planetary doshas)</em></p>
          <p className="text-sm"><strong>Elemental Influence (FEAT Theory ABC Insight):</strong> Balances all five elements to protect the wearer from negative energies.</p>
        </div>

        <h5 className="font-bold mb-4">Best Results of 10 Mukhi Rudraksha:</h5>
        <div className="space-y-4">
          <div>
            <h6 className="font-bold text-sm">1. Removes Fear and Evil Energies</h6>
            <ul className="list-circle pl-8 text-sm text-gray-700">
              <li>Protects from black magic, evil eye, and negative spirits.</li>
              <li>Builds a powerful energetic shield around the body.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm">2. Strengthens Mental Stability</h6>
            <ul className="list-circle pl-8 text-sm text-gray-700">
              <li>Brings inner strength, courage, and fearlessness.</li>
              <li>Reduces anxiety and boosts confidence in tough situations.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm">3. Balances Multiple Planetary Energies</h6>
            <ul className="list-circle pl-8 text-sm text-gray-700">
              <li>Neutralizes malefic effects of all planets, especially Rahu, Ketu, and Shani.</li>
              <li>Ideal for people facing repeated failures due to planetary doshas.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm">4. Spiritual Growth and Wisdom</h6>
            <ul className="list-circle pl-8 text-sm text-gray-700">
              <li>Increases connection with divine consciousness.</li>
              <li>Improves meditation, focus, and intuition.</li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 45: 10 Mukhi Conclusion & 11 Mukhi Intro --- */}
      <EbookHeaderFooter>
        <div className="space-y-4 mb-8">
          <div>
            <h6 className="font-bold text-sm">5. Career and Legal Protection</h6>
            <ul className="list-circle pl-8 text-sm text-gray-700">
              <li>Helpful in court cases, legal battles, and disputes.</li>
              <li>Ensures victory and favorable outcomes when worn with faith.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm">6. Improves Aura & Attracts Positivity</h6>
            <ul className="list-circle pl-8 text-sm text-gray-700">
              <li>Enhances the magnetic field (aura) of the wearer.</li>
              <li>Attracts opportunities, good people, and prosperity.</li>
            </ul>
          </div>
        </div>

        <h5 className="font-bold mb-4 text-blue-800 text-lg flex items-center gap-2"><span className="text-2xl">🧠</span> FEAT Theory ABC Perspective:</h5>
        <p className="text-justify text-sm mb-4">
          Since the 10 Mukhi Rudraksha balances all five elements (Water, Fire, Air, Earth, Sky), it is extremely effective for people with multiple elemental imbalances in their Lo Shu Grid.
        </p>
        <div className="mb-6">
          <p className="font-bold text-sm mb-2">Ideal for those:</p>
          <ul className="list-disc pl-10 text-sm space-y-1">
            <li><strong>Having missing or excessive numbers</strong> in the Lo Shu Grid.</li>
            <li>Experiencing <strong>combined issues</strong> like fear, overthinking, aggression, emotional distress, and lack of grounding.</li>
            <li>Facing planetary challenges involving Rahu, Ketu, or Shani energies.</li>
          </ul>
        </div>

        <h5 className="font-bold mb-2 text-blue-800 flex items-center gap-2"><span className="text-xl">🔍</span> Who Should Wear It?</h5>
        <ul className="list-disc pl-10 text-sm space-y-1 mb-6">
          <li>People in legal professions, public speakers, judges, lawyers.</li>
          <li>Spiritual seekers and meditators.</li>
          <li>Anyone under strong negative energy influences or sudden setbacks.</li>
        </ul>

        <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500 mb-8 text-sm">
          <p className="font-bold mb-2">Note –</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>10 Mukhi Rudraksha works as a powerful tool in winning any legal battle. Eliminate Vastu Dosha and Pitra Dosha.</li>
            <li>Placing a 10 Mukhi Rudraksha in various areas of a home or business can help shield and purify the space from negative energies.</li>
          </ul>
        </div>

        <h4 className="text-lg font-bold mb-4 text-red-800 text-center">11 Mukhi Rudraksha – The Bead of Divine Protection and Courage</h4>
        <div className="bg-red-50 p-4 border-l-4 border-red-500 mb-6">
          <p className="mb-1 text-sm"><strong>Ruling Deity:</strong> Lord Hanuman (Ekadash Rudra form of Lord Shiva)</p>
          <p className="text-sm"><strong>Ruling Planet:</strong> Mars (Mangal) – Also balances Rahu and Saturn to some extent.</p>
        </div>

        <h5 className="font-bold mb-4">Key Benefits & Best Results of 11 Mukhi Rudraksha:</h5>
        <div className="space-y-4">
          <div>
            <h6 className="font-bold text-sm text-green-700 flex items-center gap-2"><span className="text-lg">✔</span> 1. Boosts Confidence & Courage (Hanuman Shakti)</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Removes fear, self-doubt, and phobias.</li>
              <li>Ideal for those with a lack of motivation or presence of mind.</li>
              <li>Helps overcome enemies and obstacles in life.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-pink-700 flex items-center gap-2"><span className="text-lg">🧠</span> 2. Sharpens Intellect and Improves Memory</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Enhances focus, clarity of thought, and decision-making.</li>
              <li>Great for students, researchers, and spiritual seekers.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-red-700 flex items-center gap-2"><span className="text-lg">🛡️</span> 3. Protection from Accidents and Negative Energies</h6>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 46: 11 Mukhi Conclusion & 12 Mukhi Details --- */}
      <EbookHeaderFooter>
        <div className="space-y-4 mb-8">
          <div>
            <h6 className="font-bold text-sm text-indigo-700 flex items-center gap-2"><span className="text-lg">📈</span> 4. Improves Leadership & Authority</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Acts as an energy shield against evil spirits, psychic attacks, and harmful planetary energies.</li>
              <li>Especially powerful for those under Rahu, Shani, or Mars dosha.</li>
              <li className="list-none -ml-4 mt-2 font-bold text-gray-900">Best for professionals in administration, defense, police, politics, and leadership roles.</li>
              <li>Boosts assertiveness, clarity, and command over speech.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-purple-700 flex items-center gap-2"><span className="text-lg">🧘</span> 5. Promotes Spiritual Discipline</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Enhances spiritual progress, inner strength, and energy control.</li>
              <li>Supports yogic practices and builds control over senses.</li>
            </ul>
          </div>
        </div>

        <h4 className="text-lg font-bold mb-4 text-orange-800 text-center mt-8">12 Mukhi Rudraksha – The Surya Bead of Radiance, Power & Self-Leadership</h4>
        <div className="bg-orange-50 p-4 border-l-4 border-orange-500 mb-6">
          <p className="mb-1 text-sm"><strong>Ruling Deity:</strong> Lord Surya (The Sun God)</p>
          <p className="text-sm"><strong>Ruling Planet:</strong> Sun (Surya)</p>
        </div>

        <h5 className="font-bold mb-4 text-green-700 flex items-center gap-2"><span className="text-xl">✔</span> Benefits & Best Results of 12 Mukhi Rudraksha:</h5>
        <div className="space-y-4">
          <div>
            <h6 className="font-bold text-sm text-yellow-700 flex items-center gap-2"><span className="text-lg">🌞</span> 1. Enhances Personality & Aura</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Builds a magnetic aura that draws respect and admiration.</li>
              <li>Makes you more charming, impressive, and impactful in public settings.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-pink-700 flex items-center gap-2"><span className="text-lg">🧠</span> 2. Boosts Mental Clarity & Confidence</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Improves concentration, decision-making, and memory power.</li>
              <li>Reduces overthinking and helps in staying calm and composed under pressure.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-red-700 flex items-center gap-2"><span className="text-lg">🔥</span> 3. Strengthens Leadership & Authority</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Ideal for people in high positions like CEOs, political leaders, administrators, teachers, and performers.</li>
              <li>Makes the wearer bold, fearless, and assertive.</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm text-orange-700 flex items-center gap-2"><span className="text-lg">💪</span> 4. Improves Physical Vitality & Immunity</h6>
            <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
              <li>Enhances stamina, digestion, and overall physical energy.</li>
              <li>Known to help with ailments related to the heart, bones, and eyes (organs governed by Sun).</li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>
"""

# Append the new pages at the very end, before the final </div> that wraps all pages.
# Let's split by the last `</div>` which closes the main container.
parts = text.rsplit('</div>', 1)
if len(parts) == 2:
    new_text = parts[0] + pages_jsx + '\n    </div>' + parts[1]
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_text)
    print("Appended Pages 42-46 successfully!")
else:
    print("Failed to append, could not find closing div.")
