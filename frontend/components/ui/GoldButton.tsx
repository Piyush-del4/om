import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'ghost' | 'burgundy';
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
  const baseStyle =
    'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A78652] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm transition-all duration-300 ease-out shadow-sm cursor-pointer';

  const widthStyle = fullWidth ? 'w-full' : '';

  const variantStyles = {
    filled:
      'bg-[#1D1C1A] text-white hover:bg-[#6F2935] border border-transparent px-5 py-2.5 active:scale-[0.98]',
    burgundy:
      'bg-[#6F2935] text-white hover:bg-[#8A3443] border border-transparent px-5 py-2.5 active:scale-[0.98]',
    outlined:
      'bg-transparent text-[#1D1C1A] border border-[#3A3732] hover:bg-[#FAF7F2] hover:border-[#1D1C1A] px-5 py-2.5 active:scale-[0.98]',
    ghost:
      'bg-transparent text-[#1D1C1A] hover:bg-[#FAF7F2] hover:text-[#6F2935] px-4 py-2',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <LoadingSpinner size="sm" variant="current" />
          <span>Processing...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {children}
        </span>
      )}
    </button>
  );
}
