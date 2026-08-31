import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

# We need to extract the block starting from `{/* --- PAGE 10A` and ending at the end of `{/* --- PAGE 10C`
start_marker = '{/* --- PAGE 10A: Interpret & Adjust Imbalance --- */}'
end_marker = '{/* --- PAGE 10C: Meaning of a Balanced State --- */}'

start_idx = text.find(start_marker)
if start_idx == -1:
    print("Could not find PAGE 10A")
    exit(1)

# Find the end of the PAGE 10C block
# It ends with `</EbookHeaderFooter>`
end_idx = text.find(end_marker)
if end_idx == -1:
    print("Could not find PAGE 10C")
    exit(1)

# Find the closing tag of PAGE 10C
end_tag = '</EbookHeaderFooter>'
end_block_idx = text.find(end_tag, end_idx) + len(end_tag)

extracted_block = text[start_idx:end_block_idx]

# Remove the extracted block from its current location
new_text = text[:start_idx] + text[end_block_idx:]

# Now we need to insert it AFTER Page 35 (which contains the Earth Remedies)
insert_marker = '{/* --- PAGE 35: Earth Elements Remedies & Conclusion --- */}'
insert_idx = new_text.find(insert_marker)

if insert_idx == -1:
    print("Could not find PAGE 35")
    exit(1)

insert_end_idx = new_text.find(end_tag, insert_idx) + len(end_tag)

# To ensure smooth numbering in the comments, let's rename the comments in the extracted block
extracted_block = extracted_block.replace('PAGE 10A: Interpret & Adjust Imbalance', 'PAGE 35A: Interpret & Adjust Imbalance')
extracted_block = extracted_block.replace('PAGE 10B: The Real Cause & Balanced States', 'PAGE 35B: The Real Cause & Balanced States')
extracted_block = extracted_block.replace('PAGE 10C: Meaning of a Balanced State', 'PAGE 35C: Meaning of a Balanced State')

# Also, the user might literally want it exactly after Image 4 (Page 34) and BEFORE Image 5 (Page 35)?
# Let's insert it after Page 35 to preserve the flow of Earth elements, which is the most logical.
# But wait, the user's prompt said "after image 4 page". Let's place it exactly after Image 4 (Page 34) if they meant that, but Image 4 & 5 are part of the same section.
# I will place it after Page 35.

final_text = new_text[:insert_end_idx] + '\n\n      ' + extracted_block + new_text[insert_end_idx:]

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(final_text)

print('Moved Pages 10A-10C to after Page 35!')
