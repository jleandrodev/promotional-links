'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import type { Category } from '@prisma/client'
import RichTextEditor from '../../components/RichTextEditor'

export default function NewCategoryPage() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    parentId: '',
    isPillar: false,
    order: 0,
    seoTitle: '',
    seoDescription: '',
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push('/adminpanel/login')
        return
      }
      loadCategories()
    }
    checkAuth()
  }, [router, supabase])

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
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
    if (!imageFile) return formData.image || null

    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `categories/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('home_content')
      .upload(filePath, imageFile, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      alert('Error uploading image: ' + uploadError.message)
      return null
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('home_content').getPublicUrl(filePath)

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
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Upload image if new file was selected
      let imageUrl = formData.image || ''
      if (imageFile) {
        const uploadedUrl = await uploadImage()
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        } else {
          setSaving(false)
          return
        }
      }

      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          parentId: formData.parentId || null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create category')
      }

      router.push('/adminpanel/categories')
    } catch (error: any) {
      console.error('Error creating category:', error)
      alert(error.message || 'Error creating category')
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
          href="/adminpanel/categories"
          className="text-[#086972] hover:text-[#0b95a2] transition-colors mb-4 inline-block"
        >
          ← Voltar para Categories
        </Link>
        <h1 className="text-3xl font-bold text-[#053d42]">Nova Categoria</h1>
      </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
              placeholder="Category name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
              placeholder="category-slug"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL-friendly version of the name (auto-generated from name)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (HTML) - Texto de SEO que aparece abaixo da listagem de blogposts
            </label>
            <RichTextEditor
              content={formData.description || ''}
              onChange={(html) => setFormData({ ...formData, description: html })}
              placeholder="Digite a descrição da categoria aqui. Este texto aparecerá como conteúdo de SEO abaixo da listagem de blogposts. Use os botões da toolbar para formatar o texto..."
            />
            <p className="text-xs text-gray-500 mt-2">
              O conteúdo é salvo automaticamente em HTML. Você pode visualizar a formatação em tempo real.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
            {imagePreview && (
              <div className="mt-4">
                <Image
                  src={imagePreview}
                  alt="Category preview"
                  width={300}
                  height={200}
                  className="w-full max-w-md h-auto rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parent Category</label>
            <select
              value={formData.parentId}
              onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            >
              <option value="">None (Top Level)</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isPillar}
                onChange={(e) => setFormData({ ...formData, isPillar: e.target.checked })}
                className="w-4 h-4 text-[#086972] border-gray-300 rounded focus:ring-[#086972]"
              />
              <span className="text-sm font-medium text-gray-700">Is Pillar Category</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Display order (lower numbers appear first)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
            <input
              type="text"
              value={formData.seoTitle || ''}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
              placeholder="SEO title for search engines (55-70 characters recommended)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Título otimizado para SEO. Se não preenchido, será usado o nome da categoria.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
            <textarea
              value={formData.seoDescription || ''}
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
              placeholder="SEO description for search engines (140-160 characters recommended)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Descrição otimizada para SEO. Se não preenchida, será usada a descrição da categoria.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#086972] text-white px-8 py-3 rounded-lg hover:bg-[#0b95a2] transition-colors disabled:opacity-50"
            >
              {saving ? 'Creating...' : 'Create Category'}
            </button>
            <Link
              href="/adminpanel/categories"
              className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
    </div>
  )
}

