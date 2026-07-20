'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, User, Check, X, Sparkles, MessageSquare, ArrowRight, ShieldCheck, ChevronRight, Phone, Mail } from 'lucide-react'
import confetti from 'canvas-confetti'
import { TREATMENTS_DATA } from '../treatments/TreatmentsSection'
import { THERAPISTS_DATA } from '../therapists/TherapistsSection'

interface BookingModalProps {
  isOpen: boolean
  initialTreatment?: string
  initialTherapist?: string
  onClose: () => void
}

export default function BookingModal({
  isOpen,
  initialTreatment,
  initialTherapist,
  onClose,
}: BookingModalProps) {
  const [step, setStep] = useState<number>(1)
  const [selectedTreatment, setSelectedTreatment] = useState<string>(
    initialTreatment || TREATMENTS_DATA[0].name
  )
  const [selectedDuration, setSelectedDuration] = useState<number>(90)
  const [selectedTherapist, setSelectedTherapist] = useState<string>(
    initialTherapist || THERAPISTS_DATA[0].name
  )
  const [selectedDate, setSelectedDate] = useState<string>('2026-07-20')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('12:30 PM')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  // Guest Details
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [specialNotes, setSpecialNotes] = useState('')

  const [bookingRef, setBookingRef] = useState<string>('')
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

  useEffect(() => {
    if (initialTreatment) setSelectedTreatment(initialTreatment)
    if (initialTherapist) setSelectedTherapist(initialTherapist)
  }, [initialTreatment, initialTherapist])

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

  const triggerFlowerConfetti = () => {
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
    triggerFlowerConfetti()
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

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111614]/75 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-[#FDFBF7] border border-[#C5A059]/40 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#111614]/10 text-[#111614] hover:bg-[#111614]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isConfirmed ? (
            <div>
              {/* Stepper Bar Header */}
              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A059] block mb-1">
                  Step 0{step} of 04
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111614]">
                  Reserve Your Sanctuary Experience
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
                      className="px-6 py-3 rounded-full text-xs font-semibold text-[#8C857B]"
                    >
                      Back
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
                            <span className="font-mono text-[#C5A059]">
                              +₹{addon.priceINR}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-full text-xs font-semibold text-[#8C857B]"
                    >
                      Back
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

                  {/* Order Summary Box */}
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
                      className="px-6 py-3 rounded-full text-xs font-semibold text-[#8C857B]"
                    >
                      Back
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
            /* Confirmation Screen with Confetti */
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

              {/* WhatsApp Receipt Generator Button */}
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

                <div>
                  <button
                    onClick={onClose}
                    className="text-xs text-[#8C857B] hover:text-[#111614] underline font-medium"
                  >
                    Return to Sanctuary Website
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
