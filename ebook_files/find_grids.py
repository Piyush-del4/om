import codecs
with codecs.open('frontend/components/ui/astrology/EbookContents.tsx', 'r', 'utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'className="grid grid-cols-3' in line:
        print(f'{i+1}: {line.strip()}')
