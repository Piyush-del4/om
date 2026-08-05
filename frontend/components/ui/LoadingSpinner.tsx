import React from 'react';

interface LoadingSpinnerProps {
 className?: string;
 size?: 'sm' | 'md' | 'lg' | 'xl';
 variant?: 'gold' | 'current';
}

export function LoadingSpinner({
 className = '',
 size = 'md',
 variant = 'gold',
}: LoadingSpinnerProps) {
 const sizeClasses = {
 sm: 'w-5 h-5',
 md: 'w-8 h-8',
 lg: 'w-12 h-12',
 xl: 'w-16 h-16',
 };

 const innerSizeClasses = {
 sm: 'w-3.5 h-3.5',
 md: 'w-6 h-6',
 lg: 'w-9 h-9',
 xl: 'w-12 h-12',
 };

 const centerSizeClasses = {
 sm: 'w-1.5 h-1.5',
 md: 'w-2.5 h-2.5',
 lg: 'w-4 h-4',
 xl: 'w-5 h-5',
 };

 const colorLightClass = variant === 'gold' ? 'border-[var(--gold-200)]' : 'border-current opacity-30';
 const colorUltraLightClass = variant === 'gold' ? 'border-[var(--gold-100)]' : 'border-current opacity-10';
 const centerColor = variant === 'gold' ? 'bg-[var(--gold)]' : 'bg-current';

 return (
 <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}>
 {/* Outer Zodiac Orbit Ring (clockwise) */}
 <div
 className={`absolute inset-0 border-2 ${colorUltraLightClass} rounded-full`}
 />
 <div
 className={`absolute inset-0 border-2 border-t-[var(--gold)] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin`}
 style={{ animationDuration: '2.5s' }}
 />

 {/* Inner Constellation Orbit Ring (counter-clockwise) */}
 <div
 className={`absolute ${innerSizeClasses[size]} border border-dashed ${colorLightClass} rounded-full`}
 />
 <div
 className={`absolute ${innerSizeClasses[size]} border border-t-transparent border-r-[var(--gold-light)] border-b-transparent border-l-transparent rounded-full animate-spin`}
 style={{
 animationDuration: '1.5s',
 animationDirection: 'reverse',
 }}
 />

 {/* Center Pulsing Core Star */}
 <div className={`absolute ${centerSizeClasses[size]} flex items-center justify-center`}>
 {/* Pulsing glow */}
 <span className={`absolute inset-0 ${centerColor} rounded-full animate-ping opacity-60`} />
 {/* Center core point */}
 <span className={`relative block w-1.5 h-1.5 bg-[var(--gold)] rounded-full shadow-[0_0_8px_rgba(204,143,51,0.8)]`} />
 </div>
 </div>
 );
}
export default LoadingSpinner;
