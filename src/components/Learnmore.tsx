"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LearnMore() {
  return (
    <section className="relative bg-[#111317] border-t border-gray-800 py-16 px-6 flex flex-col items-center justify-center text-center shadow-inner shadow-blue-900/10">
      <div className="max-w-3xl mx-auto">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Learn More About Email Digest
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Discover how Email Digest is transforming email management into a
          privacy-first, serverless experience. Explore our mission, values, and
          vision for a simpler digital workspace.
        </p>

        {/* Button */}
        <Link
          href="/about-us"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md shadow-blue-800/20"
        >
          Learn More
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Subtle blue gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
    </section>
  );
}
