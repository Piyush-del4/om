'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import {
  Users,
  Plus,
  Trash2,
  Pencil,
  X,
  Save,
  Star,
  Award,
  Loader2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Upload,
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
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
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
        setForm((prev) => ({ ...prev, image: res.data.data.url }));
      } else {
        alert('Upload failed');
      }
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const { data: members = [], isLoading: loadingMembers } = useQuery<TeamMember[]>({
    queryKey: ['admin-team'],
    queryFn: async () => {
      const res = await client.get('/team');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

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

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-600" /> Team Members & Consultant Profiles
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Manage consultant profiles, qualifications, bios, and display ordering.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSeedMsg('');
              seedMutation.mutate();
            }}
            disabled={seedMutation.isPending}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            {seedMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            Seed Defaults
          </button>
          <button
            onClick={openNew}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/10 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Team Member
          </button>
        </div>
      </div>

      {seedMsg && (
        <div
          className={`p-3 rounded-xl border text-xs font-mono ${
            seedMsg.startsWith('✅') ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          {seedMsg}
        </div>
      )}

      {/* Edit / Create Form Modal Card */}
      {editingId && (
        <div className="p-6 rounded-2xl bg-white border border-amber-300 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-serif text-base font-bold text-gray-900">
              {editingId === 'new' ? '✦ Add New Team Member' : '✦ Edit Team Member'}
            </h2>
            <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-900">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-gray-700">Full Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Rajessh Paanday"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-gray-700">Role / Title *</label>
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Founder & Chief Astrologer"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-gray-700">Initials (max 3) *</label>
              <input
                value={form.initials}
                onChange={(e) => setForm({ ...form, initials: e.target.value.slice(0, 3).toUpperCase() })}
                placeholder="RP"
                maxLength={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-gray-700">Experience (Years)</label>
              <input
                type="number"
                min={0}
                value={form.experienceYears}
                onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            {/* Photo */}
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-[11px] font-semibold text-gray-700">Consultant Photo</label>
              {form.image ? (
                <div className="relative border border-gray-200 rounded-xl p-2.5 bg-gray-50 flex items-center gap-3">
                  <img src={form.image} alt="Team preview" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-600 truncate font-mono">{form.image}</p>
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, image: '' }))}
                      className="text-[10px] text-red-600 font-semibold block mt-0.5"
                    >
                      Remove Photo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative border border-dashed border-gray-300 hover:border-amber-500 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-amber-50/30 transition-colors cursor-pointer group text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors mb-1" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-900">
                    {isUploading ? 'Uploading photo...' : 'Click to Upload Profile Photo'}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-gray-700">Display Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-semibold text-gray-700">Specializations</label>
              <button onClick={addSpec} className="text-xs text-amber-600 font-semibold hover:underline flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Specialization
              </button>
            </div>
            <div className="space-y-2">
              {form.specializations.map((spec, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    value={spec}
                    onChange={(e) => updateSpec(idx, e.target.value)}
                    placeholder="e.g. Vedic Astrology, Numerology"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-1.5 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                  <button onClick={() => removeSpec(idx)} className="text-red-600 p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-700">Biography / Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              placeholder="Detailed summary of experience and methodology..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={isSaving || !form.name || !form.role || !form.initials}
              className="px-5 py-2.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editingId === 'new' ? 'Create Team Member' : 'Save Changes'}
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="px-4 py-2.5 text-xs font-semibold border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Members Grid */}
      {loadingMembers ? (
        <p className="text-xs text-gray-600 animate-pulse">Loading team members...</p>
      ) : members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member._id}
              className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-amber-600 font-bold font-serif text-lg">
                        {member.initials}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h3 className="font-serif text-base font-bold text-gray-900 truncate">{member.name}</h3>
                    <p className="text-amber-600 text-[10px] font-bold uppercase font-mono tracking-wider">{member.role}</p>
                    {member.experienceYears > 0 && (
                      <span className="inline-flex items-center gap-1 text-[9px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                        <Award className="w-3 h-3 text-amber-600" /> {member.experienceYears}+ Yrs Exp
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(member.specializations || []).slice(0, 4).map((s) => (
                    <span key={s} className="text-[9px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                      {s}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">{member.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <button
                  onClick={() => openEdit(member)}
                  className="flex items-center gap-1.5 font-bold text-amber-600 hover:text-amber-700 hover:bg-amber-50 py-1.5 px-3 rounded-xl transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit Profile
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove ${member.name} from the team?`)) deleteMutation.mutate(member._id);
                  }}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Remove Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center border border-dashed border-gray-300 rounded-2xl space-y-3">
          <Users className="w-10 h-10 text-gray-400 mx-auto" />
          <p className="text-sm font-bold text-gray-800">No team members listed</p>
          <p className="text-xs text-gray-600">Click below or use Seed Defaults to populate consultant team profiles.</p>
        </div>
      )}
    </div>
  );
}
