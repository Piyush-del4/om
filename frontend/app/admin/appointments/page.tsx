'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import {
  Calendar,
  Plus,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Pencil,
  X,
  BanIcon,
  ShieldAlert,
  Upload,
  Layers,
  CheckCircle2,
  AlertCircle,
  User as UserIcon,
} from 'lucide-react';

// IST time helpers
function generateISTTimeLabels(): { label: string; utcOffset: number }[] {
  const slots: { label: string; utcOffset: number }[] = [];
  for (let h = 10; h <= 18; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 18 && m > 0) break;
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      const istMin = h * 60 + m;
      const utcMin = istMin - 330;
      slots.push({ label: `${hh}:${mm} IST`, utcOffset: utcMin });
    }
  }
  return slots;
}

const TIME_LABELS = generateISTTimeLabels();

function buildUTCISO(date: string, utcOffsetMin: number): string {
  const [y, mo, d] = date.split('-').map(Number);
  const utcH = Math.floor(utcOffsetMin / 60);
  const utcM = utcOffsetMin % 60;
  return new Date(Date.UTC(y, mo - 1, d, utcH, utcM, 0)).toISOString();
}

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

export default function AdminAppointmentsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'offerings' | 'bookings' | 'blocks'>('bookings');

  // Form states
  const [editingTypeId, setEditingTypeId] = useState<string | null>(null);
  const [typeName, setTypeName] = useState('');
  const [priceInRupees, setPriceInRupees] = useState('');
  const [duration, setDuration] = useState('30');
  const [specialOfferTitle, setSpecialOfferTitle] = useState('');
  const [offerPriceInRupees, setOfferPriceInRupees] = useState('');
  const [offerExpiresAt, setOfferExpiresAt] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Astrology');
  const [whoIsThisFor, setWhoIsThisFor] = useState<{ title: string; subtitle: string }[]>([
    { title: '', subtitle: '' },
    { title: '', subtitle: '' },
    { title: '', subtitle: '' },
    { title: '', subtitle: '' },
  ]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Block slot form states
  const [blockDate, setBlockDate] = useState('');
  const [blockEndDate, setBlockEndDate] = useState('');
  const [blockStartIdx, setBlockStartIdx] = useState(0);
  const [blockEndIdx, setBlockEndIdx] = useState(2);
  const [blockLabel, setBlockLabel] = useState('');
  const [blockError, setBlockError] = useState('');
  const [blockSuccess, setBlockSuccess] = useState('');

  // Image Upload
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

  // Queries
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

  // Mutations
  const addTypeMutation = useMutation({
    mutationFn: async (payload: any) => client.post('/appointments/types', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-appointment-types'] });
      setSuccessMsg('Consultation type created successfully!');
      handleCancelEdit();
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.error?.message || 'Failed to create type');
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
      setErrorMsg(err.response?.data?.error?.message || 'Failed to update type');
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

  const createBlockMutation = useMutation({
    mutationFn: async (payload: { startDate: string; endDate: string; startTime: string; endTime: string; label: string }) =>
      client.post('/appointments/blocked-slots', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blocked-slots'] });
      setBlockSuccess('Time slot window blocked successfully!');
      setBlockError('');
      setBlockDate('');
      setBlockEndDate('');
      setBlockStartIdx(0);
      setBlockEndIdx(2);
      setBlockLabel('');
    },
    onError: (err: any) => {
      setBlockError(err.response?.data?.error?.message || 'Failed to block slot');
    },
  });

  const deleteBlockMutation = useMutation({
    mutationFn: async (blockId: string) => client.delete(`/appointments/blocked-slots/${blockId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-blocked-slots'] }),
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Failed to remove block'),
  });

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
    if (type.whoIsThisFor && Array.isArray(type.whoIsThisFor) && type.whoIsThisFor.length > 0) {
      setWhoIsThisFor(type.whoIsThisFor);
    } else {
      setWhoIsThisFor([
        { title: '', subtitle: '' },
        { title: '', subtitle: '' },
        { title: '', subtitle: '' },
        { title: '', subtitle: '' },
      ]);
    }
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
    setWhoIsThisFor([
      { title: '', subtitle: '' },
      { title: '', subtitle: '' },
      { title: '', subtitle: '' },
      { title: '', subtitle: '' },
    ]);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleSubmitType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typeName.trim() || !priceInRupees || !duration) return;
    const pricePaise = Math.round(parseFloat(priceInRupees) * 100);
    const offerPricePaise = offerPriceInRupees ? Math.round(parseFloat(offerPriceInRupees) * 100) : undefined;
    const cleanWhoIsThisFor = whoIsThisFor.filter((item) => item.title.trim() && item.subtitle.trim());
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
      whoIsThisFor: cleanWhoIsThisFor.length > 0 ? cleanWhoIsThisFor : undefined,
    };
    if (editingTypeId) {
      updateTypeMutation.mutate({ id: editingTypeId, payload });
    } else {
      addTypeMutation.mutate(payload);
    }
  };

  const handleBlockSlot = (e: React.FormEvent) => {
    e.preventDefault();
    setBlockError('');
    setBlockSuccess('');

    if (!blockDate) {
      setBlockError('Please select a start date.');
      return;
    }
    const effectiveEndDate = blockEndDate || blockDate;
    if (effectiveEndDate < blockDate) {
      setBlockError('End date cannot be before start date.');
      return;
    }
    if (blockEndIdx <= blockStartIdx) {
      setBlockError('End time must be after start time.');
      return;
    }

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

  const todayStr = new Date().toISOString().split('T')[0];
  const endTimeOptions = TIME_LABELS.slice(blockStartIdx + 1);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in min-w-0">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0" /> Bookings & Availability Controls
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Configure consultation offerings, log scheduled sessions, and block slot windows.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Bookings ({bookings?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('offerings')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'offerings'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-600" /> Types ({appTypes?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('blocks')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'blocks'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BanIcon className="w-3.5 h-3.5 text-amber-600" /> Block Slots ({blockedSlots?.length || 0})
          </button>
        </div>
      </div>

      {/* TAB 1: SCHEDULED BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <h3 className="font-serif text-base font-bold text-gray-900">Recorded Client Consultations</h3>

          {loadingBookings ? (
            <p className="text-xs text-gray-600 animate-pulse">Loading consultations log...</p>
          ) : bookings && bookings.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200/80 bg-white shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/80 font-semibold text-gray-600 font-mono text-[10px] uppercase tracking-wider">
                      <th className="py-3 px-4">Consultation Offering</th>
                      <th className="py-3 px-4">Client Information</th>
                      <th className="py-3 px-4">Scheduled Window</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {bookings.map((booking: any) => {
                      const dateObj = new Date(booking.scheduledAt);
                      return (
                        <tr key={booking._id} className="hover:bg-gray-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-gray-900">
                            {booking.typeName}
                            <div className="text-[10px] text-amber-600 font-mono font-normal mt-0.5">
                              ₹{booking.amountPaid ? (booking.amountPaid / 100).toLocaleString() : 'N/A'}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-gray-900">{booking.userId?.name || 'Guest User'}</div>
                            <div className="text-[10px] text-gray-600">{booking.userId?.email || 'N/A'}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <div className="text-gray-900 font-bold flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              {dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                            <div className="text-gray-600 mt-0.5">
                              {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-[9px] font-bold uppercase py-0.5 px-2.5 rounded-full ${
                                booking.status === 'confirmed'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : booking.status === 'cancelled'
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => updateStatusMutation.mutate({ apptId: booking._id, status: 'confirmed' })}
                                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => updateStatusMutation.mutate({ apptId: booking._id, status: 'cancelled' })}
                                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Cards */}
              <div className="md:hidden space-y-3">
                {bookings.map((booking: any) => {
                  const dateObj = new Date(booking.scheduledAt);
                  return (
                    <div
                      key={booking._id}
                      className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-gray-900">{booking.typeName}</span>
                        <span
                          className={`text-[9px] font-bold uppercase py-0.5 px-2 rounded-full ${
                            booking.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : booking.status === 'cancelled'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="text-xs space-y-0.5 text-gray-700">
                        <p className="font-semibold text-gray-900">Client: {booking.userId?.name || 'Guest User'}</p>
                        <p className="text-gray-500">{booking.userId?.email || 'N/A'}</p>
                        <p className="text-amber-600 font-mono font-bold pt-0.5">
                          {dateObj.toLocaleDateString()} at {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => updateStatusMutation.mutate({ apptId: booking._id, status: 'confirmed' })}
                          className="px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatusMutation.mutate({ apptId: booking._id, status: 'cancelled' })}
                          className="px-3 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-700 border border-red-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="p-12 text-center border border-dashed border-gray-300 rounded-2xl space-y-2">
              <Calendar className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="text-xs font-semibold text-gray-700">No consultations booked yet</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CONSULTATION OFFERINGS */}
      {activeTab === 'offerings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                  {editingTypeId ? <Pencil className="w-4 h-4 text-amber-600" /> : <Plus className="w-4 h-4 text-amber-600" />}
                  {editingTypeId ? 'Edit Offering' : 'Create Offering'}
                </h3>
                {editingTypeId && (
                  <button onClick={handleCancelEdit} className="text-xs text-gray-600 hover:text-gray-900">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {successMsg && (
                <div className="p-3 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmitType} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-gray-700">Offering Name *</label>
                  <input
                    type="text"
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                    required
                    placeholder="e.g. Premium Kundali Guidance"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-gray-700">Price (INR) *</label>
                    <input
                      type="number"
                      value={priceInRupees}
                      onChange={(e) => setPriceInRupees(e.target.value)}
                      required
                      placeholder="1500"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-gray-700">Duration (Mins) *</label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                      placeholder="30"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-gray-700">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 cursor-pointer"
                  >
                    <option value="Astrology">Astrology</option>
                    <option value="Numerology">Numerology</option>
                    <option value="Tarot Card">Tarot Card</option>
                    <option value="Graphology">Graphology</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-gray-700">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Summary of consultation session..."
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-600 tracking-wider">
                    Offering Image
                  </span>
                  {imageUrl && (
                    <div className="relative group border border-gray-200 rounded-xl overflow-hidden h-24 w-full bg-gray-100 mb-2">
                      <img src={imageUrl} alt="Offering preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImageUrl('')}
                        className="absolute inset-0 bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold cursor-pointer"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}

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
                      {isUploading ? 'Uploading...' : imageUrl ? 'Click to Replace Image' : 'Click to Upload Offering Image'}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={addTypeMutation.isPending || updateTypeMutation.isPending}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  {editingTypeId ? 'Save Offering' : 'Create Offering'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-base font-bold text-gray-900">Offerings ({appTypes?.length || 0})</h3>
            {loadingTypes ? (
              <p className="text-xs text-gray-600 animate-pulse">Loading offerings...</p>
            ) : appTypes && appTypes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {appTypes.map((type: any) => (
                  <div
                    key={type._id}
                    className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-3 flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3">
                      {type.imageUrl ? (
                        <img
                          src={type.imageUrl}
                          alt={type.name}
                          className="w-14 h-14 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 flex-shrink-0">
                          <Calendar className="w-6 h-6" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-xs text-gray-900 truncate">{type.name}</h4>
                          <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-200 rounded-full px-2 py-0.5 font-bold uppercase flex-shrink-0">
                            {type.category || 'Astrology'}
                          </span>
                        </div>
                        <p className="text-xs text-amber-600 font-bold">
                          ₹{(type.price / 100).toLocaleString()}{' '}
                          <span className="text-gray-500 font-normal text-[11px]">
                            · {type.duration} Mins
                          </span>
                        </p>
                        {type.description && (
                          <p className="text-[11px] text-gray-500 line-clamp-2">
                            {type.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-1 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => handleStartEdit(type)}
                        className="p-1.5 text-gray-500 hover:text-amber-600 rounded-lg hover:bg-gray-100"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete offering "${type.name}"?`)) {
                            deleteTypeMutation.mutate(type._id);
                          }
                        }}
                        className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-gray-300 rounded-2xl">
                <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700">No offerings defined</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: BLOCK SLOTS */}
      {activeTab === 'blocks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-red-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-red-100 pb-3">
                <div className="w-8 h-8 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-gray-900">Block Time Window</h3>
                </div>
              </div>

              {blockSuccess && (
                <div className="p-3 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{blockSuccess}</span>
                </div>
              )}

              {blockError && (
                <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{blockError}</span>
                </div>
              )}

              <form onSubmit={handleBlockSlot} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-gray-700">Start Date *</label>
                    <input
                      type="date"
                      min={todayStr}
                      value={blockDate}
                      onChange={(e) => {
                        setBlockDate(e.target.value);
                        if (blockEndDate && blockEndDate < e.target.value) setBlockEndDate(e.target.value);
                      }}
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-gray-700">End Date</label>
                    <input
                      type="date"
                      min={blockDate || todayStr}
                      value={blockEndDate}
                      onChange={(e) => setBlockEndDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-gray-700">Start Time (IST) *</label>
                    <select
                      value={blockStartIdx}
                      onChange={(e) => {
                        const idx = Number(e.target.value);
                        setBlockStartIdx(idx);
                        if (blockEndIdx <= idx) setBlockEndIdx(idx + 1);
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/30 cursor-pointer"
                    >
                      {TIME_LABELS.slice(0, -1).map((t, i) => (
                        <option key={i} value={i}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-gray-700">End Time (IST) *</label>
                    <select
                      value={blockEndIdx}
                      onChange={(e) => setBlockEndIdx(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/30 cursor-pointer"
                    >
                      {endTimeOptions.map((t, relIdx) => {
                        const absIdx = blockStartIdx + 1 + relIdx;
                        return (
                          <option key={absIdx} value={absIdx}>
                            {t.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-gray-700">Reason / Label</label>
                  <input
                    type="text"
                    value={blockLabel}
                    onChange={(e) => setBlockLabel(e.target.value)}
                    placeholder="e.g. Personal, Holiday"
                    maxLength={80}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={createBlockMutation.isPending}
                  className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <BanIcon className="w-4 h-4" /> Block Selected Time Window
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-base font-bold text-gray-900">
              Active Time Window Blocks ({blockedSlots?.length || 0})
            </h3>
            {loadingBlocks ? (
              <p className="text-xs text-gray-600 animate-pulse">Loading blocks...</p>
            ) : blockedSlots && blockedSlots.length > 0 ? (
              <div className="space-y-3">
                {blockedSlots.map((block: any) => (
                  <div
                    key={block._id}
                    className="p-4 rounded-2xl bg-white border border-red-200/80 shadow-sm flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 flex-shrink-0">
                        <BanIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">{block.label || 'Blocked Window'}</h4>
                        <p className="text-[10px] text-gray-600 font-mono">
                          {formatBlockedSlot(block.startTime, block.endTime, block.startDate, block.endDate)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Remove block window "${block.label || 'Blocked'}"?`)) {
                          deleteBlockMutation.mutate(block._id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-gray-300 rounded-2xl">
                <BanIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700">No time slots currently blocked</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
