'use client'

import Image from 'next/image'

interface ProductSidebarCardProps {
  product: {
    name: string
    image?: string | null
    excerpt?: string | null
    link?: string | null
  }
}

export default function ProductSidebarCard({ product }: ProductSidebarCardProps) {
  if (!product.link) return null

  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
    >
      {product.image && (
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#053d42] mb-3 group-hover:text-[#086972] transition-colors">
          {product.name}
        </h3>
        {product.excerpt && (
          <p className="text-gray-600 mb-4 text-sm">
            {product.excerpt}
          </p>
        )}
        <div className="flex justify-center">
          <span
            className="inline-block rounded-lg bg-[#D54545] px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-[#C03A3A] hover:scale-105 pointer-events-none"
            style={{
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          >
            Get Product
          </span>
        </div>
      </div>
    </a>
  )
}

