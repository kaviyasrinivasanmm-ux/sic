'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Send, Bot, Calendar, ArrowRight, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react'

interface AIAssistantOrbProps {
  isOpen: boolean
  onClose: () => void
  onSelectRecommendation: (treatmentName: string, therapistName?: string) => void
}

interface Message {
  id: string
  sender: 'ai' | 'user'
  text: string
  recommendation?: {
    treatment: string
    therapist: string
    duration: string
    price: string
    reason: string
  }
}

export default function AIAssistantOrb({ isOpen, onClose, onSelectRecommendation }: AIAssistantOrbProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Namaste! I am Bloom AI, your personal Wellness Consultant. How is your body feeling today? Select an area of focus or describe your symptoms below.',
    },
  ])
  const [inputQuery, setInputQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const presetSymptoms = [
    { label: 'Lower Back & Neck Stiffness', value: 'stiffness' },
    { label: 'Deep Stress & Insomnia', value: 'stress' },
    { label: 'Post-Workout Muscle Fatigue', value: 'recovery' },
    { label: 'Mental Burnout & Anxiety', value: 'mental' },
  ]

  const processQuery = (queryText: string) => {
    if (!queryText.trim()) return

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: queryText }
    setMessages((prev) => [...prev, userMsg])
    setInputQuery('')
    setIsAnalyzing(true)

    setTimeout(() => {
      const lower = queryText.toLowerCase()
      let rec = {
        treatment: 'Swedish Massage (Serenity Ritual)',
        therapist: 'Sarah Jenkins',
        duration: '90 Minutes',
        price: '₹3,999',
        reason: 'Gentle rhythmic strokes combined with warm organic chamomile oils to calm your nervous system and release gentle muscle tension.',
      }

      if (lower.includes('stiff') || lower.includes('back') || lower.includes('neck') || lower.includes('pain') || lower.includes('knot')) {
        rec = {
          treatment: 'Deep Tissue Therapy (Deep Recovery)',
          therapist: 'David Vance',
          duration: '90 Minutes',
          price: '₹4,299',
          reason: 'Firm target pressure specifically directed at chronic muscle knots, lumbar tension, and deep fascial layers.',
        }
      } else if (lower.includes('stress') || lower.includes('sleep') || lower.includes('insomnia') || lower.includes('mind') || lower.includes('mental')) {
        rec = {
          treatment: 'Aromatherapy Ritual (Eucalyptus & Lavender Bliss)',
          therapist: 'Sarah Jenkins',
          duration: '90 Minutes',
          price: '₹3,999',
          reason: 'Cold-pressed eucalyptus steam inhalation paired with lymphatic drainage to instantly lower cortisol levels and induce deep restorative sleep.',
        }
      } else if (lower.includes('stone') || lower.includes('warm') || lower.includes('cold') || lower.includes('blood') || lower.includes('circulation')) {
        rec = {
          treatment: 'Hot Stone Therapy (Thermal Balance)',
          therapist: 'Helen Lin',
          duration: '90 Minutes',
          price: '₹4,799',
          reason: 'Volcanic basalt stones heated to 54°C melt away chronic muscle rigidity while restoring deep energetic flow.',
        }
      } else if (lower.includes('feet') || lower.includes('foot') || lower.includes('sole') || lower.includes('stand') || lower.includes('reflex')) {
        rec = {
          treatment: 'Reflexology Therapy (Sole & Spirit Harmony)',
          therapist: 'Helen Lin',
          duration: '60 Minutes',
          price: '₹2,999',
          reason: 'Targeted pressure point stimulation on foot meridians directly linked to spinal health and organ rejuvenation.',
        }
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Based on your symptoms, I strongly recommend the following customized sanctuary ritual:`,
        recommendation: rec,
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsAnalyzing(false)
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] max-h-[640px] flex flex-col rounded-3xl glass-modal border border-[#C5A059]/40 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#111614] to-[#1A211E] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#E7C88C] animate-pulse" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#5A7365] border-2 border-[#111614]" />
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold text-[#FDFBF7]">
                  Bloom AI Consultant
                </h3>
                <p className="text-[10px] text-[#C5A059] tracking-wider uppercase">
                  Personalized Ritual Matcher
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#8C857B] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[420px] bg-[#FDFBF7]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#5A7365] text-white rounded-br-none'
                      : 'bg-white border border-[#C5A059]/25 text-[#111614] shadow-xs rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Recommendation Card */}
                  {msg.recommendation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3.5 rounded-xl bg-[#FDFBF7] border border-[#C5A059]/40 space-y-2 text-xs text-[#111614]"
                    >
                      <div className="flex items-center justify-between font-serif font-bold text-sm text-[#5A7365]">
                        <span>{msg.recommendation.treatment}</span>
                        <span className="text-[#C5A059]">{msg.recommendation.price}</span>
                      </div>

                      <p className="text-[11px] text-[#5A7365] italic">
                        "{msg.recommendation.reason}"
                      </p>

                      <div className="pt-2 border-t border-[#EDE6DD] flex items-center justify-between text-[11px]">
                        <span className="text-[#8C857B]">
                          Therapist: <strong>{msg.recommendation.therapist}</strong>
                        </span>
                        <span className="text-[#8C857B]">
                          Duration: <strong>{msg.recommendation.duration}</strong>
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          onClose()
                          onSelectRecommendation(
                            msg.recommendation!.treatment,
                            msg.recommendation!.therapist
                          )
                        }}
                        className="w-full mt-2 py-2 px-3 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#9A7A3B] text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm hover:opacity-95"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Recommended Ritual</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}

            {isAnalyzing && (
              <div className="flex items-center gap-2 text-xs text-[#5A7365] font-medium italic">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C5A059]" />
                <span>Analyzing body wellness parameters...</span>
              </div>
            )}
          </div>

          {/* Quick Presets */}
          <div className="px-4 py-2 bg-[#F6F1EA] border-t border-[#EDE6DD] flex flex-wrap gap-1.5">
            {presetSymptoms.map((preset) => (
              <button
                key={preset.value}
                onClick={() => processQuery(preset.label)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-[#5A7365] hover:text-white border border-[#C5A059]/20 text-[11px] text-[#5A7365] transition-colors"
              >
                + {preset.label}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              processQuery(inputQuery)
            }}
            className="p-3 bg-white border-t border-[#C5A059]/20 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="e.g. I have severe neck stiffness & low sleep..."
              className="flex-1 px-3.5 py-2 text-xs rounded-full bg-[#FDFBF7] border border-[#C5A059]/30 focus:outline-none focus:border-[#C5A059] text-[#111614]"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-[#5A7365] hover:bg-[#C5A059] text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
