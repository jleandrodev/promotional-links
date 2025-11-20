'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface Category {
  id: string
  name: string
  slug: string
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

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
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <span className="text-[#053d42] cursor-default py-2 block">
                Blog
              </span>
              {isDropdownOpen && categories.length > 0 && (
                <div className="absolute top-full left-0 pt-1 w-48">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="block px-4 py-2 text-[#053d42] hover:bg-gray-100 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
                <div className="py-2">
                  <span className="text-[#053d42] font-semibold">Blog</span>
                  {categories.length > 0 && (
                    <div className="mt-2 pl-4 flex flex-col gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.slug}`}
                          className="text-[#053d42] hover:text-[#086972] transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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

