import sys

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = '''      {/* --- PAGE 0: About the Author --- */}
      <EbookHeaderFooter>
        <h3 className="text-xl font-bold text-center underline mb-4 font-serif print:text-base print:mb-2">About the Author</h3>
        <h4 className="text-lg font-bold text-gray-800 mb-1">Rajessh Paanday</h4>'''

replacement = '''      {/* --- PAGE 0: About the Author --- */}
      <EbookHeaderFooter>
        <h3 className="text-xl font-bold text-center underline mb-6 font-serif print:text-base print:mb-4">About the Author</h3>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-amber-200 shadow-lg mb-4 print:w-28 print:h-28 print:shadow-none print:border-2 print:border-gray-300">
            <img 
              src="/author.jpg" 
              alt="Rajessh Paanday" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://ui-avatars.com/api/?name=Rajessh+Paanday&background=f4b084&color=fff&size=200';
              }}
            />
          </div>
          <h4 className="text-2xl font-bold text-gray-800 text-center">Rajessh Paanday</h4>
        </div>'''

if target in content:
    new_content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Updated successfully')
else:
    print('Target not found!')
