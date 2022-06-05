import { actionTypes } from "./snackbar.types";

const initialState = {
  open: false,
  message: "Updated!",
};

export const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SNACKBAR_OPEN:
      return { ...state, open: true };

    case actionTypes.SET_SNACKBAR_CLOSE:
      return { ...state, open: false };

    default:
      return state;
  }
};
