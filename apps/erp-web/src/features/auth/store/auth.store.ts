import { create } from "zustand";

/** Session user shape from platform OpenAPI `GET /identity/me`. */
export type AuthUser = {
  userId: string;
  email: string;
  emailVerified?: boolean;
  displayName?: string | null;
  photoUrl?: string | null;
  description?: string | null;
};

interface AuthState {
  current: AuthUser | null;
  isLoading: boolean;
  setCurrentUser: (payload: { current: AuthUser | null; isLoading?: boolean }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  current: null,
  isLoading: true,
  setCurrentUser: ({ current, isLoading }) =>
    set((state) => ({
      current,
      isLoading: isLoading ?? state.isLoading,
    })),
  logout: () => set({ current: null, isLoading: false }),
}));
