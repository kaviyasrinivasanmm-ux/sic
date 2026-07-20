'use client'

import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FCFBF8] text-[#111614] flex flex-col justify-between">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8B59A] hover:text-[#C7A76C] mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#111614] mb-4">Contact Us</h1>
        <p className="text-base text-[#8FA88B] mb-6">
          We would love to hear from you. Please reach out via the form below or email us at{' '}
          <a href="mailto:info@bloomspa.com" className="text-[#A8B59A] hover:underline">
            info@bloomspa.com
          </a>.
        </p>
      </div>
      <Footer />
    </main>
  )
}
