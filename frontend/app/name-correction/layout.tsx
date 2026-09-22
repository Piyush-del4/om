import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Name Correction — Numerological Name Spelling Analysis | OM Astrology AMC',
  description:
    'Align your name vibrations with your birth blueprint to remove life blockages and invite prosperity. Professional name correction service at OM Astrology AMC.',
  openGraph: {
    title: 'Name Correction — OM Astrology AMC',
    description:
      'Numerological name correction to align your name vibrations with your birth numbers for prosperity and success.',
    url: 'https://www.omastrologyamc.com/name-correction',
  },
  alternates: {
    canonical: 'https://www.omastrologyamc.com/name-correction',
  },
};

export default function NameCorrectionLayout({ children }: { children: React.ReactNode }) {
 return children;
}
