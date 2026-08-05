import type { Metadata } from 'next';
import { ServiceSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
 title: 'Graphology & Handwriting Analysis — Personality Reading & Graphotherapy',
 description:
 'Understand your personality, hidden strengths, and habits through scientific handwriting and signature analysis. Improve your mindset with our 21-day Graphotherapy protocol at OM Astrology AMC.',
 keywords: [
 'graphology analysis', 'handwriting analysis', 'signature analysis', 'graphotherapy',
 'personality analysis handwriting', 'handwriting reading', 'signature science',
 'handwriting expert', 'graphology consultation', 'brain writing analysis',
 ],
 openGraph: {
 title: 'Graphology & Handwriting Analysis — OM Astrology AMC',
 description:
 'Scientific handwriting and signature analysis revealing personality traits. 21-day Graphotherapy protocol for habit transformation.',
 url: '/graphology',
 },
 alternates: {
 canonical: '/graphology',
 },
};

const graphologyFAQs = [
 {
 question: 'What is Graphology and how is it different from regular handwriting analysis?',
 answer: 'Graphology is the scientific study of handwriting to understand personality, emotions, and behavior patterns. It analyzes slant, pressure, letter formations, spacing, and margins to reveal subconscious traits that standard handwriting analysis may not cover.',
 },
 {
 question: 'Can changing my handwriting really change my personality?',
 answer: 'Yes. Graphotherapy works because handwriting is brain-writing — your hand movements are controlled by your brain. By consciously practicing specific stroke corrections for 21 days, you send new neural signals back to your brain, gradually reprogramming habits and thought patterns.',
 },
 {
 question: 'What does my signature reveal about me?',
 answer: 'Your signature represents your public persona. A bottom underline indicates self-reliance, a strike-through suggests self-criticism, and the size ratio compared to your normal writing shows your desire for recognition vs. privacy.',
 },
 {
 question: 'How long does a Graphology consultation take?',
 answer: 'A standard session takes 30-45 minutes. You submit a 1-page unruled handwriting sample and your signature, which our expert analyzes for slant, margins, pressure, connections, and stroke characteristics.',
 },
 {
 question: 'What is the 21-day Graphotherapy protocol?',
 answer: 'It is a structured program: Days 1-5 (isolate specific strokes), Days 6-12 (integrate into words), Days 13-18 (flow state writing), Days 19-21 (consolidation). This reprograms subconscious habit loops through somatic motor cortex training.',
 },
];

export default function GraphologyLayout({ children }: { children: React.ReactNode }) {
 return (
 <>
 <ServiceSchema
 name="Graphology & Handwriting Analysis"
 description="Scientific handwriting and signature analysis to reveal personality traits, hidden habits, and subconscious patterns. 21-day Graphotherapy protocol for personal transformation."
 url="/graphology"
 category="Graphology"
 />
 <BreadcrumbSchema
 items={[
 { name: 'Home', url: '/' },
 { name: 'Graphology', url: '/graphology' },
 ]}
 />
 <FAQSchema faqs={graphologyFAQs} />
 {children}
 </>
 );
}
