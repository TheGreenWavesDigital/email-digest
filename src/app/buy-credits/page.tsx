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
    <main className="min-h-screen bg-[#0b0d0f] text-gray-200 flex flex-col items-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Top Up Your Credits
        </h1>
        <p className="text-gray-400 text-base md:text-lg mb-10">
          Manage your balance and purchase more credits to continue creating
          digests.
        </p>

        {/* Balance Card */}
        <div className="bg-[#111317] border border-gray-800 rounded-2xl py-6 mb-12 shadow-lg shadow-blue-900/10">
          <h2 className="text-lg font-semibold mb-2">Current Balance</h2>
          <p className="text-5xl font-bold text-blue-400">
            {balance}
            <span className="text-lg text-gray-400 ml-1">Credits</span>
          </p>
        </div>

        {/* Packages */}
        <h2 className="text-2xl font-bold text-white mb-6">Credit Packages</h2>
        <div className="flex flex-col gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.credits}
              className="bg-[#111317] border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center hover:border-blue-500/40 transition-all duration-200"
            >
              <div className="text-left sm:text-left">
                <h3 className="text-xl font-semibold text-white">
                  {pkg.credits} Credits{" "}
                  <span className="text-blue-400 font-medium">
                    ${pkg.price}
                  </span>
                </h3>
                <p className="text-sm text-gray-400 mt-1">{pkg.description}</p>
              </div>
              <button
                onClick={() => handlePurchase(pkg.credits)}
                className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md shadow-blue-800/20"
              >
                Purchase
              </button>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-sm text-gray-500">
          Credits are used to generate digests. Each digest costs 1 credit.
          Credits do not expire.
        </p>
      </div>
    </main>
  );
}
//
