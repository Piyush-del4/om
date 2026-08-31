'use client';
import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';

interface TOCEntry {
  anchor: string;
  label: string;
}

interface TableOfContentsProps {
  entries: TOCEntry[];
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeAnchor, setActiveAnchor] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = entries.map(e => document.getElementById(e.anchor)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveAnchor(entries[i].anchor);
          return;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [entries]);

  if (!entries || entries.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="bg-gradient-to-br from-gray-50 to-amber-50/30 border border-amber-200 rounded-2xl p-5 my-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-amber-600" />
        <span className="font-serif font-bold text-gray-900 text-sm uppercase tracking-wider">Table of Contents</span>
      </div>
      <ol className="space-y-1.5">
        {entries.map((entry, i) => (
          <li key={entry.anchor}>
            <a
              href={`#${entry.anchor}`}
              className={`flex items-start gap-2.5 text-sm py-1 px-2 rounded-lg transition-all duration-150 hover:bg-amber-100/60 ${
                activeAnchor === entry.anchor
                  ? 'text-amber-700 font-bold bg-amber-100/80'
                  : 'text-gray-700 hover:text-amber-700'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {entry.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#faq"
            className="flex items-start gap-2.5 text-sm py-1 px-2 rounded-lg transition-all duration-150 hover:bg-amber-100/60 text-gray-700 hover:text-amber-700"
          >
            <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {entries.length + 1}
            </span>
            Frequently Asked Questions
          </a>
        </li>
      </ol>
    </nav>
  );
}
