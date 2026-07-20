'use client'

import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import TreatmentComparator from '@/components/comparison/TreatmentComparator'

export default function ComparePage() {
  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614]">
      <Navbar />
      <div className="pt-24">
        <TreatmentComparator onOpenBooking={(name) => {
          window.location.href = `/book?treatment=${encodeURIComponent(name)}`
        }} />
      </div>
      <Footer />
    </main>
  )
}
