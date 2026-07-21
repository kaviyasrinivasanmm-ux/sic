'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, User, Check, X, Sparkles, MessageSquare, ArrowRight, ShieldCheck, ChevronRight, ChevronLeft, Phone, Mail } from 'lucide-react'
import confetti from 'canvas-confetti'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { TREATMENTS_DATA } from '@/components/treatments/TreatmentsSection'
import { THERAPISTS_DATA } from '@/components/therapists/TherapistsSection'

export default function BookPage() {
  const searchParams = useSearchParams()

  const [step, setStep] = useState(1)
  const [selectedTreatment, setSelectedTreatment] = useState(
    searchParams.get('treatment') || TREATMENTS_DATA[0].name
  )
  const [selectedDuration, setSelectedDuration] = useState(90)
  const [selectedTherapist, setSelectedTherapist] = useState(
    searchParams.get('therapist') || THERAPISTS_DATA[0].name
  )
  const [selectedDate, setSelectedDate] = useState('2026-07-20')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('12:30 PM')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  // Guest Details
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [specialNotes, setSpecialNotes] = useState('')

  const [bookingRef, setBookingRef] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() => {
    const t = searchParams.get('treatment')
    const th = searchParams.get('therapist')
    if (t) setSelectedTreatment(t)
    if (th) setSelectedTherapist(th)
  }, [searchParams])

  const timeSlots = [
    { time: '10:00 AM', status: 'available' },
    { time: '12:30 PM', status: 'available' },
    { time: '03:00 PM', status: 'available' },
    { time: '05:30 PM', status: 'available' },
    { time: '08:00 PM', status: 'available' },
  ]

  const addonsList = [
    { id: 'aroma', name: 'Cold-Pressed Aroma Vapor Inhalation', priceINR: 499 },
    { id: 'facial', name: 'Hydrating Botanical Scalp Mask', priceINR: 799 },
    { id: 'herbal', name: 'Hot Herbal Compress Warm-up', priceINR: 699 },
  ]

  const getTreatmentPrice = () => {
    const t = TREATMENTS_DATA.find((item) => item.name === selectedTreatment)
    let base = t ? t.priceINR : 3499
    if (selectedDuration === 120) base += 1200
    if (selectedDuration === 60) base -= 500
    const addonsTotal = selectedAddons.reduce((sum, addId) => {
      const addon = addonsList.find((a) => a.id === addId)
      return sum + (addon ? addon.priceINR : 0)
    }, 0)
    return base + addonsTotal
  }

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#E7C88C', '#5A7365', '#FAF8F5'],
      })
    } catch {
      // fallback
    }
  }

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ref = `BLOOM-${Math.floor(1000 + Math.random() * 9000)}`
    setBookingRef(ref)
    setIsConfirmed(true)
    triggerConfetti()
  }

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `*Bloom Wellness Sanctuary Booking Confirmation*\n` +
      `Booking Reference: ${bookingRef}\n` +
      `Ritual: ${selectedTreatment} (${selectedDuration} mins)\n` +
      `Specialist: ${selectedTherapist}\n` +
      `Date & Slot: ${selectedDate} at ${selectedTimeSlot}\n` +
      `Guest Name: ${clientName}\n` +
      `Total Payable: ₹${getTreatmentPrice().toLocaleString('en-IN')}\n\n` +
      `Please confirm my sanctuary appointment slot.`
    )
    return `https://wa.me/919876543210?text=${text}`
  }

  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614] flex flex-col">
      <Navbar />

      <div className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#C7A76C]/30 text-xs font-medium mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A76C] animate-pulse" />
              <span className="tracking-widest uppercase text-[11px] font-semibold text-[#C7A76C]">
                Sanctuary Reservations
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1F1C] tracking-tight">
              Reserve Your <span className="gold-gradient-text font-light">Ritual</span>
            </h1>
          </motion.div>

          {/* Main Booking Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="bg-[#FDFBF7] border border-[#C5A059]/30 rounded-3xl shadow-xl p-6 sm:p-8"
          >
            {!isConfirmed ? (
              <div>
                {/* Stepper Bar */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A059] block mb-1">
                    Step 0{step} of 04
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111614]">
                    {step === 1 && 'Select Your Ritual & Duration'}
                    {step === 2 && 'Choose Your Master Therapist'}
                    {step === 3 && 'Pick Date, Time & Add-ons'}
                    {step === 4 && 'Guest Details & Confirmation'}
                  </h2>
                  <div className="flex items-center gap-2 mt-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i <= step ? 'bg-[#5A7365]' : 'bg-[#EDE6DD]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* STEP 1: Treatment & Duration */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-2">
                        Select Ritual
                      </label>
                      <div className="space-y-2">
                        {TREATMENTS_DATA.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTreatment(t.name)}
                            className={`w-full p-3.5 rounded-2xl text-left border text-xs transition-all flex items-center justify-between ${
                              selectedTreatment === t.name
                                ? 'bg-[#5A7365] text-white border-[#5A7365] shadow-md'
                                : 'bg-white text-[#111614] border-[#C5A059]/20 hover:border-[#C5A059]'
                            }`}
                          >
                            <div>
                              <span className="font-semibold block">{t.name}</span>
                              <span className="text-[11px] opacity-80">{t.subtitle}</span>
                            </div>
                            <span className="font-serif font-bold text-sm">
                              ₹{t.priceINR.toLocaleString('en-IN')}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-2">
                        Select Session Duration
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[60, 90, 120].map((dur) => (
                          <button
                            key={dur}
                            type="button"
                            onClick={() => setSelectedDuration(dur)}
                            className={`py-3 rounded-xl text-xs font-semibold border transition-all ${
                              selectedDuration === dur
                                ? 'bg-[#C5A059] text-white border-[#C5A059] shadow-sm'
                                : 'bg-white text-[#3E5246] border-[#EDE6DD]'
                            }`}
                          >
                            {dur} Minutes
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={() => setStep(2)}
                        className="px-8 py-3 rounded-full bg-[#5A7365] hover:bg-[#C5A059] text-white text-xs font-semibold transition-all flex items-center gap-2"
                      >
                        <span>Next: Select Therapist</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Choose Therapist */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-2">
                        Choose Preferred Senior Specialist
                      </label>
                      <div className="space-y-3">
                        {THERAPISTS_DATA.map((th) => (
                          <button
                            key={th.id}
                            type="button"
                            onClick={() => setSelectedTherapist(th.name)}
                            className={`w-full p-4 rounded-2xl text-left border text-xs transition-all flex items-center justify-between ${
                              selectedTherapist === th.name
                                ? 'bg-[#5A7365] text-white border-[#5A7365] shadow-md'
                                : 'bg-white text-[#111614] border-[#C5A059]/20 hover:border-[#C5A059]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${th.avatarBg} text-white flex items-center justify-center font-bold text-sm`}>
                                {th.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold">{th.name}</p>
                                <p className="text-[11px] opacity-80">{th.title}</p>
                              </div>
                            </div>
                            <span className="text-[11px] font-mono text-[#C5A059]">Available</span>
                          </button>
                        ))}

                        <button
                          type="button"
                          onClick={() => setSelectedTherapist('Any Master Therapist')}
                          className={`w-full p-3.5 rounded-2xl text-left border text-xs font-medium ${
                            selectedTherapist === 'Any Master Therapist'
                              ? 'bg-[#5A7365] text-white'
                              : 'bg-white text-[#8C857B] border-[#EDE6DD]'
                          }`}
                        >
                          ⚡ Let Sanctuary Assign Next Available Senior Master
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-3 rounded-full text-xs font-semibold text-[#8C857B] hover:text-[#111614] transition-colors flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="px-8 py-3 rounded-full bg-[#5A7365] hover:bg-[#C5A059] text-white text-xs font-semibold transition-all flex items-center gap-2"
                      >
                        <span>Next: Date & Time</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Date & Slot */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-2">
                        Select Preferred Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-3.5 rounded-xl border border-[#C5A059]/40 bg-white text-xs font-mono text-[#111614] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-2">
                        Select Available Time Slot
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot.time)}
                            className={`py-3 rounded-xl text-xs font-mono font-semibold border transition-all ${
                              selectedTimeSlot === slot.time
                                ? 'bg-[#C5A059] text-white border-[#C5A059]'
                                : 'bg-white text-[#111614] border-[#EDE6DD]'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-2">
                        Optional Add-on Rituals
                      </label>
                      <div className="space-y-2">
                        {addonsList.map((addon) => {
                          const isChecked = selectedAddons.includes(addon.id)
                          return (
                            <button
                              key={addon.id}
                              type="button"
                              onClick={() => {
                                if (isChecked) {
                                  setSelectedAddons(selectedAddons.filter((i) => i !== addon.id))
                                } else {
                                  setSelectedAddons([...selectedAddons, addon.id])
                                }
                              }}
                              className={`w-full p-3 rounded-xl border text-xs flex items-center justify-between ${
                                isChecked
                                  ? 'bg-[#5A7365]/10 border-[#5A7365] text-[#5A7365]'
                                  : 'bg-white border-[#EDE6DD] text-[#8C857B]'
                              }`}
                            >
                              <span>+ {addon.name}</span>
                              <span className="font-mono text-[#C5A059]">+₹{addon.priceINR}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        onClick={() => setStep(2)}
                        className="px-6 py-3 rounded-full text-xs font-semibold text-[#8C857B] hover:text-[#111614] transition-colors flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={() => setStep(4)}
                        className="px-8 py-3 rounded-full bg-[#5A7365] hover:bg-[#C5A059] text-white text-xs font-semibold transition-all flex items-center gap-2"
                      >
                        <span>Next: Guest Contact</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Guest Details & Submit */}
                {step === 4 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Sen"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#C5A059]/40 bg-white text-xs text-[#111614] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-1">
                          WhatsApp Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full p-3 rounded-xl border border-[#C5A059]/40 bg-white text-xs text-[#111614] focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="radhika@example.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full p-3 rounded-xl border border-[#C5A059]/40 bg-white text-xs text-[#111614] focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#111614] mb-1">
                        Special Requests / Pressure Preferences
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Please focus extra attention on lower back, gentle pressure on neck..."
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#C5A059]/40 bg-white text-xs text-[#111614] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    {/* Order Summary */}
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/30 text-xs space-y-1.5">
                      <div className="flex justify-between font-semibold text-[#111614]">
                        <span>{selectedTreatment} ({selectedDuration} mins)</span>
                        <span>₹{getTreatmentPrice().toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-[11px] text-[#5A7365]">
                        Therapist: <strong>{selectedTherapist}</strong> • Date: <strong>{selectedDate}</strong> at <strong>{selectedTimeSlot}</strong>
                      </p>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-6 py-3 rounded-full text-xs font-semibold text-[#8C857B] hover:text-[#111614] transition-colors flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#5A7365] to-[#3E5246] hover:from-[#C5A059] hover:to-[#9A7A3B] text-white text-xs font-semibold shadow-lg transition-all"
                      >
                        Confirm Sanctuary Reservation
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* Confirmation Screen */
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#5A7365]/20 border-2 border-[#5A7365] text-[#5A7365] flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest font-mono text-[#C5A059] block mb-1">
                    Reservation Verified
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#111614]">
                    Sanctuary Slot Reserved!
                  </h3>
                  <p className="text-xs text-[#5A7365] mt-1 font-mono font-bold">
                    Reference Code: {bookingRef}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#C5A059]/30 text-left text-xs space-y-2 max-w-md mx-auto shadow-sm">
                  <div className="flex justify-between border-b border-[#EDE6DD] pb-2">
                    <span className="text-[#8C857B]">Guest Name:</span>
                    <span className="font-semibold text-[#111614]">{clientName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#EDE6DD] pb-2">
                    <span className="text-[#8C857B]">Ritual:</span>
                    <span className="font-semibold text-[#111614]">{selectedTreatment}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#EDE6DD] pb-2">
                    <span className="text-[#8C857B]">Therapist:</span>
                    <span className="font-semibold text-[#111614]">{selectedTherapist}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#EDE6DD] pb-2">
                    <span className="text-[#8C857B]">Slot:</span>
                    <span className="font-semibold text-[#111614]">{selectedDate} at {selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#C5A059] pt-1">
                    <span>Total Amount (Pay at Spa):</span>
                    <span>₹{getTreatmentPrice().toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white text-xs font-semibold shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Send Confirmation Pass to WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          {/* Trust badges below the form */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#4A5D52] font-medium mt-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A8B59A]" />
              <span>Medical-Grade Sterilization</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C7A76C]" />
              <span>Free Cancellation up to 12hrs</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#8FA88B]" />
              <span>WhatsApp Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
