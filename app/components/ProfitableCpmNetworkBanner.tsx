'use client'

import { useEffect, useRef } from 'react'

const DEFAULT_CONTAINER_ID = 'container-64d42fd47ca41db70daea5871a4399ee'
const DEFAULT_SCRIPT_SRC =
  'https://pl29002357.profitablecpmratenetwork.com/64d42fd47ca41db70daea5871a4399ee/invoke.js'

export type ProfitableCpmNetworkBannerProps = {
  className?: string
  containerId?: string
  scriptSrc?: string
  /**
   * Mesma zona 2x na página: sem `id` no div evita HTML inválido;
   * o script continua filho do slot (âncora no nó correto).
   */
  omitContainerDomId?: boolean
}

export default function ProfitableCpmNetworkBanner({
  className = '',
  containerId = DEFAULT_CONTAINER_ID,
  scriptSrc = DEFAULT_SCRIPT_SRC,
  omitContainerDomId = false,
}: ProfitableCpmNetworkBannerProps) {
  const slotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slot = slotRef.current
    if (!slot) return

    if (slot.querySelector(`script[src="${scriptSrc}"]`)) return

    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-cfasync', 'false')
    script.src = scriptSrc

    slot.appendChild(script)

    return () => {
      slot.replaceChildren()
    }
  }, [containerId, scriptSrc])

  return (
    <div
      className={`flex w-full justify-center py-8 [&_iframe]:max-w-full ${className}`.trim()}
    >
      <div ref={slotRef} id={omitContainerDomId ? undefined : containerId} />
    </div>
  )
}
