'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, RefreshCw, CheckCircle, Zap, Airplay, Lock } from 'lucide-react'

export default function HygieneSanctuary() {
  const [activeStep, setActiveStep] = useState(0)

  const hygieneSteps = [
    {
      title: 'UV-C Medical Sterilization',
      detail: 'Every room undergoes 30 minutes of high-intensity UV-C radiation treatment between sessions to neutralize 99.99% of airborne viruses and bacteria.',
      icon: Zap,
    },
    {
      title: 'Single-Use Sealed Linens',
      detail: 'Fresh 100% organic unbleached Egyptian cotton linens are vacuum-sealed after high-temperature thermal laundering and opened exclusively in front of you.',
      icon: Lock,
    },
    {
      title: 'HEPA Air Purifiers & Volumetric Ozone',
      detail: 'Continuous Medical HEPA 14 air filtration cycles the entire room volume every 6 minutes, ensuring allergen-free pure air.',
      icon: Airplay,
    },
    {
      title: 'Autoclave Instrument Disinfection',
      detail: 'All therapy stones, foot basins, and massage tools are sterilized in medical-grade steam autoclaves at 121°C.',
      icon: RefreshCw,
    },
    {
      title: 'Certified Staff Sanitation Protocols',
      detail: 'Therapists perform surgical hand disinfection prior to entering and wear certified medical protective footwear.',
      icon: ShieldCheck,
    },
  ]

  const dailyChecklist = [
    { item: 'UV-C Room Scan Completed', status: 'Verified 14 mins ago' },
    { item: 'Thermal Towel Warmer Sterilization', status: 'Verified 22 mins ago' },
    { item: 'Air HEPA Filter Replacement Scan', status: '100% Optimal' },
    { item: 'Cold-Pressed Botanical Oil Purity Test', status: 'Batch #882 Passed' },
  ]

  return (
    <section id="hygiene" className="py-24 bg-[#F8F5F0] relative overflow-hidden">
      {/* Warm light glow overlays — matching homepage palette */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C7A76C]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#A8B59A]/15 blur-3xl pointer-events-none" />

      {/* Full-width background image beneath the header text */}
      <div className="absolute top-0 left-0 right-0 h-[480px] w-full z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/hygiene-bg.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          loading="lazy"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F5F0] via-[#F8F5F0]/20 to-[#F8F5F0]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7A76C]/10 border border-[#C7A76C]/30 text-[#9A7A3B] text-xs font-semibold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-4 h-4 text-[#C7A76C]" />
            <span>Zero Compromise Protocol</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1F1C] mb-4">
            The Hygiene <span className="gold-gradient-text font-light">Standards</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#111614] font-medium leading-relaxed">
            We eliminate every hesitation. Discover our 5-stage medical-grade sanitation system designed
            to exceed hospital cleanliness benchmarks.
          </p>
        </div>

        {/* Live Sanitation Badge */}
        <div className="mb-12 max-w-xl mx-auto p-4 rounded-2xl bg-white border border-[#C7A76C]/30 shadow-sm flex items-center justify-between text-xs text-[#9A7A3B]">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7A76C] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C7A76C]" />
            </span>
            <div>
              <p className="font-semibold text-[#1A1F1C]">Live Daily Hygiene Log</p>
              <p className="text-[10px] text-[#7A8A7A]">Sanitation Supervisor: Dr. R. Malhotra</p>
            </div>
          </div>
          <span className="font-mono text-[11px] bg-[#F8F5F0] px-3 py-1.5 rounded-full border border-[#C7A76C]/20">
            Last Verified: 14 mins ago
          </span>
        </div>

        {/* Interactive Stepper / Protocol Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Stepper Navigation */}
          <div className="lg:col-span-5 space-y-3">
            {hygieneSteps.map((step, idx) => {
              const Icon = step.icon
              const isActive = activeStep === idx
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-300 flex items-center justify-between border ${
                    isActive
                      ? 'bg-white border-[#C7A76C] shadow-md text-[#1A1F1C]'
                      : 'bg-white/60 border-[#EEE6DA] text-[#4A5D52] hover:border-[#C7A76C]/40 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-[#C7A76C] text-white' : 'bg-[#A8B59A]/15 text-[#A8B59A]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-serif text-sm font-semibold">{step.title}</p>
                      <p className="text-[10px] opacity-60 font-mono">Stage 0{idx + 1}</p>
                    </div>
                  </div>
                  {isActive && <CheckCircle className="w-4 h-4 text-[#C7A76C]" />}
                </button>
              )
            })}
          </div>

          {/* Stepper Detail Card */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-[#C7A76C]/30 shadow-xl relative">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-widest font-mono text-[#C7A76C]">
                Sanitation Stage 0{activeStep + 1} of 05
              </span>
              <span className="px-3 py-1 rounded-full bg-[#A8B59A]/15 text-[#3A5A3A] text-[11px] font-semibold">
                Medical Grade Standard
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#1A1F1C] mb-4">
              {hygieneSteps[activeStep].title}
            </h3>

            <p className="text-sm text-[#4A5D52] leading-relaxed mb-8">
              {hygieneSteps[activeStep].detail}
            </p>

            {/* Daily Checklist Badges */}
            <div className="border-t border-[#EEE6DA] pt-6">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#9A7A3B] mb-3">
                Verified Sanitation Checklist
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dailyChecklist.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#F8F5F0] border border-[#EEE6DA] flex items-center justify-between text-xs">
                    <span className="text-[#2D3A30] font-medium">{item.item}</span>
                    <span className="text-[10px] font-mono text-[#5A7A5A] bg-[#A8B59A]/15 px-2 py-0.5 rounded-full">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
