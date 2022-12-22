import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: true,
  },
  reducers: {
    setCredentials: (state, action) => ({ ...state, ...action.payload }),
    signOut: (state) => ({
      ...state,
      user: null,
      accessToken: null,
      refreshToken: null,
    }),
  },
});

export const { setCredentials, signOut } = authSlice.actions;
export default authSlice.reducer;
