// Import Prisma types
import type {
  BlogPost,
  Category,
  Product,
  HomeContent,
} from '@prisma/client'

// Re-export Prisma types for convenience
export type {
  BlogPost,
  Category,
  Product,
  HomeContent,
}

// Extended types for components
export type BlogPostWithCategory = BlogPost & {
  categories: Category[]
}

export type CategoryWithPosts = Category & {
  blog_posts: BlogPost[]
}

