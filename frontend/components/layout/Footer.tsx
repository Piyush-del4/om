'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 border-t border-[var(--gold-100)] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/images/logo.png" alt="OM Astrology AMC Logo" className="w-8 h-8 object-contain border border-[var(--gold-200)] rounded-full bg-black shadow-md p-0.5" />
              <h3 className="font-serif text-lg font-bold text-[var(--gold)] tracking-wide">
                OM Astrology AMC
              </h3>
            </div>
            <p className="text-xs text-[var(--gold)] font-mono uppercase tracking-widest font-semibold">
              Life Set when Planet Connect
            </p>
            <p className="text-xs leading-relaxed max-w-xs">
              Discover the ancient wisdom of occult sciences. We offer professional consultations in Astrology, Numerology, Tarot Cards, and Graphology, alongside select items to support your spiritual path.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-[var(--gold)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="hover:text-[var(--gold)] transition-colors">
                  Appointments
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[var(--gold)] transition-colors">
                  Our Shop
                </Link>
              </li>
              <li>
                <Link href="/my-batches" className="hover:text-[var(--gold)] transition-colors">
                  Study Batches
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/astrology" className="hover:text-[var(--gold)] transition-colors">
                  Astrology Readings
                </Link>
              </li>
              <li>
                <Link href="/numerology" className="hover:text-[var(--gold)] transition-colors">
                  Numerology Forecasts
                </Link>
              </li>
              <li>
                <Link href="/tarot-card" className="hover:text-[var(--gold)] transition-colors">
                  Tarot Spreads
                </Link>
              </li>
              <li>
                <Link href="/graphology" className="hover:text-[var(--gold)] transition-colors">
                  Graphology Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Support / Legal Column */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-[var(--gold)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <span className="text-gray-500">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-gray-500">
                  Contact Support
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>
            &copy; {currentYear} OM Astrology AMC Occult Science Web Platform. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Backgrounds designed with sacred geometry metrics.
          </p>
        </div>
      </div>
    </footer>
  );
}
