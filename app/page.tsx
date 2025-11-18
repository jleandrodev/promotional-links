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

export default async function Home() {
  const [latestPosts, categories, products, homeContent] = await Promise.all([
    getBlogPosts(6),
    getCategories(),
    getProducts(8),
    getHomeContent(),
  ])

  // Get featured posts for carousel (first 3)
  const featuredPosts = latestPosts.slice(0, 3)

  return (
    <>
      <Header />
      <main>
        <HeroCarousel posts={featuredPosts} homeContent={homeContent} />
        <CategoriesSection categories={categories} />
        <LatestPostsSection posts={latestPosts} />
        <ProductBanner homeContent={homeContent} />
        <ProductsSection products={products} />
        <NewsletterSection homeContent={homeContent} />
      </main>
      <Footer />
    </>
  )
}
