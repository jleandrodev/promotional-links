import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost, Category } from '@prisma/client'

interface LatestPostsSectionProps {
  posts: (BlogPost & { categories?: Category[] })[]
}

export default function LatestPostsSection({ posts }: LatestPostsSectionProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#053d42]">Latest Posts</h2>
          <Link
            href="/blog"
            className="text-[#086972] hover:text-[#0b95a2] font-semibold transition-colors"
          >
            View All →
          </Link>
        </div>
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
                  <h3 className="text-xl font-bold text-[#053d42] mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <span className="text-[#086972] font-semibold hover:text-[#0b95a2] transition-colors">
                    Read More →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

