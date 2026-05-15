'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'nutrahub-cookie-consent';
const CONSENT_VERSION = 1;

export type CookieCategory = 'essential' | 'analytics' | 'marketing' | 'preferences';

export interface CookieConsent {
  version: number;
  timestamp: string;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const DEFAULT_CONSENT: CookieConsent = {
  version: CONSENT_VERSION,
  timestamp: '',
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const CATEGORIES: {
  id: CookieCategory;
  label: string;
  description: string;
  required?: boolean;
}[] = [
  {
    id: 'essential',
    label: 'Essential',
    description: 'Required for basic site functionality. Cannot be disabled.',
    required: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'Help us understand how visitors interact with the site.',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Used to personalize ads and measure campaign effectiveness.',
  },
  {
    id: 'preferences',
    label: 'Preferences',
    description: 'Remember your choices for a personalized experience.',
  },
];

function getStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as CookieConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(consent: CookieConsent) {
  if (typeof window === 'undefined') return;
  consent.timestamp = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent('cookie-consent-updated', { detail: consent })
  );
}

export function CookieBanner() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  if (pathname === '/powerpet') return null;
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>(DEFAULT_CONSENT);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      ...DEFAULT_CONSENT,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveConsent(consent);
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    const consent: CookieConsent = {
      ...DEFAULT_CONSENT,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    saveConsent(consent);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setIsVisible(false);
  };

  const toggleCategory = (category: CookieCategory) => {
    if (category === 'essential') return;
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/20 bg-white/95 shadow-2xl shadow-[#053d42]/20 backdrop-blur-xl">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Image
                    src="/images/cookie.png"
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 object-contain"
                    aria-hidden
                  />
                  <h2
                    id="cookie-banner-title"
                    className="text-lg font-semibold text-[#053d42]"
                  >
                    Your privacy matters
                  </h2>
                </div>
                <p
                  id="cookie-banner-description"
                  className="text-sm leading-relaxed text-gray-600"
                >
                  We use cookies to improve your experience, analyze traffic,
                  and personalize content. You can choose which categories to
                  accept.
                </p>
                <Link
                  href="/privacy-policy"
                  className="mt-2 inline-block text-sm font-medium text-[#086972] underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 sm:flex-shrink-0 sm:flex-col">
                <button
                  onClick={handleAcceptAll}
                  className="rounded-xl bg-[#086972] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#065a62] focus:outline-none focus:ring-2 focus:ring-[#086972] focus:ring-offset-2"
                >
                  Accept all
                </button>
                <button
                  onClick={handleRejectNonEssential}
                  className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  Essential only
                </button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                  aria-expanded={showDetails}
                >
                  {showDetails ? 'Hide options' : 'Customize'}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <p className="mb-4 text-sm font-medium text-[#053d42]">
                      Select the cookie categories you wish to allow:
                    </p>
                    <div className="space-y-4">
                      {CATEGORIES.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-start justify-between gap-4 rounded-xl bg-gray-50/80 p-4"
                        >
                          <div>
                            <p className="font-medium text-[#053d42]">
                              {cat.label}
                              {cat.required && (
                                <span className="ml-1 text-xs text-gray-500">
                                  (required)
                                </span>
                              )}
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                              {cat.description}
                            </p>
                          </div>
                          <label
                            className={`relative inline-flex h-6 w-11 cursor-pointer items-center ${cat.required ? 'cursor-not-allowed opacity-60' : ''}`}
                          >
                            <input
                              type="checkbox"
                              checked={preferences[cat.id]}
                              onChange={() => toggleCategory(cat.id)}
                              disabled={cat.required}
                              className="peer sr-only"
                              aria-label={`${cat.label}: ${preferences[cat.id] ? 'enabled' : 'disabled'}`}
                            />
                            <span className="block h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-[#086972] peer-disabled:opacity-60" />
                            <span className="absolute left-[2px] top-1/2 block h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                          </label>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleSavePreferences}
                      className="mt-4 rounded-xl bg-[#086972] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#065a62] focus:outline-none focus:ring-2 focus:ring-[#086972] focus:ring-offset-2"
                    >
                      Save preferences
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
