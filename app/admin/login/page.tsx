'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles } from 'lucide-react'
import { loginAdmin } from '@/lib/adminAuth'

export default function AdminLoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    setTimeout(() => {
      const res = loginAdmin(identifier, password)
      if (res.success) {
        router.push('/admin')
      } else {
        setErrorMsg(res.message || 'Invalid admin credentials')
        setLoading(false)
      }
    }, 400)
  }

  const fillDemoCreds = () => {
    setIdentifier('admin@bloom.com')
    setPassword('bloom2026')
    setErrorMsg('')
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111614] flex flex-col justify-between relative overflow-hidden">
      {/* Background Subtle Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-[#C7A76C]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#1D2B23] border border-[#C7A76C]/40 flex items-center justify-center text-[#C7A76C] font-serif text-xl font-bold shadow-xs">
            B
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-wider text-[#111614]">BLOOM</span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#9A7A3B] font-medium">
              Admin Portal
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs text-[#4A6358] hover:text-[#C7A76C] transition-colors flex items-center gap-1 font-medium"
        >
          <span>← Back to Spa Site</span>
        </Link>
      </header>

      {/* Login Card Section */}
      <div className="my-auto py-12 px-4 flex items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-[#1D2B23] border border-[#C7A76C]/35 rounded-3xl p-8 shadow-2xl relative text-[#FCFBF8]"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#C7A76C]/15 border border-[#C7A76C]/40 flex items-center justify-center mx-auto mb-4 text-[#C7A76C]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FCFBF8] mb-2">
              Management Portal
            </h1>
            <p className="text-xs text-[#C5D3CB] font-light leading-relaxed">
              Authenticate to manage BLOOM Wellness Spa bookings, treatments, therapists, and finances.
            </p>
          </div>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-2xl bg-red-900/40 border border-red-700/50 text-red-200 text-xs flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-300 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email / Username Input */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C7A76C] font-semibold mb-2">
                Admin Username or Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5D3CB]" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@bloom.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#283A30] border border-[#C7A76C]/30 text-white text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#C7A76C] transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase tracking-wider text-[#C7A76C] font-semibold">
                  Master Password
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-xs text-[#A8B59A] hover:text-[#C7A76C] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5D3CB]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#283A30] border border-[#C7A76C]/30 text-white text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#C7A76C] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C5D3CB] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#C7A76C] to-[#9A7A3B] hover:opacity-95 text-white font-semibold text-xs tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper Button */}
          <div className="mt-6 pt-6 border-t border-[#C7A76C]/20 text-center">
            <button
              type="button"
              onClick={fillDemoCreds}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C7A76C]/15 border border-[#C7A76C]/30 text-xs text-[#E7C88C] hover:bg-[#C7A76C]/25 transition-all font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C7A76C]" />
              <span>Auto-Fill Default Demo Credentials</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-[#4A6358] border-t border-[#C7A76C]/15 relative z-10">
        © {new Date().getFullYear()} BLOOM Wellness Spa. Protected Admin Infrastructure.
      </footer>
    </main>
  )
}
