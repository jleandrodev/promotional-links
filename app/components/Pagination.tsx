import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  pageParam?: string
}

export default function Pagination({ currentPage, totalPages, baseUrl, pageParam = 'page' }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return baseUrl
    }
    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${pageParam}=${page}`
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Mostrar todas as páginas se houver poucas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Sempre mostrar primeira página
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Mostrar páginas ao redor da atual
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Sempre mostrar última página
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-12"
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-[#053d42] hover:bg-gray-50 transition-colors"
          aria-label="Go to previous page"
          rel={currentPage === 2 ? undefined : 'prev'}
        >
          Anterior
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
          Anterior
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-4 py-2 text-gray-500"
              >
                ...
              </span>
            )
          }

          const pageNum = page as number
          const isActive = pageNum === currentPage

          return (
            <Link
              key={pageNum}
              href={getPageUrl(pageNum)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#086972] text-white font-semibold'
                  : 'bg-white border border-gray-300 text-[#053d42] hover:bg-gray-50'
              }`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
              rel={
                pageNum === currentPage - 1
                  ? 'prev'
                  : pageNum === currentPage + 1
                  ? 'next'
                  : undefined
              }
            >
              {pageNum}
            </Link>
          )
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-[#053d42] hover:bg-gray-50 transition-colors"
          aria-label="Go to next page"
          rel="next"
        >
          Próxima
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
          Próxima
        </span>
      )}
    </nav>
  )
}

