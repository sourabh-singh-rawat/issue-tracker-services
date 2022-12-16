import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: [],
  isLoading: true,
};

const issueCommentsSlice = createSlice({
  name: "issueComments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.rows = action.payload.rows;
      state.rowCount = action.payload.rowCount;
      state.isLoading = false;

      return state;
    },
    setLoadingComments: (state, action) => {
      state.isLoading = true;

      return state;
    },
  },
});

export const { setComments, setLoadingComments } = issueCommentsSlice.actions;
export default issueCommentsSlice.reducer;
