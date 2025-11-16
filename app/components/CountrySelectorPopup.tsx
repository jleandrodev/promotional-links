'use client';

import { useEffect, useState } from 'react';

interface CountrySelectorPopupProps {
  redirectUrl: string;
}

export function CountrySelectorPopup({ redirectUrl }: CountrySelectorPopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Redireciona automaticamente após um tempo se o usuário não interagir
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 30000); // 30 segundos como fallback

    return () => clearTimeout(timer);
  }, [redirectUrl]);

  const handleRedirect = () => {
    setIsVisible(false);
    window.location.href = redirectUrl;
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleRedirect();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Select your country
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Botão EUA */}
          <button
            onClick={handleRedirect}
            className="flex flex-col items-center gap-3 rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <svg
                className="h-10 w-10"
                viewBox="0 0 60 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Bandeira dos EUA simplificada */}
                <rect width="60" height="40" fill="#B22234" />
                <rect width="60" height="3.08" fill="#FFFFFF" />
                <rect y="6.15" width="60" height="3.08" fill="#FFFFFF" />
                <rect y="12.31" width="60" height="3.08" fill="#FFFFFF" />
                <rect y="18.46" width="60" height="3.08" fill="#FFFFFF" />
                <rect y="24.62" width="60" height="3.08" fill="#FFFFFF" />
                <rect y="30.77" width="60" height="3.08" fill="#FFFFFF" />
                <rect y="36.92" width="60" height="3.08" fill="#FFFFFF" />
                <rect width="24" height="18.46" fill="#3C3B6E" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">United States</span>
          </button>

          {/* Botão Other Country */}
          <button
            onClick={handleRedirect}
            className="flex flex-col items-center gap-3 rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-10 w-10 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Other Country</span>
          </button>
        </div>
      </div>
    </div>
  );
}

