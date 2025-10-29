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

  const totalCredits = 1000;
  const percent = Math.max(
    0,
    Math.min(100, totalCredits ? (credits / totalCredits) * 100 : 0)
  );

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
      } else {
        router.push("/login");
        return;
      }

      await refetchCredits();
      setLoading(false);
    })();
  }, [router, refetchCredits]);

  useEffect(() => {
    const topup = searchParams.get("topup");
    if (topup === "success") {
      refetchCredits();
    }
  }, [searchParams, refetchCredits]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") refetchCredits();
    };
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
          <h1 className="text-3xl font-bold mb-8 text-[#C7D8E7]">Profile</h1>

          {/* Profile Info */}
          <div className="p-6 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl mb-8 shadow-md shadow-[#122E76]/20">
            <h2 className="text-xl font-bold text-[#C7D8E7]">
              Account Information
            </h2>
            <p className="text-sm text-[#A9BCCC] mt-2">
              Name: {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-[#A9BCCC]">Email: {user.email}</p>
            <p className="text-sm text-[#A9BCCC]">Handler: {user.handler}</p>
          </div>

          {/* Settings */}
          <section className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-[#C7D8E7]">Settings</h3>
            <div className="space-y-4">
              <Link href={"/update-profile"}>
                <Card
                  icon={<Settings />}
                  title="Preferences"
                  desc="Manage your email preferences"
                />
              </Link>
            </div>
          </section>

          {/* Credits */}
          <section>
            <h3 className="text-xl font-bold mb-4 text-[#C7D8E7]">Credits</h3>

            <div className="p-6 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-md shadow-[#122E76]/20">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-[#A9BCCC]">
                    Credits Remaining
                  </p>
                  <p className="text-sm font-medium text-[#5C8AAC]">
                    {percent.toFixed(0)}%
                  </p>
                </div>

                <Link
                  href="/buy-credits"
                  className="inline-flex items-center gap-2 bg-[#5C8AAC] hover:bg-[#122E76] hover:text-[#C7D8E7] text-[#050B1F] px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md shadow-[#5C8AAC]/30 hover:shadow-[#122E76]/40"
                >
                  <span>+ Add Credits</span>
                </Link>
              </div>

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
        </div>

        <section className="mt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-[#C7D8E7]">
              Your Emails
            </h3>
            <EmailList />
          </div>
        </section>
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
    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0A1533] border border-[#122E76]/40 hover:border-[#5C8AAC] hover:bg-[#122E76]/10 transition-all duration-300 shadow-sm hover:shadow-[#5C8AAC]/20">
      <div className="flex items-center gap-4">
        <div className="text-[#5C8AAC] bg-[#5C8AAC]/10 p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="font-medium text-[#C7D8E7]">{title}</p>
          <p className="text-sm text-[#A9BCCC]">{desc}</p>
        </div>
      </div>
      <ArrowRight className="text-[#7D8EA5]" size={18} />
    </div>
  );
}
