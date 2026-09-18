'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E7E0D4] mt-auto pt-16 pb-12 text-[#1D1C1A] print:hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#E7E0D4]">
          {/* Col 1: Brand Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="OM Astrology AMC Logo"
                className="w-10 h-10 object-contain border border-[#DED2BE] rounded-full bg-white p-1"
              />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1D1C1A] tracking-wide">
                  OM Astrology AMC
                </h3>
                <p className="text-[10px] text-[#A78652] font-mono uppercase tracking-widest font-semibold">
                  Personal Guidance &amp; Occult Sciences
                </p>
              </div>
            </div>
            <p className="text-xs text-[#77736D] leading-relaxed max-w-sm">
              A thoughtful, personal guidance platform rooted in traditional Indian occult practices and presented with modern clarity. Directed by 9+ years experienced master consultants.
            </p>
            <div className="pt-2 flex flex-col space-y-2 text-xs text-[#1D1C1A]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6F2935]"></span>
                <span className="font-medium">100% Confidential Private Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A78652]"></span>
                <span className="font-medium">Online Video &amp; In-Person Consultations</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core Disciplines & Life Guidance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#1D1C1A] uppercase tracking-wider border-b border-[#E7E0D4] pb-2">
              Disciplines &amp; Guidance
            </h4>
            <ul className="space-y-2 text-xs text-[#77736D]">
              <li>
                <Link href="/astrology" className="hover:text-[#6F2935] transition-colors">
                  Vedic Astrology &amp; Birth Chart
                </Link>
              </li>
              <li>
                <Link href="/numerology" className="hover:text-[#6F2935] transition-colors">
                  Numerology &amp; Life Path Analysis
                </Link>
              </li>
              <li>
                <Link href="/tarot-card" className="hover:text-[#6F2935] transition-colors">
                  Tarot Card Consultations
                </Link>
              </li>
              <li>
                <Link href="/graphology" className="hover:text-[#6F2935] transition-colors">
                  Graphology &amp; Handwriting Science
                </Link>
              </li>
              <li>
                <Link href="/occult-synthesis" className="hover:text-[#6F2935] transition-colors">
                  Occult Synthesis System
                </Link>
              </li>
              <li>
                <Link href="/profession-career" className="hover:text-[#6F2935] transition-colors">
                  Career &amp; Business Guidance
                </Link>
              </li>
              <li>
                <Link href="/marriage-matching" className="hover:text-[#6F2935] transition-colors">
                  Marriage &amp; Kundli Matching
                </Link>
              </li>
              <li>
                <Link href="/name-correction" className="hover:text-[#6F2935] transition-colors">
                  Name Correction Numerology
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Free Interactive Tools (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#1D1C1A] uppercase tracking-wider border-b border-[#E7E0D4] pb-2">
              Free Occult Tools
            </h4>
            <ul className="space-y-2 text-xs text-[#77736D]">
              <li>
                <Link href="/free-tools/zodiac-sign-finder" className="hover:text-[#6F2935] transition-colors">
                  Zodiac &amp; Sun Sign Finder
                </Link>
              </li>
              <li>
                <Link href="/free-tools/moon-sign-calculator" className="hover:text-[#6F2935] transition-colors">
                  Moon Sign Calculator
                </Link>
              </li>
              <li>
                <Link href="/free-tools/ascendant-calculator" className="hover:text-[#6F2935] transition-colors">
                  Ascendant (Lagna) Finder
                </Link>
              </li>
              <li>
                <Link href="/free-tools/numerology-calculator" className="hover:text-[#6F2935] transition-colors">
                  Chaldean Numerology Calculator
                </Link>
              </li>
              <li>
                <Link href="/free-tools/marriage-compatibility-checker" className="hover:text-[#6F2935] transition-colors">
                  Ashtakoot Guna Milan Matcher
                </Link>
              </li>
              <li>
                <Link href="/free-tools/panchang" className="hover:text-[#6F2935] transition-colors">
                  Daily Vedic Panchang &amp; Tithi
                </Link>
              </li>
              <li>
                <Link href="/horoscope/daily/aries" className="hover:text-[#6F2935] transition-colors">
                  Daily &amp; Weekly Horoscopes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Practice & Trust (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#1D1C1A] uppercase tracking-wider border-b border-[#E7E0D4] pb-2">
              Practice
            </h4>
            <ul className="space-y-2 text-xs text-[#77736D]">
              <li>
                <Link href="/about-us" className="hover:text-[#6F2935] transition-colors">
                  About OM Astrology
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="hover:text-[#6F2935] transition-colors">
                  Book a Consultation
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#6F2935] transition-colors">
                  Spiritual Shop
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#6F2935] transition-colors">
                  Journal &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#6F2935] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#77736D] gap-4">
          <p>
            &copy; {currentYear} OM Astrology AMC. All consultation reports &amp; insights are confidential.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#1D1C1A] transition-colors">
              Privacy &amp; Data Ethics
            </Link>
            <Link href="/appointments" className="hover:text-[#1D1C1A] transition-colors">
              Consultation Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
