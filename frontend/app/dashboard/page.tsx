'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '../../lib/api/client';
import { GoldCard } from '../../components/ui/GoldCard';
import { GoldButton } from '../../components/ui/GoldButton';
import { Calendar, Package, BookOpen, User as UserIcon, Clock, AlertCircle, Star, FileText } from 'lucide-react';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function UserDashboard() {
 const { user, isAuthenticated, isLoading } = useAuth();
 const router = useRouter();

 // Redirect if not authenticated
 React.useEffect(() => {
 if (!isLoading && !isAuthenticated) {
 router.push('/login');
 }
 }, [isAuthenticated, isLoading, router]);

 // Fetch upcoming appointments
 const { data: appointments } = useQuery({
 queryKey: ['my-appointments'],
 queryFn: async () => {
 const res = await client.get('/appointments/me');
 return res.data?.data || [];
 },
 enabled: isAuthenticated,
 });

 // Fetch recent orders
 const { data: orders } = useQuery({
 queryKey: ['my-orders'],
 queryFn: async () => {
 const res = await client.get('/shop/orders/me'); // Wait, let's check backend orders endpoint path
 return res.data?.data || [];
 },
 enabled: isAuthenticated,
 });

 // Fetch my batches
 const { data: enrolments } = useQuery({
 queryKey: ['my-enrolments'],
 queryFn: async () => {
 const res = await client.get('/batches/me/enrolments'); // Wait, let's look at the backend batch router for enrolments path
 return res.data?.data || [];
 },
 enabled: isAuthenticated,
 });

 if (isLoading) {
 return (
 <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center">
 <LoadingSpinner size="lg" />
 <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
 Loading your dashboard...
 </p>
 </div>
 );
 }

 if (!user) return null;

 const quickTiles = [
 { name: 'Premium Kundli', icon: <Star className="w-6 h-6 text-[var(--gold)]" />, desc: 'Generate your personalized Janam Kundli report', path: '/premium-personalized-kundli', highlight: true },
 { name: 'Saved Kundlis', icon: <FileText className="w-6 h-6 text-[var(--gold)]" />, desc: 'View and access your saved Janam Kundli reports', path: '/saved-kundlis' },
 { name: 'My Appointments', icon: <Calendar className="w-6 h-6 text-[var(--gold)]" />, desc: 'Consultation dates & calendar coordinates', path: '/appointments' },
 { name: 'My Orders', icon: <Package className="w-6 h-6 text-[var(--gold)]" />, desc: 'Shop item shipping updates & receipt tags', path: '/orders' },
 { name: 'My Batches', icon: <BookOpen className="w-6 h-6 text-[var(--gold)]" />, desc: 'Course lectures & notes', path: '/my-batches' },
 { name: 'Edit Profile', icon: <UserIcon className="w-6 h-6 text-[var(--gold)]" />, desc: 'Identity password modifications & accounts details', path: '/profile' },
 ];

 return (
 <div className="relative radial-mesh-bg min-h-screen bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
 <div className="max-w-7xl mx-auto space-y-12 relative z-10">
 {/* Welcome Banner */}
 <div className="border-b border-[var(--gold-200)] pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
 <div className="space-y-2">
 <span className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold font-mono block">
 Dashboard Console
 </span>
 <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
 Namaste, <span className="gold-gradient-text">{user.name}</span>
 </h1>
 <p className="text-gray-600 text-sm font-light">Welcome to your personalized dashboard.</p>
 </div>
 <Link href="/#book">
 <GoldButton variant="filled" className="flex items-center gap-2">
 <Calendar className="w-4 h-4 text-black" />
 <span>Book Consultation</span>
 </GoldButton>
 </Link>
 </div>

 {/* Quick Access Tiles */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
 {quickTiles.map((tile) => (
 <Link key={tile.name} href={tile.path} className="group block h-full">
 <GoldCard className={`h-full transition-spring ${'highlight' in tile && tile.highlight ? 'border-[var(--gold)] bg-gradient-to-br from-[var(--gold-50)] to-black' : ''}`}>
 <div className="space-y-4">
 <div className="inline-flex p-3 bg-[var(--gold-50)] rounded-xl border border-[var(--gold-200)] text-[var(--gold)] transition-spring group-hover:scale-110">
 {tile.icon}
 </div>
 <div>
 <h3 className="font-serif text-lg font-bold text-gray-900 mb-1 group-hover:text-[var(--gold)] transition-colors">{tile.name}</h3>
 <p className="text-gray-600 text-xs leading-relaxed font-light">{tile.desc}</p>
 </div>
 </div>
 </GoldCard>
 </Link>
 ))}
 </div>

 {/* Widgets Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 {/* Upcoming Consultations */}
 <GoldCard className="transition-spring">
 <div className="space-y-4">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2.5 pb-2 border-b border-gray-200/60">
 <Calendar className="w-5 h-5 text-[var(--gold)]" />
 <span>Upcoming Consultations</span>
 </h3>
 <div className="space-y-3">
 {appointments && appointments.length > 0 ? (
 appointments.slice(0, 3).map((app: any) => {
 const dateObj = new Date(app.scheduledAt);
 return (
 <div key={app._id} className="bg-gray-100/40 border border-gray-200/60 rounded-xl p-4 flex justify-between items-center text-sm transition-spring hover:border-[var(--gold-300)]">
 <div className="space-y-1">
 <p className="font-bold text-gray-900 text-sm">{app.typeName}</p>
 <p className="text-gray-600 text-xs flex items-center gap-1.5 font-light">
 <Clock className="w-3.5 h-3.5 text-[var(--gold)]" />
 <span>{dateObj.toLocaleDateString()} at {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
 </p>
 </div>
 <span className={`text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full border ${
 app.status === 'confirmed' ? 'bg-green-950/20 text-green-400 border-green-500/20' : 'bg-yellow-950/20 text-yellow-400 border-yellow-500/20'
 }`}>
 {app.status}
 </span>
 </div>
 );
 })
 ) : (
 <div className="text-center py-8 text-gray-500 text-xs font-light">
 No upcoming consultations scheduled.
 </div>
 )}
 </div>
 </div>
 </GoldCard>

 {/* Enrolled course summaries */}
 <GoldCard className="transition-spring">
 <div className="space-y-4">
 <h3 className="font-serif text-xl font-bold text-[var(--gold)] flex items-center gap-2.5 pb-2 border-b border-gray-200/60">
 <BookOpen className="w-5 h-5 text-[var(--gold)]" />
 <span>Course Progress</span>
 </h3>
 <div className="space-y-4">
 {enrolments && enrolments.length > 0 ? (
 enrolments.map((enr: any) => (
 <div key={enr._id} className="space-y-2.5 p-4 bg-gray-100/40 border border-gray-200/60 rounded-xl transition-spring hover:border-[var(--gold-300)]">
 <div className="flex justify-between items-center text-xs">
 <span className="font-bold text-gray-900 text-sm">{enr.batchId?.title}</span>
 <span className="text-[var(--gold)] font-medium font-mono">
 {enr.watchedLectures?.length || 0} watched
 </span>
 </div>
 {/* Progress slider bar */}
 <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden border border-gray-200">
 <div
 className="bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] h-full transition-all duration-500"
 style={{
 width: `${
 enr.batchId?.totalLectures > 0
 ? ((enr.watchedLectures?.length || 0) / enr.batchId.totalLectures) * 100
 : 0
 }%`,
 }}
 ></div>
 </div>
 </div>
 ))
 ) : (
 <div className="text-center py-8 text-gray-500 text-xs font-light">
 You are not enrolled in any educational batches.
 </div>
 )}
 </div>
 </div>
 </GoldCard>
 </div>
 </div>
 </div>
 );
}
