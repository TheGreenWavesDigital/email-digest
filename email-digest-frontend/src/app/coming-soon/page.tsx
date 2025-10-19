"use client";

import React from "react";

export default function ComingSoon() {
  // Uncomment the following section to enable the countdown timer
  /*
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-12-01T00:00:00"); // Launch date

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  */

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#050B1F] text-[#C7D8E7] px-4 relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#122E76]/20 via-transparent to-transparent blur-3xl" />

      {/* Content */}
      <div className="relative text-center z-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight">
          <span className="bg-gradient-to-r from-[#5C8AAC] via-[#C7D8E7] to-[#122E76] bg-clip-text text-transparent">
            Email Digest
          </span>{" "}
          is Coming Soon
        </h1>

        <p className="text-[#A9BCCC] text-base sm:text-lg max-w-xl mx-auto mb-8">
          We’re working hard to bring you something amazing. Stay tuned for the
          official launch — it’ll be worth the wait.
        </p>

        {/* Countdown Timer (currently commented out) */}
        {/*
        <div className="flex justify-center gap-4 sm:gap-6 mb-10">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="flex flex-col items-center bg-[#0A1533]/80 backdrop-blur-sm rounded-lg p-4 w-20 shadow-md border border-[#122E76]/40"
            >
              <span className="text-3xl font-bold text-[#5C8AAC]">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase text-[#A9BCCC]">{unit}</span>
            </div>
          ))}
        </div>
        */}
      </div>

      {/* Background orbs for depth */}
      <div className="absolute -top-24 -left-16 w-64 h-64 bg-[#5C8AAC]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#122E76]/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </main>
  );
}
