import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FCFBF8] text-[#111614] flex flex-col justify-between">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#5A7365] hover:text-[#C5A059] mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#111614] mb-4">Contact Sanctuary Concierge</h1>
        <p className="text-base text-[#111614] font-medium mb-6">
          We would love to welcome you. Please reach out via the form below or email us at{' '}
          <a href="mailto:concierge@bloomspa.com" className="text-[#C5A059] underline font-semibold">
            concierge@bloomspa.com
          </a>.
        </p>

        <ContactForm />
      </div>
      <Footer />
    </main>
  )
}
