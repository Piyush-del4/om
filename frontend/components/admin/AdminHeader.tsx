'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  ShieldCheck,
  X,
  Globe,
  ExternalLink,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  Calendar,
  GraduationCap,
  FileText,
  Home,
} from 'lucide-react';
import { useAuth } from '@/auth/AuthProvider';

interface AdminHeaderProps {
  onMobileOpen: () => void;
}

export function AdminHeader({ onMobileOpen }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isPublicMenuOpen, setIsPublicMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close public site menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsPublicMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format pathname into breadcrumbs
  const pathSegments = pathname
    .split('/')
    .filter(Boolean)
    .map((seg) => ({
      name: seg.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      href: '/' + pathname.split('/').slice(1, pathname.split('/').indexOf(seg) + 1).join('/'),
    }));

  const currentPageTitle = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1].name : 'Admin Workspace';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    setIsMobileSearchOpen(false);

    if (query.includes('shop') || query.includes('order') || query.includes('product')) {
      router.push('/admin/shop');
    } else if (query.includes('appointment') || query.includes('booking') || query.includes('slot')) {
      router.push('/admin/appointments');
    } else if (query.includes('batch') || query.includes('course') || query.includes('lecture')) {
      router.push('/admin/batches');
    } else if (query.includes('kundli')) {
      router.push('/admin/saved-kundlis');
    } else if (query.includes('team') || query.includes('user') || query.includes('member')) {
      router.push('/admin/team');
    } else if (query.includes('analytic') || query.includes('revenue') || query.includes('report')) {
      router.push('/admin/analytics');
    } else {
      router.push('/admin/dashboard');
    }
  };

  const publicLinks = [
    { label: 'Website Homepage', href: '/', icon: Home },
    { label: 'Astrology Services', href: '/astrology', icon: Sparkles },
    { label: 'Numerology Guidance', href: '/numerology', icon: FileText },
    { label: 'Tarot Card Readings', href: '/tarot-card', icon: Sparkles },
    { label: 'Free Tools Hub', href: '/free-tools', icon: FileText },
    { label: 'Public Shop Store', href: '/shop', icon: ShoppingBag },
    { label: 'Book Consultation', href: '/appointments', icon: Calendar },
    { label: 'Study Batches', href: '/my-batches', icon: GraduationCap },
  ];

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 transition-all">
      {/* Left: Mobile Menu Toggle & Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onMobileOpen}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation (Tablet & Desktop) */}
        <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 font-medium overflow-hidden">
          <Link href="/admin/dashboard" className="hover:text-amber-600 transition-colors flex items-center gap-1 flex-shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Admin</span>
          </Link>
          {pathSegments.map((seg, idx) => (
            <React.Fragment key={seg.href}>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              {idx === pathSegments.length - 1 ? (
                <span className="text-gray-900 font-semibold truncate max-w-[140px] md:max-w-[200px]">{seg.name}</span>
              ) : (
                <Link href={seg.href} className="hover:text-amber-600 transition-colors truncate max-w-[100px]">
                  {seg.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Mobile Page Title */}
        <h1 className="sm:hidden font-serif font-bold text-sm text-gray-900 truncate max-w-[130px]">
          {currentPageTitle}
        </h1>
      </div>

      {/* Center: Global Admin Search Bar (Desktop) */}
      <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, appointments, batches, kundlis..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-100/80 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
          />
        </div>
      </form>

      {/* Mobile Search Overlay Toggle */}
      {isMobileSearchOpen && (
        <form
          onSubmit={handleSearchSubmit}
          className="lg:hidden absolute inset-x-0 top-0 h-16 bg-white px-4 flex items-center gap-2 border-b border-gray-200 z-30 animate-fade-in"
        >
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search admin module..."
            autoFocus
            className="flex-1 text-xs bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-500"
          />
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-1.5 text-gray-500 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* Right Actions, Public Site Dropdown & Admin Profile Badge */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        {/* Public Website Navigation Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsPublicMenuOpen(!isPublicMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-amber-500/30 bg-amber-50/60 hover:bg-amber-100/80 text-amber-800 text-xs font-semibold transition-colors cursor-pointer"
            title="Public Website Menu Links"
          >
            <Globe className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="hidden md:inline">Public Site</span>
            <ChevronDown className={`w-3.5 h-3.5 text-amber-600 transition-transform ${isPublicMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isPublicMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200/90 py-2 z-50 space-y-1 animate-fade-in">
              <div className="px-3 py-1.5 border-b border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                  Public Navigation
                </span>
                <ExternalLink className="w-3 h-3 text-amber-600" />
              </div>
              <div className="max-h-64 overflow-y-auto custom-scroll py-1">
                {publicLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={idx}
                      href={link.href}
                      onClick={() => setIsPublicMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="truncate">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Search Icon Button */}
        <button
          type="button"
          onClick={() => setIsMobileSearchOpen(true)}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Broadcast Notifications Shortcut */}
        <Link
          href="/admin/notifications"
          className="relative p-2 rounded-xl text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
          title="Broadcast Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
        </Link>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold text-xs font-serif flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-gray-900 leading-none truncate max-w-[100px]">{user?.name || 'Admin'}</span>
            <span className="text-[9px] text-amber-600 font-semibold mt-0.5 leading-none uppercase tracking-wider">
              Super Admin
            </span>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors ml-0.5"
            title="Logout from Admin Workspace"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
