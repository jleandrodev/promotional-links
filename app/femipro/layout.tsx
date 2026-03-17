import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/femipro' },
}

export default function FemiProLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
