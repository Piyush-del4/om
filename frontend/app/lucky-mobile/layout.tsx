import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lucky Mobile Number Selection — Numerology for Mobile Numbers | OM Astrology AMC',
  description:
    'Align your mobile number with your driver and conductor numbers to attract wealth, success, and positive vibrations through numerological consultation.',
  openGraph: {
    title: 'Lucky Mobile Number Selection — OM Astrology AMC',
    description:
      'Select a lucky mobile number using numerology to attract wealth and positive energy.',
    url: 'https://www.omastrologyamc.com/lucky-mobile',
  },
  alternates: {
    canonical: 'https://www.omastrologyamc.com/lucky-mobile',
  },
};

export default function LuckyMobileLayout({ children }: { children: React.ReactNode }) {
 return children;
}
