import { actionTypes } from "./issue-list.type";

const initialState = {
  issues: [],
  count: 0,
};

export const issueListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ISSUE_LIST:
      return { ...state, issues: action.payload, count: action.payload.length };
    default:
      return state;
  }
};
