'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { GraduationCap, ArrowLeft, Upload } from 'lucide-react';

export default function NewBatchPage() {
 const { user, isAuthenticated, isLoading } = useAuth();
 const router = useRouter();
 const queryClient = useQueryClient();

 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [priceInRupees, setPriceInRupees] = useState('');
 const [specialOfferTitle, setSpecialOfferTitle] = useState('');
 const [offerPriceInRupees, setOfferPriceInRupees] = useState('');
 const [offerExpiresAt, setOfferExpiresAt] = useState('');
 const [coverUrl, setCoverUrl] = useState('');
 const [coverPublicId, setCoverPublicId] = useState('batch-cover');
 const [category, setCategory] = useState('Astrology');
 const [batchCode, setBatchCode] = useState('');
 const [errorMsg, setErrorMsg] = useState('');
 const [isUploading, setIsUploading] = useState(false);

 // Dynamic "What You'll Learn" items
 const [learningOutcomes, setLearningOutcomes] = useState<{ title: string; desc: string }[]>([]);
 const [newOutcomeTitle, setNewOutcomeTitle] = useState('');
 const [newOutcomeDesc, setNewOutcomeDesc] = useState('');

 const addLearningOutcome = () => {
   if (!newOutcomeTitle.trim()) return;
   setLearningOutcomes([...learningOutcomes, { title: newOutcomeTitle.trim(), desc: newOutcomeDesc.trim() }]);
   setNewOutcomeTitle('');
   setNewOutcomeDesc('');
 };

 const removeLearningOutcome = (index: number) => {
   setLearningOutcomes(learningOutcomes.filter((_, i) => i !== index));
 };

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;

 setIsUploading(true);
 setErrorMsg('');
 const formData = new FormData();
 formData.append('file', file);
 formData.append('folder', 'batches');

 try {
 const res = await client.post('/uploads', formData);
 if (res.data?.success) {
 setCoverUrl(res.data.data.url);
 setCoverPublicId(res.data.data.publicId || 'batch-cover');
 } else {
 setErrorMsg('Upload failed');
 }
 } catch (err: any) {
 setErrorMsg(err.response?.data?.error?.message || 'Failed to upload image');
 } finally {
 setIsUploading(false);
 }
 };

 React.useEffect(() => {
 if (!isLoading) {
 if (!isAuthenticated) router.push('/login');
 else if (user?.role !== 'admin') router.push('/dashboard');
 }
 }, [user, isAuthenticated, isLoading, router]);

 const createMutation = useMutation({
 mutationFn: async (payload: any) => {
 return client.post('/batches', payload);
 },
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-batches'] });
 queryClient.invalidateQueries({ queryKey: ['my-enrolments'] });
 queryClient.invalidateQueries({ queryKey: ['all-batches'] });
 router.push('/admin/batches');
 },
 onError: (err: any) => {
 setErrorMsg(err.response?.data?.error?.message || 'Failed to create batch');
 },
 });

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setErrorMsg('');
 if (!title.trim() || !priceInRupees || !coverUrl.trim()) {
 setErrorMsg('Please fill in all required fields.');
 return;
 }

 const pricePaise = Math.round(parseFloat(priceInRupees) * 100);
 const offerPricePaise = offerPriceInRupees ? Math.round(parseFloat(offerPriceInRupees) * 100) : undefined;
 createMutation.mutate({
 title,
 description,
 price: pricePaise,
 coverImage: {
 url: coverUrl.trim(),
 publicId: coverPublicId.trim() || 'batch-cover',
 },
 category,
 batchCode: batchCode.trim() || undefined,
 specialOfferTitle: specialOfferTitle || undefined,
 offerPrice: offerPricePaise,
 offerExpiresAt: offerExpiresAt ? new Date(offerExpiresAt).toISOString() : undefined,
 learningOutcomes,
 });
 };

 if (isLoading || !user || user.role !== 'admin') {
 return <div className="min-h-screen bg-white flex items-center justify-center text-gray-600">Verifying Admin Privileges...</div>;
 }

 return (
 <div className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
 <div className="max-w-xl mx-auto space-y-8">
 <button onClick={() => router.push('/admin/batches')} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium">
 <ArrowLeft className="w-4 h-4" /> Back to Batches
 </button>

 <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
 <GraduationCap className="w-8 h-8 text-[var(--gold)]" /> Create New Batch
 </h1>

 <GoldCard className="border border-[var(--gold-100)] p-6 space-y-4">
 {errorMsg && <div className="text-xs text-red-600 bg-red-50 p-3 border border-red-200 rounded-lg">{errorMsg}</div>}

 <form onSubmit={handleSubmit} className="space-y-4">
 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Batch Title *</label>
 <input
 type="text"
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 required
 placeholder="e.g. Master Numerology Batch A"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs"
 />
 </div>

 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Category *</label>
 <select
 value={category}
 onChange={(e) => setCategory(e.target.value)}
 required
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs"
 >
 <option value="Astrology" className="bg-gray-100">Astrology</option>
 <option value="Numerology" className="bg-gray-100">Numerology</option>
 <option value="Tarot Card" className="bg-gray-100">Tarot Card</option>
 <option value="Graphology" className="bg-gray-100">Graphology</option>
 </select>
 </div>

 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Price (INR) *</label>
 <input
 type="number"
 value={priceInRupees}
 onChange={(e) => setPriceInRupees(e.target.value)}
 required
 placeholder="e.g. 4999"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs"
 />
 </div>

 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Special Offer Title (Optional)</label>
 <input
 type="text"
 value={specialOfferTitle}
 onChange={(e) => setSpecialOfferTitle(e.target.value)}
 placeholder="e.g. Early Bird Discount"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs"
 />
 </div>

 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Offer Price (INR) (Optional)</label>
 <input
 type="number"
 value={offerPriceInRupees}
 onChange={(e) => setOfferPriceInRupees(e.target.value)}
 placeholder="e.g. 3999"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs"
 />
 </div>

 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Offer Expiry Date & Time (Optional)</label>
 <input
 type="datetime-local"
 value={offerExpiresAt}
 onChange={(e) => setOfferExpiresAt(e.target.value)}
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs"
 />
 </div>

 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Batch Code (Access Code - Optional)</label>
 <input
 type="text"
 value={batchCode}
 onChange={(e) => setBatchCode(e.target.value)}
 placeholder="Leave blank to auto-generate"
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs"
 />
 </div>

 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Cover Image *</label>
 {coverUrl ? (
 <div className="space-y-2">
 <div className="relative border border-[var(--gold-100)] rounded-lg p-3 bg-white/40 flex items-center gap-3">
 <img src={coverUrl} alt="Uploaded cover preview" className="w-16 h-12 object-cover rounded-lg border border-gray-200" />
 <div className="flex-1 min-w-0">
 <p className="text-[10px] text-gray-600 truncate font-mono">{coverUrl}</p>
 <p className="text-[9px] text-[var(--gold)] font-mono truncate">Public ID: {coverPublicId}</p>
 <button
 type="button"
 onClick={() => {
 setCoverUrl('');
 setCoverPublicId('');
 }}
 className="text-[10px] text-red-600 hover:text-red-600 font-semibold mt-1"
 >
 Remove and select another
 </button>
 </div>
 </div>
 </div>
 ) : (
 <div className="relative border border-dashed border-[var(--gold-100)] hover:border-[var(--gold)] rounded-lg p-5 flex flex-col items-center justify-center bg-white/40 transition-colors cursor-pointer group">
 <input
 type="file"
 accept="image/*"
 onChange={handleImageUpload}
 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
 disabled={isUploading}
 />
 <Upload className="w-8 h-8 text-gray-600 group-hover:text-[var(--gold)] transition-colors mb-2" />
 <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
 {isUploading ? 'Uploading cover image...' : 'Click or Drag to Upload Cover Image'}
 </span>
 </div>
 )}
 </div>

 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Description</label>
 <textarea
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 placeholder="Provide detailed information about this course offering..."
 rows={4}
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs"
 />
 </div>

 {/* ── DYNAMIC "WHAT YOU'LL LEARN" SECTION EDITOR ────────────────── */}
 <div className="space-y-3 pt-4 border-t border-gray-200">
 <div className="flex items-center justify-between">
 <label className="block text-xs font-bold uppercase tracking-wider text-[#6F2935]">
 "What You'll Learn" Section (Optional)
 </label>
 <span className="text-[10px] text-gray-500">
 {learningOutcomes.length} {learningOutcomes.length === 1 ? 'item' : 'items'} added
 </span>
 </div>
 <p className="text-[11px] text-gray-500 font-light">
 Add learning points below. If no items are added, the "What You'll Learn" section will not be displayed on the batch page.
 </p>

 {/* List of added outcomes */}
 {learningOutcomes.length > 0 && (
 <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
 {learningOutcomes.map((item, idx) => (
 <div key={idx} className="flex items-start justify-between gap-2 p-2 bg-white rounded-lg border border-gray-200 text-xs">
 <div>
 <span className="font-bold text-gray-900 block">{item.title}</span>
 {item.desc && <span className="text-gray-500 text-[11px] block">{item.desc}</span>}
 </div>
 <button
 type="button"
 onClick={() => removeLearningOutcome(idx)}
 className="text-red-600 hover:text-red-700 text-xs font-bold shrink-0 ml-2"
 >
 Remove
 </button>
 </div>
 ))}
 </div>
 )}

 {/* Inputs to add new outcome */}
 <div className="space-y-2 bg-[#FAF7F2] p-3 rounded-xl border border-[#A78652]/30">
 <input
 type="text"
 value={newOutcomeTitle}
 onChange={(e) => setNewOutcomeTitle(e.target.value)}
 placeholder="Outcome Title (e.g. Core Principles & Symbology)"
 className="w-full bg-white border border-[#E7E0D4] rounded-lg py-2 px-3 text-gray-900 text-xs focus:ring-1 focus:ring-[#A78652]"
 />
 <input
 type="text"
 value={newOutcomeDesc}
 onChange={(e) => setNewOutcomeDesc(e.target.value)}
 placeholder="Outcome Info/Description (e.g. Master fundamental archetypes...)"
 className="w-full bg-white border border-[#E7E0D4] rounded-lg py-2 px-3 text-gray-900 text-xs focus:ring-1 focus:ring-[#A78652]"
 />
 <button
 type="button"
 onClick={addLearningOutcome}
 className="py-1.5 px-4 text-xs font-bold bg-[#6F2935] text-white rounded-lg hover:bg-[#8A3443] transition-all cursor-pointer"
 >
 + Add "What You'll Learn" Item
 </button>
 </div>
 </div>

 <GoldButton type="submit" variant="filled" fullWidth isLoading={createMutation.isPending} className="py-2.5">
 Publish Batch
 </GoldButton>
 </form>
 </GoldCard>
 </div>
 </div>
 );
}
