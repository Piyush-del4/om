'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { LayoutDashboard, Users, Calendar, ShoppingBag, GraduationCap, ArrowRight, TrendingUp, FileText, Bell } from 'lucide-react';

export default function AdminDashboardPage() {
 const { user, isAuthenticated, isLoading } = useAuth();
 const router = useRouter();

 React.useEffect(() => {
 if (!isLoading) {
 if (!isAuthenticated) router.push('/login');
 else if (user?.role !== 'admin') router.push('/dashboard');
 }
 }, [user, isAuthenticated, isLoading, router]);

 // Fetch batches count
 const { data: batches } = useQuery({
 queryKey: ['admin-batches-count'],
 queryFn: async () => {
 const res = await client.get('/batches');
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin',
 });

 // Fetch appointments count
 const { data: appointments } = useQuery({
 queryKey: ['admin-appointments-count'],
 queryFn: async () => {
 const res = await client.get('/appointments');
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin',
 });

 // Fetch orders count
 const { data: orders } = useQuery({
 queryKey: ['admin-orders-count'],
 queryFn: async () => {
 const res = await client.get('/shop/orders/all');
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin',
 });

 // Fetch saved Kundlis count and list
 const { data: kundlis } = useQuery({
 queryKey: ['admin-kundlis-count'],
 queryFn: async () => {
 const res = await client.get('/astrology/submissions/admin/all');
 return res.data?.data || [];
 },
 enabled: isAuthenticated && user?.role === 'admin',
 });

 if (isLoading || !user || user.role !== 'admin') {
 return <div className="min-h-screen bg-white flex items-center justify-center text-gray-600">Verifying Admin Privileges...</div>;
 }

 // Calculate metrics
 const activeBatchesCount = batches?.filter((b: any) => !b.isDeleted).length || 0;
 const bookedAppointmentsCount = appointments?.length || 0;
 const ordersCount = orders?.length || 0;
 const totalRevenue = (orders?.reduce((sum: number, o: any) => o.paymentStatus === 'paid' ? sum + o.totalAmount : sum, 0) || 0) / 100;
 const kundlisCount = kundlis?.filter((k: any) => k.userId?._id === user?._id).length || 0;

 const quickNav = [
 { title: 'Broadcast Notifications', description: 'Send custom promotional offers, news & announcements to all users', path: '/admin/notifications', icon: Bell, color: 'text-purple-600' },
 { title: 'Revenue Analytics & Accounting', description: 'Financial income breakdowns, charts, and 1-click CSV accounting export', path: '/admin/analytics', icon: TrendingUp, color: 'text-amber-600' },
 { title: 'User Saved Kundlis', description: 'Access and review all Janam Kundlis generated across the platform', path: '/admin/saved-kundlis', icon: FileText, color: 'text-amber-600' },
 { title: 'Shop Inventory', description: 'Add, update or delete shop items', path: '/admin/shop', icon: ShoppingBag, color: 'text-emerald-600' },
 { title: 'Appointment Types', description: 'Configure booking consultation slots', path: '/admin/appointments', icon: Calendar, color: 'text-sky-600' },
 { title: 'Batches & Course Management', description: 'Organize study files and lectures', path: '/admin/batches', icon: GraduationCap, color: 'text-[var(--gold)]' },
 { title: 'Team Members', description: 'Edit consultant profiles, bios, photo & experience', path: '/admin/team', icon: Users, color: 'text-rose-400' },
 ];

 return (
 <div className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
 <div className="max-w-6xl mx-auto space-y-10">
 <div>
 <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
 <LayoutDashboard className="w-8 h-8 text-[var(--gold)]" /> Admin Workspace
 </h1>
 <p className="text-gray-600 text-sm mt-1">Hello, {user.name}. Here is an overview of the OM Astrology AMC portal status.</p>
 </div>

 {/* Metrics Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
 <GoldCard 
 className="border border-gray-200 p-5 flex items-center gap-4 cursor-pointer hover:border-amber-500/50 transition-colors"
 onClick={() => router.push('/admin/admin-kundails')}
 >
 <div className="p-3 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl">
 <FileText className="w-6 h-6" />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-600">Admin Kundli's</p>
 <h3 className="text-2xl font-serif font-bold text-gray-900 mt-1">{kundlisCount}</h3>
 </div>
 </GoldCard>

 <GoldCard className="border border-gray-200 p-5 flex items-center gap-4">
 <div className="p-3 bg-[var(--gold-10)] border border-[var(--gold-200)] text-[var(--gold)] rounded-xl">
 <GraduationCap className="w-6 h-6" />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-600">Active Batches</p>
 <h3 className="text-2xl font-serif font-bold text-gray-900 mt-1">{activeBatchesCount}</h3>
 </div>
 </GoldCard>

 <GoldCard className="border border-gray-200 p-5 flex items-center gap-4">
 <div className="p-3 bg-sky-50 border border-sky-200 text-sky-600 rounded-xl">
 <Calendar className="w-6 h-6" />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-600">Total Consultations</p>
 <h3 className="text-2xl font-serif font-bold text-gray-900 mt-1">{bookedAppointmentsCount}</h3>
 </div>
 </GoldCard>

 <GoldCard className="border border-gray-200 p-5 flex items-center gap-4">
 <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl">
 <ShoppingBag className="w-6 h-6" />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-600">Shop Orders</p>
 <h3 className="text-2xl font-serif font-bold text-gray-900 mt-1">{ordersCount}</h3>
 </div>
 </GoldCard>

 <GoldCard className="border border-gray-200 p-5 flex items-center gap-4">
 <div className="p-3 bg-pink-50 border border-pink-200 text-pink-600 rounded-xl">
 <TrendingUp className="w-6 h-6" />
 </div>
 <div>
 <p className="text-[10px] uppercase font-bold text-gray-600">Shop Revenue</p>
 <h3 className="text-2xl font-serif font-bold text-gray-900 mt-1">₹{totalRevenue.toLocaleString()}</h3>
 </div>
 </GoldCard>
 </div>


 {/* Administration Modules */}
 <div className="space-y-6">
 <h2 className="font-serif text-xl font-bold">Quick Administration Shortcuts</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {quickNav.map((item, idx) => (
 <div
 key={idx}
 onClick={() => router.push(item.path)}
 className="group cursor-pointer p-6 rounded-2xl bg-gray-100/30 border border-gray-200 hover:border-[var(--gold)] transition-all flex flex-col justify-between"
 >
 <div>
 <div className={`p-2.5 rounded-lg bg-white/60 border border-gray-200 inline-block mb-4 ${item.color}`}>
 <item.icon className="w-5 h-5" />
 </div>
 <h3 className="font-bold text-sm text-gray-900 group-hover:text-[var(--gold)] transition-colors">{item.title}</h3>
 <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{item.description}</p>
 </div>
 <div className="flex items-center gap-1.5 text-[var(--gold)] text-xs font-semibold mt-6 group-hover:translate-x-1 transition-transform">
 Manage Panel <ArrowRight className="w-3.5 h-3.5" />
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 );
}
