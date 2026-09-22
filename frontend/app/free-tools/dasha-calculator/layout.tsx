import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Dasha & Mahadasha Calculator Online — Check Current Dasha, Antardasha & Mahadasha | OM Astrology AMC',
  description:
    'Calculate your current Dasha, Mahadasha, Antardasha and Pratyantardasha timeline free online. Discover what Dasha you are in and check planetary periods based on birth date and Nakshatra.',
  keywords: [
    'dasha calculator',
    'dasha and mahadasha calculator',
    'astrology dasha calculator',
    'dasa calculator',
    'mahadasha calculator',
    'current dasha calculator',
    'dasha mahadasha calculator',
    'mahadasha and antardasha calculator',
    'dasha antardasha calculator',
    'check my current dasha',
    'check my dasha',
    'what dasha am i in',
    'calculate current mahadasha',
    'vimshottari dasha calculator'
  ],
  openGraph: {
    title: 'Free Dasha & Mahadasha Calculator Online — OM Astrology AMC',
    description: 'Calculate your current Dasha, Mahadasha, and Antardasha planetary timeline online for free.',
    url: '/free-tools/dasha-calculator',
  },
  alternates: { canonical: '/free-tools/dasha-calculator' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Dasha Calculator', url: '/free-tools/dasha-calculator' },
        ]}
      />
      {children}
    </>
  );
}
