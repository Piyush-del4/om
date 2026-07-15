import React from 'react';
import { GoldCard } from './GoldCard';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
  return (
    <div
      className={`bg-neutral-900/60 rounded-lg animate-shimmer relative overflow-hidden ${className}`}
      style={style}
    />
  );
}

// 1. Course/Batch Card Skeleton
export function BatchCardSkeleton({ count = 2, className = "grid grid-cols-1 md:grid-cols-2 gap-6 w-full" }: { count?: number; className?: string }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <GoldCard
          key={i}
          theme="dark"
          className="border border-[var(--gold-100)] flex flex-col justify-between overflow-hidden p-6 h-[400px] w-full"
        >
          <div className="space-y-4">
            {/* Cover image placeholder */}
            <Skeleton className="w-full h-44 rounded-t-xl -mt-6 -mx-6 mb-4" style={{ width: 'calc(100% + 3rem)' }} />
            
            <div className="space-y-2.5">
              {/* Title */}
              <Skeleton className="w-2/3 h-5" />
              {/* Description lines */}
              <Skeleton className="w-full h-3.5" />
              <Skeleton className="w-5/6 h-3.5" />
              <Skeleton className="w-4/5 h-3.5" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800 space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="w-1/4 h-3" />
              <Skeleton className="w-1/3 h-6" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="w-full h-9 rounded-full" />
              <Skeleton className="w-full h-9 rounded-full" />
            </div>
          </div>
        </GoldCard>
      ))}
    </div>
  );
}

// 2. Shop Item Card Skeleton
export function ShopItemSkeleton({ count = 3, className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full" }: { count?: number; className?: string }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <GoldCard
          key={i}
          theme="dark"
          className="border border-[var(--gold-100)] flex flex-col justify-between overflow-hidden h-[380px]"
        >
          <div className="space-y-4">
            {/* Item Image */}
            <Skeleton className="w-full h-48 rounded-t-xl -mt-6 -mx-6 mb-4" style={{ width: 'calc(100% + 3rem)' }} />
            
            <div className="space-y-2">
              {/* Title */}
              <Skeleton className="w-1/2 h-5" />
              {/* Description */}
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-4/5 h-3" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-800">
            <Skeleton className="w-1/4 h-5" />
            <Skeleton className="w-1/3 h-8 rounded-full" />
          </div>
        </GoldCard>
      ))}
    </div>
  );
}

// 3. User Profile Form Skeleton
export function ProfileFormSkeleton() {
  return (
    <div className="space-y-8 w-full max-w-2xl mx-auto">
      {/* Avatar Header Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2 flex-grow">
          <Skeleton className="w-1/3 h-5" />
          <Skeleton className="w-1/4 h-3.5" />
        </div>
      </div>

      {/* Edit Profile Card Skeleton */}
      <GoldCard theme="dark" className="border border-[var(--gold-100)] p-6 space-y-5">
        <Skeleton className="w-1/4 h-6 mb-2" />
        <div className="space-y-4">
          <div className="space-y-1">
            <Skeleton className="w-16 h-3" />
            <Skeleton className="w-full h-10 rounded-lg" />
          </div>
          <div className="space-y-1">
            <Skeleton className="w-24 h-3" />
            <Skeleton className="w-full h-10 rounded-lg" />
          </div>
          <div className="space-y-1">
            <Skeleton className="w-12 h-3" />
            <Skeleton className="w-full h-10 rounded-lg" />
          </div>
          <Skeleton className="w-32 h-9 rounded-full" />
        </div>
      </GoldCard>
    </div>
  );
}

// 4. Lectures and Notes List Skeleton (Academy portal)
export function LecturesListSkeleton() {
  return (
    <div className="space-y-6 w-full">
      {/* Section Title */}
      <div className="border-b border-neutral-800 pb-4">
        <Skeleton className="w-1/3 h-7" />
        <Skeleton className="w-2/3 h-4 mt-2" />
      </div>

      {/* Lectures Grid */}
      <div className="space-y-4">
        <Skeleton className="w-24 h-5" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <GoldCard key={i} theme="dark" className="border border-[var(--gold-100)] p-4 flex flex-col justify-between h-40">
              <div className="space-y-2">
                <Skeleton className="w-3/4 h-4" />
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-5/6 h-3" />
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-800/60">
                <Skeleton className="w-1/3 h-3" />
                <Skeleton className="w-20 h-7 rounded-full" />
              </div>
            </GoldCard>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-4 pt-4">
        <Skeleton className="w-20 h-5" />
        <div className="space-y-2.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800">
              <div className="flex items-center gap-2 flex-grow">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="w-1/2 h-3" />
              </div>
              <Skeleton className="w-24 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 5. Shopping Cart List + Order Summary Skeleton
export function CartSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      {/* Cart items list */}
      <div className="lg:col-span-2 space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <GoldCard key={i} theme="dark" className="border border-[var(--gold-100)] p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-1/4 h-3.5" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-7 h-7 rounded-md" />
                <Skeleton className="w-6 h-4" />
                <Skeleton className="w-7 h-7 rounded-md" />
              </div>
              <Skeleton className="w-20 h-4 ml-4" />
              <Skeleton className="w-6 h-6 rounded" />
            </div>
          </GoldCard>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <GoldCard theme="dark" className="border border-[var(--gold-200)] p-6 space-y-4">
          <Skeleton className="w-1/2 h-5" />
          <div className="space-y-3 pt-2 text-sm">
            <div className="flex justify-between"><Skeleton className="w-1/3 h-3.5" /><Skeleton className="w-1/4 h-3.5" /></div>
            <div className="flex justify-between"><Skeleton className="w-1/4 h-3.5" /><Skeleton className="w-1/4 h-3.5" /></div>
            <div className="h-px bg-neutral-800 my-2"></div>
            <div className="flex justify-between"><Skeleton className="w-1/3 h-4" /><Skeleton className="w-1/4 h-4" /></div>
          </div>
          <div className="space-y-2 pt-2">
            <Skeleton className="w-1/3 h-3" />
            <Skeleton className="w-full h-16 rounded-lg" />
          </div>
          <Skeleton className="w-full h-11 rounded-full mt-4" />
        </GoldCard>
      </div>
    </div>
  );
}
