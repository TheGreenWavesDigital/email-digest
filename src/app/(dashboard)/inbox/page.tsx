"use client";

import React, { useEffect, useState } from "react";
import { getEmails, deleteEmail } from "../../../utils/api";

interface EmailItem {
  id: string;
  fileName: string;
  relativeTime: string;
  size: number;
  signedUrl: string;
}

export default function InboxPage() {
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [emailContent, setEmailContent] = useState<string>("");
  const [loadingList, setLoadingList] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    async function loadEmails() {
      const res = await getEmails();
      if (res?.success) {
        setEmails(res.emails);
      }
      setLoadingList(false);
    }
    loadEmails();
  }, []);

  const loadEmailContent = async (email: EmailItem) => {
    setSelectedEmail(email);
    setLoadingContent(true);
    setEmailContent("");

    try {
      const response = await fetch(email.signedUrl, { method: "GET" });
      if (!response.ok) throw new Error("Failed to load");
      const html = await response.text();
      setEmailContent(html);
    } catch {
      setEmailContent("<p class='text-red-500'>Failed to load email.</p>");
    }

    setLoadingContent(false);
  };

  const handleDelete = async (email: EmailItem) => {
    const res = await deleteEmail(email.id);
    if (res?.success) {
      setEmails((prev) => prev.filter((e) => e.id !== email.id));
      if (selectedEmail?.id === email.id) {
        setSelectedEmail(null);
        setEmailContent("");
      }
    }
  };

  return (
    <div className="flex gap-6 w-full">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0">
        <h2 className="font-bold text-lg mb-4">Inbox</h2>
        {loadingList ? (
          <p className="text-[#A9BCCC]">Loading emails...</p>
        ) : emails.length === 0 ? (
          <p className="text-[#A9BCCC]">No emails found.</p>
        ) : (
          <div className="space-y-3">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedEmail?.id === email.id
                    ? "bg-[#122E76] text-white"
                    : "bg-[#0A1533] hover:bg-[#122E76]/40"
                }`}
                onClick={() => loadEmailContent(email)}
              >
                <p className="font-medium truncate">{email.fileName}</p>
                <p className="text-xs text-[#7D8EA5]">{email.relativeTime}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(email);
                  }}
                  className="text-red-400 hover:text-red-600 mt-2 text-xs"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Email Viewer */}
      <div className="flex-1 bg-[#0A1533] p-6 rounded-xl border border-[#122E76]/40 max-w-4xl mx-auto overflow-y-auto">
        {!selectedEmail ? (
          <p className="text-[#A9BCCC]">Select an email to view its content</p>
        ) : loadingContent ? (
          <p className="text-[#A9BCCC]">Loading email content...</p>
        ) : (
          <div
            className="bg-white text-black p-6 rounded-lg shadow-lg"
            dangerouslySetInnerHTML={{ __html: emailContent }}
          ></div>
        )}
      </div>
    </div>
  );
}
