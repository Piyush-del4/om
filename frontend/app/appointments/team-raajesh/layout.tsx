import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rajessh Paanday — Expert Vedic Astrologer, Numerologist & Graphologist',
  description:
    'Book a personal consultation with Rajessh Paanday, master consultant in Vedic Astrology, Chaldean Numerology, Graphology, and signature science.',
  openGraph: {
    title: 'Consult Rajessh Paanday — OM Astrology AMC',
    description:
      'Book a session with Rajessh Paanday — master consultant in Vedic Astrology, Numerology, Graphology, and Career Guidance.',
    url: 'https://www.omastrologyamc.com/appointments/team-raajesh',
  },
  alternates: {
    canonical: 'https://www.omastrologyamc.com/appointments/team-raajesh',
  },
};

export default function TeamRaajeshLayout({ children }: { children: React.ReactNode }) {
  return children;
}
