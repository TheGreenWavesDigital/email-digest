import React from "react";
import { Mail, List, Download } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Mail className="w-6 h-6 text-[#5C8AAC]" />,
      title: "Forward Emails",
      description: "Simply forward emails to your unique Email Digest address.",
    },
    {
      icon: <List className="w-6 h-6 text-[#5C8AAC]" />,
      title: "View & Select",
      description: "Review and select emails in a clean, organized interface.",
    },
    {
      icon: <Download className="w-6 h-6 text-[#5C8AAC]" />,
      title: "Download Perfect PDFs",
      description: "Download your perfectly formatted PDF digest.",
    },
  ];

  return (
    <section className="bg-[#050B1F] text-[#C7D8E7] py-20">
      <div className="container mx-auto md:px-32 px-5 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-3 text-[#C7D8E7]">How It Works</h2>
        <p className="text-[#A9BCCC] max-w-2xl mx-auto mb-12">
          A simple three-step process to reclaim your inbox.
        </p>

        {/* Steps Grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group transition-all duration-300"
            >
              {/* Icon Circle */}
              <div className="relative mb-5">
                <div className="absolute inset-0 rounded-full bg-[#5C8AAC]/20 blur-lg group-hover:bg-[#122E76]/30 transition-all"></div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-b from-[#5C8AAC]/30 to-[#122E76]/10 border border-[#5C8AAC]/40 shadow-md shadow-[#5C8AAC]/10 group-hover:scale-105 transition-transform">
                  {step.icon}
                </div>
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold mb-2 text-[#C7D8E7]">
                {step.title}
              </h3>
              <p className="text-[#A9BCCC] text-sm max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
