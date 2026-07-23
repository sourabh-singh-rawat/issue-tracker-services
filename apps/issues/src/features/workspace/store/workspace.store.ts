import { create } from "zustand";
import type { Workspace } from "@generated/gql/graphql";

interface WorkspaceState {
  current: Workspace | null;
  workspaces: Workspace[];
  isLoading: boolean;
  setCurrentWorkspace: (workspace: Workspace) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  current: null,
  workspaces: [],
  isLoading: true,
  setCurrentWorkspace: (workspace) => set({ current: workspace, isLoading: false }),
  setWorkspaces: (workspaces) => set({ workspaces: workspaces || [] }),
}));
