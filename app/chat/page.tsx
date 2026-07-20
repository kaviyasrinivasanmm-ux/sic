'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Send,
  Bot,
  User,
  Calendar,
  ShieldCheck,
  RefreshCw,
  Scale,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  HeartHandshake,
  Clock,
  Award,
  Zap,
} from 'lucide-react'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import BookingModal from '@/components/booking/BookingModal'

interface Recommendation {
  treatment: string
  therapist: string
  duration: string
  price: string
  reason: string
  benefits: string[]
}

interface Message {
  id: string
  sender: 'ai' | 'user'
  text: string
  timestamp: string
  recommendation?: Recommendation
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: 'Namaste! Welcome to BLOOM Wellness Spa. I am your AI Ritual Consultant. Describe your physical symptoms, stress levels, or wellness goals, and I will prescribe the perfect custom treatment ritual and master therapist match for you.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const [inputQuery, setInputQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'compare' | 'faq'>('chat')

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingTreatment, setBookingTreatment] = useState<string | undefined>(undefined)
  const [bookingTherapist, setBookingTherapist] = useState<string | undefined>(undefined)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isAnalyzing])

  const presetSymptoms = [
    { label: 'Lower Back & Neck Stiffness', query: 'I have severe lower back and neck stiffness from long hours working.' },
    { label: 'Deep Stress & Insomnia', query: 'I am experiencing mental burnout, anxiety, and trouble sleeping.' },
    { label: 'Post-Workout Muscle Recovery', query: 'My muscles are sore and fatigued after heavy workouts.' },
    { label: 'Foot Fatigue & Joint Tension', query: 'My feet and lower legs are exhausted from standing all day.' },
    { label: 'Deep Conductive Warmth & Chills', query: 'I need deep heat relaxation for tight joints and cold limbs.' },
    { label: 'Skin Revitalization & Scalp Care', query: 'I want facial hydration and deep scalp tension release.' },
  ]

  const faqItems = [
    {
      q: 'How does the AI Ritual Consultant recommend treatments?',
      a: 'Our AI consultant maps your described symptoms against our therapeutic matrix—considering pressure depth, organic essential oil properties, fascial work, and therapist specialties.',
    },
    {
      q: 'What is your sterilization protocol?',
      a: 'Every therapy suite undergoes medical-grade UV-C sterilization between sessions. All linens are laundered with thermal sanitization.',
    },
    {
      q: 'Can I choose my preferred Master Therapist?',
      a: 'Yes! When you book through the AI recommendation card, your recommended therapist is automatically reserved for your session.',
    },
    {
      q: 'What is the cancellation policy?',
      a: 'We offer free cancellations up to 12 hours prior to your scheduled ritual.',
    },
  ]

  const compareData = [
    {
      name: 'Swedish Massage',
      focus: 'Light Relaxation & Beginners',
      pressure: 'Light to Medium',
      oil: 'Organic Chamomile & Lavender',
      duration: '60 / 90 / 120 Mins',
      price: '₹3,499+',
      recommendedTherapist: 'Sarah Jenkins',
    },
    {
      name: 'Deep Tissue Therapy',
      focus: 'Chronic Knots & Back Stiffness',
      pressure: 'Firm to Deep Fascial',
      oil: 'Arnica & Warm Eucalyptus',
      duration: '60 / 90 / 120 Mins',
      price: '₹4,299+',
      recommendedTherapist: 'David Vance',
    },
    {
      name: 'Aromatherapy Ritual',
      focus: 'Cortisol Reduction & Insomnia',
      pressure: 'Soft Rhythmic Glides',
      oil: 'Custom Cold-Pressed Botanicals',
      duration: '60 / 90 Mins',
      price: '₹3,999+',
      recommendedTherapist: 'Sarah Jenkins',
    },
    {
      name: 'Hot Stone Therapy',
      focus: 'Deep Conductive Warmth & Circulation',
      pressure: 'Medium Thermal Glides',
      oil: 'Volcanic Warm Basalt + Essential Oil',
      duration: '90 / 120 Mins',
      price: '₹4,799+',
      recommendedTherapist: 'Helen Lin',
    },
    {
      name: 'Reflexology Therapy',
      focus: 'Foot Meridian & Organ Rejuvenation',
      pressure: 'Targeted Acupressure',
      oil: 'Organic Peppermint & Tea Tree',
      duration: '60 / 90 Mins',
      price: '₹2,999+',
      recommendedTherapist: 'Helen Lin',
    },
  ]

  const processQuery = (queryText: string) => {
    if (!queryText.trim()) return

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: timeStr,
    }

    setMessages((prev) => [...prev, userMsg])
    setInputQuery('')
    setIsAnalyzing(true)

    setTimeout(() => {
      const lower = queryText.toLowerCase()
      let rec: Recommendation = {
        treatment: 'Swedish Massage (Serenity Ritual)',
        therapist: 'Sarah Jenkins',
        duration: '90 Minutes',
        price: '₹3,999',
        reason:
          'Gentle rhythmic strokes combined with warm organic chamomile oils to calm your nervous system and release gentle muscle tension.',
        benefits: ['Calms nervous system', 'Improves lymphatic flow', 'Releases general tension'],
      }

      if (
        lower.includes('stiff') ||
        lower.includes('back') ||
        lower.includes('neck') ||
        lower.includes('pain') ||
        lower.includes('knot') ||
        lower.includes('work') ||
        lower.includes('sitting')
      ) {
        rec = {
          treatment: 'Deep Tissue Therapy (Deep Recovery)',
          therapist: 'David Vance',
          duration: '90 Minutes',
          price: '₹4,299',
          reason:
            'Firm target pressure specifically directed at chronic muscle knots, lumbar tension, and deep fascial layers accumulated from sedentary computer work.',
          benefits: ['Eliminates stubborn muscle knots', 'Restores lumbar mobility', 'Enhances post-workout recovery'],
        }
      } else if (
        lower.includes('stress') ||
        lower.includes('sleep') ||
        lower.includes('insomnia') ||
        lower.includes('anxiety') ||
        lower.includes('burnout') ||
        lower.includes('mental') ||
        lower.includes('mind')
      ) {
        rec = {
          treatment: 'Aromatherapy Ritual (Eucalyptus & Lavender Bliss)',
          therapist: 'Sarah Jenkins',
          duration: '90 Minutes',
          price: '₹3,999',
          reason:
            'Cold-pressed lavender & eucalyptus steam inhalation paired with rhythmic lymphatic drainage to lower cortisol levels and trigger deep restorative sleep.',
          benefits: ['Lowers stress hormones', 'Encourages rapid REM sleep', 'Soothes sensory exhaustion'],
        }
      } else if (
        lower.includes('stone') ||
        lower.includes('warm') ||
        lower.includes('heat') ||
        lower.includes('cold') ||
        lower.includes('chill') ||
        lower.includes('circulation')
      ) {
        rec = {
          treatment: 'Hot Stone Therapy (Thermal Balance)',
          therapist: 'Helen Lin',
          duration: '90 Minutes',
          price: '₹4,799',
          reason:
            'Smooth volcanic basalt stones heated to 54°C melt away chronic muscle rigidity while stimulating deep vascular flow and cellular oxygenation.',
          benefits: ['Penetrates 2x deeper than hand massage', 'Boosts vascular circulation', 'Eases joint stiffness'],
        }
      } else if (
        lower.includes('feet') ||
        lower.includes('foot') ||
        lower.includes('sole') ||
        lower.includes('stand') ||
        lower.includes('leg') ||
        lower.includes('reflex')
      ) {
        rec = {
          treatment: 'Reflexology Therapy (Sole & Spirit Harmony)',
          therapist: 'Helen Lin',
          duration: '60 Minutes',
          price: '₹2,999',
          reason:
            'Targeted pressure point stimulation on foot meridians directly linked to spinal alignment, organ rejuvenation, and peripheral fluid reduction.',
          benefits: ['Relieves plantar pressure', 'Reduces lower limb swelling', 'Restores energetic equilibrium'],
        }
      } else if (
        lower.includes('skin') ||
        lower.includes('scalp') ||
        lower.includes('face') ||
        lower.includes('glow') ||
        lower.includes('head')
      ) {
        rec = {
          treatment: 'Botanical Hydrating Scalp & Facial Ritual',
          therapist: 'Sarah Jenkins',
          duration: '60 Minutes',
          price: '₹3,499',
          reason:
            'Nutrient-rich botanical serums infused into cranial pressure points, combined with gentle lymphatic facial drainage.',
          benefits: ['Releases cranial micro-tension', 'Deep skin hydration', 'Improves facial muscle tone'],
        }
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Based on your specific symptoms, I have formulated a personalized sanctuary prescription for you:',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendation: rec,
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsAnalyzing(false)
    }, 1100)
  }

  const handleBookRecommendation = (treatment: string, therapist: string) => {
    setBookingTreatment(treatment)
    setBookingTherapist(therapist)
    setIsBookingOpen(true)
  }

  const handleOpenGeneralBooking = (treatmentName?: string, therapistName?: string) => {
    setBookingTreatment(treatmentName)
    setBookingTherapist(therapistName)
    setIsBookingOpen(true)
  }

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: 'Chat history reset. Namaste! How is your body feeling today? Select a symptom chip or type your goal below.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
  }

  return (
    <main className="relative min-h-screen bg-[#FCFBF8] text-[#111614] flex flex-col justify-between overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-24 left-1/4 w-[500px] h-[300px] pointer-events-none radial-glow-gold opacity-30" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[350px] pointer-events-none radial-glow-sage opacity-25" />

      {/* Main Navbar */}
      <Navbar onOpenBooking={handleOpenGeneralBooking} />

      {/* Main Content Area */}
      <div className="pt-28 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
        {/* Header Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#C7A76C]/30 text-[#3A4D41] text-xs font-medium mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A76C] animate-pulse" />
            <span className="tracking-widest uppercase text-[11px] font-semibold text-[#C7A76C]">
              AI-Powered Spa Diagnostics
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1F1C] tracking-tight mb-3">
            AI Ritual <span className="gold-gradient-text">Consultant</span>
          </h1>
          <p className="text-sm sm:text-base text-[#4A6358] font-light leading-relaxed">
            Uncertain which ritual suits your body? Describe your muscle stiffness, stress levels, or recovery needs, and let our intelligent consultant curate your perfect treatment.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-full bg-[#EFECE6] border border-[#D9D3C7]">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-white text-[#111614] shadow-sm font-semibold'
                  : 'text-[#6E7B73] hover:text-[#111614]'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-[#C7A76C]" />
              AI Assistant Chat
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'compare'
                  ? 'bg-white text-[#111614] shadow-sm font-semibold'
                  : 'text-[#6E7B73] hover:text-[#111614]'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-[#8FA88B]" />
              Compare Rituals
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'faq'
                  ? 'bg-white text-[#111614] shadow-sm font-semibold'
                  : 'text-[#6E7B73] hover:text-[#111614]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#A8B59A]" />
              Spa & Safety FAQs
            </button>
          </div>
        </div>

        {/* TAB 1: CHAT INTERFACE */}
        {activeTab === 'chat' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col rounded-3xl glass-modal border border-[#C7A76C]/30 shadow-2xl overflow-hidden min-h-[560px]"
          >
            {/* Top Toolbar */}
            <div className="px-6 py-4 bg-[#111614] text-white flex items-center justify-between border-b border-[#C7A76C]/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C7A76C]/20 border border-[#C7A76C] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#C7A76C]" />
                </div>
                <div>
                  <h2 className="font-serif text-sm font-semibold tracking-wide flex items-center gap-2">
                    <span>BLOOM Wellness Consultant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h2>
                  <p className="text-[10px] text-[#C7A76C] tracking-wider uppercase">
                    Personalized Spa Therapy Engine
                  </p>
                </div>
              </div>
              <button
                onClick={handleResetChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Quick Symptom Chips */}
            <div className="bg-[#F6F4EF] border-b border-[#E8E2D7] p-3 sm:p-4">
              <p className="text-[11px] font-medium text-[#7C8880] uppercase tracking-wider mb-2">
                Quick Symptom Presets — Click to Analyze:
              </p>
              <div className="flex flex-wrap gap-2">
                {presetSymptoms.map((symptom, idx) => (
                  <button
                    key={idx}
                    onClick={() => processQuery(symptom.query)}
                    disabled={isAnalyzing}
                    className="px-3 py-1.5 rounded-full bg-white border border-[#D9D3C7] text-xs text-[#2A3B31] font-medium hover:border-[#C7A76C] hover:text-[#C7A76C] transition-all shadow-2xs hover:shadow-xs disabled:opacity-50"
                  >
                    {symptom.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-[#FCFBF8]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-[#111614] border border-[#C7A76C]/50 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-[#C7A76C]" />
                    </div>
                  )}

                  <div className={`max-w-2xl flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#A8B59A] text-white rounded-br-none shadow-md font-medium'
                          : 'bg-white border border-[#E5DFD5] text-[#2A3B31] rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* AI Recommendation Card */}
                      {msg.recommendation && (
                        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#FCFBF8] to-[#F3EFE7] border border-[#C7A76C]/40 shadow-sm space-y-3 text-[#111614]">
                          <div className="flex items-center justify-between border-b border-[#C7A76C]/20 pb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7A76C] flex items-center gap-1">
                              <Award className="w-3.5 h-3.5" /> Prescribed Sanctuary Ritual
                            </span>
                            <span className="text-xs font-mono font-bold text-[#A8B59A]">
                              {msg.recommendation.price}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-serif text-lg font-bold text-[#111614]">
                              {msg.recommendation.treatment}
                            </h4>
                            <p className="text-xs text-[#5A6E60] font-medium mt-0.5">
                              Therapist Match: <span className="text-[#C7A76C] font-semibold">{msg.recommendation.therapist}</span> • Duration: {msg.recommendation.duration}
                            </p>
                          </div>

                          <p className="text-xs text-[#4A5D52] italic bg-white/60 p-2.5 rounded-lg border border-[#E2DAD0]">
                            &quot;{msg.recommendation.reason}&quot;
                          </p>

                          <div className="space-y-1">
                            <span className="text-[11px] font-semibold text-[#2D3A30]">Key Benefits:</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#4A6358]">
                              {msg.recommendation.benefits.map((b, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8FA88B] shrink-0" />
                                  <span>{b}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2">
                            <button
                              onClick={() =>
                                handleBookRecommendation(
                                  msg.recommendation!.treatment,
                                  msg.recommendation!.therapist
                                )
                              }
                              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] hover:from-[#C7A76C] hover:to-[#9A7A3B] text-white font-medium text-xs tracking-wider shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                              <Calendar className="w-4 h-4 text-white/90" />
                              <span>Book This Ritual Now</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-[#9AA59D] mt-1 px-1">{msg.timestamp}</span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#A8B59A] text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-[#111614] border border-[#C7A76C]/50 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-[#C7A76C]" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white border border-[#E5DFD5] text-xs text-[#5A6E60] flex items-center gap-2 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#C7A76C] animate-spin" />
                    <span>Analyzing body tension & therapeutic suitability...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-[#E8E2D7]">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  processQuery(inputQuery)
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Describe your muscle tightness, stress, or wellness goal..."
                  className="flex-1 px-4 py-3 rounded-full bg-[#F7F5F0] border border-[#E2DAD0] text-sm text-[#111614] focus:outline-none focus:border-[#C7A76C] focus:bg-white transition-all placeholder:text-[#9AA59D]"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isAnalyzing}
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] hover:from-[#C7A76C] hover:to-[#9A7A3B] text-white text-xs font-semibold tracking-wider shadow-md disabled:opacity-40 transition-all flex items-center gap-2 shrink-0"
                >
                  <span>Consult</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* TAB 2: RITUAL COMPARISON */}
        {activeTab === 'compare' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-3xl glass-card border border-[#C7A76C]/30 shadow-lg">
              <h3 className="font-serif text-2xl font-semibold text-[#111614] mb-2">
                Sanctuary Ritual Comparison Matrix
              </h3>
              <p className="text-xs text-[#5A6E60] mb-6">
                Compare pressure, organic oil bases, durations, and master therapist matches side-by-side.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#D9D3C7] text-[#111614] font-semibold bg-[#F5F2EC]">
                      <th className="py-3 px-4 rounded-tl-xl">Ritual Name</th>
                      <th className="py-3 px-4">Primary Focus</th>
                      <th className="py-3 px-4">Pressure Level</th>
                      <th className="py-3 px-4">Botanical Oil</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Pricing (INR)</th>
                      <th className="py-3 px-4 rounded-tr-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE5DC]">
                    {compareData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FBF9F5] transition-colors">
                        <td className="py-4 px-4 font-serif font-bold text-[#111614] text-sm">
                          {row.name}
                        </td>
                        <td className="py-4 px-4 text-[#4A5D52] font-medium">{row.focus}</td>
                        <td className="py-4 px-4 text-[#2D3A30] font-semibold">{row.pressure}</td>
                        <td className="py-4 px-4 text-[#5A6E60]">{row.oil}</td>
                        <td className="py-4 px-4 text-[#7C8880]">{row.duration}</td>
                        <td className="py-4 px-4 font-mono font-bold text-[#A8B59A]">{row.price}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() =>
                              handleOpenGeneralBooking(row.name, row.recommendedTherapist)
                            }
                            className="px-3 py-1.5 rounded-full bg-[#A8B59A]/15 border border-[#A8B59A]/40 text-[#2D3A30] font-medium hover:bg-[#A8B59A] hover:text-white transition-all text-xs flex items-center gap-1"
                          >
                            <span>Book</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: SAFETY & FAQS */}
        {activeTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-card border border-[#C7A76C]/20 hover:border-[#C7A76C]/40 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-serif text-base font-bold text-[#111614] mb-2 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C7A76C] shrink-0 mt-0.5" />
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-xs text-[#4A6358] font-light leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        initialTreatment={bookingTreatment}
        initialTherapist={bookingTherapist}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  )
}
