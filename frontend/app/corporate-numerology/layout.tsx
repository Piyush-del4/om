import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate & Brand Numerology — Business Name & Logo Analysis',
  description:
    'Optimize your business name spelling, logo design colors, and incorporation date for commercial success using numerological analysis at OM Astrology AMC.',
  openGraph: {
    title: 'Corporate & Brand Numerology — OM Astrology AMC',
    description:
      'Numerological analysis for business names, brand logos, and incorporation dates to maximize commercial success.',
    url: '/corporate-numerology',
  },
};

export default function CorporateNumerologyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
