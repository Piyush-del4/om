'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { FileText, ArrowLeft, Calendar, Clock, MapPin, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SavedKundlisPage() {
 const { isAuthenticated, isLoading: authLoading } = useAuth();
 const router = useRouter();

 // Redirect if not authenticated
 useEffect(() => {
 if (!authLoading && !isAuthenticated) {
 router.push('/login?redirect=/saved-kundlis');
 }
 }, [isAuthenticated, authLoading, router]);

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
 if (!confirm('Are you sure you want to delete this saved Kundli?')) return;

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
 <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
 Loading your saved Kundlis...
 </p>
 </div>
 );
 }

 if (!isAuthenticated) return null;

 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--gold)]/20 blur-[120px] rounded-full pointer-events-none" />

 <div className="max-w-4xl mx-auto space-y-8 relative z-10">
 {/* Header Section */}
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--gold-200)] pb-6">
 <div className="space-y-2">
 <Link 
 href="/dashboard" 
 className="inline-flex items-center gap-2 text-xs text-[var(--gold)] hover:underline font-mono uppercase tracking-wider mb-2"
 >
 <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
 </Link>
 <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
 My <span className="gold-gradient-text font-serif">Saved Kundlis</span>
 </h1>
 <p className="text-gray-600 text-sm font-light">Access your previously generated premium Kundli reports instantly.</p>
 </div>
 <Link href="/premium-personalized-kundli">
 <GoldButton variant="filled">
 ✦ Generate New Kundli ✦
 </GoldButton>
 </Link>
 </div>

 {/* Saved List Section */}
 {savedList && savedList.length > 0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {savedList.map((kundli: any) => (
 <Link 
 key={kundli._id} 
 href={`/premium-personalized-kundli?id=${kundli._id}`}
 className="group block"
 >
 <GoldCard className="h-full transition-spring hover:border-[var(--gold)]/80 hover:bg-gray-50/40 relative">
 <div className="flex flex-col justify-between h-full space-y-4 pr-8">
 <div className="space-y-2">
 <div className="flex items-center gap-2">
 <FileText className="w-5 h-5 text-[var(--gold)]" />
 <h3 className="font-bold text-lg text-gray-900 group-hover:text-[var(--gold)] transition-colors line-clamp-1">
 {kundli.name}
 </h3>
 </div>
 <div className="space-y-1.5 text-xs text-gray-600 font-light">
 <p className="flex items-center gap-2">
 <Calendar className="w-3.5 h-3.5 text-[var(--gold)]/70" />
 <span>{new Date(kundli.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
 </p>
 <p className="flex items-center gap-2">
 <Clock className="w-3.5 h-3.5 text-[var(--gold)]/70" />
 <span>{kundli.time}</span>
 </p>
 <p className="flex items-center gap-2">
 <MapPin className="w-3.5 h-3.5 text-[var(--gold)]/70" />
 <span className="line-clamp-1">{kundli.location}{kundli.country ? `, ${kundli.country}` : ''}</span>
 </p>
 </div>
 </div>
 <span className="text-[10px] text-gray-500 font-mono tracking-wide uppercase pt-2 border-t border-neutral-900">
 Saved on {new Date(kundli.createdAt).toLocaleDateString()}
 </span>
 </div>
 <button 
 onClick={(e) => handleDelete(kundli._id, e)}
 className="absolute top-6 right-6 p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-500/10 transition-colors"
 title="Delete Saved Kundli"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </GoldCard>
 </Link>
 ))}
 </div>
 ) : (
 <div className="text-center py-24 bg-gray-50/40 rounded-3xl border border-neutral-900 space-y-6">
 <FileText className="w-16 h-16 text-gray-600 mx-auto" />
 <div className="space-y-2">
 <h3 className="text-xl font-bold text-gray-600">No saved Kundlis found</h3>
 <p className="text-gray-500 text-sm max-w-xs mx-auto">You haven't generated or saved any personalized Kundli reports yet.</p>
 </div>
 <Link href="/premium-personalized-kundli" className="inline-block">
 <GoldButton variant="outlined">
 Generate Your First Kundli
 </GoldButton>
 </Link>
 </div>
 )}
 </div>
 </div>
 );
}
