'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'mist' | 'reveal' | 'done'>('mist')

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setPhase('reveal')
          setTimeout(() => {
            setPhase('done')
            onComplete()
          }, 800)
          return 100
        }
        return prev + 2
      })
    }, 25)

    return () => clearInterval(timer)
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
        className="fixed inset-0 z-[10000] bg-[#111614] flex flex-col items-center justify-center overflow-hidden px-4"
      >
        {/* Ambient background particles */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#C5A059]/15 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-[#5A7365]/20 blur-3xl animate-pulse" />
        </div>

        {/* Brand Reveal */}
        <div className="relative z-10 text-center max-w-lg">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center gap-3 mb-8"
          >
            <div className="w-16 h-16 rounded-full border border-[#C5A059]/40 flex items-center justify-center bg-[#1A211E]/80 backdrop-blur-md shadow-[0_0_30px_rgba(197,160,89,0.3)]">
              <span className="font-serif text-3xl font-bold text-[#E7C88C]">B</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-[0.25em] text-[#FDFBF7]">
              BLOOM
            </h1>
            <p className="text-xs uppercase tracking-[0.4em] text-[#C5A059] font-medium">
              Wellness Sanctuary
            </p>
          </motion.div>

          <p className="font-serif italic text-[#8C857B] text-sm sm:text-base mb-8 font-light tracking-wide">
            "Reconnect with Yourself. Experience Wellness Beyond Relaxation."
          </p>

          {/* Progress Bar */}
          <div className="w-64 sm:w-80 h-1 bg-[#1A211E] rounded-full mx-auto overflow-hidden relative border border-[#C5A059]/20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#5A7365] via-[#C5A059] to-[#E7C88C] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center justify-between mt-3 text-[11px] text-[#8C857B] font-mono tracking-widest px-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C5A059] animate-spin-slow" />
              <span>Preparing Zen Experience</span>
            </span>
            <span>{progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
