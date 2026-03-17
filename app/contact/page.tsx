import InstitutionalPageLayout from '@/app/components/InstitutionalPageLayout'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contato | NutraHub',
  description:
    'Entre em contato com o NutraHub. Dúvidas, sugestões ou solicitações de exclusão de dados (LGPD) - estamos à disposição.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <InstitutionalPageLayout>
      <h1>Contato</h1>

      <p>
        Estamos à disposição para ouvir você. Entre em contato pelo e-mail abaixo para dúvidas, sugestões, parcerias ou qualquer outra questão.
      </p>

      <h2>E-mail</h2>
      <p>
        <a
          href="mailto:nutrahub.life@gmail.com"
          className="text-[#086972] hover:underline font-semibold text-lg"
        >
          nutrahub.life@gmail.com
        </a>
      </p>

      <h2>O que podemos ajudar?</h2>
      <ul>
        <li>Dúvidas sobre nosso conteúdo ou produtos recomendados</li>
        <li>Sugestões de temas para novos artigos</li>
        <li>Propostas de parceria ou colaboração</li>
        <li>
          <strong>Solicitações relacionadas à LGPD:</strong> acesso, correção, exclusão ou portabilidade dos seus dados pessoais
        </li>
      </ul>

      <p>
        Responderemos o mais breve possível. Para solicitações de direitos do titular (LGPD), nos comprometemos a responder em até 15 dias.
      </p>

      <p className="mt-8">
        <Link href="/" className="text-[#086972] hover:underline">
          ← Voltar ao início
        </Link>
      </p>
    </InstitutionalPageLayout>
  )
}
