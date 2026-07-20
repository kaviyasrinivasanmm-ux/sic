'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { THERAPISTS_DATA } from '@/components/therapists/TherapistsSection'
import { Award, Star, Calendar, ArrowLeft } from 'lucide-react'

export default function TherapistDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const therapist = THERAPISTS_DATA.find((t) => t.id === slug)

  if (!therapist) {
    return (
      <main className="min-h-screen bg-[#FCFBF8] text-[#111614] flex flex-col justify-between">
        <Navbar />
        <div className="pt-32 text-center py-20">
          <h1 className="font-serif text-3xl font-bold mb-4">Therapist Not Found</h1>
          <p className="text-sm text-[#8C857B] mb-8">We could not find the master therapist profile you requested.</p>
          <Link href="/therapists" className="px-6 py-3 bg-[#A8B59A] text-white rounded-full text-xs font-semibold">
            Back to Therapists
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Back Link */}
        <Link href="/therapists" className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8B59A] hover:text-[#C7A76C] mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Therapists</span>
        </Link>

        {/* Profile Card */}
        <div className="bg-white border border-[#C7A76C]/30 rounded-3xl p-6 sm:p-10 shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-6 border-b border-[#EEE6DA]">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${therapist.avatarBg} text-white flex items-center justify-center font-serif text-4xl font-bold border-2 border-[#C7A76C] shadow-md shrink-0`}>
              {therapist.name.charAt(0)}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="font-serif text-3xl font-bold text-[#111614]">
                {therapist.name}
              </h1>
              <p className="text-sm text-[#A8B59A] font-medium mt-1">{therapist.title}</p>
              <p className="text-xs text-[#C7A76C] font-mono mt-1">
                {therapist.experienceYears}+ Years Clinical Spa Experience
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#C7A76C] text-xs font-semibold mt-2">
                <Star className="w-3.5 h-3.5 fill-[#C7A76C]" />
                <span>{therapist.clientRating} ({therapist.reviewsCount} Reviews)</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Bio & Philosophy */}
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-[#111614]">Professional Narrative</h2>
              <p className="text-xs sm:text-sm text-[#8FA88B] leading-relaxed font-light">
                {therapist.bio}
              </p>
              <p className="text-xs text-[#C7A76C] font-serif italic pt-1">
                "{therapist.quote}"
              </p>
            </div>

            {/* Signature Ritual */}
            <div className="p-4 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20">
              <span className="text-[10px] uppercase font-bold text-[#8C857B] tracking-wider block mb-1">
                Signature Specialty Ritual
              </span>
              <span className="text-sm font-semibold text-[#111614] block">
                {therapist.featuredRitual}
              </span>
            </div>

            {/* Verified Certifications */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#111614] mb-3">Verified Certifications</h2>
              <div className="space-y-2">
                {therapist.certifications.map((cert, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FCFBF8] border border-[#C7A76C]/20 flex items-center gap-2 text-xs">
                    <Award className="w-4 h-4 text-[#C7A76C] shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h2 className="font-serif text-xl font-bold text-[#111614] mb-3">Verified Client Feedback</h2>
              <div className="p-5 rounded-2xl bg-[#F8F5F0] border border-[#EEE6DA] text-xs sm:text-sm text-[#A8B59A] leading-relaxed">
                "{therapist.reviewQuote}"
                <span className="block text-[11px] font-semibold text-[#111614] mt-3">
                  — {therapist.clientName}
                </span>
              </div>
            </div>

            {/* Direct Booking Trigger */}
            <div className="pt-6 border-t border-[#EEE6DA] flex justify-end">
              <Link
                href={`/book?therapist=${encodeURIComponent(therapist.name)}&treatment=${encodeURIComponent(therapist.featuredRitual)}`}
                className="px-8 py-3.5 rounded-full bg-[#A8B59A] hover:bg-[#C7A76C] text-white text-xs font-semibold shadow-md flex items-center gap-2 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#EEE6DA]" />
                <span>Reserve Appointment with {therapist.name.split(' ')[0]}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
