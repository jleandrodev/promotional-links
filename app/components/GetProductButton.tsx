'use client'

interface GetProductButtonProps {
  href: string
}

export default function GetProductButton({ href }: GetProductButtonProps) {
  return (
    <div className="flex justify-center my-12">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-[#D54545] px-12 py-4 text-xl font-semibold text-white transition-all hover:bg-[#C03A3A] hover:scale-105"
        style={{
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      >
        Get Product
      </a>
    </div>
  )
}

