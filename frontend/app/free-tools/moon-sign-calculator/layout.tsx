import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Moon Sign Calculator — Rashi Finder Online',
  description:
    'Discover your Rashi (Moon Sign) and nakshatra placement based on exact birth details in Vedic Astrology.',
  keywords: ['moon sign calculator', 'rashi finder', 'janma rashi calculator', 'vedic moon sign'],
  openGraph: {
    title: 'Free Moon Sign Calculator — OM Astrology AMC',
    description: 'Discover your Rashi (Moon Sign) and nakshatra placement based on birth details.',
    url: '/free-tools/moon-sign-calculator',
  },
  alternates: { canonical: '/free-tools/moon-sign-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Moon Sign Calculator', url: '/free-tools/moon-sign-calculator' },
        ]}
      />
      {children}
    </>
  );
}
