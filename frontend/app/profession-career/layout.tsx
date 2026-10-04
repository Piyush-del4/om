import type { Metadata } from 'next';
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Career Astrology & Business Astrology Consultation — Job & Career Prediction | OM Astrology AMC',
  description:
    'Consult career astrologer Rajessh Paanday. Detailed job and business astrology predictions, government job timings, and 10th house Kundli analysis.',
  keywords: [
    'career astrology',
    'career astrologer',
    'career astrologer online',
    'career prediction astrology',
    'career prediction',
    'career guidance astrology',
    'career consultation astrology',
    'career horoscope',
    'career horoscope prediction',
    'career Kundli analysis',
    'career prediction by date of birth',
    'career prediction by birth chart',
    'job prediction astrology',
    'job astrology',
    'job astrologer',
    'job prediction by date of birth',
    'government job astrology',
    'government job prediction',
    'business astrology',
    'business astrologer',
    'business prediction astrology',
    'business astrology consultation',
    'business Kundli analysis',
    'business success astrology',
    'education astrology',
    'competitive exam astrology',
    'career astrologer India',
    'career astrology India',
    'career astrologer Mumbai',
    'business astrologer Mumbai',
    'career consultation Mumbai'
  ],
  openGraph: {
    title: 'Career Astrology & Business Astrology Consultation — OM Astrology AMC',
    description: 'Expert Vedic astrology career guidance, job prediction, and business consultation.',
    url: '/profession-career',
  },
  alternates: {
    canonical: '/profession-career',
  },
};

export default function ProfessionCareerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Career & Business Astrology Consultation"
        description="Expert Vedic astrology career guidance, job prediction by date of birth, 10th house Kundli analysis, and business growth consultation."
        url="/profession-career"
        category="Astrology"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Profession & Career', url: '/profession-career' },
        ]}
      />
      {children}
    </>
  );
}
