"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Eiser Store</h2>
          <p className="text-sm text-gray-400">
            Discover your style with us. High quality, elegant products at fair
            prices. Shop smart, live better.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-[#71CD14] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-[#71CD14] transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-[#71CD14] transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-[#71CD14] transition-colors">
                Brands
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/cart" className="hover:text-[#71CD14] transition-colors">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/favorites" className="hover:text-[#71CD14] transition-colors">
                Favorites
              </Link>
            </li>

          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 text-sm">
            <Phone size={16} /> +20 123 456 789
          </p>
          <p className="flex items-center gap-2 text-sm mt-2">
            <Mail size={16} /> support@eiser.com
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="#" className="hover:text-[#71CD14]">
              <Facebook size={18} />
            </Link>
            <Link href="#" className="hover:text-[#71CD14]">
              <Instagram size={18} />
            </Link>
            <Link href="#" className="hover:text-[#71CD14]">
              <Twitter size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Eiser Store. All rights reserved.
      </div>
    </footer>
  );
}
