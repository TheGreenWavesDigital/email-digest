"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  handler: string;
  credits: number;
}

export default function UpdateProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Load user data from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(user);
    setUserData(parsedUser);
    setFormData({
      firstName: parsedUser.firstName,
      lastName: parsedUser.lastName,
    });
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication error. Please log in again.");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        "https://email-digest-api.thegreenwavesdigital.workers.dev/user/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (res.ok && data.success) {
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("✅ Profile updated successfully!");
        setTimeout(() => {
          router.push("/profile");
        }, 1200);
      } else {
        setMessage(data.error || "❌ Failed to update profile");
      }
    } catch (err) {
      setMessage("⚠ An error occurred while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050B1F] text-[#C7D8E7] px-6">
      <div className="w-full max-w-lg bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-xl shadow-[#122E76]/20 p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Update Profile</h2>

        {message && (
          <p className="text-center text-sm font-medium">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm text-[#A9BCCC] mb-1">
              First Name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-[#050B1F] border border-[#122E76]/40 px-3 py-2 text-[#C7D8E7] placeholder-[#7D8EA5]"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm text-[#A9BCCC] mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-[#050B1F] border border-[#122E76]/40 px-3 py-2 text-[#C7D8E7] placeholder-[#7D8EA5]"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5C8AAC] text-[#050B1F] font-semibold py-2.5 rounded-lg hover:bg-[#122E76] hover:text-[#C7D8E7] transition-all"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="w-full mt-2 bg-[#122E76]/40 text-[#C7D8E7] py-2.5 rounded-lg hover:bg-[#122E76] transition-all"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
