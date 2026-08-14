'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/adminAuth'

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace('/admin/login')
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#111614] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#C7A76C] border-t-transparent animate-spin mb-4" />
        <p className="font-serif text-[#FCFBF8] text-sm tracking-widest uppercase">
          Verifying Admin Credentials...
        </p>
      </div>
    )
  }

  return <>{children}</>
}
