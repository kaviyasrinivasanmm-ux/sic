import { supabase } from './supabaseClient'

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
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Fetch error'
    return { success: false, error: message }
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

/* ============================================================
   2. TREATMENTS API
============================================================ */
export async function fetchTreatmentsFromSupabase() {
  try {
    const { data, error } = await supabase.from('treatments').select('*').eq('active', true)
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Fetch error'
    return { success: false, error: message }
  }
}

/* ============================================================
   3. THERAPISTS API
============================================================ */
export async function fetchTherapistsFromSupabase() {
  try {
    const { data, error } = await supabase.from('therapists').select('*').eq('active', true)
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Fetch error'
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
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Fetch error'
    return { success: false, error: message }
  }
}

/* ============================================================
   6. MEMBERSHIPS & CUSTOMER MEMBERSHIPS API
============================================================ */
export async function fetchMembershipsFromSupabase() {
  try {
    const { data, error } = await supabase.from('memberships').select('*').eq('active', true)
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Fetch error'
    return { success: false, error: message }
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
   8. CONTACT MESSAGES API
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

/**
 * Cancellation Requests Supabase Integration
 */
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
