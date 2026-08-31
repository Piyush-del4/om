import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

pages_jsx = """
      {/* --- PAGE 24: Conclusion of Hard Wood & White Metal Balance --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-6 font-serif text-center print:text-base">Balance Between Hard Wood (4 - Rahu) & White Metal (7 - Ketu)</h4>
        
        <div className="space-y-6 print:space-y-4">
          <div>
            <ul className="list-disc pl-10 space-y-2 print:pl-6 text-sm text-justify">
              <li>
                <strong>Balanced 4 & 7</strong>
                <ul className="list-circle pl-8 mt-1 space-y-1 text-gray-700">
                  <li>Strong analytical thinking (4) and deep intuition (7)</li>
                  <li>Ability to plan and execute ideas with a futuristic approach</li>
                  <li>Logical yet spiritual — best of both worlds</li>
                </ul>
              </li>
              <li>
                <strong>Excess 4, Less 7</strong>
                <ul className="list-circle pl-8 mt-1 space-y-1 text-gray-700">
                  <li>Too logical, lacking spiritual awareness</li>
                  <li>Stuck in materialistic achievements without deeper meaning</li>
                  <li>Fear of unexpected failures due to lack of intuition</li>
                </ul>
              </li>
              <li>
                <strong>Excess 7, Less 4</strong>
                <ul className="list-circle pl-8 mt-1 space-y-1 text-gray-700">
                  <li>Highly spiritual but lacks practical execution</li>
                  <li>Dreams big but struggles to plan effectively</li>
                  <li>Too detached, missing financial or career growth</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 border-l-4 border-blue-500 print:p-3">
            <h5 className="font-bold mb-3 text-lg">How to Maintain Balance?</h5>
            <ul className="list-disc pl-6 space-y-2 text-sm text-justify">
              <li>If 4 is missing, increase Rahu's stability (wear 8 Mukhi Rudraksha)</li>
              <li>If 7 is missing, enhance Ketu's guidance (meditate, wear 9 Mukhi Rudraksha)</li>
              <li>If 4 is excessive, donate hard wood-based items to reduce overthinking</li>
              <li>If 7 is excessive, engage in practical work to avoid excessive detachment</li>
            </ul>
          </div>

          <div className="mt-8 border-t-2 border-gray-300 pt-6">
            <h5 className="font-bold mb-4 text-blue-800 text-xl flex items-center gap-2">Final Conclusion</h5>
            <ul className="list-disc pl-10 space-y-2 print:pl-6 text-sm text-justify">
              <li>Number 4 (Hard Wood - Rahu) gives logic, planning, and practicality</li>
              <li>Number 7 (White Metal - Ketu) gives intuition, wisdom, and detachment</li>
              <li>A balance between 4 & 7 ensures both material success and spiritual growth</li>
              <li>If imbalanced, life becomes either too materialistic or too detached, causing struggles</li>
              <li className="font-bold text-black italic mt-4">By maintaining a proper Hard Wood (4) - White Metal (7) balance, one can achieve both worldly success and inner peace in life.</li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 25: Number 2 (Earth Element) Detailed Description --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-6 font-serif text-center print:text-base">Number 2 (Earth Element) in FEAT Theory ABC – Detailed Description</h4>
        
        <p className="mb-4 text-justify">
          In FEAT Theory ABC, Number 2 represents the Earth element, which plays a vital role in:
        </p>
        <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 font-semibold">
          <li>Emotional strength & stability</li>
          <li>Grounding & balance in relationships</li>
          <li>Ability to manage personal and social connections</li>
          <li>Reaction to emotional challenges & mood stability</li>
        </ul>
        <p className="mb-6 text-justify text-sm italic">
          Since Number 2 (Earth element) controls the energy of the Moon (Chandra), its balance or imbalance directly affects emotional strength and stability in relationships.
        </p>

        <h5 className="font-bold mb-4 text-xl text-blue-800">Key Characteristics of Number 2 (Earth Element)</h5>
        
        <div className="space-y-5">
          <div>
            <h6 className="font-bold flex items-center gap-2 text-lg"><span className="text-blue-500">❖</span> Emotional Strength & Stability</h6>
            <ul className="list-disc pl-10 space-y-1 mt-2 print:pl-6 text-sm text-justify">
              <li>The Earth element determines a person's emotional strength.</li>
              <li>A balanced Earth element (2) ensures mental peace, emotional control, and the ability to handle challenges calmly.</li>
              <li>If imbalanced, it leads to emotional struggles, mood swings, and difficulties in relationships.</li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold flex items-center gap-2 text-lg"><span className="text-blue-500">❖</span> Grounding & Relationship Stability</h6>
            <ul className="list-disc pl-10 space-y-1 mt-2 print:pl-6 text-sm text-justify">
              <li>The Earth element keeps a person grounded and helps them maintain long-term relationships.</li>
              <li><strong>Balanced Earth (2)</strong> → Strong relationships, trust, and emotional security.</li>
              <li><strong>If missing</strong> → Difficulty in managing relationships, leading to distance and misunderstandings.</li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold flex items-center gap-2 text-lg"><span className="text-blue-500">❖</span> Reaction to Emotional Challenges</h6>
            <ul className="list-disc pl-10 space-y-1 mt-2 print:pl-6 text-sm text-justify">
              <li><strong>Balanced Earth (2)</strong> → Handles emotional stress with patience and calmness.</li>
              <li><strong>Excessive Earth (22, 222, 2222)</strong> → Becomes overly emotional, deeply affected by personal relationships.</li>
              <li><strong>Missing Earth (0)</strong> → Emotionally detached, struggles to express feelings in relationships.</li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold flex items-center gap-2 text-lg"><span className="text-blue-500">❖</span> Mood Stability</h6>
            <ul className="list-disc pl-10 space-y-1 mt-2 print:pl-6 text-sm text-justify">
              <li><strong>Balanced Earth (2)</strong> → Keeps mood stable, helping a person stay emotionally strong.</li>
              <li><strong>Excess Earth (2)</strong> → Causes mood swings, sudden emotional shifts (one moment happy, next moment annoyed).</li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 26: Impact of Number 2 in the Lo Shu Grid --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-6 font-serif text-center print:text-base">Impact of Number 2 (Earth Element) in the Lo Shu Grid</h4>
        
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border-2 border-black text-sm text-justify print:text-[11px]">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-2 border-black p-2 font-bold w-1/3">Earth Element (2) in Lo Shu Grid</th>
                <th className="border-2 border-black p-2 font-bold">Meaning & Effect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-black p-2 font-bold">Missing (0 times)</td>
                <td className="border-2 border-black p-2">Struggles to maintain relationships, emotional disconnection, misunderstandings in personal life.</td>
              </tr>
              <tr>
                <td className="border-2 border-black p-2 font-bold">Present Once (Balanced - 50%)</td>
                <td className="border-2 border-black p-2">Emotionally stable, manages relationships well, strong emotional strength.</td>
              </tr>
              <tr>
                <td className="border-2 border-black p-2 font-bold">Present Twice (100%) - Imbalanced</td>
                <td className="border-2 border-black p-2">Overly emotional, gets deeply affected by relationships, minor mood swings.</td>
              </tr>
              <tr>
                <td className="border-2 border-black p-2 font-bold">Present Three Times (150%)</td>
                <td className="border-2 border-black p-2">High emotional sensitivity, frequent mood swings, mentally disturbed.</td>
              </tr>
              <tr>
                <td className="border-2 border-black p-2 font-bold text-red-600 bg-red-50">Present Four or More Times (200%+)</td>
                <td className="border-2 border-black p-2 text-red-600 bg-red-50">Extreme emotional instability, unable to control emotions, deep emotional distress.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h5 className="font-bold mb-4 text-xl text-blue-800">Impact of Earth Element (2) Imbalance in Life</h5>
        
        <div className="space-y-6">
          <div>
            <h6 className="font-bold text-lg mb-2">1. If Earth (2) is Missing in the Lo Shu Grid</h6>
            <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm text-justify">
              <li>Lack of emotional control and difficulty in maintaining relationships.</li>
              <li>Unknowingly makes mistakes that hurt relationships, leading to misunderstandings.</li>
              <li>Emotions do not develop properly, causing emotional detachment.</li>
              <li>Relatives and partners misunderstand them, thinking they don't value relationships or emotions.</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 border-l-4 border-green-500 print:p-3">
            <h6 className="font-bold text-lg mb-2">Remedies for Earth Element (2) Imbalance</h6>
            <p className="font-bold mb-2">1. If Earth (2) is Missing</p>
            <ul className="list-circle pl-8 space-y-1 text-sm">
              <li>Increase Earth element (2) by:
                <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
                  <li>Practicing emotional awareness and mindfulness.</li>
                  <li>Wearing a 2 Mukhi Rudraksha to enhancing earth element (Number 2).</li>
                  <li>Chant mantra daily – Om Som Somay Namah</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 27: Number 2 Excessive Impact & Conclusion --- */}
      <EbookHeaderFooter>
        <div className="space-y-6 mt-6 print:mt-4">
          <div>
            <h6 className="font-bold text-lg mb-2">2. If Earth (2) is Excessive (More than 100%)</h6>
            <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm text-justify">
              <li>Highly emotional in relationships, deeply affected by emotional issues.</li>
              <li>Frequent mood swings, sudden happiness or anger without reason.</li>
              <li>Mentally disturbed due to emotional overload, leading to stress and inner turmoil.</li>
              <li>Finds it hard to control emotions, making personal and professional life unstable.</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-4 border-l-4 border-orange-500 print:p-3 mt-6">
            <p className="font-bold mb-2">2. If Earth (2) is Excessive</p>
            <ul className="list-circle pl-8 space-y-1 text-sm text-justify">
              <li>Reduce excess Earth element by:
                <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
                  <li>Avoiding overattachment to relationships.</li>
                  <li>Developing logical thinking over emotional reactions.</li>
                  <li>Practicing meditation to control mood swings.</li>
                  <li>You should offer milk and water to Lord Shiva and worship Him daily or at least on Mondays.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mt-8 border-t-2 border-gray-300 pt-6">
            <h5 className="font-bold mb-4 text-blue-800 text-xl flex items-center gap-2">Conclusion</h5>
            <ul className="list-disc pl-10 space-y-2 print:pl-6 text-sm text-justify">
              <li>Number 2 (Earth element) plays a major role in emotional stability, relationships, and mental grounding.</li>
              <li>A balanced Earth element ensures a stable mind and healthy relationships, while an imbalanced Earth element can lead to mood swings, emotional distress, and struggles in personal life.</li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 28: Number 5 (Earth Element) - Power of Stability --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-6 font-serif text-center print:text-base">Earth Element (Number 5) in FEAT Theory ABC – The Power of Stability & Intelligence</h4>
        
        <div className="flex justify-center gap-8 mb-6 text-4xl">
          <span>🌍</span>
          <span>🧠</span>
          <span>🧩</span>
        </div>

        <p className="mb-4 text-justify">
          In FEAT Theory ABC, the Earth Element (Number 5) controls the energy of Mercury (Budh), which governs:
        </p>
        <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 font-semibold">
          <li>Intelligence, logic, and memory</li>
          <li>Business skills, financial management, and analytical ability</li>
          <li>Crisis management and problem-solving</li>
          <li>Adaptability and presence of mind</li>
        </ul>
        <p className="mb-6 text-justify text-sm italic">
          A balanced Earth element (5) ensures sharp memory, smart decision-making, and the ability to manage life's challenges effectively. However, an imbalance (either excess or deficiency) creates struggles in handling problems, lack of satisfaction, and difficulties in achieving success.
        </p>

        <h5 className="font-bold mb-4 text-xl text-blue-800"><span className="text-2xl">✡</span> Impact of Earth Element (Number 5) Imbalance</h5>
        
        <div className="space-y-6">
          <div>
            <h6 className="font-bold text-lg mb-2">If Earth Element (5) is Present (Balanced State)</h6>
            <ul className="space-y-2 print:space-y-1 text-sm text-justify">
              <li className="flex gap-2">
                <span className="text-black font-bold mt-1">✔</span>
                <span><strong>Strong memory power -</strong> The person can retain knowledge, recall information quickly, and apply intelligence efficiently.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold mt-1">✔</span>
                <span><strong>Good decision-making ability -</strong> They are practical, logical, and make informed decisions.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold mt-1">✔</span>
                <span><strong>Business skills & financial growth -</strong> The person has entrepreneurial qualities and manages business effectively.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold mt-1">✔</span>
                <span><strong>Crisis management skills -</strong> When challenges arise, they can handle problems with ease and find solutions.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold mt-1">✔</span>
                <span><strong>Life satisfaction & stability -</strong> A stable mind that can enjoy life, relationships, and success.</span>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-lg mb-2 mt-6">If Earth Element (5) is Missing (Number 5 Absent in Lo Shu Grid)</h6>
            <ul className="space-y-2 print:space-y-1 text-sm text-justify">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Weak problem-solving ability -</strong> When difficulties arise, the person feels lost, struggles to find solutions, and cannot manage crises effectively.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Lack of satisfaction in life -</strong> They always feel something is missing and struggle to achieve true happiness.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Business struggles & instability -</strong> Difficulty in managing business, making the right financial decisions, and handling risks.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Weak presence of mind -</strong> They may appear confused, indecisive, and unable to utilize their intelligence properly.</span>
              </li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>
"""

parts = text.rsplit('</EbookHeaderFooter>', 1)
if len(parts) == 2:
    new_text = parts[0] + '</EbookHeaderFooter>\\n' + pages_jsx + parts[1]
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_text)
    print("SUCCESS: Pages 24-28 appended!")
else:
    print("ERROR: Could not find insertion point.")
