import type { Metadata } from 'next';
import { ServiceSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
 title: 'Tarot Card Reading Online — Celtic Cross, Love & Career Guidance',
 description:
 'Get clear answers about relationships, career, and future through authentic Tarot card readings. One-card, three-card, and Celtic Cross spreads. Best tarot reader online at OM Astrology AMC.',
 keywords: [
 'tarot reading online', 'tarot consultation', 'best tarot reader', 'celtic cross tarot',
 'love tarot reading', 'career tarot reading', 'tarot card meanings', 'major arcana',
 'minor arcana', 'tarot guidance', 'tarot session online', 'relationship tarot',
 ],
 openGraph: {
 title: 'Tarot Card Reading Online — OM Astrology AMC',
 description:
 'Authentic Tarot card readings for love, career, and life guidance. Celtic Cross, relationship sync, and past-present-future spreads.',
 url: '/tarot-card',
 },
 alternates: {
 canonical: '/tarot-card',
 },
};

const tarotFAQs = [
 {
 question: 'What is Tarot card reading and how does it work?',
 answer: 'Tarot is a guided reflection tool that uses 78 cards (22 Major Arcana + 56 Minor Arcana) to mirror your subconscious patterns. When you pick cards, your inner feelings guide the selection, helping you see problems and opportunities more clearly.',
 },
 {
 question: 'Can Tarot predict the future?',
 answer: 'Tarot does not predict fixed outcomes. It shows current energies, hidden influences, and likely trajectories based on your present situation. It empowers you to make better decisions rather than giving passive predictions.',
 },
 {
 question: 'What types of Tarot spreads are available?',
 answer: 'We offer One-Card Pull (quick answers), Three-Card Spread (past-present-future), Celtic Cross (detailed 10-card reading), and specialized Love & Relationship readings.',
 },
 {
 question: 'How should I prepare for a Tarot reading session?',
 answer: 'Frame open-ended questions (e.g., "What energies should I focus on?" instead of "Will I get this job?"). Take deep breaths, clear your mind, and approach with curiosity rather than attachment to a specific answer.',
 },
 {
 question: 'Is my Tarot reading confidential?',
 answer: 'Absolutely. All readings are strictly confidential. We focus on empowering you to make your own choices with clarity on hidden barriers and emotional dynamics.',
 },
];

export default function TarotCardLayout({ children }: { children: React.ReactNode }) {
 return (
 <>
 <ServiceSchema
 name="Tarot Card Reading & Consultation"
 description="Authentic Tarot card readings for love, career, and life guidance. Celtic Cross, three-card, and relationship sync spreads available online."
 url="/tarot-card"
 category="Tarot"
 />
 <BreadcrumbSchema
 items={[
 { name: 'Home', url: '/' },
 { name: 'Tarot Card', url: '/tarot-card' },
 ]}
 />
 <FAQSchema faqs={tarotFAQs} />
 {children}
 </>
 );
}
