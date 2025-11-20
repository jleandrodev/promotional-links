import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrahub.com'

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
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/categories`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      // Landing pages existentes
      {
        url: `${baseUrl}/femipro`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/prodentim`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/guia-do-sono-do-bebe`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
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
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/categories`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
    ]
  }
}

