"use client";
import React, { useState } from "react";

export default function BuyCreditsPage() {
  const [balance, setBalance] = useState(100);

  const packages = [
    { credits: 100, price: 10, description: "Perfect for getting started." },
    { credits: 500, price: 45, description: "Best value for frequent users." },
    { credits: 1000, price: 80, description: "For power users and teams." },
  ];

  const handlePurchase = (credits: number) => {
    setBalance(balance + credits);
    alert(`Purchased ${credits} credits successfully!`);
  };

  return (
    <main className="min-h-screen bg-[#050B1F] text-[#C7D8E7] flex flex-col items-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#C7D8E7] mb-4">
          Top Up Your Credits
        </h1>
        <p className="text-[#A9BCCC] text-base md:text-lg mb-10 leading-relaxed">
          Manage your balance and purchase more credits to continue creating
          digests.
        </p>

        {/* Balance Card */}
        <div className="bg-[#0A1533] border border-[#122E76]/40 rounded-2xl py-6 mb-12 shadow-lg shadow-[#122E76]/20">
          <h2 className="text-lg font-semibold mb-2 text-[#C7D8E7]">
            Current Balance
          </h2>
          <p className="text-5xl font-bold text-[#5C8AAC]">
            {balance}
            <span className="text-lg text-[#A9BCCC] ml-1">Credits</span>
          </p>
        </div>

        {/* Packages */}
        <h2 className="text-2xl font-bold text-[#C7D8E7] mb-6">
          Credit Packages
        </h2>
        <div className="flex flex-col gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.credits}
              className="bg-[#0A1533] border border-[#122E76]/40 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center hover:border-[#5C8AAC] hover:bg-[#122E76]/10 transition-all duration-300 shadow-sm hover:shadow-[#5C8AAC]/20"
            >
              <div className="text-left sm:text-left">
                <h3 className="text-xl font-semibold text-[#C7D8E7]">
                  {pkg.credits} Credits{" "}
                  <span className="text-[#5C8AAC] font-medium">
                    ${pkg.price}
                  </span>
                </h3>
                <p className="text-sm text-[#A9BCCC] mt-1">{pkg.description}</p>
              </div>
              <button
                onClick={() => handlePurchase(pkg.credits)}
                className="mt-4 sm:mt-0 bg-[#5C8AAC] hover:bg-[#122E76] hover:text-[#C7D8E7] text-[#050B1F] px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md shadow-[#5C8AAC]/30 hover:shadow-[#122E76]/40"
              >
                Purchase
              </button>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-sm text-[#7D8EA5]">
          Credits are used to generate digests. Each digest costs 1 credit.
          Credits do not expire.
        </p>
      </div>
    </main>
  );
}
