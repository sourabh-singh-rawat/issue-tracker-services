import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: [],
  loading: true,
};

const issueCommentsSlice = createSlice({
  name: "issueComments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.rows = action.payload.rows;
      state.rowCount = action.payload.rowCount;
      state.loading = false;

      return state;
    },
  },
});

export const { setComments } = issueCommentsSlice.actions;
export default issueCommentsSlice.reducer;
