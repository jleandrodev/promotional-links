import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { revalidateBlogPages } from '@/lib/revalidate'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        postCategories: {
          include: {
            category: true,
          },
        },
        product: true,
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({
      ...post,
      categories: post.postCategories.map((pc) => pc.category),
    })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    // Primeiro, remover todas as categorias existentes
    await prisma.postCategory.deleteMany({
      where: { postId: id },
    })

    const post = await prisma.blogPost.update({
      where: { id },
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
    console.error('Error updating post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    
    // Buscar o post antes de deletar para revalidar as páginas corretas
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        postCategories: {
          include: {
            category: true,
          },
        },
      },
    })

    await prisma.blogPost.delete({
      where: { id },
    })

    // Revalidar cache das páginas afetadas imediatamente
    const categorySlugs = post?.postCategories
      .map((pc) => pc.category?.slug)
      .filter((slug): slug is string => Boolean(slug)) || []
    
    await revalidateBlogPages(post?.slug, categorySlugs)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

