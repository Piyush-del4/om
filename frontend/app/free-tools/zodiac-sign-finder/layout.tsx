import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Zodiac Sign Finder — Sun & Moon Sign',
  description:
    'Find your zodiac sign, elemental triplicities, and astrological alignment using your exact date of birth.',
  keywords: ['zodiac sign finder', 'sun sign calculator', 'what is my zodiac sign', 'astrology sign calculator'],
  openGraph: {
    title: 'Free Zodiac Sign Finder — OM Astrology AMC',
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
