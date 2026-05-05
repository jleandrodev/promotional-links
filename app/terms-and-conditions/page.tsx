import InstitutionalPageLayout from '@/app/components/InstitutionalPageLayout'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms and Conditions | NutraHub',
  description:
    'NutraHub Terms and Conditions. Learn the rules and conditions for using our natural health and wellness site.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
}

export default function TermsOfServicePage() {
  return (
    <InstitutionalPageLayout>
      <h1>Terms and Conditions</h1>

      <p><strong>Last updated:</strong> May 5, 2026</p>

      <h2>1. Responsible Party Identification</h2>
      <p>This website is managed by:</p>
      <p>
        <strong>Full Name:</strong> Jhonatan Leandro Ozorio<br />
        <strong>CPF:</strong> 079.945.189-40<br />
        <strong>Email:</strong> nutrahub.life@gmail.com<br />
        <strong>WhatsApp:</strong> +55 44 9722-7838
      </p>
      <p>
        The responsible party operates as an individual (natural person) and is the owner of all operations conducted through this website, in accordance with the data registered on the payment platforms used.
      </p>

      <h2>2. About the Service</h2>
      <p>
        Nutrahub is a platform that offers health and wellness-related products, including:
      </p>
      <ul>
        <li>Encapsulated products and nutraceuticals</li>
        <li>Digital materials such as PDFs and healthy recipe books</li>
        <li>Educational content and related products</li>
      </ul>
      <p>
        By accessing and using this website, the user agrees to these Terms and Conditions.
      </p>

      <h2>3. Payments</h2>
      <p>
        Payments on this website are processed by third-party platforms, including:
      </p>
      <ul>
        <li>dLocal Go</li>
        <li>Kiwify</li>
        <li>Other integrated solutions</li>
      </ul>
      <p>
        These platforms may provide local payment methods depending on the user&apos;s country.
      </p>
      <p>By making a purchase, the user declares that:</p>
      <ul>
        <li>All provided information is true and up to date</li>
        <li>They are the owner of the payment method used</li>
        <li>They authorize the transaction processing by the payment providers</li>
      </ul>
      <p>
        Payment approval is subject to the analysis and authorization of the respective platforms.
      </p>

      <h2>4. Delivery of Products and Services</h2>
      <p>After payment confirmation:</p>
      <ul>
        <li><strong>Digital products:</strong> delivered immediately via WhatsApp, email, or member area</li>
        <li><strong>Physical products (nutraceuticals):</strong> shipped within up to 48 hours</li>
      </ul>
      <p>
        Delivery times may vary depending on the customer&apos;s location and the logistics provider.
      </p>

      <h2>5. Refund Policy</h2>
      <p>
        Customers may request a refund within 7 (seven) days after purchase, in accordance with applicable consumer protection laws.
      </p>
      <p>
        To request a refund, the customer must contact us using the channels provided on this website.
      </p>
      <p>
        Refund requests will be reviewed and processed according to the policies of the payment platforms used.
      </p>

      <h2>6. Use of the Website</h2>
      <p>The user agrees to:</p>
      <ul>
        <li>Not use this website for illegal activities</li>
        <li>Not violate third-party rights</li>
        <li>Not attempt unauthorized access to restricted areas</li>
      </ul>

      <h2>7. Intellectual Property</h2>
      <p>
        All content available on this website, including texts, images, materials, and digital products, is the property of Nutrahub and may not be reproduced, distributed, or commercialized without prior authorization.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>The responsible party shall not be held liable for:</p>
      <ul>
        <li>Technical failures or system unavailability</li>
        <li>Issues related to third-party payment platforms</li>
        <li>Misuse of purchased products</li>
      </ul>
      <p>
        The products offered do not replace professional medical advice.
      </p>

      <h2>9. Changes to These Terms</h2>
      <p>
        These Terms and Conditions may be updated at any time. Users are encouraged to review this page periodically.
      </p>

      <h2>10. Contact</h2>
      <p>
        If you have any questions or need support, please contact:
      </p>
      <p>
        <strong>Email:</strong> nutrahub.life@gmail.com<br />
        <strong>WhatsApp:</strong> +55 44 9722-7838
      </p>

      <p>
        By using this website, you acknowledge that you have read and agree to these Terms and Conditions.
      </p>

      <p className="mt-8">
        <Link href="/" className="text-[#086972] hover:underline">
          ← Back to home
        </Link>
      </p>
    </InstitutionalPageLayout>
  )
}
