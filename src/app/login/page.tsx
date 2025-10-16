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
    <div className="min-h-screen flex items-center justify-center bg-background-dark text-white px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/*Name*/}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
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
              className="w-full rounded-lg bg-background-dark border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
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
              className="w-full rounded-lg bg-background-dark border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-100"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
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
              className="w-full rounded-lg bg-background-dark border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white font-medium py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Continue
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary hover:text-primary/80 underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
