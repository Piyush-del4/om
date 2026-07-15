'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Eye, BookOpen, Layers } from 'lucide-react';
import { GoldButton } from './GoldButton';
import { GoldCard } from './GoldCard';
import { TarotCardArt } from './TarotCardArt';

// 22 Major Arcana Database
const MAJOR_ARCANA = [
  { name: 'The Fool', num: 0, meaning: 'New beginnings, spontaneity, faith in the universe, fresh journeys.', reverse: 'Recklessness, risk-taking, holding back.' },
  { name: 'The Magician', num: 1, meaning: 'Manifestation, personal power, resourcefulness, deliberate action.', reverse: 'Illusions, manipulation, untapped potential.' },
  { name: 'The High Priestess', num: 2, meaning: 'Intuition, subconscious realms, divine mysteries, inner wisdom.', reverse: 'Secrets, ignored intuition, surface-level focus.' },
  { name: 'The Empress', num: 3, meaning: 'Abundance, creativity, maternal energy, connection to nature.', reverse: 'Creative blocks, dependence, smothering.' },
  { name: 'The Emperor', num: 4, meaning: 'Structure, stability, authority, logical thinking, protection.', reverse: 'Tyranny, lack of discipline, rigidity.' },
  { name: 'The Hierophant', num: 5, meaning: 'Tradition, spiritual wisdom, search for truth, shared beliefs.', reverse: 'Rebellion, unconventional paths, restriction.' },
  { name: 'The Lovers', num: 6, meaning: 'Relationships, choices, personal alignment, values harmony.', reverse: 'Disharmony, misalignment of values, avoidance.' },
  { name: 'The Chariot', num: 7, meaning: 'Willpower, focus, control, victory over adversity.', reverse: 'Lack of direction, loss of control, aggression.' },
  { name: 'Strength', num: 8, meaning: 'Courage, patience, inner fortitude, quiet influence.', reverse: 'Self-doubt, weakness, raw raw emotion.' },
  { name: 'The Hermit', num: 9, meaning: 'Inner reflection, solitude, search for self, guiding light.', reverse: 'Loneliness, isolation, withdrawal.' },
  { name: 'Wheel of Fortune', num: 10, meaning: 'Destiny cycles, good luck, turning points, inevitable change.', reverse: 'Bad luck, resistance to change, breaking cycles.' },
  { name: 'Justice', num: 11, meaning: 'Truth, fairness, integrity, cause and effect.', reverse: 'Dishonesty, unfairness, unaccountability.' },
  { name: 'The Hanged Man', num: 12, meaning: 'Surrender, new perspective, letting go, pause in action.', reverse: 'Stalling, needless sacrifice, resistance.' },
  { name: 'Death', num: 13, meaning: 'Transformation, necessary endings, clearing the path, rebirth.', reverse: 'Fear of change, stagnation, decay.' },
  { name: 'Temperance', num: 14, meaning: 'Balance, moderation, alchemy, finding middle ground.', reverse: 'Excess, imbalance, discord.' },
  { name: 'The Devil', num: 15, meaning: 'Attachment, shadow self, temptation, perceived restriction.', reverse: 'Release, reclaiming power, breaking chains.' },
  { name: 'The Tower', num: 16, meaning: 'Sudden upheaval, revelation, structures breaking down.', reverse: 'Avoiding disaster, fear of collapse, delayed changes.' },
  { name: 'The Star', num: 17, meaning: 'Hope, faith, healing, spiritual renewal, peace.', reverse: 'Despair, lack of faith, discouragement.' },
  { name: 'The Moon', num: 18, meaning: 'Subconscious fears, illusion, dream messages, navigating uncertainty.', reverse: 'Release of fear, revealing secrets, clarity.' },
  { name: 'The Sun', num: 19, meaning: 'Success, joy, warmth, absolute clarity, vitality.', reverse: 'Temporary cloudiness, pessimism, false pride.' },
  { name: 'Judgement', num: 20, meaning: 'Rebirth, call to purpose, self-evaluation, absolution.', reverse: 'Self-doubt, ignoring the call, indecisiveness.' },
  { name: 'The World', num: 21, meaning: 'Completion, travel, integration, absolute harmony.', reverse: 'Incomplete goals, delays, shortcuts.' }
];

interface DrawnCard {
  slotId: number;
  cardIndex: number; // Index in MAJOR_ARCANA
  isReversed: boolean;
  revealed: boolean;
}

interface TarotSpreadWidgetProps {
  onSuitChange: (suit: 'none' | 'wands' | 'cups' | 'swords' | 'pentacles') => void;
  activeSuit: 'none' | 'wands' | 'cups' | 'swords' | 'pentacles';
}

export function TarotSpreadWidget({ onSuitChange, activeSuit }: TarotSpreadWidgetProps) {
  const [spread, setSpread] = useState<'daily' | 'threeCard' | 'celtic'>('daily');
  const [drawnCards, setDrawnCards] = useState<Record<number, DrawnCard>>({});
  const [activeSlotId, setActiveSlotId] = useState<number | null>(null);

  // Define slot layouts
  const dailySlots = [
    { id: 1, name: 'Daily Focus', desc: 'The overall theme of your day' }
  ];

  const threeCardSlots = [
    { id: 1, name: 'Past Roots', desc: 'Past events shaping this situation' },
    { id: 2, name: 'Present State', desc: 'Current energy and blockages' },
    { id: 3, name: 'Future Path', desc: 'Likely outcome if path is maintained' }
  ];

  const celticSlots = [
    { id: 1, name: 'The Present', desc: 'Your current situation and mindset' },
    { id: 2, name: 'The Obstacle', desc: 'Immediate challenges or crossing forces' },
    { id: 3, name: 'The Crown', desc: 'Your goals, aspirations, or best outcome' },
    { id: 4, name: 'The Root', desc: 'Subconscious drivers or deep past roots' },
    { id: 5, name: 'The Past', desc: 'Recent events that are passing away' },
    { id: 6, name: 'The Future', desc: 'Immediate developments in near future' },
    { id: 7, name: 'The Self', desc: 'Your attitude and internal stance' },
    { id: 8, name: 'Environment', desc: 'External factors, family, or partners' },
    { id: 9, name: 'Hopes & Fears', desc: 'Internal hopes, fears, or anxieties' },
    { id: 10, name: 'Final Outcome', desc: 'Long-term projection and guidance' }
  ];

  const currentSlots = spread === 'daily' ? dailySlots : spread === 'threeCard' ? threeCardSlots : celticSlots;

  const handleDrawCard = (slotId: number) => {
    if (drawnCards[slotId]?.revealed) {
      setActiveSlotId(slotId);
      return;
    }

    // Determine drawn indices to avoid duplicates
    const alreadyDrawn = Object.values(drawnCards).map((c) => c.cardIndex);
    const availableIndices = MAJOR_ARCANA.map((_, i) => i).filter((i) => !alreadyDrawn.includes(i));

    if (availableIndices.length === 0) return;

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const isReversed = Math.random() < 0.25; // 25% chance of card reversal

    const newDraw = {
      slotId,
      cardIndex: randomIndex,
      isReversed,
      revealed: true
    };

    setDrawnCards((prev) => ({ ...prev, [slotId]: newDraw }));
    setActiveSlotId(slotId);
  };

  const handleReset = () => {
    setDrawnCards({});
    setActiveSlotId(null);
  };

  const handleSpreadChange = (type: 'daily' | 'threeCard' | 'celtic') => {
    setSpread(type);
    setDrawnCards({});
    setActiveSlotId(null);
  };

  const activeDrawnCard = activeSlotId !== null ? drawnCards[activeSlotId] : null;
  const activeCardDetails = activeDrawnCard ? MAJOR_ARCANA[activeDrawnCard.cardIndex] : null;

  return (
    <div className="w-full space-y-8 relative z-20">
      {/* 1. Suit Element Selector Bar */}
      <div className="flex flex-col items-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">
          Select Element to Align Background Energy
        </span>
        <div className="flex flex-wrap justify-center gap-2 bg-neutral-900/60 p-1.5 rounded-full border border-[var(--gold-200)]">
          {[
            { id: 'none', label: 'Neutral ✨', style: 'hover:text-[var(--gold)] text-gray-400' },
            { id: 'wands', label: 'Fire 🔥 (Wands)', style: 'hover:text-red-400 text-gray-400' },
            { id: 'cups', label: 'Water 💧 (Cups)', style: 'hover:text-blue-400 text-gray-400' },
            { id: 'swords', label: 'Air 💨 (Swords)', style: 'hover:text-purple-300 text-gray-400' },
            { id: 'pentacles', label: 'Earth 🪨 (Pentacles)', style: 'hover:text-green-400 text-gray-400' }
          ].map((s) => {
            const isActive = activeSuit === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSuitChange(s.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${s.style} ${
                  isActive
                    ? 'bg-[var(--gold)] text-black font-semibold shadow-[0_0_10px_rgba(204,143,51,0.4)]'
                    : ''
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Spread Type Picker */}
      <div className="flex justify-center gap-4">
        {[
          { id: 'daily', label: 'Daily Focus (1 Card)' },
          { id: 'threeCard', label: 'Past, Present, Future (3 Cards)' },
          { id: 'celtic', label: 'Celtic Cross Layout (10 Cards)' }
        ].map((type) => {
          const isActive = spread === type.id;
          return (
            <button
              key={type.id}
              onClick={() => handleSpreadChange(type.id as any)}
              className={`px-5 py-2 border rounded-xl text-xs tracking-wider uppercase font-semibold transition-all duration-300 ${
                isActive
                  ? 'border-transparent bg-white text-black shadow-lg shadow-white/10'
                  : 'border-[var(--gold-200)] text-[var(--gold)] hover:bg-[var(--gold-50)]'
              }`}
            >
              {type.label}
            </button>
          );
        })}
      </div>

      {/* 3. Interactive Reading Area */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">
        {/* Left/Middle: The Spread Grid */}
        <div className="flex-1 flex flex-col items-center justify-center bg-neutral-950/40 border border-neutral-800 rounded-3xl p-6 min-h-[450px] relative overflow-hidden">
          {/* Celtic Cross Grid */}
          {spread === 'celtic' ? (
            <div className="w-full max-w-2xl flex flex-col md:flex-row gap-8 items-center justify-center py-6">
              {/* The Cross (Grid of cards 1-6) */}
              <div className="relative w-[280px] h-[340px] flex-shrink-0">
                {/* Card 3 (Crown - Top) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                  <TarotSlot slot={celticSlots[2]} drawn={drawnCards[3]} onDraw={() => handleDrawCard(3)} />
                </div>
                {/* Card 4 (Root - Bottom) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                  <TarotSlot slot={celticSlots[3]} drawn={drawnCards[4]} onDraw={() => handleDrawCard(4)} />
                </div>
                {/* Card 5 (Passing Past - Left) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0">
                  <TarotSlot slot={celticSlots[4]} drawn={drawnCards[5]} onDraw={() => handleDrawCard(5)} />
                </div>
                {/* Card 6 (Immediate Future - Right) */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0">
                  <TarotSlot slot={celticSlots[5]} drawn={drawnCards[6]} onDraw={() => handleDrawCard(6)} />
                </div>
                {/* Card 1 & 2 (Present and Obstacle - Center) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <TarotSlot slot={celticSlots[0]} drawn={drawnCards[1]} onDraw={() => handleDrawCard(1)} />
                </div>
                {/* Card 2 (Obstacle - Crossing present) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rotate-90 z-20 scale-95 origin-center shadow-[0_0_12px_rgba(0,0,0,0.5)]">
                  <TarotSlot slot={celticSlots[1]} drawn={drawnCards[2]} onDraw={() => handleDrawCard(2)} />
                </div>
              </div>

              {/* The Staff (Vertical line 7-10 on the right) */}
              <div className="flex md:flex-col-reverse gap-4 justify-center items-center flex-wrap">
                {[7, 8, 9, 10].map((id) => (
                  <div key={id} className="relative">
                    <TarotSlot slot={celticSlots[id - 1]} drawn={drawnCards[id]} onDraw={() => handleDrawCard(id)} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Daily and Three Card Layout */
            <div className="flex flex-wrap gap-8 justify-center items-center">
              {currentSlots.map((slot) => (
                <TarotSlot
                  key={slot.id}
                  slot={slot}
                  drawn={drawnCards[slot.id]}
                  onDraw={() => handleDrawCard(slot.id)}
                />
              ))}
            </div>
          )}

          {/* Reset Button */}
          {Object.keys(drawnCards).length > 0 && (
            <button
              onClick={handleReset}
              className="absolute bottom-4 right-4 flex items-center gap-1 text-[var(--gold)] text-[10px] tracking-wider uppercase border border-[var(--gold-200)] px-3 py-1 rounded-full hover:bg-[var(--gold-50)] transition-all duration-300"
            >
              <RefreshCw className="w-3 h-3" /> Reset Spread
            </button>
          )}
        </div>

        {/* Right: Active Card Meaning and Details */}
        <AnimatePresence mode="wait">
          {activeCardDetails && activeDrawnCard ? (
            <motion.div
              key={activeSlotId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full lg:w-[350px] flex-shrink-0 flex"
            >
              <GoldCard theme="dark" className="border border-[var(--gold-300)] p-6 flex flex-col justify-between w-full relative overflow-hidden">
                <div className="absolute top-2 right-2 p-1.5 bg-white/5 border border-white/10 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">
                      Active Slot: {currentSlots.find((s) => s.id === activeSlotId)?.name}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-1">
                      {activeCardDetails.name} {activeDrawnCard.isReversed && <span className="text-red-400 text-xs italic font-sans block">(Reversed)</span>}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs">
                      <strong className="text-[var(--gold)] uppercase tracking-wide block mb-1">Key Meanings:</strong>
                      <p className="text-gray-300 leading-relaxed font-light">
                        {activeDrawnCard.isReversed ? activeCardDetails.reverse : activeCardDetails.meaning}
                      </p>
                    </div>

                    <div className="text-xs border-t border-neutral-800 pt-3">
                      <strong className="text-[var(--gold)] uppercase tracking-wide block mb-1">Position Meaning:</strong>
                      <p className="text-gray-400 leading-normal font-light">
                        {currentSlots.find((s) => s.id === activeSlotId)?.desc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-neutral-850 pt-4 mt-6 flex justify-between items-center text-[10px] text-gray-500">
                  <span>Major Arcana · card {activeCardDetails.num}/21</span>
                  <span>Click slots to change selection</span>
                </div>
              </GoldCard>
            </motion.div>
          ) : (
            <div className="w-full lg:w-[350px] flex-shrink-0 flex items-center justify-center border border-dashed border-neutral-800 rounded-3xl p-6 text-center text-gray-500 text-xs font-light">
              <div className="space-y-2">
                <Layers className="w-8 h-8 mx-auto text-neutral-700 animate-pulse" />
                <p>Click any card slot in the spread to draw a card and reveal its deeper archetypal meaning here.</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Bounded Card Slot Component
interface TarotSlotProps {
  slot: { id: number; name: string; desc: string };
  drawn?: DrawnCard;
  onDraw: () => void;
}

function TarotSlot({ slot, drawn, onDraw }: TarotSlotProps) {

  return (
    <motion.div
      onClick={onDraw}
      className={`w-24 h-36 md:w-28 md:h-40 rounded-xl relative cursor-pointer overflow-hidden transition-all duration-300 ${
        drawn?.revealed
          ? 'bg-neutral-900 border border-[var(--gold-200)] shadow-lg shadow-[var(--gold-50)]/20'
          : 'border border-[var(--gold-100)]/30 bg-neutral-950 shadow-md hover:border-[var(--gold-100)] shadow-black/50'
      }`}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {drawn?.revealed ? (
        <div className="absolute inset-0 select-none">
          <TarotCardArt cardIndex={drawn.cardIndex} isReversed={drawn.isReversed} />
        </div>
      ) : (
        /* Ornate SVG Card Back - Realistic Gold/Geometric Design */
        <div className="absolute inset-0 bg-neutral-950 border-2 border-[var(--gold)] rounded-xl p-2 flex flex-col items-center justify-between select-none">
          <div className="absolute inset-1 border border-[var(--gold-200)]/40 rounded-lg pointer-events-none"></div>
          <div className="absolute top-2 left-2 text-[var(--gold)]/40 text-[8px] font-serif">✦</div>
          <div className="absolute top-2 right-2 text-[var(--gold)]/40 text-[8px] font-serif">✦</div>
          
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center space-y-3 w-full">
            <svg viewBox="0 0 100 100" className="w-12 h-12 text-[var(--gold)] opacity-85">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <path d="M50,15 L60,40 L85,50 L60,60 L50,85 L40,60 L15,50 L40,40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
            </svg>
            
            <div className="space-y-1 text-center px-1">
              <span className="text-[10px] md:text-[11px] font-serif font-bold text-[var(--gold)] tracking-wider block uppercase truncate max-w-full leading-tight">
                {slot.name}
              </span>
              <span className="text-[7px] text-neutral-400 block tracking-wider uppercase opacity-80 leading-none">
                Click to draw
              </span>
            </div>
          </div>
          
          <div className="absolute bottom-2 left-2 text-[var(--gold)]/40 text-[8px] font-serif">✦</div>
          <div className="absolute bottom-2 right-2 text-[var(--gold)]/40 text-[8px] font-serif">✦</div>
        </div>
      )}
    </motion.div>
  );
}
