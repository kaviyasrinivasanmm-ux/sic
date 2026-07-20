'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import BookingModal from '@/components/booking/BookingModal'

export default function BookPage() {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const handleClose = () => setIsModalOpen(false)

  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614]">
      <Navbar />
      <section className="max-w-4xl mx-auto pt-24 px-4">
        <h1 className="text-3xl font-serif font-bold text-[#111614] mb-8">Book Your Spa Ritual</h1>
        {/* Render the BookingModal immediately; user can close it */}
        <BookingModal isOpen={isModalOpen} onClose={handleClose} />
        {/* Fallback content if modal is closed */}
        {!isModalOpen && (
          <p className="text-sm text-[#4A6358]">
            Thank you for visiting. Use the button above to start a new reservation.
          </p>
        )}
      </section>
      <Footer />
    </main>
  )
}
