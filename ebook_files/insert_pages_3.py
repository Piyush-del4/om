import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

pages_jsx = """
      {/* --- PAGE 19: Metal Element (Number 6) --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Metal Element (Number 6) in FEAT Theory ABC</h4>
        <p className="mb-4 text-justify">
          In FEAN Theory ABC, the Metal Element (Number 6) controls the energy of Venus (Shukra), which governs:
        </p>
        <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 font-semibold">
          <li>Luxury, wealth, and material prosperity</li>
          <li>Love, romance, and physical relationships</li>
          <li>Social charm, attraction, and showmanship</li>
          <li>Comfortable lifestyle, beauty, and artistic taste</li>
        </ul>

        <div className="flex justify-end mb-6">
          <div className="text-center">
            <div className="grid grid-cols-3 border-2 border-black bg-[#fff6e6] w-48 print:w-40 mb-2">
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14 font-bold text-xl flex-col leading-none py-1">
                <span>6</span>
                <span className="text-[10px] font-normal mt-1">(Yellow_Metal)</span>
              </div>
            </div>
          </div>
        </div>

        <h4 className="font-bold mb-4 text-blue-800 text-xl flex items-center gap-2"><span className="text-2xl">✡</span> Impact of Metal Element (Number 6) Imbalance</h4>
        
        <div className="space-y-4 print:space-y-2">
          <div>
            <h5 className="font-bold mb-2">If Metal Element (6) is Excessive (66, 666, 6666, etc.)</h5>
            <ul className="space-y-2 print:space-y-1 text-justify">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>More luxury but no financial stability -</strong> Wealth is earned but quickly spent on luxury items, fashion, show-off, and extravagant lifestyle.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>No savings & financial losses -</strong> Even if money is saved, it gets lost, stuck in investments, or gradually disappears from the bank account.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Expansion of business but zero profits -</strong> The person may expand their business aggressively but struggles with profits and financial security.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Losses due to social influence -</strong> High chances of losing money due to friends, relatives, or partners.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Risk of betrayal in financial matters -</strong> Lending money often leads to losses or delayed returns.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h5 className="font-bold mb-2 flex items-center gap-2"><span className="text-green-600">✅</span> FEAT Remedy for Excessive Metal (6):</h5>
            <ul className="space-y-2 print:space-y-1">
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span><strong>Donate golden-colored metal</strong> (e.g., golden color wristwatch with a round dial) on the 6th of every month.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span><strong>Chant the Venus mantra daily -</strong> "Om Shung Shukray Namah" to receive positive Venus blessings.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span><strong>Avoid risky financial decisions -</strong> Do not lend money or take money-related risks.</span>
              </li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 20: Metal Element (Number 6) Continued --- */}
      <EbookHeaderFooter>
        <div className="space-y-6 print:space-y-4">
          <div>
            <h5 className="font-bold mb-3 mt-4">If Metal Element (6) is Missing (Number 6 Absent in Lo Shu Grid)</h5>
            <ul className="space-y-3 print:space-y-2 text-justify">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Struggles with luxury and comfort -</strong> The person finds it hard to afford luxuries despite earning money.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Difficulty in saving money -</strong> They fail to accumulate wealth and face financial instability.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Kanjoos for self, but spends freely on others -</strong> They are stingy towards themselves but spend money like water on friends and family.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Lack of financial enjoyment -</strong> Even if they earn money, they do not enjoy it for themselves.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold mt-1">📌</span>
                <span><strong>Difficulty in love & relationships -</strong> Struggles in maintaining romantic and physical relationships due to Venus energy deficiency.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 bg-green-50 p-4 border-l-4 border-green-500 print:p-3">
            <h5 className="font-bold mb-3 flex items-center gap-2"><span className="text-green-600">✅</span> FEAT Remedy for Missing Metal (6):</h5>
            <ul className="space-y-2 print:space-y-1">
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span>Wear a 6 Mukhi Rudraksha to enhance Venus energy.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span>Wear a golden-colored wristwatch with a round dial to attract financial stability and luxury.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span>Increase Venus energy by practicing self-care and luxury enjoyment.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 border-t-2 border-gray-300 pt-6">
            <h5 className="font-bold mb-4 text-blue-700 flex items-center gap-2"><span className="text-2xl">♻</span> Conclusion: Balancing Metal Element (6) for a Prosperous Life</h5>
            <ul className="space-y-3 print:space-y-2 text-justify">
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span>A <strong>balanced Metal element (6)</strong> brings financial stability, luxury, and fulfilling relationships.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span><strong>Excess Metal (66, 666)</strong> leads to reckless spending, financial instability, and losses due to social connections.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span><strong>Missing Metal (6)</strong> causes money-saving problems, self-stinginess, and difficulties in enjoying wealth and luxury.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-bold">✔</span>
                <span><strong>Follow FEAT Theory ABC remedies</strong> (donations, Rudraksha, wristwatch, and mantra chanting) to achieve harmony in wealth, luxury, and relationships.</span>
              </li>
              <li className="flex gap-2 font-bold italic text-blue-900 mt-4">
                <span className="text-xl">🚀</span>
                <span>Attract luxury, wealth, and love with the right balance of Metal Element!</span>
              </li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 21: Hard Wood (4) & White Metal (7) Introduction --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Hard Wood (Number 4 – Rahu) and White Metal (Number 7 – Ketu) in Feat Theory ABC</h4>
        <p className="mb-6 text-justify">
          In Feat Theory ABC, the numbers 4 (Hard Wood - Rahu) and 7 (White Metal - Ketu) play a significant role in shaping a person's life. These numbers represent two opposite forces that impact mental stability, decision-making, growth, and spiritual inclination. A balance between these two elements is essential for a smooth life.
        </p>

        <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Hard Wood (Number 4 - Rahu) in Feat Theory ABC</h4>
        <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6">
          <li>Hard wood element (4) Controls the energy of: <strong>Rahu</strong>.</li>
          <li>Hard Wood influences <strong>ambition, material success, and focus</strong>.</li>
        </ul>

        <div className="flex justify-end mb-6">
          <div className="text-center">
            <div className="grid grid-cols-3 border-2 border-black bg-[#fff6e6] w-48 print:w-40 mb-2">
              <div className="border border-black flex items-center justify-center h-14 font-bold text-xl flex-col leading-none py-1">
                <span>4</span>
                <span className="text-[10px] font-normal mt-1">(Hard<br/>Wood)</span>
              </div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14 font-bold text-xl flex-col leading-none py-1">
                <span>7</span>
                <span className="text-[10px] font-normal mt-1">(White<br/>Metal)</span>
              </div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
              <div className="border border-black flex items-center justify-center h-14"></div>
            </div>
          </div>
        </div>

        <h5 className="font-bold mb-3">Characteristics of Hard Wood (4 - Rahu)</h5>
        <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 text-sm text-justify">
          <li>Represents practicality, unconventional thinking, and logical decisions</li>
          <li>Governs planning, management, and futuristic vision</li>
          <li>Controls the growth of structures, intelligence, and problem-solving abilities</li>
          <li>Associated with technology, engineering, research, and analytical fields</li>
          <li>Indicates sudden gains and losses in life</li>
          <li>Enhances hard work and determination, making individuals persistent in achieving goals</li>
          <li>If balanced, it provides stability, clarity, and structured thinking</li>
        </ul>

        <h5 className="font-bold mb-3">Impact of Hard Wood (4 - Rahu) in the Lo Shu Grid</h5>
        
        <div className="space-y-4">
          <div>
            <h6 className="font-bold">1. If Number 4 is Balanced (Present Once)</h6>
            <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
              <li>Strong logical mind, ability to analyze situations effectively</li>
              <li>Good decision-making ability, leading to long-term success</li>
              <li>Well-organized and structured life</li>
              <li>Strong interest developed in internet related works, IT fields, Online activities, Share market, Games etc.</li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold mt-4">2. If Number 4 is Missing</h6>
            <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
              <li>Poor planning ability, difficulty in organizing things</li>
              <li>Lack of futuristic vision, struggles in executing ideas</li>
              <li>Less stability in career and financial matters</li>
              <li>Increased impulsive decisions, leading to financial losses</li>
              <li>Very weak interest in internet related works, IT fields, Online activities etc.</li>
            </ul>
            <p className="font-bold mt-2 text-sm">Remedies for Missing Number 4 (Hard Wood - Rahu)</p>
            <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
              <li>Wear an <strong>8 Mukhi Rudraksha</strong> to balance Rahu energy</li>
            </ul>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 22: Hard Wood (4) Continued --- */}
      <EbookHeaderFooter>
        <div className="space-y-6 print:space-y-4">
          <div>
            <h6 className="font-bold mt-4">3. If Number 4 is Excessive (44, 444, 4444)</h6>
            <ul className="list-disc pl-10 space-y-1 print:pl-6 text-justify">
              <li>Overthinking, excessive doubt, and unnecessary analysis</li>
              <li>Gets stuck in deep thoughts, mind troubles, sleep issues, and unable to act quickly</li>
              <li>Struggles to trust people, leading to loneliness</li>
              <li>Prone to sudden failures after sudden success (Rahu's unpredictable nature)</li>
              <li>Avoid hasty decisions, practice structured thinking</li>
              <li>Use Hard Wood furniture or wooden objects in daily life</li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold mt-2">Remedies for Excessive Number 4 (Hard Wood - Rahu)</h6>
            <ul className="list-disc pl-10 space-y-1 print:pl-6">
              <li>Reduce over-analysis and take decisions based on intuition</li>
              <li>Avoid negative thinking and over-questioning everything</li>
              <li>Donate Hard Wood-related items (wooden objects, paper, pencils, books) to the needy</li>
            </ul>
          </div>

          <div className="mt-8">
            <h5 className="font-bold mb-4 underline text-lg">Excess Number 4 (44, 444) Remedies in FEAT Theory ABC:</h5>
            
            <div className="space-y-6">
              <div>
                <h6 className="font-bold">1. Water + Blue Ink + Salt Remedy (Flush Method)</h6>
                <ul className="list-circle pl-10 mt-2 space-y-1 print:pl-6 text-justify">
                  <li>Every Saturday or daily after sunset, take one glass of water.</li>
                  <li>Add blue ink and salt to the water.</li>
                  <li>Hold the glass, move it 4 times in an anticlockwise direction over your head.</li>
                  <li>Flush the water into the toilet (bathroom toilet sheet) to remove excessive Hard Wood energy.</li>
                </ul>
              </div>

              <div>
                <h6 className="font-bold">2. Jute Coconut + Blue Thread Remedy (Temple/Peepal Tree)</h6>
                <ul className="list-circle pl-10 mt-2 space-y-1 print:pl-6 text-justify">
                  <li>Every Saturday or daily after sunset, take a jute coconut (with water inside).</li>
                  <li>Move it 4 times anticlockwise over your head.</li>
                  <li>Tie a blue thread around the coconut.</li>
                  <li>Offer the coconut to a temple or place it under a Peepal tree to reduce Rahu's negative impact.</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 border-l-4 border-gray-400 mt-6 print:p-3 text-sm">
                <h6 className="font-bold mb-2">Why These Remedies Work?</h6>
                <ul className="list-disc pl-6 space-y-2 text-justify">
                  <li>
                    <strong>Water + Blue Ink + Salt:</strong> Water absorbs excessive Wood energy, blue ink represents the cooling effect, and salt removes negative energies. Flushing it down the toilet symbolizes the elimination of Rahu's excess impact.
                  </li>
                  <li>
                    <strong>Jute Coconut + Blue Thread:</strong> The coconut absorbs Rahu energy, and the blue thread binds and neutralizes its negative influence before offering it to divine energy (temple or Peepal tree), which absorbs and balances the excess Hard Wood.
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-6 font-bold text-center">
              These remedies should be followed regularly for at least 43 days for effective results.
            </p>
          </div>
        </div>
      </EbookHeaderFooter>

      {/* --- PAGE 23: White Metal (Number 7 - Ketu) --- */}
      <EbookHeaderFooter>
        <h4 className="text-lg font-bold mb-6 font-serif text-center print:text-base">White Metal (Number 7 - Ketu) in Feat Theory ABC</h4>
        
        <div className="space-y-6 print:space-y-4">
          <div>
            <h5 className="font-bold mb-3">Characteristics of White Metal (7 - Ketu)</h5>
            <ul className="list-disc pl-10 space-y-1 print:pl-6 text-justify">
              <li>Represents spirituality, intuition, and detachment</li>
              <li>Governs hidden knowledge, meditation, and mystical experiences</li>
              <li>Enhances inner wisdom, deep thinking, and self-realization</li>
              <li>Promotes a minimalistic lifestyle, reducing materialistic desires</li>
              <li>Controls sudden transformations, unexpected events, and karmic influences</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-3">Impact of White Metal (7 - Ketu) in the Lo Shu Grid</h5>
            
            <div className="space-y-5">
              <div>
                <h6 className="font-bold">1. If Number 7 is Balanced (Present Once)</h6>
                <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
                  <li>Good intuitive ability, strong inner guidance</li>
                  <li>Ability to handle sudden changes in life smoothly</li>
                  <li>A natural inclination towards spiritual growth and self-awareness</li>
                </ul>
              </div>

              <div>
                <h6 className="font-bold">2. If Number 7 is Missing</h6>
                <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
                  <li>Difficulty in understanding deeper meanings of life</li>
                  <li>Fear of unknown situations, lack of spiritual insight</li>
                  <li>Challenges in handling sudden transformations</li>
                </ul>
                <p className="font-bold mt-2 text-sm">Remedies for Missing Number 7 (White Metal - Ketu)</p>
                <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
                  <li>Wear a <strong>9 Mukhi Rudraksha</strong> to enhance Ketu's energy</li>
                  <li>Meditate regularly to strengthen intuitive power</li>
                  <li>Wear a white metal stainless steel wrist watch with square shape dial.</li>
                </ul>
              </div>

              <div>
                <h6 className="font-bold">3. If Number 7 is Excessive (77, 777, 7777)</h6>
                <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
                  <li>Extreme detachment, loss of interest in material life</li>
                  <li>Confusion in making decisions, wandering mind</li>
                  <li>Over-inclination toward spirituality, ignoring practical life</li>
                  <li>Fear of sudden losses, unnecessary anxiety about the unknown</li>
                </ul>
                <p className="font-bold mt-2 text-sm">Remedies for Excessive Number 7 (White Metal - Ketu)</p>
                <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
                  <li>Engage in practical activities to stay grounded</li>
                  <li>Avoid isolation, build social connections</li>
                  <li>Practice mindfulness to reduce unnecessary fears</li>
                  <li>Doante white metal stainless steel wrist watch with square shape dial.</li>
                  <li>Donate food to dogs and care them.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </EbookHeaderFooter>
"""

# We find the insertion point which is before the final `</div>\n  );\n};\n\nexport default EbookContents;`
# But more robustly, we split by `</EbookHeaderFooter>` and find the last one.
parts = text.rsplit('</EbookHeaderFooter>', 1)
if len(parts) == 2:
    # parts[0] has everything up to the last </EbookHeaderFooter> (inclusive of the content inside it)
    new_text = parts[0] + '</EbookHeaderFooter>\n' + pages_jsx + parts[1]
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_text)
    print("SUCCESS: Pages 19-23 appended!")
else:
    print("ERROR: Could not find insertion point.")
