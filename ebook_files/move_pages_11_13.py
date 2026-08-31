import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

# We need to extract the block starting from `{/* --- PAGE 11:` and ending at the end of `{/* --- PAGE 13:`
start_marker = '{/* --- PAGE 11: Number 1 (Water Element) Detailed Description --- */}'
end_marker = '{/* --- PAGE 13: Impact & Remedies for Number 1 --- */}'

start_idx = text.find(start_marker)
if start_idx == -1:
    print("Could not find PAGE 11")
    exit(1)

# Find the end of the PAGE 13 block
end_idx = text.find(end_marker)
if end_idx == -1:
    print("Could not find PAGE 13")
    exit(1)

# Find the closing tag of PAGE 13
end_tag = '</EbookHeaderFooter>'
end_block_idx = text.find(end_tag, end_idx) + len(end_tag)

extracted_block = text[start_idx:end_block_idx]

# Remove the extracted block from its current location
new_text = text[:start_idx] + text[end_block_idx:]

# Now we need to insert it BEFORE Page 14
insert_marker = '{/* --- PAGE 14: Fire Element (Number 9) Deep Dive --- */}'
insert_idx = new_text.find(insert_marker)

if insert_idx == -1:
    print("Could not find PAGE 14")
    exit(1)

# Insert it right before Page 14
final_text = new_text[:insert_idx] + extracted_block + '\n\n      ' + new_text[insert_idx:]

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(final_text)

print('Moved Pages 11-13 to before Page 14!')
