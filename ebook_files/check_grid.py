import codecs
with codecs.open('frontend/components/ui/astrology/EbookContents.tsx', 'r', 'utf-8') as f:
    text = f.read()
idx = text.find('(Soft<br/>Wood)')
if idx != -1:
    start = text.rfind('<div className="grid', 0, idx)
    print(text[start:idx+150])
else:
    print("Not found")
