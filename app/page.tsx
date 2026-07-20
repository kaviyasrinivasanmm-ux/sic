'use client'

import { useState } from 'react'
import Link from 'next/link'
import Preloader from '@/components/hero/Preloader'
import Navbar from '@/components/navbar/Navbar'
import Hero from '@/components/hero/Hero'
import Footer from '@/components/footer/Footer'
import { TREATMENTS_DATA } from '@/components/treatments/TreatmentsSection'
import { THERAPISTS_DATA } from '@/components/therapists/TherapistsSection'
import { ShieldCheck, Star, Sparkles, Heart, Award, ArrowRight, BookOpen, Users } from 'lucide-react'

export default function Home() {
  const [preloaderFinished, setPreloaderFinished] = useState(false)

  const whyChooseItems = [
    {
      title: 'Medical-Grade Sterilization',
      description: 'Zero compromise. Every treatment space undergoes medical UV-C sweeps, HEPA-14 air filtration, and steam autoclave disinfection.',
      icon: ShieldCheck,
    },
    {
      title: 'Certified Master Artisans',
      description: 'Our therapists hold international certifications (CIDESCO, BPT) and practice precise physiological and energy alignment.',
      icon: Award,
    },
    {
      title: '100% Organic Cold-Pressed Oils',
      description: 'Formulated exclusively from single-origin Coorg botanical farms. No artificial fragrances, chemicals, or mineral additives.',
      icon: Heart,
    },
  ]

  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614] overflow-x-hidden">
      {/* Cinematic Entrance Preloader */}
      <Preloader onComplete={() => setPreloaderFinished(true)} />

      {/* Main Spa Navigation */}
      <Navbar />

      {/* Hero Section with 3D Spa Scene */}
      <Hero />

      {/* Section: Why Choose BLOOM */}
      <section className="py-24 bg-[#F8F5F0] border-y border-[#C7A76C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A76C] mb-3 block">
              The BLOOM Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111614] mb-6">
              Why Choose <span className="gold-gradient-text font-light">BLOOM Wellness</span>
            </h2>
            <p className="text-sm text-[#4A6358] font-light leading-relaxed">
              We merge the deep discipline of Japanese Zen with the uncompromising standards of Scandinavian clean care to provide a spa experience of absolute restoration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 hover:border-[#C7A76C] hover:shadow-xl transition-all duration-500 flex flex-col items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#A8B59A]/15 flex items-center justify-center text-[#A8B59A]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#111614]">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#3D5448] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section: Featured Treatments */}
      <section className="py-24 bg-[#FCFBF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A76C] mb-3 block">
                Signature Experiences
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111614]">
                Featured <span className="gold-gradient-text font-light">Rituals</span>
              </h2>
            </div>
            <Link
              href="/treatments"
              className="mt-4 sm:mt-0 flex items-center gap-1.5 text-xs font-semibold text-[#A8B59A] hover:text-[#C7A76C] transition-colors group"
            >
              <span>Explore All Rituals</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TREATMENTS_DATA.slice(0, 3).map((treatment) => (
              <div
                key={treatment.id}
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
                    {treatment.name.split(' (')[0]}
                  </h3>
                  <p className="text-xs text-[#C7A76C] mb-4">{treatment.subtitle}</p>
                  <p className="text-xs text-[#4A6358] line-clamp-3 leading-relaxed mb-6 font-light">
                    {treatment.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EEE6DA] flex items-center justify-between gap-3">
                  <Link
                    href={`/treatments/${treatment.id}`}
                    className="flex-1 py-2.5 px-4 rounded-full glass-card border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41] hover:bg-[#F8F5F0] transition-colors flex items-center justify-center gap-1 group-hover:border-[#C7A76C]"
                  >
                    <span>View Credentials</span>
                    <ArrowRight className="w-3 h-3 text-[#C7A76C]" />
                  </Link>
                  <Link
                    href={`/book?treatment=${encodeURIComponent(treatment.name)}`}
                    className="py-2.5 px-5 rounded-full bg-[#A8B59A] hover:bg-[#C7A76C] text-white text-xs font-semibold transition-colors"
                  >
                    Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Featured Therapists */}
      <section className="py-24 bg-[#F8F5F0] border-t border-[#C7A76C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A76C] mb-3 block">
                Master Healing Hands
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111614]">
                Master <span className="gold-gradient-text font-light">Practitioners</span>
              </h2>
            </div>
            <Link
              href="/therapists"
              className="mt-4 sm:mt-0 flex items-center gap-1.5 text-xs font-semibold text-[#A8B59A] hover:text-[#C7A76C] transition-colors group"
            >
              <span>View All Therapists</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {THERAPISTS_DATA.map((therapist) => (
              <div
                key={therapist.id}
                className="group rounded-3xl glass-card bg-white border border-[#C7A76C]/30 hover:border-[#C7A76C] p-7 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                <div>
                  <div className="relative mb-6 flex justify-between items-start">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${therapist.avatarBg} text-white flex items-center justify-center font-serif text-3xl font-bold border-2 border-[#C7A76C] shadow-md group-hover:scale-105 transition-transform`}>
                      {therapist.name.charAt(0)}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8B59A]/10 text-[#A8B59A] text-[11px] font-semibold">
                      Available
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[#C7A76C] text-xs font-semibold mb-1">
                    <Star className="w-3.5 h-3.5 fill-[#C7A76C]" />
                    <span>{therapist.clientRating} ({therapist.reviewsCount} Reviews)</span>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-[#111614] mb-1">
                    {therapist.name}
                  </h3>
                  <p className="text-xs font-medium text-[#A8B59A] mb-3">{therapist.title}</p>
                  <p className="text-xs text-[#3D5448] font-light leading-relaxed mb-6">
                    {therapist.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EEE6DA] flex flex-col gap-2">
                  <Link
                    href={`/therapists/${therapist.id}`}
                    className="w-full py-2.5 rounded-full glass-card border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41] hover:bg-[#F8F5F0] transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Full Profile</span>
                    <ArrowRight className="w-3 h-3 text-[#C7A76C]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Membership Preview */}
      <section className="py-24 bg-[#FCFBF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A76C] mb-3 block">
            Premium Wellness Circles
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111614] mb-6">
            BLOOM Club <span className="gold-gradient-text font-light">Memberships</span>
          </h2>
          <p className="text-sm text-[#4A6358] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Gain recurring monthly privileges, rolled-over massage sessions, VIP suite reservations, and complimentary botanical upgrades.
          </p>
          <div className="inline-flex justify-center">
            <Link
              href="/membership"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] text-white font-medium text-sm tracking-wider shadow-lg hover:shadow-xl hover:from-[#C7A76C] hover:to-[#9A7A3B] transition-all duration-500 flex items-center gap-2"
            >
              <span>Explore Member Passes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Book Appointment CTA */}
      <section className="py-28 bg-[#111614] text-white relative overflow-hidden text-center border-t border-[#C7A76C]/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#C7A76C]/10 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-[#C7A76C] block">
            Reserve Your Experience
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#FCFBF8] leading-tight">
            Step Into Complete <span className="gold-gradient-text font-light">Harmony.</span>
          </h2>
          <p className="text-sm text-[#A8B5B0] font-light max-w-xl mx-auto leading-relaxed">
            Relieve stress, cure muscle fatigue, and experience medical-grade clinical sanitation today.
          </p>
          <div className="pt-4 flex justify-center">
            <Link
              href="/book"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C7A76C] to-[#9A7A3B] text-white font-semibold text-sm tracking-wider shadow-lg hover:opacity-95 transition-opacity"
            >
              Book Spa Appointment Now
            </Link>
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <Footer />
    </main>
  )
}
