'use client';
import Link from 'next/link';
import { Clock, Tag, ChevronRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingTime: number;
  heroImageUrl?: string;
  heroImageAlt?: string;
  publishedAt: string;
  primaryKeyword?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Astrology: 'bg-blue-50 text-blue-700 border-blue-200',
  Numerology: 'bg-purple-50 text-purple-700 border-purple-200',
  Vedic: 'bg-amber-50 text-amber-700 border-amber-200',
  'FEAN Method': 'bg-green-50 text-green-700 border-green-200',
  Tarot: 'bg-rose-50 text-rose-700 border-rose-200',
  Graphology: 'bg-orange-50 text-orange-700 border-orange-200',
  Remedies: 'bg-teal-50 text-teal-700 border-teal-200',
  General: 'bg-gray-50 text-gray-700 border-gray-200',
};

export function BlogCard({
  title, slug, excerpt, category, tags, readingTime,
  heroImageUrl, heroImageAlt, publishedAt, primaryKeyword,
}: BlogCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
  const categoryColor = CATEGORY_COLORS[category] || CATEGORY_COLORS.General;

  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-amber-300 hover:shadow-[0_8px_30px_rgba(204,143,51,0.12)] transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <Link href={`/blog/${slug}`} className="block overflow-hidden bg-gradient-to-br from-amber-950 to-amber-900 aspect-[16/9] flex-shrink-0 relative">
        {heroImageUrl ? (
          <img
            src={heroImageUrl}
            alt={heroImageAlt || title}
            title={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-900 to-amber-950 p-6">
            <span className="text-amber-200 text-center font-serif text-base font-bold leading-snug opacity-80 line-clamp-3">{title}</span>
          </div>
        )}
        {/* Category badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${categoryColor}`}>
          {category}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Meta */}
        <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readingTime} min read</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h2 className="font-serif text-gray-900 text-base font-bold leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 flex-1">
          {excerpt}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[9px] font-mono uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                <Tag className="w-2.5 h-2.5 inline mr-0.5" />{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read more */}
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-1 text-amber-700 text-xs font-bold hover:gap-2 transition-all duration-200 pt-1"
        >
          Read Full Article <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
