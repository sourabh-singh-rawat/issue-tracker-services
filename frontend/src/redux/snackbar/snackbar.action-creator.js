import { actionTypes } from "./snackbar.types";

export const setSnackbarOpen = () => {
  return {
    type: actionTypes.SET_SNACKBAR_OPEN,
  };
};

export const setSnackbarClose = () => {
  return {
    type: actionTypes.SET_SNACKBAR_CLOSE,
  };
};
