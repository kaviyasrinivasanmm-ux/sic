'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { motion } from 'framer-motion'
import { Check, Star, RefreshCw, X, Loader2, AlertTriangle, Database } from 'lucide-react'
import { fetchMembershipsFromSupabase } from '@/lib/supabaseService'

const DEFAULT_MEMBERSHIP_TIERS = [
  {
    id: 'silver',
    name: 'Silver Serenity Pass',
    price: '₹9,999 / month',
    subtitle: 'For Regular Monthly Reset',
    bgGradient: 'from-[#1A211E] to-[#2D3A34]',
    badgeColor: '#A8B59A',
    perksFront: ['2 Full 90-min Massage Sessions', '15% Off Additional Rituals', 'Priority Weekend Booking'],
    perksBack: [
      'Free Organic Aromatherapy Add-on',
      'Complimentary Herbal Tea Service',
      'Rollover unused sessions up to 60 days',
      '1 Free Guest Spa Pass per Quarter',
    ],
  },
  {
    id: 'gold',
    name: 'Gold BLOOM Elite Pass',
    price: '₹18,999 / month',
    subtitle: 'Ultimate Self-Care Privilege',
    bgGradient: 'from-[#111614] via-[#1A211E] to-[#111614]',
    badgeColor: '#C7A76C',
    popular: true,
    perksFront: ['4 Full 90-min Ritual Sessions', '25% Off All Signature Packages', 'Dedicated Senior Therapist Match'],
    perksBack: [
      'Unlimited Thermal Hot Stone Upgrades',
      'Complimentary Hydrotherapy Soaks',
      'Private VIP Spa Suite Access',
      '2 Free Guest Spa Passes per Month',
      'Personalized Botanical Oil Blend Customization',
    ],
  },
  {
    id: 'family',
    name: 'Family Spa Circle Pass',
    price: '₹29,999 / month',
    subtitle: 'Shared Luxury For Up to 4 Members',
    bgGradient: 'from-[#222B27] to-[#111614]',
    badgeColor: '#EEE6DA',
    perksFront: ['8 Shared 90-min Ritual Sessions', 'Transferable among Family Members', 'VIP Suite Reservation'],
    perksBack: [
      'Concurrent Couple & Family Massage Rooms',
      'Complimentary Scalp & Facial Meridian Work',
      'Zero Cancellation Penalty Fees',
      '24/7 Dedicated Concierge Booking Hotline',
    ],
  },
]

export default function MembershipPage() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null)

  // Supabase Live Data & Connection States
  const [membershipTiers, setMembershipTiers] = useState<any[]>(DEFAULT_MEMBERSHIP_TIERS)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [supabaseError, setSupabaseError] = useState<string | null>(null)
  const [isUsingLiveDb, setIsUsingLiveDb] = useState<boolean>(false)

  // Member visit lookup state
  const [lookupEmail, setLookupEmail] = useState('')
  const [memberResult, setMemberResult] = useState<any | null>(null)
  const [lookupSearched, setLookupSearched] = useState(false)

  // Enrollment modal state
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)
  const [selectedEnrollTier, setSelectedEnrollTier] = useState<any | null>(null)
  const [memberName, setMemberName] = useState('')
  const [memberPhone, setMemberPhone] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [enrollPaymentMethod, setEnrollPaymentMethod] = useState<'UPI' | 'Bank Transfer' | 'Pay at Spa (COD)'>('UPI')
  const [enrollAdvance, setEnrollAdvance] = useState(true)
  const [enrollSuccess, setEnrollSuccess] = useState(false)

  useEffect(() => {
    let isMounted = true
    async function loadMemberships() {
      setIsLoading(true)
      setSupabaseError(null)
      const res = await fetchMembershipsFromSupabase()
      if (!isMounted) return

      if (res.success && res.data && res.data.length > 0) {
        setMembershipTiers(res.data)
        setIsUsingLiveDb(true)
      } else {
        if (res.error) {
          setSupabaseError(`Supabase connection note: ${res.error}`)
        }
        setMembershipTiers(DEFAULT_MEMBERSHIP_TIERS)
        setIsUsingLiveDb(false)
      }
      setIsLoading(false)
    }

    loadMemberships()
    return () => { isMounted = false }
  }, [])

  const handleLookupMember = (e: React.FormEvent) => {
    e.preventDefault()
    setLookupSearched(true)
    const { getCustomers } = require('@/lib/adminData')
    const customers = getCustomers()
    const found = customers.find(
      (c: any) =>
        c.email.toLowerCase() === lookupEmail.trim().toLowerCase() ||
        c.phone.includes(lookupEmail.trim())
    )
    setMemberResult(found || null)
  }

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { subscribeCustomerMembershipInSupabase } = require('@/lib/supabaseService')
    const { recordCustomerVisit } = require('@/lib/adminData')

    if (selectedEnrollTier) {
      subscribeCustomerMembershipInSupabase(memberEmail, selectedEnrollTier.name)
      recordCustomerVisit(memberName, memberEmail, memberPhone, enrollAdvance ? 1000 : 0, new Date().toISOString().split('T')[0])
    }
    setEnrollSuccess(true)
  }

  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614] overflow-hidden">
      <Navbar />

      {/* Full-width background image beneath the header text */}
      <div className="absolute top-0 left-0 right-0 h-[480px] w-full z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/membership-bg.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          loading="lazy"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFBF8] via-[#FCFBF8]/20 to-[#FCFBF8]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A76C] mb-3 block">
            Membership Privileges
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#111614] mb-4">
            Exclusive Spa <span className="gold-gradient-text font-light">Passes</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#111614] font-medium">
            Enjoy priority reservations, transferable sessions, complimentary thermal upgrades, and dedicated concierge access.
          </p>

          {/* Supabase Error Alert Banner */}
          {supabaseError && (
            <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-center gap-2 max-w-xl mx-auto">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{supabaseError} (Displaying baseline passes)</span>
            </div>
          )}

          {/* Visit Counter & Pass Lookup Widget */}
          <div className="mt-8 p-6 rounded-3xl bg-[#1D2B23] border border-[#C7A76C]/35 text-white shadow-xl text-left">
            <h3 className="font-serif text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Star className="w-5 h-5 text-[#C7A76C]" />
              <span>Check My Membership Visit Balance</span>
            </h3>
            <p className="text-xs text-[#C5D3CB] mb-4">
              Enter your registered email or WhatsApp phone number to view your visit history and membership perks.
            </p>

            <form onSubmit={handleLookupMember} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                value={lookupEmail}
                onChange={(e) => setLookupEmail(e.target.value)}
                placeholder="Enter email or phone (e.g. priya.sharma@example.com)"
                className="flex-1 px-4 py-3 rounded-2xl bg-[#283A30] border border-[#C7A76C]/30 text-white text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#C7A76C]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#C7A76C] to-[#9A7A3B] text-white font-semibold text-xs shadow-md shrink-0 hover:opacity-95"
              >
                Track Visits & Pass
              </button>
            </form>

            {lookupSearched && (
              <div className="mt-4 pt-4 border-t border-[#C7A76C]/20">
                {memberResult ? (
                  <div className="p-4 rounded-2xl bg-[#283A30] border border-[#C7A76C]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-serif font-bold text-[#FCFBF8]">
                        {memberResult.name} <span className="text-xs font-normal text-[#C7A76C]">({memberResult.email})</span>
                      </p>
                      <p className="text-xs text-[#C5D3CB]">
                        Last Sanctuary Visit: <strong>{memberResult.lastVisit || 'N/A'}</strong>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="text-center px-3.5 py-2 rounded-xl bg-[#1D2B23] border border-[#C7A76C]/40">
                        <span className="block font-mono text-xl font-bold text-[#C7A76C]">
                          {memberResult.totalBookings || 1}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#C5D3CB]">Visits Recorded</span>
                      </div>

                      <div className="text-center px-3.5 py-2 rounded-xl bg-[#1D2B23] border border-[#C7A76C]/40">
                        <span className="block font-mono text-xl font-bold text-white">
                          ₹{(memberResult.totalSpent || 0).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#C5D3CB]">Total Spend</span>
                      </div>

                      <div className="text-center px-3.5 py-2 rounded-xl bg-[#1D2B23] border border-emerald-500/40">
                        <span className="block font-mono text-xl font-bold text-emerald-400">
                          ₹{Math.max(0, Math.floor((memberResult.totalSpent || 0) / 1500) * 100 - (memberResult.totalRedeemed || 0))}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-emerald-300">
                          Available Reward Cash
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/50 text-red-200 text-xs">
                    No active membership record found for <strong>{lookupEmail}</strong>. Every new appointment automatically registers and counts your visits!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#C7A76C] animate-spin" />
            <p className="text-xs font-medium text-[#4A6358]">Loading live membership passes from Supabase...</p>
          </div>
        ) : membershipTiers.length === 0 ? (
          /* Empty State */
          <div className="py-16 text-center bg-white rounded-3xl border border-[#EEE6DA] p-8 max-w-md mx-auto">
            <Star className="w-8 h-8 text-[#C7A76C] mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#111614] mb-1">No Passes Found</h3>
            <p className="text-xs text-[#5A7365]">No active membership tiers found in the database.</p>
          </div>
        ) : (
          /* Membership Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier) => {
              const isFlipped = flippedCard === tier.id
              return (
                <div key={tier.id} className="perspective-1000 h-[485px]">
                  <motion.div
                    className="w-full h-full relative transform-style-3d cursor-pointer"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    onClick={() => setFlippedCard(isFlipped ? null : tier.id)}
                  >
                    {/* Front Face */}
                    <div className={`absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-b ${tier.bgGradient || 'from-[#1A211E] to-[#2D3A34]'} text-white p-8 border border-[#C7A76C]/40 shadow-2xl flex flex-col justify-between`}>
                      {tier.popular && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#C7A76C] text-[#111614] text-[10px] font-bold uppercase tracking-widest shadow-md">
                          Most Popular
                        </div>
                      )}

                      <div>
                        <span className="text-xs uppercase tracking-widest font-mono text-[#EEE6DA]">
                          Membership Pass
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-white mt-1 mb-1">
                          {tier.name}
                        </h3>
                        <p className="text-xs text-[#8C857B] mb-6">{tier.subtitle}</p>

                        <div className="font-serif font-bold text-3xl text-[#EEE6DA] mb-6">
                          {tier.price}
                        </div>

                        <div className="space-y-3">
                          {(tier.perksFront || []).map((perk: string, i: number) => (
                            <div key={i} className="flex items-center gap-2.5 text-xs text-white/90">
                              <Check className="w-4 h-4 text-[#C7A76C] shrink-0" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] text-[#EEE6DA] underline font-mono">
                          Click to flip & see details →
                        </span>
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                          <RefreshCw className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-[#111614] text-white p-8 border border-[#C7A76C] shadow-2xl flex flex-col justify-between`}>
                      <div>
                        <span className="text-xs uppercase tracking-widest font-mono text-[#C7A76C]">
                          Exclusive Privileges
                        </span>
                        <h3 className="font-serif text-xl font-bold text-white mt-1 mb-4">
                          {tier.name} Benefits
                        </h3>

                        <div className="space-y-3 text-xs">
                          {(tier.perksBack || []).map((perk: string, i: number) => (
                            <div key={i} className="flex items-start gap-2.5 text-[#8C857B]">
                              <Star className="w-3.5 h-3.5 text-[#C7A76C] shrink-0 mt-0.5" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedEnrollTier(tier)
                          setIsEnrollModalOpen(true)
                        }}
                        className="w-full py-3 rounded-full bg-gradient-to-r from-[#C7A76C] to-[#9A7A3B] text-white font-semibold text-xs tracking-wider shadow-lg hover:opacity-90"
                      >
                        Enroll & Pay for {tier.name.split(' Pass')[0]}
                      </button>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Membership Claim & Payment Modal */}
      {isEnrollModalOpen && selectedEnrollTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#FCFBF8] border border-[#C7A76C]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsEnrollModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#4A6358] hover:text-[#111614]"
            >
              <X className="w-5 h-5" />
            </button>

            {!enrollSuccess ? (
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C7A76C] block mb-1">
                  Membership Enrollment & Payment
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#111614] mb-2">
                  Claim {selectedEnrollTier.name}
                </h3>
                <p className="text-xs text-[#5A7365] mb-6">
                  Price: <strong>{selectedEnrollTier.price}</strong> • Includes priority booking & free additions.
                </p>

                <form onSubmit={handleEnrollSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#111614] mb-1">
                      Member Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#C7A76C]/40 bg-white text-[#111614]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-semibold text-[#111614] mb-1">
                        WhatsApp Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={memberPhone}
                        onChange={(e) => setMemberPhone(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#C7A76C]/40 bg-white text-[#111614]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-semibold text-[#111614] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="radhika@example.com"
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#C7A76C]/40 bg-white text-[#111614]"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#111614] mb-2">
                      Select Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'UPI', label: 'Instant UPI' },
                        { id: 'Bank Transfer', label: 'Bank Transfer' },
                        { id: 'Pay at Spa (COD)', label: 'Pay at Spa' },
                      ].map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          suppressHydrationWarning
                          onClick={() => setEnrollPaymentMethod(pm.id as any)}
                          className={`py-2.5 px-2 rounded-xl text-[11px] font-semibold border transition-all text-center ${
                            enrollPaymentMethod === pm.id
                              ? 'bg-[#C7A76C] text-white border-[#C7A76C]'
                              : 'bg-white text-[#111614] border-[#EDE6DD]'
                          }`}
                        >
                          {pm.label}
                        </button>
                      ))}
                    </div>

                    {enrollPaymentMethod === 'UPI' && (
                      <div className="mt-2.5 p-3 rounded-xl bg-white border border-[#C7A76C]/30 text-[11px] space-y-1">
                        <p className="font-semibold text-[#111614]">📱 Scan / Pay via UPI:</p>
                        <p className="text-[#5A7365]">UPI ID: <strong className="font-mono text-[#C7A76C]">bloomspa@upi</strong></p>
                      </div>
                    )}

                    {enrollPaymentMethod === 'Bank Transfer' && (
                      <div className="mt-2.5 p-3 rounded-xl bg-white border border-[#C7A76C]/30 text-[11px] space-y-1">
                        <p className="font-semibold text-[#111614]">🏦 Direct Bank Account:</p>
                        <p className="text-[#5A7365]">Bank: HDFC Bank • A/C: 50200012345678 • IFSC: HDFC0001234</p>
                      </div>
                    )}
                  </div>

                  {/* Advance Deposit Checkbox */}
                  <div className="p-3.5 rounded-2xl bg-[#C7A76C]/10 border border-[#C7A76C]/30 text-xs">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enrollAdvance}
                        onChange={(e) => setEnrollAdvance(e.target.checked)}
                        className="w-4 h-4 rounded text-[#C7A76C]"
                      />
                      <span className="font-semibold text-[#111614]">
                        🔒 Pay ₹1,000 Advance Token for Immediate Pass Activation
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setIsEnrollModalOpen(false)}
                      className="px-6 py-3 rounded-full text-xs font-semibold text-[#8C857B]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C7A76C] to-[#9A7A3B] text-white text-xs font-semibold shadow-lg"
                    >
                      Confirm Membership & Issue Pass
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#5A7365]/20 border-2 border-[#5A7365] text-[#5A7365] flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#111614]">Membership Activated!</h3>
                <p className="text-xs text-[#5A7365]">
                  Congratulations {memberName}! Your <strong>{selectedEnrollTier.name}</strong> is active.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-[#C7A76C]/30 text-left text-xs space-y-1.5">
                  <p>Payment Method: <strong>{enrollPaymentMethod}</strong></p>
                  <p>Advance Token Paid: <strong>{enrollAdvance ? '₹1,000' : 'None'}</strong></p>
                  <p>Perks Unlocked: <strong>₹100 Loyalty Cash on every visit</strong></p>
                </div>
                <button
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="w-full py-3 rounded-full bg-[#5A7365] text-white font-semibold text-xs"
                >
                  Close & View Pass
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
