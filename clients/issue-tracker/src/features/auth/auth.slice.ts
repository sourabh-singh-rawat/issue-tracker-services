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
        currentUser: action.payload,
        isLoading: false,
      };
    },
    setCurrentWorkspace: (state, action) => {
      const { id, name } = action.payload;

      return {
        ...state,
        currentWorkspace: { id, name },
        isLoading: false,
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

export const { setCurrentUser, setCurrentWorkspace, logout } =
  authSlice.actions;
export default authSlice.reducer;
