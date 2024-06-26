import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    uid: "",
    email: "",
    photoURL: "",
    displayName: "",
    isLoading: true,
  },
  settings: {},
  filters: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => ({
      ...state,
      info: { ...action.payload, isLoading: false },
    }),
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
