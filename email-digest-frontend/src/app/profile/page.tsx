"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, getCredits, logoutUser } from "@/utils/api";
import { Home, Inbox, Settings, Star, ArrowRight, Rocket } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
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

      const creditsResponse = await getCredits();
      if (creditsResponse?.success) {
        setCredits(creditsResponse.credits);
      }

      setLoading(false);
    }

    fetchData();
  }, [router]);

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

  const totalCredits = 1000; // Example (can be dynamic from DB)
  const percent = (credits / totalCredits) * 100;

  return (
    <div className="min-h-screen flex bg-[#050B1F] text-[#C7D8E7]">
      {/* Sidebar */}
      <aside className="w-72 border-r border-[#122E76]/40 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="font-bold text-[#C7D8E7] text-lg">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-sm text-[#A9BCCC]">{user.email}</p>
        </div>

        <nav className="space-y-2">
          <a
            className="flex items-center gap-3 text-[#A9BCCC] hover:text-[#5C8AAC] transition-colors"
            href="/"
          >
            <Home size={20} /> Home
          </a>
          <a
            className="flex items-center gap-3 text-[#A9BCCC] hover:text-[#5C8AAC] transition-colors"
            href="/inbox"
          >
            <Inbox size={20} /> Inbox
          </a>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto text-sm text-[#A9BCCC] hover:text-red-400 transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
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
              <Card
                icon={<Settings />}
                title="Preferences"
                desc="Manage your email preferences"
              />
            </div>
          </section>

          {/* Plan */}
          <section className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-[#C7D8E7]">Plan</h3>
            <div className="space-y-4">
              <Card
                icon={<Star />}
                title="Free Plan"
                desc="You are currently on the free plan."
              />
              <Card
                icon={<Rocket />}
                title="Upgrade Plan"
                desc="Upgrade to get more features."
              />
            </div>
          </section>

          {/* Credits */}
          <section>
            <h3 className="text-xl font-bold mb-4 text-[#C7D8E7]">Credits</h3>
            <div className="p-6 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-md shadow-[#122E76]/20">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-[#A9BCCC]">
                  Credits Remaining
                </p>
                <p className="text-sm font-medium text-[#5C8AAC]">
                  {percent.toFixed(0)}%
                </p>
              </div>
              <div className="w-full bg-[#122E76]/30 rounded-full h-2.5">
                <div
                  className="bg-[#5C8AAC] h-2.5 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <p className="text-sm text-[#7D8EA5] mt-2">
                {credits} / {totalCredits}
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* Reusable Card Component */
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
