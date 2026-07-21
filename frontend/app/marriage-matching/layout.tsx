import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marriage Matching — Kundali Milan, 36 Guna & Manglik Dosha Analysis',
  description:
    'Deep analysis of 36 Gunas, Manglik Dosha, and 7th house compatibility for a lifelong happy union. Expert Kundali Milan at OM Astrology AMC.',
  openGraph: {
    title: 'Marriage Matching & Kundali Milan — OM Astrology AMC',
    description:
      'Complete marriage compatibility analysis: 36 Guna matching, Manglik Dosha check, and 7th house compatibility assessment.',
    url: '/marriage-matching',
  },
};

export default function MarriageMatchingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
