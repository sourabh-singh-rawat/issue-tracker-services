import { actionTypes } from "./issue.types";

export const setIssue = (issue) => {
  return {
    type: actionTypes.SET_ISSUE,
    payload: issue,
  };
};

export const updateIssue = (issueProperty) => {
  return {
    type: actionTypes.UPDATE_ISSUE,
    payload: issueProperty,
  };
};
