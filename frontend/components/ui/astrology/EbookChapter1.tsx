import React from 'react';
import { EbookLoShuGrid } from './EbookLoShuGrid';

export const EbookChapter1 = () => {
 return (
 <div className="ebook-content space-y-12">
 
 {/* ── Title & Intro ── */}
 <section>
 <h2 className="text-3xl font-serif font-bold text-amber-900 border-b-2 border-amber-200 pb-2 mb-6">
 <u>FEAN Method Astrology AMB</u> (FEAN Method Astrology AMB (Five Elements, Astrology & Numerology))
 </h2>
 <h3 className="text-xl font-bold text-gray-800 mb-4">
 FEAN Method Astrology AMB: A Revolutionary Approach by Rajessh Paanday
 </h3>
 
 <p className="mb-4">
 <strong>FEAN Method Astrology AMB</strong>, a patented and groundbreaking innovation by <strong>Rajessh Paanday</strong>, aims to transform lives by harmonizing the five essential elements: Air, Water, Fire, Earth, and Sky.
 </p>
 <p className="mb-4">
 This system specializes in analyzing the <strong>concentration levels of the five essential elements</strong> within the human body. By evaluating these levels, the method identifies imbalances that may lead to mental, physical, or emotional challenges.
 </p>
 <p className="mb-4">
 Also known as <u>FEAN Method Astrology AMB (Five Elements, Astrology & Numerology)</u>, this research-driven approach uncovers the root causes of various challenges in life. It provides personalized insights and prescribes effective, tailored remedies to restore balance and enhance overall well-being.
 </p>
 <p className="mb-4">
 At the core of FEAN Method Astrology AMB lies the <strong>Lo Shu Grid</strong>, an ancient numerological tool where each number corresponds to a specific element. FEAN Method Astrology AMB calculates the energy concentration of these elements based on the numbers in the grid. Imbalances in elemental concentrations can manifest as mental and physical health disorders, making the analysis crucial for understanding and addressing these issues.
 </p>
 </section>

 {/* ── What Sets It Apart ── */}
 <section>
 <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">What Sets FEAN Method Astrology AMB Apart?</h3>
 <p className="mb-4">
 Unlike traditional practices, FEAN Method Astrology AMB bridges the gap between <strong>astrology</strong> and <strong>numerology</strong>. While astrology offers insights into planetary influences, numerology interprets the significance of numbers. FEAN Method Astrology AMB combines both, focusing on the concentration levels of elements and their effects on life.
 </p>
 <p className="mb-4">
 This distinctive method evaluates both:
 </p>
 <ol className="list-decimal pl-6 space-y-2 mb-4 font-medium text-gray-800">
 <li><strong>Concentration Levels at Birth:</strong> Derived from the Lo Shu Grid and planetary placements, providing a foundation of inherent energy balance.</li>
 <li><strong>Real-Time Elemental Concentrations:</strong> Reflecting current life situations and challenges.</li>
 </ol>
 <p>
 By addressing both innate and situational imbalances, FEAN Method Astrology AMB goes beyond traditional numerology to provide tailored, actionable remedies for achieving balance in life.
 </p>
 </section>

 <div className="print:break-before-page pdf-page-break my-12" />

 {/* ── Elements / Numbers Association ── */}
 <section>
 <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6 text-center">
 Elements/Numbers 1–9 and Their Associations in FEAN Method Astrology AMB
 </h3>

 {/* Visual Standard Lo Shu Grid with Annotations */}
 <div className="relative max-w-2xl mx-auto flex flex-col items-center mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
 <EbookLoShuGrid 
 isStandard={true}
 title="Standard LoShu Grid"
 cells={{
 n4: '4', n9: '9', n2: '2',
 n3: '3', n5: '5', n7: '7',
 n8: '8', n1: '1', n6: '6'
 }}
 />
 {/* Annotation text overlay (simplified for web layout) */}
 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center text-sm font-semibold text-red-600 mt-6 w-full">
 <div>4 - Controls energy of Rahu</div>
 <div>9 - Controls energy of Mars</div>
 <div>2 - Controls energy of Moon</div>
 <div>3 - Controls energy of Jupiter</div>
 <div>5 - Controls energy of Mercury</div>
 <div>7 - Controls energy of Ketu</div>
 <div>8 - Controls energy of Saturn</div>
 <div>1 - Controls energy of Sun</div>
 <div>6 - Controls energy of Venus</div>
 </div>
 </div>

 {/* Elements Table */}
 <div className="overflow-x-auto">
 <table className="w-full border-collapse border border-gray-300">
 <thead>
 <tr className="bg-[#fff2cc] text-left">
 <th className="border border-gray-300 p-3 font-bold text-black">Numbers</th>
 <th className="border border-gray-300 p-3 font-bold text-black">Elements</th>
 </tr>
 </thead>
 <tbody>
 <tr><td className="border border-gray-300 p-2 pl-4">Number 1</td><td className="border border-gray-300 p-2">Water element</td></tr>
 <tr><td className="border border-gray-300 p-2 pl-4">Number 2</td><td className="border border-gray-300 p-2">Earth Element</td></tr>
 <tr><td className="border border-gray-300 p-2 pl-4">Number 3</td><td className="border border-gray-300 p-2">Soft Wood Element (Air element)</td></tr>
 <tr><td className="border border-gray-300 p-2 pl-4">Number 4</td><td className="border border-gray-300 p-2">Hard Wood Element (Air element)</td></tr>
 <tr><td className="border border-gray-300 p-2 pl-4">Number 5</td><td className="border border-gray-300 p-2">Earth Element</td></tr>
 <tr><td className="border border-gray-300 p-2 pl-4">Number 6</td><td className="border border-gray-300 p-2">Golden Colour Metal Element (Sky Element)</td></tr>
 <tr><td className="border border-gray-300 p-2 pl-4">Number 7</td><td className="border border-gray-300 p-2">White Metal Element (Sky Element)</td></tr>
 <tr><td className="border border-gray-300 p-2 pl-4">Number 8</td><td className="border border-gray-300 p-2">Earth Element</td></tr>
 <tr><td className="border border-gray-300 p-2 pl-4">Number 9</td><td className="border border-gray-300 p-2">Fire Element</td></tr>
 </tbody>
 </table>
 </div>
 </section>

 <div className="print:break-before-page pdf-page-break my-12" />

 {/* ── Moolank and Bhagyank ── */}
 <section>
 <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">How to Make Birth Grid</h3>
 
 {/* Example 1 */}
 <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
 <p className="font-bold text-lg mb-4 text-center">Example – Date of Birth – 09/04/1990 (9th April 1990)</p>
 <div className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0">
 <div className="text-center">
 <ul className="text-left mb-4 font-semibold text-gray-800 space-y-1">
 <li><span className="text-green-600">Moolank (M)</span> = 09 = <strong>9</strong></li>
 <li><span className="text-red-600">Bhagyank (B)</span> = 0+9+0+4+1+9+9+0 = 32 = <strong>5</strong></li>
 </ul>
 <EbookLoShuGrid 
 isStandard={true}
 title="(Standard Loshu Grid)"
 cells={{
 n4: '4', n9: '9', n2: '2',
 n3: '3', n5: '5', n7: '7',
 n8: '8', n1: '1', n6: '6'
 }}
 />
 </div>
 
 <div className="text-center">
 <div className="h-20 hidden md:block"></div> {/* Spacer to align grids */}
 <EbookLoShuGrid 
 isStandard={false}
 title="(Birth Grid)"
 cells={{
 n4: '4', n9: '9999', n2: '',
 n3: '', n5: '5', n7: '',
 n8: '', n1: '1', n6: ''
 }}
 highlightedTextColors={{
 n9: 'text-black [&>span]:text-black', // Special handling could be applied here
 n5: 'text-red-600',
 }}
 />
 <p className="text-sm mt-2 text-gray-600 italic">Moolank is green, Bhagyank is red</p>
 </div>
 </div>
 </div>

 {/* Example 2 */}
 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
 <p className="font-bold text-lg mb-4 text-center">Example – Date of Birth – 03/10/1981</p>
 <div className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0">
 <div className="text-center">
 <ul className="text-left mb-4 font-semibold text-gray-800 space-y-1">
 <li><span className="text-green-600">Moolank</span> = 03 = <strong>3</strong></li>
 <li><span className="text-red-600">Bhagyank</span> = 0+3+1+0+1+9+8+1 = 23 = <strong>5</strong></li>
 </ul>
 <EbookLoShuGrid 
 isStandard={true}
 title="(Standard Loshu Grid)"
 cells={{
 n4: '4', n9: '9', n2: '2',
 n3: '3', n5: '5', n7: '7',
 n8: '8', n1: '1', n6: '6'
 }}
 />
 </div>
 
 <div className="text-center">
 <div className="h-20 hidden md:block"></div> {/* Spacer to align grids */}
 <EbookLoShuGrid 
 isStandard={false}
 title="(Birth Grid)"
 cells={{
 n4: '', n9: '9', n2: '',
 n3: <><span className="text-black">3</span><span className="text-green-600">3</span></>, n5: '5', n7: '',
 n8: '8', n1: '111', n6: ''
 }}
 highlightedTextColors={{
 n5: 'text-red-600'
 }}
 />
 </div>
 </div>
 </div>

 </section>
 </div>
 );
};
