import type { Metadata } from 'next';
import { ServiceSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Numerology Analysis — Name Correction, Life Path & Lucky Numbers',
  description:
    'Discover your life path number, check if your name spelling is lucky, and get professional Pythagorean & Chaldean numerology readings for career, love, and success at OM Astrology AMC.',
  keywords: [
    'numerology consultation', 'best numerologist', 'name correction numerology', 'lucky name numerology',
    'life path number', 'pythagorean numerology', 'chaldean numerology', 'numerology analysis',
    'destiny number', 'soul urge number', 'personality number', 'numerology reading online',
    'name number calculation', 'lucky number',
  ],
  openGraph: {
    title: 'Numerology Analysis — OM Astrology AMC',
    description:
      'Professional numerology readings: life path number, name correction, lucky numbers, and Pythagorean & Chaldean system analysis.',
    url: '/numerology',
  },
  alternates: {
    canonical: '/numerology',
  },
};

const numerologyFAQs = [
  {
    question: 'What is the difference between Pythagorean and Chaldean Numerology?',
    answer: 'Pythagorean Numerology assigns numbers 1-9 to letters alphabetically (A=1, B=2...). Chaldean Numerology assigns numbers based on letter sound vibration and treats 9 as sacred. Chaldean is considered more accurate for name readings.',
  },
  {
    question: 'How can name correction improve my life?',
    answer: 'When your name number aligns with your birth number, life flows more easily. A simple spelling adjustment can remove blockages and attract success, better health, and improved relationships.',
  },
  {
    question: 'What is a Life Path Number and how is it calculated?',
    answer: 'Your Life Path Number is calculated from your full date of birth by adding all digits until you get a single digit (or master number 11, 22, 33). It reveals your life purpose and natural abilities.',
  },
  {
    question: 'Can numerology help with business decisions?',
    answer: 'Yes. Corporate numerology analyzes your business name, logo, and launch date to ensure they are numerologically aligned for success. Many businesses use this to optimize growth.',
  },
  {
    question: 'What are Master Numbers in numerology?',
    answer: 'Master Numbers (11, 22, 33) carry higher spiritual vibration. 11 is the Visionary, 22 is the Master Builder, and 33 is the Master Teacher. People with these numbers often have exceptional potential.',
  },
];

export default function NumerologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Numerology Analysis & Name Correction"
        description="Professional Pythagorean & Chaldean numerology readings: life path number, destiny number, name correction, and lucky number analysis."
        url="/numerology"
        category="Numerology"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Numerology', url: '/numerology' },
        ]}
      />
      <FAQSchema faqs={numerologyFAQs} />
      {children}
    </>
  );
}
