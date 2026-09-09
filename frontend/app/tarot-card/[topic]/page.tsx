import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sparkles, ArrowLeft, CheckCircle2, Heart, Briefcase, Compass, Sun } from 'lucide-react';
import { GoldCard } from '../../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../../components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '../../../components/ui/CategoryBatchesList';
import { FAQSection } from '../../../components/ui/FAQSection';
import { SEOInternalMesh } from '../../../components/seo/SEOInternalMesh';

interface TarotTopicData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  keyTakeaways: string[];
  sections: { title: string; desc: string; details: string[] }[];
  faqs: { q: string; a: string }[];
}

const TAROT_TOPICS: Record<string, TarotTopicData> = {
  'major-arcana': {
    title: 'The 22 Major Arcana Cards — Complete Archetype Guide',
    subtitle: 'Understand the soul journey from The Fool (0) to The World (XXI).',
    description: 'The Major Arcana consists of 22 cards representing life lessons, karmic themes, and major spiritual crossroads. Known as "The Fool’s Journey", these archetypes reveal the overarching narrative of your destiny.',
    category: 'Tarot',
    image: '/images/tarot_card_hero.png',
    keyTakeaways: [
      'The Fool (0): New beginnings, innocence, faith in the universe.',
      'The Magician (I): Manifestation, resourcefulness, willpower.',
      'The High Priestess (II): Intuition, sacred knowledge, inner subconscious wisdom.',
      'The Lovers (VI): Relationships, core choices, harmony, values alignment.',
      'The Wheel of Fortune (X): Turning points, karma, cycle changes, good luck.',
      'The Tower (XVI): Sudden illumination, dismantling false beliefs, breakthrough.',
      'The Sun (XIX): Joy, success, vitality, radiance, truth.',
      'The World (XXI): Completion, fulfillment, integration, cosmic harmony.'
    ],
    sections: [
      {
        title: '1. The Beginning: Cards 0 to 7 (Material & Self Mastership)',
        desc: 'Establishing identity, ego, boundaries, and willpower.',
        details: [
          '0 - The Fool: Trusting the leap into uncharted waters.',
          'I - The Magician: Having all necessary tools to succeed.',
          'II - The High Priestess: Listening to quiet inner guidance.',
          'III - The Empress: Abundance, fertility, nurturing growth.',
          'IV - The Emperor: Structure, stability, leadership, authority.',
          'V - The Hierophant: Traditional wisdom, mentoring, spiritual systems.',
          'VI - The Lovers: Deep soul connection & alignment of values.',
          'VII - The Chariot: Focused momentum and overcoming obstacles.'
        ]
      },
      {
        title: '2. The Middle: Cards 8 to 14 (Karmic & Soul Lessons)',
        desc: 'Facing inner challenges, balance, and soul realignment.',
        details: [
          'VIII - Strength: Compassionate courage, inner patience, taming impulses.',
          'IX - The Hermit: Soul-searching, solitary wisdom, inner light.',
          'X - Wheel of Fortune: Accepting natural cycles and unexpected opportunities.',
          'XI - Justice: Truth, karma, fairness, clear cause-and-effect.',
          'XII - The Hanged Man: Surrender, gaining new perspectives, pausing action.',
          'XIII - Death: Transformation, letting go of the old to welcome rebirth.',
          'XIV - Temperance: Balance, moderation, alchemy of opposing forces.'
        ]
      },
      {
        title: '3. The Higher Cosmic Path: Cards 15 to 21 (Transcendence & Illumination)',
        desc: 'Breaking illusions and awakening to ultimate fulfillment.',
        details: [
          'XV - The Devil: Identifying attachments, toxic loops, reclaiming freedom.',
          'XVI - The Tower: Liberation from outdated structures, truth revealed.',
          'XVII - The Star: Hope, inspiration, spiritual healing, renewed faith.',
          'XVIII - The Moon: Unconscious fears, dreams, illusion, navigating mystery.',
          'XIX - The Sun: Radiant success, clarity, joy, total authenticity.',
          'XX - Judgement: Awakening, reckoning, answering your higher calling.',
          'XXI - The World: Complete cycle, mastery, global success.'
        ]
      }
    ],
    faqs: [
      { q: 'Is drawing the Death card a bad sign?', a: 'No! In Tarot, the Death card almost never means physical death. It signifies a powerful transformation—ending an outdated chapter to make room for fresh growth.' }
    ]
  },
  'three-card-spread': {
    title: 'Past, Present, Future 3-Card Tarot Reading Guide',
    subtitle: 'Master the classic 3-card spread for immediate clarity on any life situation.',
    description: 'The 3-card spread is the most versatile and elegant layout in Tarot. It reveals where you have come from (Past), where you stand right now (Present), and where your current trajectory leads (Future).',
    category: 'Tarot',
    image: '/images/tarot_card_hero.png',
    keyTakeaways: [
      'Card 1 (Past): Root cause, background energy, previous lessons.',
      'Card 2 (Present): Current mental state, core challenge, immediate reality.',
      'Card 3 (Future): Probable outcome based on current choices and alignment.',
      'Actionable Insights: How changing current choices shifts the future outcome.'
    ],
    sections: [
      {
        title: '1. Card 1: The Past Energy & Root Cause',
        desc: 'Understanding the foundation that brought you to this moment.',
        details: [
          'Examines underlying events or choices that created the current situation.',
          'Identifies unresolved baggage or strengths carried forward.',
          'Helps release blame by clarifying how previous decisions played out.'
        ]
      },
      {
        title: '2. Card 2: The Present Situation & Blind Spots',
        desc: 'Analyzing your current alignment, mindset, and surrounding influences.',
        details: [
          'Shines a light on unseen factors or hidden dynamics.',
          'Displays how you are currently reacting emotionally or mentally.',
          'Provides immediate advice on where to focus your energy right now.'
        ]
      },
      {
        title: '3. Card 3: Future Trajectory & Empowered Choices',
        desc: 'Projecting the outcome if current path continues unchanged.',
        details: [
          'Tarot displays potential timelines, not deterministic fate.',
          'If the future card is challenging, Card 2 advice shows how to pivot.',
          'Emphasizes your free will in shaping the eventual result.'
        ]
      }
    ],
    faqs: [
      { q: 'Can I use 3-card spreads for Mind/Body/Spirit?', a: 'Yes! Variations of the 3-card spread include Past/Present/Future, Mind/Body/Spirit, You/Partner/Relationship, and Problem/Obstacle/Solution.' }
    ]
  },
  'love-tarot': {
    title: 'Love & Relationship Tarot Reading Guide',
    subtitle: 'Decoding soulmates, romantic compatibility, and relationship growth.',
    description: 'Love Tarot readings provide profound clarity on romantic dynamics, emotional honesty, mutual expectations, and healing relationship communication.',
    category: 'Tarot',
    image: '/images/marriage_matching_realistic.png',
    keyTakeaways: [
      'Soulmate Cards: The Lovers, Two of Cups, The Hierophant, Four of Wands.',
      'Healing Cards: Star, Temperance, Three of Swords (grief processing), Sun.',
      'Communication Focus: Understanding what your partner feels vs what they express.',
      'Free Will Alignment: Navigating relationship choices with mutual respect.'
    ],
    sections: [
      {
        title: '1. High-Vibration Love Cards in Tarot',
        desc: 'Key archetypes indicating deep soul connections.',
        details: [
          'The Lovers (VI): Mutual trust, values alignment, and passionate choice.',
          'Two of Cups: Balanced partnership, reciprocal affection, true equality.',
          'Four of Wands: Celebration, engagement, home building, joy.',
          'Ten of Cups: Domestic bliss, long-term harmony, family fulfillment.'
        ]
      },
      {
        title: '2. Navigating Relationship Challenges',
        desc: 'Understanding cards that highlight emotional growth areas.',
        details: [
          'Three of Swords: Heartbreak, healing needed, releasing romantic idealization.',
          'Five of Cups: Mourning past disappointment, encouraging focus on remaining love.',
          'The Devil: Obsession, codependency, healthy boundary creation needed.'
        ]
      }
    ],
    faqs: [
      { q: 'Can Tarot tell if someone loves me?', a: 'Tarot highlights their current emotional posture, feelings, and intentions towards you, fostering honest dialogue.' }
    ]
  },
  'career-tarot': {
    title: 'Career & Financial Growth Tarot Reading Guide',
    subtitle: 'Navigating promotion, business decisions, job shifts, and financial abundance.',
    description: 'Career Tarot readings assist professionals and entrepreneurs in identifying hidden opportunities, timing career moves, and resolving workplace conflicts.',
    category: 'Tarot',
    image: '/images/career_blueprint_realistic.png',
    keyTakeaways: [
      'Success & Mastery Cards: The Chariot, Three of Pentacles, Eight of Pentacles, Sun.',
      'Abundance Cards: Ace of Pentacles, Nine of Pentacles, Ten of Pentacles, Empress.',
      'Career Pivot Advice: Identifying when to stay the course vs when to launch new ventures.'
    ],
    sections: [
      {
        title: '1. Wealth & Business Growth Indicators',
        desc: 'Cards signifying financial rewards and successful investments.',
        details: [
          'Ace of Pentacles: A profitable new career offer or business opportunity.',
          'Three of Pentacles: Team collaboration, skilled craftsmanship, professional praise.',
          'Eight of Pentacles: Mastery, upgrading skills, dedicated work producing results.',
          'Ten of Pentacles: Long-term business stability, legacy wealth, security.'
        ]
      },
      {
        title: '2. Timing & Career Transition Advice',
        desc: 'How to handle workplace stagnation or contract choices.',
        details: [
          'Two of Wands: Planning global expansion or multi-directional growth.',
          'Eight of Cups: Leaving a stagnant role to pursue fulfilling work.',
          'Six of Swords: Smooth transition to calmer, more rewarding work environments.'
        ]
      }
    ],
    faqs: [
      { q: 'Should I make a major job switch if Tarot shows The Tower?', a: 'The Tower suggests that remaining in a fragile situation is risky. Preparing for a proactive change yields better results.' }
    ]
  },
  'tarot-suits': {
    title: 'The 4 Minor Arcana Suits (Wands, Cups, Swords, Pentacles)',
    subtitle: 'Mastering the 56 Minor Arcana cards representing everyday experiences and elements.',
    description: 'While the Major Arcana cards represent major spiritual themes, the 56 Minor Arcana cards deal with day-to-day realities—your actions, feelings, thoughts, and material affairs across the 4 primary elements.',
    category: 'Tarot',
    image: '/images/astrology_card_hero.png',
    keyTakeaways: [
      'Wands (Fire): Inspiration, energy, passion, action, career drive.',
      'Cups (Water): Emotions, intuition, relationships, artistic creativity.',
      'Swords (Air): Intellect, thoughts, communication, decisions, conflict.',
      'Pentacles (Earth): Finances, physical body, property, career security.'
    ],
    sections: [
      {
        title: '1. Suit of Wands — Element Fire 🔥',
        desc: 'Creativity, ambition, spark, and enthusiasm.',
        details: [
          'Theme: Passion, willpower, entrepreneurial spirit.',
          'Key Cards: Ace of Wands (spark), Three of Wands (expansion), Nine of Wands (perseverance).',
          'Personality: Energetic, bold, pioneering, competitive.'
        ]
      },
      {
        title: '2. Suit of Cups — Element Water 💧',
        desc: 'Emotions, heart connection, and subconscious feeling.',
        details: [
          'Theme: Love, intimacy, compassion, artistic expression.',
          'Key Cards: Ace of Cups (overflowing love), Six of Cups (nostalgia), Queen of Cups (empathy).',
          'Personality: Sensitive, intuitive, loving, creative.'
        ]
      },
      {
        title: '3. Suit of Swords — Element Air 🌬️',
        desc: 'Mind, truth, mental clarity, and communication.',
        details: [
          'Theme: Truth, logic, choices, mental challenges.',
          'Key Cards: Ace of Swords (breakthrough clarity), Six of Swords (healing journey), King of Swords (analytical authority).',
          'Personality: Intellectually sharp, direct, objective.'
        ]
      },
      {
        title: '4. Suit of Pentacles — Element Earth 🌍',
        desc: 'Material world, body, money, and practical security.',
        details: [
          'Theme: Prosperity, health, real estate, physical results.',
          'Key Cards: Ace of Pentacles (financial seed), Four of Pentacles (saving), Queen of Pentacles (practical abundance).',
          'Personality: Grounded, reliable, patient, builder.'
        ]
      }
    ],
    faqs: [
      { q: 'What does it mean if a reading has mostly Swords?', a: 'A Swords-heavy reading means the situation is currently dominated by intense mental activity, decision making, communication, or stress.' }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(TAROT_TOPICS).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const data = TAROT_TOPICS[topic];
  if (!data) return { title: 'Tarot Topic Not Found' };
  return {
    title: `${data.title} | OM Astrology AMC`,
    description: data.subtitle,
  };
}

export default async function TarotTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const data = TAROT_TOPICS[topic];

  if (!data) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Back Link */}
        <Link href="/tarot-card" className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Tarot Guide
        </Link>

        {/* Hero Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-gray-200/80 pb-10">
          <div className="md:col-span-8 space-y-4">
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> {data.category} Insights
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              {data.title}
            </h1>
            <p className="text-gray-600 text-base font-light leading-relaxed">
              {data.subtitle}
            </p>
          </div>
          <div className="md:col-span-4 flex justify-center">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-2 border-[var(--gold-200)] bg-amber-50">
              <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Key Takeaways Card */}
        <GoldCard className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-[var(--gold-300)]">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[var(--gold-700)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--gold)]" /> Key Archetypes & Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.keyTakeaways.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 font-light">
                  <CheckCircle2 className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </GoldCard>

        {/* Main Content Sections */}
        <div className="space-y-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
            Comprehensive Meaning & Interpretation
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
          <div className="pt-8">
            <FAQSection faqs={data.faqs} />
          </div>
        )}

        {/* SEO Internal Mesh */}
        <SEOInternalMesh currentCategory="tarot" />

        {/* Active Batches Showcase */}
        <div className="border-t border-gray-200/60 pt-12">
          <CategoryBatchesList category="Tarot Card" />
        </div>

        {/* Booking Consultation Widget */}
        <div className="border-t border-gray-200/60 pt-12 pb-6">
          <CategoryBookingWidget category="Tarot Card" />
        </div>
      </div>
    </div>
  );
}
