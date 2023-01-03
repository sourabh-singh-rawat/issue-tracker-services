import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    isLoading: true,
  },
  reducers: {
    setCredentials: (state, action) => ({
      ...state,
      accessToken: action.payload.accessToken,
      user: action.payload.user,
      isLoading: false,
    }),
    signOut: (state) => ({
      ...state,
      user: null,
      accessToken: null,
    }),
  },
});

export const { setCredentials, signOut } = authSlice.actions;
export default authSlice.reducer;
