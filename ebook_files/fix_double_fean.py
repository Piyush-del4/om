import os

replacements = [
    ("FEAN Method Astrology AMB (FEAN Method Astrology AMB (Five Elements, Astrology & Numerology))", "FEAN Method Astrology AMB (Five Elements, Astrology & Numerology)")
]

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
        
        new_content = content
        for old, new in replacements:
            if old in new_content:
                new_content = new_content.replace(old, new)

        if content != new_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {file_path}")
            files_changed += 1
    except Exception as e:
        pass

print(f"\nTotal files updated: {files_changed}")
