import axios from "axios";

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? `${window.location.origin}/api`
    : "http://localhost:5000/api");

const TOKEN_KEY = "adminToken";

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY);

export const setAdminToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearAdminSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("adminAuth");
};

export const hasValidAdminToken = () => {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const encoded = token
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const padded = encoded.padEnd(Math.ceil(encoded.length / 4) * 4, "=");
    const payload = JSON.parse(atob(padded));
    return Number(payload.exp) * 1000 > Date.now();
  } catch {
    clearAdminSession();
    return false;
  }
};

const redirectToLogin = () => {
  clearAdminSession();
  if (window.location.pathname !== "/admin/login") {
    window.location.replace("/admin/login");
  }
};

export const apiFetch = async (url, options = {}) => {
  const headers = new Headers(options.headers || {});
  const token = getAdminToken();

  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(url, { ...options, headers });
  if (response.status === 401) redirectToLogin();
  return response;
};

export const apiClient = axios.create({ baseURL: API_URL });

apiClient.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) redirectToLogin();
    return Promise.reject(error);
  },
);
