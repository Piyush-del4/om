'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { Bell, Calendar, ShoppingBag, GraduationCap, Sparkles, CheckCheck, Clock, ExternalLink } from 'lucide-react';

interface NotificationItem {
  _id: string;
  type: 'appointment' | 'order' | 'batch' | 'horoscope' | 'offer';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export function NotificationBellContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'appointment' | 'order' | 'batch' | 'offer'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch notifications
  const { data } = useQuery({
    queryKey: ['my-notifications'],
    queryFn: async () => {
      const res = await client.get('/notifications/me');
      return res.data?.data || { notifications: [], unreadCount: 0 };
    },
    refetchInterval: 20000, // Poll every 20s
  });

  const notifications: NotificationItem[] = data?.notifications || [];
  const unreadCount: number = data?.unreadCount || 0;

  // Mark all as read mutation
  const markAllMutation = useMutation({
    mutationFn: async () => {
      await client.patch('/notifications/read-all');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
  });

  // Mark single as read mutation
  const markSingleMutation = useMutation({
    mutationFn: async (id: string) => {
      await client.patch(`/notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
  });

  const filteredNotifications = notifications.filter(
    (n) => activeTab === 'all' || n.type === activeTab
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case 'batch':
        return <GraduationCap className="w-4 h-4 text-indigo-600" />;
      case 'offer':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-gray-600 hover:text-[var(--gold)] hover:bg-amber-50 transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown Container */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-[var(--gold-200)] bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden z-50 animate-fadeIn">
          
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-amber-100/60 border-b border-[var(--gold-100)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#8C5D30]" />
              <h4 className="font-serif font-bold text-sm text-[#5A3815]">Notifications</h4>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold bg-[#E38100] text-black px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllMutation.mutate()}
                className="text-xs font-semibold text-[#8C5D30] hover:text-[#5A3815] flex items-center gap-1 cursor-pointer hover:underline"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-100 overflow-x-auto text-[11px] font-semibold">
            {[
              { id: 'all', label: 'All' },
              { id: 'appointment', label: 'Appointments' },
              { id: 'order', label: 'Orders' },
              { id: 'batch', label: 'Batches' },
              { id: 'offer', label: 'Offers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#5A3815] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    if (!item.isRead) markSingleMutation.mutate(item._id);
                  }}
                  className={`p-3 sm:p-4 hover:bg-amber-50/60 transition-colors flex items-start gap-3 relative group ${
                    !item.isRead ? 'bg-amber-50/30 font-medium' : ''
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white border border-amber-200/60 shadow-xs flex-shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-xs font-bold text-gray-900 truncate">{item.title}</h5>
                      <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-2.5 h-2.5" />
                        {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-snug line-clamp-2">{item.message}</p>
                    {item.link && (
                      <Link
                        href={item.link}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8C5D30] hover:underline pt-1"
                      >
                        <span>View Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#E38100] absolute right-2 top-3"></span>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center space-y-2">
                <Bell className="w-8 h-8 text-gray-300 mx-auto" />
                <p className="text-xs text-gray-500 font-medium">No notifications in this category yet.</p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
