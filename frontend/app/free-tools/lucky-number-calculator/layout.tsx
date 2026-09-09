import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Lucky Number Calculator — Daily Lucky Digits',
  description:
    'Find your daily lucky numbers for wealth, business, lottery, and personal success based on numerology.',
  keywords: ['lucky number calculator', 'daily lucky number', 'numerology lucky digits', 'lucky number finder'],
  openGraph: {
    title: 'Lucky Number Calculator — OM Astrology AMC',
    description: 'Find your personal daily lucky numbers for wealth, business, and success.',
    url: '/free-tools/lucky-number-calculator',
  },
  alternates: { canonical: '/free-tools/lucky-number-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Lucky Number Calculator', url: '/free-tools/lucky-number-calculator' },
        ]}
      />
      {children}
    </>
  );
}
