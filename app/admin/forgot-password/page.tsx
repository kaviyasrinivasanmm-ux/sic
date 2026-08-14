'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { KeyRound, Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'
import { resetAdminPassword, getAdminCredentials } from '@/lib/adminAuth'

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [step, setStep] = useState<'verify' | 'reset' | 'success'>('verify')
  const [errorMsg, setErrorMsg] = useState('')

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    const currentCreds = getAdminCredentials()
    if (email.trim().toLowerCase() === currentCreds.email.toLowerCase()) {
      setStep('reset')
    } else {
      setErrorMsg('No admin account found matching this email address.')
    }
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.')
      return
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }

    const res = resetAdminPassword(email, newPassword)
    if (res.success) {
      setStep('success')
    } else {
      setErrorMsg(res.message || 'Failed to update password.')
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111614] flex flex-col justify-between relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-radial from-[#C7A76C]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <Link href="/admin/login" className="flex items-center gap-2 text-xs text-[#4A6358] hover:text-[#C7A76C] transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Login</span>
        </Link>
      </header>

      {/* Form Container */}
      <div className="my-auto py-12 px-4 flex items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#1D2B23] border border-[#C7A76C]/35 rounded-3xl p-8 shadow-2xl backdrop-blur-md text-[#FCFBF8]"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#C7A76C]/15 border border-[#C7A76C]/40 flex items-center justify-center mx-auto mb-4 text-[#C7A76C]">
              <KeyRound className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FCFBF8] mb-2">
              Password Recovery
            </h1>
            <p className="text-xs text-[#C5D3CB] font-light leading-relaxed">
              Reset master admin access credentials.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-red-900/40 border border-red-700/50 text-red-200 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-300 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 'verify' && (
            <form onSubmit={handleVerifyEmail} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C7A76C] font-semibold mb-2">
                  Admin Registered Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5D3CB]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@bloom.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#283A30] border border-[#C7A76C]/30 text-white text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#C7A76C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#C7A76C] to-[#9A7A3B] text-white font-semibold text-xs tracking-wider shadow-lg hover:opacity-95 transition-opacity"
              >
                Verify Admin Email
              </button>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C7A76C] font-semibold mb-2">
                  New Admin Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#283A30] border border-[#C7A76C]/30 text-white text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#C7A76C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C7A76C] font-semibold mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#283A30] border border-[#C7A76C]/30 text-white text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#C7A76C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#C7A76C] to-[#9A7A3B] text-white font-semibold text-xs tracking-wider shadow-lg hover:opacity-95 transition-opacity"
              >
                Save New Password
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6 py-4">
              <CheckCircle2 className="w-12 h-12 text-[#A8B59A] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-white">Password Updated Successfully</h3>
              <p className="text-xs text-[#C5D3CB]">
                Your master admin credentials have been updated. You may now log in with your new password.
              </p>
              <Link
                href="/admin/login"
                className="inline-block w-full py-3.5 rounded-full bg-gradient-to-r from-[#A8B59A] to-[#8FA88B] text-white font-semibold text-xs tracking-wider shadow-md"
              >
                Proceed to Login
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      <footer className="p-6 text-center text-xs text-[#4A6358] border-t border-[#C7A76C]/15 z-10">
        © {new Date().getFullYear()} BLOOM Wellness Spa Admin Infrastructure
      </footer>
    </main>
  )
}
