import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

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
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

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

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error updating home content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

