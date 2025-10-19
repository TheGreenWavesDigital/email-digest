"use client";

import React, { useState, useEffect } from "react";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-12-01T00:00:00"); // launch date

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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background-dark text-white px-4 relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl" />

      {/* Content */}
      <div className="relative text-center z-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
            Email Digest
          </span>{" "}
          is Coming Soon
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
          We are working hard to bring you something amazing. Stay tuned for the
          launch!
        </p>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-10">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="flex flex-col items-center bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 w-20 shadow-md border border-gray-700"
            >
              <span className="text-3xl font-bold text-primary">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase text-gray-400">{unit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Background orbs for depth */}
      <div className="absolute -top-24 -left-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    </main>
  );
}
