import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShieldAlert, ArrowLeft, CheckCircle2, Sparkles, Shield, HeartHandshake } from 'lucide-react';
import { GoldCard } from '../../../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../../../components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '../../../../components/ui/CategoryBatchesList';
import { FAQSection } from '../../../../components/ui/FAQSection';
import { SEOInternalMesh } from '../../../../components/seo/SEOInternalMesh';

interface DoshaData {
  slug: string;
  title: string;
  subtitle: string;
  planetaryCause: string;
  severity: string;
  description: string;
  effects: string[];
  authenticRemedies: string[];
  cancellationConditions: string[];
  faqs: { q: string; a: string }[];
}

const DOSHA_DATA: Record<string, DoshaData> = {
  'manglik-dosha': {
    slug: 'manglik-dosha',
    title: 'Manglik Dosha (Kuja Dosha) & Authentic Vedic Remedies',
    subtitle: 'Understanding Mars placements in 1st, 4th, 7th, 8th, or 12th house and marital harmony.',
    planetaryCause: 'Mars ♂️ in 1st, 4th, 7th, 8th, or 12th House',
    severity: 'High (Modifiable through proper remedies & Kundli matching)',
    description: 'Manglik Dosha occurs when Mars is placed in specific houses of self, domestic peace, spouse, longevity, or expenditure. Mars brings intense heat, energy, and passion that requires constructive expression.',
    effects: [
      'Disagreements or temperament clashes in marriage if un-remedied.',
      'Delays in marriage confirmation or decision making.',
      'High energy levels that require active career or athletic outlets.'
    ],
    authenticRemedies: [
      'Perform Mangal Shanti Puja or Hanuman Chalisa recitation every Tuesday.',
      'Kumbh Vivah or Vishnu Pratima Vivah ritual prior to marriage.',
      'Wear Coral (Moonga) gemstone only after astrologer consultation.',
      'Feed jaggery and gram to cows on Tuesdays.'
    ],
    cancellationConditions: [
      'If Mars is in its own sign (Aries, Scorpio) or exalted (Capricorn).',
      'If both partners are Manglik, the doshas neutralize each other.',
      'If Jupiter aspects Mars or the Lagna, Manglik effects are cancelled.'
    ],
    faqs: [
      { q: 'Can a Manglik marry a non-Manglik?', a: 'Yes! If proper cancellation conditions (Bhanga) exist in the chart or if Vedic remedies are performed, a Manglik can comfortably marry a non-Manglik.' }
    ]
  },
  'kaal-sarp-dosha': {
    slug: 'kaal-sarp-dosha',
    title: 'Kaal Sarp Dosha & 12 Types Complete Guide',
    subtitle: 'When all 7 planets are hemmed between shadow planets Rahu and Ketu.',
    planetaryCause: 'All 7 major planets trapped between Rahu & Ketu axis',
    severity: 'Transformational (Brings initial struggles followed by great success)',
    description: 'Kaal Sarp Dosha forms when all planets are situated between Rahu and Ketu in the chart. While it can cause early life struggles, historical leaders with Kaal Sarp Yoga achieved supreme long-term success.',
    effects: [
      'Initial delays in career stability or personal milestones.',
      'Vivid dreams of snakes or sudden ups and downs in fortune.',
      'Strong drive to achieve big goals after age 33.'
    ],
    authenticRemedies: [
      'Perform Kaal Sarp Shanti Puja at Trimbakeshwar or Ujjain.',
      'Chant Maha Mrityunjaya Mantra 108 times daily.',
      'Offer milk and jal to Shiva Lingam on Mondays and Shivratri.',
      'Donate black sesame seeds and blanket on Saturdays.'
    ],
    cancellationConditions: [
      'If even one planet (like Moon or Lagna lord) breaks outside Rahu-Ketu axis.',
      'If Rahu/Ketu are placed in favorable houses (3rd, 6th, 11th).'
    ],
    faqs: [
      { q: 'Is Kaal Sarp Dosha always bad?', a: 'No! It creates intense focus. Famous leaders, sportspersons, and CEOs with Kaal Sarp Yoga rose to immense height after overcoming early tests.' }
    ]
  },
  'sade-sati': {
    slug: 'sade-sati',
    title: 'Saturn Sade Sati 2026 Phase Guide & Remedies',
    subtitle: 'Saturn’s 7.5 year transit across the 12th, 1st, and 2nd houses from Moon.',
    planetaryCause: 'Saturn transiting 12th, 1st, and 2nd houses from natal Moon',
    severity: 'Constructive Discipline (Saturn acts as a cosmic teacher)',
    description: 'Sade Sati is Saturn’s 7.5-year transit cycle. Far from being a curse, Saturn uses Sade Sati to strip away illusions, discipline habits, and build true self-reliance and maturity.',
    effects: [
      'Heavy workload and tests of patience.',
      'Restructuring of career, relationships, and financial habits.',
      'Emerging from the 7.5 years with unbreakable wisdom and resilience.'
    ],
    authenticRemedies: [
      'Recite Hanuman Chalisa or Shani Stotram every Saturday evening.',
      'Light a mustard oil lamp (Diya) under a Peepal tree on Saturdays.',
      'Donate black umbrella, shoes, or iron items to the needy.',
      'Practice complete honesty and fair treatment to workers.'
    ],
    cancellationConditions: [
      'If Saturn is your Lagna lord (Capricorn / Aquarius Lagna).',
      'If Saturn is exalted or well-placed in transit/natal chart.'
    ],
    faqs: [
      { q: 'Which phase of Sade Sati is most intense?', a: 'The 2nd phase (when Saturn transits directly over your natal Moon) is usually the peak of emotional and practical testing.' }
    ]
  },
  'pitra-dosha': {
    slug: 'pitra-dosha',
    title: 'Pitra Dosha Causes & Ancestral Peace Remedies',
    subtitle: 'Affliction to Sun/9th House indicating unfulfilled ancestral duties.',
    planetaryCause: 'Sun or 9th House afflicted by Rahu, Ketu, or Saturn',
    severity: 'Moderate (Resolved easily through Pind Daan and Shraddha)',
    description: 'Pitra Dosha indicates karmic debts related to ancestors. It is resolved by performing acts of charity, honoring parents, and conducting ancestral rituals.',
    effects: [
      'Obstacles in family growth or unexpected house maintenance expenses.',
      'Desire for family harmony requiring ancestral blessings.'
    ],
    authenticRemedies: [
      'Perform Pitra Paksha Shraddha and Tarpan rituals.',
      'Feed crows, cows, and street dogs on Amavasya (New Moon).',
      'Plant a Peepal or Banyan tree and care for it.',
      'Respect parents and elders in daily life.'
    ],
    cancellationConditions: [
      'If Jupiter strongly aspects the 9th house or the Sun.',
      'If regular ancestral tarpana and charity are practiced.'
    ],
    faqs: [
      { q: 'How do I know if I have Pitra Dosha?', a: 'An astrologer checks if the Sun (karaka of father) or 9th house is closely conjunct Rahu or Ketu.' }
    ]
  },
  'rahu-ketu-dosha': {
    slug: 'rahu-ketu-dosha',
    title: 'Rahu Ketu Dosha & Shadow Planet Remedies 2026',
    subtitle: 'Navigating illusion, sudden shifts, spiritual awakening, and karmic knots.',
    planetaryCause: 'Rahu or Ketu in critical houses (1st, 5th, 7th, 8th, 9th)',
    severity: 'Karmic & Spiritual Expansion',
    description: 'Rahu represents worldly desire and innovation, while Ketu represents detachment and spiritual wisdom. Their placement highlights key karmic lessons in this lifetime.',
    effects: [
      'Sudden interest in foreign travel, tech, or astrology.',
      'Fluctuations between intense worldly ambition and spiritual detachment.'
    ],
    authenticRemedies: [
      'Chant Rahu Mantra "Om Raam Rahve Namah" or Ketu Mantra.',
      'Donate blankets or lead items on Saturdays.',
      'Practice daily grounding exercises and meditation.'
    ],
    cancellationConditions: [
      'If Rahu is in Gemini/Taurus or Ketu is in Sagittarius/Scorpio.',
      'If positioned in 3rd, 6th, or 11th Upachaya houses.'
    ],
    faqs: [
      { q: 'Is Rahu always negative?', a: 'Not at all! Rahu is the planet of modern technology, foreign success, sudden fame, and innovative breakthroughs.' }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(DOSHA_DATA).map((dosha) => ({ dosha }));
}

export async function generateMetadata({ params }: { params: Promise<{ dosha: string }> }): Promise<Metadata> {
  const { dosha } = await params;
  const data = DOSHA_DATA[dosha];
  if (!data) return { title: 'Dosha Not Found' };
  return {
    title: `${data.title} | OM Astrology AMC`,
    description: data.subtitle,
  };
}

export default async function DoshaPage({ params }: { params: Promise<{ dosha: string }> }) {
  const { dosha } = await params;
  const data = DOSHA_DATA[dosha];

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
            <span className="text-rose-600 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-500" /> Vedic Astrological Analysis
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              {data.title}
            </h1>
            <p className="text-gray-600 text-base font-light leading-relaxed">
              {data.subtitle}
            </p>
          </div>
          <div className="md:col-span-4 flex justify-center">
            <div className="p-6 rounded-2xl bg-rose-50 border-2 border-rose-200 text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-rose-600 font-mono font-bold">Planetary Cause</span>
              <p className="text-sm font-semibold text-rose-950">{data.planetaryCause}</p>
              <span className="text-[10px] text-gray-500 block pt-1">{data.severity}</span>
            </div>
          </div>
        </div>

        {/* Overview & Key Effects */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <GoldCard className="h-full">
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--gold)]" /> Understanding the Dosha
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  {data.description}
                </p>
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase text-gray-700 tracking-wider">Key Manifestation Effects:</h4>
                  {data.effects.map((eff, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700 font-light">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{eff}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GoldCard>
          </div>

          <div className="md:col-span-5">
            <GoldCard className="h-full bg-amber-50/40 border-amber-300">
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-amber-900 border-b border-amber-200 pb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-600" /> Cancellation Factors (Bhanga)
                </h3>
                <div className="space-y-2 text-xs text-amber-950 font-light">
                  {data.cancellationConditions.map((cond, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GoldCard>
          </div>
        </div>

        {/* Authentic Remedies Section */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3 flex items-center gap-2">
            <HeartHandshake className="w-7 h-7 text-[var(--gold)]" /> Authentic Vedic Remedies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.authenticRemedies.map((rem, idx) => (
              <GoldCard key={idx} className="transition-spring">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--gold-100)] text-[var(--gold-800)] flex items-center justify-center font-bold shrink-0 text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-xs md:text-sm text-gray-800 font-light leading-relaxed pt-1">
                    {rem}
                  </p>
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
