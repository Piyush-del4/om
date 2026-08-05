import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'About Us — Meet the Expert Team at OM Astrology AMC',
 description:
 'Meet our master consultants Raajesh S Panday and Kusum Panday, specializing in Vedic Astrology, Numerology, Tarot Card Reading, and Graphology with decades of combined experience.',
 openGraph: {
 title: 'About Us — OM Astrology AMC',
 description:
 'Meet the expert team behind OM Astrology AMC — decades of experience in Astrology, Numerology, Tarot, and Graphology.',
 url: '/about-us',
 },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
 return children;
}
