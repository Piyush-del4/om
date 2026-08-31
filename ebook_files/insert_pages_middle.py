import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

page_10_anchor = """      {/* --- PAGE 10: How to measure concentration --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">How to Measure Concentration level of Five Elements</h4>
        <p className="mb-6 text-justify">
          In FEAN Method Astrology, the concentration level of the five elements—Water, Fire, Air, Sky (Metal), and Earth—is measured using the Lo Shu Grid, which is created based on a person's real date of birth.
        </p>

        <h4 className="font-bold mb-4">Steps to Measure the Concentration Level of the Five Elements:</h4>
        
        <div className="space-y-6 print:space-y-4">
          <div>
            <span className="font-bold">1. Create the Lo Shu Grid from the Date of Birth</span>
            <ul className="list-disc pl-10 mt-2 space-y-1 print:pl-6 text-sm">
              <li>Write down the date of birth (DD/MM/YYYY).</li>
              <li>Place each digit in the standard 3x3 Lo Shu Grid according to its predefined position.</li>
              <li>Also fill Person's Moolank and Bhagyank in the Loshu Grid.</li>
            </ul>
          </div>
          
          <div>
            <span className="font-bold">2. Identify the Numbers Present in the Grid</span>
            <p className="mt-2 mb-2 text-sm">Each number from 1 to 9 represents a different element:</p>
            <table className="w-full border-collapse border border-black text-sm mb-4 print:text-[13px]">
              <thead>
                <tr className="bg-[#fff2cc]">
                  <th className="border border-black p-1 font-bold text-left">Numbers</th>
                  <th className="border border-black p-1 font-bold text-left">Elements</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-black p-1 font-semibold">Number 1</td><td className="border border-black p-1">Water element</td></tr>
                <tr><td className="border border-black p-1 font-semibold">Number 2</td><td className="border border-black p-1">Earth Element</td></tr>
                <tr><td className="border border-black p-1 font-semibold">Number 3</td><td className="border border-black p-1">Soft Wood Element (Air element)</td></tr>
                <tr><td className="border border-black p-1 font-semibold">Number 4</td><td className="border border-black p-1">Hard Wood Element (Air element)</td></tr>
                <tr><td className="border border-black p-1 font-semibold">Number 5</td><td className="border border-black p-1">Earth Element</td></tr>
                <tr><td className="border border-black p-1 font-semibold">Number 6</td><td className="border border-black p-1">Golden Colour Metal Element (Sky Element)</td></tr>
                <tr><td className="border border-black p-1 font-semibold">Number 7</td><td className="border border-black p-1">White Metal Element (Sky Element)</td></tr>
                <tr><td className="border border-black p-1 font-semibold">Number 8</td><td className="border border-black p-1">Earth Element</td></tr>
                <tr><td className="border border-black p-1 font-semibold">Number 9</td><td className="border border-black p-1">Fire Element</td></tr>
              </tbody>
            </table>
          </div>

          <div>
            <span className="font-bold">3. Count the Frequency of Each Number</span>
            <ul className="list-disc pl-10 mt-2 space-y-1 print:pl-6 text-sm">
              <li>Each number's frequency in the Lo Shu Grid represents the concentration level of that element in the body at birth.</li>
              <li>Standard Concentration Rule:
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>If a number appears once, its element is <strong>balanced</strong> (50%).</li>
                  <li>If a number appears twice, the element reaches 100% <strong>(imbalanced state)</strong>.</li>
                  <li>If a number appears three times (e.g., 999), the element reaches 150% (excess). <strong>(imbalanced state)</strong>.</li>
                  <li>If a number appears four times (e.g., 9999), the element reaches 200%, and so on. <strong>(imbalanced state)</strong>.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>"""

new_middle_pages = """
      {/* --- PAGE 10A: Interpret & Adjust Imbalance --- */}
      <EbookHeaderFooter>
        <div className="space-y-6 mt-6 print:mt-4">
          <div>
            <span className="font-bold text-lg">4. Interpret the Elemental Balance</span>
            <ul className="list-disc pl-10 mt-3 space-y-2 print:pl-6 text-sm text-justify">
              <li><strong>Balanced Elements (50%) →</strong> No issues, natural harmony.</li>
              <li><strong>Excess Elements (&gt;100%) →</strong> Imbalanced, causing problems related to that element.</li>
              <li><strong>Missing Elements (0%) →</strong> Deficiency, indicating lack of qualities associated with that element.</li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-lg">5. Adjusting the Elemental Imbalance</span>
            <ul className="list-disc pl-10 mt-3 space-y-2 print:pl-6 text-sm text-justify">
              <li>If an element is excessive (&gt;100%) → Reduce it by donating items related to that element.</li>
              <li>If an element is missing (0%) → Increase it by wearing Rudraksha, using certain colors, or keeping specific items.</li>
              <li>If the Fire-Water balance is disturbed, it affects mental health, confidence, and overreaction tendencies.</li>
              <li>If the Wood-Metal balance is disturbed, it affects social life, financial stability, and relationship harmony.</li>
            </ul>
          </div>

          <div className="mt-8 border-t-2 border-gray-300 pt-6">
            <h5 className="font-bold mb-4 text-blue-800 text-xl flex items-center gap-2"><span className="text-2xl">⚠</span> What is imbalanced state?</h5>
            <p className="mb-4 text-sm text-justify">
              In FEAT Theory ABC, when an element's concentration reaches <strong>100% at birth</strong>, it is considered an imbalanced state. Here's why:
            </p>
            <ol className="list-decimal pl-10 space-y-4 print:pl-6 text-sm text-justify">
              <li>
                <strong>Elements Continuously Increase After Birth</strong>
                <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
                  <li>After birth, <strong>the five elements naturally increase in the body</strong> because the universe has an infinite concentration of all elements.</li>
                  <li>As per the natural flow of energy, elements always move from high density to low density. This means that after birth, external energy from the universe keeps increasing the element's concentration in our body.</li>
                  <li><strong>If an element is already at 100% at birth, its concentration will only increase further, leading to an excessive state over time.</strong></li>
                </ul>
              </li>
              <li>
                <strong>Excess Element Creates an Imbalance</strong>
                <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
                  <li><strong>When an element exceeds 100% in the body, it disrupts the balance of planetary energy</strong> associated with that element.</li>
                  <li>This imbalance causes the body to absorb more negative energy and <strong>reject positive energy, leading to various problems in life.</strong></li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 10B: The Real Cause & Balanced States --- */}
      <EbookHeaderFooter>
        <div className="space-y-6 mt-6 print:mt-4">
          <ol className="list-decimal pl-10 space-y-4 print:pl-6 text-sm text-justify" start={3}>
            <li>
              <strong>Impact on Health and Longevity</strong>
              <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
                <li>Due to the excess element, the body starts to <strong>weaken over time.</strong></li>
                <li><strong>This reduces immunity, increases health issues, and gradually affects lifespan.</strong></li>
                <li>A person with high concentration of a specific element may suffer from diseases, emotional struggles, or life obstacles caused by that imbalance.</li>
              </ul>
            </li>
            <li>
              <strong>Cause of Struggles in Life</strong>
              <ul className="list-circle pl-6 mt-1 space-y-2 text-gray-700">
                <li>When an element exceeds <strong>100%</strong>, it starts affecting different aspects of life:
                  <ul className="list-disc pl-6 mt-1 space-y-1 text-black">
                    <li><strong>Excess Fire (9) →</strong> Anger issues, blood pressure problems, aggression, overconfidence.</li>
                    <li><strong>Excess Water (1) →</strong> Overthinking, emotional instability, weak decision-making.</li>
                    <li><strong>Excess Earth (2, 5, 8) →</strong> Overattachment, delays in work, slow progress.</li>
                    <li><strong>Excess Metal (6, 7) →</strong> Over-luxury desire, laziness, dependency on others.</li>
                    <li><strong>Excess Wood (3, 4) →</strong> Over-socialization, attracting opportunistic people, financial loss due to society.</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ol>

          <div className="bg-red-50 p-4 border-l-4 border-red-500 print:p-3 mt-6">
            <h6 className="font-bold mb-2 text-lg text-red-900">The Real Cause of Life's Problems</h6>
            <ul className="list-disc pl-6 space-y-1 text-sm text-justify">
              <li><strong>Every problem in life arises due to the imbalance of elements.</strong></li>
              <li>When an element becomes excessive <strong>(&gt;100%)</strong>, it starts <strong>controlling the mind and body</strong>, leading to different mental, physical, and emotional challenges.</li>
              <li>This also affects planetary energies, leading to unfavorable astrological results.</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 border-l-4 border-green-500 print:p-3 mt-6">
            <h6 className="font-bold mb-2 text-lg text-green-900">Solution to Restore Balance</h6>
            <ul className="list-disc pl-6 space-y-1 text-sm text-justify">
              <li>To reduce the impact of excess elements, one should <strong>donate or release that element</strong> (e.g., donating Fire-related items if Fire is excessive).</li>
              <li><strong>If an element is missing, one should increase its presence</strong> through specific remedies.</li>
              <li><strong>Balancing all five elements is the key to good health, stable emotions, and a prosperous life.</strong></li>
            </ul>
          </div>

          <div className="mt-8 border-t-2 border-gray-300 pt-6">
            <h5 className="font-bold mb-4 text-blue-800 text-xl">What is a Balanced State in FEAT Theory ABC?</h5>
            <p className="mb-4 text-sm text-justify">
              In FEAT Theory ABC, a <strong>balanced state</strong> means that the five elements (Water, Fire, Air, Sky/Metal, and Earth) are present in the body in the right proportion, neither in excess nor in deficiency. This balance ensures that the body, mind, and planetary energies function harmoniously, leading to a healthy, stable, and successful life.
            </p>
            <h6 className="font-bold mb-2 mt-4 text-lg">How to Identify a Balanced State?</h6>
            <ul className="list-decimal pl-10 space-y-1 print:pl-6 text-sm text-justify">
              <li><strong>In the Lo Shu Grid:</strong>
                <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
                  <li>If any number (1 to 9) <strong>appears once</strong>, it means that the corresponding element's concentration level is <strong>50%</strong>, which is a <strong>balanced state at birth</strong>.</li>
                  <li>A balanced element ensures that it grows naturally after birth without creating an imbalance in the body.</li>
                  <li><strong>For example, if Water (1) and Fire (9) are both present once</strong>, it indicates a Fire-Water balance, which is ideal for emotional and mental stability.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 10C: Meaning of a Balanced State --- */}
      <EbookHeaderFooter>
        <div className="space-y-6 mt-6 print:mt-4">
          <ul className="list-decimal pl-10 space-y-4 print:pl-6 text-sm text-justify" start={2}>
            <li>
              <strong>In the Body and Life:</strong>
              <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
                <li>A balanced state means that <strong>no element is dominating or lacking</strong>, allowing a person to have:
                  <ul className="list-square pl-6 mt-1 space-y-1 text-black font-semibold">
                    <li>Good health <span className="font-normal">(no major diseases)</span>.</li>
                    <li>Stable emotions <span className="font-normal">(no overthinking, anxiety, or excessive aggression)</span>.</li>
                    <li>Strong decision-making skills <span className="font-normal">(neither too impulsive nor too hesitant)</span>.</li>
                    <li>Harmonious relationships <span className="font-normal">(ability to maintain healthy social and personal bonds)</span>.</li>
                    <li>Steady career and financial growth <span className="font-normal">(consistent opportunities without major struggles)</span>.</li>
                  </ul>
                </li>
                <li className="mt-2">Another example, <strong>if Water (1) and Fire (9) are both present twice or thrice</strong>, it also indicates a Fire-water balance to each other, which is balanced state also, this can be very harmful if number 1 or 9 is artificially created by us in our life, then it will create imbalances and problems may rise as per element and planet in our horoscope.</li>
              </ul>
            </li>
          </ul>

          <div className="mt-8 border-t-2 border-gray-300 pt-6">
            <h5 className="font-bold mb-4 text-blue-800 text-xl">Meaning of a Balanced State</h5>
            <p className="mb-4 text-sm text-justify leading-relaxed">
              A balanced state means that all five elements are present in a way that supports a person's growth without creating stress, obstacles, or health issues.
            </p>
            <h6 className="font-bold mb-2 mt-4 text-lg">Why is Balance Important?</h6>
            <ul className="list-disc pl-10 space-y-2 print:pl-6 text-sm text-justify">
              <li><strong>If an element is excessive (&gt;100%)</strong>, it creates problems (e.g., excess Fire leads to anger issues, high BP, stress).</li>
              <li><strong>If an element is missing (0%)</strong>, it causes deficiency problems (e.g., missing Water leads to very shy nature, weak communication).</li>
              <li className="font-bold italic mt-2">A balanced state ensures that a person has fewer struggles, better opportunities, and overall success in life.</li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>
"""

# Try to find the exact anchor text using a more robust replacement strategy
# The exact text might have minor whitespace differences due to previous scripts
idx = text.find("</EbookHeaderFooter>", text.find("3. Count the Frequency of Each Number"))
if idx != -1:
    idx += len("</EbookHeaderFooter>")
    # Insert new_middle_pages exactly after the closing tag of Page 10
    new_text = text[:idx] + "\n" + new_middle_pages + text[idx:]
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_text)
    print("SUCCESS: Pages 10A, 10B, 10C injected!")
else:
    print("ERROR: Could not find Page 10 insertion point.")
