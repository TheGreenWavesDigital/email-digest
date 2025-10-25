"use client";

import React, { useEffect, useState } from "react";
import { getEmails, deleteEmail } from "../utils/api";

export default function EmailList() {
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEmails() {
      const response = await getEmails();
      if (response?.success) {
        setEmails(response.emails);
      }
      setLoading(false);
    }
    loadEmails();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteEmail(id);
    if (res?.success) {
      setEmails((prev) => prev.filter((email) => email.id !== id));
      alert("Email deleted successfully");
    } else {
      alert(res?.error || "Failed to delete");
    }
  };

  if (loading) {
    return <p className="text-[#A9BCCC]">Loading emails...</p>;
  }

  if (emails.length === 0) {
    return <p className="text-[#A9BCCC]">No emails found.</p>;
  }

  return (
    <div className="space-y-4 ">
      {emails.map((email) => (
        <div
          key={email.id}
          className="p-4 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-sm text-[#C7D8E7] flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{email.fileName}</p>
            <p className="text-sm text-[#7D8EA5]">
              Uploaded: {email.relativeTime}
            </p>
            <p className="text-xs text-[#7D8EA5]">
              Size: {(email.size / 1024).toFixed(1)} KB
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={email.signedUrl}
              target="_blank"
              className="text-[#5C8AAC] hover:underline"
            >
              View
            </a>
            <button
              onClick={() => handleDelete(email.id)}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
