import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Rajessh Paanday — Expert Vedic Astrologer, Numerologist & Graphologist',
 description:
 'Book a personal consultation with Rajessh Paanday, founder of OM Astrology AMC with 25+ years of experience in Vedic Astrology, Chaldean Numerology, Graphology, Signature Science, and Five Elements Balance.',
 openGraph: {
 title: 'Consult Rajessh Paanday — OM Astrology AMC',
 description:
 'Book a session with Rajessh Paanday — master consultant in Vedic Astrology, Numerology, Graphology, and Career Guidance.',
 url: '/appointments/team-raajesh',
 },
};

export default function TeamRaajeshLayout({ children }: { children: React.ReactNode }) {
 return children;
}
