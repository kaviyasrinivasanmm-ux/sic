'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Sparkles, X, Send, Phone, Scale, HelpCircle, Bot, Calendar, RefreshCw, XCircle, AlertCircle, CheckCircle2 } from 'lucide-react'

interface Message {
  id: string
  sender: 'ai' | 'user'
  text: string
  recommendation?: {
    treatment: string
    therapist: string
    duration: string
    price: string
    reason: string
  }
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'compare' | 'faq' | 'cancel'>('chat')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Welcome to BLOOM Wellness Spa! I am your personal Wellness Consultant. Describe your physical symptoms or select an area of focus below.',
    },
  ])
  const [inputQuery, setInputQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Dedicated Cancellation Tab State
  const [cancelBookingRefInput, setCancelBookingRefInput] = useState('BLM-88120')
  const [cancelReasonInput, setCancelReasonInput] = useState('')
  const [cancelMessage, setCancelMessage] = useState<string | null>(null)
  const [lookupRefInput, setLookupRefInput] = useState('')
  const [lookupResult, setLookupResult] = useState<any | null>(null)
  const [lookupSearched, setLookupSearched] = useState(false)

  const handleTabCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cancelBookingRefInput.trim()) return

    const { getBookings, createCancellationRequest } = require('@/lib/adminData')
    const ref = cancelBookingRefInput.trim().toUpperCase()
    const bookings = getBookings()
    const found = bookings.find((b: any) => b.bookingRef.toUpperCase() === ref)

    if (found) {
      createCancellationRequest({
        bookingId: found.id,
        bookingRef: found.bookingRef,
        clientName: found.clientName,
        clientEmail: found.clientEmail,
        clientPhone: found.clientPhone,
        treatmentName: found.treatmentName,
        bookingDate: found.bookingDate,
        reason: cancelReasonInput.trim() || 'Cancellation requested via Chatbot Cancellation Tab',
      })
      setCancelMessage(`✅ Cancellation request for ${ref} submitted to Staff Concierge! Status: Pending Approval.`)
      setCancelReasonInput('')
    } else {
      setCancelMessage(`⚠️ Booking reference ${ref} not found in active records. Please double check.`)
    }
  }

  const handleTabStatusLookup = (e: React.FormEvent) => {
    e.preventDefault()
    setLookupSearched(true)
    if (!lookupRefInput.trim()) return

    const { getCancellationRequests } = require('@/lib/adminData')
    const requests = getCancellationRequests()
    const ref = lookupRefInput.trim().toUpperCase()
    const found = requests.find((r: any) => r.bookingRef.toUpperCase() === ref)

    setLookupResult(found || null)
  }

  const presetSymptoms = [
    { label: 'Cancel Booking BLM-88120', value: 'cancel' },
    { label: 'Check Cancellation Status BLM-88120', value: 'status' },
    { label: 'Lower Back & Neck Stiffness', value: 'stiffness' },
    { label: 'Deep Stress & Insomnia', value: 'stress' },
    { label: 'Post-Workout Muscle Fatigue', value: 'recovery' },
  ]

  const faqItems = [
    { q: 'What is your sterilization protocol?', a: 'We follow medical-grade standards, sterilizing rooms with UV-C light and laundry with medical sanitization after every guest.' },
    { q: 'Do I need to book in advance?', a: 'Yes, we recommend booking at least 24 hours in advance to secure your preferred master therapist and ritual room.' },
    { q: 'Can I choose my therapist?', a: 'Absolutely, you can select Sarah, David, or Helen depending on their specialties. Check their credentials page for availability.' },
    { q: 'What is your cancellation policy?', a: 'Cancellations made 12 hours prior to the session are free. Late cancellations incur a 50% reservation fee.' },
  ]

  const compareData = [
    { name: 'Swedish Massage', duration: '60/90/120m', price: '₹3,499+', bestFor: 'Light Relaxation & Beginners' },
    { name: 'Deep Tissue Therapy', duration: '60/90/120m', price: '₹4,299+', bestFor: 'Muscle Knots & Pain Relief' },
    { name: 'Aromatherapy', duration: '60/90m', price: '₹3,999+', bestFor: 'Sensory Reset & Sleep' },
    { name: 'Reflexology', duration: '60/90m', price: '₹2,999+', bestFor: 'Foot Pain & Traveler Fatigue' },
    { name: 'Hot Stone Therapy', duration: '90/120m', price: '₹4,799+', bestFor: 'Deep Conductive Warmth' },
  ]

  const processQuery = (queryText: string) => {
    if (!queryText.trim()) return

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: queryText }
    setMessages((prev) => [...prev, userMsg])
    setInputQuery('')
    setIsAnalyzing(true)

    setTimeout(() => {
      const lower = queryText.toLowerCase()
      const matchRef = queryText.match(/BLM-\d+/i) || queryText.match(/BLM-\w+/i)
      const bookingRef = matchRef ? matchRef[0].toUpperCase() : null

      const { getBookings, getCancellationRequests, createCancellationRequest } = require('@/lib/adminData')
      const allBookings = getBookings()
      const allRequests = getCancellationRequests()

      // CASE A: User is asking about cancellation or status
      if (lower.includes('cancel') || lower.includes('cancellation') || lower.includes('status')) {
        if (bookingRef) {
          // Check if a cancellation request already exists
          const existingReq = allRequests.find((r: any) => r.bookingRef.toUpperCase() === bookingRef)
          if (existingReq) {
            let statusText = ''
            if (existingReq.status === 'Pending') {
              statusText = `⏳ Your Cancellation Request for **${bookingRef}** is currently **PENDING** staff approval. Our Spa Concierge is reviewing your request.`
            } else if (existingReq.status === 'Accepted') {
              statusText = `✅ Your Cancellation Request for **${bookingRef}** has been **ACCEPTED** by Spa Staff. Your booking is officially **CANCELLED**.`
            } else {
              statusText = `❌ Your Cancellation Request for **${bookingRef}** was **DECLINED** by Spa Staff. Staff Note: "${existingReq.staffResponse || 'Booking remains active per spa policy'}". Your booking remains **ACTIVE**.`
            }

            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: statusText,
              },
            ])
            setIsAnalyzing(false)
            return
          }

          // Search booking in DB
          const foundBooking = allBookings.find((b: any) => b.bookingRef.toUpperCase() === bookingRef)
          if (foundBooking) {
            // Extract reason or default
            const reasonParts = queryText.split(bookingRef)
            const reason = reasonParts[1]?.trim() || queryText || 'Guest requested cancellation via AI Chatbot'

            const newReq = createCancellationRequest({
              bookingId: foundBooking.id,
              bookingRef: foundBooking.bookingRef,
              clientName: foundBooking.clientName,
              clientEmail: foundBooking.clientEmail,
              clientPhone: foundBooking.clientPhone,
              treatmentName: foundBooking.treatmentName,
              bookingDate: foundBooking.bookingDate,
              reason: reason.length > 5 ? reason : 'Emergency scheduling conflict',
            })

            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: `📋 **Cancellation Request Submitted to Staff**:\n\n• **Booking Reference**: ${foundBooking.bookingRef}\n• **Guest Name**: ${foundBooking.clientName}\n• **Ritual**: ${foundBooking.treatmentName}\n• **Date**: ${foundBooking.bookingDate}\n• **Status**: ⏳ **Pending Staff Approval**\n\nYour request has been routed to our **Staff Concierge Dashboard**. Our staff will review your request shortly. You can ask me anytime for status updates!`,
              },
            ])
            setIsAnalyzing(false)
            return
          } else {
            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: `⚠️ No active booking reference **${bookingRef}** was found in our database. Please double-check your booking reference number (e.g. BLM-92841) or contact our concierge directly.`,
              },
            ])
            setIsAnalyzing(false)
            return
          }
        } else {
          // No booking ref specified in query
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: 'ai',
              text: `I can assist you with your **Booking Cancellation Request**. Please reply with your **Booking Reference ID** (e.g. \`BLM-92841\`) and the reason for cancellation.\n\nExample: *"Cancel booking BLM-92841 due to unexpected travel"*`,
            },
          ])
          setIsAnalyzing(false)
          return
        }
      }

      // CASE B: Standard Wellness Ritual Recommendation
      let rec = {
        treatment: 'Swedish Massage (Serenity Ritual)',
        therapist: 'Sarah Jenkins',
        duration: '90 Minutes',
        price: '₹3,999',
        reason: 'Gentle rhythmic strokes combined with warm organic chamomile oils to calm your nervous system and release gentle muscle tension.',
      }

      if (lower.includes('stiff') || lower.includes('back') || lower.includes('neck') || lower.includes('pain') || lower.includes('knot')) {
        rec = {
          treatment: 'Deep Tissue Therapy (Deep Recovery)',
          therapist: 'David Vance',
          duration: '90 Minutes',
          price: '₹4,299',
          reason: 'Firm target pressure specifically directed at chronic muscle knots, lumbar tension, and deep fascial layers.',
        }
      } else if (lower.includes('stress') || lower.includes('sleep') || lower.includes('insomnia') || lower.includes('mind') || lower.includes('mental')) {
        rec = {
          treatment: 'Aromatherapy Ritual (Eucalyptus & Lavender Bliss)',
          therapist: 'Sarah Jenkins',
          duration: '90 Minutes',
          price: '₹3,999',
          reason: 'Cold-pressed eucalyptus steam inhalation paired with lymphatic drainage to instantly lower cortisol levels and induce deep restorative sleep.',
        }
      } else if (lower.includes('stone') || lower.includes('warm') || lower.includes('cold') || lower.includes('blood') || lower.includes('circulation')) {
        rec = {
          treatment: 'Hot Stone Therapy (Thermal Balance)',
          therapist: 'Helen Lin',
          duration: '90 Minutes',
          price: '₹4,799',
          reason: 'Volcanic basalt stones heated to 54°C melt away chronic muscle rigidity while restoring deep energetic flow.',
        }
      } else if (lower.includes('feet') || lower.includes('foot') || lower.includes('sole') || lower.includes('stand') || lower.includes('reflex')) {
        rec = {
          treatment: 'Reflexology Therapy (Sole & Spirit Harmony)',
          therapist: 'Helen Lin',
          duration: '60 Minutes',
          price: '₹2,999',
          reason: 'Targeted pressure point stimulation on foot meridians directly linked to spinal health and organ rejuvenation.',
        }
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Based on your wellness profile, I highly recommend the following customized ritual:',
        recommendation: rec,
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsAnalyzing(false)
    }, 1000)
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello%20BLOOM%20Wellness%20Spa,%20I%20would%20like%20to%20book%20a%20wellness%20ritual.', '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulse Animation Indicator around the Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] text-white shadow-xl focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulsing ring outer */}
            <span className="absolute inset-0 rounded-full bg-[#A8B59A]/40 animate-ping pointer-events-none" />
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[92vw] sm:w-[400px] h-[550px] flex flex-col rounded-3xl glass-modal border border-[#C7A76C]/35 shadow-2xl overflow-hidden text-sm"
          >
            {/* Header */}
            <div className="p-4 bg-[#111614] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C7A76C]/20 border border-[#C7A76C] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#C7A76C]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold tracking-wide">BLOOM Advisor</h3>
                  <p className="text-[10px] text-[#C7A76C] tracking-wider uppercase">Wellness Concierge</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#EEE6DA] bg-[#F8F5F0] text-xs">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-center font-medium border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'border-[#C7A76C] text-[#111614] bg-white'
                    : 'border-transparent text-[#8C857B] hover:text-[#111614]'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                AI Assistant
              </button>
              <button
                onClick={() => setActiveTab('compare')}
                className={`flex-1 py-3 text-center font-medium border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'compare'
                    ? 'border-[#C7A76C] text-[#111614] bg-white'
                    : 'border-transparent text-[#8C857B] hover:text-[#111614]'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                Compare
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-3 text-center font-medium border-b-2 transition-all flex items-center justify-center gap-1 text-[11px] ${
                  activeTab === 'faq'
                    ? 'border-[#C7A76C] text-[#111614] bg-white'
                    : 'border-transparent text-[#8C857B] hover:text-[#111614]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('cancel')}
                className={`flex-1 py-3 text-center font-medium border-b-2 transition-all flex items-center justify-center gap-1 text-[11px] ${
                  activeTab === 'cancel'
                    ? 'border-[#C7A76C] text-[#111614] bg-white'
                    : 'border-transparent text-[#8C857B] hover:text-[#111614]'
                }`}
              >
                <XCircle className="w-3.5 h-3.5 text-amber-600" />
                Cancellation
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#FCFBF8]">
              {activeTab === 'chat' && (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed text-xs ${
                          msg.sender === 'user'
                            ? 'bg-[#A8B59A] text-white rounded-br-none'
                            : 'bg-white border border-[#C7A76C]/25 text-[#111614] rounded-bl-none shadow-xs'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Recommendation Card */}
                        {msg.recommendation && (
                          <div className="mt-3 p-3 rounded-xl bg-[#FCFBF8] border border-[#C7A76C]/30 space-y-1.5 text-xs text-[#111614]">
                            <div className="flex items-center justify-between font-serif font-bold text-[#A8B59A]">
                              <span>{msg.recommendation.treatment}</span>
                              <span className="text-[#C7A76C]">{msg.recommendation.price}</span>
                            </div>
                            <p className="text-[11px] text-[#8FA88B]">
                              "{msg.recommendation.reason}"
                            </p>
                            <div className="pt-2 border-t border-[#EEE6DA] flex justify-between text-[10px] text-[#8C857B]">
                              <span>Therapist: <strong>{msg.recommendation.therapist}</strong></span>
                              <span>Duration: <strong>{msg.recommendation.duration}</strong></span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isAnalyzing && (
                    <div className="flex items-center gap-2 text-xs text-[#A8B59A] font-medium animate-pulse">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C7A76C]" />
                      <span>Matching bio wellness parameters...</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'compare' && (
                <div className="space-y-3">
                  <h4 className="font-serif text-sm font-semibold text-[#111614]">Ritual Comparison</h4>
                  <p className="text-xs text-[#8C857B] mb-2">Compare our luxury offerings at a glance.</p>
                  <div className="border border-[#EEE6DA] rounded-xl overflow-hidden">
                    {compareData.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3 text-xs flex flex-col gap-1 ${
                          idx % 2 === 0 ? 'bg-[#F8F5F0]' : 'bg-white'
                        } border-b border-[#EEE6DA] last:border-0`}
                      >
                        <div className="flex justify-between font-semibold">
                          <span className="text-[#111614]">{item.name}</span>
                          <span className="text-[#C7A76C]">{item.price}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-[#8C857B]">
                          <span>Duration: {item.duration}</span>
                          <span>Best For: {item.bestFor}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-3">
                  <h4 className="font-serif text-sm font-semibold text-[#111614]">Frequently Asked Questions</h4>
                  <div className="space-y-2">
                    {faqItems.map((faq, idx) => (
                      <div key={idx} className="p-3 bg-white border border-[#EEE6DA] rounded-xl space-y-1">
                        <p className="font-semibold text-xs text-[#111614]">Q: {faq.q}</p>
                        <p className="text-xs text-[#8C857B] leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'cancel' && (
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#1D2B23] text-white border border-[#C7A76C]/30 space-y-1">
                    <h4 className="font-serif text-sm font-semibold text-white flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-amber-400" />
                      <span>Booking Cancellation Desk</span>
                    </h4>
                    <p className="text-[11px] text-[#C5D3CB]">
                      Submit a cancellation request for review by our Concierge Staff.
                    </p>
                  </div>

                  {cancelMessage && (
                    <div
                      className={`p-3 rounded-xl border text-xs ${
                        cancelMessage.includes('✅')
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : 'bg-amber-50 border-amber-300 text-amber-900'
                      }`}
                    >
                      {cancelMessage}
                    </div>
                  )}

                  {/* Form 1: Submit Request */}
                  <form onSubmit={handleTabCancelSubmit} className="p-3.5 bg-white border border-[#EEE6DA] rounded-2xl space-y-3 shadow-xs">
                    <h5 className="font-semibold text-[#111614] flex items-center gap-1 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-[#C7A76C]" />
                      <span>Request Booking Cancellation</span>
                    </h5>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#8C857B] mb-1">
                        Booking Reference ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={cancelBookingRefInput}
                        onChange={(e) => setCancelBookingRefInput(e.target.value)}
                        placeholder="e.g. BLM-92841"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F5F0] border border-[#C7A76C]/30 text-[#111614] font-mono focus:outline-none focus:border-[#C7A76C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#8C857B] mb-1">
                        Cancellation Reason *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={cancelReasonInput}
                        onChange={(e) => setCancelReasonInput(e.target.value)}
                        placeholder="e.g. Emergency business travel commitment..."
                        className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F5F0] border border-[#C7A76C]/30 text-[#111614] focus:outline-none focus:border-[#C7A76C]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-full bg-[#1D2B23] hover:bg-[#283A30] text-white font-semibold text-xs tracking-wider shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 text-[#C7A76C]" />
                      <span>Submit Request to Staff</span>
                    </button>
                  </form>

                  {/* Form 2: Track Status */}
                  <form onSubmit={handleTabStatusLookup} className="p-3.5 bg-[#F8F5F0] border border-[#EEE6DA] rounded-2xl space-y-2.5">
                    <h5 className="font-semibold text-[#111614] text-xs">🔍 Track Existing Request Status</h5>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={lookupRefInput}
                        onChange={(e) => setLookupRefInput(e.target.value)}
                        placeholder="Enter BLM-XXXXX"
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-[#C7A76C]/30 font-mono text-[#111614] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-[#C7A76C] text-white font-semibold text-xs hover:opacity-90"
                      >
                        Check
                      </button>
                    </div>

                    {lookupSearched && (
                      <div className="pt-2 border-t border-[#EEE6DA]">
                        {lookupResult ? (
                          <div className="p-2.5 rounded-xl bg-white border border-[#C7A76C]/30 space-y-1 text-[11px]">
                            <p>Reference: <strong className="font-mono">{lookupResult.bookingRef}</strong></p>
                            <p>Status: <strong className={lookupResult.status === 'Accepted' ? 'text-emerald-700' : lookupResult.status === 'Declined' ? 'text-red-700' : 'text-amber-600'}>{lookupResult.status}</strong></p>
                            {lookupResult.staffResponse && <p className="italic text-[#8C857B]">Staff Note: "{lookupResult.staffResponse}"</p>}
                          </div>
                        ) : (
                          <p className="text-[11px] text-red-600 italic">No cancellation request found for reference "{lookupRefInput}".</p>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* AI Assistant Chat Inputs / Preset Symptoms */}
            {activeTab === 'chat' && (
              <div className="border-t border-[#EEE6DA] bg-white">
                <div className="p-2 bg-[#F8F5F0] flex gap-1 overflow-x-auto whitespace-nowrap">
                  {presetSymptoms.map((symptom) => (
                    <button
                      key={symptom.value}
                      onClick={() => processQuery(symptom.label)}
                      className="px-2.5 py-1 text-[10px] rounded-full bg-white border border-[#C7A76C]/30 text-[#8FA88B] hover:bg-[#A8B59A] hover:text-white transition-colors"
                    >
                      + {symptom.label}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    processQuery(inputQuery)
                  }}
                  className="p-3 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="e.g. My back is stiff from typing..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-full bg-[#FCFBF8] border border-[#EEE6DA] focus:outline-none focus:border-[#C7A76C] text-[#111614]"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-full bg-[#A8B59A] hover:bg-[#C7A76C] text-white transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* Global Footer (WhatsApp + Booking) */}
            <div className="p-3 border-t border-[#EEE6DA] bg-[#F8F5F0] flex gap-2">
              <button
                onClick={handleWhatsApp}
                className="flex-1 py-2.5 px-3 rounded-full bg-[#25D366] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity"
              >
                <Phone className="w-3.5 h-3.5 fill-white" />
                WhatsApp Booking
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  window.location.href = '/book'
                }}
                className="flex-1 py-2.5 px-3 rounded-full bg-[#A8B59A] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#8FA88B] transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Spa Ritual
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
