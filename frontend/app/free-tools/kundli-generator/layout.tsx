import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Kundli Generator Online — Janam Kundli Analysis & Birth Chart Reading | OM Astrology AMC',
  description:
    'Generate your Janam Kundli online for free. Detailed birth chart analysis, planetary positions, Kundli doshas, and Vimshottari Dasha timeline.',
  keywords: [
    'free kundli generator',
    'janam kundali online',
    'kundli online',
    'free kundli',
    'janam kundli',
    'janam kundli analysis',
    'kundli analysis',
    'detailed kundli analysis',
    'kundli reading',
    'kundli reading online',
    'kundli prediction online',
    'kundli consultation online',
    'vedic kundli analysis',
    'planet position in kundli',
    'kundli dosha analysis'
  ],
  openGraph: {
    title: 'Free Kundli Generator Online — Janam Kundli Analysis | OM Astrology AMC',
    description: 'Generate your Janam Kundli online for free with detailed planetary degrees and Dasha timeline.',
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
