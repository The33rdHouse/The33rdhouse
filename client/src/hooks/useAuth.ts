import { trpc } from "@/lib/trpc";

export function useAuth() {
  const { data: user, isLoading, error } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    user: user ?? null,
    loading: isLoading,
    error: error?.message ?? null,
    isAuthenticated: !!user,
  };
}
