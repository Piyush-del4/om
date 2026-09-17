'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  ShoppingBag,
  GraduationCap,
  FileText,
  Bell,
  Users,
  TrendingUp,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/auth/AuthProvider';

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavGroup {
  groupLabel: string;
  items: NavItem[];
}

export function AdminSidebar({
  isMobileOpen,
  onMobileClose,
  isCollapsed,
  onToggleCollapse,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const navGroups: NavGroup[] = [
    {
      groupLabel: 'Main Operations',
      items: [
        { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Appointments & Slots', href: '/admin/appointments', icon: Calendar },
        { label: 'Shop & Orders', href: '/admin/shop', icon: ShoppingBag },
      ],
    },
    {
      groupLabel: 'Management',
      items: [
        { label: 'Batches & Courses', href: '/admin/batches', icon: GraduationCap },
        { label: 'Saved Kundlis', href: '/admin/saved-kundlis', icon: FileText },
        { label: 'Admin Kundlis', href: '/admin/admin-kundails', icon: FileText },
        { label: 'Team Members', href: '/admin/team', icon: Users },
      ],
    },
    {
      groupLabel: 'Marketing & Reports',
      items: [
        { label: 'Broadcast Alerts', href: '/admin/notifications', icon: Bell },
        { label: 'Revenue Analytics', href: '/admin/analytics', icon: TrendingUp },
      ],
    },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#0b1329] text-gray-300 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80 bg-[#0d1733]/50">
        <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-serif font-bold text-lg shadow-md shadow-amber-500/20 flex-shrink-0">
            OM
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-sm text-amber-200 tracking-wide truncate">
                OM Astrology
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                Admin Control
              </span>
            </div>
          )}
        </Link>

        {/* Mobile close / desktop collapse toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={onMobileClose}
            className="md:hidden flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scroll">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2 font-mono">
                {group.groupLabel}
              </h3>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onMobileClose}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-300 font-semibold border border-amber-500/30 shadow-sm shadow-amber-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                  {isActive && !isCollapsed && (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-auto shadow-sm shadow-amber-400" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Shortcut to public site */}
        <div className="pt-2 border-t border-slate-800/80">
          <Link
            href="/"
            onClick={onMobileClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-slate-400 hover:text-amber-300 hover:bg-slate-800/40 transition-colors ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
            title={isCollapsed ? 'View Public Website' : undefined}
          >
            <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {!isCollapsed && <span className="truncate">View Public Website</span>}
          </Link>
        </div>
      </div>

      {/* Admin User Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-[#0d1733]/50">
        <div
          className={`flex items-center gap-3 p-2 rounded-xl bg-slate-900/80 border border-slate-800 ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-xs flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@om.com'}</p>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-30 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          onClick={onMobileClose}
        >
          <div
            className="fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] shadow-2xl transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </>
  );
}
