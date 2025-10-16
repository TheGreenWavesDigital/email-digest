import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-700/20 py-6 bg-background-dark text-gray-400">
      <div className="container mx-auto px-4 text-center space-y-4">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/about-us" className="hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link
            href="/privacy-and-policy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-service"
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
        </div>

        {/* Social Icons */}
        {/* <div className="flex justify-center gap-6">
          <Link
            href="https://x.com"
            className="hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </Link>
          <Link
            href="https://facebook.com"
            className="hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </Link>
          <Link
            href="https://instagram.com"
            className="hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </Link>
        </div> */}

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Email Digest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
