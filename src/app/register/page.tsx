"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { registerUser } from "../../utils/api";
import { useRouter } from "next/navigation";

interface Country {
  cca2: string;
  name: string;
  idd: {
    root: string;
    suffixes: string[];
  };
  dialCode: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const [formData, setFormData] = useState({
    countryCode: "+961",
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Handle changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit form and call API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const response = await registerUser({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });

    if (response.success) {
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setError(response.error || "Registration failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050B1F] px-6 py-12 text-[#C7D8E7]">
      <div className="w-full max-w-md space-y-8 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-lg shadow-[#122E76]/20 p-8">
        <h2 className="text-3xl font-extrabold text-center">
          Create Your Account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-400 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full bg-[#050B1F] border border-[#122E76]/40 px-3 py-3 rounded-md focus:ring-2 focus:ring-[#5C8AAC]"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full bg-[#050B1F] border border-[#122E76]/40 px-3 py-3 rounded-md focus:ring-2 focus:ring-[#5C8AAC]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#050B1F] border border-[#122E76]/40 px-3 py-3 rounded-md focus:ring-2 focus:ring-[#5C8AAC]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#050B1F] border border-[#122E76]/40 px-3 py-3 rounded-md focus:ring-2 focus:ring-[#5C8AAC]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md font-semibold bg-[#5C8AAC] text-[#050B1F] hover:bg-[#122E76] hover:text-[#C7D8E7] transition-all shadow-md disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          <span className="text-[#A9BCCC]">Already have an account? </span>
          <Link href="/login" className="text-[#5C8AAC] hover:text-[#122E76]">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}
