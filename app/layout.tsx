import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'
import ChatbotWrapper from '@/components/ai-assistant/ChatbotWrapper'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

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
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-[#A8B59A] selection:text-white">
        <SmoothScroll>
          {children}
          <ChatbotWrapper />
        </SmoothScroll>
      </body>
    </html>
  )
}
