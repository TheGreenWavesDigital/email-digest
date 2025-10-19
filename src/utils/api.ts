// src/utils/api.ts

const API_BASE = "https://email-digest-api.thegreenwavesdigital.workers.dev"; // change to your actual URL

// ✅ Helper to get token from localStorage
function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

// ✅ Register API
export async function registerUser(data: {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ✅ Login API
export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (result.token) {
    localStorage.setItem("token", result.token);
  }
  return result;
}

// ✅ Get Profile API
export async function getProfile() {
  const token = getToken();
  if (!token) return { error: "Not authenticated" };

  const res = await fetch(`${API_BASE}/user/profile`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// ✅ Get Credits API
export async function getCredits() {
  const token = getToken();
  if (!token) return { error: "Not authenticated" };

  const res = await fetch(`${API_BASE}/user/credits`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// ✅ Logout API
export async function logoutUser() {
  const token = getToken();
  if (!token) return { error: "Not authenticated" };

  const res = await fetch(`${API_BASE}/user/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  // ✅ Remove token on frontend
  localStorage.removeItem("token");

  return res.json();
}
