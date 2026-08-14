import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import HygieneSanctuary from '@/components/hygiene/HygieneSanctuary'

export default function HygienePage() {
  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614]">
      <Navbar />
      <div className="pt-24">
        <HygieneSanctuary />
      </div>
      <Footer />
    </main>
  )
}
