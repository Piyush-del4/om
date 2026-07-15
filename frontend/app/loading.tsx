import React from 'react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export default function GlobalRouteLoading() {
  return (
    <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
      {/* Top glowing progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-neutral-950 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)] shadow-[0_0_6px_rgba(204,143,51,0.5)] animate-shimmer"
          style={{ width: '100%' }}
        />
      </div>

      {/* Main loading content */}
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-400 font-mono tracking-widest uppercase animate-pulse pt-2">
          Aligning celestial paths...
        </p>
      </div>
    </div>
  );
}
