'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../auth/AuthProvider';
import { Menu, X, ShoppingCart, User, LogOut, Shield, Sun, Moon, ChevronDown, Sparkles, Hash, Layers, PenTool, Calendar, ArrowRight, LayoutDashboard, Settings, Package, BookOpen, Star, Heart, Compass, Eye, CheckCircle2, Activity, Palette } from 'lucide-react';
import { GoldButton } from '../ui/GoldButton';
import { useQuery } from '@tanstack/react-query';
import { client } from '../../lib/api/client';
import { NotificationBellContainer } from './NotificationBellContainer';
import { NotificationToastBanner } from './NotificationToastBanner';

export function Navbar() {
 const pathname = usePathname();
 const { user, isAuthenticated, isAdmin, logout } = useAuth();
 const [isOpen, setIsOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isHoroscopeHovered, setIsHoroscopeHovered] = useState(false);
  const [isMobileHoroscopeOpen, setIsMobileHoroscopeOpen] = useState(false);
  const [isFreeToolsHovered, setIsFreeToolsHovered] = useState(false);
  const [isMobileFreeToolsOpen, setIsMobileFreeToolsOpen] = useState(false);
 const [isProfileOpen, setIsProfileOpen] = useState(false);
 const profileRef = useRef<HTMLDivElement>(null);

 // Close profile dropdown on outside click
 useEffect(() => {
 function handleClickOutside(e: MouseEvent) {
 if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
 setIsProfileOpen(false);
 }
 }
 document.addEventListener('mousedown', handleClickOutside);
 return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const services = [
 {
 name: 'Astrology',
 description: 'Explore birth charts, planetary transits, and custom horoscope alignments.',
 href: '/astrology',
 icon: Sparkles,
 },
 {
 name: 'Numerology',
 description: 'Unlock numbers of your life path, destiny, and personality.',
 href: '/numerology',
 icon: Hash,
 },
 {
 name: 'Tarot Card',
 description: 'Gain deep guidance, wisdom, and clarity from custom tarot spreads.',
 href: '/tarot-card',
 icon: Layers,
 },
 {
 name: 'Graphology',
 description: 'Understand personality traits and hidden habits through handwriting analysis.',
 href: '/graphology',
 icon: PenTool,
 },
 ];

  const horoscopes = [
    { name: 'Daily Horoscope', href: '/horoscope/daily/aries', icon: Sun },
    { name: 'Weekly Horoscope', href: '/horoscope/weekly/aries', icon: Calendar },
    { name: 'Monthly Horoscope', href: '/horoscope/monthly/aries', icon: Moon },
    { name: 'Half Yearly Horoscope 2026', href: '/horoscope/yearly/aries', icon: Eye }
  ];

 const freeTools = [
 { name: 'Premium Ebook', description: 'Read our exclusive Kundli guide.', href: '/fean-ebook', icon: BookOpen },
 { name: 'Numerology', description: 'Calculate life path and destiny.', href: '/free-tools/numerology-calculator', icon: Hash },
 { name: 'Lucky Number', description: 'Find your daily lucky digits.', href: '/free-tools/lucky-number-calculator', icon: Star },
 { name: 'Name Numerology', description: 'Check spelling vibrations.', href: '/free-tools/name-numerology-calculator', icon: PenTool },
 { name: 'Marriage Match', description: 'Check Ashtakoot Guna milan.', href: '/free-tools/marriage-compatibility-checker', icon: Heart },
 { name: 'Zodiac Finder', description: 'Find Sun & Moon signs.', href: '/free-tools/zodiac-sign-finder', icon: Compass },
 { name: 'Moon Sign', description: 'Find your emotional core.', href: '/free-tools/moon-sign-calculator', icon: Moon },
 { name: 'Ascendant', description: 'Calculate rising sign (Lagna).', href: '/free-tools/ascendant-calculator', icon: Sun },
 { name: 'Nakshatra', description: 'Find your birth star.', href: '/free-tools/nakshatra-finder', icon: Eye },
 { name: 'Panchang', description: 'Daily Hindu calendar.', href: '/free-tools/panchang', icon: Calendar },
 { name: 'Daily Horoscope', description: 'Read daily predictions.', href: '/free-tools/daily-horoscope', icon: BookOpen },
 { name: 'Muhurat', description: 'Find auspicious timings.', href: '/free-tools/muhurat-calculator', icon: CheckCircle2 },
 { name: 'Dasha Calc', description: 'Track planetary periods.', href: '/free-tools/dasha-calculator', icon: Activity },
 { name: 'Lucky Color', description: 'Find colors for success.', href: '/free-tools/lucky-color-calculator', icon: Palette },
 ];


 // Fetch cart data to display dynamic badge count
 const { data: cartData } = useQuery({
 queryKey: ['cart'],
 queryFn: async () => {
 const res = await client.get('/shop/cart');
 return res.data?.data || null;
 },
 enabled: isAuthenticated && !isAdmin,
 refetchInterval: 30000, // Poll every 30 seconds
 });

 const cartCount = cartData?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

  const navLinks = isAuthenticated
  ? [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Services', path: '#', isMega: true, megaType: 'services' },
  { name: 'Horoscope', path: '#', isMega: true, megaType: 'horoscope' },
  { name: 'Free Tools', path: '#', isMega: true, megaType: 'freeTools' },
  { name: 'Appointment', path: '/appointments' },
  { name: 'Shop', path: '/shop' },
  { name: 'Batch', path: '/my-batches/join' },
  ]
  : [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '#', isMega: true, megaType: 'services' },
  { name: 'Horoscope', path: '#', isMega: true, megaType: 'horoscope' },
  { name: 'Free Tools', path: '#', isMega: true, megaType: 'freeTools' },
  { name: 'Appointment', path: '/appointments' },
  { name: 'Shop', path: '/shop' },
 ];

 const toggleMenu = () => setIsOpen(!isOpen);

  return (
  <>
  <NotificationToastBanner />
  <nav className="sticky top-0 z-50 bg-white/75 backdrop-blur-md border-b border-[var(--gold-200)] text-gray-900 overflow-visible print:hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between h-16">
 {/* Logo */}
 <div className="flex-shrink-0">
 <Link href="/" className="flex items-center gap-2.5 group">
 <img src="/images/logo.png" alt="OM Astrology AMC Logo" className="w-8 h-8 object-contain border border-[var(--gold-200)] rounded-full bg-white/60 shadow-md p-0.5" />
 <span className="font-serif text-lg font-bold tracking-wider text-[var(--gold)] group-hover:text-[var(--gold-light)] transition-colors hidden sm:inline-block">
 OM Astrology AMC
 </span>
 </Link>
 </div>

 {/* Desktop Nav Links */}
 <div className="hidden md:flex items-center space-x-4 lg:space-x-8 h-full">
 {navLinks.map((link) => {
  if (link.isMega) {
  const isServices = link.megaType === 'services';
  const isHoroscope = link.megaType === 'horoscope';
  const isHovered = isServices ? isServicesHovered : (isHoroscope ? isHoroscopeHovered : isFreeToolsHovered);
  const setHovered = isServices ? setIsServicesHovered : (isHoroscope ? setIsHoroscopeHovered : setIsFreeToolsHovered);
 
 return (
 <div
 key={link.name}
 className="relative flex items-center h-full"
 onMouseEnter={() => setHovered(true)}
 onMouseLeave={() => setHovered(false)}
 >
 <button
 className={`flex items-center gap-1 py-1 text-sm font-medium transition-colors duration-300 hover:text-[var(--gold)] cursor-pointer ${
 isHovered ? 'text-[var(--gold)]' : 'text-gray-600'
 }`}
 >
 <span>{link.name}</span>
 <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'rotate-180 text-[var(--gold)]' : 'text-gray-600 group-hover:text-[var(--gold)]'}`} />
 </button>
 </div>
 );
 }
 const isActive = pathname === link.path;
 return (
 <Link
 key={link.name}
 href={link.path}
 className={`relative py-1 text-sm font-medium transition-colors duration-300 hover:text-[var(--gold)] group ${
 isActive ? 'text-[var(--gold)] font-semibold' : 'text-gray-600'
 }`}
 >
 {link.name}
 <span
 className={`absolute bottom-0 left-0 h-0.5 bg-[var(--gold)] transition-transform duration-300 origin-left ${
 isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
 }`}
 />
 </Link>
 );
 })}
 </div>

 {/* Desktop Auth Controls */}
 <div className="hidden md:flex items-center space-x-3">

 {isAuthenticated ? (
 <div className="flex items-center gap-2">
 {/* Notification Bell Center */}
 <NotificationBellContainer />

 {/* Cart icon for non-admin */}
 {!isAdmin && (
 <Link href="/shop/cart" className="relative p-2 inline-flex text-gray-600 hover:text-[var(--gold)] transition-colors">
 <ShoppingCart className="w-5 h-5" />
 {cartCount > 0 && (
 <span className="absolute -top-1 -right-1 bg-[var(--gold)] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
 {cartCount}
 </span>
 )}
 </Link>
 )}

 {/* Profile Avatar Button + Dropdown */}
 <div className="relative" ref={profileRef}>
 <button
 onClick={() => setIsProfileOpen(!isProfileOpen)}
 className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
 isProfileOpen
 ? 'border-[var(--gold)] text-[var(--gold)] bg-[var(--gold-50)]'
 : 'border-[var(--gold-200)] text-gray-600 hover:border-[var(--gold)] hover:text-[var(--gold)]'
 }`}
 >
 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--gold-dark)] to-[var(--gold)] flex items-center justify-center">
 <User className="w-3.5 h-3.5 text-black" />
 </div>
 <span className="text-sm font-medium max-w-[80px] truncate">{user?.name?.split(' ')[0] || 'Account'}</span>
 <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
 </button>

 {/* Profile Dropdown Panel */}
 <div
 className={`absolute right-0 mt-2 w-56 rounded-2xl border border-[var(--gold-200)] bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden transition-all duration-200 z-50 ${
 isProfileOpen
 ? 'opacity-100 translate-y-0 pointer-events-auto'
 : 'opacity-0 -translate-y-2 pointer-events-none'
 }`}
 >
 {/* User Info Header */}
 <div className="px-4 py-3 border-b border-[var(--gold-100)] bg-[var(--gold-50)]">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--gold-dark)] to-[var(--gold)] flex items-center justify-center flex-shrink-0">
 <User className="w-4 h-4 text-black" />
 </div>
 <div className="min-w-0">
 <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
 <p className="text-[11px] text-gray-600 truncate">{user?.email || ''}</p>
 </div>
 </div>
 {isAdmin && (
 <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] bg-[var(--gold-100)] px-2 py-0.5 rounded">
 <Shield className="w-3 h-3" /> Admin
 </span>
 )}
 </div>

 {/* Navigation Links */}
 <div className="py-2">
 {isAdmin ? (
 <Link
 href="/admin/dashboard"
 onClick={() => setIsProfileOpen(false)}
 className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-[var(--gold)] hover:bg-[var(--gold-50)] transition-colors"
 >
 <Shield className="w-4 h-4" />
 <span>Admin Dashboard</span>
 </Link>
 ) : (
 <>
 <Link
 href="/dashboard"
 onClick={() => setIsProfileOpen(false)}
 className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-[var(--gold)] hover:bg-[var(--gold-50)] transition-colors"
 >
 <LayoutDashboard className="w-4 h-4" />
 <span>Dashboard</span>
 </Link>
 <Link
 href="/orders"
 onClick={() => setIsProfileOpen(false)}
 className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-[var(--gold)] hover:bg-[var(--gold-50)] transition-colors"
 >
 <Package className="w-4 h-4" />
 <span>My Orders</span>
 </Link>
 <Link
 href="/my-batches/join"
 onClick={() => setIsProfileOpen(false)}
 className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-[var(--gold)] hover:bg-[var(--gold-50)] transition-colors"
 >
 <BookOpen className="w-4 h-4" />
 <span>My Batches</span>
 </Link>
 <Link
 href="/profile"
 onClick={() => setIsProfileOpen(false)}
 className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-[var(--gold)] hover:bg-[var(--gold-50)] transition-colors"
 >
 <Settings className="w-4 h-4" />
 <span>Profile Settings</span>
 </Link>
 </>
 )}
 </div>

 {/* Logout */}
 <div className="px-3 pb-3 pt-1 border-t border-[var(--gold-100)]">
 <button
 onClick={() => { setIsProfileOpen(false); logout(); }}
 className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-50 transition-colors cursor-pointer"
 >
 <LogOut className="w-4 h-4" />
 <span>Sign Out</span>
 </button>
 </div>
 </div>
 </div>
 </div>
 ) : (
 <div className="flex items-center space-x-2">
 <Link href="/login">
 <GoldButton variant="filled">Get Started</GoldButton>
 </Link>
 </div>
 )}
 </div>

  {/* Mobile menu button & Notification bell */}
  <div className="md:hidden flex items-center gap-1 sm:gap-2">
    {isAuthenticated && <NotificationBellContainer />}
    <button
      onClick={toggleMenu}
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
    >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  </div>
  </div>
  </div>

  {/* Mobile Menu Drawer */}
  {isOpen && (
  <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-[var(--gold-100)]">
  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
  {navLinks.map((link) => {
   if (link.isMega) {
   const isServices = link.megaType === 'services';
   const isHoroscope = link.megaType === 'horoscope';
   const isMobileOpen = isServices ? isMobileServicesOpen : (isHoroscope ? isMobileHoroscopeOpen : isMobileFreeToolsOpen);
   const toggleMobileOpen = () => {
   if (isServices) setIsMobileServicesOpen(!isMobileServicesOpen);
   else if (isHoroscope) setIsMobileHoroscopeOpen(!isMobileHoroscopeOpen);
   else setIsMobileFreeToolsOpen(!isMobileFreeToolsOpen);
   };
   const itemsList = isServices ? services : (isHoroscope ? horoscopes : freeTools);

  return (
  <div key={link.name} className="block">
  <button
  onClick={toggleMobileOpen}
  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[var(--gold)] hover:bg-gray-50 cursor-pointer"
  >
  <span>{link.name}</span>
  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileOpen ? 'rotate-180 text-[var(--gold)]' : 'text-gray-600'}`} />
  </button>
  
  <div className={`overflow-hidden transition-all duration-300 ${isMobileOpen ? 'max-h-[800px] overflow-y-auto opacity-100 py-1' : 'max-h-0 opacity-0'}`}>
  <div className="pl-6 pr-2 space-y-1">
  {itemsList.map((item) => {
  const IconComponent = item.icon;
  const isActiveItem = pathname === item.href;
  return (
  <Link
  key={item.name}
  href={item.href}
  onClick={() => {
  setIsOpen(false);
  if (isServices) setIsMobileServicesOpen(false);
  else if (isHoroscope) setIsMobileHoroscopeOpen(false);
  else setIsMobileFreeToolsOpen(false);
  }}
  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
  isActiveItem
  ? 'text-[var(--gold)] bg-gray-50/50'
  : 'text-gray-600 hover:text-[var(--gold)] hover:bg-gray-50/30'
  }`}
  >
  <IconComponent className="w-4 h-4 text-[var(--gold)]" />
  <span>{item.name}</span>
  </Link>
  );
  })}
  </div>
  </div>
  </div>
  );
  }
  const isActive = pathname === link.path;
  return (
  <Link
  key={link.name}
  href={link.path}
  onClick={() => setIsOpen(false)}
  className={`block px-3 py-2 rounded-md text-base font-medium ${
  isActive ? 'text-[var(--gold)] bg-gray-100' : 'text-gray-600 hover:text-[var(--gold)] hover:bg-gray-50'
  }`}
  >
  {link.name}
  </Link>
  );
  })}
  </div>
  <div className="pt-4 pb-4 border-t border-[var(--gold-100)] px-4 space-y-3">
  {isAuthenticated ? (
  <>
  {/* Mobile User Profile Header Card */}
  <div className="p-3 rounded-xl bg-[var(--gold-50)] border border-[var(--gold-200)] flex items-center gap-3">
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold-dark)] to-[var(--gold)] flex items-center justify-center flex-shrink-0 shadow-sm">
  <User className="w-5 h-5 text-black" />
  </div>
  <div className="min-w-0 flex-1">
  <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'User'}</p>
  <p className="text-xs text-gray-600 truncate">{user?.email || ''}</p>
  {isAdmin && (
  <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase text-[var(--gold)] bg-white px-2 py-0.5 rounded border border-[var(--gold-200)]">
  <Shield className="w-2.5 h-2.5" /> Admin
  </span>
  )}
  </div>
  </div>

  {/* Mobile Profile Navigation Links */}
  <div className="grid grid-cols-2 gap-2 pt-1">
  {isAdmin ? (
  <Link
  href="/admin/dashboard"
  onClick={() => setIsOpen(false)}
  className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-100 hover:text-[var(--gold)]"
  >
  <Shield className="w-4 h-4 text-[var(--gold)]" />
  <span>Admin Panel</span>
  </Link>
  ) : (
  <>
  <Link
  href="/profile"
  onClick={() => setIsOpen(false)}
  className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-100 hover:text-[var(--gold)]"
  >
  <Settings className="w-4 h-4 text-[var(--gold)]" />
  <span>Profile Settings</span>
  </Link>
  <Link
  href="/dashboard"
  onClick={() => setIsOpen(false)}
  className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-100 hover:text-[var(--gold)]"
  >
  <LayoutDashboard className="w-4 h-4 text-[var(--gold)]" />
  <span>Dashboard</span>
  </Link>
  <Link
  href="/orders"
  onClick={() => setIsOpen(false)}
  className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-100 hover:text-[var(--gold)]"
  >
  <Package className="w-4 h-4 text-[var(--gold)]" />
  <span>My Orders</span>
  </Link>
  <Link
  href="/my-batches/join"
  onClick={() => setIsOpen(false)}
  className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-100 hover:text-[var(--gold)]"
  >
  <BookOpen className="w-4 h-4 text-[var(--gold)]" />
  <span>My Batches</span>
  </Link>
  <Link
  href="/saved-kundlis"
  onClick={() => setIsOpen(false)}
  className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-100 hover:text-[var(--gold)]"
  >
  <Star className="w-4 h-4 text-[var(--gold)]" />
  <span>Saved Kundlis</span>
  </Link>
  <Link
  href="/shop/cart"
  onClick={() => setIsOpen(false)}
  className="flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-100 hover:text-[var(--gold)]"
  >
  <div className="flex items-center gap-2">
  <ShoppingCart className="w-4 h-4 text-[var(--gold)]" />
  <span>My Cart</span>
  </div>
  {cartCount > 0 && (
  <span className="bg-[var(--gold)] text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
  {cartCount}
  </span>
  )}
  </Link>
  </>
  )}
  </div>

  {/* Logout Button */}
  <button
  onClick={() => {
  setIsOpen(false);
  logout();
  }}
  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 mt-2 border border-red-200 text-xs font-bold rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
  >
  <LogOut className="w-4 h-4" />
  <span>Sign Out</span>
  </button>
  </>
  ) : (
  <div className="flex flex-col space-y-2">
  <Link href="/login" onClick={() => setIsOpen(false)}>
  <GoldButton variant="filled" className="w-full">Get Started</GoldButton>
  </Link>
  </div>
  )}
  </div>
  </div>
  )}

 {/* Services Mega Menu Dropdown */}
 <div
 onMouseEnter={() => setIsServicesHovered(true)}
 onMouseLeave={() => setIsServicesHovered(false)}
 className={`hidden md:block absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-[var(--gold-200)] shadow-2xl transition-all duration-300 z-40 ${
 isServicesHovered
 ? 'opacity-100 translate-y-0 pointer-events-auto visible'
 : 'opacity-0 -translate-y-2 pointer-events-none invisible'
 }`}
 >
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
 {/* Left Column: Grid of Services (spans 3 columns) */}
 <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
 {services.map((service) => {
 const IconComponent = service.icon;
 return (
 <Link
 key={service.name}
 href={service.href}
 onClick={() => setIsServicesHovered(false)}
 className="group/item flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 :bg-white/5 border border-transparent hover:border-[var(--gold-100)] transition-all duration-300"
 >
 <div className="p-3 rounded-lg bg-[var(--gold-50)] text-[var(--gold)] border border-[var(--gold-200)] group-hover/item:bg-[var(--gold)] group-hover/item:text-black transition-all duration-300">
 <IconComponent className="w-6 h-6" />
 </div>
 <div>
 <h4 className="font-serif text-base font-semibold text-gray-900 group-hover/item:text-[var(--gold)] transition-colors flex items-center gap-1.5" >
 {service.name}
 <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
 </h4>
 <p className="mt-1 text-xs text-gray-600 leading-relaxed">
 {service.description}
 </p>
 </div>
 </Link>
 );
 })}
 </div>

 {/* Right Column: Feanured CTA Card (spans 1 column) */}
 <div className="md:col-span-1">
 <div className="h-full flex flex-col justify-between p-6 rounded-2xl border border-[var(--gold-200)] bg-[var(--gold-50)]/30 relative overflow-hidden group/cta">
 {/* Subtle glow background */}
 <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--gold)]/10 rounded-full blur-2xl group-hover/cta:scale-150 transition-transform duration-700" />
 
 <div className="relative z-10">
 <span className="text-[10px] font-bold tracking-widest text-[var(--gold)] uppercase bg-[var(--gold-100)] px-2 py-1 rounded">
 Premium Guidance
 </span>
 <h4 className="font-serif text-lg font-bold mt-3 leading-snug" >
 Book One-on-One Session
 </h4>
 <p className="text-xs text-gray-600 mt-2 leading-relaxed">
 Connect directly with our master astrologer to resolve life struggles and align with your stars.
 </p>
 </div>
 
 <div className="mt-6 relative z-10">
 <Link href="/appointments" onClick={() => setIsServicesHovered(false)}>
 <GoldButton variant="outlined" className="w-full py-2 flex items-center justify-center gap-2 group-hover/cta:bg-[var(--gold)] group-hover/cta:text-black transition-all">
 <Calendar className="w-4 h-4" />
 <span>Schedule Now</span>
 </GoldButton>
 </Link>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

  {/* Horoscope Mega Menu Dropdown */}
  <div
  onMouseEnter={() => setIsHoroscopeHovered(true)}
  onMouseLeave={() => setIsHoroscopeHovered(false)}
  className={`hidden md:block absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-[var(--gold-200)] shadow-2xl transition-all duration-300 z-40 ${
  isHoroscopeHovered
  ? 'opacity-100 translate-y-0 pointer-events-auto visible'
  : 'opacity-0 -translate-y-2 pointer-events-none invisible'
  }`}
  >
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {horoscopes.map((item) => {
  const IconComponent = item.icon;
  return (
  <Link
  key={item.name}
  href={item.href}
  onClick={() => setIsHoroscopeHovered(false)}
  className="group/item flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-[var(--gold-100)] hover:border-[var(--gold)] transition-all duration-300 bg-white"
  >
  <div className="p-2 rounded-lg bg-[var(--gold-50)] text-[var(--gold)] border border-[var(--gold-200)] group-hover/item:bg-[var(--gold)] group-hover/item:text-black transition-all duration-300">
  <IconComponent className="w-5 h-5" />
  </div>
  <h4 className="font-serif text-sm font-semibold text-gray-900 group-hover/item:text-[var(--gold)] transition-colors" >
  {item.name}
  </h4>
  </Link>
  );
  })}
  </div>
  <div className="md:col-span-1">
  <div className="h-full flex flex-col justify-between p-6 rounded-2xl border border-[var(--gold-200)] bg-[var(--gold-50)]/30 relative overflow-hidden group/cta">
  <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--gold)]/10 rounded-full blur-2xl group-hover/cta:scale-150 transition-transform duration-700" />
  <div className="relative z-10">
  <span className="text-[10px] font-bold tracking-widest text-[var(--gold)] uppercase bg-[var(--gold-100)] px-2 py-1 rounded">Daily Updates</span>
  <h4 className="font-serif text-lg font-bold mt-3 leading-snug">Personalized Insights</h4>
  <p className="text-xs text-gray-600 mt-2 leading-relaxed">Check your personalized daily horoscope based on accurate Vedic transit calculations.</p>
  </div>
  <div className="mt-6 relative z-10">
  <Link href="/horoscope/daily/aries" onClick={() => setIsHoroscopeHovered(false)}>
  <GoldButton variant="filled" className="w-full py-2 flex items-center justify-center gap-2 group-hover/cta:bg-[var(--gold)] group-hover/cta:text-black transition-all">
  <Moon className="w-4 h-4 text-black" />
  <span className="text-black">Check Now</span>
  </GoldButton>
  </Link>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>

 {/* Free Tools Mega Menu Dropdown */}
 <div
 onMouseEnter={() => setIsFreeToolsHovered(true)}
 onMouseLeave={() => setIsFreeToolsHovered(false)}
 className={`hidden md:block absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-[var(--gold-200)] shadow-2xl transition-all duration-300 z-40 ${
 isFreeToolsHovered
 ? 'opacity-100 translate-y-0 pointer-events-auto visible'
 : 'opacity-0 -translate-y-2 pointer-events-none invisible'
 }`}
 >
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
 {/* Left Column: Grid of Tools (spans 3 columns) */}
 <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {freeTools.map((tool) => {
 const IconComponent = tool.icon;
 return (
 <Link
 key={tool.name}
 href={tool.href}
 onClick={() => setIsFreeToolsHovered(false)}
 className="group/item flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 :bg-white/5 border border-transparent hover:border-[var(--gold-100)] transition-all duration-300"
 >
 <div className="p-3 rounded-lg bg-[var(--gold-50)] text-[var(--gold)] border border-[var(--gold-200)] group-hover/item:bg-[var(--gold)] group-hover/item:text-black transition-all duration-300">
 <IconComponent className="w-5 h-5" />
 </div>
 <div>
 <h4 className="font-serif text-sm font-semibold text-gray-900 group-hover/item:text-[var(--gold)] transition-colors flex items-center gap-1.5" >
 {tool.name}
 </h4>
 <p className="mt-1 text-[10px] text-gray-600 leading-relaxed">
 {tool.description}
 </p>
 </div>
 </Link>
 );
 })}
 </div>

 {/* Right Column: Feanured CTA Card (spans 1 column) */}
 <div className="md:col-span-1">
 <div className="h-full flex flex-col justify-between p-6 rounded-2xl border border-[var(--gold-200)] bg-[var(--gold-50)]/30 relative overflow-hidden group/cta">
 <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--gold)]/10 rounded-full blur-2xl group-hover/cta:scale-150 transition-transform duration-700" />
 
 <div className="relative z-10">
 <span className="text-[10px] font-bold tracking-widest text-[var(--gold)] uppercase bg-[var(--gold-100)] px-2 py-1 rounded">
 Free Utilities
 </span>
 <h4 className="font-serif text-lg font-bold mt-3 leading-snug" >
 Unlimited Calculations
 </h4>
 <p className="text-xs text-gray-600 mt-2 leading-relaxed">
 Use our premium free tools to generate Kundlis, check lucky numbers, and match making.
 </p>
 </div>
 
 <div className="mt-6 relative z-10">
 <Link href="/appointments" onClick={() => setIsFreeToolsHovered(false)}>
 <GoldButton variant="filled" className="w-full py-2 flex items-center justify-center gap-2 group-hover/cta:bg-[var(--gold)] group-hover/cta:text-black transition-all">
 <Sparkles className="w-4 h-4 text-black" />
 <span className="text-black">Consult Expert</span>
 </GoldButton>
 </Link>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </nav>
 </>
 );
}
