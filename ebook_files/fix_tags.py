import codecs

file_path = 'frontend/components/ui/astrology/EbookContents.tsx'
with codecs.open(file_path, 'r', 'utf-8') as f:
    text = f.read()

# Fix the inner ul that was incorrectly changed to ol
target_bad_ol = '<li>Steady career and financial growth <span className="font-normal">(consistent opportunities without major struggles)</span>.</li>\n                  </ol>\n                </li>'
replacement_good_ul = '<li>Steady career and financial growth <span className="font-normal">(consistent opportunities without major struggles)</span>.</li>\n                  </ul>\n                </li>'
text = text.replace(target_bad_ol, replacement_good_ul)

# Fix the outer ul that was NOT changed to ol
target_bad_ul = '</ul>\n            </li>\n          </ul>\n\n          <div className="mt-8 border-t-2'
replacement_good_ol = '</ul>\n            </li>\n          </ol>\n\n          <div className="mt-8 border-t-2'
text = text.replace(target_bad_ul, replacement_good_ol)

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(text)

print('Fixed the mismatched tags!')
