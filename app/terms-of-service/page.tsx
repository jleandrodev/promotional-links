import InstitutionalPageLayout from '@/app/components/InstitutionalPageLayout'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | NutraHub',
  description:
    'NutraHub Terms of Service. Learn the rules and conditions for using our natural health and wellness site.',
  alternates: {
    canonical: '/terms-of-service',
  },
}

export default function TermsOfServicePage() {
  return (
    <InstitutionalPageLayout>
      <h1>Terms of Service</h1>
      <p className="text-gray-600">Last updated: March 2025</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using the NutraHub website, you acknowledge that you have read, understood, and agree to these Terms of Service. If you do not agree with any provision, please do not use the site.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        NutraHub is an informational website dedicated to natural health, wellness, and product and supplement recommendations. Our content includes articles, guides, and educational information. The site does not sell products directly; purchases are made on third-party websites.
      </p>

      <h2>3. Affiliate Links</h2>
      <p>
        NutraHub participates in affiliate programs. This means we may receive a commission when you make a purchase through links on our articles and pages. This commission does not change the final price for you and helps us maintain the site and produce quality content.
      </p>
      <p>
        We are transparent about this practice: whenever we recommend a product, our intention is to provide useful information. The decision to purchase is entirely yours.
      </p>

      <h2>4. Medical Disclaimer</h2>
      <p>
        <strong>NutraHub content is for informational and educational purposes only.</strong> It does not replace medical, nutritional, or any other professional health advice. Always consult a qualified professional before starting treatments, diets, or using supplements.
      </p>
      <p>
        The information published is based on research and evidence available at the time of publication, but may not reflect more recent findings. NutraHub is not responsible for decisions made based on the site&apos;s content.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        All site content (text, images, logos, layout, and other elements) is owned by NutraHub or its licensors and is protected by copyright laws. Use is permitted only for personal reading and reference. Reproduction, distribution, modification, or commercial use without prior written authorization is prohibited.
      </p>

      <h2>6. User Conduct</h2>
      <p>When using the site, you agree to:</p>
      <ul>
        <li>Not use the site for illegal purposes or in ways that violate third-party rights</li>
        <li>Not perform scraping, automated data extraction, or server overload</li>
        <li>Not attempt to access restricted areas or compromise the site&apos;s security</li>
        <li>Not use the content in ways that harm or damage NutraHub&apos;s reputation</li>
      </ul>

      <h2>7. Limitation of Liability</h2>
      <p>
        NutraHub is not liable for indirect, incidental, or consequential damages arising from the use or inability to use the site. The site is provided &quot;as is&quot;, without warranties of uninterrupted availability or error-free operation. We are not responsible for the content or practices of third-party sites accessed through links on our site.
      </p>

      <h2>8. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms of Service at any time. Significant changes will be communicated by a notice on the site. Continued use of the site after changes constitutes acceptance of the new terms.
      </p>

      <h2>9. Governing Law and Jurisdiction</h2>
      <p>
        These Terms are governed by the laws of the United States. For users in Australia, Australian law may also apply. Any disputes shall be resolved in the courts of the user&apos;s jurisdiction, or as otherwise required by applicable law.
      </p>

      <h2>10. Contact</h2>
      <p>
        For questions about these Terms of Service, contact us at:{' '}
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
