'use client'

import { TREATMENTS_DATA, THERAPISTS_DATA, Treatment, Therapist } from './spaData'

export interface Booking {
  id: string
  bookingRef: string
  clientName: string
  clientPhone: string
  clientEmail: string
  treatmentName: string
  durationMins: number
  therapistName: string
  bookingDate: string // YYYY-MM-DD
  timeSlot: string
  addons: string[]
  totalPrice: number
  advanceAmount?: number
  paymentMethod?: 'UPI' | 'Bank Transfer' | 'Pay at Spa (COD)'
  discountApplied?: number
  specialNotes?: string
  status: 'confirmed' | 'completed' | 'cancelled' | 'pending'
  createdAt: string
}

export interface Expense {
  id: string
  category: 'Botanical Supplies' | 'Medical Sterilization' | 'Staff Payroll' | 'Utilities & Suites' | 'Marketing' | 'Other'
  amount: number
  date: string // YYYY-MM-DD
  description: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalBookings: number
  totalSpent: number
  rewardBalance?: number // Current available redeemable rewards cash
  totalRedeemed?: number // Total accumulated redeemed rewards cash
  lastVisit: string
  registeredAt: string
  notes?: string
}

export interface ActivityLog {
  id: string
  action: string
  details: string
  timestamp: string
}

const STORAGE_KEY_BOOKINGS = 'bloom_admin_bookings'
const STORAGE_KEY_TREATMENTS = 'bloom_admin_treatments'
const STORAGE_KEY_THERAPISTS = 'bloom_admin_therapists'
const STORAGE_KEY_EXPENSES = 'bloom_admin_expenses'
const STORAGE_KEY_CUSTOMERS = 'bloom_admin_customers'
const STORAGE_KEY_LOGS = 'bloom_admin_logs'

// Seed Initial Bookings
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-101',
    bookingRef: 'BLM-92841',
    clientName: 'Priya Sharma',
    clientPhone: '+91 98765 43210',
    clientEmail: 'priya.sharma@example.com',
    treatmentName: 'Japanese Zen Aromatherapy',
    durationMins: 90,
    therapistName: 'Aria Takahashi',
    bookingDate: new Date().toISOString().split('T')[0],
    timeSlot: '11:00 AM',
    addons: ['Warm Herbal Foot Soak'],
    totalPrice: 4800,
    specialNotes: 'Prefers lavender essential oil and medium pressure.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'b-102',
    bookingRef: 'BLM-88120',
    clientName: 'Rahul Verma',
    clientPhone: '+91 98123 45678',
    clientEmail: 'rahul.v@example.com',
    treatmentName: 'Deep Tissue Muscle Recovery',
    durationMins: 90,
    therapistName: 'David Vance',
    bookingDate: new Date().toISOString().split('T')[0],
    timeSlot: '02:30 PM',
    addons: ['Hyperbaric Oxygen Inhalation'],
    totalPrice: 5900,
    specialNotes: 'Focus on lumbar region and upper trapezii.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'b-103',
    bookingRef: 'BLM-74192',
    clientName: 'Ananya Deshmukh',
    clientPhone: '+91 99001 12233',
    clientEmail: 'ananya.d@example.com',
    treatmentName: 'Hot Volcanic Stone Massage',
    durationMins: 75,
    therapistName: 'Helen Lin',
    bookingDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    timeSlot: '04:00 PM',
    addons: [],
    totalPrice: 5200,
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'b-104',
    bookingRef: 'BLM-65011',
    clientName: 'Vikram Mehta',
    clientPhone: '+91 97654 32109',
    clientEmail: 'v.mehta@example.com',
    treatmentName: 'Scandinavian Sauna & Cold Plunge',
    durationMins: 60,
    therapistName: 'Aria Takahashi',
    bookingDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    addons: ['Organic Cold-Pressed Elixir'],
    totalPrice: 3800,
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'b-105',
    bookingRef: 'BLM-53210',
    clientName: 'Kavita Nair',
    clientPhone: '+91 94432 10987',
    clientEmail: 'kavita.nair@example.com',
    treatmentName: 'Botanical Facial Glow',
    durationMins: 60,
    therapistName: 'Helen Lin',
    bookingDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '12:00 PM',
    addons: [],
    totalPrice: 4200,
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
]

// Seed Initial Expenses
const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'e-201',
    category: 'Botanical Supplies',
    amount: 14500,
    date: new Date().toISOString().split('T')[0],
    description: 'Single-origin Coorg lavender and eucalyptus oils restock',
  },
  {
    id: 'e-202',
    category: 'Medical Sterilization',
    amount: 8200,
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    description: 'HEPA-14 filter replacements & UV-C lamp maintenance',
  },
  {
    id: 'e-203',
    category: 'Utilities & Suites',
    amount: 22000,
    date: new Date(Date.now() - 86400000 * 7).toISOString().split('T')[0],
    description: 'Geothermal bath heating & climate control power bill',
  },
  {
    id: 'e-204',
    category: 'Staff Payroll',
    amount: 95000,
    date: new Date(Date.now() - 86400000 * 12).toISOString().split('T')[0],
    description: 'Master therapist fortnightly stipend & certification bonuses',
  },
]

// Seed Initial Customers
const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'c-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    totalBookings: 6,
    totalSpent: 28800,
    lastVisit: new Date().toISOString().split('T')[0],
    registeredAt: '2025-06-12',
    notes: 'Prefers quiet sessions and organic tea after treatments.',
  },
  {
    id: 'c-2',
    name: 'Rahul Verma',
    email: 'rahul.v@example.com',
    phone: '+91 98123 45678',
    totalBookings: 4,
    totalSpent: 23600,
    lastVisit: new Date().toISOString().split('T')[0],
    registeredAt: '2025-08-01',
    notes: 'Regular deep tissue client.',
  },
  {
    id: 'c-3',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@example.com',
    phone: '+91 99001 12233',
    totalBookings: 8,
    totalSpent: 41600,
    lastVisit: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    registeredAt: '2025-01-15',
    notes: 'BLOOM Gold Circle Member.',
  },
  {
    id: 'c-4',
    name: 'Vikram Mehta',
    email: 'v.mehta@example.com',
    phone: '+91 97654 32109',
    totalBookings: 3,
    totalSpent: 11400,
    lastVisit: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    registeredAt: '2025-09-10',
  },
]

// Helper function to read from localStorage with fallback
function loadData<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const item = localStorage.getItem(key)
    if (item) return JSON.parse(item)
  } catch (e) {
    console.error(`Failed loading ${key} from localStorage`, e)
  }
  return fallback
}

// Helper function to write to localStorage
function saveData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error(`Failed saving ${key} to localStorage`, e)
  }
}

// Log admin action
export function logAdminActivity(action: string, details: string) {
  const logs = loadData<ActivityLog[]>(STORAGE_KEY_LOGS, [])
  const newLog: ActivityLog = {
    id: 'log-' + Date.now(),
    action,
    details,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  }
  saveData(STORAGE_KEY_LOGS, [newLog, ...logs.slice(0, 49)]) // Keep last 50 logs
}

export function getActivityLogs(): ActivityLog[] {
  return loadData<ActivityLog[]>(STORAGE_KEY_LOGS, [
    {
      id: 'log-1',
      action: 'System Startup',
      details: 'Staff & Admin Concierge Services Active',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    },
  ])
}

export function getAdminLogs(): ActivityLog[] {
  return loadData<ActivityLog[]>(STORAGE_KEY_LOGS, [
    {
      id: 'log-1',
      action: 'Admin Session Started',
      details: 'System authenticated master admin',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    },
  ])
}

/* ============================================================
   BOOKINGS API
============================================================ */
export function getBookings(): Booking[] {
  return loadData<Booking[]>(STORAGE_KEY_BOOKINGS, INITIAL_BOOKINGS)
}

export function saveBooking(booking: Partial<Booking> & { id?: string }): Booking {
  const list = getBookings()
  let result: Booking

  if (booking.id) {
    list.map((b) => (b.id === booking.id ? (result = { ...b, ...booking } as Booking) : b))
    const updated = list.map((b) => (b.id === booking.id ? ({ ...b, ...booking } as Booking) : b))
    saveData(STORAGE_KEY_BOOKINGS, updated)
    result = updated.find((b) => b.id === booking.id)!
    logAdminActivity('Updated Booking', `Booking ${result.bookingRef} updated. Status: ${result.status}`)
  } else {
    const newId = 'b-' + Date.now()
    const ref = 'BLM-' + Math.floor(10000 + Math.random() * 90000)
    result = {
      id: newId,
      bookingRef: ref,
      clientName: booking.clientName || 'Guest Client',
      clientPhone: booking.clientPhone || '+91 99000 00000',
      clientEmail: booking.clientEmail || 'guest@example.com',
      treatmentName: booking.treatmentName || 'Japanese Zen Aromatherapy',
      durationMins: booking.durationMins || 60,
      therapistName: booking.therapistName || 'Aria Takahashi',
      bookingDate: booking.bookingDate || new Date().toISOString().split('T')[0],
      timeSlot: booking.timeSlot || '10:00 AM',
      addons: booking.addons || [],
      totalPrice: booking.totalPrice || 4500,
      specialNotes: booking.specialNotes,
      status: booking.status || 'confirmed',
      createdAt: new Date().toISOString(),
    }
    saveData(STORAGE_KEY_BOOKINGS, [result, ...list])
    logAdminActivity('Created Booking', `New booking ${ref} created for ${result.clientName}`)

    // Count visit in customer profile & membership record
    recordCustomerVisit(result.clientName, result.clientEmail, result.clientPhone, result.totalPrice, result.bookingDate)

    // Dispatch Email Notification & Print in Server Terminal Console
    import('./emailService').then(({ sendEmailNotification }) => {
      sendEmailNotification({
        to: result.clientEmail,
        subject: `🌸 BLOOM Wellness Spa - Booking Confirmation [${result.bookingRef}]`,
        type: 'BOOKING_CONFIRMATION',
        data: {
          bookingRef: result.bookingRef,
          clientName: result.clientName,
          clientEmail: result.clientEmail,
          treatmentName: result.treatmentName,
          bookingDate: result.bookingDate,
          timeSlot: result.timeSlot,
          therapistName: result.therapistName,
          totalPrice: result.totalPrice,
          advanceAmount: result.advanceAmount || 300,
        },
      }).catch(() => {})
    })

    // Asynchronously push to live Supabase backend
    import('./supabaseService').then(({ createBookingInSupabase }) => {
      createBookingInSupabase({
        bookingRef: result.bookingRef,
        clientName: result.clientName,
        clientPhone: result.clientPhone,
        clientEmail: result.clientEmail,
        selectedTreatment: result.treatmentName,
        selectedDuration: result.durationMins,
        selectedTherapist: result.therapistName,
        selectedDate: result.bookingDate,
        selectedTimeSlot: result.timeSlot,
        selectedAddons: result.addons,
        totalPrice: result.totalPrice,
        specialNotes: result.specialNotes,
      }).catch((err) => console.warn('Supabase async sync note:', err))
    })
  }

  return result
}

export function getCustomerRewardBalance(clientEmail: string): number {
  const customersList = getCustomers()
  const cleanEmail = clientEmail.trim().toLowerCase()
  const found = customersList.find((c) => c.email.toLowerCase() === cleanEmail)
  if (!found) return 0
  const lifetimeEarned = Math.floor((found.totalSpent || 0) / 1500) * 100
  const redeemed = found.totalRedeemed || 0
  return Math.max(0, lifetimeEarned - redeemed)
}

export function recordCustomerVisit(
  clientName: string,
  clientEmail: string,
  clientPhone: string,
  amount: number,
  visitDate: string
) {
  const customersList = getCustomers()
  const cleanEmail = clientEmail.trim().toLowerCase()
  const existing = customersList.find((c) => c.email.toLowerCase() === cleanEmail)

  if (existing) {
    const newVisits = (existing.totalBookings || 0) + 1
    const newTotalSpent = (existing.totalSpent || 0) + amount
    const lifetimeEarned = Math.floor(newTotalSpent / 1500) * 100
    const redeemed = existing.totalRedeemed || 0
    const available = Math.max(0, lifetimeEarned - redeemed)

    saveCustomer({
      id: existing.id,
      totalBookings: newVisits,
      totalSpent: newTotalSpent,
      rewardBalance: available,
      lastVisit: visitDate,
    })
    logAdminActivity('Membership Visit & Reward Updated', `Visit recorded for ${existing.name}. Total spend: ₹${newTotalSpent.toLocaleString('en-IN')}. Available reward cash: ₹${available} (Total Redeemed: ₹${redeemed})`)
  } else {
    const initialSpent = amount
    const initialRewards = Math.floor(initialSpent / 1500) * 100

    saveCustomer({
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      totalBookings: 1,
      totalSpent: initialSpent,
      rewardBalance: initialRewards,
      totalRedeemed: 0,
      lastVisit: visitDate,
      registeredAt: visitDate,
      notes: 'Registered via appointment booking',
    })
    logAdminActivity('New Client & Visit Registered', `Created profile for ${clientName}. Initial spend: ₹${initialSpent}. Reward cash credited: ₹${initialRewards}`)
  }
}

export function redeemCustomerRewards(clientEmail: string, amount: number): boolean {
  const customersList = getCustomers()
  const cleanEmail = clientEmail.trim().toLowerCase()
  const found = customersList.find((c) => c.email.toLowerCase() === cleanEmail)

  if (!found) return false
  const currentAvailable = getCustomerRewardBalance(clientEmail)
  if (currentAvailable < amount) return false

  const newTotalRedeemed = (found.totalRedeemed || 0) + amount
  const lifetimeEarned = Math.floor((found.totalSpent || 0) / 1500) * 100
  const newAvailable = Math.max(0, lifetimeEarned - newTotalRedeemed)

  saveCustomer({
    id: found.id,
    totalRedeemed: newTotalRedeemed,
    rewardBalance: newAvailable,
  })
  logAdminActivity('Reward Redeemed & Reset', `Redeemed ₹${amount} spa credits for ${found.name}. Total Redeemed: ₹${newTotalRedeemed}. Remaining available balance: ₹${newAvailable}`)
  return true
}

export function isSlotAvailable(date: string, timeSlot: string, therapistName: string): boolean {
  const allBookings = getBookings()
  const cleanDate = date.trim()
  const cleanTime = timeSlot.trim()
  const cleanTherapist = therapistName.trim().toLowerCase()

  const collision = allBookings.find((b) => {
    if (b.status === 'cancelled') return false
    const sameDate = b.bookingDate === cleanDate
    const sameTime = b.timeSlot === cleanTime

    if (!sameDate || !sameTime) return false

    if (cleanTherapist.includes('any master') || b.therapistName.toLowerCase().includes('any master')) {
      return true
    }
    return b.therapistName.toLowerCase() === cleanTherapist
  })

  return !collision
}

export function updateBookingStatus(id: string, status: Booking['status']): void {
  const list = getBookings()
  const updated = list.map((b) => (b.id === id ? { ...b, status } : b))
  saveData(STORAGE_KEY_BOOKINGS, updated)
  const target = list.find((b) => b.id === id)
  if (target) {
    logAdminActivity('Changed Booking Status', `Booking ${target.bookingRef} marked as ${status.toUpperCase()}`)
  }
}

export function rescheduleBooking(id: string, newDate: string, newTime: string): void {
  const list = getBookings()
  const updated = list.map((b) => (b.id === id ? { ...b, bookingDate: newDate, timeSlot: newTime } : b))
  saveData(STORAGE_KEY_BOOKINGS, updated)
  const target = list.find((b) => b.id === id)
  if (target) {
    logAdminActivity('Rescheduled Booking', `Booking ${target.bookingRef} rescheduled to ${newDate} at ${newTime}`)
  }
}

/* ============================================================
   TREATMENTS API
============================================================ */
export interface AdminTreatment {
  id: string
  name: string
  subtitle: string
  category: 'relaxation' | 'pain-relief' | 'holistic' | 'thermal' | string
  priceINR: number
  durations: number[]
  durationMins?: number
  description: string
  benefits?: string[]
  bestFor?: string[]
  available: boolean
}

export function getTreatments(): AdminTreatment[] {
  const loaded = loadData<AdminTreatment[]>(STORAGE_KEY_TREATMENTS, [])
  if (loaded.length > 0) return loaded

  // Seed default treatments from TREATMENTS_DATA
  const seeded = TREATMENTS_DATA.map((t) => ({ ...t, available: true }))
  saveData(STORAGE_KEY_TREATMENTS, seeded)
  return seeded
}

export function saveTreatment(treatment: Partial<AdminTreatment> & { id?: string }): AdminTreatment {
  const list = getTreatments()
  let result: AdminTreatment

  if (treatment.id) {
    const updated = list.map((t) => (t.id === treatment.id ? ({ ...t, ...treatment } as AdminTreatment) : t))
    saveData(STORAGE_KEY_TREATMENTS, updated)
    result = updated.find((t) => t.id === treatment.id)!
    logAdminActivity('Updated Treatment', `Treatment "${result.name}" details updated. Price: ₹${result.priceINR}`)
  } else {
    const slugId = (treatment.name || 'new-treatment').toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const durMins = treatment.durationMins || (treatment.durations && treatment.durations[0]) || 60
    result = {
      id: slugId + '-' + Date.now().toString().slice(-4),
      name: treatment.name || 'New Custom Ritual',
      subtitle: treatment.subtitle || 'Holistic Wellness Ritual',
      category: (treatment.category as AdminTreatment['category']) || 'relaxation',
      priceINR: treatment.priceINR || 4500,
      durations: treatment.durations || [durMins],
      durationMins: durMins,
      description: treatment.description || 'Custom crafted spa therapy session.',
      benefits: treatment.benefits || ['Relieves stress', 'Restores vitality'],
      bestFor: treatment.bestFor || ['All guests'],
      available: treatment.available ?? true,
    }
    saveData(STORAGE_KEY_TREATMENTS, [result, ...list])
    logAdminActivity('Created Treatment', `Added new treatment "${result.name}" (₹${result.priceINR})`)
  }

  return result
}

export function deleteTreatment(id: string): void {
  const list = getTreatments()
  const target = list.find((t) => t.id === id)
  const filtered = list.filter((t) => t.id !== id)
  saveData(STORAGE_KEY_TREATMENTS, filtered)
  if (target) {
    logAdminActivity('Deleted Treatment', `Removed treatment "${target.name}"`)
  }
}

/* ============================================================
   THERAPISTS API
============================================================ */
export interface AdminTherapist extends Therapist {
  available: boolean
  experience?: string
}

export function getTherapists(): AdminTherapist[] {
  const loaded = loadData<AdminTherapist[]>(STORAGE_KEY_THERAPISTS, [])
  if (loaded.length > 0) return loaded

  const seeded = THERAPISTS_DATA.map((t) => ({ ...t, available: true, experience: `${t.experienceYears}+ Years` }))
  saveData(STORAGE_KEY_THERAPISTS, seeded)
  return seeded
}

export function saveTherapist(therapist: Partial<AdminTherapist> & { id?: string }): AdminTherapist {
  const list = getTherapists()
  let result: AdminTherapist

  if (therapist.id) {
    const updated = list.map((t) => (t.id === therapist.id ? ({ ...t, ...therapist } as AdminTherapist) : t))
    saveData(STORAGE_KEY_THERAPISTS, updated)
    result = updated.find((t) => t.id === therapist.id)!
    logAdminActivity('Updated Therapist', `Therapist "${result.name}" profile updated.`)
  } else {
    const slugId = (therapist.name || 'therapist').toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const expYears = therapist.experienceYears || (therapist.experience ? parseInt(therapist.experience) || 8 : 8)
    result = {
      id: slugId + '-' + Date.now().toString().slice(-4),
      name: therapist.name || 'Master Practitioner',
      title: therapist.title || 'Senior Holistic Specialist',
      experienceYears: expYears,
      experience: therapist.experience || `${expYears}+ Years`,
      certifications: therapist.certifications || ['CIDESCO International'],
      specialties: therapist.specialties || ['Swedish Massage', 'Aromatherapy'],
      quote: therapist.quote || 'Restoration & Harmony',
      featuredRitual: therapist.featuredRitual || 'Serenity Ritual',
      bio: therapist.bio || 'Experienced practitioner dedicated to clinical precision and gentle restoration.',
      clientRating: therapist.clientRating || 4.9,
      reviewsCount: therapist.reviewsCount || 50,
      reviewQuote: therapist.reviewQuote || 'Excellent service',
      clientName: therapist.clientName || 'Guest Client',
      avatarBg: therapist.avatarBg || 'from-[#C5A059] to-[#9A7A3B]',
      availableToday: therapist.availableToday ?? true,
      available: therapist.available ?? true,
    }
    saveData(STORAGE_KEY_THERAPISTS, [result, ...list])
    logAdminActivity('Added Therapist', `Added practitioner "${result.name}"`)
  }

  return result
}

export function deleteTherapist(id: string): void {
  const list = getTherapists()
  const target = list.find((t) => t.id === id)
  const filtered = list.filter((t) => t.id !== id)
  saveData(STORAGE_KEY_THERAPISTS, filtered)
  if (target) {
    logAdminActivity('Removed Therapist', `Removed therapist "${target.name}"`)
  }
}

/* ============================================================
   FINANCIALS & EXPENSES API
============================================================ */
export function getExpenses(): Expense[] {
  return loadData<Expense[]>(STORAGE_KEY_EXPENSES, INITIAL_EXPENSES)
}

export function saveExpense(expense: Omit<Expense, 'id'> & { id?: string }): Expense {
  const list = getExpenses()
  let result: Expense

  if (expense.id) {
    const updated = list.map((e) => (e.id === expense.id ? ({ ...e, ...expense } as Expense) : e))
    saveData(STORAGE_KEY_EXPENSES, updated)
    result = updated.find((e) => e.id === expense.id)!
    logAdminActivity('Updated Expense', `Expense "${result.description}" updated (₹${result.amount})`)
  } else {
    result = {
      id: 'e-' + Date.now(),
      category: expense.category || 'Botanical Supplies',
      amount: expense.amount || 1000,
      date: expense.date || new Date().toISOString().split('T')[0],
      description: expense.description || 'General operational expense',
    }
    saveData(STORAGE_KEY_EXPENSES, [result, ...list])
    logAdminActivity('Recorded Expense', `Recorded expense of ₹${result.amount} under ${result.category}`)
  }

  return result
}

export function deleteExpense(id: string): void {
  const list = getExpenses()
  const target = list.find((e) => e.id === id)
  const filtered = list.filter((e) => e.id !== id)
  saveData(STORAGE_KEY_EXPENSES, filtered)
  if (target) {
    logAdminActivity('Deleted Expense', `Removed expense record "${target.description}" (₹${target.amount})`)
  }
}

/* ============================================================
   CUSTOMERS API
============================================================ */
export function getCustomers(): Customer[] {
  return loadData<Customer[]>(STORAGE_KEY_CUSTOMERS, INITIAL_CUSTOMERS)
}

export function saveCustomer(customer: Partial<Customer> & { id?: string }): Customer {
  const list = getCustomers()
  let result: Customer

  if (customer.id) {
    const updated = list.map((c) => (c.id === customer.id ? ({ ...c, ...customer } as Customer) : c))
    saveData(STORAGE_KEY_CUSTOMERS, updated)
    result = updated.find((c) => c.id === customer.id)!
  } else {
    result = {
      id: 'c-' + Date.now(),
      name: customer.name || 'New Client',
      email: customer.email || 'client@example.com',
      phone: customer.phone || '+91 90000 00000',
      totalBookings: customer.totalBookings || 1,
      totalSpent: customer.totalSpent || 4000,
      lastVisit: customer.lastVisit || new Date().toISOString().split('T')[0],
      registeredAt: new Date().toISOString().split('T')[0],
      notes: customer.notes,
    }
    saveData(STORAGE_KEY_CUSTOMERS, [result, ...list])
  }

  return result
}

/* ============================================================
   RESET SYSTEM DATA
============================================================ */
export function resetSystemData(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY_BOOKINGS)
  localStorage.removeItem(STORAGE_KEY_TREATMENTS)
  localStorage.removeItem(STORAGE_KEY_THERAPISTS)
  localStorage.removeItem(STORAGE_KEY_EXPENSES)
  localStorage.removeItem(STORAGE_KEY_CUSTOMERS)
  localStorage.removeItem(STORAGE_KEY_LOGS)
  localStorage.removeItem(STORAGE_KEY_CANCELLATIONS)
  logAdminActivity('Reset Data', 'Admin reset system records to default baseline')
}

/* ============================================================
   STAFF AUTH & CANCELLATION REQUESTS API
============================================================ */
export interface CancellationRequest {
  id: string
  bookingId: string
  bookingRef: string
  clientName: string
  clientEmail: string
  clientPhone: string
  treatmentName: string
  bookingDate: string
  reason: string
  requestDate: string
  status: 'Pending' | 'Accepted' | 'Declined'
  staffResponse?: string
  reviewedAt?: string
  reviewedBy?: string
}

const STORAGE_KEY_CANCELLATIONS = 'bloom_admin_cancellation_requests'
const STORAGE_KEY_STAFF_AUTH = 'bloom_staff_authenticated'

const INITIAL_CANCELLATIONS: CancellationRequest[] = [
  {
    id: 'CR-48291',
    bookingId: 'b-102',
    bookingRef: 'BLM-88120',
    clientName: 'Rahul Verma',
    clientEmail: 'rahul.v@example.com',
    clientPhone: '+91 98123 45678',
    treatmentName: 'Deep Tissue Muscle Recovery',
    bookingDate: new Date().toISOString().split('T')[0],
    reason: 'Emergency business travel commitment.',
    requestDate: new Date(Date.now() - 7200000).toISOString(),
    status: 'Pending',
  },
]

export function isStaffAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY_STAFF_AUTH) === 'true'
}

export function setStaffAuthenticated(status: boolean): void {
  if (typeof window === 'undefined') return
  if (status) {
    localStorage.setItem(STORAGE_KEY_STAFF_AUTH, 'true')
    logAdminActivity('Staff Login', 'Staff member logged into Staff Portal')
  } else {
    localStorage.removeItem(STORAGE_KEY_STAFF_AUTH)
    logAdminActivity('Staff Logout', 'Staff member logged out of Staff Portal')
  }
}

export function getCancellationRequests(): CancellationRequest[] {
  return loadData<CancellationRequest[]>(STORAGE_KEY_CANCELLATIONS, INITIAL_CANCELLATIONS)
}

export function createCancellationRequest(data: {
  bookingId: string
  bookingRef: string
  clientName: string
  clientEmail: string
  clientPhone: string
  treatmentName: string
  bookingDate: string
  reason: string
}): CancellationRequest {
  const requests = getCancellationRequests()
  const newReq: CancellationRequest = {
    id: `CR-${Math.floor(10000 + Math.random() * 90000)}`,
    ...data,
    requestDate: new Date().toISOString(),
    status: 'Pending',
  }
  const updated = [newReq, ...requests]
  saveData(STORAGE_KEY_CANCELLATIONS, updated)
  logAdminActivity('Cancellation Request Created', `Cancellation request submitted for ${data.bookingRef} by ${data.clientName}`)

  try {
    const { createCancellationRequestInSupabase } = require('./supabaseService')
    createCancellationRequestInSupabase(newReq)
  } catch {
    // async fallback
  }

  // Dispatch Email Notification & Print in Terminal
  import('./emailService').then(({ sendEmailNotification }) => {
    sendEmailNotification({
      to: data.clientEmail,
      subject: `⏳ BLOOM Spa - Cancellation Request Submitted [${data.bookingRef}]`,
      type: 'CANCELLATION_REQUESTED',
      data: {
        bookingRef: data.bookingRef,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        treatmentName: data.treatmentName,
        bookingDate: data.bookingDate,
        reason: data.reason,
      },
    }).catch(() => {})
  })

  return newReq
}

export function processCancellationRequest(
  requestId: string,
  action: 'Accepted' | 'Declined',
  staffResponse?: string
): boolean {
  const requests = getCancellationRequests()
  const idx = requests.findIndex((r) => r.id === requestId || r.bookingRef === requestId)
  if (idx === -1) return false

  const req = requests[idx]
  req.status = action
  req.staffResponse = staffResponse || (action === 'Accepted' ? 'Cancellation approved by Concierge.' : 'Cancellation declined by Concierge.')
  req.reviewedAt = new Date().toISOString()
  req.reviewedBy = 'Spa Concierge Staff'

  requests[idx] = req
  saveData(STORAGE_KEY_CANCELLATIONS, requests)

  // If Accepted, change booking status to 'cancelled'
  if (action === 'Accepted') {
    const bookings = getBookings()
    const bIdx = bookings.findIndex((b) => b.bookingRef === req.bookingRef || b.id === req.bookingId)
    if (bIdx !== -1) {
      bookings[bIdx].status = 'cancelled'
      saveBooking(bookings[bIdx])
    }
  }

  logAdminActivity(`Cancellation Request ${action}`, `Staff ${action.toLowerCase()} cancellation request ${req.id} for ${req.bookingRef}`)

  // Dispatch Email Notification & Print in Terminal
  import('./emailService').then(({ sendEmailNotification }) => {
    sendEmailNotification({
      to: req.clientEmail,
      subject: action === 'Accepted'
        ? `✅ BLOOM Spa - Cancellation Approved [${req.bookingRef}]`
        : `❌ BLOOM Spa - Cancellation Declined [${req.bookingRef}]`,
      type: action === 'Accepted' ? 'CANCELLATION_APPROVED' : 'CANCELLATION_DECLINED',
      data: {
        bookingRef: req.bookingRef,
        clientName: req.clientName,
        clientEmail: req.clientEmail,
        staffNote: req.staffResponse,
      },
    }).catch(() => {})
  })

  try {
    const { updateCancellationRequestInSupabase } = require('./supabaseService')
    updateCancellationRequestInSupabase(req.id, action, req.staffResponse)
  } catch {
    // async fallback
  }

  return true
}
