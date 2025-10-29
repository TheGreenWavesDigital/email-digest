"use client";

import React, { useState } from "react";
import { loginUser } from "../../utils/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthForm() {
  const { setAuth } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await loginUser(formData);

    if (response.success) {
      // ✅ Extract user + token from response
      const { user, token } = response;

      // ✅ Update auth context instantly
      setAuth(user, token);
      // ✅ Token is already stored in localStorage by loginUser()
      router.push("/profile"); // redirect after successful login
    } else {
      setError(response.error || "Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B1F] text-[#C7D8E7] px-4">
      <div className="w-full max-w-md bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-lg shadow-[#122E76]/20 p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-[#C7D8E7]">
          Log In
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#A9BCCC] mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-[#050B1F] border border-[#122E76]/40 px-3 py-2 text-[#C7D8E7] placeholder-[#7D8EA5] focus:outline-none focus:ring-2 focus:ring-[#5C8AAC] focus:border-[#5C8AAC] transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#A9BCCC] mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-[#050B1F] border border-[#122E76]/40 px-3 py-2 text-[#C7D8E7] placeholder-[#7D8EA5] focus:outline-none focus:ring-2 focus:ring-[#5C8AAC] focus:border-[#5C8AAC] transition-all"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5C8AAC] text-[#050B1F] font-semibold py-2.5 rounded-lg hover:bg-[#122E76] hover:text-[#C7D8E7] transition-all duration-300 shadow-md shadow-[#5C8AAC]/30 hover:shadow-[#122E76]/40 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>

        <p className="text-center text-sm text-[#A9BCCC]">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-[#5C8AAC] hover:text-[#122E76] underline transition-colors"
          >
            Get Started
          </a>
        </p>
      </div>
    </div>
  );
}
