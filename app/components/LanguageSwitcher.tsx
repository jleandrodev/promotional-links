'use client'

import { useEffect, useState } from 'react'

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
]

function getCookieLang(): string {
  if (typeof document === 'undefined') return 'en'
  const match = document.cookie.match(/googtrans=\/\w+\/(\w+)/)
  return match ? match[1] : 'en'
}

function setLang(targetLang: string) {
  const domain = window.location.hostname
  // Remove existing cookie on all domain variants
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`

  if (targetLang !== 'en') {
    const value = `/en/${targetLang}`
    document.cookie = `googtrans=${value}; path=/`
    document.cookie = `googtrans=${value}; path=/; domain=${domain}`
    document.cookie = `googtrans=${value}; path=/; domain=.${domain}`
  }
  window.location.reload()
}

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('en')

  useEffect(() => {
    setCurrentLang(getCookieLang())
  }, [])

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => {
            if (lang.code !== currentLang) {
              setCurrentLang(lang.code)
              setLang(lang.code)
            }
          }}
          title={lang.code === 'en' ? 'English' : 'Español'}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-colors border ${
            currentLang === lang.code
              ? 'bg-[#086972] text-white border-[#086972]'
              : 'bg-white text-[#053d42] border-gray-300 hover:border-[#086972] hover:text-[#086972]'
          }`}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  )
}
