"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "../../../utils/api";
import { Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050B1F] text-[#C7D8E7]">
        <p>❌ Invalid or missing reset token.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await resetPassword(token, newPassword);
    if (res.success) {
      setMessage("✅ Password reset successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage("⚠️ Failed to reset password. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050B1F] text-[#C7D8E7]">
      <div className="bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-md shadow-[#122E76]/20 p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#050B1F] border border-[#122E76]/40 rounded-lg text-[#C7D8E7] focus:outline-none focus:border-[#5C8AAC] transition-all"
            />
            <Lock className="absolute right-3 top-3 text-[#5C8AAC]" size={20} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5C8AAC] hover:bg-[#122E76] hover:text-[#C7D8E7] text-[#050B1F] py-3 rounded-lg font-medium transition-all shadow-md shadow-[#5C8AAC]/30 hover:shadow-[#122E76]/40"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-[#A9BCCC]">{message}</p>
        )}
      </div>
    </div>
  );
}
