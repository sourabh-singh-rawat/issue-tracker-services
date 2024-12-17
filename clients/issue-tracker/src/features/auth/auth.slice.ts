import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  currentUser: null | {
    displayName: string;
    email: string;
    isEmailVerified: boolean;
    userId: string;
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
    setCurrentUser: (state, action) => {
      // const {} = action.payload;

      return {
        ...state,
        currentUser: action.payload.user,
        isLoading: action.payload.isLoading,
      };
    },
    logout: (state) => {
      return {
        ...state,
        currentUser: null,
      };
    },
  },
});

export const { setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
