'use client';

import React, { useState } from 'react';
import { useAuth } from '@/auth/AuthProvider';
import { client } from '@/lib/api/client';
import { UserPanelShell } from '@/components/user/UserPanelShell';
import { AddressForm, AddressFormValues } from '@/components/shop/AddressForm';
import {
  User as UserIcon,
  Lock,
  AlertCircle,
  CheckCircle,
  Trash2,
  MapPin,
  Sparkles,
  ShieldCheck,
  Calendar,
  Clock,
  Compass,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, refreshUser, logout } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<'coordinates' | 'address' | 'security' | 'danger'>('coordinates');

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');
  const [birthTime, setBirthTime] = useState(user?.birthTime || '');
  const [birthPlace, setBirthPlace] = useState(user?.birthPlace || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [zodiacSign, setZodiacSign] = useState(user?.zodiacSign || '');

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
        zodiacSign,
      });
      await refreshUser();
      setProfileMsg('Personal birth coordinates updated successfully.');
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
      setAddressMsg('Delivery & Billing address updated successfully.');
    } catch (err: any) {
      setAddressError(err.response?.data?.error?.message || 'Failed to update address');
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
    } catch (err: any) {
      setDeleteError(err.response?.data?.error?.message || 'Failed to delete account');
      setDeleting(false);
    }
  };

  return (
    <UserPanelShell
      activeTab="profile"
      title="Account Coordinates & Settings"
      subtitle="Manage your personal details, birth parameters, shipping destination, and account security."
    >
      <div className="space-y-6 max-w-4xl">
        {/* Profile Sub-navigation Pills */}
        <div className="flex gap-2 border-b border-gray-200 pb-3 overflow-x-auto custom-scroll">
          <button
            onClick={() => setActiveSubTab('coordinates')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'coordinates'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Birth Coordinates</span>
          </button>
          <button
            onClick={() => setActiveSubTab('address')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'address'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Delivery Address</span>
          </button>
          <button
            onClick={() => setActiveSubTab('security')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'security'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Security & Password</span>
          </button>
          <button
            onClick={() => setActiveSubTab('danger')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'danger'
                ? 'bg-red-500 text-white font-bold shadow-sm'
                : 'bg-white text-red-600 hover:bg-red-50 border border-red-200'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Danger Zone</span>
          </button>
        </div>

        {/* 1. Personal & Birth Coordinates Tab */}
        {activeSubTab === 'coordinates' && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-serif font-bold text-lg text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Personal & Birth Details</span>
              </h3>
              <span className="text-[11px] text-gray-400 font-mono">Auto-fills calculators</span>
            </div>

            {profileMsg && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 p-3.5 rounded-xl text-xs font-semibold">
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-600" />
                <span>{profileMsg}</span>
              </div>
            )}
            {profileError && (
              <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 p-3.5 rounded-xl text-xs font-semibold">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{profileError}</span>
              </div>
            )}

            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email (Account)</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Date of Birth</label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Time of Birth</label>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Place of Birth</label>
                  <input
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Rashi (Zodiac)</label>
                  <select
                    value={zodiacSign}
                    onChange={(e) => setZodiacSign(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
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

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  {saving ? 'Saving...' : 'Save Personal Details'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 2. Delivery Address Tab */}
        {activeSubTab === 'address' && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="pb-3 border-b border-gray-100">
              <h3 className="font-serif font-bold text-lg text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span>Saved Shipping Address</span>
              </h3>
              <p className="text-gray-500 text-xs mt-0.5">Used for shipping gemstones, yantras, and reports</p>
            </div>

            {addressMsg && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 p-3.5 rounded-xl text-xs font-semibold">
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-600" />
                <span>{addressMsg}</span>
              </div>
            )}
            {addressError && (
              <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 p-3.5 rounded-xl text-xs font-semibold">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{addressError}</span>
              </div>
            )}

            <AddressForm
              initialValues={user?.defaultAddress}
              onSubmit={handleAddressUpdate}
              isLoading={savingAddress}
              buttonText="Save Shipping Address"
            />
          </div>
        )}

        {/* 3. Security & Password Tab */}
        {activeSubTab === 'security' && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="pb-3 border-b border-gray-100">
              <h3 className="font-serif font-bold text-lg text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-600" />
                <span>Account Security</span>
              </h3>
              <p className="text-gray-500 text-xs mt-0.5">Update your account login password</p>
            </div>

            {passwordMsg && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 p-3.5 rounded-xl text-xs font-semibold">
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-600" />
                <span>{passwordMsg}</span>
              </div>
            )}
            {passwordError && (
              <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 p-3.5 rounded-xl text-xs font-semibold">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  {changingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 4. Danger Zone Tab */}
        {activeSubTab === 'danger' && (
          <div className="bg-red-50/50 p-6 rounded-3xl border border-red-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-red-700 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              <span>Delete Customer Account</span>
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed max-w-xl">
              Permanently remove your profile data, saved birth charts, consultation history, and enrolments. This operation is <strong>irreversible</strong>.
            </p>
            <button
              type="button"
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteError('');
                setDeleteConfirmEmail('');
              }}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete My Account
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 space-y-6 border border-red-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0 text-red-600">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">Delete Account</h3>
                <p className="text-gray-500 text-xs">Action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-700 text-xs leading-relaxed">
              To confirm account deletion, please type your registered email address: <strong className="text-gray-900">{user?.email}</strong>
            </p>

            {deleteError && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{deleteError}</span>
              </div>
            )}

            <input
              type="email"
              value={deleteConfirmEmail}
              onChange={(e) => setDeleteConfirmEmail(e.target.value)}
              placeholder="Type your email to confirm"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-xs focus:outline-none focus:border-red-500"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleting || deleteConfirmEmail !== user?.email}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl"
              >
                {deleting ? 'Deleting...' : 'Permanently Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </UserPanelShell>
  );
}
