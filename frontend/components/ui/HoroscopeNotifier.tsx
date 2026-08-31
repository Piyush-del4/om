'use client';

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/auth/AuthProvider';
import { client } from '@/lib/api/client';
import { Sparkles, X } from 'lucide-react';

export function HoroscopeNotifier() {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchAndShowHoroscope = async () => {
      if (!isAuthenticated || !user?.zodiacSign) return;

      const todayStr = new Date().toISOString().split('T')[0];
      const storageKey = `horoscope_notified_${user.zodiacSign}_${todayStr}`;
      
      // If already shown today, skip
      if (localStorage.getItem(storageKey) === 'true') {
        return;
      }

      try {
        const response = await client.get('/astrology/horoscope/latest');
        if (response.data?.success && response.data?.data) {
          const horoscopeDoc = response.data.data;
          // The data object has signs as keys, but they might be lowercase
          const signLower = user.zodiacSign.toLowerCase();
          const userHoroscope = horoscopeDoc.data?.[signLower];

          if (userHoroscope) {
            // Show toast
            toast.custom(
              (t) => (
                <div
                  className={`${
                    t.visible ? 'animate-fade-in' : 'animate-fade-out opacity-0'
                  } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-amber-100/50 overflow-hidden relative`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                      <circle cx="80" cy="20" r="60" stroke="#e77600" strokeWidth="0.5" strokeDasharray="3 4" />
                    </svg>
                  </div>
                  
                  <div className="flex-1 w-0 p-4 border-l-4 border-[#e77600]">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
                          <Sparkles className="h-4 w-4 text-[#e77600]" />
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-serif font-bold text-gray-900">
                          Your Daily Insight, {user.name.split(' ')[0]} ✨
                        </p>
                        <p className="mt-1 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {userHoroscope.split('.').slice(0, 2).join('.')}...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-100">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-medium text-[#e77600] hover:bg-orange-50 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-[#e77600]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ),
              { duration: 8000, position: 'top-right' }
            );

            // Mark as shown for today
            localStorage.setItem(storageKey, 'true');
          }
        }
      } catch (error) {
        console.error('Failed to fetch daily horoscope notification:', error);
      }
    };

    // Small delay to let the page load completely before sliding in the notification
    const timeout = setTimeout(() => {
      fetchAndShowHoroscope();
    }, 2500);

    return () => clearTimeout(timeout);
  }, [user, isAuthenticated]);

  return null; // This component doesn't render anything directly in the DOM
}
