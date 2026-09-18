'use client';

import React, { useState } from 'react';
import { Layers, Hash, Sparkles, PenTool, Compass, GraduationCap, BookOpen, Sun } from 'lucide-react';

interface BatchCoverVisualProps {
  coverImage?: {
    url?: string;
    publicId?: string;
  };
  title: string;
  category?: string;
  className?: string;
  aspectRatio?: 'standard' | 'tall' | 'hero';
}

export function BatchCoverVisual({
  coverImage,
  title,
  category = 'Astrology',
  className = '',
  aspectRatio = 'standard',
}: BatchCoverVisualProps) {
  const [imageError, setImageError] = useState(false);

  // Check if coverImage URL appears to be an ad/consultation graphic (e.g., contains 'offer', '99', 'reading', etc.)
  const isAdGraphic = React.useMemo(() => {
    if (!coverImage?.url) return true;
    const url = coverImage.url.toLowerCase();
    return (
      url.includes('30-minute') ||
      url.includes('personal-tarot-reading') ||
      url.includes('reading-₹99') ||
      url.includes('consultation-ad')
    );
  }, [coverImage?.url]);

  const normalizedCategory = (category || 'Astrology').toLowerCase();

  const getCategoryConfig = () => {
    if (normalizedCategory.includes('tarot')) {
      return {
        bg: 'from-[#1A1829] via-[#2A2342] to-[#120F1F]',
        accent: 'text-purple-300',
        badgeBg: 'bg-purple-900/60 text-purple-200 border-purple-500/40',
        Icon: Layers,
        pattern: 'Tarot Mastery & Arcana Spreads',
      };
    }
    if (normalizedCategory.includes('numerology')) {
      return {
        bg: 'from-[#2B1B18] via-[#3D2520] to-[#1C110F]',
        accent: 'text-amber-300',
        badgeBg: 'bg-amber-900/60 text-amber-200 border-amber-500/40',
        Icon: Hash,
        pattern: 'Life Path & Numerology Vibrations',
      };
    }
    if (normalizedCategory.includes('graphology')) {
      return {
        bg: 'from-[#1E252B] via-[#2D3740] to-[#141A1F]',
        accent: 'text-teal-300',
        badgeBg: 'bg-teal-900/60 text-teal-200 border-teal-500/40',
        Icon: PenTool,
        pattern: 'Handwriting & Trait Analysis',
      };
    }
    // Default Astrology
    return {
      bg: 'from-[#1B2230] via-[#293347] to-[#111722]',
      accent: 'text-[#D4B07B]',
      badgeBg: 'bg-[#A78652]/20 text-[#D4B07B] border-[#A78652]/40',
      Icon: Compass,
      pattern: 'Vedic Astrology & Planetary Transits',
    };
  };

  const config = getCategoryConfig();
  const IconComponent = config.Icon;

  const heightClasses = {
    standard: 'h-48 sm:h-52',
    tall: 'h-60 sm:h-64',
    hero: 'h-64 sm:h-80 md:h-96',
  }[aspectRatio];

  if (coverImage?.url && !isAdGraphic && !imageError) {
    return (
      <div className={`w-full ${heightClasses} bg-gray-900 relative overflow-hidden ${className}`}>
        <img
          src={coverImage.url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // Educational Fallback Graphic
  return (
    <div
      className={`w-full ${heightClasses} bg-gradient-to-br ${config.bg} relative overflow-hidden flex flex-col justify-between p-6 ${className}`}
    >
      {/* Background Decorative Element */}
      <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
        <IconComponent className="w-56 h-56 text-white" />
      </div>

      <div className="flex items-center justify-between z-10">
        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border backdrop-blur-md ${config.badgeBg}`}>
          {category || 'Academy Cohort'}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-amber-200/80 font-mono">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span>LIVE ACADEMY</span>
        </div>
      </div>

      <div className="space-y-2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
            <IconComponent className={`w-4 h-4 ${config.accent}`} />
          </div>
          <span className="text-[11px] font-mono text-gray-300 uppercase tracking-wider">
            {config.pattern}
          </span>
        </div>

        <h4 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug line-clamp-2">
          {title}
        </h4>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-gray-300 z-10">
        <span className="flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Comprehensive Curriculum
        </span>
        <span className="text-amber-300 font-bold">OM Astrology AMC</span>
      </div>
    </div>
  );
}
