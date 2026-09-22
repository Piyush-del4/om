import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FEAN Method & Five Elements Astrology Free Ebook | OM Astrology AMC',
  description: 'Download the comprehensive FEAN Method & Five Elements Astrology handbook by Rajessh Paanday. Learn how Fire, Earth, Air, and Water elements influence your natal birth chart.',
  openGraph: {
    title: 'FEAN Method & Five Elements Astrology Free Ebook — OM Astrology AMC',
    description: 'Master Five Elements balance in Vedic Astrology, Numerology, Graphology, and remedies.',
    url: 'https://www.omastrologyamc.com/fean-ebook',
  },
  alternates: {
    canonical: 'https://www.omastrologyamc.com/fean-ebook',
  },
};

export default function FEANEbookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
