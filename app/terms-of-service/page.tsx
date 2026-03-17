import InstitutionalPageLayout from '@/app/components/InstitutionalPageLayout'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Uso | NutraHub',
  description:
    'Termos de Uso do NutraHub. Conheça as regras e condições para utilização do nosso site de saúde natural e bem-estar.',
  alternates: {
    canonical: '/terms-of-service',
  },
}

export default function TermsOfServicePage() {
  return (
    <InstitutionalPageLayout>
      <h1>Termos de Uso</h1>
      <p className="text-gray-600">Última atualização: Março de 2025</p>

      <h2>1. Aceitação dos Termos</h2>
      <p>
        Ao acessar e utilizar o site NutraHub, você declara ter lido, compreendido e aceitado os presentes Termos de Uso. Caso não concorde com qualquer disposição, solicitamos que não utilize o site.
      </p>

      <h2>2. Descrição do Serviço</h2>
      <p>
        O NutraHub é um site informativo dedicado a saúde natural, bem-estar e recomendações de produtos e suplementos. Nosso conteúdo inclui artigos, guias e informações educacionais. O site não realiza vendas diretamente; as compras são realizadas em sites de terceiros.
      </p>

      <h2>3. Links de Afiliados</h2>
      <p>
        O NutraHub participa de programas de afiliados. Isso significa que podemos receber uma comissão quando você realiza uma compra através de links presentes em nossos artigos e páginas. Essa comissão não altera o preço final para você e nos ajuda a manter o site e produzir conteúdo de qualidade.
      </p>
      <p>
        Somos transparentes sobre essa prática: sempre que recomendamos um produto, nossa intenção é oferecer informações úteis. A decisão de compra é exclusivamente sua.
      </p>

      <h2>4. Isenção de Responsabilidade Médica</h2>
      <p>
        <strong>O conteúdo do NutraHub é exclusivamente informativo e educacional.</strong> Não substitui orientação médica, nutricional ou de qualquer outro profissional de saúde. Consulte sempre um profissional qualificado antes de iniciar tratamentos, dietas ou uso de suplementos.
      </p>
      <p>
        As informações publicadas são baseadas em pesquisas e evidências disponíveis na data da publicação, mas podem não refletir descobertas mais recentes. O NutraHub não se responsabiliza por decisões tomadas com base no conteúdo do site.
      </p>

      <h2>5. Propriedade Intelectual</h2>
      <p>
        Todo o conteúdo do site (textos, imagens, logos, layout e demais elementos) é de propriedade do NutraHub ou de seus licenciadores e está protegido por leis de direitos autorais. O uso é permitido apenas para leitura e consulta pessoal. É proibida a reprodução, distribuição, modificação ou uso comercial sem autorização prévia por escrito.
      </p>

      <h2>6. Conduta do Usuário</h2>
      <p>Ao utilizar o site, você se compromete a:</p>
      <ul>
        <li>Não utilizar o site para fins ilegais ou que violem direitos de terceiros</li>
        <li>Não realizar scraping, extração automatizada de dados ou sobrecarga dos servidores</li>
        <li>Não tentar acessar áreas restritas ou comprometer a segurança do site</li>
        <li>Não utilizar o conteúdo de forma que cause prejuízo ou dano à reputação do NutraHub</li>
      </ul>

      <h2>7. Limitação de Responsabilidade</h2>
      <p>
        O NutraHub não se responsabiliza por danos indiretos, incidentais ou consequenciais decorrentes do uso ou da impossibilidade de uso do site. O site é fornecido &quot;como está&quot;, sem garantias de disponibilidade ininterrupta ou ausência de erros. Não nos responsabilizamos por conteúdos ou práticas de sites de terceiros acessados por meio de links em nosso site.
      </p>

      <h2>8. Alterações nos Termos</h2>
      <p>
        Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Alterações significativas serão comunicadas por aviso em destaque no site. O uso continuado do site após as alterações constitui aceitação dos novos termos.
      </p>

      <h2>9. Lei Aplicável e Foro</h2>
      <p>
        Estes Termos são regidos pelas leis da República Federativa do Brasil. Para dirimir quaisquer controvérsias, fica eleito o foro da comarca do domicílio do usuário, com renúncia a qualquer outro, por mais privilegiado que seja.
      </p>

      <h2>10. Contato</h2>
      <p>
        Para dúvidas sobre estes Termos de Uso, entre em contato:{' '}
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
