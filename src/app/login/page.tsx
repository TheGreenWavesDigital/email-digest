"use client";

import React, { useState } from "react";

export default function AuthForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B1F] text-[#C7D8E7] px-4">
      <div className="w-full max-w-md bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-lg shadow-[#122E76]/20 p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-[#C7D8E7]">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#A9BCCC] mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-[#050B1F] border border-[#122E76]/40 px-3 py-2 text-[#C7D8E7] placeholder-[#7D8EA5] focus:outline-none focus:ring-2 focus:ring-[#5C8AAC] focus:border-[#5C8AAC] transition-all"
            />
          </div>

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
            className="w-full bg-[#5C8AAC] text-[#050B1F] font-semibold py-2.5 rounded-lg hover:bg-[#122E76] hover:text-[#C7D8E7] transition-all duration-300 shadow-md shadow-[#5C8AAC]/30 hover:shadow-[#122E76]/40"
          >
            Continue
          </button>
        </form>

        <p className="text-center text-sm text-[#A9BCCC]">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#5C8AAC] hover:text-[#122E76] underline transition-colors"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
