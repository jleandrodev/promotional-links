// Domínio canônico do site. Ignora valores apontando para domínios que não são o do site
// (ex.: nutrahub.com) para evitar canonicals/sitemap incoerentes.
const DEFAULT_SITE_URL = 'https://nutrahub.life'

function resolveSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || '').trim().replace(/\/+$/, '')
  if (!raw) return DEFAULT_SITE_URL
  try {
    const host = new URL(raw).hostname.replace(/^www\./, '')
    return host === 'nutrahub.life' ? DEFAULT_SITE_URL : raw
  } catch {
    return DEFAULT_SITE_URL
  }
}

export const SITE_URL = resolveSiteUrl()
