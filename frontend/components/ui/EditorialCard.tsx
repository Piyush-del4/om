import React from 'react';

interface EditorialCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function EditorialCard({
  children,
  className = '',
  onClick,
  hoverable = true,
}: EditorialCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-[#E7E0D4] p-6 text-[#1D1C1A] ${
        hoverable
          ? 'hover:border-[#A78652]/60 hover:shadow-sm transition-all duration-300'
          : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
