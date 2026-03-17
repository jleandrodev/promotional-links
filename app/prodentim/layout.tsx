import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/prodentim' },
}

export default function ProdentimLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
