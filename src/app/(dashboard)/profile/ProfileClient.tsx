"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getProfile, getCredits, logoutUser } from "../../../utils/api";
import EmailList from "../../../components/EmailList";
import { ArrowRight, Settings } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // ✅ Ideally fetch from backend user object, not hardcoded
  const totalCredits = 1000;
  const percent = Math.min(100, Math.max(0, (credits / totalCredits) * 100));

  const refetchCredits = useCallback(async () => {
    const res = await getCredits();
    if (res?.success) setCredits(res.credits ?? 0);
  }, []);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const userResponse = await getProfile();
      if (userResponse?.success) {
        setUser(userResponse.user);
        await refetchCredits();
        setLoading(false);
      } else {
        router.push("/login");
      }
    })();
  }, [router, refetchCredits]);

  // ✅ Refresh credits after topup success
  useEffect(() => {
    if (searchParams.get("topup") === "success") {
      refetchCredits();
    }
  }, [searchParams, refetchCredits]);

  // ✅ Always refresh on focus or visibility change
  useEffect(() => {
    const onVisible = () =>
      document.visibilityState === "visible" && refetchCredits();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", refetchCredits);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", refetchCredits);
    };
  }, [refetchCredits]);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050B1F] text-[#C7D8E7]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#050B1F] text-[#C7D8E7]">
      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>

          {/* Profile Info */}
          <div className="p-6 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl mb-8 shadow-md shadow-[#122E76]/20">
            <h2 className="text-xl font-bold">Account Information</h2>
            <p className="text-sm mt-2">
              Name: {user.firstName} {user.lastName}
            </p>
            <p className="text-sm">Email: {user.email}</p>
            <p className="text-sm">Handler: {user.handler}</p>
          </div>

          {/* Settings */}
          <section className="mb-10">
            <h3 className="text-xl font-bold mb-4">Settings</h3>
            <Link href={"/update-profile"}>
              <Card
                icon={<Settings />}
                title="Preferences"
                desc="Manage your email preferences"
              />
            </Link>
          </section>

          {/* Credits */}
          <section>
            <h3 className="text-xl font-bold mb-4 text-[#C7D8E7]">Credits</h3>

            <div className="p-6 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-md shadow-[#122E76]/20">
              <div className="flex items-center justify-between gap-4 mb-3">
                {/* Left side */}
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-[#A9BCCC]">
                    Credits Remaining
                  </p>
                  <p className="text-sm font-medium text-[#5C8AAC]">
                    {percent.toFixed(0)}%
                  </p>
                </div>

                {/* ✅ Button should ALWAYS show */}
                <Link
                  href="/buy-credits"
                  className="inline-flex items-center gap-2 bg-[#5C8AAC] hover:bg-[#122E76] hover:text-[#C7D8E7] text-[#050B1F] px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md shadow-[#5C8AAC]/30 hover:shadow-[#122E76]/40"
                >
                  + Add Credits
                </Link>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#122E76]/30 rounded-full h-2.5">
                <div
                  className="bg-[#5C8AAC] h-2.5 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="text-sm text-[#7D8EA5] mt-2">
                {credits} / {totalCredits}
              </p>
            </div>
          </section>

          {/* Emails */}
          <section className="mt-12">
            <h3 className="text-xl font-bold mb-4">Your Emails</h3>
            <EmailList />
          </section>
        </div>
      </main>
    </div>
  );
}

function Card({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0A1533] border border-[#122E76]/40 hover:border-[#5C8AAC] hover:bg-[#122E76]/10 transition-all duration-300 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="text-[#5C8AAC] bg-[#5C8AAC]/10 p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-[#A9BCCC]">{desc}</p>
        </div>
      </div>
      <ArrowRight className="text-[#7D8EA5]" size={18} />
    </div>
  );
}
