import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductSidebarCard from '../../components/ProductSidebarCard'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/supabase/queries'
import type { Metadata } from 'next'
import Script from 'next/script'

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

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.seoKeywords || post.title,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: 'article',
      publishedTime,
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
    image: post.featuredImage,
    datePublished: publishedDate,
    dateModified: updatedDate,
    author: {
      '@type': 'Organization',
      name: 'NutraHub',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NutraHub',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrahub.com'}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrahub.com'}/blog/${post.slug}`,
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
                  <div
                    className="blog-content max-w-none mb-12 lg:mb-0"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>

                {/* Sidebar com card do produto - mobile abaixo do artigo, desktop ao lado */}
                {post.product && (
                  <aside className="w-full lg:w-64 flex-shrink-0 order-2 lg:order-1">
                    <div className="lg:sticky lg:top-24">
                      <ProductSidebarCard product={post.product} />
                    </div>
                  </aside>
                )}
              </div>
            </div>
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

