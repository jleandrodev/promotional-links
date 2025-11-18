import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#053d42] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <Image
              src="/images/logo-white.svg"
              alt="NutraHub"
              width={150}
              height={40}
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-300">
              Your trusted source for natural health and wellness products,
              backed by science and expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/conditions"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/natural-remedies"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Natural Remedies
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/guides"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Guides & Protocols
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/reviews"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@nutrahub.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} NutraHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
