import React from "react";
import { Clock, Mail, Newspaper } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Newspaper className="w-6 h-6 text-[#5C8AAC]" />,
      title: "Daily Summaries",
      description:
        "Receive a concise summary of the day’s top stories, delivered to your inbox every evening.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#5C8AAC]" />,
      title: "Time-Saving",
      description:
        "Spend less time sifting through news and more time on what matters most.",
    },
    {
      icon: <Mail className="w-6 h-6 text-[#5C8AAC]" />,
      title: "Customizable",
      description:
        "Tailor your digest to include only the topics and sources you care about.",
    },
  ];

  return (
    <section className="bg-[#050B1F] text-[#C7D8E7] py-20">
      <div className="container mx-auto md:px-32 px-5 text-center">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-3 text-[#C7D8E7]">Key Features</h2>
        <p className="text-[#A9BCCC] max-w-2xl mx-auto mb-12">
          Our email digest service offers a range of features designed to keep
          you informed without overwhelming you.
        </p>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#0A1533] border border-[#122E76]/40 rounded-xl p-6 text-left hover:shadow-lg hover:shadow-[#5C8AAC]/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#5C8AAC]/10 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#C7D8E7]">
                {feature.title}
              </h3>
              <p className="text-[#A9BCCC] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
