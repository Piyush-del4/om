import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Astrology & Numerology Calculators | OM Astrology AMC',
  description:
    'Use 100% free Vedic Astrology and Numerology calculators: Kundli generator, marriage compatibility, name numerology, Panchang, Ascendant, and Dasha calculations.',
  keywords: [
    'free astrology calculator', 'free numerology calculator', 'kundli generator',
    'marriage compatibility checker', 'panchang online', 'ascendant calculator',
    'moon sign calculator', 'nakshatra finder', 'name numerology',
  ],
  openGraph: {
    title: 'Free Astrology & Numerology Calculators — OM Astrology AMC',
    description:
      'Calculate your birth chart, lucky numbers, name vibrations, and planetary dashas with our free online tools.',
    url: '/free-tools',
  },
  alternates: {
    canonical: '/free-tools',
  },
};

export default function FreeToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
        ]}
      />
      {children}
    </>
  );
}
