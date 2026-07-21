import React from 'react';

interface FormattedTextProps {
  text: string | null | undefined;
  className?: string;
}

export function FormattedText({ text, className = "space-y-6 text-gray-300 text-base md:text-lg leading-relaxed font-light" }: FormattedTextProps) {
  if (!text) return null;

  return (
    <div className={className}>
      {text.split('\n').map((para, idx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Handle H2
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-2xl md:text-3xl font-serif font-bold text-[var(--gold)] mt-8 mb-4 border-b border-[var(--gold)]/20 pb-2">
              {trimmed.replace(/^##\s+/, '')}
            </h2>
          );
        }

        // Handle H3
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-xl md:text-2xl font-serif font-bold text-white mt-6 mb-3 drop-shadow-[0_2px_10px_rgba(204,143,51,0.2)]">
              {trimmed.replace(/^###\s+/, '')}
            </h3>
          );
        }

        // Handle List items
        if (trimmed.startsWith('- ')) {
          const content = trimmed.replace(/^- /, '');
          const parts = content.split(/\*\*([^*]+)\*\*/g);
          return (
            <div key={idx} className="flex items-start gap-3 pl-4 mb-2">
              <span className="text-[var(--gold)] mt-1.5 flex-shrink-0">✦</span>
              <p>
                {parts.map((part, i) => (
                  i % 2 === 1 ? <strong key={i} className="font-bold text-[var(--gold)]">{part}</strong> : part
                ))}
              </p>
            </div>
          );
        }

        // Standard Paragraph
        const parts = trimmed.split(/\*\*([^*]+)\*\*/g);
        return (
          <p key={idx} className="tracking-wide">
            {parts.map((part, i) => (
              i % 2 === 1 ? <strong key={i} className="font-bold text-white drop-shadow-sm">{part}</strong> : part
            ))}
          </p>
        );
      })}
    </div>
  );
}
