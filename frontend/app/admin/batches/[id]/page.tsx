'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { GraduationCap, ArrowLeft, Edit2, Play, FileText, Users, Plus, Trash2, Check, Video, Upload, Bell } from 'lucide-react';

export default function EditBatchPage() {
 const { id: batchId } = useParams() as { id: string };
 const { user, isAuthenticated, isLoading } = useAuth();
 const router = useRouter();
 const queryClient = useQueryClient();

 const [activeTab, setActiveTab] = useState<'details' | 'lectures' | 'pdfs' | 'progress' | 'notifications'>('details');

 // Edit Batch States
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [priceInRupees, setPriceInRupees] = useState('');
 const [specialOfferTitle, setSpecialOfferTitle] = useState('');
 const [offerPriceInRupees, setOfferPriceInRupees] = useState('');
 const [offerExpiresAt, setOfferExpiresAt] = useState('');
 const [coverUrl, setCoverUrl] = useState('');
 const [coverPublicId, setCoverPublicId] = useState('');
 const [batchCode, setBatchCode] = useState('');
 const [editSuccessMsg, setEditSuccessMsg] = useState('');
 const [editErrorMsg, setEditErrorMsg] = useState('');
 const [isUploading, setIsUploading] = useState(false);

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;

 setIsUploading(true);
 setEditErrorMsg('');
 const formData = new FormData();
 formData.append('file', file);
 formData.append('folder', 'batches');

 try {
 const res = await client.post('/uploads', formData);
 if (res.data?.success) {
 setCoverUrl(res.data.data.url);
 setCoverPublicId(res.data.data.publicId || 'batch-cover');
 } else {
 setEditErrorMsg('Upload failed');
 }
 } catch (err: any) {
 setEditErrorMsg(err.response?.data?.error?.message || 'Failed to upload image');
 } finally {
 setIsUploading(false);
 }
 };

 // Add Lecture States
 const [lectureTitle, setLectureTitle] = useState('');
 const [youtubeVideoId, setYoutubeVideoId] = useState('');
 const [lectureOrder, setLectureOrder] = useState('0');
 const [lectureError, setLectureError] = useState('');

 // Add PDF States
 const [pdfTitle, setPdfTitle] = useState('');
 const [pdfUrl, setPdfUrl] = useState('');
 const [pdfPublicId, setPdfPublicId] = useState('note-pdf');
 const [pdfLectureId, setPdfLectureId] = useState('');
 const [pdfError, setPdfError] = useState('');
 const [isPdfUploading, setIsPdfUploading] = useState(false);

 const handlePdfFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;

 setIsPdfUploading(true);
 setPdfError('');
 const formData = new FormData();
 formData.append('file', file);
 formData.append('folder', 'batch_notes');

 try {
 const res = await client.post('/uploads', formData);
 if (res.data?.success) {
 setPdfUrl(res.data.data.url);
 setPdfPublicId(res.data.data.publicId || 'note-pdf');
 if (!pdfTitle.trim()) {
 const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
 setPdfTitle(nameWithoutExt);
 }
 } else {
 setPdfError('Upload failed');
 }
 } catch (err: any) {
 setPdfError(err.response?.data?.error?.message || 'Failed to upload PDF file');
 } finally {
 setIsPdfUploading(false);
 }
 };

 // Add Announcements States
 const [announcementMessage, setAnnouncementMessage] = useState('');
 const [announcementError, setAnnouncementError] = useState('');

 // Fetch Batch Announcements
 const { data: announcements, isLoading: loadingAnnouncements } = useQuery({
 queryKey: ['admin-batch-announcements', batchId],
 queryFn: async () => {
 const res = await client.get(`/batches/${batchId}/announcements`);
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin' && !!batchId,
 });

 // Create Announcement Mutation
 const addAnnouncementMutation = useMutation({
 mutationFn: async (message: string) => {
 return client.post(`/batches/${batchId}/announcements`, { message });
 },
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-batch-announcements', batchId] });
 setAnnouncementMessage('');
 setAnnouncementError('');
 alert('Notification sent successfully!');
 },
 onError: (err: any) => {
 setAnnouncementError(err.response?.data?.error?.message || 'Failed to send notification');
 },
 });

 const handleAddAnnouncement = (e: React.FormEvent) => {
 e.preventDefault();
 setAnnouncementError('');
 if (!announcementMessage.trim()) return;
 addAnnouncementMutation.mutate(announcementMessage.trim());
 };

 React.useEffect(() => {
 if (!isLoading) {
 if (!isAuthenticated) router.push('/login');
 else if (user?.role !== 'admin') router.push('/dashboard');
 }
 }, [user, isAuthenticated, isLoading, router]);

 // Fetch Batch Details
 const { data: batch, isLoading: loadingBatch } = useQuery({
 queryKey: ['admin-batch', batchId],
 queryFn: async () => {
 const res = await client.get(`/batches/${batchId}`);
 const data = res.data?.data;
 if (data) {
 setTitle(data.title || '');
 setDescription(data.description || '');
 setPriceInRupees(String((data.price || 0) / 100));
 setSpecialOfferTitle(data.specialOfferTitle || '');
 setOfferPriceInRupees(data.offerPrice ? String(data.offerPrice / 100) : '');
 setOfferExpiresAt(data.offerExpiresAt ? data.offerExpiresAt.substring(0, 16) : '');
 setCoverUrl(data.coverImage?.url || '');
 setCoverPublicId(data.coverImage?.publicId || '');
 setBatchCode(data.code || '');
 }
 return data;
 },
 enabled: isAuthenticated && user?.role === 'admin' && !!batchId,
 });

 // Fetch Batch Lectures
 const { data: lectures, isLoading: loadingLectures } = useQuery({
 queryKey: ['admin-batch-lectures', batchId],
 queryFn: async () => {
 const res = await client.get(`/batches/${batchId}/lectures`);
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin' && !!batchId,
 });

 // Fetch Batch PDFs
 const { data: pdfs, isLoading: loadingPdfs } = useQuery({
 queryKey: ['admin-batch-pdfs', batchId],
 queryFn: async () => {
 const res = await client.get(`/batches/${batchId}/pdfs`);
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin' && !!batchId,
 });

 // Fetch Student Enrolment Progress
 const { data: enrolments, isLoading: loadingEnrolments } = useQuery({
 queryKey: ['admin-batch-enrolments', batchId],
 queryFn: async () => {
 const res = await client.get(`/batches/${batchId}/enrolments`);
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin' && !!batchId,
 });

 // Update Batch Details Mutation
 const updateBatchMutation = useMutation({
 mutationFn: async (payload: any) => {
 return client.patch(`/batches/${batchId}`, payload);
 },
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-batch', batchId] });
 setEditSuccessMsg('Batch details updated successfully!');
 setEditErrorMsg('');
 },
 onError: (err: any) => {
 setEditErrorMsg(err.response?.data?.error?.message || 'Failed to update batch');
 setEditSuccessMsg('');
 },
 });

 // Add Lecture Mutation
 const addLectureMutation = useMutation({
 mutationFn: async (payload: any) => {
 return client.post(`/batches/${batchId}/lectures`, payload);
 },
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-batch-lectures', batchId] });
 setLectureTitle('');
 setYoutubeVideoId('');
 setLectureOrder('0');
 setLectureError('');
 alert('Lecture added successfully!');
 },
 onError: (err: any) => {
 setLectureError(err.response?.data?.error?.message || 'Failed to add lecture');
 },
 });

 // Delete Lecture Mutation
 const deleteLectureMutation = useMutation({
 mutationFn: async (lectureId: string) => {
 return client.delete(`/lectures/${lectureId}`);
 },
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-batch-lectures', batchId] });
 alert('Lecture deleted successfully');
 },
 onError: (err: any) => {
 alert(err.response?.data?.error?.message || 'Failed to delete lecture');
 },
 });

 // Add PDF Mutation
 const addPdfMutation = useMutation({
 mutationFn: async (payload: any) => {
 return client.post(`/batches/${batchId}/pdfs`, payload);
 },
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-batch-pdfs', batchId] });
 setPdfTitle('');
 setPdfUrl('');
 setPdfPublicId('note-pdf');
 setPdfLectureId('');
 setPdfError('');
 alert('PDF Note added successfully!');
 },
 onError: (err: any) => {
 setPdfError(err.response?.data?.error?.message || 'Failed to add PDF note');
 },
 });

 // Delete PDF Mutation
 const deletePdfMutation = useMutation({
 mutationFn: async (pdfId: string) => {
 return client.delete(`/pdfs/${pdfId}`);
 },
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-batch-pdfs', batchId] });
 alert('PDF Note deleted');
 },
 onError: (err: any) => {
 alert(err.response?.data?.error?.message || 'Failed to delete PDF note');
 },
 });

 const handleUpdateBatch = (e: React.FormEvent) => {
 e.preventDefault();
 setEditSuccessMsg('');
 setEditErrorMsg('');
 const pricePaise = Math.round(parseFloat(priceInRupees) * 100);
 const offerPricePaise = offerPriceInRupees ? Math.round(parseFloat(offerPriceInRupees) * 100) : null;
 updateBatchMutation.mutate({
 title,
 description,
 price: pricePaise,
 coverImage: {
 url: coverUrl,
 publicId: coverPublicId || 'batch-cover',
 },
 batchCode: batchCode || undefined,
 specialOfferTitle,
 offerPrice: offerPricePaise,
 offerExpiresAt: offerExpiresAt ? new Date(offerExpiresAt).toISOString() : null,
 });
 };

 const handleAddLecture = (e: React.FormEvent) => {
 e.preventDefault();
 setLectureError('');
 if (!lectureTitle.trim() || !youtubeVideoId.trim()) return;
 addLectureMutation.mutate({
 title: lectureTitle,
 youtubeVideoId: youtubeVideoId.trim(),
 order: parseInt(lectureOrder) || 0,
 });
 };

 const handleAddPdf = (e: React.FormEvent) => {
 e.preventDefault();
 setPdfError('');
 if (!pdfTitle.trim() || !pdfUrl.trim()) return;
 addPdfMutation.mutate({
 title: pdfTitle,
 url: pdfUrl.trim(),
 publicId: pdfPublicId.trim() || 'note-pdf',
 lectureId: pdfLectureId || undefined,
 });
 };

 if (isLoading || loadingBatch || !user || user.role !== 'admin') {
 return <div className="min-h-screen bg-white flex items-center justify-center text-gray-600">Loading Batch Details...</div>;
 }

 const tabs = [
 { id: 'details', label: 'Batch Settings', icon: Edit2 },
 { id: 'lectures', label: 'Lectures', icon: Play },
 { id: 'pdfs', label: 'Notes', icon: FileText },
 { id: 'progress', label: 'Student Progress', icon: Users },
 { id: 'notifications', label: 'Notifications', icon: Bell },
 ];

 return (
 <div className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
 <div className="max-w-6xl mx-auto space-y-8">
 <button onClick={() => router.push('/admin/batches')} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium">
 <ArrowLeft className="w-4 h-4" /> Back to Batches list
 </button>

 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
 <div>
 <h1 className="font-serif text-3xl font-bold text-gray-900">{batch?.title}</h1>
 <p className="text-gray-600 text-xs mt-1">Manage lectures, download worksheets, and check student progress.</p>
 </div>
 </div>

 {/* Navigation Tabs */}
 <div className="flex border-b border-gray-200 gap-2 overflow-x-auto pb-px">
 {tabs.map((tab) => {
 const Icon = tab.icon;
 const isActive = activeTab === tab.id;
 return (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id as any)}
 className={`flex items-center gap-1.5 py-3 px-5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
 isActive
 ? 'border-[var(--gold)] text-[var(--gold)] bg-[var(--gold-5)]'
 : 'border-transparent text-gray-600 hover:text-gray-900'
 }`}
 >
 <Icon className="w-4 h-4" />
 {tab.label}
 </button>
 );
 })}
 </div>

 {/* Tab Contents */}
 <div className="pt-4">
 {/* Tab 1: Details */}
 {activeTab === 'details' && (
 <div className="max-w-2xl">
 <GoldCard className="border border-[var(--gold-100)] p-6 space-y-4">
 <h3 className="font-serif text-lg font-bold text-gray-900">Edit Batch Settings</h3>

 {editSuccessMsg && <div className="text-xs text-green-600 bg-green-50 p-3 border border-green-200 rounded-lg">{editSuccessMsg}</div>}
 {editErrorMsg && <div className="text-xs text-red-600 bg-red-50 p-3 border border-red-200 rounded-lg">{editErrorMsg}</div>}

 <form onSubmit={handleUpdateBatch} className="space-y-4">
 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Title</label>
 <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs" />
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Price (INR)</label>
 <input type="number" value={priceInRupees} onChange={(e) => setPriceInRupees(e.target.value)} required className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs" />
 </div>
 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Access Code</label>
 <input type="text" value={batchCode} onChange={(e) => setBatchCode(e.target.value)} className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs" />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Special Offer Title (Optional)</label>
 <input type="text" value={specialOfferTitle} onChange={(e) => setSpecialOfferTitle(e.target.value)} placeholder="e.g. Diwali discount" className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs" />
 </div>
 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Offer Price (INR) (Optional)</label>
 <input type="number" value={offerPriceInRupees} onChange={(e) => setOfferPriceInRupees(e.target.value)} placeholder="e.g. 3999" className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs" />
 </div>
 <div className="space-y-1">
 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Offer Expiry (Optional)</label>
 <input type="datetime-local" value={offerExpiresAt} onChange={(e) => setOfferExpiresAt(e.target.value)} className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs" />
 </div>
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
 <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2.5 px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] text-xs" />
 </div>

 <GoldButton type="submit" variant="filled" isLoading={updateBatchMutation.isPending}>Save Changes</GoldButton>
 </form>
 </GoldCard>
 </div>
 )}

 {/* Tab 2: Lectures */}
 {activeTab === 'lectures' && (
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {/* Add Lecture Form */}
 <div className="lg:col-span-1">
 <GoldCard className="border border-[var(--gold-100)] p-5 space-y-4">
 <h3 className="font-serif text-sm font-bold text-gray-900 flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Lecture</h3>
 {lectureError && <div className="text-xs text-red-600 bg-red-50 p-2.5 border border-red-200 rounded-lg">{lectureError}</div>}
 <form onSubmit={handleAddLecture} className="space-y-3">
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Lecture Title</label>
 <input type="text" value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} required placeholder="Lecture 1: Introduction" className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
 </div>
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">YouTube Video ID</label>
 <input type="text" value={youtubeVideoId} onChange={(e) => setYoutubeVideoId(e.target.value)} required placeholder="e.g. dQw4w9WgXcQ" className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
 </div>
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Sort Order</label>
 <input type="number" value={lectureOrder} onChange={(e) => setLectureOrder(e.target.value)} required placeholder="0" className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
 </div>
 <GoldButton type="submit" variant="filled" fullWidth isLoading={addLectureMutation.isPending} className="py-2 text-xs">Add Lecture</GoldButton>
 </form>
 </GoldCard>
 </div>

 {/* Lectures List */}
 <div className="lg:col-span-2 space-y-4">
 <h3 className="font-serif text-sm font-bold text-gray-900">Published Lectures</h3>
 {loadingLectures ? (
 <p className="text-gray-600 text-xs animate-pulse">Loading lectures list...</p>
 ) : lectures && lectures.length > 0 ? (
 <div className="space-y-2">
 {lectures.map((lec: any) => (
 <div key={lec._id} className="p-4 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-between gap-3 text-xs">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-lg bg-[var(--gold-10)] border border-[var(--gold-200)] flex items-center justify-center text-[var(--gold)] flex-shrink-0"><Video className="w-4 h-4" /></div>
 <div>
 <h5 className="font-bold text-gray-900">{lec.title}</h5>
 <p className="text-[10px] text-gray-600">Order: {lec.order} · YouTube ID: <span className="font-mono">{lec.youtubeVideoId}</span></p>
 </div>
 </div>
 <button onClick={() => { if(confirm('Delete lecture?')) deleteLectureMutation.mutate(lec._id); }} className="text-red-600 hover:text-red-600 p-1 flex-shrink-0">
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 ))}
 </div>
 ) : (
 <p className="text-gray-500 text-xs">No lectures published yet.</p>
 )}
 </div>
 </div>
 )}

 {/* Tab 3: PDFs */}
 {activeTab === 'pdfs' && (
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {/* Add PDF Form */}
 <div className="lg:col-span-1">
 <GoldCard className="border border-[var(--gold-100)] p-5 space-y-4">
 <h3 className="font-serif text-sm font-bold text-gray-900 flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Note</h3>
 {pdfError && <div className="text-xs text-red-600 bg-red-50 p-2.5 border border-red-200 rounded-lg">{pdfError}</div>}
 <form onSubmit={handleAddPdf} className="space-y-3">
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Document Title</label>
 <input type="text" value={pdfTitle} onChange={(e) => setPdfTitle(e.target.value)} required placeholder="e.g. Numerology Reference Chart" className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
 </div>
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Upload PDF File *</label>
 {pdfUrl ? (
 <div className="space-y-2">
 <div className="relative border border-[var(--gold-100)] rounded-lg p-3 bg-white/40 flex items-center gap-3">
 <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 flex-shrink-0">
 <FileText className="w-5 h-5" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-xs font-semibold text-gray-900 truncate">{pdfUrl.split('/').pop()}</p>
 <p className="text-[9px] text-gray-500 font-mono truncate">{pdfUrl}</p>
 <button
 type="button"
 onClick={() => {
 setPdfUrl('');
 setPdfPublicId('note-pdf');
 }}
 className="text-[10px] text-red-600 hover:text-red-700 font-semibold mt-1"
 >
 Remove and select another PDF
 </button>
 </div>
 </div>
 </div>
 ) : (
 <div className="relative border border-dashed border-[var(--gold-100)] hover:border-[var(--gold)] rounded-lg p-5 flex flex-col items-center justify-center bg-white/40 transition-colors cursor-pointer group">
 <input
 type="file"
 accept=".pdf,application/pdf"
 onChange={handlePdfFileUpload}
 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
 disabled={isPdfUploading}
 />
 <Upload className="w-8 h-8 text-gray-600 group-hover:text-[var(--gold)] transition-colors mb-2" />
 <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
 {isPdfUploading ? 'Uploading PDF file...' : 'Click or Drag to Upload PDF from Device'}
 </span>
 <span className="text-[10px] text-gray-400 mt-0.5">PDF documents up to 25MB</span>
 </div>
 )}
 </div>

 <details className="text-[10px] text-gray-500 pt-1">
 <summary className="cursor-pointer hover:text-gray-700 select-none">Advanced / Manual URL Options</summary>
 <div className="space-y-2 mt-2 pt-2 border-t border-gray-100">
 <div>
 <label className="block text-[9px] font-semibold uppercase text-gray-500">PDF Document URL</label>
 <input type="url" value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} placeholder="https://example.com/sheet.pdf" className="w-full bg-white/60 border border-gray-200 rounded py-1 px-2 text-gray-900 text-xs" />
 </div>
 <div>
 <label className="block text-[9px] font-semibold uppercase text-gray-500">Cloudinary Public ID</label>
 <input type="text" value={pdfPublicId} onChange={(e) => setPdfPublicId(e.target.value)} placeholder="note-pdf" className="w-full bg-white/60 border border-gray-200 rounded py-1 px-2 text-gray-900 text-xs" />
 </div>
 </div>
 </details>
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Associated Lecture (Optional)</label>
 <select value={pdfLectureId} onChange={(e) => setPdfLectureId(e.target.value)} className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]">
 <option value="">-- No Lecture Association --</option>
 {lectures?.map((lec: any) => (
 <option key={lec._id} value={lec._id}>{lec.title}</option>
 ))}
 </select>
 </div>
 <GoldButton type="submit" variant="filled" fullWidth isLoading={addPdfMutation.isPending} className="py-2 text-xs">Add Note</GoldButton>
 </form>
 </GoldCard>
 </div>

 {/* PDFs List */}
 <div className="lg:col-span-2 space-y-4">
 <h3 className="font-serif text-sm font-bold text-gray-900">Notes</h3>
 {loadingPdfs ? (
 <p className="text-gray-600 text-xs animate-pulse">Loading files list...</p>
 ) : pdfs && pdfs.length > 0 ? (
 <div className="space-y-2">
 {pdfs.map((pdf: any) => (
 <div key={pdf._id} className="p-4 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-between gap-3 text-xs">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 flex-shrink-0"><FileText className="w-4 h-4" /></div>
 <div>
 <h5 className="font-bold text-gray-900">{pdf.title}</h5>
 <p className="text-[10px] text-gray-600">File: <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline truncate inline-block max-w-[200px]">{pdf.url}</a></p>
 </div>
 </div>
 <button onClick={() => { if(confirm('Delete study material?')) deletePdfMutation.mutate(pdf._id); }} className="text-red-600 hover:text-red-600 p-1 flex-shrink-0">
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 ))}
 </div>
 ) : (
 <p className="text-gray-500 text-xs">No PDFs posted yet.</p>
 )}
 </div>
 </div>
 )}

 {/* Tab 4: Progress */}
 {activeTab === 'progress' && (
 <div className="space-y-4">
 <h3 className="font-serif text-sm font-bold text-gray-900 flex items-center gap-2"><Users className="w-4.5 h-4.5 text-[var(--gold)]" /> Enrolled Students & Progression Logs</h3>
 {loadingEnrolments ? (
 <p className="text-gray-600 text-xs animate-pulse">Loading enrolments stats...</p>
 ) : enrolments && enrolments.length > 0 ? (
 <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100/20">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="border-b border-gray-200 bg-gray-100/60 font-semibold text-gray-600">
 <th className="py-3 px-4">Student Name</th>
 <th className="py-3 px-4">Email</th>
 <th className="py-3 px-4">Phone No</th>
 <th className="py-3 px-4">Enroll Method</th>
 <th className="py-3 px-4">Sign Up Date</th>
 <th className="py-3 px-4 text-right">Lectures Watched</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 text-gray-600">
 {enrolments.map((enr: any, index: number) => (
 <tr key={index} className="hover:bg-gray-100/20">
 <td className="py-3.5 px-4 font-medium text-gray-900">{enr.userName}</td>
 <td className="py-3.5 px-4 font-mono">{enr.email}</td>
 <td className="py-3.5 px-4 font-mono">{enr.phone || 'N/A'}</td>
 <td className="py-3.5 px-4"><span className="uppercase text-[9px] bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">{enr.method}</span></td>
 <td className="py-3.5 px-4">{new Date(enr.createdAt).toLocaleDateString()}</td>
 <td className="py-3.5 px-4 text-right">
 <span className="font-bold text-gray-900">{enr.watchedCount} / {enr.totalLectures}</span>
 <span className="text-gray-500 text-[10px] ml-2">({enr.percent}%)</span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 ) : (
 <p className="text-gray-500 text-xs py-8 text-center">No students are currently enrolled in this batch.</p>
 )}
 </div>
 )}

 {/* Tab 5: Notifications */}
 {activeTab === 'notifications' && (
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
 {/* Send Notification Form */}
 <div className="lg:col-span-1">
 <GoldCard className="border border-[var(--gold-100)] p-5 space-y-4">
 <h3 className="font-serif text-sm font-bold text-gray-900 flex items-center gap-1.5">
 <Bell className="w-4 h-4 text-[var(--gold)]" /> Send Announcement
 </h3>
 <p className="text-gray-600 text-[10px] leading-relaxed font-light">
 Send a real-time message/notification to all students enrolled in this batch.
 </p>
 
 {announcementError && (
 <div className="text-xs text-red-600 bg-red-50 p-2.5 border border-red-200 rounded-lg">
 {announcementError}
 </div>
 )}

 <form onSubmit={handleAddAnnouncement} className="space-y-3">
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
 Announcement Message
 </label>
 <textarea
 value={announcementMessage}
 onChange={(e) => setAnnouncementMessage(e.target.value)}
 required
 rows={4}
 placeholder="Type announcement details here..."
 className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
 />
 </div>
 <GoldButton
 type="submit"
 variant="filled"
 fullWidth
 isLoading={addAnnouncementMutation.isPending}
 className="py-2 text-xs"
 >
 Broadcast Message
 </GoldButton>
 </form>
 </GoldCard>
 </div>

 {/* History of Announcements */}
 <div className="lg:col-span-2 space-y-4">
 <h3 className="font-serif text-sm font-bold text-gray-900 flex items-center gap-1.5">
 Announcements History
 </h3>
 {loadingAnnouncements ? (
 <p className="text-gray-600 text-xs animate-pulse">Loading announcements list...</p>
 ) : announcements && announcements.length > 0 ? (
 <div className="space-y-3">
 {announcements.map((ann: any, idx: number) => (
 <div key={idx} className="p-4 bg-gray-100 border border-gray-200 rounded-xl space-y-1 text-xs">
 <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
 <span>Sent By Admin</span>
 <span>{new Date(ann.createdAt).toLocaleString()}</span>
 </div>
 <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{ann.message}</p>
 </div>
 ))}
 </div>
 ) : (
 <p className="text-gray-500 text-xs py-8 text-center bg-gray-50/10 border border-dashed border-gray-200 rounded-xl">
 No announcements broadcasted yet.
 </p>
 )}
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 );
}
