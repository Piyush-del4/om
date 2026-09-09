import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Kundali Matching — 36 Guna & Manglik Check',
  description:
    'Free online marriage compatibility checker. Calculate Ashtakoot 36 Guna milan, Manglik dosha, and matrimonial alignment.',
  keywords: ['kundali matching', '36 guna milan', 'marriage compatibility', 'manglik dosha check', 'ashtakoot milan'],
  openGraph: {
    title: 'Free Kundali Matching — OM Astrology AMC',
    description: 'Calculate Ashtakoot 36 Guna milan, Manglik dosha, and matrimonial alignment free.',
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
