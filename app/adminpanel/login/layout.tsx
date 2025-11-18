import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // If user is already authenticated, redirect to dashboard
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/adminpanel')
  }

  // This layout bypasses the parent AdminLayout authentication check
  return <>{children}</>
}

