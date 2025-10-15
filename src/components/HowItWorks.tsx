import React from "react";
import { Mail, List, Download } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Forward Emails",
      description: "Simply forward emails to your unique Email Digest address.",
    },
    {
      icon: <List className="w-6 h-6 text-primary" />,
      title: "View & Select",
      description: "Review and select emails in a clean, organized interface.",
    },
    {
      icon: <Download className="w-6 h-6 text-primary" />,
      title: "Download Perfect PDFs",
      description: "Download your perfectly formatted PDF digest.",
    },
  ];

  return (
    <section className="bg-background-dark text-white py-20">
      <div className="container mx-auto md:px-32 px-5 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-3">How It Works</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          A simple three-step process to reclaim your inbox.
        </p>

        {/* Steps Grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon Circle */}
              <div className="relative mb-5">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg"></div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-b from-primary/30 to-primary/10 border border-primary/40">
                  {step.icon}
                </div>
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
