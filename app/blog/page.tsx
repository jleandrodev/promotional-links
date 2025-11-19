import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getBlogPosts } from '@/lib/supabase/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Natural Health Articles & Guides',
  description:
    'Read expert articles, guides, and research on natural health, supplements, and wellness. Evidence-based information to support your health journey.',
  keywords: 'health blog, wellness articles, natural health guides, supplement information',
  openGraph: {
    title: 'Blog - Natural Health Articles & Guides | NutraHub',
    description: 'Read expert articles, guides, and research on natural health and wellness.',
    type: 'website',
  },
}

// Revalidar a cada 60 segundos para garantir conteúdo atualizado
export const revalidate = 60

export default async function BlogPage() {
  const posts = await getBlogPosts(50)

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="bg-gradient-to-r from-[#086972] to-[#0b95a2] py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog</h1>
            <p className="text-xl text-white/90">
              Expert articles, guides, and research on natural health and wellness
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
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
                      {post.categories && Array.isArray(post.categories) && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {post.categories.map((cat: any) => (
                            <span
                              key={cat.id}
                              className="inline-block text-sm text-[#0b95a2] font-semibold"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      )}
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

