"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getProfile, getCredits, logoutUser } from "../../../utils/api";
import EmailList from "../../../components/EmailList";
import { ArrowRight, Settings } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const totalCredits = 1000;
  const percent = Math.min(100, (credits / totalCredits) * 100);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const profile = await getProfile();
      if (profile?.success) {
        setUser(profile.user);
      } else {
        router.push("/login");
        return;
      }

      const creditRes = await getCredits();
      if (creditRes?.success) setCredits(creditRes.credits ?? 0);

      setLoading(false);
    }
    load();
  }, [router]);

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
          <div className="p-6 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl mb-8">
            <h2 className="text-xl font-bold">Account Information</h2>
            <p>
              Name: {user.firstName} {user.lastName}
            </p>
            <p>Email: {user.email}</p>
            <p>Handler: {user.handler}</p>
          </div>

          {/* Settings */}
          <section className="mb-10">
            <h3 className="text-xl font-bold mb-4">Settings</h3>
            <Link href="/update-profile">
              <div className="flex justify-between items-center p-4 bg-[#0A1533] border border-[#122E76]/40 rounded-xl cursor-pointer hover:border-[#5C8AAC]">
                <div className="flex gap-4 items-center">
                  <Settings className="text-[#5C8AAC]" />
                  <div>
                    <p className="font-medium">Preferences</p>
                    <p className="text-sm text-[#A9BCCC]">
                      Manage your email preferences
                    </p>
                  </div>
                </div>
                <ArrowRight className="text-[#7D8EA5]" />
              </div>
            </Link>
          </section>

          {/* Credits */}
          <section>
            <h3 className="text-xl font-bold mb-4">Credits</h3>
            <div className="p-6 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-3 items-center">
                  <p>Credits Remaining</p>
                  <p>{percent.toFixed(0)}%</p>
                </div>
                <Link
                  href="/buy-credits"
                  className="bg-[#5C8AAC] text-[#050B1F] px-4 py-2 rounded-lg hover:bg-[#122E76] hover:text-[#C7D8E7]"
                >
                  + Add Credits
                </Link>
              </div>
              <div className="w-full bg-[#122E76]/30 h-2 rounded-full">
                <div
                  className="h-2 bg-[#5C8AAC] rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="mt-2">
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
