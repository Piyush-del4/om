import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sparkles, ArrowLeft, CheckCircle2, Star, BookOpen, Layers, PenTool, Hash, Heart, Shield } from 'lucide-react';
import { GoldCard } from '../../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../../components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '../../../components/ui/CategoryBatchesList';
import { FAQSection } from '../../../components/ui/FAQSection';
import { SEOInternalMesh } from '../../../components/seo/SEOInternalMesh';
import { FAQSchema, BreadcrumbSchema } from '../../../components/seo/JsonLd';

interface SynthesisTopicData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  keyTakeaways: string[];
  sections: { title: string; desc: string; details: string[] }[];
  faqs: { q: string; a: string }[];
}

const SYNTHESIS_TOPICS: Record<string, SynthesisTopicData> = {
  'astrology-numerology-compatibility': {
    title: 'Astrology & Numerology Compatibility Synthesis',
    subtitle: 'Combining Kundli Ashtakoot Milan with Life Path Number Harmonization.',
    description: 'While Vedic Astrology analyzes planetary placements, Nakshatra match, and Guna Milan, Numerology evaluates core vibration compatibility between Life Path, Destiny, and Moolank numbers. Combining both sciences provides a 360-degree blueprint for marital harmony and long-term partnership success.',
    category: 'Astrology + Numerology',
    image: '/images/marriage_matching_realistic.png',
    keyTakeaways: [
      'Kundli Guna Milan measures moon sign mental compatibility (Ashtakoot 36 Points).',
      'Life Path Numbers measure core soul vibration and daily communication style.',
      'A high Guna score paired with conflicting Life Path numbers can cause everyday friction.',
      'A low Guna score with complementary Life Path numbers (e.g. 3 & 7) can be harmonized with remedies.',
      'Combined remediation uses both Vedic planetary mantras and Chaldean name spelling adjustments.'
    ],
    sections: [
      {
        title: '1. The Dual-System Matchmaking Methodology',
        desc: 'Why relying on Kundli alone or Numerology alone leaves critical blind spots.',
        details: [
          'Vedic Kundli evaluates timing of marriage, dasha periods, and physical attraction (Venus & Mars).',
          'Numerology evaluates mental habits, financial decision making, and subconscious triggers.',
          'Synthesizing both systems prevents unexpected marital friction during planetary dasha shifts.',
          'Rajessh Paanday recommends evaluating both partner charts before setting wedding dates.'
        ]
      },
      {
        title: '2. Harmonizing Conflicting Vibrations',
        desc: 'Practical remedies when Astrological Gunas and Numerological Life Paths clash.',
        details: [
          'If Moon signs align but Life Paths conflict: Use Chaldean name spelling correction for marital harmony.',
          'If Life Paths align but Manglik Dosha is present: Perform Kumbh Vivah or specific Venus/Mars balancing remedies.',
          'If both align: Perfect harmony for joint business investments and family growth.'
        ]
      }
    ],
    faqs: [
      { q: 'What if our Kundli match is 24/36 but our Life Path numbers are enemy numbers?', a: 'This indicates strong emotional compatibility but different communication styles. Correcting your shared surname spelling in Chaldean Numerology bridges the communication gap smoothly.' }
    ]
  },
  'signature-science-and-astrology-remedies': {
    title: 'Graphology & Astrology: Aligning Signatures with Planets',
    subtitle: 'Using Signature Slant & Stroke Pressure to Activate 10th House Career Planets.',
    description: 'Your signature is your public subconscious declaration. By combining Graphology (signature science) with Vedic Astrology (10th house career lord and Lagna planet), you can transform your signature into a daily talisman for career growth, wealth retention, and authority.',
    category: 'Graphology + Astrology',
    image: '/images/signature_analysis_hero.png',
    keyTakeaways: [
      'Upward Signature Slant (15°-30°): Activates Sun & Jupiter confidence energy.',
      'Underline with 2 Dots: Establishes Saturn discipline and wealth stability.',
      'Unbroken Capital Letters: Strengthens Lagna lord vitality and personal authority.',
      'Eliminating Strike-through Lines: Removes Rahu/Ketu subconscious self-sabotage.',
      'Smooth Flowing Terminal Strokes: Ensures Venus financial liquidity and success.'
    ],
    sections: [
      {
        title: '1. Connecting Signature Strokes to Planetary Energies',
        desc: 'How specific stroke patterns stimulate Vedic astrology houses.',
        details: [
          'Sun (Surya): Prominent, clear first letter increases public recognition and leadership.',
          'Jupiter (Guru): Upward slant creates wisdom, expansion, and mentor support.',
          'Saturn (Shani): Neat, deliberate baseline build endurance, patience, and long-term assets.',
          'Mercury (Budh): Smooth, legible cursive loops enhance business acumen and contract signing.'
        ]
      },
      {
        title: '2. Correcting Dangerous Signature Habits',
        desc: 'Graphotherapy adjustments recommended by Rajessh Paanday.',
        details: [
          'Never cross or drop your signature baseline into a downward slope.',
          'Avoid encircling your name with an enclosed loop (creates self-isolation).',
          'Add a clean, solid underline starting under the first name and ending past the surname.'
        ]
      }
    ],
    faqs: [
      { q: 'How long does a signature correction take to show results in career?', a: 'When practiced daily for 21 to 43 consecutive days (graphotherapy), subconscious neural pathways realign, attracting positive opportunities aligned with your 10th House planetary lord.' }
    ]
  },
  'tarot-and-zodiac-astrology-cards': {
    title: 'Tarot Arcana & Zodiac Signs Alignment Guide',
    subtitle: 'Discover which Major Arcana card governs your Sun Sign and Rising Sign.',
    description: 'Tarot and Astrology are deeply intertwined branches of ancient wisdom. Each of the 12 Zodiac signs and 7 classical planets corresponds directly to a Major Arcana Tarot card, providing profound double-layered insights for spiritual growth.',
    category: 'Tarot + Astrology',
    image: '/images/tarot_card_hero.png',
    keyTakeaways: [
      'Aries → The Emperor (IV): Leadership, initiative, pioneering drive.',
      'Taurus → The Hierophant (V): Value, tradition, patience, stability.',
      'Gemini → The Lovers (VI): Curiosity, choices, dual perspectives.',
      'Cancer → The Chariot (VII): Emotional protection, momentum, family devotion.',
      'Leo → Strength (VIII): Courage, heart power, gracious leadership.',
      'Virgo → The Hermit (IX): Analysis, introspection, service, wisdom.',
      'Libra → Justice (XI): Balance, fairness, relationship harmony.',
      'Scorpio → Death (XIII): Transformation, rebirth, intense healing.',
      'Sagittarius → Temperance (XIV): Exploration, philosophy, higher balance.',
      'Capricorn → The Devil (XV): Ambition, material mastery, breaking traps.',
      'Aquarius → The Star (XVII): Hope, innovation, humanitarian vision.',
      'Pisces → The Moon (XVIII): Intuition, dreams, spiritual depth.'
    ],
    sections: [
      {
        title: '1. Using Zodiac Tarot Cards for Personal Clarity',
        desc: 'How Kusum Panday utilizes Sun & Ascendant tarot cards during consultations.',
        details: [
          'Your Sun Sign card shows your core spirit and life mission archetype.',
          'Your Rising Sign card reveals how you navigate daily real-world challenges.',
          'Your Moon Sign card uncovers subconscious emotional needs and intuitive triggers.'
        ]
      }
    ],
    faqs: [
      { q: 'Can I meditate on my Zodiac Tarot card for guidance?', a: 'Yes! Placing your Zodiac Major Arcana card on your altar or desk strengthens focus and aligns your subconscious with your astrological strengths.' }
    ]
  },
  'name-numerology-and-signature-correction': {
    title: 'Name Numerology & Signature Correction Synergy',
    subtitle: 'Aligning Chaldean Name Math with Subconscious Handwriting Strokes.',
    description: 'A name spelling correction alone is only half the formula. To manifest the full power of a corrected Chaldean name number, your handwritten signature must express that new energy through positive graphological stroke structures.',
    category: 'Numerology + Graphology',
    image: '/images/numerology_chart_hero.png',
    keyTakeaways: [
      'Chaldean Alphabet Calculation: Assigning numbers 1-8 to name letters.',
      'Compound Name Vibration (e.g. 14, 15, 19, 21, 23, 24): Choosing lucky totals.',
      'Signature Execution: Writing the corrected name without hesitant gaps or breaks.',
      'Daily Graphotherapy Practice: 21 lines of new signature practice per day.'
    ],
    sections: [
      {
        title: '1. The 2-Step Name & Signature Transformation',
        desc: 'How Rajessh Paanday combines Chaldean numerology with handwriting analysis.',
        details: [
          'Step 1: Calculate birth Moolank (Driver) and Bhagyank (Conductor) from Date of Birth.',
          'Step 2: Adjust name spelling to align with a friendly compound number (e.g. 19 for Sun success, 24 for Venus luxury).',
          'Step 3: Craft a custom signature graphology design that carries the new letter total with an upward, confident stroke.'
        ]
      }
    ],
    faqs: [
      { q: 'Do I need to legally change my name in official documents?', a: 'Not necessarily! Practicing your new signature on personal journals, social profiles, and daily graphotherapy sheets trains your mind and environment to absorb the new vibration.' }
    ]
  },
  'planetary-elements-and-handwriting-pressure': {
    title: 'FEAN 5-Element Concentration in Handwriting & Lo Shu Grid',
    subtitle: 'Measuring Water, Fire, Soft Wood, Metal, and Earth in Script Pressure & Lo Shu Math.',
    description: 'The FEAN Method (Five Elements Analysis & Numerology) measures the exact concentration of Water, Fire, Soft Wood, Metal, and Earth elements in a person body and mind using their Lo Shu Grid and handwriting pressure.',
    category: 'Graphology + Numerology',
    image: '/images/graphology_hero.png',
    keyTakeaways: [
      'Heavy Writing Pressure: Excessive Fire (9) & Earth (8) — high determination, danger of stubbornness.',
      'Light Writing Pressure: Missing Earth (2, 5, 8) — high sensitivity, needs grounding remedies.',
      'Vertical Slant: Balanced Water (1) & Soft Wood (3) — calm logical processing under stress.',
      'Rightward Slant (45°): Active Fire & Venus Metal (6) — expressive, passionate, social.'
    ],
    sections: [
      {
        title: '1. Balancing the 5 Elements Through Graphotherapy',
        desc: 'Practical exercises to correct elemental deficits revealed in your Lo Shu Grid.',
        details: [
          'If Fire is missing (No 9 in Lo Shu Grid): Practice firm downstrokes to build courage and motivation.',
          'If Earth is missing (No 2, 5, 8 in Lo Shu Grid): Use rounded baseline letters to improve stability.',
          'If Water is excessive (Multiple 1s in Lo Shu Grid): Practice even spacing between words to reduce overthinking.'
        ]
      }
    ],
    faqs: [
      { q: 'What is the FEAN Method Astrology AMB?', a: 'FEAN is a proprietary occult synthesis framework developed by Rajessh Paanday that measures 5-element concentration from Lo Shu birth grids and handwriting samples.' }
    ]
  },
  'tarot-and-life-path-numerology': {
    title: 'Tarot Cards & Life Path Numerology Matrix',
    subtitle: 'Connecting Life Path Numbers 1 through 33 to Soul Arcana Cards.',
    description: 'Every Life Path number corresponds to a specific Major Arcana card in Tarot. Understanding your Life Path Tarot Archetype reveals your core life purpose, soul strengths, and recurring spiritual lessons.',
    category: 'Tarot + Numerology',
    image: '/images/numerology_chart_hero.png',
    keyTakeaways: [
      'Life Path 1 → The Magician (I): Original creation, manifestation, leadership.',
      'Life Path 2 → The High Priestess (II): Intuition, diplomacy, subconscious wisdom.',
      'Life Path 3 → The Empress (III): Creativity, communication, joy, abundance.',
      'Life Path 4 → The Emperor (IV): Discipline, structure, solid foundations.',
      'Life Path 5 → The Hierophant (V): Freedom, learning, versatility, teaching.',
      'Life Path 6 → The Lovers (VI): Relationship harmony, responsibility, beauty.',
      'Life Path 7 → The Chariot (VII): Mastery, inner research, overcoming obstacles.',
      'Life Path 8 → Strength (VIII): Power, financial mastery, endurance.',
      'Life Path 9 → The Hermit (IX): Humanitarian wisdom, soul light, completion.',
      'Master Path 11 → Justice (XI): Spiritual balance, higher truth, illumination.',
      'Master Path 22 → The Fool (0) / World (XXI): Master builder, global vision.'
    ],
    sections: [
      {
        title: '1. Working with Your Soul Tarot Archetype',
        desc: 'Guidance from Kusum Panday on using Tarot for Life Path activation.',
        details: [
          'Calculate your Life Path by adding all digits of your full Birth Date until reduced to 1-9 or Master 11/22/33.',
          'Match your number to its corresponding Major Arcana card.',
          'Use card meditation during decision-making periods to align with your higher soul purpose.'
        ]
      }
    ],
    faqs: [
      { q: 'How does Life Path 11 differ from Life Path 2 in Tarot?', a: 'Life Path 2 connects to The High Priestess (gentle intuition), while Master Path 11 connects to Justice & The High Priestess combined (spiritual truth and visionary guidance).' }
    ]
  },
  'kundli-doshas-and-tarot-remedies': {
    title: 'Vedic Kundli Doshas & Tarot Self-Reflection Healing',
    subtitle: 'Overcoming Manglik, Sade Sati, and Kaal Sarp Disturbances with Combined Guidance.',
    description: 'When intense astrological doshas (such as Manglik Dosha, Rahu-Ketu Kaal Sarp, or Saturn Sade Sati) create psychological anxiety or delays, combining traditional Vedic mantras with Tarot self-reflection spreads provides immediate peace of mind and constructive action steps.',
    category: 'Astrology + Tarot',
    image: '/images/astrology_card_hero.png',
    keyTakeaways: [
      'Manglik Dosha: Mars aggression balanced by Tarot Strength & Temperance cards.',
      'Sade Sati (Saturn 7.5 Yrs): Delays transformed through Tarot Hermit & Hanged Man wisdom.',
      'Kaal Sarp Dosha: Rahu/Ketu illusion cleared through Tarot Star & Sun clarity spreads.',
      'Holistic Healing: Vedic mantra chanting + Tarot mindset realignment.'
    ],
    sections: [
      {
        title: '1. Synthesizing Kundli Dosha Remedies with Tarot Spreads',
        desc: 'A compassionate, non-fear-based approach to astrological remedies.',
        details: [
          'Vedic remedies (mantras, rudraksha, charity) align your external planetary energies.',
          'Tarot spreads highlight your internal emotional mindset and choices.',
          'Together, they ensure you remain calm, proactive, and resilient during challenging planetary periods.'
        ]
      }
    ],
    faqs: [
      { q: 'Should I be afraid of Sade Sati or Manglik Dosha?', a: 'No! Astrological doshas are periods of intense soul discipline, not curses. With right guidance, Sade Sati often brings your biggest lifetime achievements.' }
    ]
  },
  'corporate-numerology-and-brand-graphology': {
    title: 'Corporate Brand Numerology & Logo Graphotherapy',
    subtitle: 'Designing High-Vibration Business Names, Logos, and Signatures for Commercial Dominance.',
    description: 'Successful corporations and startup founders intentionally align company titles, brand launch dates, and executive signatures with lucky Chaldean numerology totals and positive graphic geometry. This synthesis attracts investors, brand trust, and exponential market growth.',
    category: 'Numerology + Graphology',
    image: '/images/career_blueprint_realistic.png',
    keyTakeaways: [
      'Company Name Math: Balancing brand title with founder birth numbers.',
      'Lucky Corporate Totals: 15, 19, 24, 33, 37, 42, 46, 51 for wealth attraction.',
      'Logo Geometry: Incorporating graphological upward curves and non-enclosed open loops.',
      'Executive Signature Science: Authoritative, clean signature design for contract signing.'
    ],
    sections: [
      {
        title: '1. The Corporate Occult Branding Audit',
        desc: 'How Rajessh Paanday advises startup founders and enterprise CEOs.',
        details: [
          'Audit existing company name Chaldean vibrations against market competitors.',
          'Select auspicious launch dates based on planetary transits and business numerology.',
          'Optimize brand logo typography using graphotherapy rules for visual trust.',
          'Train key directors in executive signature correction for legal and financial signing.'
        ]
      }
    ],
    faqs: [
      { q: 'Can a small spelling shift in a business name boost revenue?', a: 'Yes! Aligning a business name to a lucky Chaldean total (like 24 or 33) removes subtle friction, improving client trust and commercial transaction success.' }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(SYNTHESIS_TOPICS).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const data = SYNTHESIS_TOPICS[topic];
  if (!data) return { title: 'Occult Synthesis Topic Not Found' };
  return {
    title: `${data.title} — Vedic & Occult Synthesis Guide | OM Astrology AMC`,
    description: data.description.substring(0, 160),
    keywords: [
      data.title,
      data.category,
      'occult synthesis',
      'Vedic astrology',
      'Numerology consultation',
      'Graphology handwriting analysis',
      'Tarot card reading',
      'Rajessh Paanday',
      'Kusum Panday'
    ],
    openGraph: {
      title: `${data.title} | OM Astrology AMC`,
      description: data.subtitle,
      url: `https://omastrologyamc.com/occult-synthesis/${topic}`,
      siteName: 'OM Astrology AMC',
      images: [{ url: `https://omastrologyamc.com${data.image}` }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} | OM Astrology AMC`,
      description: data.subtitle,
    },
    alternates: {
      canonical: `https://omastrologyamc.com/occult-synthesis/${topic}`,
    },
  };
}

export default async function OccultSynthesisTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const data = SYNTHESIS_TOPICS[topic];

  if (!data) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-gray-900">
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Occult Synthesis', url: '/occult-synthesis' },
        { name: data.title, url: `/occult-synthesis/${topic}` }
      ]} />
      {data.faqs && data.faqs.length > 0 && (
        <FAQSchema faqs={data.faqs.map(f => ({ question: f.q, answer: f.a }))} />
      )}
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Back Link */}
        <Link href="/occult-synthesis" className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Synthesis Hub
        </Link>

        {/* Hero Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-gray-200/80 pb-10">
          <div className="md:col-span-8 space-y-4">
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> {data.category} Intersecting Guide
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
              <Sparkles className="w-5 h-5 text-[var(--gold)]" /> Key Cross-Domain Insights
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
            Detailed Synthesis & Practical Application
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
