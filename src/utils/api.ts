// src/utils/api.ts

const API_BASE = "https://email-digest-api.thegreenwavesdigital.workers.dev";

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

  if (result.success && result.token) {
    // Store token & user for persistence
    localStorage.setItem("token", result.token);
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
    }
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

// ✅ Update Profile API
export async function updateProfile(data: {
  firstName: string;
  lastName: string;
  phone: string;
}) {
  const token = getToken();
  if (!token) return { error: "Not authenticated" };

  try {
    const res = await fetch(`${API_BASE}/user/update-profile`, {
      method: "PUT", // 🔄 Make sure your backend uses PUT or POST accordingly
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    // ✅ If profile was successfully updated, update the local user data
    if (result.success && result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
    }

    return result;
  } catch (error) {
    console.error("Update profile error:", error);
    return { error: "Failed to update profile" };
  }
}
