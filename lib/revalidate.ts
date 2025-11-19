import { revalidatePath } from 'next/cache'

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
  } catch (error) {
    console.error('Error revalidating product pages:', error)
  }
}

