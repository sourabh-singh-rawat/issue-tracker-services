import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: true,
  },
  reducers: {
    setCredentials: (state, action) => {
      return { ...state, ...action.payload };
    },
    signOut: (state, action) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      return state;
    },
  },
});

export const { setCredentials, signOut } = authSlice.actions;
export default authSlice.reducer;
