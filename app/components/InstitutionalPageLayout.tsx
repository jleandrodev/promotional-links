import Header from './Header'
import Footer from './Footer'

interface InstitutionalPageLayoutProps {
  children: React.ReactNode
}

export default function InstitutionalPageLayout({ children }: InstitutionalPageLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <article className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none blog-content">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
