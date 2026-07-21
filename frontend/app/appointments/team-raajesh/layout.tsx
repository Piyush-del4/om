import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Raajesh S Panday — Expert Vedic Astrologer, Numerologist & Graphologist',
  description:
    'Book a personal consultation with Raajesh S Panday, founder of OM Astrology AMC with 25+ years of experience in Vedic Astrology, Chaldean Numerology, Graphology, Signature Science, and Five Elements Balance.',
  openGraph: {
    title: 'Consult Raajesh S Panday — OM Astrology AMC',
    description:
      'Book a session with Raajesh S Panday — master consultant in Vedic Astrology, Numerology, Graphology, and Career Guidance.',
    url: '/appointments/team-raajesh',
  },
};

export default function TeamRaajeshLayout({ children }: { children: React.ReactNode }) {
  return children;
}
