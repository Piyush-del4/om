'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import {
  FileText,
  Calendar,
  MapPin,
  Search,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminOnlyKundlisPage() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all saved Kundlis for admin
  const { data: submissions, isLoading, refetch } = useQuery({
    queryKey: ['admin-saved-kundlis'],
    queryFn: async () => {
      const res = await client.get('/astrology/submissions/admin/all');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the saved Kundli for "${name}"?`)) return;

    try {
      await client.delete(`/astrology/submissions/${id}`);
      toast.success('Saved Kundli deleted successfully.');
      refetch();
    } catch (err) {
      console.error('Failed to delete saved Kundli:', err);
      toast.error('Failed to delete saved Kundli.');
    }
  };

  const adminSubmissions = submissions?.filter((sub: any) => sub.userId?._id === user?._id) || [];
  const filteredSubmissions = adminSubmissions.filter((sub: any) => {
    const q = searchTerm.toLowerCase();
    const kundliName = sub.name?.toLowerCase() || '';
    const location = sub.location?.toLowerCase() || '';
    return kundliName.includes(q) || location.includes(q);
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-600" /> Admin's Personal Saved Kundlis
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Access and manage birth charts specifically generated under your admin account.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-xs text-gray-600 uppercase font-semibold">Your Records:</span>
          <span className="text-xl font-bold text-amber-600 font-serif">
            {filteredSubmissions.length}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name or birth location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <p className="text-xs text-gray-600 animate-pulse">Loading admin Kundli records...</p>
      ) : filteredSubmissions.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-gray-200/80 bg-white shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80 font-semibold text-gray-600 font-mono text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Chart Name</th>
                <th className="py-3 px-4">Birth Details</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredSubmissions.map((sub: any) => (
                <tr key={sub._id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>{sub.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5 text-gray-700">
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <Calendar className="w-3 h-3 text-amber-600" />
                        <span>
                          {new Date(sub.date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}{' '}
                          at {sub.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>
                          {sub.location}
                          {sub.country ? `, ${sub.country}` : ''}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-gray-600">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/premium-personalized-kundli?id=${sub._id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 font-bold rounded-xl transition-colors text-[11px]"
                      >
                        Open Chart <ExternalLink className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => handleDelete(sub._id, sub.name)}
                        className="p-1.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center border border-dashed border-gray-300 rounded-2xl space-y-2">
          <FileText className="w-8 h-8 text-gray-400 mx-auto" />
          <p className="text-xs font-semibold text-gray-700">No Admin Janam Kundli records found</p>
          <p className="text-[11px] text-gray-600">Kundlis generated under your admin profile will be listed here.</p>
        </div>
      )}
    </div>
  );
}
