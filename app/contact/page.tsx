import InstitutionalPageLayout from '@/app/components/InstitutionalPageLayout'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact | NutraHub',
  description:
    'Get in touch with NutraHub. Questions, suggestions, or data privacy requests - we are here to help.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <InstitutionalPageLayout>
      <h1>Contact</h1>

      <p>
        We&apos;re here to hear from you. Reach out via the email below for questions, suggestions, partnerships, or any other inquiries.
      </p>

      <h2>Email</h2>
      <p>
        <a
          href="mailto:nutrahub.life@gmail.com"
          className="text-[#086972] hover:underline font-semibold text-lg"
        >
          nutrahub.life@gmail.com
        </a>
      </p>

      <h2>How Can We Help?</h2>
      <ul>
        <li>Questions about our content or recommended products</li>
        <li>Suggestions for new article topics</li>
        <li>Partnership or collaboration proposals</li>
        <li>
          <strong>Privacy requests:</strong> access, correction, deletion, or portability of your personal data
        </li>
      </ul>

      <p>
        We will respond as soon as possible. For data privacy requests, we commit to responding within 15 days.
      </p>

      <p className="mt-8">
        <Link href="/" className="text-[#086972] hover:underline">
          ← Back to home
        </Link>
      </p>
    </InstitutionalPageLayout>
  )
}
