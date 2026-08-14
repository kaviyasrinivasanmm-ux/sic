'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Lock, Mail, User, LogOut, RefreshCw, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { getAdminCredentials, saveAdminCredentials, logoutAdmin } from '@/lib/adminAuth'
import { resetSystemData } from '@/lib/adminData'
import ConfirmModal from './ConfirmModal'

interface AdminSettingsTabProps {
  onRefreshAll: () => void
}

export default function AdminSettingsTab({ onRefreshAll }: AdminSettingsTabProps) {
  const router = useRouter()
  const creds = getAdminCredentials()

  const [email, setEmail] = useState(creds.email)
  const [username, setUsername] = useState(creds.username)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [credsSuccess, setCredsSuccess] = useState('')
  const [passSuccess, setPassSuccess] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false)

  const handleUpdateCreds = (e: React.FormEvent) => {
    e.preventDefault()
    setCredsSuccess('')
    setErrorMsg('')

    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    saveAdminCredentials({ email, username })
    setCredsSuccess('Admin credentials updated successfully.')
    onRefreshAll()
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setPassSuccess('')
    setErrorMsg('')

    if (currentPassword !== creds.passwordHash) {
      setErrorMsg('Current password is incorrect.')
      return
    }
    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.')
      return
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('New password confirmation does not match.')
      return
    }

    saveAdminCredentials({ passwordHash: newPassword })
    setPassSuccess('Master password changed successfully.')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleLogout = () => {
    logoutAdmin()
    router.replace('/admin/login')
  }

  const handleConfirmResetData = () => {
    resetSystemData()
    setIsResetConfirmOpen(false)
    onRefreshAll()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-[#111614]">Settings & Security Controls</h2>
        <p className="text-xs text-[#4A6358]">Manage master administrator credentials, session settings, and system data resets.</p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Update Email & Username */}
        <div className="p-7 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-[#EEE6DA] pb-4">
            <div className="w-10 h-10 rounded-full bg-[#C7A76C]/10 border border-[#C7A76C]/30 flex items-center justify-center text-[#C7A76C]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#111614]">Admin Credentials</h3>
              <p className="text-xs text-[#4A6358]">Update registered master email and username.</p>
            </div>
          </div>

          {credsSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{credsSuccess}</span>
            </div>
          )}

          <form onSubmit={handleUpdateCreds} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C857B]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Admin Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C857B]" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#A8B59A] hover:bg-[#C7A76C] text-white font-semibold text-xs shadow-md transition-colors"
              >
                Save Credential Changes
              </button>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div className="p-7 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-[#EEE6DA] pb-4">
            <div className="w-10 h-10 rounded-full bg-[#C7A76C]/10 border border-[#C7A76C]/30 flex items-center justify-center text-[#C7A76C]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#111614]">Master Password</h3>
              <p className="text-xs text-[#4A6358]">Change your authentication password.</p>
            </div>
          </div>

          {passSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{passSuccess}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter existing password"
                className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-[#4A6358] mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-4 py-3 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 text-[#111614]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#C7A76C] text-white font-semibold text-xs shadow-md"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Security & System Controls Section */}
      <div className="p-7 rounded-3xl bg-[#FCFBF8] border border-[#C7A76C]/25 shadow-sm space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#111614]">Session & System Controls</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Sign Out Button */}
          <div className="p-5 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-[#111614] text-sm">Terminate Active Admin Session</h4>
              <p className="text-xs text-[#4A6358]">Securely log out of the BLOOM Admin Dashboard.</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Reset Baseline Data Button */}
          <div className="p-5 rounded-2xl bg-[#F8F5F0] border border-[#C7A76C]/20 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-[#111614] text-sm">Reset System Data</h4>
              <p className="text-xs text-[#4A6358]">Revert bookings, expenses & treatments to baseline mock data.</p>
            </div>
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="px-5 py-2.5 rounded-full bg-gray-900 hover:bg-black text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        title="Reset Baseline System Data?"
        message="Are you sure you want to reset all bookings, expenses, treatments, and therapists to default initial records? Custom changes will be cleared."
        confirmText="Yes, Reset All Data"
        onConfirm={handleConfirmResetData}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  )
}
