import re

def format_ebook(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        text = f.read()

    # Remove headers/footers
    footer_pattern = r'All Rights Reserved ©OM Astrology AMC ™\s*@ FEAN Method Astrology by – Raajesh S Panday\s*FEAN Method Astrology'
    text = re.sub(footer_pattern, '\n\n', text)
    
    # Also another variation of footer
    footer_pattern2 = r'All Rights Reserved ©OM Astrology AMC ™\s*@ FEAN Method Astrology by – Raajesh S Panday\s*'
    text = re.sub(footer_pattern2, '\n\n', text)

    # Add line breaks for bullet points
    text = re.sub(r'\s*•\s*', '\n\n* ', text)
    
    # Add line breaks for numbered lists (e.g., "1 What is FEAN Method", "2. Number 2:")
    text = re.sub(r'(\s+\d+\s+What is\s+)', r'\n\n\1', text)
    text = re.sub(r'(\s+\d+\.\s+[A-Z])', r'\n\n\1', text)
    
    # Add line breaks before common headings
    headings = [
        "Course Structure", "What is FEAN Method AMC", "What are Five elements", 
        "What is the difference between", "Why FEAN Method AMC", "What is Moolank", 
        "What is Bhagyank", "How to Make Birth Grid", "Detailed description", 
        "What is concentration", "Importance of concentration", "How to calculate", 
        "How to identify", "How to balance", "How to Get Job", "How to grow Business",
        "How to find", "How to decide", "How to check", "Basics of Vedic Astrology",
        "Some Special cases", "Cover Vedic Astrology", "Gemstones Analysis",
        "Manglik Dosh Analysis", "Rajyog Analysis", "Remedies", "Practice of kundli",
        "About the Author", "Core Philosophy", "Basic Terminology", "Standard Loshu Grid",
        "How it works"
    ]
    
    for h in headings:
        text = re.sub(r'(\s*)(' + re.escape(h) + r')', r'\n\n## \2\n', text)
        
    # Extra cleanup
    text = re.sub(r'FEAN Method AstrologyAbout the Author', '\n\n# FEAN Method Astrology\n\n## About the Author', text)
    
    # Split the text into lines and clean up whitespace
    lines = text.split('\n')
    formatted_lines = []
    
    for line in lines:
        line = line.strip()
        if not line:
            formatted_lines.append(line)
            continue
            
        formatted_lines.append(line)
            
    # Clean up multiple newlines
    formatted_text = '\n'.join(formatted_lines)
    formatted_text = re.sub(r'\n{3,}', '\n\n', formatted_text)
    
    # CSS for md-to-pdf
    css = """---
pdf_options:
  format: a4
  margin: 30mm 20mm
  printBackground: true
css: |-
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
  h1 { color: #2c3e50; text-align: center; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 40px; }
  h2 { color: #2980b9; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
  h3 { color: #16a085; margin-top: 25px; }
  p { margin-bottom: 15px; text-align: justify; }
  li { margin-bottom: 5px; }
  table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f2f2f2; color: #333; }
---
"""
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(css + formatted_text)

if __name__ == '__main__':
    format_ebook('feanebook.md', 'formatted_feanebook.md')
    print("Formatting complete.")
