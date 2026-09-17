'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { useAuth } from '@/auth/AuthProvider';
import {
  DollarSign,
  ShoppingBag,
  Calendar,
  Download,
  TrendingUp,
  GraduationCap,
  FileText,
  BarChart3,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminAnalyticsPage() {
  const { isAuthenticated, user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'7D' | '30D' | '3M' | '6M' | '1Y'>('30D');

  const { data: analyticsRes, isLoading } = useQuery({
    queryKey: ['admin-analytics', selectedPeriod],
    queryFn: async () => {
      const res = await client.get('/admin/analytics/revenue');
      return res.data?.data || null;
    },
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const handleExportCSV = async () => {
    try {
      const response = await client.get('/admin/analytics/export-csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `financial_accounting_report_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('CSV Financial Accounting Log Downloaded!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to export CSV report.');
    }
  };

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
    <div className="space-y-6 sm:space-y-8 animate-fade-in min-w-0">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0" /> Revenue Analytics & Accounting
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Financial income breakdowns, revenue streams, and 1-click accounting CSV export.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="w-full sm:w-auto px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export CSV Accounting Log
        </button>
      </div>

      {/* Period Selection Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 font-mono">
          <Filter className="w-4 h-4 text-amber-600" /> Time Period:
        </div>
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200 w-full sm:w-auto">
          {(['7D', '30D', '3M', '6M', '1Y'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 sm:flex-none px-3 py-1 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer ${
                selectedPeriod === period
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* 5 Revenue Stream Metric Cards (2 col on mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Earnings */}
        <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-2">
          <div className="flex items-center justify-between text-amber-400 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
            <span>Total Earnings</span>
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">
            ₹{totalRev.toLocaleString()}
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400">Combined streams</p>
        </div>

        {/* Shop Sales */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-700 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
            <span>Shop Sales</span>
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
            ₹{shopRev.toLocaleString()}
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-500">{totalOrders} paid orders</p>
        </div>

        {/* Consultations */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-sky-700 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
            <span>Appointments</span>
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
            ₹{apptRev.toLocaleString()}
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-500">{totalAppts} sessions</p>
        </div>

        {/* Batch Courses */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-indigo-700 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
            <span>Batch Courses</span>
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
            ₹{batchRev.toLocaleString()}
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-500">{totalEnrolments} enrollments</p>
        </div>

        {/* Kundli Reports */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-purple-700 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
            <span>Kundli Reports</span>
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
            ₹{kundliRev.toLocaleString()}
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-500">{totalKundlis} reports</p>
        </div>
      </div>

      {/* Monthly Revenue Breakdown Table */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-600" /> Monthly Revenue Trend Breakdown
          </h3>
        </div>

        {isLoading ? (
          <p className="text-xs text-gray-600 animate-pulse py-4">Loading analytics trends...</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/80 font-bold uppercase text-[10px] font-mono text-gray-600 tracking-wider">
                    <th className="py-3 px-4">Month</th>
                    <th className="py-3 px-4">Shop Sales (₹)</th>
                    <th className="py-3 px-4">Consultations (₹)</th>
                    <th className="py-3 px-4">Batch Courses (₹)</th>
                    <th className="py-3 px-4">Kundli Reports (₹)</th>
                    <th className="py-3 px-4 text-right">Total Revenue (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono">
                  {monthlyTrend.length > 0 ? (
                    monthlyTrend.map((m: any, idx: number) => {
                      const sSales = Number(m.shopSales) || 0;
                      const appts = Number(m.appointments) || 0;
                      const btchs = Number(m.batches) || 0;
                      const kndls = Number(m.kundlis) || 0;
                      const tot = Number(m.total) || sSales + appts + btchs + kndls;

                      return (
                        <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                          <td className="py-3 px-4 font-bold text-gray-900 font-sans">{m.month || 'N/A'}</td>
                          <td className="py-3 px-4 text-emerald-700 font-semibold">₹{sSales.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sky-700 font-semibold">₹{appts.toLocaleString()}</td>
                          <td className="py-3 px-4 text-indigo-700 font-semibold">₹{btchs.toLocaleString()}</td>
                          <td className="py-3 px-4 text-purple-700 font-semibold">₹{kndls.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right font-bold text-amber-600">₹{tot.toLocaleString()}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500 font-medium font-sans">
                        No monthly revenue logs recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards */}
            <div className="md:hidden space-y-3">
              {monthlyTrend.length > 0 ? (
                monthlyTrend.map((m: any, idx: number) => {
                  const sSales = Number(m.shopSales) || 0;
                  const appts = Number(m.appointments) || 0;
                  const btchs = Number(m.batches) || 0;
                  const kndls = Number(m.kundlis) || 0;
                  const tot = Number(m.total) || sSales + appts + btchs + kndls;

                  return (
                    <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-2">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <span className="font-bold text-gray-900 font-serif">{m.month || 'N/A'}</span>
                        <span className="font-bold text-amber-600 font-mono text-sm">₹{tot.toLocaleString()}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-600">
                        <div>Shop: <span className="text-emerald-700 font-bold">₹{sSales.toLocaleString()}</span></div>
                        <div>Consult: <span className="text-sky-700 font-bold">₹{appts.toLocaleString()}</span></div>
                        <div>Batches: <span className="text-indigo-700 font-bold">₹{btchs.toLocaleString()}</span></div>
                        <div>Kundlis: <span className="text-purple-700 font-bold">₹{kndls.toLocaleString()}</span></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-gray-500 py-6 text-center">No monthly revenue logs recorded yet.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
