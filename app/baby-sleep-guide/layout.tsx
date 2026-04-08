import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import './baby-sleep-guide.css'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-bsg-lora',
})

export const metadata: Metadata = {
  title: '12 Hours of Sleep — A Gentle Guide to Help Your Baby Sleep Through the Night',
  description:
    'A gentle, practical guide to help your baby sleep 12 hours through the night. Proven methods with results in 7–10 days.',
  alternates: { canonical: '/baby-sleep-guide' },
  openGraph: {
    title: '12 Hours of Sleep — Baby Sleep Guide',
    description:
      'A gentle, practical guide to help your baby sleep through the night. Results in 7–10 days.',
    url: '/baby-sleep-guide',
    type: 'website',
  },
}

export default function BabySleepGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={lora.variable}>{children}</div>
}
