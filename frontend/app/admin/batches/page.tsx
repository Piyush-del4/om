'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GraduationCap, Plus, Trash2, Edit2, ArrowLeft, Key } from 'lucide-react';

export default function AdminBatchesPage() {
 const { user, isAuthenticated, isLoading } = useAuth();
 const router = useRouter();
 const queryClient = useQueryClient();

 React.useEffect(() => {
 if (!isLoading) {
 if (!isAuthenticated) router.push('/login');
 else if (user?.role !== 'admin') router.push('/dashboard');
 }
 }, [user, isAuthenticated, isLoading, router]);

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
 mutationFn: async (batchId: string) => {
 return client.delete(`/batches/${batchId}`);
 },
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-batches'] });
 alert('Batch soft-deleted successfully!');
 },
 onError: (err: any) => {
 alert(err.response?.data?.error?.message || 'Failed to delete batch');
 },
 });

 const activeBatches = batches?.filter((b: any) => !b.isDeleted) || [];

 if (isLoading || !user || user.role !== 'admin') {
 return <div className="min-h-screen bg-white flex items-center justify-center text-gray-600">Verifying Admin Privileges...</div>;
 }

 return (
 <div className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
 <div className="max-w-6xl mx-auto space-y-8">
 <div className="flex items-center justify-between">
 <button onClick={() => router.push('/admin/dashboard')} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium">
 <ArrowLeft className="w-4 h-4" /> Back to Dashboard
 </button>

 <button
 onClick={() => router.push('/admin/batches/new')}
 className="flex items-center gap-1.5 bg-[var(--gold)] text-black text-xs font-bold py-2 px-4 rounded-full hover:bg-[var(--gold-light)] transition-all"
 >
 <Plus className="w-4 h-4" /> Create New Batch
 </button>
 </div>

 <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
 <GraduationCap className="w-8 h-8 text-[var(--gold)]" /> Academic Batches Management
 </h1>

 {loadingBatches ? (
 <p className="text-gray-600 text-sm animate-pulse">Loading batches...</p>
 ) : activeBatches.length > 0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {activeBatches.map((batch: any) => (
 <GoldCard key={batch._id} className="border border-[var(--gold-100)] flex flex-col justify-between overflow-hidden">
 {batch.coverImage?.url && (
 <div className="w-full h-40 bg-gray-100 overflow-hidden rounded-t-xl -mt-6 -mx-6 mb-4" style={{ width: 'calc(100% + 3rem)' }}>
 <img src={batch.coverImage.url} alt={batch.title} className="w-full h-full object-cover" />
 </div>
 )}
 
 <div className="space-y-2 flex-1">
 <div className="flex items-center justify-between gap-2">
 <h3 className="font-serif text-base font-bold text-gray-900 truncate">{batch.title}</h3>
 <span className="text-[9px] bg-gray-200 text-[var(--gold)] border border-[var(--gold-100)] rounded-full px-1.5 py-0.5 whitespace-nowrap">
 {batch.category || 'Astrology'}
 </span>
 </div>
 <p className="text-gray-600 text-[11px] leading-relaxed line-clamp-3">{batch.description}</p>
 
 {/* Access details */}
 <div className="bg-gray-50/40 p-2.5 rounded-lg border border-neutral-900 text-[10px] space-y-1 mt-3">
 <p className="flex justify-between"><span className="text-gray-500">Price:</span> <span className="text-[var(--gold)] font-bold">₹{(batch.price / 100).toLocaleString()}</span></p>
 {batch.code && <p className="flex justify-between"><span className="text-gray-500">Access Code:</span> <span className="text-gray-900 font-mono">{batch.code}</span></p>}
 </div>
 </div>

 <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
 <button
 onClick={() => router.push(`/admin/batches/${batch._id}`)}
 className="flex items-center gap-1 bg-gray-100 border border-[var(--gold-200)] text-[var(--gold)] text-xs font-bold py-1.5 px-3 rounded-full hover:bg-[var(--gold-10)] transition-all"
 >
 <Edit2 className="w-3 h-3" /> Edit Batch
 </button>
 <button
 onClick={() => { if(confirm('Delete batch? All students will lose access.')) deleteBatchMutation.mutate(batch._id); }}
 className="text-red-400 hover:text-red-300 p-1"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </GoldCard>
 ))}
 </div>
 ) : (
 <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl text-gray-500 text-sm">
 <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-30" />
 <p>No study batches created yet.</p>
 <button onClick={() => router.push('/admin/batches/new')} className="text-[var(--gold)] hover:underline text-xs mt-2 inline-block">Create your first batch →</button>
 </div>
 )}
 </div>
 </div>
 );
}
