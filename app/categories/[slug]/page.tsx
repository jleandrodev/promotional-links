import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getCategoryBySlug, getCategories } from '@/lib/supabase/queries'
import type { Metadata } from 'next'
import Script from 'next/script'

export async function generateStaticParams() {
  try {
    const categories = await getCategories()
    return categories.map((category) => ({
      slug: category.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for categories:', error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug).catch(() => null)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} - Health & Wellness Category`,
    description: category.description || `Explore ${category.name} articles and guides on NutraHub`,
    keywords: `${category.name}, health, wellness, natural remedies`,
    openGraph: {
      title: `${category.name} - NutraHub`,
      description: category.description || `Explore ${category.name} articles and guides`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug).catch(() => null)

  if (!category) {
    notFound()
  }

  const posts = category.posts || []

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrahub.com'}/categories/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrahub.com'}/blog/${post.slug}`,
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{category.name}</h1>
            {category.description && (
              <p className="text-xl text-white/90">{category.description}</p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No posts in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 w-full bg-gray-100">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover object-center"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#086972] to-[#0b95a2]" />
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-[#053d42] mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <span className="text-[#086972] font-semibold hover:text-[#0b95a2] transition-colors">
                        Read More →
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

