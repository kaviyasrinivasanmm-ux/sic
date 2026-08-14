'use client'

export interface AdminCredentials {
  email: string
  username: string
  passwordHash: string // Simple string comparison for demo/admin
  lastLogin?: string
}

const STORAGE_KEY_CREDS = 'bloom_admin_creds'
const STORAGE_KEY_SESSION = 'bloom_admin_session'

const DEFAULT_CREDS: AdminCredentials = {
  email: 'admin@bloom.com',
  username: 'admin',
  passwordHash: 'bloom2026',
}

export function getAdminCredentials(): AdminCredentials {
  if (typeof window === 'undefined') return DEFAULT_CREDS
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CREDS)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to parse admin credentials from localStorage', e)
  }
  return DEFAULT_CREDS
}

export function saveAdminCredentials(creds: Partial<AdminCredentials>): void {
  if (typeof window === 'undefined') return
  const current = getAdminCredentials()
  const updated = { ...current, ...creds }
  localStorage.setItem(STORAGE_KEY_CREDS, JSON.stringify(updated))
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const session = localStorage.getItem(STORAGE_KEY_SESSION)
    if (!session) return false
    const parsed = JSON.parse(session)
    // Check if token exists and not expired (7 days expiration)
    if (parsed && parsed.token && parsed.expiresAt > Date.now()) {
      return true
    }
  } catch (e) {
    console.error('Error checking admin auth session', e)
  }
  return false
}

export function loginAdmin(identifier: string, password: string): { success: boolean; message?: string } {
  if (typeof window === 'undefined') return { success: false, message: 'Server rendering error' }

  const creds = getAdminCredentials()
  const cleanId = identifier.trim().toLowerCase()
  const cleanPass = password.trim()

  const matchesEmail = cleanId === creds.email.toLowerCase()
  const matchesUsername = cleanId === creds.username.toLowerCase()
  const matchesPassword = cleanPass === creds.passwordHash

  if ((matchesEmail || matchesUsername) && matchesPassword) {
    const session = {
      token: 'bloom_admin_tok_' + Math.random().toString(36).substring(2),
      user: creds.username,
      email: creds.email,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    }
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session))

    // Record last login timestamp
    saveAdminCredentials({ lastLogin: new Date().toISOString() })
    return { success: true }
  }

  return { success: false, message: 'Invalid admin username/email or password.' }
}

export function logoutAdmin(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY_SESSION)
}

export function resetAdminPassword(email: string, newPassword: string): { success: boolean; message?: string } {
  const creds = getAdminCredentials()
  if (email.trim().toLowerCase() === creds.email.toLowerCase()) {
    saveAdminCredentials({ passwordHash: newPassword.trim() })
    return { success: true }
  }
  return { success: false, message: 'Email does not match our registered admin record.' }
}
