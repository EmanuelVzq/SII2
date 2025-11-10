// lib/auth.ts
import { useRouter } from "next/navigation";

let authToken: string | null = null;

export function setToken(token: string) {
  authToken = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
}

export function getToken(): string | null {
  if (authToken) return authToken;
  if (typeof window !== "undefined") {
    authToken = localStorage.getItem("auth_token");
    return authToken;
  }
  return null;
}

export function clearToken() {
  authToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
}

// 🔥 función universal de logout seguro
export function handleAuthError(router: ReturnType<typeof useRouter>) {
  clearToken();
  router.push("/login");
}
