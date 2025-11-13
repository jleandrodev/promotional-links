import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#76A686] px-4">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/images/prodentim/prodentim.png"
          alt="Prodentim"
          width={300}
          height={300}
          priority
          className="object-contain"
        />
        <h1 className="text-3xl font-semibold text-white">Prodentim</h1>
        <Link
          href="/prodentim"
          className="rounded-lg bg-[#D54545] px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-[#C03A3A]"
        >
          Ver Produto
        </Link>
      </div>
    </div>
  );
}
