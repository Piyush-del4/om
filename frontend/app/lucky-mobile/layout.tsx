import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lucky Mobile Number Selection — Numerology for Mobile Numbers',
  description:
    'Align your mobile number vibration with your driver and conductor numbers to attract wealth, success, and positive energy using numerological science at OM Astrology AMC.',
  openGraph: {
    title: 'Lucky Mobile Number Selection — OM Astrology AMC',
    description:
      'Select a lucky mobile number using numerology to attract wealth and positive energy.',
    url: '/lucky-mobile',
  },
};

export default function LuckyMobileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
