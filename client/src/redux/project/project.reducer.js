import { actionTypes } from "./project.types.js";

const initialState = {
  id: "",
  name: "",
  nameSelected: false,
  previousName: "",
  description: "",
  descriptionSelected: false,
  ownerUid: "",
  ownerEmail: "",
  startDate: "",
  endDate: "",
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROJECT:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.UPDATE_PROJECT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
