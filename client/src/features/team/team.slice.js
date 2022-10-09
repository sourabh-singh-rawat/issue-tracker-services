import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    info: {},
    options: {},
  },
  reducers: {
    setCurrent: (state, action) => ({
      ...state,
      current: { ...action.payload },
    }),
    updateCurrent: (state, action) => ({
      ...state,
      current: { ...action.payload },
    }),
  },
});

export const { setCurrent, updateCurrent, updateList } = teamSlice.actions;
export default teamSlice.reducer;
