'use client'

import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import TreatmentsSection from '@/components/treatments/TreatmentsSection'

export default function TreatmentsPage() {
  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614]">
      <Navbar />
      <div className="pt-24">
        <TreatmentsSection />
      </div>
      <Footer />
    </main>
  )
}
