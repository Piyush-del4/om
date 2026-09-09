import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Lucky Color Calculator — Zodiac & Numerology',
  description:
    'Find your personal lucky colors based on your birth number and zodiac sign to boost luck and confidence.',
  keywords: ['lucky color calculator', 'numerology lucky colors', 'zodiac lucky colors', 'planetary colors'],
  openGraph: {
    title: 'Free Lucky Color Calculator — OM Astrology AMC',
    description: 'Find your personal lucky colors based on birth number and zodiac sign.',
    url: '/free-tools/lucky-color-calculator',
  },
  alternates: { canonical: '/free-tools/lucky-color-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Lucky Color Calculator', url: '/free-tools/lucky-color-calculator' },
        ]}
      />
      {children}
    </>
  );
}
