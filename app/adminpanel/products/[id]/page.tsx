'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@prisma/client'

export default function ProductEditPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState<Partial<Product>>({
    name: '',
    slug: '',
    description: '',
    excerpt: '',
    image: '',
    price: null,
    link: '',
    featured: false,
  })
  const [priceValue, setPriceValue] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push('/adminpanel/login')
        return
      }

      // Load product if editing
      if (params.id && params.id !== 'new') {
        const productResponse = await fetch(`/api/admin/products/${params.id}`)
        if (productResponse.ok) {
          const data = await productResponse.json()
          setProduct(data)
          if (data.image) setImagePreview(data.image)
          if (data.price) setPriceValue(data.price.toString())
        }
      }
      setLoading(false)
    }
    loadData()
  }, [params.id, router, supabase])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return product.image || null

    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    if (!user) {
      alert('Você precisa estar autenticado para fazer upload de imagens.')
      return null
    }

    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = fileName

    const { error: uploadError } = await supabase.storage
      .from('product_images')
      .upload(filePath, imageFile, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      
      // Mensagem mais amigável para erro de RLS
      if (uploadError.message.includes('row-level security')) {
        alert(
          'Erro de permissão: As políticas RLS do bucket product_images não estão configuradas. ' +
          'Execute o SQL do arquivo supabase/product_images_rls.sql no Supabase SQL Editor.'
        )
      } else {
        alert('Erro ao fazer upload da imagem: ' + uploadError.message)
      }
      return null
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('product_images').getPublicUrl(filePath)

    return publicUrl
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setProduct({
      ...product,
      name,
      slug: generateSlug(name),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      let imageUrl = product.image || null
      
      if (imageFile) {
        const uploadedUrl = await uploadImage()
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        } else {
          alert('Erro ao fazer upload da imagem. Tente novamente.')
          setSaving(false)
          return
        }
      }

      const productData = {
        name: product.name,
        slug: product.slug,
        description: product.description,
        excerpt: product.excerpt,
        image: imageUrl,
        price: priceValue ? parseFloat(priceValue) : null,
        link: product.link,
        featured: product.featured,
      }

      const url = params.id === 'new' ? '/api/admin/products/new' : `/api/admin/products/${params.id}`
      const method = params.id === 'new' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) throw new Error('Failed to save product')

      router.push('/adminpanel/products')
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Carregando...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/adminpanel/products"
          className="text-[#086972] hover:text-[#0b95a2] transition-colors mb-4 inline-block"
        >
          ← Voltar para Products
        </Link>
        <h1 className="text-3xl font-bold text-[#053d42]">
          {params.id === 'new' ? 'Novo Produto' : 'Editar Produto'}
        </h1>
      </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title (Name)</label>
            <input
              type="text"
              value={product.name}
              onChange={handleNameChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input
              type="text"
              value={product.slug}
              onChange={(e) => setProduct({ ...product, slug: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
            <textarea
              value={product.excerpt || ''}
              onChange={(e) => setProduct({ ...product, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
              placeholder="Short description for product cards"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Affiliate Link (Link de Afiliado)
            </label>
            <input
              type="url"
              value={product.link || ''}
              onChange={(e) => setProduct({ ...product, link: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
              placeholder="https://example.com/product?aff=johnozorio"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image (Max 2MB)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="max-w-xs rounded-lg" />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={product.featured}
              onChange={(e) => setProduct({ ...product, featured: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Featured Product
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#086972] text-white px-8 py-3 rounded-lg hover:bg-[#0b95a2] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <Link
              href="/adminpanel/products"
              className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
    </div>
  )
}

