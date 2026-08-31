import sys

with open('feanebook.md', 'r', encoding='utf-8') as f:
    content = f.read()

target = ' –Raajesh S PandayEducational Background: • B.Tech – HBTU Kanpur • M.Tech – IIT Roorkee Professional Experience: • Deputy Manager at Heavy Engineering Corporation Limited (HEC), Ranchi (CPSU) – 8 years of experience in the heavy engineering sector. • Founder & Director of Kiara Astro ABC Pvt Ltd – Innovating Life with FEAN Method AMC . • Discoverer of FEAN Method AMC  – A research-based, innovative approach to astrology and numerology. Awards & Recognitions: • Right Choice Award 2024 (Delhi) in Astrology & Occult Science – Presented by Vaani Kapoor. • Best Astrologer Award in Global Business Award 2021 – Presented by Prachi Desai. Authorship: • Author of Self Made Destiny – Vedic Astrology (ISBN: 978-93-5427-087-1).Raajesh S Pandayseamlessly blends engineering expertise with a deep passion for astrology and numerology. His innovative FEAN Method AMC  integrates traditional wisdom with scientific insights, offering groundbreaking methods to balance elemental energies and enhance well-being.'

replacement = '''
Rajessh Paanday
Creator of FEAN Method Astrology AMB| Life & Business Transformation Consultant

Rajessh Paanday is a renowned Astro-Numerologist, Life Consultant, and the creator of the FEAN Method (Five Elements, Astrology & Numerology)—a unique framework that combines ancient wisdom with practical decision-making for modern life.

His professional journey began in the banking industry, where he spent over 12 years (2006–2018) with India's leading private sector banks, including HDFC Bank, Axis Bank, Kotak Mahindra Bank, and ICICI Bank in Mumbai. This experience gave him deep expertise in finance, strategic thinking, customer psychology, and relationship management.

Driven by a passion to help people discover their true potential, Rajessh transitioned into full-time consulting in 2018. Since then, he has dedicated his career to empowering individuals, entrepreneurs, professionals, and families through personalized guidance based on the principles of FEAN—Five Elements, Astrology & Numerology.

Today, with 9+ years of professional consulting experience and more than 10,000 successful consultations, Rajessh is recognized for delivering practical, result-oriented insights that help clients make confident decisions in every area of life.

### Areas of Expertise
* FEAN Method (Five Elements, Astrology & Numerology)
* Vedic Astrology
* Numerology
* Graphology & Signature Analysis
* Career & Business Consulting
* Life Coaching
* Relationship & Marriage Guidance
* Personal Growth & Mindset Coaching
* Yoga & Holistic Wellness
* Rudraksha Consultation
* Five Element Personality Analysis

### Mission

To bridge the gap between ancient knowledge and modern success by helping people understand themselves, make informed decisions, and unlock their highest potential through the transformative power of FEAN.

### Vision

To establish the FEAN Method as a globally recognized system of personal transformation, empowering millions to live with greater clarity, purpose, balance, and prosperity.

"Your Birth Date is Your Blueprint. Learn to Read It, Transform Your Life."

10,000+ Consultations | 9+ Years of Professional Experience | Trusted Guide for Personal & Professional Growth
'''

if target in content:
    new_content = content.replace(target, replacement)
    with open('feanebook.md', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully updated feanebook.md')
else:
    print('Target not found!')
