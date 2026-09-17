'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  BookOpen,
} from 'lucide-react';

interface UserPanelShellProps {
  children: React.ReactNode;
  activeTab?: 'dashboard' | 'saved-kundlis' | 'appointments' | 'orders' | 'my-batches' | 'profile';
  title?: string;
  subtitle?: string;
}

export function UserPanelShell({ children, activeTab, title, subtitle }: UserPanelShellProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
          Loading your customer portal...
        </p>
      </div>
    );
  }

  if (!user) return null;

  const navTabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'saved-kundlis',
      label: 'Saved Kundlis',
      href: '/saved-kundlis',
      icon: FileText,
    },
    {
      id: 'appointments',
      label: 'Consultations',
      href: '/appointments',
      icon: Calendar,
    },
    {
      id: 'my-batches',
      label: 'My Batches',
      href: '/my-batches',
      icon: BookOpen,
    },
  ];

  const currentTabId = activeTab || navTabs.find((t) => pathname.startsWith(t.href))?.id || 'dashboard';

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pb-20">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-b border-amber-500/20 shadow-md">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* User Profile Header Line */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-4">
              {/* Avatar Circle */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-serif font-bold text-2xl shadow-lg border-2 border-amber-300">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                {user.zodiacSign && (
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-slate-800 text-amber-300 text-[10px] font-mono font-bold rounded-md border border-amber-500/40">
                    {user.zodiacSign}
                  </span>
                )}
              </div>

              <div>
                {user.role === 'admin' && (
                  <div className="mb-1">
                    <Link
                      href="/admin/dashboard"
                      className="inline-block px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold rounded-full hover:bg-amber-500/30 transition-colors"
                    >
                      Admin Panel ↗
                    </Link>
                  </div>
                )}
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Namaste, {user.name}</span>
                </h1>
                <p className="text-slate-400 text-xs font-light">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Nav Tabs Horizontal Scroll Bar */}
          <div className="flex items-center gap-1 overflow-x-auto custom-scroll pb-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTabId === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400/80'}`} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {(title || subtitle) && (
          <div className="mb-6 border-b border-gray-200 pb-4">
            {title && <h2 className="font-serif text-2xl font-bold text-gray-900">{title}</h2>}
            {subtitle && <p className="text-gray-500 text-xs mt-1 font-light">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
