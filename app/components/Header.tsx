'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="NutraHub"
              width={200}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-[#053d42] hover:text-[#086972] transition-colors">
              Home
            </Link>
            <Link href="/categories" className="text-[#053d42] hover:text-[#086972] transition-colors">
              Categories
            </Link>
            <Link href="/products" className="text-[#053d42] hover:text-[#086972] transition-colors">
              Products
            </Link>
          </nav>

          {/* CTA Button Desktop */}
          <Link
            href="/products"
            className="hidden md:block rounded-lg bg-[#086972] px-6 py-2 text-white hover:bg-[#0b95a2] transition-colors"
          >
            Shop Now
          </Link>

          {/* Botão Hambúrguer Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#053d42] hover:text-[#086972] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-16"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Menu */}
            <nav className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50 border-t">
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-[#053d42] hover:text-[#086972] transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/categories"
                  className="text-[#053d42] hover:text-[#086972] transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  href="/products"
                  className="text-[#053d42] hover:text-[#086972] transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/products"
                  className="mt-2 rounded-lg bg-[#086972] px-6 py-2 text-white hover:bg-[#0b95a2] transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop Now
                </Link>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}

