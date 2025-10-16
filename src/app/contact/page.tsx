"use client";
import React, { useState } from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setTimeout(() => setStatus("idle"), 3000);

    // Later, connect this to an API (Resend / EmailJS / backend)
    console.log("Message sent:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-[#0b0d0f] text-gray-200 flex flex-col items-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          Contact Us
        </h1>
        <p className="text-gray-400 mb-10">
          Have questions or feedback? We’d love to hear from you. Fill out the
          form below and we’ll get back to you shortly.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111317] border border-gray-800 rounded-2xl p-8 shadow-lg shadow-blue-900/10 text-left space-y-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <div className="flex items-center bg-[#0b0d0f] border border-gray-800 rounded-lg px-3">
              <User className="text-gray-500 mr-3" size={18} />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full bg-transparent outline-none py-2 text-gray-200 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <div className="flex items-center bg-[#0b0d0f] border border-gray-800 rounded-lg px-3">
              <Mail className="text-gray-500 mr-3" size={18} />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none py-2 text-gray-200 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Message
            </label>
            <div className="flex items-start bg-[#0b0d0f] border border-gray-800 rounded-lg px-3 py-2">
              <MessageSquare className="text-gray-500 mr-3 mt-2" size={18} />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500 resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-md shadow-blue-800/20"
          >
            <Send size={18} />
            Send Message
          </button>

          {/* Status Message */}
          {status === "success" && (
            <p className="text-green-400 text-center text-sm pt-2">
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-center text-sm pt-2">
              ⚠️ Please fill in all fields before submitting.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
