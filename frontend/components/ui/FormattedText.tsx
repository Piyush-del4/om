import React from 'react';

interface FormattedTextProps {
  text: string | null | undefined;
  className?: string;
}

export function FormattedText({ text, className = "space-y-4" }: FormattedTextProps) {
  if (!text) return null;

  return (
    <div className={className}>
      {text.split('\n').map((para, idx) => {
        // Split by ** to find bold segments (using a capture group keeps the delimiter in the result)
        const parts = para.split(/\*\*([^*]+)\*\*/g);
        return (
          <p key={idx}>
            {parts.map((part, i) => {
              // Odd indices are the captured bold text (between the stars)
              if (i % 2 === 1) {
                return (
                  <strong key={i} className="font-bold text-white">
                    {part}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}
