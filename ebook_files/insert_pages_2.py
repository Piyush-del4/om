import codecs

insertion_marker = '      {/* --- PAGE 14: How to measure concentration --- */}'

pages_jsx = """
      {/* --- PAGE 14: Fire Element (Number 9) Continued --- */}
      <EbookHeaderFooter>
        <div className="bg-red-50 p-4 border border-red-300 rounded-md mb-6 print:p-2 print:mb-4">
          <h5 className="font-bold mb-1 text-red-800">If Fire Element is Excessive (Number 9 appears multiple times: 99, 999, etc.)</h5>
          <ul className="list-disc pl-6 space-y-1 text-sm text-justify">
            <li><strong>Short Temper & Anger Issues:</strong> The person gets irritated and reacts aggressively.</li>
            <li><strong>Overconfidence & Impulsiveness:</strong> Quick decisions without proper analysis lead to mistakes & losses.</li>
            <li><strong>Health Issues:</strong> Risk of blood pressure problems, thyroid, diabetes, and body heat-related issues.</li>
            <li><strong>Relationship Problems:</strong> Fire dominance can cause ego clashes, dominance, and stubborn behavior.</li>
          </ul>
        </div>

        <h5 className="font-bold mb-2 flex items-center gap-2 text-red-800">
          <span className="text-xl">💡</span> FEAT Remedy:
        </h5>
        <ul className="list-none pl-6 space-y-2 mb-6 text-sm text-justify">
          <li>✔ <strong>Donate Fire-related items (matchboxes, gas cylinders) on the 9th, 18th, or 27th of every month.</strong></li>
          <li>✔ <strong>Consume cooling foods like coconut water to balance Fire.</strong></li>
        </ul>

        <h5 className="font-bold mb-2 flex items-center gap-2 text-blue-800">
          <span className="text-xl">☯</span> Match Masala (Matchsticks) Remedy Based on Age
        </h5>
        <p className="mb-4 text-sm text-justify">
          In FEAN Method Astrology, the number of matchsticks to be carried in the pocket varies by age to regulate Fire energy effectively.
        </p>

        <table className="w-full border-collapse border border-black text-[13px] mb-6 print:text-[12px] max-w-xl mx-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-1 font-bold text-left">Age Group</th>
              <th className="border border-black p-1 font-bold text-left">Number of Matchsticks to Carry</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-black p-1">Below 5 Years</td><td className="border border-black p-1">Carry only 3 matchstick</td></tr>
            <tr><td className="border border-black p-1">5 to 10 Years</td><td className="border border-black p-1">Carry 7 matchsticks</td></tr>
            <tr><td className="border border-black p-1">11 to 20 Years</td><td className="border border-black p-1">Carry 9 matchsticks</td></tr>
            <tr><td className="border border-black p-1">21 to 30 Years</td><td className="border border-black p-1">Carry 20 matchsticks</td></tr>
            <tr><td className="border border-black p-1">31 to 40 Years</td><td className="border border-black p-1">Carry 25 matchsticks</td></tr>
            <tr><td className="border border-black p-1">41 to 50 Years</td><td className="border border-black p-1">Carry 25 matchsticks</td></tr>
            <tr><td className="border border-black p-1">51 Years & Above</td><td className="border border-black p-1">Carry 25 matchsticks</td></tr>
          </tbody>
        </table>

        <h5 className="font-bold mb-2 flex items-center gap-2 text-red-800">
          <span className="text-xl">🔥</span> How Match Box Masala Helps in Fire Balance
        </h5>
        <ul className="list-none pl-6 space-y-2 text-sm text-justify">
          <li>✔ <strong>Carrying Match Masala increases Fire element in the body, helping to boost confidence and remove fear.</strong></li>
          <li>✔ <strong>Prevents anxiety, hesitation, and overthinking, ensuring a balanced Fire-Water state.</strong></li>
          <li>✔ <strong>Highly recommended for people who lack Fire (Number 9 missing in Lo Shu Grid).</strong></li>
        </ul>
      </EbookHeaderFooter>

      {/* --- PAGE 15: Fire Element Conclusion & Cases --- */}
      <EbookHeaderFooter>
        <h5 className="font-bold mb-2 flex items-center gap-2 text-red-800">
          <span className="text-xl">🔥</span> Conclusion: Balancing Fire for a Successful Life
        </h5>
        <p className="mb-6 text-justify">
          A well-balanced Fire element ensures a <strong>strong personality, fearless decision-making, high motivation, and a leadership mindset.</strong> Whether you have low Fire or excessive Fire, following FEAN Method Astrology remedies will help you achieve balance and overcome life's challenges with confidence.
        </p>

        <h5 className="font-bold mb-4 flex items-center gap-2 text-blue-800">
          <span className="text-xl">🚀</span> Empower your Fire element – Stay Confident, Fearless, and Victorious!
        </h5>

        <h5 className="font-bold mb-4 underline">Cases-</h5>
        
        <div className="space-y-6 print:space-y-4">
          {/* Case 1 */}
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-3 w-32 border-2 border-black bg-[#fff6e6] print:w-24 shrink-0">
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold text-lg">9</div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold text-lg">1</div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
            </div>
            <p className="font-bold text-sm">(Balanced i.e Water = Fire)</p>
          </div>

          {/* Case 2 */}
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-3 w-32 border-2 border-black bg-[#fff6e6] print:w-24 shrink-0">
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold text-lg">9</div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold text-lg">11</div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
            </div>
            <p className="font-bold text-sm">(Imbalanced i.e Water &gt; Fire)</p>
          </div>

          {/* Case 3 */}
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-3 w-32 border-2 border-black bg-[#fff6e6] print:w-24 shrink-0">
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold text-lg">99</div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold text-lg">1</div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
            </div>
            <p className="font-bold text-sm">(Imbalanced i.e Water &lt; Fire)</p>
          </div>

          {/* Case 4 */}
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-3 w-32 border-2 border-black bg-[#fff6e6] print:w-24 shrink-0">
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold text-lg">999</div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
              <div className="border border-black flex items-center justify-center h-10 font-bold text-lg">111</div>
              <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
            </div>
            <p className="font-bold text-sm">(Balanced i.e Water = Fire)</p>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 16: Number 3 (Soft Wood) Detailed Description --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Number 3 (Soft Wood/Air Element) in FEAN Method Astrology – Detailed Description</h4>
        <p className="mb-4 text-justify">
          In FEAN Method Astrology, Number 3 represents the <strong>Soft Wood/Air element</strong>, which plays a key role in:
        </p>
        <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 font-semibold">
          <li>Social connectivity</li>
          <li>Growth, learning & adaptability</li>
          <li>Opportunities & career success</li>
          <li>Influence of Jupiter (Guru)</li>
        </ul>
        <p className="mb-6 text-justify">
          Since Number 3 (Soft Wood) controls the energy of <strong>Jupiter (Guru)</strong>, its balance or imbalance directly affects social interactions, learning abilities, and career growth.
        </p>

        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-3 border-2 border-black bg-[#fff6e6] w-32 print:w-24">
            <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
            <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
            <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
            <div className="border border-black flex flex-col items-center justify-center h-10 bg-orange-200">
              <span className="font-bold leading-none">3</span>
              <span className="text-[9px] leading-tight">(Soft Wood)</span>
            </div>
            <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
            <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
            <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
            <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
            <div className="border border-black flex items-center justify-center h-10 font-bold"></div>
          </div>
        </div>

        <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Key Characteristics of Number 3 (Soft Wood Element)</h4>
        
        <div className="space-y-4 text-justify print:space-y-3">
          <div>
            <h5 className="font-bold flex items-center gap-2 mb-1">
              <span className="text-xl">❖</span> Social Connectivity & Support from Society
            </h5>
            <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
              <li>The Soft Wood element determines <strong>how supportive society will be for an individual.</strong></li>
              <li>A <strong>balanced Soft Wood (3) ensures strong friendships and positive relationships.</strong></li>
              <li>If <strong>imbalanced, it causes difficulties in making trustworthy connections and always miss use by others.</strong></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold flex items-center gap-2 mb-1">
              <span className="text-xl">❖</span> Growth, Learning & Adaptability
            </h5>
            <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
              <li>Number 3 represents <strong>growth, learning ability, and adaptability to new situations.</strong></li>
              <li><strong>Balanced Soft Wood (3) &rarr;</strong> Strong learning capacity, intelligence, and curiosity.</li>
              <li><strong>If missing &rarr;</strong> Struggles in learning new things, slow grasping ability, and limited adaptability.</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold flex items-center gap-2 mb-1">
              <span className="text-xl">❖</span> Career Growth & Opportunities
            </h5>
            <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
              <li><strong>Balanced Soft Wood (3) &rarr;</strong> Brings career success and new opportunities.</li>
              <li><strong>If missing &rarr;</strong> Limited career opportunities and difficulty finding supportive mentors.</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold flex items-center gap-2 mb-1">
              <span className="text-xl">❖</span> Influence of Jupiter (Guru)
            </h5>
            <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
              <li><strong>Balanced Soft Wood (3) &rarr;</strong> Strong Jupiter energy, wise decision-making, and career stability.</li>
              <li><strong>If missing &rarr;</strong> Weak Jupiter influence, reduced wisdom, and struggles in professional growth.</li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 17: Number 3 Impact, Remedies, Conclusion --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Impact of Number 3 (Soft Wood Element) in the Lo Shu Grid</h4>
        
        <table className="w-full border-collapse border border-black text-[13px] mb-6 print:text-[11px]">
          <thead>
            <tr className="bg-[#fff2cc]">
              <th className="border border-black p-1 font-bold text-left w-1/3">Soft Wood Element (3) in Lo Shu Grid</th>
              <th className="border border-black p-1 font-bold text-left">Meaning & Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 font-semibold">Missing (0 times)</td>
              <td className="border border-black p-1 text-justify">Weak social connections, fewer opportunities, struggles in career, slow learning ability, reduced Jupiter energy.</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-semibold">Present Once (Balanced - 50%)</td>
              <td className="border border-black p-1 text-justify">Strong social skills, good career growth, supportive society, strong learning capacity.</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-semibold">Present Twice (100%) - Imbalanced</td>
              <td className="border border-black p-1 text-justify">Over-socialization, some opportunistic people in life, occasional financial struggles.</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-semibold">Present Three Times (150%)</td>
              <td className="border border-black p-1 text-justify">Increased social interactions, people take advantage, frequent requests for help.</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-semibold">Present Four or More Times (200%+)</td>
              <td className="border border-black p-1 text-justify text-red-700">Too many social connections, heavy emotional burden, high financial loss, often used by others.</td>
            </tr>
          </tbody>
        </table>

        <h5 className="font-bold mb-2 text-base text-blue-800">Impact of Soft Wood Element Imbalance in Life</h5>
        <div className="space-y-4 mb-4 text-justify text-sm">
          <div>
            <span className="font-bold underline">1. If Soft Wood (3) is Missing in the Lo Shu Grid</span>
            <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
              <li>Weak social connections, fewer friends, and lack of support from society.</li>
              <li>Struggles in networking, leading to fewer career opportunities.</li>
              <li>Minimal support from seniors, colleagues, and subordinates, leading to more work with fewer rewards.</li>
              <li>Reduced Jupiter energy, causing slower learning ability and difficulty in gaining wisdom.</li>
            </ul>
          </div>
          <div>
            <span className="font-bold underline">2. If Soft Wood (3) is Excessive (More than 100%)</span>
            <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
              <li>Over-socialization, attracting selfish and opportunistic people.</li>
              <li>Frequent requests for help, leading to neglect of personal work.</li>
              <li>Financial struggles, as money may get stuck in unnecessary obligations.</li>
              <li>Used by others, constantly helping without receiving benefits.</li>
              <li>Exploitation by society, feeling manipulated or mistreated.</li>
            </ul>
          </div>
        </div>

        <h5 className="font-bold mb-2 text-base text-blue-800">Remedies for Soft Wood Element (3) Imbalance</h5>
        <div className="space-y-4 mb-4 text-justify text-sm">
          <div>
            <span className="font-bold underline">1. If Soft Wood (3) is Missing</span>
            <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
              <li><strong>Increase Soft Wood element by:</strong>
                <ul className="list-circle pl-6 mt-1">
                  <li>Expanding social connections mindfully.</li>
                  <li>Practicing learning and personal growth (reading, acquiring new skills).</li>
                  <li>Helping others in a balanced way to strengthen support from society.</li>
                  <li>Wearing a 5 Mukhi Rudraksha to enhance soft wood element.</li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <span className="font-bold underline">2. If Soft Wood (3) is Excessive</span>
            <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
              <li><strong>Reduce excess Soft Wood element by:</strong>
                <ul className="list-circle pl-6 mt-1">
                  <li>Being selective in friendships and avoiding opportunistic people.</li>
                  <li>Prioritizing personal work over excessive social obligations.</li>
                  <li>Avoiding unnecessary financial help to others.</li>
                  <li>Practicing self-discipline to focus on career and personal goals.</li>
                  <li>Donate Tulsi mala and 5 mukhi rudraksha to any Guru equivalent persons on 3rd, 30th date of each month.</li>
                  <li>Daily mantra chanting "Om Gram Green Graum Sah Guruve Namah".</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <h5 className="font-bold mb-1 text-base text-blue-800">Conclusion</h5>
        <p className="text-justify text-sm mb-4">
          Number 3 (Soft Wood element) plays a major role in <strong>social connectivity, career growth, and learning ability.</strong> A balanced Soft Wood element ensures strong support from society and new opportunities, while an imbalanced Soft Wood element can lead to exploitation, career struggles, and financial losses occurred due to society.
        </p>

        <h5 className="font-bold mb-1 text-base text-red-800">Important Advice:</h5>
        <p className="text-justify text-sm">
          People with excess Number 3 should be cautious in choosing their social circle. They should <strong>set boundaries, prioritize their own work, and learn to say 'No'</strong> when needed to avoid unnecessary struggles, financial losses, and emotional stress.
        </p>
      </EbookHeaderFooter>
"""

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

if insertion_marker in text:
    new_text = text.replace(insertion_marker, pages_jsx + '\n' + insertion_marker)
    # Fix the page marker for the final page to be 18
    new_text = new_text.replace(' {/* --- PAGE 14: How to measure concentration --- */}', ' {/* --- PAGE 18: How to measure concentration --- */}')
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_text)
    print("SUCCESS: 4 additional pages inserted (Pages 14-17).")
else:
    print("ERROR: Insertion marker not found.")
