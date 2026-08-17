'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  Users,
  IndianRupee,
  UserCheck,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
  Loader2,
  Database,
} from 'lucide-react'
import AdminAuthGuard from '@/components/admin/AdminAuthGuard'
import AdminOverviewTab from '@/components/admin/AdminOverviewTab'
import AdminBookingsTab from '@/components/admin/AdminBookingsTab'
import AdminTreatmentsTab from '@/components/admin/AdminTreatmentsTab'
import AdminTherapistsTab from '@/components/admin/AdminTherapistsTab'
import AdminFinancialsTab from '@/components/admin/AdminFinancialsTab'
import AdminCustomersTab from '@/components/admin/AdminCustomersTab'
import AdminSettingsTab from '@/components/admin/AdminSettingsTab'
import {
  getBookings,
  getTreatments,
  getTherapists,
  getExpenses,
  getCustomers,
  Booking,
  AdminTreatment,
  AdminTherapist,
  Expense,
  Customer,
} from '@/lib/adminData'
import {
  fetchBookingsFromSupabase,
  fetchTreatmentsFromSupabase,
  fetchTherapistsFromSupabase,
  fetchExpensesFromSupabase,
} from '@/lib/supabaseService'
import { logoutAdmin } from '@/lib/adminAuth'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // State data
  const [bookings, setBookings] = useState<Booking[]>([])
  const [treatments, setTreatments] = useState<AdminTreatment[]>([])
  const [therapists, setTherapists] = useState<AdminTherapist[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isUsingLiveDb, setIsUsingLiveDb] = useState<boolean>(false)

  const refreshAllData = useCallback(async () => {
    setIsLoading(true)
    
    // Fetch live from Supabase in parallel
    const [bRes, tRes, thRes, eRes] = await Promise.all([
      fetchBookingsFromSupabase(),
      fetchTreatmentsFromSupabase(),
      fetchTherapistsFromSupabase(),
      fetchExpensesFromSupabase(),
    ])

    let hasLive = false

    if (bRes.success && bRes.data && bRes.data.length > 0) {
      setBookings(bRes.data as any)
      hasLive = true
    } else {
      setBookings(getBookings())
    }

    if (tRes.success && tRes.data && tRes.data.length > 0) {
      setTreatments(tRes.data as any)
      hasLive = true
    } else {
      setTreatments(getTreatments())
    }

    if (thRes.success && thRes.data && thRes.data.length > 0) {
      setTherapists(thRes.data as any)
      hasLive = true
    } else {
      setTherapists(getTherapists())
    }

    if (eRes.success && eRes.data && eRes.data.length > 0) {
      setExpenses(eRes.data as any)
      hasLive = true
    } else {
      setExpenses(getExpenses())
    }

    setCustomers(getCustomers())
    setIsUsingLiveDb(hasLive)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    refreshAllData()
  }, [refreshAllData])

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar, badge: bookings.filter((b) => b.status === 'confirmed').length },
    { id: 'treatments', label: 'Treatments', icon: Sparkles },
    { id: 'therapists', label: 'Therapists', icon: UserCheck },
    { id: 'financials', label: 'Financials', icon: IndianRupee },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings & Security', icon: Settings },
  ]

  const handleLogout = () => {
    logoutAdmin()
    router.replace('/admin/login')
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#FAF7F2] text-[#111614] flex flex-col lg:flex-row relative">
        {/* Fixed Desktop Sidebar - Stretches 100% to bottom */}
        <aside className="hidden lg:flex flex-col w-72 bg-[#1D2B23] text-[#FCFBF8] border-r border-[#C7A76C]/25 p-6 shrink-0 fixed top-0 bottom-0 left-0 z-30 justify-between overflow-y-auto custom-scrollbar shadow-lg">
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C7A76C]/15 border border-[#C7A76C]/40 flex items-center justify-center text-[#C7A76C] font-serif text-xl font-bold shadow-xs">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-wider text-[#FCFBF8]">BLOOM</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C7A76C] font-medium">
                  Admin Dashboard
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#C7A76C] to-[#9A7A3B] text-white shadow-md font-semibold'
                        : 'text-[#C5D3CB] hover:text-white hover:bg-[#283A30]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#C7A76C]'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive ? 'bg-white text-[#9A7A3B]' : 'bg-[#C7A76C]/25 text-[#E7C88C]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Sidebar Footer Actions */}
          <div className="space-y-3 pt-6 border-t border-[#C7A76C]/20">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/5 text-xs text-[#C5D3CB] hover:text-white hover:bg-[#283A30] transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#C7A76C]" />
                <span>View Spa Landing Page</span>
              </span>
              <span>↗</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs text-red-300 hover:bg-red-900/30 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout Administrator</span>
            </button>
          </div>
        </aside>

        {/* Mobile Header & Drawer Trigger */}
        <div className="lg:hidden bg-[#1D2B23] text-[#FCFBF8] p-4 flex items-center justify-between sticky top-0 z-40 border-b border-[#C7A76C]/25">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C7A76C]/15 border border-[#C7A76C]/40 flex items-center justify-center text-[#C7A76C] font-serif font-bold text-sm">
              B
            </div>
            <span className="font-serif font-bold tracking-wider text-sm">BLOOM Admin</span>
          </div>

          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl bg-white/10 text-white"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden bg-[#1D2B23] text-[#FCFBF8] p-4 border-b border-[#C7A76C]/25 space-y-2 z-30">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setMobileSidebarOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-medium ${
                    isActive ? 'bg-[#C7A76C] text-white font-semibold' : 'text-[#C5D3CB]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#C7A76C]" />
                    <span>{item.label}</span>
                  </div>
                </button>
              )
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-xs text-red-300 font-medium pt-2 border-t border-white/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* Main Content Area - Shifted lg:ml-72 for fixed sidebar */}
        <main className="flex-1 lg:ml-72 p-4 sm:p-8 lg:p-10 w-full min-h-screen space-y-8 overflow-y-auto bg-[#FAF7F2]">
          {/* Top Header Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#C7A76C]/20">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#9A7A3B] block mb-1">
                BLOOM Wellness Spa · System Administration
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#111614] capitalize">
                {activeTab} Management
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={refreshAllData}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41] hover:bg-[#F8F5F0] transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 text-[#C7A76C] animate-spin" />
                ) : (
                  <span className="text-[#C7A76C]">↻</span>
                )}
                <span>{isLoading ? 'Syncing...' : 'Sync Data'}</span>
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A8B59A]/15 text-[#3A4D41] text-xs font-semibold border border-[#A8B59A]/30">
                <span className="w-2 h-2 rounded-full bg-[#A8B59A] animate-pulse" />
                <span>Admin Portal</span>
              </div>
            </div>
          </div>

          {/* Active Tab Component */}
          {activeTab === 'overview' && (
            <AdminOverviewTab
              bookings={bookings}
              expenses={expenses}
              customers={customers}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'bookings' && (
            <AdminBookingsTab bookings={bookings} onRefresh={refreshAllData} />
          )}

          {activeTab === 'treatments' && (
            <AdminTreatmentsTab treatments={treatments} onRefresh={refreshAllData} />
          )}

          {activeTab === 'therapists' && (
            <AdminTherapistsTab therapists={therapists} onRefresh={refreshAllData} />
          )}

          {activeTab === 'financials' && (
            <AdminFinancialsTab bookings={bookings} expenses={expenses} onRefresh={refreshAllData} />
          )}

          {activeTab === 'customers' && (
            <AdminCustomersTab customers={customers} onRefresh={refreshAllData} />
          )}

          {activeTab === 'settings' && (
            <AdminSettingsTab onRefreshAll={refreshAllData} />
          )}
        </main>
      </div>
    </AdminAuthGuard>
  )
}
