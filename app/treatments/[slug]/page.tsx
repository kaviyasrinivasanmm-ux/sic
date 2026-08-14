import Link from 'next/link'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { TREATMENTS_DATA } from '@/lib/spaData'
import { Clock, ShieldCheck, CheckCircle2, AlertTriangle, Calendar, ArrowLeft } from 'lucide-react'

export function generateStaticParams() {
  return [
    { slug: 'swedish' },
    { slug: 'swedish-massage' },
    { slug: 'deep-tissue' },
    { slug: 'aromatherapy' },
    { slug: 'reflexology' },
    { slug: 'hot-stone' },
  ]
}

export default async function TreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Mapping slug to internal ID
  const mapping: { [key: string]: string } = {
    'swedish-massage': 'swedish',
    'deep-tissue': 'deep-tissue',
    'aromatherapy': 'aromatherapy',
    'reflexology': 'reflexology',
    'hot-stone': 'hot-stone',
  }

  const treatmentId = mapping[slug] || slug
  const treatment = TREATMENTS_DATA.find((t) => t.id === treatmentId)

  if (!treatment) {
    return (
      <main className="min-h-screen bg-[#FCFBF8] text-[#111614] flex flex-col justify-between">
        <Navbar />
        <div className="pt-32 text-center py-20">
          <h1 className="font-serif text-3xl font-bold mb-4">Ritual Not Found</h1>
          <p className="text-sm text-[#8C857B] mb-8">We could not find the wellness ritual you requested.</p>
          <Link href="/treatments" className="px-6 py-3 bg-[#A8B59A] text-white rounded-full text-xs font-semibold">
            Back to Treatments
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Back Link */}
        <Link href="/treatments" className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8B59A] hover:text-[#C7A76C] mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Rituals</span>
        </Link>

        {/* Hero Meta */}
        <div className="mb-10 border-b border-[#EEE6DA] pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C7A76C]">
            {treatment.category} Ritual
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#111614] mt-2 mb-3">
            {treatment.name}
          </h1>
          <p className="text-base text-[#8FA88B] mb-6">{treatment.subtitle}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <span className="px-4 py-2 rounded-full bg-[#A8B59A]/15 text-[#A8B59A] font-bold text-sm">
              ₹{treatment.priceINR.toLocaleString('en-IN')}
            </span>
            <span className="flex items-center gap-1.5 text-[#8C857B]">
              <Clock className="w-4 h-4 text-[#C7A76C]" />
              Available Durations: {treatment.durations.join(' / ')} mins
            </span>
          </div>
        </div>

        {/* Editorial Body Content */}
        <div className="space-y-12">
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#111614]">Therapeutic Overview</h2>
            <p className="text-xs sm:text-sm text-[#8FA88B] leading-relaxed font-light">
              {treatment.description}
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#111614]">Clinically Proven Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {treatment.benefits.map((benefit, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#C7A76C]/25 flex items-start gap-2.5 text-xs sm:text-sm text-[#111614]">
                  <CheckCircle2 className="w-4 h-4 text-[#A8B59A] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Setup / Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#A8B59A]/15 border border-[#A8B59A]/20">
              <h3 className="font-serif font-semibold text-base text-[#3A4D41] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C7A76C]" />
                Ideal Candidates
              </h3>
              <ul className="space-y-2 text-xs text-[#3A4D41]">
                {treatment.bestFor.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#C7A76C]/10 border border-[#C7A76C]/30">
              <h3 className="font-serif font-semibold text-base text-[#9A7A3B] mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#C7A76C]" />
                Contraindications
              </h3>
              <ul className="space-y-2 text-xs text-[#8C857B]">
                {treatment.contraindications.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sequence Process */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#111614]">Step-by-Step Ritual Sequence</h2>
            <div className="space-y-3">
              {treatment.processSteps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#EEE6DA] flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-xs text-[#111614]">
                      Step {idx + 1}: {step.title}
                    </p>
                    <p className="text-xs text-[#8C857B] mt-1">{step.detail}</p>
                  </div>
                  <span className="text-[11px] font-mono text-[#C7A76C] bg-[#FCFBF8] px-3 py-1.5 rounded-full border border-[#C7A76C]/30 shrink-0">
                    {step.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="p-6 rounded-2xl bg-[#111614] text-white">
            <h3 className="font-serif font-semibold text-base text-[#C7A76C] mb-2">Expected Outcome</h3>
            <p className="text-xs sm:text-sm text-[#8C857B] leading-relaxed">
              {treatment.expectedOutcome}
            </p>
          </div>

          {/* Dynamic FAQ */}
          {treatment.faqs && treatment.faqs.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-[#111614]">Ritual FAQ</h2>
              <div className="space-y-3">
                {treatment.faqs.map((faq, i) => (
                  <div key={i} className="p-4 bg-white border border-[#EEE6DA] rounded-2xl">
                    <p className="font-semibold text-xs text-[#111614] mb-1">Q: {faq.q}</p>
                    <p className="text-xs text-[#8C857B] leading-relaxed">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking Trigger */}
          <div className="pt-6 border-t border-[#EEE6DA] flex justify-end">
            <Link
              href={`/book?treatment=${encodeURIComponent(treatment.name)}`}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] text-white text-xs font-semibold tracking-wider shadow-lg hover:bg-[#8FA88B] flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#EEE6DA]" />
              <span>Reserve This Ritual</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
