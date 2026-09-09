import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PenTool, ArrowLeft, CheckCircle2, Award, Sparkles, BookOpen, Brain } from 'lucide-react';
import { GoldCard } from '../../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../../components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '../../../components/ui/CategoryBatchesList';
import { FAQSection } from '../../../components/ui/FAQSection';
import { SEOInternalMesh } from '../../../components/seo/SEOInternalMesh';

interface TopicData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  keyTakeaways: string[];
  sections: { title: string; desc: string; details: string[] }[];
  faqs: { q: string; a: string }[];
}

const GRAPHOLOGY_TOPICS: Record<string, TopicData> = {
  'signature-analysis': {
    title: 'Signature Analysis Science & Public Persona',
    subtitle: 'What your signature reveals about your self-image, ambition, and social confidence.',
    description: 'Your signature is your psychological business card. While your normal handwriting shows your true inner self, your signature reveals your public persona—how you want the world to perceive you.',
    category: 'Graphology',
    image: '/images/step_analyze_realistic.png',
    keyTakeaways: [
      'Bottom Underline: Indicates high self-confidence and emotional independence.',
      'Signature Size Ratio: Larger signature than text signifies desire for social recognition.',
      'Strike-Through Lines: Crossing your name reveals subconscious self-criticism.',
      'First Name vs Last Name: Dominant first name indicates pride in individual identity.',
      'Dot at the End: Signals caution, formality, and a desire to have the last word.'
    ],
    sections: [
      {
        title: '1. The Psychology of the Signature Underline',
        desc: 'A line under a signature is a psychological ground line providing stability.',
        details: [
          'Single Straight Line: Shows strong self-reliance, leadership capacity, and emotional balance.',
          'Double Line: Indicates ambition, high standards, and a desire for social standing.',
          'Wavy or Curved Line: Reveals adaptability, creative flair, and humor under stress.',
          'Line Above Signature: Shows protective instincts and a desire for intellectual recognition.'
        ]
      },
      {
        title: '2. Signature Placement & Margins',
        desc: 'Where you place your signature on a document indicates your boundary preferences.',
        details: [
          'Right Side: Optimism, forward-thinking mindset, and eagerness for future opportunities.',
          'Center: Balance, desire for attention, and comfort in group situations.',
          'Left Side: Attachment to the past, caution, and reserved social demeanor.'
        ]
      },
      {
        title: '3. Discrepancies Between Writing & Signature',
        desc: 'Contrasting your signature with your body text reveals your public vs private persona.',
        details: [
          'Larger Signature: High self-esteem in public, though private self may be more humble.',
          'Smaller Signature: Modesty, desire for privacy, preferring actions over public praise.',
          'Slant Mismatch: A right-slant signature with vertical text suggests outward friendliness masking inner emotional detachment.'
        ]
      }
    ],
    faqs: [
      { q: 'Can changing my signature change my personality?', a: 'Yes. Through Graphotherapy, consciously practicing a balanced signature with a steady underline builds long-term confidence and reduces self-sabotaging mental habits.' },
      { q: 'Is a unreadable signature bad?', a: 'An illegible signature often means you value privacy or work at high speed, but it can also signal a desire to remain emotionally guarded.' }
    ]
  },
  'handwriting-slant': {
    title: 'Handwriting Slant Psychology & Emotional Response',
    subtitle: 'How your slant reveals emotional expression, empathy, and decision-making styles.',
    description: 'The slant of handwriting is the emotional barometer of the personality. It indicates how freely you express your feelings to others and how you respond to emotional situations.',
    category: 'Graphology',
    image: '/images/astrology_card_hero.png',
    keyTakeaways: [
      'Right Slant (FA/FB/FC): Emotional expressiveness, social warmth, and empathy.',
      'Vertical Slant (AB): Head-over-heart decision making, logic, and self-control.',
      'Left Slant (FA/FB Backward): Reservation, emotional guard, and self-reliance.',
      'Variable Slant: Unpredictable moods, adaptability, or ongoing inner conflict.'
    ],
    sections: [
      {
        title: '1. Rightward Slant (FA - FC)',
        desc: 'Writing that slants towards the right moves towards the future and towards other people.',
        details: [
          'Mild Right Slant: Friendly, sympathetic, responsive to praise and social connection.',
          'Extreme Right Slant: Highly impulsive, emotionally intense, easily hurt by criticism.',
          'Social Style: Thrives in team environments and outward-facing leadership roles.'
        ]
      },
      {
        title: '2. Vertical Slant (AB)',
        desc: 'Upright writing stays grounded in the present moment.',
        details: [
          'Emotional Style: Keeps emotions under firm conscious control during crises.',
          'Decision Making: Evaluates facts objectively without letting feelings cloud judgment.',
          'Work Environment: Excellent for analytical, legal, financial, and strategic fields.'
        ]
      },
      {
        title: '3. Leftward Slant (Reversed)',
        desc: 'Writing that leans back towards the left margin moves towards the past and self-preservation.',
        details: [
          'Emotional Protection: Reluctant to reveal vulnerabilities to new acquaintances.',
          'Independence: Highly self-sufficient, requiring little external validation.',
          'Family Bonds: Deep attachment to childhood memories, family history, and roots.'
        ]
      }
    ],
    faqs: [
      { q: 'Why does my slant change when I write fast?', a: 'Writing fast forces your true emotional tendencies to surface. If your slant shifts right under speed, you are naturally more social than you consciously project.' }
    ]
  },
  'graphotherapy': {
    title: '21-Day Graphotherapy Protocol & Neuro-Rewiring',
    subtitle: 'Reprogram subconscious habit loops by altering specific stroke formations.',
    description: 'Graphotherapy is the reverse application of graphology. Since your brain controls your hand movements, changing specific physical strokes in your handwriting sends neuro-feedback signals back to your brain, creating new synaptic connections over 21 consecutive days.',
    category: 'Graphology',
    image: '/images/cosmic_synthesis_realistic.png',
    keyTakeaways: [
      'Neuro-Feedback Loop: Mind shapes writing, and writing reshapes mind.',
      '21-Day Habit Loop: Required duration to establish new motor-cortex neural pathways.',
      'Willpower Enhancement: Raising letter "t" crossbars boosts determination.',
      'Self-Esteem Building: Eliminating low bars and strike-throughs reduces self-criticism.',
      'Emotional Release: Opening lower loops in "g" and "y" releases subconscious blocks.'
    ],
    sections: [
      {
        title: '1. The Science of Somatic Brain-Writing',
        desc: 'How motor-cortex training modifies subconscious cognitive behavior.',
        details: [
          'Synaptic Plasticity: Repetitive precise strokes form new neural pathways in 21 days.',
          'Motor Memory Consolidation: Once learned, positive strokes run on autopilot.',
          'Stress Reduction: Smoothing jagged angular strokes lowers nervous tension.'
        ]
      },
      {
        title: '2. Essential Graphotherapy Exercises',
        desc: 'Key strokes used to correct negative behavioral patterns.',
        details: [
          'High "t" Crossbar: Practice placing the crossbar at the top 3/4 of the stem for high ambition.',
          'Starters without Hooks: Eliminate starting hooks to reduce unnecessary hesitation.',
          'Full Oval "o" and "a": Write clean ovals without inner knots for clear communication.'
        ]
      }
    ],
    faqs: [
      { q: 'How many minutes per day should I practice?', a: 'Practice for 10-15 minutes daily on an unruled sheet of paper in a calm environment.' }
    ]
  },
  'letter-formations': {
    title: 'Micro-Analysis of Letter Formations',
    subtitle: 'Deep dive into what specific letters ("t", "i", "g", "y", "o") reveal about intellect and drive.',
    description: 'Individual letter formations act as psychological micro-indicators. Small details—like where you dot your "i" or how wide you loop your "g"—provide astonishing insights into concentration, drive, and intimacy.',
    category: 'Graphology',
    image: '/images/step_analyze_realistic.png',
    keyTakeaways: [
      'Letter "t": Willpower, ambition, executive goal setting, and determination.',
      'Letter "i": Attention to detail, memory, concentration, and imagination.',
      'Letter "g" & "y": Physical vitality, material security, and relationship warmth.',
      'Vowels "o" & "a": Communication honesty, secrecy, and emotional clarity.'
    ],
    sections: [
      {
        title: '1. The Intellect Letters: "t" and "i"',
        desc: 'Revealing goal setting, discipline, and mental sharpness.',
        details: [
          'High T-Bar: High self-expectation and leadership vision.',
          'Low T-Bar: Setting targets below potential due to fear of failure.',
          'Close I-Dot: Exceptional memory, precision, and practical discipline.',
          'High Flying I-Dot: Creative idealism and expansive imagination.'
        ]
      },
      {
        title: '2. The Drive & Passion Letters: "g" and "y"',
        desc: 'Decoding lower-zone energy, physical stamina, and trust.',
        details: [
          'Full Broad Loop: Generous, passionate, seeking rich physical & material experiences.',
          'Stick/Straight Line: Highly practical, independent, preferring swift results over sentimentality.',
          'Unfinished Loop: Leaving emotional or financial projects incomplete.'
        ]
      }
    ],
    faqs: [
      { q: 'What does a circle dot on letter "i" mean?', a: 'A circle dot shows a desire to be unique, creative individualism, and artistic sensitivity.' }
    ]
  },
  'pressure-and-zones': {
    title: 'Pen Pressure & Three Writing Zones',
    subtitle: 'Analyzing physical stamina, emotional depth, and mental focus areas.',
    description: 'Handwriting is divided into three vertical zones: Upper (Intellectual), Middle (Social & Daily Life), and Lower (Physical & Material). Combined with pen pressure, this reveals energy distribution and vitality.',
    category: 'Graphology',
    image: '/images/astrology_zodiac_realistic.png',
    keyTakeaways: [
      'Heavy Pressure: High physical vitality, strong memory, intense feelings.',
      'Light Pressure: High sensitivity, empathy, spiritual orientation, flexibility.',
      'Upper Zone Dominance: Abstract thinking, philosophy, spirituality, and future planning.',
      'Middle Zone Dominance: Focus on current daily tasks, social life, and immediate relationships.',
      'Lower Zone Dominance: Groundedness, physical fitness, material security, and financial drive.'
    ],
    sections: [
      {
        title: '1. Pen Pressure & Emotional Energy',
        desc: 'How hard you press on paper reflects how deeply experiences register in your nervous system.',
        details: [
          'Heavy Pressure: Deep emotional retention, strong willpower, athletic energy.',
          'Medium Pressure: Balanced stamina, healthy adaptability to daily stress.',
          'Light Pressure: Gentle, intuitive, prefers peaceful environments over high conflict.'
        ]
      },
      {
        title: '2. The Three Writing Zones Explored',
        desc: 'Understanding vertical emphasis on the writing line.',
        details: [
          'Upper Zone (t, d, h, l): Represents ideals, spiritual aspirations, and long-term goals.',
          'Middle Zone (a, e, i, o, u, m, n): Represents daily routines, emotional balance, and social interactions.',
          'Lower Zone (g, j, p, q, y, z): Represents instinct, physical drive, wealth creation, and security.'
        ]
      }
    ],
    faqs: [
      { q: 'Can pressure change based on tiredness?', a: 'Yes. Physical exhaustion decreases pen pressure temporarily, showing how directly handwriting reflects nervous system vitality.' }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(GRAPHOLOGY_TOPICS).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const data = GRAPHOLOGY_TOPICS[topic];
  if (!data) return { title: 'Graphology Topic Not Found' };
  return {
    title: `${data.title} | OM Astrology AMC`,
    description: data.subtitle,
  };
}

export default async function GraphologyTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const data = GRAPHOLOGY_TOPICS[topic];

  if (!data) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Back Link */}
        <Link href="/graphology" className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Graphology Guide
        </Link>

        {/* Hero Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-gray-200/80 pb-10">
          <div className="md:col-span-8 space-y-4">
            <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <PenTool className="w-4 h-4" /> {data.category} Deep-Dive
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
              <Sparkles className="w-5 h-5 text-[var(--gold)]" /> Key Insights & Summary
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
            In-Depth Analysis & Scientific Principles
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
        <SEOInternalMesh currentCategory="graphology" />

        {/* Active Batches Showcase */}
        <div className="border-t border-gray-200/60 pt-12">
          <CategoryBatchesList category="Graphology" />
        </div>

        {/* Booking Consultation Widget */}
        <div className="border-t border-gray-200/60 pt-12 pb-6">
          <CategoryBookingWidget category="Graphology" />
        </div>
      </div>
    </div>
  );
}
