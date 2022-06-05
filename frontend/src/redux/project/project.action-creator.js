import { actionTypes } from "./project.types";

export const setProject = (project) => {
  return {
    type: actionTypes.SET_PROJECT,
    payload: project,
  };
};

export const updateProject = (projectProperty) => {
  return {
    type: actionTypes.UPDATE_PROJECT,
    payload: projectProperty,
  };
};
