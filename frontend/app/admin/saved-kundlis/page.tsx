'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { FileText, ArrowLeft, Calendar, Clock, MapPin, Search, Trash2, ExternalLink, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSavedKundlisPage() {
 const { user, isAuthenticated, isLoading: authLoading } = useAuth();
 const router = useRouter();
 const [searchTerm, setSearchTerm] = useState('');

 // Admin guard
 React.useEffect(() => {
 if (!authLoading) {
 if (!isAuthenticated) router.push('/login');
 else if (user?.role !== 'admin') router.push('/dashboard');
 }
 }, [user, isAuthenticated, authLoading, router]);

 // Fetch all saved Kundlis for admin
 const { data: submissions, isLoading, refetch } = useQuery({
 queryKey: ['admin-saved-kundlis'],
 queryFn: async () => {
 const res = await client.get('/astrology/submissions/admin/all');
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin',
 });

 // Handle delete
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

 if (authLoading || (isAuthenticated && isLoading)) {
 return (
 <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center">
 <LoadingSpinner size="lg" />
 <p className="text-xs text-gray-600 font-mono tracking-widest uppercase animate-pulse mt-4">
 Loading platform Kundli records...
 </p>
 </div>
 );
 }

 if (!user || user.role !== 'admin') return null;

 // Filtered submissions by search query
 const filteredSubmissions = submissions?.filter((sub: any) => {
 const q = searchTerm.toLowerCase();
 const userName = sub.userId?.name?.toLowerCase() || '';
 const userEmail = sub.userId?.email?.toLowerCase() || '';
 const kundliName = sub.name?.toLowerCase() || '';
 const location = sub.location?.toLowerCase() || '';
 return userName.includes(q) || userEmail.includes(q) || kundliName.includes(q) || location.includes(q);
 });

 return (
 <div className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
 <div className="max-w-6xl mx-auto space-y-8">
 {/* Header */}
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6">
 <div>
 <Link 
 href="/admin/dashboard" 
 className="inline-flex items-center gap-2 text-xs text-[var(--gold)] hover:underline font-mono uppercase tracking-wider mb-2"
 >
 <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Workspace
 </Link>
 <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
 <FileText className="w-8 h-8 text-[var(--gold)]" /> User Saved Kundlis
 </h1>
 <p className="text-gray-600 text-sm mt-1">Manage and access all Kundlis generated across the platform.</p>
 </div>

 <div className="text-right">
 <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Total Records</span>
 <p className="text-3xl font-bold text-[var(--gold)] font-serif">{submissions?.length || 0}</p>
 </div>
 </div>

 {/* Search & Actions Bar */}
 <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
 <div className="relative w-full sm:w-80">
 <Search className="w-4 h-4 text-gray-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
 <input
 type="text"
 placeholder="Search by user, email or name..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full bg-gray-100 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[var(--gold)]"
 />
 </div>
 </div>

 {/* Table / List */}
 <GoldCard className="border border-gray-200 overflow-hidden">
 {filteredSubmissions && filteredSubmissions.length > 0 ? (
 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs text-gray-600">
 <thead className="bg-gray-100/80 text-gray-600 uppercase font-mono tracking-wider border-b border-gray-200">
 <tr>
 <th className="py-3.5 px-4">Generated For</th>
 <th className="py-3.5 px-4">User Account</th>
 <th className="py-3.5 px-4">Birth Details</th>
 <th className="py-3.5 px-4">Created On</th>
 <th className="py-3.5 px-4 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-neutral-900">
 {filteredSubmissions.map((sub: any) => (
 <tr key={sub._id} className="hover:bg-gray-100/40 transition-colors">
 <td className="py-4 px-4 font-bold text-gray-900">
 <div className="flex items-center gap-2">
 <FileText className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
 <span>{sub.name}</span>
 </div>
 </td>
 <td className="py-4 px-4">
 <div className="space-y-0.5">
 <p className="font-semibold text-gray-900 flex items-center gap-1">
 <UserIcon className="w-3 h-3 text-gray-600" />
 {sub.userId?.name || 'Guest / Unknown'}
 </p>
 <p className="text-[11px] text-gray-500">{sub.userId?.email || 'N/A'}</p>
 <p className="text-[11px] text-gray-500">{sub.userId?.phone || 'No phone'}</p>
 </div>
 </td>
 <td className="py-4 px-4">
 <div className="space-y-1 font-light">
 <p className="flex items-center gap-1.5 text-gray-600">
 <Calendar className="w-3 h-3 text-[var(--gold)]/70" />
 <span>{new Date(sub.date).toLocaleDateString()} at {sub.time}</span>
 </p>
 <p className="flex items-center gap-1.5 text-gray-600">
 <MapPin className="w-3 h-3 text-[var(--gold)]/70" />
 <span>{sub.location}{sub.country ? `, ${sub.country}` : ''}</span>
 </p>
 </div>
 </td>
 <td className="py-4 px-4 font-mono text-[11px] text-gray-500">
 {new Date(sub.createdAt).toLocaleDateString()}
 </td>
 <td className="py-4 px-4 text-right">
 <div className="flex items-center justify-end gap-2">
 <Link 
 href={`/premium-personalized-kundli?id=${sub._id}`}
 className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--gold-10)] text-[var(--gold)] border border-[var(--gold-200)] hover:bg-[var(--gold)] hover:text-black font-semibold rounded-lg transition-colors text-xs"
 title="Open Kundli Report"
 >
 Open Report <ExternalLink className="w-3 h-3" />
 </Link>
 <button
 onClick={() => handleDelete(sub._id, sub.name)}
 className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
 title="Delete Submission"
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
 <div className="text-center py-16 space-y-4">
 <FileText className="w-12 h-12 text-gray-600 mx-auto" />
 <p className="text-gray-600 text-sm">No saved Kundli records found matching your search.</p>
 </div>
 )}
 </GoldCard>
 </div>
 </div>
 );
}
