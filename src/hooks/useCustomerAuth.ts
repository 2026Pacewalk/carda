import { trpc } from "@/providers/trpc";
import { useCallback, useMemo } from "react";

const TOKEN_KEY = "customer_token";

export function getCustomerToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setCustomerToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeCustomerToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function useCustomerAuth() {
  const utils = trpc.useUtils();

  const {
    data: customer,
    isLoading,
    error,
  } = trpc.customerAuth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !!getCustomerToken(),
  });

  const logoutMutation = trpc.customerAuth.logout.useMutation({
    onSuccess: async () => {
      removeCustomerToken();
      await utils.invalidate();
      window.location.reload();
    },
  });

  const logout = useCallback(() => {
    removeCustomerToken();
    window.location.reload();
  }, []);

  return useMemo(
    () => ({
      customer: customer ?? null,
      isAuthenticated: !!customer,
      isLoading,
      error,
      logout,
    }),
    [customer, isLoading, error, logout]
  );
}
