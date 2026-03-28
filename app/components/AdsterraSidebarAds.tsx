'use client'

import { useEffect, useRef } from 'react'

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

type AtOptions = {
  key: string
  format: string
  height: number
  width: number
  params: Record<string, never>
}

declare global {
  interface Window {
    atOptions?: AtOptions
  }
}

/** Pausa entre unidades para o 1º invoke terminar antes de sobrescrever `atOptions`. */
const PAUSE_MS_BETWEEN_UNITS = 800

const LOAD_TIMEOUT_MS = 12_000

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function loadInvokeInContainer(
  container: HTMLDivElement,
  unit: (typeof UNITS)[number],
  signal: { aborted: boolean },
): Promise<void> {
  return new Promise((resolve) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      window.clearTimeout(timeoutId)
      resolve()
    }

    if (signal.aborted) {
      finish()
      return
    }

    window.atOptions = {
      key: unit.key,
      format: 'iframe',
      height: unit.height,
      width: unit.width,
      params: {},
    }

    const script = document.createElement('script')
    script.src = `https://www.highperformanceformat.com/${unit.key}/invoke.js`
    script.async = true

    const timeoutId = window.setTimeout(finish, LOAD_TIMEOUT_MS)

    script.onload = finish
    script.onerror = finish

    container.appendChild(script)
  })
}

export default function AdsterraSidebarAds() {
  const firstRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const containers = [firstRef.current, secondRef.current]
    const signal = { aborted: false }

    ;(async () => {
      for (let i = 0; i < UNITS.length; i++) {
        if (signal.aborted) return
        const container = containers[i]
        if (!container) continue

        await loadInvokeInContainer(container, UNITS[i], signal)

        if (signal.aborted) return
        if (i < UNITS.length - 1) {
          await sleep(PAUSE_MS_BETWEEN_UNITS)
        }
      }
    })()

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
