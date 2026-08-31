import os

replacements = [
    ("Raajesh S Panday", "Rajessh Paanday"),
    ("FEAN Method Astrology", "FEAN Method Astrology AMB")
]

directories_to_search = [
    r"d:\astrology website\frontend\components\ui\astrology",
    r"d:\astrology website"
]

files_to_check = []

# Collect all tsx and md files
for d in directories_to_search:
    if os.path.exists(d):
        for root, _, files in os.walk(d):
            # prevent going into node_modules or .git if we search root
            if 'node_modules' in root or '.next' in root or '.git' in root:
                continue
            for file in files:
                if file.endswith('.tsx') or file.endswith('.md'):
                    files_to_check.append(os.path.join(root, file))

files_changed = 0

for file_path in files_to_check:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for old, new in replacements:
            # Only replace if old is in content, to avoid unnecessary writes
            # Note: The prompt asks to replace 'FEAN Method Astrology' to 'FEAN Method Astrology AMB'
            # We must be careful not to turn 'FEAN Method Astrology AMB' into 'FEAN Method Astrology AMB AMB'
            if old in new_content:
                # temporarily replace existing AMB to a placeholder to avoid double AMB
                if "FEAN Method Astrology" in old:
                    new_content = new_content.replace("FEAN Method Astrology AMB", "@@@FEAN_TEMP@@@")
                
                new_content = new_content.replace(old, new)
                
                if "FEAN Method Astrology" in old:
                    new_content = new_content.replace("@@@FEAN_TEMP@@@", "FEAN Method Astrology AMB")

        if content != new_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {file_path}")
            files_changed += 1
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"\nTotal files updated: {files_changed}")
