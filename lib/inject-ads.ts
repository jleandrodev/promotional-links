const BLOCK_CONTAINERS = ['blockquote', 'ul', 'ol', 'table', 'div', 'section', 'figure', 'details', 'aside']
const TAG_RE = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g

/** H1 já é renderizado pela página; qualquer <h1> dentro do conteúdo vira <h2>. */
export function demoteH1(html: string): string {
  return html.replace(/<h1(\s|>)/gi, '<h2$1').replace(/<\/h1>/gi, '</h2>')
}

export type ArticleSegment = { html: string; adAfter: boolean }

/**
 * Divide o HTML do artigo em segmentos, marcando onde um anúncio deve entrar.
 * Só corta em fechamentos de <p> no nível raiz (nunca dentro de listas, tabelas, etc.).
 * Regras: primeiro anúncio após o 3º parágrafo, depois a cada 5; máx. `maxAds`;
 * artigos curtos (< 6 parágrafos) não recebem anúncios; nunca perto do final.
 */
export function splitArticleForAds(
  html: string,
  { firstAfter = 3, every = 5, maxAds = 3, minParagraphs = 6, keepTail = 2 } = {},
): ArticleSegment[] {
  const content = demoteH1(html)
  const cuts: number[] = []
  let depth = 0
  let match: RegExpExecArray | null
  TAG_RE.lastIndex = 0
  while ((match = TAG_RE.exec(content))) {
    const closing = match[1] === '/'
    const name = match[2].toLowerCase()
    if (BLOCK_CONTAINERS.includes(name) && !match[3]) depth += closing ? -1 : 1
    if (closing && name === 'p' && depth <= 0) cuts.push(match.index + match[0].length)
  }

  if (cuts.length < minParagraphs) return [{ html: content, adAfter: false }]

  const picked: number[] = []
  for (let i = firstAfter; i <= cuts.length - keepTail && picked.length < maxAds; i += every) {
    picked.push(cuts[i - 1])
  }

  const segments: ArticleSegment[] = []
  let last = 0
  for (const cut of picked) {
    segments.push({ html: content.slice(last, cut), adAfter: true })
    last = cut
  }
  segments.push({ html: content.slice(last), adAfter: false })
  return segments
}
