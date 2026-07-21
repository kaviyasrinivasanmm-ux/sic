'use client'

import dynamic from 'next/dynamic'

const FloatingChatbot = dynamic(() => import('@/components/ai-assistant/FloatingChatbot'), {
  ssr: false,
})

export default function ChatbotWrapper() {
  return <FloatingChatbot />
}
