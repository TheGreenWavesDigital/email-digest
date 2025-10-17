import React from "react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-[#050B1F] text-[#C7D8E7] py-20">
      <div className="container mx-auto px-6">
        <div className="bg-[#0A1533]/70 border border-[#122E76]/40 rounded-2xl shadow-lg shadow-[#122E76]/20 text-center py-16 px-8 max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="text-3xl font-extrabold mb-3 text-[#C7D8E7]">
            Ready to Simplify Your Email Management?
          </h2>

          {/* Subheading */}
          <p className="text-[#A9BCCC] mb-8 max-w-lg mx-auto leading-relaxed">
            Start creating beautiful, organized PDF digests of your emails
            today.
          </p>

          {/* Button */}
          <Link
            href="/register"
            className="inline-block bg-[#5C8AAC] text-[#050B1F] font-semibold px-6 py-3 rounded-lg hover:bg-[#122E76] hover:text-[#C7D8E7] transition-all duration-300 shadow-md shadow-[#5C8AAC]/30 hover:shadow-[#122E76]/40"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </section>
  );
}
