import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CookieBanner } from "./components/CookieBanner";

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
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
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
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
        )}
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
