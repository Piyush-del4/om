import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Consultation — Online Video Sessions | OM Astrology AMC',
  description:
    'Book 1-on-1 consultations with expert astrologers, numerologists, and tarot readers. Online video sessions 7 days a week with instant slot booking.',
  openGraph: {
    title: 'Book a Consultation — OM Astrology AMC',
    description:
      'Book personalized consultation sessions in Astrology, Numerology, Tarot, and Graphology. Online video sessions available 7 days a week.',
    url: 'https://www.omastrologyamc.com/appointments',
  },
  alternates: {
    canonical: 'https://www.omastrologyamc.com/appointments',
  },
};

export default function AppointmentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
