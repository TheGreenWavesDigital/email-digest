"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { Inbox, User, Settings, LogOut } from "lucide-react";

function DashboardLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
        isActive
          ? "bg-[#122E76] text-white"
          : "text-[#A9BCCC] hover:bg-[#122E76]/50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) router.push("/login");
    else setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#050B1F] text-[#C7D8E7] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0A1533] border-r border-[#122E76]/40 p-6 flex flex-col">
        <nav className="space-y-4 flex-1">
          <DashboardLink
            href="/profile"
            icon={<User size={18} />}
            label="Profile"
          />
          <DashboardLink
            href="/inbox"
            icon={<Inbox size={18} />}
            label="Inbox"
          />
          <DashboardLink
            href="/settings"
            icon={<Settings size={18} />}
            label="Settings"
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-[#122E76]/30">
          {user && (
            <p className="text-sm mb-3 text-[#7D8EA5]">
              {user.firstName} {user.lastName}
            </p>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
