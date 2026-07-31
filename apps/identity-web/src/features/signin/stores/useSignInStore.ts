import { create } from "zustand";

interface SignInState {}

export const useSignInStore = create<SignInState>(() => ({}));
