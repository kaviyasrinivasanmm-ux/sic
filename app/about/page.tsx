'use client'

import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import AboutSection from '@/components/about/AboutSection'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614]">
      <Navbar />
      <div className="pt-24">
        <AboutSection />
      </div>
      <Footer />
    </main>
  )
}
