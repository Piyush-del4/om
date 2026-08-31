'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import { DollarSign, ShoppingBag, Calendar, Download, TrendingUp, Shield, ArrowLeft, GraduationCap, FileText, BarChart3 } from 'lucide-react';
import { GoldButton } from '@/components/ui/GoldButton';
import toast from 'react-hot-toast';

export default function AdminAnalyticsPage() {
  const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();

  const { data: analyticsRes, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const res = await client.get('/admin/analytics/revenue');
      return res.data?.data || null;
    },
    enabled: isAuthenticated && isAdmin,
  });

  const handleExportCSV = async () => {
    try {
      const response = await client.get('/admin/analytics/export-csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `financial_accounting_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('CSV Financial Log Downloaded!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to export CSV report.');
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--gold)]"></div>
      </div>
    );
  }

  const data = analyticsRes || {};
  const totalRev = Number(data.totalRevenueRupees) || 0;
  const shopRev = Number(data.shopRevenueRupees) || 0;
  const apptRev = Number(data.appointmentRevenueRupees) || 0;
  const batchRev = Number(data.batchRevenueRupees) || 0;
  const kundliRev = Number(data.kundliRevenueRupees) || 0;

  const totalOrders = Number(data.totalOrdersCount) || 0;
  const totalAppts = Number(data.totalAppointmentsCount) || 0;
  const totalEnrolments = Number(data.totalEnrolmentsCount) || 0;
  const totalKundlis = Number(data.totalKundliCount) || 0;

  const monthlyTrend = Array.isArray(data.monthlyTrend) ? data.monthlyTrend : [];

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAD5B8] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8C5D30] uppercase tracking-widest">
              <Shield className="w-4 h-4 text-[var(--gold-dark)]" />
              <span>Admin Financial Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#5A3815]">
              Revenue Analytics & Accounting Reports
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard">
              <GoldButton variant="outlined" className="text-xs flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </GoldButton>
            </Link>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-gray-900 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer border border-amber-400/40"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV Accounting Log</span>
            </button>
          </div>
        </div>

        {/* 5 Revenue Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: Total Earnings */}
          <div className="bg-gradient-to-br from-amber-900 to-amber-950 text-white rounded-2xl p-5 shadow-md border border-amber-800 space-y-2">
            <div className="flex items-center justify-between text-amber-300">
              <span className="text-[10px] font-bold uppercase tracking-wider">Total Earnings</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[var(--gold)]">
              ₹{totalRev.toLocaleString()}
            </div>
            <p className="text-[11px] text-amber-200/80">Combined 4 revenue streams</p>
          </div>

          {/* Card 2: Shop Earnings */}
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-emerald-700">
              <span className="text-[10px] font-bold uppercase tracking-wider">Shop Sales</span>
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="text-2xl font-serif font-bold text-neutral-900">
              ₹{shopRev.toLocaleString()}
            </div>
            <p className="text-[11px] text-neutral-500">{totalOrders} paid shop orders</p>
          </div>

          {/* Card 3: Consultations Earnings */}
          <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-amber-800">
              <span className="text-[10px] font-bold uppercase tracking-wider">Appointments</span>
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-2xl font-serif font-bold text-neutral-900">
              ₹{apptRev.toLocaleString()}
            </div>
            <p className="text-[11px] text-neutral-500">{totalAppts} completed sessions</p>
          </div>

          {/* Card 4: Study Batch Course Revenue */}
          <div className="bg-white border-2 border-indigo-200 rounded-2xl p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-indigo-700">
              <span className="text-[10px] font-bold uppercase tracking-wider">Batch Courses</span>
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="text-2xl font-serif font-bold text-indigo-950">
              ₹{batchRev.toLocaleString()}
            </div>
            <p className="text-[11px] text-neutral-500">{totalEnrolments} student enrollments</p>
          </div>

          {/* Card 5: Kundli Generation Revenue */}
          <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-purple-700">
              <span className="text-[10px] font-bold uppercase tracking-wider">Kundli Reports</span>
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-2xl font-serif font-bold text-purple-950">
              ₹{kundliRev.toLocaleString()}
            </div>
            <p className="text-[11px] text-neutral-500">{totalKundlis} reports generated</p>
          </div>

        </div>

        {/* Visual Monthly Trend Table */}
        <div className="bg-white border-2 border-[#EAD5B8] rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#EAD5B8]/60 pb-4">
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-[#5A3815] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#8C5D30]" />
                Monthly Revenue Trend Breakdown (All 4 Streams)
              </h3>
              <p className="text-xs text-gray-500">Historical monthly income performance log directly from database</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-amber-100/70 text-[#5A3815] font-bold uppercase text-[11px] tracking-wider border-b border-amber-200">
                <tr>
                  <th className="py-3.5 px-4">Month</th>
                  <th className="py-3.5 px-4">Shop Sales (₹)</th>
                  <th className="py-3.5 px-4">Consultations (₹)</th>
                  <th className="py-3.5 px-4">Batch Courses (₹)</th>
                  <th className="py-3.5 px-4">Kundli Reports (₹)</th>
                  <th className="py-3.5 px-4 text-right">Total Revenue (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {monthlyTrend.length > 0 ? (
                  monthlyTrend.map((m: any, idx: number) => {
                    const sSales = Number(m.shopSales) || 0;
                    const appts = Number(m.appointments) || 0;
                    const btchs = Number(m.batches) || 0;
                    const kndls = Number(m.kundlis) || 0;
                    const tot = Number(m.total) || (sSales + appts + btchs + kndls);

                    return (
                      <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-gray-900">{m.month || 'N/A'}</td>
                        <td className="py-3.5 px-4 text-emerald-700 font-semibold">₹{sSales.toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-amber-800 font-semibold">₹{appts.toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-indigo-800 font-semibold">₹{btchs.toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-purple-800 font-semibold">₹{kndls.toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-right font-bold text-[#5A3815]">₹{tot.toLocaleString()}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500 font-medium">
                      No monthly revenue logs recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
