import codecs
import re
with codecs.open('frontend/components/ui/astrology/EbookContents.tsx', 'r', 'utf-8') as f:
    text = f.read()

matches = re.finditer(r'className="grid grid-cols-3.*?"', text)
for i, m in enumerate(matches):
    print(f'Grid {i+1}: {m.group(0)}')
