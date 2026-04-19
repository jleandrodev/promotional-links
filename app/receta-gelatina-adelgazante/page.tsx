import Image from 'next/image';

const NEBULA_URL = 'https://onebula.com/f/3b67a621';

export default function RecetaGelatinaPage() {
  return (
    <main
      lang="es"
      className="min-h-screen bg-gradient-to-b from-[#f8faf8] via-[#fff9f5] to-[#f5f0eb] text-[#1c1917]"
    >
      <header className="border-b border-stone-200/80 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-3 px-4 py-4 sm:justify-start sm:py-5">
          <Image
            src="/images/APP.jpeg"
            alt="Logo del producto"
            width={48}
            height={48}
            className="h-12 w-12 rounded-xl object-cover shadow-sm ring-1 ring-stone-200/60"
            priority
          />
          <span className="text-sm font-semibold tracking-tight text-stone-700 sm:text-base">
            Receta exclusiva · Bienestar natural
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 pb-10 pt-8 text-center sm:pt-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/90">
          Guía en PDF
        </p>
        <h1 className="text-balance text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
          Gelatina adelgazante: la receta que encaja en tu rutina
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-stone-600 sm:text-lg">
          Un postre ligero, fácil de preparar y pensado para quienes quieren
          cuidar la línea sin renunciar al sabor. Ingredientes sencillos, pasos
          claros y variaciones para que no te aburras.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-12">
        <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xl shadow-stone-900/5 ring-1 ring-stone-100">
          <Image
            src="/images/CHECKOUT.png"
            alt="Vista del checkout y oferta de la receta de gelatina"
            width={1392}
            height={768}
            className="h-auto w-full object-cover object-top"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pb-14">
        <ul className="space-y-4 rounded-2xl border border-emerald-100 bg-white/90 p-6 text-left shadow-sm sm:p-8">
          <li className="flex gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
              aria-hidden
            >
              ✓
            </span>
            <span>
              <strong className="text-stone-900">Lista de compras incluida</strong>
              : todo lo que necesitas en un solo vistazo.
            </span>
          </li>
          <li className="flex gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
              aria-hidden
            >
              ✓
            </span>
            <span>
              <strong className="text-stone-900">Porciones y conservación</strong>
              para aprovechar la receta sin desperdiciar.
            </span>
          </li>
          <li className="flex gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
              aria-hidden
            >
              ✓
            </span>
            <span>
              <strong className="text-stone-900">Consejos prácticos</strong> para
              integrarla en tu semana sin complicarte la vida.
            </span>
          </li>
        </ul>
      </section>

      <section className="mx-auto max-w-xl px-4 pb-20 text-center">
        <p className="mb-6 text-sm leading-relaxed text-stone-600 sm:text-base">
          ¿Tienes dudas sobre cómo encajarla en tu alimentación o quieres una
          orientación personalizada? Agenda una valoración sin coste.
        </p>
        <a
          href={NEBULA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-900/25 transition hover:from-emerald-500 hover:to-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:w-auto sm:px-10 sm:text-lg"
        >
          Solicitar consulta gratis
        </a>
        <p className="mt-3 text-xs text-stone-500">
          Te llevamos a un formulario seguro en Nebula para coordinar tu consulta.
        </p>
      </section>
    </main>
  );
}
