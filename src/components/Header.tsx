"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Box, Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
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
    <header className="bg-background-dark text-gray-300 border-b border-gray-700/20 relative">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Box className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-semibold text-white">Daily Digest</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/support" className="hover:text-white transition-colors">
            Support
          </Link>

          <div className="flex items-center gap-3 ml-4">
            <Link
              href="/register"
              className="bg-primary text-white font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-gray-800 text-gray-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </nav>

        {/* Mobile Burger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-white"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-lg bg-background-dark/80"
          ref={menuRef}
        >
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Nav Links */}
          <nav className="flex flex-col items-center gap-5 text-lg">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/features"
              onClick={handleLinkClick}
              className="hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              onClick={handleLinkClick}
              className="hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/support"
              onClick={handleLinkClick}
              className="hover:text-white transition-colors"
            >
              Support
            </Link>
            <Link
              href="/register"
              onClick={handleLinkClick}
              className="bg-primary text-white font-medium px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="bg-gray-800 text-gray-300 font-medium px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
