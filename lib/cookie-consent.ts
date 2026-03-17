import type { CookieConsent } from '@/app/components/CookieBanner';

const STORAGE_KEY = 'nutrahub-cookie-consent';

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as CookieConsent;
  } catch {
    return null;
  }
}

export function hasConsent(category: keyof Omit<CookieConsent, 'version' | 'timestamp'>): boolean {
  const consent = getCookieConsent();
  if (!consent) return false;
  return consent[category] ?? false;
}

export function openCookiePreferences(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}
