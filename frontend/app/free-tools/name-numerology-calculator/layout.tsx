import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Name Numerology Calculator — Chaldean Name Number',
  description:
    'Calculate your name vibration number using Chaldean numerology. Check if your name spelling is lucky.',
  keywords: ['name numerology calculator', 'chaldean name number', 'name spelling calculator', 'name vibration'],
  openGraph: {
    title: 'Name Numerology Calculator — OM Astrology AMC',
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
