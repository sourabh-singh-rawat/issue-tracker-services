import { actionTypes } from "./project.types.js";

const initialState = {
  id: "",
  name: "",
  nameSelected: false,
  previousName: "",
  description: "",
  descriptionSelected: false,
  owner_uid: "",
  owner_email: "",
  start_date: "",
  end_date: "",
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROJECT:
      return {
        ...state,
        hello: "hello world!",
        ...action.payload,
      };

    case actionTypes.UPDATE_PROJECT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
