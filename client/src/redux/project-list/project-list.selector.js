import { createSelector } from "reselect";

const selectProjectList = (state) => state.projectList;

export const selectProjects = createSelector(
  [selectProjectList],
  (projectList) => projectList.projects
);
