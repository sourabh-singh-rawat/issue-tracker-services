import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  description: "",
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    updateTeam: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setTeam, updateTeam } = teamSlice.actions;
export default teamSlice.reducer;
