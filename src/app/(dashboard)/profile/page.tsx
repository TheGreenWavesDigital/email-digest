"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getProfile,
  getCredits,
  getEmails,
  deleteEmail,
} from "../../../utils/api";
import { Settings, ArrowRight } from "lucide-react";

interface EmailItem {
  id: string;
  fileName: string;
  relativeTime: string;
  size: number;
  signedUrl: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [emailContent, setEmailContent] = useState("");
  const [loadingEmails, setLoadingEmails] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Gmail-like keyboard nav j/k
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedEmail || emails.length === 0) return;
      const currentIndex = emails.findIndex((e) => e.id === selectedEmail.id);
      if (e.key === "j" && currentIndex < emails.length - 1)
        loadEmail(emails[currentIndex + 1]);
      if (e.key === "k" && currentIndex > 0)
        loadEmail(emails[currentIndex - 1]);
    },
    [emails, selectedEmail]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const profile = await getProfile();
      if (!profile?.success) return router.push("/login");
      setUser(profile.user);

      const creditRes = await getCredits();
      if (creditRes?.success) setCredits(creditRes.credits ?? 0);

      const emailRes = await getEmails();
      if (emailRes?.success) setEmails(emailRes.emails);
      setLoading(false);
      setLoadingEmails(false);
    }
    load();
  }, [router]);

  const loadEmail = async (email: EmailItem) => {
    setSelectedEmail(email);
    setLoadingContent(true);

    try {
      const res = await fetch(email.signedUrl);
      const html = await res.text();
      setEmailContent(html);
    } catch {
      setEmailContent("<p style='color:red'>Failed to load email</p>");
    }

    setLoadingContent(false);
  };

  const handleDelete = async (email: EmailItem) => {
    await deleteEmail(email.id);
    setEmails((prev) => prev.filter((e) => e.id !== email.id));

    if (selectedEmail?.id === email.id) {
      setSelectedEmail(null);
      setEmailContent("");
    }
  };

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    const h = Math.min(doc.documentElement.scrollHeight || 0, 2000);
    iframe.style.height = `${Math.max(h, 600)}px`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050B1F] text-[#C7D8E7]">
        Loading...
      </div>
    );
  }

  const totalCredits = 1000;
  const percent = Math.min(100, (credits / totalCredits) * 100);

  return (
    <div className="min-h-screen flex bg-[#050B1F] text-[#C7D8E7]">
      <main className="flex-1 p-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-[#C7D8E7]">Profile</h1>

          {/* Profile Section */}
          <div className="p-6 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl mb-8">
            <h2 className="text-xl font-bold mb-2">Account Information</h2>
            <p>
              Name: {user.firstName} {user.lastName}
            </p>
            <p>Email: {user.email}</p>
            <p>Handler: {user.handler}</p>
          </div>

          {/* Settings */}
          <h3 className="text-xl font-bold mb-3">Settings</h3>
          <Link href="/update-profile">
            <div className="flex justify-between items-center p-4 bg-[#0A1533] border border-[#122E76]/40 rounded-xl cursor-pointer hover:border-[#5C8AAC] mb-10">
              <div className="flex gap-4 items-center">
                <Settings className="text-[#5C8AAC]" />
                <div>
                  <p className="font-medium">Preferences</p>
                  <p className="text-sm text-[#A9BCCC]">
                    Manage your email preferences
                  </p>
                </div>
              </div>
              <ArrowRight className="text-[#7D8EA5]" />
            </div>
          </Link>

          {/* Credits */}
          <h3 className="text-xl font-bold mb-3">Credits</h3>
          <div className="p-6 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl mb-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-3 items-center">
                <p>Credits Remaining</p>
                <p>{percent.toFixed(0)}%</p>
              </div>
              <Link
                href="/buy-credits"
                className="bg-[#5C8AAC] text-[#050B1F] px-4 py-2 rounded-lg hover:bg-[#122E76] hover:text-[#C7D8E7]"
              >
                + Add Credits
              </Link>
            </div>
            <div className="w-full bg-[#122E76]/30 h-2 rounded-full">
              <div
                className="h-2 bg-[#5C8AAC] rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="mt-2">
              {credits} / {totalCredits}
            </p>
          </div>

          {/* Gmail-Style Inbox */}
          <h3 className="text-xl font-bold mb-4">Your Emails</h3>

          {/* Emails Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {loadingEmails
              ? [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-28 bg-[#0A1533] animate-pulse rounded-xl border border-[#122E76]/40"
                  />
                ))
              : emails.map((email) => {
                  const isSelected = selectedEmail?.id === email.id;
                  return (
                    <div
                      key={email.id}
                      onClick={() => loadEmail(email)}
                      className={`cursor-pointer rounded-xl border transition-all p-4
                        ${
                          isSelected
                            ? "bg-white/10 border-blue-500 text-white shadow-md"
                            : "bg-[#0A1533] border-[#122E76]/40 hover:bg-white/5 hover:border-blue-400/50"
                        }
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium truncate text-[14px]">
                          {email.fileName}
                        </p>
                        <span className="text-xs text-[#7D8EA5] whitespace-nowrap ml-2">
                          {email.relativeTime}
                        </span>
                      </div>

                      <div className="text-xs text-[#A9BCCC] mt-1">
                        {Math.round(email.size / 1024)} KB
                      </div>

                      <div className="mt-2 flex justify-between items-center text-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(email);
                          }}
                          className="text-red-400 hover:text-red-500"
                        >
                          Delete
                        </button>
                        <a
                          href={email.signedUrl}
                          target="_blank"
                          className="text-blue-400 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Open ▶
                        </a>
                      </div>
                    </div>
                  );
                })}
          </div>

          {/* Preview Section */}
          {selectedEmail && (
            <div className="rounded-xl bg-white overflow-hidden shadow-lg border border-gray-200 mb-10 animate-[slideIn_.25s_ease]">
              <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-gray-50">
                <span className="text-sm font-medium text-gray-700">
                  {selectedEmail.fileName}
                </span>

                <a
                  href={selectedEmail.signedUrl}
                  target="_blank"
                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md"
                >
                  Open Full Page
                </a>
              </div>

              {loadingContent ? (
                <div className="p-10 text-center text-gray-600 text-sm">
                  Loading…
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  className="w-full min-h-[70vh]"
                  srcDoc={emailContent}
                  onLoad={handleIframeLoad}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
