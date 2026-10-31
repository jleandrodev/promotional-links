// Banners iframe da Adsterra leem a global `window.atOptions` no momento em que o invoke.js executa,
// então só um pode ser carregado por vez. Esta fila serializa os carregamentos de toda a página.

export type BannerUnit = { key: string; width: number; height: number }

type AtOptions = { key: string; format: string; height: number; width: number; params: Record<string, never> }

declare global {
  interface Window {
    atOptions?: AtOptions
  }
}

const LOAD_TIMEOUT_MS = 12_000
const SETTLE_MS = 600

let chain: Promise<void> = Promise.resolve()

export function enqueueBanner(container: HTMLElement, unit: BannerUnit, signal: { aborted: boolean }): Promise<void> {
  const task = chain.then(
    () =>
      new Promise<void>((resolve) => {
        if (signal.aborted) return resolve()
        let timeoutId = 0
        const finish = () => {
          window.clearTimeout(timeoutId)
          window.setTimeout(resolve, SETTLE_MS)
        }
        window.atOptions = { key: unit.key, format: 'iframe', height: unit.height, width: unit.width, params: {} }
        const script = document.createElement('script')
        script.src = `https://www.highperformanceformat.com/${unit.key}/invoke.js`
        script.async = true
        script.onload = finish
        script.onerror = finish
        timeoutId = window.setTimeout(finish, LOAD_TIMEOUT_MS)
        container.appendChild(script)
      }),
  )
  chain = task
  return task
}
