import React from "react";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center bg-[#050B1F] h-screen px-6 overflow-hidden">
      {/* Decorative Shape Behind Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#5C8AAC]/30 via-[#122E76]/20 to-[#C7D8E7]/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6 px-4">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#C7D8E7] leading-tight">
          Email Digest: Your Emails,
          <br className="hidden sm:block" /> Perfect PDFs.
        </h1>

        {/* Subtitle */}
        <p className="text-[#A9BCCC] text-base sm:text-lg max-w-2xl mx-auto">
          Transform your cluttered inbox into beautifully formatted PDF digests.
          Effortlessly manage and archive your important emails with ease.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            href="/register"
            className="inline-block bg-[#5C8AAC] text-[#050B1F] font-medium px-6 py-3 rounded-lg hover:bg-[#122E76] hover:text-[#C7D8E7] transition-all shadow-lg shadow-[#5C8AAC]/30"
          >
            Get Started for Free
          </Link>
        </div>
      </div>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050B1F] to-transparent pointer-events-none" />
    </section>
  );
}
