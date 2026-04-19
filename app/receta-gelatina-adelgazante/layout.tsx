import type { Metadata } from 'next';
import { CartPandaHeadScript } from './CartPandaHeadScript';

export const metadata: Metadata = {
  title: 'Receta de gelatina adelgazante',
  description:
    'Descubre la receta de gelatina para apoyar tu metabolismo y tus objetivos de bienestar, con pasos claros y ingredientes accesibles.',
  alternates: { canonical: '/receta-gelatina-adelgazante' },
  openGraph: {
    title: 'Receta de gelatina adelgazante',
    description:
      'Receta práctica y deliciosa para incorporar a tu rutina de bienestar.',
    locale: 'es_ES',
    type: 'website',
    url: '/receta-gelatina-adelgazante',
  },
};

export default function RecetaGelatinaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartPandaHeadScript />
      {children}
    </>
  );
}
