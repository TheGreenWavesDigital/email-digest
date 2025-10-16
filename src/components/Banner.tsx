import React from "react";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center bg-background-dark h-screen px-6 overflow-hidden">
      {/* Decorative Shape Behind Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-primary/30 via-blue-400/20 to-purple-400/20 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6 px-4">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Email Digest: Your Emails,
          <br className="hidden sm:block" /> Perfect PDFs.
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Transform your cluttered inbox into beautifully formatted PDF digests.
          Effortlessly manage and archive your important emails with ease.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            href="/register"
            className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Get Started for Free
          </Link>
        </div>
      </div>

      {/* Optional subtle gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background-dark to-transparent pointer-events-none" />
    </section>
  );
}
