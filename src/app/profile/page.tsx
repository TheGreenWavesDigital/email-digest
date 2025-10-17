"use client";
import React from "react";
import {
  User,
  Home,
  Inbox,
  Lock,
  Settings,
  Star,
  ArrowRight,
  Rocket,
} from "lucide-react";

export default function ProfilePage() {
  const creditsUsed = 600;
  const totalCredits = 1000;
  const percent = (creditsUsed / totalCredits) * 100;

  return (
    <div className="min-h-screen flex bg-[#050B1F] text-[#C7D8E7]">
      {/* Sidebar */}
      <aside className="w-72 border-r border-[#122E76]/40 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfVGXcgQHTdw9r2SdUPGAiY8C9Xo1U-TGoqjOjG2_O8mSe4RyjgbNId_hEr2DvDMh3WFBKhZh0cpXp0EUVn486wM_c_RGi-puqgnQCc62Bz6huqB9cMFBS-y7Ij5N_dCEih4Rr3J9zPs4CWLvKcn6sR0oeT8g4ratCeBB9wLdIuqYo0R-fbiz9EqxwtE7SWsvuPEjLVRhPlqpat-7ufAZ9KSlzVmiiiyy6Q9iD69RloZQaR0Qk8CT7H2dO0kQpWpVKTX0_0Pxuc7c"
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h1 className="font-bold text-[#C7D8E7] text-lg">Sophia</h1>
            <p className="text-sm text-[#A9BCCC]">Personal</p>
          </div>
        </div>

        <nav className="space-y-2">
          <a
            className="flex items-center gap-3 text-[#A9BCCC] hover:text-[#5C8AAC] transition-colors"
            href="#"
          >
            <Home size={20} /> Home
          </a>
          <a
            className="flex items-center gap-3 text-[#A9BCCC] hover:text-[#5C8AAC] transition-colors"
            href="#"
          >
            <Inbox size={20} /> Inbox
          </a>
          <a
            className="flex items-center gap-3 text-[#C7D8E7] font-semibold bg-[#5C8AAC]/10 px-3 py-2 rounded-lg border border-[#122E76]/40"
            href="#"
          >
            <User size={20} /> Profile
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-[#C7D8E7]">Profile</h1>

          {/* Profile Card */}
          <div className="flex items-center gap-6 p-6 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl mb-8 shadow-md shadow-[#122E76]/20">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASZjQ-5VITd60skpRKO1LS0-txm6m_kDWheThELxVQGggPNwzr41yHVQW-G6yEpkKB0i85bOEXhT9SzJHMkBTX1jTtC83EiRrkBQQY7MZnFlrKd7UgPxB52xJdsUE6sWzaWkMe9f4QLH8kBG-0GKcd3ce1azfgPI2eVbmGEyAC1x6lMJHfFxhNuAW0YxwDAvJNUFIeEs6HBFTjQp5n2ALN-I3ALhqQN7IB-QFxE8S3yrUUMU9XXHVgPFaHcqutIWfXsGC9GflJcww"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-[#C7D8E7]">
                Sophia Miller
              </h2>
              <p className="text-sm text-[#A9BCCC]">sophia.miller@email.com</p>
            </div>
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
              <Card
                icon={<Lock />}
                title="Password"
                desc="Change your password"
              />
            </div>
          </section>

          {/* Plan */}
          <section className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-[#C7D8E7]">Plan</h3>
            <div className="space-y-4">
              <Card icon={<Star />} title="Free" desc="Current plan: Free" />
              <Card
                icon={<Rocket />}
                title="Upgrade"
                desc="Upgrade to a paid plan"
              />
            </div>
          </section>

          {/* Credits Used */}
          <section>
            <h3 className="text-xl font-bold mb-4 text-[#C7D8E7]">
              Credits Used
            </h3>
            <div className="p-6 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-md shadow-[#122E76]/20">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-[#A9BCCC]">
                  Credits Used
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
                {creditsUsed} / {totalCredits}
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
    <a
      href="#"
      className="flex items-center justify-between p-4 rounded-2xl bg-[#0A1533] border border-[#122E76]/40 hover:border-[#5C8AAC] hover:bg-[#122E76]/10 transition-all duration-300 shadow-sm hover:shadow-[#5C8AAC]/20"
    >
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
    </a>
  );
}
