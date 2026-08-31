import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

page_10_content = """10: How to measure concentration --- */}
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

start_marker = '      {/* --- PAGE 10: How to measure concentration --- */}'
end_marker = '      {/* --- PAGE 11:'

start_idx = text.find(start_marker)
end_idx = text.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_text = text[:start_idx] + '      {/* --- PAGE ' + page_10_content + '\n' + text[end_idx:]
    with codecs.open(file_path, 'w', 'utf-8') as f:
        f.write(new_text)
    print("SUCCESS: Page 10 restored!")
else:
    print("ERROR: Could not find markers.")
