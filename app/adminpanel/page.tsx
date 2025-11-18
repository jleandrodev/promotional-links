'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push('/adminpanel/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }
    getUser()
  }, [router, supabase.auth])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Carregando...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#053d42] mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/adminpanel/blogposts"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold text-[#053d42] mb-2">Blog Posts</h2>
            <p className="text-gray-600">Manage blog posts and articles</p>
          </Link>

          <Link
            href="/adminpanel/categories"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold text-[#053d42] mb-2">Categories</h2>
            <p className="text-gray-600">Manage categories and topics</p>
          </Link>

          <Link
            href="/adminpanel/products"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold text-[#053d42] mb-2">Products</h2>
            <p className="text-gray-600">Manage products and supplements</p>
          </Link>

          <Link
            href="/adminpanel/home-content"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold text-[#053d42] mb-2">Home Content</h2>
            <p className="text-gray-600">Manage homepage content and banners</p>
          </Link>
        </div>
    </div>
  )
}

