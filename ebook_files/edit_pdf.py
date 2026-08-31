import fitz  # PyMuPDF
import sys

def replace_text_in_pdf(input_pdf, output_pdf, replacements):
    try:
        doc = fitz.open(input_pdf)
        for page_num in range(len(doc)):
            page = doc[page_num]
            for old_text, new_text in replacements.items():
                text_instances = page.search_for(old_text)
                for inst in text_instances:
                    # Add redaction annotation with the new text
                    # It will draw a white box over the old text and write the new text
                    page.add_redact_annot(inst, text=new_text, fill=(1,1,1), text_color=(0,0,0), cross_out=False)
            page.apply_redactions()
        doc.save(output_pdf)
        print("Successfully generated:", output_pdf)
    except Exception as e:
        print("Error processing PDF:", e)

if __name__ == '__main__':
    input_file = "Feat-Theory-ABC-by-Somaveer-Singh_15th-April-2025 (1).pdf"
    output_file = "FEAN-Method-Astrology.pdf"
    
    replacements = {
        "Somaveer Singh": "Raajesh S Panday",
        "Kiara Astro ABC": "OM Astrology AMC",
        "FEAT Theory ABC": "FEAN Method Astrology"
    }
    
    replace_text_in_pdf(input_file, output_file, replacements)
