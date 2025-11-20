'use client'

import { useState } from 'react'
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
        setErrorMessage('Erro ao validar segurança. Por favor, recarregue a página e tente novamente.')
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
        setErrorMessage(data.error || 'Algo deu errado. Tente novamente.')
        setStatus('error')
        return
      }

      setStatus('success')
      setEmail('')
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      setErrorMessage('Erro ao conectar com o servidor. Tente novamente.')
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
              placeholder="Digite seu email"
              required
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#086972] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0b95a2] transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Cadastrando...' : status === 'success' ? 'Cadastrado!' : 'Inscrever-se'}
            </button>
          </form>
          {status === 'success' && (
            <p className="mt-4 text-green-600">Obrigado por se inscrever!</p>
          )}
          {status === 'error' && errorMessage && (
            <p className="mt-4 text-red-600">{errorMessage}</p>
          )}
        </div>
      </div>
    </section>
  )
}

