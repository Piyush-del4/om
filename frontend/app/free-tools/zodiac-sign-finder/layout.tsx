import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Zodiac Sign Finder — Horoscope Sign Finder & Astrology Sign Calculator | OM Astrology AMC',
  description:
    'Find your zodiac sign online for free. Instant astrology sign finder and horoscope sign calculator by date of birth to get your sun sign, element, and ruling planet.',
  keywords: [
    'horoscope sign finder',
    'astrology sign finder',
    'zodiac sign finder',
    'zodiac finder',
    'zodiac sign find',
    'get my zodiac sign',
    'sun sign calculator',
    'what is my zodiac sign'
  ],
  openGraph: {
    title: 'Free Zodiac Sign Finder — Horoscope Sign Finder | OM Astrology AMC',
    description: 'Find your zodiac sign and elemental alignment using your date of birth.',
    url: '/free-tools/zodiac-sign-finder',
  },
  alternates: { canonical: '/free-tools/zodiac-sign-finder' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Zodiac Sign Finder', url: '/free-tools/zodiac-sign-finder' },
        ]}
      />
      {children}
    </>
  );
}
