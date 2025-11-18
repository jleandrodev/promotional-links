'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import type { HomeContent } from '@prisma/client'

export default function HomeContentPage() {
  const [content, setContent] = useState<Partial<HomeContent>>({
    heroTitle: '',
    heroSubtitle: '',
    heroImageDesktop: '',
    heroImageMobile: '',
    bannerTitle: '',
    bannerSubtitle: '',
    bannerImageDesktop: '',
    bannerImageMobile: '',
    bannerLink: '',
    newsletterTitle: '',
    newsletterSubtitle: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heroImageDesktopFile, setHeroImageDesktopFile] = useState<File | null>(null)
  const [heroImageMobileFile, setHeroImageMobileFile] = useState<File | null>(null)
  const [bannerImageDesktopFile, setBannerImageDesktopFile] = useState<File | null>(null)
  const [bannerImageMobileFile, setBannerImageMobileFile] = useState<File | null>(null)
  const [heroImageDesktopPreview, setHeroImageDesktopPreview] = useState<string | null>(null)
  const [heroImageMobilePreview, setHeroImageMobilePreview] = useState<string | null>(null)
  const [bannerImageDesktopPreview, setBannerImageDesktopPreview] = useState<string | null>(null)
  const [bannerImageMobilePreview, setBannerImageMobilePreview] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push('/adminpanel/login')
        return
      }

      const response = await fetch('/api/admin/home-content')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setContent(data)
          if (data.heroImageDesktop) setHeroImageDesktopPreview(data.heroImageDesktop)
          if (data.heroImageMobile) setHeroImageMobilePreview(data.heroImageMobile)
          if (data.bannerImageDesktop) setBannerImageDesktopPreview(data.bannerImageDesktop)
          if (data.bannerImageMobile) setBannerImageMobilePreview(data.bannerImageMobile)
        }
      }
      setLoading(false)
    }
    loadData()
  }, [router, supabase])

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    setPreview: (preview: string | null) => void
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }
      setFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (
    file: File | null,
    bucket: string,
    folder: string
  ): Promise<string | null> => {
    if (!file) return null

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
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
    } = supabase.storage.from(bucket).getPublicUrl(filePath)

    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Upload images if new files were selected
      let heroImageDesktopUrl = content.heroImageDesktop || ''
      let heroImageMobileUrl = content.heroImageMobile || ''
      let bannerImageDesktopUrl = content.bannerImageDesktop || ''
      let bannerImageMobileUrl = content.bannerImageMobile || ''

      if (heroImageDesktopFile) {
        const uploadedUrl = await uploadImage(heroImageDesktopFile, 'home_content', 'hero')
        if (uploadedUrl) {
          heroImageDesktopUrl = uploadedUrl
        } else {
          setSaving(false)
          return
        }
      }

      if (heroImageMobileFile) {
        const uploadedUrl = await uploadImage(heroImageMobileFile, 'home_content', 'hero')
        if (uploadedUrl) {
          heroImageMobileUrl = uploadedUrl
        } else {
          setSaving(false)
          return
        }
      }

      if (bannerImageDesktopFile) {
        const uploadedUrl = await uploadImage(bannerImageDesktopFile, 'home_content', 'banner')
        if (uploadedUrl) {
          bannerImageDesktopUrl = uploadedUrl
        } else {
          setSaving(false)
          return
        }
      }

      if (bannerImageMobileFile) {
        const uploadedUrl = await uploadImage(bannerImageMobileFile, 'home_content', 'banner')
        if (uploadedUrl) {
          bannerImageMobileUrl = uploadedUrl
        } else {
          setSaving(false)
          return
        }
      }

      const response = await fetch('/api/admin/home-content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...content,
          heroImageDesktop: heroImageDesktopUrl,
          heroImageMobile: heroImageMobileUrl,
          bannerImageDesktop: bannerImageDesktopUrl,
          bannerImageMobile: bannerImageMobileUrl,
        }),
      })

      if (!response.ok) throw new Error('Failed to save content')
      
      // Clear file states after successful save
      setHeroImageDesktopFile(null)
      setHeroImageMobileFile(null)
      setBannerImageDesktopFile(null)
      setBannerImageMobileFile(null)
      alert('Content saved successfully!')
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content')
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
      <h1 className="text-3xl font-bold text-[#053d42] mb-6">Home Content</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-xl font-bold text-[#053d42]">Hero Section</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
            <input
              type="text"
              value={content.heroTitle || ''}
              onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
            <input
              type="text"
              value={content.heroSubtitle || ''}
              onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Image (Desktop)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(e, setHeroImageDesktopFile, setHeroImageDesktopPreview)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
            {heroImageDesktopPreview && (
              <div className="mt-4">
                <Image
                  src={heroImageDesktopPreview}
                  alt="Hero desktop preview"
                  width={600}
                  height={300}
                  className="w-full h-auto rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Image (Mobile)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(e, setHeroImageMobileFile, setHeroImageMobilePreview)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
            {heroImageMobilePreview && (
              <div className="mt-4">
                <Image
                  src={heroImageMobilePreview}
                  alt="Hero mobile preview"
                  width={300}
                  height={300}
                  className="w-full max-w-sm h-auto rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-[#053d42] mt-8">Banner Section</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Banner Title</label>
            <input
              type="text"
              value={content.bannerTitle || ''}
              onChange={(e) => setContent({ ...content, bannerTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Banner Subtitle</label>
            <input
              type="text"
              value={content.bannerSubtitle || ''}
              onChange={(e) => setContent({ ...content, bannerSubtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Image (Desktop)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(e, setBannerImageDesktopFile, setBannerImageDesktopPreview)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
            {bannerImageDesktopPreview && (
              <div className="mt-4">
                <Image
                  src={bannerImageDesktopPreview}
                  alt="Banner desktop preview"
                  width={600}
                  height={300}
                  className="w-full h-auto rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Image (Mobile)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(e, setBannerImageMobileFile, setBannerImageMobilePreview)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
            {bannerImageMobilePreview && (
              <div className="mt-4">
                <Image
                  src={bannerImageMobilePreview}
                  alt="Banner mobile preview"
                  width={300}
                  height={300}
                  className="w-full max-w-sm h-auto rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Banner Link</label>
            <input
              type="text"
              value={content.bannerLink || ''}
              onChange={(e) => setContent({ ...content, bannerLink: e.target.value })}
              placeholder="/prodentim ou https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Pode ser um path relativo (ex: /prodentim) ou uma URL completa
            </p>
          </div>

          <h2 className="text-xl font-bold text-[#053d42] mt-8">Newsletter Section</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Newsletter Title</label>
            <input
              type="text"
              value={content.newsletterTitle || ''}
              onChange={(e) => setContent({ ...content, newsletterTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Newsletter Subtitle
            </label>
            <input
              type="text"
              value={content.newsletterSubtitle || ''}
              onChange={(e) => setContent({ ...content, newsletterSubtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
            />
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
              href="/adminpanel"
              className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
    </div>
  )
}
