'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle2, AlertTriangle, Sparkles, HelpCircle, ChevronRight, X, Calendar } from 'lucide-react'

import { TREATMENTS_DATA, Treatment } from '@/lib/spaData'
export type { Treatment }


interface TreatmentsSectionProps {
  onOpenBooking?: (treatmentName: string) => void
}

export default function TreatmentsSection({ onOpenBooking }: TreatmentsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null)

  const filteredTreatments =
    selectedFilter === 'all'
      ? TREATMENTS_DATA
      : TREATMENTS_DATA.filter((t) => t.category === selectedFilter)

  return (
    <section id="treatments" className="py-24 bg-[#FCFBF8] relative overflow-hidden">
      {/* Full-width background image beneath the header text */}
      <div className="absolute top-0 left-0 right-0 h-[480px] w-full z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/spa-bg-no-human.png"
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
            BLOOM Spa Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111614] mb-6">
            Curated Therapeutic <span className="gold-gradient-text font-light">Rituals</span>
          </h2>
          <p className="text-base text-[#111614] font-medium leading-relaxed">
            Every treatment at BLOOM Spa is meticulously crafted using 100% cold-pressed organic oils, 
            medical-grade sanitized linens, and personalized pressure adjustments.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Rituals' },
              { id: 'relaxation', label: 'Relaxation' },
              { id: 'pain-relief', label: 'Pain Relief' },
              { id: 'holistic', label: 'Holistic & Aromatherapy' },
              { id: 'thermal', label: 'Thermal Hot Stone' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  selectedFilter === tab.id
                    ? 'bg-[#A8B59A] text-white shadow-md scale-105'
                    : 'glass-card border border-[#C7A76C]/20 text-[#3A4D41] hover:border-[#C7A76C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map((treatment) => (
            <motion.div
              key={treatment.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="group rounded-3xl glass-card border border-[#C7A76C]/25 hover:border-[#C7A76C] p-7 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C7A76C]/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#A8B59A]/10 text-[#A8B59A] font-bold">
                    {treatment.category}
                  </span>
                  <span className="font-serif font-bold text-xl text-[#C7A76C]">
                    ₹{treatment.priceINR.toLocaleString('en-IN')}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#111614] mb-1 group-hover:text-[#A8B59A] transition-colors">
                  {treatment.name}
                </h3>
                <p className="text-xs text-[#C7A76C] mb-4">{treatment.subtitle}</p>
                <p className="text-xs text-[#8FA88B] line-clamp-3 leading-relaxed mb-6 font-light">
                  {treatment.description}
                </p>

                {/* Key Benefits Preview */}
                <div className="space-y-2 mb-6">
                  {treatment.benefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#111614]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A8B59A] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#EEE6DA] flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedTreatment(treatment)}
                  className="flex-1 py-2.5 px-4 rounded-full glass-card border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41] hover:bg-[#F8F5F0] transition-colors flex items-center justify-center gap-1 group-hover:border-[#C7A76C]"
                >
                  <span>Explore Details</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C7A76C]" />
                </button>

                <button
                  onClick={() => {
                    if (onOpenBooking) {
                      onOpenBooking(treatment.name)
                    } else {
                      window.location.href = `/book?treatment=${encodeURIComponent(treatment.name)}`
                    }
                  }}
                  className="py-2.5 px-5 rounded-full bg-[#A8B59A] hover:bg-[#C7A76C] text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  Book Ritual
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Treatment Detail Modal */}
      <AnimatePresence>
        {selectedTreatment && (
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
              className="bg-[#FCFBF8] border border-[#C7A76C]/30 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTreatment(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#111614]/10 hover:bg-[#111614]/20 text-[#111614] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-8 border-b border-[#EEE6DA] pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C7A76C]">
                  {selectedTreatment.category} Ritual
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111614] mt-1 mb-2">
                  {selectedTreatment.name}
                </h2>
                <p className="text-sm text-[#8FA88B]">{selectedTreatment.subtitle}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-[#111614]">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#A8B59A]/10 text-[#A8B59A] font-bold text-sm">
                    Starting ₹{selectedTreatment.priceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#8C857B]">
                    <Clock className="w-4 h-4 text-[#C7A76C]" />
                    Available Durations: {selectedTreatment.durations.join(' / ')} mins
                  </span>
                </div>
              </div>

              {/* Overview & Benefits */}
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#111614] mb-2">
                    Therapeutic Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8FA88B] leading-relaxed font-light">
                    {selectedTreatment.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#111614] mb-3">
                    Clinically Proven Benefits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedTreatment.benefits.map((benefit, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-[#C7A76C]/20 flex items-start gap-2 text-xs text-[#111614]">
                        <CheckCircle2 className="w-4 h-4 text-[#A8B59A] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best For & Contraindications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="p-4 rounded-2xl bg-[#A8B59A]/10 border border-[#A8B59A]/20">
                    <h5 className="font-serif font-semibold text-sm text-[#A8B59A] mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C7A76C]" />
                      Ideal Candidates
                    </h5>
                    <ul className="space-y-1.5 text-xs text-[#3A4D41]">
                      {selectedTreatment.bestFor.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#C7A76C]/10 border border-[#C7A76C]/30">
                    <h5 className="font-serif font-semibold text-sm text-[#9A7A3B] mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#C7A76C]" />
                      Contraindications & Warnings
                    </h5>
                    <ul className="space-y-1.5 text-xs text-[#8C857B]">
                      {selectedTreatment.contraindications.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step-by-Step Process */}
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#111614] mb-3">
                    Step-by-Step Ritual Sequence
                  </h4>
                  <div className="space-y-3">
                    {selectedTreatment.processSteps.map((step, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#EEE6DA] flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-xs text-[#111614]">
                            Step {idx + 1}: {step.title}
                          </p>
                          <p className="text-xs text-[#8C857B] mt-0.5">{step.detail}</p>
                        </div>
                        <span className="text-[11px] font-mono text-[#C7A76C] shrink-0 bg-[#FCFBF8] px-2.5 py-1 rounded-full border border-[#C7A76C]/30">
                          {step.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expected Outcome */}
                <div className="p-4 rounded-2xl bg-[#111614] text-white">
                  <h5 className="font-serif font-semibold text-sm text-[#C7A76C] mb-1">
                    Expected Outcome
                  </h5>
                  <p className="text-xs text-[#8C857B] leading-relaxed">
                    {selectedTreatment.expectedOutcome}
                  </p>
                </div>
              </div>

              {/* Modal CTA */}
              <div className="pt-4 border-t border-[#EEE6DA] flex items-center justify-between">
                <button
                  onClick={() => setSelectedTreatment(null)}
                  className="px-6 py-3 rounded-full text-xs font-semibold text-[#8C857B] hover:text-[#111614]"
                >
                  Close Window
                </button>
                <button
                  onClick={() => {
                    const name = selectedTreatment.name
                    setSelectedTreatment(null)
                    if (onOpenBooking) {
                      onOpenBooking(name)
                    } else {
                      window.location.href = `/book?treatment=${encodeURIComponent(name)}`
                    }
                  }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] hover:from-[#C7A76C] hover:to-[#9A7A3B] text-white text-xs font-semibold shadow-lg transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#EEE6DA]" />
                  <span>Reserve This Ritual</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
