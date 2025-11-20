import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRecaptcha } from '@/lib/recaptcha'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, recaptchaToken } = body

    // Validação básica
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    // Validar reCAPTCHA
    if (!recaptchaToken || typeof recaptchaToken !== 'string') {
      return NextResponse.json(
        { error: 'Validação de segurança necessária' },
        { status: 400 }
      )
    }

    // Verificar token do reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken)

    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: 'Falha na validação de segurança. Tente novamente.' },
        { status: 400 }
      )
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Normalizar email (lowercase e trim)
    const normalizedEmail = email.toLowerCase().trim()

    // Verificar se o email já existe
    const existing = await prisma.newsletter.findUnique({
      where: { email: normalizedEmail },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 409 }
      )
    }

    // Criar novo registro
    const newsletter = await prisma.newsletter.create({
      data: {
        email: normalizedEmail,
      },
    })

    return NextResponse.json(
      { message: 'Email cadastrado com sucesso', id: newsletter.id },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error subscribing to newsletter:', error)

    // Tratar erro de constraint única (caso ocorra race condition)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
}

