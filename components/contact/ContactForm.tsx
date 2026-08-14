'use client'

import { useState } from 'react'
import { Send, CheckCircle2, MessageSquare, Phone, Mail, MapPin } from 'lucide-react'
import { submitContactMessageInSupabase } from '@/lib/supabaseService'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('Sanctuary Inquiry')
  const [message, setMessage] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await submitContactMessageInSupabase({
      name,
      email,
      phone,
      subject,
      message,
    })

    setIsSubmitting(false)
    setIsSent(true)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
      {/* Contact Info Sidebar */}
      <div className="lg:col-span-5 space-y-6 bg-white p-8 rounded-3xl border border-[#C5A059]/20 shadow-sm">
        <h3 className="font-serif text-2xl font-semibold text-[#111614]">Sanctuary Concierge</h3>
        <p className="text-xs text-[#111614] font-medium leading-relaxed">
          Our sanctuary team responds to all inquiries within 2 hours during operating hours.
        </p>

        <div className="space-y-4 pt-4 border-t border-[#EDE6DD] text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#5A7365]/10 text-[#5A7365] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#111614]">Sanctuary Address</p>
              <p className="text-[#111614]/80">Estate #14, Coorg Hills, Karnataka, India</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#111614]">Direct Desk</p>
              <p className="text-[#111614]/80">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#5A7365]/10 text-[#5A7365] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#111614]">Concierge Email</p>
              <p className="text-[#111614]/80">concierge@bloomspa.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Form */}
      <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#C5A059]/20 shadow-sm">
        {isSent ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#5A7365]/15 border-2 border-[#5A7365] text-[#5A7365] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#111614]">Message Dispatched</h3>
            <p className="text-xs text-[#111614] font-medium max-w-md mx-auto">
              Thank you, <span className="font-semibold">{name}</span>. Your inquiry has been logged in our sanctuary system. Our team will contact you shortly.
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#5A7365] text-white text-xs font-semibold hover:bg-[#3E5246] transition-colors"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ananya Sharma"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FCFBF8] border border-[#EDE6DD] text-xs text-[#111614] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ananya@example.com"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FCFBF8] border border-[#EDE6DD] text-xs text-[#111614] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FCFBF8] border border-[#EDE6DD] text-xs text-[#111614] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-1.5">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FCFBF8] border border-[#EDE6DD] text-xs text-[#111614] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="Sanctuary Inquiry">General Inquiry</option>
                  <option value="Group & Corporate Booking">Group & Corporate Booking</option>
                  <option value="Membership Pass Inquiry">Membership Pass Inquiry</option>
                  <option value="Press & Partnership">Press & Partnership</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-1.5">
                Your Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your requirements or questions with our sanctuary specialists..."
                className="w-full px-4 py-3 rounded-2xl bg-[#FCFBF8] border border-[#EDE6DD] text-xs text-[#111614] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#5A7365] to-[#3E5246] hover:from-[#C5A059] hover:to-[#9A7A3B] text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Dispatching to Supabase...' : 'Send Message to Concierge'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
