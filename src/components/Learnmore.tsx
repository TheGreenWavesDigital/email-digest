"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LearnMore() {
  return (
    <section className="relative bg-[#050B1F] border-t border-[#122E76]/40 py-16 px-6 flex flex-col items-center justify-center text-center shadow-inner shadow-[#122E76]/20">
      <div className="max-w-3xl mx-auto">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#C7D8E7] mb-4">
          Learn More About Email Digest
        </h2>
        <p className="text-[#A9BCCC] mb-8 max-w-xl mx-auto leading-relaxed">
          Discover how Email Digest is transforming email management into a
          privacy-first, serverless experience. Explore our mission, values, and
          vision for a simpler digital workspace.
        </p>

        {/* Button */}
        <Link
          href="/about-us"
          className="inline-flex items-center gap-2 bg-[#5C8AAC] hover:bg-[#122E76] text-[#050B1F] hover:text-[#C7D8E7] font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md shadow-[#5C8AAC]/30 hover:shadow-[#122E76]/40"
        >
          Learn More
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Subtle blue gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#5C8AAC]/10 to-transparent pointer-events-none" />
    </section>
  );
}
