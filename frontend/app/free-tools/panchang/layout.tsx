import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Daily Panchang Today — Tithi, Nakshatra & Rahu Kaal',
  description:
    'Check today\'s Hindu Panchang: Tithi, Nakshatra, Yoga, Karana, sunrise/sunset timing, and auspicious Rahu Kaal muhurat.',
  keywords: ['daily panchang today', 'today panchang', 'tithi today', 'nakshatra today', 'rahu kaal timing'],
  openGraph: {
    title: 'Daily Panchang Today — OM Astrology AMC',
    description: 'Check today\'s Hindu Panchang: Tithi, Nakshatra, Yoga, Karana, and auspicious Rahu Kaal muhurat.',
    url: '/free-tools/panchang',
  },
  alternates: { canonical: '/free-tools/panchang' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Daily Panchang', url: '/free-tools/panchang' },
        ]}
      />
      {children}
    </>
  );
}
