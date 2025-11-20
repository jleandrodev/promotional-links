import { NextResponse } from 'next/server'
import { verifyRecaptcha } from '@/lib/recaptcha'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Token do reCAPTCHA é obrigatório', success: false },
        { status: 400 }
      )
    }

    const result = await verifyRecaptcha(token)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Falha na verificação do reCAPTCHA',
          'error-codes': result['error-codes'],
          score: result.score,
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      score: result.score,
      action: result.action,
    })
  } catch (error: any) {
    console.error('Erro ao verificar reCAPTCHA:', error)
    return NextResponse.json(
      { error: 'Erro ao processar verificação', success: false },
      { status: 500 }
    )
  }
}

