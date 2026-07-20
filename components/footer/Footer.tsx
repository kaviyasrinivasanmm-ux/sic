'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Instagram, Facebook, MapPin, Phone, Clock, Send, Check } from 'lucide-react'

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail) {
      setSubscribed(true)
      setNewsletterEmail('')
    }
  }

  return (
    <footer className="bg-[#111614] text-white pt-20 pb-12 border-t border-[#C7A76C]/20 relative overflow-hidden">
      {/* Background Zen Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#C7A76C] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#C7A76C] flex items-center justify-center bg-[#1A211E]">
                <span className="font-serif text-xl font-bold text-[#C7A76C]">B</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-[#FCFBF8]">
                  BLOOM
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C7A76C] block">
                  Wellness Spa
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A8B5B0] font-light leading-relaxed max-w-sm">
              An Awwwards-certified luxury spa designed to eliminate uncertainty and restore complete inner harmony through organic rituals and medical-grade sterilization.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#1A211E] border border-white/10 hover:border-[#C7A76C] flex items-center justify-center text-[#8C857B] hover:text-[#C7A76C] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#1A211E] border border-white/10 hover:border-[#C7A76C] flex items-center justify-center text-[#8C857B] hover:text-[#C7A76C] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#1A211E] border border-white/10 hover:border-[#C7A76C] flex items-center justify-center text-[#8C857B] hover:text-[#C7A76C] transition-colors">
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#C7A76C] uppercase tracking-wider">
              BLOOM Wellness
            </h4>
            <ul className="space-y-2 text-xs text-[#A8B5B0]">
              <li><Link href="/treatments" prefetch={true} className="hover:text-white transition-colors">Therapeutic Rituals</Link></li>
              <li><Link href="/therapists" prefetch={true} className="hover:text-white transition-colors">Master Practitioners</Link></li>
              <li><Link href="/hygiene" prefetch={true} className="hover:text-white transition-colors">Hygiene Standards</Link></li>
              <li><Link href="/compare" prefetch={true} className="hover:text-white transition-colors">Ritual Comparator</Link></li>
              <li><Link href="/membership" prefetch={true} className="hover:text-white transition-colors">Membership Pass</Link></li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#C7A76C] uppercase tracking-wider">
              Visit & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#A8B5B0]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C7A76C] shrink-0 mt-0.5" />
                <span>#42 Zen Spa Lane, Indiranagar, Bangalore 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8FA88B]" />
                <span>+91 98765 43210 (Direct Concierge)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C7A76C]" />
                <span>Mon – Sun: 09:00 AM – 09:30 PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#C7A76C] uppercase tracking-wider">
              Inner Spa Journal
            </h4>
            <p className="text-xs text-[#A8B5B0] font-light">
              Receive monthly wellness guides, aromatherapy recipes, and member privilege invites.
            </p>

            {!subscribed ? (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-[#1A211E] border border-white/10 text-xs text-white placeholder-[#8C857B] focus:outline-none focus:border-[#C7A76C]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 p-2 rounded-full bg-[#C7A76C] text-[#111614] hover:bg-white transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-[#8FA88B]/20 border border-[#8FA88B] text-xs text-[#C7A76C] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8FA88B]" />
                <span>Welcome to the Inner Spa Journal!</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8B5B0] gap-4">
          <p>© 2026 BLOOM Wellness Spa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/hygiene" className="hover:text-white transition-colors">Hygiene Terms</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Medical Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
