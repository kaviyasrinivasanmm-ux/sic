/**
 * Email Dispatcher Service for BLOOM Wellness Spa
 * Formats email notifications, logs them to terminal console, and dispatches via API.
 */

export interface EmailPayload {
  to: string
  subject: string
  type: 'BOOKING_CONFIRMATION' | 'CANCELLATION_REQUESTED' | 'CANCELLATION_APPROVED' | 'CANCELLATION_DECLINED'
  data: {
    bookingRef: string
    clientName: string
    clientEmail: string
    treatmentName?: string
    bookingDate?: string
    timeSlot?: string
    therapistName?: string
    totalPrice?: number
    advanceAmount?: number
    reason?: string
    staffNote?: string
  }
}

/**
 * Format and print email log in terminal console
 */
export function printTerminalEmailLog(payload: EmailPayload) {
  const line = '='.repeat(80)
  const divider = '-'.repeat(80)

  let bodyText = ''
  const { data } = payload

  if (payload.type === 'BOOKING_CONFIRMATION') {
    bodyText = `Dear ${data.clientName},

Your luxury wellness ritual reservation at BLOOM Wellness Spa has been CONFIRMED!

• Booking Reference  : ${data.bookingRef}
• Treatment Ritual   : ${data.treatmentName || 'Custom Spa Ritual'}
• Master Therapist   : ${data.therapistName || 'Selected Specialist'}
• Date & Time        : ${data.bookingDate || 'Scheduled Date'} at ${data.timeSlot || 'Scheduled Slot'}
• Total Ritual Price : ₹${(data.totalPrice || 0).toLocaleString('en-IN')}
• Advance Token Paid : ₹${data.advanceAmount || 300} (Deducted directly from your bill)
• Remaining Balance  : ₹${Math.max(0, (data.totalPrice || 0) - (data.advanceAmount || 300)).toLocaleString('en-IN')}

Sanctuary Address: 42 Lavender Lane, Indiranagar, Bengaluru
WhatsApp Concierge: +91 98765 43210

Thank you for choosing BLOOM. We look forward to hosting your peaceful renewal!`
  } else if (payload.type === 'CANCELLATION_REQUESTED') {
    bodyText = `Dear ${data.clientName},

We have received your Booking Cancellation Request.

• Booking Reference  : ${data.bookingRef}
• Ritual             : ${data.treatmentName || 'Spa Ritual'}
• Scheduled Date     : ${data.bookingDate || 'Scheduled Date'}
• Reason Provided    : "${data.reason || 'Guest requested cancellation'}"
• Request Status     : ⏳ PENDING STAFF CONCIERGE APPROVAL

Our Concierge Staff is reviewing your request. You will receive an update as soon as a staff member processes your request.`
  } else if (payload.type === 'CANCELLATION_APPROVED') {
    bodyText = `Dear ${data.clientName},

Your Booking Cancellation Request for reference ${data.bookingRef} has been APPROVED by our Staff Concierge.

• Booking Reference  : ${data.bookingRef}
• Booking Status     : ❌ CANCELLED
• Staff Note         : "${data.staffNote || 'Cancellation approved by Concierge.'}"

Your reservation slot has been released. Any advance token refund will be processed as per policy.

We hope to welcome you back soon at BLOOM Wellness Spa.`
  } else if (payload.type === 'CANCELLATION_DECLINED') {
    bodyText = `Dear ${data.clientName},

Your Booking Cancellation Request for reference ${data.bookingRef} has been REVIEWED and DECLINED by our Staff Concierge.

• Booking Reference  : ${data.bookingRef}
• Booking Status     : ✅ ACTIVE / CONFIRMED
• Staff Note         : "${data.staffNote || 'Cancellation request declined per policy.'}"

Your appointment remains ACTIVE. If you need to reschedule, please contact our concierge at +91 98765 43210.`
  }

  console.log('\n' + line)
  console.log(`📧 [EMAIL DISPATCHED TO]: ${payload.to}`)
  console.log(`📌 [SUBJECT]: ${payload.subject}`)
  console.log(divider)
  console.log(bodyText)
  console.log(line + '\n')
}

/**
 * Dispatch Email to client & trigger server-side terminal logging
 */
export async function sendEmailNotification(payload: EmailPayload): Promise<{ success: boolean }> {
  // Print on client console
  printTerminalEmailLog(payload)

  // Trigger Next.js server API endpoint for terminal output
  try {
    if (typeof window !== 'undefined') {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }
  } catch (err) {
    // async log fallback
  }

  return { success: true }
}
