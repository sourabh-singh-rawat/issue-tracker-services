import { actionTypes } from "./issue-list.type";

export const setIssueList = (issues) => {
  return {
    type: actionTypes.SET_ISSUE_LIST,
    payload: issues,
  };
};
