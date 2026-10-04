import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Ascendant Calculator — Calculate Ascendant Sign & Rising Sign Online | OM Astrology AMC',
  description:
    'Calculate your Ascendant sign (Lagna) online for free. Find your rising sign, 1st house lord, and birth Lagna using exact time and place of birth.',
  keywords: [
    'ascendant calculator',
    'calculate ascendant',
    'ascendant sign calculator',
    'ascendent calculator',
    'ascendant calculator online',
    'calculate my ascendant',
    'calculating ascendant',
    'calculator ascendant sign',
    'lagna sign finder',
    'rising sign calculator'
  ],
  openGraph: {
    title: 'Free Ascendant Calculator — Calculate Ascendant Sign Online | OM Astrology AMC',
    description: 'Calculate your Ascendant sign (Lagna) and 1st house placement in Vedic Astrology free.',
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
