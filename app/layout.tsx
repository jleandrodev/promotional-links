import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: 'NutraHub - Your Natural Health & Wellness Hub',
    template: '%s | NutraHub',
  },
  description:
    'Discover natural health solutions, expert guides, and quality supplements. Your trusted source for evidence-based wellness information.',
  keywords: 'natural health, supplements, wellness, herbal remedies, health guides',
  authors: [{ name: 'NutraHub' }],
  creator: 'NutraHub',
  publisher: 'NutraHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrahub.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'NutraHub',
    title: 'NutraHub - Your Natural Health & Wellness Hub',
    description:
      'Discover natural health solutions, expert guides, and quality supplements.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NutraHub - Your Natural Health & Wellness Hub',
    description:
      'Discover natural health solutions, expert guides, and quality supplements.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WQ933Z8F');`,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WQ933Z8F"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'NutraHub',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrahub.com',
              description:
                'Your trusted source for natural health and wellness products, backed by science and expert guidance.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    (process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrahub.com') + '/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
