import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { SITE_URL } from '@/lib/site'

const STATIC_LAST_MODIFIED = new Date('2026-10-31')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL

  try {
    // Busca todos os dados em paralelo
    const [posts, categories, products] = await Promise.all([
      // Apenas posts publicados, sem limite
      prisma.blogPost.findMany({
        where: {
          published: true,
        },
        select: {
          slug: true,
          updatedAt: true,
          publishedAt: true,
        },
        orderBy: {
          publishedAt: 'desc',
        },
      }),
      // Todas as categorias
      prisma.category.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
        orderBy: {
          order: 'asc',
        },
      }),
      // Todos os produtos
      prisma.product.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ])

    // URLs estáticas principais
    const staticUrls: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/categories`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      // Landing pages existentes
      {
        url: `${baseUrl}/femipro`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/prodentim`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/guia-do-sono-do-bebe`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/baby-sleep-guide`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      // Páginas institucionais
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/terms-of-service`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ]

    // URLs de posts do blog
    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // URLs de categorias
    const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: category.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // URLs de produtos
    const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...staticUrls, ...postUrls, ...categoryUrls, ...productUrls]
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error)
    
    // Retorna pelo menos as URLs estáticas em caso de erro
    return [
      {
        url: baseUrl,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/categories`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/terms-of-service`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ]
  }
}

