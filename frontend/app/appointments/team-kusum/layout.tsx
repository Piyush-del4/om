import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kusum Panday — Tarot Card Reader, Relationship Coach & Wellness Expert',
  description:
    'Book a personal consultation with Kusum Panday: Tarot Card Reader, Relationship Coach & wellness expert with 7+ years in emotional healing guidance.',
  openGraph: {
    title: 'Consult Kusum Panday — OM Astrology AMC',
    description:
      'Book a session with Kusum Panday — specialist in Tarot Card readings, Relationship Coaching, Yoga, and Emotional Healing.',
    url: 'https://www.omastrologyamc.com/appointments/team-kusum',
  },
  alternates: {
    canonical: 'https://www.omastrologyamc.com/appointments/team-kusum',
  },
};

export default function TeamKusumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
