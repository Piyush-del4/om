import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

# Find Page 10 block
start_idx = text.find('{/* --- PAGE 10: How to measure concentration --- */}')
end_idx = text.find('</EbookHeaderFooter>', start_idx) + len('</EbookHeaderFooter>')

page_10_content = text[start_idx:end_idx]

# Create a copy and change the comment title to avoid duplicates in the source
copied_content = page_10_content.replace('PAGE 10: How to measure concentration', 'PAGE 35D: How to measure concentration (Recap)')

# Find the location of PAGE 35A (where Image 2 starts)
insert_marker = '{/* --- PAGE 35A: Interpret & Adjust Imbalance --- */}'
insert_idx = text.find(insert_marker)

if insert_idx == -1:
    print("Could not find PAGE 35A")
    exit(1)

# Insert the copied content right before PAGE 35A
final_text = text[:insert_idx] + copied_content + '\n\n      ' + text[insert_idx:]

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(final_text)

print('Successfully copied Page 10 before Page 35A!')
