import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Career & Profession Guidance — Astrological Career Counseling',
 description:
 'Find the ideal career direction aligned with your birth chart 10th house and Amatyakaraka. Expert astrological career counseling for professional success and happiness at OM Astrology AMC.',
 openGraph: {
 title: 'Career & Profession Guidance — OM Astrology AMC',
 description:
 'Astrological career counseling aligned with your 10th house and planetary positions for professional success.',
 url: '/profession-career',
 },
};

export default function ProfessionCareerLayout({ children }: { children: React.ReactNode }) {
 return children;
}
