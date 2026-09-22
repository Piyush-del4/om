import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Lucky Number Calculator — Check My Lucky Number by Astrology & Numerology | OM Astrology AMC',
  description:
    'Check your lucky number online for free. Calculate your personal lucky numbers by date of birth and astrology for wealth, career, business, and daily fortune.',
  keywords: [
    'lucky number calculator',
    'check my lucky number',
    'lucky calculator',
    'lucky numbers calculator',
    'luck calculator',
    'find my lucky number',
    'calculate lucky number',
    'lucky number by astrology',
    'my lucky number astrology',
    'what is my lucky number astrology',
    'astronumerology calculator'
  ],
  openGraph: {
    title: 'Free Lucky Number Calculator — OM Astrology AMC',
    description: 'Check your personal lucky numbers by date of birth and astrology free.',
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
