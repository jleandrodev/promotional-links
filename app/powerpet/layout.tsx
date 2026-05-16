import type { Metadata } from 'next'
import Script from 'next/script'
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
  return (
    <>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1585487672988285');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1585487672988285&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {children}
    </>
  )
}
