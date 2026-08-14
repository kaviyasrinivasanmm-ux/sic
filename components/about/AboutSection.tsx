'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Shield, Heart, Award, RefreshCw, Check, ArrowRight, Star } from 'lucide-react'

interface AboutSectionProps {
  onOpenBooking?: (treatmentName?: string) => void
}

export default function AboutSection({ onOpenBooking }: AboutSectionProps) {
  const [flippedCard, setFlippedCard] = useState<string | null>(null)

  const membershipTiers = [
    {
      id: 'silver',
      name: 'Silver Serenity Pass',
      price: '₹9,999 / month',
      subtitle: 'For Regular Monthly Reset',
      bgGradient: 'from-[#1A211E] to-[#2D3A34]',
      badgeColor: '#5A7365',
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

  const timelineEvents = [
    { year: '2012', title: 'Founded in Bangalore', desc: 'Started with 3 treatment rooms and a vision for clean organic wellness.' },
    { year: '2016', title: 'Medical Sanitation Accreditation', desc: 'First Indian luxury spa to introduce hospital-grade UV sterilization.' },
    { year: '2020', title: 'Botanical Oil Synthesis Lab', desc: 'Partnered with organic farms in Coorg for 100% cold-pressed oils.' },
    { year: '2024', title: 'Awwwards Recognition', desc: 'Awarded India’s Top Holistic Luxury Spa with 5,000+ happy clients.' },
  ]

  return (
    <section id="about" className="py-24 bg-[#FCFBF8] relative overflow-hidden">
      {/* Full-width background image beneath the header text */}
      <div className="absolute top-0 left-0 right-0 h-[480px] w-full z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/about-bg.png"
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
        {/* Founder & Brand Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A76C] block">
              Our Essence & Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111614] leading-tight">
              Where Japanese Zen Meets <span className="gold-gradient-text font-light">Scandinavian Polish</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#111614] font-medium leading-relaxed">
              BLOOM Wellness Spa was founded on a singular premise: to strip away the clinical sterility 
              of hospital care and the noisy commercialism of salons, replacing them with a quiet, organic spa oasis 
              where your nervous system can truly rest.
            </p>
            <p className="text-xs sm:text-sm text-[#111614] font-medium leading-relaxed">
              Every detail—from the 432Hz ambient sound waves to our custom-formulated cold-pressed oils and 
              medical-grade UV room purifiers—is designed to dismantle anxiety and rebuild trust.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <div>
                <p className="font-serif text-xl font-bold text-[#111614]">Dr. Kavita Rao</p>
                <p className="text-xs text-[#C7A76C] font-medium">Founder & Holistic Medical Director</p>
              </div>
            </div>
          </div>

          {/* Interactive Timeline */}
          <div className="lg:col-span-6 p-8 rounded-3xl glass-card border border-[#C7A76C]/30 shadow-xl space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#111614] mb-4">
              Our Journey of Wellness Excellence
            </h3>
            <div className="space-y-6 border-l-2 border-[#C7A76C]/30 pl-6 relative">
              {timelineEvents.map((evt, i) => (
                <div key={i} className="relative group">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#C7A76C] border-4 border-[#FCFBF8]" />
                  <span className="text-xs font-mono font-bold text-[#C7A76C] block mb-0.5">
                    {evt.year}
                  </span>
                  <h4 className="font-serif font-semibold text-sm text-[#111614]">{evt.title}</h4>
                  <p className="text-xs text-[#8FA88B] font-light mt-0.5">{evt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Membership Section with 3D Card Flip */}
        <div id="membership" className="pt-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A76C] mb-3 block">
              BLOOM Memberships
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111614] mb-4">
              Exclusive Spa <span className="gold-gradient-text font-light">Privileges</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A8B59A] hover:text-[#111614] font-light">
              Click any card to flip and reveal member privileges, roll-over benefits, and guest privileges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier) => {
              const isFlipped = flippedCard === tier.id
              return (
                <div key={tier.id} className="perspective-1000 h-[480px]">
                  <motion.div
                    className="w-full h-full relative transform-style-3d cursor-pointer"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    onClick={() => setFlippedCard(isFlipped ? null : tier.id)}
                  >
                    {/* Front Face */}
                    <div className={`absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-b ${tier.bgGradient} text-white p-8 border border-[#C7A76C]/40 shadow-2xl flex flex-col justify-between`}>
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
                          {tier.perksFront.map((perk, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-xs text-white/90">
                              <Check className="w-4 h-4 text-[#C7A76C] shrink-0" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] text-[#EEE6DA] underline font-mono">
                          Click to flip & see perks →
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
                          {tier.perksBack.map((perk, i) => (
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
                          if (onOpenBooking) {
                            onOpenBooking(`${tier.name} Enrollment`)
                          } else {
                            window.location.href = `/book?treatment=${encodeURIComponent(tier.name + ' Enrollment')}`
                          }
                        }}
                        className="w-full py-3 rounded-full bg-gradient-to-r from-[#C7A76C] to-[#9A7A3B] text-white font-semibold text-xs tracking-wider shadow-lg hover:opacity-90"
                      >
                        Enroll In {tier.name}
                      </button>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
