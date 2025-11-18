'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost, Category, HomeContent } from '@prisma/client'

interface HeroCarouselProps {
  posts: (BlogPost & { categories?: Category[] })[]
  homeContent?: HomeContent | null
}

export default function HeroCarousel({ posts, homeContent }: HeroCarouselProps) {
  // Se houver hero configurado no homeContent, usar ele
  if (homeContent?.heroTitle && (homeContent.heroImageDesktop || homeContent.heroImageMobile)) {
    const heroImageDesktop = homeContent.heroImageDesktop || null
    // Se não houver imagem mobile, usar a do desktop
    const heroImageMobile = homeContent.heroImageMobile || heroImageDesktop

    return (
      <section className="relative h-[500px] md:h-[600px]">
        <div className="relative h-full w-full">
          {/* Mobile Image - usa desktop como fallback se não houver mobile */}
          {heroImageMobile && (
            <Image
              src={heroImageMobile}
              alt={homeContent.heroTitle}
              fill
              className="object-cover md:hidden"
              priority
            />
          )}
          {/* Desktop Image */}
          {heroImageDesktop && (
            <Image
              src={heroImageDesktop}
              alt={homeContent.heroTitle}
              fill
              className="object-cover hidden md:block"
              priority
            />
          )}
          {!heroImageDesktop && !heroImageMobile && (
            <div className="h-full w-full bg-gradient-to-r from-[#086972] to-[#0b95a2]" />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{homeContent.heroTitle}</h1>
              {homeContent.heroSubtitle && (
                <p className="text-lg md:text-xl mb-6">{homeContent.heroSubtitle}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Fallback para posts do blog
  if (!posts || posts.length === 0) {
    return (
      <section className="relative h-[500px] bg-gradient-to-r from-[#086972] to-[#0b95a2] flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to NutraHub</h1>
          <p className="text-xl md:text-2xl">Your Natural Health & Wellness Hub</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-[500px] md:h-[600px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="h-full"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="relative h-full w-full">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-r from-[#086972] to-[#0b95a2]" />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-3xl">
                  {post.categories && Array.isArray(post.categories) && post.categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                      {post.categories.map((cat: any) => (
                        <span
                          key={cat.id}
                          className="inline-block px-3 py-1 bg-[#0fc1d1] rounded-full text-sm"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
                  <p className="text-lg md:text-xl mb-6">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block bg-[#086972] hover:bg-[#0b95a2] px-8 py-3 rounded-lg transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

