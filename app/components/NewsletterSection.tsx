'use client'

import { useState } from 'react'
import type { HomeContent } from '@prisma/client'

interface NewsletterSectionProps {
  homeContent?: HomeContent | null
}

export default function NewsletterSection({ homeContent }: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // TODO: Integrate with email service (e.g., Mailchimp, ConvertKit)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-16 bg-[#e6e6e6]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#053d42] mb-4">
            {homeContent?.newsletterTitle || 'Subscribe to Our Newsletter'}
          </h2>
          {homeContent?.newsletterSubtitle && (
            <p className="text-lg text-gray-600 mb-8">{homeContent.newsletterSubtitle}</p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
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
          </form>
          {status === 'success' && (
            <p className="mt-4 text-green-600">Thank you for subscribing!</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-600">Something went wrong. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  )
}

