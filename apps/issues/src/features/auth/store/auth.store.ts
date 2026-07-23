import { create } from "zustand";
import type { User } from "@generated/gql/graphql";

interface AuthState {
  current: User | null;
  isLoading: boolean;
  setCurrentUser: (payload: { current: User | null; isLoading?: boolean }) => void;
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
