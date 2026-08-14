'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  Calendar as CalendarIcon,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Edit3,
  X,
  User,
  Phone,
  Mail,
  Sparkles,
} from 'lucide-react'
import {
  Booking,
  saveBooking,
  updateBookingStatus,
  rescheduleBooking,
  isSlotAvailable,
} from '@/lib/adminData'
import { TREATMENTS_DATA, THERAPISTS_DATA } from '@/lib/spaData'
import ConfirmModal from './ConfirmModal'

interface AdminBookingsTabProps {
  bookings: Booking[]
  onRefresh: () => void
}

export default function AdminBookingsTab({ bookings, onRefresh }: AdminBookingsTabProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [therapistFilter, setTherapistFilter] = useState<string>('all')
  const [treatmentFilter, setTreatmentFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('')

  // Modals state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false)

  // Reschedule Form State
  const [rescheduleDate, setRescheduleDate] = useState('')
  const [rescheduleTime, setRescheduleTime] = useState('10:00 AM')

  // Cancel Confirmation Modal State
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null)

  // Add Booking Form State
  const [newClientName, setNewClientName] = useState('')
  const [newClientPhone, setNewClientPhone] = useState('')
  const [newClientEmail, setNewClientEmail] = useState('')
  const [newTreatmentName, setNewTreatmentName] = useState(TREATMENTS_DATA[0].name)
  const [newTherapistName, setNewTherapistName] = useState(THERAPISTS_DATA[0].name)
  const [newBookingDate, setNewBookingDate] = useState(new Date().toISOString().split('T')[0])
  const [newTimeSlot, setNewTimeSlot] = useState('11:00 AM')
  const [newSpecialNotes, setNewSpecialNotes] = useState('')

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.clientPhone.includes(searchTerm)

      const matchStatus = statusFilter === 'all' || b.status === statusFilter
      const matchTherapist = therapistFilter === 'all' || b.therapistName === therapistFilter
      const matchTreatment = treatmentFilter === 'all' || b.treatmentName === treatmentFilter
      const matchDate = !dateFilter || b.bookingDate === dateFilter

      return matchSearch && matchStatus && matchTherapist && matchTreatment && matchDate
    })
  }, [bookings, searchTerm, statusFilter, therapistFilter, treatmentFilter, dateFilter])

  // Handlers
  const handleOpenReschedule = (b: Booking) => {
    setSelectedBooking(b)
    setRescheduleDate(b.bookingDate)
    setRescheduleTime(b.timeSlot)
    setIsRescheduleOpen(true)
  }

  const handleConfirmReschedule = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBooking) return

    if (!isSlotAvailable(rescheduleDate, rescheduleTime, selectedBooking.therapistName)) {
      alert(`⚠️ Slot Unavailable: ${selectedBooking.therapistName} already has a confirmed booking on ${rescheduleDate} at ${rescheduleTime}. Please choose another time or date.`)
      return
    }

    rescheduleBooking(selectedBooking.id, rescheduleDate, rescheduleTime)
    setIsRescheduleOpen(false)
    setSelectedBooking(null)
    onRefresh()
  }

  const handleStatusChange = (id: string, status: Booking['status']) => {
    updateBookingStatus(id, status)
    onRefresh()
  }

  const handleConfirmCancel = () => {
    if (cancelTargetId) {
      updateBookingStatus(cancelTargetId, 'cancelled')
      setCancelTargetId(null)
      onRefresh()
    }
  }

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isSlotAvailable(newBookingDate, newTimeSlot, newTherapistName)) {
      alert(`⚠️ Slot Collision Warning: ${newTherapistName} is already booked on ${newBookingDate} at ${newTimeSlot}. Please select a different time slot or specialist.`)
      return
    }

    const selectedTreat = TREATMENTS_DATA.find((t) => t.name === newTreatmentName)
    const price = selectedTreat ? selectedTreat.priceINR : 4500
    const duration = selectedTreat ? (selectedTreat.durations?.[0] || 60) : 60

    saveBooking({
      clientName: newClientName,
      clientPhone: newClientPhone,
      clientEmail: newClientEmail,
      treatmentName: newTreatmentName,
      therapistName: newTherapistName,
      bookingDate: newBookingDate,
      timeSlot: newTimeSlot,
      durationMins: duration,
      totalPrice: price,
      specialNotes: newSpecialNotes,
      status: 'confirmed',
    })

    setIsAddBookingOpen(false)
    // Reset Form
    setNewClientName('')
    setNewClientPhone('')
    setNewClientEmail('')
    setNewSpecialNotes('')
    onRefresh()
  }

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8B59A]/15 text-[#3A4D41] text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#A8B59A]" />
            <span>Confirmed</span>
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Completed</span>
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            <span>Cancelled</span>
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C7A76C]/15 text-[#9A7A3B] text-xs font-semibold">
            <span>Pending</span>
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Action & Filter Bar */}
      <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#111614]">Spa Appointments</h2>
            <p className="text-xs text-[#4A6358]">Filter, reschedule, confirm, or manage master bookings.</p>
          </div>

          <button
            onClick={() => setIsAddBookingOpen(true)}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] hover:from-[#C7A76C] hover:to-[#9A7A3B] text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Booking</span>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C857B]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search client, ref#, phone..."
              className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-xs text-[#111614] placeholder:text-gray-400 focus:outline-none focus:border-[#C7A76C]"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C857B]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-xs text-[#111614] focus:outline-none focus:border-[#C7A76C]"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Therapist Filter */}
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C857B]" />
            <select
              value={therapistFilter}
              onChange={(e) => setTherapistFilter(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-xs text-[#111614] focus:outline-none focus:border-[#C7A76C]"
            >
              <option value="all">All Therapists</option>
              {THERAPISTS_DATA.map((th) => (
                <option key={th.id} value={th.name}>
                  {th.name}
                </option>
              ))}
            </select>
          </div>

          {/* Treatment Filter */}
          <div className="relative">
            <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C857B]" />
            <select
              value={treatmentFilter}
              onChange={(e) => setTreatmentFilter(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-xs text-[#111614] focus:outline-none focus:border-[#C7A76C]"
            >
              <option value="all">All Treatments</option>
              {TREATMENTS_DATA.map((tr) => (
                <option key={tr.id} value={tr.name}>
                  {tr.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C857B]" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-xs text-[#111614] focus:outline-none focus:border-[#C7A76C]"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F5F0] border-b border-[#EEE6DA] text-[11px] font-semibold text-[#4A6358] uppercase tracking-wider">
                <th className="py-4 px-6">Booking Ref</th>
                <th className="py-4 px-6">Client Name</th>
                <th className="py-4 px-6">Treatment Ritual</th>
                <th className="py-4 px-6">Therapist</th>
                <th className="py-4 px-6">Date & Time</th>
                <th className="py-4 px-6">Total Price</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEE6DA] text-xs">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#8C857B]">
                    No spa bookings found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F8F5F0]/60 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-[#C7A76C]">{b.bookingRef}</td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-[#111614]">{b.clientName}</p>
                      <p className="text-[11px] text-[#4A6358] font-light">{b.clientPhone}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-[#111614]">{b.treatmentName}</p>
                      <p className="text-[10px] text-[#A8B59A]">{b.durationMins} mins</p>
                    </td>
                    <td className="py-4 px-6 text-[#3A4D41] font-medium">{b.therapistName}</td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-[#111614]">{b.bookingDate}</p>
                      <p className="text-[11px] text-[#C7A76C]">{b.timeSlot}</p>
                    </td>
                    <td className="py-4 px-6 font-bold text-[#111614]">
                      ₹{b.totalPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(b.status)}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Details */}
                        <button
                          onClick={() => {
                            setSelectedBooking(b)
                            setIsDetailsOpen(true)
                          }}
                          title="View Details"
                          className="p-2 rounded-full hover:bg-[#A8B59A]/15 text-[#3A4D41] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Reschedule */}
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => handleOpenReschedule(b)}
                            title="Reschedule"
                            className="p-2 rounded-full hover:bg-[#C7A76C]/15 text-[#9A7A3B] transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}

                        {/* Complete */}
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'completed')}
                            title="Mark Completed"
                            className="p-2 rounded-full hover:bg-emerald-100 text-emerald-700 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {/* Cancel */}
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => setCancelTargetId(b.id)}
                            title="Cancel Booking"
                            className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details View Modal */}
      {isDetailsOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FCFBF8] border border-[#C7A76C]/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsDetailsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#4A6358] hover:text-[#111614]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 border-b border-[#EEE6DA] pb-4">
              <div className="w-10 h-10 rounded-full bg-[#C7A76C]/10 border border-[#C7A76C]/30 flex items-center justify-center text-[#C7A76C]">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#111614]">Booking Specification</h3>
                <p className="text-xs text-[#C7A76C] font-mono font-semibold">{selectedBooking.bookingRef}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#F8F5F0] space-y-2">
                <p className="font-semibold text-[#4A6358] uppercase tracking-wider text-[10px]">Client Information</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[#8C857B]">Name:</span>
                    <p className="font-bold text-[#111614]">{selectedBooking.clientName}</p>
                  </div>
                  <div>
                    <span className="text-[#8C857B]">Phone:</span>
                    <p className="font-bold text-[#111614]">{selectedBooking.clientPhone}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#8C857B]">Email:</span>
                    <p className="font-bold text-[#111614]">{selectedBooking.clientEmail}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F5F0] space-y-2">
                <p className="font-semibold text-[#4A6358] uppercase tracking-wider text-[10px]">Treatment & Practitioner</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[#8C857B]">Treatment:</span>
                    <p className="font-bold text-[#111614]">{selectedBooking.treatmentName}</p>
                  </div>
                  <div>
                    <span className="text-[#8C857B]">Therapist:</span>
                    <p className="font-bold text-[#111614]">{selectedBooking.therapistName}</p>
                  </div>
                  <div>
                    <span className="text-[#8C857B]">Scheduled Date:</span>
                    <p className="font-bold text-[#111614]">{selectedBooking.bookingDate}</p>
                  </div>
                  <div>
                    <span className="text-[#8C857B]">Time Slot:</span>
                    <p className="font-bold text-[#C7A76C]">{selectedBooking.timeSlot}</p>
                  </div>
                </div>
              </div>

              {selectedBooking.specialNotes && (
                <div className="p-4 rounded-2xl bg-[#F8F5F0]">
                  <p className="font-semibold text-[#4A6358] uppercase tracking-wider text-[10px] mb-1">
                    Special Health / Massage Notes
                  </p>
                  <p className="text-[#111614] italic">{selectedBooking.specialNotes}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-semibold text-[#111614]">Total Price:</span>
                <span className="font-serif text-2xl font-bold text-[#C7A76C]">
                  ₹{selectedBooking.totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EEE6DA] flex justify-end">
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#A8B59A] text-white font-semibold text-xs"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {isRescheduleOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FCFBF8] border border-[#C7A76C]/30 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsRescheduleOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#4A6358] hover:text-[#111614]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#111614] mb-2">Reschedule Appointment</h3>
            <p className="text-xs text-[#4A6358] mb-6">
              Update appointment date and time slot for {selectedBooking.clientName} ({selectedBooking.bookingRef}).
            </p>

            <form onSubmit={handleConfirmReschedule} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">New Date</label>
                <input
                  type="date"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614] focus:outline-none focus:border-[#C7A76C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">New Time Slot</label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614] focus:outline-none focus:border-[#C7A76C]"
                >
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EEE6DA]">
                <button
                  type="button"
                  onClick={() => setIsRescheduleOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#C7A76C] text-white font-semibold text-xs shadow-md"
                >
                  Save Rescheduled Date
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Booking Modal */}
      {isAddBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FCFBF8] border border-[#C7A76C]/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setIsAddBookingOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#4A6358] hover:text-[#111614]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#111614] mb-1">Create Manual Appointment</h3>
            <p className="text-xs text-[#4A6358] mb-6">Enter guest and treatment specifications.</p>

            <form onSubmit={handleCreateBooking} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="Guest Full Name"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Client Email</label>
                <input
                  type="email"
                  required
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Select Ritual</label>
                  <select
                    value={newTreatmentName}
                    onChange={(e) => setNewTreatmentName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  >
                    {TREATMENTS_DATA.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} (₹{t.priceINR})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Select Therapist</label>
                  <select
                    value={newTherapistName}
                    onChange={(e) => setNewTherapistName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  >
                    {THERAPISTS_DATA.map((th) => (
                      <option key={th.id} value={th.name}>
                        {th.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newBookingDate}
                    onChange={(e) => setNewBookingDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Time Slot</label>
                  <select
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Special Notes</label>
                <textarea
                  rows={2}
                  value={newSpecialNotes}
                  onChange={(e) => setNewSpecialNotes(e.target.value)}
                  placeholder="Allergies, pressure preferences, or health notes..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EEE6DA]">
                <button
                  type="button"
                  onClick={() => setIsAddBookingOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#A8B59A] hover:bg-[#C7A76C] text-white font-semibold text-xs shadow-md transition-colors"
                >
                  Confirm & Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Cancelling */}
      <ConfirmModal
        isOpen={Boolean(cancelTargetId)}
        title="Cancel Appointment?"
        message="Are you sure you want to mark this spa appointment as CANCELLED? This action updates the client's status."
        confirmText="Yes, Cancel Booking"
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelTargetId(null)}
      />
    </div>
  )
}
