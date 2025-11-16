import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {/* Card Prodentim */}
        <Link
          href="/prodentim"
          className="flex flex-col items-center gap-6 rounded-lg bg-[#76A686] p-6 transition-transform hover:scale-105"
        >
          <Image
            src="/images/prodentim/prodentim.png"
            alt="Prodentim"
            width={200}
            height={200}
            priority
            className="object-contain"
          />
          <h2 className="text-2xl font-semibold text-white">Prodentim</h2>
          <span className="rounded-lg bg-[#D54545] px-6 py-2 text-sm font-medium text-white">
            Ver Produto
          </span>
        </Link>

        {/* Card FemiPro */}
        <Link
          href="/femipro"
          className="flex flex-col items-center gap-6 rounded-lg bg-[#E2E2E2] p-6 transition-transform hover:scale-105"
        >
          <Image
            src="/images/femipro/femipro.png"
            alt="FemiPro"
            width={200}
            height={200}
            className="object-contain"
          />
          <h2 className="text-2xl font-semibold text-gray-800">FemiPro</h2>
          <span className="rounded-lg bg-[#DC8AB7] px-6 py-2 text-sm font-medium text-white">
            Ver Produto
          </span>
        </Link>

        {/* Card Sono do Bebê */}
        <Link
          href="/guia-do-sono-do-bebe"
          className="flex flex-col items-center gap-6 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 p-6 transition-transform hover:scale-105"
        >
          <Image
            src="/images/sono-bebe/sonodobebe.jpg"
            alt="Guia do Sono do Bebê"
            width={200}
            height={200}
            className="object-contain rounded-lg"
          />
          <h2 className="text-2xl font-semibold text-gray-800">Sono do Bebê</h2>
          <span className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium text-white">
            Ver Produto
          </span>
        </Link>
      </div>
    </div>
  );
}
