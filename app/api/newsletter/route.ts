import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRecaptcha } from '@/lib/recaptcha'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, recaptchaToken } = body

    // Basic validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate reCAPTCHA
    if (!recaptchaToken || typeof recaptchaToken !== 'string') {
      return NextResponse.json(
        { error: 'Security validation required' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptcha(recaptchaToken)

    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: 'Security validation failed. Please try again.' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Normalize email (lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim()

    // Check if email already exists
    const existing = await prisma.newsletter.findUnique({
      where: { email: normalizedEmail },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      )
    }

    // Create new record
    const newsletter = await prisma.newsletter.create({
      data: {
        email: normalizedEmail,
      },
    })

    return NextResponse.json(
      { message: 'Successfully subscribed', id: newsletter.id },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error subscribing to newsletter:', error)

    // Handle unique constraint error (race condition)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

