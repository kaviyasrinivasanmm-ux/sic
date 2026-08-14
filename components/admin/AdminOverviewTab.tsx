'use client'

import { useMemo } from 'react'
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { Booking, Expense, Customer, getAdminLogs } from '@/lib/adminData'

interface AdminOverviewTabProps {
  bookings: Booking[]
  expenses: Expense[]
  customers: Customer[]
  onNavigateTab: (tab: string) => void
}

export default function AdminOverviewTab({
  bookings,
  expenses,
  customers,
  onNavigateTab,
}: AdminOverviewTabProps) {
  const logs = getAdminLogs()
  const todayStr = new Date().toISOString().split('T')[0]

  const metrics = useMemo(() => {
    const totalBookings = bookings.length
    const todaysBookings = bookings.filter((b) => b.bookingDate === todayStr).length
    const upcomingBookings = bookings.filter((b) => b.status === 'confirmed' && b.bookingDate >= todayStr).length
    const completedBookings = bookings.filter((b) => b.status === 'completed').length
    const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length

    const revenue = bookings
      .filter((b) => b.status !== 'cancelled')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0)

    const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0)
    const profitLoss = revenue - totalExpenses

    return {
      totalBookings,
      todaysBookings,
      upcomingBookings,
      completedBookings,
      cancelledBookings,
      revenue,
      totalExpenses,
      profitLoss,
      totalCustomers: customers.length,
    }
  }, [bookings, expenses, customers, todayStr])

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1D2B23] via-[#2A3B31] to-[#1D2B23] border border-[#C7A76C]/35 text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C7A76C]/10 text-[#C7A76C] text-xs font-semibold uppercase tracking-widest border border-[#C7A76C]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A76C]" />
            <span>Master Dashboard</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-normal">
            Welcome, <span className="gold-gradient-text font-light">BLOOM Administrator</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A8B5B0] font-light max-w-xl">
            Real-time operational summary, treatment statistics, financial performance, and master appointment schedules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => onNavigateTab('bookings')}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] hover:from-[#C7A76C] hover:to-[#9A7A3B] text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Manage Bookings</span>
          </button>
          <button
            onClick={() => onNavigateTab('financials')}
            className="px-5 py-3 rounded-full glass-card border border-[#C7A76C]/40 text-[#FCFBF8] text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <IndianRupee className="w-4 h-4 text-[#C7A76C]" />
            <span>Financials</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Bookings */}
        <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#A8B59A]/15 text-[#A8B59A] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-[#5A7062] bg-[#A8B59A]/10 px-2.5 py-1 rounded-full">
              All Time
            </span>
          </div>
          <p className="text-xs text-[#4A6358] font-medium tracking-wide uppercase">Total Bookings</p>
          <h3 className="font-serif text-3xl font-bold text-[#111614] mt-1">{metrics.totalBookings}</h3>
          <p className="text-xs text-[#8C857B] mt-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#C7A76C]" />
            <span>{metrics.todaysBookings} scheduled today</span>
          </p>
        </div>

        {/* Total Customers */}
        <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#C7A76C]/15 text-[#C7A76C] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-[#9A7A3B] bg-[#C7A76C]/10 px-2.5 py-1 rounded-full">
              Active Directory
            </span>
          </div>
          <p className="text-xs text-[#4A6358] font-medium tracking-wide uppercase">Total Customers</p>
          <h3 className="font-serif text-3xl font-bold text-[#111614] mt-1">{metrics.totalCustomers}</h3>
          <p className="text-xs text-[#8C857B] mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#A8B59A]" />
            <span>Registered spa clients</span>
          </p>
        </div>

        {/* Gross Revenue */}
        <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Revenue</span>
            </span>
          </div>
          <p className="text-xs text-[#4A6358] font-medium tracking-wide uppercase">Gross Revenue</p>
          <h3 className="font-serif text-3xl font-bold text-[#111614] mt-1">
            ₹{metrics.revenue.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-emerald-600 mt-2 font-medium">
            From {metrics.completedBookings + metrics.upcomingBookings} valid sessions
          </p>
        </div>

        {/* Net Profit / Loss */}
        <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                metrics.profitLoss >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {metrics.profitLoss >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            </div>
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                metrics.profitLoss >= 0 ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
              }`}
            >
              {metrics.profitLoss >= 0 ? 'Net Profit' : 'Net Deficit'}
            </span>
          </div>
          <p className="text-xs text-[#4A6358] font-medium tracking-wide uppercase">Net Profit / Loss</p>
          <h3
            className={`font-serif text-3xl font-bold mt-1 ${
              metrics.profitLoss >= 0 ? 'text-[#111614]' : 'text-red-600'
            }`}
          >
            ₹{metrics.profitLoss.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-[#8C857B] mt-2">
            After ₹{metrics.totalExpenses.toLocaleString('en-IN')} operating expenses
          </p>
        </div>
      </div>

      {/* Breakdown Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Booking Status Summary */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#EEE6DA] pb-4">
            <h3 className="font-serif text-xl font-bold text-[#111614]">Appointment Distribution</h3>
            <button
              onClick={() => onNavigateTab('bookings')}
              className="text-xs font-semibold text-[#A8B59A] hover:text-[#C7A76C] transition-colors flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/15 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#A8B59A]/20 text-[#3A4D41] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-[#4A6358] font-semibold">Upcoming / Confirmed</p>
                <p className="font-serif text-xl font-bold text-[#111614]">{metrics.upcomingBookings}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/15 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-[#4A6358] font-semibold">Completed Sessions</p>
                <p className="font-serif text-xl font-bold text-[#111614]">{metrics.completedBookings}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/15 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                <XCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-[#4A6358] font-semibold">Cancelled Sessions</p>
                <p className="font-serif text-xl font-bold text-[#111614]">{metrics.cancelledBookings}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/15 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C7A76C]/20 text-[#9A7A3B] flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-[#4A6358] font-semibold">Today's Sessions</p>
                <p className="font-serif text-xl font-bold text-[#111614]">{metrics.todaysBookings}</p>
              </div>
            </div>
          </div>

          {/* Status Progress Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs text-[#4A6358] font-medium">
              <span>Fulfillment Rate</span>
              <span>
                {metrics.totalBookings > 0
                  ? Math.round((metrics.completedBookings / metrics.totalBookings) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#EEE6DA] overflow-hidden flex">
              <div
                className="bg-[#A8B59A]"
                style={{
                  width: `${
                    metrics.totalBookings > 0
                      ? (metrics.completedBookings / metrics.totalBookings) * 100
                      : 0
                  }%`,
                }}
              />
              <div
                className="bg-[#C7A76C]"
                style={{
                  width: `${
                    metrics.totalBookings > 0
                      ? (metrics.upcomingBookings / metrics.totalBookings) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Audit Activity Stream */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#EEE6DA] pb-4">
            <h3 className="font-serif text-xl font-bold text-[#111614]">Recent Audit Logs</h3>
            <button
              onClick={() => onNavigateTab('settings')}
              className="text-xs font-semibold text-[#A8B59A] hover:text-[#C7A76C] transition-colors flex items-center gap-1"
            >
              <span>Security Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
            {logs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/10 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <p className="font-semibold text-[#111614]">{log.action}</p>
                  <p className="text-[11px] text-[#4A6358] font-light">{log.details}</p>
                </div>
                <span className="text-[10px] text-[#8C857B] font-mono shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
