import InstitutionalPageLayout from '@/app/components/InstitutionalPageLayout'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | NutraHub',
  description:
    'NutraHub Privacy Policy. Learn how we collect, use, and protect your personal data.',
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <InstitutionalPageLayout>
      <h1>Privacy Policy</h1>
      <p className="text-gray-600">Last updated: March 2025</p>

      <h2>1. Data Controller</h2>
      <p>
        NutraHub (&quot;we&quot;, &quot;our&quot;, or &quot;controller&quot;) is responsible for the processing of your personal data. To exercise your rights or ask questions, contact us at:{' '}
        <a href="mailto:nutrahub.life@gmail.com" className="text-[#086972] hover:underline">
          nutrahub.life@gmail.com
        </a>
        .
      </p>

      <h2>2. Data We Collect</h2>
      <p>We collect the following data:</p>
      <ul>
        <li>
          <strong>Email:</strong> when you subscribe to our newsletter
        </li>
        <li>
          <strong>Technical data:</strong> IP address, browser type, pages visited, and access logs, collected automatically
        </li>
        <li>
          <strong>Cookies and similar technologies:</strong> we use reCAPTCHA (Google) for security and abuse prevention on forms
        </li>
      </ul>

      <h2>3. Purpose of Processing</h2>
      <p>We use your data to:</p>
      <ul>
        <li>Send newsletter communications (content, updates, and offers)</li>
        <li>Improve the site experience and functionality</li>
        <li>Ensure security and prevent fraud (reCAPTCHA)</li>
        <li>Comply with legal obligations when applicable</li>
      </ul>

      <h2>4. Legal Basis</h2>
      <p>
        Processing is based on: <strong>consent</strong> (newsletter) and <strong>legitimate interest</strong> (technical logs, security, and service improvement). We comply with applicable data protection laws, including GDPR (for EU/UK visitors), CCPA (for California residents), and Australian Privacy Principles (for Australian visitors).
      </p>

      <h2>5. Data Sharing</h2>
      <p>Your data may be shared with:</p>
      <ul>
        <li>
          <strong>Infrastructure providers:</strong> Supabase, Vercel, and hosting services for site operation
        </li>
        <li>
          <strong>Google (reCAPTCHA):</strong> for form validation and abuse prevention
        </li>
        <li>
          <strong>Affiliate programs:</strong> when you click product links on our site, the merchant may receive information about your visit (per each partner&apos;s privacy policy)
        </li>
      </ul>
      <p>We do not sell your personal data to third parties.</p>

      <h2>6. Data Retention</h2>
      <p>
        Newsletter data is retained while you remain subscribed or until you request deletion. Technical logs are stored for the period necessary for security and operation, in line with best practices. You may request deletion at any time.
      </p>

      <h2>7. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Confirm whether we process your data</li>
        <li>Access your data</li>
        <li>Correct incomplete or outdated data</li>
        <li>Request deletion of your data</li>
        <li>Request data portability</li>
        <li>Withdraw consent at any time</li>
      </ul>
      <p>
        To exercise these rights, email us at{' '}
        <a href="mailto:nutrahub.life@gmail.com" className="text-[#086972] hover:underline">
          nutrahub.life@gmail.com
        </a>
        . We will respond within 15 days.
      </p>

      <h2>8. Cookies</h2>
      <p>
        We use Google&apos;s reCAPTCHA service to protect forms from spam and abuse. reCAPTCHA may collect information from your device and browsing activity per the{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#086972] hover:underline"
        >
          Google Privacy Policy
        </a>
        .
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Significant changes will be communicated by email (where applicable) or by a notice on the site. The last update date will be shown at the top of this page.
      </p>

      <h2>10. Contact</h2>
      <p>
        For questions, requests, or complaints about how we handle your data, contact us at:{' '}
        <a href="mailto:nutrahub.life@gmail.com" className="text-[#086972] hover:underline">
          nutrahub.life@gmail.com
        </a>
        .
      </p>

      <p className="mt-8">
        <Link href="/" className="text-[#086972] hover:underline">
          ← Back to home
        </Link>
      </p>
    </InstitutionalPageLayout>
  )
}
