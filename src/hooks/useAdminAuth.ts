import { trpc } from "@/providers/trpc";
import { useCallback, useMemo } from "react";

const TOKEN_KEY = "admin_token";

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function useAdminAuth() {
  const utils = trpc.useUtils();

  const {
    data: admin,
    isLoading,
    error,
  } = trpc.adminAuth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !!getAdminToken(),
  });

  const logout = useCallback(async () => {
    removeAdminToken();
    await utils.invalidate();
    window.location.href = "/admin/login";
  }, [utils]);

  return useMemo(
    () => ({
      admin: admin ?? null,
      isAuthenticated: !!admin,
      isLoading,
      error,
      logout,
    }),
    [admin, isLoading, error, logout]
  );
}
