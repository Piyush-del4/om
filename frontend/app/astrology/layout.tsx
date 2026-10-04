import type { Metadata } from 'next';
import { ServiceSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Vedic Astrology Consultation Online — Best Astrologer in Mumbai & India | OM Astrology AMC',
  description:
    'Consult master Vedic astrologer Rajessh Paanday online. Expert Janam Kundli analysis, future predictions, Jyotish consultation, and dosha remedies.',
  keywords: [
    'astrology',
    'astrology online',
    'online astrology',
    'astrology consultation',
    'astrology consultation online',
    'astrologer',
    'astrologer online',
    'online astrologer',
    'best astrologer',
    'professional astrologer',
    'astrology services',
    'astrology reading',
    'astrology prediction',
    'life prediction astrology',
    'detailed astrology analysis',
    'vedic astrology',
    'vedic astrologer',
    'vedic astrology consultation',
    'indian astrology',
    'hindu astrology',
    'jyotish consultation',
    'jyotish astrologer',
    'astrology expert online',
    'astrology consultation india',
    'astrologer india',
    'online astrologer india',
    'astrologer mumbai',
    'online astrologer mumbai',
    'astrologer near me',
    'best astrologer near me'
  ],
 openGraph: {
 title: 'Vedic Astrology Consultation — OM Astrology AMC',
 description:
 'Expert Vedic Astrology readings including birth chart analysis, planetary transits, Kundali, and personalized life path guidance.',
 url: '/astrology',
 },
 alternates: {
 canonical: '/astrology',
 },
};

const astrologyFAQs = [
 {
 question: 'What is Vedic Astrology and how is it different from Western Astrology?',
 answer: 'Vedic Astrology (Jyotish) uses the Sidereal zodiac based on actual star positions, while Western Astrology uses the Tropical zodiac based on seasons. Vedic Astrology is more accurate for predicting life events and timing using the Vimshottari Dasha system.',
 },
 {
 question: 'What information do I need for a birth chart reading?',
 answer: 'You need your exact date of birth, time of birth, and place of birth. The more accurate the birth time, the more precise the reading will be.',
 },
 {
 question: 'How can astrology help with career decisions?',
 answer: 'By analyzing the 10th house (career), Amatyakaraka (career significator), and planetary dashas, we can identify the best career paths, timing for job changes, and periods favorable for business growth.',
 },
 {
 question: 'What are planetary remedies in Vedic Astrology?',
 answer: 'Vedic remedies include mantras, gemstones, charity (seva), and lifestyle adjustments that help balance planetary influences in your birth chart. They act as shock absorbers to neutralize difficult planetary periods.',
 },
 {
 question: 'How long does an astrology consultation session last?',
 answer: 'Sessions typically range from 30 to 60 minutes depending on the consultation package chosen. You can book a session online and join via video call from anywhere.',
 },
];

export default function AstrologyLayout({ children }: { children: React.ReactNode }) {
 return (
 <>
 <ServiceSchema
 name="Vedic Astrology Consultation"
 description="Expert Vedic Astrology readings: birth chart analysis, planetary transits, Kundali readings, Vimshottari Dasha timelines, and personalized life path guidance."
 url="/astrology"
 category="Astrology"
 />
 <BreadcrumbSchema
 items={[
 { name: 'Home', url: '/' },
 { name: 'Astrology', url: '/astrology' },
 ]}
 />
 <FAQSchema faqs={astrologyFAQs} />
 {children}
 </>
 );
}
