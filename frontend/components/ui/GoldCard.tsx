import React from 'react';

interface GoldCardProps extends React.HTMLAttributes<HTMLDivElement> {
 children: React.ReactNode;
 noDouble?: boolean;
 flush?: boolean;
}

export function GoldCard({ children, noDouble = false, flush = false, className = '', ...props }: GoldCardProps) {
 if (noDouble) {
 return (
 <div
 className={`rounded-2xl p-6 transition-all duration-300 gold-glow-hover glass-card text-gray-900 ${className}`}
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
 <div className={`${innerStyle} flex flex-col justify-between text-gray-900`}>
 {children}
 </div>
 </div>
 );
}
