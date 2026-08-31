import os

# 1. Update EbookLoShuGrid.tsx
grid_path = 'frontend/components/ui/astrology/EbookLoShuGrid.tsx'
with open(grid_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('numberStr: string;', 'numberStr: React.ReactNode | string;')
content = content.replace('n4: string; n9: string; n2: string;', 'n4: React.ReactNode; n9: React.ReactNode; n2: React.ReactNode;')
content = content.replace('n3: string; n5: string; n7: string;', 'n3: React.ReactNode; n5: React.ReactNode; n7: React.ReactNode;')
content = content.replace('n8: string; n1: string; n6: string;', 'n8: React.ReactNode; n1: React.ReactNode; n6: React.ReactNode;')

with open(grid_path, 'w', encoding='utf-8') as f:
    f.write(content)


# 2. Update EbookChapter1.tsx
chap_path = 'frontend/components/ui/astrology/EbookChapter1.tsx'
with open(chap_path, 'r', encoding='utf-8') as f:
    chap_content = f.read()

old_chap = '''          <p className="font-bold text-lg mb-4 text-center">Example – Date of Birth – 21/10/1985</p>
          <div className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0">
            <div className="text-center">
              <ul className="text-left mb-4 font-semibold text-gray-800 space-y-1">
                <li><span className="text-green-600">Moolank</span> = 21 = <strong>3</strong></li>
                <li><span className="text-red-600">Bhagyank</span> = 2+1+1+0+1+9+8+5 = <strong>9</strong></li>
              </ul>
              <EbookLoShuGrid 
                isStandard={true}
                title="(Standard Loshu Grid)"
                cells={{
                  n4: '4', n9: '9', n2: '2',
                  n3: '3', n5: '5', n7: '7',
                  n8: '8', n1: '1', n6: '6'
                }}
              />
            </div>
            
            <div className="text-center">
              <div className="h-20 hidden md:block"></div> {/* Spacer to align grids */}
              <EbookLoShuGrid 
                isStandard={false}
                title="(Birth Grid)"
                cells={{
                  n4: '', n9: '99', n2: '2',
                  n3: '3', n5: '5', n7: '',
                  n8: '8', n1: '111', n6: ''
                }}
                highlightedTextColors={{
                  n9: 'text-red-500',
                  n3: 'text-green-600',
                }}
              />
            </div>
          </div>'''

new_chap = '''          <p className="font-bold text-lg mb-4 text-center">Example – Date of Birth – 03/10/1981</p>
          <div className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0">
            <div className="text-center">
              <ul className="text-left mb-4 font-semibold text-gray-800 space-y-1">
                <li><span className="text-green-600">Moolank</span> = 03 = <strong>3</strong></li>
                <li><span className="text-red-600">Bhagyank</span> = 0+3+1+0+1+9+8+1 = 23 = <strong>5</strong></li>
              </ul>
              <EbookLoShuGrid 
                isStandard={true}
                title="(Standard Loshu Grid)"
                cells={{
                  n4: '4', n9: '9', n2: '2',
                  n3: '3', n5: '5', n7: '7',
                  n8: '8', n1: '1', n6: '6'
                }}
              />
            </div>
            
            <div className="text-center">
              <div className="h-20 hidden md:block"></div> {/* Spacer to align grids */}
              <EbookLoShuGrid 
                isStandard={false}
                title="(Birth Grid)"
                cells={{
                  n4: '', n9: '9', n2: '',
                  n3: <><span className="text-black">3</span><span className="text-green-600">3</span></>, n5: '5', n7: '',
                  n8: '8', n1: '111', n6: ''
                }}
                highlightedTextColors={{
                  n5: 'text-red-500'
                }}
              />
            </div>
          </div>'''

chap_content = chap_content.replace(old_chap, new_chap)
with open(chap_path, 'w', encoding='utf-8') as f:
    f.write(chap_content)


# 3. Update EbookContents.tsx
cont_path = 'frontend/components/ui/astrology/EbookContents.tsx'
with open(cont_path, 'r', encoding='utf-8') as f:
    cont_content = f.read()

old_cont = '''          <div>
            <h5 className="font-bold mb-2">Example – Date of Birth – 21/10/1985</h5>
            <ul className="list-disc pl-10 space-y-1 mb-4 print:pl-6">
              <li className="text-green-600">Moolank = 21 = 3</li>
              <li className="text-red-500">Bhagyank = 2+1+1+0+1+9+8+5 = 9</li>
            </ul>
            
            <div className="flex justify-around items-center">
              {/* Standard Loshu Grid */}
              <div className="text-center">
                <p className="font-bold mb-2">(Standard Loshu Grid)</p>
                <div className="grid grid-cols-3 w-56 border-2 border-black bg-[#fff6e6] mx-auto print:w-48">
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">4</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">9</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">2</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">3</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">5</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">7</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">8</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">1</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">6</div>
                </div>
              </div>
              
              {/* Birth Grid */}
              <div className="text-center">
                <p className="font-bold mb-2">(Birth Grid)</p>
                <div className="grid grid-cols-3 w-56 border-2 border-black bg-[#fff6e6] mx-auto print:w-48">
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg text-red-500">99</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">2</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg text-green-700">3</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">5</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">8</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">111</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
                </div>
              </div>
            </div>
          </div>'''

new_cont = '''          <div>
            <h5 className="font-bold mb-2">Example – Date of Birth – 03/10/1981</h5>
            <ul className="list-disc pl-10 space-y-1 mb-4 print:pl-6">
              <li className="text-green-600">Moolank = 03 = 3</li>
              <li className="text-red-500">Bhagyank = 0+3+1+0+1+9+8+1 = 23 = 5</li>
            </ul>
            
            <div className="flex justify-around items-center">
              {/* Standard Loshu Grid */}
              <div className="text-center">
                <p className="font-bold mb-2">(Standard Loshu Grid)</p>
                <div className="grid grid-cols-3 w-56 border-2 border-black bg-[#fff6e6] mx-auto print:w-48">
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">4</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">9</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">2</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">3</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">5</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">7</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">8</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">1</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">6</div>
                </div>
              </div>
              
              {/* Birth Grid */}
              <div className="text-center">
                <p className="font-bold mb-2">(Birth Grid)</p>
                <div className="grid grid-cols-3 w-56 border-2 border-black bg-[#fff6e6] mx-auto print:w-48">
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">9</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"><span>3</span><span className="text-green-700">3</span></div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg text-red-500">5</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">8</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">111</div>
                  <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
                </div>
              </div>
            </div>
          </div>'''

cont_content = cont_content.replace(old_cont, new_cont)
with open(cont_path, 'w', encoding='utf-8') as f:
    f.write(cont_content)
