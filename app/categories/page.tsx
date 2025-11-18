import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getCategories } from '@/lib/supabase/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories - Health & Wellness Topics',
  description:
    'Explore our comprehensive categories covering natural health, remedies, guides, and more. Find expert information on conditions, supplements, and wellness protocols.',
  keywords: 'health categories, wellness topics, natural remedies, health guides, supplements',
  openGraph: {
    title: 'Categories - Health & Wellness Topics | NutraHub',
    description: 'Explore our comprehensive categories covering natural health and wellness topics.',
    type: 'website',
  },
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  const pillarCategories = categories.filter((cat) => cat.isPillar)
  const regularCategories = categories.filter((cat) => !cat.isPillar)

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="bg-gradient-to-r from-[#086972] to-[#0b95a2] py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Categories</h1>
            <p className="text-xl text-white/90">
              Explore our comprehensive health and wellness topics
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {pillarCategories.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#053d42] mb-8">Pillar Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pillarCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48 w-full">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#086972] to-[#0b95a2]" />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-[#053d42] mb-2 group-hover:text-[#086972] transition-colors">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-gray-600 line-clamp-3">{category.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-3xl font-bold text-[#053d42] mb-8">All Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {regularCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group flex flex-col items-center"
                >
                  <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-white shadow-md group-hover:shadow-xl transition-shadow">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#086972] to-[#0b95a2] flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-center font-semibold text-[#053d42] group-hover:text-[#086972] transition-colors">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

