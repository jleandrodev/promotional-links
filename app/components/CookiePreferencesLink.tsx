'use client';

import { openCookiePreferences } from '@/lib/cookie-consent';

export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="text-gray-300 hover:text-white transition-colors text-left"
    >
      Cookie Preferences
    </button>
  );
}
