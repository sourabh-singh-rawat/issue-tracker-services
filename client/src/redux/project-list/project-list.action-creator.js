import { actionTypes } from "./project-list.types";

export const setProjectList = (projects) => {
  return {
    type: actionTypes.SET_PROJECT_LIST,
    payload: projects,
  };
};
