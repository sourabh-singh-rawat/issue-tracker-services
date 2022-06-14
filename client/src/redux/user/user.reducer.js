import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: undefined,
  displayName: undefined,
  email: undefined,
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const { uid, displayName, email, accessToken } = action.payload;
      return { ...state, uid, displayName, email, accessToken };
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
