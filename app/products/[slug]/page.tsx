import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getProductBySlug, getProducts } from '@/lib/supabase/queries'
import type { Metadata } from 'next'
import Script from 'next/script'

export async function generateStaticParams() {
  try {
    const products = await getProducts(100)
    return products.map((product) => ({
      slug: product.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for products:', error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug).catch(() => null)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} - Natural Health Supplement`,
    description: product.description,
    keywords: `natural supplement, ${product.name}, health product, wellness`,
    openGraph: {
      title: `${product.name} - NutraHub`,
      description: product.description,
      images: product.image ? [product.image] : [],
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug).catch(() => null)

  if (!product) {
    notFound()
  }

  // Converter Decimal para número
  const serializedProduct = {
    ...product,
    price: product.price ? Number(product.price) : null,
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: serializedProduct.name,
    description: serializedProduct.description,
    image: serializedProduct.image,
    ...(serializedProduct.price && {
      offers: {
        '@type': 'Offer',
        price: serializedProduct.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    }),
  }

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              {serializedProduct.image ? (
                <Image
                  src={serializedProduct.image}
                  alt={serializedProduct.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#086972] to-[#0b95a2] flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">{serializedProduct.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#053d42] mb-6">
                {serializedProduct.name}
              </h1>
              {serializedProduct.price && (
                <p className="text-4xl font-bold text-[#086972] mb-6">
                  ${serializedProduct.price.toFixed(2)}
                </p>
              )}
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-700">{serializedProduct.description}</p>
              </div>
              {serializedProduct.link && (
                <a
                  href={serializedProduct.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#086972] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#0b95a2] transition-colors"
                >
                  Buy Now
                </a>
              )}
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <section className="bg-[#e6e6e6] py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-[#053d42] mb-6">
                About {serializedProduct.name}
              </h2>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: serializedProduct.description }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

