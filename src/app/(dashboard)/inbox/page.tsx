"use client";

import React, { useEffect, useRef, useState } from "react";
import { getEmails, deleteEmail, getProfile } from "../../../utils/api";

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
  const [handler, setHandler] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

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
      setEmailContent(`<p style="color:red">Failed to load email</p>`);
    }

    setLoadingContent(false);
  };

  const handleDelete = async (email: EmailItem) => {
    const res = await deleteEmail(email.id);
    if (res?.success) {
      setEmails((x) => x.filter((e) => e.id !== email.id));
      if (selectedEmail?.id === email.id) {
        setSelectedEmail(null);
        setEmailContent("");
      }
    }
  };

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument!;
    const h = doc.documentElement.scrollHeight || 800;
    iframe.style.height = `${Math.max(600, Math.min(h, 2000))}px`;
  };

  // ✅ Download via Cloudflare worker
  const downloadPDF = async () => {
    if (!handler || !selectedEmail) return;

    setPdfLoading(true);

    const filename = selectedEmail.fileName;
    const url = `https://email-digest-pdf.thegreenwavesdigital.workers.dev/pdf/${handler}/${filename}`;

    try {
      // Trigger PDF generation
      const pdfWindow = window.open(url, "_blank");

      if (!pdfWindow) {
        alert("Popup blocked! Allow pop-ups to download PDF.");
      }

      // we simulate a small wait for worker response
      setTimeout(() => setPdfLoading(false), 1500);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF");
      setPdfLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col md:flex-row gap-4 md:gap-6">
      {/* Sidebar */}
      <aside className="md:w-80 w-full">
        <h2 className="font-bold text-lg mb-4">Inbox</h2>

        {loadingList ? (
          <p className="text-[#A9BCCC]">Loading emails...</p>
        ) : emails.length === 0 ? (
          <p className="text-[#A9BCCC]">No emails yet</p>
        ) : (
          <div className="space-y-3 max-h-[30vh] md:max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {emails.map((email) => {
              const active = selectedEmail?.id === email.id;
              return (
                <div
                  key={email.id}
                  className={`p-4 rounded-xl cursor-pointer transition ${
                    active
                      ? "bg-[#122E76]"
                      : "bg-[#0A1533] hover:bg-[#122E76]/40"
                  }`}
                  onClick={() => loadEmailContent(email)}
                >
                  <p
                    className={`font-medium truncate ${
                      active ? "text-white" : "text-white"
                    }`}
                  >
                    {email.fileName}
                  </p>
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
      <section className="flex-1 bg-[#0A1533] p-4 md:p-6 rounded-xl border border-[#122E76]/40">
        {!selectedEmail ? (
          <p className="text-[#A9BCCC]">Select an email to preview</p>
        ) : loadingContent ? (
          <p className="text-[#A9BCCC]">Loading email…</p>
        ) : (
          <div>
            <div className="flex justify-end mb-2">
              <button
                onClick={downloadPDF}
                disabled={pdfLoading}
                className={`px-3 py-2 text-sm rounded-md flex items-center gap-2
    ${
      pdfLoading
        ? "bg-gray-500 cursor-not-allowed text-white"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
              >
                {pdfLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>📄 Download PDF</>
                )}
              </button>
            </div>

            <div className="bg-white text-black rounded-lg shadow-lg">
              <iframe
                ref={iframeRef}
                className="w-full rounded-lg"
                srcDoc={emailContent}
                onLoad={handleIframeLoad}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
