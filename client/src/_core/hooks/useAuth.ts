import { useCallback } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

type CompatibilityUser = { name?: string | null; email?: string | null };

function getUnauthenticatedUser(): CompatibilityUser | null {
  return null;
}

/**
 * Compatibility hook retained for template imports. The public website uses a
 * dedicated password-protected admin dashboard rather than platform OAuth.
 */
export function useAuth(_options?: UseAuthOptions) {
  const refresh = useCallback(async () => null, []);
  const logout = useCallback(async () => undefined, []);
  const user = getUnauthenticatedUser();
  return {
    user,
    loading: false,
    error: null,
    isAuthenticated: false,
    refresh,
    logout,
  };
}
