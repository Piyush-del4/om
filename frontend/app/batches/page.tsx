import JoinBatchPage from '../my-batches/join/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Astrology & Occult Science Study Batches | OM Astrology AMC',
  description: 'Join live interactive occult science study batches, master Vedic astrology, Chaldean numerology, tarot card reading, and graphology with expert master consultants.',
  alternates: {
    canonical: 'https://www.omastrologyamc.com/batches',
  },
};

export default function BatchesPage() {
  return <JoinBatchPage />;
}
