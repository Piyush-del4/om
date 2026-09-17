'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GraduationCap, Plus, Trash2, Edit2, Key, Search, BookOpen } from 'lucide-react';

export default function AdminBatchesPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = React.useState('');

  // Fetch all batches
  const { data: batches, isLoading: loadingBatches } = useQuery({
    queryKey: ['admin-batches'],
    queryFn: async () => {
      const res = await client.get('/batches');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Delete batch mutation
  const deleteBatchMutation = useMutation({
    mutationFn: async (batchId: string) => client.delete(`/batches/${batchId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-batches'] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Failed to delete batch');
    },
  });

  const activeBatches =
    batches?.filter(
      (b: any) =>
        !b.isDeleted &&
        (!searchQuery ||
          b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.category?.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-amber-600" /> Academic Batches & Course Management
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Organize study curriculum, manage lectures, access codes, and student enrollments.
          </p>
        </div>

        <button
          onClick={() => router.push('/admin/batches/new')}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-xl shadow-md shadow-amber-500/10 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create New Batch
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search batches by title or category..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />
        </div>
        <span className="text-xs text-gray-600 font-mono font-semibold">
          {activeBatches.length} Total Batches
        </span>
      </div>

      {/* Batches Grid */}
      {loadingBatches ? (
        <p className="text-xs text-gray-600 animate-pulse">Loading study batches...</p>
      ) : activeBatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeBatches.map((batch: any) => (
            <div
              key={batch._id}
              className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {batch.coverImage?.url && (
                  <div className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    <img src={batch.coverImage.url} alt={batch.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-base font-bold text-gray-900 truncate">{batch.title}</h3>
                  <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-200 rounded-full px-2 py-0.5 font-bold uppercase whitespace-nowrap">
                    {batch.category || 'Astrology'}
                  </span>
                </div>

                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">{batch.description}</p>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-sans">Price:</span>
                    <span className="text-amber-600 font-bold">₹{(batch.price / 100).toLocaleString()}</span>
                  </div>
                  {batch.code && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-sans">Access Code:</span>
                      <span className="text-gray-900 font-bold">{batch.code}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button
                  onClick={() => router.push(`/admin/batches/${batch._id}`)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 hover:bg-amber-50 py-1.5 px-3 rounded-xl transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit & Manage Lectures
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete batch "${batch.title}"? Students will lose access.`)) {
                      deleteBatchMutation.mutate(batch._id);
                    }
                  }}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete Batch"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center border border-dashed border-gray-300 rounded-2xl space-y-3">
          <GraduationCap className="w-10 h-10 text-gray-400 mx-auto" />
          <p className="text-sm font-bold text-gray-800">No study batches created yet</p>
          <p className="text-xs text-gray-600">Click below to create your first academic course batch.</p>
          <button
            onClick={() => router.push('/admin/batches/new')}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create New Batch
          </button>
        </div>
      )}
    </div>
  );
}
