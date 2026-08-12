import api from "./api";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export async function login(username: string, password: string) {
  const response = await api.post<LoginResponse>("/Auth/login", {
    username,
    password,
  });

  return response.data.token;
}

export function logout() {
  localStorage.removeItem("cube_tracker_token");
}

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("cube_tracker_token");
}

export function isAuthenticated() {
  return !!getToken();
}
