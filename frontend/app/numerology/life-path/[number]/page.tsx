import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hash, ArrowLeft, CheckCircle2, Star, Sparkles, Heart, Briefcase } from 'lucide-react';
import { GoldCard } from '../../../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../../../components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '../../../../components/ui/CategoryBatchesList';
import { FAQSection } from '../../../../components/ui/FAQSection';
import { SEOInternalMesh } from '../../../../components/seo/SEOInternalMesh';

interface LifePathData {
  number: string;
  ruler: string;
  title: string;
  subtitle: string;
  description: string;
  traits: string[];
  luckyColours: string[];
  luckyDays: string[];
  compatibleNumbers: string[];
  careerPaths: string[];
  prediction2026: string;
  faqs: { q: string; a: string }[];
}

const LIFE_PATH_DATA: Record<string, LifePathData> = {
  '1': {
    number: '1',
    ruler: 'Sun ☀️',
    title: 'Life Path Number 1 — The Leader & Pioneer',
    subtitle: 'Driven by ambition, originality, independence, and pioneering energy.',
    description: 'Life Path 1 individuals are natural-born leaders. Governed by the Sun, you possess an innate drive to create, innovate, and forge your own path without reliance on others.',
    traits: ['Independent', 'Ambitious', 'Innovative', 'Courageous', 'Pioneering'],
    luckyColours: ['Gold', 'Yellow', 'Bright Red'],
    luckyDays: ['Sunday', 'Monday'],
    compatibleNumbers: ['1', '3', '5', '7'],
    careerPaths: ['CEO / Founder', 'Entrepreneur', 'Inventor', 'Director', 'Politician'],
    prediction2026: '2026 brings major opportunities for career promotion, business launches, and personal independence. Universal Year 1 energy aligns perfectly with your birth number!',
    faqs: [
      { q: 'What is the main challenge for Life Path 1?', a: 'Overcoming impatience, ego clashes, and learning to delegate tasks rather than trying to do everything alone.' }
    ]
  },
  '2': {
    number: '2',
    ruler: 'Moon 🌙',
    title: 'Life Path Number 2 — The Diplomat & Peacemaker',
    subtitle: 'Intuitive, cooperative, empathetic, and harmonizing.',
    description: 'Governed by the Moon, Life Path 2 individuals are sensitive, artistic, and deeply intuitive. You excel in creating harmony, bringing people together, and resolving conflicts.',
    traits: ['Empathetic', 'Intuitive', 'Diplomatic', 'Artistic', 'Peaceful'],
    luckyColours: ['White', 'Silver', 'Light Green'],
    luckyDays: ['Monday'],
    compatibleNumbers: ['2', '4', '8', '9'],
    careerPaths: ['Counselor', 'Diplomat', 'Artist', 'Psychologist', 'Mediator'],
    prediction2026: 'In 2026, relationship harmony and joint partnerships flourish. Trusting your inner intuition leads to emotional and financial stability.',
    faqs: [
      { q: 'What is the main strength of Life Path 2?', a: 'Deep emotional intelligence, peacemaking ability, and intuitive understanding of others.' }
    ]
  },
  '3': {
    number: '3',
    ruler: 'Jupiter 🪐',
    title: 'Life Path Number 3 — The Creative Communicator',
    subtitle: 'Expressive, joyful, artistic, charismatic, and optimistic.',
    description: 'Ruled by Jupiter, Life Path 3 is the number of self-expression, joy, and wisdom. You possess a natural charm, gift of speech, and artistic flair.',
    traits: ['Charismatic', 'Expressive', 'Optimistic', 'Creative', 'Witty'],
    luckyColours: ['Yellow', 'Saffron', 'Amber'],
    luckyDays: ['Thursday'],
    compatibleNumbers: ['1', '3', '6', '9'],
    careerPaths: ['Writer / Author', 'Public Speaker', 'Actor', 'Marketer', 'Teacher'],
    prediction2026: '2026 promises creative breakthroughs, public recognition, and success in publishing, media, or teaching projects.',
    faqs: [
      { q: 'What is the advice for Life Path 3 in 2026?', a: 'Focus your creative energy on 1 or 2 main projects rather than scattering your talents across too many ideas.' }
    ]
  },
  '4': {
    number: '4',
    ruler: 'Rahu / Uranus ⚡',
    title: 'Life Path Number 4 — The Builder & Strategist',
    subtitle: 'Disciplined, practical, methodical, trustworthy, and hard-working.',
    description: 'Life Path 4 is the foundation of numerology. Governed by Rahu, you possess incredible stamina, organization, and a practical mind capable of building lasting systems.',
    traits: ['Disciplined', 'Practical', 'Reliable', 'Methodical', 'Persistent'],
    luckyColours: ['Blue', 'Grey', 'Electric Blue'],
    luckyDays: ['Saturday', 'Sunday'],
    compatibleNumbers: ['2', '4', '6', '8'],
    careerPaths: ['Engineer', 'Architect', 'Financial Analyst', 'Project Manager', 'Builder'],
    prediction2026: '2026 rewards your consistent hard work with tangible financial growth, real estate investment, and long-term security.',
    faqs: [
      { q: 'How can Life Path 4 maximize success?', a: 'Maintain flexibility and embrace new technology while maintaining your high standards of discipline.' }
    ]
  },
  '5': {
    number: '5',
    ruler: 'Mercury ☿️',
    title: 'Life Path Number 5 — The Free Adventurer',
    subtitle: 'Versatile, adaptable, curious, progressive, and freedom-loving.',
    description: 'Ruled by Mercury, Life Path 5 represents change, travel, and communication. You thrive on freedom, diverse experiences, and quick adaptation to new trends.',
    traits: ['Versatile', 'Adventurous', 'Curious', 'Quick-minded', 'Persuasive'],
    luckyColours: ['Emerald Green', 'Turquoise', 'Light Grey'],
    luckyDays: ['Wednesday'],
    compatibleNumbers: ['1', '5', '7', '9'],
    careerPaths: ['Travel Writer', 'Sales Director', 'Journalist', 'Event Specialist', 'Trader'],
    prediction2026: '2026 is an action-packed year of travel, sudden lucrative opportunities, and career expansion.',
    faqs: [
      { q: 'What should Life Path 5 watch out for?', a: 'Avoid restlessness or making hasty impulsive financial commitments without checking details.' }
    ]
  },
  '6': {
    number: '6',
    ruler: 'Venus ♀️',
    title: 'Life Path Number 6 — The Nurturer & Healer',
    subtitle: 'Harmonious, loving, responsible, aesthetic, and family-oriented.',
    description: 'Governed by Venus, Life Path 6 is the frequency of unconditional love, home harmony, beauty, and luxury. You naturally care for family, community, and aesthetic arts.',
    traits: ['Nurturing', 'Responsible', 'Artistic', 'Harmonious', 'Generous'],
    luckyColours: ['Pink', 'Cream', 'Pastel Blue'],
    luckyDays: ['Friday'],
    compatibleNumbers: ['3', '6', '8', '9'],
    careerPaths: ['Interior Designer', 'Doctor / Healer', 'Fashion Creator', 'Counselor', 'Hotelier'],
    prediction2026: '2026 brings family happiness, luxury asset purchases, and relationship milestones.',
    faqs: [
      { q: 'What is the secret strength of Life Path 6?', a: 'Creating welcoming, beautiful environments where people feel supported and valued.' }
    ]
  },
  '7': {
    number: '7',
    ruler: 'Ketu / Neptune 🌊',
    title: 'Life Path Number 7 — The Mystic & Researcher',
    subtitle: 'Analytical, spiritual, introverted, seeker of truth, and philosopher.',
    description: 'Ruled by Ketu, Life Path 7 is the mystic number. You possess deep analytical intelligence combined with a profound desire to understand cosmic and scientific mysteries.',
    traits: ['Analytical', 'Spiritual', 'Intuitive', 'Thoughtful', 'Philosophical'],
    luckyColours: ['Violet', 'Smoky Grey', 'Sea Green'],
    luckyDays: ['Monday', 'Thursday'],
    compatibleNumbers: ['1', '5', '7'],
    careerPaths: ['Researcher', 'Astrologer', 'Data Scientist', 'Professor', 'Philosopher'],
    prediction2026: '2026 is a year of spiritual mastery, higher education, research publications, and profound self-discovery.',
    faqs: [
      { q: 'How does Life Path 7 find inner balance?', a: 'By spending time in nature, practicing meditation, and balancing analytical thinking with spiritual trust.' }
    ]
  },
  '8': {
    number: '8',
    ruler: 'Saturn 🪐',
    title: 'Life Path Number 8 — The Powerhouse & Executive',
    subtitle: 'Authoritative, financially masterly, resilient, karmic, and executive.',
    description: 'Governed by Saturn, Life Path 8 represents material authority, karma, organization, and major financial power. You build enduring institutions and master financial flow.',
    traits: ['Authoritative', 'Resilient', 'Strategic', 'Financial Master', 'Karmic'],
    luckyColours: ['Dark Blue', 'Black', 'Purple'],
    luckyDays: ['Saturday'],
    compatibleNumbers: ['2', '4', '6', '8'],
    careerPaths: ['Investment Banker', 'Corporate Attorney', 'Industrialist', 'Executive Director', 'Real Estate Mogul'],
    prediction2026: '2026 rewards Saturnian discipline with major financial gains, corporate expansion, and executive power.',
    faqs: [
      { q: 'What is the karmic law of Life Path 8?', a: 'Total honesty and ethical business practices bring exponential financial success under Saturn.' }
    ]
  },
  '9': {
    number: '9',
    ruler: 'Mars ♂️',
    title: 'Life Path Number 9 — The Humanitarian & Visionary',
    subtitle: 'Compassionate, courageous, wise, global-minded, and transformative.',
    description: 'Ruled by Mars, Life Path 9 represents completion, humanitarian service, and global consciousness. You possess fierce courage and a deep commitment to social elevation.',
    traits: ['Humanitarian', 'Courageous', 'Generous', 'Visionary', 'Wise'],
    luckyColours: ['Deep Red', 'Coral', 'Rose'],
    luckyDays: ['Tuesday'],
    compatibleNumbers: ['2', '3', '6', '9'],
    careerPaths: ['NGO Leader', 'Doctor / Surgeon', 'Social Reformer', 'Artist', 'Filmmaker'],
    prediction2026: '2026 marks the successful completion of a major 9-year cycle, opening doors for global recognition and impactful projects.',
    faqs: [
      { q: 'How to harness Life Path 9 energy?', a: 'Channel your natural passion into uplifting others while maintaining personal healthy boundaries.' }
    ]
  },
  '11': {
    number: '11',
    ruler: 'Master Number 11 (Illuminator)',
    title: 'Master Life Path 11 — The Spiritual Intuitive',
    subtitle: 'Highly psychic, visionary, inspiring, and spiritually gifted.',
    description: 'Master Number 11 carries a double vibration of 1 combined with the harmony of 2. You possess heightened intuition and serve as a spiritual catalyst for others.',
    traits: ['Intuitive', 'Visionary', 'Inspiring', 'Electric', 'Charismatic'],
    luckyColours: ['Silver', 'Electric Blue', 'White'],
    luckyDays: ['Sunday', 'Monday'],
    compatibleNumbers: ['2', '4', '7', '11'],
    careerPaths: ['Spiritual Teacher', 'Visionary Leader', 'Psychic Reader', 'Inspirational Author', 'Artist'],
    prediction2026: '2026 activates your spiritual leadership. Intuitive downloads and publishing endeavors achieve wide reach.',
    faqs: [
      { q: 'What is the Master Number 11 calling?', a: 'To channel spiritual insights into practical guidance that inspires and heals others.' }
    ]
  },
  '22': {
    number: '22',
    ruler: 'Master Number 22 (Master Builder)',
    title: 'Master Life Path 22 — The Master Architect of Destiny',
    subtitle: 'Turning grand spiritual visions into physical reality on a global scale.',
    description: 'Master Number 22 combines the intuition of 11 with the disciplined execution of 4. Known as the Master Builder, you possess the power to build institutions that serve humanity.',
    traits: ['Master Builder', 'Practical Visionary', 'Powerful', 'Systematic', 'Global Thinker'],
    luckyColours: ['Coral Gold', 'Deep Royal Blue', 'Emerald'],
    luckyDays: ['Saturday', 'Sunday'],
    compatibleNumbers: ['4', '8', '22'],
    careerPaths: ['Global Architect', 'Infrastructure Founder', 'Philanthropic Director', 'System Specialist'],
    prediction2026: '2026 presents grand scale project opportunities. Your vision receives institutional backing and funding.',
    faqs: [
      { q: 'Why is 22 considered the most powerful number?', a: 'Because it takes abstract spiritual dreams and builds them into lasting physical achievements.' }
    ]
  },
  '33': {
    number: '33',
    ruler: 'Master Number 33 (Master Teacher)',
    title: 'Master Life Path 33 — The Master Spiritual Teacher',
    subtitle: 'Embodying selfless love, cosmic wisdom, and universal healing.',
    description: 'Master Number 33 is the rare vibration of selfless devotion and divine wisdom. Combining the creative mastery of 3 and 6, you serve as a beacon of love and spiritual elevation.',
    traits: ['Master Teacher', 'Devotional', 'Compassionate', 'Universal Healer', 'Wise'],
    luckyColours: ['Golden Saffron', 'Pure White', 'Rose Gold'],
    luckyDays: ['Thursday', 'Friday'],
    compatibleNumbers: ['3', '6', '9', '33'],
    careerPaths: ['Spiritual Leader', 'Master Healer', 'Global Educator', 'Humanitarian Champion'],
    prediction2026: '2026 expands your spiritual influence. Mentoring and healing work touches thousands of lives.',
    faqs: [
      { q: 'How to calculate if I have Master Number 33?', a: 'If your full un-reduced birth date sum totals 33 (e.g., day + month + year = 33), you carry this rare master frequency.' }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(LIFE_PATH_DATA).map((number) => ({ number }));
}

export async function generateMetadata({ params }: { params: Promise<{ number: string }> }): Promise<Metadata> {
  const { number } = await params;
  const data = LIFE_PATH_DATA[number];
  if (!data) return { title: 'Life Path Number Not Found' };
  return {
    title: `${data.title} | OM Astrology AMC`,
    description: data.subtitle,
  };
}

export default async function LifePathPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const data = LIFE_PATH_DATA[number];

  if (!data) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Back Link */}
        <Link href="/numerology" className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Numerology Overview
        </Link>

        {/* Hero Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-gray-200/80 pb-10">
          <div className="md:col-span-8 space-y-4">
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Hash className="w-4 h-4" /> Ruling Planetary Energy: {data.ruler}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              {data.title}
            </h1>
            <p className="text-gray-600 text-base font-light leading-relaxed">
              {data.subtitle}
            </p>
          </div>
          <div className="md:col-span-4 flex justify-center">
            <div className="w-40 h-40 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--gold)] to-amber-600 text-white font-serif text-6xl font-bold shadow-2xl border-4 border-amber-200/60">
              {data.number}
            </div>
          </div>
        </div>

        {/* Overview & Personality Traits */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <GoldCard className="h-full">
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2">
                  <Star className="w-5 h-5 text-[var(--gold)]" /> Personality & Soul Essence
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  {data.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {data.traits.map((trait) => (
                    <span key={trait} className="px-3 py-1 bg-amber-50 text-[var(--gold-700)] rounded-full text-xs font-semibold border border-amber-200">
                      ✨ {trait}
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
                  Quick Vibrational Correspondences
                </h3>
                <div className="space-y-2 text-xs text-gray-700 font-light">
                  <p><strong>• Lucky Colours:</strong> {data.luckyColours.join(', ')}</p>
                  <p><strong>• Auspicious Days:</strong> {data.luckyDays.join(', ')}</p>
                  <p><strong>• Compatible Numbers:</strong> {data.compatibleNumbers.join(', ')}</p>
                  <p><strong>• Top Careers:</strong> {data.careerPaths.join(', ')}</p>
                </div>
              </div>
            </GoldCard>
          </div>
        </div>

        {/* 2026 Predictions Banner */}
        <GoldCard className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-[var(--gold-300)]">
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[var(--gold-700)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--gold)]" /> 2026 Personal Year Prediction for Number {data.number}
            </h3>
            <p className="text-sm md:text-base text-gray-700 font-light leading-relaxed">
              {data.prediction2026}
            </p>
          </div>
        </GoldCard>

        {/* FAQ Section */}
        {data.faqs && data.faqs.length > 0 && (
          <div className="pt-6">
            <FAQSection faqs={data.faqs} />
          </div>
        )}

        {/* SEO Internal Mesh */}
        <SEOInternalMesh currentCategory="numerology" />

        {/* Active Batches Showcase */}
        <div className="border-t border-gray-200/60 pt-12">
          <CategoryBatchesList category="Numerology" />
        </div>

        {/* Booking Consultation Widget */}
        <div className="border-t border-gray-200/60 pt-12 pb-6">
          <CategoryBookingWidget category="Numerology" />
        </div>
      </div>
    </div>
  );
}
