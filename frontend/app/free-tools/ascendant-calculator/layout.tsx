import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Ascendant Calculator — Lagna Sign Finder',
  description:
    'Find your Lagna (Rising Sign) and 1st house placement in Vedic Astrology. Free instant calculation.',
  keywords: ['ascendant calculator', 'lagna sign finder', 'rising sign calculator', 'vedic lagna finder'],
  openGraph: {
    title: 'Free Ascendant Calculator — OM Astrology AMC',
    description: 'Find your Lagna (Rising Sign) and 1st house placement in Vedic Astrology free.',
    url: '/free-tools/ascendant-calculator',
  },
  alternates: { canonical: '/free-tools/ascendant-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Ascendant Calculator', url: '/free-tools/ascendant-calculator' },
        ]}
      />
      {children}
    </>
  );
}
