"use client";

import React, { useEffect, useRef, useState } from "react";
import { getEmails, deleteEmail } from "../../../utils/api";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getEmails();
      if (res?.success) setEmails(res.emails);
    })();
  }, []);

  const loadEmailContent = async (email: EmailItem) => {
    setSelectedEmail(email);
    const response = await fetch(email.signedUrl);
    setEmailContent(await response.text());
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

  // ✅ HTML → IMAGE → PDF
  const saveAsPDF = async () => {
    const iframe = iframeRef.current;
    if (!iframe) return alert("Email not loaded yet");
    const doc = iframe.contentDocument;
    if (!doc) return;

    const body = doc.body;
    body.style.width = "900px"; // force consistent width

    const canvas = await html2canvas(body, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(selectedEmail?.fileName.replace(".html", "") + ".pdf");
  };

  return (
    <div className="flex w-full flex-col md:flex-row gap-4 md:gap-6">
      <aside className="md:w-80 w-full">
        <h2 className="font-bold text-lg mb-4">Inbox</h2>

        <div className="space-y-3 max-h-[30vh] md:max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {emails.map((email) => {
            const active = selectedEmail?.id === email.id;
            return (
              <div
                key={email.id}
                onClick={() => loadEmailContent(email)}
                className={`p-4 rounded-xl cursor-pointer ${
                  active
                    ? "bg-[#122E76] text-white"
                    : "bg-[#0A1533] hover:bg-[#122E76]/40"
                }`}
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
      </aside>

      {/* VIEWER */}
      <section className="flex-1 bg-[#0A1533] p-4 md:p-6 rounded-xl border border-[#122E76]/40">
        {!selectedEmail ? (
          <p className="text-[#A9BCCC]">Select an email to view</p>
        ) : (
          <div>
            <div className="flex justify-end mb-2">
              <button
                onClick={saveAsPDF}
                className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                📄 Save as PDF
              </button>
            </div>

            <div className="bg-white text-black rounded-lg shadow-lg">
              <iframe
                ref={iframeRef}
                className="w-full min-h-[600px] rounded-lg"
                srcDoc={emailContent}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
