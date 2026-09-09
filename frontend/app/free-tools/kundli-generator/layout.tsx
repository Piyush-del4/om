import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Kundli Generator — Online Janam Kundali Chart',
  description:
    'Generate your free Janam Kundali online with exact planetary degrees, ascendant chart, Dasha timeline, and horoscope insights.',
  keywords: ['free kundli generator', 'janam kundali online', 'kundli chart', 'birth chart generator', 'vedic horoscope'],
  openGraph: {
    title: 'Free Kundli Generator — OM Astrology AMC',
    description: 'Generate your free Janam Kundali online with exact planetary degrees and Dasha timelines.',
    url: '/free-tools/kundli-generator',
  },
  alternates: { canonical: '/free-tools/kundli-generator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Kundli Generator', url: '/free-tools/kundli-generator' },
        ]}
      />
      {children}
    </>
  );
}
