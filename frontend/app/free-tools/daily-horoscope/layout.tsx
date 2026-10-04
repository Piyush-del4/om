import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Daily Horoscope Today — Horoscope Predictions by Birth Date & Zodiac Sign | OM Astrology AMC',
  description:
    'Read free daily horoscope, weekly, and monthly predictions online. Accurate Vedic horoscope readings for career, love, finance, and health guidance.',
  keywords: [
    'daily horoscope',
    'today horoscope',
    'tomorrow horoscope',
    'weekly horoscope',
    'monthly horoscope',
    'yearly horoscope',
    'annual horoscope',
    'free horoscope',
    'horoscope online',
    'online horoscope',
    'horoscope prediction',
    'horoscope reading',
    'horoscope analysis',
    'horoscope consultation',
    'personalized horoscope reading',
    'vedic horoscope prediction',
    'love horoscope',
    'career horoscope',
    'finance horoscope',
    'health horoscope astrology',
    'horoscope by date of birth'
  ],
  openGraph: {
    title: 'Free Daily Horoscope Today — OM Astrology AMC',
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
