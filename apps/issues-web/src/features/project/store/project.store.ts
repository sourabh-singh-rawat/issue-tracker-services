import { create } from "zustand";
import type { FindProjectsQuery } from "@generated/gql";
import type { ProjectObject } from "@generated/gql/graphql";

type FindProjectsResult = NonNullable<FindProjectsQuery["findProjects"]>;
type ProjectRows = NonNullable<FindProjectsResult["rows"]>;
export type ProjectFromQuery = ProjectRows[number];

interface ProjectState {
  projects: ProjectFromQuery[];
  currentProject: ProjectObject | null;
  isLoading: boolean;
  setCurrentProject: (project: ProjectObject | null) => void;
  setProjects: (projects: ProjectFromQuery[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  isLoading: true,
  setCurrentProject: (project) => set({ currentProject: project }),
  setProjects: (projects) => set({ projects, isLoading: false }),
}));
