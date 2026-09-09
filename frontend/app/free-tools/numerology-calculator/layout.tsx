import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Numerology Calculator — Life Path & Destiny Number',
  description:
    'Calculate your Life Path, Mulank, Bhagyank, and Namank numbers free. Authentic Pythagorean & Chaldean numerology calculator.',
  keywords: ['free numerology calculator', 'life path number', 'mulank calculator', 'bhagyank calculator', 'chaldean numerology'],
  openGraph: {
    title: 'Free Numerology Calculator — OM Astrology AMC',
    description: 'Calculate your Life Path, Mulank, and Bhagyank numbers free with Chaldean & Pythagorean analysis.',
    url: '/free-tools/numerology-calculator',
  },
  alternates: { canonical: '/free-tools/numerology-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Numerology Calculator', url: '/free-tools/numerology-calculator' },
        ]}
      />
      {children}
    </>
  );
}
