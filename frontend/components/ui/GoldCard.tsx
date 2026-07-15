import React from 'react';

interface GoldCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  noDouble?: boolean;
  flush?: boolean;
}

export function GoldCard({ children, theme = 'dark', noDouble = false, flush = false, className = '', ...props }: GoldCardProps) {
  if (noDouble) {
    const cardStyle = theme === 'dark' ? 'glass-card-dark text-white' : 'glass-card text-black';
    return (
      <div
        className={`rounded-2xl p-6 shadow-md transition-all duration-300 gold-glow-hover ${cardStyle} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  const innerStyle = flush ? 'double-bezel-inner-flush' : 'double-bezel-inner';

  return (
    <div
      className={`double-bezel-outer ${className}`}
      {...props}
    >
      <div className={`${innerStyle} flex flex-col justify-between`}>
        {children}
      </div>
    </div>
  );
}


