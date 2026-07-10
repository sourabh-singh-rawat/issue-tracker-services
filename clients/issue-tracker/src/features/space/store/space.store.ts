import { create } from "zustand";
import type { FindSpacesQuery } from "@generated/gql";
import type { List } from "@generated/gql/graphql";

export type SpaceFromQuery = FindSpacesQuery["findSpaces"][number];

interface SpaceState {
  spaces: SpaceFromQuery[];
  currentList: List | null;
  isLoading: boolean;
  setCurrentList: (list: List) => void;
  setSpaces: (spaces: SpaceFromQuery[]) => void;
}

export const useSpaceStore = create<SpaceState>((set) => ({
  spaces: [],
  currentList: null,
  isLoading: true,
  setCurrentList: (list) => set({ currentList: list }),
  setSpaces: (spaces) => set({ spaces, isLoading: false }),
}));
