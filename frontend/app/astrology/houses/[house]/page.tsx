import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Compass, ArrowLeft, CheckCircle2, Sparkles, Sun, Shield } from 'lucide-react';
import { GoldCard } from '../../../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../../../components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '../../../../components/ui/CategoryBatchesList';
import { FAQSection } from '../../../../components/ui/FAQSection';
import { SEOInternalMesh } from '../../../../components/seo/SEOInternalMesh';

interface HouseData {
  house: string;
  sanskritName: string;
  title: string;
  subtitle: string;
  significator: string;
  element: string;
  bodyParts: string;
  keyThemes: string[];
  description: string;
  sections: { title: string; desc: string; details: string[] }[];
  faqs: { q: string; a: string }[];
}

const HOUSE_DATA: Record<string, HouseData> = {
  '1': {
    house: '1st House',
    sanskritName: 'Lagna Bhava (Tanu)',
    title: '1st House — The House of Self & Identity',
    subtitle: 'Physical body, temperament, vitality, appearance, and overall life destiny.',
    significator: 'Sun ☀️',
    element: 'Fire 🔥 (Dharma)',
    bodyParts: 'Head, Brain, Face',
    keyThemes: ['Self-Identity', 'Physical Health', 'Vitality', 'Personality', 'Lagna Lord'],
    description: 'The 1st House (Lagna) is the most critical house in Vedic Astrology. It defines your core personality, physical vitality, temperament, and how you approach life opportunities.',
    sections: [
      {
        title: '1. What the 1st House Governs',
        desc: 'Core pillar of the Janam Kundli.',
        details: [
          'Physical appearance, health constitution, and longevity.',
          'Overall confidence, self-esteem, and willpower.',
          'The Lagna Lord planet indicates your primary life focus and path.'
        ]
      }
    ],
    faqs: [
      { q: 'Why is the 1st House so important?', a: 'Because without a strong 1st House (Lagna), a person cannot fully enjoy or utilize the blessings of other houses like wealth or career.' }
    ]
  },
  '2': {
    house: '2nd House',
    sanskritName: 'Dhana Bhava (Kutumba)',
    title: '2nd House — The House of Wealth & Speech',
    subtitle: 'Accumulated assets, family lineage, speech, values, and eating habits.',
    significator: 'Jupiter 🪐',
    element: 'Earth 🌍 (Artha)',
    bodyParts: 'Throat, Right Eye, Teeth, Tongue',
    keyThemes: ['Liquid Wealth', 'Family Lineage', 'Speech & Voice', 'Bank Savings'],
    description: 'The 2nd House governs accumulated liquid wealth, family history, speech tone, and values. It shows your financial security and capacity to save.',
    sections: [
      {
        title: '1. Wealth Accumulation & Speech Tone',
        desc: 'How 2nd house planets influence bank balance and verbal expression.',
        details: [
          'Benefics like Jupiter or Venus bring smooth family inheritance and pleasant speech.',
          'Malefics like Rahu or Saturn require disciplined financial planning and speech moderation.'
        ]
      }
    ],
    faqs: [
      { q: 'How does 2nd House differ from 11th House?', a: 'The 2nd house represents saved, accumulated wealth and family inheritance, while the 11th house represents incoming gains, income streams, and profits.' }
    ]
  },
  '3': {
    house: '3rd House',
    sanskritName: 'Sahaja Bhava (Parakrama)',
    title: '3rd House — The House of Courage & Siblings',
    subtitle: 'Courage, self-effort, younger siblings, communication, and short journeys.',
    significator: 'Mars ♂️',
    element: 'Air 🌬️ (Kama)',
    bodyParts: 'Shoulders, Arms, Hands, Lungs',
    keyThemes: ['Courage', 'Self-Effort', 'Younger Siblings', 'Writing & Media'],
    description: 'The 3rd House is the house of self-made initiative. It reveals your willingness to take risks, relationship with younger brothers/sisters, and writing or media talents.',
    sections: [
      {
        title: '1. Courage & Communication Mastery',
        desc: 'Turning effort into long-term achievement.',
        details: [
          'Mars or Sun in 3rd House gives fearless determination and leadership drive.',
          'Mercury in 3rd House bestows exceptional writing, marketing, and digital skills.'
        ]
      }
    ],
    faqs: [
      { q: 'Is 3rd House an Upachaya house?', a: 'Yes! 3rd house is an Upachaya (growing) house, meaning results improve steadily over time with experience.' }
    ]
  },
  '4': {
    house: '4th House',
    sanskritName: 'Sukha Bhava (Matru)',
    title: '4th House — The House of Home & Mother',
    subtitle: 'Domestic happiness, motherly bond, real estate, vehicles, and peace of mind.',
    significator: 'Moon 🌙',
    element: 'Water 💧 (Moksha)',
    bodyParts: 'Chest, Heart, Lungs',
    keyThemes: ['Mother', 'Real Estate', 'Vehicles', 'Inner Peace', 'Comforts'],
    description: 'The 4th House rules emotional contentment, home life, property acquisition, and your relationship with your mother.',
    sections: [
      {
        title: '1. Property, Land & Emotional Stability',
        desc: 'Building a secure, peaceful sanctuary.',
        details: [
          'Strong 4th House brings property ownership, comfortable vehicles, and deep peace of mind.',
          'Moon or Venus in 4th House creates a beautiful, harmonious living space.'
        ]
      }
    ],
    faqs: [
      { q: 'Which planet is happiest in 4th House?', a: 'The Moon achieves Directional Strength (Dig Bala) in the 4th House, giving deep emotional happiness.' }
    ]
  },
  '5': {
    house: '5th House',
    sanskritName: 'Putra Bhava (Purva Punya)',
    title: '5th House — The House of Children & Intelligence',
    subtitle: 'Past life good karma, children, higher wisdom, romance, and creative expression.',
    significator: 'Jupiter 🪐',
    element: 'Fire 🔥 (Dharma)',
    bodyParts: 'Stomach, Upper Abdomen, Heart',
    keyThemes: ['Children', 'Purva Punya', 'Speculation & Investments', 'Romance'],
    description: 'The 5th House is a holy Trikona house representing past life merit (Purva Punya), intelligence, children, creative arts, and speculative investments.',
    sections: [
      {
        title: '1. Past Life Merit & Speculative Success',
        desc: 'Unlocking natural talents and wisdom.',
        details: [
          'Governs sharp intelligence, mantra sadhana, and strategic decision-making.',
          'Favorable 5th house brings creative success and romantic fulfillment.'
        ]
      }
    ],
    faqs: [
      { q: 'What is Purva Punya?', a: 'Purva Punya refers to the accumulated positive karma from previous births that manifests as natural talents and good fortune in this life.' }
    ]
  },
  '6': {
    house: '6th House',
    sanskritName: 'Shatru Bhava (Roga)',
    title: '6th House — The House of Enemies, Health & Service',
    subtitle: 'Daily job routine, overcoming obstacles, health management, debts, and competitive exams.',
    significator: 'Mars ♂️ / Saturn 🪐',
    element: 'Earth 🌍 (Artha)',
    bodyParts: 'Intestines, Lower Abdomen',
    keyThemes: ['Competitive Spirit', 'Healing & Medicine', 'Debt Management', 'Daily Work'],
    description: 'The 6th House governs competitive victory, daily work discipline, health management, legal matters, and service to others.',
    sections: [
      {
        title: '1. Overcoming Obstacles & Winning Competitions',
        desc: 'Turning challenges into professional victories.',
        details: [
          'Malefics like Sun, Mars, or Saturn in 6th house crush enemies and grant victory in competitive exams.',
          'Governs daily work ethics and medical/healthcare professions.'
        ]
      }
    ],
    faqs: [
      { q: 'Are malefics good in 6th House?', a: 'Yes! Malefic planets in the 6th House give immense fighting spirit to overcome debts, disease, and rivals.' }
    ]
  },
  '7': {
    house: '7th House',
    sanskritName: 'Kalatra Bhava (Yuvati)',
    title: '7th House — The House of Marriage & Business Partnerships',
    subtitle: 'Spouse, marriage, business partnerships, public interactions, and trade.',
    significator: 'Venus ♀️',
    element: 'Air 🌬️ (Kama)',
    bodyParts: 'Kidneys, Lower Back, Reproductive System',
    keyThemes: ['Marriage', 'Spouse Characteristics', 'Business Co-Founders', 'Public Reputation'],
    description: 'The 7th House (Kendra) rules marriage, life partner, co-founding business relationships, and public dealings.',
    sections: [
      {
        title: '1. Marital Harmony & Strategic Partnerships',
        desc: 'Forming strong, mutually beneficial alliances.',
        details: [
          'Determines the nature, character, and background of your marriage partner.',
          'Governs commercial contracts and public presentation.'
        ]
      }
    ],
    faqs: [
      { q: 'Which planet gets Dig Bala in 7th House?', a: 'Saturn gets Directional Strength (Dig Bala) in the 7th House, giving long-term commitment and maturity in partnerships.' }
    ]
  },
  '8': {
    house: '8th House',
    sanskritName: 'Randhra Bhava (Ayur)',
    title: '8th House — The House of Transformation & Mystery',
    subtitle: 'Longevity, sudden wealth, unearned assets, research, occult sciences, and rebirth.',
    significator: 'Saturn 🪐',
    element: 'Water 💧 (Moksha)',
    bodyParts: 'Excretory & Reproductive Organs',
    keyThemes: ['Occult Sciences', 'Sudden Wealth', 'Transformation', 'Longevity'],
    description: 'The 8th House is the realm of transformation, deep research, astrology/occult sciences, joint finances, and sudden unexpected changes.',
    sections: [
      {
        title: '1. Occult Knowledge & Deep Transformation',
        desc: 'Unlocking secret wisdom and financial windfalls.',
        details: [
          'Key house for professional astrologers, researchers, and mystics.',
          'Governs inheritance, insurance payouts, and sudden gains.'
        ]
      }
    ],
    faqs: [
      { q: 'Is 8th House always scary?', a: 'No! While it brings transformation, a strong 8th house gives profound intuition, research mastery, and unexpected wealth.' }
    ]
  },
  '9': {
    house: '9th House',
    sanskritName: 'Bhagya Bhava (Dharma)',
    title: '9th House — The House of Luck, Dharma & Higher Wisdom',
    subtitle: 'Father, spiritual mentor, destiny (Bhagya), long-distance travel, and philosophy.',
    significator: 'Jupiter 🪐',
    element: 'Fire 🔥 (Dharma)',
    bodyParts: 'Thighs, Hips',
    keyThemes: ['Divine Fortune (Bhagya)', 'Spiritual Guru', 'Higher Education', 'Pilgrimage'],
    description: 'The 9th House is the most fortunate Trikona house. It governs divine grace, father, higher knowledge, and alignment with righteous path (Dharma).',
    sections: [
      {
        title: '1. Divine Grace & Higher Mentorship',
        desc: 'How luck and higher learning shape your trajectory.',
        details: [
          'Strong 9th House opens doors easily through natural fortune (Bhagya).',
          'Governs international travel for higher learning and pilgrimage.'
        ]
      }
    ],
    faqs: [
      { q: 'Why is 9th House called Bhagya Stana?', a: 'Because it stores the accumulated cosmic luck and divine grace earned through good deeds.' }
    ]
  },
  '10': {
    house: '10th House',
    sanskritName: 'Karma Bhava (Rajya)',
    title: '10th House — The House of Career & Public Status',
    subtitle: 'Profession, government honor, leadership role, prestige, and career achievements.',
    significator: 'Sun / Mercury / Jupiter / Saturn',
    element: 'Earth 🌍 (Artha)',
    bodyParts: 'Knees, Joints',
    keyThemes: ['Career Success', 'Public Prestige', 'Government Connections', 'Executive Authority'],
    description: 'The 10th House is the highest Kendra house (Midheaven). It defines your career standing, executive achievements, and societal contribution.',
    sections: [
      {
        title: '1. Professional Excellence & Public Recognition',
        desc: 'Building an impactful, lasting legacy.',
        details: [
          'Sun or Mars in 10th House gives Dig Bala, propelling high executive or political status.',
          'Governs your public reputation and authority in your industry.'
        ]
      }
    ],
    faqs: [
      { q: 'Which planets achieve Dig Bala in 10th House?', a: 'Sun and Mars achieve Directional Strength (Dig Bala) in the 10th House, giving supreme executive power.' }
    ]
  },
  '11': {
    house: '11th House',
    sanskritName: 'Labha Bhava (Aaya)',
    title: '11th House — The House of Financial Gains & Network',
    subtitle: 'Monetary income, fulfillment of desires, influential network, and elder siblings.',
    significator: 'Jupiter 🪐',
    element: 'Air 🌬️ (Kama)',
    bodyParts: 'Shins, Calves, Ankles',
    keyThemes: ['Liquid Gains (Labha)', 'Fulfillment of Wishes', 'High Net-Worth Network', 'Elder Siblings'],
    description: 'The 11th House (Labha Stana) is the house of monetary gains, recurring revenue, expansion of social networks, and realization of goals.',
    sections: [
      {
        title: '1. Financial Abundance & Powerful Networks',
        desc: 'Turning goals into profitable cash flows.',
        details: [
          'All planets (both benefics and malefics) produce good financial results in 11th House.',
          'Governs connections with influential friends and high-level social groups.'
        ]
      }
    ],
    faqs: [
      { q: 'Why do all planets do well in 11th House?', a: 'Because the 11th House is the ultimate house of gains (Labha), so any planetary energy gets converted into tangible rewards.' }
    ]
  },
  '12': {
    house: '12th House',
    sanskritName: 'Vyaya Bhava (Moksha)',
    title: '12th House — The House of Foreign Lands & Spiritual Liberation',
    subtitle: 'Foreign settlement, spiritual liberation (Moksha), subconscious dreams, and expenses.',
    significator: 'Saturn / Ketu',
    element: 'Water 💧 (Moksha)',
    bodyParts: 'Feet, Eyes, Sleep Cycles',
    keyThemes: ['Foreign Lands', 'Spiritual Liberation', 'Bed Pleasures & Sleep', 'Subconscious Mind'],
    description: 'The 12th House governs overseas relocation, spiritual retreats, meditation, subconscious dreams, and letting go of material attachments.',
    sections: [
      {
        title: '1. Overseas Relocation & Spiritual Mastery',
        desc: 'Unlocking foreign opportunities and deep peace.',
        details: [
          'Key house for foreign residency, MNC careers, and international trade.',
          'Governs deep sleep quality, meditation, and spiritual enlightenment.'
        ]
      }
    ],
    faqs: [
      { q: 'Is 12th House good for foreign settlement?', a: 'Yes! The 12th House is the primary indicator for living overseas, working for global clients, or foreign immigration.' }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(HOUSE_DATA).map((house) => ({ house }));
}

export async function generateMetadata({ params }: { params: Promise<{ house: string }> }): Promise<Metadata> {
  const { house } = await params;
  const data = HOUSE_DATA[house];
  if (!data) return { title: 'House Not Found' };
  return {
    title: `${data.title} | OM Astrology AMC`,
    description: data.subtitle,
  };
}

export default async function HousePage({ params }: { params: Promise<{ house: string }> }) {
  const { house } = await params;
  const data = HOUSE_DATA[house];

  if (!data) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Back Link */}
        <Link href="/astrology" className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Astrology Guide
        </Link>

        {/* Hero Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-gray-200/80 pb-10">
          <div className="md:col-span-8 space-y-4">
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Vedic Astrology House Guide
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              {data.title}
            </h1>
            <p className="text-gray-600 text-base font-light leading-relaxed">
              {data.subtitle}
            </p>
          </div>
          <div className="md:col-span-4 flex justify-center">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-2 border-[var(--gold-300)] text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">Sanskrit Name</span>
              <h4 className="font-serif text-xl font-bold text-[var(--gold-700)]">{data.sanskritName}</h4>
              <span className="text-xs text-gray-600 block pt-1">Karaka: {data.significator}</span>
            </div>
          </div>
        </div>

        {/* Key Themes & Correspondences */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <GoldCard className="h-full">
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--gold)]" /> House Overview
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  {data.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {data.keyThemes.map((theme) => (
                    <span key={theme} className="px-3 py-1 bg-amber-50 text-[var(--gold-700)] rounded-full text-xs font-semibold border border-amber-200">
                      🏛️ {theme}
                    </span>
                  ))}
                </div>
              </div>
            </GoldCard>
          </div>

          <div className="md:col-span-5">
            <GoldCard className="h-full">
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-[var(--gold)] border-b border-gray-200/60 pb-2">
                  Vedic Correspondences
                </h3>
                <div className="space-y-2 text-xs text-gray-700 font-light">
                  <p><strong>• House Karaka (Significator):</strong> {data.significator}</p>
                  <p><strong>• Element Goal:</strong> {data.element}</p>
                  <p><strong>• Body Parts Governed:</strong> {data.bodyParts}</p>
                </div>
              </div>
            </GoldCard>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
            In-Depth Analysis & Planetary Effects
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {data.sections.map((sec, idx) => (
              <GoldCard key={idx} className="transition-spring">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-lg text-[var(--gold)]">{sec.title}</h3>
                  <p className="text-sm text-gray-600 font-light italic">{sec.desc}</p>
                  <ul className="space-y-2 text-xs md:text-sm text-gray-700 font-light pt-2">
                    {sec.details.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[var(--gold)] font-bold">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GoldCard>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        {data.faqs && data.faqs.length > 0 && (
          <div className="pt-6">
            <FAQSection faqs={data.faqs} />
          </div>
        )}

        {/* SEO Internal Mesh */}
        <SEOInternalMesh currentCategory="astrology" />

        {/* Active Batches Showcase */}
        <div className="border-t border-gray-200/60 pt-12">
          <CategoryBatchesList category="Astrology" />
        </div>

        {/* Booking Consultation Widget */}
        <div className="border-t border-gray-200/60 pt-12 pb-6">
          <CategoryBookingWidget category="Astrology" />
        </div>
      </div>
    </div>
  );
}
