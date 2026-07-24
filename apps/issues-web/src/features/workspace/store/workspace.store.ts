import { create } from "zustand";
import type { WorkspaceObject } from "@generated/gql/graphql";

interface WorkspaceState {
  current: WorkspaceObject | null;
  workspaces: WorkspaceObject[];
  isLoading: boolean;
  setCurrentWorkspace: (workspace: WorkspaceObject) => void;
  setWorkspaces: (workspaces: WorkspaceObject[]) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  current: null,
  workspaces: [],
  isLoading: true,
  setCurrentWorkspace: (workspace) => set({ current: workspace, isLoading: false }),
  setWorkspaces: (workspaces) => set({ workspaces: workspaces || [] }),
}));
