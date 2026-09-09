import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Birth Chart Generator — Natal Chart Online',
  description:
    'Generate your free natal birth chart with planetary houses, planetary degrees, and Vedic planetary placements.',
  keywords: ['birth chart generator', 'natal chart online', 'free birth chart', 'kundli chart generator'],
  openGraph: {
    title: 'Free Birth Chart Generator — OM Astrology AMC',
    description: 'Generate your free natal birth chart with planetary houses and Vedic placements.',
    url: '/free-tools/birth-chart-generator',
  },
  alternates: { canonical: '/free-tools/birth-chart-generator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Birth Chart Generator', url: '/free-tools/birth-chart-generator' },
        ]}
      />
      {children}
    </>
  );
}
