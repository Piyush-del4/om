import type { Metadata } from 'next';
import { ServiceSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Marriage Astrology & Kundli Matching Consultation — Marriage Compatibility & Timing | OM Astrology AMC',
  description:
    'Consult expert astrologer Rajessh Paanday for Kundli marriage matching, 36 Guna Milan, marriage timing predictions, and Manglik dosha remedies.',
  keywords: [
    'marriage astrology',
    'marriage prediction',
    'marriage prediction astrology',
    'marriage astrologer',
    'marriage astrologer online',
    'marriage astrology consultation',
    'marriage Kundli',
    'marriage Kundli matching',
    'Kundli matching for marriage',
    'marriage compatibility',
    'marriage compatibility astrology',
    'marriage timing astrology',
    'marriage timing prediction',
    'when will I get married astrology',
    'marriage prediction by date of birth',
    'marriage prediction by birth chart',
    'love marriage astrology',
    'love marriage prediction',
    'arranged marriage astrology',
    'delayed marriage astrology',
    'relationship astrology',
    'love astrology',
    'marriage advice astrology',
    'marriage compatibility online',
    'marriage astrologer India',
    'marriage astrologer Mumbai',
    'marriage Kundli Mumbai',
    'marriage consultation Mumbai'
  ],
  openGraph: {
    title: 'Marriage Astrology & Kundli Matching Consultation — OM Astrology AMC',
    description: 'Expert Kundli matching for marriage, 36 Guna analysis, and marriage timing predictions.',
    url: '/marriage-matching',
  },
  alternates: {
    canonical: '/marriage-matching',
  },
};

export default function MarriageMatchingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Marriage Astrology & Kundli Matching Consultation"
        description="Expert Vedic astrology marriage matching, 36 Guna Milan, Manglik dosha balancing, and marriage timing prediction."
        url="/marriage-matching"
        category="Astrology"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Marriage Matching', url: '/marriage-matching' },
        ]}
      />
      {children}
    </>
  );
}
