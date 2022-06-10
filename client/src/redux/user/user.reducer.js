import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: undefined,
  displayName: undefined,
  email: undefined,
  metadata: {
    creationTime: undefined,
    lastSignInTime: undefined,
  },
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const { user } = action.payload;
      const {
        uid,
        email,
        displayName,
        metadata: { creationTime, lastSignInTime },
      } = user;

      return {
        ...state,
        uid,
        displayName,
        email,
        metadata: {
          creationTime,
          lastSignInTime,
        },
      };
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
