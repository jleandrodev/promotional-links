'use client'

import { useEffect, useRef } from 'react'
import { enqueueBanner } from '@/lib/adsterra-queue'

const UNITS = [
  {
    key: '4587424aece1db9cec44bd52a13a7528',
    height: 250,
    width: 300,
  },
  {
    key: '220c48a70cd4b708e7fc3cd15050f95b',
    height: 300,
    width: 160,
  },
] as const

export default function AdsterraSidebarAds() {
  const firstRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const containers = [firstRef.current, secondRef.current]
    const signal = { aborted: false }

    containers.forEach((container, i) => {
      if (container) void enqueueBanner(container, UNITS[i], signal)
    })

    return () => {
      signal.aborted = true
      for (const el of containers) {
        el?.replaceChildren()
      }
    }
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full [&_iframe]:max-w-full">
      <div
        ref={firstRef}
        className="w-full overflow-hidden flex justify-center"
        style={{ minHeight: UNITS[0].height }}
      />
      <div
        ref={secondRef}
        className="w-full overflow-hidden flex justify-center"
        style={{ minHeight: UNITS[1].height }}
      />
    </div>
  )
}
