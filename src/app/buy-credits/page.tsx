"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Local API endpoint ONLY for testing:
const API_BASE = "http://127.0.0.1:8787";

type Pkg = { credits: 100 | 500 | 1000; price: number; description: string };

export default function BuyCreditsPage() {
  const router = useRouter();
  const [balance, setBalance] = useState<number>(0);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const packages: Pkg[] = [
    { credits: 100, price: 10, description: "Perfect for getting started." },
    { credits: 500, price: 45, description: "Best value for frequent users." },
    { credits: 1000, price: 80, description: "For power users and teams." },
  ];

  // ✅ Fetch balance on load
  const fetchBalance = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      const res = await fetch(`${API_BASE}/user/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setBalance(data.credits ?? 0);
      } else {
        console.error("Failed to fetch credits:", data);
      }
    } catch (err) {
      console.error("Error loading balance:", err);
    }
  };

  useEffect(() => {
    // Always load balance initially
    fetchBalance();

    // ✅ Handle Stripe return redirect
    const url = new URL(window.location.href);
    const status = url.searchParams.get("status");
    if (status === "success") {
      setStatusMessage("✅ Payment successful! Updating credits...");
      fetchBalance();
      // Remove query param from URL without reloading page
      url.searchParams.delete("status");
      window.history.replaceState({}, "", url.toString());
    } else if (status === "cancel") {
      setStatusMessage("❌ Payment canceled. No credits were added.");
      url.searchParams.delete("status");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const startCheckout = async (creditsPackage: Pkg["credits"]) => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      setLoadingId(creditsPackage);

      const res = await fetch(`${API_BASE}/payments/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ creditsPackage }),
      });

      const data = await res.json();
      if (!res.ok || !data?.url) {
        console.error("Checkout error:", data);
        alert(data?.error ?? "Unable to start checkout session.");
        setLoadingId(null);
        return;
      }

      // Redirect user to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout exception:", err);
      alert("An unexpected error occurred starting checkout.");
      setLoadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#050B1F] text-[#C7D8E7] flex flex-col items-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Top Up Your Credits{" "}
          <span className="text-[#5C8AAC]">(Local Mode)</span>
        </h1>
        <p className="text-[#A9BCCC] text-base md:text-lg mb-10">
          Connected to <code>{API_BASE}</code>
        </p>

        {/* Status Message */}
        {statusMessage && (
          <div className="bg-[#0A1533] border border-[#5C8AAC]/30 text-[#C7D8E7] rounded-lg py-3 px-4 mb-6">
            {statusMessage}
          </div>
        )}

        {/* Balance Card */}
        <div className="bg-[#0A1533] border border-[#122E76]/40 rounded-2xl py-6 mb-12 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Current Balance</h2>
          <p className="text-5xl font-bold text-[#5C8AAC]">
            {balance}
            <span className="text-lg text-[#A9BCCC] ml-1">Credits</span>
          </p>
        </div>

        {/* Packages */}
        <h2 className="text-2xl font-bold mb-6">Credit Packages</h2>
        <div className="flex flex-col gap-6">
          {packages.map((pkg) => {
            const busy = loadingId === pkg.credits;
            return (
              <div
                key={pkg.credits}
                className="bg-[#0A1533] border border-[#122E76]/40 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center hover:border-[#5C8AAC]"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {pkg.credits} Credits{" "}
                    <span className="text-[#5C8AAC]">${pkg.price}</span>
                  </h3>
                  <p className="text-sm text-[#A9BCCC] mt-1">
                    {pkg.description}
                  </p>
                </div>
                <button
                  onClick={() => startCheckout(pkg.credits)}
                  disabled={busy}
                  className="mt-4 sm:mt-0 bg-[#5C8AAC] hover:bg-[#122E76] text-[#050B1F] hover:text-[#C7D8E7] px-6 py-2.5 rounded-lg font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {busy ? "Redirecting…" : "Purchase"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-[#7D8EA5]">
          Credits are used to generate digests. 1 credit = 1 digest. Test mode
          only.
        </p>
      </div>
    </main>
  );
}
