import React from 'react';

const courseStructure = [
 {"chapter": 1, "title": "What is FEAN Method Astrology AMB ?"},
 {"chapter": 2, "title": "What are Five elements and their importance in our life?"},
 {"chapter": 3, "title": "What is the difference between FEAN Method Astrology AMB and Numerology?"},
 {"chapter": 4, "title": "Why FEAN Method Astrology AMB is better than Numerology?"},
 {"chapter": 5, "title": "What is Moolank and How to calculate"},
 {"chapter": 6, "title": "What is Bhagyank and How to calculate"},
 {"chapter": 7, "title": "How to Make Birth Grid"},
 {"chapter": 8, "title": "Detailed description of Five elements"},
 {"chapter": 9, "title": "What is concentration of Five elements and Their effects"},
 {"chapter": 10, "title": "Importance of concentration level of elements at the time of birth and at the present time in FEAN Method Astrology AMB"},
 {"chapter": 11, "title": "How to calculate Lucky Numbers, Enemy Numbers and Neutral Numbers"},
 {"chapter": 12, "title": "How to calculate Name's frequency using Chaldean method"},
 {"chapter": 13, "title": "Discuss concentration level and comparison with other elements and predictions"},
 {"chapter": 14, "title": "How to identify and control our Anxiety and Depression & Bill power"},
 {"chapter": 15, "title": "How to balance our thoughts and emotions"},
 {"chapter": 16, "title": "How to calculate health status and Powerful basic remedies"},
 {"chapter": 17, "title": "How to balance our Social Connectivity, Struggles and Career growth"},
 {"chapter": 18, "title": "How to Get Job, Opportunities, Promotions etc"},
 {"chapter": 19, "title": "How to grow Business and maintain good cash flow for smooth running business"},
 {"chapter": 20, "title": "How to balance our Luxury, Savings, Expenses, Romance and Physical relationships"},
 {"chapter": 21, "title": "How to balance good married life and Relationships and Care of Spouse."},
 {"chapter": 22, "title": "How to balance our satisfaction in life"},
 {"chapter": 23, "title": "How to balance our Property/Real estate business"},
 {"chapter": 24, "title": "How to find Suitable Rudraksha and Benefits of Rudraksha"},
 {"chapter": 25, "title": "How to Find best suitable frequency of Name"},
 {"chapter": 26, "title": "How to decide frequency of business name and know your company growth."},
 {"chapter": 27, "title": "How to check email ids, vehicle numbers, House Numbers etc."},
 {"chapter": 28, "title": "Basics of Vedic Astrology and how to integrate with Birth Grid & Find Problems in person's life. – will be covered in Live sessions"},
 {"chapter": 29, "title": "Some Special cases & Principles of FEAN Method Astrology AMB – will be covered in Live sessions"},
 {"chapter": 30, "title": "Cover Vedic Astrology and Lagna Wise Analysis – will be covered in Live sessions"},
 {"chapter": 31, "title": "Gemstones Analysis – will be covered in Live sessions"},
 {"chapter": 32, "title": "Manglik Dosh Analysis – will be covered in Live sessions"},
 {"chapter": 33, "title": "Rajyog Analysis As per Kundli – will be covered in Live sessions"},
 {"chapter": 34, "title": "Remedies – will be covered in Live sessions"},
 {"chapter": 35, "title": "Practice of kundli and Loshu Grid & Prediction. – will be covered in Live sessions"}
];

const EbookHeaderFooter = ({ children, hideFooter = false, hideWatermark = false, allowFlow = false, printFontSize = "print:text-[15px]", className = "" }: { children: React.ReactNode, hideFooter?: boolean, hideWatermark?: boolean, allowFlow?: boolean, printFontSize?: string, className?: string }) => {
 return (
 <div className={`relative bg-white text-black p-8 md:p-12 mb-12 shadow-md border border-gray-200 
  print:shadow-none print:border-none print:m-0 print:px-12 print:py-10
  print:w-[210mm] print:box-border print:break-after-page page-container ${allowFlow ? '' : 'print:h-[297mm] print:overflow-hidden print:flex print:flex-col'} ${className}`}>
  
  {/* Watermark Logo */}
  {!hideWatermark && (
  <div className="absolute inset-0 z-0 flex justify-center items-center opacity-[0.15] pointer-events-none">
  <img src="/images/logo.png" alt="OM Astrology AMC Watermark" className="w-[80%] object-contain" />
  </div>
  )}

  {/* Header */}
  <div className="relative z-10 flex justify-between items-center mb-6 pb-2 border-b border-gray-300 print:pb-2 shrink-0">
  <img src="/images/logo.png" alt="OM Astrology AMC Logo" className="h-10 w-auto print:h-12" />
  <h2 className="text-lg font-bold font-serif text-center flex-grow print:text-xl ">FEAN Method Astrology AMB ™</h2>
  <div className="w-10 print:w-12"></div> {/* Spacer for centering */}
  </div>

  {/* Main Content Area - Normal text size for print to fill space */}
  <div className={`relative z-10 ${printFontSize} ${allowFlow ? '' : 'flex-grow overflow-hidden'}`}>
  {children}
  </div>

 {/* Footer */}
 {!hideFooter && (
 <div className="relative z-10 mt-6 pt-2 border-t border-gray-300 flex justify-between text-[11px] text-gray-500 shrink-0 print:pt-2">
 <div className="flex items-center space-x-2">
 <span className="text-red-600 font-bold">©</span>
 <span>All Rights Reserved © OM Astrology AMC ™</span>
 </div>
 <div>@ FEAN Method Astrology AMB ™ by – Rajessh Paanday</div>
 </div>
 )}
 </div>
 );
};

export const EbookContents = () => {
 return (
 <div className="max-w-4xl mx-auto font-sans">
 
  {/* --- PAGE -1: Book Cover & Disclaimer --- */}
  <EbookHeaderFooter allowFlow={true} hideFooter={true} hideWatermark={true} className="original-spacing">
  <div className="flex flex-col items-center justify-center mt-4 mb-8 w-full print:mt-12">
  <div className="w-[70%] md:w-[60%] print:w-[55%] mx-auto mb-12">
  <img 
  src="/Fean-ebook-cover.png" 
  alt="FEAN Method Astrology Book Cover" 
  className="w-full h-auto"
  />
  </div>
  
  <div className="text-center space-y-8 max-w-4xl mx-auto px-4 print:px-8 mt-12">
  <p className="font-bold text-gray-800 text-base md:text-lg print:text-[15px] leading-relaxed">
  “This digital property, including all content, in part or whole, belongs to OM Astrology AMC.
  Unauthorized modification, reproduction, distribution or sale of this property is strictly prohibited.”
  </p>
  <p className="font-bold text-gray-900 text-lg md:text-xl print:text-[16px] underline">
  FEAN Method Astrology AMB ™ is a patented innovation of OM Astrology AMC ™
  </p>
  </div>
  </div>
  </EbookHeaderFooter>

  {/* --- PAGE 2: About the Author (Bio) --- */}
  <EbookHeaderFooter allowFlow={true} hideFooter={true} className="original-spacing">
    <h3 className="text-3xl font-bold text-center underline mb-6 font-serif print:text-[22px]">About the Author</h3>
    
    <div className="flex flex-col items-center mb-8">
      <div className="w-64 md:w-72 h-80 md:h-96 rounded-lg overflow-hidden border-4 border-amber-300 shadow-xl mb-4 print:w-72 print:h-96 print:shadow-none print:border-2 print:border-amber-400">
        <img 
          src="/author.jpg" 
          alt="Rajessh Paanday" 
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.currentTarget.src = 'https://ui-avatars.com/api/?name=Rajessh+Paanday&background=f4b084&color=fff&size=200';
          }}
        />
      </div>
      <h4 className="text-4xl font-bold text-gray-900 text-center print:text-[24px]">Rajessh Paanday</h4>
      <p className="text-[17px] text-amber-800 font-bold text-center mt-2 print:text-[17px]">Creator of FEAN Method Astrology AMB | Life & Business Transformation Consultant</p>
    </div>
    
    <div className="space-y-6 text-justify text-[17px] print:text-[17px] print:leading-relaxed text-gray-800 leading-relaxed">
      <p>
        Rajessh Paanday is a renowned Astro-Numerologist, Life Consultant, and the creator of the FEAN Method Astrology (Five Elements, Astrology & Numerology)—a unique framework that combines ancient wisdom with practical decision-making for modern life.
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
    </div>
  </EbookHeaderFooter>

  {/* --- PAGE 3: Areas of Expertise, Mission & Vision --- */}
  <EbookHeaderFooter allowFlow={true} hideFooter={true} className="original-spacing">
    <div className="space-y-8 text-gray-900 print:text-[17px] print:leading-relaxed">
      <div>
        <h4 className="text-2xl font-bold font-serif mb-4 text-gray-900 print:text-[19px]">Areas of Expertise</h4>
        <ul className="list-disc pl-10 space-y-2 text-[17px] print:text-[17px] print:pl-8 text-gray-800">
          <li>FEAN Method Astrology (Five Elements, Astrology & Numerology)</li>
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
      </div>

      <div>
        <h4 className="text-2xl font-bold font-serif mb-3 text-gray-900 print:text-[19px]">Mission</h4>
        <p className="text-[17px] print:text-[17px] text-justify leading-relaxed text-gray-800">
          To bridge the gap between ancient knowledge and modern success by helping people understand themselves, make informed decisions, and unlock their highest potential through the transformative power of FEAN.
        </p>
      </div>

      <div>
        <h4 className="text-2xl font-bold font-serif mb-3 text-gray-900 print:text-[19px]">Vision</h4>
        <p className="text-[17px] print:text-[17px] text-justify leading-relaxed text-gray-800">
          To establish the FEAN Method Astrology as a globally recognized system of personal transformation, empowering millions to live with greater clarity, purpose, balance, and prosperity.
        </p>
      </div>

      <div className="mt-10 p-6 bg-[#fffdf5] border-l-4 border-amber-500 italic font-semibold text-center text-xl md:text-2xl print:text-[18px] text-gray-900 rounded-r-lg shadow-sm">
        "Your Birth Date is Your Blueprint. Learn to Read It, Transform Your Life."
      </div>
      
      <p className="text-center font-bold text-gray-900 mt-8 text-[15px] print:text-[15px] border-t border-gray-300 pt-6">
        10,000+ Consultations | 9+ Years of Professional Experience | Trusted Guide for Personal & Professional Growth
      </p>
    </div>
  </EbookHeaderFooter>

 {/* --- PAGE 1: Course Structure --- */}
 <EbookHeaderFooter className="original-spacing">
 <h3 className="text-xl font-bold text-center underline mb-4 font-serif print:text-base ">Course Structure</h3>
 <table className="w-full border-collapse border border-black text-sm ">
 <tbody>
 {courseStructure.map((item) => (
 <tr key={item.chapter} className="bg-[#fff6e6] hover:bg-[#ffedcc] print:bg-[#fff6e6]">
 <td className="border border-black p-1 text-center w-8 font-bold print:p-0.5">{item.chapter}</td>
 <td className="border border-black p-1 pl-2 print:p-0.5 print:pl-1">
 {item.title.includes("Live sessions") ? (
 <>
 {item.title.split("–")[0]} – <strong>{item.title.split("–")[1]}</strong>
 </>
 ) : item.title.includes("FEAN Method Astrology AMB") ? (
 <>
 {item.title.split("FEAN Method Astrology AMB")[0]}
 <strong>FEAN Method Astrology AMB</strong>
 {item.title.split("FEAN Method Astrology AMB")[1]}
 </>
 ) : (
 item.title
 )}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </EbookHeaderFooter>

 {/* --- PAGE 2: Introduction --- */}
 <EbookHeaderFooter>
 <h3 className="text-lg font-bold text-center underline mb-4 font-serif print:text-base">
 FEAN Method Astrology AMB (Five Elements, Astrology & Numerology)
 </h3>
 
 <h4 className="text-base font-bold mb-4 font-serif ">
 FEAN Method Astrology AMB: A Revolutionary Approach by Rajessh Paanday
 </h4>
 
 <div className="space-y-4 text-justify ">
 <p>
 FEAN Method Astrology AMB, a patented and groundbreaking innovation by <strong>Rajessh Paanday</strong>, Managing Director of OM Astrology AMC, aims to transform lives by harmonizing the five essential elements: Air, Water, Fire, Earth, and Sky.
 </p>
 <p>
 FEAN Method Astrology AMB specializes in analyzing the <strong>concentration levels of the five essential elements</strong>—Air, Water, Fire, Earth, and Sky—within the human body. By evaluating these levels, the method identifies imbalances that may lead to mental, physical, or emotional challenges.
 </p>
 <p>
 Also known as <strong>FEAN Method Astrology AMB (Five Elements, Astrology & Numerology)</strong>, this research-driven approach focuses on analyzing the concentration levels of these elements within the human body. By identifying imbalances, FEAN Method Astrology AMB uncovers the root causes of various challenges in life. It provides personalized insights and prescribes effective, tailored remedies to restore balance and enhance overall well-being.
 </p>
 <p>
 At the core of FEAN Method Astrology AMB lies the <strong>Lo Shu Grid</strong>, an ancient numerological tool where each number corresponds to a specific element. FEAN Method Astrology AMB calculates the energy concentration of these elements based on the numbers in the grid. Imbalances in elemental concentrations can manifest as mental and physical health disorders, making the analysis crucial for understanding and addressing these issues.
 </p>

 <h4 className="text-base font-bold mt-6 mb-2 font-serif ">What Sets FEAN Method Astrology AMB Apart?</h4>
 
 <p>
 Unlike traditional practices, FEAN Method Astrology AMB bridges the gap between <strong>astrology</strong> and <strong>numerology</strong>. While astrology offers insights into planetary influences, numerology interprets the significance of numbers. FEAN Method Astrology AMB combines both, focusing on the concentration levels of elements and their effects on life.
 </p>
 <p>
 This innovative approach considers not only the elemental concentrations present at birth but also the real-time elemental imbalances experienced in day-to-day life. By addressing both, it provides a comprehensive solution that goes beyond conventional numerology practices.
 </p>
 <p>
 This <strong>distinctive method</strong> evaluates both:
 </p>
 <ol className="list-decimal pl-12 space-y-1 print:pl-6">
 <li><strong>Concentration Levels at Birth:</strong> Derived from the Lo Shu Grid and planetary placements, providing a foundation of inherent energy balance.</li>
 <li><strong>Real-Time Elemental Concentrations:</strong> Reflecting current life situations and challenges.</li>
 </ol>
 <p>
 By addressing both innate and situational imbalances, FEAN Method Astrology AMB goes beyond traditional numerology to provide tailored, actionable remedies for achieving balance in life.
 </p>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 3: Core Philosophy & Grid --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-2 font-serif print:text-base print:mt-1 print:mb-1 print:text-base">Core Philosophy</h4>
 <p className="mb-2">According to <strong>FEAN Method Astrology AMB</strong>:</p>
 <ul className="list-disc pl-10 space-y-1 mb-4 print:pl-6">
 <li>Everything in the universe is made up of five elements: Water, Fire, Air, Sky (Metal), and Earth.</li>
 <li>Controlling the concentration levels of these elements in the body can influence mental and physical health.</li>
 <li>A balance in these elements allows an individual to achieve their goals and live a harmonious life.</li>
 </ul>
 <p className="mb-4">
 The imbalance or deficiency of these elements creates problems that may manifest as mental, emotional, or physical disorders. FEAN Method Astrology AMB uniquely combines astrological planetary insights and numerical interpretations to analyze and correct these imbalances.
 </p>
 <p className="mb-6">
 We calculate the concentration levels of all elements based on the Lo Shu Grid, which is created using the real date of birth.
 </p>

 <h4 className="text-lg font-bold mb-2 font-serif print:text-base print:mt-1 print:mb-1 print:text-base">Basic Terminology in FEAN Method Astrology AMB</h4>
 <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6">
 <li>Loshu Grid/Birth Grid</li>
 <li>Numbers/Elements (1-9)</li>
 <li>Moolank & Bhagyank</li>
 <li>Concentration level of elements</li>
 </ul>

 <h4 className="text-lg font-bold mb-2 font-serif print:text-base print:mt-1 print:mb-1 print:text-base">Standard Loshu Grid :</h4>
 <p className="mb-6">
 The Lo Shu grid is a 3x3 magic square that is used in FEAN Method Astrology AMB, numerology and feng shui. It is also known as the sacred square. How it works The grid is made up of nine cells, each representing a different aspect of life. The numbers 1–9 are arranged in the grid's three rows and three columns. The sum of any three numbers in the grid, whether added horizontally, vertically, or diagonally, is 15 = 6. Numbers, Moolank & Bhagyank from a person's birth date are assigned to specific boxes in the grid. The pattern of numbers in the grid can reveal insights into a person's strengths, weaknesses, and overall life balance.
 </p>

 {/* 3x3 Standard Grid */}
 <div className="flex justify-center mb-6">
 <div className="grid grid-cols-3 w-64 border-2 border-black bg-[#fff6e6] print:w-56">
 <div className="border border-black flex items-center justify-center h-20 text-2xl font-bold print:h-16 print:text-xl">4</div>
 <div className="border border-black flex items-center justify-center h-20 text-2xl font-bold print:h-16 print:text-xl">9</div>
 <div className="border border-black flex items-center justify-center h-20 text-2xl font-bold print:h-16 print:text-xl">2</div>
 <div className="border border-black flex items-center justify-center h-20 text-2xl font-bold print:h-16 print:text-xl">3</div>
 <div className="border border-black flex items-center justify-center h-20 text-2xl font-bold print:h-16 print:text-xl">5</div>
 <div className="border border-black flex items-center justify-center h-20 text-2xl font-bold print:h-16 print:text-xl">7</div>
 <div className="border border-black flex items-center justify-center h-20 text-2xl font-bold print:h-16 print:text-xl">8</div>
 <div className="border border-black flex items-center justify-center h-20 text-2xl font-bold print:h-16 print:text-xl">1</div>
 <div className="border border-black flex items-center justify-center h-20 text-2xl font-bold print:h-16 print:text-xl">6</div>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 4: Moolank 1-9 --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-2 font-serif print:text-base print:mt-1 print:mb-1 print:text-base">What is Moolank and How to Calculate ?</h4>
 <p className="mb-2 text-justify">
 In Numerology and FEAN Method Astrology AMB, Moolank refers to the Root Number of a person, which is derived from their date of birth. This number holds significant influence over <strong>personality, characteristics, strengths, and weaknesses</strong>.
 </p>
 <p className="mb-4 text-justify">
 Moolank plays a crucial role in FEAN Method Astrology AMB, as it represents the core elemental energy associated with a person's birth date.
 </p>

 <ul className="list-disc pl-10 space-y-2 mb-4 print:pl-6">
 <li><strong>Moolank is calculated by reducing the date of birth (day only) to a single-digit number (1 to 9).</strong></li>
 </ul>

 <p className="font-bold mb-1">Formula:</p>
 <ul className="list-disc pl-10 space-y-1 mb-4 print:pl-6">
 <li><strong>Moolank = Sum of the Digits of the Birth Date (Reduced to a Single Digit)</strong></li>
 </ul>

 <p className="font-bold mb-1">Examples:</p>
 <ol className="list-decimal pl-10 space-y-2 mb-6 print:pl-6">
 <li>
 If the Birth Date is 5th January 1995
 <ul className="list-circle pl-6 mt-1 text-gray-700 space-y-1">
 <li>Moolank = 5 (Single digit, so no further reduction)</li>
 </ul>
 </li>
 <li>
 If the Birth Date is 14th July 1987
 <ul className="list-circle pl-6 mt-1 text-gray-700 space-y-1">
 <li>1 + 4 = 5</li>
 <li>Moolank = 5</li>
 </ul>
 </li>
 </ol>

 <h4 className="text-base font-bold mb-2 text-center ">Moolank (Root Number) and Their Meanings</h4>
 <p className="mb-2 text-center">Each Moolank is associated with a specific element and planetary energy:</p>
 
 <table className="w-full border-collapse border border-black text-sm ">
 <thead>
 <tr className="bg-gray-100">
 <th className="border border-black p-1 font-bold text-left w-16">Moolank</th>
 <th className="border border-black p-1 font-bold text-left">Element</th>
 <th className="border border-black p-1 font-bold text-left">Planet</th>
 <th className="border border-black p-1 font-bold text-left">Personality Traits</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-black p-1 text-center font-bold">1</td>
 <td className="border border-black p-1">Water</td>
 <td className="border border-black p-1">Sun (Surya)</td>
 <td className="border border-black p-1">Leadership, confidence, authority, intelligence, independence</td>
 </tr>
 <tr>
 <td className="border border-black p-1 text-center font-bold">2</td>
 <td className="border border-black p-1">Earth</td>
 <td className="border border-black p-1">Moon (Chandra)</td>
 <td className="border border-black p-1">Emotional, caring, sensitive</td>
 </tr>
 <tr>
 <td className="border border-black p-1 text-center font-bold">3</td>
 <td className="border border-black p-1">Soft Wood (Air)</td>
 <td className="border border-black p-1">Jupiter (Guru)</td>
 <td className="border border-black p-1">Social, knowledgeable, spiritual, creative</td>
 </tr>
 <tr>
 <td className="border border-black p-1 text-center font-bold">4</td>
 <td className="border border-black p-1">Hard Wood (Air)</td>
 <td className="border border-black p-1">Rahu</td>
 <td className="border border-black p-1">Practical, disciplined, hardworking, logical</td>
 </tr>
 <tr>
 <td className="border border-black p-1 text-center font-bold">5</td>
 <td className="border border-black p-1">Earth</td>
 <td className="border border-black p-1">Mercury (Budh)</td>
 <td className="border border-black p-1">Adaptable, intelligent, quick thinker, communicator</td>
 </tr>
 <tr>
 <td className="border border-black p-1 text-center font-bold">6</td>
 <td className="border border-black p-1">Sky (Yellow Metal)</td>
 <td className="border border-black p-1">Venus (Shukra)</td>
 <td className="border border-black p-1">Luxury-loving, charming, artistic, romantic</td>
 </tr>
 <tr>
 <td className="border border-black p-1 text-center font-bold">7</td>
 <td className="border border-black p-1">Sky (White Metal)</td>
 <td className="border border-black p-1">Ketu</td>
 <td className="border border-black p-1">Spiritual, philosophical, analytical, deep thinker, strong intuition power</td>
 </tr>
 <tr>
 <td className="border border-black p-1 text-center font-bold">8</td>
 <td className="border border-black p-1">Earth</td>
 <td className="border border-black p-1">Saturn (Shani)</td>
 <td className="border border-black p-1">Disciplined, responsible, serious, strong-willed</td>
 </tr>
 <tr>
 <td className="border border-black p-1 text-center font-bold">9</td>
 <td className="border border-black p-1">Fire</td>
 <td className="border border-black p-1">Mars (Mangal)</td>
 <td className="border border-black p-1">Courageous, aggressive, energetic, goal-oriented</td>
 </tr>
 </tbody>
 </table>
 </EbookHeaderFooter>

 {/* --- PAGE 5: Bhagyank Intro --- */}
 <EbookHeaderFooter className="original-spacing">
 <h4 className="text-lg font-bold mb-2 font-serif print:text-base print:mt-1 print:mb-1 print:text-base">What is Bhagyank (Destiny Number)?</h4>
 <p className="mb-2 text-justify">
 In Numerology, Bhagyank (also known as Destiny Number) represents a person's overall life purpose, destiny, and the major influences shaping their life journey. It is derived from the full date of birth (Day + Month + Year) and provides insights into a person's fate, strengths, challenges, and opportunities.
 </p>
 <p className="mb-4 text-justify">
 <strong>In FEAN Method Astrology AMB, Bhagyank plays a crucial role in understanding a person's elemental balance and planetary influences.</strong>
 </p>

 <h4 className="font-bold mb-1">How to Calculate Bhagyank (Destiny Number)?</h4>
 <ul className="list-disc pl-10 space-y-1 mb-4 print:pl-6">
 <li>Bhagyank is calculated by adding all the digits of the full birth date and reducing it to a single-digit number (1 to 9).</li>
 </ul>

 <p className="font-bold mb-1">Formula:</p>
 <ul className="list-disc pl-10 space-y-1 mb-4 print:pl-6">
 <li><strong>Bhagyank = Sum of Birth Date Digits (Day + Month + Year), Reduced to a Single Digit</strong></li>
 </ul>

 <p className="font-bold mb-1">Examples:</p>
 <ol className="list-decimal pl-10 space-y-2 mb-6 print:pl-6">
 <li>
 If the Birth Date is 5th January 1995
 <ul className="list-circle pl-6 mt-1 text-gray-700 space-y-1">
 <li>5 + 1 + 1 + 9 + 9 + 5 = 30</li>
 <li>3 + 0 = 3</li>
 <li>Bhagyank = 3</li>
 </ul>
 </li>
 <li>
 If the Birth Date is 14th July 1987
 <ul className="list-circle pl-6 mt-1 text-gray-700 space-y-1">
 <li>1 + 4 + 7 + 1 + 9 + 8 + 7 = 37</li>
 <li>3 + 7 = 10</li>
 <li>1 + 0 = 1</li>
 <li>Bhagyank = 1</li>
 </ul>
 </li>
 </ol>
 </EbookHeaderFooter>

 {/* --- PAGE 6: Bhagyank 1-9 & Differences --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Bhagyank (Destiny Number) and Their Meanings</h4>
 <ul className="list-disc pl-10 mb-4 print:pl-6">
 <li>Each Bhagyank is associated with a specific element, planetary energy, and life purpose:</li>
 </ul>

 <table className="w-full border-collapse border border-black text-[12px] mb-8">
 <thead>
 <tr className="bg-gray-100">
 <th className="border border-black p-1 font-bold text-left">Bhagyank</th>
 <th className="border border-black p-1 font-bold text-left">Element</th>
 <th className="border border-black p-1 font-bold text-left">Planet</th>
 <th className="border border-black p-1 font-bold text-left">Life Purpose & Traits</th>
 </tr>
 </thead>
 <tbody>
 <tr><td className="border border-black p-1 text-center font-bold">1</td><td className="border border-black p-1">Water</td><td className="border border-black p-1">Sun (Surya)</td><td className="border border-black p-1">Leadership, independence, authority, innovation</td></tr>
 <tr><td className="border border-black p-1 text-center font-bold">2</td><td className="border border-black p-1">Earth</td><td className="border border-black p-1">Moon (Chandra)</td><td className="border border-black p-1">Emotional balance, relationships, adaptability, nurturing</td></tr>
 <tr><td className="border border-black p-1 text-center font-bold">3</td><td className="border border-black p-1">Soft Wood (Air)</td><td className="border border-black p-1">Jupiter (Guru)</td><td className="border border-black p-1">Knowledge, wisdom, creativity, spirituality</td></tr>
 <tr><td className="border border-black p-1 text-center font-bold">4</td><td className="border border-black p-1">Hard Wood (Air)</td><td className="border border-black p-1">Rahu</td><td className="border border-black p-1">Hard work, stability, practicality, unconventional thinking</td></tr>
 <tr><td className="border border-black p-1 text-center font-bold">5</td><td className="border border-black p-1">Earth</td><td className="border border-black p-1">Mercury (Budh)</td><td className="border border-black p-1">Communication, intelligence, versatility, travel</td></tr>
 <tr><td className="border border-black p-1 text-center font-bold">6</td><td className="border border-black p-1">Sky (Yellow Metal)</td><td className="border border-black p-1">Venus (Shukra)</td><td className="border border-black p-1">Luxury, love, beauty, creativity, romance</td></tr>
 <tr><td className="border border-black p-1 text-center font-bold">7</td><td className="border border-black p-1">Sky (White Metal)</td><td className="border border-black p-1">Ketu</td><td className="border border-black p-1">Spirituality, research, wisdom, detachment</td></tr>
 <tr><td className="border border-black p-1 text-center font-bold">8</td><td className="border border-black p-1">Earth</td><td className="border border-black p-1">Saturn (Shani)</td><td className="border border-black p-1">Discipline, responsibility, perseverance, karmic lessons</td></tr>
 <tr><td className="border border-black p-1 text-center font-bold">9</td><td className="border border-black p-1">Fire</td><td className="border border-black p-1">Mars (Mangal)</td><td className="border border-black p-1">Courage, aggression, determination</td></tr>
 </tbody>
 </table>

 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Difference Between Moolank and Bhagyank</h4>
 <table className="w-full border-collapse border border-black text-[13px]">
 <thead>
 <tr className="bg-[#fff2cc]">
 <th className="border border-black p-2 font-bold text-left">Factor</th>
 <th className="border border-black p-2 font-bold text-left">Moolank (Root Number)</th>
 <th className="border border-black p-2 font-bold text-left">Bhagyank (Destiny Number)</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-black p-2 font-bold">Derived From</td>
 <td className="border border-black p-2">Date of birth (only day)</td>
 <td className="border border-black p-2">Full date of birth (day + month + year)</td>
 </tr>
 <tr>
 <td className="border border-black p-2 font-bold">Represents</td>
 <td className="border border-black p-2">Personality, nature, and behavior</td>
 <td className="border border-black p-2">Life path, destiny, and long-term success</td>
 </tr>
 <tr>
 <td className="border border-black p-2 font-bold">Role in Life</td>
 <td className="border border-black p-2">How you express yourself in daily life</td>
 <td className="border border-black p-2">What you are destined to achieve</td>
 </tr>
 </tbody>
 </table>
 </EbookHeaderFooter>

 {/* --- PAGE 7: Birth Grid Examples --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-8 font-serif text-center print:text-base">How to Make Birth Grid from Date of Birth</h4>
 
 <div className="space-y-12 print:space-y-8">
 {/* Example 1 */}
 <div>
 <h5 className="font-bold mb-2">Example – 09/04/1990 (9th April 1990)</h5>
 <ul className="list-disc pl-10 space-y-1 mb-4 print:pl-6">
 <li className="text-green-600">Moolank (M) = 09 = 9</li>
 <li className="text-red-600">Bhagyank (B) = 0+9+0+4+1+9+9+0 = 32 = 5</li>
 </ul>
 
 <p className="mb-4">Now put All digits from date of birth along with Moolank and Bhagyank in Loshu Grid format.</p>
 
 <div className="flex justify-around items-center">
 {/* Standard Loshu Grid */}
 <div className="text-center">
 <p className="font-bold mb-2">(Standard Loshu Grid)</p>
 <div className="grid grid-cols-3 w-56 border-2 border-black bg-[#fff6e6] mx-auto print:w-48">
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">4</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">9</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">2</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">3</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">5</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">7</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">8</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">1</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">6</div>
 </div>
 </div>
 
 {/* Birth Grid */}
 <div className="text-center">
 <p className="font-bold mb-2">(Birth Grid)</p>
 <div className="grid grid-cols-3 w-56 border-2 border-black bg-[#fff6e6] mx-auto print:w-48">
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">4</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg text-green-700">9999</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg text-red-600">5</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">1</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
 </div>
 </div>
 </div>
 </div>

 {/* Example 2 */}
 <div>
 <h5 className="font-bold mb-2">Example – Date of Birth – 03/10/1981</h5>
 <ul className="list-disc pl-10 space-y-1 mb-4 print:pl-6">
 <li className="text-green-600">Moolank = 03 = 3</li>
 <li className="text-red-600">Bhagyank = 0+3+1+0+1+9+8+1 = 23 = 5</li>
 </ul>
 
 <div className="flex justify-around items-center">
 {/* Standard Loshu Grid */}
 <div className="text-center">
 <p className="font-bold mb-2">(Standard Loshu Grid)</p>
 <div className="grid grid-cols-3 w-56 border-2 border-black bg-[#fff6e6] mx-auto print:w-48">
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">4</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">9</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">2</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">3</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">5</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">7</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">8</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">1</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">6</div>
 </div>
 </div>
 
 {/* Birth Grid */}
 <div className="text-center">
 <p className="font-bold mb-2">(Birth Grid)</p>
 <div className="grid grid-cols-3 w-56 border-2 border-black bg-[#fff6e6] mx-auto print:w-48">
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">9</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"><span>3</span><span className="text-green-700">3</span></div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg text-red-600">5</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">8</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg">111</div>
 <div className="border border-black flex items-center justify-center h-16 font-bold text-xl print:text-lg"></div>
 </div>
 </div>
 </div>
 </div>
 

 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 8: Elements 1-9 Associations --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-8 font-serif text-center print:text-base">Elements/Numbers 1-9 and Their Associations in FEAN Method Astrology AMB</h4>
 
 {/* Colored Grid */}
 <div className="flex justify-center mb-8">
 <div className="grid grid-cols-3 w-full max-w-md border-2 border-black text-center print:w-full print:max-w-[400px]">
 <div className="border border-black bg-orange-200 p-2 flex flex-col justify-center py-4 px-2 ">
 <span className="font-bold text-xl leading-none print:text-lg">4</span>
 <span className="text-sm leading-tight mt-1 ">(Wood)</span>
 <span className="text-xs text-red-600 font-bold leading-tight mt-1">Controls the energy of Rahu</span>
 </div>
 <div className="border border-black bg-red-200 p-2 flex flex-col justify-center py-4 px-2 ">
 <span className="font-bold text-xl leading-none print:text-lg">9</span>
 <span className="text-sm leading-tight mt-1 ">(Fire)</span>
 <span className="text-xs text-red-600 font-bold leading-tight mt-1">Controls the energy of Mars</span>
 </div>
 <div className="border border-black bg-green-200 p-2 flex flex-col justify-center py-4 px-2 ">
 <span className="font-bold text-xl leading-none print:text-lg">2</span>
 <span className="text-sm leading-tight mt-1 ">(Earth)</span>
 <span className="text-xs text-red-600 font-bold leading-tight mt-1">Controls the energy of Moon</span>
 </div>
 <div className="border border-black bg-orange-200 p-2 flex flex-col justify-center py-4 px-2 ">
 <span className="font-bold text-xl leading-none print:text-lg">3</span>
 <span className="text-sm leading-tight mt-1 ">(Wood)</span>
 <span className="text-xs text-red-600 font-bold leading-tight mt-1">Controls the energy of Jupiter</span>
 </div>
 <div className="border border-black bg-green-200 p-2 flex flex-col justify-center py-4 px-2 ">
 <span className="font-bold text-xl leading-none print:text-lg">5</span>
 <span className="text-sm leading-tight mt-1 ">(Earth)</span>
 <span className="text-xs text-red-600 font-bold leading-tight mt-1">Controls the energy of Mercury</span>
 </div>
 <div className="border border-black bg-gray-200 p-2 flex flex-col justify-center py-4 px-2 ">
 <span className="font-bold text-xl leading-none print:text-lg">7</span>
 <span className="text-sm leading-tight mt-1 ">(White Metal)</span>
 <span className="text-xs text-red-600 font-bold leading-tight mt-1">Controls the energy of Ketu</span>
 </div>
 <div className="border border-black bg-green-200 p-2 flex flex-col justify-center py-4 px-2 ">
 <span className="font-bold text-xl leading-none print:text-lg">8</span>
 <span className="text-sm leading-tight mt-1 ">(Earth)</span>
 <span className="text-xs text-red-600 font-bold leading-tight mt-1">Controls the energy of Saturn</span>
 </div>
 <div className="border border-black bg-blue-200 p-2 flex flex-col justify-center py-4 px-2 ">
 <span className="font-bold text-xl leading-none print:text-lg">1</span>
 <span className="text-sm leading-tight mt-1 ">(Water)</span>
 <span className="text-xs text-red-600 font-bold leading-tight mt-1">Controls the energy of Sun</span>
 </div>
 <div className="border border-black bg-yellow-200 p-2 flex flex-col justify-center py-4 px-2 ">
 <span className="font-bold text-xl leading-none print:text-lg">6</span>
 <span className="text-sm leading-tight mt-1 ">(Gold Metal)</span>
 <span className="text-xs text-red-600 font-bold leading-tight mt-1">Controls the energy of Venus</span>
 </div>
 </div>
 </div>

 {/* Numbers Table */}
 <table className="w-full border-collapse border border-black text-sm mb-6 max-w-lg mx-auto">
 <thead>
 <tr className="bg-[#fff2cc]">
 <th className="border border-black p-2 font-bold text-left">Numbers</th>
 <th className="border border-black p-2 font-bold text-left">Elements</th>
 </tr>
 </thead>
 <tbody>
 <tr><td className="border border-black p-1">Number 1</td><td className="border border-black p-1">Water element</td></tr>
 <tr><td className="border border-black p-1">Number 2</td><td className="border border-black p-1">Earth Element</td></tr>
 <tr><td className="border border-black p-1">Number 3</td><td className="border border-black p-1">Soft Wood Element (Air element)</td></tr>
 <tr><td className="border border-black p-1">Number 4</td><td className="border border-black p-1">Hard Wood Element (Air element)</td></tr>
 <tr><td className="border border-black p-1">Number 5</td><td className="border border-black p-1">Earth Element</td></tr>
 <tr><td className="border border-black p-1">Number 6</td><td className="border border-black p-1">Golden Colour Metal Element (Sky Element)</td></tr>
 <tr><td className="border border-black p-1">Number 7</td><td className="border border-black p-1">White Metal Element (Sky Element)</td></tr>
 <tr><td className="border border-black p-1">Number 8</td><td className="border border-black p-1">Earth Element</td></tr>
 <tr><td className="border border-black p-1">Number 9</td><td className="border border-black p-1">Fire Element</td></tr>
 </tbody>
 </table>

 {/* Elements 1 and 2 Descriptions */}
 <div className="space-y-4 text-justify ">
 <div>
 <span className="font-bold">1. Number 1: Water Element</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Water element in our body Controls the energy of: <strong>Sun (Surya)</strong>. A balanced Water element ensures mental stability and resilience.</li>
 </ul>
 </div>
 <div>
 <span className="font-bold">2. Number 2: Earth Element</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Earth element (2) in our body Controls the energy of: <strong>Moon (Chandra)</strong>. Earth signifies emotional strength, grounding. A balanced Earth element (2) fosters stability in relationships.</li>
 <li>Number 2, representing the Earth element, signifies a person's emotional behavior.</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 9: Detailed Elements 3-9 --- */}
 <EbookHeaderFooter>
 <div className="space-y-4 text-justify ">
 <div>
 <span className="font-bold">3. Number 3: Air/Soft Wood Element</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Soft wood element (3) Controls the energy of: <strong>Jupiter (Guru)</strong>. Air symbolizes growth, learning, and adaptability. It supports intellectual development and expansion.</li>
 <li>In the Birth Grid, Number 3 (Wood element) represents social connectivity.</li>
 </ul>
 </div>
 
 <div>
 <span className="font-bold">4. Number 4: Hard Wood Element</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Hard wood element (4) Controls the energy of: <strong>Rahu</strong>. Hard Wood influences <strong>AMCition, material success, and focus.</strong></li>
 </ul>
 </div>
 
 <div>
 <span className="font-bold">5. Number 5: Earth Element</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Earth element (5) in our body Controls the energy of: <strong>Mercury (Budh)</strong>. This Earth element affects <strong>communication, intellect, and problem-solving skills</strong>. This element try to protect from all problems and create balance in life. Also provide satisfaction in life.</li>
 </ul>
 </div>
 
 <div>
 <span className="font-bold">6. Number 6: Sky/Yellow Metal Element</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Yellow metal element Controls the energy of: <strong>Venus (Shukra)</strong>. Sky relates to <strong>luxury, beauty, and creativity</strong>. It enhances relationships and material comforts.</li>
 </ul>
 </div>

 <div>
 <span className="font-bold">7. Number 7: Sky/White Metal Element</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>White metal element Controls the energy of: <strong>Ketu</strong>. It represents <strong>detachment, spirituality, and inner strength</strong>.</li>
 </ul>
 </div>

 <div>
 <span className="font-bold">8. Number 8: Earth Element</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Earth element (8) Controls the energy of: <strong>Saturn (Shani)</strong>. Earth influences <strong>discipline, endurance, and hard work.</strong></li>
 </ul>
 </div>

 <div>
 <span className="font-bold">9. Number 9: Fire Element</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Fire element Controls the energy of: <strong>Mars (Mangal)</strong>. Fire symbolizes <strong>strength, courage, and assertiveness</strong>. It drives Name, Fame, motivation and AMCition.</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>


 {/* --- PAGE 10: How to measure concentration --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">How to Measure Concentration level of Five Elements</h4>
 <p className="mb-6 text-justify">
 In FEAN Method Astrology AMB, the concentration level of the five elements—Water, Fire, Air, Sky (Metal), and Earth—is measured using the Lo Shu Grid, which is created based on a person's real date of birth.
 </p>

 <h4 className="font-bold mb-4">Steps to Measure the Concentration Level of the Five Elements:</h4>
 
 <div className="space-y-6 ">
 <div>
 <span className="font-bold">1. Create the Lo Shu Grid from the Date of Birth</span>
 <ul className="list-disc pl-10 mt-2 space-y-1 print:pl-6 text-sm">
 <li>Write down the date of birth (DD/MM/YYYY).</li>
 <li>Place each digit in the standard 3x3 Lo Shu Grid according to its predefined position.</li>
 <li>Also fill Person's Moolank and Bhagyank in the Loshu Grid.</li>
 </ul>
 </div>
 
 <div>
 <span className="font-bold">2. Identify the Numbers Present in the Grid</span>
 <p className="mt-2 mb-2 text-sm">Each number from 1 to 9 represents a different element:</p>
 <table className="w-full border-collapse border border-black text-sm mb-4">
 <thead>
 <tr className="bg-[#fff2cc]">
 <th className="border border-black p-1 font-bold text-left">Numbers</th>
 <th className="border border-black p-1 font-bold text-left">Elements</th>
 </tr>
 </thead>
 <tbody>
 <tr><td className="border border-black p-1 font-semibold">Number 1</td><td className="border border-black p-1">Water element</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 2</td><td className="border border-black p-1">Earth Element</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 3</td><td className="border border-black p-1">Soft Wood Element (Air element)</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 4</td><td className="border border-black p-1">Hard Wood Element (Air element)</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 5</td><td className="border border-black p-1">Earth Element</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 6</td><td className="border border-black p-1">Golden Colour Metal Element (Sky Element)</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 7</td><td className="border border-black p-1">White Metal Element (Sky Element)</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 8</td><td className="border border-black p-1">Earth Element</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 9</td><td className="border border-black p-1">Fire Element</td></tr>
 </tbody>
 </table>
 </div>

 <div>
 <span className="font-bold">3. Count the Frequency of Each Number</span>
 <ul className="list-disc pl-10 mt-2 space-y-1 print:pl-6 text-sm">
 <li>Each number's frequency in the Lo Shu Grid represents the concentration level of that element in the body at birth.</li>
 <li>Standard Concentration Rule:
 <ul className="list-circle pl-6 mt-1 space-y-1">
 <li>If a number appears once, its element is <strong>balanced</strong> (50%).</li>
 <li>If a number appears twice, the element reaches 100% <strong>(imbalanced state)</strong>.</li>
 <li>If a number appears three times (e.g., 999), the element reaches 150% (excess). <strong>(imbalanced state)</strong>.</li>
 <li>If a number appears four times (e.g., 9999), the element reaches 200%, and so on. <strong>(imbalanced state)</strong>.</li>
 </ul>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 

 {/* --- PAGE 11: Number 1 (Water Element) Detailed Description --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Number 1 (Water Element) – Detailed Description in FEAN Method Astrology AMB</h4>
 <p className="mb-4">In FEAN Method Astrology AMB, Number 1 represents the Water element, which plays a vital role in:</p>
 <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 font-semibold">
 <li>Speaking ability & word expression</li>
 <li>Mind behavior & reactions</li>
 <li>Introvert or extrovert nature</li>
 <li>Bone strength & veins</li>
 <li>Thinking ability & decision-making</li>
 </ul>
 <p className="mb-6 text-justify">
 Water element in our body Controls the energy of: <strong>Sun (Surya)</strong>.
 </p>
 <ul className="list-disc pl-10 space-y-2 mb-6 print:pl-6 text-justify">
 <li>
 <strong>The Water element controls the energy of the Sun (Surya).</strong> Therefore, an imbalance in the Water element increases the chances of a person experiencing bone-related and heart-related health issues. Additionally, it can lead to increased struggles and problems in the life of their father.
 </li>
 </ul>
 <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400 mb-8 print:p-2 text-justify">
 Unlike common misconceptions, <strong>the Water element does NOT control emotions, relationships, or mood swings</strong> - those are governed by other elements, particularly the Earth element (Number 2).
 </div>

 <h5 className="font-bold mb-4 underline">Some Terminology Used –</h5>
 <ul className="list-disc pl-10 space-y-1 mb-8 print:pl-6">
 <li>Element is <strong>Balanced</strong></li>
 <li>Element is <strong>imbalanced</strong></li>
 <li>Element is <strong>Missing</strong></li>
 </ul>

 {/* 3 Grid Examples Side-by-Side */}
 <div className="flex justify-between items-end gap-2">
 <div className="text-center flex-1">
 <div className="grid grid-cols-3 border-2 border-black bg-[#fff6e6] mx-auto w-full mb-2">
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">4</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">9</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">2</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">3</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">5</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">7</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">8</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-xl">1</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">6</div>
 </div>
 <p className="font-semibold text-sm">(Balanced)</p>
 </div>
 <div className="text-center flex-1">
 <div className="grid grid-cols-3 border-2 border-black bg-[#fff6e6] mx-auto w-full mb-2">
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">4</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">9</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">2</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">3</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">5</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">7</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">8</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-xl text-red-600">111</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">6</div>
 </div>
 <p className="font-semibold text-sm">(imbalanced)</p>
 </div>
 <div className="text-center flex-1">
 <div className="grid grid-cols-3 border-2 border-black bg-[#fff6e6] mx-auto w-full mb-2">
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">4</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">9</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">2</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">3</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">5</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">7</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">8</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-xl text-gray-400">*</div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg text-base">6</div>
 </div>
 <p className="font-semibold text-sm">*(Missing Element)</p>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 12: Key Characteristics of Number 1 --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base">Key Characteristics of Number 1 (Water Element)</h4>
 
 <div className="space-y-6 text-justify ">
 <div>
 <h5 className="font-bold flex items-center gap-2 mb-1">
 <span className="text-xl">❖</span> Speaking Ability & Expression of Words
 </h5>
 <ul className="list-disc pl-10 space-y-1 print:pl-6">
 <li>The Water element determines <strong>how effectively a person speaks and expresses thoughts.</strong></li>
 <li>A <strong>balanced Water element makes a person a good speaker</strong> with clear and confident speech.</li>
 <li>If <strong>Water is excessive than Fire, the person talks too much</strong> and may lack listening skills.</li>
 <li>If <strong>Water is missing, the person struggles to express words properly</strong> and may hesitate in conversations.</li>
 </ul>
 </div>

 <div>
 <h5 className="font-bold flex items-center gap-2 mb-1">
 <span className="text-xl">❖</span> Mind Behavior & Reaction to Situations
 </h5>
 <ul className="list-disc pl-10 space-y-1 print:pl-6">
 <li>Water controls <strong>how the mind reacts to different situations.</strong></li>
 <li>A <strong>balanced Water element keeps the mind calm, focused, and sharp.</strong></li>
 <li>If <strong>Water is excessive than Fire, the mind overreacts or becomes hyperactive.</strong></li>
 <li>If <strong>Water is missing, the person may struggle to respond quickly</strong> to challenges.</li>
 </ul>
 </div>

 <div>
 <h5 className="font-bold flex items-center gap-2 mb-1">
 <span className="text-xl">❖</span> Introvert or Extrovert Nature
 </h5>
 <ul className="list-disc pl-10 space-y-1 print:pl-6">
 <li>Water determines if a person is an introvert or extrovert.</li>
 <li><strong>More Water than Fire (9) →</strong> The person is <strong>extroverted</strong>, enjoys speaking, and socializes easily.</li>
 <li><strong>Less Water than Fire →</strong> The person is <strong>introverted</strong>, reserved, and prefers listening over talking.</li>
 </ul>
 </div>

 <div>
 <h5 className="font-bold flex items-center gap-2 mb-1">
 <span className="text-xl">❖</span> Bone Strength & Immunity
 </h5>
 <ul className="list-disc pl-10 space-y-1 print:pl-6">
 <li><strong>The Water element supports bone health and overall immunity.</strong></li>
 <li>If <strong>balanced, the person has strong bones and resistance to diseases.</strong></li>
 <li>If <strong>excessive than Fire, it may cause weaker bones, joint pain or reduced immunity.</strong></li>
 <li>If <strong>missing, the person may have bone-related health issues</strong>, weak bones, sometimes chances of injury & fracture of bones.</li>
 </ul>
 </div>

 <div>
 <h5 className="font-bold flex items-center gap-2 mb-1">
 <span className="text-xl">❖</span> Thinking Ability & Decision-Making
 </h5>
 <ul className="list-disc pl-10 space-y-1 print:pl-6">
 <li>Water controls how a person thinks and makes decisions.</li>
 <li>A balanced Water element allows logical, clear, and quick decision-making.</li>
 <li>If Water is excessive compared to Fire:
 <ul className="list-circle pl-6 mt-1 space-y-1">
 <li>The person overthinks too much, making decision-making difficult.</li>
 <li>Lacks presence of mind and struggles to stay focused.</li>
 <li>Unable to handle pressure in life and often give-up during tough times.</li>
 <li>Sometimes experiences depression phases.</li>
 </ul>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 13: Impact & Remedies for Number 1 --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Impact of Number 1 (Water Element) in the Lo Shu Grid</h4>
 
 <table className="w-full border-collapse border border-black text-sm mb-6 ">
 <thead>
 <tr className="bg-[#fff2cc]">
 <th className="border border-black p-2 font-bold text-left w-1/3">Water Element (1) in Lo Shu Grid</th>
 <th className="border border-black p-2 font-bold text-left">Meaning & Effect</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-black p-2 font-semibold">Missing (0 times)</td>
 <td className="border border-black p-2 text-justify">Weak speaking ability, difficulty in expressing thoughts, introverted nature, weak bones and veins problems.</td>
 </tr>
 <tr>
 <td className="border border-black p-2 font-semibold">Present Once (Balanced - 50%)</td>
 <td className="border border-black p-2 text-justify">Good speaking skills, clear thinking, balanced introvert-extrovert nature, strong bones, good immunity.</td>
 </tr>
 <tr>
 <td className="border border-black p-2 font-semibold">Present Twice (100%) - Imbalanced</td>
 <td className="border border-black p-2 text-justify">Over-talking, overreaction of mind, strong extrovert behavior, weak listening ability.</td>
 </tr>
 <tr>
 <td className="border border-black p-2 font-semibold">Present Three Times (150%)</td>
 <td className="border border-black p-2 text-justify">Excessive talking, hyperactive mind, lack of focus, lower immunity.</td>
 </tr>
 <tr>
 <td className="border border-black p-2 font-semibold">Present Four or More Times (200%+)</td>
 <td className="border border-black p-2 text-justify">Talking too much, loss of speech control, constant mind distraction, weak bones, unstable thinking.</td>
 </tr>
 </tbody>
 </table>

 <h5 className="font-bold mb-2 text-lg">Impact of Water Element Imbalance in Life</h5>
 <div className="space-y-4 mb-6 text-justify">
 <div>
 <span className="font-bold underline decoration-red-400">1. If Water (1) is Missing in the Lo Shu Grid</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Difficulty in speaking properly.</li>
 <li>Hesitation in expressing words and forming sentences.</li>
 <li>Struggles in public speaking, leadership, and debates.</li>
 <li>Weak confidence in presenting ideas.</li>
 <li>Weak bones and veins problems.</li>
 </ul>
 </div>
 <div>
 <span className="font-bold underline decoration-red-400">2. If Water (1) is Excessive (More than 100%) than Fire</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Talks too much, lacks listening skills.</li>
 <li>Mind overreacts quickly.</li>
 <li>Becomes too extroverted, hyperactive.</li>
 <li>Weaker immunity due to imbalance.</li>
 </ul>
 </div>
 </div>

 <h5 className="font-bold mb-2 text-lg">Remedies for Water Element Imbalance</h5>
 <div className="space-y-4 mb-6 text-justify">
 <div>
 <span className="font-bold underline">1. If Water (1) is Missing</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li><strong>Increase Water element by:</strong>
 <ul className="list-circle pl-6 mt-1">
 <li>Drinking more water mindfully every day.</li>
 <li>Carrying a water bottle at all times, even while sleeping.</li>
 </ul>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 15: Water Element Overflow --- */}
 <EbookHeaderFooter>
 <h5 className="font-bold mb-4 text-lg">Remedies for Water Element Imbalance (Continued)</h5>
 <div className="space-y-4 mb-6 text-justify">
 <div>
 <span className="font-bold underline">2. If Water (1) is Excessive</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li><strong>Reduce excess Water element by:</strong>
 <ul className="list-circle pl-6 mt-1">
 <li>Practicing control over excessive speaking.</li>
 <li>Donating water bottles to the needy.</li>
 <li>Meditating to balance mind reactions.</li>
 <li>As we know water element (1) controls the energy of Sun, <strong>Chanting the Surya Mantra ("Om Suryay Namah")</strong> daily to balance the Sun's energy.</li>
 </ul>
 </li>
 </ul>
 </div>
 </div>

 <h5 className="font-bold mb-2 text-lg">Conclusion</h5>
 <p className="text-justify">
 Number 1 (Water element) plays a major role in <strong>speaking ability, confidence, mind reactions, introvert-extrovert nature, bone health, and veins.</strong> A balanced Water element ensures a sharp mind, strong speech, and good immunity, while an imbalanced Water element can lead to over-talking, weak decision-making, or poor health.
 </p>
 </EbookHeaderFooter>

 {/* --- PAGE 14: Fire Element (Number 9) Deep Dive --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 font-serif text-center flex justify-center items-center gap-2 print:text-base">
 <span className="text-orange-600">🔥</span> Fire Element (Number 9) in FEAN Method Astrology <span className="text-orange-600">🔥</span>
 </h4>
 <p className="mb-6 text-justify">
 In FEAN Method Astrology AMB, the Fire element (Number 9) plays a crucial role in shaping an individual's <strong>confidence, willpower, decision-making ability, energy levels, and leadership qualities.</strong> Fire energy is directly connected to <strong>Mars (Mangal)</strong>, which represents <strong>strength, courage, aggression, and quick action.</strong>
 </p>

 <h5 className="font-bold mb-4 flex items-center gap-2 text-blue-800">
 <span className="text-xl">⚛</span> Significance of Fire Element in Life:
 </h5>
 
 <ul className="list-disc pl-10 space-y-2 mb-8 print:pl-6 text-justify">
 <li><strong>Boosts Confidence & Willpower:</strong> A balanced Fire element helps a person stay confident, courageous, and proactive in life.</li>
 <li><strong>Controls Energy & Motivation:</strong> Fire provides the passion and drive needed to take action and achieve success.</li>
 <li><strong>Determines Leadership Ability:</strong> A strong Fire element creates natural leaders with a commanding presence.</li>
 <li><strong>Enhances Decision-Making Skills:</strong> Fire ensures quick, bold, and firm decisions under pressure.</li>
 <li><strong>Controls Anger & Aggression:</strong> An excessive Fire element can lead to short temper, impulsive behavior, and frustration.</li>
 <li><strong>Manages Physical Strength & Stamina:</strong> Fire supports muscle strength, immunity, and metabolism.</li>
 </ul>

 <div className="bg-yellow-50 p-4 border border-yellow-300 rounded-md mb-8 flex items-start gap-4 print:p-2 ">
 <span className="text-3xl text-blue-600">🌊</span>
 <div>
 <h5 className="font-bold mb-1 text-blue-800">If Fire Element is Missing (Number 9 is Absent in Lo Shu Grid)</h5>
 <ul className="list-disc pl-6 space-y-1 text-sm">
 <li><strong>Confidence Issues:</strong> The person feels weak, demotivated, and lacks courage.</li>
 <li><strong>Fear & Anxiety:</strong> They experience overthinking, hesitation, and fear while making decisions.</li>
 <li><strong>Poor Presence of Mind:</strong> Difficulty in recalling information while speaking.</li>
 <li><strong>Struggles in High-Pressure Situations:</strong> The person avoids risks, panics under stress, and gives up easily.</li>
 <li><strong>Physical Weakness:</strong> Affected bone health, low immunity, and low energy levels.</li>
 <li><strong>Bathing Issue:</strong> After taking a bath, such individuals feel tired, anxious, and less confident due to Water dominating Fire.</li>
 </ul>
 </div>
 </div>

 <h5 className="font-bold mb-2 flex items-center gap-2 text-blue-800">
 <span className="text-xl">☁</span> Fire Element Imbalance & Its Effects
 </h5>
 <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-50 print:p-2">
 <p className="font-bold text-red-700 flex items-center gap-2">
 <span className="text-lg">💡</span> FEAN Remedy:
 </p>
 <ul className="list-none pl-6 mt-2 space-y-2 font-semibold">
 <li>✔ Wear 3 Mukhi Rudraksha to enhance Fire energy.</li>
 <li>✔ Carry Match Masala (Matchsticks) in Pocket to compensate for missing Fire.</li>
 </ul>
 </div>
 </EbookHeaderFooter>


 {/* --- PAGE 15: Fire Element (Number 9) Continued --- */}
 <EbookHeaderFooter>
 <div className="bg-red-50 p-4 border border-red-300 rounded-md mb-6 print:p-2 ">
 <h5 className="font-bold mb-1 text-red-800">If Fire Element is Excessive (Number 9 appears multiple times: 99, 999, etc.)</h5>
 <ul className="list-disc pl-6 space-y-1 text-sm text-justify">
 <li><strong>Short Temper & Anger Issues:</strong> The person gets irritated and reacts aggressively.</li>
 <li><strong>Overconfidence & Impulsiveness:</strong> Quick decisions without proper analysis lead to mistakes & losses.</li>
 <li><strong>Health Issues:</strong> Risk of blood pressure problems, thyroid, diabetes, and body heat-related issues.</li>
 <li><strong>Relationship Problems:</strong> Fire dominance can cause ego clashes, dominance, and stubborn behavior.</li>
 </ul>
 </div>

 <h5 className="font-bold mb-2 flex items-center gap-2 text-red-800">
 <span className="text-xl">💡</span> FEAN Remedy:
 </h5>
 <ul className="list-none pl-6 space-y-2 mb-6 text-sm text-justify">
 <li>✔ <strong>Donate Fire-related items (matchboxes, gas cylinders) on the 9th, 18th, or 27th of every month.</strong></li>
 <li>✔ <strong>Consume cooling foods like coconut water to balance Fire.</strong></li>
 </ul>

 <h5 className="font-bold mb-2 flex items-center gap-2 text-blue-800">
 <span className="text-xl">☯</span> Match Masala (Matchsticks) Remedy Based on Age
 </h5>
 <p className="mb-4 text-sm text-justify">
 In FEAN Method Astrology AMB, the number of matchsticks to be carried in the pocket varies by age to regulate Fire energy effectively.
 </p>

 <table className="w-full border-collapse border border-black text-[13px] mb-6 max-w-xl mx-auto">
 <thead>
 <tr className="bg-gray-100">
 <th className="border border-black p-1 font-bold text-left">Age Group</th>
 <th className="border border-black p-1 font-bold text-left">Number of Matchsticks to Carry</th>
 </tr>
 </thead>
 <tbody>
 <tr><td className="border border-black p-1">Below 5 Years</td><td className="border border-black p-1">Carry only 3 matchstick</td></tr>
 <tr><td className="border border-black p-1">5 to 10 Years</td><td className="border border-black p-1">Carry 7 matchsticks</td></tr>
 <tr><td className="border border-black p-1">11 to 20 Years</td><td className="border border-black p-1">Carry 9 matchsticks</td></tr>
 <tr><td className="border border-black p-1">21 to 30 Years</td><td className="border border-black p-1">Carry 20 matchsticks</td></tr>
 <tr><td className="border border-black p-1">31 to 40 Years</td><td className="border border-black p-1">Carry 25 matchsticks</td></tr>
 <tr><td className="border border-black p-1">41 to 50 Years</td><td className="border border-black p-1">Carry 25 matchsticks</td></tr>
 <tr><td className="border border-black p-1">51 Years & Above</td><td className="border border-black p-1">Carry 25 matchsticks</td></tr>
 </tbody>
 </table>

 <h5 className="font-bold mb-2 flex items-center gap-2 text-red-800">
 <span className="text-xl">🔥</span> How Match Box Masala Helps in Fire Balance
 </h5>
 <ul className="list-none pl-6 space-y-2 text-sm text-justify">
 <li>✔ <strong>Carrying Match Masala increases Fire element in the body, helping to boost confidence and remove fear.</strong></li>
 <li>✔ <strong>Prevents anxiety, hesitation, and overthinking, ensuring a balanced Fire-Water state.</strong></li>
 <li>✔ <strong>Highly recommended for people who lack Fire (Number 9 missing in Lo Shu Grid).</strong></li>
 </ul>
 </EbookHeaderFooter>

 {/* --- PAGE 16: Fire Element Conclusion & Cases --- */}
 <EbookHeaderFooter>
 <h5 className="font-bold mb-2 flex items-center gap-2 text-red-800">
 <span className="text-xl">🔥</span> Conclusion: Balancing Fire for a Successful Life
 </h5>
 <p className="mb-6 text-justify">
 A well-balanced Fire element ensures a <strong>strong personality, fearless decision-making, high motivation, and a leadership mindset.</strong> Whether you have low Fire or excessive Fire, following FEAN Method Astrology AMB remedies will help you achieve balance and overcome life's challenges with confidence.
 </p>

 <h5 className="font-bold mb-4 flex items-center gap-2 text-blue-800">
 <span className="text-xl">🚀</span> Empower your Fire element – Stay Confident, Fearless, and Victorious!
 </h5>

 <h5 className="font-bold mb-4 underline">Cases-</h5>
 
 <div className="space-y-6 ">
 {/* Case 1 */}
 <div className="flex items-center gap-4">
 <div className="grid grid-cols-3 w-40 md:w-48 border-2 border-black bg-[#fff6e6]">
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-xl">9</div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-xl">1</div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 </div>
 <p className="font-bold text-sm">(Balanced i.e Water = Fire)</p>
 </div>

 {/* Case 2 */}
 <div className="flex items-center gap-4">
 <div className="grid grid-cols-3 w-40 md:w-48 border-2 border-black bg-[#fff6e6]">
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-xl">9</div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-xl">11</div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 </div>
 <p className="font-bold text-sm">(Imbalanced i.e Water &gt; Fire)</p>
 </div>

 {/* Case 3 */}
 <div className="flex items-center gap-4">
 <div className="grid grid-cols-3 w-40 md:w-48 border-2 border-black bg-[#fff6e6]">
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-xl">99</div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-xl">1</div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 </div>
 <p className="font-bold text-sm">(Imbalanced i.e Water &lt; Fire)</p>
 </div>

 {/* Case 4 */}
 <div className="flex items-center gap-4">
 <div className="grid grid-cols-3 w-40 md:w-48 border-2 border-black bg-[#fff6e6]">
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-xl">999</div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-xl">111</div>
 <div className="border border-black flex items-center justify-center h-10 font-bold text-lg"></div>
 </div>
 <p className="font-bold text-sm">(Balanced i.e Water = Fire)</p>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 17: Number 3 (Soft Wood) Detailed Description --- */}
 <EbookHeaderFooter className="original-spacing">
 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Number 3 (Soft Wood/Air Element) in FEAN Method Astrology AMB – Detailed Description</h4>
 <p className="mb-4 text-justify">
 In FEAN Method Astrology AMB, Number 3 represents the <strong>Soft Wood/Air element</strong>, which plays a key role in:
 </p>
 <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 font-semibold">
 <li>Social connectivity</li>
 <li>Growth, learning & adaptability</li>
 <li>Opportunities & career success</li>
 <li>Influence of Jupiter (Guru)</li>
 </ul>
 <p className="mb-6 text-justify">
 Since Number 3 (Soft Wood) controls the energy of <strong>Jupiter (Guru)</strong>, its balance or imbalance directly affects social interactions, learning abilities, and career growth.
 </p>

 <div className="flex justify-center mb-6">
 <div className="grid grid-cols-3 border-2 border-black bg-[#fff6e6] w-64 print:w-56">
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg"></div>
 <div className="border border-black flex flex-col items-center justify-center h-14 bg-orange-200">
 <span className="font-bold leading-none">3</span>
 <span className="text-[9px] leading-tight">(Soft Wood)</span>
 </div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg"></div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-lg"></div>
 </div>
 </div>

 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Key Characteristics of Number 3 (Soft Wood Element)</h4>
 
 <div className="space-y-4 text-justify ">
 <div>
 <h5 className="font-bold flex items-center gap-2 mb-1">
 <span className="text-xl">❖</span> Social Connectivity & Support from Society
 </h5>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li>The Soft Wood element determines <strong>how supportive society will be for an individual.</strong></li>
 <li>A <strong>balanced Soft Wood (3) ensures strong friendships and positive relationships.</strong></li>
 <li>If <strong>imbalanced, it causes difficulties in making trustworthy connections and always miss use by others.</strong></li>
 </ul>
 </div>

 <div>
 <h5 className="font-bold flex items-center gap-2 mb-1">
 <span className="text-xl">❖</span> Growth, Learning & Adaptability
 </h5>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li>Number 3 represents <strong>growth, learning ability, and adaptability to new situations.</strong></li>
 <li><strong>Balanced Soft Wood (3) &rarr;</strong> Strong learning capacity, intelligence, and curiosity.</li>
 <li><strong>If missing &rarr;</strong> Struggles in learning new things, slow grasping ability, and limited adaptability.</li>
 </ul>
 </div>

 <div>
 <h5 className="font-bold flex items-center gap-2 mb-1">
 <span className="text-xl">❖</span> Career Growth & Opportunities
 </h5>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li><strong>Balanced Soft Wood (3) &rarr;</strong> Brings career success and new opportunities.</li>
 <li><strong>If missing &rarr;</strong> Limited career opportunities and difficulty finding supportive mentors.</li>
 </ul>
 </div>

 <div>
 <h5 className="font-bold flex items-center gap-2 mb-1">
 <span className="text-xl">❖</span> Influence of Jupiter (Guru)
 </h5>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li><strong>Balanced Soft Wood (3) &rarr;</strong> Strong Jupiter energy, wise decision-making, and career stability.</li>
 <li><strong>If missing &rarr;</strong> Weak Jupiter influence, reduced wisdom, and struggles in professional growth.</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 18: Number 3 Impact, Remedies, Conclusion --- */}

 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Impact of Number 3 (Soft Wood Element) in the Lo Shu Grid</h4>
 
 <table className="w-full border-collapse border border-black text-[13px] mb-6">
 <thead>
 <tr className="bg-[#fff2cc]">
 <th className="border border-black p-1 font-bold text-left w-1/3">Soft Wood Element (3) in Lo Shu Grid</th>
 <th className="border border-black p-1 font-bold text-left">Meaning & Effect</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-black p-1 font-semibold">Missing (0 times)</td>
 <td className="border border-black p-1 text-justify">Weak social connections, fewer opportunities, struggles in career, slow learning ability, reduced Jupiter energy.</td>
 </tr>
 <tr>
 <td className="border border-black p-1 font-semibold">Present Once (Balanced - 50%)</td>
 <td className="border border-black p-1 text-justify">Strong social skills, good career growth, supportive society, strong learning capacity.</td>
 </tr>
 <tr>
 <td className="border border-black p-1 font-semibold">Present Twice (100%) - Imbalanced</td>
 <td className="border border-black p-1 text-justify">Over-socialization, some opportunistic people in life, occasional financial struggles.</td>
 </tr>
 <tr>
 <td className="border border-black p-1 font-semibold">Present Three Times (150%)</td>
 <td className="border border-black p-1 text-justify">Increased social interactions, people take advantage, frequent requests for help.</td>
 </tr>
 <tr>
 <td className="border border-black p-1 font-semibold">Present Four or More Times (200%+)</td>
 <td className="border border-black p-1 text-justify text-red-700">Too many social connections, heavy emotional burden, high financial loss, often used by others.</td>
 </tr>
 </tbody>
 </table>

 <h5 className="font-bold mb-2 text-base text-blue-800">Impact of Soft Wood Element Imbalance in Life</h5>
 <div className="space-y-4 mb-4 text-justify text-sm">
 <div>
 <span className="font-bold underline">1. If Soft Wood (3) is Missing in the Lo Shu Grid</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Weak social connections, fewer friends, and lack of support from society.</li>
 <li>Struggles in networking, leading to fewer career opportunities.</li>
 <li>Minimal support from seniors, colleagues, and subordinates, leading to more work with fewer rewards.</li>
 <li>Reduced Jupiter energy, causing slower learning ability and difficulty in gaining wisdom.</li>
 </ul>
 </div>
 <div>
 <span className="font-bold underline">2. If Soft Wood (3) is Excessive (More than 100%)</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li>Over-socialization, attracting selfish and opportunistic people.</li>
 <li>Frequent requests for help, leading to neglect of personal work.</li>
 <li>Financial struggles, as money may get stuck in unnecessary obligations.</li>
 <li>Used by others, constantly helping without receiving benefits.</li>
 <li>Exploitation by society, feeling manipulated or mistreated.</li>
 </ul>
 </div>
 </div>

 <h5 className="font-bold mb-2 text-base text-blue-800">Remedies for Soft Wood Element (3) Imbalance</h5>
 <div className="space-y-4 mb-4 text-justify text-sm">
 <div>
 <span className="font-bold underline">1. If Soft Wood (3) is Missing</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li><strong>Increase Soft Wood element by:</strong>
 <ul className="list-circle pl-6 mt-1">
 <li>Expanding social connections mindfully.</li>
 <li>Practicing learning and personal growth (reading, acquiring new skills).</li>
 <li>Helping others in a balanced way to strengthen support from society.</li>
 <li>Wearing a 5 Mukhi Rudraksha to enhance soft wood element.</li>
 </ul>
 </li>
 </ul>
 </div>
 <div>
 <span className="font-bold underline">2. If Soft Wood (3) is Excessive</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li><strong>Reduce excess Soft Wood element by:</strong>
 <ul className="list-circle pl-6 mt-1">
 <li>Being selective in friendships and avoiding opportunistic people.</li>
 <li>Prioritizing personal work over excessive social obligations.</li>
 <li>Avoiding unnecessary financial help to others.</li>
 <li>Practicing self-discipline to focus on career and personal goals.</li>
 </ul>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 21: Soft Wood Element Overflow --- */}
 <EbookHeaderFooter className="original-spacing">
 <h5 className="font-bold mb-2 text-base text-blue-800">Remedies for Soft Wood Element (3) Imbalance (Continued)</h5>
 <div className="space-y-4 mb-4 text-justify text-sm">
 <div>
 <span className="font-bold underline">2. If Soft Wood (3) is Excessive (Continued)</span>
 <ul className="list-disc pl-10 mt-1 space-y-1 print:pl-6">
 <li><strong>Reduce excess Soft Wood element by:</strong>
 <ul className="list-circle pl-6 mt-1">
 <li>Donate Tulsi mala and 5 mukhi rudraksha to any Guru equivalent persons on 3rd, 30th date of each month.</li>
 <li>Daily mantra chanting "Om Gram Green Graum Sah Guruve Namah".</li>
 </ul>
 </li>
 </ul>
 </div>
 </div>

 <h5 className="font-bold mb-1 text-base text-blue-800">Conclusion</h5>
 <p className="text-justify text-sm mb-4">
 Number 3 (Soft Wood element) plays a major role in <strong>social connectivity, career growth, and learning ability.</strong> A balanced Soft Wood element ensures strong support from society and new opportunities, while an imbalanced Soft Wood element can lead to exploitation, career struggles, and financial losses occurred due to society.
 </p>

 <h5 className="font-bold mb-1 text-base text-red-800">Important Advice:</h5>
 <p className="text-justify text-sm">
 People with excess Number 3 should be cautious in choosing their social circle. They should <strong>set boundaries, prioritize their own work, and learn to say 'No'</strong> when needed to avoid unnecessary struggles, financial losses, and emotional stress.
 </p>
 </EbookHeaderFooter>

 {/* --- PAGE 19: Metal Element (Number 6) --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Metal Element (Number 6) in FEAN Method Astrology</h4>
 <p className="mb-4 text-justify">
 In FEAN Method AMB, the Metal Element (Number 6) controls the energy of Venus (Shukra), which governs:
 </p>
 <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 font-semibold">
 <li>Luxury, wealth, and material prosperity</li>
 <li>Love, romance, and physical relationships</li>
 <li>Social charm, attraction, and showmanship</li>
 <li>Comfortable lifestyle, beauty, and artistic taste</li>
 </ul>

 <div className="flex justify-end mb-6">
 <div className="text-center">
 <div className="grid grid-cols-3 border-2 border-black bg-[#fff6e6] w-full mb-2">
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-xl flex-col leading-none py-1">
 <span>6</span>
 <span className="text-[10px] font-normal mt-1">(Yellow_Metal)</span>
 </div>
 </div>
 </div>
 </div>

 <h4 className="font-bold mb-4 text-blue-800 text-xl flex items-center gap-2"><span className="text-2xl">✡</span> Impact of Metal Element (Number 6) Imbalance</h4>
 
 <div className="space-y-4 ">
 <div>
 <h5 className="font-bold mb-2">If Metal Element (6) is Excessive (66, 666, 6666, etc.)</h5>
 <ul className="space-y-2 text-justify">
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>More luxury but no financial stability -</strong> Wealth is earned but quickly spent on luxury items, fashion, show-off, and extravagant lifestyle.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>No savings & financial losses -</strong> Even if money is saved, it gets lost, stuck in investments, or gradually disappears from the bank account.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Expansion of business but zero profits -</strong> The person may expand their business aggressively but struggles with profits and financial security.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Losses due to social influence -</strong> High chances of losing money due to friends, relatives, or partners.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Risk of betrayal in financial matters -</strong> Lending money often leads to losses or delayed returns.</span>
 </li>
 </ul>
 </div>

 <div className="mt-6">
 <h5 className="font-bold mb-2 flex items-center gap-2"><span className="text-green-600">✅</span> FEAN Remedy for Excessive Metal (6):</h5>
 <ul className="space-y-2 ">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Donate golden-colored metal</strong> (e.g., golden color wristwatch with a round dial) on the 6th of every month.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Chant the Venus mantra daily -</strong> "Om Shung Shukray Namah" to receive positive Venus blessings.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Avoid risky financial decisions -</strong> Do not lend money or take money-related risks.</span>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 20: Metal Element (Number 6) Continued --- */}
 <EbookHeaderFooter>
 <div className="space-y-6 ">
 <div>
 <h5 className="font-bold mb-3 mt-4">If Metal Element (6) is Missing (Number 6 Absent in Lo Shu Grid)</h5>
 <ul className="space-y-3 text-justify">
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Struggles with luxury and comfort -</strong> The person finds it hard to afford luxuries despite earning money.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Difficulty in saving money -</strong> They fail to accumulate wealth and face financial instability.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Kanjoos for self, but spends freely on others -</strong> They are stingy towards themselves but spend money like water on friends and family.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Lack of financial enjoyment -</strong> Even if they earn money, they do not enjoy it for themselves.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Difficulty in love & relationships -</strong> Struggles in maintaining romantic and physical relationships due to Venus energy deficiency.</span>
 </li>
 </ul>
 </div>

 <div className="mt-8 bg-green-50 p-4 border-l-4 border-green-500 print:p-3">
 <h5 className="font-bold mb-3 flex items-center gap-2"><span className="text-green-600">✅</span> FEAN Remedy for Missing Metal (6):</h5>
 <ul className="space-y-2 ">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Wear a 6 Mukhi Rudraksha to enhance Venus energy.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Wear a golden-colored wristwatch with a round dial to attract financial stability and luxury.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Increase Venus energy by practicing self-care and luxury enjoyment.</span>
 </li>
 </ul>
 </div>

 <div className="mt-8 border-t-2 border-gray-300 pt-6">
 <h5 className="font-bold mb-4 text-blue-700 flex items-center gap-2"><span className="text-2xl">♻</span> Conclusion: Balancing Metal Element (6) for a Prosperous Life</h5>
 <ul className="space-y-3 text-justify">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>A <strong>balanced Metal element (6)</strong> brings financial stability, luxury, and fulfilling relationships.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Excess Metal (66, 666)</strong> leads to reckless spending, financial instability, and losses due to social connections.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Missing Metal (6)</strong> causes money-saving problems, self-stinginess, and difficulties in enjoying wealth and luxury.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Follow FEAN Method Astrology remedies</strong> (donations, Rudraksha, wristwatch, and mantra chanting) to achieve harmony in wealth, luxury, and relationships.</span>
 </li>
 <li className="flex gap-2 font-bold italic text-blue-900 mt-4">
 <span className="text-xl">🚀</span>
 <span>Attract luxury, wealth, and love with the right balance of Metal Element!</span>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 21: Hard Wood (4) & White Metal (7) Introduction --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Hard Wood (Number 4 – Rahu) and White Metal (Number 7 – Ketu) in Fean Method AMB</h4>
 <p className="mb-6 text-justify">
 In Fean Method AMB, the numbers 4 (Hard Wood - Rahu) and 7 (White Metal - Ketu) play a significant role in shaping a person's life. These numbers represent two opposite forces that impact mental stability, decision-making, growth, and spiritual inclination. A balance between these two elements is essential for a smooth life.
 </p>

 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Hard Wood (Number 4 - Rahu) in Fean Method AMB</h4>
 <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6">
 <li>Hard wood element (4) Controls the energy of: <strong>Rahu</strong>.</li>
 <li>Hard Wood influences <strong>AMCition, material success, and focus</strong>.</li>
 </ul>

 <div className="flex justify-center mb-6">
 <div className="text-center">
 <div className="grid grid-cols-3 w-56 md:w-64 border-2 border-black bg-[#fff6e6] mx-auto mb-2 print:w-48">
 <div className="border border-black flex items-center justify-center h-14 font-bold text-xl flex-col leading-none py-1">
 <span>4</span>
 <span className="text-[10px] font-normal mt-1">(Hard<br/>Wood)</span>
 </div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14 font-bold text-xl flex-col leading-none py-1">
 <span>7</span>
 <span className="text-[10px] font-normal mt-1">(White<br/>Metal)</span>
 </div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 <div className="border border-black flex items-center justify-center h-14"></div>
 </div>
 </div>
 </div>

 <h5 className="font-bold mb-3">Characteristics of Hard Wood (4 - Rahu)</h5>
 <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 text-sm text-justify">
 <li>Represents practicality, unconventional thinking, and logical decisions</li>
 <li>Governs planning, management, and futuristic vision</li>
 <li>Controls the growth of structures, intelligence, and problem-solving abilities</li>
 <li>Associated with technology, engineering, research, and analytical fields</li>
 <li>Indicates sudden gains and losses in life</li>
 <li>Enhances hard work and determination, making individuals persistent in achieving goals</li>
 <li>If balanced, it provides stability, clarity, and structured thinking</li>
 </ul>

 <h5 className="font-bold mb-3">Impact of Hard Wood (4 - Rahu) in the Lo Shu Grid</h5>
 
 <div className="space-y-4">
 <div>
 <h6 className="font-bold">1. If Number 4 is Balanced (Present Once)</h6>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li>Strong logical mind, ability to analyze situations effectively</li>
 <li>Good decision-making ability, leading to long-term success</li>
 <li>Well-organized and structured life</li>
 <li>Strong interest developed in internet related works, IT fields, Online activities, Share market, Games etc.</li>
 </ul>
 </div>

 <div>
 <h6 className="font-bold mt-4">2. If Number 4 is Missing</h6>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li>Poor planning ability, difficulty in organizing things</li>
 <li>Lack of futuristic vision, struggles in executing ideas</li>
 <li>Less stability in career and financial matters</li>
 <li>Increased impulsive decisions, leading to financial losses</li>
 <li>Very weak interest in internet related works, IT fields, Online activities etc.</li>
 </ul>
 <p className="font-bold mt-2 text-sm">Remedies for Missing Number 4 (Hard Wood - Rahu)</p>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li>Wear an <strong>8 Mukhi Rudraksha</strong> to balance Rahu energy</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 22: Hard Wood (4) Continued --- */}
 <EbookHeaderFooter>
 <div className="space-y-6 ">
 <div>
 <h6 className="font-bold mt-4">3. If Number 4 is Excessive (44, 444, 4444)</h6>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-justify">
 <li>Overthinking, excessive doubt, and unnecessary analysis</li>
 <li>Gets stuck in deep thoughts, mind troubles, sleep issues, and unable to act quickly</li>
 <li>Struggles to trust people, leading to loneliness</li>
 <li>Prone to sudden failures after sudden success (Rahu's unpredictable nature)</li>
 <li>Avoid hasty decisions, practice structured thinking</li>
 <li>Use Hard Wood furniture or wooden objects in daily life</li>
 </ul>
 </div>

 <div>
 <h6 className="font-bold mt-2">Remedies for Excessive Number 4 (Hard Wood - Rahu)</h6>
 <ul className="list-disc pl-10 space-y-1 print:pl-6">
 <li>Reduce over-analysis and take decisions based on intuition</li>
 <li>Avoid negative thinking and over-questioning everything</li>
 <li>Donate Hard Wood-related items (wooden objects, paper, pencils, books) to the needy</li>
 </ul>
 </div>

 <div className="mt-8">
 <h5 className="font-bold mb-4 underline text-lg">Excess Number 4 (44, 444) Remedies in FEAN Method Astrology:</h5>
 
 <div className="space-y-6">
 <div>
 <h6 className="font-bold">1. Water + Blue Ink + Salt Remedy (Flush Method)</h6>
 <ul className="list-circle pl-10 mt-2 space-y-1 print:pl-6 text-justify">
 <li>Every Saturday or daily after sunset, take one glass of water.</li>
 <li>Add blue ink and salt to the water.</li>
 <li>Hold the glass, move it 4 times in an anticlockwise direction over your head.</li>
 <li>Flush the water into the toilet (bathroom toilet sheet) to remove excessive Hard Wood energy.</li>
 </ul>
 </div>

 <div>
 <h6 className="font-bold">2. Jute Coconut + Blue Thread Remedy (Temple/Peepal Tree)</h6>
 <ul className="list-circle pl-10 mt-2 space-y-1 print:pl-6 text-justify">
 <li>Every Saturday or daily after sunset, take a jute coconut (with water inside).</li>
 <li>Move it 4 times anticlockwise over your head.</li>
 <li>Tie a blue thread around the coconut.</li>
 <li>Offer the coconut to a temple or place it under a Peepal tree to reduce Rahu's negative impact.</li>
 </ul>
 </div>

 <div className="bg-gray-50 p-4 border-l-4 border-gray-400 mt-6 print:p-3 text-sm">
 <h6 className="font-bold mb-2">Why These Remedies Work?</h6>
 <ul className="list-disc pl-6 space-y-2 text-justify">
 <li>
 <strong>Water + Blue Ink + Salt:</strong> Water absorbs excessive Wood energy, blue ink represents the cooling effect, and salt removes negative energies. Flushing it down the toilet symbolizes the elimination of Rahu's excess impact.
 </li>
 <li>
 <strong>Jute Coconut + Blue Thread:</strong> The coconut absorbs Rahu energy, and the blue thread binds and neutralizes its negative influence before offering it to divine energy (temple or Peepal tree), which absorbs and balances the excess Hard Wood.
 </li>
 </ul>
 </div>
 </div>

 <p className="mt-6 font-bold text-center">
 These remedies should be followed regularly for at least 43 days for effective results.
 </p>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 23: White Metal (Number 7 - Ketu) --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base">White Metal (Number 7 - Ketu) in Fean Method AMB</h4>
 
 <div className="space-y-6 ">
 <div>
 <h5 className="font-bold mb-3">Characteristics of White Metal (7 - Ketu)</h5>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-justify">
 <li>Represents spirituality, intuition, and detachment</li>
 <li>Governs hidden knowledge, meditation, and mystical experiences</li>
 <li>Enhances inner wisdom, deep thinking, and self-realization</li>
 <li>Promotes a minimalistic lifestyle, reducing materialistic desires</li>
 <li>Controls sudden transformations, unexpected events, and karmic influences</li>
 </ul>
 </div>

 <div>
 <h5 className="font-bold mb-3">Impact of White Metal (7 - Ketu) in the Lo Shu Grid</h5>
 
 <div className="space-y-5">
 <div>
 <h6 className="font-bold">1. If Number 7 is Balanced (Present Once)</h6>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li>Good intuitive ability, strong inner guidance</li>
 <li>Ability to handle sudden changes in life smoothly</li>
 <li>A natural inclination towards spiritual growth and self-awareness</li>
 </ul>
 </div>

 <div>
 <h6 className="font-bold">2. If Number 7 is Missing</h6>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li>Difficulty in understanding deeper meanings of life</li>
 <li>Fear of unknown situations, lack of spiritual insight</li>
 <li>Challenges in handling sudden transformations</li>
 </ul>
 <p className="font-bold mt-2 text-sm">Remedies for Missing Number 7 (White Metal - Ketu)</p>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li>Wear a <strong>9 Mukhi Rudraksha</strong> to enhance Ketu's energy</li>
 <li>Meditate regularly to strengthen intuitive power</li>
 <li>Wear a white metal stainless steel wrist watch with square shape dial.</li>
 </ul>
 </div>

 <div>
 <h6 className="font-bold">3. If Number 7 is Excessive (77, 777, 7777)</h6>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li>Extreme detachment, loss of interest in material life</li>
 <li>Confusion in making decisions, wandering mind</li>
 <li>Over-inclination toward spirituality, ignoring practical life</li>
 <li>Fear of sudden losses, unnecessary anxiety about the unknown</li>
 </ul>
 <p className="font-bold mt-2 text-sm">Remedies for Excessive Number 7 (White Metal - Ketu)</p>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm">
 <li>Engage in practical activities to stay grounded</li>
 <li>Avoid isolation, build social connections</li>
 <li>Practice mindfulness to reduce unnecessary fears</li>
 <li>Doante white metal stainless steel wrist watch with square shape dial.</li>
 <li>Donate food to dogs and care them.</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </EbookHeaderFooter>
 {/* --- PAGE 24: Conclusion of Hard Wood & White Metal Balance --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base">Balance Between Hard Wood (4 - Rahu) & White Metal (7 - Ketu)</h4>
 
 <div className="space-y-6 ">
 <div>
 <ul className="list-disc pl-10 space-y-2 print:pl-6 text-sm text-justify">
 <li>
 <strong>Balanced 4 & 7</strong>
 <ul className="list-circle pl-8 mt-1 space-y-1 text-gray-700">
 <li>Strong analytical thinking (4) and deep intuition (7)</li>
 <li>Ability to plan and execute ideas with a futuristic approach</li>
 <li>Logical yet spiritual — best of both worlds</li>
 </ul>
 </li>
 <li>
 <strong>Excess 4, Less 7</strong>
 <ul className="list-circle pl-8 mt-1 space-y-1 text-gray-700">
 <li>Too logical, lacking spiritual awareness</li>
 <li>Stuck in materialistic achievements without deeper meaning</li>
 <li>Fear of unexpected failures due to lack of intuition</li>
 </ul>
 </li>
 <li>
 <strong>Excess 7, Less 4</strong>
 <ul className="list-circle pl-8 mt-1 space-y-1 text-gray-700">
 <li>Highly spiritual but lacks practical execution</li>
 <li>Dreams big but struggles to plan effectively</li>
 <li>Too detached, missing financial or career growth</li>
 </ul>
 </li>
 </ul>
 </div>

 <div className="bg-blue-50 p-4 border-l-4 border-blue-500 print:p-3">
 <h5 className="font-bold mb-3 text-lg">How to Maintain Balance?</h5>
 <ul className="list-disc pl-6 space-y-2 text-sm text-justify">
 <li>If 4 is missing, increase Rahu's stability (wear 8 Mukhi Rudraksha)</li>
 <li>If 7 is missing, enhance Ketu's guidance (meditate, wear 9 Mukhi Rudraksha)</li>
 <li>If 4 is excessive, donate hard wood-based items to reduce overthinking</li>
 <li>If 7 is excessive, engage in practical work to avoid excessive detachment</li>
 </ul>
 </div>

 <div className="mt-8 border-t-2 border-gray-300 pt-6">
 <h5 className="font-bold mb-4 text-blue-800 text-xl flex items-center gap-2">Final Conclusion</h5>
 <ul className="list-disc pl-10 space-y-2 print:pl-6 text-sm text-justify">
 <li>Number 4 (Hard Wood - Rahu) gives logic, planning, and practicality</li>
 <li>Number 7 (White Metal - Ketu) gives intuition, wisdom, and detachment</li>
 <li>A balance between 4 & 7 ensures both material success and spiritual growth</li>
 <li>If imbalanced, life becomes either too materialistic or too detached, causing struggles</li>
 <li className="font-bold text-black italic mt-4">By maintaining a proper Hard Wood (4) - White Metal (7) balance, one can achieve both worldly success and inner peace in life.</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 25: Number 2 (Earth Element) Detailed Description --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base">Number 2 (Earth Element) in FEAN Method Astrology – Detailed Description</h4>
 
 <p className="mb-4 text-justify">
 In FEAN Method Astrology, Number 2 represents the Earth element, which plays a vital role in:
 </p>
 <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 font-semibold">
 <li>Emotional strength & stability</li>
 <li>Grounding & balance in relationships</li>
 <li>Ability to manage personal and social connections</li>
 <li>Reaction to emotional challenges & mood stability</li>
 </ul>
 <p className="mb-6 text-justify text-sm italic">
 Since Number 2 (Earth element) controls the energy of the Moon (Chandra), its balance or imbalance directly affects emotional strength and stability in relationships.
 </p>

 <h5 className="font-bold mb-4 text-xl text-blue-800">Key Characteristics of Number 2 (Earth Element)</h5>
 
 <div className="space-y-5">
 <div>
 <h6 className="font-bold flex items-center gap-2 text-lg"><span className="text-blue-600">❖</span> Emotional Strength & Stability</h6>
 <ul className="list-disc pl-10 space-y-1 mt-2 print:pl-6 text-sm text-justify">
 <li>The Earth element determines a person's emotional strength.</li>
 <li>A balanced Earth element (2) ensures mental peace, emotional control, and the ability to handle challenges calmly.</li>
 <li>If imbalanced, it leads to emotional struggles, mood swings, and difficulties in relationships.</li>
 </ul>
 </div>

 <div>
 <h6 className="font-bold flex items-center gap-2 text-lg"><span className="text-blue-600">❖</span> Grounding & Relationship Stability</h6>
 <ul className="list-disc pl-10 space-y-1 mt-2 print:pl-6 text-sm text-justify">
 <li>The Earth element keeps a person grounded and helps them maintain long-term relationships.</li>
 <li><strong>Balanced Earth (2)</strong> → Strong relationships, trust, and emotional security.</li>
 <li><strong>If missing</strong> → Difficulty in managing relationships, leading to distance and misunderstandings.</li>
 </ul>
 </div>

 <div>
 <h6 className="font-bold flex items-center gap-2 text-lg"><span className="text-blue-600">❖</span> Reaction to Emotional Challenges</h6>
 <ul className="list-disc pl-10 space-y-1 mt-2 print:pl-6 text-sm text-justify">
 <li><strong>Balanced Earth (2)</strong> → Handles emotional stress with patience and calmness.</li>
 <li><strong>Excessive Earth (22, 222, 2222)</strong> → Becomes overly emotional, deeply affected by personal relationships.</li>
 <li><strong>Missing Earth (0)</strong> → Emotionally detached, struggles to express feelings in relationships.</li>
 </ul>
 </div>

 <div>
 <h6 className="font-bold flex items-center gap-2 text-lg"><span className="text-blue-600">❖</span> Mood Stability</h6>
 <ul className="list-disc pl-10 space-y-1 mt-2 print:pl-6 text-sm text-justify">
 <li><strong>Balanced Earth (2)</strong> → Keeps mood stable, helping a person stay emotionally strong.</li>
 <li><strong>Excess Earth (2)</strong> → Causes mood swings, sudden emotional shifts (one moment happy, next moment annoyed).</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 26: Impact of Number 2 in the Lo Shu Grid --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base">Impact of Number 2 (Earth Element) in the Lo Shu Grid</h4>
 
 <div className="overflow-x-auto mb-8">
 <table className="w-full border-collapse border-2 border-black text-sm text-justify">
 <thead>
 <tr className="bg-gray-200">
 <th className="border-2 border-black p-2 font-bold w-1/3">Earth Element (2) in Lo Shu Grid</th>
 <th className="border-2 border-black p-2 font-bold">Meaning & Effect</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border-2 border-black p-2 font-bold">Missing (0 times)</td>
 <td className="border-2 border-black p-2">Struggles to maintain relationships, emotional disconnection, misunderstandings in personal life.</td>
 </tr>
 <tr>
 <td className="border-2 border-black p-2 font-bold">Present Once (Balanced - 50%)</td>
 <td className="border-2 border-black p-2">Emotionally stable, manages relationships well, strong emotional strength.</td>
 </tr>
 <tr>
 <td className="border-2 border-black p-2 font-bold">Present Twice (100%) - Imbalanced</td>
 <td className="border-2 border-black p-2">Overly emotional, gets deeply affected by relationships, minor mood swings.</td>
 </tr>
 <tr>
 <td className="border-2 border-black p-2 font-bold">Present Three Times (150%)</td>
 <td className="border-2 border-black p-2">High emotional sensitivity, frequent mood swings, mentally disturbed.</td>
 </tr>
 <tr>
 <td className="border-2 border-black p-2 font-bold text-red-600 bg-red-50">Present Four or More Times (200%+)</td>
 <td className="border-2 border-black p-2 text-red-600 bg-red-50">Extreme emotional instability, unable to control emotions, deep emotional distress.</td>
 </tr>
 </tbody>
 </table>
 </div>

 <h5 className="font-bold mb-4 text-xl text-blue-800">Impact of Earth Element (2) Imbalance in Life</h5>
 
 <div className="space-y-6">
 <div>
 <h6 className="font-bold text-lg mb-2">1. If Earth (2) is Missing in the Lo Shu Grid</h6>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm text-justify">
 <li>Lack of emotional control and difficulty in maintaining relationships.</li>
 <li>Unknowingly makes mistakes that hurt relationships, leading to misunderstandings.</li>
 <li>Emotions do not develop properly, causing emotional detachment.</li>
 <li>Relatives and partners misunderstand them, thinking they don't value relationships or emotions.</li>
 </ul>
 </div>

 <div className="bg-green-50 p-4 border-l-4 border-green-500 print:p-3">
 <h6 className="font-bold text-lg mb-2">Remedies for Earth Element (2) Imbalance</h6>
 <p className="font-bold mb-2">1. If Earth (2) is Missing</p>
 <ul className="list-circle pl-8 space-y-1 text-sm">
 <li>Increase Earth element (2) by:
 <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
 <li>Practicing emotional awareness and mindfulness.</li>
 <li>Wearing a 2 Mukhi Rudraksha to enhancing earth element (Number 2).</li>
 <li>Chant mantra daily – Om Som Somay Namah</li>
 </ul>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 27: Number 2 Excessive Impact & Conclusion --- */}
 <EbookHeaderFooter>
 <div className="space-y-6 mt-6 ">
 <div>
 <h6 className="font-bold text-lg mb-2">2. If Earth (2) is Excessive (More than 100%)</h6>
 <ul className="list-disc pl-10 space-y-1 print:pl-6 text-sm text-justify">
 <li>Highly emotional in relationships, deeply affected by emotional issues.</li>
 <li>Frequent mood swings, sudden happiness or anger without reason.</li>
 <li>Mentally disturbed due to emotional overload, leading to stress and inner turmoil.</li>
 <li>Finds it hard to control emotions, making personal and professional life unstable.</li>
 </ul>
 </div>

 <div className="bg-orange-50 p-4 border-l-4 border-orange-500 print:p-3 mt-6">
 <p className="font-bold mb-2">2. If Earth (2) is Excessive</p>
 <ul className="list-circle pl-8 space-y-1 text-sm text-justify">
 <li>Reduce excess Earth element by:
 <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
 <li>Avoiding overattachment to relationships.</li>
 <li>Developing logical thinking over emotional reactions.</li>
 <li>Practicing meditation to control mood swings.</li>
 <li>You should offer milk and water to Lord Shiva and worship Him daily or at least on Mondays.</li>
 </ul>
 </li>
 </ul>
 </div>

 <div className="mt-8 border-t-2 border-gray-300 pt-6">
 <h5 className="font-bold mb-4 text-blue-800 text-xl flex items-center gap-2">Conclusion</h5>
 <ul className="list-disc pl-10 space-y-2 print:pl-6 text-sm text-justify">
 <li>Number 2 (Earth element) plays a major role in emotional stability, relationships, and mental grounding.</li>
 <li>A balanced Earth element ensures a stable mind and healthy relationships, while an imbalanced Earth element can lead to mood swings, emotional distress, and struggles in personal life.</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 28: Number 5 (Earth Element) - Power of Stability --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base">Earth Element (Number 5) in FEAN Method Astrology – The Power of Stability & Intelligence</h4>
 
 <div className="flex justify-center gap-8 mb-6 text-4xl">
 <span>🌍</span>
 <span>🧠</span>
 <span>🧩</span>
 </div>

 <p className="mb-4 text-justify">
 In FEAN Method Astrology, the Earth Element (Number 5) controls the energy of Mercury (Budh), which governs:
 </p>
 <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 font-semibold">
 <li>Intelligence, logic, and memory</li>
 <li>Business skills, financial management, and analytical ability</li>
 <li>Crisis management and problem-solving</li>
 <li>Adaptability and presence of mind</li>
 </ul>
 <p className="mb-6 text-justify text-sm italic">
 A balanced Earth element (5) ensures sharp memory, smart decision-making, and the ability to manage life's challenges effectively. However, an imbalance (either excess or deficiency) creates struggles in handling problems, lack of satisfaction, and difficulties in achieving success.
 </p>

 <h5 className="font-bold mb-4 text-xl text-blue-800"><span className="text-2xl">✡</span> Impact of Earth Element (Number 5) Imbalance</h5>
 
 <div className="space-y-6">
 <div>
 <h6 className="font-bold text-lg mb-2">If Earth Element (5) is Present (Balanced State)</h6>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Strong memory power -</strong> The person can retain knowledge, recall information quickly, and apply intelligence efficiently.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Good decision-making ability -</strong> They are practical, logical, and make informed decisions.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Business skills & financial growth -</strong> The person has entrepreneurial qualities and manages business effectively.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Crisis management skills -</strong> When challenges arise, they can handle problems with ease and find solutions.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Life satisfaction & stability -</strong> A stable mind that can enjoy life, relationships, and success.</span>
 </li>
 </ul>
 </div>

 <div>
 <h6 className="font-bold text-lg mb-2 mt-6">If Earth Element (5) is Missing (Number 5 Absent in Lo Shu Grid)</h6>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Weak problem-solving ability -</strong> When difficulties arise, the person feels lost, struggles to find solutions, and cannot manage crises effectively.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Lack of satisfaction in life -</strong> They always feel something is missing and struggle to achieve true happiness.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Business struggles & instability -</strong> Difficulty in managing business, making the right financial decisions, and handling risks.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Weak presence of mind -</strong> They may appear confused, indecisive, and unable to utilize their intelligence properly.</span>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>
 {/* --- PAGE 29: Earth Element (5) Excessive & Conclusion --- */}
 <EbookHeaderFooter>
 <div className="space-y-6 mt-6 ">
 <div>
 <h6 className="font-bold text-lg mb-2">If Earth Element (5) is Excessive (55, 555, etc.)</h6>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Overthinking & restlessness -</strong> The person overanalyzes situations and finds it difficult to relax.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Struggles with satisfaction -</strong> Even after achieving success, they feel empty and want more.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Too many business ideas, but lack of execution -</strong> They think a lot but fail to take proper action.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Difficulty in trusting others -</strong> The person becomes too cautious and struggles to delegate work.</span>
 </li>
 </ul>
 </div>

 <div className="bg-green-50 p-4 border-l-4 border-green-500 print:p-3 mt-6">
 <h6 className="font-bold mb-3 flex items-center gap-2"><span className="text-green-600">✅</span> FEAN Remedy for Missing Earth (5):</h6>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Wear a 4 Mukhi Rudraksha to strengthen the Mercury (Budh) energy.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Increase Earth element by walking barefoot on natural soil daily.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Practice decision-making and problem-solving skills actively.</span>
 </li>
 </ul>
 </div>

 <div className="bg-orange-50 p-4 border-l-4 border-orange-500 print:p-3">
 <h6 className="font-bold mb-3 flex items-center gap-2"><span className="text-green-600">✅</span> FEAN Remedy for Excessive Earth (5):</h6>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>No Major issues when excessive earth (5). Only workaholic nature.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Practice meditation to reduce overthinking.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Focus on grounding activities like gardening and nature walks.</span>
 </li>
 </ul>
 </div>

 <div className="mt-8 border-t-2 border-gray-300 pt-6">
 <h5 className="font-bold mb-4 text-blue-700 flex items-center gap-2"><span className="text-2xl">♻</span> Conclusion: Balancing Earth Element (5) for a Successful Life</h5>
 <ul className="space-y-3 text-justify text-sm">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>A <strong>balanced Earth element (5)</strong> brings intelligence, problem-solving ability, and business success.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Missing Earth (5)</strong> leads to struggles in managing life challenges, dissatisfaction, and financial instability.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Excessive Earth (5)</strong> results in overthinking, lack of trust, and constant dissatisfaction.</span>
 </li>
 <li className="flex gap-2 font-bold italic text-blue-900 mt-4 text-base">
 <span className="text-xl">🚀</span>
 <span>Unlock the power of intelligence, business mastery, and life stability with a balanced Earth element!</span>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 30: Earth Element (Number 8) - The Power of Stability & Hard Work --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base">Earth Element (Number 8) in FEAN Method Astrology – The Power of Stability & Hard Work</h4>
 
 <p className="mb-4 text-justify">
 In FEAN Method Astrology, the Earth Element (Number 8) controls the energy of Saturn (Shani), which governs:
 </p>
 <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 font-semibold">
 <li>Hard work, patience, and perseverance</li>
 <li>Discipline, stability, and long-term success</li>
 <li>Karma and justice – rewards based on efforts</li>
 <li>Physical endurance and strength</li>
 <li>Delays, struggles, and karmic lessons</li>
 </ul>
 <p className="mb-6 text-justify text-sm italic">
 A balanced Earth element (8) ensures stability, resilience, and the ability to work hard for long-term gains. However, an imbalance (either excess or deficiency) creates challenges related to struggles, delays, and hardships.
 </p>

 <h5 className="font-bold mb-4 text-xl text-blue-800"><span className="text-2xl">✡</span> Impact of Earth Element (Number 8) Imbalance</h5>
 
 <div className="space-y-6">
 <div>
 <h6 className="font-bold text-lg mb-2">If Earth Element (8) is Present (Balanced State)</h6>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Strong work ethic & determination -</strong> The person has high patience, persistence, and discipline.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Stable financial growth -</strong> Earns through hard work and long-term efforts.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Practical & responsible nature -</strong> A person with a strong number 8 is grounded, reliable, and honest.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Resilience in tough situations -</strong> The person does not give up easily and can handle struggles effectively.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Clear karmic path -</strong> With good deeds, Saturn blesses with success, wealth, and respect in society.</span>
 </li>
 </ul>
 </div>

 <div>
 <h6 className="font-bold text-lg mb-2 mt-6">If Earth Element (8) is Missing (Number 8 Absent in Lo Shu Grid)</h6>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Lack of patience & stability -</strong> The person may give up easily, struggle with discipline, and lack endurance for long-term goals.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Struggles & hardships increase -</strong> Success takes longer to achieve, and they often face unexpected obstacles.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Lack of financial stability -</strong> The person finds it difficult to build wealth and long-term financial security.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Difficulty in handling responsibilities -</strong> Feels overwhelmed when facing serious life challenges.</span>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 31: Earth Element (8) Excessive & Conclusion --- */}
 <EbookHeaderFooter>
 <div className="space-y-6 mt-6 ">
 <div>
 <h6 className="font-bold text-lg mb-2">If Earth Element (8) is Excessive (88, 888, etc.)</h6>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Slow progress in life -</strong> Saturn's energy delays success and increases obstacles.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Feeling burdened by responsibilities -</strong> Too much Earth energy makes a person feel restricted and overloaded.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Serious and rigid mindset -</strong> They may struggle with flexibility and adaptability.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Emotional detachment -</strong> Excess Earth makes a person less expressive and reserved in relationships.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Heavy karmic lessons -</strong> Reap consequences of past actions quickly, facing struggles before success.</span>
 </li>
 </ul>
 </div>

 <div className="bg-green-50 p-4 border-l-4 border-green-500 print:p-3 mt-6">
 <h6 className="font-bold mb-3 flex items-center gap-2"><span className="text-green-600">✅</span> FEAN Remedy for Missing Earth (8):</h6>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Karmic delays & setbacks -</strong> Efforts do not give expected results, leading to frustration.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Wear an 7 Mukhi Rudraksha to balance the Saturn (Shani) energy.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Wear Iron ring in middle finger mandatory.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Increase Earth element by practicing patience and disciplined efforts.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Avoid shortcuts in life and focus on hard work and long-term planning.</span>
 </li>
 </ul>
 </div>

 <div className="bg-orange-50 p-4 border-l-4 border-orange-500 print:p-3">
 <h6 className="font-bold mb-3 flex items-center gap-2"><span className="text-green-600">✅</span> FEAN Remedy for Excessive Earth (8):</h6>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Donate food (especially grains or black items like black sesame) on Saturdays (Shanivar) or Any Iron element on 8th date of any month.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Chant Shani mantra daily after sunset "Om Sham Shanishcharay Namah"</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Practice gratitude and flexibility to avoid extreme rigidity.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Engage in physical activities like walking on soil to ground excess Earth energy.</span>
 </li>
 </ul>
 </div>

 <div className="mt-8 border-t-2 border-gray-300 pt-6">
 <h5 className="font-bold mb-4 text-orange-600 text-xl flex items-center gap-2"><span className="text-2xl">🔥</span> Conclusion: Balancing Earth Element (8) for a Successful Life</h5>
 <ul className="space-y-3 text-justify text-sm">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>A <strong>balanced Earth element (8)</strong> brings stability, patience, and long-term success.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Missing Earth (8)</strong> leads to struggles, impatience, and instability in career and finances.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Excessive Earth (8)</strong> causes delays, emotional detachment, and a rigid mindset.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Follow FEAN Method Astrology remedies</strong> (Rudraksha, discipline, patience, and donations) to strengthen Saturn's positive effects.</span>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 32: Special Case-1: Property and Real estate Business --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base">Property and Real estate Business:</h4>
 <h5 className="text-md font-bold mb-6 text-center text-blue-800">Special Case-1: When All Earth Elements (5, 8, & 2) Are Present in Lo Shu Grid</h5>
 
 <div className="flex justify-center mb-6">
 <div className="grid grid-cols-3 w-64 border-2 border-black bg-[#fff6e6] print:w-56 text-2xl font-bold text-center">
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center">2</div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center">5</div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center">8</div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 </div>
 </div>

 <p className="mb-6 text-justify text-sm italic">
 In FEAN Method Astrology, when all three Earth elements (Number 5, Number 8, and Number 2) are present in the Lo Shu Grid, it creates a <strong>strong foundation for stability, property ownership, and long-term wealth accumulation.</strong> This combination is highly favorable for real estate, land-related businesses, and financial security.
 </p>

 <h5 className="font-bold mb-4 text-lg flex items-center gap-2"><span className="text-green-600 text-xl">🌍</span> Impact of Having All Earth Elements (5, 8, 2) Present</h5>
 <div className="space-y-6">
 <ul className="space-y-3 text-justify text-sm">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>High chances of property ownership -</strong> The person is naturally inclined to acquire land, houses, or commercial properties.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Success in real estate or agriculture -</strong> Ideal for business in real estate, land investments, farming, or construction.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Financial stability & asset growth -</strong> Wealth is accumulated in the form of properties and long-term assets.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Strong business mindset -</strong> Especially if Number 5 is present, it enhances business acumen and decision-making.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Patience & perseverance in financial matters -</strong> Number 8 provides long-term stability and rewards through disciplined efforts.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Emotional grounding & family security -</strong> Number 2 adds emotional stability, ensuring a strong family foundation and secure home environment.</span>
 </li>
 </ul>

 <div className="mt-8">
 <h5 className="font-bold mb-4 text-lg flex items-center gap-2"><span className="text-yellow-600 text-xl">🏗</span> Best Career & Business Opportunities for This Combination (2,5,8)</h5>
 <p className="mb-3 text-sm font-semibold">Individuals with all Earth numbers (5, 8, and 2) present should focus on stable, long-term investments such as:</p>
 <ul className="space-y-3 text-justify text-sm">
 <li className="flex gap-2">
 <span className="text-2xl">🏡</span>
 <span><strong>Real estate business -</strong> Buying, selling, and renting properties.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-2xl">🚜</span>
 <span><strong>Agriculture & farming -</strong> Engaging in organic farming, land cultivation, or farm-related business.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-2xl">🏢</span>
 <span><strong>Property development & construction -</strong> Investing in building projects, infrastructure, and commercial real estate.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-2xl">👨‍💼</span>
 <span><strong>Financial planning & asset management -</strong> Managing wealth effectively through long-term investments.</span>
 </li>
 </ul>
 </div>

 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 36: Conclusion (Earth Elements Presence) --- */}
 <EbookHeaderFooter className="original-spacing">
 <div className="space-y-6 mt-6">
 <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500 print:p-3 mt-6">
 <h6 className="font-bold mb-3 flex items-center gap-2"><span className="text-xl">💰</span> Conclusion: A Strong Foundation for Wealth & Success</h6>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Having all Earth elements (5, 8, 2) present ensures a stable financial future, property ownership, and success in land-based businesses.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>This is an ideal combination for real estate, agriculture, and long-term asset growth.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>With patience, proper investment strategies, and business planning, such individuals can create lasting wealth and financial security.</span>
 </li>
 <li className="flex gap-2 font-bold italic text-blue-900 mt-2">
 <span className="text-xl">🚀</span>
 <span>Achieve property, build wealth, and secure your future with the power of Earth elements!</span>
 </li>
 </ul>
 </div>
 </div>

 {/* --- Special Case-2: All Earth Elements Missing --- */}
 <h5 className="text-md font-bold mb-8 mt-6 text-center text-red-600">Special Case-2: When All Earth Elements (2, 5, and 8) Are Missing in Lo Shu Grid</h5>
 
 <div className="flex justify-center mb-10">
 <div className="grid grid-cols-3 w-64 border-2 border-black bg-[#fff6e6] print:w-56 text-2xl font-bold text-center">
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center text-red-600">-</div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center text-red-600">-</div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center text-red-600">-</div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 </div>
 </div>

 <div className="bg-red-50 p-6 border-l-4 border-red-500 print:p-4 mt-6">
 <p className="text-justify text-base leading-relaxed text-red-900">
 In FEAN Method Astrology, if all Earth elements (Number 2, Number 5, and Number 8) are missing, it creates <strong>major instability</strong> in property ownership, financial security, and long-term stability. Individuals with this combination are highly prone to losing property, facing financial setbacks, and struggling with wealth accumulation.
 </p>
 </div>
 </EbookHeaderFooter>
 {/* --- PAGE 34: Impact of Missing All Earth Elements --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base">Impact of Missing All Earth Elements (2, 5, 8) in Lo Shu Grid</h4>
 
 <div className="space-y-6 mt-6 ">
 <ul className="space-y-3 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>High chances of selling or losing property -</strong> If an individual owns a house or land, it is very likely to be sold due to financial pressure or unforeseen circumstances.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Problems after purchasing property -</strong> Disputes, legal issues, financial losses, or unexpected difficulties may arise immediately after buying land or a house.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Lack of financial stability -</strong> The person finds it extremely difficult to save money or invest in long-term assets.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Struggles with career and business growth -</strong> Business or job instability prevents wealth accumulation and long-term success.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Emotional instability & lack of grounding -</strong> Missing Number 2 leads to emotional ups and downs, making it harder to handle financial struggles.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Poor decision-making in financial matters -</strong> Missing Number 5 causes lack of intelligence in handling money and investments.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-red-600 font-bold mt-1">📌</span>
 <span><strong>Struggles & delays in achieving goals -</strong> Missing Number 8 creates repeated failures and delays in financial success.</span>
 </li>
 </ul>

 <div className="bg-red-50 p-4 border-l-4 border-red-500 print:p-3 mt-6">
 <h6 className="font-bold mb-3 flex items-center gap-2 text-red-900"><span className="text-xl">🚨</span> Important Warning: Avoid Property Investments in Your Own Name</h6>
 <ul className="space-y-2 text-sm text-justify text-red-900">
 <li className="flex gap-2">
 <span className="font-bold">⚠</span>
 <span><strong>Never buy land or property in your own name</strong>, as it may lead to financial losses, disputes, or forced selling.</span>
 </li>
 <li className="flex gap-2">
 <span className="font-bold">⚠</span>
 <span><strong>If necessary, register the property in a trusted family member's name</strong> who has a strong Earth element in their Lo Shu Grid.</span>
 </li>
 <li className="flex gap-2">
 <span className="font-bold">⚠</span>
 <span><strong>If property is already owned, immediately start balancing Earth elements (2, 5, 8)</strong> to reduce negative effects.</span>
 </li>
 </ul>
 </div>

 <div className="bg-green-50 p-4 border-l-4 border-green-500 print:p-3 mt-6">
 <h6 className="font-bold mb-3 flex items-center gap-2"><span className="text-green-600 text-xl">🔥</span> FEAN Remedy for Missing Earth Elements (2, 5, 8)</h6>
 <p className="mb-3 text-sm text-justify">To restore balance and prevent financial instability, use the following remedies:</p>
 <ul className="space-y-2 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Wear Rudrakshas in higher quantities:</strong>
 <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
 <li>Wear 2 Mukhi Rudraksha → Balances emotional stability (Missing Number 2 - Moon).</li>
 <li>Wear 4 Mukhi Rudraksha → Enhances intelligence and decision-making (Missing Number 5 - Mercury).</li>
 <li>Wear 7 Mukhi Rudraksha → Strengthens financial security and Saturn's blessings (Missing Number 8 - Saturn). And Iron ring in middle finger.</li>
 </ul>
 </span>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 35: Earth Elements Remedies & Conclusion --- */}
 <EbookHeaderFooter>
 <div className="space-y-6 mt-6 ">
 <ul className="space-y-3 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Walk barefoot on soil daily →</strong> Helps increase Earth energy naturally.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Avoid real estate investments in your name →</strong> Instead, invest in other stable assets like gold, mutual funds, or business.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Donate food and grains (wheat, rice, and lentils) on Saturdays (Shanivar) and Wednesdays (Budhwar) →</strong> This helps reduce Saturn and Mercury's negative effects.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Stay patient in financial decisions →</strong> Avoid impulsive investments, loans, and risky business ventures.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold mt-1">✔</span>
 <span><strong>Chant planetary mantras for Earth elements daily:</strong>
 <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
 <li>For Number 2 (Moon) – ॐ "Om Som Somay Namah"</li>
 <li>For Number 5 (Mercury) – ॐ "Om Budhaya Namah"</li>
 <li>For Number 8 (Saturn) – ॐ "Om Sham Shanishcharay Namah"</li>
 </ul>
 </span>
 </li>
 </ul>

 <div className="mt-8 border-t-2 border-gray-300 pt-6">
 <h5 className="font-bold mb-4 text-blue-700 flex items-center gap-2"><span className="text-xl">💰</span> Conclusion: Act Immediately to Protect Your Assets & Stability</h5>
 <ul className="space-y-3 text-justify text-sm">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Missing all Earth elements (2, 5, 8)</strong> leads to major risks in property ownership, financial struggles, and instability.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Avoid purchasing property in your name</strong>, as it may result in losses or forced sales.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span><strong>Use FEAN remedies (Rudraksha, grounding techniques, donations, and mantras)</strong> to balance Earth energy.</span>
 </li>
 <li className="flex gap-2 font-bold italic text-blue-900 mt-4 text-base">
 <span className="text-xl">🚀</span>
 <span>Balance Earth energy to secure your finances, wealth, and stability for the future!</span>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 35D: How to measure concentration (Recap) --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">How to Measure Concentration level of Five Elements</h4>
 <p className="mb-6 text-justify">
 In FEAN Method Astrology AMB, the concentration level of the five elements—Water, Fire, Air, Sky (Metal), and Earth—is measured using the Lo Shu Grid, which is created based on a person's real date of birth.
 </p>

 <h4 className="font-bold mb-4">Steps to Measure the Concentration Level of the Five Elements:</h4>
 
 <div className="space-y-6 ">
 <div>
 <span className="font-bold">1. Create the Lo Shu Grid from the Date of Birth</span>
 <ul className="list-disc pl-10 mt-2 space-y-1 print:pl-6 text-sm">
 <li>Write down the date of birth (DD/MM/YYYY).</li>
 <li>Place each digit in the standard 3x3 Lo Shu Grid according to its predefined position.</li>
 <li>Also fill Person's Moolank and Bhagyank in the Loshu Grid.</li>
 </ul>
 </div>
 
 <div>
 <span className="font-bold">2. Identify the Numbers Present in the Grid</span>
 <p className="mt-2 mb-2 text-sm">Each number from 1 to 9 represents a different element:</p>
 <table className="w-full border-collapse border border-black text-sm mb-4">
 <thead>
 <tr className="bg-[#fff2cc]">
 <th className="border border-black p-1 font-bold text-left">Numbers</th>
 <th className="border border-black p-1 font-bold text-left">Elements</th>
 </tr>
 </thead>
 <tbody>
 <tr><td className="border border-black p-1 font-semibold">Number 1</td><td className="border border-black p-1">Water element</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 2</td><td className="border border-black p-1">Earth Element</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 3</td><td className="border border-black p-1">Soft Wood Element (Air element)</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 4</td><td className="border border-black p-1">Hard Wood Element (Air element)</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 5</td><td className="border border-black p-1">Earth Element</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 6</td><td className="border border-black p-1">Golden Colour Metal Element (Sky Element)</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 7</td><td className="border border-black p-1">White Metal Element (Sky Element)</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 8</td><td className="border border-black p-1">Earth Element</td></tr>
 <tr><td className="border border-black p-1 font-semibold">Number 9</td><td className="border border-black p-1">Fire Element</td></tr>
 </tbody>
 </table>
 </div>

 <div>
 <span className="font-bold">3. Count the Frequency of Each Number</span>
 <ul className="list-disc pl-10 mt-2 space-y-1 print:pl-6 text-sm">
 <li>Each number's frequency in the Lo Shu Grid represents the concentration level of that element in the body at birth.</li>
 <li>Standard Concentration Rule:
 <ul className="list-circle pl-6 mt-1 space-y-1">
 <li>If a number appears once, its element is <strong>balanced</strong> (50%).</li>
 <li>If a number appears twice, the element reaches 100% <strong>(imbalanced state)</strong>.</li>
 <li>If a number appears three times (e.g., 999), the element reaches 150% (excess). <strong>(imbalanced state)</strong>.</li>
 <li>If a number appears four times (e.g., 9999), the element reaches 200%, and so on. <strong>(imbalanced state)</strong>.</li>
 </ul>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 35A: Interpret & Adjust Imbalance --- */}
 <EbookHeaderFooter>
 <div className="space-y-6 mt-6 ">
 <div>
 <span className="font-bold text-lg">4. Interpret the Elemental Balance</span>
 <ul className="list-disc pl-10 mt-3 space-y-2 print:pl-6 text-sm text-justify">
 <li><strong>Balanced Elements (50%) →</strong> No issues, natural harmony.</li>
 <li><strong>Excess Elements (&gt;100%) →</strong> Imbalanced, causing problems related to that element.</li>
 <li><strong>Missing Elements (0%) →</strong> Deficiency, indicating lack of qualities associated with that element.</li>
 </ul>
 </div>

 <div>
 <span className="font-bold text-lg">5. Adjusting the Elemental Imbalance</span>
 <ul className="list-disc pl-10 mt-3 space-y-2 print:pl-6 text-sm text-justify">
 <li>If an element is excessive (&gt;100%) → Reduce it by donating items related to that element.</li>
 <li>If an element is missing (0%) → Increase it by wearing Rudraksha, using certain colors, or keeping specific items.</li>
 <li>If the Fire-Water balance is disturbed, it affects mental health, confidence, and overreaction tendencies.</li>
 <li>If the Wood-Metal balance is disturbed, it affects social life, financial stability, and relationship harmony.</li>
 </ul>
 </div>

 <div className="mt-8 border-t-2 border-gray-300 pt-6">
 <h5 className="font-bold mb-4 text-blue-800 text-xl flex items-center gap-2"><span className="text-2xl">⚠</span> What is imbalanced state?</h5>
 <p className="mb-4 text-sm text-justify">
 In FEAN Method Astrology, when an element's concentration reaches <strong>100% at birth</strong>, it is considered an imbalanced state. Here's why:
 </p>
 <ol className="list-decimal pl-10 space-y-4 print:pl-6 text-sm text-justify">
 <li>
 <strong>Elements Continuously Increase After Birth</strong>
 <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
 <li>After birth, <strong>the five elements naturally increase in the body</strong> because the universe has an infinite concentration of all elements.</li>
 <li>As per the natural flow of energy, elements always move from high density to low density. This means that after birth, external energy from the universe keeps increasing the element's concentration in our body.</li>
 <li><strong>If an element is already at 100% at birth, its concentration will only increase further, leading to an excessive state over time.</strong></li>
 </ul>
 </li>
 <li>
 <strong>Excess Element Creates an Imbalance</strong>
 <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
 <li><strong>When an element exceeds 100% in the body, it disrupts the balance of planetary energy</strong> associated with that element.</li>
 <li>This imbalance causes the body to absorb more negative energy and <strong>reject positive energy, leading to various problems in life.</strong></li>
 </ul>
 </li>
 </ol>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 35B: The Real Cause & Balanced States --- */}
 <EbookHeaderFooter>
 <div className="space-y-6 mt-6 ">
 <ol className="list-decimal pl-10 space-y-4 print:pl-6 text-sm text-justify" start={3}>
 <li>
 <strong>Impact on Health and Longevity</strong>
 <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
 <li>Due to the excess element, the body starts to <strong>weaken over time.</strong></li>
 <li><strong>This reduces immunity, increases health issues, and gradually affects lifespan.</strong></li>
 <li>A person with high concentration of a specific element may suffer from diseases, emotional struggles, or life obstacles caused by that imbalance.</li>
 </ul>
 </li>
 <li>
 <strong>Cause of Struggles in Life</strong>
 <ul className="list-circle pl-6 mt-1 space-y-2 text-gray-700">
 <li>When an element exceeds <strong>100%</strong>, it starts affecting different aspects of life:
 <ul className="list-disc pl-6 mt-1 space-y-1 text-black">
 <li><strong>Excess Fire (9) →</strong> Anger issues, blood pressure problems, aggression, overconfidence.</li>
 <li><strong>Excess Water (1) →</strong> Overthinking, emotional instability, weak decision-making.</li>
 <li><strong>Excess Earth (2, 5, 8) →</strong> Overattachment, delays in work, slow progress.</li>
 <li><strong>Excess Metal (6, 7) →</strong> Over-luxury desire, laziness, dependency on others.</li>
 <li><strong>Excess Wood (3, 4) →</strong> Over-socialization, attracting opportunistic people, financial loss due to society.</li>
 </ul>
 </li>
 </ul>
 </li>
 </ol>

 <div className="bg-red-50 p-4 border-l-4 border-red-500 print:p-3 mt-6">
 <h6 className="font-bold mb-2 text-lg text-red-900">The Real Cause of Life's Problems</h6>
 <ul className="list-disc pl-6 space-y-1 text-sm text-justify">
 <li><strong>Every problem in life arises due to the imbalance of elements.</strong></li>
 <li>When an element becomes excessive <strong>(&gt;100%)</strong>, it starts <strong>controlling the mind and body</strong>, leading to different mental, physical, and emotional challenges.</li>
 <li>This also affects planetary energies, leading to unfavorable astrological results.</li>
 </ul>
 </div>

 <div className="bg-green-50 p-4 border-l-4 border-green-500 print:p-3 mt-6">
 <h6 className="font-bold mb-2 text-lg text-green-900">Solution to Restore Balance</h6>
 <ul className="list-disc pl-6 space-y-1 text-sm text-justify">
 <li>To reduce the impact of excess elements, one should <strong>donate or release that element</strong> (e.g., donating Fire-related items if Fire is excessive).</li>
 <li><strong>If an element is missing, one should increase its presence</strong> through specific remedies.</li>
 <li><strong>Balancing all five elements is the key to good health, stable emotions, and a prosperous life.</strong></li>
 </ul>
 </div>

 <div className="mt-8 border-t-2 border-gray-300 pt-6">
 <h5 className="font-bold mb-4 text-blue-800 text-xl">What is a Balanced State in FEAN Method Astrology?</h5>
 <p className="mb-4 text-sm text-justify">
 In FEAN Method Astrology, a <strong>balanced state</strong> means that the five elements (Water, Fire, Air, Sky/Metal, and Earth) are present in the body in the right proportion, neither in excess nor in deficiency. This balance ensures that the body, mind, and planetary energies function harmoniously, leading to a healthy, stable, and successful life.
 </p>
 <h6 className="font-bold mb-2 mt-4 text-lg">How to Identify a Balanced State?</h6>
 <ul className="list-decimal pl-10 space-y-1 print:pl-6 text-sm text-justify">
 <li><strong>In the Lo Shu Grid:</strong>
 <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
 <li>If any number (1 to 9) <strong>appears once</strong>, it means that the corresponding element's concentration level is <strong>50%</strong>, which is a <strong>balanced state at birth</strong>.</li>
 <li>A balanced element ensures that it grows naturally after birth without creating an imbalance in the body.</li>
 <li><strong>For example, if Water (1) and Fire (9) are both present once</strong>, it indicates a Fire-Water balance, which is ideal for emotional and mental stability.</li>
 </ul>
 </li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 35C: Meaning of a Balanced State --- */}
 <EbookHeaderFooter className="original-spacing">
 <div className="space-y-6 mt-6 ">
 <ol className="list-decimal pl-10 space-y-4 print:pl-6 text-sm text-justify" start={2}>
 <li>
 <strong>In the Body and Life:</strong>
 <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
 <li>A balanced state means that <strong>no element is dominating or lacking</strong>, allowing a person to have:
 <ul className="list-square pl-6 mt-1 space-y-1 text-black font-semibold">
 <li>Good health <span className="font-normal">(no major diseases)</span>.</li>
 <li>Stable emotions <span className="font-normal">(no overthinking, anxiety, or excessive aggression)</span>.</li>
 <li>Strong decision-making skills <span className="font-normal">(neither too impulsive nor too hesitant)</span>.</li>
 <li>Harmonious relationships <span className="font-normal">(ability to maintain healthy social and personal bonds)</span>.</li>
 <li>Steady career and financial growth <span className="font-normal">(consistent opportunities without major struggles)</span>.</li>
 </ul>
 </li>
 <li className="mt-2">Another example, <strong>if Water (1) and Fire (9) are both present twice or thrice</strong>, it also indicates a Fire-water balance to each other, which is balanced state also, this can be very harmful if number 1 or 9 is artificially created by us in our life, then it will create imbalances and problems may rise as per element and planet in our horoscope.</li>
 </ul>
 </li>
 </ol>

 <div className="mt-8 border-t-2 border-gray-300 pt-6">
 <h5 className="font-bold mb-4 text-blue-800 text-xl">Meaning of a Balanced State</h5>
 <p className="mb-4 text-sm text-justify leading-relaxed">
 A balanced state means that all five elements are present in a way that supports a person's growth without creating stress, obstacles, or health issues.
 </p>
 <h6 className="font-bold mb-2 mt-4 text-lg">Why is Balance Important?</h6>
 <ul className="list-disc pl-10 space-y-2 print:pl-6 text-sm text-justify">
 <li><strong>If an element is excessive (&gt;100%)</strong>, it creates problems (e.g., excess Fire leads to anger issues, high BP, stress).</li>
 <li><strong>If an element is missing (0%)</strong>, it causes deficiency problems (e.g., missing Water leads to very shy nature, weak communication).</li>
 <li className="font-bold italic mt-2">A balanced state ensures that a person has fewer struggles, better opportunities, and overall success in life.</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 36: Lucky, Friendly, Enemy, Neutral Numbers --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base">How to calculate Lucky Number, Friendly Numbers, Enemy Numbers and Neutral Numbers?</h4>
 
 <div className="overflow-x-auto mb-8">
 <table className="w-full border-collapse border-2 border-black text-sm text-center">
 <thead>
 <tr className="bg-[#fff2cc]">
 <th className="border-2 border-black p-2 font-bold">Numbers</th>
 <th className="border-2 border-black p-2 font-bold">Friends</th>
 <th className="border-2 border-black p-2 font-bold">Enemy</th>
 <th className="border-2 border-black p-2 font-bold">Neutral</th>
 </tr>
 </thead>
 <tbody>
 <tr><td className="border-2 border-black p-1 font-bold">1</td><td className="border-2 border-black p-1">1,2,3,5,6,9</td><td className="border-2 border-black p-1">8</td><td className="border-2 border-black p-1">4,7</td></tr>
 <tr><td className="border-2 border-black p-1 font-bold">2</td><td className="border-2 border-black p-1">1,2,3,5</td><td className="border-2 border-black p-1">8,4,9</td><td className="border-2 border-black p-1">7,6</td></tr>
 <tr><td className="border-2 border-black p-1 font-bold">3</td><td className="border-2 border-black p-1">1,2,3,5</td><td className="border-2 border-black p-1">6</td><td className="border-2 border-black p-1">4,8,7,9</td></tr>
 <tr><td className="border-2 border-black p-1 font-bold">4</td><td className="border-2 border-black p-1">1,5,7,6</td><td className="border-2 border-black p-1">2,9,4,8</td><td className="border-2 border-black p-1">3</td></tr>
 <tr><td className="border-2 border-black p-1 font-bold">5</td><td className="border-2 border-black p-1">1,2,3,5,6</td><td className="border-2 border-black p-1 bg-gray-100">None</td><td className="border-2 border-black p-1">4,7,8,9</td></tr>
 <tr><td className="border-2 border-black p-1 font-bold">6</td><td className="border-2 border-black p-1">1,4,5,6,7</td><td className="border-2 border-black p-1">3</td><td className="border-2 border-black p-1">2,8,9</td></tr>
 <tr><td className="border-2 border-black p-1 font-bold">7</td><td className="border-2 border-black p-1">1,3,5,4,6</td><td className="border-2 border-black p-1 bg-gray-100">None</td><td className="border-2 border-black p-1">8,2,7,9</td></tr>
 <tr><td className="border-2 border-black p-1 font-bold">8</td><td className="border-2 border-black p-1">5,3,6,7</td><td className="border-2 border-black p-1">1,2,4,8</td><td className="border-2 border-black p-1">9</td></tr>
 <tr><td className="border-2 border-black p-1 font-bold">9</td><td className="border-2 border-black p-1">1,3,5</td><td className="border-2 border-black p-1">4,2</td><td className="border-2 border-black p-1">9,7,6,8</td></tr>
 </tbody>
 </table>
 </div>

 <div className="flex flex-col gap-10 items-center w-full mt-4">
 
 <div className="flex flex-col md:flex-row print:flex-row gap-8 items-start w-full justify-between">
 <div className="flex-1">
 <h5 className="font-bold mb-4 text-blue-800 text-lg">Example –</h5>
 <p className="mb-2 text-sm font-bold">Date of Birth – 9/4/1990</p>
 <ul className="list-disc pl-6 space-y-1 text-sm">
 <li><strong>Moolank</strong> = 9</li>
 <li><strong>Bhagyank</strong> = 9+4+1+9+9+0 = 5</li>
 <li><strong>Friendly Numbers</strong> = 1, 3, 5</li>
 <li><strong>Enemy Numbers</strong> = 4, 2</li>
 <li><strong>Neutral Numbers</strong> = 4, 6, 7, 8, 9</li>
 <li><strong>Lucky Numbers</strong> = 3, 5 (Missing Friendly Numbers)</li>
 </ul>
 </div>
 
 <div className="flex-1 flex justify-center print:justify-end pr-8">
 <div className="grid grid-cols-3 w-72 border-2 border-black bg-[#fff6e6] print:w-64 text-xl font-bold text-center shrink-0">
 <div className="border border-black aspect-square flex items-center justify-center">4</div>
 <div className="border border-black aspect-square flex items-center justify-center">9999</div>
 <div className="border border-black aspect-square flex items-center justify-center">2</div>
 <div className="border border-black aspect-square flex items-center justify-center">3</div>
 <div className="border border-black aspect-square flex items-center justify-center">5</div>
 <div className="border border-black aspect-square flex items-center justify-center">7</div>
 <div className="border border-black aspect-square flex items-center justify-center">8</div>
 <div className="border border-black aspect-square flex items-center justify-center">1</div>
 <div className="border border-black aspect-square flex items-center justify-center">6</div>
 </div>
 </div>
 </div>

 <div className="bg-[#fce5cd] border border-orange-300 p-4 w-full max-w-2xl print:max-w-3xl rounded shadow-sm mx-auto flex flex-col md:flex-row print:flex-row gap-6 items-center md:items-stretch print:items-stretch justify-between">
 
 {/* Left Column: Mulank, Bhagyank, Namayank */}
 <div className="flex-1 w-full flex flex-col justify-center gap-3">
 <div className="flex justify-between items-center bg-[#fce5cd] p-2 rounded border border-orange-200">
 <span className="font-bold text-sm text-gray-800">Mulank</span>
 <span className="bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-sm">9</span>
 </div>
 <div className="flex justify-between items-center bg-[#fce5cd] p-2 rounded border border-orange-200">
 <span className="font-bold text-sm text-gray-800">Bhagyank</span>
 <span className="bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-sm">5</span>
 </div>
 <div className="flex justify-between items-center bg-[#fce5cd] p-2 rounded border border-orange-200">
 <span className="font-bold text-sm text-gray-800">Namayank</span>
 <span className="bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-sm">5*</span>
 </div>
 </div>
 
 {/* Right Column: Table */}
 <div className="flex-1 w-full flex flex-col justify-between">
 <table className="w-full text-sm text-center border-collapse">
 <tbody>
 <tr className="bg-[#f4cccc] border border-gray-300">
 <td className="p-2 font-bold border border-gray-300 text-left">Enemy Numbers</td>
 <td className="p-2 border border-gray-300 font-bold">2, 4</td>
 </tr>
 <tr className="bg-[#cfe2f3] border border-gray-300">
 <td className="p-2 font-bold border border-gray-300 text-left">Neutral Numbers</td>
 <td className="p-2 border border-gray-300 font-bold">4, 6, 7, 8, 9</td>
 </tr>
 <tr className="bg-[#d9ead3] border border-gray-300">
 <td className="p-2 font-bold border border-gray-300 text-left">Friendly Numbers</td>
 <td className="p-2 border border-gray-300 font-bold">1, 3, 5</td>
 </tr>
 <tr className="bg-[#b6d7a8] border border-gray-300">
 <td className="p-2 font-bold border border-gray-300 text-left">★ Lucky Numbers</td>
 <td className="p-2 border border-gray-300 font-bold">3, 5</td>
 </tr>
 </tbody>
 </table>
 <p className="text-xs text-red-600 font-bold mt-2 italic text-center">*It is advised to use lucky Numbers only !!</p>
 </div>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 37: Chaldean Numerology Name Frequency --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base">Chaldean Numerology Name Frequency Chart</h4>
 
 <p className="mb-4 text-justify text-sm">
 In Chaldean Numerology, each letter in a name is assigned a numerical frequency based on vibrational energy. The Chaldean system differs from the Pythagorean system and is considered more accurate for name numerology calculations because it incorporates planetary influences.
 </p>

 <h5 className="font-bold mb-4 text-blue-800 text-lg flex items-center gap-2"><span className="text-xl">🔠</span> Chaldean Numerology Letter-to-Number Chart</h5>
 
 <div className="flex justify-center mb-6">
 <table className="w-3/4 max-w-md border-collapse border-2 border-black text-sm text-center">
 <thead>
 <tr className="bg-[#fff2cc]">
 <th className="border-2 border-black p-2 font-bold w-2/3">Letter</th>
 <th className="border-2 border-black p-2 font-bold w-1/3">Number</th>
 </tr>
 </thead>
 <tbody>
 <tr><td className="border-2 border-black p-1">A, I, J, Q, Y</td><td className="border-2 border-black p-1 font-bold">1</td></tr>
 <tr><td className="border-2 border-black p-1">B, K, R</td><td className="border-2 border-black p-1 font-bold">2</td></tr>
 <tr><td className="border-2 border-black p-1">C, G, L, S</td><td className="border-2 border-black p-1 font-bold">3</td></tr>
 <tr><td className="border-2 border-black p-1">D, M, T</td><td className="border-2 border-black p-1 font-bold">4</td></tr>
 <tr><td className="border-2 border-black p-1">E, H, N, X</td><td className="border-2 border-black p-1 font-bold">5</td></tr>
 <tr><td className="border-2 border-black p-1">U, V, W</td><td className="border-2 border-black p-1 font-bold">6</td></tr>
 <tr><td className="border-2 border-black p-1">O, Z</td><td className="border-2 border-black p-1 font-bold">7</td></tr>
 <tr><td className="border-2 border-black p-1">F, P</td><td className="border-2 border-black p-1 font-bold">8</td></tr>
 </tbody>
 </table>
 </div>

 <h5 className="font-bold mb-4 text-blue-800 text-lg flex items-center gap-2"><span className="text-xl">📝</span> How to Calculate Name Frequency in Chaldean Numerology</h5>
 <div className="bg-gray-50 p-4 border border-gray-300 rounded mb-6">
 <ul className="space-y-1 text-sm font-semibold">
 <li>Step 1: Write your full name.</li>
 <li>Step 2: Assign the Chaldean number to each letter.</li>
 <li>Step 3: Add up all the numbers to get a total frequency number.</li>
 <li>Step 4: Reduce the total to a single-digit.</li>
 </ul>
 </div>

 <div className="mb-6 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
 <h6 className="font-bold mb-2">Example Calculation:</h6>
 <p className="font-bold text-blue-900 mb-2 italic">Name: "RAHUL"</p>
 <ul className="list-disc pl-6 space-y-1 text-sm">
 <li><strong>R (2) + A (1) + H (5) + U (6) + L (3) = 17</strong></li>
 <li><strong>1 + 7 = 8</strong></li>
 <li><strong>Final Name Frequency = 8</strong> (Power, karma, wealth, struggles, and justice. - Saturn Energy)</li>
 </ul>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 44: Name Energy Insights --- */}
 <EbookHeaderFooter>
 <div className="mt-8 border-t-2 border-gray-300 pt-6">
 <h5 className="font-bold mb-4 text-blue-800 text-lg flex items-center gap-2"><span className="text-2xl">🛠</span> FEAN Method Astrology Insights on Name Energy & Its Impact</h5>
 <ul className="list-disc pl-10 space-y-2 print:pl-6 text-sm text-justify">
 <li>Your name frequency directly influences your elemental balance in FEAN Method Astrology.</li>
 <li>Name energy can increase specific element concentrations in your body, affecting your success, health, and relationships.</li>
 <li>A name with excessive Fire (9) may lead to anger and aggression, while a name with too much Earth (8) can create delays and struggles.</li>
 <li>Choosing a balanced name or modifying it using numerology can harmonize your life energy.</li>
 <li className="font-bold text-red-600">Name frequency never lies on 4, 8, 7. Very problematic frequency.</li>
 </ul>
 </div>

 <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500 print:p-3 mt-6">
 <h6 className="font-bold mb-3 flex items-center gap-2 text-yellow-900"><span className="text-xl">🚀</span> Optimize Your Name Energy for Success!</h6>
 <ul className="space-y-1 text-sm text-justify">
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Calculate your name frequency.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Check its alignment with your FEAN elemental balance.</span>
 </li>
 <li className="flex gap-2">
 <span className="text-black font-bold">✔</span>
 <span>Modify if necessary to create harmony in life.</span>
 </li>
 </ul>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 38: Special Case: Missing Number 3 (Sundar Pichai) --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base text-blue-900">
 <span className="text-2xl mr-2">🔷</span> 
 Special Case in FEAN Method Astrology: Missing Number 3 & Present Number 6 or 66 in Loshu Grid, but Still Achieving Great Success in Life
 </h4>
 
 <p className="mb-4 text-justify text-sm">
 Normally, when <strong>Number 3 is missing</strong> in the Lo Shu Grid (which represents the Air/Soft Wood element and controls the energy of Jupiter), it indicates:
 </p>
 <ul className="list-disc pl-10 space-y-1 mb-6 print:pl-6 text-sm">
 <li>Poor social connectivity.</li>
 <li>Lack of strong support from society or friend circles.</li>
 <li>Fewer career opportunities due to weak public networking.</li>
 <li>Reduced wisdom, learning, and guidance from Jupiter.</li>
 </ul>

 <div className="bg-gray-100 p-4 border-l-4 border-gray-600 print:p-3 mb-8">
 <h5 className="font-bold mb-2 text-lg">Principle –</h5>
 <p className="text-sm font-semibold italic text-justify text-gray-800 leading-relaxed">
 "Whenever the concentration level of the Moolank or Bhagyank becomes the highest in the Lo Shu Grid, the element associated with it becomes both the person's weakness and strength."
 </p>
 <p className="text-sm mt-2 text-justify">
 The key is for the person to understand themselves deeply and figure out how to transform that weakness into their greatest strength.
 </p>
 </div>

 <h5 className="font-bold mb-6 text-blue-800 text-lg">For example –</h5>
 <div className="flex flex-col items-center">
 <p className="font-bold mb-4 text-center">1. Sundar Pichai – 10/06/1972 (Moolank - 1, Bhagyank - 8)</p>
 
 <div className="grid grid-cols-3 w-64 border-2 border-black bg-[#fff6e6] print:w-56 text-2xl font-bold text-center">
 <div className="border border-black aspect-square flex items-center justify-center">8</div>
 <div className="border border-black aspect-square flex items-center justify-center relative">
 <span className="z-10">111</span>
 <div className="absolute inset-0 m-2 border-2 border-green-500 rounded-full opacity-70"></div>
 </div>
 <div className="border border-black aspect-square flex items-center justify-center">6</div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center">9</div>
 <div className="border border-black aspect-square flex items-center justify-center">2</div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 <div className="border border-black aspect-square flex items-center justify-center">7</div>
 <div className="border border-black aspect-square flex items-center justify-center"></div>
 </div>
 </div>
 </EbookHeaderFooter>

 

 




 
 
 {/* --- PAGE 42: Example Grids (Ratan Tata, Elon Musk, Ashneer Grover) --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base">Example Grids in FEAN Method Astrology</h4>
 
 <div className="space-y-8 mt-4">
 
 {/* Example 1: Ratan Tata */}
 <div>
 <h5 className="font-bold mb-4 text-blue-800">2. Ratan Tata Sir - 28/12/1937 (Moolank -1, Bhagyank -6)</h5>
 <div className="flex justify-center">
 <table className="border-collapse border-2 border-black w-3/4 max-w-sm text-center bg-white shadow-lg">
 <tbody>
 <tr>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50"></td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">9</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">22</td>
 </tr>
 <tr>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">3</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50"></td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">7</td>
 </tr>
 <tr>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">8</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold text-red-600 bg-red-50 border-4 border-red-500 rounded-full inline-block mt-2 px-2">111</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">6</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 {/* Example 2: Elon Musk */}
 <div>
 <h5 className="font-bold mb-4 text-blue-800">3. Elon Musk - 28/06/1971 (Moolank -1, Bhagyank -7)</h5>
 <div className="flex justify-center">
 <table className="border-collapse border-2 border-black w-3/4 max-w-sm text-center bg-white shadow-lg">
 <tbody>
 <tr>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50"></td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">9</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">2</td>
 </tr>
 <tr>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold"></td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50"></td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold text-orange-600">77</td>
 </tr>
 <tr>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">8</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold text-red-600 bg-red-50 border-4 border-red-500 rounded-full inline-block mt-2 px-2">111</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">6</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 {/* Example 3: Ashneer Grover */}
 <div>
 <h5 className="font-bold mb-4 text-blue-800">4. Ashneer Grover - 14/06/1982 (Moolank - 5, Bhagyank - 4)</h5>
 <div className="flex justify-center">
 <table className="border-collapse border-2 border-black w-3/4 max-w-sm text-center bg-white shadow-lg">
 <tbody>
 <tr>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50 text-orange-600 border-4 border-green-500 rounded-full inline-block mt-2 px-2">44</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">9</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">2</td>
 </tr>
 <tr>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold"></td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">5</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold"></td>
 </tr>
 <tr>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">8</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold">11</td>
 <td className="border-2 border-black p-4 w-1/3 h-16 text-xl font-bold bg-gray-50">6</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 43: Rudraksha Guide Introduction --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-6 font-serif print:text-base print:mt-1 print:mb-1 text-center print:text-base text-amber-700">FEAN Method Astrology Guide: How to Find Suitable Rudraksha & Its Benefits</h4>
 
 <p className="mb-4 text-justify">
 In FEAN Method Astrology, Rudraksha plays a vital role in balancing elemental concentrations within the body. Since each number in the Lo Shu Grid represents a specific element, selecting the right Rudraksha helps regulate these elements, restoring balance and preventing imbalances that cause mental, physical, and financial struggles.
 </p>

 <h5 className="font-bold mb-2 text-blue-800">Choose the Right Rudraksha Based on Missing or Excessive Elements</h5>
 <ul className="list-disc pl-10 space-y-2 mb-6 print:pl-6 text-sm">
 <li><strong>If an element is missing</strong> → Wear the corresponding Rudraksha to enhance that element.</li>
 <li><strong>If an element is excessive</strong> → Use <strong>donation remedies</strong> (instead of Rudraksha) to reduce its effect.</li>
 </ul>

 <h5 className="font-bold mb-2 text-blue-800">When to Wear Rudraksha in FEAN Method Astrology?</h5>
 <ul className="list-disc pl-10 space-y-2 mb-6 print:pl-6 text-sm">
 <li><span className="text-green-600">✔</span> If a number is missing in the Lo Shu Grid → Rudraksha is <strong>mandatory</strong> to restore balance.</li>
 <li><span className="text-red-600">✔</span> If a number is excessive → <strong>Do not</strong> wear Rudraksha; instead, use <strong>donation remedies</strong> or <strong>mantra chanting</strong> to reduce excess energy.</li>
 </ul>

 <h5 className="font-bold mb-2 text-blue-800">Additional Benefits of Wearing Rudraksha According to FEAN Method Astrology</h5>
 <ul className="list-none pl-4 space-y-3 mb-6 print:pl-2 text-sm">
 <li className="flex items-start gap-2"><span className="text-amber-600 mt-1">✔</span> <strong>Balances Elemental Energy:</strong> Rudraksha aligns your body's elemental energy with the universe.</li>
 <li className="flex items-start gap-2"><span className="text-amber-600 mt-1">✔</span> <strong>Enhances Mental & Physical Well-being:</strong> Removes mental stress, increases focus, and improves health.</li>
 <li className="flex items-start gap-2"><span className="text-amber-600 mt-1">✔</span> <strong>Strengthens Planetary Influences:</strong> Connects with planetary vibrations for astrological benefits.</li>
 <li className="flex items-start gap-2"><span className="text-amber-600 mt-1">✔</span> <strong>Boosts Spiritual Growth & Protection:</strong> Shields against negative energies and obstacles in life.</li>
 </ul>

 <div className="bg-amber-50 p-4 border-l-4 border-amber-500 mt-4">
 <h6 className="font-bold flex items-center gap-2 mb-2 text-amber-900"><span className="text-xl">🚀</span> Final Advice: Unlock Success with the Right Rudraksha!</h6>
 <ul className="list-none space-y-1 text-sm text-amber-900">
 <li>✔ Analyze your Lo Shu Grid and identify missing/elements.</li>
 <li>✔ Select the correct Rudraksha based on your elemental imbalance.</li>
 <li>✔ Follow donation remedies if an element is excessive (instead of wearing Rudraksha).</li>
 <li>✔ With the right Rudraksha, balance your life, finances, health, and relationships!</li>
 </ul>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 44: Missing Numbers Table & 10 Mukhi Intro --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 font-serif text-center print:text-base bg-amber-100 py-2">Missing Numbers in Loshu Grid</h4>
 
 <div className="flex justify-center mb-8">
 <table className="border-collapse border-2 border-black w-full text-sm max-w-lg shadow-md">
 <thead>
 <tr className="bg-amber-100">
 <th className="border-2 border-black p-2 text-left">Missing Numbers in Loshu Grid</th>
 <th className="border-2 border-black p-2 text-left">Suitable Rudraksha</th>
 </tr>
 </thead>
 <tbody>
 <tr><td className="border-2 border-black p-2 font-bold bg-amber-50">1</td><td className="border-2 border-black p-2 bg-white">1 Mukhi Rudraksha</td></tr>
 <tr><td className="border-2 border-black p-2 font-bold bg-amber-50">2</td><td className="border-2 border-black p-2 bg-gray-100">2 Mukhi Rudraksha</td></tr>
 <tr><td className="border-2 border-black p-2 font-bold bg-amber-50">3</td><td className="border-2 border-black p-2 bg-white">5 Mukhi Rudraksha</td></tr>
 <tr><td className="border-2 border-black p-2 font-bold bg-amber-50">4</td><td className="border-2 border-black p-2 bg-gray-100">8 Mukhi Rudraksha</td></tr>
 <tr><td className="border-2 border-black p-2 font-bold bg-amber-50">5</td><td className="border-2 border-black p-2 bg-white">4 Mukhi Rudraksha</td></tr>
 <tr><td className="border-2 border-black p-2 font-bold bg-amber-50">6</td><td className="border-2 border-black p-2 bg-gray-100">9 Mukhi Rudraksha</td></tr>
 <tr><td className="border-2 border-black p-2 font-bold bg-amber-50">7</td><td className="border-2 border-black p-2 bg-white">7 Mukhi Rudraksha</td></tr>
 <tr><td className="border-2 border-black p-2 font-bold bg-amber-50">8</td><td className="border-2 border-black p-2 bg-gray-100">6 Mukhi Rudraksha</td></tr>
 <tr><td className="border-2 border-black p-2 font-bold bg-amber-50">9</td><td className="border-2 border-black p-2 bg-white">3 Mukhi Rudraksha</td></tr>
 </tbody>
 </table>
 </div>

 <h4 className="text-lg font-bold mb-4 text-blue-800 text-center">10 Mukhi Rudraksha – Symbol of Protection & Power</h4>
 <div className="bg-blue-50 p-4 border-l-4 border-blue-500 mb-6">
 <p className="mb-1 text-sm"><strong>Ruling Deity:</strong> Lord Vishnu</p>
 <p className="mb-1 text-sm"><strong>Planetary Association:</strong> No specific planet <em>(Neutralizes all planetary doshas)</em></p>
 <p className="text-sm"><strong>Elemental Influence (FEAN Method Astrology Insight):</strong> Balances all five elements to protect the wearer from negative energies.</p>
 </div>

 <h5 className="font-bold mb-4">Best Results of 10 Mukhi Rudraksha:</h5>
 <div className="space-y-4">
 <div>
 <h6 className="font-bold text-sm">1. Removes Fear and Evil Energies</h6>
 <ul className="list-circle pl-8 text-sm text-gray-700">
 <li>Protects from black magic, evil eye, and negative spirits.</li>
 <li>Builds a powerful energetic shield around the body.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm">2. Strengthens Mental Stability</h6>
 <ul className="list-circle pl-8 text-sm text-gray-700">
 <li>Brings inner strength, courage, and fearlessness.</li>
 <li>Reduces anxiety and boosts confidence in tough situations.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm">3. Balances Multiple Planetary Energies</h6>
 <ul className="list-circle pl-8 text-sm text-gray-700">
 <li>Neutralizes malefic effects of all planets, especially Rahu, Ketu, and Shani.</li>
 <li>Ideal for people facing repeated failures due to planetary doshas.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm">4. Spiritual Growth and Wisdom</h6>
 <ul className="list-circle pl-8 text-sm text-gray-700">
 <li>Increases connection with divine consciousness.</li>
 <li>Improves meditation, focus, and intuition.</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 45: 10 Mukhi Conclusion & 11 Mukhi Intro --- */}
 <EbookHeaderFooter className="original-spacing">
 <div className="space-y-4 mb-8">
 <div>
 <h6 className="font-bold text-[12.5px]">5. Career and Legal Protection</h6>
 <ul className="list-circle pl-8 text-[12.5px] text-gray-700">
 <li>Helpful in court cases, legal battles, and disputes.</li>
 <li>Ensures victory and favorable outcomes when worn with faith.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-[12.5px]">6. Improves Aura & Attracts Positivity</h6>
 <ul className="list-circle pl-8 text-[12.5px] text-gray-700">
 <li>Enhances the magnetic field (aura) of the wearer.</li>
 <li>Attracts opportunities, good people, and prosperity.</li>
 </ul>
 </div>
 </div>

 <h5 className="font-bold mb-4 text-blue-800 text-lg flex items-center gap-2"><span className="text-2xl">🧠</span> FEAN Method Astrology Perspective:</h5>
 <p className="text-justify text-[12.5px] mb-4">
 Since the 10 Mukhi Rudraksha balances all five elements (Water, Fire, Air, Earth, Sky), it is extremely effective for people with multiple elemental imbalances in their Lo Shu Grid.
 </p>
 <div className="mb-6">
 <p className="font-bold text-[12.5px] mb-2">Ideal for those:</p>
 <ul className="list-disc pl-10 text-[12.5px] space-y-1">
 <li><strong>Having missing or excessive numbers</strong> in the Lo Shu Grid.</li>
 <li>Experiencing <strong>combined issues</strong> like fear, overthinking, aggression, emotional distress, and lack of grounding.</li>
 <li>Facing planetary challenges involving Rahu, Ketu, or Shani energies.</li>
 </ul>
 </div>

 <h5 className="font-bold mb-2 text-blue-800 flex items-center gap-2"><span className="text-xl">🔍</span> Who Should Wear It?</h5>
 <ul className="list-disc pl-10 text-[12.5px] space-y-1 mb-6">
 <li>People in legal professions, public speakers, judges, lawyers.</li>
 <li>Spiritual seekers and meditators.</li>
 <li>Anyone under strong negative energy influences or sudden setbacks.</li>
 </ul>

 <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500 mb-8 text-[12.5px]">
 <p className="font-bold mb-2">Note –</p>
 <ul className="list-disc pl-6 space-y-1">
 <li>10 Mukhi Rudraksha works as a powerful tool in winning any legal battle. Eliminate Vastu Dosha and Pitra Dosha.</li>
 <li>Placing a 10 Mukhi Rudraksha in various areas of a home or business can help shield and purify the space from negative energies.</li>
 </ul>
 </div>

 <h4 className="text-lg font-bold mb-4 text-red-800 text-center">11 Mukhi Rudraksha – The Bead of Divine Protection and Courage</h4>
 <div className="bg-red-50 p-4 border-l-4 border-red-500 mb-6">
 <p className="mb-1 text-[12.5px]"><strong>Ruling Deity:</strong> Lord Hanuman (Ekadash Rudra form of Lord Shiva)</p>
 <p className="text-[12.5px]"><strong>Ruling Planet:</strong> Mars (Mangal) – Also balances Rahu and Saturn to some extent.</p>
 </div>

 <h5 className="font-bold mb-4">Key Benefits & Best Results of 11 Mukhi Rudraksha:</h5>
 <div className="space-y-4">
 <div>
 <h6 className="font-bold text-[12.5px] text-green-700 flex items-center gap-2"><span className="text-lg">✔</span> 1. Boosts Confidence & Courage (Hanuman Shakti)</h6>
 <ul className="list-circle pl-10 text-[12.5px] text-gray-700 mt-1">
 <li>Removes fear, self-doubt, and phobias.</li>
 <li>Ideal for those with a lack of motivation or presence of mind.</li>
 <li>Helps overcome enemies and obstacles in life.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-[12.5px] text-pink-700 flex items-center gap-2"><span className="text-lg">🧠</span> 2. Sharpens Intellect and Improves Memory</h6>
 <ul className="list-circle pl-10 text-[12.5px] text-gray-700 mt-1">
 <li>Enhances focus, clarity of thought, and decision-making.</li>
 <li>Great for students, researchers, and spiritual seekers.</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 46: 11 Mukhi Conclusion & 12 Mukhi Details --- */}
 <EbookHeaderFooter>
 <div className="space-y-4 mb-8">
 <div>
 <h6 className="font-bold text-sm text-red-700 flex items-center gap-2"><span className="text-lg">🛡️</span> 3. Protection from Accidents and Negative Energies</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Acts as an energy shield against evil spirits, psychic attacks, and harmful planetary energies.</li>
 <li>Especially powerful for those under Rahu, Shani, or Mars dosha.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-indigo-700 flex items-center gap-2"><span className="text-lg">📈</span> 4. Improves Leadership & Authority</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li className="list-none -ml-4 font-bold text-gray-900">Best for professionals in administration, defense, police, politics, and leadership roles.</li>
 <li>Boosts assertiveness, clarity, and command over speech.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-purple-700 flex items-center gap-2"><span className="text-lg">🧘</span> 5. Promotes Spiritual Discipline</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Enhances spiritual progress, inner strength, and energy control.</li>
 <li>Supports yogic practices and builds control over senses.</li>
 </ul>
 </div>
 </div>

 <h4 className="text-lg font-bold mb-4 text-orange-800 text-center mt-8">12 Mukhi Rudraksha – The Surya Bead of Radiance, Power & Self-Leadership</h4>
 <div className="bg-orange-50 p-4 border-l-4 border-orange-500 mb-6">
 <p className="mb-1 text-sm"><strong>Ruling Deity:</strong> Lord Surya (The Sun God)</p>
 <p className="text-sm"><strong>Ruling Planet:</strong> Sun (Surya)</p>
 </div>

 <h5 className="font-bold mb-4 text-green-700 flex items-center gap-2"><span className="text-xl">✔</span> Benefits & Best Results of 12 Mukhi Rudraksha:</h5>
 <div className="space-y-4">
 <div>
 <h6 className="font-bold text-sm text-yellow-700 flex items-center gap-2"><span className="text-lg">🌞</span> 1. Enhances Personality & Aura</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Builds a magnetic aura that draws respect and admiration.</li>
 <li>Makes you more charming, impressive, and impactful in public settings.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-pink-700 flex items-center gap-2"><span className="text-lg">🧠</span> 2. Boosts Mental Clarity & Confidence</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Improves concentration, decision-making, and memory power.</li>
 <li>Reduces overthinking and helps in staying calm and composed under pressure.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-red-700 flex items-center gap-2"><span className="text-lg">🔥</span> 3. Strengthens Leadership & Authority</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Ideal for people in high positions like CEOs, political leaders, administrators, teachers, and performers.</li>
 <li>Makes the wearer bold, fearless, and assertive.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-orange-700 flex items-center gap-2"><span className="text-lg">💪</span> 4. Improves Physical Vitality & Immunity</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Enhances stamina, digestion, and overall physical energy.</li>
 <li>Known to help with ailments related to the heart, bones, and eyes (organs governed by Sun).</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-red-600 flex items-center gap-2"><span className="text-lg">🚫</span> 5. Removes Fear, Self-Doubt & Low Self-Esteem</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Fills the wearer with inner strength, determination, and purpose.</li>
 <li>Removes the fear of rejection, criticism, or failure.</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 
 {/* --- PAGE 47: 13 Mukhi Rudraksha --- */}
 <EbookHeaderFooter>
 <h4 className="text-lg font-bold mb-4 text-pink-800 text-center mt-4">13 Mukhi Rudraksha – The Bead of Attraction, Success & Charm</h4>
 <div className="bg-pink-50 p-4 border-l-4 border-pink-500 mb-6">
 <p className="mb-1 text-sm"><strong>Ruling Deity:</strong> Kamadeva (God of Love & Desire)</p>
 <p className="mb-1 text-sm"><strong>Secondary Deity:</strong> Lord Indra (King of Gods)</p>
 <p className="mb-1 text-sm"><strong>Ruling Planet:</strong> Venus (Shukra)</p>
 <p className="text-sm"><strong>Elemental Influence (FEAN Method Astrology):</strong> Increases Sky/Yellow Metal element (Number 6), associated with luxury, attraction, relationships, and charm.</p>
 </div>

 <h5 className="font-bold mb-4 text-green-700 flex items-center gap-2"><span className="text-xl">✔</span> Key Benefits & Best Results of 13 Mukhi Rudraksha:</h5>
 <div className="space-y-4">
 <div>
 <h6 className="font-bold text-sm text-pink-700 flex items-center gap-2"><span className="text-lg">💖</span> 1. Enhances Physical Charm & Attractiveness</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Boosts natural magnetism and makes the wearer more appealing and desirable.</li>
 <li>Increases attraction power, both in professional and personal life.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-rose-700 flex items-center gap-2"><span className="text-lg">🌟</span> 2. Improves Relationships & Romantic Life</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Strengthens emotional bonds and intimacy in relationships.</li>
 <li>Useful for resolving relationship conflicts or misunderstandings.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-yellow-700 flex items-center gap-2"><span className="text-lg">💼</span> 3. Brings Success in Business & Career</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Excellent for professionals in marketing, fashion, films, glamour, media, or luxury industries.</li>
 <li>Helps in closing deals, winning people's trust, and standing out in competitive environments.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-indigo-700 flex items-center gap-2"><span className="text-lg">🧘</span> 4. Supports Kundalini Awakening & Spiritual Energy Flow</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Enhances the flow of energy in the sacral and heart chakras.</li>
 <li>Helpful in tantra and spiritual sadhanas where energy balance is crucial.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-yellow-600 flex items-center gap-2"><span className="text-lg">💰</span> 5. Attracts Wealth, Luxury & Prosperity</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Invokes the blessings of Indra, who rules over wealth and comforts.</li>
 <li>Helps the wearer enjoy material and spiritual success simultaneously.</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 {/* --- PAGE 48: 13 Mukhi Who Should Wear & 14 Mukhi Intro --- */}
 <EbookHeaderFooter>
 <h5 className="font-bold mb-4 text-blue-800 flex items-center gap-2 mt-4"><span className="text-xl">🕵️</span> Who Should Wear 13 Mukhi Rudraksha?</h5>
 <ul className="list-disc pl-10 text-sm space-y-1 mb-8">
 <li>People in glamour, media, fashion, cosmetics, modeling, acting, or entertainment.</li>
 <li>Business owners and sales professionals who rely on charm and persuasion.</li>
 <li>Those with relationship troubles or weak Venus in their Kundli (especially in 6th, 8th, or 12th house).</li>
 </ul>

 <h4 className="text-lg font-bold mb-4 text-indigo-800 text-center border-t-2 border-gray-300 pt-8">14 Mukhi Rudraksha – The Divine Gem of Intuition, Willpower & Protection</h4>
 <div className="bg-indigo-50 p-4 border-l-4 border-indigo-500 mb-6">
 <p className="mb-1 text-sm"><strong>Ruling Deity:</strong> Lord Hanuman & Lord Shiva (as Mahadev Rudra)</p>
 <p className="text-sm"><strong>Ruling Planet:</strong> Saturn (Shani) and also associated with Mars (Mangal)</p>
 </div>

 <h5 className="font-bold mb-4 text-green-700 flex items-center gap-2"><span className="text-xl">✔</span> Top Benefits & Best Results of 14 Mukhi Rudraksha:</h5>
 <div className="space-y-4">
 <div>
 <h6 className="font-bold text-sm text-purple-700 flex items-center gap-2"><span className="text-lg">👁️</span> 1. Enhances Intuition and Third Eye Activation</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Sharpens sixth sense and inner guidance.</li>
 <li>Helps make the right decisions, especially in tough or confusing situations.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-blue-700 flex items-center gap-2"><span className="text-lg">🧗</span> 2. Provides Strong Willpower and Stability</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Gives mental firmness, clarity, and focused direction in life.</li>
 <li>Helps overcome distractions, laziness, and fears.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-gray-800 flex items-center gap-2"><span className="text-lg">⚖️</span> 3. Removes the Malefic Effects of Saturn (Shani)</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Offers protection during Sade Sati, Dhaiya, or Shani Dosh.</li>
 <li>Reduces delays, obstacles, karmic struggles, and fear of unknown losses.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-orange-700 flex items-center gap-2"><span className="text-lg">💪</span> 4. Provides Hanuman-Like Courage and Strength</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Boosts self-confidence, physical energy, and resistance to negativity.</li>
 <li>Helps fight internal and external enemies with clarity and fearlessness.</li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm text-indigo-900 flex items-center gap-2"><span className="text-lg">🧿</span> 5. Protection from Accidents and Evil Energies</h6>
 <ul className="list-circle pl-10 text-sm text-gray-700 mt-1">
 <li>Acts like a spiritual shield; keeps the person safe during travel, critical decisions, or dangerous environments.</li>
 </ul>
 </div>
 </div>
 </EbookHeaderFooter>

 </div>
 );
};

export default EbookContents;