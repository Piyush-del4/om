import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Name Numerology Calculator & Astrology Name Calculator — Chaldean Name Correction | OM Astrology AMC',
  description:
    'Calculate your Chaldean name number and astrology from name. Free astrological name calculator for name correction with numerology and name vibration analysis.',
  keywords: [
    'name numerology calculator',
    'astrology in name',
    'name astrology',
    'name correction by numerology software',
    'fortune telling by name',
    'astrology from name',
    'name correction with numerology',
    'astrological name calculator',
    'name calculator astrology',
    'astro name calculator',
    'chaldean name number'
  ],
  openGraph: {
    title: 'Name Numerology Calculator & Astrology Name Calculator — OM Astrology AMC',
    description: 'Calculate your name vibration number using Chaldean numerology and check name harmony.',
    url: '/free-tools/name-numerology-calculator',
  },
  alternates: { canonical: '/free-tools/name-numerology-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Name Numerology Calculator', url: '/free-tools/name-numerology-calculator' },
        ]}
      />
      {children}
    </>
  );
}
