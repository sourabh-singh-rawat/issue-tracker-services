import { actionTypes } from "./issue.types";

const initialState = {
  id: "",
  name: "",
  nameSelected: false,
  previousName: "",
  description: "",
  descriptionSelected: false,
  status: "",
  priority: "",
  reporter: "",
  assignee: "",
  dueDate: "",
  projectId: "",
  projectName: "",
  projectOwnerUid: "",
};

export const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ISSUE:
      return { ...state, ...action.payload };
    case actionTypes.UPDATE_ISSUE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
