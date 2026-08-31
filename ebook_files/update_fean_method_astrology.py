import os
import re

directories_to_search = [
    r"d:\astrology website\frontend\components\ui\astrology",
    r"d:\astrology website\frontend\app",
    r"d:\astrology website\frontend\public",
    r"d:\astrology website"
]

files_to_check = set()

# Collect all relevant files
for d in directories_to_search:
    if os.path.exists(d):
        for root, _, files in os.walk(d):
            # prevent going into node_modules or .git
            if 'node_modules' in root or '.next' in root or '.git' in root:
                continue
            for file in files:
                if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.md') or file.endswith('.html'):
                    files_to_check.add(os.path.join(root, file))

files_changed = 0

for file_path in list(files_to_check):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to match 'FEAN Method' not followed by ' Astrology'
        # \s* handles optional spaces, but we only want to prevent if Astrology is present.
        # A simpler way is to replace 'FEAN Method Astrology' with a temp string, 
        # then replace 'FEAN Method' with 'FEAN Method Astrology', 
        # then revert the temp string back to 'FEAN Method Astrology'
        
        # We also have "FEAN Method Astrology AMB", so we need to be careful.
        # Let's use the temp replacement strategy.
        
        # 1. Protect existing instances of 'FEAN Method Astrology' (and anything that comes after it like AMB)
        temp_content = content.replace("FEAN Method Astrology", "@@TEMP_FEAN_ASTROLOGY@@")
        
        # 2. Now any remaining 'FEAN Method' is definitely NOT 'FEAN Method Astrology'
        temp_content = temp_content.replace("FEAN Method", "FEAN Method Astrology")
        
        # 3. Restore the protected strings
        new_content = temp_content.replace("@@TEMP_FEAN_ASTROLOGY@@", "FEAN Method Astrology")

        if content != new_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {file_path}")
            files_changed += 1
    except Exception as e:
        pass

print(f"\nTotal files updated: {files_changed}")
