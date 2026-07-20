'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, Shield, Sparkles, BookOpen } from 'lucide-react';
import { GoldCard } from '../../components/ui/GoldCard';
import { CategoryBookingWidget } from '../../components/ui/CategoryBookingWidget';
import { CategoryBatchesList } from '../../components/ui/CategoryBatchesList';
import { TarotHeroBackground } from '../../components/ui/TarotHeroBackground';
import { TarotSpreadWidget } from '../../components/ui/TarotSpreadWidget';

export default function TarotCardPage() {
  const [suit, setSuit] = useState<'none' | 'wands' | 'cups' | 'swords' | 'pentacles'>('none');

  const spreads = [
    { name: 'One-Card Pull', desc: 'Get a quick and direct answer to a single question you have in your mind.' },
    { name: 'Three-Card Spread', desc: 'Understand your situation by looking at your past, what is happening now, and what may come next.' },
    { name: 'Celtic Cross Spread (10 Cards)', desc: 'A detailed 10-card reading that covers your current situation, hidden influences, goals, and future guidance.' },
    { name: 'Love & Relationship Reading', desc: 'Find out about your love life, compatibility with your partner, and how to improve your relationship.' },
  ];

  const suits = [
    { name: 'Wands (Fire)', governs: 'Action, passion, career, energy, and inspiration.' },
    { name: 'Cups (Water)', governs: 'Feelings, relationships, emotions, connections, and dreams.' },
    { name: 'Swords (Air)', governs: 'Intellect, decisions, struggle, truth, and communication.' },
    { name: 'Pentacles (Earth)', governs: 'Finances, material work, health, stability, and family legacy.' },
  ];

  return (
    <div className="relative radial-mesh-bg min-h-screen bg-black overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-white">
      {/* Tarot Energy Particle Background */}
      <TarotHeroBackground suit={suit} />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Tarot Card Guidance
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            Understand Your Life Through <span className="gold-gradient-text">Tarot</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Tarot is not about telling the future. It is a tool that helps you understand your current situation, fears, and choices — so you can make better decisions in life.
          </p>
        </motion.div>

        {/* Section: Major vs Minor Arcana */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <GoldCard theme="dark" className="transition-spring">
              <div className="space-y-3 flex flex-col justify-center h-full">
                <h3 className="font-serif text-lg font-bold text-[var(--gold)] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--gold)]" /> The Major Arcana (22 Cards)
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  These 22 cards represent major events and big changes in your life. When one of these cards appears in your reading, it means something very important and life-changing is happening or is about to happen.
                </p>
              </div>
            </GoldCard>
            <GoldCard theme="dark" className="transition-spring">
              <div className="space-y-3 flex flex-col justify-center h-full">
                <h3 className="font-serif text-lg font-bold text-[var(--gold)] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[var(--gold)]" /> The Minor Arcana (56 Cards)
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  These 56 cards represent everyday situations and daily challenges. They are divided into 4 groups: Wands (work and energy), Cups (emotions and love), Swords (thinking and conflict), and Pentacles (money and health).
                </p>
              </div>
            </GoldCard>
          </div>
          <div className="lg:col-span-4 flex relative group">
            <div className="absolute inset-0 bg-[var(--gold)]/10 rounded-2xl blur-xl group-hover:bg-[var(--gold)]/20 transition-all duration-500"></div>
            <GoldCard flush theme="dark" className="flex-1 overflow-hidden min-h-[220px] transition-spring">
              <div className="relative w-full h-full overflow-hidden">
                <img src="/images/tarot_card_hero.png" alt="Tarot Deck" className="w-full h-full object-cover group-hover:scale-105 transition-spring duration-700" />
              </div>
            </GoldCard>
          </div>
        </div>

        {/* Section: The Fool's Journey */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
              The Fool's Journey (Psychological Maturity)
            </h2>
            <p className="text-gray-400 text-xs">
              The 22 Major Arcana cards tell the story of a person's journey through life — from the beginning to complete wisdom.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GoldCard className="transition-spring">
              <div className="space-y-2">
                <span className="text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">Phase 1: The Material World (Cards 1-7)</span>
                <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                  Cards 1 to 7 are about your early life and growing up. You learn about family, rules, society, and how to fit into the world around you.
                </p>
              </div>
            </GoldCard>
            <GoldCard className="transition-spring">
              <div className="space-y-2">
                <span className="text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">Phase 2: The Intuitive World (Cards 8-14)</span>
                <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                  Cards 8 to 14 are about looking inside yourself. You face challenges, go through changes, and learn to trust your inner voice. This phase is about personal growth and self-understanding.
                </p>
              </div>
            </GoldCard>
            <GoldCard className="transition-spring">
              <div className="space-y-2">
                <span className="text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">Phase 3: The Spiritual World (Cards 15-21)</span>
                <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                  Cards 15 to 21 are about facing deep fears, breaking free from old habits, and reaching a higher level of peace and understanding. This is the most transformational phase of the journey.
                </p>
              </div>
            </GoldCard>
          </div>
        </div>

        {/* Section: Major Arcana Deep-Dive */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
            Key Major Arcana Archetypes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GoldCard className="transition-spring">
              <div className="space-y-3">
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[var(--gold)] font-serif font-bold text-sm">0. The Fool</h4>
                  <span className="text-[9px] bg-[var(--gold-50)] text-gray-450 px-2 py-0.5 rounded border border-[var(--gold-200)] whitespace-nowrap">Air Element</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  <strong>Upright:</strong> New beginning, fresh start, excitement, trust, and a chance to take a leap of faith. <br />
                  <strong>Reversed:</strong> Being reckless, not thinking before acting, running away from problems, or being too afraid to start something new.
                </p>
              </div>
            </GoldCard>

            <GoldCard className="transition-spring">
              <div className="space-y-3">
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[var(--gold)] font-serif font-bold text-sm">I. The Magician</h4>
                  <span className="text-[9px] bg-[var(--gold-50)] text-gray-450 px-2 py-0.5 rounded border border-[var(--gold-200)] whitespace-nowrap">Mercury / Focus</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  <strong>Upright:</strong> You have all the skills and power you need. Focus, take action, and you can achieve your goal right now. <br />
                  <strong>Reversed:</strong> Misusing your skills, deceiving others, or letting your energy scatter without focus.
                </p>
              </div>
            </GoldCard>

            <GoldCard className="transition-spring">
              <div className="space-y-3">
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[var(--gold)] font-serif font-bold text-sm">II. The High Priestess</h4>
                  <span className="text-[9px] bg-[var(--gold-50)] text-gray-455 px-2 py-0.5 rounded border border-[var(--gold-200)] whitespace-nowrap">Moon / Intuition</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  <strong>Upright:</strong> Trust your gut feeling. Something is hidden right now — wait before making a decision. Wisdom is coming. <br />
                  <strong>Reversed:</strong> Ignoring your inner voice, letting secrets come out, feeling confused or misled.
                </p>
              </div>
            </GoldCard>

            <GoldCard className="transition-spring">
              <div className="space-y-3">
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[var(--gold)] font-serif font-bold text-sm">XIII. Death</h4>
                  <span className="text-[9px] bg-[var(--gold-50)] text-gray-455 px-2 py-0.5 rounded border border-[var(--gold-200)] whitespace-nowrap">Scorpio / Transition</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  <strong>Upright:</strong> Something is ending so something better can begin. A phase of your life is complete — let it go and move on. <br />
                  <strong>Reversed:</strong> Refusing to accept change, staying stuck in old patterns, fear of ending something that is no longer good for you.
                </p>
              </div>
            </GoldCard>
          </div>
        </div>

        {/* Dynamic Tarot Reading Widget */}
        <TarotSpreadWidget activeSuit={suit} onSuitChange={setSuit} />

        {/* Section: The Suits of the Minor Arcana */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
            The Suits & Elements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {suits.map((s) => (
              <GoldCard key={s.name} className="transition-spring">
                <div className="space-y-2">
                  <h4 className="text-[var(--gold)] font-serif font-bold text-sm mb-2">{s.name}</h4>
                  <p className="text-xs text-gray-405 leading-relaxed font-light">{s.governs}</p>
                </div>
              </GoldCard>
            ))}
          </div>
        </div>

        {/* Spreads Grid */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
            Reading Spread Formats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spreads.map((spread) => (
              <GoldCard key={spread.name} className="transition-spring">
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-[var(--gold)]">{spread.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">{spread.desc}</p>
                </div>
              </GoldCard>
            ))}
          </div>
        </div>

        {/* Section: Spreads Guide Deep-Dive */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
              Step-by-Step Spread Guides
            </h2>
            <p className="text-gray-400 text-xs">
              Understanding the layout positions is critical to extracting cohesive advice from card pulls.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GoldCard className="transition-spring">
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[var(--gold)]">The Celtic Cross (10 Cards)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-gray-400 font-light leading-relaxed">
                  <div>
                    <p><strong>1. Present Situation:</strong> Core theme/energy.</p>
                    <p><strong>2. Immediate Challenge:</strong> What blocks or assists you.</p>
                    <p><strong>3. Root Foundation:</strong> Subconscious origins.</p>
                    <p><strong>4. The Passing Past:</strong> Recent events/influences.</p>
                    <p><strong>5. Crown/Possibilities:</strong> Goals and best outcomes.</p>
                  </div>
                  <div>
                    <p><strong>6. Near Future:</strong> Imminent transitions.</p>
                    <p><strong>7. Self Perspective:</strong> Your attitude/fears.</p>
                    <p><strong>8. External Influences:</strong> Environment/other people.</p>
                    <p><strong>9. Hopes & Fears:</strong> Desires and anxieties.</p>
                    <p><strong>10. Ultimate Outcome:</strong> Resolving the question.</p>
                  </div>
                </div>
              </div>
            </GoldCard>

            <GoldCard className="transition-spring">
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[var(--gold)]">Alternative Reading Formats</h3>
                <div className="space-y-4 text-[11px] text-gray-405 font-light leading-relaxed">
                  <div className="space-y-1">
                    <span className="text-white text-xs font-bold font-mono">Past-Present-Future (3 Cards)</span>
                    <p>Card 1 outlines how you got here, Card 2 is the active energy to navigate now, Card 3 is the developmental trajectory if no adjustments are made.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white text-xs font-bold font-mono">Relationship Sync (4 Cards)</span>
                    <p>Card 1 is your emotional state, Card 2 is your partner's current energy, Card 3 is the mutual block, and Card 4 shows the growth potential.</p>
                  </div>
                </div>
              </div>
            </GoldCard>
          </div>
        </div>

        {/* Section: Preparation for Readings */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold border-b border-[var(--gold-200)] pb-3">
              Preparing for a Tarot Consultation
            </h2>
            <p className="text-gray-400 text-xs">
              Tarot is a collaborative energy work. Maximize the session's clarity by framing questions carefully.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GoldCard className="transition-spring">
              <div className="space-y-2">
                <span className="text-[var(--gold)] font-bold text-xs uppercase block">1. Formulate Open Questions</span>
                <p className="text-[10px] text-gray-405 leading-normal font-light">
                  Instead of "Will I get this job?" (which gives a passive yes/no), ask: "What energies should I embody to succeed in my interview?" or "How can I align with this career path?"
                </p>
              </div>
            </GoldCard>
            <GoldCard className="transition-spring">
              <div className="space-y-2">
                <span className="text-[var(--gold)] font-bold text-xs uppercase block">2. Clear Your Mind</span>
                <p className="text-[10px] text-gray-405 leading-normal font-light">
                  Take three deep breaths before the session. Clear active worries so your mind acts as a transparent lens, allowing the cards to mirror your true current state.
                </p>
              </div>
            </GoldCard>
            <GoldCard className="transition-spring">
              <div className="space-y-2">
                <span className="text-[var(--gold)] font-bold text-xs uppercase block">3. Embrace Detachment</span>
                <p className="text-[10px] text-gray-405 leading-normal font-light">
                  Avoid clinging to a specific answer. The cards show what you *need* to address, not always what you *want* to hear. Approach the layout with curiosity.
                </p>
              </div>
            </GoldCard>
          </div>
        </div>

        {/* Section: Ethics of Tarot */}
        <GoldCard theme="dark" className="max-w-3xl mx-auto transition-spring">
          <div className="space-y-4 text-center py-4">
            <h3 className="font-serif text-xl font-bold flex items-center justify-center gap-2 text-[var(--gold)]">
              <Shield className="w-5 h-5 text-[var(--gold)]" /> Tarot Reading Ethics
            </h3>
            <p className="text-gray-300 text-xs leading-relaxed max-w-2xl mx-auto font-light">
              Our readings are strictly confidential and empower you to make your own choices. We focus on giving you clarity on hidden barriers, current circumstances, and emotional dynamics, rather than trying to predict your future.
            </p>
          </div>
        </GoldCard>

        {/* Active Batches Showcase */}
        <div className="border-t border-neutral-800/60 pt-16">
          <CategoryBatchesList category="Tarot Card" />
        </div>

        {/* Booking Consultation Widget */}
        <div className="border-t border-neutral-800/60 pt-16 pb-8">
          <CategoryBookingWidget category="Tarot Card" />
        </div>
      </div>
    </div>
  );
}
