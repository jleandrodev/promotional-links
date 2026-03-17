import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

/** Usuário fictício para autenticação via API Key (IA/scripts) */
const API_KEY_USER = { id: 'api-key' } as User

/**
 * Obtém o usuário autenticado a partir da requisição.
 * Suporta três métodos:
 * 1. Authorization: Bearer <ADMIN_API_KEY> - API Key para IA/scripts (mais simples)
 * 2. Authorization: Bearer <access_token> - Token Supabase (email/senha)
 * 3. Cookies de sessão Supabase - para chamadas do navegador (painel admin)
 */
export async function getAuthUser(request: Request): Promise<User | null> {
  const authHeader = request.headers.get('Authorization')
  const apiKeyHeader = request.headers.get('X-API-Key')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null
  const apiKey = token || apiKeyHeader?.trim()

  // 1. API Key (prioridade - evita chamada ao Supabase)
  const adminApiKey = process.env.ADMIN_API_KEY
  if (adminApiKey && apiKey && apiKey === adminApiKey) {
    return API_KEY_USER
  }

  // 2. Token JWT do Supabase
  if (token) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const {
      data: { user },
    } = await supabase.auth.getUser(token)
    return user
  }

  // 3. Cookies de sessão (navegador)
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
