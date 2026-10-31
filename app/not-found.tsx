import Link from 'next/link'
import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center px-4 py-24">
        <div className="max-w-xl text-center">
          <h1 className="text-4xl font-bold text-[#053d42] mb-4">Page not found</h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for does not exist or has been moved. Try one of these instead:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="px-5 py-2 rounded-full bg-[#086972] text-white font-semibold">Home</Link>
            <Link href="/blog" className="px-5 py-2 rounded-full bg-[#0fc1d1] text-white font-semibold">Blog</Link>
            <Link href="/categories" className="px-5 py-2 rounded-full border border-[#086972] text-[#086972] font-semibold">Categories</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
