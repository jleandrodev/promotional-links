export async function verifyRecaptcha(token: string): Promise<{
  success: boolean
  score?: number
  action?: string
  error?: string
  'error-codes'?: string[]
}> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY não configurada')
    return {
      success: false,
      error: 'Configuração do servidor inválida',
    }
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    const data = await response.json()

    if (!data.success) {
      return {
        success: false,
        error: 'Falha na verificação do reCAPTCHA',
        'error-codes': data['error-codes'],
      }
    }

    // Verificar score (reCAPTCHA v3 retorna um score de 0.0 a 1.0)
    // Score baixo (< 0.5) pode indicar atividade suspeita
    const score = data.score || 0
    const minScore = 0.5

    if (score < minScore) {
      return {
        success: false,
        error: 'Score do reCAPTCHA muito baixo',
        score,
      }
    }

    return {
      success: true,
      score,
      action: data.action,
    }
  } catch (error) {
    console.error('Erro ao verificar reCAPTCHA:', error)
    return {
      success: false,
      error: 'Erro ao processar verificação',
    }
  }
}

