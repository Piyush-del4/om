'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { client } from '@/lib/api/client';
import { GoldButton } from '@/components/ui/GoldButton';
import { GoldCard } from '@/components/ui/GoldCard';
import { User, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { ProfileFormSkeleton } from '@/components/ui/Skeleton';

export default function ProfilePage() {
 const { user, isAuthenticated, isLoading, refreshUser, logout } = useAuth();
 const router = useRouter();

 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');
 const [profileMsg, setProfileMsg] = useState('');
 const [profileError, setProfileError] = useState('');
 const [saving, setSaving] = useState(false);

 const [currentPassword, setCurrentPassword] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [confirmNewPassword, setConfirmNewPassword] = useState('');
 const [passwordMsg, setPasswordMsg] = useState('');
 const [passwordError, setPasswordError] = useState('');
 const [changingPassword, setChangingPassword] = useState(false);



 React.useEffect(() => {
 if (!isLoading && !isAuthenticated) router.push('/login');
 if (user) {
 setName(user.name);
 setPhone(user.phone || '');
 }
 }, [user, isAuthenticated, isLoading, router]);

 const handleProfileUpdate = async (e: React.FormEvent) => {
 e.preventDefault();
 setSaving(true);
 setProfileMsg('');
 setProfileError('');
 try {
 await client.patch('/users/me', { name, phone });
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
 {profileMsg && <div className="flex items-center gap-2 text-green-400 bg-green-950/20 border border-green-900/30 p-3 rounded-lg text-xs font-light"><CheckCircle className="w-4 h-4" /><span>{profileMsg}</span></div>}
 {profileError && <div className="flex items-center gap-2 text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-lg text-xs font-light"><AlertCircle className="w-4 h-4" /><span>{profileError}</span></div>}
 
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
 {passwordMsg && <div className="flex items-center gap-2 text-green-400 bg-green-950/20 border border-green-900/30 p-3 rounded-lg text-xs font-light"><CheckCircle className="w-4 h-4" /><span>{passwordMsg}</span></div>}
 {passwordError && <div className="flex items-center gap-2 text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-lg text-xs font-light"><AlertCircle className="w-4 h-4" /><span>{passwordError}</span></div>}
 
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


 </div>
 </div>
 );
}
