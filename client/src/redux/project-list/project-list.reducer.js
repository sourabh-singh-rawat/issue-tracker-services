import { actionTypes } from "../project-list/project-list.types";

const initialState = {
  projects: [],
  count: 0,
};

export const projectListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROJECT_LIST:
      return {
        ...state,
        projects: action.payload,
        count: action.payload.length,
      };
    default:
      return state;
  }
};
