'use client'

import { useEffect, useRef, useState } from 'react'
import ProfitableCpmNetworkBanner from './ProfitableCpmNetworkBanner'

/**
 * Anúncio no meio do artigo. Só carrega quando está perto da viewport
 * e reserva altura para não causar layout shift.
 */
export default function InArticleAd() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <aside
      ref={ref}
      aria-label="Advertisement"
      className="my-8 flex flex-col items-center border-y border-gray-100 py-3"
      style={{ minHeight: 280 }}
    >
      <span className="mb-1 text-[10px] uppercase tracking-widest text-gray-400">Advertisement</span>
      {visible && <ProfitableCpmNetworkBanner omitContainerDomId className="py-0" />}
    </aside>
  )
}
