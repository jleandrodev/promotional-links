import Link from 'next/link'
import Image from 'next/image'
import type { HomeContent } from '@prisma/client'

interface ProductBannerProps {
  homeContent?: HomeContent | null
}

export default function ProductBanner({ homeContent }: ProductBannerProps) {
  // Renderiza apenas se houver imagem
  const hasBannerImage = homeContent?.bannerImageDesktop || homeContent?.bannerImageMobile
  
  if (!hasBannerImage) return null

  const bannerImageDesktop = homeContent.bannerImageDesktop || null
  const bannerImageMobile = homeContent.bannerImageMobile || null

  const imageContent = (
    <div className="relative w-full">
      {/* Mobile Image */}
      {bannerImageMobile && (
        <Image
          src={bannerImageMobile}
          alt={homeContent?.bannerTitle || 'Banner'}
          width={1920}
          height={600}
          className="w-full h-auto object-cover md:hidden"
          priority
        />
      )}
      {/* Desktop Image */}
      {bannerImageDesktop && (
        <Image
          src={bannerImageDesktop}
          alt={homeContent?.bannerTitle || 'Banner'}
          width={1920}
          height={600}
          className="w-full h-auto object-cover hidden md:block"
          priority
        />
      )}
    </div>
  )

  return (
    <section className="w-full">
      {homeContent?.bannerLink ? (
        <Link href={homeContent.bannerLink} className="block">
          {imageContent}
        </Link>
      ) : (
        imageContent
      )}
    </section>
  )
}

