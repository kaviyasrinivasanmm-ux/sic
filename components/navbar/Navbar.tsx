'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar, UserCheck } from 'lucide-react'

interface NavbarProps {
  onOpenBooking?: (treatmentName?: string, therapistName?: string) => void
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Treatments', href: '/treatments' },
    { label: 'Therapists', href: '/therapists' },
    { label: 'Hygiene', href: '/hygiene' },
    { label: 'Compare', href: '/compare' },
    { label: 'About', href: '/about' },
    { label: 'Membership', href: '/membership' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'py-3 bg-[#FCFBF8]/85 backdrop-blur-md border-b border-[#C7A76C]/15 shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#A8B59A]/10 border border-[#C7A76C]/30 group-hover:border-[#C7A76C] group-hover:scale-105 transition-all duration-300">
              <span className="font-serif text-xl font-bold text-[#A8B59A] group-hover:text-[#C7A76C] transition-colors">
                B
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#C7A76C] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-wider text-[#111614] group-hover:text-[#A8B59A] transition-colors">
                BLOOM
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#5A6E60] font-medium">
                Wellness Spa
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 px-6 py-2 rounded-full glass-card border border-[#C7A76C]/20 shadow-xs">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                prefetch={true}
                className="text-xs font-medium tracking-wider text-[#1F3028] hover:text-[#C7A76C] transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C7A76C] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Subtle Staff Icon */}
            <Link
              href="/staff/login"
              prefetch={true}
              title="Staff Portal"
              aria-label="Staff Portal"
              className="w-9 h-9 rounded-full glass-card border border-[#C7A76C]/30 hover:border-[#C7A76C] text-[#3A4D41] hover:text-[#C7A76C] flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-105"
            >
              <span className="sr-only">Staff Portal</span>
              <UserCheck className="w-4 h-4 text-[#A8B59A]" />
            </Link>

            {/* Subtle Admin Icon */}
            <Link
              href="/admin"
              prefetch={true}
              title="Admin Portal"
              aria-label="Admin Portal"
              className="w-9 h-9 rounded-full glass-card border border-[#C7A76C]/30 hover:border-[#C7A76C] text-[#3A4D41] hover:text-[#C7A76C] flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-105"
            >
              <span className="sr-only">Admin Portal</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </Link>

            {/* Book Now Button */}
            {onOpenBooking ? (
              <motion.button
                onClick={() => onOpenBooking()}
                className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] hover:from-[#C7A76C] hover:to-[#9A7A3B] text-white text-xs font-semibold tracking-wider shadow-md hover:shadow-lg transition-all duration-500"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <Calendar className="w-3.5 h-3.5 text-[#EEE6DA] group-hover:text-white transition-colors" />
                  <span>Book Spa Ritual</span>
                </span>
              </motion.button>
            ) : (
              <Link
                href="/book"
                prefetch={true}
                className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] hover:from-[#C7A76C] hover:to-[#9A7A3B] text-white text-xs font-semibold tracking-wider shadow-md hover:shadow-lg transition-all duration-500 inline-flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <Calendar className="w-3.5 h-3.5 text-[#EEE6DA] group-hover:text-white transition-colors" />
                  <span>Book Spa Ritual</span>
                </span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#A8B59A]/10 text-[#3A4D41]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FCFBF8] border-b border-[#C7A76C]/20 px-6 py-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-[#1A1F1C] hover:text-[#C7A76C] py-1 border-b border-[#EEE6DA]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                {onOpenBooking ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      onOpenBooking()
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] text-white text-xs font-semibold shadow-md"
                  >
                    <Calendar className="w-4 h-4 text-[#EEE6DA]" />
                    <span>Book Ritual (INR ₹)</span>
                  </button>
                ) : (
                  <Link
                    href="/book"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] text-white text-xs font-semibold shadow-md"
                  >
                    <Calendar className="w-4 h-4 text-[#EEE6DA]" />
                    <span>Book Ritual (INR ₹)</span>
                  </Link>
                )}
                <Link
                  href="/admin"
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full glass-card border border-[#C7A76C]/30 text-xs font-medium text-[#3A4D41] hover:border-[#C7A76C]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#C7A76C]"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
