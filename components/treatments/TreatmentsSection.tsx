'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle2, AlertTriangle, Sparkles, HelpCircle, ChevronRight, X, Calendar } from 'lucide-react'

export interface Treatment {
  id: string
  name: string
  subtitle: string
  category: 'relaxation' | 'pain-relief' | 'holistic' | 'thermal'
  priceINR: number
  durations: number[]
  description: string
  benefits: string[]
  bestFor: string[]
  contraindications: string[]
  processSteps: { title: string; duration: string; detail: string }[]
  expectedOutcome: string
  faqs: { q: string; a: string }[]
  bgGradient: string
  accentColor: string
}

export const TREATMENTS_DATA: Treatment[] = [
  {
    id: 'swedish',
    name: 'Swedish Massage (Serenity Ritual)',
    subtitle: 'Classic Gentle Full-Body Relaxation',
    category: 'relaxation',
    priceINR: 3499,
    durations: [60, 90, 120],
    description:
      'A classic European therapeutic ritual employing long, gliding effleurage strokes, gentle kneading, and circular friction. Perfect for first-time visitors seeking complete mental and physical unwinding.',
    benefits: [
      'Boosts lymphatic circulation & oxygen delivery',
      'Lowers salivary cortisol stress hormone by up to 34%',
      'Improves joint flexibility and muscular elasticity',
      'Induces natural serotonin and endorphin release',
    ],
    bestFor: ['First-time spa visitors', 'Office professionals with chronic fatigue', 'Light relaxation seekers'],
    contraindications: ['Recent unhealed fractures', 'Severe varicose veins', 'Acute fever or skin infection'],
    processSteps: [
      { title: 'Aroma Inhalation & Foot Bath', duration: '10 mins', detail: 'Warm eucalyptus organic foot soak while breathing pure lavender steam.' },
      { title: 'Full Body Effleurage', duration: '40 mins', detail: 'Long rhythmic palm strokes with warm organic cold-pressed sesame oil.' },
      { title: 'Gentle Scalp & Facial Meridian Release', duration: '10 mins', detail: 'Pressure point facial alignment for total cranial relaxation.' },
    ],
    expectedOutcome: 'Immediate reduction in anxiety, lightened muscular tension, and deep sleep readiness.',
    faqs: [
      { q: 'Is this massage painful?', a: 'Not at all. Swedish massage utilizes light to medium pressure tailored completely to your comfort level.' },
      { q: 'What should I wear during the session?', a: 'We provide single-use sanitized disposable undergarments. Complete privacy is guaranteed at all times.' },
    ],
    bgGradient: 'from-[#FAF4E6] to-[#F5F0EB]',
    accentColor: '#5A7365',
  },
  {
    id: 'deep-tissue',
    name: 'Deep Tissue Therapy (Deep Recovery)',
    subtitle: 'Targeted Sub-Fascial Tension Release',
    category: 'pain-relief',
    priceINR: 4299,
    durations: [60, 90, 120],
    description:
      'Reaches deep muscle layers and connective fascia to break down stubborn chronic knots, adhesions, and long-standing postural tightness. Performed by certified senior physiotherapeutic therapists.',
    benefits: [
      'Disintegrates deep muscle knots and fibrous adhesions',
      'Relieves lower back stiffness and sciatica tension',
      'Accelerates athletic recovery and lactic acid clearance',
      'Restores natural spinal alignment and posture',
    ],
    bestFor: ['Athletes & fitness enthusiasts', 'Chronic back/neck stiffness sufferers', 'Deep pressure lovers'],
    contraindications: ['Osteoporosis', 'Blood thinning medication', 'Recent major surgeries within 6 weeks'],
    processSteps: [
      { title: 'Thermal Herbal Compress Warm-up', duration: '15 mins', detail: 'Hot herbal pouches applied to soften dense muscle fascia.' },
      { title: 'Targeted Deep Elbow & Thumb Friction', duration: '50 mins', detail: 'Focused intense pressure on trigger points along the back and shoulders.' },
      { title: 'Passive Myofascial Stretching', duration: '25 mins', detail: 'Assisted spinal and hamstring lengthening to prevent rebound tightness.' },
    ],
    expectedOutcome: 'Significant release of deep postural tightness, increased range of motion, and long-term pain relief.',
    faqs: [
      { q: 'Will I feel sore the next day?', a: 'Mild tender soreness for 24 hours is normal as deep lactic acid releases. Hydrating thoroughly expedites recovery.' },
    ],
    bgGradient: 'from-[#F4F7F5] to-[#E4ECE7]',
    accentColor: '#3A4A40',
  },
  {
    id: 'aromatherapy',
    name: 'Aromatherapy Ritual (Eucalyptus Bliss)',
    subtitle: 'Olfactory Sensory & Lymphatic Reset',
    category: 'holistic',
    priceINR: 3999,
    durations: [60, 90],
    description:
      'Combines custom-blended 100% pure steam-distilled essential oils (Eucalyptus, Wild Lavender, Frankincense) with soothing lymphatic drainage techniques to harmonize mind, mood, and immune resilience.',
    benefits: [
      'Clears respiratory sinuses and lung passages',
      'Deeply nourishes dry skin with cold-pressed botanical carrier oils',
      'Regulates autonomic nervous system and insomnia',
      'Promotes emotional grounding and sensory serenity',
    ],
    bestFor: ['High-stress executives', 'Insomnia & anxiety sufferers', 'Sensory wellbeing seekers'],
    contraindications: ['First trimester pregnancy', 'Severe asthma / active fragrance allergies'],
    processSteps: [
      { title: 'Essential Oil Custom Blending', duration: '10 mins', detail: 'Select your personal oil scent profile based on your current emotional state.' },
      { title: 'Lymphatic Drainage Massage', duration: '60 mins', detail: 'Rhythmic featherlight strokes directing toxins towards lymph nodes.' },
      { title: 'Thermal Steam Inhalation', duration: '20 mins', detail: 'Warm botanical mist diffusion over face and chest.' },
    ],
    expectedOutcome: 'Profound emotional tranquility, silky hydrated skin, and unblocked nasal pathways.',
    faqs: [
      { q: 'Can I shower immediately after?', a: 'We recommend leaving the therapeutic oils on your skin for at least 4 hours for maximum absorption.' },
    ],
    bgGradient: 'from-[#FAF8F5] to-[#EDE6DD]',
    accentColor: '#C5A059',
  },
  {
    id: 'reflexology',
    name: 'Reflexology (Sole & Spirit Harmony)',
    subtitle: 'Ancient Pressure Meridian Stimulation',
    category: 'holistic',
    priceINR: 2999,
    durations: [60, 90],
    description:
      'Applies systematic pressure to specific reflex zones on the feet and hands corresponding to internal organs and bodily energy meridians. Restores visceral equilibrium from base to crown.',
    benefits: [
      'Alleviates plantar fasciitis and leg heaviness',
      'Stimulates organ digestive detoxification',
      'Reduces frequency of chronic migraine headaches',
      'Promotes deep grounding and electrical energy balance',
    ],
    bestFor: ['Senior citizens', 'People standing long hours', 'Frequent travelers & flyer fatigue'],
    contraindications: ['Active foot ulcers or fungal infections', 'Deep vein thrombosis (DVT)'],
    processSteps: [
      { title: 'Warm Himalayan Salt Foot Soak', duration: '15 mins', detail: 'Purifying mineral bath with organic rose petals.' },
      { title: 'Foot Meridian Reflexology', duration: '40 mins', detail: 'Targeted wooden tool and thumb stimulation across 64 foot zones.' },
      { title: 'Hand & Scalp Meridian Alignment', duration: '20 mins', detail: 'Gentle energy meridian work along wrists and temples.' },
    ],
    expectedOutcome: 'Lightness in legs, balanced digestion, and overall visceral vitality.',
    faqs: [
      { q: 'Do I need to undress for reflexology?', a: 'No, reflexology requires removing only shoes and socks. Loose comfortable attire is recommended.' },
    ],
    bgGradient: 'from-[#FDFBF7] to-[#F6F1EA]',
    accentColor: '#7A9484',
  },
  {
    id: 'hot-stone',
    name: 'Hot Stone Therapy (Thermal Balance)',
    subtitle: 'Volcanic Basalt Heat & Energy Healing',
    category: 'thermal',
    priceINR: 4799,
    durations: [90, 120],
    description:
      'Smooth, polished volcanic basalt stones are heated to a precise 54°C and placed along key spinal chakra centers. The radiant heat penetrates 4cm into muscle layers without requiring painful force.',
    benefits: [
      'Melts rigid muscle stiffness effortlessly via thermal conduction',
      'Dramatically enhances arterial blood flow and cell oxygenation',
      'Soothes chronic arthritis and rheumatic discomfort',
      'Delivers an unparalleled cocoon-like luxury sensation',
    ],
    bestFor: ['Cold climate stiffness', 'Rheumatic stiffness', 'Ultimate luxury pampering lovers'],
    contraindications: ['High blood pressure (uncontrolled)', 'Diabetes neuropathy', 'Heat sensitivity'],
    processSteps: [
      { title: 'Chakra Stone Placement', duration: '15 mins', detail: 'Warmed stones positioned along spine, palms, and toes.' },
      { title: 'Hot Stone Thermal Gliding', duration: '60 mins', detail: 'Therapist glides smooth warm stones over body with sweet almond oil.' },
      { title: 'Cool Marble Contrast Therapy', duration: '15 mins', detail: 'Optional cool marble stone touch to seal pores and invigorate skin.' },
    ],
    expectedOutcome: 'Complete physical melt, elevated core body warmth, and deep meditative state.',
    faqs: [
      { q: 'Are the stones dangerously hot?', a: 'No. Stones are maintained in controlled warmers at 54°C, safe and deeply soothing for skin.' },
    ],
    bgGradient: 'from-[#FAF4E6] to-[#EDE6DD]',
    accentColor: '#D4AF37',
  },
]

interface TreatmentsSectionProps {
  onOpenBooking: (treatmentName: string) => void
}

export default function TreatmentsSection({ onOpenBooking }: TreatmentsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null)

  const filteredTreatments =
    selectedFilter === 'all'
      ? TREATMENTS_DATA
      : TREATMENTS_DATA.filter((t) => t.category === selectedFilter)

  return (
    <section id="treatments" className="py-24 bg-[#FCFBF8] relative overflow-hidden">
      {/* Full-width background image beneath the header text */}
      <div className="absolute top-0 left-0 right-0 h-[480px] w-full z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 bg-[url('/spa-bg-no-human.png')] bg-cover bg-center bg-no-repeat opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFBF8] via-[#FCFBF8]/20 to-[#FCFBF8]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C7A76C] mb-3 block">
            BLOOM Spa Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111614] mb-6">
            Curated Therapeutic <span className="gold-gradient-text font-light">Rituals</span>
          </h2>
          <p className="text-base text-[#8FA88B] font-light leading-relaxed">
            Every treatment at BLOOM Spa is meticulously crafted using 100% cold-pressed organic oils, 
            medical-grade sanitized linens, and personalized pressure adjustments.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Rituals' },
              { id: 'relaxation', label: 'Relaxation' },
              { id: 'pain-relief', label: 'Pain Relief' },
              { id: 'holistic', label: 'Holistic & Aromatherapy' },
              { id: 'thermal', label: 'Thermal Hot Stone' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  selectedFilter === tab.id
                    ? 'bg-[#A8B59A] text-white shadow-md scale-105'
                    : 'glass-card border border-[#C7A76C]/20 text-[#3A4D41] hover:border-[#C7A76C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map((treatment) => (
            <motion.div
              key={treatment.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="group rounded-3xl glass-card border border-[#C7A76C]/25 hover:border-[#C7A76C] p-7 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C7A76C]/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#A8B59A]/10 text-[#A8B59A] font-bold">
                    {treatment.category}
                  </span>
                  <span className="font-serif font-bold text-xl text-[#C7A76C]">
                    ₹{treatment.priceINR.toLocaleString('en-IN')}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#111614] mb-1 group-hover:text-[#A8B59A] transition-colors">
                  {treatment.name}
                </h3>
                <p className="text-xs text-[#C7A76C] mb-4">{treatment.subtitle}</p>
                <p className="text-xs text-[#8FA88B] line-clamp-3 leading-relaxed mb-6 font-light">
                  {treatment.description}
                </p>

                {/* Key Benefits Preview */}
                <div className="space-y-2 mb-6">
                  {treatment.benefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#111614]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A8B59A] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#EEE6DA] flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedTreatment(treatment)}
                  className="flex-1 py-2.5 px-4 rounded-full glass-card border border-[#C7A76C]/30 text-xs font-semibold text-[#3A4D41] hover:bg-[#F8F5F0] transition-colors flex items-center justify-center gap-1 group-hover:border-[#C7A76C]"
                >
                  <span>Explore Details</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C7A76C]" />
                </button>

                <button
                  onClick={() => {
                    if (onOpenBooking) {
                      onOpenBooking(treatment.name)
                    } else {
                      window.location.href = `/book?treatment=${encodeURIComponent(treatment.name)}`
                    }
                  }}
                  className="py-2.5 px-5 rounded-full bg-[#A8B59A] hover:bg-[#C7A76C] text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  Book Ritual
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Treatment Detail Modal */}
      <AnimatePresence>
        {selectedTreatment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111614]/70 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#FCFBF8] border border-[#C7A76C]/30 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTreatment(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#111614]/10 hover:bg-[#111614]/20 text-[#111614] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-8 border-b border-[#EEE6DA] pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C7A76C]">
                  {selectedTreatment.category} Ritual
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111614] mt-1 mb-2">
                  {selectedTreatment.name}
                </h2>
                <p className="text-sm text-[#8FA88B]">{selectedTreatment.subtitle}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-[#111614]">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#A8B59A]/10 text-[#A8B59A] font-bold text-sm">
                    Starting ₹{selectedTreatment.priceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#8C857B]">
                    <Clock className="w-4 h-4 text-[#C7A76C]" />
                    Available Durations: {selectedTreatment.durations.join(' / ')} mins
                  </span>
                </div>
              </div>

              {/* Overview & Benefits */}
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#111614] mb-2">
                    Therapeutic Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8FA88B] leading-relaxed font-light">
                    {selectedTreatment.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#111614] mb-3">
                    Clinically Proven Benefits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedTreatment.benefits.map((benefit, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-[#C7A76C]/20 flex items-start gap-2 text-xs text-[#111614]">
                        <CheckCircle2 className="w-4 h-4 text-[#A8B59A] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best For & Contraindications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="p-4 rounded-2xl bg-[#A8B59A]/10 border border-[#A8B59A]/20">
                    <h5 className="font-serif font-semibold text-sm text-[#A8B59A] mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C7A76C]" />
                      Ideal Candidates
                    </h5>
                    <ul className="space-y-1.5 text-xs text-[#3A4D41]">
                      {selectedTreatment.bestFor.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#C7A76C]/10 border border-[#C7A76C]/30">
                    <h5 className="font-serif font-semibold text-sm text-[#9A7A3B] mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#C7A76C]" />
                      Contraindications & Warnings
                    </h5>
                    <ul className="space-y-1.5 text-xs text-[#8C857B]">
                      {selectedTreatment.contraindications.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step-by-Step Process */}
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#111614] mb-3">
                    Step-by-Step Ritual Sequence
                  </h4>
                  <div className="space-y-3">
                    {selectedTreatment.processSteps.map((step, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#EEE6DA] flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-xs text-[#111614]">
                            Step {idx + 1}: {step.title}
                          </p>
                          <p className="text-xs text-[#8C857B] mt-0.5">{step.detail}</p>
                        </div>
                        <span className="text-[11px] font-mono text-[#C7A76C] shrink-0 bg-[#FCFBF8] px-2.5 py-1 rounded-full border border-[#C7A76C]/30">
                          {step.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expected Outcome */}
                <div className="p-4 rounded-2xl bg-[#111614] text-white">
                  <h5 className="font-serif font-semibold text-sm text-[#C7A76C] mb-1">
                    Expected Outcome
                  </h5>
                  <p className="text-xs text-[#8C857B] leading-relaxed">
                    {selectedTreatment.expectedOutcome}
                  </p>
                </div>
              </div>

              {/* Modal CTA */}
              <div className="pt-4 border-t border-[#EEE6DA] flex items-center justify-between">
                <button
                  onClick={() => setSelectedTreatment(null)}
                  className="px-6 py-3 rounded-full text-xs font-semibold text-[#8C857B] hover:text-[#111614]"
                >
                  Close Window
                </button>
                <button
                  onClick={() => {
                    const name = selectedTreatment.name
                    setSelectedTreatment(null)
                    if (onOpenBooking) {
                      onOpenBooking(name)
                    } else {
                      window.location.href = `/book?treatment=${encodeURIComponent(name)}`
                    }
                  }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] hover:from-[#C7A76C] hover:to-[#9A7A3B] text-white text-xs font-semibold shadow-lg transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#EEE6DA]" />
                  <span>Reserve This Ritual</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
