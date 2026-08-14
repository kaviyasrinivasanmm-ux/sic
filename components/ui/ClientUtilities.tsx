'use client'

import dynamic from 'next/dynamic'

const AmbientAudio = dynamic(() => import('@/components/ui/AmbientAudio'), { ssr: false })

export default function ClientUtilities() {
  return (
    <>
      <AmbientAudio />
    </>
  )
}
