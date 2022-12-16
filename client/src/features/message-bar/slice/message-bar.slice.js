import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "Updated!",
};

const messageBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setMessageBarOpen: (state, action) => ({
      ...state,
      open: action.payload,
      message: action.payload.message ? action.payload.message : state.message,
    }),
  },
});

export const { setMessageBarOpen } = messageBarSlice.actions;
export default messageBarSlice.reducer;
