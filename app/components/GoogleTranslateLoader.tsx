'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: any
  }
}

/**
 * Carrega o Google Translate somente quando o visitante escolheu outro idioma
 * (cookie `googtrans`). Evita um script de terceiros em toda visita (LCP/TBT).
 */
export default function GoogleTranslateLoader() {
  useEffect(() => {
    if (!/googtrans=\/\w+\/(?!en\b)\w+/.test(document.cookie)) return

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,es', autoDisplay: false },
        'google_translate_element',
      )
    }
    const script = document.createElement('script')
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return <div id="google_translate_element" style={{ display: 'none' }} />
}
