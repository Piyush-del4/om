import re

with open('ebook_diff.txt', 'r', encoding='utf-8') as f:
    diff_lines = f.readlines()

for line in diff_lines:
    if line.startswith('-') and not line.startswith('---'):
        if 'print:' in line:
            print("REMOVED: " + line.strip())
