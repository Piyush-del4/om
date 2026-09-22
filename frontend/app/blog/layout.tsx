import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Astrology, Numerology & FEAN Method Blog | OM Astrology AMC',
  description: 'Read expert articles on Vedic Astrology, Chaldean Numerology, Tarot Cards, Graphology handwriting analysis, and the FEAN Method.',
  openGraph: {
    title: 'Astrology, Numerology & FEAN Method Blog — OM Astrology AMC',
    description: 'Expert guidance and articles on Vedic Astrology, Numerology, Tarot, and Graphology.',
    url: 'https://www.omastrologyamc.com/blog',
  },
  alternates: {
    canonical: 'https://www.omastrologyamc.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
