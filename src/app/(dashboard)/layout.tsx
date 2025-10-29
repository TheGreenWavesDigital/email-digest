"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { Inbox, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function DashboardLink({
  href,
  icon,
  label,
  onNavigate,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
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
  const { clearAuth } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) router.push("/login");
    else setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#050B1F] text-[#C7D8E7] flex flex-col md:flex-row">
      {/* Top bar (mobile) */}
      <header className="md:hidden sticky top-0 z-40 bg-[#0A1533] border-b border-[#122E76]/40">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            aria-label="Open sidebar"
            className="p-2 rounded-lg bg-[#122E76]/30"
            onClick={() => setOpen(true)}
          >
            <Menu size={18} />
          </button>

          <div className="w-9" />
        </div>
      </header>

      {/* Sidebar */}
      {/* Desktop: static — Mobile: slide-in drawer */}
      <aside
        className={`
          md:static md:translate-x-0 md:w-72 md:flex
          fixed inset-y-0 left-0 z-50 w-72
          bg-[#0A1533] border-r border-[#122E76]/40 p-6
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          flex-col
        `}
      >
        {/* Close button (mobile) */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden mb-4 self-end p-2 rounded-lg bg-[#122E76]/30"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>

        <nav className="space-y-4 flex-1">
          <DashboardLink
            href="/profile"
            icon={<User size={18} />}
            label="Profile"
            onNavigate={() => setOpen(false)}
          />
          <DashboardLink
            href="/inbox"
            icon={<Inbox size={18} />}
            label="Inbox"
            onNavigate={() => setOpen(false)}
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
            className="cursor-pointer flex items-center gap-2 text-red-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
