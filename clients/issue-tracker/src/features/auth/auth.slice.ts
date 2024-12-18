import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../api";

interface AuthSlice {
  current: null | User;
  isLoading: boolean;
}

const initialState: AuthSlice = { current: null, isLoading: true };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<AuthSlice>) => {
      return {
        ...state,
        current: action.payload.current,
        isLoading: action.payload.isLoading,
      };
    },
    logout: (state) => {
      return { ...state, currentUser: null };
    },
  },
});

export const { setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
