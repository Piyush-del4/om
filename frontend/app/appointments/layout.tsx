import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Consultation — Astrology, Numerology, Tarot & Graphology Sessions',
  description:
    'Book a 1-on-1 consultation with expert astrologers, numerologists, and tarot readers at OM Astrology AMC. Online video sessions available 7 days a week with instant slot confirmation.',
  openGraph: {
    title: 'Book a Consultation — OM Astrology AMC',
    description:
      'Book personalized consultation sessions in Astrology, Numerology, Tarot, and Graphology. Online video sessions available 7 days a week.',
    url: '/appointments',
  },
};

export default function AppointmentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
