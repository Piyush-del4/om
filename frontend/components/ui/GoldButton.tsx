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
    'inline-flex items-center justify-center font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A78652] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm transition-all duration-300 ease-out shadow-sm cursor-pointer transform hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg active:translate-y-0 active:scale-95';

  const widthStyle = fullWidth ? 'w-full' : '';

  const variantStyles = {
    filled:
      'bg-[#1D1C1A] text-white hover:bg-[#6F2935] hover:text-white hover:shadow-[0_6px_20px_rgba(111,41,53,0.35)] px-5 py-2.5',
    burgundy:
      'bg-[#6F2935] text-white hover:bg-[#8A3443] hover:text-white hover:shadow-[0_6px_20px_rgba(138,52,67,0.35)] px-5 py-2.5',
    outlined:
      'bg-white text-[#1D1C1A] border border-gray-200 hover:border-[#1D1C1A] hover:bg-[#FAF7F2] hover:shadow-md px-5 py-2.5',
    ghost:
      'bg-transparent text-[#1D1C1A] hover:bg-[#FAF7F2] hover:text-[#6F2935] px-4 py-2 shadow-none hover:shadow-sm',
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

