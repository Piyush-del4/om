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
      <div className="min-h-screen bg-[#F7F3EA] text-[#1D1C1A] flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-[#77736D] font-mono tracking-widest uppercase animate-pulse mt-4">
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
    <div className="min-h-screen bg-[#F7F3EA] text-[#1D1C1A] pb-20">
      {/* Top Banner Card */}
      <div className="bg-[#1D1C1A] text-white pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-b border-[#3A3732] shadow-sm">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* User Profile Header Line */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-[#3A3732]">
            <div className="flex items-center gap-4">
              {/* Avatar Circle */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[#6F2935] flex items-center justify-center text-white font-serif font-bold text-2xl shadow-sm border border-[#A78652]/40">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                {user.zodiacSign && (
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-[#2A2825] text-[#A78652] text-[10px] font-mono font-bold rounded-md border border-[#A78652]/40">
                    {user.zodiacSign}
                  </span>
                )}
              </div>

              <div>
                {user.role === 'admin' && (
                  <div className="mb-1">
                    <Link
                      href="/admin/dashboard"
                      className="inline-block px-2.5 py-0.5 bg-[#6F2935]/60 border border-[#6F2935] text-white text-[10px] font-bold rounded-full hover:bg-[#6F2935] transition-colors"
                    >
                      Admin Panel ↗
                    </Link>
                  </div>
                )}
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Namaste, {user.name}</span>
                </h1>
                <p className="text-[#A09C96] text-xs font-light">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Nav Tabs Horizontal Scroll Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scroll pb-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTabId === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#6F2935] text-white shadow-sm font-bold border border-[#A78652]/40'
                      : 'text-[#DED2BE] hover:text-white hover:bg-[#3A3732]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#A78652]'}`} />
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
          <div className="mb-6 border-b border-[#E7E0D4] pb-4">
            {title && <h2 className="font-serif text-2xl font-bold text-[#1D1C1A]">{title}</h2>}
            {subtitle && <p className="text-[#77736D] text-xs mt-1 font-light">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
