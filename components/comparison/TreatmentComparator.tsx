'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, Check, Sparkles, Calendar, ArrowRight } from 'lucide-react'
import { TREATMENTS_DATA, Treatment } from '../treatments/TreatmentsSection'

interface TreatmentComparatorProps {
  onOpenBooking: (treatmentName: string) => void
}

export default function TreatmentComparator({ onOpenBooking }: TreatmentComparatorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['swedish', 'deep-tissue'])

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id))
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id])
      }
    }
  }

  const selectedTreatments = TREATMENTS_DATA.filter((t) => selectedIds.includes(t.id))

  const getPressureRating = (id: string) => {
    switch (id) {
      case 'swedish': return 2
      case 'deep-tissue': return 5
      case 'aromatherapy': return 1
      case 'reflexology': return 3
      case 'hot-stone': return 4
      default: return 3
    }
  }

  const getTherapist = (id: string) => {
    switch (id) {
      case 'swedish': return 'Sarah Jenkins (Serenity Lead)'
      case 'deep-tissue': return 'David Vance (Sports Physiotherapist)'
      case 'aromatherapy': return 'Sarah Jenkins (Aromatherapist)'
      case 'reflexology': return 'Helen Lin (Reflexology Master)'
      case 'hot-stone': return 'Helen Lin (Thermal Master)'
      default: return 'Senior Therapist'
    }
  }

  return (
    <section id="compare" className="py-24 bg-[#F8F5F0] relative overflow-hidden">
      {/* Full-width background image beneath the header text */}
      <div className="absolute top-0 left-0 right-0 h-[480px] w-full z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 bg-[url('/comparison-bg.png')] bg-cover bg-center bg-no-repeat opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F5F0] via-[#F8F5F0]/20 to-[#F8F5F0]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A76C] mb-3 block">
            Eliminate Uncertainty
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111614] mb-4">
            Interactive Ritual <span className="gold-gradient-text font-light">Comparator</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A8B59A] font-light leading-relaxed">
            Select up to 3 rituals to compare pressure intensity, focus outcome, price, and ideal therapist matching side-by-side.
          </p>

          {/* Treatment Selection Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {TREATMENTS_DATA.map((t) => {
              const isSelected = selectedIds.includes(t.id)
              return (
                <button
                  key={t.id}
                  onClick={() => toggleSelection(t.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#A8B59A] text-white shadow-md'
                      : 'bg-white text-[#3A4D41] border border-[#C7A76C]/20 hover:border-[#C7A76C]'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${isSelected ? 'border-white bg-white text-[#A8B59A]' : 'border-[#C7A76C]'}`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span>{t.name.split(' (')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-3xl glass-card border border-[#C7A76C]/30 shadow-xl p-6">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#EEE6DA]">
                <th className="py-4 px-4 font-serif text-sm font-semibold text-[#8C857B] w-1/4">
                  Ritual Feature
                </th>
                {selectedTreatments.map((t) => (
                  <th key={t.id} className="py-4 px-4 font-serif text-lg font-bold text-[#111614] text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span>{t.name.split(' (')[0]}</span>
                      <span className="text-xs font-sans text-[#C7A76C] font-semibold">
                        ₹{t.priceINR.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEE6DA] text-xs">
              {/* Pressure Level */}
              <tr>
                <td className="py-4 px-4 font-semibold text-[#111614]">Pressure Intensity</td>
                {selectedTreatments.map((t) => {
                  const rating = getPressureRating(t.id)
                  return (
                    <td key={t.id} className="py-4 px-4 text-center">
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className={`w-3 h-3 rounded-full ${
                              star <= rating ? 'bg-[#A8B59A]' : 'bg-[#EEE6DA]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#8C857B] mt-1 block">
                        {rating <= 2 ? 'Gentle / Relaxing' : rating === 3 ? 'Medium Firm' : 'Deep Tissue / Intense'}
                      </span>
                    </td>
                  )
                })}
              </tr>

              {/* Target Focus */}
              <tr>
                <td className="py-4 px-4 font-semibold text-[#111614]">Primary Focus</td>
                {selectedTreatments.map((t) => (
                  <td key={t.id} className="py-4 px-4 text-center text-[#8FA88B] font-medium">
                    {t.subtitle}
                  </td>
                ))}
              </tr>

              {/* Best For */}
              <tr>
                <td className="py-4 px-4 font-semibold text-[#111614]">Ideal For</td>
                {selectedTreatments.map((t) => (
                  <td key={t.id} className="py-4 px-4">
                    <ul className="space-y-1 text-left max-w-xs mx-auto">
                      {t.bestFor.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-[#3A4D41]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A76C]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Recommended Duration */}
              <tr>
                <td className="py-4 px-4 font-semibold text-[#111614]">Durations Offered</td>
                {selectedTreatments.map((t) => (
                  <td key={t.id} className="py-4 px-4 text-center font-mono text-[#111614]">
                    {t.durations.join(' / ')} Minutes
                  </td>
                ))}
              </tr>

              {/* Specialist Match */}
              <tr>
                <td className="py-4 px-4 font-semibold text-[#111614]">Lead Specialist</td>
                {selectedTreatments.map((t) => (
                  <td key={t.id} className="py-4 px-4 text-center text-[#8FA88B] font-medium">
                    {getTherapist(t.id)}
                  </td>
                ))}
              </tr>

              {/* Direct Booking CTA Row */}
              <tr>
                <td className="py-4 px-4 font-semibold text-[#111614]">Action</td>
                {selectedTreatments.map((t) => (
                  <td key={t.id} className="py-4 px-4 text-center">
                    <button
                      onClick={() => {
                        if (onOpenBooking) {
                          onOpenBooking(t.name)
                        } else {
                          window.location.href = `/book?treatment=${encodeURIComponent(t.name)}`
                        }
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#A8B59A] hover:bg-[#C7A76C] text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      Book {t.name.split(' (')[0]}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
