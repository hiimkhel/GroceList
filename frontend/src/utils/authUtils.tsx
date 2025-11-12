// src/utils/auth.ts
// Modularize authentication and API requests

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getUser = (): any | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getUserId = (): string | null => {
  const user = getUser();
  return user?.id || null;
};

// Returns headers for authenticated requests
export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
