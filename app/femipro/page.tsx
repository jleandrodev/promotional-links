'use client';

import Image from "next/image";
import { CountrySelectorPopup } from "../components/CountrySelectorPopup";

export default function FemiProPage() {
  return (
    <>
      <CountrySelectorPopup redirectUrl="http://myfemipro24.com/text.php#aff=johnozorio" />
      <div className="flex min-h-screen items-center justify-center bg-[#E2E2E2] px-4 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-12">
        {/* Imagem à esquerda (desktop) ou acima (mobile) */}
        <div className="flex-shrink-0">
          <Image
            src="/images/femipro/femipro.png"
            alt="FemiPro"
            width={400}
            height={400}
            priority
            className="object-contain"
          />
        </div>

        {/* Conteúdo à direita (desktop) ou abaixo (mobile) */}
        <div className="flex flex-col items-center gap-8 text-center md:items-start md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
            Click the button below to be redirected to the product page
          </h1>

          <a
            href="http://myfemipro24.com/text.php#aff=johnozorio"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#DC8AB7] px-12 py-4 text-xl font-semibold text-white transition-all hover:bg-[#C97AA3] hover:scale-105"
            style={{
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          >
            View Product
          </a>

          <div className="mt-4">
            <Image
              src="/images/femipro/certifications.png"
              alt="Certifications"
              width={600}
              height={200}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

