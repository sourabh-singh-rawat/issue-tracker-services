import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "Updated!",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbarOpen: (state, action) => ({ ...state, open: action.payload }),
  },
});

export const { setSnackbarOpen } = snackbarSlice.actions;
export default snackbarSlice.reducer;
