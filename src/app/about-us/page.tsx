"use client";
import React from "react";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#050B1F] text-[#C7D8E7] flex flex-col items-center px-6 py-20">
      <div className="max-w-4xl w-full text-center">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#C7D8E7] mb-4">
          About Email Digest
        </h1>
        <p className="text-[#A9BCCC] text-base md:text-lg mb-12 leading-relaxed">
          Email Digest is a privacy-focused, serverless web application that
          transforms how professionals handle email documentation. We deliver a
          seamless solution to convert cluttered emails into clean, elegant, and
          fully formatted PDF digests — all while ensuring complete data privacy
          and zero server maintenance.
        </p>

        {/* Mission Section */}
        <section className="bg-[#0A1533] border border-[#122E76]/40 rounded-2xl p-8 mb-12 text-left shadow-lg shadow-[#122E76]/20">
          <h2 className="text-2xl font-bold text-[#C7D8E7] mb-4">
            Our Mission
          </h2>
          <p className="text-[#A9BCCC] leading-relaxed">
            Our mission is to simplify and modernize the way individuals and
            businesses organize important emails. By leveraging a 100%
            Cloudflare-based serverless infrastructure, we provide a fast,
            scalable, and environmentally efficient platform that prioritizes
            user privacy and operational simplicity.
          </p>
        </section>

        {/* Story Section */}
        <section className="bg-[#0A1533] border border-[#122E76]/40 rounded-2xl p-8 mb-12 text-left shadow-lg shadow-[#122E76]/20">
          <h2 className="text-2xl font-bold text-[#C7D8E7] mb-4">Our Story</h2>
          <p className="text-[#A9BCCC] leading-relaxed">
            The idea behind Email Digest was born from a simple frustration:
            existing email clients offer only a “Print to PDF” option that
            produces messy, incomplete, and inconsistent documents.
            Professionals needed a reliable, privacy-first tool that would
            transform their inbox clutter into well-organized, visually clean
            PDF documents ready for archiving, sharing, or compliance use.
          </p>
          <p className="text-[#A9BCCC] leading-relaxed mt-4">
            Our team built Email Digest entirely on Cloudflare’s edge network —
            combining performance, scalability, and data protection — to create
            a seamless system that automatically deletes all processed email
            data within 24 hours, guaranteeing confidentiality by design.
          </p>
        </section>

        {/* Core Values */}
        <section>
          <h2 className="text-2xl font-bold text-[#C7D8E7] mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ValueCard
              title="Privacy First"
              desc="All user data is securely processed and permanently deleted within 24 hours — ensuring complete confidentiality and trust."
            />
            <ValueCard
              title="Simplicity"
              desc="Every aspect of Email Digest is designed to be effortless — from ingestion to export — without technical complexity."
            />
            <ValueCard
              title="Transparency"
              desc="Our credit-based model and operations are straightforward, with no hidden fees or opaque data practices."
            />
            <ValueCard
              title="Reliability"
              desc="Built entirely on Cloudflare’s global network, our platform is scalable, stable, and built to perform under any workload."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#0A1533] border border-[#122E76]/40 rounded-2xl p-6 text-left hover:border-[#5C8AAC] hover:bg-[#122E76]/10 transition-all duration-300 shadow-sm hover:shadow-[#5C8AAC]/20">
      <h3 className="text-lg font-semibold text-[#C7D8E7] mb-2">{title}</h3>
      <p className="text-[#A9BCCC] text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
