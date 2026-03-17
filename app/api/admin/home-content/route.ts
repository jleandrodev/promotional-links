import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const content = await prisma.homeContent.findFirst()

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching home content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Normalizar strings vazias para null
    const normalizeField = (value: any) => (value === '' ? null : value)

    // Get existing content or create new
    const existing = await prisma.homeContent.findFirst()
    
    const content = existing
      ? await prisma.homeContent.update({
          where: { id: existing.id },
          data: {
            heroTitle: normalizeField(body.heroTitle),
            heroSubtitle: normalizeField(body.heroSubtitle),
            heroImageDesktop: normalizeField(body.heroImageDesktop),
            heroImageMobile: normalizeField(body.heroImageMobile),
            bannerTitle: normalizeField(body.bannerTitle),
            bannerSubtitle: normalizeField(body.bannerSubtitle),
            bannerImageDesktop: normalizeField(body.bannerImageDesktop),
            bannerImageMobile: normalizeField(body.bannerImageMobile),
            bannerLink: normalizeField(body.bannerLink),
            newsletterTitle: normalizeField(body.newsletterTitle),
            newsletterSubtitle: normalizeField(body.newsletterSubtitle),
          },
        })
      : await prisma.homeContent.create({
          data: {
            heroTitle: normalizeField(body.heroTitle),
            heroSubtitle: normalizeField(body.heroSubtitle),
            heroImageDesktop: normalizeField(body.heroImageDesktop),
            heroImageMobile: normalizeField(body.heroImageMobile),
            bannerTitle: normalizeField(body.bannerTitle),
            bannerSubtitle: normalizeField(body.bannerSubtitle),
            bannerImageDesktop: normalizeField(body.bannerImageDesktop),
            bannerImageMobile: normalizeField(body.bannerImageMobile),
            bannerLink: normalizeField(body.bannerLink),
            newsletterTitle: normalizeField(body.newsletterTitle),
            newsletterSubtitle: normalizeField(body.newsletterSubtitle),
          },
        })

    // Revalidar cache da página inicial
    revalidatePath('/')

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error updating home content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

