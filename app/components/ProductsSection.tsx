'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

interface SerializedProduct {
  id: string
  name: string
  slug: string
  description: string
  excerpt: string | null
  image: string | null
  price: number | null
  link: string | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

interface ProductsSectionProps {
  products: SerializedProduct[]
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  if (!products || products.length === 0) return null

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#053d42]">Featured Products</h2>
          <Link
            href="/products"
            className="text-[#086972] hover:text-[#0b95a2] font-semibold transition-colors"
          >
            View All →
          </Link>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          navigation
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          className="pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full">
                <Link href={`/products/${product.slug}`}>
                  <div className="relative h-64 w-full">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#086972] to-[#0b95a2] flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#053d42] mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.excerpt || product.description}</p>
                    {product.price && (
                      <p className="text-2xl font-bold text-[#086972] mb-4">
                        ${product.price.toFixed(2)}
                      </p>
                    )}
                    <span className="inline-block bg-[#086972] text-white px-6 py-2 rounded-lg hover:bg-[#0b95a2] transition-colors">
                      View Product
                    </span>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

