import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { revalidateBlogPages } from '@/lib/revalidate'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        featuredImage: body.featuredImage,
        categoryId: body.categoryId || null,
        published: body.published,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        seoKeywords: body.seoKeywords,
        productId: body.productId || null,
        postCategories: {
          create: (body.categoryIds || []).map((categoryId: string) => ({
            categoryId,
          })),
        },
      },
      include: {
        postCategories: {
          include: {
            category: true,
          },
        },
        product: true,
      },
    })

    // Revalidar cache das páginas afetadas imediatamente
    const categorySlugs = post.postCategories
      .map((pc) => pc.category?.slug)
      .filter((slug): slug is string => Boolean(slug))
    
    await revalidateBlogPages(post.slug, categorySlugs)

    return NextResponse.json({
      ...post,
      categories: post.postCategories.map((pc) => pc.category),
    })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

