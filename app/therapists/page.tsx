'use client'

import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import TherapistsSection from '@/components/therapists/TherapistsSection'

export default function TherapistsPage() {
  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614]">
      <Navbar />
      <div className="pt-24">
        <TherapistsSection />
      </div>
      <Footer />
    </main>
  )
}
