import type { Metadata } from 'next'
import './powerpet.css'

export const metadata: Metadata = {
  title: 'Manual Power Pet – Factura Hasta $1.000 al Mes con Recetas Caseras para Mascotas',
  description:
    'Aprende cómo preparar deliciosas recetas caseras de snacks para mascotas y empieza a facturar hasta mil dólares al mes desde casa.',
  alternates: { canonical: '/powerpet' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Manual Power Pet – Recetas Caseras para Mascotas',
    description:
      'Aprende a preparar snacks naturales para mascotas y emprende desde casa.',
    url: '/powerpet',
    type: 'website',
  },
}

export default function PowerPetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
