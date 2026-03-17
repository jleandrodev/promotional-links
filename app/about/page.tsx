import InstitutionalPageLayout from '@/app/components/InstitutionalPageLayout'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre Nós | NutraHub',
  description:
    'Conheça o NutraHub: sua fonte confiável de saúde natural, bem-estar e recomendações de produtos baseadas em evidências.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <InstitutionalPageLayout>
      <h1>Sobre Nós</h1>

      <h2>Nossa Missão</h2>
      <p>
        O NutraHub nasceu com o propósito de ser sua fonte confiável de informação sobre saúde natural e bem-estar. Acreditamos que o acesso a conteúdo de qualidade, baseado em evidências e apresentado de forma clara, pode ajudar as pessoas a tomarem decisões mais conscientes sobre sua saúde.
      </p>

      <h2>O Que Fazemos</h2>
      <p>
        Produzimos artigos, guias e recomendações sobre suplementos, nutrição e práticas de bem-estar. Nosso blog aborda temas como sono, imunidade, energia, saúde digestiva e muito mais, sempre com foco em soluções naturais e sustentáveis.
      </p>
      <p>
        Também recomendamos produtos que consideramos úteis para nossos leitores. Essas recomendações são feitas com critério, e somos transparentes: participamos de programas de afiliados, o que nos permite manter o site e continuar produzindo conteúdo gratuito.
      </p>

      <h2>Nossos Diferenciais</h2>
      <ul>
        <li>
          <strong>Conteúdo curado:</strong> Selecionamos e organizamos informações de forma acessível
        </li>
        <li>
          <strong>Transparência:</strong> Deixamos claro quando um link é de afiliado
        </li>
        <li>
          <strong>Foco em evidências:</strong> Priorizamos informações baseadas em estudos e boas práticas
        </li>
        <li>
          <strong>Respeito ao leitor:</strong> Seu tempo e sua saúde importam; não prometemos milagres
        </li>
      </ul>

      <h2>Equipe</h2>
      <p>
        O NutraHub é mantido por uma equipe dedicada à missão de democratizar o acesso a informações confiáveis sobre saúde natural. Trabalhamos para que cada artigo traga valor real para quem nos lê.
      </p>

      <h2>Entre em Contato</h2>
      <p>
        Tem dúvidas, sugestões ou quer saber mais? Adoraríamos ouvir você. Envie um e-mail para{' '}
        <a href="mailto:nutrahub.life@gmail.com" className="text-[#086972] hover:underline">
          nutrahub.life@gmail.com
        </a>
        .
      </p>
      <p>
        Ou inscreva-se em nossa{' '}
        <Link href="/#newsletter" className="text-[#086972] hover:underline">
          newsletter
        </Link>
        {' '}para receber novidades e conteúdos exclusivos.
      </p>

      <p className="mt-8">
        <Link href="/" className="text-[#086972] hover:underline">
          ← Voltar ao início
        </Link>
      </p>
    </InstitutionalPageLayout>
  )
}
