'use client';

import React from 'react';

interface TarotCardProps {
  cardIndex: number;
  isReversed?: boolean;
  className?: string;
}

// Shared card frame wrapper
function CardFrame({ numeral, name, children, color = '#c8920a' }: {
  numeral: string;
  name: string;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 200 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Card Background */}
      <defs>
        <linearGradient id={`bg-${numeral}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0a1e" />
          <stop offset="100%" stopColor="#1a1030" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      
      {/* Background */}
      <rect width="200" height="340" rx="12" fill={`url(#bg-${numeral})`} />
      
      {/* Outer border */}
      <rect x="4" y="4" width="192" height="332" rx="10" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
      
      {/* Inner border */}
      <rect x="8" y="8" width="184" height="324" rx="8" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
      
      {/* Corner ornaments */}
      <text x="16" y="24" fill={color} fontSize="12" opacity="0.8" textAnchor="middle">✦</text>
      <text x="184" y="24" fill={color} fontSize="12" opacity="0.8" textAnchor="middle">✦</text>
      <text x="16" y="330" fill={color} fontSize="12" opacity="0.8" textAnchor="middle">✦</text>
      <text x="184" y="330" fill={color} fontSize="12" opacity="0.8" textAnchor="middle">✦</text>
      
      {/* Numeral top */}
      <text x="100" y="30" fill={color} fontSize="13" textAnchor="middle" fontWeight="bold" letterSpacing="3" opacity="0.9">{numeral}</text>
      
      {/* Illustration area */}
      <rect x="16" y="38" width="168" height="222" rx="6" fill="#110d22" stroke={color} strokeWidth="0.8" opacity="0.4" />
      
      {/* Content group */}
      <g transform="translate(16, 38)">{children}</g>
      
      {/* Horizontal divider */}
      <line x1="20" y1="270" x2="180" y2="270" stroke={color} strokeWidth="0.8" opacity="0.5" />
      
      {/* Card name */}
      <text x="100" y="292" fill={color} fontSize="13" textAnchor="middle" fontWeight="bold" letterSpacing="1.5" fontFamily="Georgia, serif">{name}</text>
      
      {/* Bottom decorative dots */}
      <circle cx="80" cy="314" r="1.5" fill={color} opacity="0.5" />
      <circle cx="100" cy="314" r="2" fill={color} opacity="0.7" />
      <circle cx="120" cy="314" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

const CARD_ART: Record<number, React.ReactNode> = {
  // 0 - The Fool
  0: (
    <CardFrame numeral="0" name="THE FOOL" color="#f0c040">
      {/* Sky */}
      <rect width="168" height="222" rx="6" fill="#1a2540" />
      {/* Sun */}
      <circle cx="130" cy="40" r="25" fill="#f5d060" opacity="0.85" />
      <line x1="130" y1="8" x2="130" y2="0" stroke="#f5d060" strokeWidth="2" opacity="0.6" />
      <line x1="155" y1="15" x2="162" y2="8" stroke="#f5d060" strokeWidth="2" opacity="0.6" />
      <line x1="162" y1="40" x2="168" y2="40" stroke="#f5d060" strokeWidth="2" opacity="0.6" />
      <line x1="155" y1="65" x2="162" y2="72" stroke="#f5d060" strokeWidth="2" opacity="0.6" />
      {/* Mountains */}
      <path d="M0,180 L40,100 L80,155 L110,80 L168,180 Z" fill="#0d1a30" />
      <path d="M0,222 L0,180 L168,180 L168,222 Z" fill="#1a2e15" />
      {/* Cliff */}
      <rect x="40" y="145" width="60" height="77" rx="3" fill="#1a1a2e" />
      {/* Figure */}
      <circle cx="75" cy="120" r="12" fill="#f0c898" /> {/* Head */}
      <rect x="68" y="132" width="14" height="30" rx="3" fill="#8b6914" /> {/* Body */}
      <line x1="68" y1="138" x2="55" y2="148" stroke="#8b6914" strokeWidth="3" /> {/* Left arm */}
      <line x1="82" y1="138" x2="95" y2="130" stroke="#8b6914" strokeWidth="3" /> {/* Right arm holding staff */}
      <line x1="95" y1="100" x2="95" y2="170" stroke="#8b6914" strokeWidth="2.5" /> {/* Staff */}
      {/* Bag on staff */}
      <circle cx="95" cy="103" r="8" fill="#c8920a" opacity="0.8" />
      {/* Dog companion */}
      <ellipse cx="52" cy="163" rx="10" ry="7" fill="#d4a060" />
      <circle cx="57" cy="157" r="5" fill="#d4a060" />
      {/* White rose */}
      <circle cx="62" cy="148" r="5" fill="white" opacity="0.8" />
      {/* Hat feather */}
      <path d="M72,108 Q65,95 72,90 Q80,85 78,100" fill="none" stroke="#c8920a" strokeWidth="2" />
    </CardFrame>
  ),

  // 1 - The Magician
  1: (
    <CardFrame numeral="I" name="THE MAGICIAN" color="#c8920a">
      <rect width="168" height="222" rx="6" fill="#1e1030" />
      {/* Infinity symbol above head */}
      <path d="M64,22 C64,16 72,14 76,18 C80,22 88,22 92,18 C96,14 104,16 104,22 C104,28 96,30 92,26 C88,22 80,22 76,26 C72,30 64,28 64,22 Z" fill="none" stroke="#f0c040" strokeWidth="2" />
      {/* Table */}
      <rect x="20" y="130" width="128" height="10" rx="3" fill="#5c3d1e" />
      <line x1="30" y1="140" x2="30" y2="185" stroke="#5c3d1e" strokeWidth="6" />
      <line x1="138" y1="140" x2="138" y2="185" stroke="#5c3d1e" strokeWidth="6" />
      {/* Tools on table */}
      <circle cx="40" cy="126" r="8" fill="#c8920a" opacity="0.8" /> {/* Coin */}
      <path d="M65,115 L65,130" stroke="silver" strokeWidth="3" /> {/* Sword */}
      <path d="M62,115 L68,115" stroke="silver" strokeWidth="2" />
      <ellipse cx="90" cy="123" rx="12" ry="7" fill="#c04040" opacity="0.8" /> {/* Cup */}
      <rect x="110" y="116" width="12" height="14" rx="2" fill="#8b4513" /> {/* Wand */}
      {/* Figure body */}
      <circle cx="84" cy="68" r="16" fill="#f0c898" /> {/* Head */}
      <rect x="70" y="84" width="28" height="46" rx="4" fill="white" /> {/* Robe */}
      <rect x="64" y="84" width="8" height="3" rx="1" fill="#c8920a" /> {/* Belt part */}
      <rect x="98" y="84" width="8" height="3" rx="1" fill="#c8920a" />
      {/* Right arm raised with wand */}
      <line x1="98" y1="90" x2="120" y2="60" stroke="#f0c898" strokeWidth="5" />
      <line x1="120" y1="38" x2="120" y2="70" stroke="#8b4513" strokeWidth="3" />
      {/* Left arm pointing down */}
      <line x1="70" y1="95" x2="50" y2="120" stroke="#f0c898" strokeWidth="5" />
      {/* Red outer robe */}
      <path d="M68,84 L55,135 L113,135 L100,84 Z" fill="#c04040" opacity="0.6" />
      {/* White roses border */}
      <circle cx="20" cy="195" r="6" fill="white" opacity="0.6" />
      <circle cx="40" cy="205" r="5" fill="white" opacity="0.5" />
      <circle cx="140" cy="198" r="6" fill="white" opacity="0.6" />
      {/* Red roses */}
      <circle cx="30" cy="210" r="5" fill="#c04040" opacity="0.7" />
      <circle cx="130" cy="208" r="5" fill="#c04040" opacity="0.7" />
    </CardFrame>
  ),

  // 2 - The High Priestess
  2: (
    <CardFrame numeral="II" name="HIGH PRIESTESS" color="#8080ff">
      <rect width="168" height="222" rx="6" fill="#0d1225" />
      {/* Moon crescent at feet */}
      <path d="M64,205 C64,195 78,193 84,200 C90,193 104,195 104,205 C104,210 90,215 84,215 C78,215 64,210 64,205 Z" fill="none" stroke="silver" strokeWidth="1.5" opacity="0.8" />
      {/* Pillars */}
      <rect x="15" y="30" width="22" height="180" rx="3" fill="#1a1a3e" stroke="#8080ff" strokeWidth="1" opacity="0.8" />
      <text x="26" y="60" fill="#8080ff" fontSize="10" textAnchor="middle" opacity="0.9">B</text>
      <rect x="131" y="30" width="22" height="180" rx="3" fill="#3e3e1a" stroke="#f0c040" strokeWidth="1" opacity="0.8" />
      <text x="142" y="60" fill="#f0c040" fontSize="10" textAnchor="middle" opacity="0.9">J</text>
      {/* Veil/curtain */}
      <path d="M37,40 Q84,60 131,40 L131,200 Q84,185 37,200 Z" fill="#2a1040" opacity="0.6" />
      {/* Pomegranates on veil */}
      <circle cx="60" cy="120" r="5" fill="#8b0000" opacity="0.7" />
      <circle cx="84" cy="100" r="5" fill="#8b0000" opacity="0.7" />
      <circle cx="108" cy="130" r="5" fill="#8b0000" opacity="0.7" />
      <circle cx="72" cy="155" r="5" fill="#8b0000" opacity="0.7" />
      <circle cx="100" cy="160" r="5" fill="#8b0000" opacity="0.7" />
      {/* Figure */}
      <circle cx="84" cy="65" r="15" fill="#f0e8d8" /> {/* Head */}
      <rect x="72" y="80" width="24" height="50" rx="4" fill="#2a2a6e" /> {/* Blue robe */}
      {/* Crown */}
      <path d="M72,56 L76,46 L84,52 L92,46 L96,56 Z" fill="#f0c040" opacity="0.9" />
      <circle cx="84" cy="52" r="4" fill="#f0c040" />
      {/* Scroll - TORA */}
      <rect x="72" y="100" width="24" height="18" rx="2" fill="#f5e8c8" opacity="0.9" />
      <text x="84" y="113" fill="#5c3d1e" fontSize="8" textAnchor="middle" fontWeight="bold">TORA</text>
      {/* Cross on chest */}
      <line x1="84" y1="83" x2="84" y2="96" stroke="#c8920a" strokeWidth="2" />
      <line x1="78" y1="88" x2="90" y2="88" stroke="#c8920a" strokeWidth="2" />
      {/* White robe hem */}
      <path d="M67,128 Q84,140 101,128 L110,210 L58,210 Z" fill="#e8e4f0" opacity="0.7" />
    </CardFrame>
  ),

  // 3 - The Empress
  3: (
    <CardFrame numeral="III" name="THE EMPRESS" color="#c8920a">
      <rect width="168" height="222" rx="6" fill="#1a2010" />
      {/* Nature background */}
      <rect x="0" y="100" width="168" height="122" rx="0" fill="#0d1a08" />
      {/* Trees */}
      <path d="M10,100 L25,60 L40,100 Z" fill="#2a4a1a" />
      <rect x="22" y="100" width="6" height="30" fill="#5c3d1e" />
      <path d="M130,100 L148,55 L165,100 Z" fill="#2a4a1a" />
      <rect x="145" y="100" width="6" height="30" fill="#5c3d1e" />
      {/* Waterfall/stream */}
      <path d="M140,60 Q155,80 148,120 Q142,150 150,180 L165,180 Q158,145 160,120 Q168,80 160,55 Z" fill="#2050a0" opacity="0.4" />
      {/* Wheat sheaves */}
      <path d="M55,145 Q60,120 70,125 Q65,130 60,150 Z" fill="#c8b820" opacity="0.8" />
      <path d="M60,145 Q65,120 75,125 Q70,130 65,150 Z" fill="#c8b820" opacity="0.8" />
      {/* Throne/cushion */}
      <path d="M35,130 L50,105 L120,105 L135,130 L130,210 L38,210 Z" fill="#c04040" opacity="0.7" />
      {/* Pillow cushion */}
      <ellipse cx="84" cy="108" rx="35" ry="10" fill="#c8920a" opacity="0.8" />
      {/* Empress figure */}
      <circle cx="84" cy="75" r="16" fill="#f0c898" /> {/* Head */}
      <path d="M65,92 L55,180 L115,180 L105,92 Z" fill="#a8d080" opacity="0.85" /> {/* Robe */}
      {/* Star crown */}
      <path d="M72,62 L76,52 L80,62 L84,50 L88,62 L92,52 L96,62 Z" fill="#f0c040" opacity="0.9" />
      <circle cx="84" cy="52" r="3" fill="white" opacity="0.9" />
      {/* Sceptre */}
      <line x1="108" y1="75" x2="115" y2="130" stroke="#8b4513" strokeWidth="3" />
      <circle cx="108" cy="73" r="5" fill="#f0c040" />
      {/* Venus shield */}
      <circle cx="60" cy="108" r="10" fill="none" stroke="#c8920a" strokeWidth="2" />
      <text x="60" y="112" fill="#c8920a" fontSize="10" textAnchor="middle">♀</text>
      {/* Flowers */}
      <circle cx="30" cy="195" r="6" fill="#ff80a0" opacity="0.7" />
      <circle cx="50" cy="200" r="5" fill="#ff80a0" opacity="0.6" />
      <circle cx="140" cy="198" r="6" fill="#ffb040" opacity="0.7" />
    </CardFrame>
  ),

  // 4 - The Emperor
  4: (
    <CardFrame numeral="IV" name="THE EMPEROR" color="#c04040">
      <rect width="168" height="222" rx="6" fill="#1a0808" />
      {/* Rocky mountain background */}
      <path d="M0,100 L45,50 L90,80 L130,30 L168,80 L168,222 L0,222 Z" fill="#3a1a1a" opacity="0.8" />
      {/* Stone throne */}
      <rect x="30" y="80" width="108" height="130" rx="5" fill="#3a3a3a" />
      {/* Ram heads on throne corners */}
      <circle cx="35" cy="85" r="8" fill="#2a2a2a" />
      <path d="M28,80 Q22,70 30,72 Q35,68 35,75" fill="none" stroke="#888" strokeWidth="1.5" />
      <circle cx="133" cy="85" r="8" fill="#2a2a2a" />
      <path d="M140,80 Q146,70 138,72 Q133,68 133,75" fill="none" stroke="#888" strokeWidth="1.5" />
      {/* Emperor figure */}
      <circle cx="84" cy="68" r="16" fill="#f0c898" /> {/* Head */}
      {/* Beard */}
      <path d="M75,76 Q84,90 93,76" fill="#888" opacity="0.9" />
      {/* Crown */}
      <path d="M70,58 L74,46 L78,58 L84,44 L90,58 L94,46 L98,58 L70,58 Z" fill="#f0c040" />
      {/* Red robe */}
      <path d="M65,84 L55,190 L113,190 L103,84 Z" fill="#c04040" opacity="0.9" />
      {/* Armor/breastplate */}
      <ellipse cx="84" cy="100" rx="22" ry="18" fill="#5a5a5a" />
      <path d="M65,95 L103,95" stroke="#888" strokeWidth="1" />
      <path d="M65,105 L103,105" stroke="#888" strokeWidth="1" />
      {/* Sceptre - Ankh */}
      <line x1="110" y1="80" x2="115" y2="160" stroke="#f0c040" strokeWidth="3" />
      <ellipse cx="110" cy="72" rx="6" ry="9" fill="none" stroke="#f0c040" strokeWidth="2" />
      <line x1="105" y1="80" x2="118" y2="80" stroke="#f0c040" strokeWidth="2" />
      {/* Orb */}
      <circle cx="56" cy="110" r="10" fill="#f0c040" opacity="0.7" />
      <line x1="56" y1="100" x2="56" y2="110" stroke="#c04040" strokeWidth="2" />
      <line x1="51" y1="105" x2="61" y2="105" stroke="#c04040" strokeWidth="2" />
    </CardFrame>
  ),

  // 5 - The Hierophant
  5: (
    <CardFrame numeral="V" name="THE HIEROPHANT" color="#8050c0">
      <rect width="168" height="222" rx="6" fill="#10081a" />
      {/* Gray stone pillars */}
      <rect x="10" y="25" width="25" height="195" rx="3" fill="#3a3a4a" />
      <rect x="133" y="25" width="25" height="195" rx="3" fill="#3a3a4a" />
      {/* Gray pillar caps */}
      <rect x="8" y="22" width="29" height="8" rx="2" fill="#555" />
      <rect x="131" y="22" width="29" height="8" rx="2" fill="#555" />
      {/* Throne backing */}
      <rect x="35" y="30" width="98" height="160" rx="5" fill="#1a1230" />
      {/* Cross on throne */}
      <line x1="84" y1="35" x2="84" y2="130" stroke="#f0c040" strokeWidth="3" opacity="0.4" />
      <line x1="55" y1="70" x2="113" y2="70" stroke="#f0c040" strokeWidth="3" opacity="0.4" />
      {/* Hierophant figure */}
      <circle cx="84" cy="68" r="16" fill="#f0c898" /> {/* Head */}
      {/* Triple crown/tiara */}
      <rect x="70" y="50" width="28" height="8" rx="2" fill="#f0c040" />
      <rect x="72" y="43" width="24" height="8" rx="2" fill="#f0c040" />
      <rect x="74" y="36" width="20" height="8" rx="2" fill="#f0c040" />
      {/* White outer robe */}
      <path d="M62,85 L50,190 L118,190 L106,85 Z" fill="white" opacity="0.85" />
      {/* Red robe under */}
      <path d="M68,85 L60,190 L108,190 L100,85 Z" fill="#c04040" opacity="0.8" />
      {/* Crossed key sceptre */}
      <line x1="108" y1="85" x2="112" y2="165" stroke="#f0c040" strokeWidth="3" />
      <line x1="104" y1="88" x2="116" y2="88" stroke="#f0c040" strokeWidth="2" />
      <circle cx="108" cy="83" r="5" fill="#f0c040" />
      {/* Triple cross on staff */}
      <line x1="100" y1="100" x2="118" y2="100" stroke="#f0c040" strokeWidth="1.5" />
      <line x1="103" y1="112" x2="118" y2="112" stroke="#f0c040" strokeWidth="1.5" />
      {/* Two kneeling monks */}
      <circle cx="50" cy="170" r="8" fill="#f0c898" />
      <rect x="43" y="178" width="14" height="20" rx="3" fill="#8050c0" opacity="0.8" />
      <circle cx="118" cy="170" r="8" fill="#f0c898" />
      <rect x="111" y="178" width="14" height="20" rx="3" fill="#c04040" opacity="0.8" />
      {/* Two keys crossed at feet */}
      <line x1="65" y1="200" x2="103" y2="215" stroke="#f0c040" strokeWidth="2" />
      <line x1="103" y1="200" x2="65" y2="215" stroke="#f0c040" strokeWidth="2" />
      <circle cx="60" cy="200" r="4" fill="#f0c040" opacity="0.8" />
      <circle cx="108" cy="215" r="4" fill="#f0c040" opacity="0.8" />
    </CardFrame>
  ),

  // 6 - The Lovers
  6: (
    <CardFrame numeral="VI" name="THE LOVERS" color="#ff8080">
      <rect width="168" height="222" rx="6" fill="#1a1030" />
      {/* Sky gradient */}
      <path d="M0,0 L168,0 L168,120 Q84,100 0,120 Z" fill="#ff9040" opacity="0.4" />
      {/* Sun/Angel rays */}
      <circle cx="84" cy="25" r="20" fill="#ff9040" opacity="0.6" />
      {/* Angel wings */}
      <path d="M84,25 Q50,0 20,20 Q50,30 64,55" fill="#c8c8ff" opacity="0.6" />
      <path d="M84,25 Q118,0 148,20 Q118,30 104,55" fill="#c8c8ff" opacity="0.6" />
      {/* Angel body */}
      <circle cx="84" cy="38" r="10" fill="#f0c898" />
      <path d="M78,48 L72,75 L96,75 L90,48 Z" fill="white" opacity="0.8" />
      {/* Adam - man figure */}
      <circle cx="55" cy="125" r="12" fill="#f0c898" />
      <rect x="48" y="137" width="14" height="40" rx="3" fill="#f0c898" opacity="0.9" />
      {/* Eve - woman figure */}
      <circle cx="115" cy="125" r="12" fill="#f0c898" />
      <rect x="108" y="137" width="14" height="40" rx="3" fill="#f0c898" opacity="0.9" />
      {/* Eve's hair */}
      <path d="M108,118 Q115,108 122,118" fill="#8b4513" stroke="#8b4513" strokeWidth="1" />
      {/* Apple tree behind Eve */}
      <rect x="120" y="115" width="5" height="65" fill="#5c3d1e" />
      <circle cx="122" cy="108" r="16" fill="#2a4a1a" />
      <circle cx="122" cy="108" r="5" fill="#c04040" opacity="0.8" />
      {/* Snake in tree */}
      <path d="M120,120 Q128,115 125,125 Q130,120 127,130" fill="none" stroke="#4a8a20" strokeWidth="2" />
      {/* Burning bush behind Adam */}
      <rect x="45" y="125" width="5" height="55" fill="#5c3d1e" />
      <circle cx="47" cy="120" r="14" fill="#2a4a1a" />
      {/* Fire in bush */}
      <path d="M42,120 Q47,110 52,120 Q47,112 47,120" fill="#ff8020" opacity="0.7" />
      {/* Ground */}
      <rect x="0" y="185" width="168" height="37" rx="0" fill="#2a4a1a" opacity="0.6" />
    </CardFrame>
  ),

  // 7 - The Chariot
  7: (
    <CardFrame numeral="VII" name="THE CHARIOT" color="#f0c040">
      <rect width="168" height="222" rx="6" fill="#101825" />
      {/* City skyline background */}
      <rect x="0" y="120" width="168" height="102" fill="#0d1020" />
      <rect x="10" y="110" width="20" height="55" fill="#1a2030" />
      <rect x="40" y="100" width="15" height="65" fill="#1a2030" />
      <rect x="130" y="108" width="25" height="57" fill="#1a2030" />
      {/* River at bottom */}
      <rect x="0" y="175" width="168" height="47" rx="0" fill="#1a3050" opacity="0.6" />
      {/* Chariot canopy */}
      <rect x="20" y="75" width="128" height="10" rx="3" fill="#c8920a" />
      <rect x="25" y="45" width="118" height="30" rx="5" fill="#1a2040" stroke="#c8920a" strokeWidth="1.5" />
      {/* Stars on canopy */}
      <text x="45" y="65" fill="#f0f0ff" fontSize="8">✦</text>
      <text x="68" y="60" fill="#f0f0ff" fontSize="8">★</text>
      <text x="90" y="65" fill="#f0f0ff" fontSize="8">✦</text>
      <text x="112" y="60" fill="#f0f0ff" fontSize="8">★</text>
      <text x="130" y="65" fill="#f0f0ff" fontSize="7">✦</text>
      {/* Chariot body */}
      <rect x="30" y="85" width="108" height="65" rx="4" fill="#2a3a5a" stroke="#c8920a" strokeWidth="1.5" />
      {/* Winged sun disc on chariot */}
      <circle cx="84" cy="105" r="12" fill="#f0c040" opacity="0.7" />
      <path d="M72,105 Q60,95 50,100" fill="none" stroke="#f0c040" strokeWidth="2" />
      <path d="M96,105 Q108,95 118,100" fill="none" stroke="#f0c040" strokeWidth="2" />
      {/* Charioteer figure */}
      <circle cx="84" cy="70" r="12" fill="#f0c898" />
      {/* Star crown */}
      <path d="M76,62 L84,50 L92,62 Z" fill="#f0c040" />
      <circle cx="84" cy="50" r="4" fill="white" />
      {/* Armor */}
      <ellipse cx="84" cy="82" rx="14" ry="10" fill="#5a5a7a" />
      {/* Wand/sceptre */}
      <line x1="100" y1="65" x2="105" y2="85" stroke="#8b4513" strokeWidth="2.5" />
      {/* Two sphinxes */}
      {/* Black sphinx */}
      <ellipse cx="45" cy="158" rx="18" ry="10" fill="#1a1a1a" />
      <circle cx="38" cy="150" r="8" fill="#1a1a1a" />
      <path d="M35,148 L38,140 L42,148" fill="#c8920a" opacity="0.5" />
      {/* White sphinx */}
      <ellipse cx="123" cy="158" rx="18" ry="10" fill="#d8d8d8" />
      <circle cx="130" cy="150" r="8" fill="#d8d8d8" />
      <path d="M127,148 L130,140 L134,148" fill="#c8920a" opacity="0.5" />
      {/* Chariot wheels */}
      <circle cx="50" cy="165" r="14" fill="none" stroke="#c8920a" strokeWidth="2" />
      <circle cx="50" cy="165" r="4" fill="#c8920a" />
      <circle cx="118" cy="165" r="14" fill="none" stroke="#c8920a" strokeWidth="2" />
      <circle cx="118" cy="165" r="4" fill="#c8920a" />
    </CardFrame>
  ),

  // 8 - Strength
  8: (
    <CardFrame numeral="VIII" name="STRENGTH" color="#f0c040">
      <rect width="168" height="222" rx="6" fill="#1a1505" />
      {/* Landscape */}
      <path d="M0,140 L60,100 L120,125 L168,95 L168,222 L0,222 Z" fill="#1a2a10" opacity="0.8" />
      {/* Mountain */}
      <path d="M100,140 L130,80 L160,140 Z" fill="#3a3a2a" opacity="0.7" />
      {/* Infinity symbol above woman */}
      <path d="M62,28 C62,22 70,20 74,24 C78,28 86,28 90,24 C94,20 102,22 102,28 C102,34 94,36 90,32 C86,28 78,28 74,32 C70,36 62,34 62,28 Z" fill="none" stroke="#f0c040" strokeWidth="2.5" />
      {/* Woman figure */}
      <circle cx="84" cy="72" r="15" fill="#f0c898" /> {/* Head */}
      {/* Flower garland on head */}
      <path d="M72,68 Q84,58 96,68" fill="none" stroke="#ff8080" strokeWidth="2" />
      <circle cx="76" cy="67" r="3" fill="#ff8080" />
      <circle cx="84" cy="62" r="3" fill="#ff80ff" />
      <circle cx="92" cy="67" r="3" fill="#ff8080" />
      {/* White robe */}
      <path d="M68,88 L58,190 L110,190 L100,88 Z" fill="white" opacity="0.85" />
      {/* Flower belt */}
      <path d="M63,110 Q84,118 105,110" fill="none" stroke="#ff8080" strokeWidth="2" />
      {/* Lion */}
      <ellipse cx="60" cy="155" rx="38" ry="25" fill="#c8a030" opacity="0.8" />
      <circle cx="42" cy="145" r="20" fill="#c8a030" opacity="0.9" />
      {/* Lion mane */}
      <circle cx="42" cy="145" r="25" fill="#8b6020" opacity="0.5" />
      {/* Lion face */}
      <ellipse cx="42" cy="145" r="12" fill="#d4a840" />
      <circle cx="37" cy="142" r="3" fill="#1a1a1a" /> {/* Eye */}
      <circle cx="47" cy="142" r="3" fill="#1a1a1a" />
      {/* Lion mouth being held by woman */}
      <path d="M35,152 Q42,158 49,152" fill="none" stroke="#1a1a1a" strokeWidth="2" />
      {/* Woman's arm on lion */}
      <line x1="68" y1="110" x2="52" y2="148" stroke="#f0c898" strokeWidth="6" />
      {/* Flowers at base */}
      <circle cx="20" cy="210" r="5" fill="#ff8080" opacity="0.6" />
      <circle cx="150" cy="208" r="5" fill="#ff8080" opacity="0.6" />
    </CardFrame>
  ),

  // 9 - The Hermit
  9: (
    <CardFrame numeral="IX" name="THE HERMIT" color="#e0e0e0">
      <rect width="168" height="222" rx="6" fill="#080808" />
      {/* Night mountain peak */}
      <path d="M0,180 L60,60 L110,100 L168,50 L168,222 L0,222 Z" fill="#151515" />
      <path d="M40,222 L84,80 L128,222 Z" fill="#1a1a1a" />
      {/* Dark sky with stars */}
      <circle cx="30" cy="30" r="1.5" fill="white" opacity="0.8" />
      <circle cx="60" cy="15" r="1" fill="white" opacity="0.7" />
      <circle cx="140" cy="25" r="1.5" fill="white" opacity="0.8" />
      <circle cx="155" cy="45" r="1" fill="white" opacity="0.6" />
      <circle cx="20" cy="55" r="1" fill="white" opacity="0.5" />
      {/* Hermit figure - old man */}
      <circle cx="84" cy="78" r="14" fill="#d8c8a8" /> {/* Head */}
      {/* Long beard */}
      <path d="M76,85 Q84,110 92,85" fill="#d8d8d8" opacity="0.8" />
      <path d="M77,90 Q84,118 91,90" fill="#c8c8c8" opacity="0.6" />
      {/* Grey robe/cloak */}
      <path d="M67,92 L55,200 L113,200 L101,92 Z" fill="#5a5a5a" opacity="0.9" />
      {/* Hood */}
      <path d="M70,80 Q84,65 98,80 L101,92 L67,92 Z" fill="#4a4a4a" />
      {/* Staff */}
      <line x1="56" y1="95" x2="48" y2="200" stroke="#8b6020" strokeWidth="4" />
      <line x1="42" y1="97" x2="58" y2="97" stroke="#8b6020" strokeWidth="2" /> {/* Staff top tau cross */}
      {/* Lantern - BRIGHT STAR inside */}
      <rect x="102" y="85" width="18" height="22" rx="3" fill="#1a1a1a" stroke="#c8c820" strokeWidth="1.5" />
      {/* Star of David inside lantern */}
      <polygon points="111,88 113,93 108,93" fill="#f0f040" opacity="0.9" />
      <polygon points="111,98 113,93 109,93" fill="#f0f040" opacity="0.9" />
      <polygon points="108,93 114,93 111,88 111,98" fill="none" stroke="#f0f040" strokeWidth="0.8" />
      {/* Lantern glow */}
      <circle cx="111" cy="93" r="8" fill="#f0f040" opacity="0.15" />
      {/* Lantern handle */}
      <line x1="111" y1="82" x2="111" y2="85" stroke="#c8c820" strokeWidth="1.5" />
      {/* Snow on peak */}
      <path d="M60,100 L84,60 L108,100 Q84,90 60,100 Z" fill="white" opacity="0.3" />
    </CardFrame>
  ),

  // 10 - Wheel of Fortune
  10: (
    <CardFrame numeral="X" name="WHEEL OF FORTUNE" color="#c8920a">
      <rect width="168" height="222" rx="6" fill="#0a0a18" />
      {/* Clouds top */}
      <ellipse cx="30" cy="30" rx="22" ry="12" fill="#4a4a6a" opacity="0.6" />
      <ellipse cx="140" cy="25" rx="22" ry="12" fill="#4a4a6a" opacity="0.6" />
      {/* Bull - Taurus bottom left */}
      <ellipse cx="20" cy="180" rx="14" ry="10" fill="#d4a840" opacity="0.8" />
      <circle cx="14" cy="172" r="7" fill="#d4a840" opacity="0.8" />
      <path d="M10,168 Q5,162 8,165" fill="none" stroke="#d4a840" strokeWidth="2" />
      <path d="M18,168 Q23,162 20,165" fill="none" stroke="#d4a840" strokeWidth="2" />
      {/* Eagle - Scorpio top right */}
      <path d="M148,30 Q165,15 168,25 Q155,35 148,40 Q155,50 148,55" fill="#2a2a4a" opacity="0.9" />
      <circle cx="148" cy="30" r="8" fill="#3a3a5a" />
      {/* Lion - Leo top left */}
      <circle cx="20" cy="65" r="14" fill="#c8920a" opacity="0.7" />
      <circle cx="20" cy="65" r="8" fill="#d4a840" />
      {/* Man/Angel - Aquarius bottom right */}
      <circle cx="150" cy="175" r="8" fill="#f0c898" />
      <rect x="143" y="183" width="14" height="22" rx="3" fill="#6080c0" opacity="0.8" />
      {/* THE WHEEL */}
      <circle cx="84" cy="111" r="62" fill="none" stroke="#c8920a" strokeWidth="2" />
      <circle cx="84" cy="111" r="54" fill="#0a0820" stroke="#c8920a" strokeWidth="1" />
      <circle cx="84" cy="111" r="30" fill="none" stroke="#c8920a" strokeWidth="1.5" />
      <circle cx="84" cy="111" r="8" fill="#c8920a" opacity="0.6" />
      {/* Wheel spokes */}
      <line x1="84" y1="49" x2="84" y2="173" stroke="#c8920a" strokeWidth="1.5" />
      <line x1="22" y1="111" x2="146" y2="111" stroke="#c8920a" strokeWidth="1.5" />
      <line x1="40" y1="67" x2="128" y2="155" stroke="#c8920a" strokeWidth="1" />
      <line x1="128" y1="67" x2="40" y2="155" stroke="#c8920a" strokeWidth="1" />
      {/* Hebrew letters on wheel */}
      <text x="84" y="62" fill="#c8920a" fontSize="9" textAnchor="middle" opacity="0.9">T</text>
      <text x="84" y="167" fill="#c8920a" fontSize="9" textAnchor="middle" opacity="0.9">A</text>
      <text x="30" y="115" fill="#c8920a" fontSize="9" textAnchor="middle" opacity="0.9">R</text>
      <text x="138" y="115" fill="#c8920a" fontSize="9" textAnchor="middle" opacity="0.9">O</text>
      {/* Anubis rising on right */}
      <circle cx="138" cy="82" r="8" fill="#5a3010" opacity="0.7" />
      <rect x="133" y="90" width="10" height="18" rx="2" fill="#5a3010" opacity="0.7" />
      {/* Snake descending on left */}
      <path d="M32,82 Q28,95 33,108 Q28,115 35,125" fill="none" stroke="#4a8a20" strokeWidth="2.5" />
    </CardFrame>
  ),

  // 11 - Justice
  11: (
    <CardFrame numeral="XI" name="JUSTICE" color="#f0f0a0">
      <rect width="168" height="222" rx="6" fill="#12100a" />
      {/* Gray stone pillars */}
      <rect x="10" y="25" width="22" height="195" rx="3" fill="#3a3a3a" />
      <rect x="136" y="25" width="22" height="195" rx="3" fill="#3a3a3a" />
      {/* Purple veil background */}
      <rect x="32" y="30" width="104" height="155" rx="3" fill="#2a1a40" opacity="0.7" />
      {/* Justice figure */}
      <circle cx="84" cy="72" r="14" fill="#f0c898" />
      {/* Crown */}
      <path d="M73,62 L77,52 L84,58 L91,52 L95,62 Z" fill="#f0c040" />
      <rect x="72" y="60" width="24" height="5" rx="1" fill="#f0c040" />
      {/* Red robe */}
      <path d="M66,87 L55,190 L113,190 L102,87 Z" fill="#c04040" opacity="0.85" />
      {/* White under-robe */}
      <path d="M72,87 L65,190 L103,190 L96,87 Z" fill="white" opacity="0.4" />
      {/* Scales in right hand */}
      <line x1="100" y1="75" x2="120" y2="85" stroke="#f0c040" strokeWidth="2" />
      <line x1="115" y1="80" x2="115" y2="90" stroke="#f0c040" strokeWidth="1" />
      <line x1="112" y1="90" x2="118" y2="90" stroke="#f0c040" strokeWidth="1" />
      {/* Scales pans */}
      <path d="M108,90 Q112,95 116,90" fill="none" stroke="#f0c040" strokeWidth="1" />
      <path d="M108,90 L116,90" stroke="#f0c040" strokeWidth="1" />
      {/* Sword in left hand pointing up */}
      <line x1="58" y1="165" x2="68" y2="80" stroke="silver" strokeWidth="2.5" />
      <line x1="62" y1="90" x2="72" y2="90" stroke="silver" strokeWidth="2" />
      <circle cx="68" cy="80" r="4" fill="#f0c040" />
      {/* Square on crown */}
      <rect x="80" y="54" width="8" height="8" fill="none" stroke="#f0c040" strokeWidth="1" />
      {/* Shoes peeking out */}
      <ellipse cx="70" cy="192" rx="8" ry="4" fill="#c08030" opacity="0.7" />
      <ellipse cx="98" cy="192" rx="8" ry="4" fill="#c08030" opacity="0.7" />
    </CardFrame>
  ),

  // 12 - The Hanged Man
  12: (
    <CardFrame numeral="XII" name="THE HANGED MAN" color="#c0c0ff">
      <rect width="168" height="222" rx="6" fill="#081018" />
      {/* T-shaped tree/wood */}
      <rect x="60" y="35" width="14" height="100" rx="4" fill="#5c3d1e" />
      <rect x="30" y="35" width="108" height="14" rx="4" fill="#5c3d1e" />
      {/* Live leaves on beam */}
      <circle cx="35" cy="32" r="6" fill="#2a4a1a" />
      <circle cx="133" cy="32" r="6" fill="#2a4a1a" />
      <circle cx="42" cy="28" r="5" fill="#2a6a1a" />
      <circle cx="126" cy="28" r="5" fill="#2a6a1a" />
      {/* Rope */}
      <line x1="67" y1="49" x2="67" y2="65" stroke="#c8b87a" strokeWidth="2.5" />
      {/* Hanged figure (upside down by right ankle) */}
      {/* Head (at bottom since upside down) */}
      <circle cx="67" cy="148" r="14" fill="#f0c898" />
      {/* Halo */}
      <circle cx="67" cy="148" r="18" fill="none" stroke="#f0c040" strokeWidth="1.5" opacity="0.7" />
      {/* Body (blue robe) */}
      <path d="M57,133 L52,90 L82,90 L77,133 Z" fill="#2040c0" opacity="0.8" />
      {/* Right leg bent (tied to rope) */}
      <line x1="67" y1="90" x2="67" y2="65" stroke="#f0c898" strokeWidth="5" />
      {/* Left leg crossing right */}
      <line x1="67" y1="90" x2="80" y2="105" stroke="#c04040" strokeWidth="4" />
      <line x1="80" y1="105" x2="78" y2="130" stroke="#c04040" strokeWidth="4" />
      {/* Arms behind back */}
      <line x1="57" y1="100" x2="43" y2="115" stroke="#f0c898" strokeWidth="4" />
      <line x1="77" y1="100" x2="91" y2="115" stroke="#f0c898" strokeWidth="4" />
      {/* Red tights on right leg */}
      <line x1="67" y1="80" x2="67" y2="62" stroke="#c04040" strokeWidth="3" />
      {/* Gold hair hanging down */}
      <path d="M60,148 Q67,162 74,148" fill="#c8920a" opacity="0.6" />
      {/* Golden coins falling */}
      <circle cx="40" cy="155" r="4" fill="#f0c040" opacity="0.7" />
      <circle cx="98" cy="165" r="4" fill="#f0c040" opacity="0.7" />
      <circle cx="120" cy="145" r="3" fill="#f0c040" opacity="0.5" />
    </CardFrame>
  ),

  // 13 - Death
  13: (
    <CardFrame numeral="XIII" name="DEATH" color="#c0c0c0">
      <rect width="168" height="222" rx="6" fill="#080808" />
      {/* Dark landscape */}
      <path d="M0,140 L168,140 L168,222 L0,222 Z" fill="#0d1005" />
      {/* Sun rising between towers */}
      <circle cx="84" cy="148" r="22" fill="#ff8020" opacity="0.7" />
      {/* Two towers */}
      <rect x="30" y="100" width="18" height="90" rx="2" fill="#1a1a2a" />
      <rect x="32" y="95" width="14" height="8" rx="1" fill="#2a2a3a" />
      <rect x="120" y="100" width="18" height="90" rx="2" fill="#1a1a2a" />
      <rect x="122" y="95" width="14" height="8" rx="1" fill="#2a2a3a" />
      {/* Death on horse - Black horse */}
      <ellipse cx="80" cy="145" rx="35" ry="20" fill="#0a0a0a" />
      <circle cx="55" cy="135" r="12" fill="#0a0a0a" />
      <path d="M50,128 L46,118 L55,122" fill="none" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M55,128 L60,118 L65,125" fill="none" stroke="#1a1a1a" strokeWidth="2" />
      {/* Death skeleton figure on horse */}
      <circle cx="80" cy="85" r="12" fill="ivory" opacity="0.9" /> {/* Skull */}
      <circle cx="76" cy="83" r="2" fill="#1a1a1a" />
      <circle cx="84" cy="83" r="2" fill="#1a1a1a" />
      <path d="M76,90 Q80,93 84,90" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      {/* Black armor */}
      <rect x="70" y="97" width="20" height="30" rx="3" fill="#1a1a2a" />
      {/* White rose banner */}
      <line x1="100" y1="70" x2="104" y2="145" stroke="#888" strokeWidth="2" />
      <rect x="94" y="68" width="20" height="14" rx="2" fill="#1a1a2a" />
      <circle cx="104" cy="75" r="5" fill="white" opacity="0.8" />
      {/* Figures around death */}
      {/* King on ground */}
      <circle cx="32" cy="152" r="6" fill="#f0c898" />
      <path d="M28,158 L25,175 L39,175 L36,158 Z" fill="#c04040" opacity="0.7" />
      {/* Crown fallen */}
      <path d="M25,153 L28,148 L32,152 L36,148 L39,153" fill="none" stroke="#f0c040" strokeWidth="1.5" />
      {/* Child with flowers */}
      <circle cx="128" cy="152" r="5" fill="#f0c898" />
      <rect x="124" y="157" width="8" height="16" rx="2" fill="#80c080" opacity="0.8" />
      <circle cx="128" cy="170" r="3" fill="#ff8080" />
      {/* Priest praying */}
      <circle cx="60" cy="148" r="5" fill="#f0c898" />
      <rect x="56" y="153" width="8" height="18" rx="2" fill="white" opacity="0.8" />
    </CardFrame>
  ),

  // 14 - Temperance
  14: (
    <CardFrame numeral="XIV" name="TEMPERANCE" color="#80c0ff">
      <rect width="168" height="222" rx="6" fill="#081018" />
      {/* Sky */}
      <path d="M0,0 L168,0 L168,140 L0,140 Z" fill="#101830" />
      {/* Ground with pond */}
      <path d="M0,140 L168,140 L168,222 L0,222 Z" fill="#0d1a08" />
      <ellipse cx="84" cy="175" rx="50" ry="25" fill="#1a3060" opacity="0.7" />
      {/* Irises on pond edge */}
      <rect x="35" y="148" width="4" height="20" fill="#2a4a1a" />
      <path d="M37,148 Q30,138 37,140 Q44,138 37,148" fill="#6040c0" opacity="0.8" />
      <rect x="130" y="148" width="4" height="20" fill="#2a4a1a" />
      <path d="M132,148 Q125,138 132,140 Q139,138 132,148" fill="#6040c0" opacity="0.8" />
      {/* Mountains and sun */}
      <path d="M90,140 L120,95 L150,140 Z" fill="#1a2a3a" opacity="0.8" />
      <circle cx="140" cy="90" r="18" fill="#ff8020" opacity="0.6" />
      {/* Path to mountains */}
      <path d="M70,222 Q80,160 100,140" fill="none" stroke="#c8920a" strokeWidth="2" strokeDasharray="3 2" opacity="0.6" />
      {/* Angel figure */}
      <circle cx="72" cy="85" r="16" fill="#f0c898" />
      {/* Wings */}
      <path d="M72,90 Q38,70 25,90 Q38,100 56,100" fill="#ff9060" opacity="0.7" />
      <path d="M72,90 Q106,70 119,90 Q106,100 88,100" fill="#ff9060" opacity="0.7" />
      {/* White robe */}
      <path d="M55,100 L48,195 L96,195 L89,100 Z" fill="white" opacity="0.9" />
      {/* Triangle on chest */}
      <polygon points="72,108 80,120 64,120" fill="none" stroke="#f0c040" strokeWidth="1.5" />
      {/* Two cups pouring water */}
      <rect x="85" y="88" width="14" height="18" rx="3" fill="silver" opacity="0.8" />
      <rect x="55" y="105" width="14" height="18" rx="3" fill="silver" opacity="0.8" />
      {/* Water flowing between cups */}
      <path d="M90,106 Q75,112 62,105" fill="none" stroke="#80c0ff" strokeWidth="2" strokeDasharray="2 1" />
      {/* Halo/crown sun */}
      <circle cx="72" cy="72" r="22" fill="none" stroke="#f0c040" strokeWidth="1" opacity="0.5" />
      {/* Square on forehead */}
      <rect x="68" y="80" width="8" height="8" fill="none" stroke="#f0c040" strokeWidth="1" />
    </CardFrame>
  ),

  // 15 - The Devil
  15: (
    <CardFrame numeral="XV" name="THE DEVIL" color="#c04040">
      <rect width="168" height="222" rx="6" fill="#050508" />
      {/* Black stone altar */}
      <rect x="30" y="120" width="108" height="80" rx="5" fill="#0a0a12" stroke="#c04040" strokeWidth="1" opacity="0.8" />
      {/* Inverted pentagram */}
      <polygon points="84,32 110,72 98,110 70,110 58,72" fill="none" stroke="#c04040" strokeWidth="2" opacity="0.9" />
      <polygon points="84,110 110,72 70,72 84,32 98,72" fill="none" stroke="#c04040" strokeWidth="1" opacity="0.5" />
      {/* Devil face / Goat of Mendes */}
      <circle cx="84" cy="68" r="28" fill="#0a0a12" stroke="#c04040" strokeWidth="1.5" />
      {/* Goat horns */}
      <path d="M65,48 Q55,25 62,35" fill="none" stroke="#c04040" strokeWidth="3" />
      <path d="M103,48 Q113,25 106,35" fill="none" stroke="#c04040" strokeWidth="3" />
      {/* Evil eyes */}
      <ellipse cx="75" cy="65" rx="7" ry="5" fill="#c04040" />
      <circle cx="75" cy="65" r="3" fill="#1a0000" />
      <ellipse cx="93" cy="65" rx="7" ry="5" fill="#c04040" />
      <circle cx="93" cy="65" r="3" fill="#1a0000" />
      {/* Bat wings */}
      <path d="M84,75 Q40,55 15,75 Q40,90 60,85" fill="#1a1a2a" opacity="0.9" />
      <path d="M84,75 Q128,55 153,75 Q128,90 108,85" fill="#1a1a2a" opacity="0.9" />
      {/* Torch/flame in raised hand */}
      <line x1="115" y1="70" x2="130" y2="45" stroke="#8b4513" strokeWidth="2.5" />
      <path d="M130,45 Q126,35 130,30 Q134,35 130,45" fill="#ff8020" opacity="0.9" />
      {/* Chained man */}
      <circle cx="50" cy="148" r="9" fill="#f0c898" />
      <rect x="43" y="157" width="14" height="28" rx="3" fill="#5a3010" opacity="0.8" />
      {/* Chain to altar */}
      <path d="M50,167 Q50,185 60,185" fill="none" stroke="#888" strokeWidth="2" strokeDasharray="3 2" />
      {/* Chained woman */}
      <circle cx="118" cy="148" r="9" fill="#f0c898" />
      <rect x="111" y="157" width="14" height="28" rx="3" fill="#5a3010" opacity="0.8" />
      <path d="M118,167 Q118,185 108,185" fill="none" stroke="#888" strokeWidth="2" strokeDasharray="3 2" />
      {/* Small tails */}
      <path d="M50,185 Q40,195 45,200" fill="none" stroke="#ff8020" strokeWidth="2" />
      <path d="M118,185 Q128,195 123,200" fill="none" stroke="#2a6a20" strokeWidth="2" />
    </CardFrame>
  ),

  // 16 - The Tower
  16: (
    <CardFrame numeral="XVI" name="THE TOWER" color="#ff8040">
      <rect width="168" height="222" rx="6" fill="#050508" />
      {/* Dark stormy sky */}
      <rect x="0" y="0" width="168" height="160" rx="0" fill="#080510" />
      {/* Storm clouds */}
      <ellipse cx="30" cy="40" rx="25" ry="15" fill="#1a1a2a" opacity="0.8" />
      <ellipse cx="140" cy="30" rx="25" ry="15" fill="#1a1a2a" opacity="0.8" />
      {/* Rocky ground */}
      <path d="M0,160 L168,160 L168,222 L0,222 Z" fill="#1a1010" />
      {/* The Tower - tall stone structure */}
      <rect x="55" y="50" width="58" height="130" rx="3" fill="#2a2a3a" />
      {/* Tower crown (about to blow off) */}
      <rect x="52" y="40" width="64" height="16" rx="4" fill="#c04040" />
      {/* Crown blown sideways */}
      <path d="M116,48 Q130,35 140,40 Q130,50 120,52 Z" fill="#c04040" opacity="0.8" />
      {/* Windows */}
      <rect x="72" y="70" width="12" height="16" rx="2" fill="#ff8020" opacity="0.7" />
      <rect x="92" y="70" width="12" height="16" rx="2" fill="#ff8020" opacity="0.7" />
      <rect x="82" y="100" width="12" height="16" rx="2" fill="#ff8020" opacity="0.5" />
      {/* Lightning bolt */}
      <path d="M130,10 L100,70 L115,70 L85,130 L120,70 L105,70 Z" fill="#ffff40" opacity="0.9" />
      {/* Fire at top */}
      <path d="M52,40 Q55,25 60,35 Q65,20 70,35 Q75,18 80,35 Q85,22 90,35 Q95,18 100,35 Q105,22 110,35 Q113,25 116,40 Z" fill="#ff6020" opacity="0.85" />
      {/* Falling figures */}
      <circle cx="38" cy="120" r="7" fill="#f0c898" />
      <path d="M31,127 Q25,145 35,155" fill="none" stroke="#f0c898" strokeWidth="3" />
      <line x1="31" y1="133" x2="20" y2="140" stroke="#f0c898" strokeWidth="3" />
      <circle cx="128" cy="130" r="7" fill="#f0c898" />
      <path d="M135,137 Q140,155 130,165" fill="none" stroke="#f0c898" strokeWidth="3" />
      <line x1="135" y1="140" x2="148" y2="148" stroke="#f0c898" strokeWidth="3" />
      {/* Gold coins/sparks falling */}
      <circle cx="55" cy="105" r="3" fill="#f0c040" />
      <circle cx="110" cy="95" r="3" fill="#f0c040" />
      <circle cx="145" cy="110" r="2" fill="#f0c040" opacity="0.7" />
      <circle cx="25" cy="100" r="2" fill="#f0c040" opacity="0.7" />
    </CardFrame>
  ),

  // 17 - The Star
  17: (
    <CardFrame numeral="XVII" name="THE STAR" color="#80d0ff">
      <rect width="168" height="222" rx="6" fill="#05050f" />
      {/* Night sky */}
      <rect x="0" y="0" width="168" height="145" rx="0" fill="#080818" />
      {/* Stars scattered */}
      <polygon points="84,10 87,19 96,19 89,25 91,34 84,28 77,34 79,25 72,19 81,19" fill="#f0f040" opacity="0.9" />
      <circle cx="30" cy="25" r="3" fill="#f0f080" opacity="0.7" />
      <circle cx="145" cy="20" r="3" fill="#f0f080" opacity="0.7" />
      <circle cx="155" cy="50" r="2" fill="#f0f080" opacity="0.6" />
      <circle cx="20" cy="55" r="2" fill="#f0f080" opacity="0.6" />
      <circle cx="140" cy="60" r="2.5" fill="#f0f080" opacity="0.7" />
      <circle cx="50" cy="40" r="2" fill="#f0f080" opacity="0.5" />
      {/* Ground and pond */}
      <path d="M0,145 L168,145 L168,222 L0,222 Z" fill="#0d1a08" />
      <ellipse cx="60" cy="175" rx="40" ry="20" fill="#1a3060" opacity="0.6" />
      {/* Kneeling figure - woman */}
      <circle cx="84" cy="108" r="13" fill="#f0c898" />
      {/* Large water pitcher in right hand - into pond */}
      <rect x="95" y="112" width="10" height="16" rx="3" fill="silver" opacity="0.8" />
      <path d="M100,128 Q90,145 65,158" fill="none" stroke="#80c0ff" strokeWidth="2" />
      {/* Small water pitcher in left hand - onto land */}
      <rect x="65" y="118" width="8" height="14" rx="3" fill="silver" opacity="0.8" />
      <path d="M68,132 Q60,145 50,155" fill="none" stroke="#80c0ff" strokeWidth="1.5" />
      {/* Body */}
      <ellipse cx="84" cy="130" rx="14" ry="20" fill="#f0c898" opacity="0.8" />
      {/* Hair flowing */}
      <path d="M78,108 Q65,120 68,135" fill="#8b4513" stroke="#8b4513" strokeWidth="1" />
      {/* Bird in tree */}
      <rect x="138" y="100" width="4" height="45" fill="#5c3d1e" />
      <circle cx="140" cy="97" r="8" fill="#2a4a1a" />
      <path d="M135,95 L145,92 Q148,95 145,98" fill="#0a2a0a" />
    </CardFrame>
  ),

  // 18 - The Moon
  18: (
    <CardFrame numeral="XVIII" name="THE MOON" color="#8080c0">
      <rect width="168" height="222" rx="6" fill="#050510" />
      {/* Night sky */}
      <rect x="0" y="0" width="168" height="140" rx="0" fill="#080818" />
      {/* Moon with face */}
      <circle cx="84" cy="50" r="30" fill="#e0e080" opacity="0.6" />
      <circle cx="90" cy="44" r="24" fill="#080818" />
      {/* Moon face profile */}
      <circle cx="76" cy="47" r="3" fill="#c0c060" opacity="0.5" />
      <path d="M70,55 Q76,60 82,55" fill="none" stroke="#c0c060" strokeWidth="1" opacity="0.5" />
      {/* Rays from moon */}
      <line x1="84" y1="18" x2="84" y2="10" stroke="#c0c020" strokeWidth="1" opacity="0.5" />
      <line x1="110" y1="28" x2="115" y2="22" stroke="#c0c020" strokeWidth="1" opacity="0.5" />
      <line x1="58" y1="28" x2="53" y2="22" stroke="#c0c020" strokeWidth="1" opacity="0.5" />
      {/* Dew drops/yods falling */}
      <path d="M40,85 Q38,92 43,95 Q48,92 46,85 Q43,80 40,85 Z" fill="#f0c040" opacity="0.7" />
      <path d="M128,90 Q126,97 131,100 Q136,97 134,90 Q131,85 128,90 Z" fill="#f0c040" opacity="0.7" />
      <path d="M60,75 Q58,82 63,85 Q68,82 66,75 Q63,70 60,75 Z" fill="#f0c040" opacity="0.6" />
      {/* Pool/pond */}
      <ellipse cx="84" cy="165" rx="55" ry="20" fill="#0a1430" />
      {/* Crayfish emerging from pool */}
      <ellipse cx="84" cy="160" rx="12" ry="8" fill="#c04040" opacity="0.7" />
      <line x1="75" y1="158" x2="65" y2="152" stroke="#c04040" strokeWidth="1.5" />
      <line x1="93" y1="158" x2="103" y2="152" stroke="#c04040" strokeWidth="1.5" />
      <line x1="78" y1="160" x2="70" y2="165" stroke="#c04040" strokeWidth="1" />
      <line x1="90" y1="160" x2="98" y2="165" stroke="#c04040" strokeWidth="1" />
      {/* Two towers */}
      <rect x="20" y="105" width="16" height="85" rx="2" fill="#1a1a2a" />
      <path d="M18,105 L28,90 L38,105 Z" fill="#2a2a3a" />
      <rect x="132" y="105" width="16" height="85" rx="2" fill="#1a1a2a" />
      <path d="M130,105 L140,90 L150,105 Z" fill="#2a2a3a" />
      {/* Wolf howling left */}
      <ellipse cx="38" cy="148" rx="12" ry="8" fill="#5a5a6a" opacity="0.8" />
      <circle cx="30" cy="140" r="8" fill="#5a5a6a" opacity="0.8" />
      <path d="M26,134 Q28,124 31,128" fill="#5a5a6a" strokeWidth="1" />
      {/* Dog right */}
      <ellipse cx="130" cy="148" rx="12" ry="8" fill="#c8a060" opacity="0.8" />
      <circle cx="138" cy="140" r="8" fill="#c8a060" opacity="0.8" />
      <path d="M142,134 Q140,124 137,128" fill="#c8a060" strokeWidth="1" />
      {/* Path between them */}
      <path d="M50,185 Q84,175 118,185" fill="none" stroke="#8080c0" strokeWidth="1.5" opacity="0.4" />
    </CardFrame>
  ),

  // 19 - The Sun
  19: (
    <CardFrame numeral="XIX" name="THE SUN" color="#f0c040">
      <rect width="168" height="222" rx="6" fill="#1a0a00" />
      {/* Bright sky */}
      <rect x="0" y="0" width="168" height="145" rx="0" fill="#ff9020" opacity="0.25" />
      {/* The Sun */}
      <circle cx="84" cy="52" r="35" fill="#f0c040" opacity="0.85" />
      {/* Rays alternating straight and wavy */}
      <line x1="84" y1="8" x2="84" y2="0" stroke="#f0c040" strokeWidth="3" />
      <line x1="84" y1="96" x2="84" y2="106" stroke="#f0c040" strokeWidth="3" />
      <line x1="40" y1="52" x2="30" y2="52" stroke="#f0c040" strokeWidth="3" />
      <line x1="128" y1="52" x2="138" y2="52" stroke="#f0c040" strokeWidth="3" />
      <line x1="55" y1="23" x2="48" y2="16" stroke="#f0c040" strokeWidth="2.5" />
      <line x1="113" y1="23" x2="120" y2="16" stroke="#f0c040" strokeWidth="2.5" />
      <line x1="55" y1="81" x2="48" y2="88" stroke="#f0c040" strokeWidth="2.5" />
      <line x1="113" y1="81" x2="120" y2="88" stroke="#f0c040" strokeWidth="2.5" />
      {/* Sun face */}
      <circle cx="78" cy="47" r="4" fill="#5a3000" />
      <circle cx="90" cy="47" r="4" fill="#5a3000" />
      <path d="M76,60 Q84,66 92,60" fill="none" stroke="#5a3000" strokeWidth="2" />
      {/* Stone wall */}
      <path d="M15,148 L153,148 L153,165 L15,165 Z" fill="#8b6020" opacity="0.7" />
      <line x1="45" y1="148" x2="45" y2="165" stroke="#5c3d1e" strokeWidth="1" opacity="0.5" />
      <line x1="80" y1="148" x2="80" y2="165" stroke="#5c3d1e" strokeWidth="1" opacity="0.5" />
      <line x1="115" y1="148" x2="115" y2="165" stroke="#5c3d1e" strokeWidth="1" opacity="0.5" />
      {/* Sunflowers on wall */}
      <rect x="32" y="115" width="3" height="34" fill="#2a4a1a" />
      <circle cx="33" cy="112" r="8" fill="#f0c040" />
      <circle cx="33" cy="112" r="3" fill="#5a3000" />
      <rect x="65" y="108" width="3" height="42" fill="#2a4a1a" />
      <circle cx="66" cy="105" r="9" fill="#f0c040" />
      <circle cx="66" cy="105" r="3" fill="#5a3000" />
      <rect x="100" y="112" width="3" height="37" fill="#2a4a1a" />
      <circle cx="101" cy="109" r="8" fill="#f0c040" />
      <circle cx="101" cy="109" r="3" fill="#5a3000" />
      <rect x="135" y="118" width="3" height="31" fill="#2a4a1a" />
      <circle cx="136" cy="115" r="7" fill="#f0c040" />
      <circle cx="136" cy="115" r="3" fill="#5a3000" />
      {/* Happy child on white horse */}
      {/* White horse */}
      <ellipse cx="84" cy="190" rx="35" ry="18" fill="#f0f0e8" />
      <circle cx="55" cy="180" r="12" fill="#f0f0e8" />
      <path d="M50,173 L47,160 L55,165" fill="none" stroke="#e0e0d8" strokeWidth="2" />
      {/* Child */}
      <circle cx="84" cy="166" r="10" fill="#f0c898" />
      <path d="M76,176 L72,205 L96,205 L92,176 Z" fill="#ff8080" opacity="0.7" />
      {/* Red feather */}
      <path d="M80,158 Q72,145 75,152" fill="none" stroke="#c04040" strokeWidth="2.5" />
      {/* Raised arm with banner */}
      <line x1="95" y1="172" x2="115" y2="155" stroke="#f0c898" strokeWidth="4" />
      <rect x="115" y="145" width="20" height="12" rx="2" fill="#c04040" opacity="0.8" />
    </CardFrame>
  ),

  // 20 - Judgement
  20: (
    <CardFrame numeral="XX" name="JUDGEMENT" color="#c0c0ff">
      <rect width="168" height="222" rx="6" fill="#050510" />
      {/* Dark sky/clouds */}
      <rect x="0" y="0" width="168" height="120" rx="0" fill="#0a0a20" />
      <ellipse cx="40" cy="50" rx="35" ry="20" fill="#1a1a3a" opacity="0.8" />
      <ellipse cx="130" cy="40" rx="35" ry="20" fill="#1a1a3a" opacity="0.8" />
      <ellipse cx="84" cy="35" rx="40" ry="20" fill="#1a1a3a" opacity="0.7" />
      {/* Angel Gabriel in clouds */}
      <circle cx="84" cy="40" r="14" fill="#f0c898" />
      {/* Wings */}
      <path d="M84,45 Q50,30 30,45 Q50,55 68,52" fill="#c8a060" opacity="0.8" />
      <path d="M84,45 Q118,30 138,45 Q118,55 100,52" fill="#c8a060" opacity="0.8" />
      {/* Halo */}
      <circle cx="84" cy="40" r="18" fill="none" stroke="#f0c040" strokeWidth="1.5" opacity="0.7" />
      {/* Trumpet */}
      <rect x="78" y="52" width="6" height="22" rx="2" fill="#f0c040" opacity="0.9" />
      <path d="M72,74 Q78,74 84,78 Q90,74 96,74" fill="none" stroke="#f0c040" strokeWidth="2" />
      {/* Sound waves from trumpet */}
      <path d="M84,78 Q65,90 62,105" fill="none" stroke="#f0f0c0" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      <path d="M84,78 Q103,90 106,105" fill="none" stroke="#f0f0c0" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      {/* Banner on trumpet */}
      <rect x="78" y="52" width="16" height="10" rx="1" fill="#c04040" />
      <path d="M86,54 L92,52 L88,58 L94,56 L90,62" fill="none" stroke="#f0f0f0" strokeWidth="1" />
      {/* Coffins/tombs rising */}
      <rect x="18" y="150" width="28" height="40" rx="3" fill="#2a2a3a" stroke="#4a4a6a" strokeWidth="1" />
      <rect x="70" y="145" width="28" height="45" rx="3" fill="#2a2a3a" stroke="#4a4a6a" strokeWidth="1" />
      <rect x="122" y="150" width="28" height="40" rx="3" fill="#2a2a3a" stroke="#4a4a6a" strokeWidth="1" />
      {/* Figures rising with arms raised */}
      <circle cx="32" cy="148" r="8" fill="#f0c898" />
      <line x1="28" y1="156" x2="22" y2="145" stroke="#f0c898" strokeWidth="3" />
      <line x1="36" y1="156" x2="42" y2="145" stroke="#f0c898" strokeWidth="3" />
      <circle cx="84" cy="143" r="8" fill="#f0c898" />
      <line x1="80" y1="151" x2="72" y2="140" stroke="#f0c898" strokeWidth="3" />
      <line x1="88" y1="151" x2="96" y2="140" stroke="#f0c898" strokeWidth="3" />
      <circle cx="136" cy="148" r="8" fill="#f0c898" />
      <line x1="132" y1="156" x2="124" y2="145" stroke="#f0c898" strokeWidth="3" />
      <line x1="140" y1="156" x2="148" y2="145" stroke="#f0c898" strokeWidth="3" />
      {/* Mountains and water */}
      <path d="M0,185 L168,185 L168,222 L0,222 Z" fill="#0a1830" opacity="0.8" />
      <path d="M100,185 L130,155 L160,185 Z" fill="#1a2a3a" opacity="0.7" />
    </CardFrame>
  ),

  // 21 - The World
  21: (
    <CardFrame numeral="XXI" name="THE WORLD" color="#c8920a">
      <rect width="168" height="222" rx="6" fill="#05080a" />
      {/* Dark sky */}
      <rect x="0" y="0" width="168" height="222" rx="0" fill="#080810" />
      {/* WREATH oval */}
      <ellipse cx="84" cy="111" rx="62" ry="88" fill="none" stroke="#2a6a20" strokeWidth="8" />
      {/* Leaves on wreath detail */}
      <ellipse cx="84" cy="111" rx="60" ry="86" fill="none" stroke="#4a8a20" strokeWidth="3" opacity="0.5" />
      {/* Red ribbons top and bottom of wreath */}
      <path d="M60,23 Q84,18 108,23" fill="none" stroke="#c04040" strokeWidth="4" />
      <path d="M60,199 Q84,204 108,199" fill="none" stroke="#c04040" strokeWidth="4" />
      {/* Four symbols in corners */}
      {/* Bull - Taurus bottom left */}
      <text x="18" y="190" fill="#f0c040" fontSize="16" opacity="0.8">♉</text>
      {/* Eagle - Scorpio bottom right */}
      <text x="138" y="190" fill="#f0c040" fontSize="16" opacity="0.8">♏</text>
      {/* Man/Angel - Aquarius top left */}
      <text x="18" y="45" fill="#f0c040" fontSize="16" opacity="0.8">♒</text>
      {/* Lion - Leo top right */}
      <text x="138" y="45" fill="#f0c040" fontSize="16" opacity="0.8">♌</text>
      {/* Central dancing figure */}
      <circle cx="84" cy="85" r="14" fill="#f0c898" />
      {/* Hair */}
      <path d="M78,82 Q84,72 90,82" fill="#8b4513" stroke="#8b4513" strokeWidth="1" />
      {/* Purple sash */}
      <path d="M72,100 Q84,95 96,100 Q94,120 84,118 Q74,120 72,100 Z" fill="#8050a0" opacity="0.8" />
      {/* Wands/batons */}
      <line x1="64" y1="88" x2="55" y2="110" stroke="#8b4513" strokeWidth="2.5" />
      <circle cx="64" cy="86" r="4" fill="#f0c040" />
      <line x1="104" y1="88" x2="113" y2="110" stroke="#8b4513" strokeWidth="2.5" />
      <circle cx="104" cy="86" r="4" fill="#f0c040" />
      {/* Legs dancing */}
      <line x1="80" y1="118" x2="75" y2="145" stroke="#f0c898" strokeWidth="4" />
      <line x1="88" y1="118" x2="100" y2="140" stroke="#f0c898" strokeWidth="4" />
      {/* Star accents in wreath */}
      <circle cx="84" cy="22" r="2" fill="#f0c040" opacity="0.7" />
      <circle cx="84" cy="200" r="2" fill="#f0c040" opacity="0.7" />
      <circle cx="22" cy="111" r="2" fill="#f0c040" opacity="0.7" />
      <circle cx="146" cy="111" r="2" fill="#f0c040" opacity="0.7" />
    </CardFrame>
  ),
};

export function TarotCardArt({ cardIndex, isReversed = false, className = '' }: TarotCardProps) {
  const art = CARD_ART[cardIndex];
  if (!art) return null;
  return (
    <div
      className={`w-full h-full ${isReversed ? 'rotate-180' : ''} ${className}`}
      style={{ transition: 'transform 0.4s ease' }}
    >
      {art}
    </div>
  );
}
