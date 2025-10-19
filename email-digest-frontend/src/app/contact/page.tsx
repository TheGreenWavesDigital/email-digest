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

    console.log("Message sent:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-[#050B1F] text-[#C7D8E7] flex flex-col items-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#C7D8E7] mb-3">
          Contact Us
        </h1>
        <p className="text-[#A9BCCC] mb-10">
          Have questions or feedback? We’d love to hear from you. Fill out the
          form below and we’ll get back to you shortly.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0A1533] border border-[#122E76]/40 rounded-2xl p-8 shadow-lg shadow-[#122E76]/20 text-left space-y-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#A9BCCC] mb-2"
            >
              Name
            </label>
            <div className="flex items-center bg-[#050B1F] border border-[#122E76]/40 rounded-lg px-3">
              <User className="text-[#5C8AAC] mr-3" size={18} />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full bg-transparent outline-none py-2 text-[#C7D8E7] placeholder-[#7D8EA5]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#A9BCCC] mb-2"
            >
              Email
            </label>
            <div className="flex items-center bg-[#050B1F] border border-[#122E76]/40 rounded-lg px-3">
              <Mail className="text-[#5C8AAC] mr-3" size={18} />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none py-2 text-[#C7D8E7] placeholder-[#7D8EA5]"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#A9BCCC] mb-2"
            >
              Message
            </label>
            <div className="flex items-start bg-[#050B1F] border border-[#122E76]/40 rounded-lg px-3 py-2">
              <MessageSquare className="text-[#5C8AAC] mr-3 mt-2" size={18} />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                className="w-full bg-transparent outline-none text-[#C7D8E7] placeholder-[#7D8EA5] resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#5C8AAC] hover:bg-[#122E76] hover:text-[#C7D8E7] text-[#050B1F] py-3 rounded-lg font-semibold transition-all duration-300 shadow-md shadow-[#5C8AAC]/30 hover:shadow-[#122E76]/40"
          >
            <Send size={18} />
            Send Message
          </button>

          {/* Status Message */}
          {status === "success" && (
            <p className="text-[#67E38D] text-center text-sm pt-2">
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-[#E36464] text-center text-sm pt-2">
              ⚠️ Please fill in all fields before submitting.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
