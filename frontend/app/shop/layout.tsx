import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OM Astrology Shop — Crystals, Gemstones & Planetary Remedies | OM Astrology AMC',
  description:
    'Shop authentic energized crystals, natural gemstones, yantras, and personalized planetary remedy items from OM Astrology AMC. Secure online checkout with fast delivery.',
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
