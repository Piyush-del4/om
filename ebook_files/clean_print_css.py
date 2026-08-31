import os
import re

directories_to_search = [
    r"d:\astrology website\frontend\components\ui\astrology",
    r"d:\astrology website\frontend\app\fean-ebook"
]

# Regex to match bad print classes
# We want to remove classes like:
# print:space-y-1, print:leading-tight, print:leading-none, print:text-[11.5px], print:text-[10px], etc.
# print:mt-1, print:mb-1, print:mt-2, print:mb-2, print:mt-3, print:mb-3, print:py-1, print:px-1
# print:gap-1, print:gap-2
bad_classes_pattern = re.compile(r'\bprint:(space-y-[0-4]|leading-(tight|none|snug)|text-\[[0-9.]+px\]|text-(xs|sm)|m[tb]-[0-4]|p[xy]-[0-4]|gap-[0-4])\b')

files_changed = 0

for d in directories_to_search:
    if os.path.exists(d):
        for root, _, files in os.walk(d):
            for file in files:
                if file.endswith('.tsx'):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        # Remove bad classes
                        new_content = bad_classes_pattern.sub('', content)
                        # Clean up multiple spaces left behind
                        new_content = re.sub(r' +', ' ', new_content)
                        new_content = new_content.replace(' className=" "', ' className=""')
                        
                        if content != new_content:
                            with open(file_path, 'w', encoding='utf-8') as f:
                                f.write(new_content)
                            print(f"Cleaned: {file_path}")
                            files_changed += 1
                    except Exception as e:
                        print(f"Error processing {file_path}: {e}")

print(f"\nTotal files updated: {files_changed}")
