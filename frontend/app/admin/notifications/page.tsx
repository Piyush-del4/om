'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { Bell, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminNotificationBroadcastPage() {
  const { isAuthenticated, user } = useAuth();
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

  return (
    <div className="max-w-3xl space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Bell className="w-6 h-6 text-amber-600" /> Broadcast Alerts & Promotional Notifications
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          Send custom announcements, promotional offers, and system notifications to all users across the platform.
        </p>
      </div>

      {/* Broadcast Form */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-gray-900">Compose Broadcast Notification</h3>
            <p className="text-xs text-gray-600">
              Delivered instantly to user notification bells across desktop and mobile.
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
          className="space-y-5 text-xs"
        >
          {/* Notification Category */}
          <div className="space-y-2">
            <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider font-mono">
              Notification Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {[
                { id: 'offer', label: '🎁 Promo Offer' },
                { id: 'horoscope', label: '🔮 Horoscope' },
                { id: 'order', label: '📦 Store Update' },
                { id: 'appointment', label: '📅 Appointment' },
                { id: 'batch', label: '🎓 Study Batch' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setType(cat.id as any)}
                  className={`py-2 px-3 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                    type === cat.id
                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-sm'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-700">Notification Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. ✦ Special 20% Festival Discount on All Rudraksha Stones!"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-700">Message Content *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Enter details of your announcement or promotional offer..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 leading-relaxed"
              required
            />
          </div>

          {/* Link */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-700">
              Target Redirect Link <span className="text-gray-600 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="e.g. /shop or /astrology"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-mono"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={broadcastMutation.isPending}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{broadcastMutation.isPending ? 'Broadcasting Alert...' : 'Broadcast to All Users Now'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
