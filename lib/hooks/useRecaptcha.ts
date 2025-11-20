'use client'

import { useCallback } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export function useRecaptcha() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      if (!siteKey) {
        console.warn('reCAPTCHA site key não configurada')
        return null
      }

      if (typeof window === 'undefined') {
        console.warn('reCAPTCHA não disponível no servidor')
        return null
      }

      // Aguardar o reCAPTCHA estar pronto
      return new Promise((resolve) => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(siteKey, { action })
              resolve(token)
            } catch (error) {
              console.error('Erro ao executar reCAPTCHA:', error)
              resolve(null)
            }
          })
        } else {
          // Aguardar o script carregar
          const checkInterval = setInterval(() => {
            if (window.grecaptcha) {
              clearInterval(checkInterval)
              window.grecaptcha.ready(async () => {
                try {
                  const token = await window.grecaptcha.execute(siteKey, { action })
                  resolve(token)
                } catch (error) {
                  console.error('Erro ao executar reCAPTCHA:', error)
                  resolve(null)
                }
              })
            }
          }, 100)

          // Timeout após 5 segundos
          setTimeout(() => {
            clearInterval(checkInterval)
            if (!window.grecaptcha) {
              console.warn('reCAPTCHA não carregado após timeout')
              resolve(null)
            }
          }, 5000)
        }
      })
    },
    [siteKey]
  )

  return { executeRecaptcha }
}

