import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Daily Horoscope — Zodiac Predictions Today',
  description:
    'Read daily horoscope predictions for Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces.',
  keywords: ['daily horoscope today', 'zodiac predictions', 'today horoscope', 'rashi bhavishya'],
  openGraph: {
    title: 'Free Daily Horoscope — OM Astrology AMC',
    description: 'Read accurate daily horoscope predictions for all 12 zodiac signs today.',
    url: '/free-tools/daily-horoscope',
  },
  alternates: { canonical: '/free-tools/daily-horoscope' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Daily Horoscope', url: '/free-tools/daily-horoscope' },
        ]}
      />
      {children}
    </>
  );
}
