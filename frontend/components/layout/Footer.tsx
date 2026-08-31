'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { client } from '../../lib/api/client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // 1. Dynamic Data Fetching
  const { data: appointmentsRes } = useQuery({
    queryKey: ['footer-appointments'],
    queryFn: async () => {
      const res = await client.get('/appointments/types');
      return res.data?.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: shopRes } = useQuery({
    queryKey: ['footer-shop'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: batchesRes } = useQuery({
    queryKey: ['footer-batches'],
    queryFn: async () => {
      const res = await client.get('/batches');
      return res.data?.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const appointments = appointmentsRes || [];
  const shopItems = shopRes || [];
  const batches = batchesRes || [];

  // 2. Static Data Arrays
  const freeTools = [
    { name: 'Premium Ebook', href: '/fean-ebook' },
    { name: 'Numerology', href: '/free-tools/numerology-calculator' },
    { name: 'Lucky Number', href: '/free-tools/lucky-number-calculator' },
    { name: 'Name Numerology', href: '/free-tools/name-numerology-calculator' },
    { name: 'Marriage Match', href: '/free-tools/marriage-compatibility-checker' },
    { name: 'Zodiac Finder', href: '/free-tools/zodiac-sign-finder' },
    { name: 'Moon Sign', href: '/free-tools/moon-sign-calculator' },
    { name: 'Ascendant', href: '/free-tools/ascendant-calculator' },
    { name: 'Nakshatra', href: '/free-tools/nakshatra-finder' },
    { name: 'Panchang', href: '/free-tools/panchang' },
    { name: 'Daily Horoscope', href: '/free-tools/daily-horoscope' },
    { name: 'Muhurat', href: '/free-tools/muhurat-calculator' },
    { name: 'Dasha Calc', href: '/free-tools/dasha-calculator' },
    { name: 'Lucky Color', href: '/free-tools/lucky-color-calculator' },
  ];

  const horoscopes = [
    { name: 'Daily Horoscope', href: '/horoscope/daily/aries' },
    { name: 'Weekly Horoscope', href: '/horoscope/weekly/aries' },
    { name: 'Monthly Horoscope', href: '/horoscope/monthly/aries' },
    { name: 'Yearly Horoscope', href: '/horoscope/yearly/aries' }
  ];

  const transits = [
    { name: 'Sun Transit', href: '/transit/sun' },
    { name: 'Moon Transit', href: '/transit/moon' },
    { name: 'Mars Transit', href: '/transit/mars' },
    { name: 'Mercury Transit', href: '/transit/mercury' },
    { name: 'Jupiter Transit', href: '/transit/jupiter' },
    { name: 'Venus Transit', href: '/transit/venus' },
    { name: 'Saturn Transit', href: '/transit/saturn' },
    { name: 'Rahu Transit', href: '/transit/rahu' },
    { name: 'Ketu Transit', href: '/transit/ketu' },
  ];

  const numerology2026 = Array.from({ length: 9 }, (_, i) => ({
    name: `Number ${i + 1} Predictions`,
    href: `/numerology-2026/${i + 1}`
  }));

  const expertTeam = [
    { name: 'Team Kusum', href: '/appointments/team-kusum' },
    { name: 'Team Raajesh', href: '/appointments/team-raajesh' },
  ];

  const specializedAreas = [
    { name: 'Astrology Readings', href: '/astrology' },
    { name: 'Numerology Forecasts', href: '/numerology' },
    { name: 'Tarot Spreads', href: '/tarot-card' },
    { name: 'Graphology Assessment', href: '/graphology' },
  ];

  // Helper renderer
  const renderList = (title: string, links: { name: string, href: string }[]) => (
    <div className="flex flex-col space-y-4">
      <h4 className="text-gray-900 text-sm font-bold tracking-wider uppercase border-b border-[var(--gold-200)] pb-2 inline-block">
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm flex-1">
        {links.length > 0 ? (
          links.map((link, i) => (
            <li key={i}>
              <Link href={link.href} className="hover:text-[var(--gold-dark)] text-gray-600 transition-colors line-clamp-2 leading-tight">
                {link.name}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-gray-400 italic text-xs">Coming soon...</li>
        )}
      </ul>
    </div>
  );

  return (
    <footer className="bg-white border-t border-[var(--gold-200)] mt-auto pt-16 pb-8 print:hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section - Brand Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 xl:col-span-3 space-y-5">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="OM Astrology AMC Logo" className="w-10 h-10 object-contain border border-[var(--gold-200)] rounded-full bg-white shadow-md p-1" />
              <div>
                <h3 className="font-serif text-xl font-extrabold text-[var(--gold-dark)] tracking-wide">
                  OM Astrology AMC
                </h3>
                <p className="text-[10px] text-[var(--gold)] font-mono uppercase tracking-widest font-bold">
                  Life Set when Planet Connect
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Discover the ancient wisdom of occult sciences. We offer professional consultations in Astrology, Numerology, Tarot Cards, and Graphology, alongside select items to support your spiritual path.
            </p>
            <div className="space-y-2 pt-2">
              <Link href="/about-us" className="block text-sm font-semibold text-gray-900 hover:text-[var(--gold-dark)]">
                About Us
              </Link>
              <Link href="/blog" className="block text-sm font-semibold text-gray-900 hover:text-[var(--gold-dark)]">
                Blog &amp; Knowledge Hub
              </Link>
              <Link href="/privacy-policy" className="block text-sm font-semibold text-gray-900 hover:text-[var(--gold-dark)]">
                Privacy Policy
              </Link>
              <Link href="#" className="block text-sm font-semibold text-gray-900 hover:text-[var(--gold-dark)]">
                Review Our Products & Services
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
            
            {/* Free Tools */}
            {renderList('Free Tools', freeTools)}

            {/* Specialized, Team & Horoscopes */}
            <div className="flex flex-col gap-8">
              {renderList('Horoscopes', horoscopes)}
              {renderList('Specialized Areas', specializedAreas)}
              {renderList('Meet Our Experts', expertTeam)}
            </div>

            {/* 2026 Predictions */}
            <div className="flex flex-col gap-8">
              {renderList('2026 Transits', transits)}
              {renderList('2026 Numerology', numerology2026)}
            </div>

            {/* Dynamic: Appointments & Batches */}
            <div className="flex flex-col gap-8">
              {renderList('Appointments', appointments.map((a: any) => ({
                name: a.title || a.name || 'Appointment',
                href: `/appointments/${a._id}`
              })))}
              {renderList('Study Batches', batches.map((b: any) => ({
                name: b.title || b.name || 'Batch',
                href: `/batches/${b._id}`
              })))}
            </div>

            {/* Dynamic: Shop */}
            {renderList('Our Shop', shopItems.map((s: any) => ({
              name: s.title || s.name || 'Shop Item',
              href: `/shop/${s._id}`
            })))}

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--gold-100)] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4 text-center md:text-left">
          <p>
            &copy; {currentYear} OM Astrology AMC Occult Science Web Platform. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
