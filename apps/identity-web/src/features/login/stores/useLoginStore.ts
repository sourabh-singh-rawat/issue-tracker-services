import { create } from "zustand";

interface LoginState {}

export const useLoginStore = create<LoginState>(() => ({}));
