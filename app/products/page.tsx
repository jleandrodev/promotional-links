import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getProducts } from '@/lib/supabase/queries'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Products - Natural Health Supplements',
  description:
    'Browse our curated selection of natural health supplements and wellness products. Evidence-based solutions for your health journey.',
  keywords: 'natural supplements, health products, wellness, vitamins, herbal remedies',
  openGraph: {
    title: 'Products - Natural Health Supplements | NutraHub',
    description: 'Browse our curated selection of natural health supplements and wellness products.',
    type: 'website',
  },
}

export default async function ProductsPage() {
  const products = await getProducts(50)

  // Converter Decimal para número
  const serializedProducts = products.map((product) => ({
    ...product,
    price: product.price ? Number(product.price) : null,
  }))

  const allProducts = serializedProducts.map((product) => ({
    name: product.name,
    description: product.description,
    image: product.image || '',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrahub.com'}/products/${product.slug}`,
    price: product.price,
  }))

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Products - NutraHub',
    description: 'Natural health supplements and wellness products',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrahub.com'}/products`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allProducts.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.image,
          url: product.url,
          ...(product.price && { offers: { '@type': 'Offer', price: product.price } }),
        },
      })),
    },
  }

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="min-h-screen">
        <div className="bg-gradient-to-r from-[#086972] to-[#0b95a2] py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h1>
            <p className="text-xl text-white/90">
              Discover natural health solutions backed by science and expert guidance
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {serializedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
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
                        <span className="text-white text-4xl font-bold">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[#053d42] mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                    {product.price && (
                      <p className="text-2xl font-bold text-[#086972] mb-4">
                        ${product.price.toFixed(2)}
                      </p>
                    )}
                    <span className="inline-block bg-[#086972] text-white px-6 py-2 rounded-lg hover:bg-[#0b95a2] transition-colors">
                      View Details
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content Section */}
        <section className="bg-[#e6e6e6] py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-[#053d42] mb-6">
                Natural Health Supplements & Wellness Products
              </h2>
              <p className="text-gray-700 mb-4">
                At NutraHub, we curate a comprehensive selection of natural health supplements and
                wellness products designed to support your journey toward optimal health. Our
                products are carefully selected based on scientific research, quality ingredients,
                and proven effectiveness.
              </p>
              <p className="text-gray-700 mb-4">
                Whether you're looking for herbal remedies, vitamins, minerals, or specialized
                supplements for specific health conditions, our collection offers evidence-based
                solutions. Each product in our catalog has been evaluated for quality, purity, and
                efficacy.
              </p>
              <h3 className="text-2xl font-bold text-[#053d42] mt-8 mb-4">
                Why Choose NutraHub Products?
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Evidence-based formulations backed by scientific research</li>
                <li>High-quality ingredients sourced from trusted suppliers</li>
                <li>Rigorous quality testing and purity standards</li>
                <li>Comprehensive product information and usage guidelines</li>
                <li>Expert recommendations and customer support</li>
              </ul>
              <p className="text-gray-700">
                Explore our product categories to find the right natural health solutions for your
                specific needs. From hormonal support to digestive health, sleep optimization to
                immune system enhancement, we have products designed to address a wide range of
                wellness goals.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

