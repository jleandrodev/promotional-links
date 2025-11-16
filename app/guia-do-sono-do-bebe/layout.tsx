import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guia do Sono do Bebê - Método Comprovado para Bebês Dormirem a Noite Toda',
  description: 'Descubra o método validado e gentil que já ajudou milhares de mães a transformarem as noites. Questionário personalizado para identificar a melhor solução para o sono do seu bebê. Você merece paz, descanso e noites tranquilas.',
  keywords: 'sono do bebê, bebê dormir, método sono bebê, bebê acorda muito, rotina sono bebê, guia sono bebê',
  openGraph: {
    title: 'Guia do Sono do Bebê - Método Comprovado para Bebês Dormirem a Noite Toda',
    description: 'Descubra o método validado e gentil que já ajudou milhares de mães a transformarem as noites. Questionário personalizado para identificar a melhor solução para o sono do seu bebê.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guia do Sono do Bebê - Método Comprovado para Bebês Dormirem a Noite Toda',
    description: 'Descubra o método validado e gentil que já ajudou milhares de mães a transformarem as noites.',
  },
};

export default function GuiaDoSonoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

