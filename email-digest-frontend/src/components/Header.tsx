"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Box, Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="bg-[#050B1F] text-[#C7D8E7] border-b border-[#122E76]/30 relative">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Box className="w-6 h-6 text-[#5C8AAC]" />
          <Link href={"/"}>
            <h1 className="text-lg font-semibold text-[#C7D8E7] tracking-wide">
              Email Digest
            </h1>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/about-us"
            className="hover:text-[#5C8AAC] transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/buy-credits"
            className="hover:text-[#5C8AAC] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#5C8AAC] transition-colors"
          >
            Contact
          </Link>

          <div className="flex items-center gap-3 ml-4">
            <Link
              href="/register"
              className="bg-[#5C8AAC] text-[#050B1F] font-medium px-4 py-2 rounded-lg hover:bg-[#122E76] hover:text-[#C7D8E7] transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-transparent border border-[#5C8AAC] text-[#C7D8E7] font-medium px-4 py-2 rounded-lg hover:bg-[#122E76] transition-colors"
            >
              Login
            </Link>
          </div>
        </nav>

        {/* Mobile Burger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#C7D8E7] hover:text-[#5C8AAC]"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-lg bg-[#050B1F]/95"
          ref={menuRef}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-[#C7D8E7] hover:text-[#5C8AAC] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          <nav className="flex flex-col items-center gap-5 text-lg text-[#C7D8E7]">
            <Link
              href="/about-us"
              onClick={handleLinkClick}
              className="hover:text-[#5C8AAC] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/buy-credits"
              onClick={handleLinkClick}
              className="hover:text-[#5C8AAC] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="hover:text-[#5C8AAC] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/register"
              onClick={handleLinkClick}
              className="bg-[#5C8AAC] text-[#050B1F] font-medium px-5 py-2 rounded-lg hover:bg-[#122E76] hover:text-[#C7D8E7] transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="bg-transparent border border-[#5C8AAC] text-[#C7D8E7] font-medium px-5 py-2 rounded-lg hover:bg-[#122E76] transition-colors"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
