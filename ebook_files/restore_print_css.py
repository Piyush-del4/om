import os
import re

directories_to_search = [
    r"d:\astrology website\frontend\components\ui\astrology",
]

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
                        
                        # Add print classes back to space-y-4 and space-y-6 and text-justify wrappers
                        # For example: className="space-y-4 text-justify" -> className="space-y-4 text-justify print:space-y-1 print:text-[11.5px] print:leading-tight"
                        
                        # First, remove them if they exist to avoid duplicates
                        content = re.sub(r' print:(space-y-[0-4]|leading-(tight|none|snug)|text-\[[0-9.]+px\])', '', content)
                        
                        # Now inject them into typical wrappers
                        content = content.replace('className="space-y-4 text-justify"', 'className="space-y-4 text-justify print:space-y-1 print:text-[11.5px] print:leading-tight"')
                        content = content.replace('className="space-y-6 text-justify"', 'className="space-y-6 text-justify print:space-y-1 print:text-[11.5px] print:leading-tight"')
                        
                        # Add to h4 and h5
                        content = content.replace('className="text-lg font-bold mb-2 font-serif', 'className="text-lg font-bold mb-2 font-serif print:text-base print:mt-1 print:mb-1')
                        content = content.replace('className="text-lg font-bold mb-6 font-serif', 'className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1')
                        
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                        print(f"Restored classes in: {file_path}")
                        files_changed += 1
                    except Exception as e:
                        print(f"Error processing {file_path}: {e}")

print(f"\nTotal files updated: {files_changed}")
