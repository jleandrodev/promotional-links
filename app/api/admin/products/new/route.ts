import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidateProductPages } from '@/lib/revalidate'

export async function POST(request: Request) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        excerpt: body.excerpt,
        image: body.image,
        price: body.price ? parseFloat(body.price) : null,
        link: body.link,
        featured: body.featured || false,
      },
    })

    // Revalidar cache das páginas afetadas (inclui sitemap)
    revalidateProductPages(product.slug)

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

