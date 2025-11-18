import { prisma } from '@/lib/prisma'
import type { BlogPost, Category, Product, HomeContent } from '@prisma/client'

export async function getBlogPosts(limit = 10, categoryId?: string) {
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
      ...(categoryId && {
        postCategories: {
          some: {
            categoryId,
          },
        },
      }),
    },
    include: {
      category: true,
      product: true,
      postCategories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: limit,
  })

  return posts.map((post) => ({
    ...post,
    categories: post.postCategories.map((pc) => pc.category),
  }))
}

export async function getBlogPostBySlug(slug: string) {
  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      published: true,
    },
    include: {
      category: true,
      product: true,
      postCategories: {
        include: {
          category: true,
        },
      },
    },
  })

  if (!post) throw new Error('Post not found')

  return {
    ...post,
    categories: post.postCategories.map((pc) => pc.category),
  }
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      order: 'asc',
    },
  })
}

export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findFirst({
    where: { slug },
  })

  if (!category) throw new Error('Category not found')

  const postCategories = await prisma.postCategory.findMany({
    where: {
      categoryId: category.id,
      post: {
        published: true,
      },
    },
    include: {
      post: {
        include: {
          postCategories: {
            include: {
              category: true,
            },
          },
        },
      },
    },
    orderBy: {
      post: {
        publishedAt: 'desc',
      },
    },
  })

  return {
    ...category,
    posts: postCategories.map((pc) => ({
      ...pc.post,
      categories: pc.post.postCategories.map((pcc) => pcc.category),
    })),
  }
}

export async function getProducts(limit = 10) {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  })
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug },
  })

  if (!product) throw new Error('Product not found')

  return product
}

export async function getHomeContent() {
  return await prisma.homeContent.findFirst()
}

