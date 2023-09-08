import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  currentUser: null | {
    id: string;
    displayName: string;
    photoUrl: string;
  };
  isLoading: boolean;
} = {
  currentUser: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
      isLoading: false,
    }),
    logout: (state) => ({
      ...state,
      currentUser: null,
    }),
  },
});

export const { setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
