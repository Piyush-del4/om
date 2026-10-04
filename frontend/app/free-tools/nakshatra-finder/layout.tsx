import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Nakshatra Finder Online — Find My Nakshatra & Birth Star Calculator | OM Astrology AMC',
  description:
    'Find your Nakshatra online for free. Discover your Janma Nakshatra (birth star), Pada, ruling planet, and deity using birth date and time.',
  keywords: [
    'nakshatra finder',
    'find my nakshatra',
    'calculator nakshatra',
    'nakshatra dasha calculator',
    'check nakshatra online',
    'birth star calculator',
    'janma nakshatra finder',
    'star birthday calculator'
  ],
  openGraph: {
    title: 'Free Nakshatra Finder Online — OM Astrology AMC',
    description: 'Find your birth Nakshatra, ruling planet, and deity from your date and time of birth.',
    url: '/free-tools/nakshatra-finder',
  },
  alternates: { canonical: '/free-tools/nakshatra-finder' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Nakshatra Finder', url: '/free-tools/nakshatra-finder' },
        ]}
      />
      {children}
    </>
  );
}
