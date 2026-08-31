import codecs

insertion_marker = '      {/* --- PAGE 10: How to measure concentration --- */}'

pages_jsx = """
      {/* --- PAGE 10: Number 1 (Water Element) Detailed Description --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Number 1 (Water Element) – Detailed Description in FEAN Method Astrology</h4>
        <p className="mb-4">In FEAN Method Astrology, Number 1 represents the Water element, which plays a vital role in:</p>
        <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 font-semibold">
          <li>Speaking ability & word expression</li>
          <li>Mind behavior & reactions</li>
          <li>Introvert or extrovert nature</li>
          <li>Bone strength & veins</li>
          <li>Thinking ability & decision-making</li>
        </ul>
        <p className="mb-6 text-justify">
          Water element in our body Controls the energy of: <strong>Sun (Surya)</strong>.
        </p>
        <ul className="list-disc pl-10 space-y-2 mb-6 print:pl-6 text-justify">
          <li>
            <strong>The Water element controls the energy of the Sun (Surya).</strong> Therefore, an imbalance in the Water element increases the chances of a person experiencing bone-related and heart-related health issues. Additionally, it can lead to increased struggles and problems in the life of their father.
          </li>
        </ul>
        <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400 mb-8 print:p-2 print:mb-4 text-justify">
          Unlike common misconceptions, <strong>the Water element does NOT control emotions, relationships, or mood swings</strong> - those are governed by other elements, particularly the Earth element (Number 2).
        </div>

        <h5 className="font-bold mb-4 underline">Some Terminology Used –</h5>
        <ul className="list-disc pl-10 space-y-1 mb-8 print:pl-6">
          <li>Element is <strong>Balanced</strong></li>
          <li>Element is <strong>imbalanced</strong></li>
          <li>Element is <strong>Missing</strong></li>
        </ul>

        {/* 3 Grid Examples Side-by-Side */}
        <div className="flex justify-between items-end gap-2">
          <div className="text-center flex-1">
            <div className="grid grid-cols-3 border-2 border-black bg-[#fff6e6] mx-auto w-24 print:w-20 mb-2">
              <div className="border border-black flex items-center justify-center h-8 font-bold">4</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">9</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">2</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">3</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">5</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">7</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">8</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold text-lg">1</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">6</div>
            </div>
            <p className="font-semibold text-sm">(Balanced)</p>
          </div>
          <div className="text-center flex-1">
            <div className="grid grid-cols-3 border-2 border-black bg-[#fff6e6] mx-auto w-24 print:w-20 mb-2">
              <div className="border border-black flex items-center justify-center h-8 font-bold">4</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">9</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">2</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">3</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">5</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">7</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">8</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold text-lg text-red-600">111</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">6</div>
            </div>
            <p className="font-semibold text-sm">(imbalanced)</p>
          </div>
          <div className="text-center flex-1">
            <div className="grid grid-cols-3 border-2 border-black bg-[#fff6e6] mx-auto w-24 print:w-20 mb-2">
              <div className="border border-black flex items-center justify-center h-8 font-bold">4</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">9</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">2</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">3</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">5</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">7</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">8</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold text-xl text-gray-400">*</div>
              <div className="border border-black flex items-center justify-center h-8 font-bold">6</div>
            </div>
            <p className="font-semibold text-sm">*(Missing Element)</p>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 11: Key Characteristics of Number 1 --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-6 font-serif text-center print:text-base">Key Characteristics of Number 1 (Water Element)</h4>
        
        <div className="space-y-6 text-justify print:space-y-4">
          <div>
            <h5 className="font-bold flex items-center gap-2 mb-1">
              <span className="text-xl">❖</span> Speaking Ability & Expression of Words
            </h5>
            <ul className="list-disc pl-10 space-y-1 print:pl-6">
              <li>The Water element determines <strong>how effectively a person speaks and expresses thoughts.</strong></li>
              <li>A <strong>balanced Water element makes a person a good speaker</strong> with clear and confident speech.</li>
              <li>If <strong>Water is excessive than Fire, the person talks too much</strong> and may lack listening skills.</li>
              <li>If <strong>Water is missing, the person struggles to express words properly</strong> and may hesitate in conversations.</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold flex items-center gap-2 mb-1">
              <span className="text-xl">❖</span> Mind Behavior & Reaction to Situations
            </h5>
            <ul className="list-disc pl-10 space-y-1 print:pl-6">
              <li>Water controls <strong>how the mind reacts to different situations.</strong></li>
              <li>A <strong>balanced Water element keeps the mind calm, focused, and sharp.</strong></li>
              <li>If <strong>Water is excessive than Fire, the mind overreacts or becomes hyperactive.</strong></li>
              <li>If <strong>Water is missing, the person may struggle to respond quickly</strong> to challenges.</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold flex items-center gap-2 mb-1">
              <span className="text-xl">❖</span> Introvert or Extrovert Nature
            </h5>
            <ul className="list-disc pl-10 space-y-1 print:pl-6">
              <li>Water determines if a person is an introvert or extrovert.</li>
              <li><strong>More Water than Fire (9) →</strong> The person is <strong>extroverted</strong>, enjoys speaking, and socializes easily.</li>
              <li><strong>Less Water than Fire →</strong> The person is <strong>introverted</strong>, reserved, and prefers listening over talking.</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold flex items-center gap-2 mb-1">
              <span className="text-xl">❖</span> Bone Strength & Immunity
            </h5>
            <ul className="list-disc pl-10 space-y-1 print:pl-6">
              <li><strong>The Water element supports bone health and overall immunity.</strong></li>
              <li>If <strong>balanced, the person has strong bones and resistance to diseases.</strong></li>
              <li>If <strong>excessive than Fire, it may cause weaker bones, joint pain or reduced immunity.</strong></li>
              <li>If <strong>missing, the person may have bone-related health issues</strong>, weak bones, sometimes chances of injury & fracture of bones.</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold flex items-center gap-2 mb-1">
              <span className="text-xl">❖</span> Thinking Ability & Decision-Making
            </h5>
            <ul className="list-disc pl-10 space-y-1 print:pl-6">
              <li>Water controls how a person thinks and makes decisions.</li>
              <li>A balanced Water element allows logical, clear, and quick decision-making.</li>
              <li>If Water is excessive compared to Fire:
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>The person overthinks too much, making decision-making difficult.</li>
                  <li>Lacks presence of mind and struggles to stay focused.</li>
                  <li>Unable to handle pressure in life and often give-up during tough times.</li>
                  <li>Sometimes experiences depression phases.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 12: Impact & Remedies for Number 1 --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Impact of Number 1 (Water Element) in the Lo Shu Grid</h4>
        
        <table className="w-full border-collapse border border-black text-sm mb-6 print:text-sm">
          <thead>
            <tr className="bg-[#fff2cc]">
              <th className="border border-black p-2 font-bold text-left w-1/3">Water Element (1) in Lo Shu Grid</th>
              <th className="border border-black p-2 font-bold text-left">Meaning & Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2 font-semibold">Missing (0 times)</td>
              <td className="border border-black p-2 text-justify">Weak speaking ability, difficulty in expressing thoughts, introverted nature, weak bones and veins problems.</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Present Once (Balanced - 50%)</td>
              <td className="border border-black p-2 text-justify">Good speaking skills, clear thinking, balanced introvert-extrovert nature, strong bones, good immunity.</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Present Twice (100%) - Imbalanced</td>
              <td className="border border-black p-2 text-justify">Over-talking, overreaction of mind, strong extrovert behavior, weak listening ability.</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Present Three Times (150%)</td>
              <td className="border border-black p-2 text-justify">Excessive talking, hyperactive mind, lack of focus, lower immunity.</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Present Four or More Times (200%+)</td>
              <td className="border border-black p-2 text-justify">Talking too much, loss of speech control, constant mind distraction, weak bones, unstable thinking.</td>
            </tr>
          </tbody>
        </table>

        <h5 className="font-bold mb-2 text-lg">Impact of Water Element Imbalance in Life</h5>
        <div className="space-y-4 mb-6 text-justify">
          <div>
            <span className="font-bold underline decoration-red-400">1. If Water (1) is Missing in the Lo Shu Grid</span>
            <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
              <li>Difficulty in speaking properly.</li>
              <li>Hesitation in expressing words and forming sentences.</li>
              <li>Struggles in public speaking, leadership, and debates.</li>
              <li>Weak confidence in presenting ideas.</li>
              <li>Weak bones and veins problems.</li>
            </ul>
          </div>
          <div>
            <span className="font-bold underline decoration-red-400">2. If Water (1) is Excessive (More than 100%) than Fire</span>
            <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
              <li>Talks too much, lacks listening skills.</li>
              <li>Mind overreacts quickly.</li>
              <li>Becomes too extroverted, hyperactive.</li>
              <li>Weaker immunity due to imbalance.</li>
            </ul>
          </div>
        </div>

        <h5 className="font-bold mb-2 text-lg">Remedies for Water Element Imbalance</h5>
        <div className="space-y-4 mb-6 text-justify">
          <div>
            <span className="font-bold underline">1. If Water (1) is Missing</span>
            <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
              <li><strong>Increase Water element by:</strong>
                <ul className="list-circle pl-6 mt-1">
                  <li>Drinking more water mindfully every day.</li>
                  <li>Carrying a water bottle at all times, even while sleeping.</li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <span className="font-bold underline">2. If Water (1) is Excessive</span>
            <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
              <li><strong>Reduce excess Water element by:</strong>
                <ul className="list-circle pl-6 mt-1">
                  <li>Practicing control over excessive speaking.</li>
                  <li>Donating water bottles to the needy.</li>
                  <li>Meditating to balance mind reactions.</li>
                  <li>As we know water element (1) controls the energy of Sun, <strong>Chanting the Surya Mantra ("Om Suryay Namah")</strong> daily to balance the Sun's energy.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <h5 className="font-bold mb-2 text-lg">Conclusion</h5>
        <p className="text-justify">
          Number 1 (Water element) plays a major role in <strong>speaking ability, confidence, mind reactions, introvert-extrovert nature, bone health, and veins.</strong> A balanced Water element ensures a sharp mind, strong speech, and good immunity, while an imbalanced Water element can lead to over-talking, weak decision-making, or poor health.
        </p>
      </EbookHeaderFooter>

      {/* --- PAGE 13: Fire Element (Number 9) Deep Dive --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-4 font-serif text-center flex justify-center items-center gap-2 print:text-base">
          <span className="text-orange-500">🔥</span> Fire Element (Number 9) in FEAT Method Astrology <span className="text-orange-500">🔥</span>
        </h4>
        <p className="mb-6 text-justify">
          In FEAN Method Astrology, the Fire element (Number 9) plays a crucial role in shaping an individual's <strong>confidence, willpower, decision-making ability, energy levels, and leadership qualities.</strong> Fire energy is directly connected to <strong>Mars (Mangal)</strong>, which represents <strong>strength, courage, aggression, and quick action.</strong>
        </p>

        <h5 className="font-bold mb-4 flex items-center gap-2 text-blue-800">
          <span className="text-xl">⚛</span> Significance of Fire Element in Life:
        </h5>
        
        <ul className="list-disc pl-10 space-y-2 mb-8 print:pl-6 text-justify">
          <li><strong>Boosts Confidence & Willpower:</strong> A balanced Fire element helps a person stay confident, courageous, and proactive in life.</li>
          <li><strong>Controls Energy & Motivation:</strong> Fire provides the passion and drive needed to take action and achieve success.</li>
          <li><strong>Determines Leadership Ability:</strong> A strong Fire element creates natural leaders with a commanding presence.</li>
          <li><strong>Enhances Decision-Making Skills:</strong> Fire ensures quick, bold, and firm decisions under pressure.</li>
          <li><strong>Controls Anger & Aggression:</strong> An excessive Fire element can lead to short temper, impulsive behavior, and frustration.</li>
          <li><strong>Manages Physical Strength & Stamina:</strong> Fire supports muscle strength, immunity, and metabolism.</li>
        </ul>

        <div className="bg-yellow-50 p-4 border border-yellow-300 rounded-md mb-8 flex items-start gap-4 print:p-2 print:mb-4">
          <span className="text-3xl text-blue-400">🌊</span>
          <div>
            <h5 className="font-bold mb-1 text-blue-800">If Fire Element is Missing (Number 9 is Absent in Lo Shu Grid)</h5>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Confidence Issues:</strong> The person feels weak, demotivated, and lacks courage.</li>
              <li><strong>Fear & Anxiety:</strong> They experience overthinking, hesitation, and fear while making decisions.</li>
              <li><strong>Poor Presence of Mind:</strong> Difficulty in recalling information while speaking.</li>
              <li><strong>Struggles in High-Pressure Situations:</strong> The person avoids risks, panics under stress, and gives up easily.</li>
              <li><strong>Physical Weakness:</strong> Affected bone health, low immunity, and low energy levels.</li>
              <li><strong>Bathing Issue:</strong> After taking a bath, such individuals feel tired, anxious, and less confident due to Water dominating Fire.</li>
            </ul>
          </div>
        </div>

        <h5 className="font-bold mb-2 flex items-center gap-2 text-blue-800">
          <span className="text-xl">☁</span> Fire Element Imbalance & Its Effects
        </h5>
        <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-50 print:mb-2 print:p-2">
          <p className="font-bold text-red-700 flex items-center gap-2">
            <span className="text-lg">💡</span> FEAT Remedy:
          </p>
          <ul className="list-none pl-6 mt-2 space-y-2 font-semibold">
            <li>✔ Wear 3 Mukhi Rudraksha to enhance Fire energy.</li>
            <li>✔ Carry Match Masala (Matchsticks) in Pocket to compensate for missing Fire.</li>
          </ul>
        </div>
      </EbookHeaderFooter>
"""

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

if insertion_marker in text:
    new_text = text.replace(insertion_marker, pages_jsx + '\n' + insertion_marker)
    # Also fix the page 10 marker to page 14
    new_text = new_text.replace(' {/* --- PAGE 10: How to measure concentration --- */}', ' {/* --- PAGE 14: How to measure concentration --- */}')
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_text)
    print("SUCCESS: 4 pages inserted.")
else:
    print("ERROR: Insertion marker not found.")
