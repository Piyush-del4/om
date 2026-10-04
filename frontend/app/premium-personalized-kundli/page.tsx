import { Metadata } from 'next';
import { Suspense } from 'react';
import PremiumKundliGeneratorPage from '@/components/ui/PremiumKundliGeneratorPage';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Premium Personalized Janam Kundli Report — 20+ Sections Detailed Analysis | OM Astrology AMC',
  description: 'Generate your 20+ section personalized Janam Kundli report — Lagna Chart, Vimshottari Dasha, dosha analysis, and customized remedies by Rajessh Paanday.',
  keywords: [
    'premium kundli report',
    'personalized janam kundli',
    'detailed kundli report',
    'personalized birth chart',
    'kundli report',
    'kundli astrologer mumbai',
    'kundli consultation india',
    'kundli consultation mumbai',
    'personalized kundli mumbai',
    'janam kundli consultation',
    'vedic kundli analysis'
  ],
  openGraph: {
    title: 'Premium Personalized Janam Kundli Report | OM Astrology AMC',
    description: 'Get your comprehensive 20+ section personalized Janam Kundli report created from your exact birth coordinates.',
    url: 'https://omastrologyamc.com/premium-personalized-kundli',
    siteName: 'OM Astrology AMC',
    images: [{ url: 'https://omastrologyamc.com/images/premium-kundli-book.jpg' }],
    type: 'website',
  },
  alternates: {
    canonical: 'https://omastrologyamc.com/premium-personalized-kundli',
  },
};

export default function PremiumPersonalizedKundliPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <PremiumKundliGeneratorPage />
    </Suspense>
  );
}
