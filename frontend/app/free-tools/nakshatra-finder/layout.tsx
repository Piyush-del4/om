import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Nakshatra Finder — Birth Star Calculator',
  description:
    'Find your birth Nakshatra (Janma Nakshatra), ruling planet, and deity from your birth date and time.',
  keywords: ['nakshatra finder', 'birth star calculator', 'janma nakshatra finder', 'nakshatra lord'],
  openGraph: {
    title: 'Free Nakshatra Finder — OM Astrology AMC',
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
