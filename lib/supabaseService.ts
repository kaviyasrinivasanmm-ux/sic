import { supabase } from './supabaseClient'
import { Treatment, Therapist, TREATMENTS_DATA, THERAPISTS_DATA } from './spaData'

/* ============================================================
   SCHEMA MAPPERS (SUPABASE DB <-> FRONTEND UI MODELS)
============================================================ */

export function mapSupabaseTreatmentToFrontend(row: any): Treatment {
  const matchingBaseline = TREATMENTS_DATA.find(
    (t) => t.name.toLowerCase() === row.name?.toLowerCase() || t.id === row.id
  )

  let catKey: 'relaxation' | 'pain-relief' | 'holistic' | 'thermal' = 'relaxation'
  const c = (row.category || '').toLowerCase()
  if (c.includes('pain') || c.includes('physio') || c.includes('tissue')) {
    catKey = 'pain-relief'
  } else if (c.includes('thermal') || c.includes('stone')) {
    catKey = 'thermal'
  } else if (c.includes('holistic') || c.includes('sensory') || c.includes('aroma') || c.includes('reflex')) {
    catKey = 'holistic'
  } else if (c.includes('relaxation')) {
    catKey = 'relaxation'
  }

  return {
    id: row.id || matchingBaseline?.id || 't-' + Math.random(),
    name: row.name || matchingBaseline?.name || 'Therapeutic Spa Ritual',
    subtitle: matchingBaseline?.subtitle || row.category || 'Therapeutic Spa Ritual',
    category: catKey,
    priceINR: Number(row.price) || matchingBaseline?.priceINR || 3499,
    durations: row.duration ? [row.duration, row.duration + 30] : (matchingBaseline?.durations || [60, 90]),
    description: row.description || matchingBaseline?.description || 'Custom crafted therapeutic spa session designed for deep body relaxation and stress relief.',
    benefits: matchingBaseline?.benefits || [
      'Boosts lymphatic circulation & oxygen delivery',
      'Lowers salivary cortisol stress hormone',
      'Improves joint flexibility and muscular elasticity',
      'Induces natural serotonin and endorphin release',
    ],
    bestFor: matchingBaseline?.bestFor || ['First-time spa visitors', 'Executive wellness & stress relief', 'Targeted muscle recovery'],
    contraindications: matchingBaseline?.contraindications || ['Recent unhealed fractures', 'Active skin infections'],
    processSteps: matchingBaseline?.processSteps || [
      { title: 'Aroma Foot Soak & Consultation', duration: '10 mins', detail: 'Warm eucalyptus organic foot soak while breathing steam.' },
      { title: 'Full Body Therapeutic Massage', duration: `${(row.duration || 60) - 15} mins`, detail: 'Rhythmic strokes with warm organic cold-pressed oil.' },
      { title: 'Gentle Scalp & Facial Meridian Release', duration: '5 mins', detail: 'Pressure point facial alignment.' },
    ],
    expectedOutcome: matchingBaseline?.expectedOutcome || 'Immediate reduction in anxiety, lightened muscular tension, and deep sleep readiness.',
    faqs: matchingBaseline?.faqs || [
      { q: 'Is this massage painful?', a: 'Not at all. Pressure is tailored completely to your personal comfort level.' },
    ],
    bgGradient: matchingBaseline?.bgGradient || 'from-[#FAF4E6] to-[#F5F0EB]',
    accentColor: matchingBaseline?.accentColor || '#5A7365',
  }
}

export function mapSupabaseTherapistToFrontend(row: any): Therapist {
  const matchingBaseline = THERAPISTS_DATA.find(
    (t) => t.name.toLowerCase() === row.name?.toLowerCase() || t.id === row.id
  )

  const specs = Array.isArray(row.specialization)
    ? row.specialization
    : (row.specialization ? [row.specialization] : ['Swedish Massage', 'Aromatherapy'])

  return {
    id: row.id || matchingBaseline?.id || 'th-' + Math.random(),
    name: row.name || matchingBaseline?.name || 'Master Practitioner',
    title: matchingBaseline?.title || `Master ${specs[0] || 'Wellness'} Specialist`,
    experienceYears: row.experience_years || matchingBaseline?.experienceYears || 5,
    specialties: specs,
    quote: matchingBaseline?.quote || 'Healing Through Gentle Precision',
    featuredRitual: matchingBaseline?.featuredRitual || (specs[0] ? `${specs[0]} Ritual` : 'Swedish Massage (Serenity Ritual)'),
    bio: matchingBaseline?.bio || `Certified master practitioner specializing in ${specs.join(', ')}. Holds international certifications with ${row.experience_years || 5}+ years of clinical experience.`,
    certifications: matchingBaseline?.certifications || [
      'CIDESCO International Spa Diploma',
      'Medical-Grade Sanitation & Hygiene Specialist',
    ],
    clientRating: Number(row.rating) || matchingBaseline?.clientRating || 4.95,
    reviewsCount: matchingBaseline?.reviewsCount || 150,
    reviewQuote: matchingBaseline?.reviewQuote || 'Outstanding care, intuitive touch, and exceptional professionalism.',
    clientName: matchingBaseline?.clientName || 'Verified Spa Guest',
    avatarBg: matchingBaseline?.avatarBg || 'from-[#5A7365] to-[#3E5246]',
    availableToday: row.active ?? true,
  }
}

export function mapSupabaseMembershipToFrontend(row: any) {
  const perks = Array.isArray(row.benefits) ? row.benefits : []
  return {
    id: row.id,
    name: row.name,
    price: `₹${Number(row.price).toLocaleString('en-IN')} / ${(row.duration || 'month').toLowerCase()}`,
    priceINR: Number(row.price),
    duration: row.duration || 'Monthly',
    subtitle: 'Exclusive Spa Privilege Pass',
    bgGradient: row.name.toLowerCase().includes('gold')
      ? 'from-[#111614] via-[#1A211E] to-[#111614]'
      : row.name.toLowerCase().includes('family')
      ? 'from-[#222B27] to-[#111614]'
      : 'from-[#1A211E] to-[#2D3A34]',
    badgeColor: row.name.toLowerCase().includes('gold') ? '#C7A76C' : '#A8B59A',
    popular: row.name.toLowerCase().includes('gold'),
    perksFront: perks.slice(0, 3).length > 0 ? perks.slice(0, 3) : ['Full Ritual Sessions', 'Discount on Additional Rituals', 'Priority Booking'],
    perksBack: perks.length > 3 ? perks.slice(3) : [
      'Free Organic Aromatherapy Add-on',
      'Complimentary Herbal Tea Service',
      'Rollover unused sessions up to 60 days',
      '1 Free Guest Spa Pass per Quarter',
    ],
  }
}

export function mapSupabaseBookingToFrontend(row: any) {
  return {
    id: row.id,
    bookingRef: row.booking_ref,
    clientName: row.customer_name,
    clientPhone: row.customer_phone,
    clientEmail: row.customer_email,
    treatmentName: row.treatment_name,
    durationMins: row.duration_mins || 60,
    therapistName: row.therapist_name,
    bookingDate: row.booking_date,
    timeSlot: row.booking_time,
    addons: [],
    totalPrice: Number(row.price),
    specialNotes: row.special_notes || undefined,
    status: row.status || 'confirmed',
    createdAt: row.created_at,
  }
}

/* ============================================================
   1. BOOKINGS API
============================================================ */
export interface BookingPayload {
  bookingRef: string
  clientName: string
  clientPhone: string
  clientEmail: string
  selectedTreatment: string
  selectedDuration: number
  selectedTherapist: string
  selectedDate: string
  selectedTimeSlot: string
  selectedAddons?: string[]
  totalPrice: number
  specialNotes?: string
}

export async function createBookingInSupabase(payload: BookingPayload) {
  try {
    const { data, error } = await supabase.from('bookings').insert([
      {
        booking_ref: payload.bookingRef,
        customer_name: payload.clientName,
        customer_phone: payload.clientPhone,
        customer_email: payload.clientEmail,
        treatment_name: payload.selectedTreatment,
        duration_mins: payload.selectedDuration,
        therapist_name: payload.selectedTherapist,
        booking_date: payload.selectedDate,
        booking_time: payload.selectedTimeSlot,
        price: payload.totalPrice,
        status: 'confirmed',
        payment_status: 'pending',
        special_notes: payload.specialNotes || null,
      },
    ]).select()

    if (error) {
      console.warn('Supabase booking insert warning:', error.message)
      return { success: false, error: error.message }
    }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown database error'
    console.warn('Supabase connection exception:', message)
    return { success: false, error: message }
  }
}

export async function fetchBookingsFromSupabase() {
  try {
    const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
    if (error) return { success: false, error: error.message, data: [] }
    return { success: true, data: (data || []).map(mapSupabaseBookingToFrontend), raw: data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Fetch error'
    return { success: false, error: message, data: [] }
  }
}

export async function updateBookingStatusInSupabase(id: string, status: string) {
  try {
    const { data, error } = await supabase.from('bookings').update({ status }).eq('id', id).select()
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Update error'
    return { success: false, error: message }
  }
}

export async function deleteBookingInSupabase(id: string) {
  try {
    const { error } = await supabase.from('bookings').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Delete error'
    return { success: false, error: message }
  }
}

/* ============================================================
   2. TREATMENTS API
============================================================ */
export async function fetchTreatmentsFromSupabase() {
  try {
    const { data, error } = await supabase.from('treatments').select('*').order('created_at', { ascending: true })
    if (error) {
      console.error('Supabase fetchTreatments error:', error.message)
      return { success: false, error: error.message, data: [] }
    }
    const mapped = (data || []).map(mapSupabaseTreatmentToFrontend)
    return { success: true, data: mapped, raw: data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Fetch error'
    return { success: false, error: message, data: [] }
  }
}

export async function createTreatmentInSupabase(treatment: {
  name: string
  description: string
  price: number
  duration: number
  category?: string
  active?: boolean
}) {
  try {
    const { data, error } = await supabase.from('treatments').insert([
      {
        name: treatment.name,
        description: treatment.description,
        price: treatment.price,
        duration: treatment.duration,
        category: treatment.category || 'Relaxation Therapy',
        active: treatment.active ?? true,
      },
    ]).select()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Create error'
    return { success: false, error: message }
  }
}

export async function updateTreatmentInSupabase(id: string, updates: Partial<{
  name: string
  description: string
  price: number
  duration: number
  category: string
  active: boolean
}>) {
  try {
    const { data, error } = await supabase.from('treatments').update(updates).eq('id', id).select()
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Update error'
    return { success: false, error: message }
  }
}

export async function deleteTreatmentInSupabase(id: string) {
  try {
    const { error } = await supabase.from('treatments').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Delete error'
    return { success: false, error: message }
  }
}

/* ============================================================
   3. THERAPISTS API
============================================================ */
export async function fetchTherapistsFromSupabase() {
  try {
    const { data, error } = await supabase.from('therapists').select('*').order('created_at', { ascending: true })
    if (error) {
      console.error('Supabase fetchTherapists error:', error.message)
      return { success: false, error: error.message, data: [] }
    }
    const mapped = (data || []).map(mapSupabaseTherapistToFrontend)
    return { success: true, data: mapped, raw: data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Fetch error'
    return { success: false, error: message, data: [] }
  }
}

export async function createTherapistInSupabase(therapist: {
  name: string
  email?: string
  phone?: string
  specialization?: string[]
  experience_years?: number
  rating?: number
  active?: boolean
}) {
  try {
    const { data, error } = await supabase.from('therapists').insert([
      {
        name: therapist.name,
        email: therapist.email || null,
        phone: therapist.phone || null,
        specialization: therapist.specialization || ['Swedish Massage'],
        experience_years: therapist.experience_years || 5,
        rating: therapist.rating || 4.9,
        active: therapist.active ?? true,
      },
    ]).select()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Create error'
    return { success: false, error: message }
  }
}

export async function updateTherapistInSupabase(id: string, updates: Partial<{
  name: string
  email: string
  phone: string
  specialization: string[]
  experience_years: number
  rating: number
  active: boolean
}>) {
  try {
    const { data, error } = await supabase.from('therapists').update(updates).eq('id', id).select()
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Update error'
    return { success: false, error: message }
  }
}

export async function deleteTherapistInSupabase(id: string) {
  try {
    const { error } = await supabase.from('therapists').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Delete error'
    return { success: false, error: message }
  }
}

/* ============================================================
   4. PAYMENTS API
============================================================ */
export async function createPaymentInSupabase(bookingId: string, amount: number, paymentMethod = 'Card / UPI at Spa') {
  try {
    const { data, error } = await supabase.from('payments').insert([
      {
        booking_id: bookingId,
        amount,
        payment_method: paymentMethod,
        status: 'completed',
      },
    ]).select()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Payment error'
    return { success: false, error: message }
  }
}

/* ============================================================
   5. EXPENSES API
============================================================ */
export async function createExpenseInSupabase(title: string, category: string, amount: number, expenseDate: string, description: string) {
  try {
    const { data, error } = await supabase.from('expenses').insert([
      { title, category, amount, expense_date: expenseDate, description }
    ]).select()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database error'
    return { success: false, error: message }
  }
}

export async function fetchExpensesFromSupabase() {
  try {
    const { data, error } = await supabase.from('expenses').select('*').order('expense_date', { ascending: false })
    if (error) return { success: false, error: error.message, data: [] }
    return { success: true, data: data || [] }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Fetch error'
    return { success: false, error: message, data: [] }
  }
}

export async function deleteExpenseInSupabase(id: string) {
  try {
    const { error } = await supabase.from('expenses').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Delete error'
    return { success: false, error: message }
  }
}

/* ============================================================
   6. MEMBERSHIPS API
============================================================ */
export async function fetchMembershipsFromSupabase() {
  try {
    const { data, error } = await supabase.from('memberships').select('*').order('created_at', { ascending: true })
    if (error) {
      console.error('Supabase fetchMemberships error:', error.message)
      return { success: false, error: error.message, data: [] }
    }
    const mapped = (data || []).map(mapSupabaseMembershipToFrontend)
    return { success: true, data: mapped, raw: data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Fetch error'
    return { success: false, error: message, data: [] }
  }
}

export async function subscribeCustomerMembershipInSupabase(customerEmail: string, membershipName: string) {
  try {
    const { data, error } = await supabase.from('customer_memberships').insert([
      {
        customer_email: customerEmail,
        membership_name: membershipName,
        status: 'active',
      },
    ]).select()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Membership error'
    return { success: false, error: message }
  }
}

/* ============================================================
   7. CONTACT MESSAGES API
============================================================ */
export interface ContactMessagePayload {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export async function submitContactMessageInSupabase(payload: ContactMessagePayload) {
  try {
    const { data, error } = await supabase.from('notifications').insert([
      {
        title: `Contact Inquiry: ${payload.subject}`,
        message: `From: ${payload.name} (${payload.email}, ${payload.phone || 'No phone'}). Message: ${payload.message}`,
        read_status: false,
      },
    ]).select()

    if (error) {
      console.warn('Supabase contact notification warning:', error.message)
      return { success: false, error: error.message }
    }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown database error'
    return { success: false, error: message }
  }
}

/* ============================================================
   8. CANCELLATION REQUESTS API
============================================================ */
export async function createCancellationRequestInSupabase(payload: {
  id: string
  bookingRef: string
  clientName: string
  clientEmail: string
  clientPhone: string
  treatmentName: string
  bookingDate: string
  reason: string
  status?: string
}) {
  if (!supabase) return { success: false, message: 'Supabase client not initialized' }

  try {
    const { data, error } = await supabase.from('cancellation_requests').insert([
      {
        request_ref: payload.id,
        booking_ref: payload.bookingRef,
        client_name: payload.clientName,
        client_email: payload.clientEmail,
        client_phone: payload.clientPhone,
        treatment_name: payload.treatmentName,
        booking_date: payload.bookingDate,
        reason: payload.reason,
        status: payload.status || 'Pending',
      },
    ]).select()

    if (error) {
      console.warn('Supabase create cancellation request warning:', error.message)
      return { success: false, error: error.message }
    }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown database error'
    return { success: false, error: message }
  }
}

export async function getCancellationRequestsFromSupabase() {
  if (!supabase) return { success: false, data: [] }

  try {
    const { data, error } = await supabase
      .from('cancellation_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Supabase get cancellation requests warning:', error.message)
      return { success: false, data: [] }
    }
    return { success: true, data }
  } catch {
    return { success: false, data: [] }
  }
}

export async function updateCancellationRequestInSupabase(
  requestRef: string,
  status: 'Accepted' | 'Declined',
  staffResponse?: string
) {
  if (!supabase) return { success: false }

  try {
    const { error } = await supabase
      .from('cancellation_requests')
      .update({
        status,
        staff_response: staffResponse,
        reviewed_at: new Date().toISOString(),
        reviewed_by: 'Spa Concierge Staff',
      })
      .eq('request_ref', requestRef)

    if (error) {
      console.warn('Supabase update cancellation request warning:', error.message)
      return { success: false }
    }
    return { success: true }
  } catch {
    return { success: false }
  }
}
