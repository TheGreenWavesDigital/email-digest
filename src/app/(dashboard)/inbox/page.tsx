"use client";

import React, { useEffect, useRef, useState } from "react";
import { getEmails, deleteEmail, getProfile } from "../../../utils/api";
import { Star, StarOff, Trash2 } from "lucide-react";

interface EmailItem {
  id: string;
  fileName: string;
  relativeTime: string;
  size: number;
  signedUrl: string;
}

export default function InboxPage() {
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [starred, setStarred] = useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [emailContent, setEmailContent] = useState<string>("");
  const [loadingList, setLoadingList] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [handler, setHandler] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Load handler + inbox
  useEffect(() => {
    (async () => {
      const profile = await getProfile();
      if (profile?.success) setHandler(profile.user.handler);

      const res = await getEmails();
      if (res?.success) setEmails(res.emails);

      setLoadingList(false);
    })();
  }, []);

  const loadEmailContent = async (email: EmailItem) => {
    setSelectedEmail(email);
    setLoadingContent(true);

    try {
      const html = await (await fetch(email.signedUrl)).text();
      setEmailContent(html);
    } catch {
      setEmailContent(`<p class="text-red-500">Failed to load email</p>`);
    }

    setLoadingContent(false);
  };

  const toggleStar = (id: string) => {
    setStarred((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = async (email: EmailItem) => {
    await deleteEmail(email.id);
    setEmails((x) => x.filter((e) => e.id !== email.id));

    if (selectedEmail?.id === email.id) {
      setSelectedEmail(null);
      setEmailContent("");
    }
  };

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument!;
    const h = doc.documentElement.scrollHeight || 800;
    iframe.style.height = `${Math.max(600, Math.min(h, 2000))}px`;
  };

  const downloadPDF = async () => {
    if (!handler || !selectedEmail) return;

    setPdfLoading(true);
    const url = `https://email-digest-pdf.thegreenwavesdigital.workers.dev/pdf/${handler}/${selectedEmail.fileName}`;

    try {
      const openWin = window.open(url, "_blank");
      if (!openWin) alert("Enable pop-ups to download PDF");
      setTimeout(() => setPdfLoading(false), 1500);
    } catch {
      alert("PDF failed");
      setPdfLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-[#C7D8E7]">
      <h2 className="text-2xl font-bold tracking-tight mb-2">Inbox</h2>

      {/* Email List */}
      <div className="rounded-xl overflow-hidden border border-[#122E76]/40">
        {loadingList
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-[#0A1533] animate-pulse border-b border-[#122E76]/30"
              />
            ))
          : emails.map((email) => {
              const isSelected = selectedEmail?.id === email.id;
              const isStarred = starred.includes(email.id);

              return (
                <div
                  key={email.id}
                  onClick={() => loadEmailContent(email)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm cursor-pointer border-b border-[#122E76]/30
                transition ${
                  isSelected ? "bg-white/10" : "hover:bg-[#122E76]/40"
                }`}
                >
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(email.id);
                    }}
                    className="text-yellow-400"
                  >
                    {isStarred ? <Star size={18} /> : <StarOff size={18} />}
                  </button> */}

                  <div className="flex-1">
                    <p className="font-medium truncate">{email.fileName}</p>
                    <p className="text-xs opacity-60">{email.relativeTime}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(email);
                    }}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
      </div>

      {/* Preview */}
      <div className="bg-[#0A1533] border border-[#122E76]/40 rounded-xl p-4">
        {!selectedEmail ? (
          <p className="opacity-70">Select an email to preview 👆</p>
        ) : (
          <>
            <div className="flex justify-between mb-2 items-center text-sm">
              <span className="font-medium">{selectedEmail.fileName}</span>

              <button
                onClick={downloadPDF}
                disabled={pdfLoading}
                className={`px-3 py-2 rounded-md flex items-center gap-2 
                text-xs ${
                  pdfLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {pdfLoading ? "⏳ Generating…" : "📄 Download PDF"}
              </button>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-300">
              {loadingContent ? (
                <div className="p-10 text-center text-gray-600 text-sm">
                  Loading email…
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  className="w-full rounded-lg"
                  srcDoc={emailContent}
                  onLoad={handleIframeLoad}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
