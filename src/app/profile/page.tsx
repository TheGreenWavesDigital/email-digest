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
    <div className="min-h-screen flex bg-[#0b0d0f] text-gray-200">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfVGXcgQHTdw9r2SdUPGAiY8C9Xo1U-TGoqjOjG2_O8mSe4RyjgbNId_hEr2DvDMh3WFBKhZh0cpXp0EUVn486wM_c_RGi-puqgnQCc62Bz6huqB9cMFBS-y7Ij5N_dCEih4Rr3J9zPs4CWLvKcn6sR0oeT8g4ratCeBB9wLdIuqYo0R-fbiz9EqxwtE7SWsvuPEjLVRhPlqpat-7ufAZ9KSlzVmiiiyy6Q9iD69RloZQaR0Qk8CT7H2dO0kQpWpVKTX0_0Pxuc7c"
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h1 className="font-bold text-white text-lg">Sophia</h1>
            <p className="text-sm text-gray-400">Personal</p>
          </div>
        </div>

        <nav className="space-y-2">
          <a
            className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-all"
            href="#"
          >
            <Home size={20} /> Home
          </a>
          <a
            className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-all"
            href="#"
          >
            <Inbox size={20} /> Inbox
          </a>
          <a
            className="flex items-center gap-3 text-white font-semibold bg-blue-500/10 px-3 py-2 rounded-lg"
            href="#"
          >
            <User size={20} /> Profile
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white">Profile</h1>

          {/* Profile Card */}
          <div className="flex items-center gap-6 p-6 bg-[#111317] border border-gray-800 rounded-2xl mb-8">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASZjQ-5VITd60skpRKO1LS0-txm6m_kDWheThELxVQGggPNwzr41yHVQW-G6yEpkKB0i85bOEXhT9SzJHMkBTX1jTtC83EiRrkBQQY7MZnFlrKd7UgPxB52xJdsUE6sWzaWkMe9f4QLH8kBG-0GKcd3ce1azfgPI2eVbmGEyAC1x6lMJHfFxhNuAW0YxwDAvJNUFIeEs6HBFTjQp5n2ALN-I3ALhqQN7IB-QFxE8S3yrUUMU9XXHVgPFaHcqutIWfXsGC9GflJcww"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">Sophia Miller</h2>
              <p className="text-gray-400 text-sm">sophia.miller@email.com</p>
            </div>
          </div>

          {/* Settings */}
          <section className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-white">Settings</h3>
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
            <h3 className="text-xl font-bold mb-4 text-white">Plan</h3>
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
            <h3 className="text-xl font-bold mb-4 text-white">Credits Used</h3>
            <div className="p-6 bg-[#111317] border border-gray-800 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-300">
                  Credits Used
                </p>
                <p className="text-sm font-medium text-blue-400">
                  {percent.toFixed(0)}%
                </p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {creditsUsed} / {totalCredits}
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* Reusable Setting/Plan Card */
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
      className="flex items-center justify-between p-4 rounded-2xl bg-[#111317] border border-gray-800 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        <div className="text-blue-400 bg-blue-500/10 p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="font-medium text-white">{title}</p>
          <p className="text-sm text-gray-400">{desc}</p>
        </div>
      </div>
      <ArrowRight className="text-gray-500" size={18} />
    </a>
  );
}
