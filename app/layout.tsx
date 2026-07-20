import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'
import FloatingChatbot from '@/components/ai-assistant/FloatingChatbot'

export const metadata: Metadata = {
  title: 'BLOOM Wellness Spa | Reconnect with Yourself',
  description: 'An Awwwards-certified luxury wellness spa. Experience organic aromatherapy rituals, deep tissue physical therapy, hot stone treatments, and medical-grade UV sterilization.',
  keywords: 'luxury spa, wellness spa, BLOOM spa, Swedish massage, deep tissue therapy, aromatherapy, hot stone massage, reflexology, Bangalore spa',
  openGraph: {
    title: 'BLOOM Wellness Spa | Reconnect with Yourself',
    description: 'Awwwards-quality luxury spa featuring certified therapists and medical-grade sterilization.',
    url: 'https://bloomwellness.com',
    siteName: 'BLOOM Wellness Spa',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-[#A8B59A] selection:text-white">
        <SmoothScroll>
          {children}
          <FloatingChatbot />
        </SmoothScroll>
      </body>
    </html>
  )
}
