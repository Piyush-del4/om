'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { Bell, Send, Shield, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { GoldButton } from '@/components/ui/GoldButton';
import toast from 'react-hot-toast';

export default function AdminNotificationBroadcastPage() {
  const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [type, setType] = useState<'offer' | 'horoscope' | 'order' | 'appointment' | 'batch'>('offer');

  const broadcastMutation = useMutation({
    mutationFn: async () => {
      const res = await client.post('/notifications/broadcast', {
        title,
        message,
        link: linkUrl || undefined,
        type,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Notification broadcast sent successfully!');
      setTitle('');
      setMessage('');
      setLinkUrl('');
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to send broadcast.');
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--gold)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAD5B8] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8C5D30] uppercase tracking-widest">
              <Shield className="w-4 h-4 text-[var(--gold-dark)]" />
              <span>Admin Broadcast Control</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#5A3815]">
              Send Notification to All Users
            </h1>
          </div>

          <Link href="/admin/dashboard">
            <GoldButton variant="outlined" className="text-xs flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </GoldButton>
          </Link>
        </div>

        {/* Broadcast Composer Form */}
        <div className="bg-white border-2 border-[#EAD5B8] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
            <div className="p-3 bg-amber-100/80 rounded-2xl text-amber-900">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#5A3815]">Compose Global Broadcast</h3>
              <p className="text-xs text-gray-500">
                This message will be instantly delivered to all user notification bell containers across the platform.
              </p>
            </div>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!title.trim() || !message.trim()) {
                toast.error('Title and Message are required.');
                return;
              }
              broadcastMutation.mutate();
            }}
            className="space-y-5 text-sm"
          >
            {/* Category / Type Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Notification Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {[
                  { id: 'offer', label: '🎁 Promo Offer' },
                  { id: 'horoscope', label: '🔮 Horoscope' },
                  { id: 'order', label: '📦 Shop Update' },
                  { id: 'appointment', label: '📅 Appointment' },
                  { id: 'batch', label: '🎓 Study Batch' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setType(cat.id as any)}
                    className={`py-2 px-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                      type === cat.id
                        ? 'bg-[#5A3815] text-white border-[#5A3815] shadow-xs'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Notification Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ✦ Special 20% Off Festival Discount on All Rudrakshas!"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5A3815]"
                required
              />
            </div>

            {/* Notification Message */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Message Content *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Enter details of your broadcast message..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5A3815]"
                required
              />
            </div>

            {/* Target Redirect URL */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Target Redirect Link (Optional)
              </label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="e.g. /shop or /horoscope/daily/aries"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5A3815]"
              />
              <p className="text-[11px] text-gray-400 mt-1">Users will be directed here when they click the notification.</p>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-amber-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={broadcastMutation.isPending}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-gray-900 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer border border-amber-400/40"
              >
                <Send className="w-4 h-4" />
                <span>{broadcastMutation.isPending ? 'Broadcasting...' : 'Broadcast to All Users Now'}</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
