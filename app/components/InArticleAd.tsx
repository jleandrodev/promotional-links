'use client'

import { useEffect, useRef } from 'react'
import { enqueueBanner } from '@/lib/adsterra-queue'

const UNIT = { key: '4587424aece1db9cec44bd52a13a7528', width: 300, height: 250 }

/**
 * Anúncio no meio do artigo (banner 300x250). Só carrega quando está perto da viewport
 * e reserva altura para não causar layout shift.
 */
export default function InArticleAd() {
  const ref = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const slot = slotRef.current
    if (!el || !slot) return
    const signal = { aborted: false }
    const load = () => void enqueueBanner(slot, UNIT, signal)

    if (!('IntersectionObserver' in window)) {
      load()
      return () => {
        signal.aborted = true
        slot.replaceChildren()
      }
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          load()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => {
      signal.aborted = true
      io.disconnect()
      slot.replaceChildren()
    }
  }, [])

  return (
    <aside
      ref={ref}
      aria-label="Advertisement"
      className="my-8 flex flex-col items-center border-y border-gray-100 py-3"
      style={{ minHeight: 290 }}
    >
      <span className="mb-1 text-[10px] uppercase tracking-widest text-gray-400">Advertisement</span>
      <div ref={slotRef} className="flex w-full justify-center overflow-hidden [&_iframe]:max-w-full" style={{ minHeight: UNIT.height }} />
    </aside>
  )
}
