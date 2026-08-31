'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { client } from '@/lib/api/client';
import { GoldButton } from '@/components/ui/GoldButton';
import { GoldCard } from '@/components/ui/GoldCard';
import { User, Lock, AlertCircle, CheckCircle, Trash2, MapPin } from 'lucide-react';
import { ProfileFormSkeleton } from '@/components/ui/Skeleton';
import { AddressForm, AddressFormValues } from '@/components/shop/AddressForm';

export default function ProfilePage() {
 const { user, isAuthenticated, isLoading, refreshUser, logout } = useAuth();
 const router = useRouter();

 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');
 const [dateOfBirth, setDateOfBirth] = useState('');
 const [birthTime, setBirthTime] = useState('');
 const [birthPlace, setBirthPlace] = useState('');
 const [gender, setGender] = useState('');
 const [zodiacSign, setZodiacSign] = useState('');

 const [profileMsg, setProfileMsg] = useState('');
 const [profileError, setProfileError] = useState('');
 const [saving, setSaving] = useState(false);

 const [currentPassword, setCurrentPassword] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [confirmNewPassword, setConfirmNewPassword] = useState('');
 const [passwordMsg, setPasswordMsg] = useState('');
 const [passwordError, setPasswordError] = useState('');
 const [changingPassword, setChangingPassword] = useState(false);

 const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [deleteConfirmEmail, setDeleteConfirmEmail] = useState('');
 const [deleting, setDeleting] = useState(false);
 const [deleteError, setDeleteError] = useState('');

 const [addressMsg, setAddressMsg] = useState('');
 const [addressError, setAddressError] = useState('');
 const [savingAddress, setSavingAddress] = useState(false);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    refreshUser();
  }, [isAuthenticated, isLoading, router]);

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || '');
      setDateOfBirth(user.dateOfBirth || '');
      setBirthTime(user.birthTime || '');
      setBirthPlace(user.birthPlace || '');
      setGender(user.gender || '');
      setZodiacSign(user.zodiacSign || '');
    }
  }, [user]);

 const handleProfileUpdate = async (e: React.FormEvent) => {
 e.preventDefault();
 setSaving(true);
 setProfileMsg('');
 setProfileError('');
 try {
 await client.patch('/users/me', { 
    name, 
    phone,
    dateOfBirth,
    birthTime,
    birthPlace,
    gender,
    zodiacSign
 });
 await refreshUser();
 setProfileMsg('Profile updated successfully.');
 } catch (err: any) {
 setProfileError(err.response?.data?.error?.message || 'Failed to update profile');
 } finally {
 setSaving(false);
 }
 };

 const handleChangePassword = async (e: React.FormEvent) => {
 e.preventDefault();
 if (newPassword !== confirmNewPassword) {
 setPasswordError('New passwords do not match');
 return;
 }
 setChangingPassword(true);
 setPasswordMsg('');
 setPasswordError('');
 try {
 await client.post('/users/me/change-password', { currentPassword, newPassword });
 setPasswordMsg('Password changed successfully.');
 setCurrentPassword('');
 setNewPassword('');
 setConfirmNewPassword('');
 } catch (err: any) {
 setPasswordError(err.response?.data?.error?.message || 'Failed to change password');
 } finally {
 setChangingPassword(false);
 }
 };

 const handleAddressUpdate = async (values: AddressFormValues) => {
    setSavingAddress(true);
    setAddressMsg('');
    setAddressError('');
    try {
      await client.patch('/users/me', { defaultAddress: values });
      await refreshUser();
      setAddressMsg('Delivery & Billing coordinates updated successfully.');
    } catch (err: any) {
      setAddressError(err.response?.data?.error?.message || 'Failed to update coordinates');
    } finally {
      setSavingAddress(false);
    }
  };

 const handleDeleteAccount = async () => {
    if (deleteConfirmEmail !== user?.email) {
      setDeleteError('Email does not match');
      return;
    }
    setDeleting(true);
    setDeleteError('');
    try {
      await client.delete('/users/me');
      await logout();
      router.push('/login');
    } catch (err: any) {
      setDeleteError(err.response?.data?.error?.message || 'Failed to delete account');
      setDeleting(false);
    }
  };

 if (isLoading || !user) {
 return (
 <div className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
 <ProfileFormSkeleton />
 </div>
 );
 }

 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
 <div className="max-w-2xl mx-auto space-y-12 relative z-10">
 <div className="border-b border-[var(--gold-200)] pb-6">
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold font-mono block mb-1">
 Account Management
 </span>
 <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
 My <span className="gold-gradient-text">Profile</span>
 </h1>
 </div>

 {/* Avatar */}
 <div className="flex items-center gap-6 p-4 bg-gray-100/40 border border-gray-200/60 rounded-2xl transition-spring">
 <div className="w-16 h-16 rounded-full bg-[var(--gold)] flex items-center justify-center text-black font-serif font-bold text-2xl shadow-lg border border-[var(--gold-light)] animate-pulse-gold">
 {user.name.charAt(0).toUpperCase()}
 </div>
 <div className="space-y-1">
 <p className="font-serif text-xl font-bold text-gray-900">{user.name}</p>
 <p className="text-gray-600 text-xs font-mono">{user.email}</p>
 </div>
 </div>

 {/* Edit Profile */}
 <GoldCard className="transition-spring">
 <div className="space-y-6">
 <h2 className="font-serif text-xl font-bold flex items-center gap-2.5 pb-2 border-b border-gray-200/60 text-[var(--gold)]">
 <User className="w-5 h-5 text-[var(--gold)]" /> Edit Personal Coordinates
 </h2>
 {profileMsg && <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 p-3 rounded-lg text-xs font-light"><CheckCircle className="w-4 h-4" /><span>{profileMsg}</span></div>}
 {profileError && <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg text-xs font-light"><AlertCircle className="w-4 h-4" /><span>{profileError}</span></div>}
 
 <form onSubmit={handleProfileUpdate} className="space-y-6">
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">Full Name</label>
 <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full input-underline text-gray-900 text-sm py-2" />
 </div>
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500">Email (Read-only)</label>
 <input type="email" value={user.email} disabled className="w-full input-underline text-gray-500 text-sm py-2 cursor-not-allowed border-dashed" />
 </div>
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">Phone Number</label>
 <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9999999999" className="w-full input-underline text-gray-900 text-sm py-2" />
 </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-1">
      <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">Date of Birth</label>
      <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="w-full input-underline text-gray-900 text-sm py-2" />
    </div>
    <div className="space-y-1">
      <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">Time of Birth</label>
      <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="w-full input-underline text-gray-900 text-sm py-2" />
    </div>
  </div>

  <div className="space-y-1">
    <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">Place of Birth</label>
    <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="e.g. Mumbai, Maharashtra" className="w-full input-underline text-gray-900 text-sm py-2" />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-1">
      <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">Gender</label>
      <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full input-underline text-gray-900 text-sm py-2 bg-transparent">
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div className="space-y-1">
      <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">Rashi (Zodiac Sign)</label>
      <select value={zodiacSign} onChange={(e) => setZodiacSign(e.target.value)} className="w-full input-underline text-gray-900 text-sm py-2 bg-transparent">
        <option value="">Select Rashi</option>
        <option value="Aries">Aries (Mesha)</option>
        <option value="Taurus">Taurus (Vrishabha)</option>
        <option value="Gemini">Gemini (Mithuna)</option>
        <option value="Cancer">Cancer (Karka)</option>
        <option value="Leo">Leo (Simha)</option>
        <option value="Virgo">Virgo (Kanya)</option>
        <option value="Libra">Libra (Tula)</option>
        <option value="Scorpio">Scorpio (Vrishchika)</option>
        <option value="Sagittarius">Sagittarius (Dhanu)</option>
        <option value="Capricorn">Capricorn (Makara)</option>
        <option value="Aquarius">Aquarius (Kumbha)</option>
        <option value="Pisces">Pisces (Meena)</option>
      </select>
    </div>
  </div>

 <div className="pt-2">
 <GoldButton type="submit" variant="filled" isLoading={saving}>Save Changes</GoldButton>
 </div>
 </form>
 </div>
 </GoldCard>

 {/* Change Password */}
 <GoldCard className="transition-spring">
 <div className="space-y-6">
 <h2 className="font-serif text-xl font-bold flex items-center gap-2.5 pb-2 border-b border-gray-200/60 text-[var(--gold)]">
 <Lock className="w-5 h-5 text-[var(--gold)]" /> Security Credentials
 </h2>
 {passwordMsg && <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 p-3 rounded-lg text-xs font-light"><CheckCircle className="w-4 h-4" /><span>{passwordMsg}</span></div>}
 {passwordError && <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg text-xs font-light"><AlertCircle className="w-4 h-4" /><span>{passwordError}</span></div>}
 
 <form onSubmit={handleChangePassword} className="space-y-6">
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">Current Password</label>
 <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required placeholder="••••••••" className="w-full input-underline text-gray-900 text-sm py-2" />
 </div>
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">New Password</label>
 <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="••••••••" className="w-full input-underline text-gray-900 text-sm py-2" />
 </div>
 <div className="space-y-1">
 <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--gold-light)]">Confirm New Password</label>
 <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required placeholder="••••••••" className="w-full input-underline text-gray-900 text-sm py-2" />
 </div>
 <div className="pt-2">
 <GoldButton type="submit" variant="outlined" isLoading={changingPassword}>Update Password</GoldButton>
 </div>
 </form>
 </div>
 </GoldCard>

 {/* Danger Zone */}
  <GoldCard className="border border-red-200 !bg-red-50/30 transition-spring">
    <div className="space-y-4">
      <h2 className="font-serif text-xl font-bold flex items-center gap-2.5 pb-2 border-b border-red-200/60 text-red-600">
        <Trash2 className="w-5 h-5" /> Danger Zone
      </h2>
      <p className="text-gray-600 text-xs font-light leading-relaxed">
        Permanently delete your account and all associated data. This action is <strong>irreversible</strong> — your profile, bookings, and saved reports will be erased forever.
      </p>
      <button
        type="button"
        onClick={() => { setShowDeleteModal(true); setDeleteError(''); setDeleteConfirmEmail(''); }}
        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors duration-200 flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" /> Delete My Account
      </button>
    </div>
  </GoldCard>

  {/* Delete Confirmation Modal */}
  {showDeleteModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 border border-red-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-gray-900">Delete Account</h3>
            <p className="text-gray-500 text-xs font-light">This cannot be undone.</p>
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          To confirm, please type your email address: <strong className="text-gray-900">{user?.email}</strong>
        </p>

        {deleteError && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{deleteError}</span>
          </div>
        )}

        <input
          type="email"
          value={deleteConfirmEmail}
          onChange={(e) => setDeleteConfirmEmail(e.target.value)}
          placeholder="Type your email to confirm"
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-red-400 transition-colors"
        />

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => setShowDeleteModal(false)}
            className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={deleting || deleteConfirmEmail !== user?.email}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {deleting ? 'Deleting...' : 'Permanently Delete'}
          </button>
        </div>
      </div>
    </div>
  )}

 </div>
 </div>
 );
}
