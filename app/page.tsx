import Header from './components/Header'
import HeroCarousel from './components/HeroCarousel'
import CategoriesSection from './components/CategoriesSection'
import LatestPostsSection from './components/LatestPostsSection'
import ProductBanner from './components/ProductBanner'
import ProductsSection from './components/ProductsSection'
import NewsletterSection from './components/NewsletterSection'
import Footer from './components/Footer'
import { getBlogPosts, getCategories, getProducts, getHomeContent } from '@/lib/supabase/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NutraHub - Your Natural Health & Wellness Hub',
  description:
    'Discover natural health solutions, expert guides, and quality supplements. Your trusted source for evidence-based wellness information.',
  keywords: 'natural health, supplements, wellness, herbal remedies, health guides',
  openGraph: {
    title: 'NutraHub - Your Natural Health & Wellness Hub',
    description:
      'Discover natural health solutions, expert guides, and quality supplements.',
    type: 'website',
  },
}

// Forçar revalidação a cada 60 segundos para garantir que o conteúdo atualizado seja exibido
export const revalidate = 60

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)
  const postsPerPage = 9

  const [allPosts, categories, products, homeContent] = await Promise.all([
    getBlogPosts(100), // Buscar mais posts para calcular paginação
    getCategories(),
    getProducts(8),
    getHomeContent(),
  ])

  // Calcular paginação
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = allPosts.slice(startIndex, endIndex)

  // Get featured posts for carousel (first 3)
  const featuredPosts = allPosts.slice(0, 3)

  // Converter Decimal para número para serialização
  const serializedProducts = products.map((product) => ({
    ...product,
    price: product.price ? Number(product.price) : null,
  }))

  return (
    <>
      <Header />
      <main>
        <HeroCarousel posts={featuredPosts} homeContent={homeContent} />
        <CategoriesSection categories={categories} />
        <LatestPostsSection
          posts={paginatedPosts}
          currentPage={currentPage}
          totalPages={totalPages}
          showPagination={totalPosts > postsPerPage}
        />
        <ProductBanner homeContent={homeContent} />
        <ProductsSection products={serializedProducts} />
        <NewsletterSection homeContent={homeContent} />
      </main>
      <Footer />
    </>
  )
}
