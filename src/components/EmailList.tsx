"use client";

import React, { useEffect, useState } from "react";
import { getEmails, deleteEmail } from "../utils/api";
import { useRouter } from "next/navigation";
import { Eye, Trash2 } from "lucide-react";

export default function EmailList() {
  const router = useRouter();

  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // pagination state
  const [page, setPage] = useState(1);
  const perPage = 10;

  const totalPages = Math.ceil(emails.length / perPage);
  const paginatedEmails = emails.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    async function loadEmails() {
      const response = await getEmails();
      if (response?.success) setEmails(response.emails);
      setLoading(false);
    }
    loadEmails();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteEmail(id);
    if (res?.success) {
      setEmails((prev) => prev.filter((email) => email.id !== id));
    }
  };

  if (loading) {
    return <p className="text-[#A9BCCC]">Loading emails...</p>;
  }

  if (emails.length === 0) {
    return <p className="text-[#A9BCCC]">No emails found.</p>;
  }

  return (
    <div className="space-y-4">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {paginatedEmails.map((email) => (
          <div
            key={email.id}
            className="p-4 bg-[#0A1533] border border-[#122E76]/40 rounded-xl shadow-sm text-[#C7D8E7] flex flex-col justify-between"
          >
            <div>
              <p className="font-semibold truncate">{email.fileName}</p>
              <p className="text-sm text-[#7D8EA5]">{email.relativeTime}</p>
              <p className="text-xs text-[#7D8EA5]">
                {(email.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => router.push(`/email/${email.id}`)}
                className="flex gap-1 items-center text-[#5C8AAC] hover:text-white transition-colors"
              >
                <Eye size={18} />
                View
              </button>

              <button
                onClick={() => handleDelete(email.id)}
                className="flex gap-1 items-center text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-[#122E76] disabled:opacity-30 rounded-lg text-white text-sm"
        >
          Prev
        </button>

        <span className="text-[#C7D8E7] text-sm">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-[#122E76] disabled:opacity-30 rounded-lg text-white text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
