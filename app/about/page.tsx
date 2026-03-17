import InstitutionalPageLayout from '@/app/components/InstitutionalPageLayout'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | NutraHub',
  description:
    'Meet NutraHub: your trusted source for natural health, wellness, and evidence-based product recommendations.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <InstitutionalPageLayout>
      <h1>About Us</h1>

      <h2>Our Mission</h2>
      <p>
        NutraHub was created to be your trusted source of information on natural health and wellness. We believe that access to quality, evidence-based content presented clearly can help people make more informed decisions about their health.
      </p>

      <h2>What We Do</h2>
      <p>
        We produce articles, guides, and recommendations on supplements, nutrition, and wellness practices. Our blog covers topics such as sleep, immunity, energy, digestive health, and more, always with a focus on natural and sustainable solutions.
      </p>
      <p>
        We also recommend products we consider useful for our readers. These recommendations are made with care, and we are transparent: we participate in affiliate programs, which allows us to maintain the site and continue producing free content.
      </p>

      <h2>What Sets Us Apart</h2>
      <ul>
        <li>
          <strong>Curated content:</strong> We select and organize information in an accessible way
        </li>
        <li>
          <strong>Transparency:</strong> We make it clear when a link is an affiliate link
        </li>
        <li>
          <strong>Evidence-based focus:</strong> We prioritize information based on studies and best practices
        </li>
        <li>
          <strong>Respect for our readers:</strong> Your time and health matter; we don&apos;t promise miracles
        </li>
      </ul>

      <h2>Our Team</h2>
      <p>
        NutraHub is maintained by a team dedicated to the mission of democratizing access to reliable information on natural health. We work to ensure every article brings real value to our readers.
      </p>

      <h2>Get in Touch</h2>
      <p>
        Have questions, suggestions, or want to learn more? We&apos;d love to hear from you. Email us at{' '}
        <a href="mailto:nutrahub.life@gmail.com" className="text-[#086972] hover:underline">
          nutrahub.life@gmail.com
        </a>
        .
      </p>
      <p>
        Or subscribe to our{' '}
        <Link href="/#newsletter" className="text-[#086972] hover:underline">
          newsletter
        </Link>
        {' '}to receive updates and exclusive content.
      </p>

      <p className="mt-8">
        <Link href="/" className="text-[#086972] hover:underline">
          ← Back to home
        </Link>
      </p>
    </InstitutionalPageLayout>
  )
}
