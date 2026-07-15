import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function GoldButton({
  children,
  variant = 'filled',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: GoldButtonProps) {
  // Use a premium spring bezier for scaling and transform active states
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:scale-[1.025] active:scale-[0.965] active:translate-y-[0.5px] transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] transform shadow-sm';
  
  const widthStyle = fullWidth ? 'w-full' : '';

  // Extract padding classes to apply them to the inner span in filled variant
  const classes = className.split(' ').filter(Boolean);
  const paddingClasses = classes.filter(c => 
    c.startsWith('p-') || 
    c.startsWith('px-') || 
    c.startsWith('py-') || 
    c.startsWith('pt-') || 
    c.startsWith('pb-') || 
    c.startsWith('pl-') || 
    c.startsWith('pr-')
  ).join(' ');

  const nonPaddingClasses = classes.filter(c => 
    !c.startsWith('p-') && 
    !c.startsWith('px-') && 
    !c.startsWith('py-') && 
    !c.startsWith('pt-') && 
    !c.startsWith('pb-') && 
    !c.startsWith('pl-') && 
    !c.startsWith('pr-')
  ).join(' ');

  if (variant === 'filled') {
    return (
      <button
        className={`${baseStyle} border border-[var(--gold)]/30 p-[2.5px] bg-black/40 hover:border-[var(--gold)]/60 ${widthStyle} ${nonPaddingClasses} relative overflow-hidden group`}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shine highlight overlay on hover */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none z-10"></span>
        
        <span className={`w-full h-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)] hover:from-[var(--gold-light)] hover:to-[var(--gold-dark)] text-black rounded-full ${paddingClasses || 'px-5 py-2'} flex items-center justify-center gap-2 transition-all duration-500 ease-out shadow-[0_4px_12px_rgba(204,143,51,0.12)] group-hover:shadow-[0_6px_18px_rgba(204,143,51,0.25)]`}>
          {isLoading ? (
            <LoadingSpinner size="sm" variant="current" />
          ) : (
            children
          )}
        </span>
      </button>
    );
  }

  const variants = {
    outlined: 'border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold-50)] hover:border-[var(--gold-light)] bg-transparent px-5 py-2',
    ghost: 'text-[var(--gold)] hover:bg-[var(--gold-50)] bg-transparent border-transparent px-5 py-2',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant as 'outlined' | 'ghost']} ${widthStyle} ${className} relative overflow-hidden`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit rounded-[inherit]">
          <LoadingSpinner size="sm" variant="current" />
        </span>
      )}
      <span className={`flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
    </button>
  );
}

