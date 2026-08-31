import sys

with open('frontend/components/ui/astrology/EbookContents.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

author_content = '''      {/* --- PAGE 0: About the Author --- */}
      <EbookHeaderFooter>
        <h3 className="text-xl font-bold text-center underline mb-4 font-serif print:text-base print:mb-2">About the Author</h3>
        <h4 className="text-lg font-bold text-gray-800 mb-1">Rajessh Paanday</h4>
        <p className="text-sm text-gray-600 mb-4 font-semibold">Creator of FEAN Method Astrology AMB | Life & Business Transformation Consultant</p>
        
        <div className="space-y-4 text-justify print:space-y-2">
          <p>
            Rajessh Paanday is a renowned Astro-Numerologist, Life Consultant, and the creator of the FEAN Method (Five Elements, Astrology & Numerology)—a unique framework that combines ancient wisdom with practical decision-making for modern life.
          </p>
          <p>
            His professional journey began in the banking industry, where he spent over 12 years (2006–2018) with India's leading private sector banks, including HDFC Bank, Axis Bank, Kotak Mahindra Bank, and ICICI Bank in Mumbai. This experience gave him deep expertise in finance, strategic thinking, customer psychology, and relationship management.
          </p>
          <p>
            Driven by a passion to help people discover their true potential, Rajessh transitioned into full-time consulting in 2018. Since then, he has dedicated his career to empowering individuals, entrepreneurs, professionals, and families through personalized guidance based on the principles of FEAN—Five Elements, Astrology & Numerology.
          </p>
          <p>
            Today, with 9+ years of professional consulting experience and more than 10,000 successful consultations, Rajessh is recognized for delivering practical, result-oriented insights that help clients make confident decisions in every area of life.
          </p>

          <h4 className="text-base font-bold mt-6 mb-2 font-serif print:mt-3 print:mb-1 print:text-sm">Areas of Expertise</h4>
          <ul className="list-disc pl-10 space-y-1 print:pl-6">
            <li>FEAN Method (Five Elements, Astrology & Numerology)</li>
            <li>Vedic Astrology</li>
            <li>Numerology</li>
            <li>Graphology & Signature Analysis</li>
            <li>Career & Business Consulting</li>
            <li>Life Coaching</li>
            <li>Relationship & Marriage Guidance</li>
            <li>Personal Growth & Mindset Coaching</li>
            <li>Yoga & Holistic Wellness</li>
            <li>Rudraksha Consultation</li>
            <li>Five Element Personality Analysis</li>
          </ul>

          <h4 className="text-base font-bold mt-6 mb-2 font-serif print:mt-3 print:mb-1 print:text-sm">Mission</h4>
          <p>
            To bridge the gap between ancient knowledge and modern success by helping people understand themselves, make informed decisions, and unlock their highest potential through the transformative power of FEAN.
          </p>

          <h4 className="text-base font-bold mt-6 mb-2 font-serif print:mt-3 print:mb-1 print:text-sm">Vision</h4>
          <p>
            To establish the FEAN Method as a globally recognized system of personal transformation, empowering millions to live with greater clarity, purpose, balance, and prosperity.
          </p>

          <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 italic font-semibold text-center">
            "Your Birth Date is Your Blueprint. Learn to Read It, Transform Your Life."
          </div>
          
          <p className="text-center font-bold text-gray-700 mt-4 text-sm">
            10,000+ Consultations | 9+ Years of Professional Experience | Trusted Guide for Personal & Professional Growth
          </p>
        </div>
      </EbookHeaderFooter>

'''

target = '      {/* --- PAGE 1: Course Structure --- */}'

if target in content and 'PAGE 0: About the Author' not in content:
    new_content = content.replace(target, author_content + target)
    with open('frontend/components/ui/astrology/EbookContents.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully updated EbookContents.tsx')
else:
    print('Target not found or already inserted!')
