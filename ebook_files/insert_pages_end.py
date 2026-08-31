import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

pages_jsx = """
      {/* --- PAGE 34: Impact of Missing All Earth Elements --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-6 font-serif text-center print:text-base">Impact of Missing All Earth Elements (2, 5, 8) in Lo Shu Grid</h4>
        
        <div className="space-y-6 mt-6 print:mt-4">
          <ul className="space-y-3 print:space-y-2 text-sm text-justify">
            <li className="flex gap-2">
              <span className="text-red-500 font-bold mt-1">📌</span>
              <span><strong>High chances of selling or losing property -</strong> If an individual owns a house or land, it is very likely to be sold due to financial pressure or unforeseen circumstances.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold mt-1">📌</span>
              <span><strong>Problems after purchasing property -</strong> Disputes, legal issues, financial losses, or unexpected difficulties may arise immediately after buying land or a house.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold mt-1">📌</span>
              <span><strong>Lack of financial stability -</strong> The person finds it extremely difficult to save money or invest in long-term assets.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold mt-1">📌</span>
              <span><strong>Struggles with career and business growth -</strong> Business or job instability prevents wealth accumulation and long-term success.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold mt-1">📌</span>
              <span><strong>Emotional instability & lack of grounding -</strong> Missing Number 2 leads to emotional ups and downs, making it harder to handle financial struggles.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold mt-1">📌</span>
              <span><strong>Poor decision-making in financial matters -</strong> Missing Number 5 causes lack of intelligence in handling money and investments.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold mt-1">📌</span>
              <span><strong>Struggles & delays in achieving goals -</strong> Missing Number 8 creates repeated failures and delays in financial success.</span>
            </li>
          </ul>

          <div className="bg-red-50 p-4 border-l-4 border-red-500 print:p-3 mt-6">
            <h6 className="font-bold mb-3 flex items-center gap-2 text-red-900"><span className="text-xl">🚨</span> Important Warning: Avoid Property Investments in Your Own Name</h6>
            <ul className="space-y-2 print:space-y-1 text-sm text-justify text-red-900">
              <li className="flex gap-2">
                <span className="font-bold">⚠</span>
                <span><strong>Never buy land or property in your own name</strong>, as it may lead to financial losses, disputes, or forced selling.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">⚠</span>
                <span><strong>If necessary, register the property in a trusted family member's name</strong> who has a strong Earth element in their Lo Shu Grid.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">⚠</span>
                <span><strong>If property is already owned, immediately start balancing Earth elements (2, 5, 8)</strong> to reduce negative effects.</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 border-l-4 border-green-500 print:p-3 mt-6">
            <h6 className="font-bold mb-3 flex items-center gap-2"><span className="text-green-600 text-xl">🔥</span> FEAT Remedy for Missing Earth Elements (2, 5, 8)</h6>
            <p className="mb-3 text-sm text-justify">To restore balance and prevent financial instability, use the following remedies:</p>
            <ul className="space-y-2 print:space-y-1 text-sm text-justify">
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span><strong>Wear Rudrakshas in higher quantities:</strong>
                  <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
                    <li>Wear 2 Mukhi Rudraksha → Balances emotional stability (Missing Number 2 - Moon).</li>
                    <li>Wear 4 Mukhi Rudraksha → Enhances intelligence and decision-making (Missing Number 5 - Mercury).</li>
                    <li>Wear 7 Mukhi Rudraksha → Strengthens financial security and Saturn's blessings (Missing Number 8 - Saturn). And Iron ring in middle finger.</li>
                  </ul>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 35: Earth Elements Remedies & Conclusion --- */}
      <EbookHeaderFooter>
        <div className="space-y-6 mt-6 print:mt-4">
          <ul className="space-y-3 print:space-y-2 text-sm text-justify">
            <li className="flex gap-2">
              <span className="text-black font-bold mt-1">✔</span>
              <span><strong>Walk barefoot on soil daily →</strong> Helps increase Earth energy naturally.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black font-bold mt-1">✔</span>
              <span><strong>Avoid real estate investments in your name →</strong> Instead, invest in other stable assets like gold, mutual funds, or business.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black font-bold mt-1">✔</span>
              <span><strong>Donate food and grains (wheat, rice, and lentils) on Saturdays (Shanivar) and Wednesdays (Budhwar) →</strong> This helps reduce Saturn and Mercury's negative effects.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black font-bold mt-1">✔</span>
              <span><strong>Stay patient in financial decisions →</strong> Avoid impulsive investments, loans, and risky business ventures.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black font-bold mt-1">✔</span>
              <span><strong>Chant planetary mantras for Earth elements daily:</strong>
                <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
                  <li>For Number 2 (Moon) – ॐ "Om Som Somay Namah"</li>
                  <li>For Number 5 (Mercury) – ॐ "Om Budhaya Namah"</li>
                  <li>For Number 8 (Saturn) – ॐ "Om Sham Shanishcharay Namah"</li>
                </ul>
              </span>
            </li>
          </ul>

          <div className="mt-8 border-t-2 border-gray-300 pt-6">
            <h5 className="font-bold mb-4 text-blue-700 flex items-center gap-2"><span className="text-xl">💰</span> Conclusion: Act Immediately to Protect Your Assets & Stability</h5>
            <ul className="space-y-3 print:space-y-2 text-justify text-sm">
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span><strong>Missing all Earth elements (2, 5, 8)</strong> leads to major risks in property ownership, financial struggles, and instability.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span><strong>Avoid purchasing property in your name</strong>, as it may result in losses or forced sales.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span><strong>Use FEAT remedies (Rudraksha, grounding techniques, donations, and mantras)</strong> to balance Earth energy.</span>
              </li>
              <li className="flex gap-2 font-bold italic text-blue-900 mt-4 text-base">
                <span className="text-xl">🚀</span>
                <span>Balance Earth energy to secure your finances, wealth, and stability for the future!</span>
              </li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 36: Lucky, Friendly, Enemy, Neutral Numbers --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-6 font-serif text-center print:text-base">How to calculate Lucky Number, Friendly Numbers, Enemy Numbers and Neutral Numbers?</h4>
        
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border-2 border-black text-sm text-center print:text-[11px]">
            <thead>
              <tr className="bg-[#fff2cc]">
                <th className="border-2 border-black p-2 font-bold">Numbers</th>
                <th className="border-2 border-black p-2 font-bold">Friends</th>
                <th className="border-2 border-black p-2 font-bold">Enemy</th>
                <th className="border-2 border-black p-2 font-bold">Neutral</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border-2 border-black p-1 font-bold">1</td><td className="border-2 border-black p-1">1,2,3,5,6,9</td><td className="border-2 border-black p-1">8</td><td className="border-2 border-black p-1">4,7</td></tr>
              <tr><td className="border-2 border-black p-1 font-bold">2</td><td className="border-2 border-black p-1">1,2,3,5</td><td className="border-2 border-black p-1">8,4,9</td><td className="border-2 border-black p-1">7,6</td></tr>
              <tr><td className="border-2 border-black p-1 font-bold">3</td><td className="border-2 border-black p-1">1,2,3,5</td><td className="border-2 border-black p-1">6</td><td className="border-2 border-black p-1">4,8,7,9</td></tr>
              <tr><td className="border-2 border-black p-1 font-bold">4</td><td className="border-2 border-black p-1">1,5,7,6</td><td className="border-2 border-black p-1">2,9,4,8</td><td className="border-2 border-black p-1">3</td></tr>
              <tr><td className="border-2 border-black p-1 font-bold">5</td><td className="border-2 border-black p-1">1,2,3,5,6</td><td className="border-2 border-black p-1 bg-gray-100">None</td><td className="border-2 border-black p-1">4,7,8,9</td></tr>
              <tr><td className="border-2 border-black p-1 font-bold">6</td><td className="border-2 border-black p-1">1,4,5,6,7</td><td className="border-2 border-black p-1">3</td><td className="border-2 border-black p-1">2,8,9</td></tr>
              <tr><td className="border-2 border-black p-1 font-bold">7</td><td className="border-2 border-black p-1">1,3,5,4,6</td><td className="border-2 border-black p-1 bg-gray-100">None</td><td className="border-2 border-black p-1">8,2,7,9</td></tr>
              <tr><td className="border-2 border-black p-1 font-bold">8</td><td className="border-2 border-black p-1">5,3,6,7</td><td className="border-2 border-black p-1">1,2,4,8</td><td className="border-2 border-black p-1">9</td></tr>
              <tr><td className="border-2 border-black p-1 font-bold">9</td><td className="border-2 border-black p-1">1,3,5</td><td className="border-2 border-black p-1">4,2</td><td className="border-2 border-black p-1">9,7,6,8</td></tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <h5 className="font-bold mb-4 text-blue-800 text-lg">Example –</h5>
            <p className="mb-2 text-sm font-bold">Date of Birth – 9/4/1990</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Moolank</strong> = 9</li>
              <li><strong>Bhagyank</strong> = 9+4+1+9+9+0 = 5</li>
              <li><strong>Friendly Numbers</strong> = 1, 3, 5</li>
              <li><strong>Enemy Numbers</strong> = 4, 2</li>
              <li><strong>Neutral Numbers</strong> = 4, 6, 7, 8, 9</li>
              <li><strong>Lucky Numbers</strong> = 3, 5 (Missing Friendly Numbers)</li>
            </ul>
            <p className="mt-4 text-xs italic text-blue-600 leading-tight">
              # Anyone can check Lucky Numbers, Enemy numbers, neutral numbers and Birth Grid and Name Frequency on "Feat InsightX Software"
            </p>
          </div>
          
          <div className="flex-1 flex flex-col items-center">
            <div className="grid grid-cols-3 w-48 border-2 border-black bg-[#fff6e6] print:w-40 mb-6 text-xl font-bold text-center">
              <div className="border border-black aspect-square flex items-center justify-center">4</div>
              <div className="border border-black aspect-square flex items-center justify-center">9999</div>
              <div className="border border-black aspect-square flex items-center justify-center">2</div>
              <div className="border border-black aspect-square flex items-center justify-center">3</div>
              <div className="border border-black aspect-square flex items-center justify-center">5</div>
              <div className="border border-black aspect-square flex items-center justify-center">7</div>
              <div className="border border-black aspect-square flex items-center justify-center">8</div>
              <div className="border border-black aspect-square flex items-center justify-center">1</div>
              <div className="border border-black aspect-square flex items-center justify-center">6</div>
            </div>

            <div className="bg-[#fce5cd] border border-orange-300 p-3 w-full max-w-sm rounded shadow-sm">
              <div className="flex justify-between items-center bg-[#fce5cd] p-2 rounded mb-2 border border-orange-200">
                <span className="font-bold text-sm text-gray-800">Mulank</span>
                <span className="bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-sm">9</span>
              </div>
              <div className="flex justify-between items-center bg-[#fce5cd] p-2 rounded mb-2 border border-orange-200">
                <span className="font-bold text-sm text-gray-800">Bhagyank</span>
                <span className="bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-sm">5</span>
              </div>
              <div className="flex justify-between items-center bg-[#fce5cd] p-2 rounded mb-4 border border-orange-200">
                <span className="font-bold text-sm text-gray-800">Namayank</span>
                <span className="bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-sm">5*</span>
              </div>
              
              <table className="w-full text-xs text-center border-collapse">
                <tbody>
                  <tr className="bg-[#f4cccc] border border-gray-300">
                    <td className="p-1 font-bold border border-gray-300 text-left">Enemy Numbers</td>
                    <td className="p-1 border border-gray-300 font-bold">2, 4</td>
                  </tr>
                  <tr className="bg-[#cfe2f3] border border-gray-300">
                    <td className="p-1 font-bold border border-gray-300 text-left">Neutral Numbers</td>
                    <td className="p-1 border border-gray-300 font-bold">4, 6, 7, 8, 9</td>
                  </tr>
                  <tr className="bg-[#d9ead3] border border-gray-300">
                    <td className="p-1 font-bold border border-gray-300 text-left">Friendly Numbers</td>
                    <td className="p-1 border border-gray-300 font-bold">1, 3, 5</td>
                  </tr>
                  <tr className="bg-[#b6d7a8] border border-gray-300">
                    <td className="p-1 font-bold border border-gray-300 text-left">★ Lucky Numbers</td>
                    <td className="p-1 border border-gray-300 font-bold">3, 5</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[10px] text-red-600 font-bold mt-2 italic text-center">*It is advised to use lucky Numbers only !!</p>
            </div>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 37: Chaldean Numerology Name Frequency --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Chaldean Numerology Name Frequency Chart</h4>
        
        <p className="mb-4 text-justify text-sm">
          In Chaldean Numerology, each letter in a name is assigned a numerical frequency based on vibrational energy. The Chaldean system differs from the Pythagorean system and is considered more accurate for name numerology calculations because it incorporates planetary influences.
        </p>

        <h5 className="font-bold mb-4 text-blue-800 text-lg flex items-center gap-2"><span className="text-xl">🔠</span> Chaldean Numerology Letter-to-Number Chart</h5>
        
        <div className="flex justify-center mb-6">
          <table className="w-3/4 max-w-md border-collapse border-2 border-black text-sm text-center print:text-[13px]">
            <thead>
              <tr className="bg-[#fff2cc]">
                <th className="border-2 border-black p-2 font-bold w-2/3">Letter</th>
                <th className="border-2 border-black p-2 font-bold w-1/3">Number</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border-2 border-black p-1">A, I, J, Q, Y</td><td className="border-2 border-black p-1 font-bold">1</td></tr>
              <tr><td className="border-2 border-black p-1">B, K, R</td><td className="border-2 border-black p-1 font-bold">2</td></tr>
              <tr><td className="border-2 border-black p-1">C, G, L, S</td><td className="border-2 border-black p-1 font-bold">3</td></tr>
              <tr><td className="border-2 border-black p-1">D, M, T</td><td className="border-2 border-black p-1 font-bold">4</td></tr>
              <tr><td className="border-2 border-black p-1">E, H, N, X</td><td className="border-2 border-black p-1 font-bold">5</td></tr>
              <tr><td className="border-2 border-black p-1">U, V, W</td><td className="border-2 border-black p-1 font-bold">6</td></tr>
              <tr><td className="border-2 border-black p-1">O, Z</td><td className="border-2 border-black p-1 font-bold">7</td></tr>
              <tr><td className="border-2 border-black p-1">F, P</td><td className="border-2 border-black p-1 font-bold">8</td></tr>
            </tbody>
          </table>
        </div>

        <h5 className="font-bold mb-4 text-blue-800 text-lg flex items-center gap-2"><span className="text-xl">📝</span> How to Calculate Name Frequency in Chaldean Numerology</h5>
        <div className="bg-gray-50 p-4 border border-gray-300 rounded mb-6">
          <ul className="space-y-1 text-sm font-semibold">
            <li>Step 1: Write your full name.</li>
            <li>Step 2: Assign the Chaldean number to each letter.</li>
            <li>Step 3: Add up all the numbers to get a total frequency number.</li>
            <li>Step 4: Reduce the total to a single-digit.</li>
          </ul>
        </div>

        <div className="mb-6 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
          <h6 className="font-bold mb-2">Example Calculation:</h6>
          <p className="font-bold text-blue-900 mb-2 italic">Name: "RAHUL"</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>R (2) + A (1) + H (5) + U (6) + L (3) = 17</strong></li>
            <li><strong>1 + 7 = 8</strong></li>
            <li><strong>Final Name Frequency = 8</strong> (Power, karma, wealth, struggles, and justice. - Saturn Energy)</li>
          </ul>
        </div>

        <div className="mt-8 border-t-2 border-gray-300 pt-6">
          <h5 className="font-bold mb-4 text-blue-800 text-lg flex items-center gap-2"><span className="text-2xl">🛠</span> FEAT Theory ABC Insights on Name Energy & Its Impact</h5>
          <ul className="list-disc pl-10 space-y-2 print:pl-6 text-sm text-justify">
            <li>Your name frequency directly influences your elemental balance in FEAT Theory ABC.</li>
            <li>Name energy can increase specific element concentrations in your body, affecting your success, health, and relationships.</li>
            <li>A name with excessive Fire (9) may lead to anger and aggression, while a name with too much Earth (8) can create delays and struggles.</li>
            <li>Choosing a balanced name or modifying it using numerology can harmonize your life energy.</li>
            <li className="font-bold text-red-600">Name frequency never lies on 4, 8, 7. Very problematic frequency.</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500 print:p-3 mt-6">
          <h6 className="font-bold mb-3 flex items-center gap-2 text-yellow-900"><span className="text-xl">🚀</span> Optimize Your Name Energy for Success!</h6>
          <ul className="space-y-1 print:space-y-1 text-sm text-justify">
            <li className="flex gap-2">
              <span className="text-black font-bold">✔</span>
              <span>Calculate your name frequency.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black font-bold">✔</span>
              <span>Check its alignment with your FEAT elemental balance.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black font-bold">✔</span>
              <span>Modify if necessary to create harmony in life.</span>
            </li>
          </ul>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 38: Special Case: Missing Number 3 (Sundar Pichai) --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-6 font-serif text-center print:text-base text-blue-900">
          <span className="text-2xl mr-2">🔷</span> 
          Special Case in FEAT Theory ABC: Missing Number 3 & Present Number 6 or 66 in Loshu Grid, but Still Achieving Great Success in Life
        </h4>
        
        <p className="mb-4 text-justify text-sm">
          Normally, when <strong>Number 3 is missing</strong> in the Lo Shu Grid (which represents the Air/Soft Wood element and controls the energy of Jupiter), it indicates:
        </p>
        <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 text-sm">
          <li>Poor social connectivity.</li>
          <li>Lack of strong support from society or friend circles.</li>
          <li>Fewer career opportunities due to weak public networking.</li>
          <li>Reduced wisdom, learning, and guidance from Jupiter.</li>
        </ul>

        <div className="bg-gray-100 p-4 border-l-4 border-gray-600 print:p-3 mb-8">
          <h5 className="font-bold mb-2 text-lg">Principle –</h5>
          <p className="text-sm font-semibold italic text-justify text-gray-800 leading-relaxed">
            "Whenever the concentration level of the Moolank or Bhagyank becomes the highest in the Lo Shu Grid, the element associated with it becomes both the person's weakness and strength."
          </p>
          <p className="text-sm mt-2 text-justify">
            The key is for the person to understand themselves deeply and figure out how to transform that weakness into their greatest strength.
          </p>
        </div>

        <h5 className="font-bold mb-6 text-blue-800 text-lg">For example –</h5>
        <div className="flex flex-col items-center">
          <p className="font-bold mb-4 text-center">1. Sundar Pichai – 10/06/1972 (Moolank - 1, Bhagyank - 8)</p>
          
          <div className="grid grid-cols-3 w-64 border-2 border-black bg-[#fff6e6] print:w-56 text-2xl font-bold text-center">
            <div className="border border-black aspect-square flex items-center justify-center">8</div>
            <div className="border border-black aspect-square flex items-center justify-center relative">
              <span className="z-10">111</span>
              <div className="absolute inset-0 m-2 border-2 border-green-500 rounded-full opacity-70"></div>
            </div>
            <div className="border border-black aspect-square flex items-center justify-center">6</div>
            <div className="border border-black aspect-square flex items-center justify-center"></div>
            <div className="border border-black aspect-square flex items-center justify-center">9</div>
            <div className="border border-black aspect-square flex items-center justify-center">2</div>
            <div className="border border-black aspect-square flex items-center justify-center"></div>
            <div className="border border-black aspect-square flex items-center justify-center">7</div>
            <div className="border border-black aspect-square flex items-center justify-center"></div>
          </div>
        </div>
      </EbookHeaderFooter>
"""

parts = text.rsplit('</EbookHeaderFooter>', 1)
if len(parts) == 2:
    new_text = parts[0] + '</EbookHeaderFooter>\\n' + pages_jsx + parts[1]
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_text)
    print("SUCCESS: Pages 34-38 appended!")
else:
    print("ERROR: Could not find end insertion point.")
