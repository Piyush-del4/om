import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Birth Chart Generator Online — Free Astrology Natal Chart & Horoscope Generator | OM Astrology AMC',
  description:
    'Generate your free birth chart online. Instant free online astrology chart generator with planetary positions, house placements, and Vedic Kundli chart analysis.',
  keywords: [
    'birth chart generator',
    'free online astrology chart generator',
    'generate birth chart',
    'free online birth chart generator',
    'astrology chart generator online free',
    'horoscope birth chart generator',
    'horoscope chart generator online',
    'birth chart generator online',
    'create horoscope chart online free',
    'natal chart online'
  ],
  openGraph: {
    title: 'Free Birth Chart Generator Online — OM Astrology AMC',
    description: 'Generate your free birth chart online with planetary positions and house placements.',
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
