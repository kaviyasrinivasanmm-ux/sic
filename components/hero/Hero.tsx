'use client'

import { motion } from 'framer-motion'
import { Sparkles, Calendar, ShieldCheck, Star, Users, Award, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface HeroProps {
  onOpenBooking?: (treatmentName?: string) => void
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const stats = [
    { value: '5,000+', label: 'Happy Clients Served', icon: Users },
    { value: '12+ Years', label: 'Holistic Excellence', icon: Award },
    { value: '100%', label: 'UV-C Sanitized Space', icon: ShieldCheck },
    { value: '4.9 ★', label: 'Rating · 500+ Reviews', icon: Star },
  ]

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#FCFBF8]">
      {/* Subtle Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] pointer-events-none radial-glow-gold opacity-50" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] pointer-events-none radial-glow-sage opacity-35" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#C7A76C]/30 text-[#3A4D41] text-xs font-medium mb-6 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#C7A76C] animate-pulse" />
              <span className="tracking-widest uppercase text-[11px] font-semibold text-[#C7A76C]">
                Luxury Wellness Spa
              </span>
              <span className="text-[#8C857B]">•</span>
              <span className="text-[#6B8A6B]">Japanese Zen & Scandinavian Polish</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#1A1F1C] leading-[1.1] mb-6">
              Reconnect with <br />
              <span className="gold-gradient-text font-light">Yourself.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#4A6358] font-light max-w-2xl leading-relaxed mb-8">
              Experience wellness beyond conventional relaxation. Step into a world of organic aromas,
              custom therapeutic rituals, and medical-grade sterilization designed to restore balance to your mind and body.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              {onOpenBooking ? (
                <motion.button
                  onClick={() => onOpenBooking()}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] text-white font-medium text-sm tracking-wider shadow-lg hover:shadow-xl hover:from-[#C7A76C] hover:to-[#9A7A3B] transition-all duration-500 flex items-center justify-center gap-3 group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Calendar className="w-4 h-4 text-[#EEE6DA]" />
                  <span>Begin Your Journey</span>
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </motion.button>
              ) : (
                <Link
                  href="/book"
                  prefetch={true}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] text-white font-medium text-sm tracking-wider shadow-lg hover:shadow-xl hover:from-[#C7A76C] hover:to-[#9A7A3B] transition-all duration-500 flex items-center justify-center gap-3 group"
                >
                  <Calendar className="w-4 h-4 text-[#EEE6DA]" />
                  <span>Begin Your Journey</span>
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              )}

              <Link
                href="/chat"
                prefetch={true}
                className="w-full sm:w-auto px-7 py-4 rounded-full glass-card border border-[#C7A76C]/40 text-[#2D3A30] font-medium text-sm tracking-wider hover:bg-[#F0EDE8] transition-all flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-[#C7A76C]" />
                <span>AI Ritual Consultant</span>
              </Link>
            </div>

            {/* Trust Micro Checklist */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-[#4A5D52] font-medium border-t border-[#D9D0C4] pt-6 w-full">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A8B59A]" />
                <span>Medical-Grade Sterilization</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#C7A76C]" />
                <span>Certified Master Therapists</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A8B59A]" />
                <span>100% Organic Essential Oils</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Calm Spa Image Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 relative h-[420px] sm:h-[540px] w-full rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Spa Background Image */}
            <Image
              src="/spa-bg.png"
              alt="BLOOM Wellness Spa — serene interior ambiance"
              fill
              className="object-cover object-center"
              priority
            />

            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111614]/50 via-transparent to-[#FCFBF8]/10" />

            {/* Top-left badge */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs backdrop-blur-md border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#C7A76C] animate-ping" />
              <span className="font-mono text-[11px] tracking-wider">BLOOM — Coorg, India</span>
            </div>

            {/* Bottom overlay text */}
            <div className="absolute bottom-5 left-5 right-5 z-20">
              <p className="font-serif text-white text-2xl font-light leading-snug drop-shadow-lg">
                Where every breath<br />
                <span className="text-[#E2C58A]">is a ritual.</span>
              </p>
              <p className="text-white/60 text-[11px] font-mono mt-1">
                Est. 2012 · Medical-Grade Spa Standards
              </p>
            </div>
          </motion.div>
        </div>

        {/* Statistics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-card border border-[#C7A76C]/20 hover:border-[#C7A76C]/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#A8B59A]/10 flex items-center justify-center text-[#A8B59A] group-hover:bg-[#C7A76C] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1F1C] mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-[#4A5D52] font-medium tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="flex justify-center pt-8">
        <Link
          href="/treatments"
          className="flex flex-col items-center gap-1 text-[#5A7055] hover:text-[#C7A76C] transition-colors text-xs font-medium group"
        >
          <span>Explore Rituals</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#C7A76C]" />
        </Link>
      </div>
    </section>
  )
}
