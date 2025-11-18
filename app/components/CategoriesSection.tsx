import Link from 'next/link'
import Image from 'next/image'
import type { Category } from '@prisma/client'

interface CategoriesSectionProps {
  categories: Category[]
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  if (!categories || categories.length === 0) return null

  return (
    <section className="py-16 bg-[#e6e6e6]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#053d42] text-center mb-12">
          Explore Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col items-center"
            >
              <div className="relative w-32 h-32 lg:w-64 lg:h-64 mb-4 rounded-lg overflow-hidden bg-white shadow-md group-hover:shadow-xl transition-shadow">
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
      </div>
    </section>
  )
}

