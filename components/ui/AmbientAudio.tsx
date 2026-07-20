'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])

  const startAmbientSynth = () => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime) // Gentle ambient volume
      masterGain.connect(ctx.destination)
      gainNodeRef.current = masterGain

      // Tibetan Bowl Frequencies (Hz): 432Hz (A4 tuning), 216Hz, 108Hz drone
      const freqs = [108, 216, 432, 528] // 528Hz Solfeggio Love/Healing Frequency

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const oscGain = ctx.createGain()

        osc.type = idx === 0 ? 'sine' : 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Subtle LFO modulation for warm organic wave pulse
        const lfo = ctx.createOscillator()
        lfo.type = 'sine'
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime)

        const lfoGain = ctx.createGain()
        lfoGain.gain.setValueAtTime(0.02, ctx.currentTime)

        lfo.connect(lfoGain)
        lfoGain.connect(oscGain.gain)

        oscGain.gain.setValueAtTime(0.04 / (idx + 1), ctx.currentTime)

        osc.connect(oscGain)
        oscGain.connect(masterGain)

        osc.start()
        lfo.start()

        oscillatorsRef.current.push(osc, lfo)
      })
    } catch {
      console.warn('Web Audio API not supported in this environment.')
    }
  }

  const toggleSound = () => {
    setHasInteracted(true)
    if (!isPlaying) {
      startAmbientSynth()
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.08, audioCtxRef.current.currentTime + 1)
      }
      setIsPlaying(true)
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8)
      }
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      <motion.button
        onClick={toggleSound}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-card hover:border-[#C7A76C]/50 transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? 'Mute Zen BLOOM Soundscape' : 'Play Zen Ambient Soundscape (432Hz)'}
      >
        <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#A8B59A]/10 text-[#A8B59A] group-hover:bg-[#C7A76C] group-hover:text-white transition-colors duration-300">
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </div>

        <span className="text-xs font-medium tracking-wide text-[#3A4D41] group-hover:text-[#111614] transition-colors">
          {isPlaying ? 'BLOOM Audio: On' : 'Zen Soundscape'}
        </span>

        {/* Animated wave bars when playing */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 ml-1">
            <span className="w-0.5 h-3 bg-[#C7A76C] rounded-full animate-[bounce_1.2s_infinite_100ms]" />
            <span className="w-0.5 h-4 bg-[#A8B59A] rounded-full animate-[bounce_1.2s_infinite_300ms]" />
            <span className="w-0.5 h-2 bg-[#C7A76C] rounded-full animate-[bounce_1.2s_infinite_200ms]" />
          </div>
        )}
      </motion.button>

      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111614]/80 text-[#E7C88C] text-[11px] backdrop-blur-md shadow-md"
        >
          <Sparkles className="w-3 h-3 animate-spin-slow" />
          <span>Click to enable 432Hz healing soundscape</span>
        </motion.div>
      )}
    </div>
  )
}
