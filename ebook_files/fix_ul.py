import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'

with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

# Replace <ul ... start={2}> with <ol ... start={2}>
target_ul = '<ul className="list-decimal pl-10 space-y-4 print:pl-6 text-sm text-justify" start={2}>'
replacement_ol = '<ol className="list-decimal pl-10 space-y-4 print:pl-6 text-sm text-justify" start={2}>'
text = text.replace(target_ul, replacement_ol)

# Find the closing </ul> for that specific block
idx = text.find('PAGE 10C: Meaning of a Balanced State')
if idx != -1:
    end_ul = text.find('</ul>', idx, text.find('mt-8 border-t-2', idx))
    if end_ul != -1:
        text = text[:end_ul] + '</ol>' + text[end_ul+5:]

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(text)

print('Fixed ul to ol!')
