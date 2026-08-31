'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { Bell, Sparkles, X, ArrowRight } from 'lucide-react';

export function NotificationToastBanner() {
  const { isAuthenticated } = useAuth();
  const [activeBanner, setActiveBanner] = useState<any | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const [shownIds, setShownIds] = useState<Set<string>>(new Set());

  // Poll for notifications
  const { data } = useQuery({
    queryKey: ['my-notifications-toast'],
    queryFn: async () => {
      const res = await client.get('/notifications/me');
      return res.data?.data || { notifications: [], unreadCount: 0 };
    },
    enabled: isAuthenticated,
    refetchInterval: 10000, // Poll every 10s
  });

  const notifications = data?.notifications || [];

  // Detect latest unread notification that hasn't been shown yet in this session
  useEffect(() => {
    if (!notifications || notifications.length === 0) return;

    const unread = notifications.find((n: any) => {
      if (n.isRead) return false;
      if (shownIds.has(n._id)) return false;
      if (typeof window !== 'undefined' && sessionStorage.getItem(`shown_notif_${n._id}`)) return false;
      return true;
    });

    if (unread && !activeBanner) {
      setActiveBanner(unread);
      setShownIds((prev) => new Set(prev).add(unread._id));
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`shown_notif_${unread._id}`, 'true');
      }
      setIsMerging(false);

      // Auto merge into Bell Icon after 6 seconds
      const timer = setTimeout(() => {
        triggerMerge(unread._id);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [notifications, shownIds, activeBanner]);

  const triggerMerge = async (notifId?: string) => {
    setIsMerging(true);
    if (notifId) {
      try {
        await client.patch('/notifications/read-all');
      } catch (err) {
        // silent fallback
      }
    }
    setTimeout(() => {
      setActiveBanner(null);
      setIsMerging(false);
    }, 600);
  };

  if (!isAuthenticated || !activeBanner) return null;

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-in-out transform ${
        isMerging
          ? 'translate-x-[35vw] -translate-y-12 scale-0 opacity-0'
          : 'translate-y-0 scale-100 opacity-100'
      }`}
    >
      <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-amber-900 text-white border-2 border-amber-400/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md max-w-md w-[92vw] sm:w-[450px] space-y-2 relative overflow-hidden group">
        
        {/* Shimmer line animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent -translate-x-full animate-shimmer" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block">
                ✦ New Notification
              </span>
              <h4 className="font-serif font-bold text-sm text-[var(--gold)] truncate max-w-[260px]">
                {activeBanner.title}
              </h4>
            </div>
          </div>

          <button
            onClick={() => triggerMerge(activeBanner._id)}
            className="p-1 text-amber-200/60 hover:text-amber-100 hover:bg-amber-800/40 rounded-lg transition cursor-pointer"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-amber-100/90 leading-relaxed pl-1 line-clamp-2">
          {activeBanner.message}
        </p>

        {activeBanner.link && (
          <div className="pt-2 flex items-center justify-between border-t border-amber-800/60">
            <Link
              href={activeBanner.link}
              onClick={() => triggerMerge(activeBanner._id)}
              className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 hover:underline"
            >
              <span>Explore Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <span className="text-[10px] font-mono text-amber-300/60 flex items-center gap-1">
              <Bell className="w-3 h-3" /> Merging to Bell
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
