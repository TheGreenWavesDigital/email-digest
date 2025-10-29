"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getEmails();
      if (res?.success) setEmails(res.emails);
      setLoadingList(false);
    })();
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
      setEmailContent(
        `<p style="color:#ef4444;font-family:ui-sans-serif,system-ui,sans-serif">Failed to load email.</p>`
      );
    } finally {
      setLoadingContent(false);
    }
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

  // auto-size iframe to its document height
  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    doc.body.style.margin = "0";
    doc.body.style.background = "#ffffff";
    const h = Math.min(doc.documentElement.scrollHeight || 0, 2000);
    iframe.style.height = `${Math.max(h, 600)}px`;
  };

  return (
    <div className="flex w-full flex-col md:flex-row gap-4 md:gap-6">
      {/* Sidebar / list */}
      <aside className="md:w-80 w-full md:flex-shrink-0">
        <h2 className="font-bold text-lg mb-4">Inbox</h2>

        {loadingList ? (
          <p className="text-[#A9BCCC]">Loading emails...</p>
        ) : emails.length === 0 ? (
          <p className="text-[#A9BCCC]">No emails found.</p>
        ) : (
          <div className="space-y-3 max-h-[30vh] md:max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {emails.map((email) => {
              const isSelected = selectedEmail?.id === email.id;
              return (
                <div
                  key={email.id}
                  className={`p-4 rounded-xl cursor-pointer transition-colors ${
                    isSelected
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
                    className="text-red-400 hover:text-red-500 mt-2 text-xs"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </aside>

      {/* Viewer */}
      <section className="flex-1 bg-[#0A1533] p-4 md:p-6 rounded-xl border border-[#122E76]/40 overflow-hidden">
        {!selectedEmail ? (
          <p className="text-[#A9BCCC]">Select an email to view its content</p>
        ) : loadingContent ? (
          <p className="text-[#A9BCCC]">Loading email content...</p>
        ) : (
          <div className="bg-white text-black rounded-lg shadow-lg">
            {/* CSS isolation prevents header/spacing glitches */}
            <iframe
              ref={iframeRef}
              title={selectedEmail?.fileName ?? "Email"}
              className="w-full rounded-lg"
              srcDoc={emailContent}
              onLoad={handleIframeLoad}
            />
          </div>
        )}
      </section>
    </div>
  );
}
