import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: true,
  },
  reducers: {
    setCredentials: (state, action) => {
      return { ...state, ...action.payload };
    },
    signOut: (state, action) => {
      state.user = null;
      state.token = null;
      return state;
    },
  },
});

export const { setCredentials, signOut } = authSlice.actions;
export default authSlice.reducer;
