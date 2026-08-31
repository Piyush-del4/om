'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import {
 Calendar, Plus, Trash2, Clock, CheckCircle, XCircle,
 ArrowLeft, Pencil, X, BanIcon, ShieldAlert, Upload,
} from 'lucide-react';

// ── IST time helpers ────────────────────────────────────────────────────────

/** Generate 30-min slot labels between 10:00 and 18:00 IST */
function generateISTTimeLabels(): { label: string; utcOffset: number }[] {
 const slots: { label: string; utcOffset: number }[] = [];
 // IST = UTC+5:30 → IST 10:00 = UTC 04:30
 // We store utcOffset as minutes from 00:00 UTC
 for (let h = 10; h <= 18; h++) {
 for (let m = 0; m < 60; m += 30) {
 if (h === 18 && m > 0) break; // stop at 18:00
 const hh = String(h).padStart(2, '0');
 const mm = String(m).padStart(2, '0');
 // convert IST to UTC offset in minutes: subtract 5h30m = 330 mins
 const istMin = h * 60 + m;
 const utcMin = istMin - 330;
 slots.push({ label: `${hh}:${mm} IST`, utcOffset: utcMin });
 }
 }
 return slots;
}

const TIME_LABELS = generateISTTimeLabels();

/** Build a UTC ISO string from a YYYY-MM-DD date and utcOffset (minutes from 00:00 UTC) */
function buildUTCISO(date: string, utcOffsetMin: number): string {
 const [y, mo, d] = date.split('-').map(Number);
 const utcH = Math.floor(utcOffsetMin / 60);
 const utcM = utcOffsetMin % 60;
 return new Date(Date.UTC(y, mo - 1, d, utcH, utcM, 0)).toISOString();
}

/** Format a blocked slot's startTime–endTime + date range into a readable string */
function formatBlockedSlot(startISO: string, endISO: string, startDate?: string, endDate?: string): string {
 const toIST = (iso: string) => {
 const d = new Date(iso);
 d.setMinutes(d.getMinutes() + 330);
 return d.toISOString().substring(11, 16);
 };
 const fmt = (d: string) =>
 new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

 const timeRange = `${toIST(startISO)} – ${toIST(endISO)} IST`;
 if (startDate && endDate && startDate !== endDate) {
 return `${timeRange} · ${fmt(startDate)} → ${fmt(endDate)}`;
 }
 const date = startDate
 ? fmt(startDate)
 : new Date(startISO).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
 return `${timeRange} · ${date}`;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function AdminAppointmentsPage() {
 const { user, isAuthenticated, isLoading } = useAuth();
 const router = useRouter();
 const queryClient = useQueryClient();

 // ── Consultation type form states ──────────────────────────────────────────
 const [editingTypeId, setEditingTypeId] = useState<string | null>(null);
 const [typeName, setTypeName] = useState('');
 const [priceInRupees, setPriceInRupees] = useState('');
 const [duration, setDuration] = useState('30');
 const [specialOfferTitle, setSpecialOfferTitle] = useState('');
 const [offerPriceInRupees, setOfferPriceInRupees] = useState('');
 const [offerExpiresAt, setOfferExpiresAt] = useState('');
 const [description, setDescription] = useState('');
 const [imageUrl, setImageUrl] = useState('');
 const [isUploading, setIsUploading] = useState(false);

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;

 setIsUploading(true);
 setErrorMsg('');
 setSuccessMsg('');
 const formData = new FormData();
 formData.append('file', file);
 formData.append('folder', 'appointments');

 try {
 const res = await client.post('/uploads', formData);
 if (res.data?.success) {
 setImageUrl(res.data.data.url);
 } else {
 setErrorMsg('Upload failed');
 }
 } catch (err: any) {
 setErrorMsg(err.response?.data?.error?.message || 'Failed to upload image');
 } finally {
 setIsUploading(false);
 }
 };

 const [category, setCategory] = useState('Astrology');
 const [errorMsg, setErrorMsg] = useState('');
 const [successMsg, setSuccessMsg] = useState('');

 // ── Block-slot form states ─────────────────────────────────────────────────
 const [blockDate, setBlockDate] = useState('');
 const [blockEndDate, setBlockEndDate] = useState('');
 const [blockStartIdx, setBlockStartIdx] = useState(0);
 const [blockEndIdx, setBlockEndIdx] = useState(2);
 const [blockLabel, setBlockLabel] = useState('');
 const [blockError, setBlockError] = useState('');
 const [blockSuccess, setBlockSuccess] = useState('');

 React.useEffect(() => {
 if (!isLoading) {
 if (!isAuthenticated) router.push('/login');
 else if (user?.role !== 'admin') router.push('/dashboard');
 }
 }, [user, isAuthenticated, isLoading, router]);

 // ── Queries ────────────────────────────────────────────────────────────────

 const { data: bookings, isLoading: loadingBookings } = useQuery({
 queryKey: ['admin-bookings'],
 queryFn: async () => {
 const res = await client.get('/appointments');
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin',
 });

 const { data: appTypes, isLoading: loadingTypes } = useQuery({
 queryKey: ['admin-appointment-types'],
 queryFn: async () => {
 const res = await client.get('/appointments/types');
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin',
 });

 const { data: blockedSlots, isLoading: loadingBlocks } = useQuery({
 queryKey: ['admin-blocked-slots'],
 queryFn: async () => {
 const res = await client.get('/appointments/blocked-slots');
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin',
 });

 // ── Consultation type mutations ────────────────────────────────────────────

 const addTypeMutation = useMutation({
 mutationFn: async (payload: any) => client.post('/appointments/types', payload),
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-appointment-types'] });
 setSuccessMsg('Consultation type created successfully!');
 handleCancelEdit();
 },
 onError: (err: any) => {
 setErrorMsg(err.response?.data?.error?.message || 'Failed to create consultation type');
 setSuccessMsg('');
 },
 });

 const updateTypeMutation = useMutation({
 mutationFn: async ({ id, payload }: { id: string; payload: any }) =>
 client.patch(`/appointments/types/${id}`, payload),
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-appointment-types'] });
 setSuccessMsg('Consultation type updated successfully!');
 handleCancelEdit();
 },
 onError: (err: any) => {
 setErrorMsg(err.response?.data?.error?.message || 'Failed to update consultation type');
 setSuccessMsg('');
 },
 });

 const deleteTypeMutation = useMutation({
 mutationFn: async (typeId: string) => client.delete(`/appointments/types/${typeId}`),
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-appointment-types'] }),
 onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed to delete type'),
 });

 const updateStatusMutation = useMutation({
 mutationFn: async ({ apptId, status }: { apptId: string; status: 'confirmed' | 'cancelled' | 'pending' }) =>
 client.patch(`/appointments/${apptId}/status`, { status }),
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-bookings'] }),
 onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed to update status'),
 });

 // ── Blocked-slot mutations ─────────────────────────────────────────────────

 const createBlockMutation = useMutation({
 mutationFn: async (payload: { startDate: string; endDate: string; startTime: string; endTime: string; label: string }) =>
 client.post('/appointments/blocked-slots', payload),
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-blocked-slots'] });
 setBlockSuccess('Time slot blocked successfully!');
 setBlockError('');
 setBlockDate('');
 setBlockEndDate('');
 setBlockStartIdx(0);
 setBlockEndIdx(2);
 setBlockLabel('');
 },
 onError: (err: any) => {
 setBlockError(err.response?.data?.error?.message || 'Failed to block slot');
 setBlockSuccess('');
 },
 });

 const deleteBlockMutation = useMutation({
 mutationFn: async (blockId: string) => client.delete(`/appointments/blocked-slots/${blockId}`),
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-blocked-slots'] }),
 onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed to remove block'),
 });

 // ── Consultation type helpers ──────────────────────────────────────────────

 const handleStartEdit = (type: any) => {
 setEditingTypeId(type._id);
 setTypeName(type.name || '');
 setPriceInRupees(type.price ? (type.price / 100).toString() : '');
 setDuration(type.duration ? type.duration.toString() : '30');
 setSpecialOfferTitle(type.specialOfferTitle || '');
 setOfferPriceInRupees(type.offerPrice ? (type.offerPrice / 100).toString() : '');
 setOfferExpiresAt(type.offerExpiresAt ? new Date(type.offerExpiresAt).toISOString().substring(0, 16) : '');
 setDescription(type.description || '');
 setImageUrl(type.imageUrl || '');
 setCategory(type.category || 'Astrology');
 setErrorMsg('');
 setSuccessMsg('');
 };

 const handleCancelEdit = () => {
 setEditingTypeId(null);
 setTypeName('');
 setPriceInRupees('');
 setDuration('30');
 setSpecialOfferTitle('');
 setOfferPriceInRupees('');
 setOfferExpiresAt('');
 setDescription('');
 setImageUrl('');
 setCategory('Astrology');
 setErrorMsg('');
 setSuccessMsg('');
 };

 const handleSubmitType = (e: React.FormEvent) => {
 e.preventDefault();
 if (!typeName.trim() || !priceInRupees || !duration) return;
 const pricePaise = Math.round(parseFloat(priceInRupees) * 100);
 const offerPricePaise = offerPriceInRupees ? Math.round(parseFloat(offerPriceInRupees) * 100) : undefined;
 const payload = {
 name: typeName,
 price: pricePaise,
 duration: parseInt(duration),
 description,
 imageUrl: imageUrl || '',
 category,
 specialOfferTitle: specialOfferTitle || undefined,
 offerPrice: offerPricePaise ?? null,
 offerExpiresAt: offerExpiresAt ? new Date(offerExpiresAt).toISOString() : null,
 };
 if (editingTypeId) {
 updateTypeMutation.mutate({ id: editingTypeId, payload });
 } else {
 addTypeMutation.mutate(payload);
 }
 };

 // ── Blocked slot helper ────────────────────────────────────────────────────

 const handleBlockSlot = (e: React.FormEvent) => {
 e.preventDefault();
 setBlockError('');
 setBlockSuccess('');

 if (!blockDate) { setBlockError('Please select a start date.'); return; }
 const effectiveEndDate = blockEndDate || blockDate;
 if (effectiveEndDate < blockDate) { setBlockError('End date cannot be before start date.'); return; }
 if (blockEndIdx <= blockStartIdx) { setBlockError('End time must be after start time.'); return; }

 // Build UTC ISO: start uses blockDate, end uses effectiveEndDate
 const startISO = buildUTCISO(blockDate, TIME_LABELS[blockStartIdx].utcOffset);
 const endISO = buildUTCISO(effectiveEndDate, TIME_LABELS[blockEndIdx].utcOffset);

 createBlockMutation.mutate({
 startDate: blockDate,
 endDate: effectiveEndDate,
 startTime: startISO,
 endTime: endISO,
 label: blockLabel || 'Blocked',
 });
 };

 // ── Guard ──────────────────────────────────────────────────────────────────

 if (isLoading || !user || user.role !== 'admin') {
 return (
 <div className="min-h-screen bg-white flex items-center justify-center text-gray-600">
 Verifying Admin Privileges...
 </div>
 );
 }

 const isMutating = addTypeMutation.isPending || updateTypeMutation.isPending;
 const todayStr = new Date().toISOString().split('T')[0];

 // End-time options must come after chosen start
 const endTimeOptions = TIME_LABELS.slice(blockStartIdx + 1);

 return (
 <div className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
 <div className="max-w-6xl mx-auto space-y-10">

 {/* Header */}
 <div className="flex items-center justify-between">
 <button
 onClick={() => router.push('/admin/dashboard')}
 className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium"
 >
 <ArrowLeft className="w-4 h-4" /> Back to Dashboard
 </button>
 </div>

 <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
 <Calendar className="w-7 h-7 text-[var(--gold)]" /> Bookings &amp; Slots Settings
 </h1>

 {/* ── Row 1: Consultation types + bookings log ─────────────────────── */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

 {/* Left: Create / Edit consultation types */}
 <div className="lg:col-span-1 space-y-6">
 <GoldCard className="border border-[var(--gold-100)] p-6 space-y-4">
 <h3 className="font-serif text-base font-bold text-[var(--gold)] flex items-center gap-1.5">
 {editingTypeId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
 {editingTypeId ? 'Edit consultation type' : 'Create consultation type'}
 </h3>

 {successMsg && <div className="text-xs text-green-600 bg-green-50 p-3 border border-green-200 rounded-lg">{successMsg}</div>}
 {errorMsg && <div className="text-xs text-red-600 bg-red-50 p-3 border border-red-200 rounded-lg">{errorMsg}</div>}

 <form onSubmit={handleSubmitType} className="space-y-4">
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Name</label>
 <input type="text" value={typeName} onChange={(e) => setTypeName(e.target.value)} required placeholder="e.g. Premium Kundali Reading" className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Price (INR)</label>
 <input type="number" value={priceInRupees} onChange={(e) => setPriceInRupees(e.target.value)} required placeholder="e.g. 1500" className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
 </div>
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Duration (Mins)</label>
 <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required placeholder="30" className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
 </div>
 </div>

 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Category</label>
 <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]">
 <option value="Astrology" className="bg-gray-100">Astrology</option>
 <option value="Numerology" className="bg-gray-100">Numerology</option>
 <option value="Tarot Card" className="bg-gray-100">Tarot Card</option>
 <option value="Graphology" className="bg-gray-100">Graphology</option>
 </select>
 </div>

 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Special Offer Title (Optional)</label>
 <input type="text" value={specialOfferTitle} onChange={(e) => setSpecialOfferTitle(e.target.value)} placeholder="e.g. Festive Discount" className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
 </div>

 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Offer Price (INR) (Optional)</label>
 <input type="number" value={offerPriceInRupees} onChange={(e) => setOfferPriceInRupees(e.target.value)} placeholder="e.g. 999" className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
 </div>

 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Offer Expiry (Optional)</label>
 <input type="datetime-local" value={offerExpiresAt} onChange={(e) => setOfferExpiresAt(e.target.value)} className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
 </div>

 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Appointment Image (Optional)</label>
 {imageUrl ? (
 <div className="relative border border-[var(--gold-100)] rounded-lg p-2.5 bg-white/40 flex items-center gap-3">
 <img src={imageUrl} alt="Uploaded preview" className="w-12 h-10 object-cover rounded-lg border border-gray-200" />
 <div className="flex-1 min-w-0">
 <p className="text-[9px] text-gray-600 truncate font-mono">{imageUrl}</p>
 <button
 type="button"
 onClick={() => setImageUrl('')}
 className="text-[9px] text-red-600 hover:text-red-600 font-semibold block mt-0.5"
 >
 Remove Image
 </button>
 </div>
 </div>
 ) : (
 <div className="relative border border-dashed border-[var(--gold-100)] hover:border-[var(--gold)] rounded-lg p-4 flex flex-col items-center justify-center bg-white/40 transition-colors cursor-pointer group">
 <input
 type="file"
 accept="image/*"
 onChange={handleImageUpload}
 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
 disabled={isUploading}
 />
 <Upload className="w-6 h-6 text-gray-600 group-hover:text-[var(--gold)] transition-colors mb-1.5" />
 <span className="text-[10px] text-gray-600 group-hover:text-gray-900 transition-colors">
 {isUploading ? 'Uploading image...' : 'Click to Upload Image'}
 </span>
 </div>
 )}
 </div>

 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Description</label>
 <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide consultation summary details..." rows={3} className="w-full bg-white/60 border border-[var(--gold-100)] rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)]" />
 </div>

 <div className="flex gap-2">
 {editingTypeId && (
 <GoldButton type="button" variant="outlined" fullWidth onClick={handleCancelEdit} className="py-2 text-xs">
 <X className="w-3.5 h-3.5 mr-1" /> Cancel
 </GoldButton>
 )}
 <GoldButton type="submit" variant="filled" fullWidth isLoading={isMutating} className="py-2 text-xs">
 {editingTypeId ? 'Save Changes' : 'Create Type'}
 </GoldButton>
 </div>
 </form>
 </GoldCard>

 {/* Active consultation offerings list */}
 <div className="space-y-3">
 <h4 className="font-serif text-sm font-bold text-gray-900">Active Consultation Offerings</h4>
 {loadingTypes ? (
 <p className="text-gray-500 text-xs animate-pulse">Loading types...</p>
 ) : appTypes && appTypes.length > 0 ? (
 <div className="space-y-2">
 {appTypes.map((type: any) => (
 <div
 key={type._id}
 className={`p-3.5 border rounded-xl text-xs transition-colors ${
 editingTypeId === type._id
 ? 'bg-[var(--gold-10)] border-[var(--gold)]'
 : 'bg-gray-100 border-gray-200 hover:border-neutral-700'
 }`}
 >
 <div className="flex items-center justify-between">
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2">
 <h5 className="font-bold text-gray-900 truncate">{type.name}</h5>
 <span className="text-[9px] bg-gray-200 text-[var(--gold)] border border-[var(--gold-100)] rounded-full px-1.5 py-0.5 flex-shrink-0">
 {type.category || 'Astrology'}
 </span>
 </div>
 <p className="text-[10px] text-gray-600 mt-0.5">{type.duration} mins · ₹{(type.price / 100).toLocaleString()}{type.imageUrl ? ' · 🖼️ Image Added' : ''}</p>
 {type.specialOfferTitle && (
 <p className="text-[9px] text-amber-600 mt-0.5">🏷 {type.specialOfferTitle}{type.offerPrice ? ` · ₹${(type.offerPrice / 100).toLocaleString()}` : ''}</p>
 )}
 </div>
 <div className="flex items-center gap-1 ml-2">
 <button onClick={() => handleStartEdit(type)} className="p-1.5 text-blue-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
 <Pencil className="w-3.5 h-3.5" />
 </button>
 <button onClick={() => { if (confirm('Delete this offering?')) deleteTypeMutation.mutate(type._id); }} className="p-1.5 text-red-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
 <Trash2 className="w-3.5 h-3.5" />
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 ) : (
 <p className="text-gray-500 text-[11px]">No offerings defined yet.</p>
 )}
 </div>
 </div>

 {/* Right: Booked slot logs & statuses */}
 <div className="lg:col-span-2 space-y-4">
 <h2 className="font-serif text-lg font-bold">Scheduled Consultations Log</h2>
 {loadingBookings ? (
 <p className="text-gray-600 text-xs animate-pulse">Loading list...</p>
 ) : bookings && bookings.length > 0 ? (
 <div className="space-y-4">
 {bookings.map((booking: any) => {
 const dateObj = new Date(booking.scheduledAt);
 return (
 <GoldCard key={booking._id} className="border border-gray-200 p-4">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
 <div className="space-y-1">
 <div className="flex items-center gap-2">
 <span className="font-bold text-sm text-gray-900">{booking.typeName}</span>
 <span className={`text-[9px] font-bold uppercase py-0.5 px-2 rounded-full ${
 booking.status === 'confirmed' ? 'bg-green-50 text-green-600 border border-green-200' :
 booking.status === 'cancelled' ? 'bg-red-50 text-red-600 border border-red-200' :
 'bg-yellow-50 text-yellow-600 border border-yellow-200'
 }`}>
 {booking.status}
 </span>
 </div>
 <p className="text-gray-600 text-xs">User: {booking.userId?.name || 'Unknown'} ({booking.userId?.email || 'N/A'}) · Phone: {booking.userId?.phone || 'N/A'}</p>
 <p className="text-gray-500 text-[10px] flex items-center gap-1.5">
 <Clock className="w-3.5 h-3.5 text-[var(--gold)]" />
 {dateObj.toLocaleDateString()} at {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
 </p>
 </div>
 <div className="flex items-center gap-2">
 <button onClick={() => updateStatusMutation.mutate({ apptId: booking._id, status: 'confirmed' })} className="p-1.5 bg-green-50 hover:bg-green-900/40 border border-green-200 text-green-600 rounded-lg transition-colors" title="Confirm Booking">
 <CheckCircle className="w-4 h-4" />
 </button>
 <button onClick={() => updateStatusMutation.mutate({ apptId: booking._id, status: 'cancelled' })} className="p-1.5 bg-red-50 hover:bg-red-900/40 border border-red-200 text-red-600 rounded-lg transition-colors" title="Cancel Booking">
 <XCircle className="w-4 h-4" />
 </button>
 </div>
 </div>
 </GoldCard>
 );
 })}
 </div>
 ) : (
 <p className="text-gray-500 text-xs py-8 text-center">No appointments booked yet.</p>
 )}
 </div>
 </div>

 {/* ── Row 2: Block Time Slots ───────────────────────────────────────── */}
 <div className="border-t border-[var(--gold-100)]/30 pt-10 space-y-6">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
 <ShieldAlert className="w-5 h-5 text-red-600" />
 </div>
 <div>
 <h2 className="font-serif text-xl font-bold text-gray-900">Block Time Slots</h2>
 <p className="text-gray-600 text-xs mt-0.5">Prevent users from booking specific time windows. Blocked slots will not appear in the availability calendar.</p>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
 {/* Block form */}
 <div className="lg:col-span-2">
 <GoldCard className="border border-red-200 p-6 space-y-5">
 <h3 className="font-serif text-sm font-bold text-red-600 flex items-center gap-2">
 <BanIcon className="w-4 h-4" /> Add New Block
 </h3>

 {blockSuccess && <div className="text-xs text-green-600 bg-green-50 p-3 border border-green-200 rounded-lg">{blockSuccess}</div>}
 {blockError && <div className="text-xs text-red-600 bg-red-50 p-3 border border-red-200 rounded-lg">{blockError}</div>}

 <form onSubmit={handleBlockSlot} className="space-y-4">
 {/* Date row: Start + End */}
 <div className="grid grid-cols-2 gap-3">
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Start Date</label>
 <input
 type="date"
 min={todayStr}
 value={blockDate}
 onChange={(e) => {
 setBlockDate(e.target.value);
 // Keep end date >= start date
 if (blockEndDate && blockEndDate < e.target.value) setBlockEndDate(e.target.value);
 }}
 required
 className="w-full bg-white/60 border border-red-200 rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-red-700"
 />
 </div>
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
 End Date <span className="text-gray-500 normal-case">(optional)</span>
 </label>
 <input
 type="date"
 min={blockDate || todayStr}
 value={blockEndDate}
 onChange={(e) => setBlockEndDate(e.target.value)}
 placeholder={blockDate || todayStr}
 className="w-full bg-white/60 border border-red-200 rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-red-700"
 />
 </div>
 </div>

 {/* Start & End time */}
 <div className="grid grid-cols-2 gap-3">
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Start Time (IST)</label>
 <select
 value={blockStartIdx}
 onChange={(e) => {
 const idx = Number(e.target.value);
 setBlockStartIdx(idx);
 if (blockEndIdx <= idx) setBlockEndIdx(idx + 1);
 }}
 className="w-full bg-white/60 border border-red-200 rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-red-700"
 >
 {TIME_LABELS.slice(0, -1).map((t, i) => (
 <option key={i} value={i} className="bg-gray-100">{t.label}</option>
 ))}
 </select>
 </div>
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">End Time (IST)</label>
 <select
 value={blockEndIdx}
 onChange={(e) => setBlockEndIdx(Number(e.target.value))}
 className="w-full bg-white/60 border border-red-200 rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-red-700"
 >
 {endTimeOptions.map((t, relIdx) => {
 const absIdx = blockStartIdx + 1 + relIdx;
 return (
 <option key={absIdx} value={absIdx} className="bg-gray-100">{t.label}</option>
 );
 })}
 </select>
 </div>
 </div>

 {/* Label */}
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
 Reason / Label <span className="text-gray-500 normal-case">(optional)</span>
 </label>
 <input
 type="text"
 value={blockLabel}
 onChange={(e) => setBlockLabel(e.target.value)}
 placeholder="e.g. Lunch break, Personal, Holiday"
 maxLength={80}
 className="w-full bg-white/60 border border-red-200 rounded-lg py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-red-700"
 />
 </div>

 {/* Preview */}
 {blockDate && (
 <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-[10px] text-red-600 flex items-center gap-2">
 <BanIcon className="w-3 h-3 flex-shrink-0" />
 <span>
 Blocking&nbsp;<strong>{TIME_LABELS[blockStartIdx].label} – {TIME_LABELS[blockEndIdx]?.label ?? '—'}</strong>
 &nbsp;from&nbsp;
 <strong>{new Date(blockDate + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
 {blockEndDate && blockEndDate !== blockDate && (
 <>&nbsp;→&nbsp;<strong>{new Date(blockEndDate + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong></>
 )}
 </span>
 </div>
 )}

 <GoldButton
 type="submit"
 variant="filled"
 fullWidth
 isLoading={createBlockMutation.isPending}
 className="py-2 text-xs bg-red-900/60 hover:bg-red-800/60 border-red-700/50"
 >
 <BanIcon className="w-3.5 h-3.5 mr-1.5" /> Block This Slot
 </GoldButton>
 </form>
 </GoldCard>
 </div>

 {/* Existing blocked slots list */}
 <div className="lg:col-span-3 space-y-4">
 <h3 className="font-serif text-sm font-bold text-gray-900">
 Active Slot Blocks
 {blockedSlots && blockedSlots.length > 0 && (
 <span className="ml-2 text-[10px] bg-red-50 text-red-600 border border-red-200 rounded-full px-2 py-0.5 font-mono">
 {blockedSlots.length}
 </span>
 )}
 </h3>

 {loadingBlocks ? (
 <p className="text-gray-500 text-xs animate-pulse">Loading blocked slots...</p>
 ) : blockedSlots && blockedSlots.length > 0 ? (
 <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1 custom-scroll">
 {blockedSlots.map((block: any) => (
 <div
 key={block._id}
 className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-100 border border-red-200 rounded-xl group hover:border-red-200 transition-colors"
 >
 <div className="flex items-center gap-3 min-w-0">
 <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
 <BanIcon className="w-3.5 h-3.5 text-red-600" />
 </div>
 <div className="min-w-0">
 <p className="text-gray-900 text-xs font-medium truncate">{block.label || 'Blocked'}</p>
 <p className="text-[10px] text-gray-600 flex items-center gap-1 mt-0.5">
 <Clock className="w-3 h-3 text-red-600 flex-shrink-0" />
 {formatBlockedSlot(block.startTime, block.endTime, block.startDate, block.endDate)}
 </p>
 </div>
 </div>
 <button
 onClick={() => {
 if (confirm(`Remove block "${block.label || 'Blocked'}" for ${formatBlockedSlot(block.startTime, block.endTime)}?`)) {
 deleteBlockMutation.mutate(block._id);
 }
 }}
 disabled={deleteBlockMutation.isPending}
 className="p-1.5 text-red-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 opacity-60 group-hover:opacity-100"
 title="Remove block"
 >
 <Trash2 className="w-3.5 h-3.5" />
 </button>
 </div>
 ))}
 </div>
 ) : (
 <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 border border-dashed border-gray-200 rounded-2xl">
 <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
 <Calendar className="w-5 h-5 text-gray-600" />
 </div>
 <p className="text-gray-500 text-xs">No time slots are currently blocked.</p>
 <p className="text-gray-600 text-[10px] max-w-xs">Use the form to block specific windows — they won't show up as bookable for users.</p>
 </div>
 )}
 </div>
 </div>
 </div>

 </div>
 </div>
 );
}
