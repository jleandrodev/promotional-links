'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { HomeContent } from '@prisma/client'
import { useRecaptcha } from '@/lib/hooks/useRecaptcha'

interface NewsletterSectionProps {
  homeContent?: HomeContent | null
}

export default function NewsletterSection({ homeContent }: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { executeRecaptcha } = useRecaptcha()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    
    try {
      // Executar reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha('newsletter_subscribe')

      if (!recaptchaToken) {
        setErrorMessage('Security validation failed. Please reload the page and try again.')
        setStatus('error')
        return
      }

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, recaptchaToken }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      setEmail('')
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
        setErrorMessage('Failed to connect. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="newsletter" className="py-16 bg-[#e6e6e6]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#053d42] mb-4">
            {homeContent?.newsletterTitle || 'Subscribe to Our Newsletter'}
          </h2>
          {homeContent?.newsletterSubtitle && (
            <p className="text-lg text-gray-600 mb-8">{homeContent.newsletterSubtitle}</p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#086972]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#086972] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0b95a2] transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
              </button>
            </div>
            <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-1 rounded border-gray-300 text-[#086972] focus:ring-[#086972]"
              />
              <span>
                I have read and agree to the{' '}
                <Link href="/privacy-policy" className="text-[#086972] hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </form>
          {status === 'success' && (
            <p className="mt-4 text-green-600">Thank you for subscribing!</p>
          )}
          {status === 'error' && errorMessage && (
            <p className="mt-4 text-red-600">{errorMessage}</p>
          )}
        </div>
      </div>
    </section>
  )
}

