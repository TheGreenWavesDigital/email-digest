"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = { firstName?: string; lastName?: string; email?: string } | null;

type AuthCtx = {
  isAuthed: boolean;
  user: User;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isAuthed, setIsAuthed] = useState(false);

  // hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const u = localStorage.getItem("user");
      if (token && u) {
        setUser(JSON.parse(u));
        setIsAuthed(true);
      }
    } catch {}
  }, []);

  const setAuth = (u: User, token: string) => {
    setUser(u);
    setIsAuthed(Boolean(token));
    // persist
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const clearAuth = () => {
    setUser(null);
    setIsAuthed(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Ctx.Provider value={{ isAuthed, user, setAuth, clearAuth }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
};
