import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductSidebarCard from '../../components/ProductSidebarCard'
import AdsterraSidebarAds from '../../components/AdsterraSidebarAds'
import ProfitableCpmNetworkBanner from '../../components/ProfitableCpmNetworkBanner'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/supabase/queries'
import type { Metadata } from 'next'
import InArticleAd from '../../components/InArticleAd'
import { splitArticleForAds } from '@/lib/inject-ads'
import { SITE_URL } from '@/lib/site'

const stripHtml = (html?: string | null) =>
  (html || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()

const truncate = (text: string, max: number) =>
  text.length <= max ? text : text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts(100)
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for blog posts:', error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug).catch(() => null)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // Garantir que publishedAt seja tratado corretamente (pode ser Date ou string após cache)
  const publishedTime = post.publishedAt
    ? (post.publishedAt instanceof Date
        ? post.publishedAt.toISOString()
        : new Date(post.publishedAt).toISOString())
    : undefined

  const baseTitle = post.seoTitle || post.title
  const fullTitle = /nutrahub/i.test(baseTitle) ? baseTitle : `${baseTitle} | NutraHub`
  const description = truncate(stripHtml(post.excerpt) || stripHtml(post.seoDescription), 160)

  return {
    title: { absolute: fullTitle },
    description,
    keywords: post.seoKeywords || post.title,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: baseTitle,
      description,
      url: `/blog/${slug}`,
      siteName: 'NutraHub',
      images: post.featuredImage ? [post.featuredImage] : [],
      type: 'article',
      publishedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: baseTitle,
      description,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

// Revalidar a cada 60 segundos para garantir conteúdo atualizado
export const revalidate = 60

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug).catch(() => null)

  if (!post) {
    notFound()
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toISOString()
    : undefined

  // Garantir que updatedAt seja tratado corretamente (pode ser Date ou string após cache)
  const updatedDate = post.updatedAt
    ? (post.updatedAt instanceof Date 
        ? post.updatedAt.toISOString() 
        : new Date(post.updatedAt).toISOString())
    : new Date().toISOString()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    ...(post.featuredImage && { image: [post.featuredImage] }),
    datePublished: publishedDate,
    dateModified: updatedDate,
    author: {
      '@type': 'Organization',
      name: 'NutraHub Editorial Team',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NutraHub',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  }

  const segments = splitArticleForAds(post.content || '')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <Header />
      <main className="min-h-screen">
        {post.featuredImage && (
          <div className="relative w-full h-64 md:h-[500px] bg-gray-100">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        )}
        <article>
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Conteúdo principal */}
                <div className="flex-1 max-w-4xl order-1">
                  {post.categories && Array.isArray(post.categories) && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((cat: any) => (
                        <span
                          key={cat.id}
                          className="inline-block px-3 py-1 bg-[#0fc1d1] text-white rounded-full text-sm font-semibold"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <h1 className="text-4xl md:text-5xl font-bold text-[#053d42] mb-6 leading-tight">
                    {post.title}
                  </h1>
                  {publishedDate && (
                    <p className="text-gray-600 mb-8 text-lg">
                      Published on {new Date(publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                  <div className="blog-content max-w-none mb-12 lg:mb-0">
                    {segments.map((segment, i) => (
                      <div key={i} className="contents">
                        <div className="contents" dangerouslySetInnerHTML={{ __html: segment.html }} />
                        {segment.adAfter && <InArticleAd />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar com card do produto - mobile abaixo do artigo, desktop ao lado */}
                <aside className="w-full lg:w-64 flex-shrink-0 order-2 lg:order-1">
                  <div className="lg:sticky lg:top-24 space-y-6">
                    {post.product && <ProductSidebarCard product={post.product} />}
                    <AdsterraSidebarAds />
                  </div>
                </aside>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 pb-12">
            <ProfitableCpmNetworkBanner />
          </div>

          {/* SEO Content Section */}
          {post.seoDescription && (
            <section className="bg-[#e6e6e6] py-16">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <div className="flex-1 max-w-4xl">
                      <div className="prose prose-lg max-w-none">
                        <div
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{ __html: post.seoDescription }}
                        />
                      </div>
                    </div>
                    {/* Espaço para alinhar com a sidebar */}
                    <div className="hidden lg:block w-64 flex-shrink-0"></div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}

