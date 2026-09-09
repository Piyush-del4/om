import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Muhurat Calculator — Auspicious Time Finder',
  description:
    'Calculate auspicious Choghadiya and Shubh Muhurat for housewarming, business launches, vehicle purchase, and ceremonies.',
  keywords: ['muhurat calculator', 'shubh muhurat today', 'choghadiya timing', 'auspicious timing finder'],
  openGraph: {
    title: 'Free Muhurat Calculator — OM Astrology AMC',
    description: 'Calculate auspicious Choghadiya and Shubh Muhurat for housewarming, business, and ceremonies.',
    url: '/free-tools/muhurat-calculator',
  },
  alternates: { canonical: '/free-tools/muhurat-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Muhurat Calculator', url: '/free-tools/muhurat-calculator' },
        ]}
      />
      {children}
    </>
  );
}
