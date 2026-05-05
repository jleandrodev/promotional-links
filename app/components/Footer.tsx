import Link from "next/link";
import Image from "next/image";
import { SiInstagram, SiYoutube } from "react-icons/si";
import { getCategories } from "@/lib/supabase/queries";
import { CookiePreferencesLink } from "./CookiePreferencesLink";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const categories = await getCategories().catch(() => []);

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
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
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
          {categories.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.slice(0, 6).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact & Institutional */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="mailto:nutrahub.life@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  nutrahub.life@gmail.com
                </a>
              </li>
            </ul>
            <h4 className="text-lg font-semibold mb-4 mt-6">Follow us</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/nutrahub.life/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <SiInstagram className="h-5 w-5 shrink-0" aria-hidden />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@Nutrahub-life"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <SiYoutube className="h-5 w-5 shrink-0" aria-hidden />
                  YouTube
                </a>
              </li>
            </ul>
            <h4 className="text-lg font-semibold mb-4 mt-6">Institutional</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <CookiePreferencesLink />
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>
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
