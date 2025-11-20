'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import type { BlogPost } from '@prisma/client'
import RichTextEditor from '../../components/RichTextEditor'

export default function BlogPostEditPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryId: '',
    published: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    productId: '',
  })
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
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

      // Load categories
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const cats = await response.json()
        setCategories(cats)
      }

      // Load products
      const productsResponse = await fetch('/api/admin/products')
      if (productsResponse.ok) {
        const prods = await productsResponse.json()
        setProducts(prods)
      }

      // Load post if editing
      if (params.id && params.id !== 'new') {
        const postResponse = await fetch(`/api/admin/blogposts/${params.id}`)
        if (postResponse.ok) {
          const data = await postResponse.json()
          setPost(data)
          if (data.featuredImage) setImagePreview(data.featuredImage)
          if (data.categories && Array.isArray(data.categories)) {
            setSelectedCategoryIds(data.categories.map((cat: any) => cat.id))
          } else if (data.categoryId) {
            // Fallback para categoria única (compatibilidade)
            setSelectedCategoryIds([data.categoryId])
          }
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
    if (!imageFile) return post.featuredImage || null

    // Verificar autenticação antes do upload
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
      .from('blogpost_images')
      .upload(filePath, imageFile, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      
      // Mensagem mais amigável para erro de RLS
      if (uploadError.message.includes('row-level security')) {
        alert(
          'Erro de permissão: As políticas RLS do bucket blogpost_images não estão configuradas. ' +
          'Execute o SQL do arquivo supabase/blogpost_images_rls.sql no Supabase SQL Editor.'
        )
      } else {
        alert('Erro ao fazer upload da imagem: ' + uploadError.message)
      }
      return null
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('blogpost_images').getPublicUrl(filePath)

    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedCategoryIds.length === 0) {
      alert('Please select at least one category')
      return
    }

    setSaving(true)

    try {
      let imageUrl = post.featuredImage || null
      
      // Se houver um novo arquivo, fazer upload
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

      const postData = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: imageUrl,
        categoryId: selectedCategoryIds.length > 0 ? selectedCategoryIds[0] : null, // Mantém compatibilidade
        categoryIds: selectedCategoryIds, // Novas categorias múltiplas
        published: post.published,
        publishedAt: post.published ? new Date().toISOString() : null,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        seoKeywords: post.seoKeywords,
        productId: post.productId || null,
      }

      const url = params.id === 'new' ? '/api/admin/blogposts/new' : `/api/admin/blogposts/${params.id}`
      const method = params.id === 'new' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) throw new Error('Failed to save post')

      router.push('/adminpanel/blogposts')
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error saving post')
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
          href="/adminpanel/blogposts"
          className="text-[#086972] hover:text-[#0b95a2] transition-colors mb-4 inline-block"
        >
          ← Voltar para Blog Posts
        </Link>
        <h1 className="text-3xl font-bold text-[#053d42]">
          {params.id === 'new' ? 'Novo Blog Post' : 'Editar Blog Post'}
        </h1>
      </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input
              type="text"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
            <textarea
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (HTML) - Use o editor abaixo para formatar o conteúdo
            </label>
            <RichTextEditor
              content={post.content || ''}
              onChange={(html) => setPost({ ...post, content: html })}
              placeholder="Digite o conteúdo do blogpost aqui. Use os botões da toolbar para formatar o texto..."
            />
            <p className="text-xs text-gray-500 mt-2">
              O conteúdo é salvo automaticamente em HTML. Você pode visualizar a formatação em tempo real.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories (Select multiple)
            </label>
            <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center mb-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategoryIds.includes(cat.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategoryIds([...selectedCategoryIds, cat.id])
                      } else {
                        setSelectedCategoryIds(selectedCategoryIds.filter((id) => id !== cat.id))
                      }
                    }}
                    className="w-4 h-4 text-[#086972] border-gray-300 rounded focus:ring-[#086972]"
                  />
                  <span className="ml-2 text-gray-700">{cat.name}</span>
                </label>
              ))}
            </div>
            {selectedCategoryIds.length === 0 && (
              <p className="text-sm text-red-600 mt-2">Please select at least one category</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image (Max 2MB)
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
            <input
              type="text"
              value={post.seoTitle || ''}
              onChange={(e) => setPost({ ...post, seoTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
            <textarea
              value={post.seoDescription || ''}
              onChange={(e) => setPost({ ...post, seoDescription: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SEO Keywords</label>
            <input
              type="text"
              value={post.seoKeywords || ''}
              onChange={(e) => setPost({ ...post, seoKeywords: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promoted Product (Produto Promovido)
            </label>
            <select
              value={post.productId || ''}
              onChange={(e) => setPost({ ...post, productId: e.target.value || '' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            >
              <option value="">Nenhum produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Se selecionado, um botão "Get Product" será exibido no final do blogpost com o link de afiliado do produto
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={post.published}
              onChange={(e) => setPost({ ...post, published: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Published
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
              href="/adminpanel/blogposts"
              className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
    </div>
  )
}

