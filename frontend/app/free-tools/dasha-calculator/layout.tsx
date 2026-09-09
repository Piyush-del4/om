import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Vimshottari Dasha Calculator — Planetary Periods',
  description:
    'Calculate your Mahadasha, Antardasha, and Pratyantardasha timeline based on your birth chart nakshatra.',
  keywords: ['vimshottari dasha calculator', 'mahadasha finder', 'antardasha calculator', 'dasha timeline astrology'],
  openGraph: {
    title: 'Vimshottari Dasha Calculator — OM Astrology AMC',
    description: 'Calculate your Mahadasha and Antardasha planetary timeline based on birth chart nakshatra.',
    url: '/free-tools/dasha-calculator',
  },
  alternates: { canonical: '/free-tools/dasha-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Dasha Calculator', url: '/free-tools/dasha-calculator' },
        ]}
      />
      {children}
    </>
  );
}
