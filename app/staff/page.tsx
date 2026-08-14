'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  isStaffAuthenticated,
  setStaffAuthenticated,
  getBookings,
  saveBooking,
  getCustomers,
  getCancellationRequests,
  processCancellationRequest,
  getActivityLogs,
  Booking,
  Customer,
  CancellationRequest,
  ActivityLog,
} from '@/lib/adminData'
import {
  UserCheck,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  LogOut,
  RefreshCw,
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  ShieldAlert,
} from 'lucide-react'

export default function StaffDashboardPage() {
  const router = routerFunction()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [activeTab, setActiveTab] = useState<'bookings' | 'cancellations' | 'customers' | 'logs'>('bookings')

  // Data states
  const [bookings, setBookings] = useState<Booking[]>([])
  const [cancellations, setCancellations] = useState<CancellationRequest[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])

  // Search & Filter states
  const [bookingSearch, setBookingSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('')

  // Detail Modal states
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [cancellationNote, setCancellationNote] = useState('')
  const [processingId, setProcessingId] = useState<string | null>(null)

  function routerFunction() {
    try {
      return useRouter()
    } catch {
      return null
    }
  }

  const loadData = () => {
    setBookings(getBookings())
    setCancellations(getCancellationRequests())
    setCustomers(getCustomers())
    setActivityLogs(getActivityLogs())
  }

  useEffect(() => {
    const auth = isStaffAuthenticated()
    if (!auth) {
      if (router) router.push('/staff/login')
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
      loadData()
    }
  }, [router])

  const handleLogout = () => {
    setStaffAuthenticated(false)
    if (router) router.push('/staff/login')
  }

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchQuery =
        b.bookingRef.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.clientName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.clientEmail.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.treatmentName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.therapistName.toLowerCase().includes(bookingSearch.toLowerCase())

      const matchStatus = statusFilter === 'all' || b.status === statusFilter
      const matchDate = !dateFilter || b.bookingDate === dateFilter

      return matchQuery && matchStatus && matchDate
    })
  }, [bookings, bookingSearch, statusFilter, dateFilter])

  // Filtered Cancellation Requests
  const pendingCancellations = useMemo(() => {
    return cancellations.filter((c) => c.status === 'Pending')
  }, [cancellations])

  const handleBookingStatusChange = (bookingId: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    const target = bookings.find((b) => b.id === bookingId)
    if (target) {
      saveBooking({ ...target, status: newStatus })
      loadData()
      if (selectedBooking && selectedBooking.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, status: newStatus })
      }
    }
  }

  const handleProcessCancellation = (requestId: string, action: 'Accepted' | 'Declined') => {
    setProcessingId(requestId)
    setTimeout(() => {
      processCancellationRequest(requestId, action, cancellationNote.trim() || undefined)
      setCancellationNote('')
      setProcessingId(null)
      loadData()
    }, 400)
  }

  if (isAuthenticated === false) {
    return (
      <main className="min-h-screen bg-[#1D2B23] text-white flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <ShieldAlert className="w-12 h-12 text-[#C7A76C] mx-auto animate-pulse" />
          <p className="text-sm">Redirecting to Staff Security Login...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#111614]">
      {/* Top Staff Navigation Header */}
      <header className="bg-[#1D2B23] border-b border-[#C7A76C]/30 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-[#A8B59A]/20 border border-[#C7A76C]/40 text-[#C7A76C] flex items-center justify-center font-serif font-bold text-base">
                B
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-white">
                BLOOM <span className="text-xs font-sans text-[#C7A76C] font-normal uppercase tracking-widest pl-1">Staff Portal</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#283A30] border border-[#C7A76C]/30 text-[#C5D3CB]">
              <UserCheck className="w-3.5 h-3.5 text-[#C7A76C]" />
              <span>Concierge Staff Desk</span>
            </div>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-full bg-red-950/60 hover:bg-red-900 border border-red-700/50 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Staff Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5DFD5] pb-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { id: 'bookings', label: 'Bookings Schedule', icon: Calendar, badge: bookings.length },
              { id: 'cancellations', label: 'Cancellation Requests', icon: AlertTriangle, badge: pendingCancellations.length, highlight: pendingCancellations.length > 0 },
              { id: 'customers', label: 'Customer Directory', icon: User, badge: customers.length },
              { id: 'logs', label: 'Login & Staff Activity', icon: FileText, badge: activityLogs.length },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
                    isActive
                      ? 'bg-[#1D2B23] text-white shadow-md'
                      : 'bg-white text-[#4A6358] hover:bg-[#FAF8F5] border border-[#EDE6DD]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C7A76C]' : 'text-[#8C857B]'}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        tab.highlight
                          ? 'bg-red-600 text-white font-bold animate-pulse'
                          : isActive
                          ? 'bg-[#C7A76C] text-white'
                          : 'bg-[#F0ECE4] text-[#4A6358]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <button
            onClick={loadData}
            className="px-3 py-2 rounded-xl bg-white border border-[#EDE6DD] text-xs text-[#4A6358] hover:text-[#111614] flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* TAB 1: BOOKINGS SCHEDULE */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="p-4 rounded-3xl bg-white border border-[#EDE6DD] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C857B]" />
                <input
                  type="text"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  placeholder="Search ref, guest name, treatment..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/30 text-xs text-[#111614] focus:outline-none focus:border-[#C7A76C]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/30 text-xs text-[#111614] focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/30 text-xs text-[#111614] focus:outline-none"
                />

                {dateFilter && (
                  <button
                    onClick={() => setDateFilter('')}
                    className="text-xs text-[#C7A76C] underline"
                  >
                    Clear Date
                  </button>
                )}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="rounded-3xl bg-white border border-[#EDE6DD] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8F5F0] border-b border-[#EDE6DD] text-[11px] font-semibold text-[#4A6358] uppercase tracking-wider">
                      <th className="py-4 px-6">Ref & Date</th>
                      <th className="py-4 px-6">Guest Info</th>
                      <th className="py-4 px-6">Ritual & Specialist</th>
                      <th className="py-4 px-6">Payment Status</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE6DD] text-xs">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#8C857B]">
                          No appointment bookings found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-[#F8F5F0]/60 transition-colors">
                          <td className="py-4 px-6">
                            <span className="font-mono font-bold text-[#111614] block">{b.bookingRef}</span>
                            <span className="text-[11px] text-[#5A7365]">
                              {b.bookingDate} at {b.timeSlot}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <p className="font-bold text-[#111614]">{b.clientName}</p>
                            <p className="text-[11px] text-[#4A6358]">{b.clientPhone}</p>
                            <p className="text-[10px] text-[#8C857B]">{b.clientEmail}</p>
                          </td>
                          <td className="py-4 px-6">
                            <p className="font-semibold text-[#111614]">{b.treatmentName}</p>
                            <p className="text-[11px] text-[#C7A76C]">Therapist: {b.therapistName}</p>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-xs font-mono font-semibold text-[#111614]">
                              ₹{b.totalPrice.toLocaleString('en-IN')}
                            </span>
                            {b.advanceAmount ? (
                              <span className="block text-[10px] text-emerald-700 font-medium">
                                Advance Token: ₹{b.advanceAmount}
                              </span>
                            ) : null}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                b.status === 'confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : b.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {b.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {b.status === 'confirmed' && (
                                <button
                                  onClick={() => handleBookingStatusChange(b.id, 'completed')}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold"
                                >
                                  Complete
                                </button>
                              )}
                              <button
                                onClick={() => setSelectedBooking(b)}
                                className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#C7A76C]/40 text-[#4A6358] hover:text-[#111614] text-[11px] font-semibold"
                              >
                                Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CANCELLATION REQUESTS */}
        {activeTab === 'cancellations' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#1D2B23] border border-[#C7A76C]/30 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#C7A76C]" />
                  <span>AI Chatbot Cancellation Requests</span>
                </h2>
                <p className="text-xs text-[#C5D3CB] mt-1">
                  Requests submitted by guests via the landing page AI chatbot. Staff can review, accept, or decline requests.
                </p>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-[#283A30] border border-[#C7A76C]/40 text-xs text-[#C7A76C] font-mono font-bold">
                {pendingCancellations.length} Pending Approval
              </div>
            </div>

            {/* Cancellations Grid */}
            <div className="space-y-4">
              {cancellations.length === 0 ? (
                <div className="p-12 rounded-3xl bg-white border border-[#EDE6DD] text-center text-[#8C857B] text-xs">
                  No cancellation requests recorded.
                </div>
              ) : (
                cancellations.map((req) => (
                  <div
                    key={req.id}
                    className={`p-6 rounded-3xl bg-white border shadow-sm transition-all ${
                      req.status === 'Pending'
                        ? 'border-amber-400/60 ring-1 ring-amber-400/30'
                        : req.status === 'Accepted'
                        ? 'border-emerald-300'
                        : 'border-red-300 opacity-80'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-[#111614] bg-[#F8F5F0] px-3 py-1 rounded-xl border border-[#EDE6DD]">
                            {req.bookingRef}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                              req.status === 'Pending'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : req.status === 'Accepted'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-red-100 text-red-900 border border-red-300'
                            }`}
                          >
                            Status: {req.status}
                          </span>
                          <span className="text-[11px] text-[#8C857B] font-mono">
                            Requested: {new Date(req.requestDate).toLocaleString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                          <p>
                            Guest: <strong>{req.clientName}</strong> ({req.clientEmail})
                          </p>
                          <p>
                            WhatsApp: <strong>{req.clientPhone}</strong>
                          </p>
                          <p>
                            Ritual: <strong>{req.treatmentName}</strong>
                          </p>
                          <p>
                            Booking Date: <strong>{req.bookingDate}</strong>
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#F8F5F0] border border-[#EDE6DD] text-xs text-[#111614]">
                          <p className="font-semibold text-[#5A7365] mb-0.5">Cancellation Reason:</p>
                          <p className="italic text-[#111614]">"{req.reason}"</p>
                        </div>

                        {req.staffResponse && (
                          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                            <strong>Staff Response ({req.reviewedBy}):</strong> "{req.staffResponse}" •{' '}
                            <span className="text-[10px] text-blue-700">{req.reviewedAt ? new Date(req.reviewedAt).toLocaleString() : ''}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Controls */}
                      {req.status === 'Pending' && (
                        <div className="w-full lg:w-72 p-4 rounded-2xl bg-[#FAF8F5] border border-[#C7A76C]/30 space-y-3 shrink-0">
                          <p className="text-xs font-semibold text-[#111614]">Staff Decision Control:</p>
                          <textarea
                            rows={2}
                            value={cancellationNote}
                            onChange={(e) => setCancellationNote(e.target.value)}
                            placeholder="Add staff note for customer..."
                            className="w-full p-2.5 rounded-xl border border-[#C7A76C]/30 bg-white text-xs text-[#111614] focus:outline-none"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleProcessCancellation(req.id, 'Accepted')}
                              disabled={processingId === req.id}
                              className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-1 shadow-sm"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accept & Cancel</span>
                            </button>
                            <button
                              onClick={() => handleProcessCancellation(req.id, 'Declined')}
                              disabled={processingId === req.id}
                              className="py-2.5 px-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-xs flex items-center justify-center gap-1 shadow-sm"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Decline</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER DIRECTORY */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-[#EDE6DD] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#EDE6DD]">
                <h3 className="font-serif text-xl font-bold text-[#111614]">Spa Guest Profiles</h3>
                <p className="text-xs text-[#5A7365]">Guest history, contact info, and special therapy preferences.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8F5F0] border-b border-[#EDE6DD] text-[11px] font-semibold text-[#4A6358] uppercase tracking-wider">
                      <th className="py-4 px-6">Customer Name</th>
                      <th className="py-4 px-6">Contact Info</th>
                      <th className="py-4 px-6">Visits</th>
                      <th className="py-4 px-6">Last Visit</th>
                      <th className="py-4 px-6">Therapy Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE6DD] text-xs">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-[#F8F5F0]/60 transition-colors">
                        <td className="py-4 px-6 font-bold text-[#111614]">{c.name}</td>
                        <td className="py-4 px-6">
                          <p className="font-medium text-[#111614]">{c.email}</p>
                          <p className="text-[11px] text-[#4A6358]">{c.phone}</p>
                        </td>
                        <td className="py-4 px-6 font-semibold text-[#111614]">{c.totalBookings} visits</td>
                        <td className="py-4 px-6 text-[#4A6358] font-mono">{c.lastVisit}</td>
                        <td className="py-4 px-6 italic text-[#5A7365] max-w-xs truncate">
                          {c.notes || 'No special therapy notes.'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LOGIN & STAFF ACTIVITY LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#EDE6DD] shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#111614] mb-1">Staff Audit & Operations Trail</h3>
              <p className="text-xs text-[#5A7365] mb-6">Real-time log of staff logins, status changes, and cancellation approvals.</p>

              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div key={log.id} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EDE6DD] text-xs flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#111614]">{log.action}</p>
                      <p className="text-[11px] text-[#5A7365]">{log.details}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#8C857B] shrink-0">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white border border-[#C7A76C]/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#EDE6DD] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C7A76C]">Booking Details</span>
                <h3 className="font-serif text-xl font-bold text-[#111614]">{selectedBooking.bookingRef}</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="p-2 rounded-full text-gray-500 hover:text-black">
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-[#111614]">
              <p>Guest Name: <strong>{selectedBooking.clientName}</strong></p>
              <p>Email: <strong>{selectedBooking.clientEmail}</strong> • Phone: <strong>{selectedBooking.clientPhone}</strong></p>
              <p>Ritual: <strong>{selectedBooking.treatmentName} ({selectedBooking.durationMins} mins)</strong></p>
              <p>Therapist: <strong>{selectedBooking.therapistName}</strong></p>
              <p>Date & Time: <strong>{selectedBooking.bookingDate} at {selectedBooking.timeSlot}</strong></p>
              <p>Total Bill: <strong>₹{selectedBooking.totalPrice.toLocaleString('en-IN')}</strong></p>
              {selectedBooking.advanceAmount ? (
                <p className="text-emerald-700 font-semibold">Advance Token Paid: ₹{selectedBooking.advanceAmount}</p>
              ) : null}
              {selectedBooking.specialNotes && (
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#C7A76C]/30 italic text-[#5A7365]">
                  Notes: "{selectedBooking.specialNotes}"
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <button onClick={() => setSelectedBooking(null)} className="px-6 py-2.5 rounded-full bg-[#1D2B23] text-white text-xs font-semibold">
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
