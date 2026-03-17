import InstitutionalPageLayout from '@/app/components/InstitutionalPageLayout'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade | NutraHub',
  description:
    'Política de Privacidade do NutraHub. Saiba como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.',
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <InstitutionalPageLayout>
      <h1>Política de Privacidade</h1>
      <p className="text-gray-600">Última atualização: Março de 2025</p>

      <h2>1. Identificação do Controlador</h2>
      <p>
        O NutraHub (&quot;nós&quot;, &quot;nosso&quot; ou &quot;controlador&quot;) é responsável pelo tratamento dos seus dados pessoais. Para exercer seus direitos ou esclarecer dúvidas, entre em contato pelo e-mail:{' '}
        <a href="mailto:nutrahub.life@gmail.com" className="text-[#086972] hover:underline">
          nutrahub.life@gmail.com
        </a>
        .
      </p>

      <h2>2. Dados Coletados</h2>
      <p>Coletamos os seguintes dados:</p>
      <ul>
        <li>
          <strong>E-mail:</strong> quando você se inscreve em nossa newsletter
        </li>
        <li>
          <strong>Dados técnicos:</strong> endereço IP, tipo de navegador, páginas visitadas e logs de acesso, coletados automaticamente
        </li>
        <li>
          <strong>Cookies e tecnologias similares:</strong> utilizamos reCAPTCHA (Google) para segurança e prevenção de abuso em formulários
        </li>
      </ul>

      <h2>3. Finalidade do Tratamento</h2>
      <p>Utilizamos seus dados para:</p>
      <ul>
        <li>Enviar comunicações da newsletter (conteúdo, novidades e ofertas)</li>
        <li>Melhorar a experiência e o funcionamento do site</li>
        <li>Garantir a segurança e prevenir fraudes (reCAPTCHA)</li>
        <li>Cumprir obrigações legais quando aplicável</li>
      </ul>

      <h2>4. Base Legal</h2>
      <p>
        O tratamento é realizado com base em: <strong>consentimento</strong> (newsletter) e <strong>legítimo interesse</strong> (logs técnicos, segurança e melhoria do serviço), nos termos da Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
      </p>

      <h2>5. Compartilhamento de Dados</h2>
      <p>Seus dados podem ser compartilhados com:</p>
      <ul>
        <li>
          <strong>Provedores de infraestrutura:</strong> Supabase, Vercel e serviços de hospedagem, para operação do site
        </li>
        <li>
          <strong>Google (reCAPTCHA):</strong> para validação de formulários e prevenção de abuso
        </li>
        <li>
          <strong>Programas de afiliados:</strong> quando você clica em links de produtos em nosso site, o comerciante pode receber informações sobre sua visita (conforme política de privacidade de cada parceiro)
        </li>
      </ul>
      <p>Não vendemos seus dados pessoais a terceiros.</p>

      <h2>6. Retenção dos Dados</h2>
      <p>
        Os dados da newsletter são mantidos enquanto você permanecer inscrito ou solicitar exclusão. Logs técnicos são armazenados pelo período necessário para segurança e operação, conforme boas práticas. Você pode solicitar a exclusão a qualquer momento.
      </p>

      <h2>7. Direitos do Titular (Art. 18 da LGPD)</h2>
      <p>Você tem direito a:</p>
      <ul>
        <li>Confirmar a existência de tratamento de dados</li>
        <li>Acessar seus dados</li>
        <li>Corrigir dados incompletos ou desatualizados</li>
        <li>Solicitar a exclusão dos dados</li>
        <li>Solicitar a portabilidade dos dados</li>
        <li>Revogar o consentimento a qualquer momento</li>
      </ul>
      <p>
        Para exercer esses direitos, envie um e-mail para{' '}
        <a href="mailto:nutrahub.life@gmail.com" className="text-[#086972] hover:underline">
          nutrahub.life@gmail.com
        </a>
        . Responderemos em até 15 dias.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Utilizamos o serviço reCAPTCHA da Google para proteger formulários contra spam e abuso. O reCAPTCHA pode coletar informações do seu dispositivo e navegação conforme a{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#086972] hover:underline"
        >
          Política de Privacidade do Google
        </a>
        .
      </p>

      <h2>9. Alterações nesta Política</h2>
      <p>
        Podemos atualizar esta Política de Privacidade periodicamente. Alterações relevantes serão comunicadas por e-mail (quando aplicável) ou por aviso em destaque no site. A data da última atualização será indicada no topo desta página.
      </p>

      <h2>10. Contato</h2>
      <p>
        Para dúvidas, solicitações ou reclamações sobre o tratamento de seus dados, entre em contato:{' '}
        <a href="mailto:nutrahub.life@gmail.com" className="text-[#086972] hover:underline">
          nutrahub.life@gmail.com
        </a>
        .
      </p>

      <p className="mt-8">
        <Link href="/" className="text-[#086972] hover:underline">
          ← Voltar ao início
        </Link>
      </p>
    </InstitutionalPageLayout>
  )
}
