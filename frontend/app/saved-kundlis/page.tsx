'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { UserPanelShell } from '@/components/user/UserPanelShell';
import { FileText, Calendar, Clock, MapPin, Trash2, ExternalLink, Sparkles, Plus, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SavedKundlisPage() {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch saved Kundlis
  const { data: savedList, isLoading, refetch } = useQuery({
    queryKey: ['saved-kundlis'],
    queryFn: async () => {
      const res = await client.get('/astrology/submissions');
      return res.data?.data || [];
    },
    enabled: isAuthenticated,
  });

  // Handle delete saved Kundli
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this saved Kundli report?')) return;

    try {
      await client.delete(`/astrology/submissions/${id}`);
      toast.success('Saved Kundli deleted successfully.');
      refetch();
    } catch (err) {
      console.error('Failed to delete saved Kundli:', err);
      toast.error('Failed to delete saved Kundli.');
    }
  };

  const filteredKundlis = savedList?.filter((k: any) =>
    k.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.location?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <UserPanelShell
      activeTab="saved-kundlis"
      title="Saved Kundlis & Birth Reports"
      subtitle="Access and manage your generated Janam Kundlis and astrological report charts."
    >
      <div className="space-y-6 max-w-5xl">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or birth location..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          {/* Action Button */}
          <Link
            href="/premium-personalized-kundli"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New Kundli</span>
          </Link>
        </div>

        {/* Vault Grid */}
        {isLoading ? (
          <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center">
            <FileText className="w-8 h-8 text-amber-500 mx-auto animate-bounce mb-3" />
            <p className="text-gray-500 text-xs animate-pulse font-mono">Loading saved Kundlis vault...</p>
          </div>
        ) : filteredKundlis && filteredKundlis.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredKundlis.map((kundli: any) => (
              <div
                key={kundli._id}
                className="bg-white p-5 rounded-3xl border border-gray-200 hover:border-amber-400/80 transition-all shadow-sm flex flex-col justify-between space-y-4 group relative"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3 pr-8">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 flex-shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-base text-gray-900 group-hover:text-amber-700 transition-colors">
                          {kundli.name}
                        </h3>
                        <span className="text-[10px] text-gray-400 font-mono">
                          Saved on {new Date(kundli.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5 text-xs text-gray-600 pt-1 border-t border-gray-100">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{new Date(kundli.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{kundli.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span className="truncate">{kundli.location}{kundli.country ? `, ${kundli.country}` : ''}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <Link
                    href={`/premium-personalized-kundli?id=${kundli._id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold rounded-xl text-xs transition-colors"
                  >
                    <span>Open Chart</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                  </Link>

                  <button
                    onClick={(e) => handleDelete(kundli._id, e)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete saved report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-4">
            <FileText className="w-12 h-12 text-gray-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-gray-800">No Saved Kundlis Located</h3>
              <p className="text-gray-500 text-xs max-w-xs mx-auto">
                Generate your personalized Janam Kundli chart to save it in your vault.
              </p>
            </div>
            <Link
              href="/premium-personalized-kundli"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              <span>Generate Kundli</span>
            </Link>
          </div>
        )}
      </div>
    </UserPanelShell>
  );
}
