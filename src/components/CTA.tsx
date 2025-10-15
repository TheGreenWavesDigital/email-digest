import React from "react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-background-dark text-white py-20">
      <div className="container mx-auto px-6">
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl shadow-lg text-center py-16 px-8 max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="text-3xl font-extrabold mb-3">
            Ready to Simplify Your Email Management?
          </h2>

          {/* Subheading */}
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Start creating beautiful, organized PDF digests of your emails
            today.
          </p>

          {/* Button */}
          <Link
            href="/register"
            className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-md"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </section>
  );
}
