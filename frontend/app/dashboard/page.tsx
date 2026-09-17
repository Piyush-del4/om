'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { UserPanelShell } from '@/components/user/UserPanelShell';
import {
  Calendar,
  Package,
  BookOpen,
  FileText,
  Star,
  Clock,
  Sparkles,
  ArrowRight,
  Calculator,
  ChevronRight,
  Compass,
  Zap,
} from 'lucide-react';

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth();

  // Fetch upcoming appointments
  const { data: appointments, isLoading: loadingAppointments } = useQuery({
    queryKey: ['my-appointments'],
    queryFn: async () => {
      const res = await client.get('/appointments/me');
      return res.data?.data || [];
    },
    enabled: isAuthenticated,
  });

  // Fetch recent orders
  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ['my-orders'],
    queryFn: async () => {
      const res = await client.get('/shop/orders/me');
      return res.data?.data || [];
    },
    enabled: isAuthenticated,
  });

  // Fetch my enrolments
  const { data: enrolments, isLoading: loadingEnrolments } = useQuery({
    queryKey: ['my-enrolments'],
    queryFn: async () => {
      const res = await client.get('/batches/me/enrolments');
      return res.data?.data || [];
    },
    enabled: isAuthenticated,
  });

  // Fetch saved Kundlis
  const { data: savedKundlis, isLoading: loadingKundlis } = useQuery({
    queryKey: ['saved-kundlis'],
    queryFn: async () => {
      const res = await client.get('/astrology/submissions');
      return res.data?.data || [];
    },
    enabled: isAuthenticated,
  });

  const nextAppointment = appointments && appointments.length > 0 ? appointments[0] : null;

  const quickTiles = [
    {
      name: 'Premium Kundli',
      icon: Star,
      desc: 'FEAN Method Astrology AMB Premium Kundli',
      path: '/premium-personalized-kundli',
      badge: 'Popular',
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
    },
    {
      name: 'Saved Kundlis',
      icon: FileText,
      desc: 'View & access saved Janam Kundlis',
      path: '/saved-kundlis',
      count: savedKundlis?.length || 0,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30',
    },
    {
      name: 'Numerology Report',
      icon: Calculator,
      desc: 'FEAN method Name & DOB Numerology',
      path: '/free-tools/numerology-calculator',
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
    },
    {
      name: 'Book Consultation',
      icon: Calendar,
      desc: '1-on-1 Session with Senior Astrologer',
      path: '/appointments',
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    },
    {
      name: 'My Store Orders',
      icon: Package,
      desc: 'Order receipts & shipping updates',
      path: '/orders',
      count: orders?.length || 0,
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    },
    {
      name: 'Enrolled Courses',
      icon: BookOpen,
      desc: 'Study lectures & course notes',
      path: '/my-batches',
      count: enrolments?.length || 0,
      color: 'bg-rose-500/10 text-rose-600 border-rose-500/30',
    },
  ];

  return (
    <UserPanelShell activeTab="dashboard">
      <div className="space-y-8">
        {/* KPI Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-gray-400">Consultations</span>
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold font-serif text-gray-900">{appointments?.length || 0}</p>
            <p className="text-[11px] text-gray-500">Booked sessions</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-gray-400">Saved Kundlis</span>
              <FileText className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold font-serif text-gray-900">{savedKundlis?.length || 0}</p>
            <p className="text-[11px] text-gray-500">Reports in vault</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-gray-400">Store Orders</span>
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold font-serif text-gray-900">{orders?.length || 0}</p>
            <p className="text-[11px] text-gray-500">Shop transactions</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-gray-400">My Courses</span>
              <BookOpen className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-2xl font-bold font-serif text-gray-900">{enrolments?.length || 0}</p>
            <p className="text-[11px] text-gray-500">Active enrolments</p>
          </div>
        </div>

        {/* Highlight Banner: Next Appointment or Call to Action */}
        {nextAppointment ? (
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-md border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold uppercase rounded-full">
                  Upcoming Session
                </span>
                <span className="text-xs text-slate-300">
                  {new Date(nextAppointment.scheduledAt).toLocaleDateString()} at{' '}
                  {new Date(nextAppointment.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif">{nextAppointment.typeName || 'Astrology Consultation'}</h3>
              <p className="text-xs text-slate-300 font-light max-w-xl">
                Your consultation coordinates have been reserved. Prepare your birth questions beforehand.
              </p>
            </div>
            <Link
              href="/appointments"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-2 flex-shrink-0"
            >
              <span>View Appointment Details</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200/80 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <span className="text-amber-800 text-[10px] uppercase font-mono font-bold tracking-wider">
                Personalized Guidance
              </span>
              <h3 className="font-serif text-xl font-bold text-amber-950">Book a 1-on-1 Consultation Session</h3>
              <p className="text-amber-900/80 text-xs font-light">
                Consult with verified FEAN astrology experts for career, marriage, health, and transit remedies.
              </p>
            </div>
            <Link
              href="/appointments"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2 flex-shrink-0"
            >
              <span>Schedule Session</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        )}

        {/* Quick Access Tools Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" />
              <span>Quick Services & Tools</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <Link key={tile.name} href={tile.path} className="group block h-full">
                  <div className="bg-white hover:bg-amber-50/30 p-5 rounded-2xl border border-gray-200 hover:border-amber-400/80 transition-all duration-200 shadow-sm h-full flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl border ${tile.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {tile.badge && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold rounded-full">
                          {tile.badge}
                        </span>
                      )}
                      {tile.count !== undefined && tile.count > 0 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-mono font-bold rounded-full">
                          {tile.count} items
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-gray-900 group-hover:text-amber-700 transition-colors flex items-center justify-between">
                        <span>{tile.name}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </h4>
                      <p className="text-gray-500 text-xs mt-1 font-light">{tile.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Widgets Grid: Course Progress & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Enrolments Widget */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-serif font-bold text-base text-gray-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-rose-600" />
                <span>My Enrolled Courses</span>
              </h3>
              <Link href="/my-batches" className="text-xs text-amber-600 hover:underline font-semibold">
                View All →
              </Link>
            </div>

            {loadingEnrolments ? (
              <p className="text-gray-400 text-xs animate-pulse">Loading enrolments...</p>
            ) : enrolments && enrolments.length > 0 ? (
              <div className="space-y-4">
                {enrolments.slice(0, 3).map((enr: any) => {
                  const watchedCount = enr.watchedLectures?.length || 0;
                  const totalCount = enr.batchId?.totalLectures || 1;
                  const pct = Math.min(100, Math.round((watchedCount / totalCount) * 100));
                  return (
                    <div key={enr._id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-900">{enr.batchId?.title || 'Astrology Batch'}</span>
                        <span className="text-amber-600 font-mono text-[11px] font-bold">{pct}% watched</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 text-xs">
                You are not currently enrolled in any study batches.
              </div>
            )}
          </div>

          {/* Recent Orders Widget */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-serif font-bold text-base text-gray-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                <span>Recent Shop Orders</span>
              </h3>
              <Link href="/orders" className="text-xs text-amber-600 hover:underline font-semibold">
                View Orders →
              </Link>
            </div>

            {loadingOrders ? (
              <p className="text-gray-400 text-xs animate-pulse">Loading order history...</p>
            ) : orders && orders.length > 0 ? (
              <div className="space-y-3">
                {orders.slice(0, 3).map((ord: any) => (
                  <div key={ord._id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-gray-900">Order #{ord._id.slice(-6).toUpperCase()}</p>
                      <p className="text-[11px] text-gray-500 font-mono">
                        {new Date(ord.createdAt).toLocaleDateString()} • ₹{(ord.totalAmount / 100).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      ord.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                      ord.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {ord.orderStatus}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 text-xs">
                No store purchase history recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </UserPanelShell>
  );
}
