import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CookieBanner } from "./components/CookieBanner";
import GoogleTranslateLoader from "./components/GoogleTranslateLoader";
import { SITE_URL } from '@/lib/site'

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
  metadataBase: new URL(SITE_URL),
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
        <style>{`
          .goog-te-banner-frame, .goog-te-balloon-frame { display: none !important; }
          body { top: 0 !important; }
          .goog-te-menu-value span { color: #053d42; }
          .goog-tooltip { display: none !important; }
        `}</style>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'NutraHub',
              url: SITE_URL,
              description:
                'Your trusted source for natural health and wellness products, backed by science and expert guidance.',
              publisher: {
                '@type': 'Organization',
                name: 'NutraHub',
                url: SITE_URL,
                logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.svg` },
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
        <GoogleTranslateLoader />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
