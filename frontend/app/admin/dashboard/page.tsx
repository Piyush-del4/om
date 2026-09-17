'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import {
  Users,
  Calendar,
  ShoppingBag,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  FileText,
  Bell,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Fetch batches count
  const { data: batches } = useQuery({
    queryKey: ['admin-batches-count'],
    queryFn: async () => {
      const res = await client.get('/batches');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Fetch appointments
  const { data: appointments } = useQuery({
    queryKey: ['admin-appointments-count'],
    queryFn: async () => {
      const res = await client.get('/appointments');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Fetch shop orders
  const { data: orders } = useQuery({
    queryKey: ['admin-orders-count'],
    queryFn: async () => {
      const res = await client.get('/shop/orders/all');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Fetch shop items for inventory alerts
  const { data: shopItems } = useQuery({
    queryKey: ['admin-shop-inventory'],
    queryFn: async () => {
      const res = await client.get('/shop');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Fetch saved Kundlis
  const { data: kundlis } = useQuery({
    queryKey: ['admin-kundlis-count'],
    queryFn: async () => {
      const res = await client.get('/astrology/submissions/admin/all');
      return res.data?.data || [];
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Calculate metrics
  const activeBatchesCount = batches?.filter((b: any) => !b.isDeleted).length || 0;
  const bookedAppointmentsCount = appointments?.length || 0;
  const pendingAppointments = appointments?.filter((a: any) => a.status === 'pending') || [];
  const ordersCount = orders?.length || 0;
  const pendingOrders = orders?.filter((o: any) => o.status === 'pending') || [];
  const paidOrders = orders?.filter((o: any) => ['paid', 'shipped', 'delivered'].includes(o.status)) || [];
  const totalRevenue = paidOrders.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0) / 100;
  const kundlisCount = kundlis?.length || 0;
  const outOfStockItems = shopItems?.filter((i: any) => !i.isDeleted && (i.inStock === false || i.stockCount === 0)) || [];

  // Dynamic Greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const todayFormatted = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const quickNav = [
    {
      title: 'Broadcast Notifications',
      description: 'Send custom promotional offers & news alerts to users',
      path: '/admin/notifications',
      icon: Bell,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      title: 'Revenue Analytics',
      description: 'Financial income breakdowns & CSV accounting export',
      path: '/admin/analytics',
      icon: TrendingUp,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      title: 'Saved Janam Kundlis',
      description: 'Access & review Janam Kundli charts vault',
      path: '/admin/saved-kundlis',
      icon: FileText,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      title: 'Shop Inventory',
      description: 'Manage shop catalog & customer order fulfillment',
      path: '/admin/shop',
      icon: ShoppingBag,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Appointments & Slots',
      description: 'Configure booking consultation slots & block windows',
      path: '/admin/appointments',
      icon: Calendar,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      title: 'Batches & Courses',
      description: 'Organize study files, lectures, and course batches',
      path: '/admin/batches',
      icon: GraduationCap,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      title: 'Team Profiles',
      description: 'Edit consultant profiles, bios, photo & experience',
      path: '/admin/team',
      icon: Users,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in min-w-0">
      {/* Welcome Banner */}
      <div className="p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0d1733] via-[#111f44] to-[#1a2b5c] text-white shadow-lg relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-6">
          <div className="space-y-1.5 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-mono">
              <Sparkles className="w-3 h-3" /> Operations Dashboard
            </div>
            <h1 className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-white truncate">
              {greeting}, {user?.name || 'Admin'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Portal summary for <span className="text-amber-300 font-semibold">{todayFormatted}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 flex-wrap">
            <button
              onClick={async () => {
                try {
                  await client.post('/astrology/horoscope/generate');
                  alert('⚡ Daily Horoscope generation triggered in background!');
                } catch (e: any) {
                  alert('Failed to trigger horoscope generation: ' + (e.message || e));
                }
              }}
              className="px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Generate today's horoscopes for all 12 signs using AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Horoscopes AI
            </button>
            <button
              onClick={async () => {
                try {
                  await client.post('/blogs/generate');
                  alert('📝 AI Blog Article generation triggered in background!');
                } catch (e: any) {
                  alert('Failed to trigger blog generation: ' + (e.message || e));
                }
              }}
              className="px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Generate a new SEO blog article using AI"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" /> Blog AI
            </button>
            <button
              onClick={() => router.push('/admin/appointments')}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Manage Slots
            </button>
            <button
              onClick={() => router.push('/admin/shop')}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" /> Store Control
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid (2 columns on mobile, 3 on tablet, 5 on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div
          onClick={() => router.push('/admin/saved-kundlis')}
          className="p-3.5 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-500 font-mono truncate">
              Janam Kundlis
            </span>
            <div className="p-2 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex-shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">{kundlisCount}</h3>
            <p className="text-[10px] sm:text-[11px] text-amber-600 font-semibold mt-0.5 truncate">Vault Logs</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => router.push('/admin/batches')}
          className="p-3.5 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-indigo-400 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-500 font-mono truncate">
              Batches
            </span>
            <div className="p-2 rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-600 flex-shrink-0">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">{activeBatchesCount}</h3>
            <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 truncate">Active Courses</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => router.push('/admin/appointments')}
          className="p-3.5 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-sky-400 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-500 font-mono truncate">
              Consultations
            </span>
            <div className="p-2 rounded-lg sm:rounded-xl bg-sky-50 text-sky-600 flex-shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">{bookedAppointmentsCount}</h3>
            <p className="text-[10px] sm:text-[11px] text-amber-600 font-semibold mt-0.5 truncate">
              {pendingAppointments.length} Pending
            </p>
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => router.push('/admin/shop')}
          className="p-3.5 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-500 font-mono truncate">
              Shop Orders
            </span>
            <div className="p-2 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">{ordersCount}</h3>
            <p className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold mt-0.5 truncate">
              {pendingOrders.length} Unprocessed
            </p>
          </div>
        </div>

        {/* Metric 5 */}
        <div
          onClick={() => router.push('/admin/analytics')}
          className="col-span-2 sm:col-span-1 p-3.5 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-500 font-mono truncate">
              Revenue
            </span>
            <div className="p-2 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex-shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</h3>
            <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 truncate">Paid Orders</p>
          </div>
        </div>
      </div>

      {/* Action Required Banner */}
      {(pendingAppointments.length > 0 || pendingOrders.length > 0 || outOfStockItems.length > 0) && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-sm sm:text-base font-bold text-amber-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" /> Action Required ({pendingAppointments.length + pendingOrders.length + outOfStockItems.length} items)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pendingAppointments.length > 0 && (
              <div
                onClick={() => router.push('/admin/appointments')}
                className="p-3 rounded-xl bg-white border border-amber-200/80 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 flex-shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-gray-900 truncate">{pendingAppointments.length} Pending Consultations</h4>
                    <p className="text-[10px] text-gray-500 truncate">Needs confirmation</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600 flex-shrink-0 ml-1" />
              </div>
            )}

            {pendingOrders.length > 0 && (
              <div
                onClick={() => router.push('/admin/shop')}
                className="p-3 rounded-xl bg-white border border-amber-200/80 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 flex-shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-gray-900 truncate">{pendingOrders.length} Unprocessed Orders</h4>
                    <p className="text-[10px] text-gray-500 truncate">Needs fulfillment</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600 flex-shrink-0 ml-1" />
              </div>
            )}

            {outOfStockItems.length > 0 && (
              <div
                onClick={() => router.push('/admin/shop')}
                className="p-3 rounded-xl bg-white border border-amber-200/80 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-red-100 text-red-700 flex-shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-gray-900 truncate">{outOfStockItems.length} Low/Out-of-Stock</h4>
                    <p className="text-[10px] text-gray-500 truncate">Restock catalog</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600 flex-shrink-0 ml-1" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Split Stream: Recent Consultations & Recent Shop Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultations */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 truncate">
              <Calendar className="w-5 h-5 text-amber-600 flex-shrink-0" /> Recent Consultations
            </h2>
            <button
              onClick={() => router.push('/admin/appointments')}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 flex-shrink-0"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {appointments && appointments.length > 0 ? (
            <div className="space-y-3">
              {appointments.slice(0, 4).map((booking: any) => {
                const dateObj = new Date(booking.scheduledAt);
                return (
                  <div
                    key={booking._id}
                    className="p-3 sm:p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-between text-xs min-w-0"
                  >
                    <div className="space-y-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-900 truncate">{booking.typeName}</span>
                        <span
                          className={`text-[9px] font-bold uppercase py-0.5 px-2 rounded-full ${
                            booking.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : booking.status === 'cancelled'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-[11px] truncate">
                        {booking.userId?.name || 'Guest'} ({booking.userId?.email || 'N/A'})
                      </p>
                      <p className="text-gray-500 text-[10px] flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-amber-600 flex-shrink-0" />
                        {dateObj.toLocaleDateString()} at{' '}
                        {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-500 py-6 text-center">No recent consultations recorded.</p>
          )}
        </div>

        {/* Shop Orders */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 truncate">
              <ShoppingBag className="w-5 h-5 text-amber-600 flex-shrink-0" /> Recent Orders
            </h2>
            <button
              onClick={() => router.push('/admin/shop')}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 flex-shrink-0"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {orders && orders.length > 0 ? (
            <div className="space-y-3">
              {orders.slice(0, 4).map((order: any) => (
                <div
                  key={order._id}
                  className="p-3 sm:p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-between text-xs min-w-0"
                >
                  <div className="space-y-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-gray-900">
                        #{order._id.substring(order._id.length - 6).toUpperCase()}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase py-0.5 px-2 rounded-full ${
                          ['paid', 'shipped', 'delivered'].includes(order.status)
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-[11px] truncate">
                      Customer: {order.userId?.name || 'Customer'}
                    </p>
                    <p className="text-gray-500 text-[10px] font-mono">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="font-bold text-amber-600 text-xs sm:text-sm font-serif flex-shrink-0">
                    ₹{(order.totalAmount / 100).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 py-6 text-center">No shop orders recorded yet.</p>
          )}
        </div>
      </div>

      {/* Quick Administration Modules */}
      <div className="space-y-4">
        <h2 className="font-serif text-lg font-bold text-gray-900">Administration Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickNav.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => router.push(item.path)}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80 hover:border-amber-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className={`p-2.5 rounded-xl inline-block border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold group-hover:translate-x-1 transition-transform pt-1">
                  Manage <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
