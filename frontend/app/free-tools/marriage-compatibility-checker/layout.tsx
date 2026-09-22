import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Marriage Compatibility Calculator — 36 Guna Milan & Numerology Marriage Match | OM Astrology AMC',
  description:
    'Calculate free online marriage compatibility. Ashtakoot 36 Guna Kundali matching and numerology marriage compatibility calculator for love and marital harmony.',
  keywords: [
    'marriage compatibility calculator',
    'numerology marriage compatibility calculator',
    'marriage numerology compatibility calculator',
    'kundali matching',
    '36 guna milan',
    'marriage compatibility',
    'manglik dosha check',
    'ashtakoot milan'
  ],
  openGraph: {
    title: 'Free Marriage Compatibility Calculator — OM Astrology AMC',
    description: 'Calculate Ashtakoot 36 Guna milan, Manglik dosha, and marriage numerology compatibility free.',
    url: '/free-tools/marriage-compatibility-checker',
  },
  alternates: { canonical: '/free-tools/marriage-compatibility-checker' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Marriage Compatibility', url: '/free-tools/marriage-compatibility-checker' },
        ]}
      />
      {children}
    </>
  );
}
