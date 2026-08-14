'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { setStaffAuthenticated } from '@/lib/adminData'
import { UserCheck, Lock, Mail, ArrowRight, Shield, AlertCircle } from 'lucide-react'

export default function StaffLoginPage() {
  const [email, setEmail] = useState('staff@bloom.com')
  const [password, setPassword] = useState('staff123')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      // Validate staff credentials
      if (
        (email.trim().toLowerCase() === 'staff@bloom.com' || email.trim().toLowerCase() === 'concierge@bloom.com') &&
        password === 'staff123'
      ) {
        setStaffAuthenticated(true)
        router.push('/staff')
      } else {
        setError('Invalid staff credentials. Please check your staff email & security password.')
        setIsLoading(false)
      }
    }, 600)
  }

  return (
    <main className="min-h-screen bg-[#1D2B23] text-[#FAF7F2] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C7A76C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#5A7365]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Back Link */}
        <div className="mb-6 flex justify-between items-center text-xs text-[#C5D3CB]">
          <Link href="/" className="hover:text-[#C7A76C] transition-colors flex items-center gap-1.5">
            ← Return to BLOOM Sanctuary
          </Link>
          <span className="font-mono text-[10px] text-[#C7A76C] border border-[#C7A76C]/30 px-2 py-0.5 rounded-full">
            Staff Concierge Portal
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-[#283A30]/90 backdrop-blur-md border border-[#C7A76C]/30 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A8B59A]/20 to-[#C7A76C]/20 border border-[#C7A76C]/40 text-[#C7A76C] flex items-center justify-center mx-auto shadow-inner">
              <UserCheck className="w-7 h-7 stroke-[1.8]" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white tracking-wide">
              Staff Concierge Login
            </h1>
            <p className="text-xs text-[#C5D3CB]">
              Access booking schedules, guest concierge, and cancellation requests.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-700/60 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C7A76C] mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C857B]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@bloom.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1D2B23] border border-[#C7A76C]/30 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#C7A76C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C7A76C] mb-1.5">
                Staff Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C857B]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1D2B23] border border-[#C7A76C]/30 text-white text-xs focus:outline-none focus:border-[#C7A76C]"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1D2B23]/70 border border-[#C7A76C]/20 text-[11px] text-[#C5D3CB]">
              🔑 Demo Staff Credentials: <strong className="text-white font-mono">staff@bloom.com</strong> / <strong className="text-white font-mono">staff123</strong>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C7A76C] to-[#9A7A3B] hover:from-[#d4b579] hover:to-[#aa8846] text-white font-semibold text-xs tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all hover:opacity-95 disabled:opacity-50"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In to Staff Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#C7A76C]/20 text-center">
            <p className="text-[11px] text-[#8C857B] flex items-center justify-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#C7A76C]" />
              <span>Restricted Staff Operations • Financial Reports Excluded</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
