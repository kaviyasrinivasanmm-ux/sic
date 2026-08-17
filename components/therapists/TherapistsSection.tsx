'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Star, Calendar, ChevronRight, X, Loader2, AlertTriangle, Database } from 'lucide-react'

import { THERAPISTS_DATA, Therapist } from '@/lib/spaData'
import { fetchTherapistsFromSupabase } from '@/lib/supabaseService'

export type { Therapist }

interface TherapistsSectionProps {
  onOpenBooking?: (treatmentName?: string, therapistName?: string) => void
}

export default function TherapistsSection({ onOpenBooking }: TherapistsSectionProps) {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  
  // Supabase Live Data & Connection States
  const [therapistsList, setTherapistsList] = useState<Therapist[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [supabaseError, setSupabaseError] = useState<string | null>(null)
  const [isUsingLiveDb, setIsUsingLiveDb] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true
    async function loadTherapists() {
      setIsLoading(true)
      setSupabaseError(null)
      const res = await fetchTherapistsFromSupabase()
      if (!isMounted) return

      if (res.success && res.data && res.data.length > 0) {
        setTherapistsList(res.data)
        setIsUsingLiveDb(true)
      } else {
        if (res.error) {
          setSupabaseError(`Supabase connection note: ${res.error}`)
        }
        setTherapistsList(THERAPISTS_DATA)
        setIsUsingLiveDb(false)
      }
      setIsLoading(false)
    }

    loadTherapists()
    return () => { isMounted = false }
  }, [])

  return (
    <section id="therapists" className="py-24 bg-[#FCFBF8] relative overflow-hidden">
      {/* Full-width background image beneath the header text */}
      <div className="absolute top-0 left-0 right-0 h-[480px] w-full z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/therapists-bg.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          loading="lazy"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFBF8] via-[#FCFBF8]/20 to-[#FCFBF8]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A76C] mb-3 block">
            Master Practitioners
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111614] mb-4">
            Certified Healing <span className="gold-gradient-text font-light">Artisans</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#111614] font-medium leading-relaxed">
            Every therapist at BLOOM is rigorously vetted, holds international certifications, 
            and adheres to medical-grade hygiene protocols.
          </p>

          {/* Supabase Error Alert Banner */}
          {supabaseError && (
            <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-center gap-2 max-w-xl mx-auto">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{supabaseError} (Displaying baseline team)</span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#C7A76C] animate-spin" />
            <p className="text-xs font-medium text-[#4A6358]">Loading live practitioners from Supabase...</p>
          </div>
        ) : therapistsList.length === 0 ? (
          /* Empty State */
          <div className="py-16 text-center bg-white rounded-3xl border border-[#EEE6DA] p-8 max-w-md mx-auto">
            <Star className="w-8 h-8 text-[#C7A76C] mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#111614] mb-1">No Practitioners Found</h3>
            <p className="text-xs text-[#5A7365]">No active therapists found in the database.</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {therapistsList.map((therapist) => (
              <div
                key={therapist.id}
                className="group rounded-3xl glass-card border border-[#C7A76C]/30 hover:border-[#C7A76C] p-7 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Top Avatar Circle */}
                <div>
                  <div className="relative mb-6 flex justify-between items-start">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${therapist.avatarBg || 'from-[#5A7365] to-[#3E5246]'} text-white flex items-center justify-center font-serif text-3xl font-bold border-2 border-[#C7A76C] shadow-md group-hover:scale-105 transition-transform`}>
                      {therapist.name.charAt(0)}
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8B59A]/10 text-[#A8B59A] text-[11px] font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#A8B59A] animate-pulse" />
                      Available Today
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[#C7A76C] text-xs font-semibold mb-1">
                    <Star className="w-3.5 h-3.5 fill-[#C7A76C]" />
                    <span>{therapist.clientRating || 4.9} ({therapist.reviewsCount || 120} Reviews)</span>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-[#111614] mb-1">
                    {therapist.name}
                  </h3>
                  <p className="text-xs font-medium text-[#A8B59A] mb-3">{therapist.title}</p>
                  <p className="text-xs text-[#C7A76C] font-serif mb-4">
                    "{therapist.quote || 'Healing Through Gentle Precision'}"
                  </p>

                  <p className="text-xs text-[#8C857B] font-light leading-relaxed mb-6">
                    {therapist.bio}
                  </p>

                  {/* Featured Ritual Badge */}
                  <div className="p-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 mb-6">
                    <span className="text-[10px] uppercase font-bold text-[#8C857B] tracking-wider block mb-0.5">
                      Signature Ritual
                    </span>
                    <span className="text-xs font-semibold text-[#111614]">
                      {therapist.featuredRitual}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[#EEE6DA] flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedTherapist(therapist)}
                    className="w-full py-2.5 rounded-full glass-card border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41] hover:bg-[#F8F5F0] transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Full Credentials</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#C7A76C]" />
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenBooking) {
                        onOpenBooking(therapist.featuredRitual, therapist.name)
                      } else {
                        window.location.href = `/book?treatment=${encodeURIComponent(therapist.featuredRitual)}&therapist=${encodeURIComponent(therapist.name)}`
                      }
                    }}
                    className="w-full py-2.5 rounded-full bg-[#A8B59A] hover:bg-[#C7A76C] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#EEE6DA]" />
                    <span>Book with {therapist.name.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Credentials Modal */}
      <AnimatePresence>
        {selectedTherapist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111614]/70 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#FCFBF8] border border-[#C7A76C]/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedTherapist(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#111614]/10 text-[#111614]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${selectedTherapist.avatarBg || 'from-[#5A7365] to-[#3E5246]'} text-white flex items-center justify-center font-serif text-2xl font-bold`}>
                  {selectedTherapist.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#111614]">
                    {selectedTherapist.name}
                  </h3>
                  <p className="text-xs text-[#A8B59A] font-medium">{selectedTherapist.title}</p>
                  <p className="text-xs text-[#C7A76C] font-mono mt-0.5">
                    {selectedTherapist.experienceYears}+ Years Clinical Spa Experience
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-xs text-[#111614]">
                <div>
                  <h4 className="font-serif font-semibold text-sm text-[#111614] mb-2">
                    Verified Certifications
                  </h4>
                  <div className="space-y-2">
                    {(selectedTherapist.certifications || []).map((cert, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-[#C7A76C]/20 flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#C7A76C]" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-serif font-semibold text-sm text-[#111614] mb-2">
                    Verified Client Testimonial
                  </h4>
                  <div className="p-4 rounded-2xl bg-[#F8F5F0] border border-[#EEE6DA] text-[#A8B59A]">
                    "{selectedTherapist.reviewQuote || 'Exceptional service and deep restorative care.'}"
                    <span className="block text-[11px] font-semibold text-[#111614] mt-2">
                      — {selectedTherapist.clientName || 'Verified Guest'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#EEE6DA] flex justify-end gap-3">
                <button
                  onClick={() => setSelectedTherapist(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#8C857B]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const rit = selectedTherapist.featuredRitual
                    const name = selectedTherapist.name
                    setSelectedTherapist(null)
                    if (onOpenBooking) {
                      onOpenBooking(rit, name)
                    } else {
                      window.location.href = `/book?treatment=${encodeURIComponent(rit)}&therapist=${encodeURIComponent(name)}`
                    }
                  }}
                  className="px-7 py-2.5 rounded-full bg-[#A8B59A] hover:bg-[#C7A76C] text-white text-xs font-semibold shadow-md"
                >
                  Book Session with {selectedTherapist.name.split(' ')[0]}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
