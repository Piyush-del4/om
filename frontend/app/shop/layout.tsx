import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OM Astrology Shop — Crystals, Gemstones & Planetary Remedies | OM Astrology AMC',
  description:
    'Shop authentic energized crystals, certified gemstones, yantras, and planetary remedy items from OM Astrology AMC. Fast delivery & secure checkout.',
  openGraph: {
    title: 'OM Astrology Shop — Crystals, Gemstones & Remedies',
    description:
      'Authentic energized crystals, natural gemstones, and personalized planetary remedy items.',
    url: 'https://www.omastrologyamc.com/shop',
  },
  alternates: {
    canonical: 'https://www.omastrologyamc.com/shop',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
