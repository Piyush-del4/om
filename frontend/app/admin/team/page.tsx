'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import {
 Users, Plus, Trash2, Pencil, X, Save, ArrowLeft,
 Star, Award, Loader2, RefreshCw, ChevronDown, ChevronUp, Upload,
} from 'lucide-react';


interface TeamMember {
 _id: string;
 name: string;
 role: string;
 image: string;
 imageFit: 'cover' | 'contain';
 initials: string;
 specializations: string[];
 description: string;
 accent: string;
 borderColor: string;
 experienceYears: number;
 order: number;
 isActive: boolean;
}

const BLANK_FORM = {
 name: '',
 role: '',
 image: '',
 imageFit: 'cover' as 'cover' | 'contain',
 initials: '',
 specializations: [''] as string[],
 description: '',
 accent: 'from-amber-600/20 to-yellow-600/5',
 borderColor: 'border-amber-600/30',
 experienceYears: 0,
 order: 0,
};

export default function AdminTeamPage() {
 const { user, isAuthenticated, isLoading } = useAuth();
 const router = useRouter();
 const queryClient = useQueryClient();

 const [expandedId, setExpandedId] = useState<string | null>(null);
 const [editingId, setEditingId] = useState<string | null>(null); // null = not editing, 'new' = creating new
 const [form, setForm] = useState({ ...BLANK_FORM });
 const [seedMsg, setSeedMsg] = useState('');
 const [isUploading, setIsUploading] = useState(false);

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (!file) return;

 setIsUploading(true);
 const formData = new FormData();
 formData.append('file', file);
 formData.append('folder', 'team');

 try {
 const res = await client.post('/uploads', formData);
 if (res.data?.success) {
 setForm(prev => ({ ...prev, image: res.data.data.url }));
 } else {
 alert('Upload failed');
 }
 } catch (err: any) {
 alert(err.response?.data?.error?.message || 'Failed to upload image');
 } finally {
 setIsUploading(false);
 }
 };

 // Auth guard
 React.useEffect(() => {
 if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
 router.push('/login');
 }
 }, [isAuthenticated, isLoading, user, router]);

 // Fetch all team members (admin sees inactive too)
 const { data: members = [], isLoading: loadingMembers } = useQuery<TeamMember[]>({
 queryKey: ['admin-team'],
 queryFn: async () => {
 const res = await client.get('/team');
 return res.data?.data || [];
 },
 });

 // Seed mutation
 const seedMutation = useMutation({
 mutationFn: () => client.post('/team/seed'),
 onSuccess: (res) => {
 setSeedMsg(`✅ Seeded ${res.data?.data?.length ?? 0} team members successfully!`);
 queryClient.invalidateQueries({ queryKey: ['admin-team'] });
 queryClient.invalidateQueries({ queryKey: ['team'] });
 },
 onError: (err: any) => {
 const msg = err.response?.data?.error?.message || 'Seed failed';
 setSeedMsg(`❌ ${msg}`);
 },
 });

 // Update mutation
 const updateMutation = useMutation({
 mutationFn: ({ id, data }: { id: string; data: Partial<typeof form> }) =>
 client.patch(`/team/${id}`, data),
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-team'] });
 queryClient.invalidateQueries({ queryKey: ['team'] });
 setEditingId(null);
 },
 onError: (err: any) => alert(`❌ ${err.response?.data?.error?.message || 'Update failed'}`),
 });

 // Create mutation
 const createMutation = useMutation({
 mutationFn: (data: typeof form) => client.post('/team', data),
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-team'] });
 queryClient.invalidateQueries({ queryKey: ['team'] });
 setEditingId(null);
 setForm({ ...BLANK_FORM });
 },
 onError: (err: any) => alert(`❌ ${err.response?.data?.error?.message || 'Create failed'}`),
 });

 // Delete (soft) mutation
 const deleteMutation = useMutation({
 mutationFn: (id: string) => client.delete(`/team/${id}`),
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['admin-team'] });
 queryClient.invalidateQueries({ queryKey: ['team'] });
 },
 onError: (err: any) => alert(`❌ ${err.response?.data?.error?.message || 'Delete failed'}`),
 });

 const openEdit = (member: TeamMember) => {
 setForm({
 name: member.name,
 role: member.role,
 image: member.image,
 imageFit: member.imageFit,
 initials: member.initials,
 specializations: (member.specializations || []).length ? member.specializations : [''],
 description: member.description,
 accent: member.accent,
 borderColor: member.borderColor,
 experienceYears: member.experienceYears ?? 0,
 order: member.order,
 });
 setEditingId(member._id);
 setExpandedId(null);
 };

 const openNew = () => {
 setForm({ ...BLANK_FORM });
 setEditingId('new');
 setExpandedId(null);
 };

 const handleSave = () => {
 if (editingId === 'new') {
 createMutation.mutate(form);
 } else if (editingId) {
 updateMutation.mutate({ id: editingId, data: form });
 }
 };

 const updateSpec = (idx: number, value: string) => {
 const updated = [...form.specializations];
 updated[idx] = value;
 setForm({ ...form, specializations: updated });
 };

 const addSpec = () => setForm({ ...form, specializations: [...form.specializations, ''] });

 const removeSpec = (idx: number) => {
 const updated = form.specializations.filter((_, i) => i !== idx);
 setForm({ ...form, specializations: updated.length ? updated : [''] });
 };

 const isSaving = updateMutation.isPending || createMutation.isPending;

 if (isLoading || loadingMembers) {
 return (
 <div className="min-h-screen bg-white flex items-center justify-center">
 <Loader2 className="w-8 h-8 animate-spin text-[var(--gold)]" />
 </div>
 );
 }

 return (
 <div className="min-h-screen bg-white text-gray-900 pb-24 px-4 sm:px-6 lg:px-8 pt-24">
 <div className="max-w-5xl mx-auto space-y-8">

 {/* Header */}
 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--gold-200)] pb-6">
 <div className="space-y-1">
 <button
 onClick={() => router.push('/admin/dashboard')}
 className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-[var(--gold)] transition-colors mb-1"
 >
 <ArrowLeft className="w-3.5 h-3.5" /> Admin Dashboard
 </button>
 <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
 <Users className="w-7 h-7 text-[var(--gold)]" /> Team <span className="gold-gradient-text">Members</span>
 </h1>
 <p className="text-gray-600 text-xs font-light">Manage consultant profiles displayed on the About Us page.</p>
 </div>
 <div className="flex gap-3 flex-wrap">
 <button
 onClick={() => { setSeedMsg(''); seedMutation.mutate(); }}
 disabled={seedMutation.isPending}
 className="flex items-center gap-2 text-xs px-4 py-2.5 rounded-lg bg-gray-200 border border-neutral-700 text-gray-600 hover:text-gray-900 hover:border-neutral-600 transition-colors"
 >
 {seedMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
 Seed Initial Data
 </button>
 <GoldButton variant="filled" className="py-2.5 px-5 text-xs flex items-center gap-1.5" onClick={openNew}>
 <Plus className="w-4 h-4" /> Add New Member
 </GoldButton>
 </div>
 </div>

 {/* Seed message */}
 {seedMsg && (
 <div className={`text-xs px-4 py-3 rounded-lg border font-mono ${seedMsg.startsWith('✅') ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'}`}>
 {seedMsg}
 </div>
 )}

 {/* Edit / Create Form */}
 {editingId && (
 <GoldCard className="border border-[var(--gold-300)] p-6 space-y-6">
 <div className="flex items-center justify-between">
 <h2 className="font-serif text-xl font-bold text-gray-900">
 {editingId === 'new' ? '✦ Add New Team Member' : '✦ Edit Team Member'}
 </h2>
 <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-900 transition-colors">
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {/* Name */}
 <div className="space-y-1.5">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Full Name *</label>
 <input
 value={form.name}
 onChange={e => setForm({ ...form, name: e.target.value })}
 placeholder="e.g. Rajessh Paanday"
 className="w-full bg-white/60 border border-neutral-700 focus:border-[var(--gold)] rounded-lg py-2.5 px-3 text-gray-900 text-xs outline-none"
 />
 </div>

 {/* Role */}
 <div className="space-y-1.5">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Role / Title *</label>
 <input
 value={form.role}
 onChange={e => setForm({ ...form, role: e.target.value })}
 placeholder="e.g. Founder & Chief Consultant"
 className="w-full bg-white/60 border border-neutral-700 focus:border-[var(--gold)] rounded-lg py-2.5 px-3 text-gray-900 text-xs outline-none"
 />
 </div>

 {/* Initials */}
 <div className="space-y-1.5">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Initials (max 3) *</label>
 <input
 value={form.initials}
 onChange={e => setForm({ ...form, initials: e.target.value.slice(0, 3).toUpperCase() })}
 placeholder="RP"
 maxLength={3}
 className="w-full bg-white/60 border border-neutral-700 focus:border-[var(--gold)] rounded-lg py-2.5 px-3 text-gray-900 text-xs outline-none"
 />
 </div>

 {/* Experience Years */}
 <div className="space-y-1.5">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Experience (Years)</label>
 <input
 type="number"
 min={0}
 value={form.experienceYears}
 onChange={e => setForm({ ...form, experienceYears: Number(e.target.value) })}
 className="w-full bg-white/60 border border-neutral-700 focus:border-[var(--gold)] rounded-lg py-2.5 px-3 text-gray-900 text-xs outline-none"
 />
 </div>

 {/* Photo Upload */}
 <div className="sm:col-span-2 space-y-1.5">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Photo</label>
 {form.image ? (
 <div className="relative border border-neutral-700 rounded-lg p-2.5 bg-white/40 flex items-center gap-3">
 <img src={form.image} alt="Team preview" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
 <div className="flex-1 min-w-0">
 <p className="text-[9px] text-gray-500 truncate font-mono">{form.image}</p>
 <button
 type="button"
 onClick={() => setForm(prev => ({ ...prev, image: '' }))}
 className="text-[9px] text-red-600 hover:text-red-600 font-semibold block mt-0.5"
 >
 Remove Photo
 </button>
 </div>
 </div>
 ) : (
 <div className="relative border border-dashed border-neutral-700 hover:border-[var(--gold)] rounded-lg p-4 flex flex-col items-center justify-center bg-white/40 transition-colors cursor-pointer group">
 <input
 type="file"
 accept="image/*"
 onChange={handleImageUpload}
 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
 disabled={isUploading}
 />
 <Upload className="w-6 h-6 text-gray-500 group-hover:text-[var(--gold)] transition-colors mb-1.5" />
 <span className="text-[10px] text-gray-550 group-hover:text-gray-900 transition-colors">
 {isUploading ? 'Uploading image...' : 'Click to Upload Image'}
 </span>
 </div>
 )}
 </div>

 {/* Image Fit */}
 <div className="space-y-1.5">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Image Fit</label>
 <select
 value={form.imageFit}
 onChange={e => setForm({ ...form, imageFit: e.target.value as 'cover' | 'contain' })}
 className="w-full bg-white/60 border border-neutral-700 focus:border-[var(--gold)] rounded-lg py-2.5 px-3 text-gray-900 text-xs outline-none appearance-none"
 >
 <option value="cover">Cover (fills frame, crops)</option>
 <option value="contain">Contain (full image visible)</option>
 </select>
 </div>

 {/* Order */}
 <div className="space-y-1.5">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Display Order</label>
 <input
 type="number"
 value={form.order}
 onChange={e => setForm({ ...form, order: Number(e.target.value) })}
 className="w-full bg-white/60 border border-neutral-700 focus:border-[var(--gold)] rounded-lg py-2.5 px-3 text-gray-900 text-xs outline-none"
 />
 </div>
 </div>

 {/* Specializations */}
 <div className="space-y-3">
 <div className="flex items-center justify-between">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Specializations</label>
 <button onClick={addSpec} className="flex items-center gap-1 text-[10px] text-[var(--gold)] hover:underline">
 <Plus className="w-3 h-3" /> Add
 </button>
 </div>
 <div className="space-y-2">
 {form.specializations.map((spec, idx) => (
 <div key={idx} className="flex gap-2 items-center">
 <input
 value={spec}
 onChange={e => updateSpec(idx, e.target.value)}
 placeholder="e.g. Astrologist"
 className="flex-1 bg-white/60 border border-neutral-700 focus:border-[var(--gold)] rounded-lg py-2 px-3 text-gray-900 text-xs outline-none"
 />
 <button onClick={() => removeSpec(idx)} className="text-red-600 hover:text-red-600 p-1">
 <X className="w-3.5 h-3.5" />
 </button>
 </div>
 ))}
 </div>
 </div>

 {/* Description */}
 <div className="space-y-1.5">
 <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Biography / Description</label>
 <textarea
 value={form.description}
 onChange={e => setForm({ ...form, description: e.target.value })}
 rows={5}
 placeholder="Write a detailed bio for this team member..."
 className="w-full bg-white/60 border border-neutral-700 focus:border-[var(--gold)] rounded-lg py-2.5 px-3 text-gray-900 text-xs outline-none resize-y leading-relaxed"
 />
 </div>

 {/* Action Buttons */}
 <div className="flex gap-3 pt-2">
 <button
 onClick={handleSave}
 disabled={isSaving || !form.name || !form.role || !form.initials}
 className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-[var(--gold)] hover:bg-[var(--gold-300)] disabled:opacity-40 disabled:cursor-not-allowed text-black rounded-lg transition-colors"
 >
 {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
 {editingId === 'new' ? 'Create Member' : 'Save Changes'}
 </button>
 <button
 onClick={() => setEditingId(null)}
 className="px-6 py-2.5 text-xs border border-neutral-700 rounded-lg text-gray-600 hover:text-gray-900 hover:border-neutral-500 transition-colors"
 >
 Cancel
 </button>
 </div>
 </GoldCard>
 )}

 {/* Members List */}
 <div className="space-y-4">
 {members.length === 0 ? (
 <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
 <Users className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
 <p className="text-gray-500 text-sm font-light">No team members found.</p>
 <p className="text-gray-600 text-xs mt-1">Click &quot;Seed Initial Data&quot; to populate from defaults, or add manually.</p>
 </div>
 ) : members.map((member) => (
 <GoldCard key={member._id} className="border border-gray-200 hover:border-[var(--gold-200)] transition-all duration-300">
 <div className="flex items-start gap-4">
 {/* Avatar */}
 <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
 {member.image ? (
 <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-[var(--gold)] font-bold font-serif text-lg">
 {member.initials}
 </div>
 )}
 </div>

 {/* Info */}
 <div className="flex-1 min-w-0">
 <div className="flex items-start justify-between gap-2">
 <div>
 <h3 className="font-serif text-base font-bold text-gray-900">{member.name}</h3>
 <p className="text-[var(--gold)] text-[10px] uppercase font-mono tracking-wider">{member.role}</p>
 </div>
 <div className="flex items-center gap-2 flex-shrink-0">
 {member.experienceYears > 0 && (
 <span className="hidden sm:inline-flex items-center gap-1 text-[9px] bg-[var(--gold-50)] border border-[var(--gold-200)] text-[var(--gold)] px-2.5 py-0.5 rounded-full font-bold">
 <Award className="w-2.5 h-2.5" /> {member.experienceYears}+ yrs
 </span>
 )}
 <button
 onClick={() => setExpandedId(expandedId === member._id ? null : member._id)}
 className="text-gray-500 hover:text-gray-600 transition-colors"
 >
 {expandedId === member._id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
 </button>
 </div>
 </div>

 {/* Specialization tags */}
 <div className="flex flex-wrap gap-1.5 mt-2">
 {(member.specializations || []).slice(0, 4).map((s) => (
 <span key={s} className="text-[9px] bg-gray-100 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
 {s}
 </span>
 ))}
 {(member.specializations || []).length > 4 && (
 <span className="text-[9px] text-gray-600">+{(member.specializations || []).length - 4} more</span>
 )}
 </div>

 {/* Expanded preview */}
 {expandedId === member._id && (
 <div className="mt-4 pt-4 border-t border-neutral-900 space-y-3">
 <p className="text-gray-600 text-xs leading-relaxed line-clamp-4">{member.description}</p>
 <div className="flex items-center gap-1">
 {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-[var(--gold)] fill-[var(--gold)]" />)}
 </div>
 </div>
 )}
 </div>
 </div>

 {/* Action row */}
 <div className="flex gap-2 mt-4 pt-4 border-t border-neutral-900">
 <button
 onClick={() => openEdit(member)}
 className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg bg-gray-100 border border-neutral-700 text-gray-600 hover:text-[var(--gold)] hover:border-[var(--gold-200)] transition-colors"
 >
 <Pencil className="w-3.5 h-3.5" /> Edit Profile
 </button>
 <button
 onClick={() => {
 if (confirm(`Remove ${member.name} from the team?`)) deleteMutation.mutate(member._id);
 }}
 disabled={deleteMutation.isPending}
 className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
 >
 <Trash2 className="w-3.5 h-3.5" /> Remove
 </button>
 <span className={`ml-auto self-center text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
 member.isActive
 ? 'text-green-600 border-green-200 bg-green-50'
 : 'text-red-600 border-red-200 bg-red-50'
 }`}>
 {member.isActive ? 'Active' : 'Hidden'}
 </span>
 </div>
 </GoldCard>
 ))}
 </div>

 </div>
 </div>
 );
}
