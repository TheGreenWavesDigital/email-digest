"use client";
import React, { useState } from "react";
import { forgotPassword } from "../../../utils/api";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await forgotPassword(email);
    if (res.success) {
      setMessage("✅ If this email exists, a reset link has been sent.");
    } else {
      setMessage("⚠️ Could not send reset email. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050B1F] text-[#C7D8E7]">
      <div className="bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-md shadow-[#122E76]/20 p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>
        <p className="text-sm text-[#A9BCCC] mb-6 text-center">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#050B1F] border border-[#122E76]/40 rounded-lg text-[#C7D8E7] focus:outline-none focus:border-[#5C8AAC] transition-all"
            />
            <Mail className="absolute right-3 top-3 text-[#5C8AAC]" size={20} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5C8AAC] hover:bg-[#122E76] hover:text-[#C7D8E7] text-[#050B1F] py-3 rounded-lg font-medium transition-all shadow-md shadow-[#5C8AAC]/30 hover:shadow-[#122E76]/40"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-[#A9BCCC]">{message}</p>
        )}
      </div>
    </div>
  );
}
