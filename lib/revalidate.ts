import { revalidatePath } from 'next/cache'

/**
 * Revalida o sitemap.xml
 * Garante que o sitemap seja atualizado quando novos conteúdos forem adicionados
 */
export function revalidateSitemap() {
  try {
    revalidatePath('/sitemap.xml')
  } catch (error) {
    console.error('Error revalidating sitemap:', error)
  }
}

/**
 * Revalida todas as páginas relacionadas a posts
 * Garante atualização imediata na Vercel em produção
 */
export async function revalidateBlogPages(postSlug?: string, categorySlugs?: string[]) {
  try {
    // Revalidar paths específicos - garante que as páginas sejam regeneradas
    revalidatePath('/', 'page')
    revalidatePath('/blog', 'page')
    revalidatePath('/blog', 'layout')
    
    if (postSlug) {
      revalidatePath(`/blog/${postSlug}`, 'page')
    }
    
    if (categorySlugs && categorySlugs.length > 0) {
      categorySlugs.forEach((slug) => {
        revalidatePath(`/categories/${slug}`, 'page')
      })
    }
    
    // Revalidar sitemap quando posts ou categorias são alterados
    revalidateSitemap()
  } catch (error) {
    console.error('Error revalidating blog pages:', error)
    // Não lançar erro para não quebrar a requisição
  }
}

/**
 * Revalida todas as páginas relacionadas a produtos
 */
export async function revalidateProductPages(productSlug?: string) {
  try {
    revalidatePath('/', 'page')
    revalidatePath('/products', 'page')
    if (productSlug) {
      revalidatePath(`/products/${productSlug}`, 'page')
    }
    
    // Revalidar sitemap quando produtos são alterados
    revalidateSitemap()
  } catch (error) {
    console.error('Error revalidating product pages:', error)
  }
}

/**
 * Revalida páginas relacionadas a categorias
 */
export function revalidateCategoryPages(categorySlug?: string) {
  try {
    revalidatePath('/', 'page')
    revalidatePath('/categories', 'page')
    if (categorySlug) {
      revalidatePath(`/categories/${categorySlug}`, 'page')
    }
    
    // Revalidar sitemap quando categorias são alteradas
    revalidateSitemap()
  } catch (error) {
    console.error('Error revalidating category pages:', error)
  }
}

